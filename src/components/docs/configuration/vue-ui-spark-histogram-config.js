// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiSparkHistogramConfigFields({
    forceChartUpdate,
    goToPage,
    shapes,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiSparkHistogramConfig",
            equal: true,
            children: [
                {
                    component: "span",
                    children: [
                        { text: "responsive: false; " },
                        {
                            component: "span",
                            class: "text-app-blue break-keep text-xs",
                            children: [
                                { text: "// " },
                                { text: translations.responsive[store.lang] },
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
                                    name: "time",
                                    attr: "a11y.translations.time",
                                    type: "text",
                                    defaultVal: "'Time'",
                                },
                                {
                                    name: "value",
                                    attr: "a11y.translations.value",
                                    type: "text",
                                    defaultVal: "'Value'",
                                },
                                {
                                    name: "label",
                                    attr: "a11y.translations.label",
                                    type: "text",
                                    defaultVal: "'Label'",
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
                                },
                                {
                                    name: "speedMs",
                                    attr: "style.animation.speedMs",
                                    type: "range",
                                    defaultVal: "500",
                                    min: 0,
                                    max: 1000,
                                    step: 10,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "bars",
                            level: 2,
                            title: "style.bars",
                            children: [
                                {
                                    name: "shape",
                                    attr: "style.bars.shape",
                                    type: "select",
                                    defaultVal: "square",
                                    options: shapes,
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.bars.strokeWidth",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 12,
                                    step: 0.1,
                                },
                                {
                                    name: "borderRadius",
                                    attr: "style.bars.borderRadius",
                                    type: "range",
                                    defaultVal: "24",
                                    min: 0,
                                    max: 24,
                                    step: 0.1,
                                },
                                {
                                    name: "gap",
                                    attr: "style.bars.gap",
                                    type: "range",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 100,
                                },
                                {
                                    attr: "colors",
                                    level: 3,
                                    title: "style.bars.colors",
                                    children: [
                                        {
                                            name: "positive",
                                            attr: "style.bars.colors.positive",
                                            type: "color",
                                            defaultVal: "#5F8BEE",
                                        },
                                        {
                                            name: "negative",
                                            attr: "style.bars.colors.negative",
                                            type: "color",
                                            defaultVal: "#DC3912",
                                        },
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.bars.colors.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.bars.colors.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "labels",
                            level: 2,
                            title: "style.labels",
                            children: [
                                {
                                    attr: "timeLabel",
                                    level: 3,
                                    title: "style.labels.timeLabel",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.labels.timeLabel.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.labels.timeLabel.fontSize",
                                            type: "number",
                                            defaultVal: "12",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "minFontSize",
                                            attr: "style.labels.timeLabel.minFontSize",
                                            type: "number",
                                            defaultVal: "6",
                                            min: 6,
                                            max: 42,
                                        },
                                        {
                                            name: "color",
                                            attr: "style.labels.timeLabel.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.labels.timeLabel.bold",
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
                                            name: "fontSize",
                                            attr: "style.labels.value.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "minFontSize",
                                            attr: "style.labels.value.minFontSize",
                                            type: "number",
                                            defaultVal: "6",
                                            min: 6,
                                            max: 42,
                                        },
                                        {
                                            name: "color",
                                            attr: "style.labels.value.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.labels.value.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "rounding",
                                            attr: "style.labels.value.rounding",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "prefix",
                                            attr: "style.labels.value.prefix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "suffix",
                                            attr: "style.labels.value.suffix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "offsetY",
                                            attr: "style.labels.value.offsetY",
                                            type: "number",
                                            defaultVal: "0",
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
                                    attr: "valueLabel",
                                    level: 3,
                                    title: "style.labels.valueLabel",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.labels.valueLabel.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.labels.valueLabel.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "minFontSize",
                                            attr: "style.labels.valueLabel.minFontSize",
                                            type: "number",
                                            defaultVal: "6",
                                            min: 6,
                                            max: 42,
                                        },
                                        {
                                            name: "color",
                                            attr: "style.labels.valueLabel.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.labels.valueLabel.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "rounding",
                                            attr: "style.labels.valueLabel.rounding",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
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
                                    name: "height",
                                    attr: "style.layout.height",
                                    type: "number",
                                    defaultVal: "96",
                                    min: 64,
                                    max: 600,
                                },
                                {
                                    attr: "padding",
                                    level: 3,
                                    title: "style.layout.padding",
                                    children: [
                                        {
                                            name: "top",
                                            attr: "style.layout.padding.top",
                                            type: "number",
                                            defaultVal: "24",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "right",
                                            attr: "style.layout.padding.right",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.layout.padding.bottom",
                                            type: "number",
                                            defaultVal: "36",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "left",
                                            attr: "style.layout.padding.left",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "selector",
                            level: 2,
                            title: "style.selector",
                            children: [
                                {
                                    name: "stroke",
                                    attr: "style.selector.stroke",
                                    type: "color",
                                    defaultVal: "#5F8BEE",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.selector.strokeWidth",
                                    type: "number",
                                    defaultVal: "2",
                                    min: 0,
                                    max: 12,
                                },
                                {
                                    name: "strokeDasharray",
                                    attr: "style.selector.strokeDasharray",
                                    type: "range",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "borderRadius",
                                    attr: "style.selector.borderRadius",
                                    type: "range",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "fill",
                                    attr: "style.selector.fill",
                                    rgba: true,
                                    type: "color",
                                    defaultVal: "#2D353C10",
                                    comment:
                                        "Recommended: use a transparent color",
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
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
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
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
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
                                            defaultVal: "false",
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
