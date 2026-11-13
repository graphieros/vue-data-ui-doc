import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { computed, ref, reactive } from "vue";
import { parse, compileScript, compileTemplate } from "@vue/compiler-sfc";
import { getVueDataUiConfig, shiftColorHue } from "vue-data-ui/utils";
import { additionalComponentIdeas } from "../src/components/customization/additionalComponentIdeas.js";

const root = new URL("../src/components/customization/", import.meta.url);

function setup(filename, store = reactive({ lang: "en", isDarkMode: false })) {
    const { descriptor, errors } = parse(
        fs.readFileSync(new URL(filename, root), "utf8"),
    );
    assert.deepEqual(errors, []);
    const script = compileScript(descriptor, { id: filename });
    const template = compileTemplate({
        source: descriptor.template.content,
        filename,
        id: filename,
        compilerOptions: { bindingMetadata: script.bindings },
    });
    assert.deepEqual(template.errors, []);
    const source = script.content
        .replace(/^import\s[\s\S]*?from\s*["'][^"']+["'];?\s*$/gm, "")
        .replace("export default", "return");
    const component = new Function(
        "ref",
        "computed",
        "useMainStore",
        "shiftColorHue",
        "useId",
        source,
    )(
        ref,
        computed,
        () => store,
        shiftColorHue,
        () => "test-pin",
    );
    return component.setup({}, { expose() {} });
}

function checkConfigPaths(config, schema, path = "config") {
    for (const [key, value] of Object.entries(config)) {
        assert(key in schema, `Unknown chart option: ${path}.${key}`);
        if (
            value &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            schema[key] &&
            typeof schema[key] === "object"
        )
            checkConfigPaths(value, schema[key], `${path}.${key}`);
    }
}

test("retained demos compile and use supported chart options in both themes", () => {
    const store = reactive({ lang: "en", isDarkMode: false });
    const region = setup("RegionExplorer.vue", store);
    const kpi = setup("KpiTable.vue", store);
    for (const dark of [false, true]) {
        store.isDarkMode = dark;
        checkConfigPaths(
            region.config.value,
            getVueDataUiConfig("vue_ui_world"),
        );
        checkConfigPaths(
            region.historyConfig.value,
            getVueDataUiConfig("vue_ui_xy"),
        );
        checkConfigPaths(
            region.customersHistoryConfig.value,
            getVueDataUiConfig("vue_ui_xy"),
        );
        checkConfigPaths(
            region.sparkbarConfig.value,
            getVueDataUiConfig("vue_ui_sparkbar"),
        );
        checkConfigPaths(
            region.donutConfig.value,
            getVueDataUiConfig("vue_ui_donut"),
        );
        checkConfigPaths(
            kpi.gizmoConfig.value,
            getVueDataUiConfig("vue_ui_gizmo"),
        );
        assert.equal(
            region.config.value.style.chart.color,
            dark ? "#E5E7EB" : "#0F172A",
        );
    }
});

test("KPI table retains the 10–100% showcase and achievement colors", () => {
    const kpi = setup("KpiTable.vue");
    assert.deepEqual(
        kpi.rows.map((row) => (row.revenue / row.target) * 100),
        [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    );
    assert.equal(kpi.achievementColor(0), "#d34242ff");
    assert.equal(kpi.achievementColor(100), "#42d392ff");
});

test("region selection updates KPIs and history and ignores countries without sample data", () => {
    const region = setup("RegionExplorer.vue");
    for (const country of region.regions) {
        region.selectCountry({ code: country.code });
        assert.equal(region.selected.value.customers, country.customers);
        assert.equal(region.history.value[0].series.at(-1), country.revenue);
        assert.equal(
            region.customerHistory.value[0].series.at(-1),
            country.customers,
        );
        assert.equal(
            region.customerHistory.value[0].series.length,
            region.periods.value.length,
        );
        assert.equal(
            region.customerHistory.value[0].color,
            region.dataset.value[country.code].color,
        );
        assert.equal(region.dataset.value[country.code].value, country.revenue);
    }
    region.selectCountry({ code: "JPN" });
    region.selectCountry({ code: "CAN" });
    region.selectCountry(null);
    assert.equal(region.selectedCode.value, "JPN");
});

test("region y-axis formatters distinguish currency and customer counts", () => {
    const store = reactive({ lang: "en", isDarkMode: false });
    const region = setup("RegionExplorer.vue", store);
    for (const lang of ["en", "fr", "ar"]) {
        store.lang = lang;
        const formatter =
            region.historyConfig.value.chart.grid.labels.yAxis.formatter;
        for (const value of [0, 12000, 96000]) {
            assert.equal(formatter({ value, config: {} }), region.money(value));
            assert(!formatter({ value }).includes("NaN"));
            const customersFormatter =
                region.customersHistoryConfig.value.chart.grid.labels.yAxis
                    .formatter;
            assert.equal(
                customersFormatter({ value }),
                region.number(value, { maximumFractionDigits: 0 }),
            );
        }
    }
});

test("map tooltips only show while hovering a listed country", () => {
    const region = setup("RegionExplorer.vue");
    assert.equal(region.config.value.style.chart.tooltip.show, false);
    for (const country of region.regions) {
        region.config.value.events.datapointEnter({
            datapoint: { code: country.code },
        });
        assert.equal(region.config.value.style.chart.tooltip.show, true);
        region.config.value.events.datapointLeave();
        assert.equal(region.config.value.style.chart.tooltip.show, false);
    }
    region.config.value.events.datapointEnter({ datapoint: { code: "FRA" } });
    region.config.value.events.datapointEnter({ datapoint: { code: "CAN" } });
    assert.equal(region.config.value.style.chart.tooltip.show, false);
    region.config.value.events.datapointEnter({ datapoint: null });
    assert.equal(region.config.value.style.chart.tooltip.show, false);
    assert.equal(region.selectedCode.value, "FRA");
});

test("Region Explorer is number 7 with localized summary and demo labels", () => {
    assert.equal(additionalComponentIdeas.length, 1);
    const idea = additionalComponentIdeas[0];
    assert.equal(idea.id, "idea-region-explorer");
    assert.equal(idea.file, "RegionExplorer.vue");
    assert.equal(idea.number, 7);
    const store = reactive({ lang: "en", isDarkMode: false });
    const region = setup("RegionExplorer.vue", store);
    for (const lang of ["en", "fr", "pt", "de", "zh", "ja", "es", "ko", "ar"]) {
        store.lang = lang;
        assert(idea.title[lang]);
        assert(idea.description[lang]);
        assert(
            Object.values(region.labels.value).every(
                (value) => typeof value === "string" && value.length,
            ),
        );
        assert.equal(region.history.value[0].series.length, 12);
        assert.deepEqual(
            region.historyConfig.value.chart.grid.labels.xAxisLabels.values,
            region.periods.value,
        );
    }
});

test("the selected country pin follows the map projection and scales with SVG dimensions", () => {
    const region = setup("RegionExplorer.vue");
    const france = region.pinPosition({ width: 800, height: 420 });
    assert(Math.abs(france.x - 404.4444) < 0.001);
    assert(Math.abs(france.y - 108.7059) < 0.001);
    for (const country of region.regions) {
        region.selectCountry({ code: country.code });
        const position = region.pinPosition({ width: 800, height: 420 });
        const doubled = region.pinPosition({ width: 1600, height: 840 });
        assert(position.x > 0 && position.x < 800, country.code);
        assert(position.y > 0 && position.y < 420, country.code);
        assert.equal(doubled.x, position.x * 2);
        assert.equal(doubled.y, position.y * 2);
    }
    assert.notDeepEqual(
        region.pinPosition({ width: 800, height: 420 }),
        france,
    );
});

test("the revenue table uses one country-colored bar per row with a shared maximum", () => {
    const region = setup("RegionExplorer.vue");
    assert.equal(region.showHistoryTable.value, false);
    region.showHistoryTable.value = true;
    const maxRevenue = Math.max(
        ...region.regions.map((country) => country.revenue),
    );
    assert.equal(region.tableRows.value.length, region.regions.length);
    assert.equal(region.sparkbarConfig.value.style.layout.independant, true);
    assert.equal(region.sparkbarConfig.value.style.layout.target, maxRevenue);
    for (const row of region.tableRows.value) {
        assert.equal(row.sparkbarDataset.length, 1);
        const bar = row.sparkbarDataset[0];
        assert.equal(bar.target, maxRevenue);
        assert.equal(bar.value, row.revenue);
        assert.equal(bar.color, region.dataset.value[row.code].color);
        assert.equal(
            bar.formatter({ value: bar.value }),
            region.money(row.revenue),
        );
        region.selectCountry(row);
        assert.equal(region.selectedCode.value, row.code);
        assert.equal(region.history.value[0].color, bar.color);
    }
    region.showHistoryTable.value = false;
    assert.equal(
        region.history.value[0].series.at(-1),
        region.selected.value.revenue,
    );
});

test("the donut compares the selected country with the combined revenue of all others", () => {
    const region = setup("RegionExplorer.vue");
    const total = region.regions.reduce(
        (sum, country) => sum + country.revenue,
        0,
    );
    for (const country of region.regions) {
        region.selectCountry(country);
        assert.equal(region.donutDataset.value.length, 2);
        const [selected, other] = region.donutDataset.value;
        assert.equal(
            selected.name,
            region.countryNames.value.of(country.region),
        );
        assert.deepEqual(selected.values, [country.revenue]);
        assert.equal(selected.color, region.dataset.value[country.code].color);
        assert.equal(other.name, "Other");
        assert.equal(other.color, "#9CA3AF");
        assert.deepEqual(other.values, [total - country.revenue]);
    }
});
