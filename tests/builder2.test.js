import { test } from "node:test";
import assert from "node:assert/strict";
import { generateCode } from "../src/components/builder2/code.js";
import { chartDataset } from "../src/components/builder2/dataset.js";
import { catalog } from "../src/components/builder2/catalog.js";

test("word cloud preview and exports receive word frequencies instead of raw text", () => {
    const data = chartDataset("vue_ui_word_cloud", "vue vue charts");
    assert.ok(Array.isArray(data));
    assert.equal(data.find((item) => item.name === "vue").value, 2);
});

test("3d bar receives the active dataset shape", () => {
    assert.deepEqual(
        chartDataset("vue_ui_3d_bar", {
            series: [{ name: "A", value: 10 }],
            percentage: 50,
        }),
        { series: [{ name: "A", value: 10 }] },
    );
    assert.deepEqual(chartDataset("vue_ui_3d_bar", { percentage: 50 }), {
        percentage: 50,
    });
});

test("other charts retain their dataset shape", () => {
    const data = { percentage: 50 };
    assert.equal(chartDataset("vue_ui_wheel", data), data);
    assert.equal(chartDataset("vue_ui_tiremarks", data), data);
});

test("all components support every original code option and separate copy outputs", () => {
    for (const chart of catalog) {
        for (let bits = 0; bits < 32; bits++) {
            const options = {
                computed: !!(bits & 1),
                vapor: !!(bits & 2),
                universal: !!(bits & 4),
                treeshaken: !!(bits & 8),
                typescript: !!(bits & 16),
            };
            const { code, configCode, datasetCode } = generateCode(
                chart.name,
                42,
                { loading: false },
                options,
            );
            assert.ok(!code.includes("undefined"), chart.name);
            assert.ok(
                code.includes(
                    options.computed
                        ? "const dataset = computed"
                        : "const dataset = ref",
                ),
            );
            assert.equal(code.includes(' lang="ts"'), options.typescript);
            assert.equal(code.includes("<script vapor"), options.vapor);
            assert.equal(
                code.includes("<VueDataUi component="),
                options.universal,
            );
            assert.equal(
                /from "vue-data-ui\/vue-ui-/.test(code),
                options.treeshaken && !options.universal,
            );
            assert.ok(code.includes(configCode));
            assert.ok(code.includes(datasetCode));
            assert.ok(!configCode.includes("const dataset"));
            assert.ok(!datasetCode.includes("const config"));
        }
    }
});

test("Gauge editor restores legacy drafts and exposes the needle value", async () => {
    const { editorDataset } =
        await import("../src/components/builder2/dataset.js");
    const ranges = [{ from: 0, to: 10, color: "#42d392", name: "Target" }];
    const data = editorDataset("vue_ui_gauge", ranges);
    assert.deepEqual(data, { series: ranges, value: 6 });
    data.value = 8;
    assert.equal(chartDataset("vue_ui_gauge", data).value, 8);
    assert.equal(editorDataset("vue_ui_gauge", data), data);
});

test("Hill preview uses independent item value arrays, like the original maker", () => {
    const input = [
        { label: "Task A", position: 0.5 },
        { label: "Task B", position: 0.8, values: [1] },
    ];
    const data = chartDataset("vue_ui_hill", input);
    assert.deepEqual(data[0], { label: "Task A", position: 0.5, values: [] });
    data[1].values.push(2);
    assert.deepEqual(input[1].values, [1]);
});

test("Hill and Gauge render chart geometry with builder datasets", async () => {
    const { createSSRApp, h } = await import("vue");
    const { renderToString } = await import("vue/server-renderer");
    const { VueUiHill } = await import("vue-data-ui/vue-ui-hill");
    const { VueUiGauge } = await import("vue-data-ui/vue-ui-gauge");
    const components = { VueUiHill, VueUiGauge };
    const { defaultDataHill } =
        await import("../src/stores/chunks/defaultDataHill.js");
    const { convertArrayToObject } =
        await import("../src/components/maker/lib.js");
    const fixtures = [
        {
            component: "VueUiHill",
            key: "vue_ui_hill",
            dataset: defaultDataHill.dataset,
            config: convertArrayToObject(defaultDataHill.model),
            text: "Task A",
        },
        {
            component: "VueUiGauge",
            key: "vue_ui_gauge",
            dataset: [{ from: 0, to: 10, color: "#42d392", name: "Target" }],
            config: { style: { chart: { animation: { use: false } } } },
            text: "Target",
        },
    ];
    for (const fixture of fixtures) {
        const app = createSSRApp({
            render: () =>
                h(components[fixture.component], {
                    dataset: chartDataset(fixture.key, fixture.dataset),
                    // Export controls require a browser DOM; this check covers chart geometry.
                    config: { ...fixture.config, userOptions: { show: false } },
                }),
        });
        const html = await renderToString(app);
        assert.ok(html.includes(fixture.text), `${fixture.component} labels`);
        assert.ok(html.includes("<path"), `${fixture.component} geometry`);
        assert.ok(
            !html.includes("NaN"),
            `${fixture.component} finite coordinates`,
        );
        assert.ok(
            !html.includes("does not exist"),
            `${fixture.component} is supported`,
        );
    }
});

test("generated JavaScript objects unquote identifiers and preserve special keys and string values", () => {
    const config = JSON.parse(
        '{"style":{"fontSize":14,"$color":"red","with-dash":true,"quoted\\\"key":"value","__proto__":{"safe":true}},"123":"numeric key"}',
    );
    const dataset = [
        {
            name: 'A "quoted" label',
            values: [1, null, 3],
            text: '"name": unchanged\nnext line',
        },
    ];
    for (const useComputed of [false, true]) {
        const output = generateCode("VueUiXy", dataset, config, {
            computed: useComputed,
            treeshaken: true,
            typescript: false,
        });
        assert.ok(output.configCode.includes("fontSize: 14"));
        assert.ok(output.configCode.includes('$color: "red"'));
        assert.ok(output.configCode.includes('"with-dash": true'));
        assert.ok(output.configCode.includes('["__proto__"]:'));
        assert.ok(output.datasetCode.includes("name:"));
        for (const [name, expected] of [
            ["config", config],
            ["dataset", dataset],
        ]) {
            const actual = new Function(
                "ref",
                "computed",
                `${output[`${name}Code`]}\nreturn ${name};`,
            )(
                (value) => value,
                (getter) => getter(),
            );
            assert.deepEqual(actual, expected);
            if (name === "config")
                assert.equal(
                    Object.getPrototypeOf(actual.style),
                    Object.prototype,
                );
        }
    }
});
