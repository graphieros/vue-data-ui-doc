// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiSmileyConfigFields({
    defaultValueTranslation,
    forceChartUpdate,
    mode,
    store,
    translations,
}) {
    return [
        {
            attr: "const config:VueUiSmileyConfig",
            equal: true,
            children: [
                { inactive: true, name: "debug", defaultVal: "false," },
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
                            attr: "colors",
                            level: 2,
                            title: "style.colors",
                            children: [
                                {
                                    component: "span",
                                    children: [
                                        { text: "activeReadonly: [" },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#E20001"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#E20001",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#ff9f03"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#ff9f03",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#ffd004"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#ffd004",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#61c900"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#61c900",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#059f00"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#059f00",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        { text: " ]," },
                                    ],
                                },
                                {
                                    component: "span",
                                    children: [
                                        { text: "active: [" },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#E20001"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#E20001",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#ff9f03"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#ff9f03",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#ffd004"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#ffd004",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#61c900"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#61c900",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#059f00"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#059f00",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        { text: " ]," },
                                    ],
                                },
                                {
                                    component: "span",
                                    children: [
                                        { text: "inactive: [" },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#e1e5e8"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#e1e5e8",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#e1e5e8"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#e1e5e8",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#e1e5e8"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#e1e5e8",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#e1e5e8"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#e1e5e8",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        {
                                            component: "span",
                                            children: [
                                                {
                                                    component: "span",
                                                    class: "ml-4 mr-2",
                                                    children: [
                                                        { text: '"#e1e5e8"' },
                                                    ],
                                                },
                                                {
                                                    component: "BaseColorInfo",
                                                    color: "#e1e5e8",
                                                },
                                            ],
                                        },
                                        { component: "br" },
                                        { text: " ]," },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "icons",
                            level: 2,
                            title: "style.icons",
                            children: [
                                {
                                    name: "filled",
                                    attr: "style.icons.filled",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "useGradient",
                                    attr: "style.icons.useGradient",
                                    type: "checkbox",
                                    defaultVal: "false",
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
