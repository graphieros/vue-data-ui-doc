// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiSparkgaugeConfigFields({
    forceChartUpdate,
    goToPage,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiSparkgaugeConfig",
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
                    name: "theme",
                    defaultVal: "''",
                    comment:
                        "'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'",
                },
                {
                    attr: "style",
                    level: "1",
                    children: [
                        {
                            inactive: true,
                            name: "fontFamily",
                            defaultVal: "'inherit'",
                        },
                        {
                            name: "background",
                            attr: "style.background",
                            type: "color",
                            defaultVal: "#FFFFFF",
                        },
                        {
                            name: "height",
                            attr: "style.height",
                            type: "number",
                            defaultVal: "84",
                            min: 84,
                            max: 150,
                        },
                        {
                            name: "basePosition",
                            attr: "style.basePosition",
                            type: "number",
                            defaultVal: "72",
                            min: 72,
                            max: 150,
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
                                    name: "speedMs",
                                    attr: "style.animation.speedMs",
                                    type: "number",
                                    defaultVal: "150",
                                    min: 10,
                                    max: 500,
                                    step: 10,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                            ],
                        },
                        {
                            attr: "colors",
                            level: 2,
                            title: "style.colors",
                            children: [
                                {
                                    name: "min",
                                    attr: "style.colors.min",
                                    type: "color",
                                    defaultVal: "#DC3912",
                                },
                                {
                                    name: "max",
                                    attr: "style.colors.max",
                                    type: "color",
                                    defaultVal: "#2CA02C",
                                },
                                {
                                    name: "showGradient",
                                    attr: "style.colors.showGradient",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                            ],
                        },
                        {
                            attr: "dataLabel",
                            level: 2,
                            title: "style.dataLabel",
                            children: [
                                {
                                    name: "fontSize",
                                    attr: "style.dataLabel.fontSize",
                                    type: "number",
                                    defaultVal: "20",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "autoColor",
                                    attr: "style.dataLabel.autoColor",
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
                                    name: "offsetY",
                                    attr: "style.dataLabel.offsetY",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "bold",
                                    attr: "style.dataLabel.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
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
                            ],
                        },
                        {
                            attr: "gutter",
                            level: 2,
                            title: "style.gutter",
                            children: [
                                {
                                    name: "color",
                                    attr: "style.gutter.color",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "strokeLinecap",
                                    attr: "style.gutter.strokeLinecap",
                                    type: "select",
                                    defaultVal: "round",
                                    options: ["round", "square", "butt"],
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
                                    name: "fontSize",
                                    attr: "style.title.fontSize",
                                    type: "number",
                                    defaultVal: "12",
                                    min: 8,
                                    max: 42,
                                },
                                {
                                    name: "position",
                                    attr: "style.title.position",
                                    type: "select",
                                    defaultVal: "top",
                                    options: ["top", "bottom"],
                                },
                                {
                                    name: "textAlign",
                                    attr: "style.title.textAlign",
                                    type: "select",
                                    defaultVal: "center",
                                    options: ["left", "center", "right"],
                                },
                                {
                                    name: "bold",
                                    attr: "style.title.bold",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                                {
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                            ],
                        },
                        {
                            attr: "track",
                            level: 2,
                            title: "style.track",
                            children: [
                                {
                                    name: "strokeLinecap",
                                    attr: "style.track.strokeLinecap",
                                    type: "select",
                                    defaultVal: "round",
                                    options: ["round", "square", "butt"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
