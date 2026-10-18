// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiSparkStackbarConfigFields({
    forceChartUpdate,
    goToPage,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiSparkStackBarConfig",
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
                                    name: "tableAvailable",
                                    attr: "a11y.translations.tableAvailable",
                                    type: "text",
                                    defaultVal:
                                        "'A data table for this chart is available below.'",
                                },
                                {
                                    name: "tableCaption",
                                    attr: "a11y.translations.tableCaption",
                                    type: "text",
                                    defaultVal: "'Chart data table'",
                                },
                                {
                                    name: "series",
                                    attr: "a11y.translations.series",
                                    type: "text",
                                    defaultVal: "'Series'",
                                },
                                {
                                    name: "percentage",
                                    attr: "a11y.translations.percentage",
                                    type: "text",
                                    defaultVal: "'Percentage'",
                                },
                                {
                                    name: "value",
                                    attr: "a11y.translations.value",
                                    type: "text",
                                    defaultVal: "'Value'",
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
                            inactive: true,
                            name: "fontFamily",
                            defaultVal: "'inherit'",
                        },
                        {
                            name: "backgroundColor",
                            attr: "style.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
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
                            attr: "legend",
                            level: 2,
                            title: "style.legend",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.legend.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "textAlign",
                                    attr: "style.legend.textAlign",
                                    type: "select",
                                    defaultVal: "left",
                                    options: ["left", "center", "right"],
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.legend.fontSize",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "margin",
                                    attr: "style.legend.margin",
                                    type: "text",
                                    defaultVal: "6px 0 0 0",
                                },
                                {
                                    attr: "name",
                                    level: 3,
                                    title: "style.legend.name",
                                    children: [
                                        {
                                            name: "color",
                                            attr: "style.legend.name.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.legend.name.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                    ],
                                },
                                {
                                    attr: "percentage",
                                    level: 3,
                                    title: "style.legend.percentage",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.legend.percentage.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.legend.percentage.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.legend.percentage.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "rounding",
                                            attr: "style.legend.percentage.rounding",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                    ],
                                },
                                {
                                    attr: "value",
                                    level: 3,
                                    title: "style.legend.value",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.legend.value.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.legend.value.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.legend.value.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "rounding",
                                            attr: "style.legend.value.rounding",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "prefix",
                                            attr: "style.legend.value.prefix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "suffix",
                                            attr: "style.legend.value.suffix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            component: "div",
                                            class: "flex flex-row gap-2 place-items-center",
                                            children: [
                                                {
                                                    inactive: true,
                                                    name: "formatter",
                                                    defaultVal: "null",
                                                    comment:
                                                        translations
                                                            .formatterLink[
                                                            store.lang
                                                        ],
                                                },
                                                {
                                                    component: "div",
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
                                                            children: [
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
                                {
                                    attr: "selectAllToggle",
                                    level: 3,
                                    title: "style.legend.selectAllToggle",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.legend.selectAllToggle.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.legend.selectAllToggle.backgroundColor",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.legend.selectAllToggle.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
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
                                    defaultVal: "left",
                                    options: ["left", "center", "right"],
                                },
                                {
                                    name: "text",
                                    attr: "style.title.text",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
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
                                    name: "margin",
                                    attr: "style.title.margin",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    attr: "subtitle",
                                    level: 3,
                                    title: "style.title.subtitle",
                                    children: [
                                        {
                                            name: "text",
                                            attr: "style.title.subtitle.text",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
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
                                            defaultVal: "false",
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
                                    inactive: true,
                                    name: "teleportTo",
                                    defaultVal: "'body'",
                                    comment:
                                        "Sets the 'to' attr of the Teleport Vue component",
                                },
                                {
                                    name: "show",
                                    attr: "style.tooltip.show",
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
                                    name: "color",
                                    attr: "style.tooltip.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
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
                                    inactive: true,
                                    name: "customFormat",
                                    defaultVal: "null",
                                    comment:
                                        "default behavior. To customize content, see 'custom tooltip' tab",
                                },
                                {
                                    name: "borderRadius",
                                    attr: "style.tooltip.borderRadius",
                                    type: "number",
                                    defaultVal: "4",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "borderColor",
                                    attr: "style.tooltip.borderColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "borderWidth",
                                    attr: "style.tooltip.borderWidth",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "position",
                                    attr: "style.tooltip.position",
                                    type: "select",
                                    defaultVal: "center",
                                    options: ["left", "center", "right"],
                                },
                                {
                                    name: "offsetX",
                                    attr: "style.tooltip.offsetX",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "offsetY",
                                    attr: "style.tooltip.offsetY",
                                    type: "number",
                                    defaultVal: "24",
                                    min: -50,
                                    max: 50,
                                },
                                {
                                    name: "smooth",
                                    attr: "style.tooltip.smooth",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "smoothForce",
                                    attr: "style.tooltip.smoothForce",
                                    type: "number",
                                    defaultVal: "0.18",
                                    min: 0.1,
                                    max: 1,
                                    step: 0.01,
                                },
                                {
                                    name: "smoothSnapThreshold",
                                    attr: "style.tooltip.smoothSnapThreshold",
                                    type: "number",
                                    defaultVal: "0.25",
                                    min: 0.1,
                                    max: 24,
                                    step: 0.01,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
