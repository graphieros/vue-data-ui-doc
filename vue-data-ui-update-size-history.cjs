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

function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) {
        return null;
    }

    if (bytes === 0) {
        return "0 B";
    }

    const units = ["B", "KB", "MB", "GB", "TB"];

    const exponent = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        units.length - 1,
    );

    const value = bytes / 1024 ** exponent;

    return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
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

    const fsSync = require("node:fs");

    await pipeline(
        Readable.fromWeb(response.body),
        fsSync.createWriteStream(destination),
    );
}

async function collectTotalSize(dirPath) {
    const entries = await fs.readdir(dirPath, {
        withFileTypes: true,
    });

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

        if (!entry.isFile()) {
            continue;
        }

        const stat = await fs.stat(entryPath);

        totalBytes += stat.size;
        fileCount += 1;
    }

    return {
        totalBytes,
        fileCount,
    };
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
        await fs.mkdir(extractDir, {
            recursive: true,
        });

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
        await fs.rm(tempDir, {
            recursive: true,
            force: true,
        });
    }
}

function isStableVersion(version) {
    return /^\d+\.\d+\.\d+$/.test(version);
}

function getLatestStableVersion(packument) {
    const versions = Object.keys(packument.versions || {})
        .filter(isStableVersion)
        .sort((a, b) => {
            const aTime = Date.parse(packument.time?.[a] || "") || 0;

            const bTime = Date.parse(packument.time?.[b] || "") || 0;

            return bTime - aTime;
        });

    return versions[0];
}

async function readHistory() {
    try {
        const content = await fs.readFile(OUTPUT_FILE, "utf8");

        return JSON.parse(content);
    } catch (error) {
        if (error.code === "ENOENT") {
            throw new Error(`History file does not exist: ${OUTPUT_FILE}`);
        }

        throw error;
    }
}

async function main() {
    console.log(`Fetching ${PACKAGE_NAME} metadata...`);

    const packument = await fetchJson(REGISTRY_URL);

    const version = getLatestStableVersion(packument);

    if (!version) {
        throw new Error(`No stable version found for ${PACKAGE_NAME}`);
    }

    console.log(`Latest stable version: ${version}`);

    const history = await readHistory();

    if (!Array.isArray(history.versions)) {
        throw new Error(`${OUTPUT_FILE} does not contain a versions array`);
    }

    const alreadyExists = history.versions.some(
        (entry) => entry.version === version,
    );

    if (alreadyExists) {
        console.log(`${PACKAGE_NAME}@${version} already exists in history.`);

        return;
    }

    console.log(`Measuring ${PACKAGE_NAME}@${version}...`);

    const result = await measureVersion(
        version,
        packument.versions[version],
        packument.time?.[version],
    );

    history.versions.push(result);

    history.generatedAt = new Date().toISOString();
    history.versionCount = history.versions.length;

    history.successfulCount = history.versions.filter(
        (entry) => !entry.error,
    ).length;

    history.failedCount = history.versions.filter(
        (entry) => entry.error,
    ).length;

    await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(history, null, 2)}\n`);

    console.log(`Added ${version}: ${result.totalSize}`);

    console.log(`Updated ${OUTPUT_FILE}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
