// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiXyCanvasConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiXyCanvasConfig",
            equal: true,
            children: [
                {
                    component: "span",
                    children: [
                        {
                            text: 'theme: "", ("dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")',
                        },
                    ],
                },
                {
                    component: "span",
                    children: [
                        { text: "customPalette: []; " },
                        {
                            component: "span",
                            class: "text-app-blue text-xs",
                            children: [{ text: "// string[]" }],
                        },
                    ],
                },
                {
                    component: "span",
                    children: [
                        { text: "responsive: false; " },
                        {
                            component: "span",
                            class: "text-app-blue break-keep text-xs",
                            children: [
                                { text: "// " },
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
                    attr: "downsample",
                    level: 1,
                    children: [
                        {
                            name: "threshold",
                            attr: "downsample.threshold",
                            type: "number",
                            defaultVal: "10000",
                            min: 100,
                            max: 20000,
                            comment:
                                "Threshold above which LTTB algorithm kicks in",
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
                            children: [{ text: 'fontFamily: "Arial",' }],
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
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "color",
                                    attr: "style.chart.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "aspectRatio",
                                    attr: "style.chart.aspectRatio",
                                    type: "text",
                                    defaultVal: "14 / 9",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "stacked",
                                    attr: "style.chart.stacked",
                                    type: "checkbox",
                                    defaultVal: "false",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "stackGap",
                                    attr: "style.chart.stackGap",
                                    type: "range",
                                    defaultVal: "20",
                                    min: 0,
                                    max: 48,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                    comment: "Use with stacked: true",
                                },
                                {
                                    attr: "area",
                                    level: 3,
                                    title: "style.chart.area",
                                    children: [
                                        {
                                            name: "opacity",
                                            attr: "style.chart.area.opacity",
                                            type: "range",
                                            defaultVal: "60",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                    ],
                                },
                                {
                                    attr: "dataLabels",
                                    level: 3,
                                    title: "style.chart.dataLabels",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.dataLabels.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.dataLabels.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSizeRatio",
                                            attr: "style.chart.dataLabels.fontSizeRatio",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0.5,
                                            max: 2,
                                            step: 0.01,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "useSerieColor",
                                            attr: "style.chart.dataLabels.useSerieColor",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.dataLabels.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "offsetY",
                                            attr: "style.chart.dataLabels.offsetY",
                                            type: "number",
                                            defaultVal: "-12",
                                            min: -100,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                {
                                    attr: "grid",
                                    level: 3,
                                    title: "style.chart.grid",
                                    children: [
                                        {
                                            attr: "x",
                                            level: 4,
                                            title: "style.chart.grid.x",
                                            children: [
                                                {
                                                    name: "showAxis",
                                                    attr: "style.chart.grid.x.showAxis",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisColor",
                                                    attr: "style.chart.grid.x.axisColor",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisThickness",
                                                    attr: "style.chart.grid.x.axisThickness",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 24,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisName",
                                                    attr: "style.chart.grid.x.axisName",
                                                    type: "text",
                                                    defaultVal: "''",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    attr: "horizontalLines",
                                                    level: 5,
                                                    title: "style.chart.grid.x.horizontalLines",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.x.horizontalLines.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.x.horizontalLines.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#CCCCCC",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "alternate",
                                                            attr: "style.chart.grid.x.horizontalLines.alternate",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "opacity",
                                                            attr: "style.chart.grid.x.horizontalLines.opacity",
                                                            type: "range",
                                                            defaultVal: "20",
                                                            min: 0,
                                                            max: 100,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "timeLabels",
                                                    level: 5,
                                                    title: "style.chart.grid.x.timeLabels",
                                                    children: [
                                                        {
                                                            component: "span",
                                                            children: [
                                                                {
                                                                    text: "values: [],",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "datetimeFormatter",
                                                            level: 6,
                                                            title: "style.chart.grid.x.timeLabels.datetimeFormatter",
                                                            children: [
                                                                {
                                                                    name: "enable",
                                                                    attr: "style.chart.grid.x.timeLabels.datetimeFormatter.enable",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "locale",
                                                                    attr: "style.chart.grid.x.timeLabels.datetimeFormatter.locale",
                                                                    type: "select",
                                                                    defaultVal:
                                                                        "en",
                                                                    options:
                                                                        store.locales,
                                                                },
                                                                {
                                                                    name: "useUTC",
                                                                    attr: "style.chart.grid.x.timeLabels.datetimeFormatter.useUTC",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "januaryAsYear",
                                                                    attr: "style.chart.grid.x.timeLabels.datetimeFormatter.januaryAsYear",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    attr: "options",
                                                                    level: 7,
                                                                    title: "style.chart.grid.x.timeLabels.datetimeFormatter.options",
                                                                    children: [
                                                                        {
                                                                            name: "year",
                                                                            attr: "style.chart.grid.x.timeLabels.datetimeFormatter.options.year",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "yyyy",
                                                                        },
                                                                        {
                                                                            name: "month",
                                                                            attr: "style.chart.grid.x.timeLabels.datetimeFormatter.options.month",
                                                                            type: "text",
                                                                            defaultVal: `MMM 'yy`,
                                                                        },
                                                                        {
                                                                            name: "day",
                                                                            attr: "style.chart.grid.x.timeLabels.datetimeFormatter.options.day",
                                                                            type: "text",
                                                                            defaultVal: `dd MMM`,
                                                                        },
                                                                        {
                                                                            name: "minute",
                                                                            attr: "style.chart.grid.x.timeLabels.datetimeFormatter.options.minute",
                                                                            type: "text",
                                                                            defaultVal: `HH:mm:ss`,
                                                                        },
                                                                        {
                                                                            name: "second",
                                                                            attr: "style.chart.grid.x.timeLabels.datetimeFormatter.options.second",
                                                                            type: "text",
                                                                            defaultVal: `HH:mm:ss`,
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.x.timeLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.grid.x.timeLabels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSizeRatio",
                                                            attr: "style.chart.grid.x.timeLabels.fontSizeRatio",
                                                            type: "range",
                                                            defaultVal: "0.8",
                                                            min: 0.5,
                                                            max: 2,
                                                            step: 0.01,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "rotation",
                                                            attr: "style.chart.grid.x.timeLabels.rotation",
                                                            type: "range",
                                                            defaultVal: "0",
                                                            min: -90,
                                                            max: 90,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.grid.x.timeLabels.offsetY",
                                                            type: "number",
                                                            defaultVal: "30",
                                                            min: -100,
                                                            max: 100,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.x.timeLabels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "modulo",
                                                            attr: "style.chart.grid.x.timeLabels.modulo",
                                                            type: "number",
                                                            defaultVal: "12",
                                                            min: 2,
                                                            max: 365,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "y",
                                            level: 4,
                                            title: "style.chart.grid.y",
                                            children: [
                                                {
                                                    name: "showAxis",
                                                    attr: "style.chart.grid.y.showAxis",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisColor",
                                                    attr: "style.chart.grid.y.axisColor",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisThickness",
                                                    attr: "style.chart.grid.y.axisThickness",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 24,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisName",
                                                    attr: "style.chart.grid.y.axisName",
                                                    type: "text",
                                                    defaultVal: "''",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    attr: "axisLabels",
                                                    level: 5,
                                                    title: "style.chart.grid.y.axisLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.y.axisLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.grid.y.axisLabels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "fontSizeRatio",
                                                            attr: "style.chart.grid.y.axisLabels.fontSizeRatio",
                                                            type: "range",
                                                            defaultVal: "1",
                                                            min: 0.5,
                                                            max: 2,
                                                            step: 0.01,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.y.axisLabels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "offsetX",
                                                            attr: "style.chart.grid.y.axisLabels.offsetX",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "rounding",
                                                            attr: "style.chart.grid.y.axisLabels.rounding",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: 0,
                                                            max: 6,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "prefix",
                                                            attr: "style.chart.grid.y.axisLabels.prefix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "suffix",
                                                            attr: "style.chart.grid.y.axisLabels.suffix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "verticalLines",
                                                    level: 5,
                                                    title: "style.chart.grid.y.verticalLines",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.y.verticalLines.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.y.verticalLines.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#CCCCCC",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "hideUnderXLength",
                                                            attr: "style.chart.grid.y.verticalLines.hideUnderXLength",
                                                            type: "number",
                                                            defaultVal: "20",
                                                            min: 0,
                                                            max: 42,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "position",
                                                            attr: "style.chart.grid.y.verticalLines.position",
                                                            type: "select",
                                                            options: [
                                                                "start",
                                                                "middle",
                                                            ],
                                                            defaultVal:
                                                                "middle",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "zeroLine",
                                            level: 4,
                                            title: "style.chart.grid.zeroLine",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.grid.zeroLine.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "dashed",
                                                    attr: "style.chart.grid.zeroLine.dashed",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.grid.zeroLine.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
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
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.legend.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.legend.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.legend.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.legend.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "position",
                                            attr: "style.chart.legend.position",
                                            type: "select",
                                            options: ["top", "bottom"],
                                            defaultVal: "bottom",
                                        },
                                        {
                                            attr: "selectAllToggle",
                                            level: 4,
                                            title: "style.chart.legend.selectAllToggle",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.legend.selectAllToggle.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.chart.legend.selectAllToggle.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.legend.selectAllToggle.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "line",
                                    level: 3,
                                    title: "style.chart.line",
                                    children: [
                                        {
                                            attr: "plots",
                                            level: 4,
                                            title: "style.chart.line.plots",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.line.plots.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "radiusRatio",
                                                    attr: "style.chart.line.plots.radiusRatio",
                                                    type: "range",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 2,
                                                    step: 0.01,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "bar",
                                    level: 3,
                                    title: "style.chart.bar",
                                    children: [
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.chart.bar.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.bar.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "paddingProportions",
                                    level: 3,
                                    title: "style.chart.paddingProportions",
                                    children: [
                                        {
                                            name: "top",
                                            attr: "style.chart.paddingProportions.top",
                                            type: "number",
                                            defaultVal: "0.1",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.paddingProportions.right",
                                            type: "number",
                                            defaultVal: "0.05",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.paddingProportions.bottom",
                                            type: "number",
                                            defaultVal: "0.1",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "left",
                                            attr: "style.chart.paddingProportions.left",
                                            type: "number",
                                            defaultVal: "0.1",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                    ],
                                },
                                {
                                    attr: "scale",
                                    level: 3,
                                    title: "style.chart.scale",
                                    children: [
                                        {
                                            name: "ticks",
                                            attr: "style.chart.scale.ticks",
                                            type: "number",
                                            defaultVal: "10",
                                            min: 2,
                                            max: 20,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    text: "min: number | null; // default: null, Force min scale (applied when stack mode is false)",
                                                },
                                            ],
                                        },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    text: "max: number | null; // default: null, Force max scale (applied when stack mode is false)",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "selector",
                                    level: 3,
                                    title: "style.chart.selector",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.selector.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "dashed",
                                            attr: "style.chart.selector.dashed",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.selector.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "showHorizontalSelector",
                                            attr: "style.chart.selector.showHorizontalSelector",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                    ],
                                },
                                {
                                    attr: "title",
                                    level: 3,
                                    title: "style.chart.title",
                                    children: [
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
                                            name: "color",
                                            attr: "style.chart.title.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
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
                                            max: 64,
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
                                            max: 64,
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
                                                    defaultVal: "#A1A1A1",
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
                                                    defaultVal: "16",
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
                                            name: "color",
                                            attr: "style.chart.tooltip.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.tooltip.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.tooltip.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "borderColor",
                                            attr: "style.chart.tooltip.borderColor",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "borderWidth",
                                            attr: "style.chart.tooltip.borderWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 24,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "backgroundOpacity",
                                            attr: "style.chart.tooltip.backgroundOpacity",
                                            type: "range",
                                            defaultVal: "100",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                            name: "offsetY",
                                            attr: "style.chart.tooltip.offsetY",
                                            type: "number",
                                            defaultVal: "24",
                                            min: 0,
                                            max: 64,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                            max: 24,
                                            step: 0.01,
                                        },
                                        {
                                            name: "useDefaultTimeFormat",
                                            attr: "style.chart.tooltip.useDefaultTimeFormat",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "timeFormat",
                                            attr: "style.chart.tooltip.timeFormat",
                                            type: "text",
                                            defaultVal: "yyyy-MM-dd HH:mm:ss",
                                        },
                                    ],
                                },
                                {
                                    attr: "zoom",
                                    level: 3,
                                    title: "style.chart.zoom",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.zoom.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "autoFit",
                                            attr: "style.chart.zoom.autoFit",
                                            type: "checkbox",
                                            defaultVal: "false",
                                            comment: "Since v3.23.1",
                                        },
                                        {
                                            name: "maxWidth",
                                            attr: "style.chart.zoom.maxWidth",
                                            type: "number",
                                            defaultVal: "null",
                                            min: 200,
                                            max: 800,
                                            step: 50,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                            comment: "Since v3.13.4",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.zoom.color",
                                            type: "color",
                                            defaultVal: "#CCCCCC",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "highlightColor",
                                            attr: "style.chart.zoom.highlightColor",
                                            type: "color",
                                            defaultVal: "#4A4A4A",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.zoom.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    text: "startIndex: number | null, ",
                                                },
                                                {
                                                    component: "BaseComment",
                                                    children: [
                                                        {
                                                            text: "Force zoom start index",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    text: "endIndex: number | null, ",
                                                },
                                                {
                                                    component: "BaseComment",
                                                    children: [
                                                        {
                                                            text: "Force zoom end index",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    text: "useResetSlot: false, ",
                                                },
                                                {
                                                    component: "span",
                                                    class: "text-app-blue break-keep text-xs",
                                                    children: [
                                                        {
                                                            text: "// To use a custom slot for the reset feature (see slots tab)",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            name: "enableRangeHandles",
                                            attr: "style.chart.zoom.enableRangeHandles",
                                            type: "chexkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "enableSelectionDrag",
                                            attr: "style.chart.zoom.enableSelectionDrag",
                                            type: "chexkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "focusOnDrag",
                                            attr: "style.chart.zoom.focusOnDrag",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "focusRangeRatio",
                                            attr: "style.chart.zoom.focusRangeRatio",
                                            type: "number",
                                            defaultVal: "0.2",
                                            min: 0.1,
                                            max: 0.9,
                                            step: 0.1,
                                        },
                                        {
                                            attr: "minimap",
                                            level: 4,
                                            title: "style.chart.zoom.minimap",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.zoom.minimap.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "selectedColor",
                                                    attr: "style.chart.zoom.minimap.selectedColor",
                                                    type: "color",
                                                    defaultVal: "#1f77b4",
                                                },
                                                {
                                                    name: "selectedColorOpacity",
                                                    attr: "style.chart.zoom.minimap.selectedColorOpacity",
                                                    type: "range",
                                                    defaultVal: "0.2",
                                                    min: 0,
                                                    max: 0.8,
                                                    step: 0.01,
                                                },
                                                {
                                                    name: "indicatorColor",
                                                    attr: "style.chart.zoom.minimap.indicatorColor",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "frameColor",
                                                    attr: "style.chart.zoom.minimap.frameColor",
                                                    type: "color",
                                                    defaultVal: "#A1A1A1",
                                                },
                                                {
                                                    name: "additionalHeight",
                                                    attr: "style.chart.zoom.minimap.additionalHeight",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 20,
                                                    comment: "Since v3.15.0",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate(
                                                            ..._args,
                                                        );
                                                    },
                                                },
                                                {
                                                    name: "handleIconColor",
                                                    attr: "style.chart.zoom.minimap.handleIconColor",
                                                    type: "color",
                                                    defaultVal: "null",
                                                    comment: "Since v3.15.0",
                                                },
                                                {
                                                    name: "handleBorderWidth",
                                                    attr: "style.chart.zoom.minimap.handleBorderWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 3,
                                                    step: 0.1,
                                                    comment: "Since v3.15.0",
                                                },
                                                {
                                                    name: "handleBorderColor",
                                                    attr: "style.chart.zoom.minimap.handleBorderColor",
                                                    type: "color",
                                                    defaultVal: "null",
                                                    comment: "Since v3.15.0",
                                                },
                                                {
                                                    name: "handleFill",
                                                    attr: "style.chart.zoom.minimap.handleFill",
                                                    type: "color",
                                                    defaultVal: "null",
                                                    comment: "Since v3.15.0",
                                                },
                                                {
                                                    name: "handleWidth",
                                                    attr: "style.chart.zoom.minimap.handleWidth",
                                                    type: "number",
                                                    defaultVal: "20",
                                                    min: 20,
                                                    max: 40,
                                                    comment: "Since v3.15.0",
                                                },
                                                {
                                                    name: "handleType",
                                                    attr: "style.chart.zoom.minimap.handleType",
                                                    type: "select",
                                                    defaultVal: "grab",
                                                    options: [
                                                        "grab",
                                                        "chevron",
                                                        "arrow",
                                                        "empty",
                                                    ],
                                                    comment: "Since v3.15.0",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "preview",
                                            level: 4,
                                            title: "style.chart.zoom.preview",
                                            children: [
                                                {
                                                    name: "enable",
                                                    attr: "style.chart.zoom.preview.enable",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fill",
                                                    attr: "style.chart.zoom.preview.fill",
                                                    type: "color",
                                                    defaultVal: "#CCCCCC50",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.zoom.preview.stroke",
                                                    type: "color",
                                                    defaultVal: "#6A6A6A",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.zoom.preview.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.chart.zoom.preview.strokeDasharray",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "dragToZoom",
                                            level: 4,
                                            title: "style.chart.zoom.dragToZoom",
                                            children: [
                                                {
                                                    component: "BaseComment",
                                                    children: [
                                                        {
                                                            text: "Drag-to-zoom since v3.26.0",
                                                        },
                                                    ],
                                                },
                                                {
                                                    name: "show",
                                                    attr: "style.chart.zoom.dragToZoom.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    attr: "selection",
                                                    level: 5,
                                                    title: "style.chart.zoom.dragToZoom.selection",
                                                    children: [
                                                        {
                                                            name: "fill",
                                                            attr: "style.chart.zoom.dragToZoom.selection.fill",
                                                            type: "color",
                                                            defaultVal:
                                                                "#1f77b4",
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.zoom.dragToZoom.selection.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#A1A1A1",
                                                        },
                                                        {
                                                            name: "fillOpacity",
                                                            attr: "style.chart.zoom.dragToZoom.selection.fillOpacity",
                                                            type: "number",
                                                            defaultVal: "0.2",
                                                            min: 0.1,
                                                            max: 0.5,
                                                            step: 0.1,
                                                        },
                                                        {
                                                            name: "strokeOpacity",
                                                            attr: "style.chart.zoom.dragToZoom.selection.strokeOpacity",
                                                            type: "number",
                                                            defaultVal: "0.5",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.1,
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.zoom.dragToZoom.selection.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "strokeDasharray",
                                                            attr: "style.chart.zoom.dragToZoom.selection.strokeDasharray",
                                                            type: "text",
                                                            defaultVal: "0",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            name: "useDefaultFormat",
                                            attr: "style.chart.zoom.useDefaultFormat",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "timeFormat",
                                            attr: "style.chart.zoom.timeFormat",
                                            type: "text",
                                            defaultVal: "'yyyy-MM-dd HH:mm:ss'",
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
                            name: "rounding",
                            attr: "table.rounding",
                            type: "number",
                            defaultVal: "0",
                            min: 0,
                            max: 6,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "responsiveBreakpoint",
                            attr: "table.responsiveBreakpoint",
                            type: "number",
                            defaultVal: "400",
                            min: 300,
                            max: 800,
                            step: 10,
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
                                    name: "period",
                                    attr: "table.columnNames.period",
                                    type: "text",
                                    defaultVal: "Period",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "total",
                                    attr: "table.columnNames.total",
                                    type: "text",
                                    defaultVal: "Total",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                { text: "> " },
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
                                    defaultVal: "#FAFAFA",
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
                                    defaultVal: "#FAFAFA",
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
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
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
                                    name: "stack",
                                    attr: "userOptions.buttons.stack",
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
                                    name: "stack",
                                    attr: "userOptions.buttonTitles.stack",
                                    type: "text",
                                    defaultVal: "Toggle stack mode",
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
