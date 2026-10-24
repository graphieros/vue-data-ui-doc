import fs from "node:fs";
import path from "node:path";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";

// Compress written files: Vite may still finalize CSS during generateBundle.
// Original URLs and files stay unchanged; hosts opt into serving the sidecars.
export function precompressAssetsPlugin() {
    return {
        name: "precompress-assets",
        apply: "build",
        writeBundle(options, bundle) {
            for (const asset of Object.values(bundle)) {
                if (!/\.(?:js|css|json)$/.test(asset.fileName)) continue;
                const filename = path.resolve(
                    options.dir || "dist",
                    asset.fileName,
                );
                const content = fs.readFileSync(filename);
                if (content.length < 1024) continue;
                fs.writeFileSync(filename + ".gz", gzipSync(content));
                fs.writeFileSync(
                    filename + ".br",
                    brotliCompressSync(content, {
                        params: { [constants.BROTLI_PARAM_QUALITY]: 6 },
                    }),
                );
            }
        },
    };
}
