// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiThermometerConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiThermometerConfig",
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
                                    defaultVal: "360",
                                    min: 100,
                                    max: 360,
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "number",
                                    defaultVal: "256",
                                    min: 100,
                                    max: 360,
                                },
                                {
                                    attr: "animation",
                                    level: 3,
                                    title: "style.chart.animation",
                                    children: [
                                        {
                                            name: "use",
                                            attr: "style.chart.animation.use",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "speedMs",
                                            attr: "style.chart.animation.speedMs",
                                            type: "number",
                                            defaultVal: "1000",
                                            min: 50,
                                            max: 1000,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                    ],
                                },
                                {
                                    attr: "graduations",
                                    level: 3,
                                    title: "style.chart.graduations",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.graduations.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "sides",
                                            attr: "style.chart.graduations.sides",
                                            type: "select",
                                            defaultVal: "both",
                                            options: [
                                                "both",
                                                "left",
                                                "right",
                                                "none",
                                            ],
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.graduations.stroke",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.graduations.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 1,
                                            max: 24,
                                        },
                                        {
                                            name: "showIntermediate",
                                            attr: "style.chart.graduations.showIntermediate",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.chart.graduations.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.graduations.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "intensity",
                                                    attr: "style.chart.graduations.gradient.intensity",
                                                    type: "range",
                                                    defaultVal: "20",
                                                    min: 0,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "label",
                                    level: 3,
                                    title: "style.chart.label",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.label.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.label.fontSize",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "minFontSize",
                                            attr: "style.chart.label.minFontSize",
                                            type: "number",
                                            defaultVal: "6",
                                            min: 6,
                                            max: 42,
                                        },
                                        {
                                            name: "rounding",
                                            attr: "style.chart.label.rounding",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 1,
                                            max: 6,
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.label.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.label.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "prefix",
                                            attr: "style.chart.label.prefix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "suffix",
                                            attr: "style.chart.label.suffix",
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
                                    ],
                                },
                                {
                                    attr: "thermometer",
                                    level: 3,
                                    title: "style.chart.thermometer",
                                    children: [
                                        {
                                            name: "width",
                                            attr: "style.chart.thermometer.width",
                                            type: "number",
                                            defaultVal: "48",
                                            min: 10,
                                            max: 100,
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
                                    name: "img",
                                    attr: "userOptions.buttonTitles.img",
                                    type: "text",
                                    defaultVal: "Download PNG",
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
