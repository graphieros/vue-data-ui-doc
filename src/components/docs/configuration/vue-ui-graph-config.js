import { getVueDataUiConfig } from "vue-data-ui/utils";
import { graphConfigLeaves } from "../graph.js";

const SELECT_OPTIONS = {
    "style.chart.title.textAlign": ["left", "center", "right"],
    "style.chart.controls.position": ["top", "bottom"],
    "style.chart.nodes.labels.position": ["top", "bottom"],
    "tooltip.position": ["left", "center", "right"],
    "userOptions.position": ["left", "right"],
    "userOptions.print.orientation": ["auto", "l", "p"],
};

// Units and bounds are presentation metadata; values still come from the library.
const NUMBER_CONTROLS = {
    "style.chart.width": { min: 100, max: 2000, step: 10 },
    "style.chart.height": { min: 100, max: 2000, step: 10 },
    "style.chart.padding": { min: 0, max: 100, step: 0.5 },
    "style.chart.title.fontSize": { min: 1, max: 100, step: 1 },
    "style.chart.title.paddingLeft": { min: 0, max: 100, step: 1 },
    "style.chart.title.paddingRight": { min: 0, max: 100, step: 1 },
    "style.chart.title.subtitle.fontSize": { min: 1, max: 100, step: 1 },
    "style.chart.controls.fontSize": { min: 1, max: 100, step: 1 },
    "style.chart.nodes.radius": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.minRadius": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.maxRadius": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.opacity": { min: 0, max: 1, step: 0.05 },
    "style.chart.nodes.strokeWidth": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.glow.blur": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.glow.opacity": { min: 0, max: 1, step: 0.05 },
    "style.chart.nodes.hover.strokeWidth": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.selected.strokeWidth": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.labels.strokeWidth": { min: 0, max: 100, step: 0.5 },
    "style.chart.nodes.labels.fontSize": { min: 1, max: 100, step: 1 },
    "style.chart.nodes.labels.offsetY": { min: -200, max: 200, step: 1 },
    "style.chart.nodes.labels.maxCount": { min: 0, max: 10000, step: 1 },
    "style.chart.nodes.labels.minZoom": { min: 0, max: 50, step: 0.1 },
    "style.chart.nodes.labels.maxLength": { min: 0, max: 10000, step: 1 },
    "style.chart.links.opacity": { min: 0, max: 1, step: 0.05 },
    "style.chart.links.width": { min: 0, max: 100, step: 0.5 },
    "style.chart.links.maxWidth": { min: 0, max: 100, step: 0.5 },
    "style.chart.links.pulses.radius": { min: 0, max: 100, step: 0.5 },
    "style.chart.links.pulses.opacity": { min: 0, max: 1, step: 0.05 },
    "style.chart.links.pulses.duration": { min: 0, max: 10000, step: 50 },

    "layout.chargeStrength": { min: -180, max: -20, step: 5 },
    "layout.linkDistance": { min: 30, max: 100, step: 1 },
    "layout.linkStrength": { min: 0.04, max: 0.2, step: 0.01 },
    "layout.centerStrength": { min: 0.005, max: 0.05, step: 0.001 },
    "layout.collisionPadding": { min: 1, max: 8, step: 0.5 },
    "layout.friction": { min: 0.7, max: 0.9, step: 0.01 },
    "layout.clusterStrength": { min: 0, max: 0.15, step: 0.005 },
    "layout.iterations": { min: 200, max: 600, step: 25 },
    "layout.strength": { min: 0.5, max: 1.5, step: 0.05 },
    "layout.theta": { min: 0.5, max: 1, step: 0.05 },

    "interaction.zoom.min": { min: 0.01, max: 5, step: 0.05 },
    "interaction.zoom.max": { min: 0.1, max: 50, step: 0.1 },
    "interaction.highlight.dimOpacity": { min: 0, max: 1, step: 0.05 },
    "tooltip.fontSize": { min: 1, max: 100, step: 1 },
    "tooltip.borderRadius": { min: 0, max: 100, step: 0.5 },
    "tooltip.borderWidth": { min: 0, max: 100, step: 0.5 },
    "tooltip.backgroundOpacity": { min: 0, max: 100, step: 1 },
    "tooltip.offsetX": { min: -200, max: 200, step: 1 },
    "tooltip.offsetY": { min: -200, max: 200, step: 1 },
    "tooltip.smoothForce": { min: 0, max: 1, step: 0.01 },
    "tooltip.smoothSnapThreshold": { min: 0, max: 10, step: 0.05 },
    "animation.duration": { min: 0, max: 10000, step: 50 },
    "userOptions.print.scale": { min: 0.1, max: 10, step: 0.1 },
    "userOptions.print.overflowTolerance": { min: 0, max: 1, step: 0.01 },
    "performance.effectThreshold": { min: 0, max: 10000, step: 1 },
    "performance.stepsPerFrame": { min: 1, max: 50, step: 1 },
    "performance.nodeBatchThreshold": { min: 1, max: 10000, step: 1 },
    "table.responsiveBreakpoint": { min: 0, max: 10000, step: 1 },
};

function controlProps(path, name, type) {
    if (path === "userOptions.annotator.showGroupActions")
        return {
            type,
            tooltip:
                "Show multi-selection, group and ungroup actions independently of followZoom.",
        };
    if (path === "userOptions.annotator.followZoom")
        return {
            type,
            tooltip:
                "Anchor annotations to chart coordinates so they follow zoom and pan.",
        };
    if (SELECT_OPTIONS[path])
        return { type: "select", options: SELECT_OPTIONS[path] };
    if (type === "text" && /(?:color|stroke)$/i.test(name)) {
        return { type: "color", rgba: true };
    }
    if (type !== "number") return { type };
    const bounds = NUMBER_CONTROLS[path];
    if (!bounds) throw new Error(`Missing numeric control bounds for ${path}`);
    return { type, ...bounds };
}

export function createVueUiGraphConfigFields() {
    const children = [
        {
            attr: "devHints",
            title: "devHints",
            level: 1,
            children: [
                {
                    name: "enable",
                    attr: "devHints.enable",
                    type: "checkbox",
                    defaultVal: "false",
                    initialValue: false,
                },
            ],
        },
    ];
    const groups = new Map();

    for (const { path, value, type } of graphConfigLeaves(
        getVueDataUiConfig("vue_ui_graph"),
    )) {
        if (path === "theme" || path.startsWith("devHints.")) continue;
        const segments = path.split(".");
        const name = segments.pop();
        let parent = children;

        segments.forEach((segment, index) => {
            const groupPath = segments.slice(0, index + 1).join(".");
            if (!groups.has(groupPath)) {
                const group = {
                    attr: segment,
                    title: groupPath,
                    level: index + 1,
                    children: [],
                };
                groups.set(groupPath, group);
                parent.push(group);
            }
            parent = groups.get(groupPath).children;
        });

        parent.push({
            name,
            attr: path,
            defaultVal: JSON.stringify(
                path === "userOptions.annotator.followZoom" ? true : value,
            ),
            ...controlProps(path, name, type),
        });
    }

    return [{ attr: "const config: VueUiGraphConfig", equal: true, children }];
}
