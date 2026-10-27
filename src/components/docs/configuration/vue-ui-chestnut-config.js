// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiChestnutConfigFields({
    forceChartUpdate,
    goToPage,
    setActiveTab,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiChestnutConfig",
            equal: true,
            children: [
                { inactive: true, name: "debug", defaultVal: "false" },
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
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            attr: "branches",
                                            level: 4,
                                            title: "style.chart.layout.branches",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.branches.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.branches.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "borderRadius",
                                                    attr: "style.chart.layout.branches.borderRadius",
                                                    type: "number",
                                                    defaultVal: "6",
                                                    min: 0,
                                                    max: 24,
                                                },
                                                {
                                                    name: "useGradient",
                                                    attr: "style.chart.layout.branches.useGradient",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "gradientIntensity",
                                                    attr: "style.chart.layout.branches.gradientIntensity",
                                                    type: "range",
                                                    defaultVal: "20",
                                                    min: 0,
                                                    max: 100,
                                                },
                                                {
                                                    name: "underlayerColor",
                                                    attr: "style.chart.layout.branches.underlayerColor",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "widthRatio",
                                                    attr: "style.chart.layout.branches.widthRatio",
                                                    type: "range",
                                                    defaultVal: "1.5",
                                                    min: 0.1,
                                                    max: 1.8,
                                                    step: 0.1,
                                                },
                                                {
                                                    attr: "labels",
                                                    level: 5,
                                                    title: "style.chart.layout.branches.labels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.branches.labels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.branches.labels.fontSize",
                                                            type: "number",
                                                            defaultVal: "14",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.branches.labels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.branches.labels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            attr: "dataLabels",
                                                            level: 6,
                                                            title: "style.chart.layout.branches.labels.dataLabels",
                                                            children: [
                                                                {
                                                                    name: "show",
                                                                    attr: "style.chart.layout.branches.labels.dataLabels.show",
                                                                    type: "checkbox",
                                                                    defaultVal:
                                                                        "true",
                                                                },
                                                                {
                                                                    name: "hideUnderValue",
                                                                    attr: "style.chart.layout.branches.labels.dataLabels.hideUnderValue",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "5",
                                                                    min: 1,
                                                                    max: 20,
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.branches.labels.dataLabels.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "14",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "roundingValue",
                                                                    attr: "style.chart.layout.branches.labels.dataLabels.roundingValue",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: 0,
                                                                    max: 6,
                                                                },
                                                                {
                                                                    name: "roundingPercentage",
                                                                    attr: "style.chart.layout.branches.labels.dataLabels.roundingPercentage",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "0",
                                                                    min: 0,
                                                                    max: 6,
                                                                },
                                                                {
                                                                    name: "prefix",
                                                                    attr: "style.chart.layout.branches.labels.dataLabels.prefix",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "''",
                                                                },
                                                                {
                                                                    name: "suffix",
                                                                    attr: "style.chart.layout.branches.labels.dataLabels.suffix",
                                                                    type: "text",
                                                                    defaultVal:
                                                                        "''",
                                                                },
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
                                            ],
                                        },
                                        {
                                            attr: "grandTotal",
                                            level: 4,
                                            title: "style.chart.layout.grandTotal",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.grandTotal.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.grandTotal.fontSize",
                                                    type: "number",
                                                    defaultVal: "20",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.grandTotal.bold",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.layout.grandTotal.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.layout.grandTotal.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "roundingValue",
                                                    attr: "style.chart.layout.grandTotal.roundingValue",
                                                    type: "number",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.grandTotal.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "text",
                                                    attr: "style.chart.layout.grandTotal.text",
                                                    type: "text",
                                                    defaultVal: "'Grand total'",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.layout.grandTotal.offsetY",
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
                                            attr: "legend",
                                            level: 4,
                                            title: "style.chart.layout.legend",
                                            children: [
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.legend.fontSize",
                                                    type: "number",
                                                    defaultVal: "16",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.legend.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "roundingValue",
                                                    attr: "style.chart.layout.legend.roundingValue",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "roundingPercentage",
                                                    attr: "style.chart.layout.legend.roundingPercentage",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "prefix",
                                                    attr: "style.chart.layout.legend.prefix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "suffix",
                                                    attr: "style.chart.layout.legend.suffix",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "links",
                                            level: 4,
                                            title: "style.chart.layout.links",
                                            children: [
                                                {
                                                    name: "opacity",
                                                    attr: "style.chart.layout.links.opacity",
                                                    type: "range",
                                                    defaultVal: "10",
                                                    min: 0,
                                                    max: 100,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "nuts",
                                            level: 4,
                                            title: "style.chart.layout.nuts",
                                            children: [
                                                {
                                                    name: "offsetX",
                                                    attr: "style.chart.layout.nuts.offsetX",
                                                    type: "number",
                                                    defaultVal: "20",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    name: "useGradient",
                                                    attr: "style.chart.layout.nuts.useGradient",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "gradientIntensity",
                                                    attr: "style.chart.layout.nuts.gradientIntensity",
                                                    type: "range",
                                                    defaultVal: "30",
                                                    min: 0,
                                                    max: 100,
                                                },
                                                {
                                                    attr: "selected",
                                                    level: 5,
                                                    title: "style.chart.layout.nuts.selected",
                                                    children: [
                                                        {
                                                            name: "useMotion",
                                                            attr: "style.chart.layout.nuts.selected.useMotion",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "useGradient",
                                                            attr: "style.chart.layout.nuts.selected.useGradient",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "gradientIntensity",
                                                            attr: "style.chart.layout.nuts.selected.gradientIntensity",
                                                            type: "range",
                                                            defaultVal: "40",
                                                            min: 0,
                                                            max: 100,
                                                        },
                                                        {
                                                            name: "roundingValue",
                                                            attr: "style.chart.layout.nuts.selected.roundingValue",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "roundingPercentage",
                                                            attr: "style.chart.layout.nuts.selected.roundingPercentage",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            attr: "labels",
                                                            level: 6,
                                                            title: "style.chart.layout.nuts.selected.labels",
                                                            children: [
                                                                {
                                                                    attr: "core",
                                                                    level: 7,
                                                                    title: "style.chart.layout.nuts.selected.labels.core",
                                                                    children: [
                                                                        {
                                                                            attr: "total",
                                                                            level: 8,
                                                                            title: "style.chart.layout.nuts.selected.labels.core.total",
                                                                            children:
                                                                                [
                                                                                    {
                                                                                        name: "color",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.total.color",
                                                                                        type: "color",
                                                                                        defaultVal:
                                                                                            "#2D353C",
                                                                                    },
                                                                                    {
                                                                                        name: "fontSize",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.total.fontSize",
                                                                                        type: "number",
                                                                                        defaultVal:
                                                                                            "24",
                                                                                        min: 8,
                                                                                        max: 42,
                                                                                    },
                                                                                    {
                                                                                        name: "bold",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.total.bold",
                                                                                        type: "checkbox",
                                                                                        defaultVal:
                                                                                            "true",
                                                                                    },
                                                                                ],
                                                                        },
                                                                        {
                                                                            attr: "value",
                                                                            level: 8,
                                                                            title: "style.chart.layout.nuts.selected.labels.core.value",
                                                                            children:
                                                                                [
                                                                                    {
                                                                                        name: "color",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.value.color",
                                                                                        type: "color",
                                                                                        defaultVal:
                                                                                            "#2D353C",
                                                                                    },
                                                                                    {
                                                                                        name: "fontSize",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.value.fontSize",
                                                                                        type: "number",
                                                                                        defaultVal:
                                                                                            "24",
                                                                                        min: 8,
                                                                                        max: 42,
                                                                                    },
                                                                                    {
                                                                                        name: "bold",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.value.bold",
                                                                                        type: "checkbox",
                                                                                        defaultVal:
                                                                                            "true",
                                                                                    },
                                                                                    {
                                                                                        name: "prefix",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.value.prefix",
                                                                                        type: "text",
                                                                                        defaultVal:
                                                                                            "''",
                                                                                    },
                                                                                    {
                                                                                        name: "suffix",
                                                                                        attr: "style.chart.layout.nuts.selected.labels.core.value.suffix",
                                                                                        type: "text",
                                                                                        defaultVal:
                                                                                            "''",
                                                                                    },
                                                                                ],
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    attr: "dataLabels",
                                                                    level: 7,
                                                                    title: "style.chart.layout.nuts.selected.labels.dataLabels",
                                                                    children: [
                                                                        {
                                                                            name: "hideUnderValue",
                                                                            attr: "style.chart.layout.nuts.selected.labels.dataLabels.hideUnderValue",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "5",
                                                                            min: 1,
                                                                            max: 20,
                                                                        },
                                                                        {
                                                                            name: "color",
                                                                            attr: "style.chart.layout.nuts.selected.labels.dataLabels.color",
                                                                            type: "color",
                                                                            defaultVal:
                                                                                "#2D353C",
                                                                        },
                                                                        {
                                                                            name: "fontSize",
                                                                            attr: "style.chart.layout.nuts.selected.labels.dataLabels.fontSize",
                                                                            type: "number",
                                                                            defaultVal:
                                                                                "12",
                                                                            min: 8,
                                                                            max: 42,
                                                                        },
                                                                        {
                                                                            name: "bold",
                                                                            attr: "style.chart.layout.nuts.selected.labels.dataLabels.bold",
                                                                            type: "checkbox",
                                                                            defaultVal:
                                                                                "true",
                                                                        },
                                                                        {
                                                                            name: "prefix",
                                                                            attr: "style.chart.layout.nuts.selected.labels.dataLabels.prefix",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "''",
                                                                        },
                                                                        {
                                                                            name: "suffix",
                                                                            attr: "style.chart.layout.nuts.selected.labels.dataLabels.suffix",
                                                                            type: "text",
                                                                            defaultVal:
                                                                                "''",
                                                                        },
                                                                        {
                                                                            component:
                                                                                "div",
                                                                            class: "flex flex-row gap-2 place-items-center",
                                                                            children:
                                                                                [
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
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "roots",
                                            level: 4,
                                            title: "style.chart.layout.roots",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.roots.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.roots.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "5",
                                                    min: 0,
                                                    max: 64,
                                                },
                                                {
                                                    name: "useGradient",
                                                    attr: "style.chart.layout.roots.useGradient",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "gradientIntensity",
                                                    attr: "style.chart.layout.roots.gradientIntensity",
                                                    type: "range",
                                                    defaultVal: "20",
                                                    min: 0,
                                                    max: 100,
                                                },
                                                {
                                                    name: "underlayerColor",
                                                    attr: "style.chart.layout.roots.underlayerColor",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    attr: "labels",
                                                    level: 5,
                                                    title: "style.chart.layout.roots.labels",
                                                    children: [
                                                        {
                                                            name: "show",
                                                            attr: "style.chart.layout.roots.labels.show",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.roots.labels.fontSize",
                                                            type: "number",
                                                            defaultVal: "16",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "adaptColorToBackground",
                                                            attr: "style.chart.layout.roots.labels.adaptColorToBackground",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.roots.labels.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.roots.labels.bold",
                                                            type: "checkbox",
                                                            defaultVal: "true",
                                                        },
                                                        {
                                                            name: "roundingValue",
                                                            attr: "style.chart.layout.roots.labels.roundingValue",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            name: "prefix",
                                                            attr: "style.chart.layout.roots.labels.prefix",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "suffix",
                                                            attr: "style.chart.layout.roots.labels.suffix",
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
                                                        {
                                                            attr: "name",
                                                            level: 6,
                                                            title: "style.chart.layout.roots.labels.name",
                                                            children: [
                                                                {
                                                                    name: "color",
                                                                    attr: "style.chart.layout.roots.labels.name.color",
                                                                    type: "color",
                                                                    defaultVal:
                                                                        "#2D353C",
                                                                },
                                                                {
                                                                    name: "fontSize",
                                                                    attr: "style.chart.layout.roots.labels.name.fontSize",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "16",
                                                                    min: 8,
                                                                    max: 42,
                                                                },
                                                                {
                                                                    name: "bold",
                                                                    attr: "style.chart.layout.roots.labels.name.bold",
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
                                            attr: "title",
                                            level: 4,
                                            title: "style.chart.layout.title",
                                            children: [
                                                {
                                                    name: "text",
                                                    attr: "style.chart.layout.title.text",
                                                    type: "text",
                                                    defaultVal: "''",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.title.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "fontSize",
                                                    attr: "style.chart.layout.title.fontSize",
                                                    type: "number",
                                                    defaultVal: "20",
                                                    min: 8,
                                                    max: 42,
                                                },
                                                {
                                                    name: "bold",
                                                    attr: "style.chart.layout.title.bold",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "offsetY",
                                                    attr: "style.chart.layout.title.offsetY",
                                                    type: "number",
                                                    defaultVal: "0",
                                                    min: -100,
                                                    max: 100,
                                                },
                                                {
                                                    attr: "subtitle",
                                                    level: 5,
                                                    title: "style.chart.layout.title.subtitle",
                                                    children: [
                                                        {
                                                            name: "text",
                                                            attr: "style.chart.layout.title.subtitle.text",
                                                            type: "text",
                                                            defaultVal: "''",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.layout.title.subtitle.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#CCCCCC",
                                                        },
                                                        {
                                                            name: "fontSize",
                                                            attr: "style.chart.layout.title.subtitle.fontSize",
                                                            type: "number",
                                                            defaultVal: "16",
                                                            min: 8,
                                                            max: 42,
                                                        },
                                                        {
                                                            name: "bold",
                                                            attr: "style.chart.layout.title.subtitle.bold",
                                                            type: "checkbox",
                                                            defaultVal: "false",
                                                        },
                                                        {
                                                            name: "offsetY",
                                                            attr: "style.chart.layout.title.subtitle.offsetY",
                                                            type: "number",
                                                            defaultVal: "0",
                                                            min: -100,
                                                            max: 100,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "verticalSeparator",
                                            level: 4,
                                            title: "style.chart.layout.verticalSeparator",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.verticalSeparator.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.verticalSeparator.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "5",
                                                    min: 0,
                                                    max: 24,
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
                                {
                                    attr: "translations",
                                    level: 3,
                                    title: "table.th.translations",
                                    children: [
                                        {
                                            name: "rootName",
                                            attr: "table.th.translations.rootName",
                                            type: "text",
                                            defaultVal: "root name",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "rootValue",
                                            attr: "table.th.translations.rootValue",
                                            type: "text",
                                            defaultVal: "root value",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "rootToTotal",
                                            attr: "table.th.translations.rootToTotal",
                                            type: "text",
                                            defaultVal: "%/total",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "branchName",
                                            attr: "table.th.translations.branchName",
                                            type: "text",
                                            defaultVal: "branch name",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "branchValue",
                                            attr: "table.th.translations.branchValue",
                                            type: "text",
                                            defaultVal: "branch value",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "branchToRoot",
                                            attr: "table.th.translations.branchToRoot",
                                            type: "text",
                                            defaultVal: "%/root",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "branchToTotal",
                                            attr: "table.th.translations.branchToTotal",
                                            type: "text",
                                            defaultVal: "%/total",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "nutName",
                                            attr: "table.th.translations.nutName",
                                            type: "text",
                                            defaultVal: "nut name",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "nutValue",
                                            attr: "table.th.translations.nutValue",
                                            type: "text",
                                            defaultVal: "nut value",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "nutToBranch",
                                            attr: "table.th.translations.nutToBranch",
                                            type: "text",
                                            defaultVal: "%/branch",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "nutToRoot",
                                            attr: "table.th.translations.nutToRoot",
                                            type: "text",
                                            defaultVal: "%/root",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "nutToTotal",
                                            attr: "table.th.translations.nutToTotal",
                                            type: "text",
                                            defaultVal: "%/total",
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                    ],
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
                    attr: "translations",
                    level: 1,
                    children: [
                        {
                            name: "total",
                            attr: "translations.total",
                            type: "text",
                            defaultVal: "Total",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "proportionToTree",
                            attr: "translations.proportionToTree",
                            type: "text",
                            defaultVal: "of grand total",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "of",
                            attr: "translations.of",
                            type: "text",
                            defaultVal: "of",
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
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
