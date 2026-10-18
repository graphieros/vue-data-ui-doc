// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiCarouselTableConfigFields({
    forceChartUpdate,
    setActiveTab,
}) {
    return [
        {
            attr: "const config: VueUiCarouselTableConfig",
            equal: true,
            children: [
                { inactive: true, name: "debug", defaultVal: "false," },
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
                    defaultVal: "400",
                    min: 300,
                    max: 800,
                    step: 10,
                },
                {
                    attr: "animation",
                    level: 1,
                    children: [
                        {
                            name: "type",
                            attr: "animation.type",
                            type: "select",
                            defaultVal: "scroll",
                            options: ["scroll", "marquee"],
                        },
                        {
                            name: "use",
                            attr: "animation.use",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "speedMs",
                            attr: "animation.speedMs",
                            type: "range",
                            defaultVal: "1000",
                            min: 500,
                            max: 5000,
                            step: 100,
                        },
                        {
                            name: "pauseOnHover",
                            attr: "animation.pauseOnHover",
                            type: "checkbox",
                            defaultVal: "true",
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
                            name: "backgroundColor",
                            attr: "style.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "style.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                    ],
                },
                {
                    attr: "border",
                    level: 1,
                    children: [
                        {
                            name: "size",
                            attr: "border.size",
                            type: "number",
                            defaultVal: "0",
                            min: 0,
                            max: 12,
                        },
                        {
                            name: "color",
                            attr: "border.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                    ],
                },
                {
                    attr: "scrollbar",
                    level: 1,
                    children: [
                        {
                            name: "showOnlyOnHover",
                            attr: "scrollbar.showOnlyOnHover",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "hide",
                            attr: "scrollbar.hide",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                    ],
                },
                {
                    attr: "caption",
                    level: 1,
                    children: [
                        {
                            name: "text",
                            attr: "caption.text",
                            type: "text",
                            defaultVal: "''",
                        },
                        {
                            attr: "padding",
                            level: 2,
                            title: "caption.padding",
                            children: [
                                {
                                    name: "top",
                                    attr: "caption.padding.top",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "right",
                                    attr: "caption.padding.right",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "bottom",
                                    attr: "caption.padding.bottom",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "left",
                                    attr: "caption.padding.left",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 24,
                                },
                            ],
                        },
                        {
                            attr: "style",
                            level: 2,
                            title: "caption.style",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "caption.style.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "caption.style.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "fontSize",
                                    attr: "caption.style.fontSize",
                                    type: "text",
                                    defaultVal: "16px",
                                },
                                {
                                    name: "fontWeight",
                                    attr: "caption.style.fontWeight",
                                    type: "select",
                                    defaultVal: "bold",
                                    options: ["normal", "bold"],
                                },
                                {
                                    name: "textAlign",
                                    attr: "caption.style.textAlign",
                                    type: "select",
                                    defaultVal: "left",
                                    options: ["left", "center", "right"],
                                },
                                { text: "> " },
                            ],
                        },
                    ],
                },
                {
                    attr: "thead",
                    level: 1,
                    children: [
                        {
                            attr: "style",
                            level: 2,
                            title: "thead.style",
                            children: [
                                {
                                    name: "verticalAlign",
                                    attr: "thead.style.verticalAlign",
                                    type: "select",
                                    defaultVal: "middle",
                                    options: [
                                        "baseline",
                                        "top",
                                        "middle",
                                        "bottom",
                                        "sub",
                                        "text-top",
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "tr",
                            level: 2,
                            title: "thead.tr",
                            children: [
                                {
                                    name: "height",
                                    attr: "thead.tr.height",
                                    type: "number",
                                    defaultVal: "32",
                                    min: 24,
                                    max: 64,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    attr: "border",
                                    level: 3,
                                    title: "thead.tr.border",
                                    children: [
                                        {
                                            name: "size",
                                            attr: "thead.tr.border.size",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "color",
                                            attr: "thead.tr.border.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
                                },
                                {
                                    attr: "style",
                                    level: 3,
                                    title: "thead.tr.style",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "thead.tr.style.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "color",
                                            attr: "thead.tr.style.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "boxShadow",
                                            attr: "thead.tr.style.boxShadow",
                                            type: "text",
                                            defaultVal:
                                                "0 6px 12px -6px #2D353C50",
                                        },
                                    ],
                                },
                                {
                                    attr: "th",
                                    level: 3,
                                    title: "thead.tr.th",
                                    children: [
                                        {
                                            attr: "border",
                                            level: 4,
                                            title: "thead.tr.th.border",
                                            children: [
                                                {
                                                    name: "size",
                                                    attr: "thead.tr.th.border.size",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "thead.tr.th.border.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "padding",
                                            level: 4,
                                            title: "thead.tr.th.padding",
                                            children: [
                                                {
                                                    name: "top",
                                                    attr: "thead.tr.th.padding.top",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "right",
                                                    attr: "thead.tr.th.padding.right",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "bottom",
                                                    attr: "thead.tr.th.padding.bottom",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "left",
                                                    attr: "thead.tr.th.padding.left",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "style",
                                            level: 4,
                                            title: "thead.tr.th.style",
                                            children: [
                                                {
                                                    name: "borderSpacing",
                                                    attr: "thead.tr.th.style.borderSpacing",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "border",
                                                    attr: "thead.tr.th.style.border",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "textAlign",
                                                    attr: "thead.tr.th.style.textAlign",
                                                    type: "select",
                                                    defaultVal: "right",
                                                    options: [
                                                        "left",
                                                        "center",
                                                        "right",
                                                    ],
                                                },
                                                {
                                                    name: "fontVariantNumeric",
                                                    attr: "thead.tr.th.style.fontVariantNumeric",
                                                    type: "select",
                                                    defaultVal: "tabular-nums",
                                                    options: [
                                                        "normal",
                                                        "tabular-nums",
                                                        "slashed-zero",
                                                        "oldstyle-nums",
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
                            attr: "tr",
                            level: 2,
                            title: "tbody.tr",
                            children: [
                                {
                                    name: "visible",
                                    attr: "tbody.tr.visible",
                                    type: "number",
                                    defaultVal: "5",
                                    min: 1,
                                    max: 10,
                                },
                                {
                                    name: "height",
                                    attr: "tbody.tr.height",
                                    type: "number",
                                    defaultVal: "32",
                                    min: 24,
                                    max: 64,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    attr: "border",
                                    level: 3,
                                    title: "tbody.tr.border",
                                    children: [
                                        {
                                            name: "size",
                                            attr: "tbody.tr.border.size",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "color",
                                            attr: "tbody.tr.border.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
                                },
                                {
                                    attr: "style",
                                    level: 3,
                                    title: "tbody.tr.style",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "tbody.tr.style.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "color",
                                            attr: "tbody.tr.style.backgroundColor",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
                                },
                                {
                                    attr: "td",
                                    level: 3,
                                    title: "tbody.tr.td",
                                    children: [
                                        {
                                            name: "alternateColor",
                                            attr: "tbody.tr.td.alternateColor",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "alternateOpacity",
                                            attr: "tbody.tr.td.alternateOpacity",
                                            type: "range",
                                            defaultVal: "0.5",
                                            min: 0,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            attr: "border",
                                            level: 4,
                                            title: "tbody.tr.td.border",
                                            children: [
                                                {
                                                    name: "size",
                                                    attr: "tbody.tr.td.border.size",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "tbody.tr.td.border.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "padding",
                                            level: 4,
                                            title: "tbody.tr.td.padding",
                                            children: [
                                                {
                                                    name: "top",
                                                    attr: "tbody.tr.td.padding.top",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "right",
                                                    attr: "tbody.tr.td.padding.right",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "bottom",
                                                    attr: "tbody.tr.td.padding.bottom",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "left",
                                                    attr: "tbody.tr.td.padding.left",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "style",
                                            level: 4,
                                            title: "tbody.tr.td.style",
                                            children: [
                                                {
                                                    name: "textAlign",
                                                    attr: "tbody.tr.td.style.textAlign",
                                                    type: "select",
                                                    defaultVal: "right",
                                                    options: [
                                                        "left",
                                                        "center",
                                                        "right",
                                                    ],
                                                },
                                                {
                                                    name: "fontVariantNumeric",
                                                    attr: "tbody.tr.td.style.fontVariantNumeric",
                                                    type: "select",
                                                    defaultVal: "tabular-nums",
                                                    options: [
                                                        "normal",
                                                        "tabular-nums",
                                                        "slashed-zero",
                                                        "oldstyle-nums",
                                                    ],
                                                },
                                                {
                                                    name: "backgroundColor",
                                                    attr: "tbody.tr.td.style.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
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
                                    name: "csv",
                                    attr: "userOptions.buttons.csv",
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
                                    name: "fullscreen",
                                    attr: "userOptions.buttonTitles.fullscreen",
                                    type: "text",
                                    defaultVal: "Toggle fullscreen",
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
