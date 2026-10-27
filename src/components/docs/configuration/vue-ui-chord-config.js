// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiChordConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiChordConfig",
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
                    defaultVal: "false",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "initialRotation",
                    attr: "initialRotation",
                    defaultVal: "0",
                    min: 0,
                    max: 360,
                    type: "number",
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
                                    attr: "arcs",
                                    level: 3,
                                    title: "style.chart.arcs",
                                    children: [
                                        {
                                            name: "innerRadiusRatio",
                                            attr: "style.chart.arcs.innerRadiusRatio",
                                            type: "number",
                                            min: 0,
                                            max: 1.5,
                                            step: 0.01,
                                            defaultVal: "1",
                                        },
                                        {
                                            name: "outerRadiusRatio",
                                            attr: "style.chart.arcs.outerRadiusRatio",
                                            type: "number",
                                            min: 0,
                                            max: 1.5,
                                            step: 0.01,
                                            defaultVal: "1",
                                        },
                                        {
                                            name: "padAngle",
                                            attr: "style.chart.arcs.padAngle",
                                            type: "number",
                                            min: 0,
                                            max: 270,
                                            defaultVal: "5",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.arcs.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.arcs.strokeWidth",
                                            type: "number",
                                            min: 0,
                                            max: 12,
                                            defaultVal: "1",
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.arcs.labels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.arcs.labels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.arcs.labels.fontSize",
                                                    type: "number",
                                                    min: 8,
                                                    max: 42,
                                                    defaultVal: "14",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.arcs.labels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "curved",
                                                    attr: "style.chart.arcs.labels.curved",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "adaptColorToBackground",
                                                    attr: "style.chart.arcs.labels.adaptColorToBackground",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.arcs.labels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "offset",
                                                    attr: "style.chart.arcs.labels.offset",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "showPercentage",
                                                    attr: "style.chart.arcs.labels.showPercentage",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "roundingPercentage",
                                                    attr: "style.chart.arcs.labels.roundingPercentage",
                                                    type: "number",
                                                    min: 0,
                                                    max: 6,
                                                    defaultVal: "0",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "ribbons",
                                    level: 3,
                                    title: "style.chart.ribbons",
                                    children: [
                                        {
                                            name: "stroke",
                                            attr: "style.chart.ribbons.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.ribbons.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "underlayerOpacity",
                                            attr: "style.chart.ribbons.underlayerOpacity",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.ribbons.labels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.ribbons.labels.show",
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
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.ribbons.labels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.ribbons.labels.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.ribbons.labels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.ribbons.labels.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.ribbons.labels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "useSerieColor",
                                                    attr: "style.chart.ribbons.labels.useSerieColor",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.ribbons.labels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "offset",
                                                    attr: "style.chart.ribbons.labels.offset",
                                                    type: "number",
                                                    min: -100,
                                                    max: 100,
                                                    defaultVal: "0",
                                                },
                                                {
                                                    name: "minSeparationDeg",
                                                    attr: "style.chart.ribbons.labels.minSeparationDeg",
                                                    type: "number",
                                                    min: 0,
                                                    max: 90,
                                                    defaultVal: "3",
                                                },
                                                {
                                                    attr: "connector",
                                                    level: 5,
                                                    title: "style.chart.ribbons.labels.connector",
                                                    children: [
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.ribbons.labels.connector.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.ribbons.labels.connector.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 12,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "marker",
                                                    level: 5,
                                                    title: "style.chart.ribbons.labels.connector.marker",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.ribbons.labels.marker.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "radius",
                                                            attr: "style.chart.ribbons.labels.marker.radius",
                                                            type: "number",
                                                            defaultVal: "3",
                                                            min: 0,
                                                            max: 12,
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.ribbons.labels.marker.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.ribbons.labels.marker.strokeWidth",
                                                            type: "number",
                                                            min: 0,
                                                            max: 12,
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
                                            name: "position",
                                            attr: "style.chart.legend.position",
                                            type: "select",
                                            defaultVal: "bottom",
                                            options: ["top", "bottom"],
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
                                    inactive: true,
                                    unsupported: true,
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
