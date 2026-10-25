const shapes = [
    "circle",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "star",
];

export function datasetOptions(component, dataset) {
    switch (component) {
        case "vue_ui_xy":
            return {
                "*.type": ["line", "plot", "bar"],
                "*.shape": shapes,
                "*.useTag": ["none", "start", "end"],
                "*.showSerieName": ["none", "start", "end"],
            };
        case "vue_ui_quadrant":
        case "vue_ui_parallel_coordinate_plot":
        case "vue_ui_stackline":
            return { "*.shape": shapes };
        case "vue_ui_scatter":
            return { "*.shape": shapes, "*.values.*.shape": shapes };
        case "vue_ui_stackbar":
            return { "*.series.*.type": ["total", "subtotal", "change"] };
        case "vue_ui_dag": {
            const ids = nodeIds(dataset?.nodes);
            return {
                "edges.*.from": ids,
                "edges.*.to": ids,
                "edges.*.animationDirection": [1, -1],
            };
        }
        case "vue_ui_graph": {
            const ids = nodeIds(dataset?.nodes);
            return { "links.*.source": ids, "links.*.target": ids };
        }
        case "vue_ui_relation_circle":
            return { "*.relations.*": nodeIds(dataset) };
        default:
            return {};
    }
}

function nodeIds(nodes) {
    return [
        ...new Set(
            (Array.isArray(nodes) ? nodes : [])
                .map((node) => node.id)
                .filter(
                    (id) => typeof id === "string" || typeof id === "number",
                ),
        ),
    ];
}
