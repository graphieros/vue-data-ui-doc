// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiWheelConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiWheelConfig",
            equal: true,
            children: [
                {
                    component: "span",
                    children: [
                        { text: "responsive: false, " },
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
                    name: "layout",
                    attr: "layout",
                    type: "select",
                    defaultVal: "classic",
                    options: ["classic", "3d"],
                    comment: "since v3.2.1",
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
                                            name: "speed",
                                            attr: "style.chart.animation.speed",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0.1,
                                            max: 100,
                                            step: 0.1,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "acceleration",
                                            attr: "style.chart.animation.acceleration",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0.1,
                                            max: 5,
                                            step: 0.1,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                    ],
                                },
                                {
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            attr: "innerCircle",
                                            level: 4,
                                            title: "style.chart.layout.innerCircle",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.innerCircle.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.innerCircle.stroke",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.innerCircle.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "radiusRatio",
                                                    attr: "style.chart.layout.innerCircle.radiusRatio",
                                                    type: "number",
                                                    min: 0.2,
                                                    max: 2,
                                                    step: 0.1,
                                                    comment: "since v3.2.1",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "percentage",
                                            level: 4,
                                            title: "style.chart.layout.percentage",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.percentage.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.percentage.fontSize",
                                                    type: "number",
                                                    defaultVal: "48",
                                                    min: 8,
                                                    max: 100,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.layout.percentage.rounding",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.percentage.bold",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "offsetX",
                                                    attr: "style.chart.layout.percentage.offsetX",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                    comment: "since v3.2.1",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.layout.percentage.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                    comment: "since v3.2.1",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.percentage.stroke",
                                                    type: "color",
                                                    defaultVal: "transparent",
                                                    comment: "since v3.2.1.",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.percentage.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
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
                                            attr: "wheel",
                                            level: 4,
                                            title: "style.chart.layout.wheel",
                                            children: [
                                                {
                                                    name: "radiusRatio",
                                                    attr: "style.chart.layout.wheel.radiusRatio",
                                                    type: "number",
                                                    min: 0.3,
                                                    max: 1,
                                                    step: 0.01,
                                                    comment: "since v3.2.1",
                                                },
                                                {
                                                    name: "tiltAngle3d",
                                                    attr: "style.chart.layout.wheel.tiltAngle3d",
                                                    type: "range",
                                                    min: 10,
                                                    max: 80,
                                                    comment: "since v3.2.1",
                                                },
                                                {
                                                    attr: "ticks",
                                                    level: 5,
                                                    title: "style.chart.layout.wheel.ticks",
                                                    children: [
                                                        {
                                                            name: "type",
                                                            attr: "style.chart.layout.wheel.ticks.type",
                                                            type: "select",
                                                            defaultVal:
                                                                "classic",
                                                            options: [
                                                                "classic",
                                                                "arc",
                                                            ],
                                                        },
                                                        {
                                                            name: "rounded",
                                                            attr: "style.chart.layout.wheel.ticks.rounded",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "inactiveColor",
                                                            attr: "style.chart.layout.wheel.ticks.inactiveColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#E1E5E8",
                                                        },
                                                        {
                                                            name: "activeColor",
                                                            attr: "style.chart.layout.wheel.ticks.activeColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#5F8BEE",
                                                        },
                                                        {
                                                            name: "sizeRatio",
                                                            attr: "style.chart.layout.wheel.ticks.sizeRatio",
                                                            type: "range",
                                                            defaultVal: "0.9",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.wheel.ticks.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "transparent",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.wheel.ticks.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "5",
                                                            min: 0,
                                                            max: 12,
                                                        },
                                                        {
                                                            name: "depth3d",
                                                            attr: "style.chart.layout.wheel.ticks.depth3d",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: 0,
                                                            max: 40,
                                                        },
                                                        {
                                                            name: "spacingRatio3d",
                                                            attr: "style.chart.layout.wheel.ticks.spacingRatio3d",
                                                            type: "range",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.01,
                                                            defaultVal: "1",
                                                        },
                                                        {
                                                            name: "shadeColorRatio3d",
                                                            attr: "style.chart.layout.wheel.ticks.shadeColorRatio3d",
                                                            type: "range",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.01,
                                                            defaultVal: "0.15",
                                                        },
                                                        {
                                                            attr: "gradient",
                                                            level: 6,
                                                            title: "style.chart.layout.wheel.ticks.gradient",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.wheel.ticks.gradient.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "shiftHueIntensity",
                                                                    attr: "style.chart.layout.wheel.ticks.gradient.shiftHueIntensity",
                                                                    type: "range",
                                                                    defaultVal:
                                                                        "100",
                                                                    min: 0,
                                                                    max: 100,
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
