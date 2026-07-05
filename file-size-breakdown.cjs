#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const SCRIPT_DIR = __dirname;
const OUTPUT_FILE = path.join(SCRIPT_DIR, "vdu-breakdown.json");
const NO_EXTENSION = "[no extension]";
const COMPOUND_EXTENSIONS = [
  ".d.cts",
  ".d.mts",
  ".d.ts",
  ".module.css",
  ".module.less",
  ".module.sass",
  ".module.scss",
  ".module.styl",
  ".tar.bz2",
  ".tar.gz",
  ".tar.lz",
  ".tar.xz",
  ".tar.zst",
  ".min.css",
  ".min.js",
];

function normalizePathSeparators(filePath) {
  return filePath.replace(/\\/g, "/");
}

function getFilePathParts(filePath) {
  const normalizedPath = normalizePathSeparators(filePath);
  const filenameWithExtension = normalizedPath.split("/").pop() || "";
  const lowerFilename = filenameWithExtension.toLowerCase();
  const compoundExtension = COMPOUND_EXTENSIONS.find((extension) =>
    lowerFilename.endsWith(extension),
  );
  const extension = compoundExtension || path.posix.extname(filenameWithExtension);

  if (!extension) {
    return {
      filename: filenameWithExtension,
      extension: NO_EXTENSION,
    };
  }

  return {
    filename: filenameWithExtension.slice(0, -extension.length),
    extension: extension.toLowerCase(),
  };
}

function stripUidSuffix(filePath) {
  const normalizedPath = normalizePathSeparators(filePath);
  const separatorIndex = normalizedPath.lastIndexOf("/");
  const directory = separatorIndex === -1 ? "" : normalizedPath.slice(0, separatorIndex);
  const filenameWithExtension =
    separatorIndex === -1 ? normalizedPath : normalizedPath.slice(separatorIndex + 1);
  const { filename, extension } = getFilePathParts(filenameWithExtension);
  const originalExtension =
    extension === NO_EXTENSION
      ? ""
      : filenameWithExtension.slice(filenameWithExtension.length - extension.length);
  const cleanFilename = filename.replace(/-[A-Za-z0-9_-]{8,10}$/, "");
  const cleanFilenameWithExtension =
    extension === NO_EXTENSION ? cleanFilename : `${cleanFilename}${originalExtension}`;
  const cleanPath = directory
    ? path.posix.join(directory, cleanFilenameWithExtension)
    : cleanFilenameWithExtension;

  return filePath.includes("\\") && !filePath.includes("/")
    ? cleanPath.replace(/\//g, "\\")
    : cleanPath;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function ensureInsideProject(targetPath) {
  const relative = path.relative(SCRIPT_DIR, targetPath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Folder must be inside the project that contains this script.");
  }
}

async function collectFiles(dirPath, rootPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath, rootPath));
      continue;
    }

    if (!entry.isFile()) continue;

    const stat = await fs.stat(entryPath);
    const relativePath = stripUidSuffix(path.relative(rootPath, entryPath));
    const { filename, extension } = getFilePathParts(relativePath);

    files.push({
      path: relativePath,
      filename,
      bytes: stat.size,
      size: formatBytes(stat.size),
      extension,
    });
  }

  return files;
}

function groupByExtension(files) {
  const extensions = new Map();

  for (const file of files) {
    const current = extensions.get(file.extension) || {
      extension: file.extension,
      files: 0,
      bytes: 0,
      size: "0 B",
    };

    current.files += 1;
    current.bytes += file.bytes;
    current.size = formatBytes(current.bytes);
    extensions.set(file.extension, current);
  }

  return [...extensions.values()].sort((a, b) => b.bytes - a.bytes);
}

function toCirclePackDataset(breakdown) {
  const filesByExtension = new Map();

  for (const file of breakdown.files || []) {
    const fileParts = getFilePathParts(file.path || "");
    const extension = file.extension || fileParts.extension;
    const files = filesByExtension.get(extension) || [];

    files.push({
      name: file.filename || fileParts.filename,
      path: file.path,
      value: file.bytes,
    });

    filesByExtension.set(extension, files);
  }

  return [...filesByExtension.entries()]
    .map(([extension, files]) => ({
      name: extension,
      value: files.reduce((sum, file) => sum + file.value, 0),
      children: files.sort((a, b) => b.value - a.value),
    }))
    .sort((a, b) => b.value - a.value);
}

async function getFileSizeBreakdown(folder = ".") {
  const targetPath = path.resolve(SCRIPT_DIR, folder);
  ensureInsideProject(targetPath);

  const stat = await fs.stat(targetPath);
  if (!stat.isDirectory()) {
    throw new Error(`Not a folder: ${folder}`);
  }

  const files = (await collectFiles(targetPath, targetPath)).sort(
    (a, b) => b.bytes - a.bytes,
  );
  const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);

  return {
    folder: path.relative(SCRIPT_DIR, targetPath) || ".",
    totalBytes,
    totalSize: formatBytes(totalBytes),
    fileCount: files.length,
    byExtension: groupByExtension(files),
    files,
  };
}

function printBreakdown(breakdown) {
  console.log(`Folder: ${breakdown.folder}`);
  console.log(`Total: ${breakdown.totalSize} across ${breakdown.fileCount} files`);
  console.log("");

  console.log("By extension:");
  console.table(
    breakdown.byExtension.map(({ extension, files, bytes, size }) => ({
      extension,
      files,
      bytes,
      size,
    })),
  );

  console.log("Files:");
  console.table(
    breakdown.files.map((file) => ({
      path: file.path,
      filename: file.filename,
      bytes: file.bytes,
      size: file.size,
    })),
  );
}

async function main() {
  const folder = process.argv[2] || ".";
  const outputJson = process.argv.includes("--json");
  const breakdown = await getFileSizeBreakdown(folder);
  await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(breakdown, null, 2)}\n`);

  if (outputJson) {
    console.log(JSON.stringify(breakdown, null, 2));
    return;
  }

  printBreakdown(breakdown);
  console.log("");
  console.log(`Saved JSON result to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = {
  formatBytes,
  getFilePathParts,
  getFileSizeBreakdown,
  toCirclePackDataset,
};
