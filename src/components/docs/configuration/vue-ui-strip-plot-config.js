// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiStripPlotConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiStripPlotConfig",
            equal: true,
            children: [
                {
                    attr: "devHints",
                    level: 1,
                    children: [
                        {
                            name: "enable",
                            attr: "devHints.enable",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                    ],
                },
                {
                    name: "type",
                    attr: "type",
                    type: "select",
                    options: ["classic", "scatter", "violin"],
                    defaultVal: "classic",
                },
                {
                    inactive: true,
                    name: "responsive",
                    defaultVal: "false",
                    comment: translations.responsive[store.lang],
                },
                { inactive: true, name: "debug", defaultVal: "false" },
                {
                    name: "loading",
                    attr: "loading",
                    type: "checkbox",
                    defaultVal: "false",
                },
                {
                    inactive: true,
                    name: "responsiveProportionalSizing",
                    defaultVal: "true",
                    comment:
                        translations.responsiveProportionalSizing[store.lang],
                },
                {
                    inactive: true,
                    name: "theme",
                    defaultVal: "''",
                    comment:
                        "'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'",
                },
                {
                    inactive: true,
                    name: "customPalette",
                    defaultVal: "[]",
                    comment: "string[]",
                },
                {
                    name: "useCssAnimation",
                    attr: "useCssAnimation",
                    type: "checkbox",
                    defaultVal: "true",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    attr: "transitions",
                    level: 1,
                    children: [
                        {
                            name: "enable",
                            attr: "transitions.enable",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate(..._args);
                            },
                        },
                        {
                            name: "pauseOnLoad",
                            attr: "transitions.pauseOnLoad",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "pauseOnDatasetChange",
                            attr: "transitions.pauseOnDatasetChange",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "activationDelayMs",
                            attr: "transitions.activationDelayMs",
                            type: "number",
                            min: 100,
                            max: 1000,
                            step: 50,
                            defaultVal: "300",
                        },
                    ],
                },
                {
                    attr: "a11y",
                    level: 1,
                    children: [
                        {
                            attr: "translations",
                            level: 2,
                            title: "a11y.translations",
                            children: [
                                {
                                    name: "keyboardNavigation",
                                    attr: "a11y.translations.keyboardNavigation",
                                    type: "text",
                                    defaultVal:
                                        "'Use the left and right arrow keys to move between data points.'",
                                },
                                {
                                    name: "tableAvailable",
                                    attr: "a11y.translations.tableAvailable",
                                    type: "text",
                                    defaultVal:
                                        "'A data table for this chart is available below.'",
                                },
                                {
                                    name: "tableCaption",
                                    attr: "a11y.translations.tableCaption",
                                    type: "text",
                                    defaultVal: "'Chart data table'",
                                },
                            ],
                        },
                    ],
                },
                {
                    attr: "events",
                    level: 1,
                    children: [
                        {
                            inactive: true,
                            name: "datapointEnter",
                            defaultVal: "null",
                            comment:
                                "({datapoint, seriesIndex}) => { console.log(datapoint) }",
                        },
                        {
                            inactive: true,
                            name: "datapointLeave",
                            defaultVal: "null",
                            comment:
                                "({datapoint, seriesIndex}) => { console.log(datapoint) }",
                        },
                        {
                            inactive: true,
                            name: "datapointClick",
                            defaultVal: "null",
                            comment:
                                "({datapoint, seriesIndex}) => { console.log(datapoint) }",
                        },
                    ],
                },
                {
                    attr: "style",
                    level: 1,
                    children: [
                        {
                            component: "span",
                            children: [{ text: 'fontFamily: "inherit",' }],
                        },
                        {
                            attr: "chart",
                            level: 2,
                            title: "style.chart",
                            children: [
                                {
                                    name: "backgroundColor",
                                    type: "color",
                                    attr: "style.chart.backgroundColor",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    type: "color",
                                    attr: "style.chart.color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "height",
                                    attr: "style.chart.height",
                                    type: "number",
                                    min: 300,
                                    max: 1000,
                                    step: 50,
                                    defaultVal: "600",
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "number",
                                    min: 300,
                                    max: 1000,
                                    step: 50,
                                    defaultVal: "600",
                                },
                                {
                                    attr: "grid",
                                    level: 3,
                                    title: "style.chart.grid",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.grid.show",
                                            type: "checkbox",
                                            defaultval: "true",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.grid.stroke",
                                            type: "color",
                                            defaultVal: "#CCCCCC",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.grid.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "scaleSteps",
                                            attr: "style.chart.grid.scaleSteps",
                                            type: "select",
                                            defaultVal: "10",
                                            options: [2, 5, 10, 20],
                                        },
                                        {
                                            inactive: true,
                                            name: "scaleMin",
                                            attr: "style.chart.grid.scaleMin",
                                            type: "number",
                                            defaultVal: "null",
                                            min: -100000,
                                            max: 100000,
                                            comment: "Since 3.23.7",
                                        },
                                        {
                                            inactive: true,
                                            name: "scaleMax",
                                            attr: "style.chart.grid.scaleMax",
                                            type: "number",
                                            defaultVal: "null",
                                            min: -100000,
                                            max: 100000,
                                            comment: "Since 3.23.7",
                                        },
                                        {
                                            attr: "horizontalGrid",
                                            level: 4,
                                            title: "style.chart.grid.horizontalGrid",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.grid.horizontalGrid.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.grid.horizontalGrid.stroke",
                                                    type: "color",
                                                    defaultVal: "#CCCCCC",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.grid.horizontalGrid.strokeWidth",
                                                    type: "range",
                                                    defaultVal: "0.5",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.chart.grid.horizontalGrid.strokeDasharray",
                                                    type: "range",
                                                    defaultVal: "4",
                                                    min: 0,
                                                    max: 40,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "verticalGrid",
                                            level: 4,
                                            title: "style.chart.grid.verticalGrid",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.grid.verticalGrid.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.grid.verticalGrid.stroke",
                                                    type: "color",
                                                    defaultVal: "#CCCCCC",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.grid.verticalGrid.strokeWidth",
                                                    type: "range",
                                                    defaultVal: "0.5",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.chart.grid.verticalGrid.strokeDasharray",
                                                    type: "range",
                                                    defaultVal: "4",
                                                    min: 0,
                                                    max: 40,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "labels",
                                    level: 3,
                                    title: "style.chart.labels",
                                    children: [
                                        {
                                            name: "prefix",
                                            attr: "style.chart.labels.prefix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "suffix",
                                            attr: "style.chart.labels.suffix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            component: "div",
                                            class: "flex flex-row gap-2 place-items-center",
                                            children: [
                                                {
                                                    inactive: true,
                                                    name: "formatter",
                                                    defaultVal: "null",
                                                    comment:
                                                        translations
                                                            .formatterLink[
                                                            store.lang
                                                        ],
                                                },
                                                {
                                                    component: "div",
                                                    class: "min-w-[200px]",
                                                    children: [
                                                        {
                                                            component:
                                                                "BaseTabLink",
                                                            action: () =>
                                                                goToPage(
                                                                    "/customization#formatter",
                                                                ),
                                                            icon: "cursor",
                                                            children: [
                                                                {
                                                                    text: " Go to page ",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "axis",
                                            level: 4,
                                            title: "style.chart.labels.axis",
                                            children: [
                                                {
                                                    name: "xLabel",
                                                    attr: "style.chart.labels.axis.xLabel",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "xLabelOffsetY",
                                                    attr: "style.chart.labels.axis.xLabelOffsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "yLabel",
                                                    attr: "style.chart.labels.axis.yLabel",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "yLabelOffsetX",
                                                    attr: "style.chart.labels.axis.yLabelOffsetX",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.labels.axis.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.labels.axis.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "bestPlotLabel",
                                            level: 4,
                                            title: "style.chart.labels.bestPlotLabel",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.labels.bestPlotLabel.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "showValue",
                                                    attr: "style.chart.labels.bestPlotLabel.showValue",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.labels.bestPlotLabel.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.labels.bestPlotLabel.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.labels.bestPlotLabel.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.labels.bestPlotLabel.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "xAxisLabels",
                                            level: 4,
                                            title: "style.chart.labels.xAxisLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.labels.xAxisLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.labels.xAxisLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.labels.xAxisLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.labels.xAxisLabels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "rotation",
                                                    attr: "style.chart.labels.xAxisLabels.rotation",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -90,
                                                    max: 90,
                                                },
                                                {
                                                    attr: "autoRotate",
                                                    level: 5,
                                                    title: "style.chart.labels.xAxisLabels.autoRotate",
                                                    children: [
                                                        {
                                                            name: "enable",
                                                            attr: "style.chart.labels.xAxisLabels.autoRotate.enable",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "angle",
                                                            attr: "style.chart.labels.xAxisLabels.autoRotate.angle",
                                                            type: "number",
                                                            defaultVal: "-30",
                                                            min: -90,
                                                            max: 90,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "yAxisLabels",
                                            level: 4,
                                            title: "style.chart.labels.yAxisLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.labels.yAxisLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.labels.yAxisLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.labels.yAxisLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.labels.yAxisLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "offsetX",
                                                    attr: "style.chart.labels.yAxisLabels.offsetX",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "padding",
                                    level: 3,
                                    title: "style.chart.padding",
                                    children: [
                                        {
                                            name: "top",
                                            attr: "style.chart.padding.top",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.padding.right",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.padding.bottom",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "lzft",
                                            attr: "style.chart.padding.left",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                    ],
                                },
                                {
                                    attr: "plots",
                                    level: 3,
                                    title: "style.chart.plots",
                                    children: [
                                        {
                                            name: "opacity",
                                            attr: "style.chart.plots.opacity",
                                            type: "range",
                                            defaultVal: "0.5",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "radius",
                                            attr: "style.chart.plots.radius",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 2,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.plots.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.plots.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "shape",
                                            attr: "style.chart.plots.shape",
                                            type: "select",
                                            defaultVal: "circle",
                                            options: [
                                                "circle",
                                                "triangle",
                                                "square",
                                                "diamond",
                                                "pentagon",
                                                "hexagon",
                                                "star",
                                            ],
                                        },
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.chart.plots.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.plots.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "intensity",
                                                    attr: "style.chart.plots.gradient.intensity",
                                                    type: "range",
                                                    defaultVal: "40",
                                                    min: 0,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "violin",
                                    level: 3,
                                    title: "style.chart.violin",
                                    children: [
                                        {
                                            name: "widthRatio",
                                            attr: "style.chart.violin.widthRatio",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 1,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.violin.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 6,
                                            step: 0.5,
                                        },
                                        {
                                            name: "opacity",
                                            attr: "style.chart.violin.opacity",
                                            type: "number",
                                            defaultVal: "0.2",
                                            min: 0,
                                            max: 1,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeOpacity",
                                            attr: "style.chart.violin.strokeOpacity",
                                            type: "number",
                                            defaultVal: "0.35",
                                            min: 0,
                                            max: 1.05,
                                            step: 0.05,
                                        },
                                        {
                                            name: "useSerieColor",
                                            attr: "style.chart.violin.useSerieColor",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.violin.stroke",
                                            type: "color",
                                            defaultVal: "#5A5A5A",
                                        },
                                        {
                                            name: "fill",
                                            attr: "style.chart.violin.fill",
                                            type: "color",
                                            defaultVal: "#5A5A5A",
                                        },
                                        {
                                            attr: "boxPlot",
                                            level: 4,
                                            title: "style.chart.violin.boxPlot",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.violin.boxPlot.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "widthRatio",
                                                    attr: "style.chart.violin.boxPlot.widthRatio",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "useSerieColor",
                                                    attr: "style.chart.violin.boxPlot.useSerieColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.violin.boxPlot.color",
                                                    type: "color",
                                                    defaultVal: "#5A5A5A",
                                                },
                                                {
                                                    name: "medianCircleRadiusRatio",
                                                    attr: "style.chart.violin.boxPlot.medianCircleRadiusRatio",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 1.5,
                                                    step: 0.05,
                                                },
                                                {
                                                    name: "medianCircleFill",
                                                    attr: "style.chart.violin.boxPlot.medianCircleFill",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "tooltipLabels",
                                            level: 4,
                                            title: "style.chart.violin.tooltipLabels",
                                            children: [
                                                {
                                                    name: "upperAdjacent",
                                                    attr: "style.chart.violin.tooltipLabels.upperAdjacent",
                                                    type: "text",
                                                    defaultVal:
                                                        "Upper adjacent",
                                                },
                                                {
                                                    name: "q3",
                                                    attr: "style.chart.violin.tooltipLabels.q3",
                                                    type: "text",
                                                    defaultVal: "Q3",
                                                },
                                                {
                                                    name: "median",
                                                    attr: "style.chart.violin.tooltipLabels.median",
                                                    type: "text",
                                                    defaultVal: "Median",
                                                },
                                                {
                                                    name: "q1",
                                                    attr: "style.chart.violin.tooltipLabels.q1",
                                                    type: "text",
                                                    defaultVal: "Q1",
                                                },
                                                {
                                                    name: "lowerAdjacent",
                                                    attr: "style.chart.violin.tooltipLabels.lowerAdjacent",
                                                    type: "text",
                                                    defaultVal:
                                                        "Lower adjacent",
                                                },
                                                {
                                                    name: "iqr",
                                                    attr: "style.chart.violin.tooltipLabels.iqr",
                                                    type: "text",
                                                    defaultVal: "IQR",
                                                },
                                                {
                                                    name: "count",
                                                    attr: "style.chart.violin.tooltipLabels.count",
                                                    type: "text",
                                                    defaultVal: "Count",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "title",
                                    level: 3,
                                    title: "style.chart.title",
                                    children: [
                                        {
                                            name: "color",
                                            attr: "style.chart.title.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "text",
                                            attr: "style.chart.title.text",
                                            type: "text",
                                            defaultVal: "''",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.title.fontSize",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 8,
                                            max: 42,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.title.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "textAlign",
                                            attr: "style.chart.title.textAlign",
                                            type: "select",
                                            defaultVal: "center",
                                            options: [
                                                "left",
                                                "center",
                                                "right",
                                            ],
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "paddingLeft",
                                            attr: "style.chart.title.paddingLeft",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "paddingRight",
                                            attr: "style.chart.title.paddingRight",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            attr: "subtitle",
                                            level: 4,
                                            title: "style.chart.title.subtitle",
                                            children: [
                                                {
                                                    name: "color",
                                                    attr: "style.chart.title.subtitle.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "text",
                                                    attr: "style.chart.title.subtitle.text",
                                                    type: "text",
                                                    defaultVal: "''",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.title.subtitle.fontSize",
                                                    type: "number",
                                                    defaultVal: "20",
                                                    min: 8,
                                                    max: 42,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.title.subtitle.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "tooltip",
                                    level: 3,
                                    title: "style.chart.tooltip",
                                    children: [
                                        {
                                            inactive: true,
                                            name: "teleportTo",
                                            defaultVal: "'body'",
                                            comment:
                                                "Sets the 'to' attr of the Teleport Vue component",
                                        },
                                        {
                                            name: "show",
                                            attr: "style.chart.tooltip.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.tooltip.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.tooltip.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.tooltip.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "roundingValue",
                                            attr: "style.chart.tooltip.roundingValue",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            component: "div",
                                            class: "flex flex-row gap-2 place-items-center",
                                            children: [
                                                {
                                                    inactive: true,
                                                    name: "customFormat",
                                                    defaultVal: "null",
                                                    comment:
                                                        "default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)",
                                                },
                                                {
                                                    component: "div",
                                                    class: "min-w-[200px]",
                                                    children: [
                                                        {
                                                            component:
                                                                "BaseTabLink",
                                                            action: () =>
                                                                setActiveTab(4),
                                                            icon: "tooltip",
                                                            children: [
                                                                {
                                                                    text: " Check out 'Custom tooltip' tab ",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            name: "borderRadius",
                                            attr: "style.chart.tooltip.borderRadius",
                                            type: "number",
                                            defaultVal: "4",
                                            min: 0,
                                            max: 24,
                                        },
                                        {
                                            name: "borderColor",
                                            attr: "style.chart.tooltip.borderColor",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "borderWidth",
                                            attr: "style.chart.tooltip.borderWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 24,
                                        },
                                        {
                                            name: "backgroundOpacity",
                                            attr: "style.chart.tooltip.backgroundOpacity",
                                            type: "number",
                                            defaultVal: "100",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "position",
                                            attr: "style.chart.tooltip.position",
                                            type: "select",
                                            defaultVal: "center",
                                            options: [
                                                "left",
                                                "center",
                                                "right",
                                            ],
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "offsetX",
                                            attr: "style.chart.tooltip.offsetX",
                                            type: "number",
                                            defaultVal: "0",
                                            min: -100,
                                            max: 100,
                                        },
                                        {
                                            name: "offsetY",
                                            attr: "style.chart.tooltip.offsetY",
                                            type: "number",
                                            defaultVal: "24",
                                            min: -100,
                                            max: 100,
                                        },
                                        {
                                            name: "smooth",
                                            attr: "style.chart.tooltip.smooth",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "smoothForce",
                                            attr: "style.chart.tooltip.smoothForce",
                                            type: "number",
                                            defaultVal: "0.18",
                                            min: 0.1,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "smoothSnapThreshold",
                                            attr: "style.chart.tooltip.smoothSnapThreshold",
                                            type: "number",
                                            defaultVal: "0.25",
                                            min: 0.1,
                                            max: 0.24,
                                            step: 0.01,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    attr: "table",
                    level: 1,
                    children: [
                        {
                            name: "show",
                            attr: "table.show",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "useDialog",
                            attr: "table.useDialog",
                            type: "checkbox",
                            defaultVal: "false",
                            comment: "since v3.1.0",
                        },
                        {
                            name: "responsiveBreakpoint",
                            attr: "table.responsiveBreakpoint",
                            type: "number",
                            defaultVal: "400",
                            min: 300,
                            max: 800,
                            step: 50,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            attr: "columnNames",
                            level: 2,
                            title: "table.columnNames",
                            children: [
                                {
                                    name: "series",
                                    attr: "table.columnNames.series",
                                    type: "text",
                                    defaultVal: "Series",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "value",
                                    attr: "table.columnNames.value",
                                    type: "text",
                                    defaultVal: "Value",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "th",
                            level: 2,
                            title: "table.th",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "table.th.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "color",
                                    attr: "table.th.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "outline",
                                    attr: "table.th.outline",
                                    type: "text",
                                    defaultVal: "none",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "td",
                            level: 2,
                            title: "table.td",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "table.td.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "color",
                                    attr: "table.td.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "outline",
                                    attr: "table.td.outline",
                                    type: "text",
                                    defaultVal: "none",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "roundingValue",
                                    attr: "table.td.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    attr: "userOptions",
                    level: 1,
                    children: [
                        {
                            attr: "annotator",
                            level: 2,
                            title: "userOptions.annotator",
                            children: [
                                {
                                    name: "showGroupActions",
                                    attr: "userOptions.annotator.showGroupActions",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    tooltip:
                                        "Show multi-selection, group and ungroup actions independently of followZoom.",
                                },
                            ],
                        },
                        {
                            name: "show",
                            attr: "userOptions.show",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "showOnChartHover",
                            attr: "userOptions.showOnChartHover",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "keepStateOnChartLeave",
                            attr: "userOptions.keepStateOnChartLeave",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "position",
                            attr: "userOptions.position",
                            type: "select",
                            defaultVal: "right",
                            options: ["right", "left"],
                        },
                        {
                            name: "useCursorPointer",
                            attr: "userOptions.useCursorPointer",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        { component: "BaseAttrAnnotatorPalette" },
                        {
                            attr: "buttons",
                            level: 2,
                            title: "userOptions.buttons",
                            children: [
                                {
                                    name: "tooltip",
                                    attr: "userOptions.buttons.tooltip",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "pdf",
                                    attr: "userOptions.buttons.pdf",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttons.img",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttons.csv",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttons.table",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "labels",
                                    attr: "userOptions.buttons.labels",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttons.fullscreen",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttons.annotator",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "buttonTitles",
                            level: 2,
                            title: "userOptions.buttonTitles",
                            children: [
                                {
                                    name: "open",
                                    attr: "userOptions.buttonTitles.open",
                                    type: "text",
                                    defaultVal: "Open options",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "close",
                                    attr: "userOptions.buttonTitles.close",
                                    type: "text",
                                    defaultVal: "Close options",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "tooltip",
                                    attr: "userOptions.buttonTitles.tooltip",
                                    type: "text",
                                    defaultVal: "Toggle tooltip",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "pdf",
                                    attr: "userOptions.buttonTitles.pdf",
                                    type: "text",
                                    defaultVal: "Download PDF",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttonTitles.csv",
                                    type: "text",
                                    defaultVal: "Download CSV",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttonTitles.img",
                                    type: "text",
                                    defaultVal: "Download PNG",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttonTitles.table",
                                    type: "text",
                                    defaultVal: "Toggle table",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "labels",
                                    attr: "userOptions.buttonTitles.labels",
                                    type: "text",
                                    defaultVal: "Toggle labels",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttonTitles.fullscreen",
                                    type: "text",
                                    defaultVal: "Toggle fullscreen",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttonTitles.annotator",
                                    type: "text",
                                    defaultVal: "Toggle annotator",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "callbacks",
                            level: 2,
                            title: "userOptions.callbacks",
                            children: [
                                {
                                    component: "BaseTabLink",
                                    action: () => setActiveTab(11),
                                    icon: "lambda",
                                    children: [
                                        { text: " Check out 'callbacks' tab " },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "print",
                            level: 2,
                            title: "userOptions.print",
                            children: [
                                {
                                    name: "scale",
                                    attr: "userOptions.print.scale",
                                    type: "number",
                                    min: 1,
                                    max: 5,
                                    defaultVal: "2",
                                    comment:
                                        "Set print quality (higher = larger file)",
                                },
                                {
                                    inactive: true,
                                    name: "orientation",
                                    defaultVal: "auto",
                                    comment: "'auto' | 'l' | 'p'",
                                },
                                {
                                    inactive: true,
                                    name: "overflowTolerance",
                                    defaultVal: "0.2",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
