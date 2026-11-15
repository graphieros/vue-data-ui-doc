import { randomUUID } from "node:crypto";
export function buildVersionPlugin() {
    const id = randomUUID();
    return {
        name: "build-version",
        config() {
            return { define: { __BUILD_ID__: JSON.stringify(id) } };
        },
        generateBundle() {
            this.emitFile({
                type: "asset",
                fileName: "version.json",
                source: JSON.stringify({ id }),
            });
        },
    };
}
