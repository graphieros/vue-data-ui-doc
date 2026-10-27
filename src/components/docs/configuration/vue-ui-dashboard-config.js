// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiDashboardConfigFields({ forceChartUpdate }) {
    return [
        {
            attr: "const config: VueUiDashboardConfig",
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
                    name: "locked",
                    attr: "locked",
                    type: "checkbox",
                    defaultVal: "false",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    attr: "style",
                    level: 1,
                    children: [
                        {
                            attr: "board",
                            level: 2,
                            title: "style.board",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.board.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "style.board.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "aspectRatio",
                                    attr: "style.board.aspectRatio",
                                    type: "text",
                                    defaultVal: "1/1.4141",
                                },
                                {
                                    name: "border",
                                    attr: "style.board.border",
                                    type: "text",
                                    defaultVal: "none",
                                },
                            ],
                        },
                        {
                            attr: "item",
                            level: 2,
                            title: "style.item",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.item.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "borderColor",
                                    attr: "style.item.borderColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                            ],
                        },
                        {
                            attr: "resizeHandles",
                            level: 2,
                            title: "style.resizeHandles",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.resizeHandles.backgroundColor",
                                    type: "color",
                                    defaultVal: "#2D353C",
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
                                    name: "annotator",
                                    attr: "userOptions.buttonTitles.annotator",
                                    type: "text",
                                    defaultVal: "Toggle annotator",
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
                                    name: "filename",
                                    attr: "userOptions.print.filename",
                                    type: "text",
                                    defaultVal: "''",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
