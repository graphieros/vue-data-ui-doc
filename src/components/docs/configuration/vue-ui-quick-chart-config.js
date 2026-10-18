// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiQuickChartConfigFields({
    forceChartUpdate,
    icons,
    isDarkMode,
    config,

    palette,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiQuickChartConfig",
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
                    name: "useCursorPointer",
                    attr: "useCursorPointer",
                    type: "checkbox",
                    defaultVal: "false",
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
                    name: "axisLabelsFontSize",
                    attr: "axisLabelsFontSize",
                    type: "number",
                    defaultVal: "12",
                    min: 8,
                    max: 42,
                },
                {
                    name: "backgroundColor",
                    attr: "backgroundColor",
                    type: "color",
                    defaultVal: "#FFFFFF",
                },
                {
                    component: "div",
                    class: "py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2",
                    children: [
                        {
                            component: "span",
                            class: "font-black text-black dark:text-app-blue inline-flex gap-2",
                            children: [
                                {
                                    component: "VueUiIcon",
                                    name: "chartBar",
                                    stroke: isDarkMode ? "#CCCCCC" : "#1A1A1A",
                                },
                                { text: " Bar specific attributes:" },
                            ],
                        },
                        {
                            name: "barAnimated",
                            attr: "barAnimated",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "barGap",
                            attr: "barGap",
                            type: "number",
                            defaultVal: "12",
                            min: 0,
                            max: 24,
                        },
                        {
                            name: "barStrokeWidth",
                            attr: "barStrokeWidth",
                            type: "number",
                            defaultVal: "1",
                            min: 0,
                            max: 12,
                        },
                    ],
                },
                {
                    name: "chartIsBarUnderDatasetLength",
                    attr: "chartIsBarUnderDatasetLength",
                    type: "number",
                    defaultVal: "6",
                    min: 1,
                    max: 24,
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "color",
                    attr: "color",
                    type: "color",
                    defaultVal: "#2D353C",
                },
                {
                    component: "span",
                    children: [
                        { text: "customPalette: []; " },
                        {
                            component: "span",
                            class: "text-app-blue break-keep text-xs",
                            children: [{ text: "// string[]" }],
                        },
                    ],
                },
                {
                    name: "dataLabelFontSize",
                    attr: "dataLabelFontSize",
                    type: "number",
                    defaultVal: "14",
                    min: 8,
                    max: 42,
                },
                {
                    name: "dataLabelRoundingPercentage",
                    attr: "dataLabelRoundingPercentage",
                    type: "number",
                    defaultVal: "1",
                    min: 0,
                    max: 6,
                },
                {
                    name: "dataLabelRoundingValue",
                    attr: "dataLabelRoundingValue",
                    type: "number",
                    defaultVal: "0",
                    min: 0,
                    max: 6,
                },
                {
                    component: "div",
                    class: "py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2",
                    children: [
                        {
                            component: "span",
                            class: "font-black text-black dark:text-app-blue inline-flex gap-2",
                            children: [
                                {
                                    component: "VueUiIcon",
                                    name: "chartDonut",
                                    stroke: isDarkMode ? "#CCCCCC" : "#1A1A1A",
                                },
                                { text: " Donut specific attributes:" },
                            ],
                        },
                        {
                            name: "blurOnHover",
                            attr: "blurOnHover",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "donutHideLabelUnderPercentage",
                            attr: "donutHideLabelUnderPercentage",
                            type: "number",
                            defaultVal: "3",
                            min: 1,
                            max: 10,
                        },
                        {
                            name: "donutLabelMarkerStrokeWidth",
                            attr: "donutLabelMarkerStrokeWidth",
                            type: "number",
                            defaultVal: "1",
                            min: 0,
                            max: 12,
                        },
                        {
                            name: "donutRadiusRatio",
                            attr: "donutRadiusRatio",
                            type: "range",
                            defaultVal: "0.4",
                            min: 0.2,
                            max: 0.5,
                            step: 0.01,
                        },
                        {
                            name: "donutCurvedMarkers",
                            attr: "donutCurvedMarkers",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "donutShowTotal",
                            attr: "donutShowTotal",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "donutStrokeWidth",
                            attr: "donutStrokeWidth",
                            type: "number",
                            defaultVal: "2",
                            min: 0,
                            max: 12,
                        },
                        {
                            name: "donutStroke",
                            attr: "donutStroke",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "donutThicknessRatio",
                            attr: "donutThicknessRatio",
                            type: "range",
                            defaultVal: "0.18",
                            min: 0.01,
                            max: 0.4,
                            step: 0.01,
                        },
                        {
                            name: "donutTotalLabelFontSize",
                            attr: "donutTotalLabelFontSize",
                            type: "number",
                            defaultVal: "24",
                            min: 8,
                            max: 42,
                        },
                        {
                            name: "donutTotalLabelText",
                            attr: "donutTotalLabelText",
                            type: "text",
                            defaultVal: "Total",
                        },
                        {
                            name: "donutUseShadow",
                            attr: "donutUseShadow",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "donutShadowColor",
                            attr: "donutShadowColor",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                    ],
                },
                { inactive: true, name: "fontFamily", defaultVal: "'inherit'" },
                {
                    component: "div",
                    class: "flex flex-row gap-2 place-items-center",
                    children: [
                        {
                            inactive: true,
                            name: "formatter",
                            defaultVal: "null",
                            comment: translations.formatterLink[store.lang],
                        },
                        {
                            component: "div",
                            class: "min-w-[200px]",
                            children: [
                                {
                                    component: "BaseTabLink",
                                    action: () =>
                                        goToPage("/customization#formatter"),
                                    icon: "cursor",
                                    children: [{ text: " Go to page " }],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "height",
                    attr: "height",
                    type: "number",
                    defaultVal: "338",
                    min: 100,
                    max: 600,
                },
                {
                    name: "legendFontSize",
                    attr: "legendFontSize",
                    type: "number",
                    defaultVal: "12",
                    min: 8,
                    max: 42,
                },
                {
                    name: "legendIcon",
                    attr: "legendIcon",
                    type: "select",
                    defaultVal: "circleFill",
                    options: icons,
                },
                {
                    name: "legendIconSize",
                    attr: "legendIconSize",
                    type: "number",
                    defaultVal: "12",
                    min: 8,
                    max: 42,
                },
                {
                    name: "legendPosition",
                    attr: "legendPosition",
                    type: "select",
                    defaultVal: "bottom",
                    options: ["top", "bottom"],
                },
                {
                    name: "showLegendSelectAllToggle",
                    attr: "showLegendSelectAllToggle",
                    type: "checkbox",
                    defaultVal: "false",
                },
                {
                    name: "legendSelectAllToggleBackgroundColor",
                    attr: "legendSelectAllToggleBackgroundColor",
                    type: "color",
                    defaultVal: "#E1E5E8",
                },
                {
                    name: "legendSelectAllToggleColor",
                    attr: "legendSelectAllToggleColor",
                    type: "color",
                    defaultVal: "#2Z353C",
                },
                {
                    component: "div",
                    class: "py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2",
                    children: [
                        {
                            component: "span",
                            class: "font-black text-black dark:text-app-blue inline-flex gap-2",
                            children: [
                                {
                                    component: "VueUiIcon",
                                    name: "chartLine",
                                    stroke: isDarkMode ? "#CCCCCC" : "#1A1A1A",
                                },
                                { text: " Line specific attributes:" },
                            ],
                        },
                        {
                            name: "lineAnimated",
                            attr: "lineAnimated",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "lineSmooth",
                            attr: "lineSmooth",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "lineStrokeWidth",
                            attr: "lineStrokeWidth",
                            type: "number",
                            defaultVal: "2",
                            min: 1,
                            max: 24,
                        },
                    ],
                },
                {
                    component: "span",
                    class: "inline-flex",
                    children: [
                        {
                            name: "paletteStartIndex",
                            attr: "paletteStartIndex",
                            type: "number",
                            defaultVal: "0",
                            min: 0,
                            max: 39,
                        },
                        ...(isDarkMode
                            ? [
                                  {
                                      component: "div",
                                      class: "ml-4",
                                      children: Array.from(
                                          { length: 6 },
                                          (_, i) => ({
                                              component: "div",
                                              class: "inline-flex border border-black",
                                              style: {
                                                  background:
                                                      palette[
                                                          config.paletteStartIndex +
                                                              i
                                                      ],
                                                  height: "18px",
                                                  width: "18px",
                                                  borderRadius: "50%",
                                              },
                                          }),
                                      ),
                                  },
                              ]
                            : []),
                        ...(!isDarkMode
                            ? [
                                  {
                                      component: "div",
                                      children: Array.from(
                                          { length: 6 },
                                          (_, i) => ({
                                              component: "div",
                                              class: "inline-flex border border-white",
                                              style: {
                                                  background:
                                                      palette[
                                                          config.paletteStartIndex +
                                                              i
                                                      ],
                                                  height: "18px",
                                                  width: "18px",
                                                  borderRadius: "50%",
                                              },
                                          }),
                                      ),
                                  },
                              ]
                            : []),
                    ],
                },
                {
                    name: "showDataLabels",
                    attr: "showDataLabels",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "showLegend",
                    attr: "showLegend",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "showTooltip",
                    attr: "showTooltip",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "showUserOptions",
                    attr: "showUserOptions",
                    defaultVal: "true",
                    type: "checkbox",
                },
                {
                    name: "showUserOptionsOnChartHover",
                    attr: "showUserOptionsOnChartHover",
                    defaultVal: "false",
                    type: "checkbox",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "keepUserOptionsStateOnChartLeave",
                    attr: "keepUserOptionsStateOnChartLeave",
                    defaultVal: "false",
                    type: "checkbox",
                    onChange: (..._args) => {
                        return forceChartUpdate();
                    },
                },
                {
                    name: "userOptionsPosition",
                    attr: "userOptionsPosition",
                    type: "select",
                    defaultVal: "right",
                    options: ["right", "left"],
                },
                {
                    attr: "userOptionsButtons",
                    level: 1,
                    children: [
                        {
                            name: "tooltip",
                            attr: "userOptionsButtons.tooltip",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "pdf",
                            attr: "userOptionsButtons.pdf",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "img",
                            attr: "userOptionsButtons.img",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "fullscreen",
                            attr: "userOptionsButtons.fullscreen",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "annotator",
                            attr: "userOptionsButtons.annotator",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                    ],
                },
                {
                    attr: "userOptionsButtonTitles",
                    level: 1,
                    children: [
                        {
                            name: "open",
                            attr: "userOptionsButtonTitles.open",
                            type: "text",
                            defaultVal: "Open options",
                        },
                        {
                            name: "close",
                            attr: "userOptionsButtonTitles.close",
                            type: "text",
                            defaultVal: "Close options",
                        },
                        {
                            name: "tooltip",
                            attr: "userOptionsButtonTitles.tooltip",
                            type: "text",
                            defaultVal: "Toggle tooltip",
                        },
                        {
                            name: "pdf",
                            attr: "userOptionsButtonTitles.pdf",
                            type: "text",
                            defaultVal: "Download PDF",
                        },
                        {
                            name: "img",
                            attr: "userOptionsButtonTitles.img",
                            type: "text",
                            defaultVal: "Download PNG",
                        },
                        {
                            name: "fullscreen",
                            attr: "userOptionsButtonTitles.fullscreen",
                            type: "text",
                            defaultVal: "Toggle fullscreen",
                        },
                        {
                            name: "annotator",
                            attr: "userOptionsButtonTitles.annotator",
                            type: "text",
                            defaultVal: "Toggle annotator",
                        },
                    ],
                },
                {
                    attr: "userOptionsCallbacks",
                    level: 1,
                    children: [
                        {
                            component: "BaseTabLink",
                            action: () => setActiveTab(11),
                            icon: "lambda",
                            children: [{ text: " Check out 'callbacks' tab " }],
                        },
                    ],
                },
                {
                    attr: "print",
                    level: 1,
                    title: "userOptionsPrint",
                    children: [
                        {
                            name: "scale",
                            attr: "userOptionsPrint.scale",
                            type: "number",
                            min: 1,
                            max: 5,
                            defaultVal: "2",
                            comment: "Set print quality (higher = larger file)",
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
                {
                    name: "title",
                    attr: "title",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "titleBold",
                    attr: "titleBold",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "titleFontSize",
                    attr: "titleFontSize",
                    type: "number",
                    defaultVal: "16",
                    min: 8,
                    max: 42,
                },
                {
                    name: "titleTextAlign",
                    attr: "titleTextAlign",
                    type: "select",
                    defaultVal: "center",
                    options: ["left", "center", "right"],
                },
                {
                    component: "div",
                    class: "flex flex-row gap-2 place-items-center",
                    children: [
                        {
                            inactive: true,
                            name: "tooltipCustomFormat",
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
                                    action: () => setActiveTab(4),
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
                    inactive: true,
                    name: "tooltipTeleportTo",
                    defaultVal: "'body'",
                    comment: "Sets the 'to' attr of the Teleport Vue component",
                },
                {
                    name: "tooltipBorderRadius",
                    attr: "tooltipBorderRadius",
                    type: "number",
                    defaultVal: "4",
                    min: 0,
                    max: 24,
                },
                {
                    name: "tooltipBorderColor",
                    attr: "tooltipBorderColor",
                    type: "color",
                    defaultVal: "#E1E5E8",
                },
                {
                    name: "tooltipBorderWidth",
                    attr: "tooltipBorderWidth",
                    type: "number",
                    defaultVal: "1",
                    min: 0,
                    max: 12,
                },
                {
                    name: "tooltipFontSize",
                    attr: "tooltipFontSize",
                    type: "number",
                    defaultVal: "14",
                    min: 8,
                    max: 42,
                },
                {
                    name: "tooltipBackgroundOpacity",
                    attr: "tooltipBackgroundOpacity",
                    type: "range",
                    defaultVal: "100",
                    min: 0,
                    max: 100,
                },
                {
                    name: "tooltipPosition",
                    attr: "tooltipPosition",
                    type: "select",
                    defaultVal: "center",
                    options: ["left", "center", "right"],
                },
                {
                    name: "tooltipOffsetX",
                    attr: "tooltipOffsetX",
                    type: "number",
                    defaultVal: "0",
                    min: -100,
                    max: 100,
                },
                {
                    name: "tooltipOffsetY",
                    attr: "tooltipOffsetY",
                    type: "number",
                    defaultVal: "24",
                    min: -100,
                    max: 100,
                },
                {
                    name: "tooltipSmooth",
                    attr: "tooltipSmooth",
                    type: "checkbox",
                    defaultVal: "true",
                },
                {
                    name: "tooltipSmoothForce",
                    attr: "tooltipSmoothForce",
                    type: "number",
                    defaultVal: "0.18",
                    min: 0.1,
                    max: 1,
                    step: 0.01,
                },
                {
                    name: "tooltipSmoothSnapThreshold",
                    attr: "tooltipSmoothSnapThreshold",
                    type: "number",
                    defaultVal: "0.25",
                    min: 0.1,
                    max: 24,
                    step: 0.01,
                },
                {
                    name: "useCustomLegend",
                    attr: "useCustomLegend",
                    type: "checkbox",
                    defaultVal: "false",
                    comment:
                        "If true, use #legend slot to make a custom legend",
                },
                {
                    name: "valuePrefix",
                    attr: "valuePrefix",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "valueSuffix",
                    attr: "valueSuffix",
                    type: "text",
                    defaultVal: "''",
                },
                {
                    name: "width",
                    attr: "width",
                    type: "number",
                    defaultVal: "512",
                    min: 200,
                    max: 1000,
                },
                {
                    component: "div",
                    class: "py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2",
                    children: [
                        {
                            component: "span",
                            class: "font-black text-black dark:text-app-blue inline-flex gap-2",
                            children: [
                                {
                                    component: "VueUiIcon",
                                    name: "chartLine",
                                    stroke: isDarkMode ? "#CCCCCC" : "#1A1A1A",
                                },
                                {
                                    component: "VueUiIcon",
                                    name: "chartBar",
                                    stroke: isDarkMode ? "#CCCCCC" : "#1A1A1A",
                                },
                                { text: "Bar and Line shared attributes:" },
                            ],
                        },
                        {
                            name: "xAxisLabel",
                            attr: "xAxisLabel",
                            type: "text",
                            defaultVal: "''",
                        },
                        {
                            name: "xyAxisStroke",
                            attr: "xyAxisStroke",
                            type: "color",
                            defaultVal: "#CCCCCC",
                        },
                        {
                            name: "xyAxisStrokeWidth",
                            attr: "xyAxisStrokeWidth",
                            type: "number",
                            defaultVal: "1",
                            min: 0,
                            max: 24,
                        },
                        {
                            name: "xyGridStroke",
                            attr: "xyGridStroke",
                            type: "color",
                            defaultVal: "#E1E5E8",
                        },
                        {
                            name: "xyGridStrokeWidth",
                            attr: "xyGridStrokeWidth",
                            type: "number",
                            defaultVal: "0.5",
                            min: 0,
                            max: 24,
                            step: 0.1,
                        },
                        {
                            name: "xyHighlighterColor",
                            attr: "xyHighlighterColor",
                            type: "color",
                            defaultVal: "#2D353C",
                        },
                        {
                            name: "xyHighlighterOpacity",
                            attr: "xyHighlighterOpacity",
                            type: "range",
                            defaultVal: "0.05",
                            min: 0,
                            max: 0.3,
                            step: 0.01,
                        },
                        {
                            name: "xyLabelsXFontSize",
                            attr: "xyLabelsXFontSize",
                            type: "number",
                            defaultVal: "8",
                            min: 8,
                            max: 42,
                        },
                        {
                            name: "xyLabelsYFontSize",
                            attr: "xyLabelsYFontSize",
                            type: "number",
                            defaultVal: "12",
                            min: 8,
                            max: 42,
                        },
                        {
                            name: "xyPaddingBottom",
                            attr: "xyPaddingBottom",
                            type: "number",
                            defaultVal: "24",
                            min: 0,
                            max: 100,
                        },
                        {
                            name: "xyPaddingLeft",
                            attr: "xyPaddingLeft",
                            type: "number",
                            defaultVal: "24",
                            min: 0,
                            max: 100,
                        },
                        {
                            name: "xyPaddingRight",
                            attr: "xyPaddingRight",
                            type: "number",
                            defaultVal: "12",
                            min: 0,
                            max: 100,
                        },
                        {
                            name: "xyPaddingTop",
                            attr: "xyPaddingTop",
                            type: "number",
                            defaultVal: "24",
                            min: 0,
                            max: 100,
                        },
                        {
                            component: "span",
                            children: [
                                { text: "xyPeriods: [], " },
                                {
                                    component: "span",
                                    class: "text-app-blue text-xs",
                                    children: [
                                        { text: "// Array<string | number>" },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "datetimeFormatter",
                            level: 1,
                            title: "datetimeFormatter",
                            children: [
                                {
                                    name: "enable",
                                    attr: "datetimeFormatter.enable",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "locale",
                                    attr: "datetimeFormatter.locale",
                                    type: "select",
                                    defaultVal: "en",
                                    options: store.locales,
                                },
                                {
                                    name: "useUTC",
                                    attr: "datetimeFormatter.useUTC",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "januaryAsYear",
                                    attr: "datetimeFormatter.januaryAsYear",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    attr: "options",
                                    level: 6,
                                    title: "datetimeFormatter.options",
                                    children: [
                                        {
                                            name: "year",
                                            attr: "datetimeFormatter.options.year",
                                            type: "text",
                                            defaultVal: "yyyy",
                                        },
                                        {
                                            name: "month",
                                            attr: "datetimeFormatter.options.month",
                                            type: "text",
                                            defaultVal: `MMM 'yy`,
                                        },
                                        {
                                            name: "day",
                                            attr: "datetimeFormatter.options.day",
                                            type: "text",
                                            defaultVal: `dd MMM`,
                                        },
                                        {
                                            name: "minute",
                                            attr: "datetimeFormatter.options.minute",
                                            type: "text",
                                            defaultVal: `HH:mm:ss`,
                                        },
                                        {
                                            name: "second",
                                            attr: "datetimeFormatter.options.second",
                                            type: "text",
                                            defaultVal: `HH:mm:ss`,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "xyPeriodLabelsRotation",
                            attr: "xyPeriodLabelsRotation",
                            type: "number",
                            defaultVal: "0",
                            min: -360,
                            max: 360,
                        },
                        {
                            name: "xyPeriodsShowOnlyAtModulo",
                            attr: "xyPeriodsShowOnlyAtModulo",
                            type: "checkbox",
                            defaultVal: "false",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                            comment: "Ideal for large datasets",
                        },
                        {
                            name: "xyPeriodsModulo",
                            attr: "xyPeriodsModulo",
                            type: "number",
                            defaultVal: "12",
                            min: 0,
                            max: 24,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                            comment:
                                "With xyPeriodsShowOnlyAtModulo set to true",
                        },
                        {
                            attr: "xyPeriodLabelsAutoRotate",
                            level: 1,
                            title: "xyPeriodLabelsAutoRotate",
                            children: [
                                {
                                    name: "enable",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    attr: "xyPeriodLabelsAutoRotate.enable",
                                },
                                {
                                    name: "angle",
                                    type: "number",
                                    defaultVal: "-30",
                                    attr: "xyPeriodLabelsAutoRotate.angle",
                                    min: -90,
                                    max: 90,
                                },
                            ],
                        },
                        {
                            name: "xyScaleSegments",
                            attr: "xyScaleSegments",
                            type: "number",
                            defaultVal: "10",
                            min: 2,
                            max: 20,
                        },
                        {
                            name: "xyShowAxis",
                            attr: "xyShowAxis",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "xyShowGrid",
                            attr: "xyShowGrid",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "xyShowScale",
                            attr: "xyShowScale",
                            type: "checkbox",
                            defaultVal: "true",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "yAxisLabel",
                            attr: "yAxisLabel",
                            type: "text",
                            defaultVal: "''",
                        },
                        {
                            name: "zoomXy",
                            attr: "zoomXy",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "zoomXyAutoFit",
                            attr: "zoomXyAutoFit",
                            type: "checkbox",
                            defaultVal: "false",
                            comment: "Since v3.23.1",
                        },
                        {
                            name: "zoomMaxWidth",
                            attr: "zoomMaxWidth",
                            type: "number",
                            defaultVal: "null",
                            min: 200,
                            max: 800,
                            step: 50,
                            comment: "Since v3.13.4",
                        },
                        {
                            name: "zoomColor",
                            attr: "zoomColor",
                            type: "color",
                            defaultVal: "#CCCCCC",
                        },
                        {
                            name: "zoomHighlightColor",
                            attr: "zoomHighlightColor",
                            type: "color",
                            defaultVal: "#4A4A4A",
                        },
                        {
                            name: "zoomFontSize",
                            attr: "zoomFontSize",
                            type: "number",
                            defaultVal: "14",
                            min: 8,
                            max: 42,
                        },
                        {
                            name: "zoomUseResetSlot",
                            attr: "zoomUseResetSlot",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "zoomEnableRangeHandles",
                            attr: "zoomEnableRangeHandles",
                            type: "checkbox",
                            defaultVal: "true",
                            comment: "Since v2.4.63",
                        },
                        {
                            name: "zoomEnableSelectionDrag",
                            attr: "zoomEnableSelectionDrag",
                            type: "checkbox",
                            defaultVal: "true",
                            comment: "Since v2.4.63",
                        },
                        {
                            attr: "zoomMinimap",
                            level: 1,
                            children: [
                                {
                                    name: "show",
                                    attr: "zoomMinimap.show",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "smooth",
                                    attr: "zoomMinimap.smooth",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "selectedColor",
                                    attr: "zoomMinimap.selectedColor",
                                    type: "color",
                                    defaultVal: "#1f77b4",
                                },
                                {
                                    name: "selectedColorOpacity",
                                    attr: "zoomMinimap.selectedColorOpacity",
                                    type: "range",
                                    defaultVal: "0.2",
                                    min: 0,
                                    max: 0.5,
                                },
                                {
                                    name: "lineColor",
                                    attr: "zoomMinimap.lineColor",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "selectionRadius",
                                    attr: "zoomMinimap.selectionRadius",
                                    type: "range",
                                    defaultVal: "2",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "indicatorColor",
                                    attr: "zoomMinimap.indicatorColor",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "verticalHandles",
                                    attr: "zoomMinimap.verticalHandles",
                                    type: "checkbox",
                                    defaultVal: "false",
                                    comment: "Since v2.4.72",
                                },
                                {
                                    name: "compact",
                                    attr: "zoomMinimap.compact",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    comment: "Since v3.1.8",
                                },
                                {
                                    name: "merged",
                                    attr: "zoomMinimap.merged",
                                    type: "checkbox",
                                    defaultVal: "true",
                                    comment: "Since v3.1.8",
                                },
                                {
                                    name: "frameColor",
                                    attr: "zoomMinimap.frameColor",
                                    type: "color",
                                    defaultVal: "#A1A1A1",
                                    comment: "Since v3.1.8",
                                },
                                {
                                    name: "additionalHeight",
                                    attr: "zoomMinimap.additionalHeight",
                                    type: "number",
                                    defaultVal: "0",
                                    min: 0,
                                    max: 20,
                                    comment: "Since v3.15.1",
                                    onChange: (..._args) => {
                                        return forceChartUpdate(..._args);
                                    },
                                },
                                {
                                    name: "handleIconColor",
                                    attr: "zoomMinimap.handleIconColor",
                                    type: "color",
                                    defaultVal: "null",
                                    comment: "Since v3.15.1",
                                },
                                {
                                    name: "handleBorderWidth",
                                    attr: "zoomMinimap.handleBorderWidth",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0,
                                    max: 3,
                                    step: 0.1,
                                    comment: "Since v3.15.1",
                                },
                                {
                                    name: "handleBorderColor",
                                    attr: "zoomMinimap.handleBorderColor",
                                    type: "color",
                                    defaultVal: "null",
                                    comment: "Since v3.15.1",
                                },
                                {
                                    name: "handleFill",
                                    attr: "zoomMinimap.handleFill",
                                    type: "color",
                                    defaultVal: "null",
                                    comment: "Since v3.15.1",
                                },
                                {
                                    name: "handleWidth",
                                    attr: "zoomMinimap.handleWidth",
                                    type: "number",
                                    defaultVal: "20",
                                    min: 20,
                                    max: 40,
                                    comment: "Since v3.15.1",
                                },
                                {
                                    name: "handleType",
                                    attr: "zoomMinimap.handleType",
                                    type: "select",
                                    defaultVal: "grab",
                                    options: [
                                        "grab",
                                        "chevron",
                                        "arrow",
                                        "empty",
                                    ],
                                    comment: "Since v3.15.1",
                                },
                            ],
                        },
                        {
                            inactive: true,
                            name: "zoomStartIndex",
                            defaultVal: "null",
                            comment: "number | null. Force zoom start index",
                        },
                        {
                            inactive: true,
                            name: "zoomEndIndex",
                            defaultVal: "null",
                            comment: "number | null. Force zoom end index",
                        },
                        {
                            name: "zoomFocusOnDrag",
                            attr: "zoomFocusOnDrag",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "zoomFocusRangeRatio",
                            attr: "zoomFocusRangeRatio",
                            type: "number",
                            defaultVal: "0.2",
                        },
                        {
                            attr: "dragToZoom",
                            level: 1,
                            title: "dragToZoom",
                            children: [
                                {
                                    component: "BaseComment",
                                    children: [
                                        { text: "Drag-to-zoom since v3.26.0" },
                                    ],
                                },
                                {
                                    name: "show",
                                    attr: "dragToZoom.show",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    attr: "selection",
                                    level: 5,
                                    title: "dragToZoom.selection",
                                    children: [
                                        {
                                            name: "fill",
                                            attr: "dragToZoom.selection.fill",
                                            type: "color",
                                            defaultVal: "#1f77b4",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "dragToZoom.selection.stroke",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
                                        },
                                        {
                                            name: "fillOpacity",
                                            attr: "dragToZoom.selection.fillOpacity",
                                            type: "number",
                                            defaultVal: "0.2",
                                            min: 0.1,
                                            max: 0.5,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeOpacity",
                                            attr: "dragToZoom.selection.strokeOpacity",
                                            type: "number",
                                            defaultVal: "0.5",
                                            min: 0,
                                            max: 1,
                                            step: 0.1,
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "dragToZoom.selection.strokeWidth",
                                            type: "number",
                                            defaultVal: "1",
                                            min: 0,
                                            max: 6,
                                        },
                                        {
                                            name: "strokeDasharray",
                                            attr: "dragToZoom.selection.strokeDasharray",
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
    ];
}
