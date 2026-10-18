// Evaluate only trusted, local demo initializers; never mount the app or run lifecycle hooks.
import fs from "node:fs";
import { useDocConfigState } from "../../src/useDocConfigState.js";
import ts from "typescript";
import { ref, computed } from "vue";
import { getVueDataUiConfig } from "vue-data-ui/utils";

const proxy = new Proxy(function () {}, {
    get: (_target, key) =>
        key === "toJSON"
            ? () => null
            : ["en", "fr", "value"].includes(key)
              ? key === "value"
                  ? proxy
                  : "Translated"
              : key === Symbol.toPrimitive
                ? () => "Translated"
                : proxy,
    apply: () => proxy,
});

export function evaluatePage(source, darkMode = false) {
    const text = source.slice(
        source.indexOf("<script setup") +
            source.slice(source.indexOf("<script setup")).indexOf(">") +
            1,
        source.indexOf("</script>"),
    );
    const sf = ts.createSourceFile("doc.js", text, 99, true);
    const defs = new Map(),
        functions = new Set();
    for (const statement of sf.statements) {
        if (ts.isVariableStatement(statement))
            for (const d of statement.declarationList.declarations)
                if (ts.isIdentifier(d.name))
                    defs.set(d.name.text, d.initializer?.getText(sf));
        if (ts.isFunctionDeclaration(statement))
            functions.add(statement.name.text);
    }
    const cache = {
        ref,
        useDocConfigState,
        computed,
        JSON,
        Math,
        Array,
        Object,
        Number,
        String,
        Boolean,
        Date,
        parseFloat,
        parseInt,
        Infinity,
        undefined,
        NaN,
        getVueDataUiConfig,
        FRANCE: JSON.parse(
            fs.readFileSync(
                new URL("../../src/resources/FRANCE.json", import.meta.url),
                "utf8",
            ),
        ),
        COLOR_PICKER_PALETTE: [],
        useConfig: () =>
            new Proxy({}, { get: (_, key) => getVueDataUiConfig(key) }),
        useMainStore: () => ({
            isDarkMode: darkMode,
            lang: "en",
            locales: ["en", "fr"],
            translations: proxy,
        }),
        useRouter: () => ({ push() {} }),
    };
    const resolving = new Set();
    let scope;
    const get = (name) => {
        if (name === Symbol.unscopables) return undefined;
        if (Object.hasOwn(cache, name)) return cache[name];
        if (functions.has(name))
            return (cache[name] = (...args) => ({ handler: name, args }));
        if (!defs.has(name)) throw Error("Unknown dependency " + String(name));
        if (resolving.has(name)) throw Error("Circular " + String(name));
        resolving.add(name);
        try {
            return (cache[name] = new Function(
                "scope",
                `with(scope){return (${defs.get(name)})}`,
            )(scope));
        } finally {
            resolving.delete(name);
        }
    };
    scope = new Proxy({}, { has: () => true, get: (_, name) => get(name) });
    return { get, scope };
}
