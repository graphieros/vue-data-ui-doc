// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiDonutConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiDonutConfig",
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
                    name: "type",
                    attr: "type",
                    type: "select",
                    defaultVal: "classic",
                    options: ["classic", "polar"],
                },
                { inactive: true, name: "debug", defaultVal: "false" },
                {
                    name: "loading",
                    attr: "loading",
                    defaultVal: "false",
                    type: "checkbox",
                },
                {
                    name: "pie",
                    attr: "pie",
                    defaultVal: "false",
                    type: "checkbox",
                },
                {
                    name: "autoSize",
                    attr: "autoSize",
                    defaultVal: "false",
                    type: "checkbox",
                },
                {
                    inactive: true,
                    name: "responsive",
                    defaultVal: "false",
                    comment: translations.responsive[store.lang],
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
                    name: "useBlurOnHover",
                    attr: "useBlurOnHover",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "useCssAnimation",
                    attr: "useCssAnimation",
                    type: "checkbox",
                    defaultVal: "false",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
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
                    attr: "serieToggleAnimation",
                    level: 1,
                    children: [
                        {
                            name: "show",
                            attr: "serieToggleAnimation.show",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "durationMs",
                            attr: "serieToggleAnimation.durationMs",
                            type: "number",
                            defaultVal: "500",
                            min: 0,
                            max: 2000,
                            step: 100,
                        },
                    ],
                },
                {
                    attr: "startAnimation",
                    level: 1,
                    children: [
                        {
                            name: "show",
                            attr: "startAnimation.show",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "durationMs",
                            attr: "startAnimation.durationMs",
                            type: "number",
                            defaultVal: "1000",
                            min: 0,
                            max: 5000,
                            step: 100,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "staggerMs",
                            attr: "startAnimation.staggerMs",
                            type: "number",
                            defaultVal: "50",
                            min: 0,
                            max: 500,
                            step: 10,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
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
                                    name: "width",
                                    attr: "style.chart.width",
                                    defaultVal: "512",
                                    type: "number",
                                    min: 360,
                                    max: 1000,
                                    comment: "Ignored when responsive is true",
                                },
                                {
                                    name: "height",
                                    attr: "style.chart.height",
                                    defaultVal: "512",
                                    type: "number",
                                    min: 360,
                                    max: 1000,
                                    comment: "Ignored when responsive is true",
                                },
                                {
                                    name: "useGradient",
                                    type: "checkbox",
                                    attr: "style.chart.useGradient",
                                    defaultVal: "true",
                                },
                                {
                                    name: "gradientIntensity",
                                    type: "number",
                                    min: 0,
                                    max: 100,
                                    attr: "style.chart.gradientIntensity",
                                    defaultVal: "40",
                                },
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
                                    attr: "padding",
                                    level: 3,
                                    title: "style.chart.padding",
                                    children: [
                                        {
                                            name: "top",
                                            attr: "style.chart.padding.top",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "0",
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.padding.right",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "0",
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.padding.bottom",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "0",
                                        },
                                        {
                                            name: "left",
                                            attr: "style.chart.padding.left",
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            defaultVal: "0",
                                        },
                                    ],
                                },
                                {
                                    attr: "comments",
                                    level: 3,
                                    title: "style.chart.comments",
                                    children: [
                                        {
                                            name: "show",
                                            type: "checkbox",
                                            attr: "style.chart.comments.show",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "showInTooltip",
                                            type: "checkbox",
                                            attr: "style.chart.comments.showInTooltip",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "width",
                                            type: "number",
                                            attr: "style.chart.comments.width",
                                            min: 50,
                                            max: 400,
                                            step: 10,
                                            defaultVal: "100",
                                        },
                                        {
                                            name: "offsetX",
                                            type: "number",
                                            attr: "style.chart.comments.offsetX",
                                            min: -50,
                                            max: 50,
                                            defaultVal: "0",
                                        },
                                        {
                                            name: "offsetY",
                                            type: "number",
                                            attr: "style.chart.comments.offsetY",
                                            min: -50,
                                            max: 50,
                                            defaultVal: "0",
                                        },
                                    ],
                                },
                                {
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            name: "curvedMarkers",
                                            attr: "style.chart.layout.curvedMarkers",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            attr: "donut",
                                            level: 4,
                                            title: "style.chart.layout.donut",
                                            children: [
                                                {
                                                    name: "radiusRatio",
                                                    type: "number",
                                                    attr: "style.chart.layout.donut.radiusRatio",
                                                    min: 0.1,
                                                    max: 0.5,
                                                    step: 0.01,
                                                    defaultVal: "0.3",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    type: "number",
                                                    attr: "style.chart.layout.donut.strokeWidth",
                                                    min: 6,
                                                    max: 100,
                                                    defaultVal: "55",
                                                },
                                                {
                                                    name: "borderWidth",
                                                    type: "number",
                                                    attr: "style.chart.layout.donut.borderWidth",
                                                    min: 0,
                                                    max: 12,
                                                    defaultVal: "2",
                                                },
                                                {
                                                    name: "useShadow",
                                                    type: "checkbox",
                                                    attr: "style.chart.layout.donut.useShadow",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "shadowColor",
                                                    type: "color",
                                                    attr: "style.chart.layout.donut.shadowColor",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "emptyFill",
                                                    type: "color",
                                                    attr: "style.chart.layout.donut.emptyFill",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "selectedColor",
                                                    type: "color",
                                                    attr: "style.chart.layout.donut.selectedColor",
                                                    defaultVal: "#0000001A",
                                                    comment:
                                                        "It is recommended to keep it very transparent",
                                                },
                                                {
                                                    name: "borderColorAuto",
                                                    attr: "style.chart.layout.donut.borderColorAuto",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "borderColor",
                                                    attr: "style.chart.layout.donut.borderColor",
                                                    defaultVal: "#CCCCCC",
                                                    type: "color",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.layout.labels",
                                            children: [
                                                {
                                                    attr: "dataLabels",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.dataLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            type: "checkbox",
                                                            attr: "style.chart.layout.labels.dataLabels.show",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            inactive: true,
                                                            name: "useLabelSlots",
                                                            defaultVal: "false",
                                                            comment:
                                                                "Check out the slots tab for information on how to use custom data labels",
                                                        },
                                                        {
                                                            name: "hideUnderValue",
                                                            type: "number",
                                                            attr: "style.chart.layout.labels.dataLabels.hideUnderValue",
                                                            min: 0,
                                                            max: 10,
                                                            defaultVal: "3",
                                                            comment:
                                                                translations
                                                                    .docs
                                                                    .comments
                                                                    .donut
                                                                    .hideUnderValue[
                                                                    store.lang
                                                                ],
                                                        },
                                                        {
                                                            name: "prefix",
                                                            type: "text",
                                                            attr: "style.chart.layout.labels.dataLabels.prefix",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "suffix",
                                                            type: "text",
                                                            attr: "style.chart.layout.labels.dataLabels.suffix",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "smallArcClusterThreshold",
                                                            attr: "style.chart.layout.labels.dataLabels.smallArcClusterThreshold",
                                                            type: "number",
                                                            min: 0,
                                                            max: 100,
                                                            defaultVal: "8",
                                                            comment:
                                                                "Show labels on the side for arcs under this percentage",
                                                        },
                                                        {
                                                            name: "smallArcClusterFontSize",
                                                            attr: "style.chart.layout.labels.dataLabels.smallArcClusterFontSize",
                                                            type: "number",
                                                            defaultVal: "12",
                                                            min: 6,
                                                            max: 20,
                                                            comment:
                                                                "Font size for labels of small arcs",
                                                        },
                                                        {
                                                            name: "oneLine",
                                                            attr: "style.chart.layout.labels.dataLabels.oneLine",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "showValueFirst",
                                                            attr: "style.chart.layout.labels.dataLabels.showValueFirst",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "usePercentageParens",
                                                            attr: "style.chart.layout.labels.dataLabels.usePercentageParens",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "useValueParens",
                                                            attr: "style.chart.layout.labels.dataLabels.useValueParens",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "value",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.value",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.value.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "rounding",
                                                            attr: "style.chart.layout.labels.value.rounding",
                                                            type: "number",
                                                            min: 0,
                                                            max: 6,
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
                                                {
                                                    attr: "percentage",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.percentage",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.percentage.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.labels.percentage.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.labels.percentage.bold",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.labels.percentage.fontSize",
                                                            type: "number",
                                                            min: 8,
                                                            max: 42,
                                                            defaultVal: "18",
                                                        },
                                                        {
                                                            name: "minFontSize",
                                                            attr: "style.chart.layout.labels.percentage.minFontSize",
                                                            type: "number",
                                                            min: 4,
                                                            max: 42,
                                                            defaultVal: "6",
                                                        },
                                                        {
                                                            name: "rounding",
                                                            attr: "style.chart.layout.labels.percentage.rounding",
                                                            type: "number",
                                                            min: 0,
                                                            max: 6,
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
                                                {
                                                    attr: "name",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.name",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.name.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.labels.name.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.labels.name.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.labels.name.fontSize",
                                                            type: "number",
                                                            min: 8,
                                                            max: 42,
                                                            defaultVal: "14",
                                                        },
                                                        {
                                                            name: "minFontSize",
                                                            attr: "style.chart.layout.labels.name.minFontSize",
                                                            type: "number",
                                                            min: 4,
                                                            max: 42,
                                                            defaultVal: "6",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "hollow",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.hollow",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.hollow.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            attr: "average",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.hollow.average",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.labels.hollow.average.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.labels.hollow.average.bold",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.labels.hollow.average.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "18",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.labels.hollow.average.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#AAAAAA",
                                                                },
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.hollow.average.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "Average",
                                                                },
                                                                {
                                                                    name: "offsetY",
                                                                    attr: "style.chart.layout.labels.hollow.average.offsetY",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: -50,
                                                                    max: 50,
                                                                },
                                                                {
                                                                    attr: "value",
                                                                    level: 7,
                                                                    title: "style.chart.layout.labels.hollow.average.value",
                                                                    children: [
                                                                        {
                                                                            name: "bold",
                                                                            attr: "style.chart.layout.labels.hollow.average.value.bold",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "true",
                                                                        },
                                                                        {
                                                                            name: "fontSize",
                                                                            attr: "style.chart.layout.labels.hollow.average.value.fontSize",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "18",
                                                                            min: 8,
                                                                            max: 42,
                                                                        },
                                                                        {
                                                                            name: "color",
                                                                            attr: "style.chart.layout.labels.hollow.average.value.color",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#AAAAAA",
                                                                        },
                                                                        {
                                                                            name: "offsetY",
                                                                            attr: "style.chart.layout.labels.hollow.average.value.offsetY",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "0",
                                                                            min: -50,
                                                                            max: 50,
                                                                        },
                                                                        {
                                                                            name: "rounding",
                                                                            attr: "style.chart.layout.labels.hollow.average.value.rounding",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "0",
                                                                            min: 0,
                                                                            max: 6,
                                                                        },
                                                                        {
                                                                            name: "prefix",
                                                                            attr: "style.chart.layout.labels.hollow.average.value.prefix",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "''",
                                                                        },
                                                                        {
                                                                            name: "suffix",
                                                                            attr: "style.chart.layout.labels.hollow.average.value.suffix",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "''",
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
                                                        {
                                                            attr: "total",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.hollow.total",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.labels.hollow.total.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.labels.hollow.total.bold",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.labels.hollow.total.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "18",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.labels.hollow.total.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#AAAAAA",
                                                                },
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.hollow.total.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "Total",
                                                                },
                                                                {
                                                                    name: "offsetY",
                                                                    attr: "style.chart.layout.labels.hollow.total.offsetY",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: -50,
                                                                    max: 50,
                                                                },
                                                                {
                                                                    attr: "value",
                                                                    level: 7,
                                                                    title: "style.chart.layout.labels.hollow.total.value",
                                                                    children: [
                                                                        {
                                                                            name: "bold",
                                                                            attr: "style.chart.layout.labels.hollow.total.value.bold",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "true",
                                                                        },
                                                                        {
                                                                            name: "fontSize",
                                                                            attr: "style.chart.layout.labels.hollow.total.value.fontSize",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "18",
                                                                            min: 8,
                                                                            max: 42,
                                                                        },
                                                                        {
                                                                            name: "color",
                                                                            attr: "style.chart.layout.labels.hollow.total.value.color",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#AAAAAA",
                                                                        },
                                                                        {
                                                                            name: "offsetY",
                                                                            attr: "style.chart.layout.labels.hollow.total.value.offsetY",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "0",
                                                                            min: -50,
                                                                            max: 50,
                                                                        },
                                                                        {
                                                                            name: "rounding",
                                                                            attr: "style.chart.layout.labels.hollow.total.value.rounding",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "0",
                                                                            min: 0,
                                                                            max: 6,
                                                                        },
                                                                        {
                                                                            name: "prefix",
                                                                            attr: "style.chart.layout.labels.hollow.total.value.prefix",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "''",
                                                                        },
                                                                        {
                                                                            name: "suffix",
                                                                            attr: "style.chart.layout.labels.hollow.total.value.suffix",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "''",
                                                                        },
                                                                        {
                                                                            inactive: true,
                                                                            unsupported: true,
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
                                    ],
                                },
                                {
                                    attr: "legend",
                                    level: 3,
                                    title: "style.chart.legend",
                                    children: [
                                        {
                                            name: "showValueFirst",
                                            attr: "style.chart.legend.showValueFirst",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "usePercentageParens",
                                            attr: "style.chart.legend.usePercentageParens",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "useValueParens",
                                            attr: "style.chart.legend.useValueParens",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "show",
                                            attr: "style.chart.legend.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.legend.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.legend.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.legend.fontSize",
                                            type: "number",
                                            defaultVal: "16",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.legend.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "roundingValue",
                                            attr: "style.chart.legend.roundingValue",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "roundingPercentage",
                                            attr: "style.chart.legend.roundingPercentage",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "showValue",
                                            attr: "style.chart.legend.showValue",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "showPercentage",
                                            attr: "style.chart.legend.showPercentage",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "position",
                                            attr: "style.chart.legend.position",
                                            type: "select",
                                            defaultVal: "bottom",
                                            options: ["top", "bottom"],
                                        },
                                        {
                                            attr: "selectAllToggle",
                                            level: 4,
                                            title: "style.chart.legend.selectAllToggle",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.legend.selectAllToggle.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.chart.legend.selectAllToggle.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.legend.selectAllToggle.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                    ],
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
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "text",
                                            attr: "style.chart.title.text",
                                            type: "text",
                                            defaultVal: "''",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.title.fontSize",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 8,
                                            max: 42,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.title.bold",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "paddingLeft",
                                            attr: "style.chart.title.paddingLeft",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "paddingRight",
                                            attr: "style.chart.title.paddingRight",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "text",
                                                    attr: "style.chart.title.subtitle.text",
                                                    type: "text",
                                                    defaultVal: "''",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.title.subtitle.fontSize",
                                                    type: "number",
                                                    defaultVal: "20",
                                                    min: 8,
                                                    max: 42,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.title.subtitle.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "tooltip",
                                    level: 3,
                                    title: "style.chart.tooltip",
                                    children: [
                                        {
                                            inactive: true,
                                            name: "teleportTo",
                                            defaultVal: "'body'",
                                            comment:
                                                "Sets the 'to' attr of the Teleport Vue component",
                                        },
                                        {
                                            name: "showValueFirst",
                                            attr: "style.chart.tooltip.showValueFirst",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "usePercentageParens",
                                            attr: "style.chart.tooltip.usePercentageParens",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "useValueParens",
                                            attr: "style.chart.tooltip.useValueParens",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "show",
                                            attr: "style.chart.tooltip.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.tooltip.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.tooltip.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.chart.tooltip.fontSize",
                                            type: "number",
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
                                        },
                                        {
                                            name: "showValue",
                                            attr: "style.chart.tooltip.showValue",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "showPercentage",
                                            attr: "style.chart.tooltip.showPercentage",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "roundingValue",
                                            attr: "style.chart.tooltip.roundingValue",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "roundingPercentage",
                                            attr: "style.chart.tooltip.roundingPercentage",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            component: "div",
                                            class: "flex flex-row gap-2 place-items-center",
                                            children: [
                                                {
                                                    inactive: true,
                                                    name: "customFormat",
                                                    defaultVal: "null",
                                                    comment:
                                                        "default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)",
                                                },
                                                {
                                                    component: "div",
                                                    class: "min-w-[200px]",
                                                    children: [
                                                        {
                                                            component:
                                                                "BaseTabLink",
                                                            action: () =>
                                                                setActiveTab(4),
                                                            icon: "tooltip",
                                                            children: [
                                                                {
                                                                    text: " Check out 'Custom tooltip' tab ",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            name: "borderRadius",
                                            attr: "style.chart.tooltip.borderRadius",
                                            type: "number",
                                            defaultVal: "4",
                                            min: 0,
                                            max: 24,
                                        },
                                        {
                                            name: "borderColor",
                                            attr: "style.chart.tooltip.borderColor",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "borderWidth",
                                            attr: "style.chart.tooltip.borderWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 24,
                                        },
                                        {
                                            name: "backgroundOpacity",
                                            attr: "style.chart.tooltip.backgroundOpacity",
                                            type: "number",
                                            defaultVal: "100",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "position",
                                            attr: "style.chart.tooltip.position",
                                            type: "select",
                                            defaultVal: "center",
                                            options: [
                                                "left",
                                                "center",
                                                "right",
                                            ],
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "offsetX",
                                            attr: "style.chart.tooltip.offsetX",
                                            type: "number",
                                            defaultVal: "0",
                                            min: -100,
                                            max: 100,
                                        },
                                        {
                                            name: "offsetY",
                                            attr: "style.chart.tooltip.offsetY",
                                            type: "number",
                                            defaultVal: "24",
                                            min: -100,
                                            max: 100,
                                        },
                                        {
                                            name: "smooth",
                                            attr: "style.chart.tooltip.smooth",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "smoothForce",
                                            attr: "style.chart.tooltip.smoothForce",
                                            type: "number",
                                            defaultVal: "0.18",
                                            min: 0.1,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            name: "smoothSnapThreshold",
                                            attr: "style.chart.tooltip.smoothSnapThreshold",
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
                {
                    attr: "table",
                    level: 1,
                    children: [
                        {
                            name: "show",
                            attr: "table.show",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "useDialog",
                            attr: "table.useDialog",
                            type: "checkbox",
                            defaultVal: "false",
                            comment: "since v3.1.0",
                        },
                        {
                            name: "responsiveBreakpoint",
                            attr: "table.responsiveBreakpoint",
                            type: "number",
                            defaultVal: "400",
                            min: 300,
                            max: 800,
                            step: 50,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            attr: "columnNames",
                            level: 2,
                            title: "table.columnNames",
                            children: [
                                {
                                    name: "series",
                                    attr: "table.columnNames.series",
                                    type: "text",
                                    defaultVal: "Series",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "value",
                                    attr: "table.columnNames.value",
                                    type: "text",
                                    defaultVal: "Value",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "percentage",
                                    attr: "table.columnNames.percentage",
                                    type: "text",
                                    defaultVal: "Percentage",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "th",
                            level: 2,
                            title: "table.th",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "table.th.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "color",
                                    attr: "table.th.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "outline",
                                    attr: "table.th.outline",
                                    type: "text",
                                    defaultVal: "none",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "td",
                            level: 2,
                            title: "table.td",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "table.td.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "color",
                                    attr: "table.td.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "outline",
                                    attr: "table.td.outline",
                                    type: "text",
                                    defaultVal: "none",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "roundingValue",
                                    attr: "table.td.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "roundingPercentage",
                                    attr: "table.td.roundingPercentage",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                    ],
                },
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
                        {
                            name: "show",
                            attr: "userOptions.show",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "showOnChartHover",
                            attr: "userOptions.showOnChartHover",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "keepStateOnChartLeave",
                            attr: "userOptions.keepStateOnChartLeave",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "position",
                            attr: "userOptions.position",
                            type: "select",
                            defaultVal: "right",
                            options: ["right", "left"],
                        },
                        {
                            name: "useCursorPointer",
                            attr: "userOptions.useCursorPointer",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        { component: "BaseAttrAnnotatorPalette" },
                        {
                            attr: "buttons",
                            level: 2,
                            title: "userOptions.buttons",
                            children: [
                                {
                                    name: "tooltip",
                                    attr: "userOptions.buttons.tooltip",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "pdf",
                                    attr: "userOptions.buttons.pdf",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttons.img",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttons.csv",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttons.table",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "labels",
                                    attr: "userOptions.buttons.labels",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttons.fullscreen",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttons.annotator",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "buttonTitles",
                            level: 2,
                            title: "userOptions.buttonTitles",
                            children: [
                                {
                                    name: "open",
                                    attr: "userOptions.buttonTitles.open",
                                    type: "text",
                                    defaultVal: "Open options",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "close",
                                    attr: "userOptions.buttonTitles.close",
                                    type: "text",
                                    defaultVal: "Close options",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "tooltip",
                                    attr: "userOptions.buttonTitles.tooltip",
                                    type: "text",
                                    defaultVal: "Toggle tooltip",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "pdf",
                                    attr: "userOptions.buttonTitles.pdf",
                                    type: "text",
                                    defaultVal: "Download PDF",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttonTitles.csv",
                                    type: "text",
                                    defaultVal: "Download CSV",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttonTitles.img",
                                    type: "text",
                                    defaultVal: "Download PNG",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttonTitles.table",
                                    type: "text",
                                    defaultVal: "Toggle table",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "labels",
                                    attr: "userOptions.buttonTitles.labels",
                                    type: "text",
                                    defaultVal: "Toggle labels",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttonTitles.fullscreen",
                                    type: "text",
                                    defaultVal: "Toggle fullscreen",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttonTitles.annotator",
                                    type: "text",
                                    defaultVal: "Toggle annotator",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "callbacks",
                            level: 2,
                            title: "userOptions.callbacks",
                            children: [
                                {
                                    component: "BaseTabLink",
                                    action: () => setActiveTab(11),
                                    icon: "lambda",
                                    children: [
                                        { text: " Check out 'callbacks' tab " },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "print",
                            level: 2,
                            title: "userOptions.print",
                            children: [
                                {
                                    name: "scale",
                                    attr: "userOptions.print.scale",
                                    type: "number",
                                    min: 1,
                                    max: 5,
                                    defaultVal: "2",
                                    comment:
                                        "Set print quality (higher = larger file)",
                                },
                                {
                                    inactive: true,
                                    name: "orientation",
                                    defaultVal: "auto",
                                    comment: "'auto' | 'l' | 'p'",
                                },
                                {
                                    inactive: true,
                                    name: "overflowTolerance",
                                    defaultVal: "0.2",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
