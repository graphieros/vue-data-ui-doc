import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import fs from "fs";

const isolationHeaders = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "credentialless",
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        {
            name: "copy-llms-file",
            closeBundle() {
                const src = resolve(__dirname, "llms.txt");
                const dest = resolve(__dirname, "dist", "llms.txt");
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
