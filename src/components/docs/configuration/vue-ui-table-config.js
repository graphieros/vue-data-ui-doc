// Presentation metadata; demo configurations remain owned by the documentation page.
export function createVueUiTableConfigFields(_context) {
    return [
        {
            attr: "const config: VueUiTableConfig",
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
                { inactive: true, name: "fontFamily", defaultVal: "'inherit'" },
                {
                    name: "maxHeight",
                    attr: "maxHeight",
                    type: "number",
                    defaultVal: "700",
                    min: 400,
                    max: 2000,
                    step: 50,
                },
                {
                    inactive: true,
                    name: "rowsPerPage",
                    attr: "rowsPerPage",
                    type: "number",
                    defaultVal: "25",
                    min: 5,
                    max: 100,
                    step: 5,
                },
                {
                    attr: "style",
                    level: 1,
                    children: [
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
                                },
                                {
                                    name: "color",
                                    attr: "style.title.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "backgroundColor",
                                    attr: "style.title.backgroundColor",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "fontSize",
                                    attr: "style.title.fontSize",
                                    type: "number",
                                    defaultVal: "20",
                                    min: 12,
                                    max: 48,
                                },
                                {
                                    name: "bold",
                                    attr: "style.title.bold",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "textAlign",
                                    attr: "style.title.textAlign",
                                    type: "select",
                                    defaultVal: "center",
                                    options: ["left", "center", "right"],
                                },
                                {
                                    name: "paddingLeft",
                                    attr: "style.title.paddingLeft",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
                                },
                                {
                                    name: "paddingRight",
                                    attr: "style.title.paddingRight",
                                    type: "number",
                                    defaultVal: "0",
                                    min: -100,
                                    max: 100,
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
                                        },
                                        {
                                            name: "color",
                                            attr: "style.title.subtitle.color",
                                            type: "color",
                                            defaultVal: "#A1A1A1",
                                        },
                                        {
                                            name: "fontSize",
                                            attr: "style.title.subtitle.fontSize",
                                            type: "number",
                                            defaultVal: "16",
                                            min: 12,
                                            max: 48,
                                        },
                                        {
                                            name: "bold",
                                            attr: "style.title.subtitle.bold",
                                            type: "checkbox",
                                            defaultVal: "false",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "th",
                            level: 2,
                            title: "style.th",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.th.backgroundColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "color",
                                    attr: "style.th.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "outline",
                                    attr: "style.th.outline",
                                    type: "text",
                                    defaultVal: "'1px solid #FFFFFF'",
                                },
                                {
                                    attr: "selected",
                                    level: 3,
                                    title: "style.th.selected",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.th.selected.backgroundColor",
                                            type: "color",
                                            defaultVal: "#1F77B4",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.th.selected.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
                                },
                                {
                                    attr: "buttons",
                                    level: 3,
                                    title: "style.th.buttons",
                                    children: [
                                        {
                                            attr: "filter",
                                            level: 4,
                                            title: "style.th.buttons.filter",
                                            children: [
                                                {
                                                    attr: "inactive",
                                                    level: 5,
                                                    title: "style.th.buttons.filter.inactive",
                                                    children: [
                                                        {
                                                            name: "backgroundColor",
                                                            attr: "style.th.buttons.filter.inactive.backgroundColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#E1E5E8",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.th.buttons.filter.inactive.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "active",
                                                    level: 5,
                                                    title: "style.th.buttons.filter.active",
                                                    children: [
                                                        {
                                                            name: "backgroundColor",
                                                            attr: "style.th.buttons.filter.active.backgroundColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#1f77b4",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.th.buttons.filter.active.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "cancel",
                                            level: 4,
                                            title: "style.th.buttons.cancel",
                                            children: [
                                                {
                                                    attr: "inactive",
                                                    level: 5,
                                                    title: "style.th.buttons.cancel.inactive",
                                                    children: [
                                                        {
                                                            name: "backgroundColor",
                                                            attr: "style.th.buttons.cancel.inactive.backgroundColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#E1E5E8",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.th.buttons.cancel.inactive.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "active",
                                                    level: 5,
                                                    title: "style.th.buttons.cancel.active",
                                                    children: [
                                                        {
                                                            name: "backgroundColor",
                                                            attr: "style.th.buttons.cancel.active.backgroundColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#F17171",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.th.buttons.cancel.active.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
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
                            attr: "rows",
                            level: 2,
                            title: "style.rows",
                            children: [
                                {
                                    name: "outline",
                                    attr: "style.rows.outline",
                                    type: "text",
                                    defaultVal: "1px solid #FFFFFF",
                                },
                                {
                                    attr: "even",
                                    level: 3,
                                    title: "style.rows.even",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.rows.even.backgroundColor",
                                            type: "color",
                                            defaultVal: "#F3F5F7",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.rows.even.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            attr: "selectedCell",
                                            level: 4,
                                            title: "style.rows.even.selectedCell",
                                            children: [
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.rows.even.selectedCell.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#1F77B45B",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.rows.even.selectedCell.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "selectedNeighbors",
                                            level: 4,
                                            title: "style.rows.even.selectedNeighbors",
                                            children: [
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.rows.even.selectedNeighbors.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#63DD621E",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.rows.even.selectedNeighbors.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "odd",
                                    level: 3,
                                    title: "style.rows.odd",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.rows.odd.backgroundColor",
                                            type: "color",
                                            defaultVal: "#F3F5F7",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.rows.odd.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            attr: "selectedCell",
                                            level: 4,
                                            title: "style.rows.odd.selectedCell",
                                            children: [
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.rows.odd.selectedCell.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#1F77B45B",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.rows.odd.selectedCell.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "selectedNeighbors",
                                            level: 4,
                                            title: "style.rows.odd.selectedNeighbors",
                                            children: [
                                                {
                                                    name: "backgroundColor",
                                                    attr: "style.rows.odd.selectedNeighbors.backgroundColor",
                                                    type: "color",
                                                    defaultVal: "#63DD621E",
                                                },
                                                {
                                                    name: "color",
                                                    attr: "style.rows.odd.selectedNeighbors.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "inputs",
                            level: 2,
                            title: "style.inputs",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.inputs.backgroundColor",
                                    type: "color",
                                    defaultVal: "#FFFFFF",
                                },
                                {
                                    name: "color",
                                    attr: "style.inputs.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "border",
                                    attr: "style.inputs.border",
                                    type: "text",
                                    defaultVal: "'1px solid #CCCCCC'",
                                },
                                {
                                    name: "accentColor",
                                    attr: "style.inputs.accentColor",
                                    type: "color",
                                    defaultVal: "#1F77B4",
                                },
                            ],
                        },
                        {
                            attr: "dropdowns",
                            level: 2,
                            title: "style.dropdowns",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.dropdowns.backgroundColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "color",
                                    attr: "style.dropdowns.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    attr: "icons",
                                    level: 3,
                                    title: "style.dropdowns.icons",
                                    children: [
                                        {
                                            attr: "selected",
                                            level: 4,
                                            title: "style.dropdowns.icons.selected",
                                            children: [
                                                {
                                                    name: "color",
                                                    attr: "style.dropdowns.icons.selected.color",
                                                    type: "color",
                                                    defaultVal: "#2CA02C",
                                                },
                                                {
                                                    name: "unicode",
                                                    attr: "style.dropdowns.icons.selected.unicode",
                                                    type: "text",
                                                    defaultVal: "'✔'",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "unselected",
                                            level: 4,
                                            title: "style.dropdowns.icons.unselected",
                                            children: [
                                                {
                                                    name: "color",
                                                    attr: "style.dropdowns.icons.unselected.color",
                                                    type: "color",
                                                    defaultVal: "#D62728",
                                                },
                                                {
                                                    name: "unicode",
                                                    attr: "style.dropdowns.icons.unselected.unicode",
                                                    type: "text",
                                                    defaultVal: "'✖'",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "infoBar",
                            level: 2,
                            title: "style.infoBar",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.infoBar.backgroundColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "color",
                                    attr: "style.infoBar.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                            ],
                        },
                        {
                            attr: "pagination",
                            level: 2,
                            title: "style.pagination",
                            children: [
                                {
                                    attr: "buttons",
                                    level: 3,
                                    title: "style.pagination.buttons",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.pagination.buttons.backgroundColor",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.pagination.buttons.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            name: "opacityDisabled",
                                            attr: "style.pagination.buttons.opacityDisabled",
                                            type: "range",
                                            defaultVal: "0.5",
                                            min: 0.1,
                                            max: 1,
                                            step: 0.01,
                                        },
                                    ],
                                },
                                {
                                    attr: "navigationIndicator",
                                    level: 3,
                                    title: "style.pagination.navigationIndicator",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.pagination.navigationIndicator.backgroundColor",
                                            type: "color",
                                            defaultVal: "#1F77B4",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "exportMenu",
                            level: 2,
                            title: "style.exportMenu",
                            children: [
                                {
                                    name: "show",
                                    attr: "style.exportMenu.show",
                                    type: "checkbox",
                                    defaultVal: "true",
                                },
                                {
                                    name: "backgroundColor",
                                    attr: "style.exportMenu.backgroundColor",
                                    type: "color",
                                    defaultVal: "#E1E5E8",
                                },
                                {
                                    name: "color",
                                    attr: "style.exportMenu.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "filename",
                                    attr: "style.exportMenu.filename",
                                    type: "text",
                                    defaultVal: "''",
                                },
                                {
                                    attr: "buttons",
                                    level: 3,
                                    title: "style.exportMenu.buttons",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.exportMenu.buttons.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FAFAFA",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.exportMenu.buttons.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            attr: "closeButtons",
                            level: 2,
                            title: "style.closeButtons",
                            children: [
                                {
                                    name: "backgroundColor",
                                    attr: "style.closeButtons.backgroundColor",
                                    type: "color",
                                    defaultVal: "'transparent'",
                                },
                                {
                                    name: "color",
                                    attr: "style.closeButtons.color",
                                    type: "color",
                                    defaultVal: "#2D353C",
                                },
                                {
                                    name: "borderRadius",
                                    attr: "style.closeButtons.borderRadius",
                                    type: "text",
                                    defaultVal: "'50%'",
                                },
                            ],
                        },
                        {
                            attr: "chart",
                            level: 2,
                            title: "style.chart",
                            children: [
                                {
                                    attr: "modal",
                                    level: 3,
                                    title: "style.chart.modal",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.modal.backgroundColor",
                                            type: "color",
                                            defaultVal: "#E1E5E8",
                                        },
                                        {
                                            name: "color",
                                            attr: "style.chart.modal.color",
                                            type: "color",
                                            defaultVal: "#2D353C",
                                        },
                                        {
                                            attr: "buttons",
                                            level: 4,
                                            title: "style.chart.modal.buttons",
                                            children: [
                                                {
                                                    attr: "selected",
                                                    level: 5,
                                                    title: "style.chart.modal.buttons.selected",
                                                    children: [
                                                        {
                                                            name: "backgroundColor",
                                                            attr: "style.chart.modal.buttons.selected.backgroundColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#1F77B4",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.modal.buttons.selected.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                    ],
                                                },
                                                {
                                                    attr: "unselected",
                                                    level: 5,
                                                    title: "style.chart.modal.buttons.unselected",
                                                    children: [
                                                        {
                                                            name: "backgroundColor",
                                                            attr: "style.chart.modal.buttons.unselected.backgroundColor",
                                                            type: "color",
                                                            defaultVal:
                                                                "#FFFFFF",
                                                        },
                                                        {
                                                            name: "color",
                                                            attr: "style.chart.modal.buttons.unselected.color",
                                                            type: "color",
                                                            defaultVal:
                                                                "#2D353C",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    attr: "layout",
                                    level: 3,
                                    title: "style.chart.layout",
                                    children: [
                                        {
                                            name: "backgroundColor",
                                            attr: "style.chart.layout.backgroundColor",
                                            type: "color",
                                            defaultVal: "#FFFFFF",
                                        },
                                        {
                                            attr: "axis",
                                            level: 4,
                                            title: "style.chart.layout.axis",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.axis.stroke",
                                                    type: "color",
                                                    defaultVal: "#CCD1D4",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.axis.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 1,
                                                    max: 6,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "bar",
                                            level: 4,
                                            title: "style.chart.layout.bar",
                                            children: [
                                                {
                                                    name: "fill",
                                                    attr: "style.chart.layout.bar.fill",
                                                    type: "color",
                                                    defaultVal: "#1F77B4",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.bar.stroke",
                                                    type: "color",
                                                    defaultVal: "#FFFFFF",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "line",
                                            level: 4,
                                            title: "style.chart.layout.line",
                                            children: [
                                                {
                                                    name: "smooth",
                                                    attr: "style.chart.layout.line.smooth",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "useArea",
                                                    attr: "style.chart.layout.line.useArea",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.line.stroke",
                                                    type: "color",
                                                    defaultVal: "#1F77B4",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.line.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "4",
                                                    min: 1,
                                                    max: 12,
                                                },
                                                {
                                                    attr: "plot",
                                                    level: 5,
                                                    title: "style.chart.layout.line.plot",
                                                    children: [
                                                        {
                                                            name: "fill",
                                                            attr: "style.chart.layout.line.plot.fill",
                                                            type: "color",
                                                            defaultVal:
                                                                "#1F77B4",
                                                        },
                                                        {
                                                            name: "strokeWidth",
                                                            attr: "style.chart.layout.line.plot.strokeWidth",
                                                            type: "number",
                                                            defaultVal: "1",
                                                            min: 0,
                                                            max: 6,
                                                        },
                                                        {
                                                            attr: "radius",
                                                            level: 6,
                                                            title: "style.chart.layout.line.plot.radius",
                                                            children: [
                                                                {
                                                                    name: "selected",
                                                                    attr: "style.chart.layout.line.plot.radius.selected",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "6",
                                                                    min: 0,
                                                                    max: 24,
                                                                },
                                                                {
                                                                    name: "unselected",
                                                                    attr: "style.chart.layout.line.plot.radius.unselected",
                                                                    type: "number",
                                                                    defaultVal:
                                                                        "4",
                                                                    min: 0,
                                                                    max: 24,
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            attr: "labels",
                                            level: 4,
                                            title: "style.chart.layout.labels",
                                            children: [
                                                {
                                                    name: "color",
                                                    attr: "style.chart.layout.labels.color",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "progression",
                                            level: 4,
                                            title: "style.chart.layout.progression",
                                            children: [
                                                {
                                                    name: "stroke",
                                                    attr: "style.chart.layout.progression.stroke",
                                                    type: "color",
                                                    defaultVal: "#2D353C",
                                                },
                                                {
                                                    name: "strokeWidth",
                                                    attr: "style.chart.layout.progression.strokeWidth",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 0,
                                                    max: 6,
                                                },
                                                {
                                                    name: "stokeDasharray",
                                                    attr: "style.chart.layout.progression.strokeDasharray",
                                                    type: "number",
                                                    defaultVal: "4",
                                                    min: 0,
                                                    max: 12,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "timeLabels",
                                            level: 4,
                                            title: "style.chart.layout.timeLabels",
                                            children: [
                                                {
                                                    name: "showOnlyAtModulo",
                                                    attr: "style.chart.layout.timeLabels.showOnlyAtModulo",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "modulo",
                                                    attr: "style.chart.layout.timeLabels.modulo",
                                                    type: "number",
                                                    defaultVal: "2",
                                                    min: 2,
                                                    max: 24,
                                                },
                                            ],
                                        },
                                        {
                                            attr: "zoom",
                                            level: 4,
                                            title: "style.chart.layout.zoom",
                                            children: [
                                                {
                                                    name: "show",
                                                    attr: "style.chart.layout.zoom.show",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                                {
                                                    name: "autoFit",
                                                    attr: "style.chart.layout.zoom.autoFit",
                                                    type: "checkbox",
                                                    defaultVal: "true",
                                                },
                                            ],
                                        },
                                        {
                                            attr: "datetimeFormatter",
                                            level: 4,
                                            title: "style.chart.layout.datetimeFormatter",
                                            children: [
                                                {
                                                    name: "enable",
                                                    attr: "style.chart.layout.datetimeFormatter.enable",
                                                    defaultVal: "true",
                                                    type: "checkbox",
                                                },
                                                {
                                                    name: "locale",
                                                    attr: "style.chart.layout.datetimeFormatter.locale",
                                                    type: "text",
                                                    defaultVal: "en",
                                                },
                                                {
                                                    name: "useUTC",
                                                    attr: "style.chart.layout.datetimeFormatter.useUTC",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    name: "januaryAsYear",
                                                    attr: "style.chart.layout.datetimeFormatter.januaryAsYear",
                                                    type: "checkbox",
                                                    defaultVal: "false",
                                                },
                                                {
                                                    attr: "options",
                                                    level: 5,
                                                    title: "style.chart.layout.datetimeFormatter.options",
                                                    children: [
                                                        {
                                                            name: "year",
                                                            attr: "style.chart.layout.datetimeFormatter.options.year",
                                                            type: "text",
                                                            defaultVal: "yyyy",
                                                        },
                                                        {
                                                            name: "month",
                                                            attr: "style.chart.layout.datetimeFormatter.options.month",
                                                            type: "text",
                                                            defaultVal:
                                                                "MMM 'yy",
                                                        },
                                                        {
                                                            name: "day",
                                                            attr: "style.chart.layout.datetimeFormatter.options.day",
                                                            type: "text",
                                                            defaultVal:
                                                                "dd MMM",
                                                        },
                                                        {
                                                            name: "hour",
                                                            attr: "style.chart.layout.datetimeFormatter.options.hour",
                                                            type: "text",
                                                            defaultVal: "HH:mm",
                                                        },
                                                        {
                                                            name: "minute",
                                                            attr: "style.chart.layout.datetimeFormatter.options.minute",
                                                            type: "text",
                                                            defaultVal:
                                                                "HH:mm:ss",
                                                        },
                                                        {
                                                            name: "second",
                                                            attr: "style.chart.layout.datetimeFormatter.options.second",
                                                            type: "text",
                                                            defaultVal:
                                                                "HH:mm:ss",
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
                    attr: "translations",
                    level: 1,
                    children: [
                        {
                            name: "average",
                            attr: "translations.average",
                            type: "text",
                            defaultVal: "'Average'",
                        },
                        {
                            name: "by",
                            attr: "translations.by",
                            type: "text",
                            defaultVal: "'by'",
                        },
                        {
                            name: "chooseCategoryColumn",
                            attr: "translations.chooseCategoryColumn",
                            type: "text",
                            defaultVal: "'Choose category column'",
                        },
                        {
                            name: "exportAllButton",
                            attr: "translations.exportAllButton",
                            type: "text",
                            defaultVal: "'CSV all'",
                        },
                        {
                            name: "exportAllLabel",
                            attr: "translations.exportAllLabel",
                            type: "text",
                            defaultVal:
                                "'Export all rows of your current filtered dataset'",
                        },
                        {
                            name: "exportPageButton",
                            attr: "translations.exportPageButton",
                            type: "text",
                            defaultVal: "'CSV page'",
                        },
                        {
                            name: "exportPageLabel",
                            attr: "translations.exportPageLabel",
                            type: "text",
                            defaultVal: "'Export rows of the current page'",
                        },
                        {
                            name: "from",
                            attr: "translations.from",
                            type: "text",
                            defaultVal: "'From'",
                        },
                        {
                            name: "inputPlaceholder",
                            attr: "translations.inputPlaceholder",
                            type: "text",
                            defaultVal: "'Search...'",
                        },
                        {
                            name: "makeDonut",
                            attr: "translations.makeDonut",
                            type: "text",
                            defaultVal: "'Generate'",
                        },
                        {
                            name: "nb",
                            attr: "translations.nb",
                            type: "text",
                            defaultVal: "'Nb'",
                        },
                        {
                            name: "page",
                            attr: "translations.page",
                            type: "text",
                            defaultVal: "'Page'",
                        },
                        {
                            name: "paginatorLabel",
                            attr: "translations.paginatorLabel",
                            type: "text",
                            defaultVal: "'Rows per page'",
                        },
                        {
                            name: "sizeWarning",
                            attr: "translations.sizeWarning",
                            type: "text",
                            defaultVal:
                                "'Displaying too many rows at a time can lead to slower performance'",
                        },
                        {
                            name: "sum",
                            attr: "translations.sum",
                            type: "text",
                            defaultVal: "'Sum'",
                        },
                        {
                            name: "to",
                            attr: "translations.to",
                            type: "text",
                            defaultVal: "'To'",
                        },
                        {
                            name: "total",
                            attr: "translations.total",
                            type: "text",
                            defaultVal: "'Total'",
                        },
                        {
                            name: "totalRows",
                            attr: "translations.totalRows",
                            type: "text",
                            defaultVal: "'Total rows'",
                        },
                        {
                            name: "filename",
                            attr: "translations.filename",
                            type: "text",
                            defaultVal: "'File name'",
                        },
                        {
                            name: "xAxisLabels",
                            attr: "translations.xAxisLabels",
                            type: "text",
                            defaultVal: "'X axis labels'",
                        },
                    ],
                },
            ],
        },
    ];
}
