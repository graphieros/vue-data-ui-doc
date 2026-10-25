import { test } from "node:test";
import assert from "node:assert/strict";
import { datasetOptions } from "../src/components/builder2/datasetOptions.js";

test("shape dropdowns cover series and scatter point overrides", () => {
    for (const chart of [
        "xy",
        "quadrant",
        "scatter",
        "parallel_coordinate_plot",
        "stackline",
    ]) {
        const options = datasetOptions(`vue_ui_${chart}`, []);
        assert.equal(options["*.shape"].length, 7);
        assert.ok(options["*.shape"].includes("star"));
        assert.equal(options["*.metadata.shape"], undefined);
    }
    assert.deepEqual(
        datasetOptions("vue_ui_scatter", [])["*.values.*.shape"],
        datasetOptions("vue_ui_scatter", [])["*.shape"],
    );
    assert.deepEqual(datasetOptions("vue_ui_donut", []), {});
});

test("waterfall types apply to steps without changing the series discriminator", () => {
    const options = datasetOptions("vue_ui_stackbar", []);
    assert.deepEqual(options["*.series.*.type"], [
        "total",
        "subtotal",
        "change",
    ]);
    assert.equal(options["*.type"], undefined);
});

test("graph references use current node IDs and preserve numeric values", () => {
    const dataset = { nodes: [{ id: 0 }, { id: "A" }, { id: "A" }] };
    const graph = datasetOptions("vue_ui_graph", dataset);
    assert.deepEqual(graph["links.*.source"], [0, "A"]);
    assert.deepEqual(graph["links.*.target"], [0, "A"]);
    dataset.nodes.push({ id: "B" });
    assert.deepEqual(
        datasetOptions("vue_ui_graph", dataset)["links.*.target"],
        [0, "A", "B"],
    );
    const dag = datasetOptions("vue_ui_dag", dataset);
    assert.deepEqual(dag["edges.*.from"], [0, "A", "B"]);
    assert.deepEqual(dag["edges.*.animationDirection"], [1, -1]);
    assert.deepEqual(
        datasetOptions("vue_ui_relation_circle", dataset.nodes)[
            "*.relations.*"
        ],
        [0, "A", "B"],
    );
    assert.deepEqual(
        datasetOptions("vue_ui_graph", null)["links.*.source"],
        [],
    );
});
