// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiAgePyramidConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiAgePyramidConfig",
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
                    component: "span",
                    children: [
                        {
                            text: 'theme: "", ("dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")',
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
                            name: "backgroundColor",
                            attr: "style.backgroundColor",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "color",
                            attr: "style.color",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "height",
                            attr: "style.height",
                            type: "range",
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
                            attr: "style.width",
                            type: "range",
                            defaultVal: "500",
                            min: 300,
                            max: 1000,
                            step: 10,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            attr: "highlighter",
                            level: 2,
                            title: "style.highlighter",
                            children: [
                                {
                                    name: "color",
                                    attr: "style.highlighter.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "opacity",
                                    attr: "style.highlighter.opacity",
                                    type: "range",
                                    defaultVal: "5",
                                    min: 0,
                                    max: 30,
                                },
                            ],
                        },
                        {
                            attr: "layout",
                            level: 2,
                            title: "style.layout",
                            children: [
                                {
                                    attr: "bars",
                                    level: 3,
                                    title: "style.layout.bars",
                                    children: [
                                        {
                                            name: "gap",
                                            attr: "style.layout.bars.gap",
                                            type: "number",
                                            defaultVal: "2",
                                            min: 0,
                                            max: 8,
                                            step: 0.1,
                                        },
                                        {
                                            name: "borderRadius",
                                            attr: "style.layout.bars.borderRadius",
                                            type: "number",
                                            defaultVal: "2",
                                            min: 0,
                                            max: 12,
                                            step: 1,
                                        },
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.layout.bars.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.bars.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "underlayer",
                                                    attr: "style.layout.bars.gradient.underlayer",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "intensity",
                                                    attr: "style.layout.bars.gradient.intensity",
                                                    type: "range",
                                                    defaultVal: "60",
                                                    min: 0,
                                                    max: 100,
                                                },
                                                {
                                                    name: "shiftHue",
                                                    attr: "style.layout.bars.gradient.shiftHue",
                                                    type: "number",
                                                    defaultVal: "0.05",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.01,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            attr: "left",
                                            level: 4,
                                            title: "style.layout.bars.left",
                                            children: [
                                                {
                                                    name: "color",
                                                    attr: "style.layout.bars.left.color",
                                                    type: "color",
                                                    defaultVal: "#DC3912",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "right",
                                            level: 4,
                                            title: "style.layout.bars.right",
                                            children: [
                                                {
                                                    name: "color",
                                                    attr: "style.layout.bars.right.color",
                                                    type: "color",
                                                    defaultVal: "#5F8BEE",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "centerSlit",
                                    level: 3,
                                    title: "style.layout.centerSlit",
                                    children: [
                                        {
                                            name: "width",
                                            attr: "style.layout.centerSlit.width",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 0,
                                            max: 100,
                                        },
                                    ],
                                },
                                {
                                    attr: "dataLabels",
                                    level: 3,
                                    title: "style.layout.dataLabels",
                                    children: [
                                        {
                                            attr: "sideTitles",
                                            level: 4,
                                            title: "style.layout.dataLabels.sideTitles",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.dataLabels.sideTitles.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.layout.dataLabels.sideTitles.fontSize",
                                                    type: "number",
                                                    defaultVal: "18",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.dataLabels.sideTitles.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "useSideColor",
                                                    attr: "style.layout.dataLabels.sideTitles.useSideColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.layout.dataLabels.sideTitles.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.layout.dataLabels.sideTitles.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "xAxis",
                                            level: 4,
                                            title: "style.layout.dataLabels.xAxis",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.dataLabels.xAxis.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.layout.dataLabels.xAxis.fontSize",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.dataLabels.xAxis.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.layout.dataLabels.xAxis.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "scale",
                                                    attr: "style.layout.dataLabels.xAxis.scale",
                                                    type: "select",
                                                    defaultVal: "1000",
                                                    options: [
                                                        "1",
                                                        "10",
                                                        "100",
                                                        "1000",
                                                        "10000",
                                                        "100000",
                                                    ],
                                                },
                                                {
                                                    name: "translation",
                                                    attr: "style.layout.dataLabels.xAxis.translation",
                                                    type: "text",
                                                    defaultVal: "in thousands",
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
                                                {
                                                    name: "rotation",
                                                    attr: "style.layout.dataLabels.xAxis.rotation",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -90,
                                                    max: 90,
                                                },
                                                {
                                                    attr: "autoRotate",
                                                    level: 5,
                                                    title: "style.layout.dataLabels.xAxis.autoRotate",
                                                    children: [
                                                        {
                                                            name: "enable",
                                                            attr: "style.layout.dataLabels.xAxis.autoRotate.enable",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "angle",
                                                            attr: "style.layout.dataLabels.xAxis.autoRotate.angle",
                                                            defaultVal: "-30",
                                                            type: "number",
                                                            min: -90,
                                                            max: 90,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "yAxis",
                                            level: 4,
                                            title: "style.layout.dataLabels.yAxis",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.dataLabels.yAxis.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "display",
                                                    attr: "style.layout.dataLabels.yAxis.display",
                                                    type: "select",
                                                    defaultVal: "age",
                                                    options: ["age", "year"],
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.layout.dataLabels.yAxis.fontSize",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.dataLabels.yAxis.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.layout.dataLabels.yAxis.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "showEvery",
                                                    attr: "style.layout.dataLabels.yAxis.showEvery",
                                                    type: "select",
                                                    defaultVal: "5",
                                                    options: ["1", "5", "10"],
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
                                    ],
                                },
                                {
                                    attr: "grid",
                                    level: 3,
                                    title: "style.layout.grid",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.layout.grid.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.layout.grid.stroke",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.layout.grid.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 12,
                                            step: 0.1,
                                        },
                                    ],
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
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "right",
                                            attr: "style.layout.padding.right",
                                            type: "number",
                                            defaultVal: "12",
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
                                            defaultVal: "12",
                                            min: 0,
                                            max: 100,
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
                                    name: "text",
                                    attr: "style.title.text",
                                    type: "text",
                                    defaultVal: "''",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.title.fontSize",
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
                                    attr: "style.title.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "textAlign",
                                    attr: "style.title.textAlign",
                                    type: "select",
                                    defaultVal: "center",
                                    options: ["left", " center", "right"],
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "paddingLeft",
                                    attr: "style.title.paddingLeft",
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
                                    attr: "style.title.paddingRight",
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
                                    level: 3,
                                    title: "style.title.subtitle",
                                    children: [
                                        {
                                            name: "text",
                                            attr: "style.title.subtitle.text",
                                            type: "text",
                                            defaultVal: "''",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.title.subtitle.fontSize",
                                            type: "number",
                                            defaultVal: "16",
                                            min: 8,
                                            max: 42,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.title.subtitle.bold",
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
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
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
                                                    component: "BaseTabLink",
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
                                    max: 12,
                                },
                                {
                                    name: "backgroundOpacity",
                                    attr: "style.tooltip.backgroundOpacity",
                                    type: "range",
                                    defaultVal: "100",
                                    min: 0,
                                    max: 100,
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
                                    min: -100,
                                    max: 100,
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
                            step: 10,
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
                                    defaultVal: "#FAFAFA",
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
                                    defaultVal: "#FAFAFA",
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
                    attr: "translations",
                    level: 1,
                    children: [
                        {
                            name: "age",
                            attr: "translations.age",
                            type: "text",
                            defaultVal: "age",
                        },
                        {
                            name: "male",
                            attr: "translations.male",
                            type: "text",
                            defaultVal: "male",
                        },
                        {
                            name: "female",
                            attr: "translations.female",
                            type: "text",
                            defaultVal: "female",
                        },
                        {
                            name: "total",
                            attr: "translations.total",
                            type: "text",
                            defaultVal: "total",
                        },
                        {
                            name: "year",
                            attr: "translations.year",
                            type: "text",
                            defaultVal: "year",
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
                                },
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
