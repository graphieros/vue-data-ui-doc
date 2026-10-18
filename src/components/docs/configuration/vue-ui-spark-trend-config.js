// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiSparkTrendConfigFields({
    forceChartUpdate,
    goToPage,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiSparkTrendConfig",
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
                            attr: "animation",
                            level: 2,
                            title: "style.animation",
                            children: [
                                {
                                    name: "animation",
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
                                    defaultVal: "20",
                                    min: 5,
                                    max: 60,
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
                                    type: "range",
                                    defaultVal: "20",
                                    min: 0,
                                    max: 100,
                                },
                            ],
                        },
                        {
                            attr: "arrow",
                            level: 2,
                            title: "style.arrow",
                            children: [
                                {
                                    attr: "colors",
                                    level: 3,
                                    title: "style.arrow.colors",
                                    children: [
                                        {
                                            name: "positive",
                                            attr: "style.arrow.colors.positive",
                                            type: "color",
                                            defaultVal: "#2CA02C",
                                        },
                                        {
                                            name: "neutral",
                                            attr: "style.arrow.colors.neutral",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
                                        },
                                        {
                                            name: "negative",
                                            attr: "style.arrow.colors.negative",
                                            type: "color",
                                            defaultVal: "#DC3912",
                                        },
                                    ],
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
                                    name: "useColorTrend",
                                    attr: "style.dataLabel.useColorTrend",
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
                                    name: "fontSize",
                                    attr: "style.dataLabel.fontSize",
                                    type: "number",
                                    defaultVal: "14",
                                    min: 6,
                                    max: 42,
                                },
                                {
                                    name: "bold",
                                    attr: "style.dataLabel.bold",
                                    type: "checkbox",
                                    defaultVal: "false",
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
                                    name: "rounding",
                                    attr: "style.dataLabel.rounding",
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
                            ],
                        },
                        {
                            attr: "line",
                            level: 2,
                            title: "style.line",
                            children: [
                                {
                                    name: "useColorTrend",
                                    attr: "style.line.useColorTrend",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "stroke",
                                    attr: "style.line.stroke",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.line.strokeWidth",
                                    type: "number",
                                    defaultVal: "2",
                                    min: 0.1,
                                    max: 12,
                                    step: 0.1,
                                },
                                {
                                    name: "strokeLinecap",
                                    attr: "style.line.strokeLinecap",
                                    type: "select",
                                    defaultVal: "round",
                                    options: ["round", "square", "butt"],
                                },
                                {
                                    name: "strokeLinejoin",
                                    attr: "style.line.strokeLinejoin",
                                    type: "select",
                                    defaultVal: "round",
                                    options: [
                                        "round",
                                        "bevel",
                                        "arcs",
                                        "miter",
                                        "miter-clip",
                                    ],
                                },
                                {
                                    name: "smooth",
                                    attr: "style.line.smooth",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                            ],
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
                                    max: 120,
                                },
                                {
                                    name: "right",
                                    attr: "style.padding.right",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 120,
                                },
                                {
                                    name: "bottom",
                                    attr: "style.padding.bottom",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 0,
                                    max: 120,
                                },
                                {
                                    name: "left",
                                    attr: "style.padding.left",
                                    type: "number",
                                    defaultVal: "82",
                                    min: 0,
                                    max: 120,
                                },
                            ],
                        },
                        {
                            attr: "trendLabel",
                            level: 2,
                            title: "style.trendLabel",
                            children: [
                                {
                                    name: "trendType",
                                    attr: "style.trendLabel.trendType",
                                    type: "select",
                                    defaultVal: "global",
                                    options: ["global", "n-1", "lastToFirst"],
                                },
                                {
                                    name: "useColorTrend",
                                    attr: "style.trendLabel.useColorTrend",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "color",
                                    attr: "style.trendLabel.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.trendLabel.fontSize",
                                    type: "number",
                                    defaultVal: "14",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "bold",
                                    attr: "style.trendLabel.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "rounding",
                                    attr: "style.trendLabel.rounding",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
