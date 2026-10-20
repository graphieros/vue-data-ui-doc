import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getVueDataUiConfig } from "vue-data-ui/utils";
import {
    graphDataset,
    createGraphConfig,
    graphConfigLeaves,
} from "../src/components/docs/graph.js";
import { convertArrayToObject } from "../src/components/maker/lib.js";

test("graph examples use unique ids and valid link endpoints", () => {
    const ids = new Set(graphDataset.nodes.map((node) => node.id));
    assert.equal(ids.size, graphDataset.nodes.length);
    for (const link of graphDataset.links) {
        assert.ok(ids.has(link.source));
        assert.ok(ids.has(link.target));
    }
});

test("doc dark mode and edits never mutate library defaults or other graph presets", () => {
    const baseline = structuredClone(getVueDataUiConfig("vue_ui_graph"));
    const dark = createGraphConfig(true);
    assert.deepEqual(getVueDataUiConfig("vue_ui_graph"), baseline);
    const light = createGraphConfig(false);
    const lightSnapshot = structuredClone(light);
    dark.style.chart.nodes.labels.color = "#FF0000";
    dark.style.chart.controls.backgroundColor = "#FF0000";
    dark.style.chart.title.text = "Edited demo";
    dark.tooltip.color = "#FF0000";
    dark.table.th.color = "#FF0000";
    dark.customPalette.push("#FF0000");
    assert.deepEqual(getVueDataUiConfig("vue_ui_graph"), baseline);
    assert.deepEqual(light, lightSnapshot);
});

test("graph presets are independent and readable in both themes", () => {
    const light = createGraphConfig();
    const dark = createGraphConfig(true);
    assert.notEqual(
        light.style.chart.backgroundColor,
        dark.style.chart.backgroundColor,
    );
    assert.equal(dark.style.chart.nodes.labels.color, dark.style.chart.color);
    assert.equal(
        dark.tooltip.backgroundColor,
        dark.style.chart.backgroundColor,
    );
    dark.layout.chargeStrength = -999;
    assert.notEqual(createGraphConfig(true).layout.chargeStrength, -999);
});

test("maker scalar controls reconstruct graph settings including negative charge", () => {
    const defaults = createGraphConfig();
    const leaves = graphConfigLeaves(defaults);
    const model = leaves.map(({ path, value }) => ({ key: path, def: value }));
    const config = convertArrayToObject(model);
    assert.equal(config.layout.chargeStrength, defaults.layout.chargeStrength);
    assert.deepEqual(config.interaction, defaults.interaction);
    assert.deepEqual(config.performance, defaults.performance);
    assert.equal(new Set(leaves.map((leaf) => leaf.path)).size, leaves.length);
});

test("graph schema matches the documented public events and methods", () => {
    const schema = JSON.parse(
        fs.readFileSync(new URL("../src/schema/index.json", import.meta.url)),
    ).vue_ui_graph;
    assert.equal(schema.types.dataset, "VueUiGraphDataset");
    assert.ok(schema.emits.some((event) => event.name === "selectNode"));
    assert.ok(schema.exposed.some((method) => method.name === "focusNode"));
    assert.ok(
        !schema.exposed.some((method) => method.name === "switchOrientation"),
    );
});

test("generic graph stays connected with seven nodes per group", () => {
    const groups = new Map();
    for (const node of graphDataset.nodes) {
        groups.set(node.group, (groups.get(node.group) ?? 0) + 1);
    }
    for (const [group, count] of groups) {
        assert.equal(count, 7, `${group} contains ${count} nodes`);
    }
    assert.equal(graphDataset.links.length, graphDataset.nodes.length - 1);
    const reachable = new Set(["A"]);
    let previousSize;
    do {
        previousSize = reachable.size;
        for (const link of graphDataset.links) {
            if (reachable.has(link.source)) reachable.add(link.target);
        }
    } while (reachable.size !== previousSize);
    assert.equal(reachable.size, graphDataset.nodes.length);
});

test("every graph numeric control passes explicit valid bounds to the input", async () => {
    const { createVueUiGraphConfigFields } =
        await import("../src/components/docs/configuration/vue-ui-graph-config.js");
    const { getConfigControlProps } =
        await import("../src/components/docs/configuration/configFields.js");
    const flatten = (fields) =>
        fields.flatMap((field) =>
            field.children ? flatten(field.children) : [field],
        );
    const fields = flatten(createVueUiGraphConfigFields()).filter(
        (field) => field.type === "number",
    );
    assert.ok(fields.length > 0);
    for (const field of fields) {
        const props = getConfigControlProps(field);
        assert.ok(Number.isFinite(props.min), `${field.attr}: min`);
        assert.ok(Number.isFinite(props.max), `${field.attr}: max`);
        assert.ok(props.min < props.max, `${field.attr}: ordered bounds`);
        assert.ok(props.step > 0, `${field.attr}: step`);
        const value = JSON.parse(field.defaultVal);
        assert.ok(
            value >= props.min && value <= props.max,
            `${field.attr}: default within bounds`,
        );
    }
    for (const name of ["paddingLeft", "paddingRight"]) {
        const field = fields.find(
            (field) => field.attr === `style.chart.title.${name}`,
        );
        assert.ok(field, name);
        const { min, max, step } = getConfigControlProps(field);
        assert.deepEqual({ min, max, step }, { min: 0, max: 100, step: 1 });
    }
});

test("shared API cards preserve graph event payloads and required method arguments", async () => {
    const { computed } = await import("vue");
    const { getEmitType } = await import("../src/emit-mapping.js");
    const renderScript = (file, props, result) => {
        const source = fs.readFileSync(
            new URL(`../src/components/${file}`, import.meta.url),
            "utf8",
        );
        const script = source
            .split("<script setup>")[1]
            .split("</script>")[0]
            .replace(/^import .*;$/gm, "");
        return new Function(
            "computed",
            "defineProps",
            "getEmitType",
            `${script}\nreturn ${result}.value;`,
        )(computed, () => props, getEmitType);
    };
    const event = (name) =>
        renderScript(
            "BaseComponentEmit.vue",
            { component: "VueUiGraph", name },
            "contentScript",
        );
    assert.match(event("zoomReset"), /args: VueUiGraphViewport/);
    assert.match(event("selectNode"), /args: VueUiGraphNode \| null/);
    assert.match(event("layoutEnd"), /args: VueUiGraphDataset/);
    assert.match(event("layoutStart"), /function layoutStart\(\)/);
    // Other charts keep the existing argument-free zoom reset example.
    assert.match(
        renderScript(
            "BaseComponentEmit.vue",
            { component: "VueUiXy", name: "zoomReset" },
            "contentScript",
        ),
        /function zoomReset\(\)/,
    );
    const method = (name) =>
        renderScript(
            "BaseExposedMethod.vue",
            { component: "VueUiGraph", name },
            "content",
        );
    assert.match(method("focusNode"), /focusNode\("A"\)/);
    assert.match(method("toggleFullscreen"), /toggleFullscreen\(true\)/);
});

test("graph slot examples compile and use the graph-specific scopes", async () => {
    const { graphSlotSnippets } =
        await import("../src/components/graphSlotSnippets.js");
    const { compileTemplate } = await import("@vue/compiler-sfc");
    const declarations = fs.readFileSync(
        new URL(
            "../node_modules/vue-data-ui/dist/types/vue-data-ui.d.ts",
            import.meta.url,
        ),
        "utf8",
    );
    const graphSlots = declarations
        .split("export const VueUiGraph:")[1]
        .split("export type VueUiUnknownObj")[0];
    for (const [name, snippet] of Object.entries(graphSlotSnippets)) {
        const compiled = compileTemplate({
            source: snippet,
            filename: `${name}.vue`,
            id: `graph-slot-${name}`,
        });
        assert.deepEqual(compiled.errors, [], name);
        for (const [, slot] of snippet.matchAll(/<template #([\w-]+)/g)) {
            assert.ok(
                graphSlots.includes(slot),
                `Undeclared graph slot: ${slot}`,
            );
        }
    }
    assert.match(
        graphSlotSnippets.node,
        /node, radius, color, selected, hovered/,
    );
    assert.ok(!graphSlotSnippets.node.includes("foreignObject"));
    assert.match(graphSlotSnippets.svg, /nodes, links, config, viewport/);
    assert.match(graphSlotSnippets.watermark, /width, height/);
    assert.ok(!graphSlotSnippets.watermark.includes("isPrinting"));
    assert.ok(!graphSlotSnippets["user-menu"].includes("optionLabels"));
});

test("graph UI translations are complete and localized slot examples compile in every language", async () => {
    const { graphTranslations } = await import("../src/translations/graph.js");
    const { createGraphSlotSnippets } =
        await import("../src/components/graphSlotSnippets.js");
    const { compileTemplate } = await import("@vue/compiler-sfc");
    const languages = ["en", "fr", "pt", "de", "zh", "ja", "es", "ko", "ar"];
    const keys = Object.keys(graphTranslations.en).sort();
    assert.deepEqual(
        Object.keys(graphTranslations).sort(),
        [...languages].sort(),
    );
    for (const lang of languages) {
        const text = graphTranslations[lang];
        assert.deepEqual(Object.keys(text).sort(), keys, lang);
        for (const key of keys) assert.ok(text[key].trim(), `${lang}.${key}`);
        if (lang !== "en") {
            assert.notEqual(
                text.datasetHelp,
                graphTranslations.en.datasetHelp,
                lang,
            );
            assert.notEqual(
                text.arrowsHelp,
                graphTranslations.en.arrowsHelp,
                lang,
            );
        }
        for (const [slot, snippet] of Object.entries(
            createGraphSlotSnippets(text),
        )) {
            const result = compileTemplate({
                source: snippet,
                filename: `${lang}-${slot}.vue`,
                id: `${lang}-${slot}`,
            });
            assert.deepEqual(result.errors, [], `${lang}.${slot}`);
        }
        assert.equal(
            createGraphConfig(false, lang).style.chart.title.text,
            text.title,
        );
    }
});

test("graph config explicitly exposes devHints first and binds its enable checkbox", async () => {
    const { ref } = await import("vue");
    const { createVueUiGraphConfigFields } =
        await import("../src/components/docs/configuration/vue-ui-graph-config.js");
    const { getEditableConfigPaths, getConfigInitialValues } =
        await import("../src/components/docs/configuration/configFields.js");
    const { useDocConfigBindings } =
        await import("../src/useDocConfigBindings.js");
    const fields = createVueUiGraphConfigFields();
    const group = fields[0].children[0];
    assert.equal(group.attr, "devHints");
    assert.equal(group.children[0].type, "checkbox");
    const paths = getEditableConfigPaths(fields);
    assert.equal(paths.filter((path) => path === "devHints.enable").length, 1);
    const config = ref(createGraphConfig());
    assert.deepEqual(config.value.devHints, { enable: false });
    const bindings = useDocConfigBindings(config, paths, {
        defaults: getVueDataUiConfig("vue_ui_graph"),
        initialValues: getConfigInitialValues(fields),
        skipArrays: false,
    });
    bindings["devHints.enable"].value = true;
    assert.equal(config.value.devHints.enable, true);
});

test("graph maker labels and categories are translated for every exposed setting", async () => {
    const { createPinia, setActivePinia } = await import("pinia");
    const { useMakerStore } = await import("../src/stores/maker.js");
    const { graphMakerTranslations } =
        await import("../src/translations/graphMaker.js");
    const { getGraphMakerPresentation } =
        await import("../src/components/maker/graphMaker.js");
    setActivePinia(createPinia());
    const translations = useMakerStore().translations;
    const fields = graphConfigLeaves(createGraphConfig()).filter(
        (field) =>
            !["theme", "responsive", "loading", "debug", "a11y"].includes(
                field.path.split(".")[0],
            ),
    );
    for (const field of fields) {
        const presentation = getGraphMakerPresentation(field.path);
        for (const lang of [
            "en",
            "fr",
            "pt",
            "de",
            "zh",
            "ja",
            "es",
            "ko",
            "ar",
        ]) {
            for (const key of [...presentation.label, presentation.category]) {
                assert.ok(
                    translations.labels[key]?.[lang] ||
                        translations.categories[key]?.[lang] ||
                        graphMakerTranslations[key]?.[lang],
                    `${field.path}: ${key}.${lang}`,
                );
            }
        }
    }
    assert.deepEqual(getGraphMakerPresentation("style.chart.nodes.minRadius"), {
        category: "nodes",
        label: ["min", "radius"],
    });
    assert.deepEqual(
        getGraphMakerPresentation("style.chart.nodes.glow.opacity"),
        { category: "nodes", label: ["graphGlow", "opacity"] },
    );
    assert.equal(
        getGraphMakerPresentation("style.chart.title.subtitle.text").category,
        "subtitle",
    );
});

test("dataset editor creates unique nodes, validates links and removes incident links", async () => {
    const { addGraphNode, removeGraphNode, canAddGraphLink, addGraphLink } =
        await import("../src/components/maker/graphDatasetEditor.js");
    const dataset = {
        nodes: [
            { id: 1, label: "Numeric" },
            { id: "1", label: "String" },
        ],
        links: [],
    };
    const a = addGraphNode(dataset, {
        label: "  New node  ",
        group: "Group 1",
    });
    const b = addGraphNode(dataset, { nodeLabel: "Nœud" });
    assert.notEqual(a.id, b.id);
    assert.equal(a.label, "New node");
    assert.equal(a.group, "Group 1");
    assert.match(b.label, /^Nœud /);
    assert.ok(addGraphLink(dataset, 1, "1", true));
    assert.ok(addGraphLink(dataset, "1", 1, true));
    assert.equal(addGraphLink(dataset, 1, "1", true), false);
    assert.equal(addGraphLink(dataset, 1, "1", false), false);
    assert.equal(canAddGraphLink(dataset, "missing", a.id), false);
    assert.equal(canAddGraphLink(dataset, a.id, a.id), false);
    assert.ok(addGraphLink(dataset, a.id, b.id));
    assert.equal(addGraphLink(dataset, b.id, a.id, true), false);
    removeGraphNode(dataset, 1);
    assert.ok(dataset.nodes.some((node) => node.id === "1"));
    assert.ok(
        !dataset.links.some((link) => link.source === 1 || link.target === 1),
    );
    assert.equal(dataset.links.length, 1);
    assert.ok(canAddGraphLink(dataset, a.id, b.id, true, dataset.links[0]));
});

test("dataset link composer keeps valid selections as nodes and links change", async () => {
    const vue = await import("vue");
    const ts = (await import("typescript")).default;
    const helpers =
        await import("../src/components/maker/graphDatasetEditor.js");
    const { graphTranslations } = await import("../src/translations/graph.js");
    const source = fs
        .readFileSync(
            new URL(
                "../src/components/maker/GraphDatasetEditor.vue",
                import.meta.url,
            ),
            "utf8",
        )
        .split("<script setup>")[1]
        .split("</script>")[0];
    const ast = ts.createSourceFile(
        "editor.js",
        source,
        ts.ScriptTarget.Latest,
        true,
    );
    const script = ast.statements
        .filter((statement) => !ts.isImportDeclaration(statement))
        .map((statement) => statement.getText(ast))
        .join("\n");
    const dataset = vue.reactive({
        nodes: [
            { id: 0, label: "A" },
            { id: "b", label: "B" },
            { id: "c", label: "C" },
        ],
        links: [],
    });
    const dependencies = {
        computed: vue.computed,
        ref: vue.ref,
        watch: vue.watch,
        useId: () => "test-editor",
        defineProps: () => ({
            dataset,
            palette: ["#112233", "#445566"],
            colorByGroup: true,
        }),
        defineEmits: () => () => {},
        getPalette: () => ["#112233", "#445566"],
        convertColorToHex: (value) => value,
        useMainStore: () => ({ lang: "en" }),
        graphTranslations,
        ...helpers,
    };
    const scope = vue.effectScope();
    const editor = scope.run(() =>
        new Function(
            ...Object.keys(dependencies),
            `${script}\nreturn { source, target, targets, linkNode, search, visibleNodes, nodeColor };`,
        )(...Object.values(dependencies)),
    );
    dataset.nodes[0].group = "Group A";
    dataset.nodes[1].group = "Group B";
    assert.equal(editor.nodeColor(dataset.nodes[0]), "#112233");
    assert.equal(editor.nodeColor(dataset.nodes[1]), "#445566");
    dataset.nodes[1].color = "#ABCDEF";
    assert.equal(editor.nodeColor(dataset.nodes[1]), "#ABCDEF");
    delete dataset.nodes[1].color;
    assert.equal(editor.nodeColor(dataset.nodes[1]), "#445566");
    assert.equal(editor.source.value, 0);
    assert.equal(editor.target.value, "b");
    helpers.addGraphLink(dataset, 0, "b");
    await vue.nextTick();
    assert.equal(editor.target.value, "c");
    editor.linkNode(dataset.nodes[1]);
    await vue.nextTick();
    assert.equal(editor.source.value, "b");
    assert.deepEqual(
        editor.targets.value.map((node) => node.id),
        ["c"],
    );
    helpers.removeGraphNode(dataset, "b");
    await vue.nextTick();
    assert.equal(editor.source.value, 0);
    editor.search.value = "C";
    assert.deepEqual(
        editor.visibleNodes.value.map((node) => node.id),
        ["c"],
    );
    helpers.removeGraphNode(dataset, 0);
    helpers.removeGraphNode(dataset, "c");
    await vue.nextTick();
    assert.equal(editor.source.value, null);
    assert.equal(editor.target.value, null);
    scope.stop();
});

test("showcase layout controls have translated explanations for every numeric layout setting", async () => {
    const { graphLayoutHints } =
        await import("../src/translations/graphLayout.js");
    const { createVueUiGraphConfigFields } =
        await import("../src/components/docs/configuration/vue-ui-graph-config.js");
    const fields = createVueUiGraphConfigFields()[0].children.find(
        (field) => field.attr === "layout",
    ).children;
    assert.equal(fields.length, Object.keys(createGraphConfig().layout).length);
    for (const lang of ["en", "fr", "pt", "de", "zh", "ja", "es", "ko", "ar"]) {
        assert.deepEqual(
            Object.keys(graphLayoutHints[lang]).sort(),
            fields.map((field) => field.name).sort(),
        );
        for (const field of fields) {
            assert.ok(
                graphLayoutHints[lang][field.name].trim(),
                `${lang}.${field.name}`,
            );
            if (lang !== "en")
                assert.notEqual(
                    graphLayoutHints[lang][field.name],
                    graphLayoutHints.en[field.name],
                );
            assert.ok(Number.isFinite(field.min) && Number.isFinite(field.max));
        }
    }
});
