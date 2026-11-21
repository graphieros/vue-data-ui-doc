import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { computed, createSSRApp, h, nextTick, reactive, ref, watch } from "vue";
import {
    parse,
    compileScript,
    compileStyle,
    compileTemplate,
} from "@vue/compiler-sfc";
import { getVueDataUiConfig } from "vue-data-ui/utils";
import { CONFIG_COMPONENTS } from "../src/assets/useConfig.js";
import { useImportMap } from "../src/useImportMap.js";
import { useIconMap } from "../src/useIconMap.js";
import { docLoaders } from "../src/components/docs/registry.js";
import { configExplorerTranslations } from "../src/translations/configExplorer.js";
import { decorateSnippetRows } from "../src/components/docs/configSnippetRows.js";
import {
    configSnippet,
    configSnippetRows,
    configValueType,
    createConfigGraph,
    configBreadcrumbs,
    configBranch,
} from "../src/components/docs/configExplorer.js";
import {
    explorerQuery,
    sameExplorerQuery,
} from "../src/components/docs/configExplorerNavigation.js";

function setup(initialQuery = {}) {
    const filename = "src/components/docs/ConfigExplorer.vue";
    const { descriptor, errors } = parse(fs.readFileSync(filename, "utf8"));
    assert.deepEqual(errors, []);
    const script = compileScript(descriptor, { id: "config-explorer" });
    const template = compileTemplate({
        source: descriptor.template.content,
        filename,
        id: "config-explorer",
        compilerOptions: { bindingMetadata: script.bindings },
    });
    assert.deepEqual(template.errors, []);
    const source = descriptor.scriptSetup.content.replace(
        /^import[\s\S]*?from\s*["'][^"']+["'];?\s*$/gm,
        "",
    );
    const store = reactive({ lang: "en", isDarkMode: false });
    const route = reactive({ query: initialQuery, path: "/config-explorer" });
    const stack = [{ ...initialQuery }];
    const state = { position: 0 };
    const router = {
        options: { history: { state } },
        push({ query }) {
            stack.splice(state.position + 1);
            stack.push({ ...query });
            state.position++;
            route.query = stack[state.position];
            return Promise.resolve();
        },
        back() {
            if (state.position > 0) route.query = stack[--state.position];
        },
        forward() {
            if (state.position < stack.length - 1)
                route.query = stack[++state.position];
        },
    };
    const scope = {
        computed,
        ref,
        watch,
        nextTick,
        useRoute: () => route,
        useRouter: () => router,
        useId: () => "explorer",
        useMainStore: () => store,
        CONFIG_COMPONENTS,
        useImportMap,
        useIconMap,
        docLoaders,
        getVueDataUiConfig,
        configSnippet,
        configSnippetRows,
        createConfigGraph,
        configExplorerTranslations,
        configBreadcrumbs,
        configBranch,
        explorerQuery,
        sameExplorerQuery,
    };
    const component = new Function(
        ...Object.keys(scope),
        `${source}; return { component, components, graph, selectedId, selected, snippet, snippetRows, selectSnippetRow, selectNode, graphConfig, text, json, propertyQuery, propertyPaths, selectProperty, graphChart, drillUp, canDrillUp, drillUpLevels, labelGraph, blockZoomPan, branchOnly, graphDataset, graphKey, breadcrumbs, resetGraphView };`,
    )(...Object.values(scope));
    return { ...component, store, route, router };
}

test("branch filtering defaults on and URLs preserve an explicit opt-out", async () => {
    const state = setup();
    assert.equal(state.branchOnly.value, true);
    state.branchOnly.value = false;
    await nextTick();
    assert.equal(state.route.query.branch, "0");
    assert.equal(setup({ ...state.route.query }).branchOnly.value, false);
    state.branchOnly.value = true;
    await nextTick();
    assert.equal(state.route.query.branch, undefined);
    assert.equal(setup({ ...state.route.query }).branchOnly.value, true);
    assert.equal(setup({ branch: "1" }).branchOnly.value, true);
});

test("shared URLs restore selections and Back/Forward retain the original browser history", async () => {
    const initial = {
        component: "vue_ui_world",
        property: "config.style.chart.points.radius",
        json: "1",
        branch: "1",
        source: "docs",
    };
    const state = setup(initial);
    assert.equal(state.component.value, "vue_ui_world");
    assert.equal(state.selected.value.path, initial.property);
    assert.equal(state.json.value, true);
    assert.equal(state.branchOnly.value, true);
    state.selectProperty("config.selection");
    await nextTick();
    assert.equal(state.route.query.property, "config.selection");
    assert.equal(state.route.query.source, "docs");
    state.selectProperty("config.selection.enabled");
    await nextTick();
    state.router.back();
    await nextTick();
    assert.equal(state.selected.value.path, "config.selection");
    state.router.forward();
    await nextTick();
    assert.equal(state.selected.value.path, "config.selection.enabled");
    state.router.back();
    await nextTick();
    state.selectProperty("config.projection");
    await nextTick();
    state.router.back();
    await nextTick();
    state.router.back();
    await nextTick();
    assert.equal(state.selected.value.path, initial.property);

    const root = setup();
    root.selectProperty("config.chart.title");
    await nextTick();
    root.router.back();
    await nextTick();
    assert.equal(root.selected.value.path, "config");
    assert.deepEqual({ ...root.route.query }, {});
    const invalid = setup({
        component: "unknown",
        property: "config.not-real",
    });
    assert.equal(invalid.component.value, "vue_ui_xy");
    assert.equal(invalid.selected.value.path, "config");
});

test("property selections rebuild the graph with the same layout key as a reload", async () => {
    const state = setup();
    state.branchOnly.value = true;
    state.selectProperty("config.chart.title");
    const previous = state.graphKey.value;
    state.selectProperty("config.chart.tooltip");
    assert.notEqual(state.graphKey.value, previous);
    await nextTick();
    const reloaded = setup({ ...state.route.query });
    assert.equal(reloaded.graphKey.value, state.graphKey.value);
    assert.deepEqual(reloaded.graphDataset.value, state.graphDataset.value);
    const source = fs.readFileSync(
        "src/components/docs/ConfigExplorer.vue",
        "utf8",
    );
    assert.match(source, /<VueUiGraph\s+:key="graphKey"/);
});

test("selecting a property fits the graph before centering it", async () => {
    const state = setup();
    const calls = [];
    state.graphChart.value = {
        fitToView: () => calls.push("fit"),
        focusNode: (id) => {
            calls.push(id);
            state.selectNode({ id });
        },
    };
    const id = JSON.stringify(["chart", "title"]);
    state.selectProperty("config.chart.title");
    assert.deepEqual(calls, ["fit", id]);
    await nextTick();
    assert.equal(calls.length % 2, 0);
    for (let index = 0; index < calls.length; index += 2)
        assert.deepEqual(calls.slice(index, index + 2), ["fit", id]);
    calls.length = 0;
    state.selectSnippetRow(id);
    assert.deepEqual(calls, ["fit", id]);
});

test("breadcrumbs, branch filtering and reset preserve selection and graph integrity", () => {
    const state = setup();
    state.selectProperty("config.chart.title.subtitle.text");
    assert.deepEqual(
        state.breadcrumbs.value.map(({ label }) => label),
        ["config", "chart", "title", "subtitle", "text"],
    );
    state.selectSnippetRow(state.breadcrumbs.value[2].id);
    assert.equal(state.selected.value.path, "config.chart.title");
    state.branchOnly.value = true;
    const selected = JSON.parse(state.selected.value.id);
    for (const node of state.graphDataset.value.nodes) {
        const path = JSON.parse(node.id);
        assert.ok(
            selected.every((part, index) => path[index] === part) ||
                path.every((part, index) => selected[index] === part),
        );
    }
    assert.ok(
        state.graphDataset.value.nodes.length <
            state.graph.value.dataset.nodes.length,
    );
    const ids = new Set(state.graphDataset.value.nodes.map(({ id }) => id));
    for (const link of state.graphDataset.value.links)
        assert.ok(ids.has(link.source) && ids.has(link.target));
    assert.ok(ids.has("[]"));
    assert.ok(ids.has(state.selected.value.id));
    let resets = 0;
    state.graphChart.value = { fitToView: () => resets++ };
    const selection = state.selectedId.value;
    state.resetGraphView();
    assert.equal(resets, 1);
    assert.equal(state.selectedId.value, selection);
    state.selectSnippetRow("[]");
    assert.equal(
        state.graphDataset.value.nodes.length,
        state.graph.value.dataset.nodes.length,
    );
});

test("explorer labels cover all app languages and update without changing selected config", () => {
    const languages = fs
        .readdirSync("src/i18n/main")
        .filter((name) => name.endsWith(".json"))
        .map((name) => name.replace(".json", ""))
        .sort();
    assert.deepEqual(Object.keys(configExplorerTranslations).sort(), languages);
    function checkShape(actual, reference, path = "") {
        assert.deepEqual(
            Object.keys(actual).sort(),
            Object.keys(reference).sort(),
            path,
        );
        for (const [key, value] of Object.entries(reference)) {
            if (typeof value === "object")
                checkShape(actual[key], value, `${path}.${key}`);
            else
                assert.ok(
                    typeof actual[key] === "string" && actual[key].trim(),
                    `${path}.${key}`,
                );
        }
    }
    const state = setup();
    state.selectProperty("config.chart.title");
    let graphLabel;
    state.graphChart.value = {
        $el: {
            querySelector: () => ({
                setAttribute: (_key, value) => (graphLabel = value),
            }),
        },
    };
    const id = state.selectedId.value;
    const snippet = state.snippet.value;
    for (const language of languages) {
        const translated = configExplorerTranslations[language];
        checkShape(translated, configExplorerTranslations.en, language);
        state.store.lang = language;
        assert.equal(state.text.value.title, translated.title);
        state.labelGraph();
        assert.equal(graphLabel, translated.graphLabel);
        assert.ok(translated.levelsToRoot.includes("{count}"));
        assert.equal(
            state.graphConfig.value.a11y.translations.keyboardNavigation,
            translated.keyboardNavigation,
        );
        assert.equal(state.selectedId.value, id);
        assert.equal(state.snippet.value, snippet);
    }
});

test("zoom and pan are enabled by default and the toggle locks both interactions", () => {
    const state = setup();
    assert.equal(state.blockZoomPan.value, false);
    for (const blocked of [false, true, false]) {
        state.blockZoomPan.value = blocked;
        const { interaction } = state.graphConfig.value;
        assert.equal(interaction.zoom.enabled, !blocked);
        assert.equal(interaction.pan.enabled, !blocked);
        assert.equal(interaction.zoom.fitOnDoubleClick, !blocked);
    }
    state.blockZoomPan.value = true;
    state.component.value = "vue_ui_world";
    assert.equal(state.graphConfig.value.interaction.zoom.enabled, false);
    assert.equal(state.graphConfig.value.interaction.pan.enabled, false);
});

test("graph nodes share colors by config depth regardless of value type or branch filtering", () => {
    const graph = createConfigGraph({
        first: { number: 1, text: "value", list: [false] },
        second: { nullable: null, nested: { value: 0 } },
        enabled: true,
    });
    const colors = new Map();
    for (const node of graph.dataset.nodes) {
        const depth = JSON.parse(node.id).length;
        assert.equal(node.group, depth);
        if (colors.has(depth)) assert.equal(node.color, colors.get(depth));
        else colors.set(depth, node.color);
    }
    assert.notEqual(colors.get(0), colors.get(1));
    assert.notEqual(colors.get(1), colors.get(2));
    const branch = configBranch(graph.dataset, '["second"]');
    for (const node of branch.nodes)
        assert.equal(node.color, colors.get(JSON.parse(node.id).length));
});

test("config graph preserves complete objects, falsy leaves, arrays and unambiguous paths", () => {
    const config = {
        style: { color: "#123456", show: false, offset: 0 },
        empty: "",
        nullable: null,
        values: [1, { name: "A" }],
        "style.color": "different",
    };
    const graph = createConfigGraph(config);
    const property = (segments) =>
        graph.properties.get(JSON.stringify(segments));
    assert.equal(graph.dataset.links.length, graph.dataset.nodes.length - 1);
    assert.equal(
        new Set(graph.dataset.nodes.map(({ id }) => id)).size,
        graph.dataset.nodes.length,
    );
    assert.equal(property([]).value, config);
    assert.equal(property(["style"]).value, config.style);
    assert.equal(property(["style", "show"]).value, false);
    assert.equal(property(["style", "offset"]).value, 0);
    assert.equal(property(["nullable"]).type, "null");
    assert.equal(property(["values"]).type, "array");
    assert.equal(property(["values", 1, "name"]).path, "config.values[1].name");
    assert.equal(property(["style.color"]).path, 'config["style.color"]');
    assert.notEqual(
        property(["style.color"]).id,
        property(["style", "color"]).id,
    );
    for (const value of [
        config,
        config.style,
        false,
        0,
        "",
        null,
        config.values,
    ])
        assert.deepEqual(JSON.parse(configSnippet(value)), value);
    assert.equal(configValueType([]), "array");
});

test("JSON toggle defaults off, formats nested JS objects and preserves selected values", () => {
    const state = setup();
    assert.equal(state.json.value, false);
    state.selectNode({ id: JSON.stringify(["chart", "title"]) });
    const original = getVueDataUiConfig("vue_ui_xy").chart.title;
    assert.match(state.snippet.value, /\n\s+text:/);
    assert.deepEqual(
        new Function(`return (${state.snippet.value});`)(),
        original,
    );
    const selectedId = state.selectedId.value;
    state.json.value = true;
    assert.equal(state.selectedId.value, selectedId);
    assert.deepEqual(JSON.parse(state.snippet.value), original);
    assert.match(state.snippet.value, /"text":/);
    state.json.value = false;
    const special = JSON.parse(
        '{"normal":{"enabled":false},"with-dash":"text", "__proto__":{"safe":true},"items":[{"value":0}]}',
    );
    const snippet = configSnippet(special, false);
    assert.match(snippet, /normal:/);
    assert.match(snippet, /"with-dash":/);
    const restored = new Function(`return (${snippet});`)();
    assert.deepEqual(restored, special);
    assert.equal(Object.getPrototypeOf(restored), Object.prototype);
    for (const value of [null, false, 0, "", 'quoted "string"'])
        assert.equal(configSnippet(value, false), configSnippet(value, true));
});

test("snippet rows retain nested graph paths and focus the clicked property in either syntax", () => {
    const state = setup();
    const focused = [];
    state.graphChart.value = { focusNode: (id) => focused.push(id) };
    for (const json of [false, true]) {
        state.json.value = json;
        state.selectNode({ id: "[]" });
        assert.equal(
            state.snippetRows.value.map(({ content }) => content).join("\n"),
            state.snippet.value,
        );
        const id = JSON.stringify(["chart", "title", "subtitle", "text"]);
        const row = state.snippetRows.value.find((row) => row.id === id);
        assert.ok(row);
        state.selectSnippetRow(row.id);
        assert.equal(focused.at(-1), id);
        assert.equal(
            state.selected.value.path,
            "config.chart.title.subtitle.text",
        );
        state.selectNode({ id: JSON.stringify(["chart", "title"]) });
        assert.ok(state.snippetRows.value.some((row) => row.id === id));
    }
    const value = {
        first: { color: "red" },
        second: { color: "red" },
        list: [0, null, { color: "red" }],
        empty: {},
    };
    const rows = configSnippetRows(value, '["style"]', false);
    for (const path of [
        ["style", "first", "color"],
        ["style", "second", "color"],
        ["style", "list", 2, "color"],
        ["style", "empty"],
    ])
        assert.ok(rows.some(({ id }) => id === JSON.stringify(path)));
    for (const { key } of state.components) {
        const config = getVueDataUiConfig(key);
        for (const json of [false, true])
            assert.equal(
                configSnippetRows(config, "[]", json)
                    .map(({ content }) => content)
                    .join("\n"),
                configSnippet(config, json),
                key,
            );
    }
    const filename = "src/components/docs/ConfigSnippet.vue";
    const { descriptor } = parse(fs.readFileSync(filename, "utf8"));
    const script = compileScript(descriptor, { id: "config-snippet" });
    const template = compileTemplate({
        source: descriptor.template.content,
        filename,
        id: "config-snippet",
        compilerOptions: { bindingMetadata: script.bindings },
    });
    assert.deepEqual(template.errors, []);
});

test("snippet row decoration retains dependency syntax tokens and title", () => {
    // Minimal DOM nodes let this test check the token-preserving transformation
    // without introducing a browser dependency into the Node test suite.
    const doc = {};
    function node(type, text = "", className = "") {
        return {
            nodeType: type,
            data: text,
            className,
            childNodes: [],
            dataset: {},
            ownerDocument: doc,
            get textContent() {
                return this.nodeType === 3
                    ? this.data
                    : this.childNodes
                          .map((child) => child.textContent)
                          .join("");
            },
            appendChild(child) {
                this.childNodes.push(child);
                return child;
            },
            setAttribute() {},
            cloneNode(deep) {
                const clone = node(this.nodeType, this.data, this.className);
                if (deep)
                    this.childNodes.forEach((child) =>
                        clone.appendChild(child.cloneNode(true)),
                    );
                return clone;
            },
            querySelector(selector) {
                const name = selector.slice(1);
                for (const child of this.childNodes) {
                    if (child.className === name) return child;
                    const found = child.querySelector(selector);
                    if (found) return found;
                }
                return null;
            },
            replaceChildren(fragment) {
                this.childNodes = [...fragment.childNodes];
            },
        };
    }
    doc.createElement = () => node(1);
    doc.createTextNode = (text) => node(3, text);
    doc.createDocumentFragment = () => node(11);
    const pre = node(1);
    const title = node(1, "", "code-title");
    title.appendChild(node(3, "config"));
    pre.appendChild(title);
    pre.appendChild(node(3, "\n{\n  color: "));
    const token = node(1, "", "code-string");
    token.appendChild(node(3, '"red"'));
    pre.appendChild(token);
    pre.appendChild(node(3, "\n}"));
    decorateSnippetRows(pre, [{}, {}, {}]);
    assert.equal(pre.childNodes[0].textContent, "config");
    const rows = pre.childNodes.slice(1);
    assert.deepEqual(
        rows.map((row) => row.textContent),
        ["{", '  color: "red"', "}"],
    );
    assert.equal(rows[1].querySelector(".code-string").textContent, '"red"');
    assert.deepEqual(
        rows.map((row) => row.dataset.rowIndex),
        ["0", "1", "2"],
    );
    decorateSnippetRows(pre, [{}, {}, {}]);
    assert.equal(pre.childNodes.length, 4);

    const filename = "src/components/docs/ConfigSnippet.vue";
    const { descriptor } = parse(fs.readFileSync(filename, "utf8"));
    assert.match(descriptor.template.content, /<CodeParser/);
    assert.doesNotMatch(descriptor.scriptSetup.content, /Prism/);
    const selections = [];
    const scope = {
        ref,
        onMounted() {},
        onUpdated() {},
        defineProps: () => ({ rows: [{ id: "root" }, { id: "color" }] }),
        defineEmits: () => (_event, id) => selections.push(id),
        decorateSnippetRows,
    };
    const source = descriptor.scriptSetup.content.replace(
        /^import[\s\S]*?from\s*["'][^"']+["'];?\s*$/gm,
        "",
    );
    const snippet = new Function(
        ...Object.keys(scope),
        `${source}; return {root,selectRow};`,
    )(...Object.values(scope));
    snippet.root.value = { contains: () => true };
    const target = { closest: () => ({ dataset: { rowIndex: "1" } }) };
    snippet.selectRow({ type: "click", target });
    snippet.selectRow({
        type: "keydown",
        key: "Enter",
        target,
        preventDefault() {},
    });
    snippet.selectRow({ type: "click", target: { closest: () => null } });
    assert.deepEqual(selections, ["color", "color"]);
});

test("drill up navigates one parent at a time and is disabled at the root", () => {
    const state = setup();
    const focused = [];
    state.graphChart.value = { focusNode: (id) => focused.push(id) };
    assert.equal(state.canDrillUp.value, false);
    assert.equal(state.drillUpLevels.value, 0);
    state.drillUp();
    assert.equal(focused.length, 0);
    state.selectProperty("config.chart.title.text");
    assert.equal(state.drillUpLevels.value, 3);
    assert.equal(state.canDrillUp.value, true);
    for (const path of ["config.chart.title", "config.chart", "config"]) {
        state.drillUp();
        assert.equal(state.selected.value.path, path);
        assert.equal(state.propertyQuery.value, path);
        assert.equal(state.drillUpLevels.value, path.split(".").length - 1);
        assert.equal(focused.at(-1), state.selected.value.id);
    }
    assert.equal(state.canDrillUp.value, false);
    const count = focused.length;
    state.drillUp();
    assert.equal(focused.length, count);
    const item = [...state.graph.value.properties.values()].find(({ id }) =>
        /,0\]/.test(id),
    );
    assert.ok(item);
    state.selectProperty(item.path);
    assert.equal(state.drillUpLevels.value, JSON.parse(item.id).length);
    state.drillUp();
    assert.equal(
        state.selected.value.id,
        JSON.stringify(JSON.parse(item.id).slice(0, -1)),
    );
    state.component.value = "vue_ui_world";
    assert.equal(state.canDrillUp.value, false);
    assert.equal(state.drillUpLevels.value, 0);
});

test("property search commits selected paths and follows graph clicks and component switches", () => {
    const state = setup();
    const focused = [];
    state.graphChart.value = {
        focusNode: (id) => {
            focused.push(id);
            state.selectNode({ id });
        },
    };
    const path = "config.chart.title.text";
    assert.ok(state.propertyPaths.value.includes(path));
    state.propertyQuery.value = "title";
    assert.equal(state.selected.value.path, "config");
    state.selectProperty(path);
    assert.deepEqual(focused, [JSON.stringify(["chart", "title", "text"])]);
    assert.equal(state.propertyQuery.value, path);
    assert.equal(state.selected.value.path, path);
    state.propertyQuery.value = "not a property";
    state.selectProperty(state.propertyQuery.value);
    assert.equal(focused.length, 1);
    assert.equal(state.selected.value.path, path);
    state.selectNode({ id: JSON.stringify(["chart", "title", "text"]) });
    assert.equal(focused.length, 2);
    assert.equal(focused.at(-1), JSON.stringify(["chart", "title", "text"]));
    assert.equal(state.propertyQuery.value, path);
    state.component.value = "vue_ui_world";
    assert.equal(state.propertyQuery.value, "config");
    assert.ok(state.propertyPaths.value.includes("config.selection.enabled"));
    assert.ok(!state.propertyPaths.value.includes(path));
    state.selectProperty("config.selection.enabled");
    assert.equal(focused.at(-1), JSON.stringify(["selection", "enabled"]));
});

test("property autocomplete filters suggestions and supports keyboard selection and dismissal", async () => {
    const filename = "src/components/Base/BaseAutoComplete.vue";
    const { descriptor } = parse(fs.readFileSync(filename, "utf8"));
    const script = compileScript(descriptor, { id: "autocomplete" });
    const template = compileTemplate({
        source: descriptor.template.content,
        filename,
        id: "autocomplete",
        compilerOptions: { bindingMetadata: script.bindings },
    });
    assert.deepEqual(template.errors, []);
    const model = ref("");
    const props = {
        items: ["config", "config.style.color", "config.style.title.text"],
        maximumSuggestions: 30,
        inputId: "property",
        showOnEmpty: true,
        selectOnFocus: true,
        noResultsText: "No matches",
    };
    const selections = [];
    const scope = {
        computed,
        ref,
        nextTick,
        defineProps: () => props,
        defineModel: () => model,
        defineEmits: () => (event, value) => selections.push([event, value]),
        useMainStore: () => ({ isDarkMode: false }),
        onMounted() {},
        onBeforeUnmount() {},
        document: { getElementById: () => null },
    };
    const source = descriptor.scriptSetup.content.replace(
        /^import[\s\S]*?from\s*["'][^"']+["'];?\s*$/gm,
        "",
    );
    const input = new Function(
        ...Object.keys(scope),
        `${source}; return { suggestions, isOpen, activeIndex, handleInput, handleFocus, handleKeydown, activeDescendantId };`,
    )(...Object.values(scope));
    input.handleFocus();
    assert.deepEqual(input.suggestions.value, props.items);
    assert.equal(input.isOpen.value, true);
    model.value = "TITLE";
    input.handleInput();
    assert.deepEqual(input.suggestions.value, ["config.style.title.text"]);
    const key = (key) => ({ key, preventDefault() {} });
    await input.handleKeydown(key("ArrowDown"));
    assert.equal(input.activeDescendantId.value, "property-suggestion-0");
    await input.handleKeydown(key("Enter"));
    assert.equal(model.value, "config.style.title.text");
    assert.deepEqual(selections, [["select", model.value]]);
    assert.equal(input.isOpen.value, false);
    model.value = "nothing matches";
    input.handleInput();
    assert.equal(input.suggestions.value.length, 0);
    assert.equal(input.activeDescendantId.value, "");
    await input.handleKeydown(key("Escape"));
    assert.equal(input.isOpen.value, false);
    model.value = "";
    input.handleFocus();
    await input.handleKeydown(key("Tab"));
    assert.equal(input.isOpen.value, false);
});

test("explorer selects graph nodes and resets to full config on component changes", () => {
    const state = setup();
    state.json.value = true;
    assert.ok(state.components.length > 60);
    for (const { key } of state.components) {
        const graph = createConfigGraph(getVueDataUiConfig(key));
        assert.ok(graph.dataset.nodes.length, key);
        const ids = new Set(graph.dataset.nodes.map(({ id }) => id));
        for (const link of graph.dataset.links)
            assert.ok(ids.has(link.source) && ids.has(link.target), key);
    }
    state.selectNode({ id: JSON.stringify(["chart", "title"]) });
    assert.equal(state.selected.value.path, "config.chart.title");
    assert.deepEqual(
        JSON.parse(state.snippet.value),
        getVueDataUiConfig("vue_ui_xy").chart.title,
    );
    state.selectNode({ id: JSON.stringify(["chart", "title", "text"]) });
    assert.equal(state.snippet.value, '""');
    state.component.value = "vue_ui_world";
    assert.equal(state.selectedId.value, "[]");
    assert.equal(state.selected.value.path, "config");
    assert.deepEqual(
        JSON.parse(state.snippet.value),
        getVueDataUiConfig("vue_ui_world"),
    );
    state.selectNode({ id: JSON.stringify(["selection", "enabled"]) });
    assert.equal(state.snippet.value, "false");
    state.selectNode(null);
    assert.equal(state.selected.value.path, "config");
    const light = state.graphConfig.value;
    state.store.isDarkMode = true;
    const dark = state.graphConfig.value;
    assert.equal(light.theme, "dark");
    assert.equal(dark.theme, "dark");
    assert.equal(light.style.chart.color, dark.style.chart.color);
    assert.equal(dark.userOptions.show, false);
});

test("switching between large and small configs retains the SVG hit-testing selection path", () => {
    const state = setup();
    for (const key of [
        "vue_ui_xy",
        "vue_ui_world",
        "vue_ui_donut",
        "vue_ui_xy",
    ]) {
        state.component.value = key;
        const { dataset } = state.graph.value;
        const config = state.graphConfig.value;
        // These are the library's two conditions for batching: the explorer
        // must not fall back to per-node clicks when a config has <300 nodes.
        assert.ok(
            dataset.nodes.length > config.performance.nodeBatchThreshold,
            key,
        );
        assert.equal(config.style.chart.nodes.gradient, false);
        assert.equal(config.interaction.drag.enabled, false);
        const node = dataset.nodes.find(
            ({ metadata }) => metadata.type === "boolean",
        );
        state.selectNode(node);
        assert.equal(state.selected.value.id, node.id);
        assert.equal(
            state.snippet.value,
            configSnippet(state.graph.value.properties.get(node.id).value),
        );
    }
});

test("explorer has a standalone route and a desktop footer link next to config search", () => {
    const docs = fs.readFileSync("src/views/Docs.vue", "utf8");
    assert.ok(!docs.includes("ConfigExplorer"));
    const view = fs.readFileSync("src/views/ConfigExplorerView.vue", "utf8");
    assert.match(view, /<main[\s\S]*<ConfigExplorer\s*\/>/);
    assert.ok(view.indexOf("<h1") < view.indexOf("<ConfigExplorer"));
    assert.ok(!view.includes("<BaseCard"));
    const explorer = parse(
        fs.readFileSync("src/components/docs/ConfigExplorer.vue", "utf8"),
    ).descriptor.template.content;
    assert.match(
        explorer,
        /<BaseCard class="explorer-detail"[\s\S]*<ConfigSnippet[\s\S]*<\/BaseCard>\s*<BaseCard\s+class="explorer-map"/,
    );
    assert.ok(!explorer.includes("<h1"));
    const router = fs.readFileSync("src/router/index.js", "utf8");
    assert.match(
        router,
        /path: "\/config-explorer",[\s\S]*?import\("\.\.\/views\/ConfigExplorerView.vue"\)/,
    );
    const footer = parse(
        fs.readFileSync("src/components/BaseFooter.vue", "utf8"),
    ).descriptor.template.content;
    assert.match(
        footer,
        /<DeepSearch[^>]*\/>\s*<RouterLink\s+v-if="route.name !== 'Config explorer'"\s+to="\/config-explorer"\s+class="hidden [^"]*md:inline-flex"/,
    );
});

test("dark theme surface variables override light values on the explorer itself", () => {
    const filename = "src/components/docs/ConfigExplorer.vue";
    const { descriptor } = parse(fs.readFileSync(filename, "utf8"));
    const { code, errors } = compileStyle({
        source: descriptor.styles[0].content,
        filename,
        id: "data-v-explorer-theme",
        scoped: true,
    });
    assert.deepEqual(errors, []);
    assert.match(
        code,
        /\.config-explorer\[data-v-explorer-theme\]\s*\{[^}]*--explorer-surface: #f3f4f6/,
    );
    assert.match(
        code,
        /\.dark \.config-explorer\[data-v-explorer-theme\]\s*\{[^}]*--explorer-surface: #2a2a2a/,
    );
    assert.doesNotMatch(code, /(?:^|\n)\.dark\s*\{/);
    const state = setup();
    assert.equal(
        state.graphConfig.value.style.chart.backgroundColor,
        "transparent",
    );
    state.store.isDarkMode = true;
    assert.equal(
        state.graphConfig.value.style.chart.backgroundColor,
        "transparent",
    );
});

test("VueUiGraph initializes with the full config dataset in both themes", async () => {
    const { renderToString } = await import("vue/server-renderer");
    const { VueUiGraph } = await import("vue-data-ui/vue-ui-graph");
    const state = setup();
    for (const dark of [false, true]) {
        state.store.isDarkMode = dark;
        const html = await renderToString(
            createSSRApp({
                render: () =>
                    h(VueUiGraph, {
                        dataset: state.graph.value.dataset,
                        config: state.graphConfig.value,
                    }),
            }),
        );
        // Graph layout starts on mount; SSR verifies chart setup and its accessible shell.
        assert.ok(html.includes('class="vue-ui-graph'));
        assert.ok(html.includes("<svg"));
        assert.ok(html.includes("Use arrow keys to navigate nodes"));
        assert.ok(!html.includes("NaN"));
    }
});
