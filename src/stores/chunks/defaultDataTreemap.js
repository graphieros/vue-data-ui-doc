import { getVueDataUiConfig } from "vue-data-ui/utils";
import { graphConfigLeaves } from "../../components/docs/graph.js";
import {
    getGraphMakerControlType,
    getGraphMakerPresentation,
} from "../../components/maker/graphMaker.js";

// Bounds follow the documentation controls; include zero for the installed
// default of hideUnderProportion.
const numericBounds = {
    "transitions.activationDelayMs": [100, 1000, 50],
    "userOptions.print.scale": [1, 5, 1],
    "userOptions.print.overflowTolerance": [0, 1, 0.01],
    "userOptions.annotator.outlineThickness": [0, 10, 0.5],
    "style.chart.height": [300, 1000, 10],
    "style.chart.width": [300, 1000, 10],
    "style.chart.layout.labels.fontSize": [8, 100, 1],
    "style.chart.layout.labels.minFontSize": [8, 100, 1],
    "style.chart.layout.labels.fontSizeZoomFactor": [1, 12, 1],
    "style.chart.layout.labels.hideUnderProportion": [0, 0.2, 0.01],
    "style.chart.layout.labels.rounding": [0, 6, 1],
    "style.chart.layout.rects.strokeWidth": [0, 24, 1],
    "style.chart.layout.rects.borderRadius": [0, 24, 1],
    "style.chart.layout.rects.colorRatio": [0, 1, 0.01],
    "style.chart.layout.rects.gradient.intensity": [0, 100, 1],
    "style.chart.layout.rects.selected.strokeWidth": [0, 24, 1],
    "style.chart.layout.rects.selected.unselectedOpacity": [0, 1, 0.01],
    "style.chart.layout.rects.group.strokeWidth": [0, 6, 1],
    "style.chart.layout.rects.group.backgroundLighterRatio": [0, 1, 0.01],
    "style.chart.legend.fontSize": [8, 42, 1],
    "style.chart.legend.roundingValue": [0, 6, 1],
    "style.chart.legend.roundingPercentage": [0, 6, 1],
    "style.chart.padding.top": [0, 100, 1],
    "style.chart.padding.right": [0, 100, 1],
    "style.chart.padding.bottom": [0, 100, 1],
    "style.chart.padding.left": [0, 100, 1],
    "style.chart.title.fontSize": [8, 42, 1],
    "style.chart.title.paddingLeft": [0, 100, 1],
    "style.chart.title.paddingRight": [0, 100, 1],
    "style.chart.title.subtitle.fontSize": [8, 42, 1],
    "style.chart.tooltip.fontSize": [8, 42, 1],
    "style.chart.tooltip.roundingValue": [0, 6, 1],
    "style.chart.tooltip.borderRadius": [0, 24, 1],
    "style.chart.tooltip.borderWidth": [0, 24, 1],
    "style.chart.tooltip.backgroundOpacity": [0, 100, 1],
    "style.chart.tooltip.offsetX": [-100, 100, 1],
    "style.chart.tooltip.offsetY": [-100, 100, 1],
    "style.chart.tooltip.smoothForce": [0.1, 1, 0.01],
    "style.chart.tooltip.smoothSnapThreshold": [0.1, 24, 0.01],
    "table.responsiveBreakpoint": [300, 800, 50],
    "table.td.roundingValue": [0, 6, 1],
    "table.td.roundingPercentage": [0, 6, 1],
};

export function createVueUiTreemapDefaults() {
    return {
        dataset: [
            {
                name: "Products",
                value: 100,
                color: "#1f77b4",
                children: [
                    {
                        name: "Product A",
                        value: 60,
                        color: "#1f77b4",
                        __inheritColor: true,
                    },
                    {
                        name: "Product B",
                        value: 40,
                        color: "#6baed6",
                        __inheritColor: true,
                    },
                ],
            },
            {
                name: "Services",
                value: 80,
                color: "#ff7f0e",
                children: [
                    {
                        name: "Service A",
                        value: 50,
                        color: "#ff7f0e",
                        __inheritColor: true,
                    },
                    {
                        name: "Service B",
                        value: 30,
                        color: "#fdae6b",
                        __inheritColor: true,
                    },
                ],
            },
        ],
        model: graphConfigLeaves(getVueDataUiConfig("vue_ui_treemap")).map(
            ({ path, value, type }) => ({
                key: path,
                def: value,
                type: getGraphMakerControlType(path, type),
                ...(type === "number" && numericBounds[path]
                    ? {
                          min: numericBounds[path][0],
                          max: numericBounds[path][1],
                          step: numericBounds[path][2],
                      }
                    : {}),
                ...getGraphMakerPresentation(path),
                ...(path === "userOptions.annotator.outlineColor"
                    ? { nullable: true }
                    : {}),
                ...(["showGroupActions", "followZoom"].includes(
                    path.split(".").at(-1),
                ) && path.startsWith("userOptions.annotator.")
                    ? { label: path.split(".").at(-1) }
                    : {}),
            }),
        ),
    };
}
