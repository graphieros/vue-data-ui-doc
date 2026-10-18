// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiQuadrantConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiQuadrantConfig",
            equal: true,
            children: [
                {
                    component: "span",
                    children: [
                        { text: "responsive: false, " },
                        {
                            component: "BaseComment",
                            children: [
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
                    component: "span",
                    children: [
                        { text: 'theme: "", ' },
                        {
                            component: "BaseComment",
                            children: [
                                {
                                    text: '"dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""',
                                },
                            ],
                        },
                    ],
                },
                {
                    component: "span",
                    children: [
                        { text: "customPalette: [], " },
                        {
                            component: "BaseComment",
                            children: [{ text: "string[]" }],
                        },
                    ],
                },
                {
                    name: "useCssAnimation",
                    attr: "useCssAnimation",
                    type: "checkbox",
                    defaultVal: "true",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "zoomAnimationFrames",
                    attr: "zoomAnimationFrames",
                    type: "range",
                    defaultVal: "20",
                    min: 5,
                    max: 40,
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "zoomEnabled",
                    attr: "zoomEnabled",
                    type: "checkbox",
                    defaultVal: "true",
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
                    attr: "downsample",
                    level: 1,
                    children: [
                        {
                            name: "threshold",
                            attr: "downsample.threshold",
                            type: "number",
                            defaultVal: "1095",
                            min: 100,
                            max: 5000,
                            comment:
                                "Threshold above which LTTB algorithm kicks in",
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
                            attr: "chart",
                            level: 2,
                            title: "style.chart",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.chart.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "style.chart.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "height",
                                    attr: "style.chart.height",
                                    type: "number",
                                    defaultVal: "512",
                                    min: 300,
                                    max: 1000,
                                    step: 24,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "number",
                                    defaultVal: "512",
                                    min: 300,
                                    max: 1000,
                                    step: 24,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            attr: "areas",
                                            level: 4,
                                            title: "style.chart.layout.areas",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.areas.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "opacity",
                                                    attr: "style.chart.layout.areas.opacity",
                                                    type: "range",
                                                    defaultVal: "40",
                                                    min: 0,
                                                    max: 100,
                                                },
                                                {
                                                    name: "useGradient",
                                                    attr: "style.chart.layout.areas.useGradient",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "grid",
                                            level: 4,
                                            title: "style.chart.layout.grid",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.grid.stroke",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.grid.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1.5",
                                                    min: 0.1,
                                                    max: 12,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "showArrows",
                                                    attr: "style.chart.layout.grid.showArrows",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    attr: "graduations",
                                                    level: 5,
                                                    title: "style.chart.layout.grid.graduations",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.grid.graduations.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.grid.graduations.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#E1E5E8",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.grid.graduations.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "0.5",
                                                            min: 0.1,
                                                            max: 12,
                                                            step: 0.1,
                                                        },
                                                        {
                                                            name: "steps",
                                                            attr: "style.chart.layout.grid.graduations.steps",
                                                            type: "select",
                                                            defaultVal: "5",
                                                            options: [
                                                                1, 2, 3, 4, 5,
                                                            ],
                                                        },
                                                        {
                                                            name: "fill",
                                                            attr: "style.chart.layout.grid.graduations.fill",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.grid.graduations.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#E1E5E8",
                                                        },
                                                        {
                                                            name: "roundingForce",
                                                            attr: "style.chart.layout.grid.graduations.roundingForce",
                                                            type: "range",
                                                            defaultVal: "10",
                                                            min: 0,
                                                            max: 200,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "xAxis",
                                                    level: 5,
                                                    title: "style.chart.layout.grid.xAxis",
                                                    children: [
                                                        {
                                                            name: "min",
                                                            attr: "style.chart.layout.grid.xAxis.min",
                                                            type: "number",
                                                            min: -10000,
                                                            max: 10000,
                                                            defaultVal: "-100",
                                                            comment:
                                                                translations
                                                                    .docs
                                                                    .comments
                                                                    .quadrant
                                                                    .useWhenAutoFalse[
                                                                    store.lang
                                                                ],
                                                        },
                                                        {
                                                            name: "max",
                                                            attr: "style.chart.layout.grid.xAxis.max",
                                                            type: "number",
                                                            min: -10000,
                                                            max: 10000,
                                                            defaultVal: "100",
                                                            comment:
                                                                translations
                                                                    .docs
                                                                    .comments
                                                                    .quadrant
                                                                    .useWhenAutoFalse[
                                                                    store.lang
                                                                ],
                                                        },
                                                        {
                                                            name: "auto",
                                                            attr: "style.chart.layout.grid.xAxis.auto",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "name",
                                                            attr: "style.chart.layout.grid.xAxis.name",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "yAxis",
                                                    level: 5,
                                                    title: "style.chart.layout.grid.yAxis",
                                                    children: [
                                                        {
                                                            name: "min",
                                                            attr: "style.chart.layout.grid.yAxis.min",
                                                            type: "number",
                                                            min: -10000,
                                                            max: 10000,
                                                            defaultVal: "-100",
                                                            comment:
                                                                translations
                                                                    .docs
                                                                    .comments
                                                                    .quadrant
                                                                    .useWhenAutoFalse[
                                                                    store.lang
                                                                ],
                                                        },
                                                        {
                                                            name: "max",
                                                            attr: "style.chart.layout.grid.yAxis.max",
                                                            type: "number",
                                                            min: -10000,
                                                            max: 10000,
                                                            defaultVal: "100",
                                                            comment:
                                                                translations
                                                                    .docs
                                                                    .comments
                                                                    .quadrant
                                                                    .useWhenAutoFalse[
                                                                    store.lang
                                                                ],
                                                        },
                                                        {
                                                            name: "auto",
                                                            attr: "style.chart.layout.grid.yAxis.auto",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "name",
                                                            attr: "style.chart.layout.grid.yAxis.name",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.layout.labels",
                                            children: [
                                                {
                                                    attr: "axisLabels",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.axisLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.axisLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.labels.axisLabels.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            attr: "color",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.axisLabels.color",
                                                            children: [
                                                                {
                                                                    name: "positive",
                                                                    attr: "style.chart.layout.labels.axisLabels.color.positive",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "negative",
                                                                    attr: "style.chart.layout.labels.axisLabels.color.negative",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "plotLabels",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.plotLabels",
                                                    children: [
                                                        {
                                                            name: "showAsTag",
                                                            attr: "style.chart.layout.labels.plotLabels.showAsTag",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.plotLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.labels.plotLabels.fontSize",
                                                            type: "number",
                                                            defaultVal: "10",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.labels.plotLabels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.layout.labels.plotLabels.offsetY",
                                                            type: "number",
                                                            defaultVal: "8",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                        {
                                                            attr: "x",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.plotLabels.x",
                                                            children: [
                                                                {
                                                                    component:
                                                                        "div",
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
                                                        {
                                                            attr: "y",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.plotLabels.y",
                                                            children: [
                                                                {
                                                                    component:
                                                                        "div",
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
                                                    attr: "quadrantLabels",
                                                    level: 5,
                                                    title: "style.chart.layout.labels.quadrantLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.labels.quadrantLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            attr: "bl",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.quadrantLabels.bl",
                                                            children: [
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.bl.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "''",
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.bl.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.bl.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "16",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.bl.bold",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "br",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.quadrantLabels.br",
                                                            children: [
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.br.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "''",
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.br.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.br.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "16",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.br.bold",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "tl",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.quadrantLabels.tl",
                                                            children: [
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tl.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "''",
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tl.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tl.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "16",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tl.bold",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "tr",
                                                            level: 6,
                                                            title: "style.chart.layout.labels.quadrantLabels.tr",
                                                            children: [
                                                                {
                                                                    name: "text",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tr.text",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "''",
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tr.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tr.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "16",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.labels.quadrantLabels.tr.bold",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "plots",
                                            level: 4,
                                            title: "style.chart.layout.plots",
                                            children: [
                                                {
                                                    name: "radius",
                                                    attr: "style.chart.layout.plots.radius",
                                                    type: "number",
                                                    defaultVal: "6",
                                                    min: 1,
                                                    max: 100,
                                                    comment:
                                                        "Used when auto is false",
                                                },
                                                {
                                                    name: "outline",
                                                    attr: "style.chart.layout.plots.outline",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "outlineColor",
                                                    attr: "style.chart.layout.plots.outlineColor",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "outlineWidth",
                                                    attr: "style.chart.layout.plots.outlineWidth",
                                                    type: "range",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 12,
                                                    step: 0.1,
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
                                            name: "show",
                                            attr: "style.chart.legend.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.chart.legend.bold",
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
                                            defaultVal: "14",
                                            min: 8,
                                            max: 42,
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
                                            name: "roundingValue",
                                            attr: "style.chart.tooltip.roundingValue",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "showShape",
                                            attr: "style.chart.tooltip.showShape",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
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
                                            min: -50,
                                            max: 50,
                                        },
                                        {
                                            name: "smooth",
                                            attr: "style.chart.tooltip.smooth",
                                            type: "chexkbox",
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
                            ],
                        },
                    ],
                },
                {
                    attr: "translations",
                    level: 1,
                    children: [
                        {
                            name: "category",
                            attr: "translations.category",
                            type: "text",
                            defaultVal: "Category",
                        },
                        {
                            name: "item",
                            attr: "translations.item",
                            type: "text",
                            defaultVal: "Item",
                        },
                        {
                            name: "side",
                            attr: "translations.side",
                            type: "text",
                            defaultVal: "Side",
                        },
                    ],
                },
                {
                    attr: "userOptions",
                    level: 1,
                    children: [
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
