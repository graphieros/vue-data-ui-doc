// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiAccordionConfigFields({ forceChartUpdate }) {
    return [
        {
            attr: "const config:VueUiAccordionConfig",
            equal: true,
            children: [
                {
                    name: "open",
                    attr: "open",
                    type: "checkbox",
                    defaultVal: "false",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "maxHeight",
                    attr: "maxHeight",
                    type: "number",
                    defaultVal: "2000",
                    min: 2000,
                    max: 20000,
                    step: 100,
                },
                {
                    attr: "head",
                    level: 1,
                    children: [
                        {
                            name: "useArrowSlot",
                            attr: "head.useArrowSlot",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "backgroundColor",
                            attr: "head.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "head.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "iconColor",
                            attr: "head.iconColor",
                            type: "color",
                            defaultVal: "#5F8BEE",
                        },
                        {
                            name: "padding",
                            attr: "head.padding",
                            type: "text",
                            defaultVal: "12px 6px",
                        },
                        {
                            name: "icon",
                            attr: "head.icon",
                            defaultVal: "'arrowRight'",
                            type: "text",
                        },
                        {
                            name: "iconSize",
                            attr: "head.iconSize",
                            defaultVal: "20",
                            type: "number",
                            min: 8,
                            max: 42,
                        },
                    ],
                },
                {
                    attr: "body",
                    level: 1,
                    children: [
                        {
                            name: "backgroundColor",
                            attr: "body.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "body.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                    ],
                },
            ],
        },
    ];
}
