// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiSparklineConfigFields({
    forceChartUpdate,
    goToPage,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiSparklineConfig",
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
                    inactive: true,
                    name: "responsive",
                    defaultVal: "false",
                    comment: translations.responsive[store.lang],
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
                    name: "type",
                    attr: "type",
                    type: "select",
                    defaultVal: "line",
                    options: ["line", "bar"],
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
                    attr: "temperatureColors",
                    level: 1,
                    children: [
                        {
                            name: "show",
                            attr: "temperatureColors.show",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "colors",
                            inactive: true,
                            attr: "colors",
                            defaultVal: "['#34eb96', '#eb4034']",
                            comment: "Any number of colors can be provided",
                        },
                    ],
                },
                {
                    attr: "gradientPath",
                    level: 1,
                    children: [
                        {
                            component: "BaseComment",
                            children: [{ text: "Experimental" }],
                        },
                        {
                            name: "show",
                            attr: "gradientPath.show",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "segments",
                            attr: "gradientPath.segments",
                            type: "number",
                            defaultVal: "256",
                            min: 4,
                            max: 256,
                            step: 4,
                            comment:
                                "The number of additional DOM nodes the gradient path will add. Be aware of that",
                        },
                        {
                            attr: "colors",
                            level: 2,
                            title: "gradientPath.colors",
                            children: [
                                {
                                    name: "high",
                                    attr: "gradientPath.colors.high",
                                    type: "color",
                                    defaultVal: "#34eb96",
                                },
                                {
                                    name: "low",
                                    attr: "gradientPath.colors.low",
                                    type: "color",
                                    defaultVal: "#eb4034",
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
                            name: "chartWidth",
                            attr: "style.chartWidth",
                            type: "number",
                            defaultVal: "290",
                            min: 100,
                            max: 400,
                        },
                        {
                            name: "scaleMin",
                            attr: "style.scaleMin",
                            type: "number",
                            defaultVal: "null",
                            min: -1000,
                            max: 0,
                            comment: "Since v2.4.62 - Force the min scale",
                        },
                        {
                            name: "scaleMax",
                            attr: "style.scaleMax",
                            type: "number",
                            defaultVal: "null",
                            min: 0,
                            max: 1000,
                            comment: "Since v2.4.62 - Force the max scale",
                        },
                        {
                            attr: "padding",
                            level: 2,
                            title: "style.padding",
                            children: [
                                {
                                    name: "top",
                                    attr: "style.padding.top",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 36,
                                    comment: "Since v2.4.62",
                                },
                                {
                                    name: "right",
                                    attr: "style.padding.right",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 36,
                                    comment: "Since v2.4.62",
                                },
                                {
                                    name: "bottom",
                                    attr: "style.padding.bottom",
                                    type: "number",
                                    defaultVal: "3",
                                    min: 0,
                                    max: 36,
                                    comment: "Since v2.4.62",
                                },
                                {
                                    name: "left",
                                    attr: "style.padding.left",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 36,
                                    comment: "Since v2.4.62",
                                },
                            ],
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
                                    max: 500,
                                    step: 10,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "area",
                            level: 2,
                            title: "style.area",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.area.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "useGradient",
                                    attr: "style.area.useGradient",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "opacity",
                                    attr: "style.area.opacity",
                                    type: "number",
                                    defaultVal: "30",
                                    min: 0,
                                    max: 100,
                                },
                                {
                                    name: "color",
                                    attr: "style.area.color",
                                    type: "color",
                                    defaultVal: "#5F8BEE",
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
                                    defaultVal: "3",
                                    min: 0,
                                    max: 12,
                                },
                                {
                                    name: "color",
                                    attr: "style.bar.color",
                                    type: "color",
                                    defaultVal: "#5F8BEE",
                                },
                            ],
                        },
                        {
                            attr: "dataLabel",
                            level: 2,
                            title: "style.dataLabel",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.dataLabel.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "position",
                                    attr: "style.dataLabel.position",
                                    type: "select",
                                    defaultVal: "left",
                                    options: ["left", "right"],
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "offsetX",
                                    attr: "style.dataLabel.offsetX",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "offsetY",
                                    attr: "style.dataLabel.offsetY",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.dataLabel.fontSize",
                                    type: "number",
                                    defaultVal: "20",
                                    min: 8,
                                    max: 64,
                                },
                                {
                                    name: "bold",
                                    attr: "style.dataLabel.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "color",
                                    attr: "style.dataLabel.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "roundingValue",
                                    attr: "style.dataLabel.roundingValue",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                                {
                                    name: "valueType",
                                    attr: "style.dataLabel.valueType",
                                    type: "select",
                                    defaultVal: "latest",
                                    options: ["latest", "sum", "average"],
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "prefix",
                                    attr: "style.dataLabel.prefix",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "suffix",
                                    attr: "style.dataLabel.suffix",
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
                                                translations.formatterLink[
                                                    store.lang
                                                ],
                                        },
                                        {
                                            component: "div",
                                            class: "min-w-[200px]",
                                            children: [
                                                {
                                                    component: "BaseTabLink",
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
                                    attr: "datetimeFormatter",
                                    level: 6,
                                    title: "style.dataLabel.datetimeFormatter",
                                    children: [
                                        {
                                            name: "enable",
                                            attr: "style.dataLabel.datetimeFormatter.enable",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "locale",
                                            attr: "style.dataLabel.datetimeFormatter.locale",
                                            type: "select",
                                            defaultVal: "en",
                                            options: store.locales,
                                        },
                                        {
                                            name: "useUTC",
                                            attr: "style.dataLabel.datetimeFormatter.useUTC",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "januaryAsYear",
                                            attr: "style.dataLabel.datetimeFormatter.januaryAsYear",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            attr: "options",
                                            level: 7,
                                            title: "style.dataLabel.datetimeFormatter.options",
                                            children: [
                                                {
                                                    name: "year",
                                                    attr: "style.dataLabel.datetimeFormatter.options.year",
                                                    type: "text",
                                                    defaultVal: "yyyy",
                                                },
                                                {
                                                    name: "month",
                                                    attr: "style.dataLabel.datetimeFormatter.options.month",
                                                    type: "text",
                                                    defaultVal: `MMM 'yy`,
                                                },
                                                {
                                                    name: "day",
                                                    attr: "style.dataLabel.datetimeFormatter.options.day",
                                                    type: "text",
                                                    defaultVal: `dd MMM`,
                                                },
                                                {
                                                    name: "minute",
                                                    attr: "style.dataLabel.datetimeFormatter.options.minute",
                                                    type: "text",
                                                    defaultVal: `HH:mm:ss`,
                                                },
                                                {
                                                    name: "second",
                                                    attr: "style.dataLabel.datetimeFormatter.options.second",
                                                    type: "text",
                                                    defaultVal: `HH:mm:ss`,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "line",
                            level: 2,
                            title: "style.line",
                            children: [
                                {
                                    name: "color",
                                    attr: "style.line.color",
                                    type: "color",
                                    defaultVal: "#5F8BEE",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.line.strokeWidth",
                                    type: "number",
                                    defaultVal: "2",
                                    min: 0.1,
                                    max: 10,
                                    step: 0.1,
                                },
                                {
                                    name: "smooth",
                                    attr: "style.line.smooth",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "cutNullValues",
                                    attr: "style.line.cutNullValues",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    inactive: true,
                                    name: "dashIndices",
                                    defaultVal: "[]",
                                },
                                {
                                    name: "dashArray",
                                    attr: "style.line.dashArray",
                                    type: "number",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    attr: "nullDashes",
                                    level: 3,
                                    title: "style.line.nullDashes",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.line.nullDashes.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                    ],
                                },
                                {
                                    attr: "pulse",
                                    level: 3,
                                    title: "style.line.pulse",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.line.pulse.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "loop",
                                            attr: "style.line.pulse.loop",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.line.pulse.color",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "radius",
                                            attr: "style.line.pulse.radius",
                                            type: "number",
                                            defaultVal: "4",
                                            min: 1,
                                            max: 12,
                                        },
                                        {
                                            name: "durationMs",
                                            attr: "style.line.pulse.durationMs",
                                            type: "number",
                                            defaultVal: "4000",
                                            min: 1000,
                                            max: 5000,
                                            step: "500",
                                        },
                                        {
                                            name: "easing",
                                            attr: "style.line.pulse.easing",
                                            type: "select",
                                            defaultVal: "ease-in-out",
                                            options: [
                                                "ease",
                                                "ease-in",
                                                "ease-out",
                                                "ease-in-out",
                                            ],
                                        },
                                        {
                                            attr: "trail",
                                            level: 4,
                                            title: "style.line.pulse.trail",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.line.pulse.trail.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "length",
                                                    attr: "style.line.pulse.trail.length",
                                                    type: "number",
                                                    min: 0,
                                                    max: 45,
                                                    defaultVal: "6",
                                                },
                                                {
                                                    name: "opacity",
                                                    attr: "style.line.pulse.trail.opacity",
                                                    type: "number",
                                                    min: 0,
                                                    max: 1,
                                                    step: 0.1,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "plot",
                            level: 2,
                            title: "style.plot",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.plot.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "radius",
                                    attr: "style.plot.radius",
                                    type: "number",
                                    defaultVal: "4",
                                    min: 1,
                                    max: 20,
                                    step: 0.1,
                                },
                                {
                                    name: "stroke",
                                    attr: "style.plot.stroke",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.plot.strokeWidth",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0,
                                    max: 10,
                                    step: 0.1,
                                },
                            ],
                        },
                        {
                            attr: "title",
                            level: 2,
                            title: "style.title",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.title.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
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
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.title.fontSize",
                                    type: "number",
                                    defaultVal: "16",
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
                                    name: "text",
                                    attr: "style.title.text",
                                    type: "text",
                                    defaultVal: "''",
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
                                    defaultVal: "false",
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
                                    name: "offsetY",
                                    attr: "style.tooltip.offsetY",
                                    type: "number",
                                    min: -30,
                                    max: 30,
                                    defaultVal: "0",
                                },
                                {
                                    name: "borderWidth",
                                    attr: "style.tooltip.borderWidth",
                                    type: "number",
                                    min: 0,
                                    max: 12,
                                    defaultVal: "0",
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
                                    defaultVal: "2",
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
                            ],
                        },
                        {
                            attr: "verticalIndicator",
                            level: 2,
                            title: "style.verticalIndicator",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.verticalIndicator.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.verticalIndicator.strokeWidth",
                                    type: "number",
                                    defaultVal: "1.5",
                                    min: 0.1,
                                    max: 12,
                                    step: 0.1,
                                },
                                {
                                    name: "color",
                                    attr: "style.verticalIndicator.color",
                                    type: "color",
                                    defaultVal: "#5F8BEE",
                                },
                                {
                                    name: "strokeDasharray",
                                    attr: "style.verticalIndicator.strokeDasharray",
                                    type: "number",
                                    defaultVal: "3",
                                    min: 0,
                                    max: 24,
                                },
                            ],
                        },
                        {
                            attr: "zeroLine",
                            level: 2,
                            title: "style.zeroLine",
                            children: [
                                {
                                    name: "color",
                                    attr: "style.zeroLine.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.zeroLine.strokeWidth",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0.1,
                                    max: 12,
                                    step: 0.1,
                                },
                            ],
                        },
                        {
                            attr: "zoom",
                            level: 2,
                            title: "style.zoom",
                            children: [
                                {
                                    component: "BaseComment",
                                    children: [
                                        { text: "Drag-to-zoom since v3.26.0" },
                                    ],
                                },
                                {
                                    name: "show",
                                    attr: "style.zoom.show",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    attr: "selection",
                                    level: 3,
                                    title: "style.zoom.selection",
                                    children: [
                                        {
                                            name: "fill",
                                            attr: "style.zoom.selection.fill",
                                            type: "color",
                                            defaultVal: "#1f77b4",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "style.zoom.selection.stroke",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
                                        },
                                        {
                                            name: "fillOpacity",
                                            attr: "style.zoom.selection.fillOpacity",
                                            type: "number",
                                            defaultVal: "0.2",
                                            min: 0.1,
                                            max: 0.5,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeOpacity",
                                            attr: "style.zoom.selection.strokeOpacity",
                                            type: "number",
                                            defaultVal: "0.5",
                                            min: 0,
                                            max: 1,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "style.zoom.selection.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "strokeDasharray",
                                            attr: "style.zoom.selection.strokeDasharray",
                                            type: "text",
                                            defaultVal: "0",
                                        },
                                    ],
                                },
                                {
                                    attr: "resetButton",
                                    level: 3,
                                    title: "style.zoom.resetButton",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "style.zoom.resetButton.show",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                        {
                                            name: "title",
                                            attr: "style.zoom.resetButton.title",
                                            type: "text",
                                            defaultVal:
                                                "Reset zoom · double-click chart or press Esc",
                                        },
                                        {
                                            name: "ariaLabel",
                                            attr: "style.zoom.resetButton.ariaLabel",
                                            type: "text",
                                            defaultVal: "Reset zoom",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.zoom.resetButton.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
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
