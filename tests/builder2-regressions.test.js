import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import * as vue from "vue";
import { parse, compileScript } from "@vue/compiler-sfc";
import { defaultDataHill } from "../src/stores/chunks/defaultDataHill.js";
import { defaultDataStackbar } from "../src/stores/chunks/defaultDataStackbar.js";
import * as graph from "../src/components/docs/graph.js";
import * as graphMaker from "../src/components/maker/graphMaker.js";
import * as datasetHelpers from "../src/components/builder2/dataset.js";
import * as configHelpers from "../src/components/builder2/config.js";
import { convertArrayToObject } from "../src/components/maker/lib.js";
import { catalog } from "../src/components/builder2/catalog.js";
import { datasetOptions } from "../src/components/builder2/datasetOptions.js";
import { generateCode } from "../src/components/builder2/code.js";

// Execute trusted local setup code with real Vue reactivity and in-memory storage.
function evaluate(source, scope, result) {
    const ast = ts.createSourceFile(
        "fixture.js",
        source,
        ts.ScriptTarget.Latest,
        true,
    );
    const body = ast.statements
        .filter((node) => !ts.isImportDeclaration(node))
        .map((node) => node.getText(ast))
        .join("\n")
        .replaceAll("export ", "");
    return new Function(...Object.keys(scope), `${body}\nreturn ${result};`)(
        ...Object.values(scope),
    );
}
const rawDefaults = evaluate(
    fs.readFileSync("src/stores/defaultData.js", "utf8"),
    {
        defineStore: (_name, options) => options.state,
        defaultDataHill,
        defaultDataStackbar,
    },
    "useDefaultDataStore()",
);
const builderDefaults = evaluate(
    fs.readFileSync("src/components/builder2/defaults.js", "utf8"),
    { ...datasetHelpers, ...graph, ...graphMaker },
    "builderDefaults",
);

function maker(component) {
    const source = parse(fs.readFileSync("src/views/Maker2.vue", "utf8"))
        .descriptor.scriptSetup.content;
    const route = vue.reactive({ query: component ? { component } : {} });
    const storage = new Map();
    const scope = vue.effectScope();
    const api = scope.run(() =>
        evaluate(
            source.replace(
                /const thumbs = import.meta.glob\([\s\S]*?\n\}\);/,
                "",
            ),
            {
                ref: vue.ref,
                computed: vue.computed,
                watch: vue.watch,
                ...datasetHelpers,
                ...configHelpers,
                catalog,
                datasetOptions,
                builderDefaults,
                convertArrayToObject,
                useBuilderTranslations: () => (key) => key,
                useMainStore: () => ({
                    isDarkMode: false,
                    lang: "en",
                    translations: {},
                }),
                useRoute: () => route,
                useDefaultDataStore: () => rawDefaults,
                useMakerStore: () => ({ translations: { labels: {} } }),
                localStorage: {
                    getItem: (key) => storage.get(key) ?? null,
                    setItem: (key, value) => storage.set(key, value),
                },
            },
            "({selected,dataset,model,jsonMode,jsonDraft,jsonError,reset,editJson,applyJson,config,largePreviewConfig,revision})",
        ),
    );
    return { ...api, route, storage, stop: () => scope.stop() };
}

test("docs routing selects the requested chart and saved drafts survive chart switches", async () => {
    const state = maker("VueUiDonut");
    try {
        assert.equal(state.selected.value, "vue_ui_donut");
        state.dataset.value[0].name = "Saved custom name";
        state.route.query.component = "VueUiXy";
        await vue.nextTick();
        assert.equal(state.selected.value, "vue_ui_xy");
        state.route.query.component = "VueUiDonut";
        await vue.nextTick();
        assert.equal(state.dataset.value[0].name, "Saved custom name");
        state.route.query.component = "not-a-component";
        await vue.nextTick();
        assert.equal(state.selected.value, "vue_ui_donut");
    } finally {
        state.stop();
    }
});

test("restoring an example closes JSON editing and clears stale edits and errors", () => {
    const state = maker("VueUiDonut");
    try {
        state.editJson();
        state.jsonDraft.value = "invalid json";
        state.applyJson();
        assert.ok(state.jsonError.value);
        state.reset();
        assert.equal(state.jsonMode.value, false);
        assert.equal(state.jsonDraft.value, "");
        assert.equal(state.jsonError.value, "");
        assert.deepEqual(state.dataset.value, rawDefaults.vue_ui_donut.dataset);
    } finally {
        state.stop();
    }
});

test("large-preview tooltip targeting does not modify the editable or exported config", () => {
    const state = maker("VueUiXy");
    try {
        const original = JSON.stringify(state.config.value);
        assert.equal(
            state.largePreviewConfig.value.chart.tooltip.teleportTo,
            "#builder-large-preview",
        );
        assert.equal(JSON.stringify(state.config.value), original);
    } finally {
        state.stop();
    }
});

test("every catalog chart loads and produces compilable JavaScript and TypeScript components", () => {
    const defaults = builderDefaults(rawDefaults, false, "en");
    for (const chart of catalog) {
        const example = defaults[chart.key];
        assert.ok(example && Array.isArray(example.model), chart.name);
        for (const typescript of [false, true]) {
            const { code } = generateCode(
                chart.name,
                datasetHelpers.chartDataset(chart.key, example.dataset),
                convertArrayToObject(example.model),
                { computed: true, treeshaken: true, typescript },
            );
            const { descriptor, errors } = parse(code);
            assert.deepEqual(errors, [], chart.name);
            compileScript(descriptor, { id: chart.key });
        }
    }
});

test("exported string values cannot terminate the Vue script block", () => {
    const text = "</script><template>literal text</template>";
    const { code, datasetCode } = generateCode(
        "VueUiDonut",
        [{ name: text, values: [1] }],
        {},
        { computed: false, treeshaken: true },
    );
    const { descriptor, errors } = parse(code);
    assert.deepEqual(errors, []);
    compileScript(descriptor, { id: "escaped-export" });
    const data = new Function("ref", `${datasetCode}; return dataset;`)(
        (value) => value,
    );
    assert.equal(data[0].name, text);
});
