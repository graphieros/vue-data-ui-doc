// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiAnnotatorConfigFields(_context) {
    return [
        {
            attr: "const config: VueUiAnnotatorConfig",
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
                    name: "alwaysVisible",
                    attr: "alwaysVisible",
                    type: "checkbox",
                    defaultVal: "false",
                },
                {
                    attr: "style",
                    level: 1,
                    children: [
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
                        {
                            inactive: true,
                            name: "fontFamily",
                            attr: "style.fontFamily",
                            defaultVal: "'inherit'",
                        },
                        {
                            name: "showPrint",
                            attr: "style.showPrint",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "showSave",
                            attr: "style.showSave",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "showImage",
                            attr: "style.showImage",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "showTooltips",
                            attr: "style.showTooltips",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            attr: "buttons",
                            level: 2,
                            title: "style.buttons",
                            children: [
                                {
                                    name: "borderRadius",
                                    attr: "style.buttons.borderRadius",
                                    type: "range",
                                    defaultVal: "6",
                                    min: 0,
                                    max: 12,
                                },
                                {
                                    attr: "controls",
                                    level: 3,
                                    title: "style.buttons.controls",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.buttons.controls.backgroundColor",
                                            defaultVal: "#FFFFFF",
                                            type: "color",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.buttons.controls.color",
                                            defaultVal: "#2D353C",
                                            type: "color",
                                        },
                                        {
                                            name: "border",
                                            attr: "style.buttons.controls.border",
                                            defaultVal: "'1px solid #262626'",
                                            type: "text",
                                        },
                                        {
                                            attr: "selected",
                                            level: 4,
                                            title: "style.buttons.controls.selected",
                                            children: [
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.buttons.controls.selected.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.buttons.controls.selected.color",
                                                    type: "color",
                                                    defaultVal: "#FAFAFA",
                                                },
                                                {
                                                    name: "border",
                                                    attr: "style.buttons.controls.selected.border",
                                                    defaultVal:
                                                        "'1px solid #CCCCCC'",
                                                    type: "text",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "shapes",
                                    level: 3,
                                    title: "style.buttons.shapes",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.buttons.shapes.backgroundColor",
                                            defaultVal: "#FFFFFF",
                                            type: "color",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.buttons.shapes.color",
                                            defaultVal: "#2D353C",
                                            type: "color",
                                        },
                                        {
                                            name: "border",
                                            attr: "style.buttons.shapes.border",
                                            defaultVal: "'1px solid #262626'",
                                            type: "text",
                                        },
                                        {
                                            attr: "selected",
                                            level: 4,
                                            title: "style.buttons.shapes.selected",
                                            children: [
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.buttons.shapes.selected.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.buttons.shapes.selected.color",
                                                    type: "color",
                                                    defaultVal: "#FAFAFA",
                                                },
                                                {
                                                    name: "border",
                                                    attr: "style.buttons.shapes.selected.border",
                                                    defaultVal:
                                                        "'1px solid #CCCCCC'",
                                                    type: "text",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "tooltips",
                            level: 2,
                            title: "style.tooltips",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.tooltips.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FAFAFA",
                                },
                                {
                                    name: "color",
                                    attr: "style.tooltips.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "borderRadius",
                                    attr: "style.tooltips.borderRadius",
                                    type: "range",
                                    min: 0,
                                    max: 12,
                                    defaultVal: "6",
                                },
                                {
                                    name: "border",
                                    attr: "style.tooltips.border",
                                    type: "text",
                                    defaultVal: "'1 px solid #CCCCCC'",
                                },
                                {
                                    name: "boxShadow",
                                    attr: "style.tooltips.boxShadow",
                                    type: "text",
                                    defaultVal:
                                        "'0 6px 12px -6px rgba(0,0,0,0.2)'",
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
                            name: "colorAlpha",
                            attr: "translations.colorAlpha",
                            type: "text",
                            defaultVal: "Color alpha",
                        },
                        {
                            name: "dashedLines",
                            attr: "translations.dashedLines",
                            type: "text",
                            defaultVal: "Dashed lines",
                        },
                        {
                            name: "filled",
                            attr: "translations.filled",
                            type: "text",
                            defaultVal: "Filled",
                        },
                        {
                            name: "fontSize",
                            attr: "translations.fontSize",
                            type: "text",
                            defaultVal: "Font size",
                        },
                        {
                            name: "thickness",
                            attr: "translations.thickness",
                            type: "text",
                            defaultVal: "Thickness",
                        },
                        {
                            name: "title",
                            attr: "translations.title",
                            type: "text",
                            defaultVal: "Annotations",
                        },
                        {
                            name: "tooltipGroup",
                            attr: "translations.tooltipGroup",
                            type: "text",
                            defaultVal: "Select & group",
                        },
                        {
                            name: "tooltipDelete",
                            attr: "translations.tooltipDelete",
                            type: "text",
                            defaultVal: "Delete",
                        },
                        {
                            name: "tooltipMove",
                            attr: "translations.tooltipMove",
                            type: "text",
                            defaultVal: "Move",
                        },
                        {
                            name: "tooltipResize",
                            attr: "translations.tooltipResize",
                            type: "text",
                            defaultVal: "Resize",
                        },
                        {
                            name: "tooltipBringToFront",
                            attr: "translations.tooltipBringToFront",
                            type: "text",
                            defaultVal: "Bring to front",
                        },
                        {
                            name: "tooltipBringToBack",
                            attr: "translations.tooltipBringToBack",
                            type: "text",
                            defaultVal: "Bring to back",
                        },
                        {
                            name: "tooltipDuplicate",
                            attr: "translations.tooltipDuplicate",
                            type: "text",
                            defaultVal: "Duplicate",
                        },
                        {
                            name: "tooltipUndo",
                            attr: "translations.tooltipUndo",
                            type: "text",
                            defaultVal: "Undo last shape",
                        },
                        {
                            name: "tooltipRedo",
                            attr: "translations.tooltipRedo",
                            type: "text",
                            defaultVal: "Redo last shape",
                        },
                        {
                            name: "tooltipPdf",
                            attr: "translations.tooltipPdf",
                            type: "text",
                            defaultVal: "Save pdf",
                        },
                        {
                            name: "tooltipSave",
                            attr: "translations.tooltipSave",
                            type: "text",
                            defaultVal: "Save annotations",
                        },
                        {
                            name: "tooltipShapeCircle",
                            attr: "translations.tooltipShapeCircle",
                            type: "text",
                            defaultVal: "Draw circle",
                        },
                        {
                            name: "tooltipShapeRect",
                            attr: "translations.tooltipShapeRect",
                            type: "text",
                            defaultVal: "Draw rect",
                        },
                        {
                            name: "tooltipShapeArrow",
                            attr: "translations.tooltipShapeArrow",
                            type: "text",
                            defaultVal: "Draw arrow",
                        },
                        {
                            name: "tooltipShapeFreehand",
                            attr: "translations.tooltipShapeFreehand",
                            type: "text",
                            defaultVal: "Freehand line",
                        },
                        {
                            name: "tooltipShapeText",
                            attr: "translations.tooltipShapeText",
                            type: "text",
                            defaultVal: "Text mode",
                        },
                        {
                            name: "tooltipShapeTextLeft",
                            attr: "translations.tooltipShapeTextLeft",
                            type: "text",
                            defaultVal: "Align left",
                        },
                        {
                            name: "tooltipShapeTextCenter",
                            attr: "translations.tooltipShapeTextCenter",
                            type: "text",
                            defaultVal: "Align center",
                        },
                        {
                            name: "tooltipShapeTextRight",
                            attr: "translations.tooltipShapeTextRight",
                            type: "text",
                            defaultVal: "Align right",
                        },
                        {
                            name: "tooltipShapeTextBullet",
                            attr: "translations.tooltipShapeTextBullet",
                            type: "text",
                            defaultVal: "Bullet points",
                        },
                        {
                            name: "tooltipShapeTextBold",
                            attr: "translations.tooltipShapeTextBold",
                            type: "text",
                            defaultVal: "Bold",
                        },
                        {
                            name: "tooltipShapeTextItalic",
                            attr: "translations.tooltipShapeTextItalic",
                            type: "text",
                            defaultVal: "Italic",
                        },
                        {
                            name: "tooltipShapeTextUnderline",
                            attr: "translations.tooltipShapeTextUnderline",
                            type: "text",
                            defaultVal: "Underlined",
                        },
                        {
                            name: "tooltipShapeColor",
                            attr: "translations.tooltipShapeColor",
                            type: "text",
                            defaultVal: "Color",
                        },
                        {
                            name: "tooltipImage",
                            attr: "translations.tooltipImage",
                            type: "text",
                            defaultVal: "Download PNG",
                        },
                    ],
                },
            ],
        },
    ];
}
