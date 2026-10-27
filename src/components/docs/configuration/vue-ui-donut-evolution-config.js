// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiDonutEvolutionConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiDonutEvolutionConfig",
            equal: true,
            children: [
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
                        { text: "customPalette: []; " },
                        {
                            component: "BaseComment",
                            children: [{ text: "string[]" }],
                        },
                    ],
                },
                { inactive: true, name: "debug", defaultVal: "false" },
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
                {
                    name: "loading",
                    attr: "loading",
                    type: "checkbox",
                    defaultVal: "false",
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
                                    attr: "donuts",
                                    level: 3,
                                    title: "style.chart.donuts",
                                    children: [
                                        {
                                            attr: "hover",
                                            level: 4,
                                            title: "style.chart.donuts.hover",
                                            children: [
                                                {
                                                    name: "hideLabelsUnderValue",
                                                    attr: "style.chart.donuts.hover.hideLabelsUnderValue",
                                                    type: "number",
                                                    min: 0,
                                                    max: 12,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "dialog",
                                    level: 3,
                                    title: "style.chart.dialog",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.dialog.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.dialog.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.dialog.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            attr: "header",
                                            level: 4,
                                            title: "style.chart.dialog.header",
                                            children: [
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.chart.dialog.header.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.dialog.header.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "donutChart",
                                            level: 4,
                                            title: "style.chart.dialog.donutChart",
                                            children: [
                                                {
                                                    component: "BaseComment",
                                                    class: "hover:underline",
                                                    children: [
                                                        {
                                                            component:
                                                                "RouterLink",
                                                            to: "/docs#vue-ui-donut",
                                                            children: [
                                                                {
                                                                    text: translations.checkVueUiXyConfig[
                                                                        store
                                                                            .lang
                                                                    ].replaceAll(
                                                                        "VueUiXy",
                                                                        "VueUiDonut",
                                                                    ),
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
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            name: "height",
                                            attr: "style.chart.layout.height",
                                            type: "number",
                                            defaultVal: "316",
                                            min: 200,
                                            max: 1000,
                                        },
                                        {
                                            name: "width",
                                            attr: "style.chart.layout.width",
                                            type: "number",
                                            defaultVal: "316",
                                            min: 400,
                                            max: 1500,
                                        },
                                        {
                                            attr: "dataLabels",
                                            level: 4,
                                            title: "style.chart.layout.dataLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.dataLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.dataLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.dataLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.dataLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.layout.dataLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.layout.dataLabels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.layout.dataLabels.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.layout.dataLabels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
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
                                            level: 4,
                                            title: "style.chart.layout.grid",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.grid.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.grid.stroke",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.grid.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0.7",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "showVerticalLines",
                                                    attr: "style.chart.layout.grid.showVerticalLines",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    attr: "axis",
                                                    level: 5,
                                                    title: "style.chart.layout.grid.axis",
                                                    children: [
                                                        {
                                                            name: "yLabel",
                                                            attr: "style.chart.layout.grid.axis.yLabel",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "yLabelOffsetX",
                                                            attr: "style.chart.layout.grid.axis.yLabelOffsetX",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                        {
                                                            name: "xLabel",
                                                            attr: "style.chart.layout.grid.axis.xLabel",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "xLabelOffsetY",
                                                            attr: "style.chart.layout.grid.axis.xLabelOffsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.grid.axis.fontSize",
                                                            type: "number",
                                                            defautlVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.grid.axis.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "xAxis",
                                                    level: 5,
                                                    title: "style.chart.layout.grid.xAxis",
                                                    children: [
                                                        {
                                                            attr: "dataLabels",
                                                            level: 6,
                                                            title: "style.chart.layout.grid.xAxis.dataLabels",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.grid.xAxis.dataLabels.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    component:
                                                                        "span",
                                                                    children: [
                                                                        {
                                                                            text: "values: string[],",
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    attr: "datetimeFormatter",
                                                                    level: 7,
                                                                    title: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter",
                                                                    children: [
                                                                        {
                                                                            name: "enable",
                                                                            attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.enable",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "false",
                                                                        },
                                                                        {
                                                                            name: "locale",
                                                                            attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.locale",
                                                                            type: "select",
                                                                            defaultVal:
                                                                                "en",
                                                                            options:
                                                                                store.locales,
                                                                        },
                                                                        {
                                                                            name: "useUTC",
                                                                            attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.useUTC",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "false",
                                                                        },
                                                                        {
                                                                            name: "januaryAsYear",
                                                                            attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.januaryAsYear",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "false",
                                                                        },
                                                                        {
                                                                            attr: "options",
                                                                            level: 8,
                                                                            title: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.options",
                                                                            children:
                                                                                [
                                                                                    {
                                                                                        name: "year",
                                                                                        attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.options.year",
                                                                                        type: "text",
                                                                                        defaultVal:
                                                                                            "yyyy",
                                                                                    },
                                                                                    {
                                                                                        name: "month",
                                                                                        attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.options.month",
                                                                                        type: "text",
                                                                                        defaultVal: `MMM 'yy`,
                                                                                    },
                                                                                    {
                                                                                        name: "day",
                                                                                        attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.options.day",
                                                                                        type: "text",
                                                                                        defaultVal: `dd MMM`,
                                                                                    },
                                                                                    {
                                                                                        name: "minute",
                                                                                        attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.options.minute",
                                                                                        type: "text",
                                                                                        defaultVal: `HH:mm:ss`,
                                                                                    },
                                                                                    {
                                                                                        name: "second",
                                                                                        attr: "style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter.options.second",
                                                                                        type: "text",
                                                                                        defaultVal: `HH:mm:ss`,
                                                                                    },
                                                                                ],
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.grid.xAxis.dataLabels.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "8",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.grid.xAxis.dataLabels.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "offsetY",
                                                                    attr: "style.chart.layout.grid.xAxis.dataLabels.offsetY",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: -100,
                                                                    max: 100,
                                                                },
                                                                {
                                                                    name: "showOnlyFirstAndLast",
                                                                    attr: "style.chart.layout.grid.xAxis.dataLabels.showOnlyFirstAndLast",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "rotation",
                                                                    attr: "style.chart.layout.grid.xAxis.dataLabels.rotation",
                                                                    type: "range",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: -90,
                                                                    max: 90,
                                                                },
                                                                {
                                                                    attr: "autoRotate",
                                                                    title: "style.chart.layout.grid.xAxis.dataLabels.autoRotate",
                                                                    children: [
                                                                        {
                                                                            name: "enable",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "true",
                                                                            attr: "style.chart.layout.grid.xAxis.dataLabels.autoRotate.enable",
                                                                        },
                                                                        {
                                                                            name: "angle",
                                                                            type: "number",
                                                                            min: -90,
                                                                            max: 90,
                                                                            attr: "style.chart.layout.grid.xAxis.dataLabels.autoRotate.angle",
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "yAxis",
                                                    level: 5,
                                                    title: "style.chart.layout.grid.yAxis",
                                                    children: [
                                                        {
                                                            name: "position",
                                                            attr: "style.chart.layout.grid.yAxis.position",
                                                            type: "select",
                                                            options: [
                                                                "left",
                                                                "right",
                                                            ],
                                                            defaultVal: "left",
                                                        },
                                                        {
                                                            name: "autoScale",
                                                            attr: "style.chart.layout.grid.yAxis.autoScale",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            inactive: true,
                                                            name: "scaleMin",
                                                            defaultVal: "null",
                                                        },
                                                        {
                                                            inactive: true,
                                                            name: "scaleMax",
                                                            defaultVal: "null",
                                                        },
                                                        {
                                                            attr: "dataLabels",
                                                            level: 6,
                                                            title: "style.chart.layout.grid.yAxis.dataLabels",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.grid.yAxis.dataLabels.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.grid.yAxis.dataLabels.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "10",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.grid.yAxis.dataLabels.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "roundingValue",
                                                                    attr: "style.chart.layout.grid.yAxis.dataLabels.color",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: 0,
                                                                    max: 6,
                                                                },
                                                                {
                                                                    name: "offsetX",
                                                                    attr: "style.chart.layout.grid.yAxis.dataLabels.offsetX",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: -100,
                                                                    max: 100,
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.grid.yAxis.dataLabels.bold",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "steps",
                                                                    attr: "style.chart.layout.grid.yAxis.dataLabels.steps",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "10",
                                                                    min: 2,
                                                                    max: 20,
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "highlighter",
                                            level: 4,
                                            title: "style.chart.layout.highlighter",
                                            children: [
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.highlighter.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "opacity",
                                                    attr: "style.chart.layout.highlighter.opacity",
                                                    type: "range",
                                                    defaultVal: "5",
                                                    min: 0,
                                                    max: 30,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "line",
                                            level: 4,
                                            title: "style.chart.layout.line",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.line.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.line.stroke",
                                                    type: "color",
                                                    defaultVal: "#CCCCCC",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.line.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "4",
                                                    min: 0,
                                                    max: 24,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "padding",
                                            level: 4,
                                            title: "style.chart.layout.padding",
                                            children: [
                                                {
                                                    name: "top",
                                                    attr: "style.chart.layout.padding.top",
                                                    type: "number",
                                                    min: 0,
                                                    max: 64,
                                                    defaultVal: "5",
                                                },
                                                {
                                                    name: "right",
                                                    attr: "style.chart.layout.padding.right",
                                                    type: "number",
                                                    min: 0,
                                                    max: 64,
                                                    defaultVal: "10",
                                                },
                                                {
                                                    name: "bottom",
                                                    attr: "style.chart.layout.padding.bottom",
                                                    type: "number",
                                                    min: 0,
                                                    max: 64,
                                                    defaultVal: "5",
                                                },
                                                {
                                                    name: "left",
                                                    attr: "style.chart.layout.padding.left",
                                                    type: "number",
                                                    min: 0,
                                                    max: 64,
                                                    defaultVal: "10",
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
                                            name: "color",
                                            attr: "style.chart.legend.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.legend.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.legend.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
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
                                            name: "roundingValue",
                                            attr: "style.chart.legend.roundingValue",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "roundingPercentage",
                                            attr: "style.chart.legend.roundingPercentage",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "showValue",
                                            attr: "style.chart.legend.showValue",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "showPercentage",
                                            attr: "style.chart.legend.showPercentage",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "position",
                                            attr: "style.chart.legend.position",
                                            type: "select",
                                            defaultVal: "bottom",
                                            options: ["top", "bottom"],
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
                                                    name: "text",
                                                    attr: "style.chart.title.subtitle.text",
                                                    type: "text",
                                                    defaultVal: "''",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
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
                                    attr: "zoom",
                                    level: 3,
                                    title: "style.chart.zoom",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.zoom.show",
                                            type: "checkbox",
                                            defaultVal: "true",
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
                                            comment: "Since v3.13.4",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.zoom.color",
                                            type: "color",
                                            defaultVal: "#CCCCCC",
                                        },
                                        {
                                            name: "highlightColor",
                                            attr: "style.chart.zoom.highlightColor",
                                            type: "color",
                                            defaultVal: "#4A4A4A",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.zoom.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    text: "useResetSlot: false; ",
                                                },
                                                {
                                                    component: "BaseComment",
                                                    children: [
                                                        {
                                                            text: "To use a custom slot for the reset feature (see slots tab)",
                                                        },
                                                    ],
                                                },
                                            ],
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
                                            name: "enableRangeHandles",
                                            attr: "style.chart.zoom.enableRangeHandles",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "enableSelectionDrag",
                                            attr: "style.chart.zoom.enableSelectionDrag",
                                            type: "checkbox",
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
                            type: "chexkbox",
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
                            step: 10,
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
                                },
                                {
                                    name: "total",
                                    attr: "table.columnNames.total",
                                    type: "text",
                                    defaultVal: "Total",
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
                                    defaultVal: "#FAFAFA",
                                },
                                {
                                    name: "color",
                                    attr: "table.th.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "outline",
                                    attr: "table.th.outline",
                                    type: "text",
                                    defaultVal: "none",
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
                                },
                                {
                                    name: "color",
                                    attr: "table.td.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "outline",
                                    attr: "table.td.outline",
                                    type: "text",
                                    defaultVal: "none",
                                },
                                {
                                    name: "roundingValue",
                                    attr: "table.td.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                                {
                                    name: "roundingPercentage",
                                    attr: "table.td.roundingPercentage",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
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
                                {
                                    name: "followZoom",
                                    attr: "userOptions.annotator.followZoom",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    tooltip:
                                        "Anchor annotations to chart coordinates so they follow zoom and pan.",
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
                                },
                                {
                                    name: "pdf",
                                    attr: "userOptions.buttons.pdf",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttons.img",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttons.csv",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttons.table",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttons.fullscreen",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttons.annotator",
                                    type: "checkbox",
                                    defaultVal: "true",
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
                                    initialValue: "Toggle tooltip",
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
