import { useConfig } from "../src/assets/useConfig.js";

export function generateConfigSearchIndex() {
    const attributes = new Set();
    function visit(object) {
        for (const [key, value] of Object.entries(object)) {
            attributes.add(key);
            if (value !== null && typeof value === "object") visit(value);
        }
    }
    visit(useConfig());
    return [...attributes].sort();
}

export function configSearchIndexPlugin() {
    const id = "virtual:config-search-index";
    return {
        name: "config-search-index",
        resolveId(source) {
            if (source === id) return "\0" + id;
        },
        load(source) {
            if (source === "\0" + id)
                return `export default ${JSON.stringify(generateConfigSearchIndex())}`;
        },
    };
}
