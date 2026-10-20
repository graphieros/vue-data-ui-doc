import { graphTranslations } from "../../translations/graph.js";
import { getVueDataUiConfig } from "vue-data-ui/utils";

// Five connected clusters, each with seven nodes and a shared hub.
export const graphDataset = {
    nodes: [
        {
            id: "A",
            label: "Node A",
            group: "Group 1",
            value: 80,
        },
        {
            id: "B",
            label: "Node B",
            group: "Group 1",
            value: 18,
        },
        {
            id: "C",
            label: "Node C",
            group: "Group 1",
            value: 28,
        },
        {
            id: "D",
            label: "Node D",
            group: "Group 1",
            value: 22,
        },
        {
            id: "E",
            label: "Node E",
            group: "Group 1",
            value: 35,
        },
        {
            id: "F",
            label: "Node F",
            group: "Group 1",
            value: 16,
        },
        {
            id: "G",
            label: "Node G",
            group: "Group 1",
            value: 25,
        },
        {
            id: "H",
            label: "Node H",
            group: "Group 2",
            value: 74,
        },
        {
            id: "I",
            label: "Node I",
            group: "Group 2",
            value: 18,
        },
        {
            id: "J",
            label: "Node J",
            group: "Group 2",
            value: 28,
        },
        {
            id: "K",
            label: "Node K",
            group: "Group 2",
            value: 22,
        },
        {
            id: "L",
            label: "Node L",
            group: "Group 2",
            value: 35,
        },
        {
            id: "M",
            label: "Node M",
            group: "Group 2",
            value: 16,
        },
        {
            id: "N",
            label: "Node N",
            group: "Group 2",
            value: 25,
        },
        {
            id: "O",
            label: "Node O",
            group: "Group 3",
            value: 68,
        },
        {
            id: "P",
            label: "Node P",
            group: "Group 3",
            value: 18,
        },
        {
            id: "Q",
            label: "Node Q",
            group: "Group 3",
            value: 28,
        },
        {
            id: "R",
            label: "Node R",
            group: "Group 3",
            value: 22,
        },
        {
            id: "S",
            label: "Node S",
            group: "Group 3",
            value: 35,
        },
        {
            id: "T",
            label: "Node T",
            group: "Group 3",
            value: 16,
        },
        {
            id: "U",
            label: "Node U",
            group: "Group 3",
            value: 25,
        },
        {
            id: "V",
            label: "Node V",
            group: "Group 4",
            value: 62,
        },
        {
            id: "W",
            label: "Node W",
            group: "Group 4",
            value: 18,
        },
        {
            id: "X",
            label: "Node X",
            group: "Group 4",
            value: 28,
        },
        {
            id: "Y",
            label: "Node Y",
            group: "Group 4",
            value: 22,
        },
        {
            id: "Z",
            label: "Node Z",
            group: "Group 4",
            value: 35,
        },
        {
            id: "AA",
            label: "Node AA",
            group: "Group 4",
            value: 16,
        },
        {
            id: "AB",
            label: "Node AB",
            group: "Group 4",
            value: 25,
        },
        {
            id: "AC",
            label: "Node AC",
            group: "Group 5",
            value: 56,
        },
        {
            id: "AD",
            label: "Node AD",
            group: "Group 5",
            value: 18,
        },
        {
            id: "AE",
            label: "Node AE",
            group: "Group 5",
            value: 28,
        },
        {
            id: "AF",
            label: "Node AF",
            group: "Group 5",
            value: 22,
        },
        {
            id: "AG",
            label: "Node AG",
            group: "Group 5",
            value: 35,
        },
        {
            id: "AH",
            label: "Node AH",
            group: "Group 5",
            value: 16,
        },
        {
            id: "AI",
            label: "Node AI",
            group: "Group 5",
            value: 25,
        },
    ],
    links: [
        {
            source: "A",
            target: "B",
            value: 3,
            directed: true,
        },
        {
            source: "A",
            target: "C",
            value: 4,
            directed: true,
        },
        {
            source: "A",
            target: "D",
            value: 2,
            directed: true,
        },
        {
            source: "A",
            target: "E",
            value: 3,
            directed: true,
        },
        {
            source: "A",
            target: "F",
            value: 4,
            directed: true,
        },
        {
            source: "A",
            target: "G",
            value: 2,
            directed: true,
        },
        {
            source: "H",
            target: "I",
            value: 3,
            directed: true,
        },
        {
            source: "H",
            target: "J",
            value: 4,
            directed: true,
        },
        {
            source: "H",
            target: "K",
            value: 2,
            directed: true,
        },
        {
            source: "H",
            target: "L",
            value: 3,
            directed: true,
        },
        {
            source: "H",
            target: "M",
            value: 4,
            directed: true,
        },
        {
            source: "H",
            target: "N",
            value: 2,
            directed: true,
        },
        {
            source: "A",
            target: "H",
            value: 5,
            directed: true,
        },
        {
            source: "O",
            target: "P",
            value: 3,
            directed: true,
        },
        {
            source: "O",
            target: "Q",
            value: 4,
            directed: true,
        },
        {
            source: "O",
            target: "R",
            value: 2,
            directed: true,
        },
        {
            source: "O",
            target: "S",
            value: 3,
            directed: true,
        },
        {
            source: "O",
            target: "T",
            value: 4,
            directed: true,
        },
        {
            source: "O",
            target: "U",
            value: 2,
            directed: true,
        },
        {
            source: "A",
            target: "O",
            value: 5,
            directed: true,
        },
        {
            source: "V",
            target: "W",
            value: 3,
            directed: true,
        },
        {
            source: "V",
            target: "X",
            value: 4,
            directed: true,
        },
        {
            source: "V",
            target: "Y",
            value: 2,
            directed: true,
        },
        {
            source: "V",
            target: "Z",
            value: 3,
            directed: true,
        },
        {
            source: "V",
            target: "AA",
            value: 4,
            directed: true,
        },
        {
            source: "V",
            target: "AB",
            value: 2,
            directed: true,
        },
        {
            source: "A",
            target: "V",
            value: 5,
            directed: true,
        },
        {
            source: "AC",
            target: "AD",
            value: 3,
            directed: true,
        },
        {
            source: "AC",
            target: "AE",
            value: 4,
            directed: true,
        },
        {
            source: "AC",
            target: "AF",
            value: 2,
            directed: true,
        },
        {
            source: "AC",
            target: "AG",
            value: 3,
            directed: true,
        },
        {
            source: "AC",
            target: "AH",
            value: 4,
            directed: true,
        },
        {
            source: "AC",
            target: "AI",
            value: 2,
            directed: true,
        },
        {
            source: "A",
            target: "AC",
            value: 5,
            directed: true,
        },
    ],
};

export function createGraphConfig(isDark = false, lang = "en") {
    const config = getVueDataUiConfig("vue_ui_graph");
    config.devHints = { enable: false };
    // Keep the website's large branches closer together while retaining node spacing.
    Object.assign(config.layout, {
        chargeStrength: -45,
        linkDistance: 45,
        linkStrength: 0.16,
        centerStrength: 0.005,
        collisionPadding: 2,
        iterations: 450,
    });
    config.style.chart.backgroundColor = isDark ? "#2A2A2A" : "#FFFFFF";
    config.style.chart.color = isDark ? "#CCCCCC" : "#1A1A1A";
    config.style.chart.nodes.labels.color = config.style.chart.color;
    config.style.chart.nodes.labels.maxCount = graphDataset.nodes.length;
    config.style.chart.nodes.stroke = isDark ? "#4A4A4A" : "#FFFFFF";

    config.style.chart.title.color = config.style.chart.color;
    config.tooltip.color = config.style.chart.color;
    config.tooltip.backgroundColor = config.style.chart.backgroundColor;

    config.style.chart.controls.backgroundColor = isDark
        ? "#3A3A3A"
        : "#E1E5E8";
    config.style.chart.controls.buttonColor = isDark ? "#3A3A3A" : "#E1E5E8";
    config.style.chart.controls.color = isDark ? "#CCCCCC" : "#1A1A1A";
    config.style.chart.controls.border = `1px solid ${isDark ? "#4A4A4A" : "#CCCCCC"}`;

    for (const cell of [config.table.th, config.table.td]) {
        cell.color = config.style.chart.color;
        cell.backgroundColor = config.style.chart.backgroundColor;
    }
    const text = graphTranslations[lang] || graphTranslations.en;
    config.style.chart.title.text = text.title;
    config.style.chart.title.subtitle.text = text.subtitle;
    return config;
}

// Derive editable leaves from the library defaults so all supported options are available.
export function graphConfigLeaves(config, prefix = "") {
    return Object.entries(config).flatMap(([name, value]) => {
        const path = prefix ? `${prefix}.${name}` : name;
        if (value && typeof value === "object" && !Array.isArray(value)) {
            return graphConfigLeaves(value, path);
        }
        if (!["string", "number", "boolean"].includes(typeof value)) return [];
        return [
            {
                path,
                value,
                type:
                    typeof value === "boolean"
                        ? "checkbox"
                        : typeof value === "number"
                          ? "number"
                          : "text",
            },
        ];
    });
}
