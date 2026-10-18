import test from "node:test";
import fs from "node:fs";
import { evaluatePage } from "./helpers/doc-page-fixture.js";
import assert from "node:assert/strict";
import { computed, effectScope, nextTick, ref } from "vue";
import { getVueDataUiConfig } from "vue-data-ui/utils";
import { useDocConfigBindings } from "../src/useDocConfigBindings.js";
import { createVueUiXyConfigFields } from "../src/components/docs/configuration/vue-ui-xy-config.js";
import { getEditableConfigPaths } from "../src/components/docs/configuration/configFields.js";

const translatedText = new Proxy(
    {},
    {
        get: (_target, key) =>
            ["en", "fr"].includes(key)
                ? "Translated explanation"
                : translatedText,
    },
);
const translations = new Proxy(
    {
        responsive: { en: "Responsive", fr: "Adaptatif" },
        responsiveProportionalSizing: {
            en: "Proportional",
            fr: "Proportionnel",
        },
    },
    { get: (target, key) => (key in target ? target[key] : translatedText) },
);

const transitionFields = createVueUiXyConfigFields(translations, "en").find(
    (field) => field.attr === "transitions",
).children;
const paths = transitionFields.map((field) => field.attr);
const preset = (delay) => ({
    transitions: {
        enable: true,
        pauseOnLoad: true,
        pauseOnDatasetChange: false,
        activationDelayMs: delay,
    },
});

test("transition bindings edit the active theme and survive full preset replacements", async () => {
    const scope = effectScope();
    const light = ref(preset(300));
    const dark = ref(preset(500));
    const isDark = ref(false);
    const bindings = scope.run(() =>
        useDocConfigBindings(
            computed(() => (isDark.value ? dark.value : light.value)),
            paths,
        ),
    );
    try {
        bindings["transitions.enable"].value = false;
        bindings["transitions.activationDelayMs"].value = 350;
        assert.equal(light.value.transitions.enable, false);
        assert.equal(light.value.transitions.activationDelayMs, 350);
        assert.equal(dark.value.transitions.activationDelayMs, 500);
        await nextTick();
        isDark.value = true;
        await nextTick();
        assert.equal(bindings["transitions.enable"].value, true);
        bindings["transitions.activationDelayMs"].value = 600;
        assert.equal(dark.value.transitions.activationDelayMs, 600);
        assert.equal(light.value.transitions.activationDelayMs, 350);
        light.value = preset(300);
        dark.value = preset(500);
        await nextTick();
        assert.equal(bindings["transitions.activationDelayMs"].value, 500);
        isDark.value = false;
        await nextTick();
        assert.equal(bindings["transitions.activationDelayMs"].value, 300);
        assert.equal(bindings["transitions.enable"].value, true);
    } finally {
        scope.stop();
    }
});

test("missing and skipped paths fail without mutating configuration", async () => {
    const scope = effectScope();
    const config = ref({ ...preset(300), palette: ["red"] });
    const before = JSON.stringify(config.value);
    try {
        for (const path of ["transitions.typo", "palette"]) {
            assert.throws(
                () => scope.run(() => useDocConfigBindings(config, [path])),
                /no editable binding/,
            );
            assert.equal(JSON.stringify(config.value), before);
        }
        const bindings = scope.run(() => useDocConfigBindings(config, paths));
        config.value = {};
        await nextTick();
        assert.throws(
            () => bindings["transitions.enable"].value,
            /no editable binding/,
        );
        assert.throws(() => {
            bindings["transitions.enable"].value = true;
        }, /no editable binding/);
        assert.deepEqual(config.value, {});
    } finally {
        scope.stop();
    }
});

test("pilot metadata targets editable fields in the installed XY configuration", () => {
    const scope = effectScope();
    const config = ref(getVueDataUiConfig("vue_ui_xy"));
    try {
        const bindings = scope.run(() => useDocConfigBindings(config, paths));
        for (const field of transitionFields) {
            assert.equal(
                typeof bindings[field.attr].value,
                field.type === "checkbox" ? "boolean" : "number",
            );
        }
        assert.deepEqual(
            transitionFields
                .filter((field) => field.refreshChart)
                .map((field) => field.attr),
            ["transitions.enable"],
        );
    } finally {
        scope.stop();
    }
});

test("general controls bind installed XY fields without editing explanatory rows", async () => {
    const scope = effectScope();
    const light = ref(getVueDataUiConfig("vue_ui_xy"));
    const dark = ref(getVueDataUiConfig("vue_ui_xy"));
    const initial = JSON.stringify(light.value);
    const isDark = ref(false);
    const fields = createVueUiXyConfigFields(translations, "en");
    const editablePaths = getEditableConfigPaths(fields);
    try {
        const bindings = scope.run(() =>
            useDocConfigBindings(
                computed(() => (isDark.value ? dark.value : light.value)),
                editablePaths,
            ),
        );
        assert.ok(editablePaths.includes("a11y.translations.tableCaption"));
        assert.ok(editablePaths.includes("downsample.threshold"));
        assert.ok(editablePaths.includes("transitions.enable"));
        assert.ok(!editablePaths.includes("customPalette"));
        assert.ok(!editablePaths.includes("events.datapointEnter"));
        assert.equal(JSON.stringify(light.value), initial);
        bindings["a11y.translations.tableCaption"].value = "Edited caption";
        bindings["downsample.threshold"].value = 1500;
        bindings.loading.value = true;
        assert.equal(
            light.value.a11y.translations.tableCaption,
            "Edited caption",
        );
        assert.equal(light.value.downsample.threshold, 1500);
        assert.equal(light.value.loading, true);
        assert.equal(JSON.stringify(dark.value), initial);
        isDark.value = true;
        await nextTick();
        assert.equal(bindings.loading.value, false);
        bindings["a11y.translations.tableCaption"].value = "Dark caption";
        assert.equal(dark.value.a11y.translations.tableCaption, "Dark caption");
        assert.equal(
            light.value.a11y.translations.tableCaption,
            "Edited caption",
        );
        light.value = getVueDataUiConfig("vue_ui_xy");
        dark.value = getVueDataUiConfig("vue_ui_xy");
        await nextTick();
        assert.equal(
            bindings["a11y.translations.tableCaption"].value,
            dark.value.a11y.translations.tableCaption,
        );
        assert.equal(
            bindings["downsample.threshold"].value,
            dark.value.downsample.threshold,
        );
    } finally {
        scope.stop();
    }
});

test("language changes update metadata without changing control paths or ordering", () => {
    const scope = effectScope();
    const language = ref("en");
    try {
        const fields = scope.run(() =>
            computed(() =>
                createVueUiXyConfigFields(translations, language.value),
            ),
        );
        const before = getEditableConfigPaths(fields.value);
        const order = fields.value.map((field) => field.attr || field.name);
        assert.equal(
            fields.value.find((field) => field.name === "responsive").comment,
            "Responsive",
        );
        language.value = "fr";
        assert.equal(
            fields.value.find((field) => field.name === "responsive").comment,
            "Adaptatif",
        );
        assert.deepEqual(getEditableConfigPaths(fields.value), before);
        assert.deepEqual(
            fields.value.map((field) => field.attr || field.name),
            order,
        );
    } finally {
        scope.stop();
    }
});

function flattenFields(fields) {
    return fields.flatMap((field) => [
        field,
        ...flattenFields(field.children || []),
    ]);
}

// Read the actual authored presets without mounting the application or fetching data.
function readXyPresets() {
    const source = fs.readFileSync(
        new URL("../src/components/docs/DocVueUiXy.vue", import.meta.url),
        "utf8",
    );
    return {
        config: evaluatePage(source, false).get("config").value,
        darkModeConfig: evaluatePage(source, true).get("config").value,
    };
}

test("all XY fields bind to the actual light/dark presets and installed defaults", async () => {
    const presets = readXyPresets();
    const light = ref(presets.config);
    const dark = ref(presets.darkModeConfig);
    const isDark = ref(false);
    const scope = effectScope();
    const fields = createVueUiXyConfigFields(translations, "en");
    const allPaths = getEditableConfigPaths(fields);
    assert.equal(new Set(allPaths).size, allPaths.length);
    assert.equal(
        flattenFields(fields).filter((field) => field.name && !field.component)
            .length,
        360,
    );
    assert.equal(allPaths.length, 301);
    try {
        const bindings = scope.run(() =>
            useDocConfigBindings(
                computed(() => (isDark.value ? dark.value : light.value)),
                allPaths,
            ),
        );
        const defaults = scope.run(() =>
            useDocConfigBindings(
                ref(getVueDataUiConfig("vue_ui_xy")),
                allPaths,
            ),
        );
        for (const path of allPaths) {
            assert.notEqual(bindings[path].value, undefined, `Light: ${path}`);
            assert.notEqual(
                defaults[path].value,
                undefined,
                `Library: ${path}`,
            );
        }
        bindings["chart.backgroundColor"].value = "#123456";
        bindings["table.showSum"].value = false;
        assert.equal(light.value.chart.backgroundColor, "#123456");
        assert.equal(light.value.table.showSum, false);
        isDark.value = true;
        await nextTick();
        for (const path of allPaths)
            assert.notEqual(bindings[path].value, undefined, `Dark: ${path}`);
        bindings["bar.labels.rotation"].value = 30;
        bindings["plot.tag.fontSize"].value = 20;
        assert.equal(dark.value.bar.labels.rotation, 30);
        assert.equal(dark.value.plot.tag.fontSize, 20);
        assert.equal(light.value.bar.labels.rotation, 0);
        assert.equal(light.value.plot.tag.fontSize, 14);
        const reset = readXyPresets();
        dark.value = reset.darkModeConfig;
        light.value = reset.config;
        await nextTick();
        assert.equal(bindings["bar.labels.rotation"].value, 0);
        assert.equal(bindings["plot.tag.fontSize"].value, 14);
    } finally {
        scope.stop();
    }
});

test("rich configuration content retains navigation actions and locale choices", () => {
    const calls = [];
    const locales = ["en", "fr", "ja"];
    const fields = flattenFields(
        createVueUiXyConfigFields(translations, "en", {
            locales,
            goToPage: (route) => calls.push(["navigate", route]),
            setActiveTab: (tab) => calls.push(["tab", tab]),
        }),
    );
    const links = fields.filter((field) => field.component === "BaseTabLink");
    assert.equal(links.length, 11);
    links.forEach((field) => field.action());
    assert.ok(
        calls.some(
            ([kind, route]) =>
                kind === "navigate" && route === "/customization#formatter",
        ),
    );
    for (const tab of [3, 4, 11])
        assert.ok(
            calls.some(([kind, target]) => kind === "tab" && target === tab),
        );
    assert.deepEqual(
        fields.find((field) => field.name === "locale").options,
        locales,
    );
    assert.ok(
        fields.some((field) => field.component === "BaseAttrAnnotatorPalette"),
    );
    assert.ok(fields.some((field) => field.component === "BaseComment"));
    assert.ok(fields.some((field) => field.text?.includes("Since v2.3.49")));
});

test("empty translated text and rich content never request editable bindings", () => {
    assert.deepEqual(
        getEditableConfigPaths([
            { component: "BaseComment", children: [{ text: undefined }] },
            { text: "" },
            { component: "BaseAttrAnnotatorPalette" },
            {
                component: "div",
                children: [
                    {
                        name: "show",
                        attr: "chart.legend.show",
                        type: "checkbox",
                    },
                ],
            },
        ]),
        ["chart.legend.show"],
    );
});
