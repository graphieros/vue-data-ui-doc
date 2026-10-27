// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiCandlestickConfigFields({
    forceChartUpdate,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiCandlestickConfig",
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
                    defaultVal: "'candlestick'",
                    type: "select",
                    options: ["candlestick", "ohlc"],
                },
                {
                    inactive: true,
                    name: "responsive",
                    defaultVal: "false",
                    comment: translations.responsive[store.lang],
                },
                {
                    inactive: true,
                    name: "responsiveProportionalSizing",
                    defaultVal: "true",
                    comment:
                        translations.responsiveProportionalSizing[store.lang],
                },
                {
                    inactive: true,
                    name: "theme",
                    defaultVal: "''",
                    comment:
                        "'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'",
                },
                { inactive: true, name: "debug", defaultVal: "false" },
                {
                    name: "loading",
                    attr: "loading",
                    type: "checkbox",
                    defaultVal: "false",
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
                            type: "number",
                            defaultVal: "316",
                            min: 200,
                            max: 800,
                            step: 10,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "width",
                            attr: "style.width",
                            type: "number",
                            defaultVal: "500",
                            min: 300,
                            max: 1500,
                            step: 10,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            attr: "layout",
                            level: 2,
                            title: "style.layout",
                            children: [
                                {
                                    attr: "candle",
                                    level: 3,
                                    title: "style.layout.candle",
                                    children: [
                                        {
                                            name: "borderRadius",
                                            attr: "style.layout.candle.borderRadius",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 48,
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.layout.candle.stroke",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.layout.candle.strokeWidth",
                                            type: "number",
                                            defaultVal: "0.5",
                                            min: 0.1,
                                            max: 12,
                                            step: 0.1,
                                        },
                                        {
                                            name: "widthRatio",
                                            attr: "style.layout.candle.widthRatio",
                                            type: "range",
                                            defaultVal: "0.5",
                                            min: 0.1,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            attr: "colors",
                                            level: 4,
                                            title: "style.layout.candle.colors",
                                            children: [
                                                {
                                                    name: "bearish",
                                                    attr: "style.layout.candle.colors.bearish",
                                                    type: "color",
                                                    defaultVal: "#DC3912",
                                                },
                                                {
                                                    name: "bullish",
                                                    attr: "style.layout.candle.colors.bullish",
                                                    type: "color",
                                                    defaultVal: "#2CA02C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "gradient",
                                            level: 4,
                                            title: "style.layout.candle.gradient",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.candle.gradient.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "underlayer",
                                                    attr: "style.layout.candle.gradient.underlayer",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
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
                                            defaultVal: "0.5",
                                            min: 0.1,
                                            max: 12,
                                            step: 0.1,
                                        },
                                        {
                                            attr: "verticalLines",
                                            level: 4,
                                            title: "style.layout.grid.verticalLines",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.grid.verticalLines.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.layout.grid.verticalLines.strokeDasharray",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.layout.grid.verticalLines.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0.5",
                                                    min: 0.1,
                                                    max: 6,
                                                    step: 0.01,
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.layout.grid.verticalLines.stroke",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "horizontalLines",
                                            level: 4,
                                            title: "style.layout.grid.horizontalLines",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.layout.grid.horizontalLines.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.layout.grid.horizontalLines.strokeDasharray",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.layout.grid.horizontalLines.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0.5",
                                                    min: 0.1,
                                                    max: 6,
                                                    step: 0.01,
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.layout.grid.horizontalLines.stroke",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "xAxis",
                                            level: 4,
                                            title: "style.layout.grid.xAxis",
                                            children: [
                                                {
                                                    attr: "ticks",
                                                    level: 5,
                                                    title: "style.layout.grid.xAxis.ticks",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.layout.grid.xAxis.ticks.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "dataLabels",
                                                    level: 5,
                                                    title: "style.layout.grid.xAxis.dataLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.layout.grid.xAxis.dataLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.layout.grid.xAxis.dataLabels.fontSize",
                                                            type: "number",
                                                            defaultVal: "4",
                                                            min: 8,
                                                            max: 42,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.layout.grid.xAxis.dataLabels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.layout.grid.xAxis.dataLabels.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.layout.grid.xAxis.dataLabels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "rotation",
                                                            attr: "style.layout.grid.xAxis.dataLabels.rotation",
                                                            type: "range",
                                                            defaultVal: "0",
                                                            min: -90,
                                                            max: 90,
                                                        },
                                                        {
                                                            attr: "autoRotate",
                                                            title: "style.layout.grid.xAxis.dataLabels.autoRotate",
                                                            children: [
                                                                {
                                                                    name: "enable",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                    attr: "style.layout.grid.xAxis.dataLabels.autoRotate.enable",
                                                                },
                                                                {
                                                                    name: "angle",
                                                                    type: "number",
                                                                    min: -90,
                                                                    max: 90,
                                                                    attr: "style.layout.grid.xAxis.dataLabels.autoRotate.angle",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            attr: "datetimeFormatter",
                                                            level: 6,
                                                            title: "style.layout.grid.xAxis.dataLabels.datetimeFormatter",
                                                            children: [
                                                                {
                                                                    name: "enable",
                                                                    attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.enable",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "locale",
                                                                    attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.locale",
                                                                    type: "select",
                                                                    defaultVal:
                                                                        "en",
                                                                    options:
                                                                        store.locales,
                                                                },
                                                                {
                                                                    name: "useUTC",
                                                                    attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.useUTC",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    name: "januaryAsYear",
                                                                    attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.januaryAsYear",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "false",
                                                                },
                                                                {
                                                                    attr: "options",
                                                                    level: 6,
                                                                    title: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.options",
                                                                    children: [
                                                                        {
                                                                            name: "year",
                                                                            attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.options.year",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "yyyy",
                                                                        },
                                                                        {
                                                                            name: "month",
                                                                            attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.options.month",
                                                                            type: "text",
                                                                            defaultVal: `MMM 'yy`,
                                                                        },
                                                                        {
                                                                            name: "day",
                                                                            attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.options.day",
                                                                            type: "text",
                                                                            defaultVal: `dd MMM`,
                                                                        },
                                                                        {
                                                                            name: "minute",
                                                                            attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.options.minute",
                                                                            type: "text",
                                                                            defaultVal: `HH:mm:ss`,
                                                                        },
                                                                        {
                                                                            name: "second",
                                                                            attr: "style.layout.grid.xAxis.dataLabels.datetimeFormatter.options.second",
                                                                            type: "text",
                                                                            defaultVal: `HH:mm:ss`,
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            name: "showOnlyFirstAndLast",
                                                            attr: "style.layout.grid.xAxis.dataLabels.showOnlyFirstAndLast",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "showFirstAndLast",
                                                            attr: "style.layout.grid.xAxis.dataLabels.showFirstAndLast",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                            comment:
                                                                "Since v3.25.0",
                                                        },
                                                        {
                                                            name: "showOnlyAtModulo",
                                                            attr: "style.layout.grid.xAxis.dataLabels.showOnlyAtModulo",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "modulo",
                                                            attr: "style.layout.grid.xAxis.dataLabels.modulo",
                                                            type: "number",
                                                            defaultVal: "2",
                                                            min: 2,
                                                            max: 24,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "yAxis",
                                            level: 4,
                                            title: "style.layout.grid.yAxis",
                                            children: [
                                                {
                                                    name: "position",
                                                    attr: "style.layout.grid.yAxis.position",
                                                    type: "select",
                                                    options: ["left", "right"],
                                                    defaultVal: "left",
                                                },
                                                {
                                                    attr: "scale",
                                                    level: 5,
                                                    title: "style.layout.grid.yAxis.scale",
                                                    children: [
                                                        {
                                                            name: "min",
                                                            attr: "style.layout.grid.yAxis.scale.min",
                                                            type: "number",
                                                            min: 0,
                                                            max: 10000000,
                                                            defaultVal: "null",
                                                        },
                                                        {
                                                            name: "max",
                                                            attr: "style.layout.grid.yAxis.scale.max",
                                                            type: "number",
                                                            min: 0,
                                                            max: 10000000,
                                                            defaultVal: "null",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "dataLabels",
                                                    level: 5,
                                                    title: "style.layout.grid.yAxis.dataLabels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.layout.grid.yAxis.dataLabels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.layout.grid.yAxis.dataLabels.fontSize",
                                                            type: "number",
                                                            defaultVal: "12",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.layout.grid.yAxis.dataLabels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "roundingValue",
                                                            attr: "style.layout.grid.yAxis.dataLabels.roundingValue",
                                                            type: "number",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "offsetX",
                                                            attr: "style.layout.grid.yAxis.dataLabels.offsetX",
                                                            type: "number",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.layout.grid.yAxis.dataLabels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "steps",
                                                            attr: "style.layout.grid.yAxis.dataLabels.steps",
                                                            type: "number",
                                                            defaultVal: "10",
                                                            min: 2,
                                                            max: 20,
                                                        },
                                                        {
                                                            name: "prefix",
                                                            attr: "style.layout.grid.yAxis.dataLabels.prefix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "suffix",
                                                            attr: "style.layout.grid.yAxis.dataLabels.suffix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                    ],
                                                },
                                            ],
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
                                            defaultVal: "36",
                                            min: 0,
                                            max: 100,
                                        },
                                        {
                                            name: "right",
                                            attr: "style.layout.padding.right",
                                            type: "number",
                                            defaultVal: "48",
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
                                            defaultVal: "48",
                                            min: 0,
                                            max: 100,
                                        },
                                    ],
                                },
                                {
                                    attr: "selector",
                                    level: 3,
                                    title: "style.layout.selector",
                                    children: [
                                        {
                                            name: "color",
                                            attr: "style.layout.selector.color",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "opacity",
                                            attr: "style.layout.selector.opacity",
                                            type: "range",
                                            defaultVal: "10",
                                            min: 0,
                                            max: 30,
                                        },
                                    ],
                                },
                                {
                                    attr: "wick",
                                    level: 3,
                                    title: "style.layout.wick",
                                    children: [
                                        {
                                            name: "stroke",
                                            attr: "style.layout.wick.stroke",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.layout.wick.strokeWidth",
                                            type: "number",
                                            defaultVal: "0.5",
                                            min: 0.1,
                                            max: 12,
                                            step: 0.1,
                                        },
                                        {
                                            attr: "extremity",
                                            level: 4,
                                            title: "style.layout.wick.extremity",
                                            children: [
                                                {
                                                    name: "shape",
                                                    attr: "style.layout.wick.extremity.shape",
                                                    type: "select",
                                                    defaultVal: "line",
                                                    options: ["line", "circle"],
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.layout.wick.extremity.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "size",
                                                    attr: "style.layout.wick.extremity.size",
                                                    type: "select",
                                                    defaultVal: "auto",
                                                    options: [
                                                        "auto",
                                                        "1",
                                                        "2",
                                                        "4",
                                                        "8",
                                                        "12",
                                                        "16",
                                                        "20",
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
                                    options: ["left", "center", "right"],
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
                                },
                                {
                                    name: "color",
                                    attr: "style.tooltip.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "backgroundColor",
                                    attr: "style.tooltip.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
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
                                    name: "roundingValue",
                                    attr: "style.tooltip.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                                {
                                    name: "prefix",
                                    attr: "style.tooltip.prefix",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "suffix",
                                    attr: "style.tooltip.suffix",
                                    type: "text",
                                    defaultVal: "''",
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
                                    max: 24,
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
                                {
                                    name: "showChart",
                                    attr: "style.tooltip.showChart",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "useDefaultTimeFormat",
                                    attr: "style.tooltip.useDefaultTimeFormat",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "timeFormat",
                                    attr: "style.tooltip.timeFormat",
                                    type: "text",
                                    defaultVal: "'yyyy-MM-dd HH:mm:ss'",
                                },
                            ],
                        },
                        {
                            attr: "zoom",
                            level: 2,
                            title: "style.zoom",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.zoom.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "autoFit",
                                    attr: "style.zoom.autoFit",
                                    type: "checkbox",
                                    defaultVal: "false",
                                    comment: "Since v3.23.1",
                                },
                                {
                                    name: "maxWidth",
                                    attr: "style.zoom.maxWidth",
                                    type: "number",
                                    defaultVal: "null",
                                    min: 200,
                                    max: 800,
                                    step: 50,
                                },
                                {
                                    name: "color",
                                    attr: "style.zoom.color",
                                    type: "color",
                                    defaultVal: "#CCCCCC",
                                },
                                {
                                    name: "highlightColor",
                                    attr: "style.zoom.highlightColor",
                                    type: "color",
                                    defaultVal: "#4A4A4A",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.zoom.fontSize",
                                    type: "number",
                                    defaultVal: "14",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    component: "span",
                                    children: [
                                        { text: "useResetSlot: false, " },
                                        {
                                            component: "span",
                                            class: "text-app-blue text-xs",
                                            children: [
                                                {
                                                    text: "// To use a custom slot for the reset feature (see slots tab)",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    component: "span",
                                    children: [
                                        { text: "startIndex: number | null, " },
                                        {
                                            component: "BaseComment",
                                            children: [
                                                {
                                                    text: "Force zoom start index",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    component: "span",
                                    children: [
                                        { text: "endIndex: number | null, " },
                                        {
                                            component: "BaseComment",
                                            children: [
                                                {
                                                    text: "Force zoom end index",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: "focusOnDrag",
                                    attr: "style.zoom.focusOnDrag",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "focusRangeRatio",
                                    attr: "style.zoom.focusRangeRatio",
                                    type: "number",
                                    defaultVal: "0.2",
                                    min: 0.1,
                                    max: 0.9,
                                    step: 0.1,
                                },
                                {
                                    attr: "minimap",
                                    level: 3,
                                    title: "style.zoom.minimap",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.zoom.minimap.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "selectedColor",
                                            attr: "style.zoom.minimap.selectedColor",
                                            type: "color",
                                            defaultVal: "#1f77b4",
                                        },
                                        {
                                            name: "selectedColorOpacity",
                                            attr: "style.zoom.minimap.selectedColorOpacity",
                                            type: "range",
                                            defaultVal: "0.2",
                                            min: 0,
                                            max: 0.8,
                                            step: 0.01,
                                        },
                                        {
                                            name: "indicatorColor",
                                            attr: "style.zoom.minimap.indicatorColor",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "frameColor",
                                            attr: "style.zoom.minimap.frameColor",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
                                        },
                                        {
                                            name: "additionalHeight",
                                            attr: "style.zoom.minimap.additionalHeight",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 20,
                                            comment: "Since v3.15.0",
                                            onChange: (..._args) => {
                                                return forceChartUpdate(
                                                    ..._args,
                                                );
                                            },
                                        },
                                        {
                                            name: "handleIconColor",
                                            attr: "style.zoom.minimap.handleIconColor",
                                            type: "color",
                                            defaultVal: "null",
                                            comment: "Since v3.15.0",
                                        },
                                        {
                                            name: "handleBorderWidth",
                                            attr: "style.zoom.minimap.handleBorderWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 3,
                                            step: 0.1,
                                            comment: "Since v3.15.0",
                                        },
                                        {
                                            name: "handleBorderColor",
                                            attr: "style.zoom.minimap.handleBorderColor",
                                            type: "color",
                                            defaultVal: "null",
                                            comment: "Since v3.15.0",
                                        },
                                        {
                                            name: "handleFill",
                                            attr: "style.zoom.minimap.handleFill",
                                            type: "color",
                                            defaultVal: "null",
                                            comment: "Since v3.15.0",
                                        },
                                        {
                                            name: "handleWidth",
                                            attr: "style.zoom.minimap.handleWidth",
                                            type: "number",
                                            defaultVal: "20",
                                            min: 20,
                                            max: 40,
                                            comment: "Since v3.15.0",
                                        },
                                        {
                                            name: "handleType",
                                            attr: "style.zoom.minimap.handleType",
                                            type: "select",
                                            defaultVal: "grab",
                                            options: [
                                                "grab",
                                                "chevron",
                                                "arrow",
                                                "empty",
                                            ],
                                            comment: "Since v3.15.0",
                                        },
                                    ],
                                },
                                {
                                    attr: "preview",
                                    level: 3,
                                    title: "style.zoom.preview",
                                    children: [
                                        {
                                            name: "enable",
                                            attr: "style.zoom.preview.enable",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "fill",
                                            attr: "style.zoom.preview.fill",
                                            type: "color",
                                            defaultVal: "#CCCCCC50",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.zoom.preview.stroke",
                                            type: "color",
                                            defaultVal: "#6A6A6A",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.zoom.preview.strokeWidth",
                                            type: "number",
                                            defaultVal: "2",
                                            min: 0,
                                            max: 12,
                                        },
                                        {
                                            name: "strokeDasharray",
                                            attr: "style.zoom.preview.strokeDasharray",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 24,
                                        },
                                    ],
                                },
                                {
                                    attr: "dragToZoom",
                                    level: 3,
                                    title: "style.zoom.dragToZoom",
                                    children: [
                                        {
                                            component: "BaseComment",
                                            children: [
                                                {
                                                    text: "Drag-to-zoom since v3.26.0",
                                                },
                                            ],
                                        },
                                        {
                                            name: "show",
                                            attr: "style.zoom.dragToZoom.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            attr: "selection",
                                            level: 4,
                                            title: "style.zoom.dragToZoom.selection",
                                            children: [
                                                {
                                                    name: "fill",
                                                    attr: "style.zoom.dragToZoom.selection.fill",
                                                    type: "color",
                                                    defaultVal: "#1f77b4",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.zoom.dragToZoom.selection.stroke",
                                                    type: "color",
                                                    defaultVal: "#A1A1A1",
                                                },
                                                {
                                                    name: "fillOpacity",
                                                    attr: "style.zoom.dragToZoom.selection.fillOpacity",
                                                    type: "number",
                                                    defaultVal: "0.2",
                                                    min: 0.1,
                                                    max: 0.5,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "strokeOpacity",
                                                    attr: "style.zoom.dragToZoom.selection.strokeOpacity",
                                                    type: "number",
                                                    defaultVal: "0.5",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.zoom.dragToZoom.selection.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "1",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "strokeDasharray",
                                                    attr: "style.zoom.dragToZoom.selection.strokeDasharray",
                                                    type: "text",
                                                    defaultVal: "0",
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
                                {
                                    name: "roundingValue",
                                    attr: "table.td.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                                {
                                    name: "prefix",
                                    attr: "table.td.prefix",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "suffix",
                                    attr: "table.td.suffix",
                                    type: "text",
                                    defaultVal: "''",
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
                            name: "period",
                            attr: "translations.period",
                            type: "text",
                            defaultVal: "Period",
                        },
                        {
                            name: "open",
                            attr: "translations.open",
                            type: "text",
                            defaultVal: "Open",
                        },
                        {
                            name: "high",
                            attr: "translations.high",
                            type: "text",
                            defaultVal: "High",
                        },
                        {
                            name: "low",
                            attr: "translations.low",
                            type: "text",
                            defaultVal: "Low",
                        },
                        {
                            name: "close",
                            attr: "translations.close",
                            type: "text",
                            defaultVal: "Close",
                        },
                        {
                            name: "volume",
                            attr: "translations.volume",
                            type: "text",
                            defaultVal: "Volume",
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
