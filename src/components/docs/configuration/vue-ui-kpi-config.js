// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiKpiConfigFields({ forceChartUpdate }) {
    return [
        {
            attr: "const config: VueUiKpiConfig",
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
                    name: "animationFrames",
                    attr: "animationFrames",
                    type: "number",
                    defaultVal: "60",
                    min: 0,
                    max: 1000,
                    step: 20,
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "backgroundColor",
                    attr: "backgroundColor",
                    type: "color",
                    defaultVal: "#FFFFFF",
                },
                { inactive: true, name: "fontFamily", defaultVal: "'inherit'" },
                {
                    name: "layoutClass",
                    attr: "layoutClass",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "layoutCss",
                    attr: "layoutCss",
                    type: "text",
                    defaultVal: "''",
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
                    name: "title",
                    attr: "title",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "titleBold",
                    attr: "titleBold",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "titleColor",
                    attr: "titleColor",
                    type: "color",
                    defaultVal: "#2D353C",
                },
                {
                    name: "titleClass",
                    attr: "titleClass",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "titleCss",
                    attr: "titleCss",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "titleFontSize",
                    attr: "titleFontSize",
                    type: "number",
                    defaultVal: "16",
                    min: 8,
                    max: 42,
                },
                {
                    name: "useAnimation",
                    attr: "useAnimation",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "valueBold",
                    attr: "valueBold",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "valueClass",
                    attr: "valueClass",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "valueCss",
                    attr: "valueCss",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "valueFontSize",
                    attr: "valueFontSize",
                    type: "number",
                    defaultVal: "32",
                    min: 8,
                    max: 64,
                },
                {
                    name: "valueRounding",
                    attr: "valueRounding",
                    type: "number",
                    defaultVal: "0",
                    min: 0,
                    max: 6,
                },
                {
                    attr: "analogDigits",
                    level: 1,
                    children: [
                        {
                            name: "show",
                            attr: "analogDigits.show",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "height",
                            attr: "analogDigits.height",
                            type: "number",
                            defaultVal: "40",
                            min: 20,
                            max: 100,
                        },
                        {
                            name: "color",
                            attr: "analogDigits.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "skeletonColor",
                            attr: "analogDigits.skeletonColor",
                            type: "color",
                            defaultVal: "#E1E5E8",
                        },
                    ],
                },
            ],
        },
    ];
}
