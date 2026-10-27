// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiCirclePackConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiCirclePackConfig",
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
                    component: "span",
                    children: [
                        {
                            text: 'theme: "", ("dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")',
                        },
                        { component: "br" },
                    ],
                },
                {
                    component: "span",
                    children: [
                        { text: "customPalette: [], " },
                        {
                            component: "span",
                            class: "text-xs text-app-blue",
                            children: [{ text: "// string[]" }],
                        },
                    ],
                },
                {
                    inactive: true,
                    name: "responsive",
                    defaultVal: "false",
                    comment: translations.responsive[store.lang],
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
                                    defaultVal: "316",
                                    type: "number",
                                    min: 360,
                                    max: 1000,
                                    comment: "Ignored when responsive is true",
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
                                    attr: "circles",
                                    level: 3,
                                    title: "style.chart.circles",
                                    children: [
                                        {
                                            name: "stroke",
                                            attr: "style.chart.circles.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.circles.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 24,
                                        },
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.chart.circles.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.circles.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "intensity",
                                                    attr: "style.chart.circles.gradient.intensity",
                                                    type: "range",
                                                    defaultVal: "40",
                                                    min: 0,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.circles.labels",
                                            children: [
                                                {
                                                    attr: "parents",
                                                    level: 5,
                                                    title: "style.chart.circles.labels.parents",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.circles.labels.parents.show",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "children",
                                                    level: 5,
                                                    title: "style.chart.circles.labels.children",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.circles.labels.children.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "name",
                                                    level: 5,
                                                    title: "style.chart.circles.labels.name",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.circles.labels.name.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSizeRatio",
                                                            attr: "style.chart.circles.labels.name.fontSizeRatio",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 2,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.circles.labels.name.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.circles.labels.name.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.circles.labels.name.color",
                                                            type: "color",
                                                            defaultVal: "auto",
                                                            comment:
                                                                "'auto' adapts text color to background",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "value",
                                                    level: 5,
                                                    title: "style.chart.circles.labels.value",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.circles.labels.value.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSizeRatio",
                                                            attr: "style.chart.circles.labels.value.fontSizeRatio",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 2,
                                                            step: 0.01,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.circles.labels.value.color",
                                                            type: "color",
                                                            defaultVal: "auto",
                                                            comment:
                                                                "'auto' adapts text color to background",
                                                        },
                                                        {
                                                            name: "rounding",
                                                            attr: "style.chart.circles.labels.value.rounding",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "prefix",
                                                            attr: "style.chart.circles.labels.value.prefix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "suffix",
                                                            attr: "style.chart.circles.labels.value.suffix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.circles.labels.value.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.circles.labels.value.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
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
                                    attr: "parentTooltips",
                                    level: 3,
                                    title: "style.chart.parentTooltips",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.parentTooltips.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "fontSizeRatio",
                                            attr: "style.chart.parentTooltips.fontSizeRatio",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0.5,
                                            max: 2,
                                            step: 0.1,
                                        },
                                        {
                                            name: "borderRadiusRatio",
                                            attr: "style.chart.parentTooltips.borderRadiusRatio",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 2,
                                            step: 0.1,
                                        },
                                        {
                                            name: "filter",
                                            attr: "style.chart.parentTooltips.filter",
                                            defaultVal:
                                                "drop-shadow(0 2px 4px #2D353C30)",
                                            type: "text",
                                        },
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.parentTooltips.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.chart.parentTooltips.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "useSerieColor",
                                            attr: "style.chart.parentTooltips.useSerieColor",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.chart.parentTooltips.stroke",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            attr: "link",
                                            level: 4,
                                            title: "style.chart.parentTooltips.link",
                                            children: [
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.parentTooltips.link.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.chart.parentTooltips.link.strokeDasharray",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 12,
                                                },
                                                {
                                                    name: "opacity",
                                                    attr: "style.chart.parentTooltips.link.opacity",
                                                    type: "number",
                                                    defaultVal: "0.6",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "useSerieColor",
                                                    attr: "style.chart.parentTooltips.link.useSerieColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.parentTooltips.link.stroke",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
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
                                {
                                    attr: "zoom",
                                    level: 3,
                                    title: "style.chart.zoom",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.chart.zoom.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "speed",
                                            attr: "style.chart.zoom.speed",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0.1,
                                            max: 10,
                                            step: 0.1,
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
                        },
                        {
                            attr: "columnNames",
                            level: 2,
                            title: "table.columnNames",
                            children: [
                                {
                                    name: "datapoint",
                                    attr: "table.columnNames.datapoint",
                                    type: "text",
                                    defaultVal: "Series",
                                },
                                {
                                    name: "parent",
                                    attr: "table.columnNames.parent",
                                    type: "text",
                                    defaultVal: "Parent",
                                },
                                {
                                    name: "depth",
                                    attr: "table.columnNames.depth",
                                    type: "text",
                                    defaultVal: "Depth",
                                },
                                {
                                    name: "value",
                                    attr: "table.columnNames.value",
                                    type: "text",
                                    defaultVal: "Value",
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
                                },
                                {
                                    name: "color",
                                    attr: "table.th.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "outline",
                                    attr: "table.th.outline",
                                    type: "text",
                                    defaultVal: "none",
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
                                },
                                {
                                    name: "color",
                                    attr: "table.td.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "outline",
                                    attr: "table.td.outline",
                                    type: "text",
                                    defaultVal: "none",
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
                        },
                        {
                            name: "keepStateOnChartLeave",
                            attr: "userOptions.keepStateOnChartLeave",
                            type: "checkbox",
                            defaultVal: "true",
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
                                    name: "pdf",
                                    attr: "userOptions.buttons.pdf",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttons.img",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttons.csv",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttons.table",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttons.fullscreen",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttons.annotator",
                                    type: "checkbox",
                                    defaultVal: "true",
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
                                },
                                {
                                    name: "close",
                                    attr: "userOptions.buttonTitles.close",
                                    type: "text",
                                    defaultVal: "Close options",
                                },
                                {
                                    name: "pdf",
                                    attr: "userOptions.buttonTitles.pdf",
                                    type: "text",
                                    defaultVal: "Download PDF",
                                },
                                {
                                    name: "csv",
                                    attr: "userOptions.buttonTitles.csv",
                                    type: "text",
                                    defaultVal: "Download CSV",
                                },
                                {
                                    name: "img",
                                    attr: "userOptions.buttonTitles.img",
                                    type: "text",
                                    defaultVal: "Download PNG",
                                },
                                {
                                    name: "table",
                                    attr: "userOptions.buttonTitles.table",
                                    type: "text",
                                    defaultVal: "Toggle table",
                                },
                                {
                                    name: "fullscreen",
                                    attr: "userOptions.buttonTitles.fullscreen",
                                    type: "text",
                                    defaultVal: "Toggle fullscreen",
                                },
                                {
                                    name: "annotator",
                                    attr: "userOptions.buttonTitles.annotator",
                                    type: "text",
                                    defaultVal: "Toggle annotator",
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
