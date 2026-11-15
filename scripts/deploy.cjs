const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
function progressBar(ratio, label, output, finish = false) {
    const percent = Math.floor(Math.max(0, Math.min(1, ratio)) * 100);
    const width = 24;
    const filled = Math.floor((percent * width) / 100);
    const line = `[${"#".repeat(filled)}${"-".repeat(width - filled)}] ${percent}% ${label}`;
    const columns = output.columns || 100;
    output.write(
        "\r\x1b[2K" +
            line.slice(0, Math.max(1, columns - 1)) +
            (finish ? "\n" : ""),
    );
}
const retentionMs = 7 * 86400_000;
const call = (sftp, method, ...args) =>
    new Promise((resolve, reject) => {
        sftp[method](...args, (error, result) =>
            error ? reject(error) : resolve(result),
        );
    });
async function pool(items, concurrency, work) {
    let cursor = 0,
        failure;
    await Promise.all(
        Array.from(
            { length: Math.min(concurrency, items.length) },
            async () => {
                while (!failure && cursor < items.length) {
                    const item = items[cursor++];
                    try {
                        await work(item);
                    } catch (error) {
                        failure ||= error;
                    }
                }
            },
        ),
    );
    if (failure) throw failure;
}
async function localFiles(root, prefix = "") {
    const result = [];
    for (const entry of await fs.readdir(path.join(root, prefix), {
        withFileTypes: true,
    })) {
        const name = path.posix.join(prefix, entry.name);
        // Hosting configuration and backend are managed on the server.
        if (entry.name.startsWith(".") || name === "api") continue;
        if (entry.isDirectory()) result.push(...(await localFiles(root, name)));
        else if (entry.isFile())
            result.push({
                name,
                size: (await fs.stat(path.join(root, name))).size,
            });
    }
    return result;
}
const isHashed = (name) => /^assets\/.+-[\w-]{8,}\.[\w.]+$/.test(name);
const safeAsset = (name) =>
    typeof name === "string" &&
    name.startsWith("assets/") &&
    !name.split("/").some((part) => part === ".." || part === "." || !part) &&
    /^[\w./-]+$/.test(name);
async function deploy(
    sftp,
    localDir,
    remoteDir,
    {
        log = console.log,
        concurrency = 8,
        now = Date.now,
        output = process.stdout,
    } = {},
) {
    const interactive = output.isTTY && log === console.log;
    const started = now();
    const remote = (name) => path.posix.join(remoteDir, name);
    const files = await localFiles(localDir);
    if (
        !files.some((f) => f.name === "index.html") ||
        !files.some((f) => f.name === "version.json")
    )
        throw new Error("Run pnpm build before publishing.");
    const version = JSON.parse(
        await fs.readFile(path.join(localDir, "version.json"), "utf8"),
    );
    if (!/^[\w-]+$/.test(version.id)) throw new Error("Invalid build ID");
    const token = randomUUID();
    const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1) + " MB";
    log(
        `Preparing ${files.length} files (${mb(files.reduce((sum, f) => sum + f.size, 0))}); ${concurrency} concurrent uploads.`,
    );
    // One directory listing per directory, rather than a remote stat per file.
    const existing = new Map();
    const directories = new Set([""]);
    async function scan(prefix) {
        let entries;
        try {
            entries = await call(sftp, "readdir", remote(prefix));
        } catch (error) {
            if (error.code === 2) return;
            throw error;
        }
        directories.add(prefix);
        for (const entry of entries) {
            if (entry.filename.startsWith(".")) continue;
            const name = path.posix.join(prefix, entry.filename);
            if (entry.attrs.isDirectory()) {
                if (name === "assets" || prefix.startsWith("assets"))
                    await scan(name);
            } else existing.set(name, entry.attrs.size);
        }
    }
    log("Checking existing assets…");
    await scan("");
    let state = [];
    try {
        state = JSON.parse(
            String(await call(sftp, "readFile", remote(".deploy-state.json"))),
        );
    } catch (error) {
        if (error.code !== 2) throw error;
    }
    if (
        !Array.isArray(state) ||
        state.some(
            (m) =>
                !m ||
                typeof m.id !== "string" ||
                !(m.retiredAt === null || Number.isFinite(m.retiredAt)) ||
                !Array.isArray(m.assets) ||
                m.assets.some((n) => !safeAsset(n)),
        )
    )
        throw new Error("Invalid deployment retention state");
    const needed = new Set();
    for (const file of files) {
        let dir = path.posix.dirname(file.name);
        while (dir !== ".") {
            needed.add(dir);
            dir = path.posix.dirname(dir);
        }
    }
    for (const dir of [...needed].sort(
        (a, b) => a.split("/").length - b.split("/").length,
    )) {
        if (!directories.has(dir)) {
            await call(sftp, "mkdir", remote(dir));
            directories.add(dir);
        }
    }
    const dependencies = files.filter(
        (f) => !["index.html", "version.json"].includes(f.name),
    );
    const uploads = dependencies.filter(
        (f) => !isHashed(f.name) || existing.get(f.name) !== f.size,
    );
    log(
        `Reusing ${dependencies.length - uploads.length} unchanged assets; uploading ${uploads.length} files.`,
    );
    let done = 0,
        transferred = 0,
        lastActivity = now();
    const active = new Map();
    const uploadBytes = uploads.reduce((sum, file) => sum + file.size, 0);
    function progress(finish = false) {
        const bytes =
            transferred + [...active.values()].reduce((sum, n) => sum + n, 0);
        const label = `Uploading ${done}/${uploads.length} files; ${mb(bytes)}/${mb(uploadBytes)}; ${Math.round((now() - started) / 1000)}s${now() - lastActivity > 30_000 ? " — waiting for server" : ""}`;
        if (interactive) {
            const ratio =
                done === uploads.length
                    ? 1
                    : Math.min(0.99, uploadBytes ? bytes / uploadBytes : 0);
            progressBar(ratio, label, output, finish);
        } else log(label + ".");
    }
    async function upload(file, atomic) {
        const destination = remote(file.name);
        const temporary = destination + "." + token + ".tmp";
        active.set(file.name, 0);
        try {
            await call(
                sftp,
                "fastPut",
                path.join(localDir, file.name),
                temporary,
                {
                    concurrency: 16,
                    step(total) {
                        active.set(file.name, total);
                        lastActivity = now();
                    },
                },
            );
            // Staging avoids leaving a truncated immutable asset after an interruption.
            if (atomic)
                await call(sftp, "ext_openssh_rename", temporary, destination);
            else await call(sftp, "rename", temporary, destination);
            transferred += file.size;
            done++;
            lastActivity = now();
        } catch (error) {
            error.message = `${file.name}: ${error.message}`;
            throw error;
        } finally {
            active.delete(file.name);
        }
    }
    if (interactive) progress();
    const timer = setInterval(progress, interactive ? 100 : 3000);
    try {
        await pool(uploads, concurrency, (f) =>
            upload(f, !isHashed(f.name) || existing.has(f.name)),
        );
    } finally {
        clearInterval(timer);
        progress(true);
    }
    async function writeState(next) {
        const temp = remote(".deploy-state." + token + ".tmp");
        await call(sftp, "writeFile", temp, JSON.stringify(next));
        await call(
            sftp,
            "ext_openssh_rename",
            temp,
            remote(".deploy-state.json"),
        );
    }
    const current = {
        id: version.id,
        retiredAt: null,
        assets: files
            .filter((f) => f.name.startsWith("assets/"))
            .map((f) => f.name),
    };
    // Record the new dependencies before the entry point becomes visible.
    state = state.filter((m) => m.id !== version.id);
    state.push(current);
    log("Recording deployment dependencies…");
    await writeState(state);
    log("Publishing index.html atomically…");
    await upload(
        files.find((f) => f.name === "index.html"),
        true,
    );
    log("Publishing version.json…");
    await upload(
        files.find((f) => f.name === "version.json"),
        true,
    );
    const publishedAt = now();
    for (const m of state)
        if (m.id !== version.id && m.retiredAt === null)
            m.retiredAt = publishedAt;
    // Persist retirement before cleanup so the grace period survives interruptions.
    await writeState(state);
    const retained = state.filter(
        (m) => m.retiredAt === null || publishedAt - m.retiredAt < retentionMs,
    );
    const keep = new Set(retained.flatMap((m) => m.assets));
    const obsolete = [...new Set(state.flatMap((m) => m.assets))].filter(
        (n) => !keep.has(n),
    );
    log(`Cleaning ${obsolete.length} expired assets (seven-day grace period)…`);
    let cleaned = 0;
    function cleanupProgress(finish = false) {
        const label = `Cleanup: ${cleaned}/${obsolete.length} expired assets removed.`;
        if (interactive)
            progressBar(
                obsolete.length ? cleaned / obsolete.length : 1,
                label,
                output,
                finish,
            );
        else log(label);
    }
    if (interactive && obsolete.length) cleanupProgress();
    const cleanupTimer = setInterval(cleanupProgress, interactive ? 100 : 3000);
    try {
        await pool(obsolete, concurrency, async (name) => {
            try {
                await call(sftp, "unlink", remote(name));
            } catch (error) {
                if (error.code !== 2) throw error;
            }
            cleaned++;
        });
    } finally {
        clearInterval(cleanupTimer);
        if (interactive && obsolete.length) cleanupProgress(true);
    }
    await writeState(retained);
    log(
        `Complete: ${uploads.length + 2} files uploaded, ${mb(transferred)}, ${Math.round((now() - started) / 1000)}s elapsed.`,
    );
}
module.exports = { deploy, pool, retentionMs };
