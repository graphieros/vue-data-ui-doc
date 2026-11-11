import { useImportMap } from "../useImportMap.js";

export const DOC_LAYOUT_TITLE = Symbol("doc-layout-title");

export function getDocHeaderName(hash) {
    if (!hash.startsWith("#vue-ui-")) return null;
    const special = {
        "#vue-ui-sparkhistogram": "VueUiSparkHistogram",
        "#vue-ui-sparkstackbar": "VueUiSparkStackbar",
    };
    const name =
        special[hash] ||
        hash
            .slice(1)
            .split("-")
            .map((part) =>
                part === "3d"
                    ? part
                    : part.charAt(0).toUpperCase() + part.slice(1),
            )
            .join("");
    return useImportMap(name) ? name : null;
}
