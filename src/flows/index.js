export default function useFlows() {
    const flows = {
        VueUiDonut: {
            flow: [
                // root → top‐level props
                ['vue_ui_donut', 'type', 1],
                ['vue_ui_donut', 'responsive', 1],
                ['vue_ui_donut', 'theme', 1],
                ['vue_ui_donut', 'customPalette', 1],
                ['vue_ui_donut', 'useCssAnimation', 1],
                ['vue_ui_donut', 'serieToggleAnimation', 1],
                ['vue_ui_donut', 'startAnimation', 1],
                ['vue_ui_donut', 'useBlurOnHover', 1],
                ['vue_ui_donut', 'userOptions', 1],
                ['vue_ui_donut', 'translations', 1],
                ['vue_ui_donut', 'table', 1],
                ['vue_ui_donut', 'style', 1],
              
                // serieToggleAnimation
                ['serieToggleAnimation', 'show', 1],
                ['serieToggleAnimation', 'durationMs', 1],
              
                // startAnimation
                ['startAnimation', 'show', 1],
                ['startAnimation', 'durationMs', 1],
                ['startAnimation', 'staggerMs', 1],
              
                // userOptions
                ['userOptions', 'tooltip', 1],
                ['userOptions', 'pdf', 1],
                ['userOptions', 'csv', 1],
                ['userOptions', 'img', 1],
                ['userOptions', 'table', 1],
                ['userOptions', 'labels', 1],
                ['userOptions', 'fullscreen', 1],
                ['userOptions', 'annotator', 1],
              
                // translations
                ['translations', 'total', 1],
                ['translations', 'average', 1],
              
                // table
                ['table', 'th', 1],
                ['table', 'td', 1],
                ['table', 'columnNames', 1],
              
                // table.columnNames
                ['columnNames', 'series', 1],
                ['columnNames', 'value', 1],
                ['columnNames', 'percentage', 1],
              
                // style → chart
                ['style', 'chart', 1],
              
                // chart props
                ['chart', 'useGradient', 1],
                ['chart', 'gradientIntensity', 1],
                ['chart', 'backgroundColor', 1],
                ['chart', 'color', 1],
                ['chart', 'padding', 1],
                ['chart', 'layout', 1],
                ['chart', 'comments', 1],
                ['chart', 'legend', 1],
                ['chart', 'tooltip', 1],
                ['chart', 'title', 1],
              
                // chart.padding
                ['padding', 'top', 1],
                ['padding', 'right', 1],
                ['padding', 'bottom', 1],
                ['padding', 'left', 1],
              
                // layout → labels & donut
                ['layout', 'labels', 1],
                ['layout', 'donut', 1],
              
                // layout.labels → dataLabels, value, percentage, name, hollow
                ['labels', 'dataLabels', 1],
                ['labels', 'value', 1],
                ['labels', 'percentage', 1],
                ['labels', 'name', 1],
                ['labels', 'hollow', 1],
              
                // dataLabels
                ['dataLabels', 'show', 1],
                ['dataLabels', 'useLabelSlots', 1],
                ['dataLabels', 'hideUnderValue', 1],
                ['dataLabels', 'prefix', 1],
                ['dataLabels', 'suffix', 1],
              
                // value
                ['value', 'rounding', 1],
                ['value', 'show', 1],
              
                // percentage
                ['percentage', 'color', 1],
                ['percentage', 'bold', 1],
                ['percentage', 'fontSize', 1],
                ['percentage', 'rounding', 1],
              
                // name
                ['name', 'color', 1],
                ['name', 'bold', 1],
                ['name', 'fontSize', 1],
              
                // hollow → total & average
                ['hollow', 'total', 1],
                ['hollow', 'average', 1],
              
                // hollow.total
                ['total', 'show', 1],
                ['total', 'bold', 1],
                ['total', 'fontSize', 1],
                ['total', 'color', 1],
                ['total', 'text', 1],
                ['total', 'offsetY', 1],
                ['total', 'value', 1],
              
                // hollow.total.value
                ['value', 'color', 1],
                ['value', 'fontSize', 1],
                ['value', 'bold', 1],
                ['value', 'suffix', 1],
                ['value', 'prefix', 1],
                ['value', 'offsetY', 1],
                ['value', 'rounding', 1],
              
                // donut
                ['donut', 'strokeWidth', 1],
                ['donut', 'borderWidth', 1],
                ['donut', 'useShadow', 1],
                ['donut', 'shadowColor', 1],
              
                // comments
                ['comments', 'show', 1],
                ['comments', 'showInTooltip', 1],
                ['comments', 'width', 1],
                ['comments', 'offsetY', 1],
                ['comments', 'offsetX', 1],
              
                // legend
                ['legend', 'roundingValue', 1],
                ['legend', 'roundingPercentage', 1],
              
                // tooltip
                ['tooltip', 'showValue', 1],
                ['tooltip', 'showPercentage', 1],
                ['tooltip', 'roundingValue', 1],
                ['tooltip', 'roundingPercentage', 1],
              ],
              nodeCategories: {
                // core configuration
                type:               'core',
                responsive:         'core',
                theme:              'core',
                customPalette:      'core',
                useCssAnimation:    'core',
              
                // animations
                serieToggleAnimation: 'animations',
                startAnimation:       'animations',
                useBlurOnHover:       'animations',
              
                // user‐controllable options
                userOptions:        'user options',
              
                // localization / translations
                translations:       'translations',
              
                // the built-in data-table
                table:              'table',
              
                // all styling under “style”
                style:              'style'
              },
              nodeCategoryColors: {
                core:            '#1f77b4',  // blue
                animations:      '#ff7f0e',  // orange
                'user options':  '#2ca02c',  // green
                translations:    '#d62728',  // red
                table:           '#9467bd',  // purple
                style:           '#8c564b'   // brown
              }
        },
        VueUiXy: {
            flow: [
                // top‐level
                ["vue_ui_xy", "theme", 1],
                ["vue_ui_xy", "responsive", 1],
                ["vue_ui_xy", "customPalette", 1],
                ["vue_ui_xy", "useCssAnimation", 1],
                ["vue_ui_xy", "downsample", 1],
                ["vue_ui_xy", "chart", 1],
                ["vue_ui_xy", "bar", 1],
                ["vue_ui_xy", "line", 1],
                ["vue_ui_xy", "plot", 1],
                ["vue_ui_xy", "table", 1],
                ["vue_ui_xy", "showTable", 1],

                // chart
                ["chart", "fontFamily", 1],
                ["chart", "backgroundColor", 1],
                ["chart", "color", 1],
                ["chart", "height", 1],
                ["chart", "width", 1],
                ["chart", "zoom", 1],
                ["chart", "padding", 1],
                ["chart", "highlighter", 1],
                ["chart", "highlightArea", 1],
                ["chart", "timeTag", 1],
                ["chart", "grid", 1],
                ["chart", "comments", 1],
                ["chart", "labels", 1],
                ["chart", "legend", 1],
                ["chart", "title", 1],
                ["chart", "tooltip", 1],
                ["chart", "userOptions", 1],

                // chart.zoom
                ["zoom", "minimap", 1],

                // chart.padding
                ["padding", "top", 1],
                ["padding", "right", 1],
                ["padding", "bottom", 1],
                ["padding", "left", 1],

                // chart.highlighter
                ["highlighter", "color", 1],
                ["highlighter", "opacity", 1],
                ["highlighter", "useLine", 1],
                ["highlighter", "lineDasharray", 1],
                ["highlighter", "lineWidth", 1],

                // chart.highlightArea
                ["highlightArea", "show", 1],
                ["highlightArea", "from", 1],
                ["highlightArea", "to", 1],
                ["highlightArea", "color", 1],
                ["highlightArea", "opacity", 1],
                ["highlightArea", "caption", 1],

                // chart.highlightArea.caption
                ["caption", "text", 1],
                ["caption", "fontSize", 1],
                ["caption", "color", 1],
                ["caption", "bold", 1],
                ["caption", "offsetY", 1],
                ["caption", "width", 1],
                ["caption", "padding", 1],
                ["caption", "textAlign", 1],

                // chart.timeTag
                ["timeTag", "show", 1],
                ["timeTag", "backgroundColor", 1],
                ["timeTag", "color", 1],
                ["timeTag", "fontSize", 1],
                ["timeTag", "circleMarker", 1],

                // chart.timeTag.circleMarker
                ["circleMarker", "radius", 1],
                ["circleMarker", "color", 1],

                // chart.grid
                ["grid", "stroke", 1],
                ["grid", "showVerticalLines", 1],
                ["grid", "showHorizontalLines", 1],
                ["grid", "position", 1],
                ["grid", "frame", 1],
                ["grid", "labels", 1],

                // chart.grid.frame
                ["frame", "show", 1],
                ["frame", "stroke", 1],
                ["frame", "strokeWidth", 1],
                ["frame", "strokeLinecap", 1],
                ["frame", "strokeLinejoin", 1],
                ["frame", "strokeDasharray", 1],

                // chart.grid.labels
                ["labels", "show", 1],
                ["labels", "color", 1],
                ["labels", "fontSize", 1],
                ["labels", "axis", 1],
                ["labels", "zeroLine", 1],
                ["labels", "xAxis", 1],
                ["labels", "yAxis", 1],
                ["labels", "xAxisLabels", 1],

                // chart.grid.labels.axis
                ["axis", "yLabel", 1],
                ["axis", "yLabelOffsetX", 1],
                ["axis", "xLabel", 1],
                ["axis", "xLabelOffsetY", 1],
                ["axis", "fontSize", 1],

                // chart.grid.labels.zeroLine
                ["zeroLine", "show", 1],

                // chart.grid.labels.xAxis
                ["xAxis", "showBaseline", 1],

                // chart.grid.labels.yAxis
                ["yAxis", "position", 1],
                ["yAxis", "showBaseline", 1],
                ["yAxis", "commonScaleSteps", 1],
                ["yAxis", "useIndividualScale", 1],
                ["yAxis", "stacked", 1],
                ["yAxis", "gap", 1],
                ["yAxis", "labelWidth", 1],
                ["yAxis", "formatter", 1],
                ["yAxis", "scaleMin", 1],
                ["yAxis", "scaleMax", 1],
                ["yAxis", "groupColor", 1],
                ["yAxis", "scaleLabelOffsetX", 1],
                ["yAxis", "scaleValueOffsetX", 1],

                // chart.grid.labels.xAxisLabels
                ["xAxisLabels", "color", 1],
                ["xAxisLabels", "show", 1],
                ["xAxisLabels", "values", 1],
                ["xAxisLabels", "fontSize", 1],
                ["xAxisLabels", "showOnlyFirstAndLast", 1],
                ["xAxisLabels", "showOnlyAtModulo", 1],
                ["xAxisLabels", "modulo", 1],
                ["xAxisLabels", "yOffset", 1],
                ["xAxisLabels", "rotation", 1],

                // chart.comments
                ["comments", "show", 1],
                ["comments", "showInTooltip", 1],
                ["comments", "width", 1],
                ["comments", "offsetX", 1],
                ["comments", "offsetY", 1],

                // chart.labels
                ["labels", "fontSize", 1],
                ["labels", "prefix", 1],
                ["labels", "suffix", 1],

                // chart.legend
                ["legend", "color", 1],
                ["legend", "show", 1],
                ["legend", "fontSize", 1],

                // chart.title
                ["title", "show", 1],

                // chart.tooltip
                ["tooltip", "showTimeLabel", 1],
                ["tooltip", "showValue", 1],
                ["tooltip", "showPercentage", 1],
                ["tooltip", "roundingValue", 1],
                ["tooltip", "roundingPercentage", 1],

                // chart.userOptions
                ["userOptions", "tooltip", 1],
                ["userOptions", "pdf", 1],
                ["userOptions", "csv", 1],
                ["userOptions", "img", 1],
                ["userOptions", "table", 1],
                ["userOptions", "labels", 1],
                ["userOptions", "fullscreen", 1],
                ["userOptions", "stack", 1],
                ["userOptions", "annotator", 1],

                // bar
                ["bar", "borderRadius", 1],
                ["bar", "useGradient", 1],
                ["bar", "periodGap", 1],
                ["bar", "border", 1],
                ["bar", "labels", 1],
                ["bar", "serieName", 1],

                // bar.border
                ["border", "useSerieColor", 1],
                ["border", "strokeWidth", 1],
                ["border", "stroke", 1],

                // bar.labels
                ["labels", "show", 1],
                ["labels", "offsetY", 1],
                ["labels", "rounding", 1],
                ["labels", "color", 1],
                ["labels", "formatter", 1],

                // bar.serieName
                ["serieName", "show", 1],
                ["serieName", "offsetY", 1],
                ["serieName", "useAbbreviation", 1],
                ["serieName", "abbreviationSize", 1],
                ["serieName", "useSerieColor", 1],
                ["serieName", "color", 1],
                ["serieName", "bold", 1],

                // line
                ["line", "radius", 1],
                ["line", "useGradient", 1],
                ["line", "strokeWidth", 1],
                ["line", "cutNullValues", 1],
                ["line", "dot", 1],
                ["line", "labels", 1],
                ["line", "area", 1],
                ["line", "tag", 1],

                // line.dot
                ["dot", "hideAboveMaxSerieLength", 1],
                ["dot", "useSerieColor", 1],
                ["dot", "fill", 1],
                ["dot", "strokeWidth", 1],

                // line.labels
                ["labels", "show", 1],
                ["labels", "offsetY", 1],
                ["labels", "rounding", 1],
                ["labels", "color", 1],
                ["labels", "formatter", 1],

                // line.area
                ["area", "useGradient", 1],
                ["area", "opacity", 1],

                // line.tag
                ["tag", "followValue", 1],
                ["tag", "formatter", 1],
                ["tag", "fontSize", 1],

                // plot
                ["plot", "radius", 1],
                ["plot", "useGradient", 1],
                ["plot", "dot", 1],
                ["plot", "labels", 1],
                ["plot", "tag", 1],

                // plot.dot
                ["dot", "useSerieColor", 1],
                ["dot", "fill", 1],
                ["dot", "strokeWidth", 1],

                // plot.labels
                ["labels", "show", 1],
                ["labels", "offsetY", 1],
                ["labels", "rounding", 1],
                ["labels", "color", 1],
                ["labels", "formatter", 1],

                // plot.tag
                ["tag", "followValue", 1],
                ["tag", "formatter", 1],
                ["tag", "fontSize", 1],

                // table
                ["table", "responsiveBreakpoint", 1],
                ["table", "rounding", 1],
                ["table", "sparkline", 1],
                ["table", "showSum", 1],
                ["table", "columnNames", 1],

                // table.columnNames
                ["columnNames", "period", 1],
                ["columnNames", "total", 1],

                // table.th & table.td —  skip the deep fields there
            ],
            nodeCategories: {
                // top-level
                vue_ui_xy:        "root",
                theme:            "root",
                responsive:       "root",
                customPalette:    "root",
                useCssAnimation:  "root",
                downsample:       "root",
                chart:            "root",
                bar:              "root",
                line:             "root",
                plot:             "root",
                table:            "root",
                showTable:        "root",
              
                // chart → direct props
                fontFamily:    "chart",
                backgroundColor:"chart",
                color:         "chart",
                height:        "chart",
                width:         "chart",
                zoom:          "chart",
                padding:       "chart",
                highlighter:   "chart",
                highlightArea: "chart",
                timeTag:       "chart",
                grid:          "chart",
                comments:      "chart",
                labels:        "chart",
                legend:        "chart",
                title:         "chart",
                tooltip:       "chart",
                userOptions:   "chart",
              
                // chart.zoom
                minimap:       "zoom",
              
                // chart.padding
                top:           "padding",
                right:         "padding",
                bottom:        "padding",
                left:          "padding",
              
                // chart.highlighter
                opacity:       "highlighter",
                useLine:       "highlighter",
                lineDasharray: "highlighter",
                lineWidth:     "highlighter",
              
                // chart.highlightArea
                show:          "highlightArea",
                from:          "highlightArea",
                to:            "highlightArea",
                opacity:       "highlightArea",
                caption:       "highlightArea",
              
                // chart.highlightArea.caption
                text:          "caption",
                fontSize:      "caption",
                bold:          "caption",
                offsetY:       "caption",
                width:         "caption",
                padding:       "caption",
                textAlign:     "caption",
              
                // chart.timeTag
                show:             "timeTag",
                fontSize:         "timeTag",
                circleMarker:     "timeTag",
              
                // chart.timeTag.circleMarker
                radius:           "circleMarker",
              
                // chart.grid
                showVerticalLines: "grid",
                showHorizontalLines:"grid",
                position:         "grid",
                frame:            "grid",
                labels:           "grid",
              
                // chart.grid.frame
                strokeWidth:      "frame",
                strokeLinecap:    "frame",
                strokeLinejoin:   "frame",
                strokeDasharray:  "frame",
              
                // chart.grid.labels
                axis:           "labels",
                zeroLine:       "labels",
                xAxis:          "labels",
                yAxis:          "labels",
                xAxisLabels:    "labels",
              
                // chart.grid.labels.axis
                yLabel:         "axis",
                yLabelOffsetX:  "axis",
                xLabel:         "axis",
                xLabelOffsetY:  "axis",
              
                // chart.grid.labels.yAxis
                commonScaleSteps:    "yAxis",
                useIndividualScale:  "yAxis",
                stacked:             "yAxis",
                gap:                 "yAxis",
                labelWidth:          "yAxis",
                scaleMin:            "yAxis",
                scaleMax:            "yAxis",
                groupColor:          "yAxis",
                scaleLabelOffsetX:   "yAxis",
                scaleValueOffsetX:   "yAxis",
              
                // chart.grid.labels.xAxisLabels
                values:        "xAxisLabels",
                showOnlyFirstAndLast:"xAxisLabels",
                showOnlyAtModulo:    "xAxisLabels",
                modulo:         "xAxisLabels",
                yOffset:        "xAxisLabels",
                rotation:       "xAxisLabels",
              
                // chart.comments
                showInTooltip: "comments",
                width:         "comments",
                offsetX:       "comments",
              
                // chart.labels (top-level)
                prefix:        "labels",
                suffix:        "labels",
              
                // chart.legend (top-level)
                fontSize:      "legend",
              
                // chart.tooltip (top-level)
                showTimeLabel:    "tooltip",
                showValue:        "tooltip",
                roundingValue:    "tooltip",
                roundingPercentage:"tooltip",
              
                // chart.userOptions
                tooltip:      "userOptions",
                pdf:          "userOptions",
                csv:          "userOptions",
                img:          "userOptions",
                table:        "userOptions",
                labels:       "userOptions",
                fullscreen:   "userOptions",
                stack:        "userOptions",
                annotator:    "userOptions",
              
                // bar
                borderRadius: "bar",
                useGradient:  "bar",
                periodGap:    "bar",
                border:       "bar",
                serieName:    "bar",
              
                // bar.border
                useSerieColor:"border",
                strokeWidth:  "border",
              
                // bar.labels
                show:         "bar.labels",
                offsetY:      "bar.labels",
                rounding:     "bar.labels",
              
                // bar.serieName
                useAbbreviation:"bar.serieName",
                abbreviationSize:"bar.serieName",
              
                // line
                radius:       "line",
                strokeWidth:  "line",
                cutNullValues:"line",
                dot:          "line",
                area:         "line",
                tag:          "line",
              
                // line.dot
                hideAboveMaxSerieLength:"dot",
                fill:         "dot",
              
                // line.labels (reuse ‘labels’)
                // line.area (reuse ‘area’)
                // line.tag (reuse ‘tag’)
              
                // plot (reuse many of the same)
                // table
                responsiveBreakpoint:"table",
                rounding:             "table",
                sparkline:            "table",
                showSum:              "table",
                columnNames:          "table",
              
                // table.columnNames
                period:        "columnNames",
                total:         "columnNames",
              },
              nodeCategoryColors: {
                root:             "#1f77b4",
                chart:            "#ff7f0e",
                zoom:             "#2ca02c",
                padding:          "#d62728",
                highlighter:      "#9467bd",
                highlightArea:    "#8c564b",
                caption:          "#e377c2",
                timeTag:          "#7f7f7f",
                circleMarker:     "#bcbd22",
                grid:             "#17becf",
                frame:            "#aec7e8",
                labels:           "#ffbb78",
                axis:             "#98df8a",
                zeroLine:         "#c5b0d5",
                xAxis:            "#c49c94",
                yAxis:            "#f7b6d2",
                xAxisLabels:      "#dbdb8d",
                comments:         "#9edae5",
                legend:           "#8c6d31",
                tooltip:          "#bd9e39",
                userOptions:      "#e7ba52",
                bar:              "#e377c2",
                border:           "#7f7f7f",
                "bar.labels":     "#17becf",
                "bar.serieName":  "#bcbd22",
                line:             "#1f77b4",
                dot:              "#ff7f0e",
                area:             "#2ca02c",
                tag:              "#d62728",
                plot:             "#9467bd",
                table:            "#8c564b",
                columnNames:      "#e377c2",
              }
        },
        VueUiFlow: {
            flow: [
                // root
                ['Config', 'theme', 1],
                ['Config', 'customPalette', 1],
                ['Config', 'userOptions', 1],
                ['Config', 'nodeCategories', 1],
                ['Config', 'nodeCategoryColors', 1],
                ['Config', 'style', 1],
                ['Config', 'table', 1],

                // userOptions
                ['userOptions', 'show', 1],
                ['userOptions', 'showOnChartHover', 1],
                ['userOptions', 'position', 1],
                ['userOptions', 'buttons', 1],
                ['buttons', 'pdf', 1],
                ['buttons', 'csv', 1],
                ['buttons', 'img', 1],
                ['buttons', 'table', 1],
                ['buttons', 'fullscreen', 1],
                ['buttons', 'annotator', 1],
                ['buttons', 'tooltip', 1],
                ['userOptions', 'buttonTitles', 1],

                // style
                ['style', 'fontFamily', 1],
                ['style', 'chart', 1],

                // chart
                ['chart', 'backgroundColor', 1],
                ['chart', 'color', 1],
                ['chart', 'padding', 1],
                ['chart', 'title', 1],
                ['chart', 'tooltip', 1],
                ['chart', 'legend', 1],
                ['chart', 'nodes', 1],
                ['chart', 'links', 1],

                // padding
                ['padding', 'top', 1],
                ['padding', 'right', 1],
                ['padding', 'bottom', 1],
                ['padding', 'left', 1],

                // title
                ['title', 'text', 1],
                ['title', 'subtitle', 1],
                ['subtitle', 'text', 1],
                ['title', 'cy', 1],

                // tooltip
                ['tooltip', 'show', 1],
                ['tooltip', 'fontSize', 1],
                ['tooltip', 'backgroundColor', 1],
                ['tooltip', 'color', 1],
                ['tooltip', 'borderColor', 1],
                ['tooltip', 'borderWidth', 1],
                ['tooltip', 'borderRadius', 1],
                ['tooltip', 'backgroundOpacity', 1],
                ['tooltip', 'position', 1],
                ['tooltip', 'offsetY', 1],
                ['tooltip', 'showPercentage', 1],
                ['tooltip', 'roundingPercentage', 1],
                ['tooltip', 'translations', 1],
                ['translations', 'from', 1],
                ['translations', 'to', 1],
                ['translations', 'percentOfTotal', 1],

                // legend
                ['legend', 'show', 1],
                ['legend', 'backgroundColor', 1],
                ['legend', 'color', 1],
                ['legend', 'fontSize', 1],
                ['legend', 'paddingBottom', 1],
                ['legend', 'paddingTop', 1],
                ['legend', 'bold', 1],
                ['legend', 'cy', 1],

                // nodes
                ['nodes', 'gap', 1],
                ['nodes', 'minHeight', 1],
                ['nodes', 'width', 1],
                ['nodes', 'labels', 1],
                ['nodes', 'stroke', 1],
                ['nodes', 'strokeWidth', 1],

                // labels
                ['labels', 'fontSize', 1],
                ['labels', 'abbreviation', 1],
                ['labels', 'prefix', 1],
                ['labels', 'suffix', 1],
                ['labels', 'rounding', 1],
                ['labels', 'formatter', 1],

                // abbreviation
                ['abbreviation', 'use', 1],
                ['abbreviation', 'length', 1],

                // links
                ['links', 'width', 1],
                ['links', 'opacity', 1],
                ['links', 'stroke', 1],
                ['links', 'strokeWidth', 1],

                // table
                ['table', 'show', 1],
                ['table', 'responsiveBreakpoint', 1],
                ['table', 'columnNames', 1],
                ['columnNames', 'source', 1],
                ['columnNames', 'target', 1],
                ['columnNames', 'value', 1],
                ['table', 'th', 1],
                ['table', 'td', 1],

                // th
                ['th', 'backgroundColor', 1],
                ['th', 'color', 1],
                ['th', 'outline', 1],

                // td
                ['td', 'backgroundColor', 1],
                ['td', 'color', 1],
                ['td', 'outline', 1],
            ],
            nodeCategories: {
                // top‐level
                theme: 'config',
                customPalette: 'config',
                userOptions: 'config',
                nodeCategories: 'config',
                nodeCategoryColors: 'config',
                style: 'config',
                table: 'config',

                // userOptions
                show: 'userOptions',
                showOnChartHover: 'userOptions',
                position: 'userOptions',
                buttons: 'userOptions',
                buttonTitles: 'userOptions',

                // buttons
                pdf: 'userOptionsButtons',
                csv: 'userOptionsButtons',
                img: 'userOptionsButtons',
                table: 'userOptionsButtons',
                fullscreen: 'userOptionsButtons',
                annotator: 'userOptionsButtons',
                tooltip: 'userOptionsButtons',

                // style
                fontFamily: 'style',
                chart: 'style',

                // chart
                backgroundColor: 'chart',
                color: 'chart',
                padding: 'chart',
                title: 'chart',
                tooltip: 'chart',
                legend: 'chart',
                nodes: 'chart',
                links: 'chart',

                // padding
                top: 'chartPadding',
                right: 'chartPadding',
                bottom: 'chartPadding',
                left: 'chartPadding',

                // title
                text: 'chartTitle',
                subtitle: 'chartTitle',
                cy: 'chartTitle',
                // subtitle.text lives under the same category

                // tooltip
                show: 'chartTooltip',
                fontSize: 'chartTooltip',
                backgroundColor: 'chartTooltip',
                color: 'chartTooltip',
                borderColor: 'chartTooltip',
                borderWidth: 'chartTooltip',
                borderRadius: 'chartTooltip',
                backgroundOpacity: 'chartTooltip',
                position: 'chartTooltip',
                offsetY: 'chartTooltip',
                showPercentage: 'chartTooltip',
                roundingPercentage: 'chartTooltip',
                translations: 'chartTooltip',
                from: 'chartTooltipTranslations',
                to: 'chartTooltipTranslations',
                percentOfTotal: 'chartTooltipTranslations',

                // legend
                show: 'chartLegend',
                backgroundColor: 'chartLegend',
                color: 'chartLegend',
                fontSize: 'chartLegend',
                paddingBottom: 'chartLegend',
                paddingTop: 'chartLegend',
                bold: 'chartLegend',
                cy: 'chartLegend',

                // nodes
                gap: 'chartNodes',
                minHeight: 'chartNodes',
                width: 'chartNodes',
                labels: 'chartNodes',
                stroke: 'chartNodes',
                strokeWidth: 'chartNodes',

                // labels
                fontSize: 'chartLabels',
                abbreviation: 'chartLabels',
                prefix: 'chartLabels',
                suffix: 'chartLabels',
                rounding: 'chartLabels',
                formatter: 'chartLabels',

                // abbreviation
                use: 'chartLabelsAbbreviation',
                length: 'chartLabelsAbbreviation',

                // links
                width: 'chartLinks',
                opacity: 'chartLinks',
                stroke: 'chartLinks',
                strokeWidth: 'chartLinks',

                // table
                show: 'table',
                responsiveBreakpoint: 'table',
                columnNames: 'table',
                th: 'table',
                td: 'table',

                // columnNames
                source: 'tableColumnNames',
                target: 'tableColumnNames',
                value: 'tableColumnNames',

                // th
                backgroundColor: 'tableTh',
                color: 'tableTh',
                outline: 'tableTh',

                // td
                backgroundColor: 'tableTd',
                color: 'tableTd',
                outline: 'tableTd',
            },
            nodeCategoryColors: {
                // top‐level
                config: '#1f77b4',
                userOptions: '#ff7f0e',
                userOptionsButtons: '#2ca02c',
                style: '#d62728',

                // chart
                chart: '#9467bd',
                chartPadding: '#8c564b',
                chartTitle: '#e377c2',
                chartTooltip: '#bcbd22',
                chartTooltipTranslations: '#17becf',
                chartLegend: '#aec7e8',
                chartNodes: '#98df8a',
                chartLabels: '#ff9896',
                chartLabelsAbbreviation: '#c5b0d5',
                chartLinks: '#c49c94',

                // table
                table: '#dbdb8d',
                tableColumnNames: '#9edae5',
                tableTh: '#393b79',
                tableTd: '#5254a3',
            },
        }
    }

    return flows;
}