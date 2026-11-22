import { test } from "node:test";
import assert from "node:assert/strict";
import {
    modelFromConfig,
    restoreConfigModel,
} from "../src/components/builder2/config.js";
import { convertArrayToObject } from "../src/components/maker/lib.js";

import { getVueDataUiConfig } from "vue-data-ui/utils";
import { createVueUiGalaxyDefaults } from "../src/stores/chunks/defaultDataGalaxy.js";

const reference = [
    { key: "style.color", def: "#ffffff", type: "color", category: "general" },
    { key: "style.size", def: 12, type: "range", min: 0, max: 30, step: 1 },
    { key: "labels", def: ["A"], type: "none" },
    { key: "loading", def: false, type: "checkbox" },
];

test("JSON configuration edits retain control types and round-trip all values", () => {
    const config = {
        style: { color: "#42d39280", size: 18 },
        labels: ["B", "C"],
        loading: false,
    };
    const model = modelFromConfig(config, reference);
    assert.deepEqual(convertArrayToObject(model), config);
    assert.equal(model.find((k) => k.key === "style.color").type, "color");
    assert.equal(model.find((k) => k.key === "style.size").max, 30);
    assert.deepEqual(reference[2].def, ["A"]);
});

test("additional configuration fields survive local-draft restoration", () => {
    const saved = modelFromConfig(
        {
            style: { color: "#000000" },
            customPalette: ["#42d392"],
            extra: { enabled: true },
        },
        reference,
    );
    const restored = restoreConfigModel(reference, saved);
    assert.deepEqual(convertArrayToObject(restored), {
        style: { color: "#000000", size: 12 },
        labels: ["A"],
        loading: false,
        customPalette: ["#42d392"],
        extra: { enabled: true },
    });
});

test("configuration JSON rejects invalid root shapes and mismatched control values", () => {
    for (const input of [null, [], 3, "config"])
        assert.throws(() => modelFromConfig(input, reference), /JSON object/);
    assert.throws(
        () => modelFromConfig({ style: { size: "large" } }, reference),
        /original type/,
    );
    assert.throws(
        () => modelFromConfig({ labels: {} }, reference),
        /original type/,
    );
});

test("configuration paths cannot modify object prototypes", () => {
    assert.throws(
        () =>
            modelFromConfig(
                JSON.parse('{"__proto__":{"polluted":true}}'),
                reference,
            ),
        /Unsupported/,
    );
    assert.throws(
        () => modelFromConfig({ extra: { constructor: true } }, reference),
        /Unsupported/,
    );
    assert.throws(
        () => modelFromConfig({ "style.color": "red" }, reference),
        /Unsupported/,
    );
    assert.equal({}.polluted, undefined);
});

test("Galaxy maker exposes current label and outline controls", () => {
    const { dataset, model } = createVueUiGalaxyDefaults();
    const config = convertArrayToObject(model);
    const defaults = getVueDataUiConfig("vue_ui_galaxy");
    assert.ok(
        dataset.some(
            ({ values }) => values.reduce((sum, value) => sum + value, 0) === 3,
        ),
    );
    assert.equal(
        config.style.chart.layout.labels.dataLabels.show,
        defaults.style.chart.layout.labels.dataLabels.show,
    );
    assert.equal(
        config.style.chart.layout.labels.dataLabels.color,
        defaults.style.chart.layout.labels.dataLabels.color,
    );
    assert.equal(
        config.style.chart.layout.arcs.borderWidth,
        defaults.style.chart.layout.arcs.borderWidth,
    );
    assert.equal(
        model.find(({ key }) => key === "style.chart.layout.arcs.borderWidth")
            .min,
        0,
    );
    assert.equal(
        config.userOptions.buttons.labels,
        defaults.userOptions.buttons.labels,
    );
});
