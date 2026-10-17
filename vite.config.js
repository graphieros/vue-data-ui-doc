import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import fs from "node:fs";

import { typeDocumentationPlugin } from "./scripts/type-documentation.js";

const isolationHeaders = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "credentialless",
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        typeDocumentationPlugin(),
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
