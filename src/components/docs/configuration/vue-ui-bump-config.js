// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiBumpConfigFields({
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiBumpConfig",
            equal: true,
            children: [
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
                    name: "useCssAnimation",
                    attr: "useCssAnimation",
                    type: "checkbox",
                    defaultVal: "true",
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
                            inactive: true,
                            name: "fontFamily",
                            defaultVal: "'inherit'",
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
                                    name: "height",
                                    attr: "style.chart.height",
                                    type: "number",
                                    defaultVal: "500",
                                    min: 300,
                                    max: 1000,
                                    step: 20,
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "number",
                                    defaultVal: "800",
                                    min: 300,
                                    max: 1500,
                                    step: 20,
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
                                            max: 64,
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.padding.right",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 64,
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.padding.bottom",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 64,
                                        },
                                        {
                                            name: "left",
                                            attr: "style.chart.padding.left",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 0,
                                            max: 64,
                                        },
                                    ],
                                },
                                {
                                    attr: "title",
                                    level: 3,
                                    title: "style.chart.title",
                                    children: [
                                        {
                                            inactive: true,
                                            unsupported: true,
                                            name: "show",
                                            attr: "style.chart.title.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "text",
                                            attr: "style.chart.title.text",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.title.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.title.fontSize",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.title.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
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
                                        },
                                        {
                                            name: "paddingLeft",
                                            attr: "style.chart.title.paddingLeft",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 48,
                                        },
                                        {
                                            name: "paddingRight",
                                            attr: "style.chart.title.paddingRight",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 48,
                                        },
                                        {
                                            attr: "subtitle",
                                            level: 3,
                                            title: "style.chart.title.subtitle",
                                            children: [
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.title.subtitle.fontSize",
                                                    type: "number",
                                                    defaultVal: "16",
                                                    min: 8,
                                                    max: 48,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.title.subtitle.color",
                                                    type: "color",
                                                    defaultVal: "#A1A1A1",
                                                },
                                                {
                                                    name: "text",
                                                    attr: "style.chart.title.subtitle.text",
                                                    type: "text",
                                                    defaultVal: "''",
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
                                            attr: "lines",
                                            level: 4,
                                            title: "style.chart.layout.lines",
                                            children: [
                                                {
                                                    name: "smooth",
                                                    attr: "style.chart.layout.lines.smooth",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.lines.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "4",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "coatingColor",
                                                    attr: "style.chart.layout.lines.coatingColor",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "plots",
                                            level: 4,
                                            title: "style.chart.layout.plots",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.plots.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.plots.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "radius",
                                                    attr: "style.chart.layout.plots.radius",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    attr: "labels",
                                                    level: 5,
                                                    title: "style.chart.layout.plots.labels",
                                                    children: [
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.plots.labels.color",
                                                            type: "text",
                                                            defaultVal:
                                                                "'auto'",
                                                        },
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.plots.labels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.plots.labels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "displayedValue",
                                                            attr: "style.chart.layout.plots.labels.displayedValue",
                                                            type: "select",
                                                            defaultVal: "value",
                                                            options: [
                                                                "rank",
                                                                "value",
                                                            ],
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.plots.labels.fontSize",
                                                            type: "number",
                                                            defaultVal: "12",
                                                            min: 8,
                                                            max: 24,
                                                        },
                                                        {
                                                            name: "prefix",
                                                            attr: "style.chart.layout.plots.labels.prefix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "suffix",
                                                            attr: "style.chart.layout.plots.labels.suffix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "rounding",
                                                            attr: "style.chart.layout.plots.labels.rounding",
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
                                                                    children: [
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
                                            attr: "nameLabels",
                                            level: 4,
                                            title: "style.chart.layout.nameLabels",
                                            children: [
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.nameLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.nameLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "useSerieColor",
                                                    attr: "style.chart.layout.nameLabels.useSerieColor",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.nameLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "offsetX",
                                                    attr: "style.chart.layout.nameLabels.offsetX",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -24,
                                                    max: 24,
                                                },
                                                {
                                                    attr: "leftLabels",
                                                    level: 5,
                                                    title: "style.chart.layout.nameLabels.leftLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.nameLabels.leftLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "rightLabels",
                                                    level: 5,
                                                    title: "style.chart.layout.nameLabels.rightLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.nameLabels.rightLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "timeLabels",
                                            level: 4,
                                            title: "style.chart.layout.timeLabels",
                                            children: [
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.timeLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.timeLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.layout.timeLabels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.timeLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "rotation",
                                                    attr: "style.chart.layout.timeLabels.rotation",
                                                    type: "range",
                                                    defaultVal: "0",
                                                    min: -90,
                                                    max: 90,
                                                },
                                                {
                                                    attr: "autoRotate",
                                                    title: "style.chart.layout.timeLabels.autoRotate",
                                                    children: [
                                                        {
                                                            name: "enable",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            attr: "style.chart.layout.timeLabels.autoRotate.enable",
                                                        },
                                                        {
                                                            name: "angle",
                                                            type: "number",
                                                            min: -90,
                                                            max: 90,
                                                            attr: "style.chart.layout.timeLabels.autoRotate.angle",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "datetimeFormatter",
                                                    level: 6,
                                                    title: "style.chart.layout.timeLabels.datetimeFormatter",
                                                    children: [
                                                        {
                                                            name: "enable",
                                                            attr: "style.chart.layout.timeLabels.datetimeFormatter.enable",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "locale",
                                                            attr: "style.chart.layout.timeLabels.datetimeFormatter.locale",
                                                            type: "select",
                                                            defaultVal: "en",
                                                            options:
                                                                store.locales,
                                                        },
                                                        {
                                                            name: "useUTC",
                                                            attr: "style.chart.layout.timeLabels.datetimeFormatter.useUTC",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "januaryAsYear",
                                                            attr: "style.chart.layout.timeLabels.datetimeFormatter.januaryAsYear",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            attr: "options",
                                                            level: 7,
                                                            title: "style.chart.layout.timeLabels.datetimeFormatter.options",
                                                            children: [
                                                                {
                                                                    name: "year",
                                                                    attr: "style.chart.layout.timeLabels.datetimeFormatter.options.year",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "yyyy",
                                                                },
                                                                {
                                                                    name: "month",
                                                                    attr: "style.chart.layout.timeLabels.datetimeFormatter.options.month",
                                                                    type: "text",
                                                                    defaultVal: `MMM 'yy`,
                                                                },
                                                                {
                                                                    name: "day",
                                                                    attr: "style.chart.layout.timeLabels.datetimeFormatter.options.day",
                                                                    type: "text",
                                                                    defaultVal: `dd MMM`,
                                                                },
                                                                {
                                                                    name: "minute",
                                                                    attr: "style.chart.layout.timeLabels.datetimeFormatter.options.minute",
                                                                    type: "text",
                                                                    defaultVal: `HH:mm:ss`,
                                                                },
                                                                {
                                                                    name: "second",
                                                                    attr: "style.chart.layout.timeLabels.datetimeFormatter.options.second",
                                                                    type: "text",
                                                                    defaultVal: `HH:mm:ss`,
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
                                },
                                {
                                    name: "period",
                                    attr: "table.columnNames.period",
                                    type: "text",
                                    defaultVal: "Period",
                                },
                                {
                                    name: "values",
                                    attr: "table.columnNames.values",
                                    type: "text",
                                    defaultVal: "Values",
                                },
                                {
                                    name: "ranking",
                                    attr: "table.columnNames.ranking",
                                    type: "text",
                                    defaultVal: "Ranking",
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
                            title: "table.th",
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
                        },
                        {
                            name: "keepStateOnChartLeave",
                            attr: "userOptions.keepStateOnChartLeave",
                            type: "checkbox",
                            defaultVal: "true",
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
                                },
                                {
                                    name: "close",
                                    attr: "userOptions.buttonTitles.close",
                                    type: "text",
                                    defaultVal: "Close options",
                                },
                                {
                                    name: "pdf",
                                    attr: "userOptions.buttonTitles.pdf",
                                    type: "text",
                                    defaultVal: "Download PDF",
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttonTitles.csv",
                                    type: "text",
                                    defaultVal: "Download CSV",
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttonTitles.img",
                                    type: "text",
                                    defaultVal: "Download PNG",
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttonTitles.table",
                                    type: "text",
                                    defaultVal: "Toggle table",
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttonTitles.fullscreen",
                                    type: "text",
                                    defaultVal: "Toggle fullscreen",
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttonTitles.annotator",
                                    type: "text",
                                    defaultVal: "Toggle annotator",
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
