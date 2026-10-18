// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiRatingConfigFields({
    defaultValueTranslation,
    forceChartUpdate,
    mode,
    config,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiRatingConfig",
            equal: true,
            children: [
                { inactive: true, name: "debug", defaultVal: "false," },
                {
                    name: "type",
                    attr: "type",
                    type: "select",
                    defaultVal: "star",
                    options: ["star", "image"],
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
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
                    component: "span",
                    children: [
                        { text: "readonly: " },
                        { text: mode === "readonly" ? "true" : "false" },
                        { text: ", " },
                        {
                            component: "span",
                            dir: "auto",
                            class: "pl-2 text-gray-600 dark:text-gray-400",
                            children: [
                                {
                                    component: "span",
                                    class: "text-xs",
                                    children: [
                                        {
                                            text: defaultValueTranslation[
                                                store.lang
                                            ],
                                        },
                                    ],
                                },
                                {
                                    component: "span",
                                    dir: "ltr",
                                    class: "text-black dark:text-white pl-1",
                                    children: [{ text: "false" }],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "from",
                    attr: "from",
                    type: "number",
                    defaultVal: "1",
                    min: 0,
                    max: 10,
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "to",
                    attr: "to",
                    type: "number",
                    defaultVal: "5",
                    min: 0,
                    max: 20,
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
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
                            name: "itemSize",
                            attr: "style.itemSize",
                            type: "number",
                            defaultVal: "32",
                            min: 24,
                            max: 64,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "backgroundColor",
                            attr: "style.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            attr: "star",
                            level: 2,
                            title: "style.star",
                            children: [
                                {
                                    name: "activeColor",
                                    attr: "style.star.activeColor",
                                    type: "color",
                                    defaultVal: "#FFD055",
                                },
                                {
                                    name: "borderColor",
                                    attr: "style.star.borderColor",
                                    type: "color",
                                    defaultVal: "#FFD055",
                                },
                                {
                                    name: "borderWidth",
                                    attr: "style.star.borderWidth",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 12,
                                },
                                {
                                    name: "apexes",
                                    attr: "style.star.apexes",
                                    type: "number",
                                    defaultVal: "5",
                                    min: 4,
                                    max: 10,
                                },
                                {
                                    name: "inactiveColor",
                                    attr: "style.star.inactiveColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "useGradient",
                                    attr: "style.star.useGradient",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                            ],
                        },
                        {
                            attr: "image",
                            level: 2,
                            title: "style.image",
                            children: [
                                {
                                    component: "span",
                                    children: [
                                        { text: 'src: "' },
                                        { text: config.style.image.src },
                                        { text: '"' },
                                        {
                                            component: "span",
                                            dir: "auto",
                                            class: "pl-2 text-gray-600 dark:text-gray-400",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "text-xs",
                                                    children: [
                                                        {
                                                            text: defaultValueTranslation[
                                                                store.lang
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    component: "span",
                                                    dir: "ltr",
                                                    class: "text-black dark:text-white pl-1",
                                                    children: [{ text: "''" }],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: "inactiveOpacity",
                                    attr: "style.image.inactiveOpacity",
                                    type: "number",
                                    defaultVal: "0.3",
                                    min: 0.1,
                                    max: 0.9,
                                    step: 0.1,
                                },
                                {
                                    name: "alt",
                                    attr: "style.image.alt",
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
                                    name: "textAlign",
                                    attr: "style.title.textAlign",
                                    type: "select",
                                    defaultVal: "center",
                                    options: ["left", "center", "right"],
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
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "bold",
                                    attr: "style.title.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "text",
                                    attr: "style.title.text",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "offsetY",
                                    attr: "style.title.offsetY",
                                    type: "number",
                                    defaultVal: "6",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    attr: "subtitle",
                                    level: 3,
                                    title: "style.title.subtitle",
                                    children: [
                                        {
                                            name: "fontSize",
                                            attr: "style.title.subtitle.fontSize",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.title.subtitle.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "text",
                                            attr: "style.title.subtitle.text",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "offsetY",
                                            attr: "style.title.subtitle.offsetY",
                                            type: "number",
                                            defaultVal: "6",
                                            min: -100,
                                            max: 100,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "rating",
                            level: 2,
                            title: "style.rating",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.rating.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.rating.fontSize",
                                    type: "number",
                                    defaultVal: "28",
                                    min: 8,
                                    max: 100,
                                },
                                {
                                    name: "bold",
                                    attr: "style.rating.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "roundingValue",
                                    attr: "style.rating.roundingValue",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0,
                                    max: 6,
                                },
                                {
                                    name: "position",
                                    attr: "style.rating.position",
                                    type: "select",
                                    defaultVal: "bottom",
                                    options: ["top", "right", "bottom", "left"],
                                },
                                {
                                    name: "offsetY",
                                    attr: "style.rating.offsetY",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "offsetX",
                                    attr: "style.rating.offsetX",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    component: "span",
                                    children: [
                                        { text: "formatter: null, " },
                                        {
                                            component: "BaseComment",
                                            children: [
                                                {
                                                    text: translations
                                                        .formatterLink[
                                                        store.lang
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "tooltip",
                            level: 2,
                            title: "style.tooltip",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.tooltip.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.tooltip.fontSize",
                                    type: "number",
                                    defaultVal: "14",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "offsetY",
                                    attr: "style.tooltip.offsetY",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "color",
                                    attr: "style.tooltip.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "bold",
                                    attr: "style.tooltip.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "backgroundColor",
                                    attr: "style.tooltip.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "borderColor",
                                    attr: "style.tooltip.borderColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "borderRadius",
                                    attr: "style.tooltip.borderRadius",
                                    type: "number",
                                    defaultVal: "4",
                                    min: 0,
                                    max: 12,
                                },
                                {
                                    name: "boxShadow",
                                    attr: "style.tooltip.boxShadow",
                                    type: "text",
                                    defaultVal:
                                        "0 6px 12px -6px rgba(0,0,0,0.2)",
                                },
                                {
                                    name: "roundingValue",
                                    attr: "style.tooltip.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                                {
                                    component: "span",
                                    children: [
                                        { text: "formatter: null, " },
                                        {
                                            component: "BaseComment",
                                            children: [
                                                {
                                                    text: translations
                                                        .formatterLink[
                                                        store.lang
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
