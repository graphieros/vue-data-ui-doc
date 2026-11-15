import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
const { deploy, retentionMs } = createRequire(import.meta.url)(
    "../scripts/deploy.cjs",
);

function server(initial = {}) {
    const data = new Map(Object.entries(initial));
    const events = [];
    let active = 0,
        peak = 0;
    const sftp = {
        readdir(dir, cb) {
            const names = new Map();
            for (const [name, content] of data) {
                if (!name.startsWith(dir + "/")) continue;
                const relative = name.slice(dir.length + 1);
                const part = relative.split("/")[0];
                const directory = relative.includes("/");
                names.set(part, {
                    filename: part,
                    attrs: {
                        size: Buffer.byteLength(content),
                        isDirectory: () => directory,
                    },
                });
            }
            cb(null, [...names.values()]);
        },
        mkdir(_dir, cb) {
            cb(null);
        },
        readFile(name, cb) {
            if (data.has(name)) cb(null, data.get(name));
            else cb(Object.assign(new Error("missing"), { code: 2 }));
        },
        writeFile(name, content, cb) {
            data.set(name, content);
            events.push(["write", name]);
            cb(null);
        },
        fastPut(local, remote, options, cb) {
            events.push(["upload", remote]);
            active++;
            peak = Math.max(active, peak);
            setTimeout(async () => {
                try {
                    if (sftp.fail && remote.includes(sftp.fail))
                        throw new Error("connection interrupted");
                    const content = await readFile(local);
                    options.step(content.length);
                    data.set(remote, content);
                    active--;
                    cb(null);
                } catch (error) {
                    active--;
                    cb(error);
                }
            }, 5);
        },
        rename(from, to, cb) {
            events.push(["rename", to]);
            data.set(to, data.get(from));
            data.delete(from);
            cb(null);
        },
        ext_openssh_rename(from, to, cb) {
            sftp.rename(from, to, cb);
        },
        unlink(name, cb) {
            events.push(["unlink", name]);
            data.delete(name);
            cb(null);
        },
    };
    return { data, events, sftp, peak: () => peak };
}
async function fixture(run) {
    const root = await mkdtemp(path.join(tmpdir(), "vdu-publish-"));
    try {
        await mkdir(path.join(root, "assets"));
        const files = {
            "index.html": "<html>new</html>",
            "version.json": '{"id":"new-build"}',
            ".htaccess": "do not publish this",
            "assets/chart-abcdefgh.js": "chart",
            "assets/docs-ijklmnop.js": "docs",
            "assets/shared-qrstuvwx.js": "shared",
        };
        for (const [name, value] of Object.entries(files))
            await writeFile(path.join(root, name), value);
        await run(root);
    } finally {
        await rm(root, { recursive: true, force: true });
    }
}
test("uploads concurrently, reuses hashed assets and publishes HTML after dependencies", () =>
    fixture(async (root) => {
        const mock = server({
            "/site/index.html": "old",
            "/site/.htaccess": "host rules",
            "/site/api/index.php": "backend",
            "/site/assets/shared-qrstuvwx.js": "shared",
        });
        const logs = [];
        await deploy(mock.sftp, root, "/site", {
            log: (line) => logs.push(line),
        });
        assert.ok(mock.peak() >= 2);
        assert.equal(
            mock.events.some(
                ([op, n]) => op === "upload" && n.includes("shared-qrstuvwx"),
            ),
            false,
        );
        const renames = mock.events
            .filter(([op]) => op === "rename")
            .map(([, n]) => n);
        const index = renames.indexOf("/site/index.html");
        assert.ok(renames.indexOf("/site/assets/chart-abcdefgh.js") < index);
        assert.ok(renames.indexOf("/site/assets/docs-ijklmnop.js") < index);
        assert.ok(renames.indexOf("/site/version.json") > index);
        assert.equal(mock.data.get("/site/.htaccess"), "host rules");
        assert.equal(mock.data.get("/site/api/index.php"), "backend");
        assert.ok(logs.some((l) => l.includes("Reusing 1 unchanged")));
        assert.ok(logs.some((l) => l.includes("Uploading 2/2")));
        assert.ok(logs.at(-1).startsWith("Complete:"));
    }));
test("interrupted upload leaves old entry point and no partially published asset", () =>
    fixture(async (root) => {
        const mock = server({ "/site/index.html": "old" });
        mock.sftp.fail = "chart-abcdefgh";
        await assert.rejects(
            deploy(mock.sftp, root, "/site", { log() {} }),
            /chart-abcdefgh.*interrupted/,
        );
        assert.equal(mock.data.get("/site/index.html"), "old");
        assert.equal(mock.data.has("/site/assets/chart-abcdefgh.js"), false);
        assert.equal(
            mock.events.some(([op]) => op === "unlink"),
            false,
        );
    }));
test("cleanup respects retirement grace period, shared dependencies and unknown files", () =>
    fixture(async (root) => {
        const state = [
            {
                id: "expired",
                retiredAt: 0,
                assets: [
                    "assets/expired-12345678.js",
                    "assets/shared-qrstuvwx.js",
                ],
            },
            {
                id: "previous",
                retiredAt: null,
                assets: ["assets/previous-12345678.js"],
            },
        ];
        const mock = server({
            "/site/.deploy-state.json": JSON.stringify(state),
            "/site/assets/expired-12345678.js": "expired",
            "/site/assets/shared-qrstuvwx.js": "shared",
            "/site/assets/previous-12345678.js": "previous",
            "/site/assets/unknown-12345678.js": "unknown",
        });
        const time = retentionMs * 10;
        await deploy(mock.sftp, root, "/site", { log() {}, now: () => time });
        assert.equal(mock.data.has("/site/assets/expired-12345678.js"), false);
        for (const name of [
            "shared-qrstuvwx",
            "previous-12345678",
            "unknown-12345678",
        ])
            assert.ok(mock.data.has("/site/assets/" + name + ".js"));
        const saved = JSON.parse(mock.data.get("/site/.deploy-state.json"));
        assert.equal(saved.find((m) => m.id === "previous").retiredAt, time);
        assert.equal(saved.find((m) => m.id === "new-build").retiredAt, null);
    }));
test("a repeat publication skips all existing hashed files", () =>
    fixture(async (root) => {
        const mock = server();
        await deploy(mock.sftp, root, "/site", { log() {} });
        mock.events.length = 0;
        await deploy(mock.sftp, root, "/site", { log() {} });
        assert.equal(mock.events.filter(([op]) => op === "upload").length, 2);
    }));
