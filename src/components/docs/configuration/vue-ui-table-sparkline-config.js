// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiTableSparklineConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiTableSparklineConfig",
            equal: true,
            children: [
                { inactive: true, name: "debug", defaultVal: "false," },
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
                        { text: "colNames: [], " },
                        {
                            component: "BaseComment",
                            children: [
                                { text: translations.docs.example[store.lang] },
                                {
                                    text: ' : ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE"]',
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
                    component: "span",
                    children: [{ text: 'fontFamily: "inherit",' }],
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
                    name: "responsiveBreakpoint",
                    attr: "responsiveBreakpoint",
                    type: "number",
                    defaultVal: "500",
                    min: 300,
                    max: 800,
                    step: 50,
                },
                {
                    name: "roundingAverage",
                    attr: "roundingAverage",
                    type: "number",
                    defaultVal: "0",
                    min: 0,
                    max: 6,
                },
                {
                    name: "roundingMedian",
                    attr: "roundingMedian",
                    type: "number",
                    defaultVal: "0",
                    min: 0,
                    max: 6,
                },
                {
                    name: "roundingTotal",
                    attr: "roundingTotal",
                    type: "number",
                    defaultVal: "0",
                    min: 0,
                    max: 6,
                },
                {
                    name: "roundingValues",
                    attr: "roundingValues",
                    type: "number",
                    defaultVal: "0",
                    min: 0,
                    max: 6,
                },
                {
                    name: "showAverage",
                    attr: "showAverage",
                    type: "checkbox",
                    defaultVal: "true",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "showMedian",
                    attr: "showMedian",
                    type: "checkbox",
                    defaultVal: "true",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "showSparklines",
                    attr: "showSparklines",
                    type: "checkbox",
                    defaultVal: "true",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "showTotal",
                    attr: "showTotal",
                    type: "checkbox",
                    defaultVal: "true",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "prefix",
                    attr: "prefix",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "suffix",
                    attr: "suffix",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    component: "span",
                    children: [
                        { text: "sortedDataColumnIndices: number[], " },
                        {
                            component: "BaseComment",
                            children: [
                                {
                                    text: "Since v2.4.49 Include data column indices to enable sorting functionality",
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "sortedSeriesName",
                    attr: "sortedSeriesName",
                    type: "checkbox",
                    defaultVal: "false",
                    comment: "Since v2.4.49",
                },
                {
                    name: "sortedSum",
                    attr: "sortedSum",
                    type: "checkbox",
                    defaultVal: "false",
                    comment: "Since v2.4.49",
                },
                {
                    name: "sortedAverage",
                    attr: "sortedAverage",
                    type: "checkbox",
                    defaultVal: "false",
                    comment: "Since v2.4.49",
                },
                {
                    name: "sortedMedian",
                    attr: "sortedMedian",
                    type: "checkbox",
                    defaultVal: "false",
                    comment: "Since v2.4.49",
                },
                {
                    name: "resetSortOnClickOutside",
                    attr: "resetSortOnClickOutside",
                    type: "checkbox",
                    defaultVal: "false",
                    comment: "Since v2.4.49",
                },
                {
                    component: "div",
                    class: "flex flex-row gap-2 place-items-center",
                    children: [
                        {
                            inactive: true,
                            name: "formatter",
                            defaultVal: "null",
                            comment: translations.formatterLink[store.lang],
                        },
                        {
                            component: "div",
                            class: "min-w-[200px]",
                            children: [
                                {
                                    component: "BaseTabLink",
                                    action: () =>
                                        goToPage("/customization#formatter"),
                                    icon: "cursor",
                                    children: [{ text: " Go to page " }],
                                },
                            ],
                        },
                    ],
                },
                {
                    attr: "sparkline",
                    level: 1,
                    children: [
                        {
                            name: "useGradient",
                            attr: "sparkline.useGradient",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "showArea",
                            attr: "sparkline.showArea",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "strokeWidth",
                            attr: "sparkline.strokeWidth",
                            type: "number",
                            defaultVal: "3",
                            min: 1,
                            max: 12,
                        },
                        {
                            name: "type",
                            attr: "sparkline.type",
                            type: "select",
                            defaultVal: "line",
                            options: ["line", "bar"],
                        },
                        {
                            name: "smooth",
                            attr: "sparkline.smooth",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "cutNullValues",
                            attr: "sparkline.cutNullValues",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            attr: "dimensions",
                            level: 2,
                            title: "sparkline.dimensions",
                            children: [
                                {
                                    name: "width",
                                    attr: "sparkline.dimensions.width",
                                    type: "number",
                                    defaultVal: "150",
                                    min: 100,
                                    max: 300,
                                },
                                {
                                    name: "heightRatio",
                                    attr: "sparkline.dimensions.heightRatio",
                                    type: "range",
                                    defaultVal: "1",
                                    min: 0.5,
                                    max: 2,
                                    step: 0.01,
                                },
                            ],
                        },
                        {
                            attr: "animation",
                            level: 2,
                            title: "sparkline.animation",
                            children: [
                                {
                                    name: "show",
                                    attr: "sparkline.animation.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "animationFrames",
                                    attr: "sparkline.animation.animationFrames",
                                    type: "number",
                                    defaultVal: "360",
                                    min: 60,
                                    max: 600,
                                    step: 20,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    attr: "tbody",
                    level: 1,
                    children: [
                        {
                            name: "backgroundColor",
                            attr: "tbody.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "tbody.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "fontSize",
                            attr: "tbody.fontSize",
                            type: "number",
                            defaultVal: "14",
                            min: 8,
                            max: 42,
                        },
                        {
                            name: "outline",
                            attr: "tbody.outline",
                            type: "text",
                            defaultVal: "none",
                        },
                        {
                            name: "textAlign",
                            attr: "tbody.textAlign",
                            type: "select",
                            defaultVal: "left",
                            options: ["left", "center", "right"],
                        },
                        {
                            name: "bold",
                            attr: "tbody.bold",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "showColorMarker",
                            attr: "tbody.showColorMarker",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            attr: "selectedColor",
                            level: 2,
                            title: "tbody.selectedColor",
                            children: [
                                {
                                    name: "useSerieColor",
                                    attr: "tbody.selectedColor.useSerieColor",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "fallback",
                                    attr: "tbody.selectedColor.fallback",
                                    type: "text",
                                    defaultVal: "#E1E5E8",
                                },
                            ],
                        },
                    ],
                },
                {
                    attr: "thead",
                    level: 1,
                    children: [
                        {
                            name: "backgroundColor",
                            attr: "thead.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "thead.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "fontSize",
                            attr: "thead.fontSize",
                            type: "number",
                            defaultVal: "14",
                            min: 8,
                            max: 42,
                        },
                        {
                            name: "outline",
                            attr: "thead.outline",
                            type: "text",
                            defaultVal: "none",
                        },
                        {
                            name: "textAlign",
                            attr: "thead.textAlign",
                            type: "select",
                            defaultVal: "left",
                            options: ["left", "center", "right"],
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "bold",
                            attr: "thead.bold",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                    ],
                },
                {
                    attr: "title",
                    level: 1,
                    children: [
                        {
                            name: "backgroundColor",
                            attr: "title.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "title.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "text",
                            attr: "title.text",
                            type: "text",
                            defaultVal: "''",
                        },
                        {
                            name: "fontSize",
                            attr: "title.fontSize",
                            type: "number",
                            defaultVal: "20",
                            min: 8,
                            max: 42,
                        },
                        {
                            name: "bold",
                            attr: "title.bold",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "textAlign",
                            attr: "title.textAlign",
                            type: "select",
                            defaultVal: "center",
                            options: ["left", "center", "right"],
                        },
                        {
                            attr: "subtitle",
                            level: 2,
                            title: "title.subtitle",
                            children: [
                                {
                                    name: "text",
                                    attr: "title.subtitle.text",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "color",
                                    attr: "title.subtitle.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "fontSize",
                                    attr: "title.subtitle.fontSize",
                                    type: "number",
                                    defaultVal: "16",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "bold",
                                    attr: "title.subtitle.bold",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                            ],
                        },
                    ],
                },
                {
                    attr: "translations",
                    level: 1,
                    children: [
                        {
                            name: "serie",
                            attr: "translations.serie",
                            type: "text",
                            defaultVal: "Serie",
                        },
                        {
                            name: "total",
                            attr: "translations.total",
                            type: "text",
                            defaultVal: "Total",
                        },
                        {
                            name: "average",
                            attr: "translations.average",
                            type: "text",
                            defaultVal: "Average",
                        },
                        {
                            name: "median",
                            attr: "translations.median",
                            type: "text",
                            defaultVal: "Median",
                        },
                        {
                            name: "chart",
                            attr: "translations.chart",
                            type: "text",
                            defaultVal: "Evolution",
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
                                    name: "fullscreen",
                                    attr: "userOptions.buttons.fullscreen",
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
                                    name: "fullscreen",
                                    attr: "userOptions.buttonTitles.fullscreen",
                                    type: "text",
                                    defaultVal: "Toggle fullscreen",
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
