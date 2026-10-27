// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiBulletConfigFields({
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiBulletConfig",
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
                    inactive: true,
                    name: "theme",
                    defaultVal: "''",
                    comment:
                        "'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'",
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
                            options: ["left", "right"],
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
                                    type: "range",
                                    defaultVal: "96",
                                    min: 64,
                                    max: 128,
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "range",
                                    defaultVal: "600",
                                    min: 400,
                                    max: 1000,
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
                                            defaultVal: "24",
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
                                    attr: "animation",
                                    level: 3,
                                    title: "style.chart.animation",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.animation.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "animationFrames",
                                            attr: "style.chart.animation.animationFrames",
                                            type: "number",
                                            defaultVal: "60",
                                            min: 30,
                                            max: 255,
                                        },
                                    ],
                                },
                                {
                                    attr: "segments",
                                    level: 3,
                                    title: "style.chart.segments",
                                    children: [
                                        {
                                            name: "baseColor",
                                            attr: "style.chart.segments.baseColor",
                                            type: "color",
                                            defaultVal: "#9A9A9A",
                                        },
                                        {
                                            attr: "dataLabels",
                                            level: 4,
                                            title: "style.chart.segments.dataLabels",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.segments.dataLabels.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.segments.dataLabels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.segments.dataLabels.fontSize",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 8,
                                                    max: 42,
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
                                                    name: "bold",
                                                    attr: "style.chart.segments.dataLabels.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.segments.dataLabels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.segments.dataLabels.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.segments.dataLabels.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.segments.dataLabels.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "ticks",
                                            level: 4,
                                            title: "style.chart.segments.ticks",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.segments.ticks.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "divisions",
                                                    attr: "style.chart.segments.ticks.divisions",
                                                    type: "select",
                                                    defaultVal: "10",
                                                    options: [2, 3, 5, 10, 20],
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.segments.ticks.stroke",
                                                    type: "color",
                                                    defaultVal: "#8A8A8A",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "target",
                                    level: 3,
                                    title: "style.chart.target",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.target.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "ontTop",
                                            attr: "style.chart.target.onTop",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.target.color",
                                            type: "color",
                                            defaultVal: "#1A1A1A",
                                        },
                                        {
                                            name: "rounded",
                                            attr: "style.chart.target.rounded",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "heightRatio",
                                            attr: "style.chart.target.heightRatio",
                                            type: "range",
                                            defaultVal: "0.8",
                                            min: 0.1,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.target.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.target.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "width",
                                            attr: "style.chart.target.width",
                                            type: "number",
                                            defaultVal: "6",
                                            min: 1,
                                            max: 24,
                                        },
                                    ],
                                },
                                {
                                    attr: "valueBar",
                                    level: 3,
                                    title: "style.chart.valueBar",
                                    children: [
                                        {
                                            name: "color",
                                            attr: "style.chart.valueBar.color",
                                            type: "color",
                                            defaultVal: "#3A3A3A",
                                        },
                                        {
                                            name: "heightRatio",
                                            attr: "style.chart.valueBar.heightRatio",
                                            type: "range",
                                            defaultVal: "0.33",
                                            min: 0.1,
                                            max: 0.9,
                                            step: 0.01,
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.valueBar.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.valueBar.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            attr: "label",
                                            level: 4,
                                            title: "style.chart.valueBar.label",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.valueBar.label.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.valueBar.label.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.valueBar.label.fontSize",
                                                    defaultVal: "14",
                                                    type: "number",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.valueBar.label.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.valueBar.label.offsetY",
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
                                    attr: "title",
                                    level: 3,
                                    title: "style.chart.title",
                                    children: [
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
                                            defaultVal: "left",
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
                                            defaultVal: "12",
                                            min: 0,
                                            max: 64,
                                        },
                                        {
                                            name: "paddingRight",
                                            attr: "style.chart.title.paddingRight",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 64,
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
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.title.subtitle.color",
                                                    type: "color",
                                                    defaultVal: "#A1A1A1",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.title.subtitle.fontSize",
                                                    type: "number",
                                                    defaultVal: "16",
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
                                            name: "bold",
                                            attr: "style.chart.legend.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
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
                                            name: "roundingValue",
                                            attr: "style.chart.legend.roundingValue",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
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
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
