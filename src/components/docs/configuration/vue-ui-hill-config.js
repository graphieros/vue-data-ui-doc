// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiHillConfigFields({ goToPage, store, translations }) {
    return [
        {
            attr: "const config: VueUiHillConfig",
            equal: true,
            children: [
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
                {
                    name: "loading",
                    attr: "loading",
                    defaultVal: "false",
                    type: "checkbox",
                },
                {
                    name: "readonly",
                    attr: "readonly",
                    defaultVal: "false",
                    type: "checkbox",
                },
                {
                    name: "editing",
                    attr: "editing",
                    defaultVal: "false",
                    type: "checkbox",
                },
                {
                    inactive: true,
                    name: "theme",
                    defaultVal: "''",
                    comment:
                        "'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete' | 'minimal' | 'minimalDark'",
                },
                {
                    inactive: true,
                    name: "customPalette",
                    defaultVal: "[]",
                    comment: "string[]",
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
                                        "'Use the left and right arrow keys to move between data points.'",
                                },
                                {
                                    name: "topOfHill",
                                    attr: "a11y.translations.topOfHill",
                                    type: "text",
                                    defaultVal:
                                        "'A data table for this chart is available below.'",
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
                            name: "edit",
                            defaultVal: "null",
                            comment: "(data) => { console.log(data) }",
                        },
                        {
                            inactive: true,
                            name: "save",
                            defaultVal: "null",
                            comment: "(data) => { console.log(data) }",
                        },
                        {
                            inactive: true,
                            name: "cancel",
                            defaultVal: "null",
                            comment: "(data) => { console.log(data) }",
                        },
                        {
                            inactive: true,
                            name: "datapointEnter",
                            defaultVal: "null",
                            comment:
                                "({datapoint, index}) => { console.log(datapoint) }",
                        },
                        {
                            inactive: true,
                            name: "change",
                            defaultVal: "null",
                            comment:
                                "({datapoint, dataset}) => { console.log(datapoint, dataset) }",
                        },
                        {
                            inactive: true,
                            name: "datapointLeave",
                            defaultVal: "null",
                            comment:
                                "({datapoint, index}) => { console.log(datapoint) }",
                        },
                        {
                            inactive: true,
                            name: "selectDatapoint",
                            defaultVal: "null",
                            comment:
                                "({datapoint, index}) => { console.log(datapoint) }",
                        },
                        {
                            inactive: true,
                            name: "dragStart",
                            defaultVal: "null",
                            comment:
                                "(datapoint) => { console.log(datapoint) }",
                        },
                        {
                            inactive: true,
                            name: "dragEnd",
                            defaultVal: "null",
                            comment:
                                "(datapoint) => { console.log(datapoint) }",
                        },
                    ],
                },
                {
                    attr: "interaction",
                    level: 1,
                    children: [
                        {
                            name: "keyboardStep",
                            attr: "interaction.keyboardStep",
                            type: "number",
                            defaultVal: "0.01",
                            min: 0,
                            max: 0.1,
                            step: 0.01,
                        },
                        {
                            name: "peakTolerance",
                            attr: "interaction.peakTolerance",
                            type: "number",
                            defaultVal: "0.005",
                            min: 0.001,
                            max: 0.1,
                            step: 0.001,
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
                                    name: "width",
                                    attr: "style.chart.width",
                                    defaultVal: "800",
                                    type: "number",
                                    min: 200,
                                    max: 2000,
                                    step: 50,
                                },
                                {
                                    name: "height",
                                    attr: "style.chart.height",
                                    defaultVal: "300",
                                    type: "number",
                                    min: 100,
                                    max: 2000,
                                    step: 50,
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
                                    attr: "toolbar",
                                    level: 3,
                                    title: "style.chart.toolbar",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.toolbar.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            attr: "status",
                                            level: 4,
                                            title: "style.chart.toolbar.status",
                                            children: [
                                                {
                                                    name: "lastUpdated",
                                                    attr: "style.chart.toolbar.status.lastUpdated",
                                                    type: "text",
                                                    defaultVal:
                                                        "Last updated just now",
                                                },
                                                {
                                                    name: "editInstruction",
                                                    attr: "style.chart.toolbar.status.editInstruction",
                                                    type: "text",
                                                    defaultVal:
                                                        "Drag each dot to adjust its position",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.toolbar.status.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.toolbar.status.fontSize",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.toolbar.status.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "lineHeight",
                                                    attr: "style.chart.toolbar.status.lineHeight",
                                                    type: "number",
                                                    defaultVal: "1.3",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "buttons",
                                            level: 4,
                                            title: "style.chart.toolbar.buttons",
                                            children: [
                                                {
                                                    attr: "translations",
                                                    level: 5,
                                                    title: "style.chart.toolbar.buttons.translations",
                                                    children: [
                                                        {
                                                            name: "edit",
                                                            attr: "style.chart.toolbar.buttons.translations.edit",
                                                            type: "text",
                                                            defaultVal: "Edit",
                                                        },
                                                        {
                                                            name: "cancel",
                                                            attr: "style.chart.toolbar.buttons.translations.cancel",
                                                            type: "text",
                                                            defaultVal:
                                                                "Cancel",
                                                        },
                                                        {
                                                            name: "save",
                                                            attr: "style.chart.toolbar.buttons.translations.save",
                                                            type: "text",
                                                            defaultVal: "Save",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            attr: "hill",
                                            level: 4,
                                            title: "style.chart.layout.hill",
                                            children: [
                                                {
                                                    attr: "geometry",
                                                    level: 5,
                                                    title: "style.chart.layout.hill.geometry",
                                                    children: [
                                                        {
                                                            name: "horizontalPaddingRatio",
                                                            attr: "style.chart.layout.hill.geometry.horizontalPaddingRatio",
                                                            defaultVal: "0.05",
                                                            type: "number",
                                                            min: 0,
                                                            max: 0.2,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "topPaddingRatio",
                                                            attr: "style.chart.layout.hill.geometry.topPaddingRatio",
                                                            type: "number",
                                                            defaultVal: "0.15",
                                                            min: 0,
                                                            max: 0.5,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "bottomPaddingRatio",
                                                            attr: "style.chart.layout.hill.geometry.bottomPaddingRatio",
                                                            type: "number",
                                                            defaultVal: "0.15",
                                                            min: 0,
                                                            max: 0.5,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "curvature",
                                                            attr: "style.chart.layout.hill.geometry.curvature",
                                                            type: "number",
                                                            defaultVal: "0.7",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.01,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "baseline",
                                                    level: 5,
                                                    title: "style.chart.layout.hill.baseline",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.hill.baseline.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.hill.baseline.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#CCCCCC",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.hill.baseline.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "strokeDasharray",
                                                            attr: "style.chart.layout.hill.baseline.strokeDasharray",
                                                            type: "text",
                                                            defaultVal: "'0'",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "midline",
                                                    level: 5,
                                                    title: "style.chart.layout.hill.midline",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.hill.midline.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.hill.midline.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#CCCCCC",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.hill.midline.strokeWidth",
                                                            type: "number",
                                                            min: 0,
                                                            max: 6,
                                                            defaultVal: "1",
                                                        },
                                                        {
                                                            name: "strokeDasharray",
                                                            attr: "style.chart.layout.hill.midline.strokeDasharray",
                                                            type: "text",
                                                            defaultVal:
                                                                "'2.5 3.5'",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "curve",
                                                    level: 5,
                                                    title: "style.chart.layout.hill.curve",
                                                    children: [
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.hill.curve.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#A1A1A1",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.hill.curve.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1.5",
                                                            min: 0.5,
                                                            max: 12,
                                                            step: 0.5,
                                                        },
                                                        {
                                                            name: "strokeDasharray",
                                                            attr: "style.chart.layout.hill.curve.strokeDasharray",
                                                            type: "text",
                                                            defaultVal: "'0'",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "plots",
                                            level: 4,
                                            title: "style.chart.layout.plots",
                                            children: [
                                                {
                                                    name: "radius",
                                                    attr: "style.chart.layout.plots.radius",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 4,
                                                    max: 20,
                                                },
                                                {
                                                    name: "hitRadius",
                                                    attr: "style.chart.layout.plots.hitRadius",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 4,
                                                    max: 20,
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.plots.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.plots.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "mutedOpacity",
                                                    attr: "style.chart.layout.plots.mutedOpacity",
                                                    type: "number",
                                                    defaultVal: "0.4",
                                                    min: 0.1,
                                                    max: 1,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "disabledOpacity",
                                                    attr: "style.chart.layout.plots.disabledOpacity",
                                                    type: "number",
                                                    defaultVal: "0.4",
                                                    min: 0.1,
                                                    max: 1,
                                                    step: 0.1,
                                                },
                                                {
                                                    attr: "shadow",
                                                    level: 5,
                                                    title: "style.chart.layout.plots.shadow",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.plots.shadow.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.plots.shadow.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "offsetX",
                                                            attr: "style.chart.layout.plots.shadow.offsetX",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -12,
                                                            max: 12,
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.layout.plots.shadow.offsetY",
                                                            type: "number",
                                                            defaultVal: "0.5",
                                                            min: -12,
                                                            max: 12,
                                                        },
                                                        {
                                                            name: "blur",
                                                            attr: "style.chart.layout.plots.shadow.blur",
                                                            type: "number",
                                                            defaultVal: "0.4",
                                                            min: 0,
                                                            max: 12,
                                                            step: 0.1,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "stacking",
                                                    level: 5,
                                                    title: "style.chart.layout.plots.stacking",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.plots.stacking.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "overlapThresholdRatio",
                                                            attr: "style.chart.layout.plots.stacking.overlapThresholdRatio",
                                                            type: "number",
                                                            defaultVal: "0.8",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "gap",
                                                            attr: "style.chart.layout.plots.stacking.gap",
                                                            type: "number",
                                                            defaultVal: "5",
                                                            min: -10,
                                                            max: 24,
                                                        },
                                                        {
                                                            attr: "overflow",
                                                            level: 6,
                                                            title: "style.chart.layout.plots.stacking.overflow",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.plots.stacking.overflow.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "transitionDuration",
                                                                    attr: "style.chart.layout.plots.stacking.overflow.transitionDuration",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "300",
                                                                    min: 0,
                                                                    max: 1000,
                                                                    step: 50,
                                                                },
                                                                {
                                                                    attr: "marker",
                                                                    level: 7,
                                                                    title: "style.chart.layout.plots.stacking.overflow.marker",
                                                                    children: [
                                                                        {
                                                                            name: "radius",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.radius",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "10",
                                                                            min: 4,
                                                                            max: 24,
                                                                        },
                                                                        {
                                                                            name: "stroke",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.stroke",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#FFFFFF",
                                                                        },
                                                                        {
                                                                            name: "strokeWidth",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.strokeWidth",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "1",
                                                                            min: 0,
                                                                            max: 6,
                                                                        },
                                                                        {
                                                                            name: "labelColor",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.labelColor",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#2D353C",
                                                                        },
                                                                        {
                                                                            name: "labelOffsetY",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.labelOffsetY",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "0",
                                                                            min: -64,
                                                                            max: 64,
                                                                        },
                                                                        {
                                                                            name: "fontSize",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.fontSize",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "14",
                                                                            min: 6,
                                                                            max: 42,
                                                                        },
                                                                        {
                                                                            name: "bold",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.bold",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "false",
                                                                        },
                                                                        {
                                                                            name: "fill",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.marker.fill",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#CCCCCC",
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    attr: "menu",
                                                                    level: 7,
                                                                    title: "style.chart.layout.plots.stacking.overflow.menu",
                                                                    children: [
                                                                        {
                                                                            name: "width",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.menu.width",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "220",
                                                                            min: 200,
                                                                            max: 400,
                                                                            step: 20,
                                                                        },
                                                                        {
                                                                            name: "maxHeight",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.menu.maxHeight",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "220",
                                                                            min: 200,
                                                                            max: 800,
                                                                            step: 20,
                                                                        },
                                                                        {
                                                                            name: "backgroundColor",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.menu.backgroundColor",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#FFFFFF",
                                                                        },
                                                                        {
                                                                            name: "color",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.menu.color",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#2D353C",
                                                                        },
                                                                        {
                                                                            name: "borderColor",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.menu.borderColor",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "'transparent'",
                                                                        },
                                                                        {
                                                                            name: "borderRadius",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.menu.borderRadius",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "3",
                                                                            min: 0,
                                                                            max: 12,
                                                                        },
                                                                        {
                                                                            name: "title",
                                                                            attr: "style.chart.layout.plots.stacking.overflow.menu.title",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "''",
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "dragMarker",
                                                    level: 5,
                                                    title: "style.chart.layout.plots.dragMarker",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.plots.dragMarker.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.plots.dragMarker.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1.5",
                                                            min: 0,
                                                            max: 6,
                                                            step: 0.5,
                                                        },
                                                        {
                                                            name: "crossPath",
                                                            attr: "style.chart.layout.plots.dragMarker.crossPath",
                                                            type: "text",
                                                            defaultVal:
                                                                "M-5 0H5M0-5V5",
                                                        },
                                                        {
                                                            attr: "positionIndicator",
                                                            level: 6,
                                                            title: "style.chart.layout.plots.dragMarker.positionIndicator",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.plots.dragMarker.positionIndicator.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "useSerieColor",
                                                                    attr: "style.chart.layout.plots.dragMarker.positionIndicator.useSerieColor",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.plots.dragMarker.positionIndicator.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#E1E5E8",
                                                                },
                                                                {
                                                                    name: "strokeWidth",
                                                                    attr: "style.chart.layout.plots.dragMarker.positionIndicator.strokeWidth",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "1",
                                                                    min: 0,
                                                                    max: 6,
                                                                },
                                                                {
                                                                    name: "strokeDasharray",
                                                                    attr: "style.chart.layout.plots.dragMarker.positionIndicator.strokeDasharray",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "'2 4'",
                                                                },
                                                                {
                                                                    attr: "circle",
                                                                    level: 7,
                                                                    title: "style.chart.layout.plots.dragMarker.positionIndicator.circle",
                                                                    children: [
                                                                        {
                                                                            name: "show",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.circle.show",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "true",
                                                                        },
                                                                        {
                                                                            name: "radius",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.circle.radius",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "3",
                                                                            min: 0,
                                                                            max: 8,
                                                                        },
                                                                        {
                                                                            name: "stroke",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.circle.stroke",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#FFFFFF",
                                                                        },
                                                                        {
                                                                            name: "strokeWidth",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.circle.strokeWidth",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "1",
                                                                            min: 0,
                                                                            max: 6,
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    attr: "value",
                                                                    level: 7,
                                                                    title: "style.chart.layout.plots.dragMarker.positionIndicator.value",
                                                                    children: [
                                                                        {
                                                                            name: "show",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.value.show",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "true",
                                                                        },
                                                                        {
                                                                            name: "offsetY",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.value.offsetY",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "0",
                                                                            min: -24,
                                                                            max: 24,
                                                                        },
                                                                        {
                                                                            name: "fontSize",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.value.fontSize",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "12",
                                                                            min: 6,
                                                                            max: 42,
                                                                        },
                                                                        {
                                                                            name: "useSerieColor",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.value.useSerieColor",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "false",
                                                                        },
                                                                        {
                                                                            name: "color",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.value.color",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#2D353C",
                                                                        },
                                                                        {
                                                                            name: "rounding",
                                                                            attr: "style.chart.layout.plots.dragMarker.positionIndicator.value.rounding",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "0",
                                                                            min: 0,
                                                                            max: 6,
                                                                        },
                                                                        {
                                                                            component:
                                                                                "div",
                                                                            class: "flex flex-row gap-2 place-items-center",
                                                                            children:
                                                                                [
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
                                                                                        children:
                                                                                            [
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
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.layout.labels",
                                            children: [
                                                {
                                                    attr: "item",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.item",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.item.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "ellipsisThresholdChars",
                                                            attr: "style.chart.layout.labels.item.ellipsisThresholdChars",
                                                            type: "number",
                                                            defaultVal: "24",
                                                            min: 0,
                                                            max: 100,
                                                        },
                                                        {
                                                            name: "useSerieColor",
                                                            attr: "style.chart.layout.labels.item.useSerieColor",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.labels.item.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.labels.item.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 6,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.labels.item.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "offsetX",
                                                            attr: "style.chart.layout.labels.item.offsetX",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -64,
                                                            max: 64,
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.layout.labels.item.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -64,
                                                            max: 64,
                                                        },
                                                        {
                                                            name: "autoSideThreshold",
                                                            attr: "style.chart.layout.labels.item.autoSideThreshold",
                                                            type: "number",
                                                            defaultVal: "0.75",
                                                            min: 0.5,
                                                            max: 1,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.labels.item.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.labels.item.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "5",
                                                            min: 0,
                                                            max: 12,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "phases",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.phases",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.phases.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.labels.phases.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#A1A1A1",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.labels.phases.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.labels.phases.bold",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "letterSpacing",
                                                            attr: "style.chart.layout.labels.phases.letterSpacing",
                                                            type: "text",
                                                            defaultVal:
                                                                "'0.1em'",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.layout.labels.phases.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -64,
                                                            max: 64,
                                                        },
                                                        {
                                                            attr: "left",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.phases.left",
                                                            children: [
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.phases.left.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "FIGURING THINGS OUT",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "right",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.phases.right",
                                                            children: [
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.phases.right.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "MAKING IT HAPPEN",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "stackbar",
                                            level: 4,
                                            title: "style.chart.layout.stackbar",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.stackbar.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "paddingTop",
                                                    attr: "style.chart.layout.stackbar.paddingTop",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -64,
                                                    max: 64,
                                                },
                                                {
                                                    name: "paddingBottom",
                                                    attr: "style.chart.layout.stackbar.paddingBottom",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: -64,
                                                    max: 64,
                                                },
                                                {
                                                    name: "height",
                                                    attr: "style.chart.layout.stackbar.height",
                                                    type: "number",
                                                    defaultVal: "14",
                                                    min: 6,
                                                    max: 24,
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.stackbar.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.stackbar.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1.5",
                                                    min: 0,
                                                    max: 6,
                                                    step: 0.5,
                                                },
                                                {
                                                    name: "gutterColor",
                                                    attr: "style.chart.layout.stackbar.gutterColor",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    attr: "label",
                                                    level: 5,
                                                    title: "style.chart.layout.stackbar.label",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.stackbar.label.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.stackbar.label.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.stackbar.label.fontSize",
                                                            type: "number",
                                                            defaultVal: "12",
                                                            min: 6,
                                                            max: 42,
                                                        },
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
            ],
        },
    ];
}
