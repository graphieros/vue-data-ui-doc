// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiTimerConfigFields({
    forceChartUpdate,
    store,
    translations,
}) {
    return [
        {
            attr: "const config: VueUiTimerConfig",
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
                {
                    inactive: true,
                    name: "responsiveProportionalSizing",
                    defaultVal: "true",
                    comment:
                        translations.responsiveProportionalSizing[store.lang],
                },
                {
                    name: "useCursorPointer",
                    attr: "useCursorPointer",
                    type: "checkbox",
                    defaultVal: "false",
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
                            name: "height",
                            attr: "style.height",
                            type: "number",
                            defaultVal: "300",
                            min: 100,
                            max: 1000,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
                        },
                        {
                            name: "width",
                            attr: "style.width",
                            type: "number",
                            defaultVal: "300",
                            min: 100,
                            max: 1000,
                            onChange: (..._args) => {
                                return forceChartUpdate();
                            },
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
                    attr: "stopwatch",
                    level: 1,
                    children: [
                        {
                            name: "showHours",
                            attr: "stopwatch.showHours",
                            type: "checkbox",
                            defaultVal: "false",
                        },
                        {
                            name: "showHundredth",
                            attr: "stopwatch.showHundredth",
                            type: "checkbox",
                            defaultVal: "true",
                        },
                        {
                            name: "cycleSeconds",
                            attr: "stopwatch.cycleSeconds",
                            type: "number",
                            defaultVal: "5",
                            min: 1,
                            max: 60,
                        },
                        {
                            attr: "track",
                            level: 2,
                            title: "stopwatch.track",
                            children: [
                                {
                                    name: "radiusRatio",
                                    attr: "stopwatch.track.radiusRatio",
                                    type: "range",
                                    defaultVal: "1",
                                    min: 0.4,
                                    max: 1,
                                    step: 0.01,
                                },
                                {
                                    name: "stroke",
                                    attr: "stopwatch.track.stroke",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "stopwatch.track.strokeWidth",
                                    type: "range",
                                    defaultVal: "2",
                                    min: 0,
                                    max: 24,
                                },
                                {
                                    name: "fill",
                                    attr: "stopwatch.track.fill",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                            ],
                        },
                        {
                            attr: "tracker",
                            level: 2,
                            title: "stopwatch.tracker",
                            children: [
                                {
                                    name: "radiusRatio",
                                    attr: "stopwatch.tracker.radiusRatio",
                                    type: "range",
                                    defaultVal: "1",
                                    min: 0.4,
                                    max: 2,
                                    step: 0.01,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "stroke",
                                    attr: "stopwatch.tracker.stroke",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "stopwatch.tracker.strokeWidth",
                                    type: "number",
                                    defaultVal: "1",
                                    min: 0,
                                    max: 12,
                                },
                                {
                                    name: "fill",
                                    attr: "stopwatch.tracker.fill",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    attr: "gradient",
                                    level: 3,
                                    title: "stopwatch.tracker.gradient",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "stopwatch.tracker.gradient.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "color",
                                            attr: "stopwatch.tracker.gradient.color",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                    ],
                                },
                                {
                                    attr: "aura",
                                    level: 3,
                                    title: "stopwatch.tracker.aura",
                                    children: [
                                        {
                                            name: "show",
                                            attr: "stopwatch.tracker.aura.show",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "radiusRatio",
                                            attr: "stopwatch.tracker.aura.radiusRatio",
                                            type: "range",
                                            defaultVal: "1",
                                            min: 0.4,
                                            max: 3,
                                            step: 0.01,
                                            onChange: (..._args) => {
                                                return forceChartUpdate();
                                            },
                                        },
                                        {
                                            name: "fill",
                                            attr: "stopwatch.tracker.aura.fill",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "stroke",
                                            attr: "stopwatch.tracker.aura.stroke",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            name: "strokeWidth",
                                            attr: "stopwatch.tracker.aura.strokeWidth",
                                            type: "number",
                                            defaultVal: "0",
                                            min: 0,
                                            max: 12,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "cycleTrack",
                            level: 2,
                            title: "stopwatch.cycleTrack",
                            children: [
                                {
                                    name: "show",
                                    attr: "stopwatch.cycleTrack.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "stroke",
                                    attr: "stopwatch.cycleTrack.stroke",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "strokeWidth",
                                    attr: "stopwatch.cycleTrack.strokeWidth",
                                    type: "number",
                                    defaultVal: "3",
                                    min: 0,
                                    max: 24,
                                },
                            ],
                        },
                        {
                            attr: "label",
                            level: 2,
                            title: "stopwatch.label",
                            children: [
                                {
                                    name: "fontSize",
                                    attr: "stopwatch.label.fontSize",
                                    type: "number",
                                    defaultVal: "24",
                                    min: 8,
                                    max: 64,
                                    onChange: (..._args) => {
                                        return forceChartUpdate();
                                    },
                                },
                                {
                                    name: "color",
                                    attr: "stopwatch.label.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "bold",
                                    attr: "stopwatch.label.bold",
                                    type: "checkbox",
                                    defaultVal: "false",
                                },
                            ],
                        },
                        {
                            attr: "legend",
                            level: 2,
                            title: "stopwatch.legend",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "stopwatch.legend.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    attr: "buttons",
                                    level: 3,
                                    title: "stopwatch.legend.buttons",
                                    children: [
                                        {
                                            name: "start",
                                            attr: "stopwatch.legend.buttons.start",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "pause",
                                            attr: "stopwatch.legend.buttons.pause",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "reset",
                                            attr: "stopwatch.legend.buttons.reset",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "restart",
                                            attr: "stopwatch.legend.buttons.restart",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "lap",
                                            attr: "stopwatch.legend.buttons.lap",
                                            type: "checkbox",
                                            defaultVal: "true",
                                        },
                                        {
                                            name: "iconColor",
                                            attr: "stopwatch.legend.buttons.iconColor",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
                                },
                                {
                                    attr: "buttonTitles",
                                    level: 3,
                                    title: "stopwatch.legend.buttonTitles",
                                    children: [
                                        {
                                            name: "start",
                                            attr: "stopwatch.legend.buttonTitles.start",
                                            type: "text",
                                            defaultVal: "Start",
                                        },
                                        {
                                            name: "pause",
                                            attr: "stopwatch.legend.buttonTitles.pause",
                                            type: "text",
                                            defaultVal: "Pause",
                                        },
                                        {
                                            name: "resume",
                                            attr: "stopwatch.legend.buttonTitles.resume",
                                            type: "text",
                                            defaultVal: "Resume",
                                        },
                                        {
                                            name: "reset",
                                            attr: "stopwatch.legend.buttonTitles.reset",
                                            type: "text",
                                            defaultVal: "Reset",
                                        },
                                        {
                                            name: "restart",
                                            attr: "stopwatch.legend.buttonTitles.restart",
                                            type: "text",
                                            defaultVal: "Restart",
                                        },
                                        {
                                            name: "lap",
                                            attr: "stopwatch.legend.buttonTitles.lap",
                                            type: "text",
                                            defaultVal: "Lap",
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
