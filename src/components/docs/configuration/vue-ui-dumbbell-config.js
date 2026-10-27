// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiDumbbellConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiDumbbellConfig",
            children: [
                {
                    component: "span",
                    children: [
                        { text: " responsive: false, " },
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
                    name: "useAnimation",
                    attr: "useAnimation",
                    type: "checkbox",
                    defaultVal: "false",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "animationSpeed",
                    attr: "animationSpeed",
                    type: "range",
                    defaultVal: "2",
                    min: 0.1,
                    max: 6,
                    step: 0.1,
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
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
                                    attr: "style.chart.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "style.chart.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "number",
                                    defaultVal: "600",
                                    min: 300,
                                    max: 1000,
                                    step: 50,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "rowHeight",
                                    attr: "style.chart.rowHeight",
                                    type: "range",
                                    defaultVal: "48",
                                    min: 40,
                                    max: 100,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    attr: "grid",
                                    level: 3,
                                    title: "style.chart.grid",
                                    children: [
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.grid.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 1,
                                            max: 12,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "scaleSteps",
                                            attr: "style.chart.grid.scaleSteps",
                                            type: "select",
                                            defaultVal: "10",
                                            options: [2, 5, 10, 20],
                                        },
                                        {
                                            name: "scaleMin",
                                            attr: "style.chart.grid.scaleMin",
                                            type: "number",
                                            defaultVal: "null",
                                        },
                                        {
                                            name: "scaleMax",
                                            attr: "style.chart.grid.scaleMax",
                                            type: "number",
                                            defaultVal: "null",
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
                                                    max: 100,
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
                                                    max: 100,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "comparisonLines",
                                    level: 3,
                                    title: "style.chart.comparisonLines",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.comparisonLines.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.comparisonLines.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeDasharray",
                                            attr: "style.chart.comparisonLines.strokeDasharray",
                                            type: "number",
                                            defaultVal: "4",
                                            min: 0,
                                            max: 24,
                                        },
                                        {
                                            name: "showRect",
                                            attr: "style.chart.comparisonLines.showRect",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "rectColor",
                                            attr: "style.chart.comparisonLines.rectColor",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "rectOpacity",
                                            attr: "style.chart.comparisonLines.rectOpacity",
                                            type: "range",
                                            defaultVal: "5",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "showLabel",
                                            attr: "style.chart.comparisonLines.showLabel",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "labelColor",
                                            attr: "style.chart.comparisonLines.labelColor",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "labelFontSize",
                                            attr: "style.chart.comparisonLines.labelFontSize",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 8,
                                            max: 42,
                                        },
                                    ],
                                },
                                {
                                    attr: "highlighter",
                                    level: 3,
                                    title: "style.chart.highlighter",
                                    children: [
                                        {
                                            name: "color",
                                            attr: "style.chart.highlighter.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "opacity",
                                            attr: "style.chart.highlighter.opacity",
                                            type: "range",
                                            defaultVal: "5",
                                            min: 0,
                                            max: 100,
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
                                                    name: "fontSize",
                                                    attr: "style.chart.labels.axis.fontSize",
                                                    type: "number",
                                                    defaultVal: "12",
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
                                            attr: "endLabels",
                                            level: 4,
                                            title: "style.chart.labels.endLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.labels.endLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.labels.endLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.labels.endLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.labels.endLabels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.labels.endLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "useEndColor",
                                                    attr: "style.chart.labels.endLabels.useEndColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "useEvaluationColor",
                                                    attr: "style.chart.labels.endLabels.useEvaluationColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "startLabels",
                                            level: 4,
                                            title: "style.chart.labels.startLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.labels.startLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.labels.startLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.labels.startLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.labels.startLabels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.labels.startLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "useStartColor",
                                                    attr: "style.chart.labels.startLabels.useStartColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "useEvaluationColor",
                                                    attr: "style.chart.labels.startLabels.useEvaluationColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
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
                                                    name: "color",
                                                    attr: "style.chart.labels.xAxisLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
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
                                                    name: "bold",
                                                    attr: "style.chart.labels.xAxisLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.labels.xAxisLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
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
                                                    name: "color",
                                                    attr: "style.chart.labels.yAxisLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "offsetX",
                                                    attr: "style.chart.labels.yAxisLabels.offsetX",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.labels.yAxisLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "true",
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
                                                    name: "showProgression",
                                                    attr: "style.chart.labels.yAxisLabels.showProgression",
                                                    type: "checkbox",
                                                    defaultVal: "true",
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
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "legend",
                                    level: 3,
                                    title: "style.chart.legend",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.legend.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "labelStart",
                                            attr: "style.chart.legend.labelStart",
                                            type: "text",
                                            defaultVal: "start",
                                        },
                                        {
                                            name: "labelEnd",
                                            attr: "style.chart.legend.labelEnd",
                                            type: "text",
                                            defaultVal: "end",
                                        },
                                        {
                                            name: "labelPositive",
                                            attr: "style.chart.legend.labelPositive",
                                            type: "text",
                                            defaultVal: "positive",
                                        },
                                        {
                                            name: "labelNegative",
                                            attr: "style.chart.legend.labelNegative",
                                            type: "text",
                                            defaultVal: "negative",
                                        },
                                        {
                                            name: "labelNeutral",
                                            attr: "style.chart.legend.labelNeutral",
                                            type: "text",
                                            defaultVal: "neutral",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.legend.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.legend.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.legend.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.legend.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "position",
                                            attr: "style.chart.legend.position",
                                            type: "select",
                                            defaultVal: "bottom",
                                            options: ["top", "bottom"],
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
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.padding.right",
                                            type: "number",
                                            defaultVal: "24",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.padding.bottom",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "left",
                                            attr: "style.chart.padding.left",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
                                        },
                                    ],
                                },
                                {
                                    attr: "plots",
                                    level: 3,
                                    title: "style.chart.plots",
                                    children: [
                                        {
                                            name: "startColor",
                                            attr: "style.chart.plots.startColor",
                                            type: "color",
                                            defaultVal: "#DC3912",
                                        },
                                        {
                                            name: "endColor",
                                            attr: "style.chart.plots.endColor",
                                            type: "color",
                                            defaultVal: "#5F8BEE",
                                        },
                                        {
                                            name: "radius",
                                            attr: "style.chart.plots.radius",
                                            type: "number",
                                            defaultVal: "6",
                                            min: 2,
                                            max: 12,
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
                                        {
                                            attr: "link",
                                            level: 4,
                                            title: "style.chart.plots.link",
                                            children: [
                                                {
                                                    name: "type",
                                                    attr: "style.chart.plots.link.type",
                                                    type: "select",
                                                    defaultVal: "curved",
                                                    options: ["curved", "line"],
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.plots.link.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 1,
                                                    max: 12,
                                                    comment: "For type line",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "evaluationColors",
                                            level: 4,
                                            title: "style.chart.plots.evaluationColors",
                                            children: [
                                                {
                                                    name: "enable",
                                                    attr: "style.chart.plots.evaluationColors.enable",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "positive",
                                                    attr: "style.chart.plots.evaluationColors.positive",
                                                    type: "color",
                                                    defaultVal: "#2ca02c",
                                                },
                                                {
                                                    name: "negative",
                                                    attr: "style.chart.plots.evaluationColors.negative",
                                                    type: "color",
                                                    defaultVal: "#d62728",
                                                },
                                                {
                                                    name: "neutral",
                                                    attr: "style.chart.plots.evaluationColors.neutral",
                                                    type: "color",
                                                    defaultVal: "#c7c7c7",
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
                                    name: "start",
                                    attr: "table.columnNames.start",
                                    type: "text",
                                    defaultVal: "Start value",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "end",
                                    attr: "table.columnNames.end",
                                    type: "text",
                                    defaultVal: "End value",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "progression",
                                    attr: "table.columnNames.progression",
                                    type: "text",
                                    defaultVal: "Progression",
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
                                {
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
