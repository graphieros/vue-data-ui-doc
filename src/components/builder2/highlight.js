import Prism from "prismjs";
import "prismjs/components/prism-typescript.js";

// Keep the shared markup grammar unchanged for other documentation pages.
const vueGrammar = Prism.languages.extend("markup", {
    script: {
        ...Prism.languages.markup.script,
        inside: {
            "language-typescript": {
                pattern: /[\s\S]+/,
                inside: Prism.languages.typescript,
            },
        },
    },
});

export function highlightVue(code) {
    return Prism.highlight(code, vueGrammar, "markup");
}
