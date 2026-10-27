// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiStackbarConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
    waterfallExplain,
}) {
    return [
        {
            attr: "const config: VueUiStackbarConfig",
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
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "orientation",
                    attr: "orientation",
                    type: "select",
                    defaultVal: "vertical",
                    options: ["vertical", "horizontal"],
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                    comment: "Since v2.3.45",
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
                                        "'Use the left and right, or up and down arrow keys to move between datapoints'",
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
                                    name: "height",
                                    attr: "style.chart.height",
                                    type: "number",
                                    defaultVal: "500",
                                    min: 300,
                                    max: 1000,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "number",
                                    defaultVal: "800",
                                    min: 300,
                                    max: 1500,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
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
                                            defaultVal: "24",
                                            min: 0,
                                            max: 64,
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.padding.right",
                                            type: "number",
                                            defaultVal: "24",
                                            min: 0,
                                            max: 64,
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.padding.bottom",
                                            type: "number",
                                            defaultVal: "36",
                                            min: 0,
                                            max: 64,
                                        },
                                        {
                                            name: "left",
                                            attr: "style.chart.padding.left",
                                            type: "number",
                                            defaultVal: "48",
                                            min: 0,
                                            max: 64,
                                        },
                                    ],
                                },
                                {
                                    attr: "title",
                                    level: 2,
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
                                            max: 48,
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
                                            max: 48,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                    attr: "waterfall",
                                    level: 3,
                                    title: "style.chart.waterfall",
                                    children: [
                                        {
                                            component: "BaseComment",
                                            children: [
                                                {
                                                    text: waterfallExplain[
                                                        store.lang
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "bars",
                                            level: 4,
                                            title: "style.chart.waterfall.bars",
                                            children: [
                                                {
                                                    name: "gapRatio",
                                                    attr: "style.chart.waterfall.bars.gapRatio",
                                                    type: "number",
                                                    defaultVal: "0.5",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "borderRadius",
                                                    attr: "style.chart.waterfall.bars.borderRadius",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 36,
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.waterfall.bars.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.waterfall.bars.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    attr: "gradient",
                                                    level: 5,
                                                    title: "style.chart.waterfall.bars.gradient",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.waterfall.bars.gradient.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "intensity",
                                                            attr: "style.chart.waterfall.bars.gradient.intensity",
                                                            type: "range",
                                                            defaultVal: "20",
                                                            min: 0,
                                                            max: 99,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "colors",
                                            level: 4,
                                            title: "style.chart.waterfall.colors",
                                            children: [
                                                {
                                                    name: "useSeriesColor",
                                                    attr: "style.chart.waterfall.colors.useSeriesColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "positive",
                                                    attr: "style.chart.waterfall.colors.positive",
                                                    type: "color",
                                                    defaultVal: "#36A783",
                                                },
                                                {
                                                    name: "negative",
                                                    attr: "style.chart.waterfall.colors.negative",
                                                    type: "color",
                                                    defaultVal: "#E76F51",
                                                },
                                                {
                                                    name: "total",
                                                    attr: "style.chart.waterfall.colors.total",
                                                    type: "color",
                                                    defaultVal: "#4C7899",
                                                },
                                                {
                                                    name: "subtotal",
                                                    attr: "style.chart.waterfall.colors.subtotal",
                                                    type: "color",
                                                    defaultVal: "#8192B0",
                                                },
                                                {
                                                    name: "neutral",
                                                    attr: "style.chart.waterfall.colors.neutral",
                                                    type: "color",
                                                    defaultVal: "#A3A3A3",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "connectors",
                                            level: 4,
                                            title: "style.chart.waterfall.connectors",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.waterfall.connectors.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.waterfall.connectors.stroke",
                                                    type: "color",
                                                    defaultVal: "#888888",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.waterfall.connectors.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.chart.waterfall.connectors.strokeDasharray",
                                                    type: "text",
                                                    defaultVal: "3 3",
                                                },
                                                {
                                                    name: "adaptToRadius",
                                                    attr: "style.chart.waterfall.connectors.adaptToRadius",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "inset",
                                                    attr: "style.chart.waterfall.connectors.inset",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -50,
                                                    max: 50,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "categoryLabels",
                                            level: 4,
                                            title: "style.chart.waterfall.categoryLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.waterfall.categoryLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.waterfall.categoryLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.waterfall.categoryLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.waterfall.categoryLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "rotation",
                                                    attr: "style.chart.waterfall.categoryLabels.rotation",
                                                    type: "range",
                                                    defaultVal: "0",
                                                    min: -90,
                                                    max: 90,
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.waterfall.categoryLabels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -50,
                                                    max: 50,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "segmentLabels",
                                            level: 4,
                                            title: "style.chart.waterfall.segmentLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.waterfall.segmentLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.waterfall.segmentLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.waterfall.segmentLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.waterfall.segmentLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "adaptColorToBackground",
                                                    attr: "style.chart.waterfall.segmentLabels.adaptColorToBackground",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "minHeight",
                                                    attr: "style.chart.waterfall.segmentLabels.minHeight",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 0,
                                                    max: 42,
                                                },
                                                {
                                                    name: "minWidth",
                                                    attr: "style.chart.waterfall.segmentLabels.minWidth",
                                                    type: "number",
                                                    defaultVal: "26",
                                                    min: 0,
                                                    max: 64,
                                                },
                                                {
                                                    name: "showZero",
                                                    attr: "style.chart.waterfall.segmentLabels.showZero",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.waterfall.segmentLabels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.waterfall.segmentLabels.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.waterfall.segmentLabels.rounding",
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
                                            attr: "stepLabels",
                                            level: 4,
                                            title: "style.chart.waterfall.stepLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.waterfall.stepLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.waterfall.stepLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.waterfall.stepLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.waterfall.stepLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.waterfall.stepLabels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.waterfall.stepLabels.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.waterfall.stepLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "offset",
                                                    attr: "style.chart.waterfall.stepLabels.offset",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -50,
                                                    max: 50,
                                                },
                                                {
                                                    name: "showPlusSign",
                                                    attr: "style.chart.waterfall.stepLabels.showPlusSign",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "showZero",
                                                    attr: "style.chart.waterfall.stepLabels.showZero",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "useBalanceForTotals",
                                                    attr: "style.chart.waterfall.stepLabels.useBalanceForTotals",
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
                                            name: "keepState",
                                            attr: "style.chart.zoom.keepState",
                                            type: "checkbox",
                                            defaultVal: "false",
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
                                                    text: "useResetSlot: false, ",
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
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.tooltip.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.tooltip.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "showValue",
                                            attr: "style.chart.tooltip.showValue",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "showPercentage",
                                            attr: "style.chart.tooltip.showPercentage",
                                            type: "checkbox",
                                            defaultVal: "false",
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
                                            name: "roundingValue",
                                            attr: "style.chart.tooltip.roundingValue",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "roundingPercentage",
                                            attr: "style.chart.tooltip.roundingPercentage",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
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
                                            type: "range",
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
                                            name: "showTimeLabel",
                                            attr: "style.chart.tooltip.showTimeLabel",
                                            type: "checkbox",
                                            defaultVal: "true",
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
                                        {
                                            name: "showTotal",
                                            attr: "style.chart.tooltip.showTotal",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "totalTranslation",
                                            attr: "style.chart.tooltip.totalTranslation",
                                            type: "text",
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
                                            max: 30,
                                        },
                                    ],
                                },
                                {
                                    attr: "bars",
                                    level: 3,
                                    title: "style.chart.bars",
                                    children: [
                                        {
                                            name: "gapRatio",
                                            attr: "style.chart.bars.gapRatio",
                                            type: "range",
                                            defaultVal: "0.5",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "distributed",
                                            attr: "style.chart.bars.distributed",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "showDistributedPercentage",
                                            attr: "style.chart.bars.showDistributedPercentage",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "borderRadius",
                                            attr: "style.chart.bars.borderRadius",
                                            type: "range",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.bars.strokeWidth",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.chart.bars.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.bars.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "intensity",
                                                    attr: "style.chart.bars.gradient.intensity",
                                                    type: "range",
                                                    defaultVal: "20",
                                                    min: 0,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "totalValues",
                                            level: 4,
                                            title: "style.chart.bars.totalValues",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.bars.totalValues.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.bars.totalValues.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.bars.totalValues.fontSize",
                                                    type: "number",
                                                    defaultVal: "16",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.bars.totalValues.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.bars.totalValues.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "dataLabels",
                                            level: 4,
                                            title: "style.chart.bars.dataLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.bars.dataLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "hideEmptyValues",
                                                    attr: "style.chart.bars.dataLabels.hideEmptyValues",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "hideEmptyPercentages",
                                                    attr: "style.chart.bars.dataLabels.hideEmptyPercentages",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "adaptColorToBackground",
                                                    attr: "style.chart.bars.dataLabels.adaptColorToBackground",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.bars.dataLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.bars.dataLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.bars.dataLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.bars.dataLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.bars.dataLabels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.bars.dataLabels.suffix",
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
                                            attr: "frame",
                                            level: 4,
                                            title: "style.chart.grid.frame",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.grid.frame.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.grid.frame.stroke",
                                                    type: "color",
                                                    defaultVal: "'#E1E5E8'",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.grid.frame.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "strokeLinecap",
                                                    attr: "style.chart.grid.frame.strokeLinecap",
                                                    type: "text",
                                                    defaultVal: "round",
                                                },
                                                {
                                                    name: "strokeLinejoin",
                                                    attr: "style.chart.grid.frame.strokeLinejoin",
                                                    type: "text",
                                                    defaultVal: "round",
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.chart.grid.frame.strokeDasharray",
                                                    type: "number",
                                                    min: 0,
                                                    max: 24,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "scale",
                                            level: 4,
                                            title: "style.chart.grid.scale",
                                            children: [
                                                {
                                                    name: "ticks",
                                                    attr: "style.chart.grid.scale.ticks",
                                                    type: "select",
                                                    defaultVal: "10",
                                                    options: [2, 5, 10, 20],
                                                },
                                                {
                                                    name: "scaleMin",
                                                    attr: "style.chart.grid.scale.scaleMin",
                                                    type: "number",
                                                    defaultVal: "null",
                                                    min: -10000,
                                                    max: 10000,
                                                },
                                                {
                                                    name: "scaleMax",
                                                    attr: "style.chart.grid.scale.scaleMax",
                                                    type: "number",
                                                    defaultVal: "null",
                                                    min: -10000,
                                                    max: 10000,
                                                },
                                            ],
                                        },
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
                                                },
                                                {
                                                    name: "showHorizontalLines",
                                                    attr: "style.chart.grid.x.showHorizontalLines",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisColor",
                                                    attr: "style.chart.grid.x.axisColor",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "axisThickness",
                                                    attr: "style.chart.grid.x.axisThickness",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "linesColor",
                                                    attr: "style.chart.grid.x.linesColor",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "linesThickness",
                                                    attr: "style.chart.grid.x.linesThickness",
                                                    type: "number",
                                                    min: 0,
                                                    max: 12,
                                                    defaultVal: "1",
                                                },
                                                {
                                                    name: "linesStrokeDasharray",
                                                    attr: "style.chart.grid.x.linesStrokeDasharray",
                                                    type: "number",
                                                    min: 0,
                                                    max: 12,
                                                    defaultVal: "0",
                                                },
                                                {
                                                    attr: "axisName",
                                                    level: 5,
                                                    title: "style.chart.grid.x.axisName",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.x.axisName.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "text",
                                                            attr: "style.chart.grid.x.axisName.text",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.grid.x.axisName.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.x.axisName.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.grid.x.axisName.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.grid.x.axisName.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "timeLabels",
                                                    level: 5,
                                                    title: "style.chart.grid.x.timeLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.x.timeLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
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
                                                            name: "showOnlyFirstAndLast",
                                                            attr: "style.chart.grid.x.timeLabels.showOnlyFirstAndLast",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "showFirstAndLast",
                                                            attr: "style.chart.grid.x.timeLabels.showFirstAndLast",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            comment:
                                                                "Since v.3.25.0",
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
                                                            name: "fontSize",
                                                            attr: "style.chart.grid.x.timeLabels.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.x.timeLabels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.grid.x.timeLabels.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.grid.x.timeLabels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "rotation",
                                                            attr: "style.chart.grid.x.timeLabels.rotation",
                                                            type: "range",
                                                            defaultVal: "0",
                                                            min: -90,
                                                            max: 90,
                                                        },
                                                        {
                                                            attr: "autoRotate",
                                                            title: "style.chart.grid.x.timeLabels.autoRotate",
                                                            children: [
                                                                {
                                                                    name: "enable",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                    attr: "style.chart.grid.x.timeLabels.autoRotate.enable",
                                                                },
                                                                {
                                                                    name: "angle",
                                                                    type: "number",
                                                                    min: -90,
                                                                    max: 90,
                                                                    attr: "style.chart.grid.x.timeLabels.autoRotate.angle",
                                                                },
                                                            ],
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
                                                    name: "position",
                                                    attr: "style.chart.grid.y.position",
                                                    type: "select",
                                                    options: ["left", "right"],
                                                    defaultVal: "left",
                                                },
                                                {
                                                    name: "showAxis",
                                                    attr: "style.chart.grid.y.showAxis",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "showVerticalLines",
                                                    attr: "style.chart.grid.y.showVerticalLines",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "axisColor",
                                                    attr: "style.chart.grid.y.axisColor",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "axisThickness",
                                                    attr: "style.chart.grid.y.axisThickness",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "linesColor",
                                                    attr: "style.chart.grid.y.linesColor",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "linesThickness",
                                                    attr: "style.chart.grid.y.linesThickness",
                                                    type: "number",
                                                    min: 0,
                                                    max: 12,
                                                    defaultVal: "1",
                                                },
                                                {
                                                    name: "linesStrokeDasharray",
                                                    attr: "style.chart.grid.y.linesStrokeDasharray",
                                                    type: "number",
                                                    min: 0,
                                                    max: 12,
                                                    defaultVal: "0",
                                                },
                                                {
                                                    attr: "axisName",
                                                    level: 5,
                                                    title: "style.chart.grid.y.axisName",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.y.axisName.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "text",
                                                            attr: "style.chart.grid.y.axisName.text",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.grid.y.axisName.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.y.axisName.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.grid.y.axisName.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "offsetX",
                                                            attr: "style.chart.grid.y.axisName.offsetX",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "axisLabels",
                                                    level: 5,
                                                    title: "style.chart.grid.y.axisLabels",
                                                    children: [
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
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.grid.y.axisLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.grid.y.axisLabels.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.grid.y.axisLabels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.grid.y.axisLabels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "rounding",
                                                            attr: "style.chart.grid.y.axisLabels.rounding",
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
