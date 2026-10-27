// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiRelationCircleConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiRelationCircleConfig",
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
                {
                    inactive: true,
                    name: "customPalette",
                    defaultVal: "[]",
                    comment: "string[]",
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
                    children: [
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
                            component: "span",
                            children: [{ text: 'fontFamily: "inherit",' }],
                        },
                        {
                            name: "size",
                            attr: "style.size",
                            type: "number",
                            defaultVal: "400",
                            min: 200,
                            max: 1000,
                            step: 10,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "limit",
                            attr: "style.limit",
                            type: "range",
                            defaultVal: "50",
                            min: 3,
                            max: 180,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                            comment:
                                translations.docs.comments.relationCircle.limit[
                                    store.lang
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
                                    comment:
                                        "Animation visible when clicking a word",
                                },
                                {
                                    name: "speedMs",
                                    attr: "style.animation.speedMs",
                                    type: "number",
                                    defaultVal: "300",
                                    min: 0,
                                    max: 1000,
                                    step: 100,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "circle",
                            level: 2,
                            title: "style.circle",
                            children: [
                                {
                                    name: "radiusProportion",
                                    attr: "style.circle.radiusProportion",
                                    type: "range",
                                    defaultVal: "0.2",
                                    min: 0.05,
                                    max: 0.4,
                                    step: 0.01,
                                    onChange: (..._args) => {
                                        return forceChartUpdate(..._args);
                                    },
                                },
                                {
                                    name: "stroke",
                                    attr: "style.circle.stroke",
                                    type: "color",
                                    defaultVal: "#CCCCCC",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "style.circle.strokeWidth",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0.1,
                                    max: 12,
                                    step: 0.1,
                                },
                                {
                                    name: "offsetY",
                                    attr: "style.circle.offsetY",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "labels",
                            level: 2,
                            title: "style.labels",
                            children: [
                                {
                                    name: "color",
                                    attr: "style.labels.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.labels.fontSize",
                                    type: "number",
                                    defaultVal: "10",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "minFontSize",
                                    attr: "style.labels.minFontSize",
                                    type: "number",
                                    defaultVal: "6",
                                    min: 6,
                                    max: 42,
                                },
                            ],
                        },
                        {
                            attr: "weightLabels",
                            level: 2,
                            title: "style.weightLabels",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.weightLabels.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "size",
                                    attr: "style.weightLabels.size",
                                    type: "number",
                                    defaultVal: "8",
                                    min: 2,
                                    max: 42,
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
                                    name: "prefix",
                                    attr: "style.weightLabels.prefix",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "suffix",
                                    attr: "style.weightLabels.suffix",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    name: "rounding",
                                    attr: "style.weightLabels.rounding",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 6,
                                },
                            ],
                        },
                        {
                            attr: "links",
                            level: 2,
                            title: "style.links",
                            children: [
                                {
                                    name: "curved",
                                    attr: "style.links.curved",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "maxWidth",
                                    attr: "style.links.maxWidth",
                                    type: "number",
                                    defaultVal: "3",
                                    min: 0,
                                    max: 24,
                                },
                            ],
                        },
                        {
                            attr: "plot",
                            level: 2,
                            title: "style.plot",
                            children: [
                                {
                                    name: "radius",
                                    attr: "style.plot.radius",
                                    type: "range",
                                    defaultVal: "2",
                                    min: 0,
                                    max: 12,
                                    step: 0.1,
                                },
                                {
                                    name: "useSerieColor",
                                    attr: "style.plot.useSerieColor",
                                    type: "boolean",
                                    defaultVal: "true",
                                },
                                {
                                    name: "color",
                                    attr: "style.plot.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                            ],
                        },
                        {
                            attr: "title",
                            level: 2,
                            title: "style.title",
                            children: [
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
                                    name: "text",
                                    attr: "style.title.text",
                                    type: "text",
                                    defaultVal: "''",
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
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
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
                                            name: "fontSize",
                                            attr: "style.title.subtitle.fontSize",
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
