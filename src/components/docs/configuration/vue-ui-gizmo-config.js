// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiGizmoConfigFields({
    goToPage,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiGizmoConfig",
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
                    attr: "a11y",
                    level: 1,
                    children: [
                        {
                            attr: "translations",
                            level: 2,
                            title: "a11y.translations",
                            children: [
                                {
                                    name: "label",
                                    attr: "a11y.translations.label",
                                    type: "text",
                                    defaultVal: "'Progress'",
                                },
                            ],
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
                    name: "type",
                    attr: "type",
                    type: "select",
                    defaultVal: "battery",
                    options: ["battery", "gauge"],
                },
                {
                    name: "size",
                    attr: "size",
                    type: "number",
                    defaultVal: "64",
                    min: 12,
                    max: 128,
                },
                {
                    name: "stroke",
                    attr: "stroke",
                    type: "color",
                    defaultVal: "#CCCCCC",
                },
                {
                    name: "color",
                    attr: "color",
                    type: "color",
                    defaultVal: "#5F8BEE",
                },
                {
                    name: "useGradient",
                    attr: "useGradient",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "gradientColor",
                    attr: "gradientColor",
                    type: "color",
                    defaultVal: "#9DB5ED",
                },
                {
                    name: "showPercentage",
                    attr: "showPercentage",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "textColor",
                    attr: "textColor",
                    type: "color",
                    defaultVal: "#2D353C",
                },
                {
                    component: "div",
                    class: "flex flex-row gap-2 place-items-center",
                    children: [
                        {
                            inactive: true,
                            name: "formatter",
                            defaultVal: "null",
                            comment: translations.formatterLink[store.lang],
                        },
                        {
                            component: "div",
                            class: "min-w-[200px]",
                            children: [
                                {
                                    component: "BaseTabLink",
                                    action: () =>
                                        goToPage("/customization#formatter"),
                                    icon: "cursor",
                                    children: [{ text: " Go to page " }],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
