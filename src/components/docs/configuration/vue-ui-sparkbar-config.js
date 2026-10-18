// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiSparkbarConfigFields({ forceChartUpdate }) {
    return [
        {
            attr: "const config: VueUiSparkbarConfig",
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
                            name: "backgroundColor",
                            attr: "style.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "gap",
                            attr: "style.gap",
                            type: "number",
                            defaultVal: "4",
                            min: 0,
                            max: 64,
                        },
                        {
                            attr: "animation",
                            level: 2,
                            title: "style.animation",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.animation.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "animationFrames",
                                    attr: "style.animation.animationFrames",
                                    type: "number",
                                    defaultVal: "60",
                                    min: 0,
                                    max: 200,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "bar",
                            level: 2,
                            title: "style.bar",
                            children: [
                                {
                                    name: "borderRadius",
                                    attr: "style.bar.borderRadius",
                                    type: "number",
                                    defaultVal: "null",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    attr: "gradient",
                                    level: 3,
                                    title: "style.bar.gradient",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.bar.gradient.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "intensity",
                                            attr: "style.bar.gradient.intensity",
                                            type: "number",
                                            defaultVal: "40",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "underlayerColor",
                                            attr: "style.bar.gradient.underlayerColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "gutter",
                            level: 2,
                            title: "style.gutter",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.gutter.backgroundColor",
                                    type: "color",
                                    defaultVal: "#e1e5e8",
                                },
                                {
                                    name: "opacity",
                                    attr: "style.gutter.opacity",
                                    type: "number",
                                    defaultVal: "100",
                                    min: 0,
                                    max: 100,
                                },
                            ],
                        },
                        {
                            attr: "labels",
                            level: 2,
                            title: "style.labels",
                            children: [
                                {
                                    name: "fontSize",
                                    attr: "style.labels.fontSize",
                                    type: "number",
                                    defaultVal: "16",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    attr: "name",
                                    level: 3,
                                    title: "style.labels.name",
                                    children: [
                                        {
                                            name: "position",
                                            attr: "style.labels.name.position",
                                            type: "select",
                                            defaultVal: "top-left",
                                            options: [
                                                "left",
                                                "top-left",
                                                "top-center",
                                                "top-right",
                                                "right",
                                            ],
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "width",
                                            attr: "style.labels.name.width",
                                            type: "text",
                                            defaultVal: "100%",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.labels.name.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.labels.name.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                    ],
                                },
                                {
                                    attr: "value",
                                    level: 3,
                                    title: "style.labels.value",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.labels.value.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.labels.value.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "layout",
                            level: 2,
                            title: "style.layout",
                            children: [
                                {
                                    name: "independant",
                                    attr: "style.layout.independant",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "percentage",
                                    attr: "style.layout.percentage",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    inactive: true,
                                    name: "target",
                                    defaultVal: "0",
                                    comment:
                                        "Common to all bars. Use target in dataset for individual targets.",
                                },
                                {
                                    name: "showTargetValue",
                                    attr: "style.layout.showTargetValue",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "targetValueText",
                                    attr: "style.layout.targetValueText",
                                    type: "text",
                                    defaultVal: "''",
                                },
                            ],
                        },
                        {
                            attr: "title",
                            level: 2,
                            title: "style.title",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.title.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "text",
                                    attr: "style.title.text",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.title.fontSize",
                                    type: "number",
                                    defaultVal: "20",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "bold",
                                    attr: "style.title.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "textAlign",
                                    attr: "style.title.textAlign",
                                    type: "select",
                                    defaultVal: "left",
                                    options: ["left", "center", "right"],
                                },
                                {
                                    name: "margin",
                                    attr: "style.title.margin",
                                    type: "text",
                                    defaultVal: "0 auto",
                                },
                                {
                                    attr: "subtitle",
                                    level: 3,
                                    title: "style.title.subtitle",
                                    children: [
                                        {
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#CCCCCC",
                                        },
                                        {
                                            name: "text",
                                            attr: "style.title.subtitle.text",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.title.subtitle.fontSize",
                                            type: "number",
                                            defaultVal: "16",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.title.subtitle.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
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
