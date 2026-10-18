// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiScatterConfigFields({
    forceChartUpdate,
    goToPage,
    performanceModeComment,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiScatterConfig",
            equal: true,
            children: [
                {
                    component: "span",
                    children: [
                        { text: "responsive: false, " },
                        {
                            component: "BaseComment",
                            children: [
                                { text: translations.responsive[store.lang] },
                            ],
                        },
                    ],
                },
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
                { inactive: true, name: "debug", defaultVal: "false" },
                {
                    name: "loading",
                    attr: "loading",
                    type: "checkbox",
                    defaultVal: "false",
                },
                {
                    component: "span",
                    children: [
                        { text: 'theme: "", ' },
                        {
                            component: "BaseComment",
                            children: [
                                {
                                    text: '"dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""',
                                },
                            ],
                        },
                    ],
                },
                {
                    component: "span",
                    children: [
                        { text: "customPalette: [], " },
                        {
                            component: "BaseComment",
                            children: [{ text: "string[]" }],
                        },
                    ],
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
                    name: "usePerformanceMode",
                    attr: "usePerformanceMode",
                    type: "checkbox",
                    defaultVal: "false",
                    comment: performanceModeComment[store.lang],
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
                    attr: "downsample",
                    level: 1,
                    children: [
                        {
                            name: "threshold",
                            attr: "downsample.threshold",
                            type: "number",
                            defaultVal: "1095",
                            min: 100,
                            max: 5000,
                            comment:
                                "Threshold above which LTTB algorithm kicks in",
                        },
                    ],
                },
                {
                    attr: "style",
                    level: 1,
                    children: [
                        {
                            name: "backgroundColor",
                            attr: "style.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "style.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            component: "span",
                            children: [{ text: 'fontFamily: "inherit",' }],
                        },
                        {
                            attr: "layout",
                            level: 2,
                            title: "style.layout",
                            children: [
                                {
                                    name: "height",
                                    attr: "style.layout.height",
                                    type: "number",
                                    defaultVal: "316",
                                    min: 200,
                                    max: 1000,
                                    step: 24,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "width",
                                    attr: "style.layout.width",
                                    type: "number",
                                    defaultVal: "512",
                                    min: 200,
                                    max: 1000,
                                    step: 24,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    attr: "axis",
                                    level: 3,
                                    title: "style.layout.axis",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.layout.axis.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.layout.axis.stroke",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.layout.axis.strokeWidth",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                            step: 0.1,
                                        },
                                        {
                                            name: "xMin",
                                            attr: "style.layout.axis.xMin",
                                            type: "number",
                                            defaultVal: "null",
                                        },
                                        {
                                            name: "xMax",
                                            attr: "style.layout.axis.xMax",
                                            type: "number",
                                            defaultVal: "null",
                                        },
                                        {
                                            name: "yMin",
                                            attr: "style.layout.axis.yMin",
                                            type: "number",
                                            defaultVal: "null",
                                        },
                                        {
                                            name: "yMax",
                                            attr: "style.layout.axis.yMax",
                                            type: "number",
                                            defaultVal: "null",
                                        },
                                    ],
                                },
                                {
                                    attr: "correlation",
                                    level: 3,
                                    title: "style.layout.correlation",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.layout.correlation.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "strokeDasharray",
                                            attr: "style.layout.correlation.strokeDasharray",
                                            type: "range",
                                            defaultVal: "2",
                                            min: 0,
                                            max: 24,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.layout.correlation.strokeWidth",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                            step: 0.1,
                                        },
                                        {
                                            attr: "label",
                                            level: 4,
                                            title: "style.layout.correlation.label",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.correlation.label.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.layout.correlation.label.fontSize",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "useSerieColor",
                                                    attr: "style.layout.correlation.label.useSerieColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.correlation.label.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.layout.correlation.label.bold",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "roundingValue",
                                                    attr: "style.layout.correlation.label.roundingValue",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 6,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "dataLabels",
                                    level: 3,
                                    title: "style.layout.dataLabels",
                                    children: [
                                        {
                                            name: "reverseAxisLabels",
                                            attr: "style.layout.dataLabels.reverseAxisLabels",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            attr: "xAxis",
                                            level: 4,
                                            title: "style.layout.dataLabels.xAxis",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.dataLabels.xAxis.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "name",
                                                    attr: "style.layout.dataLabels.xAxis.name",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.layout.dataLabels.xAxis.fontSize",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.dataLabels.xAxis.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.layout.dataLabels.xAxis.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "roundingValue",
                                                    attr: "style.layout.dataLabels.xAxis.roundingValue",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "showValue",
                                                    attr: "style.layout.dataLabels.xAxis.showValue",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    attr: "scales",
                                                    level: 5,
                                                    title: "style.layout.dataLabels.xAxis.scales",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.layout.dataLabels.xAxis.scales.show",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "steps",
                                                            attr: "style.layout.dataLabels.xAxis.scales.steps",
                                                            type: "number",
                                                            defaultVal: "10",
                                                            min: 0,
                                                            max: 20,
                                                        },
                                                        {
                                                            name: "useNiceScale",
                                                            attr: "style.layout.dataLabels.xAxis.scales.useNiceScale",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            attr: "labels",
                                                            level: 6,
                                                            title: "style.layout.dataLabels.xAxis.scales.labels",
                                                            children: [
                                                                {
                                                                    inactive: true,
                                                                    name: "formatter",
                                                                    defaultVal:
                                                                        "null",
                                                                    comment:
                                                                        translations
                                                                            .formatterLink[
                                                                            store
                                                                                .lang
                                                                        ],
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.layout.dataLabels.xAxis.scales.labels.color",
                                                                    type: "color",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.layout.dataLabels.xAxis.scales.labels.fontSize",
                                                                    type: "number",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "offsetY",
                                                                    attr: "style.layout.dataLabels.xAxis.scales.labels.offsetY",
                                                                    type: "number",
                                                                    min: -100,
                                                                    max: 100,
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "verticalLines",
                                                            level: 6,
                                                            title: "style.layout.dataLabels.xAxis.scales.verticalLines",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.layout.dataLabels.xAxis.scales.verticalLines.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "stroke",
                                                                    attr: "style.layout.dataLabels.xAxis.scales.verticalLines.stroke",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#E1E5E8",
                                                                },
                                                                {
                                                                    name: "strokeWidth",
                                                                    attr: "style.layout.dataLabels.xAxis.scales.verticalLines.strokeWidth",
                                                                    type: "number",
                                                                    min: 0,
                                                                    max: 4,
                                                                    step: 0.1,
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "yAxis",
                                            level: 4,
                                            title: "style.layout.dataLabels.yAxis",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.dataLabels.yAxis.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "name",
                                                    attr: "style.layout.dataLabels.yAxis.name",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.layout.dataLabels.yAxis.fontSize",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.dataLabels.yAxis.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.layout.dataLabels.yAxis.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "roundingValue",
                                                    attr: "style.layout.dataLabels.yAxis.roundingValue",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "showValue",
                                                    attr: "style.layout.dataLabels.yAxis.showValue",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    attr: "scales",
                                                    level: 5,
                                                    title: "style.layout.dataLabels.yAxis.scales",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.layout.dataLabels.yAxis.scales.show",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "steps",
                                                            attr: "style.layout.dataLabels.yAxis.scales.steps",
                                                            type: "number",
                                                            defaultVal: "10",
                                                            min: 0,
                                                            max: 20,
                                                        },
                                                        {
                                                            name: "useNiceScale",
                                                            attr: "style.layout.dataLabels.yAxis.scales.useNiceScale",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            attr: "labels",
                                                            level: 6,
                                                            title: "style.layout.dataLabels.yAxis.scales.labels",
                                                            children: [
                                                                {
                                                                    inactive: true,
                                                                    name: "formatter",
                                                                    defaultVal:
                                                                        "null",
                                                                    comment:
                                                                        translations
                                                                            .formatterLink[
                                                                            store
                                                                                .lang
                                                                        ],
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.layout.dataLabels.yAxis.scales.labels.color",
                                                                    type: "color",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.layout.dataLabels.yAxis.scales.labels.fontSize",
                                                                    type: "number",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "offsetX",
                                                                    attr: "style.layout.dataLabels.yAxis.scales.labels.offsetX",
                                                                    type: "number",
                                                                    min: -100,
                                                                    max: 100,
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "horizontalLines",
                                                            level: 6,
                                                            title: "style.layout.dataLabels.yAxis.scales.horizontalLines",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.layout.dataLabels.yAxis.scales.horizontalLines.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "stroke",
                                                                    attr: "style.layout.dataLabels.yAxis.scales.horizontalLines.stroke",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#E1E5E8",
                                                                },
                                                                {
                                                                    name: "strokeWidth",
                                                                    attr: "style.layout.dataLabels.yAxis.scales.horizontalLines.strokeWidth",
                                                                    type: "number",
                                                                    min: 0,
                                                                    max: 4,
                                                                    step: 0.1,
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "marginalBars",
                                    level: 3,
                                    title: "style.layout.marginalBars",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.layout.marginalBars.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "size",
                                            attr: "style.layout.marginalBars.size",
                                            type: "number",
                                            defaultVal: "40",
                                            min: 20,
                                            max: 100,
                                            step: 10,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "tranches",
                                            attr: "style.layout.marginalBars.tranches",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 10,
                                            max: 100,
                                            step: 5,
                                        },
                                        {
                                            name: "opacity",
                                            attr: "style.layout.marginalBars.opacity",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "fill",
                                            attr: "style.layout.marginalBars.fill",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.layout.marginalBars.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0.1,
                                            max: 6,
                                            step: 0.1,
                                        },
                                        {
                                            name: "offset",
                                            attr: "style.layout.marginalBars.offset",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "borderRadius",
                                            attr: "style.layout.marginalBars.borderRadius",
                                            type: "number",
                                            defaultVal: "2",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "useGradient",
                                            attr: "style.layout.marginalBars.useGradient",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "showLines",
                                            attr: "style.layout.marginalBars.showLines",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "linesStrokeWidth",
                                            attr: "style.layout.marginalBars.linesStrokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0.1,
                                            max: 6,
                                            step: 0.1,
                                        },
                                        {
                                            attr: "highlighter",
                                            level: 4,
                                            title: "style.layout.marginalBars.highlighter",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.marginalBars.highlighter.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "opacity",
                                                    attr: "style.layout.marginalBars.highlighter.opacity",
                                                    type: "number",
                                                    defaultVal: "0.1",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.01,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.marginalBars.highlighter.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.layout.marginalBars.highlighter.stroke",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.layout.marginalBars.highlighter.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0.5",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.layout.marginalBars.highlighter.strokeDasharray",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "highlightBothAxes",
                                                    attr: "style.layout.marginalBars.highlighter.highlightBothAxes",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "padding",
                                    level: 3,
                                    title: "style.layout.padding",
                                    children: [
                                        {
                                            name: "top",
                                            attr: "style.layout.padding.top",
                                            type: "number",
                                            defaultVal: "36",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "right",
                                            attr: "style.layout.padding.right",
                                            type: "number",
                                            defaultVal: "48",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.layout.padding.bottom",
                                            type: "number",
                                            defaultVal: "36",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "left",
                                            attr: "style.layout.padding.left",
                                            type: "number",
                                            defaultVal: "48",
                                            min: 0,
                                            max: 100,
                                        },
                                    ],
                                },
                                {
                                    attr: "plots",
                                    level: 3,
                                    title: "style.layout.plots",
                                    children: [
                                        {
                                            name: "radius",
                                            attr: "style.layout.plots.radius",
                                            type: "number",
                                            defaultVal: "2",
                                            min: 1,
                                            max: 24,
                                            step: 1,
                                        },
                                        {
                                            name: "hoverRadiusRatio",
                                            attr: "style.layout.plots.hoverRadiusRatio",
                                            defaultVal: "2",
                                            type: "number",
                                            min: 0,
                                            max: 5,
                                        },
                                        {
                                            name: "opacityNotSelected",
                                            attr: "style.layout.plots.opacityNotSelected",
                                            defaultVal: "0.6",
                                            type: "number",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.layout.plots.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.layout.plots.strokeWidth",
                                            type: "number",
                                            defaultVal: "0.3",
                                            min: 0,
                                            max: 6,
                                            step: 0.1,
                                        },
                                        {
                                            name: "opacity",
                                            attr: "style.layout.plots.opacity",
                                            type: "range",
                                            defaultVal: "0.6",
                                            min: 0.1,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            attr: "name",
                                            level: 4,
                                            title: "style.layout.plots.name",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.plots.name.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.layout.plots.name.fontSize",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.layout.plots.name.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.plots.name.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "deviation",
                                            level: 4,
                                            title: "style.layout.plots.deviation",
                                            children: [
                                                {
                                                    name: "translation",
                                                    attr: "style.layout.plots.deviation.translation",
                                                    type: "text",
                                                    defaultVal: "deviation",
                                                },
                                                {
                                                    name: "roundingValue",
                                                    attr: "style.layout.plots.deviation.roundingValue",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 6,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            attr: "giftWrap",
                                            level: 4,
                                            title: "style.layout.plots.giftWrap",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.plots.giftWrap.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.layout.plots.giftWrap.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.layout.plots.giftWrap.strokeDasharray",
                                                    type: "range",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 100,
                                                },
                                                {
                                                    name: "fillOpacity",
                                                    attr: "style.layout.plots.giftWrap.fillOpacity",
                                                    type: "range",
                                                    defaultVal: "0.2",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.01,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "selectors",
                                            level: 4,
                                            title: "style.layout.plots.selectors",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.plots.selectors.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.layout.plots.selectors.stroke",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.layout.plots.selectors.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0.7",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.layout.plots.selectors.strokeDasharray",
                                                    type: "range",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 100,
                                                },
                                                {
                                                    attr: "labels",
                                                    level: 5,
                                                    title: "style.layout.plots.selectors.labels",
                                                    children: [
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.layout.plots.selectors.labels.fontSize",
                                                            type: "number",
                                                            defaultval: "12",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.layout.plots.selectors.labels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "rounding",
                                                            attr: "style.layout.plots.selectors.labels.rounding",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.layout.plots.selectors.labels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "showName",
                                                            attr: "style.layout.plots.selectors.labels.showName",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "prefix",
                                                            attr: "style.layout.plots.selectors.labels.prefix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "suffix",
                                                            attr: "style.layout.plots.selectors.labels.suffix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            attr: "x",
                                                            level: 6,
                                                            title: "style.layout.plots.selectors.labels.x",
                                                            children: [
                                                                {
                                                                    component:
                                                                        "div",
                                                                    class: "flex flex-row gap-2 place-items-center",
                                                                    children: [
                                                                        {
                                                                            inactive: true,
                                                                            name: "formatter",
                                                                            defaultVal:
                                                                                "null",
                                                                            comment:
                                                                                translations
                                                                                    .formatterLink[
                                                                                    store
                                                                                        .lang
                                                                                ],
                                                                        },
                                                                        {
                                                                            component:
                                                                                "div",
                                                                            class: "min-w-[200px]",
                                                                            children:
                                                                                [
                                                                                    {
                                                                                        component:
                                                                                            "BaseTabLink",
                                                                                        action: () =>
                                                                                            goToPage(
                                                                                                "/customization#formatter",
                                                                                            ),
                                                                                        icon: "cursor",
                                                                                        children:
                                                                                            [
                                                                                                {
                                                                                                    text: " Go to page ",
                                                                                                },
                                                                                            ],
                                                                                    },
                                                                                ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "y",
                                                            level: 6,
                                                            title: "style.layout.plots.selectors.labels.y",
                                                            children: [
                                                                {
                                                                    component:
                                                                        "div",
                                                                    class: "flex flex-row gap-2 place-items-center",
                                                                    children: [
                                                                        {
                                                                            inactive: true,
                                                                            name: "formatter",
                                                                            defaultVal:
                                                                                "null",
                                                                            comment:
                                                                                translations
                                                                                    .formatterLink[
                                                                                    store
                                                                                        .lang
                                                                                ],
                                                                        },
                                                                        {
                                                                            component:
                                                                                "div",
                                                                            class: "min-w-[200px]",
                                                                            children:
                                                                                [
                                                                                    {
                                                                                        component:
                                                                                            "BaseTabLink",
                                                                                        action: () =>
                                                                                            goToPage(
                                                                                                "/customization#formatter",
                                                                                            ),
                                                                                        icon: "cursor",
                                                                                        children:
                                                                                            [
                                                                                                {
                                                                                                    text: " Go to page ",
                                                                                                },
                                                                                            ],
                                                                                    },
                                                                                ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "markers",
                                                    level: 5,
                                                    title: "style.layout.plots.selectors.markers",
                                                    children: [
                                                        {
                                                            name: "radius",
                                                            attr: "style.layout.plots.selectors.markers.radius",
                                                            type: "range",
                                                            defaultVal: "12",
                                                            min: 0,
                                                            max: 24,
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.layout.plots.selectors.markers.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.layout.plots.selectors.markers.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "0.5",
                                                            min: 0,
                                                            max: 12,
                                                            step: 0.1,
                                                        },
                                                        {
                                                            name: "fill",
                                                            attr: "style.layout.plots.selectors.markers.fill",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "significance",
                                            level: 4,
                                            title: "style.layout.plots.significance",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.plots.significance.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "useDistanceOpacity",
                                                    attr: "style.layout.plots.significance.useDistanceOpacity",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "deviationThreshold",
                                                    attr: "style.layout.plots.significance.deviationThreshold",
                                                    type: "number",
                                                    min: 0.1,
                                                    max: 12,
                                                    step: 0.1,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "opacity",
                                                    attr: "style.layout.plots.significance.opacity",
                                                    type: "range",
                                                    defaultVal: "0.3",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.01,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "legend",
                            level: 2,
                            title: "style.legend",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.legend.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "backgroundColor",
                                    attr: "style.legend.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "style.legend.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.legend.fontSize",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "bold",
                                    attr: "style.legend.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "roundingValue",
                                    attr: "style.legend.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                                {
                                    name: "position",
                                    attr: "style.legend.position",
                                    type: "select",
                                    defaultVal: "bottom",
                                    options: ["top", "bottom"],
                                },
                                {
                                    attr: "selectAllToggle",
                                    level: 3,
                                    title: "style.legend.selectAllToggle",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.legend.selectAllToggle.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.legend.selectAllToggle.backgroundColor",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.legend.selectAllToggle.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "title",
                            level: 3,
                            title: "style.title",
                            children: [
                                {
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "text",
                                    attr: "style.title.text",
                                    type: "text",
                                    defaultVal: "''",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.title.fontSize",
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
                                    attr: "style.title.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "textAlign",
                                    attr: "style.title.textAlign",
                                    type: "select",
                                    defaultVal: "center",
                                    options: ["left", "center", "right"],
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "paddingLeft",
                                    attr: "style.title.paddingLeft",
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
                                    attr: "style.title.paddingRight",
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
                                    title: "style.title.subtitle",
                                    children: [
                                        {
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "text",
                                            attr: "style.title.subtitle.text",
                                            type: "text",
                                            defaultVal: "''",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.title.subtitle.fontSize",
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
                                            attr: "style.title.subtitle.bold",
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
                            level: 2,
                            title: "style.tooltip",
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
                                    attr: "style.tooltip.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "backgroundColor",
                                    attr: "style.tooltip.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "style.tooltip.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.tooltip.fontSize",
                                    type: "number",
                                    defaultVal: "14",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "showShape",
                                    attr: "style.tooltip.showShape",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "prefix",
                                    attr: "style.tooltip.prefix",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "suffix",
                                    attr: "style.tooltip.suffix",
                                    type: "text",
                                    defaultVal: "''",
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
                                                    component: "BaseTabLink",
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
                                    attr: "style.tooltip.borderRadius",
                                    type: "number",
                                    defaultVal: "4",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "borderColor",
                                    attr: "style.tooltip.borderColor",
                                    type: "color",
                                    defaultval: "#E1E5E8",
                                },
                                {
                                    name: "borderWidth",
                                    attr: "style.tooltip.borderWidth",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "backgroundOpacity",
                                    attr: "style.tooltip.backgroundOpacity",
                                    type: "range",
                                    defaultVal: "100",
                                    min: 0,
                                    max: 100,
                                },
                                {
                                    name: "position",
                                    attr: "style.tooltip.position",
                                    type: "select",
                                    defaultVal: "center",
                                    options: ["left", "center", "right"],
                                },
                                {
                                    name: "offsetX",
                                    attr: "style.tooltip.offsetX",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "offsetY",
                                    attr: "style.tooltip.offsetY",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "smooth",
                                    attr: "style.tooltip.smooth",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "smoothForce",
                                    attr: "style.tooltip.smoothForce",
                                    type: "number",
                                    defaultVal: "0.18",
                                    min: 0.1,
                                    max: 1,
                                    step: 0.01,
                                },
                                {
                                    name: "smoothSnapThreshold",
                                    attr: "style.tooltip.smoothSnapThreshold",
                                    type: "number",
                                    defaultVal: "0.25",
                                    min: 0.1,
                                    max: 24,
                                    step: 0.01,
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
                                {
                                    inactive: true,
                                    unsupported: true,
                                    name: "roundingPercentage",
                                    attr: "table.td.roundingPercentage",
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
                        {
                            attr: "translations",
                            level: 2,
                            title: "table.translations",
                            children: [
                                {
                                    name: "correlationCoefficient",
                                    attr: "table.translations.correlationCoefficient",
                                    type: "text",
                                    defaultVal: "Correlation Coef.",
                                },
                                {
                                    name: "nbrPlots",
                                    attr: "table.translations.nbrPlots",
                                    type: "text",
                                    defaultVal: "Nbr plots",
                                },
                                {
                                    name: "average",
                                    attr: "table.translations.average",
                                    type: "text",
                                    defaultVal: "Average",
                                },
                                {
                                    name: "series",
                                    attr: "table.translations.series",
                                    type: "text",
                                    defaultVal: "Series",
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
