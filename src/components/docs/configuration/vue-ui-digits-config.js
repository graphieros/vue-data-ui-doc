// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiDigitsConfigFields(_context) {
    return [
        {
            attr: "const config: VueUiDigitsConfig",
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
                    name: "height",
                    attr: "height",
                    type: "text",
                    defaultVal: "'100%'",
                },
                {
                    name: "width",
                    attr: "width",
                    type: "text",
                    defaultVal: "null",
                },
                {
                    name: "backgroundColor",
                    attr: "backgroundColor",
                    type: "color",
                    defaultVal: "#FFFFFF",
                },
                {
                    attr: "digits",
                    children: [
                        {
                            name: "color",
                            attr: "digits.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "skeletonColor",
                            attr: "digits.skeletonColor",
                            type: "color",
                            defaultVal: "#E1E5E8",
                        },
                        {
                            name: "thickness",
                            attr: "digits.thickness",
                            type: "range",
                            defaultVal: "1",
                            min: 0.1,
                            max: 3,
                            step: 0.1,
                        },
                    ],
                },
            ],
        },
    ];
}
