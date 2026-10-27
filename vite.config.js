import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import fs from "node:fs";

import { precompressAssetsPlugin } from "./scripts/precompress-assets.js";
import { exampleModulesPlugin } from "./scripts/example-modules.js";
import { configSearchIndexPlugin } from "./scripts/config-search-index.js";
import { typeDocumentationPlugin } from "./scripts/type-documentation.js";

const isolationHeaders = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "credentialless",
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        {
            name: "reload-maker-definitions",
            handleHotUpdate({ file, server }) {
                // Pinia retains existing state when a Vue page hot-reloads.
                // Maker models and translations are static store state, so a
                // page reload is required to initialize their updated values.
                const definitions = [
                    resolve(import.meta.dirname, "src/stores/defaultData.js"),
                    resolve(import.meta.dirname, "src/stores/maker.js"),
                    resolve(
                        import.meta.dirname,
                        "src/translations/graphMaker.js",
                    ),
                ];
                const chunks = resolve(
                    import.meta.dirname,
                    "src/stores/chunks",
                );
                if (
                    definitions.includes(file) ||
                    file.startsWith(`${chunks}/`)
                ) {
                    server.ws.send({ type: "full-reload" });
                    return [];
                }
            },
        },
        vue(),
        typeDocumentationPlugin(),
        configSearchIndexPlugin(),
        exampleModulesPlugin(),
        precompressAssetsPlugin(),
        {
            name: "copy-llms-file",
            closeBundle() {
                const src = resolve(import.meta.dirname, "llms.txt");
                const dest = resolve(import.meta.dirname, "dist", "llms.txt");
                fs.copyFileSync(src, dest);
                console.log("llms.txt copied to dist folder.");
            },
        },
    ],
    server: {
        headers: isolationHeaders,
    },
    preview: {
        headers: isolationHeaders,
    },
});
