// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiGaugeConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiGaugeConfig",
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
                                    attr: "animation",
                                    level: 3,
                                    title: "style.chart.animation",
                                    children: [
                                        {
                                            name: "use",
                                            attr: "style.chart.animation.use",
                                            type: "checkbox",
                                            defaultVal: "true",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "speed",
                                            attr: "style.chart.animation.speed",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 1,
                                            max: 100,
                                            step: 1,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "acceleration",
                                            attr: "style.chart.animation.acceleration",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0.1,
                                            max: 5,
                                            step: 0.01,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                    ],
                                },
                                {
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            name: "radiusRatio",
                                            attr: "style.chart.layout.radiusRatio",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0.5,
                                            max: 1,
                                            step: 0.01,
                                        },
                                        {
                                            attr: "markers",
                                            level: 4,
                                            title: "style.chart.layout.markers",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.markers.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.layout.markers.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.layout.markers.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.markers.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.markers.bold",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSizeRatio",
                                                    attr: "style.chart.layout.markers.fontSizeRatio",
                                                    type: "range",
                                                    defaultVal: "1",
                                                    min: 0.5,
                                                    max: 2,
                                                    step: 0.1,
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.layout.markers.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "roundingValue",
                                                    attr: "style.chart.layout.markers.roundingValue",
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
                                            attr: "segmentNames",
                                            level: 4,
                                            title: "style.chart.layout.segmentNames",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.segmentNames.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "curved",
                                                    attr: "style.chart.layout.segmentNames.curved",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "offsetRatio",
                                                    attr: "style.chart.layout.segmentNames.offsetRatio",
                                                    type: "range",
                                                    defaultVal: "1.1",
                                                    min: 0.6,
                                                    max: 1.2,
                                                    step: 0.01,
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.segmentNames.fontSize",
                                                    type: "number",
                                                    defaultVal: "16",
                                                    min: 8,
                                                    max: 42,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "minFontSize",
                                                    attr: "style.chart.layout.segmentNames.minFontSize",
                                                    type: "number",
                                                    defaultVal: "6",
                                                    min: 6,
                                                    max: 42,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "useSerieColor",
                                                    attr: "style.chart.layout.segmentNames.useSerieColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.segmentNames.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.segmentNames.bold",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "segmentSeparators",
                                            level: 4,
                                            title: "style.chart.layout.segmentSeparators",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.segmentSeparators.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "offsetOut",
                                                    attr: "style.chart.layout.segmentSeparators.offsetOut",
                                                    type: "range",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 42,
                                                },
                                                {
                                                    name: "offsetIn",
                                                    attr: "style.chart.layout.segmentSeparators.offsetIn",
                                                    type: "range",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 42,
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.segmentSeparators.stroke",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.segmentSeparators.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 1,
                                                    max: 12,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "indicatorArc",
                                            level: 4,
                                            title: "style.chart.layout.indicatorArc",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.indicatorArc.show",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                    comment: "Since v2.4.90",
                                                },
                                                {
                                                    name: "radius",
                                                    attr: "style.chart.layout.indicatorArc.radius",
                                                    type: "range",
                                                    defaultVal: "123",
                                                    min: 0,
                                                    max: 200,
                                                    comment: "Since v2.4.90",
                                                },
                                                {
                                                    name: "fill",
                                                    attr: "style.chart.layout.indicatorArc.fill",
                                                    type: "color",
                                                    defaultVal: "#E1E5E8",
                                                    comment: "Since v2.4.90",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "pointer",
                                            level: 4,
                                            title: "style.chart.layout.pointer",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.pointer.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                    comment: "Since v2.4.90",
                                                },
                                                {
                                                    name: "type",
                                                    attr: "style.chart.layout.pointer.type",
                                                    type: "select",
                                                    defaultVal: "rounded",
                                                    options: [
                                                        "rounded",
                                                        "pointy",
                                                    ],
                                                },
                                                {
                                                    name: "size",
                                                    attr: "style.chart.layout.pointer.size",
                                                    type: "range",
                                                    defaultVal: "1",
                                                    min: 0.5,
                                                    max: 1.4,
                                                    step: 0.1,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.pointer.stroke",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.pointer.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "12",
                                                    min: 0,
                                                    max: 12,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                    comment:
                                                        "Usable with pointer type rounded",
                                                },
                                                {
                                                    name: "useRatingColor",
                                                    attr: "style.chart.layout.pointer.useRatingColor",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.pointer.color",
                                                    type: "color",
                                                    defaultVal: "#CCCCCC",
                                                    comment:
                                                        "With useRatingColor set to false",
                                                },
                                                {
                                                    attr: "circle",
                                                    level: 5,
                                                    title: "style.chart.layout.pointer.circle",
                                                    children: [
                                                        {
                                                            name: "radius",
                                                            attr: "style.chart.layout.pointer.circle.radius",
                                                            type: "number",
                                                            defaultVal: "10",
                                                            min: 0,
                                                            max: 24,
                                                            onChange: (
                                                                ..._args
                                                            ) => {
                                                                return forceChartUpdate();
                                                            },
                                                        },
                                                        {
                                                            name: "stroke",
                                                            attr: "style.chart.layout.pointer.circle.stroke",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.pointer.circle.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "2",
                                                            min: 0,
                                                            max: 24,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.pointer.circle.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "track",
                                            level: 4,
                                            title: "style.chart.layout.track",
                                            children: [
                                                {
                                                    name: "size",
                                                    attr: "style.chart.layout.track.size",
                                                    type: "range",
                                                    defaultVal: "1",
                                                    min: 0.5,
                                                    max: 4.5,
                                                    step: 0.1,
                                                    onChange: (..._args) => {
                                                        return forceChartUpdate();
                                                    },
                                                },
                                                {
                                                    name: "useGradient",
                                                    attr: "style.chart.layout.track.useGradient",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "gradientIntensity",
                                                    attr: "style.chart.layout.track.gradientIntensity",
                                                    type: "range",
                                                    defaultVal: "20",
                                                    min: 8,
                                                    max: 20,
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
                                            name: "fontSize",
                                            attr: "style.chart.legend.fontSize",
                                            type: "number",
                                            defaultVal: "48",
                                            min: 8,
                                            max: 100,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "prefix",
                                            attr: "style.chart.legend.prefix",
                                            type: "text",
                                            defaultVal: "''",
                                        },
                                        {
                                            name: "suffix",
                                            attr: "style.chart.legend.suffix",
                                            type: "text",
                                            defaultVal: "''",
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
                                            name: "showPlusSymbol",
                                            attr: "style.chart.legend.showPlusSymbol",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "useRatingColor",
                                            attr: "style.chart.legend.useRatingColor",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.legend.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            comment:
                                                "With useRatingColor set to false",
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
                            ],
                        },
                    ],
                },
                {
                    attr: "translations",
                    level: 1,
                    children: [
                        {
                            name: "base",
                            attr: "translations.base",
                            type: "text",
                            defaultVal: "Base",
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
                                    name: "pdf",
                                    attr: "userOptions.buttonTitles.pdf",
                                    type: "text",
                                    defaultVal: "Download PDF",
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
