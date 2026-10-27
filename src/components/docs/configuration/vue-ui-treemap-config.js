// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiTreemapConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiTreemapConfig",
            equal: true,
            children: [
                {
                    component: "span",
                    children: [
                        { text: "responsive: false; " },
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
                        { text: "customPalette: []; " },
                        {
                            component: "BaseComment",
                            children: [{ text: "string[]" }],
                        },
                    ],
                },
                {
                    attr: "transitions",
                    level: 1,
                    children: [
                        {
                            name: "enable",
                            attr: "transitions.enable",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate(..._args);
                            },
                        },
                        {
                            name: "pauseOnLoad",
                            attr: "transitions.pauseOnLoad",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "pauseOnDatasetChange",
                            attr: "transitions.pauseOnDatasetChange",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "activationDelayMs",
                            attr: "transitions.activationDelayMs",
                            type: "number",
                            min: 100,
                            max: 1000,
                            step: 50,
                            defaultVal: "300",
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
                                    name: "height",
                                    attr: "style.chart.height",
                                    type: "number",
                                    defaultVal: "500",
                                    min: 300,
                                    max: 1000,
                                    step: 10,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "width",
                                    attr: "style.chart.width",
                                    type: "number",
                                    defaultVal: "800",
                                    min: 300,
                                    max: 1000,
                                    step: 10,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    attr: "zoom",
                                    level: 3,
                                    title: "style.chart.zoom",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.zoom.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                    ],
                                },
                                {
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            name: "sorted",
                                            attr: "style.chart.layout.sorted",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.layout.labels",
                                            children: [
                                                {
                                                    name: "showDefaultLabels",
                                                    attr: "style.chart.layout.labels.showDefaultLabels",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.labels.fontSize",
                                                    type: "number",
                                                    defaultVal: "24",
                                                    min: 8,
                                                    max: 100,
                                                },
                                                {
                                                    name: "minFontSize",
                                                    attr: "style.chart.layout.labels.minFontSize",
                                                    type: "number",
                                                    defaultVal: "10",
                                                    min: 8,
                                                    max: 100,
                                                },
                                                {
                                                    name: "fontSizeZoomFactor",
                                                    attr: "style.chart.layout.labels.fontSizeZoomFactor",
                                                    type: "number",
                                                    defaultVal: "6",
                                                    min: 1,
                                                    max: 12,
                                                },
                                                {
                                                    name: "hideUnderProportion",
                                                    attr: "style.chart.layout.labels.hideUnderProportion",
                                                    type: "number",
                                                    defaultVal: "0.03",
                                                    min: 0.01,
                                                    max: 0.2,
                                                    step: 0.01,
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.layout.labels.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.layout.labels.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "rounding",
                                                    attr: "style.chart.layout.labels.rounding",
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
                                            attr: "rects",
                                            level: 4,
                                            title: "style.chart.layout.rects",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.rects.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.rects.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "borderRadius",
                                                    attr: "style.chart.layout.rects.borderRadius",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "colorRatio",
                                                    attr: "style.chart.layout.rects.colorRatio",
                                                    type: "range",
                                                    defaultVal: "0.3",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.01,
                                                },
                                                {
                                                    attr: "gradient",
                                                    level: 5,
                                                    title: "style.chart.layout.rects.gradient",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.rects.gradient.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "intensity",
                                                            attr: "style.chart.layout.rects.gradient.intensity",
                                                            type: "range",
                                                            defaultVal: "30",
                                                            min: 0,
                                                            max: 100,
                                                        },
                                                        { text: "> " },
                                                    ],
                                                },
                                                {
                                                    attr: "selected",
                                                    level: 5,
                                                    title: "style.chart.layout.rects.selected",
                                                    children: [
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.rects.selected.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.rects.selected.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 24,
                                                        },
                                                        {
                                                            name: "unselectedOpacity",
                                                            attr: "style.chart.layout.rects.selected.unselectedOpacity",
                                                            type: "range",
                                                            defaultVal: "0.6",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.01,
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "group",
                                                    level: 5,
                                                    title: "style.chart.layout.rects.group",
                                                    children: [
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.rects.group.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#A1A1A1",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.rects.group.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "useSeriesBackgroundColor",
                                                            attr: "style.chart.layout.rects.group.useSeriesBackgroundColor",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "backgroundLighterRatio",
                                                            attr: "style.chart.layout.rects.group.backgroundLighterRatio",
                                                            type: "range",
                                                            defaultVal: "0.4",
                                                            min: 0,
                                                            max: 1,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            attr: "label",
                                                            level: 6,
                                                            title: "styme.chart.layout.rects.group.label",
                                                            children: [
                                                                {
                                                                    name: "adaptColorToBackground",
                                                                    attr: "style.chart.layout.rects.group.label.adaptColorToBackground",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.rects.group.label.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
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
                                            defaultVal: "14",
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
                                    attr: "padding",
                                    level: 3,
                                    title: "style.chart.padding",
                                    children: [
                                        {
                                            name: "top",
                                            attr: "style.chart.padding.top",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "right",
                                            attr: "style.chart.padding.right",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "bottom",
                                            attr: "style.chart.padding.bottom",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "left",
                                            attr: "style.chart.padding.left",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 100,
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
                                            name: "roundingValue",
                                            attr: "style.chart.tooltip.roundingValue",
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
                                {
                                    name: "followZoom",
                                    attr: "userOptions.annotator.followZoom",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    tooltip:
                                        "Anchor annotations to chart coordinates so they follow zoom and pan.",
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
