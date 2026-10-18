// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiRidgelineConfigFields({
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiRidgelineConfig",
            equal: true,
            children: [
                {
                    component: "span",
                    children: [
                        { text: "responsive: false, " },
                        {
                            component: "span",
                            class: "text-gray-600 dark:text-app-blue text-xs",
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
                    text: ' theme: "", ("dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")',
                },
                { component: "br" },
                {
                    component: "span",
                    children: [
                        { text: "customPalette: [], " },
                        {
                            component: "span",
                            class: "text-xs text-app-blue",
                            children: [{ text: "// string[]" }],
                        },
                    ],
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
                                    attr: "padding",
                                    level: 3,
                                    title: "style.chart.padding",
                                    children: [
                                        {
                                            name: "top",
                                            attr: "style.chart.padding.top",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "12",
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.padding.right",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "0",
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.padding.bottom",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "0",
                                        },
                                        {
                                            name: "left",
                                            attr: "style.chart.padding.left",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "12",
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
                                            defaultVal: "16",
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
                                            name: "color",
                                            attr: "style.chart.title.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "text",
                                            attr: "style.chart.title.text",
                                            type: "text",
                                            defaultVal: "''",
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
                                            max: 100,
                                        },
                                        {
                                            name: "paddingRight",
                                            attr: "style.chart.title.paddingRight",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
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
                                                },
                                                {
                                                    name: "text",
                                                    attr: "style.chart.title.subtitle.text",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.title.subtitle.fontSize",
                                                    type: "number",
                                                    defaultVal: "20",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.title.subtitle.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
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
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.dialog.header.color",
                                                    type: "color",
                                                    defaultVal: "#2D353D",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "xyChart",
                                            level: 4,
                                            title: "style.chart.dialog.xyChart",
                                            children: [
                                                {
                                                    component: "BaseComment",
                                                    class: "hover:underline",
                                                    children: [
                                                        {
                                                            component:
                                                                "RouterLink",
                                                            to: "/docs#vue-ui-xy",
                                                            children: [
                                                                {
                                                                    text: translations
                                                                        .checkVueUiXyConfig[
                                                                        store
                                                                            .lang
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
                                    attr: "areas",
                                    level: 3,
                                    title: "style.chart.areas",
                                    children: [
                                        {
                                            name: "height",
                                            attr: "style.chart.areas.height",
                                            type: "number",
                                            defaultVal: "60",
                                            min: 30,
                                            max: 150,
                                            step: 10,
                                        },
                                        {
                                            name: "rowHeight",
                                            attr: "style.chart.areas.rowHeight",
                                            type: "number",
                                            defaultVal: "30",
                                            min: 10,
                                            max: 100,
                                            step: 10,
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.areas.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                            step: 0.1,
                                        },
                                        {
                                            attr: "stroke",
                                            level: 4,
                                            title: "style.chart.areas.stroke",
                                            children: [
                                                {
                                                    name: "useSerieColor",
                                                    attr: "style.chart.areas.stroke.useSerieColor",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.areas.stroke.color",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                            ],
                                        },
                                        {
                                            name: "smooth",
                                            attr: "style.chart.areas.smooth",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "opacity",
                                            attr: "style.chart.areas.opacity",
                                            type: "range",
                                            defaultVal: "0.9",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "useCommonColor",
                                            attr: "style.chart.areas.useCommonColor",
                                            type: "checkbox",
                                        },
                                        {
                                            name: "useGradient",
                                            attr: "style.chart.areas.useGradient",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            attr: "maxPoint",
                                            level: 4,
                                            title: "style.chart.areas.maxPoint",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.areas.maxPoint.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "adaptStrokeToBackground",
                                                    attr: "style.chart.areas.maxPoint.adaptStrokeToBackground",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.areas.maxPoint.stroke",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.areas.maxPoint.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.chart.areas.maxPoint.strokeDasharray",
                                                    type: "number",
                                                    defaultVal: "4",
                                                    min: 0,
                                                    max: 12,
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
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.selector.stroke",
                                            type: "color",
                                            defaultVal: "#CCCCCC",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.selector.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "strokeDasharray",
                                            attr: "style.chart.selector.strokeDasharray",
                                            type: "number",
                                            defaultVal: "2",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.selector.labels",
                                            children: [
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.selector.labels.fontSize",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 8,
                                                    max: 48,
                                                },
                                                {
                                                    name: "showLast",
                                                    attr: "style.chart.selector.labels.showLast",
                                                    type: "checkbox",
                                                    defaultVal: "false",
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
                                                    name: "rounding",
                                                    attr: "style.chart.selector.labels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.selector.labels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "dot",
                                            level: 4,
                                            title: "style.chart.selector.dot",
                                            children: [
                                                {
                                                    name: "radius",
                                                    attr: "style.chart.selector.dot.radius",
                                                    type: "number",
                                                    defaultVal: "4",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "useDatapointColor",
                                                    attr: "style.chart.selector.dot.useDatapointColor",
                                                    type: "checkbox",
                                                },
                                                {
                                                    name: "fill",
                                                    attr: "style.chart.selector.dot.fill",
                                                    type: "color",
                                                    defaultVal: "#CCCCCC",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.selector.dot.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.selector.dot.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0.5",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "zeroLine",
                                    level: 3,
                                    title: "style.chart.zeroLine",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.zeroLine.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.zeroLine.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                            step: 0.5,
                                        },
                                        {
                                            name: "strokeDasharray",
                                            attr: "style.chart.zeroLine.strokeDasharray",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "useSerieColor",
                                            attr: "style.chart.zeroLine.useSerieColor",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.zeroLine.stroke",
                                            type: "color",
                                            defaultVal: "#CCCCCC",
                                        },
                                    ],
                                },
                                {
                                    attr: "xAxis",
                                    level: 3,
                                    title: "style.chart.xAxis",
                                    children: [
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.xAxis.labels",
                                            children: [
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.xAxis.labels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.xAxis.labels.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "rotation",
                                                    attr: "style.chart.xAxis.labels.rotation",
                                                    type: "range",
                                                    defaultVal: "0",
                                                    min: -90,
                                                    max: 90,
                                                },
                                                {
                                                    attr: "autoRotate",
                                                    level: 5,
                                                    title: "style.chart.xAxis.labels.autoRotate",
                                                    children: [
                                                        {
                                                            name: "enable",
                                                            attr: "style.chart.xAxis.labels.autoRotate.enable",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "angle",
                                                            attr: "style.chart.xAxis.labels.autoRotate.angle",
                                                            type: "number",
                                                            defaultVal: "-30",
                                                            min: -90,
                                                            max: 90,
                                                        },
                                                    ],
                                                },
                                                {
                                                    component: "span",
                                                    children: [
                                                        {
                                                            text: "values: string[],",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "datetimeFormatter",
                                                    level: 5,
                                                    title: "style.chart.xAxis.labels.datetimeFormatter",
                                                    children: [
                                                        {
                                                            name: "enable",
                                                            attr: "style.chart.xAxis.labels.datetimeFormatter.enable",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "locale",
                                                            attr: "style.chart.xAxis.labels.datetimeFormatter.locale",
                                                            type: "select",
                                                            defaultVal: "en",
                                                            options:
                                                                store.locales,
                                                        },
                                                        {
                                                            name: "useUTC",
                                                            attr: "style.chart.xAxis.labels.datetimeFormatter.useUTC",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "januaryAsYear",
                                                            attr: "style.chart.xAxis.labels.datetimeFormatter.januaryAsYear",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            attr: "options",
                                                            level: 6,
                                                            title: "style.chart.xAxis.labels.datetimeFormatter.options",
                                                            children: [
                                                                {
                                                                    name: "year",
                                                                    attr: "style.chart.xAxis.labels.datetimeFormatter.options.year",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "yyyy",
                                                                },
                                                                {
                                                                    name: "month",
                                                                    attr: "style.chart.xAxis.labels.datetimeFormatter.options.month",
                                                                    type: "text",
                                                                    defaultVal: `MMM 'yy`,
                                                                },
                                                                {
                                                                    name: "day",
                                                                    attr: "style.chart.xAxis.labels.datetimeFormatter.options.day",
                                                                    type: "text",
                                                                    defaultVal: `dd MMM`,
                                                                },
                                                                {
                                                                    name: "minute",
                                                                    attr: "style.chart.xAxis.labels.datetimeFormatter.options.minute",
                                                                    type: "text",
                                                                    defaultVal: `HH:mm:ss`,
                                                                },
                                                                {
                                                                    name: "second",
                                                                    attr: "style.chart.xAxis.labels.datetimeFormatter.options.second",
                                                                    type: "text",
                                                                    defaultVal: `HH:mm:ss`,
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.xAxis.labels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.xAxis.labels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 48,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.xAxis.labels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "showOnlyAtModulo",
                                                    attr: "style.chart.xAxis.labels.showOnlyAtModulo",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "modulo",
                                                    attr: "style.chart.xAxis.labels.modulo",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 2,
                                                    max: 24,
                                                },
                                                {
                                                    name: "showOnlyFirstAndLast",
                                                    attr: "style.chart.xAxis.labels.showOnlyFirstAndLast",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.xAxis.labels.offsetY",
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
                                    attr: "yAxis",
                                    level: 3,
                                    title: "style.chart.yAxis",
                                    children: [
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.yAxis.labels",
                                            children: [
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.yAxis.labels.fontSize",
                                                    type: "number",
                                                    defaultVal: "16",
                                                    min: 8,
                                                    max: 48,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.yAxis.labels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.yAxis.labels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "offsetX",
                                                    attr: "style.chart.yAxis.labels.offsetX",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.yAxis.labels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "centered",
                                                    attr: "style.chart.yAxis.labels.centered",
                                                    type: "checkbox",
                                                    defaultVal: "false",
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
                            step: 50,
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
                                    defaultVal: "#FFFFFF",
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
            ],
        },
    ];
}
