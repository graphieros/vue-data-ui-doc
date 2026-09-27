#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const { pipeline } = require("node:stream/promises");
const { Readable } = require("node:stream");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const execFileAsync = promisify(execFile);

const PACKAGE_NAME = "vue-data-ui";
const REGISTRY_URL = `https://registry.npmjs.org/${encodeURIComponent(PACKAGE_NAME)}`;
const OUTPUT_FILE = path.resolve(
    process.cwd(),
    process.argv[2] || "vue-data-ui-size-history.json",
);
const CONCURRENCY = Math.max(1, Number(process.env.CONCURRENCY) || 4);

function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return null;
    if (bytes === 0) return "0 B";

    const units = ["B", "KB", "MB", "GB", "TB"];
    const exponent = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        units.length - 1,
    );
    const value = bytes / 1024 ** exponent;

    return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

async function collectTotalSize(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    let totalBytes = 0;
    let fileCount = 0;

    for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            const child = await collectTotalSize(entryPath);
            totalBytes += child.totalBytes;
            fileCount += child.fileCount;
            continue;
        }

        if (!entry.isFile()) continue;

        const stat = await fs.stat(entryPath);
        totalBytes += stat.size;
        fileCount += 1;
    }

    return { totalBytes, fileCount };
}

async function fetchJson(url) {
    const response = await fetch(url, {
        headers: {
            accept: "application/json",
            "user-agent": "vue-data-ui-size-history-script",
        },
    });

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} for ${url}`);
    }

    return response.json();
}

async function download(url, destination) {
    const response = await fetch(url, {
        headers: {
            "user-agent": "vue-data-ui-size-history-script",
        },
    });

    if (!response.ok || !response.body) {
        throw new Error(`${response.status} ${response.statusText} for ${url}`);
    }

    await pipeline(
        Readable.fromWeb(response.body),
        require("node:fs").createWriteStream(destination),
    );
}

async function measureVersion(version, packageMetadata, publishedAt) {
    const tarballUrl = packageMetadata?.dist?.tarball;

    if (!tarballUrl) {
        throw new Error(`No tarball URL found for ${PACKAGE_NAME}@${version}`);
    }

    const tempDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "vue-data-ui-size-"),
    );
    const tarballPath = path.join(tempDir, "package.tgz");
    const extractDir = path.join(tempDir, "extracted");

    try {
        await fs.mkdir(extractDir, { recursive: true });
        await download(tarballUrl, tarballPath);

        await execFileAsync("tar", ["-xzf", tarballPath, "-C", extractDir], {
            maxBuffer: 20 * 1024 * 1024,
        });

        const packageDir = path.join(extractDir, "package");
        const { totalBytes, fileCount } = await collectTotalSize(packageDir);
        const tarballStat = await fs.stat(tarballPath);

        const result = {
            version,
            totalBytes,
            totalSize: formatBytes(totalBytes),
            fileCount,
            tarballBytes: tarballStat.size,
            tarballSize: formatBytes(tarballStat.size),
            publishedAt: publishedAt || null,
        };

        if (Number.isFinite(packageMetadata?.dist?.unpackedSize)) {
            result.registryUnpackedBytes = packageMetadata.dist.unpackedSize;
        }

        if (packageMetadata?.dist?.shasum) {
            result.shasum = packageMetadata.dist.shasum;
        }

        if (packageMetadata?.dist?.integrity) {
            result.integrity = packageMetadata.dist.integrity;
        }

        if (packageMetadata?.license) {
            result.license = packageMetadata.license;
        }

        if (packageMetadata?.engines?.node) {
            result.node = packageMetadata.engines.node;
        }

        if (packageMetadata?.deprecated) {
            result.deprecated = packageMetadata.deprecated;
        }

        return result;
    } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
    }
}

async function runWithConcurrency(items, worker, concurrency) {
    const results = Array.from({ length: items.length });
    let nextIndex = 0;

    async function runWorker() {
        while (true) {
            const index = nextIndex++;
            if (index >= items.length) return;
            results[index] = await worker(items[index], index);
        }
    }

    await Promise.all(
        Array.from({ length: Math.min(concurrency, items.length) }, runWorker),
    );

    return results;
}

async function main() {
    console.log(`Fetching all published versions of ${PACKAGE_NAME}...`);
    const packument = await fetchJson(REGISTRY_URL);

    const versions = Object.keys(packument.versions || {}).sort((a, b) => {
        const aTime = Date.parse(packument.time?.[a] || "") || 0;
        const bTime = Date.parse(packument.time?.[b] || "") || 0;
        return aTime - bTime;
    });

    if (versions.length === 0) {
        throw new Error(`No published versions found for ${PACKAGE_NAME}`);
    }

    console.log(
        `Measuring ${versions.length} versions with concurrency ${CONCURRENCY}...`,
    );

    let completed = 0;
    const results = await runWithConcurrency(
        versions,
        async (version) => {
            try {
                const result = await measureVersion(
                    version,
                    packument.versions[version],
                    packument.time?.[version],
                );

                completed += 1;
                console.log(
                    `[${completed}/${versions.length}] ${version}: ${result.totalSize}`,
                );
                return result;
            } catch (error) {
                completed += 1;
                console.error(
                    `[${completed}/${versions.length}] ${version}: FAILED - ${error.message}`,
                );

                return {
                    version,
                    totalBytes: null,
                    totalSize: null,
                    publishedAt: packument.time?.[version] || null,
                    error: error.message,
                };
            }
        },
        CONCURRENCY,
    );

    const output = {
        package: PACKAGE_NAME,
        generatedAt: new Date().toISOString(),
        versionCount: results.length,
        successfulCount: results.filter((result) => !result.error).length,
        failedCount: results.filter((result) => result.error).length,
        versions: results,
    };

    await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

    console.log(`\nSaved ${results.length} version results to:`);
    console.log(OUTPUT_FILE);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
