import { getVueDataUiConfig } from "vue-data-ui/utils";
import { graphConfigLeaves } from "../../components/docs/graph.js";
import {
    getGraphMakerControlType,
    getGraphMakerPresentation,
} from "../../components/maker/graphMaker.js";

// Numeric ranges match the documentation controls.
const numericBounds = {
    animationSpeed: [0.1, 6, 0.1],
    "style.chart.width": [300, 1000, 50],
    "style.chart.rowHeight": [40, 100, 1],
    "style.chart.grid.strokeWidth": [1, 12, 1],
    "style.chart.grid.horizontalGrid.strokeWidth": [0, 12, 0.1],
    "style.chart.grid.horizontalGrid.strokeDasharray": [0, 100, 1],
    "style.chart.grid.verticalGrid.strokeWidth": [0, 12, 0.1],
    "style.chart.grid.verticalGrid.strokeDasharray": [0, 100, 1],
    "style.chart.comparisonLines.strokeWidth": [0, 12, 0.1],
    "style.chart.comparisonLines.strokeDasharray": [0, 24, 1],
    "style.chart.comparisonLines.rectOpacity": [0, 100, 1],
    "style.chart.comparisonLines.labelFontSize": [8, 42, 1],
    "style.chart.highlighter.opacity": [0, 100, 1],
    "style.chart.labels.axis.yLabelOffsetX": [-100, 100, 1],
    "style.chart.labels.axis.xLabelOffsetY": [-100, 100, 1],
    "style.chart.labels.axis.fontSize": [8, 42, 1],
    "style.chart.labels.endLabels.fontSize": [8, 42, 1],
    "style.chart.labels.endLabels.offsetY": [-100, 100, 1],
    "style.chart.labels.endLabels.rounding": [0, 6, 1],
    "style.chart.labels.startLabels.fontSize": [8, 42, 1],
    "style.chart.labels.startLabels.offsetY": [-100, 100, 1],
    "style.chart.labels.startLabels.rounding": [0, 6, 1],
    "style.chart.labels.xAxisLabels.fontSize": [8, 42, 1],
    "style.chart.labels.xAxisLabels.offsetY": [-100, 100, 1],
    "style.chart.labels.xAxisLabels.rounding": [0, 6, 1],
    "style.chart.labels.xAxisLabels.rotation": [-90, 90, 1],
    "style.chart.labels.xAxisLabels.autoRotate.angle": [-90, 90, 1],
    "style.chart.labels.yAxisLabels.fontSize": [8, 42, 1],
    "style.chart.labels.yAxisLabels.offsetX": [-100, 100, 1],
    "style.chart.labels.yAxisLabels.rounding": [0, 6, 1],
    "style.chart.legend.fontSize": [8, 42, 1],
    "style.chart.padding.top": [0, 100, 1],
    "style.chart.padding.right": [0, 100, 1],
    "style.chart.padding.bottom": [0, 100, 1],
    "style.chart.padding.left": [0, 100, 1],
    "style.chart.plots.radius": [2, 12, 1],
    "style.chart.plots.strokeWidth": [0, 12, 1],
    "style.chart.plots.gradient.intensity": [0, 100, 1],
    "style.chart.plots.link.strokeWidth": [1, 12, 1],
    "style.chart.title.fontSize": [8, 42, 1],
    "style.chart.title.paddingLeft": [0, 100, 1],
    "style.chart.title.paddingRight": [0, 100, 1],
    "style.chart.title.subtitle.fontSize": [8, 42, 1],
    "table.responsiveBreakpoint": [300, 800, 50],
    "table.td.roundingValue": [0, 6, 1],
    "table.td.roundingPercentage": [0, 6, 1],
    "userOptions.annotator.outlineThickness": [0, 10, 0.5],
    "userOptions.print.scale": [1, 5, 1],
    "style.chart.grid.scaleSteps": [1, 100, 1],
    "userOptions.print.overflowTolerance": [0, 1, 0.01],
};

const selectOptions = {
    "style.chart.legend.position": ["top", "bottom"],
    "style.chart.plots.link.type": ["curved", "line"],
    "style.chart.title.textAlign": ["left", "center", "right"],
    "userOptions.position": ["right", "left"],
    "userOptions.print.orientation": ["auto", "portrait", "landscape"],
};

export function createVueUiDumbbellDefaults() {
    return {
        dataset: [
            { name: "Sweden", start: 5000, end: 7100 },
            { name: "Korea, Rep.", start: 4900, end: 7050 },
            { name: "Iceland", start: 6500, end: 8000 },
            { name: "Finland", start: 6400, end: 7600 },
            { name: "Norway", start: 5400, end: 6050 },
            { name: "Ireland", start: 3000, end: 2000 },
        ],
        model: graphConfigLeaves(getVueDataUiConfig("vue_ui_dumbbell"))
            .filter(({ path }) => path !== "userOptions.annotator.followZoom")
            .map(({ path, value, type }) => ({
                key: path,
                def: value,
                type: /^style\.chart\.plots\.evaluationColors\.(positive|negative|neutral)$/.test(
                    path,
                )
                    ? "color"
                    : getGraphMakerControlType(path, type),
                ...getGraphMakerPresentation(path),
                ...(selectOptions[path]
                    ? { type: "select", options: selectOptions[path] }
                    : {}),
                ...(type === "number" && numericBounds[path]
                    ? {
                          min: numericBounds[path][0],
                          max: numericBounds[path][1],
                          step: numericBounds[path][2],
                      }
                    : {}),
                ...(path === "userOptions.annotator.outlineColor"
                    ? { nullable: true }
                    : {}),
                ...([
                    "userOptions.annotator.showGroupActions",
                    "userOptions.annotator.followZoom",
                ].includes(path)
                    ? { label: path.split(".").at(-1) }
                    : {}),
            })),
    };
}
