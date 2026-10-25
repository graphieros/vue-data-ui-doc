import { useImportMap } from "../../useImportMap.js";

function javascriptLiteral(value) {
    return JSON.stringify(value, null, 2)
        ?.replace(/</g, "\\u003c")
        .replace(
            /^(\s*)"((?:\\.|[^"\\])*)":/gm,
            (match, indent, escapedKey) => {
                const key = JSON.parse(`"${escapedKey}"`);
                if (key === "__proto__") return `${indent}["__proto__"]:`;
                return /^[A-Za-z_$][\w$]*$/.test(key)
                    ? `${indent}${key}:`
                    : match;
            },
        );
}

export function generateCode(component, dataset, config, options) {
    const imports = useImportMap(component);
    const {
        computed: useComputed,
        vapor,
        universal,
        treeshaken,
        typescript,
    } = options;
    const factory = useComputed ? "computed" : "ref";
    const declaration = (name, value, type) => {
        const generic = typescript && type ? `<${type}>` : "";
        const literal = javascriptLiteral(value);
        return `const ${name} = ${factory}${generic}(${useComputed ? `() => (${literal})` : literal});`;
    };
    const importStatement = universal
        ? typescript
            ? imports.universalTyped
            : imports.universal
        : treeshaken
          ? typescript
              ? imports.treeshaken
              : imports.untyped
          : typescript
            ? imports.classic
            : imports.untypedNotTreeshaken;
    const configCode = declaration("config", config, imports.configType);
    const datasetCode = declaration("dataset", dataset, imports.datasetType);
    const code = `<script${vapor ? " vapor" : ""} setup${typescript ? ' lang="ts"' : ""}>\nimport { ${factory} } from 'vue';\n${importStatement}\nimport 'vue-data-ui/style.css';\n\n${configCode}\n\n${datasetCode}\n</script>\n\n<template>\n  <${universal ? "VueDataUi" : component}${universal ? ` component="${component}"` : ""} :dataset="dataset" :config="config" />\n</template>`;
    return { code, configCode, datasetCode };
}
