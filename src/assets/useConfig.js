export function useConfig() {
    const COLOR_BLACK = '#2D353C'
    const COLOR_GREY = '#A1A1A1'
    const COLOR_GREY_LIGHT = '#e1e5e8'
    const COLOR_GREY_MID = '#CCCCCC'
    const COLOR_GREY_DARK = '#4A4A4A'
    const COLOR_WHITE = '#FFFFFF'
    const COLOR_WHITE_ALMOST = '#fafafa'
    const COLOR_BLUE = '#1f77b4'
    const COLOR_RED = '#d62728'
    const COLOR_GREEN = '#2ca02c'
    const COLOR_VUE = '#42d392'
    const COLOR_YELLOW = '#FFD055'

    const FONT = {
        _6: 6,
        _8: 8,
        _10: 10,
        _12: 12,
        _14: 14,
        _16: 16,
        _18: 18,
        _20: 20,
        _24: 24,
        _32: 32,
        _48: 48
    }

    const MIN_FONT_SIZE = FONT._6;

    // -------------------------
    // COMBOS TO APPLY

    /**
     * Sets background and text color.
     * 
     * @param {string} [backgroundColor] - Background color (default is #FFFFFF).
     * @param {string} [color] - Text color (default is #2D353C).
     * @returns {{backgroundColor: string, color: string}} An object with the background color and text color.
     */
    const BG_AND_COLOR = (backgroundColor = COLOR_WHITE, color = COLOR_BLACK) => {
        return { backgroundColor, color }
    }

    const PREFIX_SUFFIX = {
        prefix: '',
        suffix: ''
    }

    // --------------------------

    const SHAPE = {
        LINE: 'line',
        SQUARE: 'square',
        ROUND: 'round',
        CIRCLE: 'circle',
        CURVED: 'curved',
        BAR: 'bar',
        STAR: 'star'
    }

    const POSITION = {
        LEFT: 'left',
        CENTER: 'center',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        TOP: 'top'
    }

    const SORT = {
        ASC: 'asc',
        DESC: 'desc',
        NONE: 'none'
    }

    const LTTB = {
        threshold: 1095, // v2 = 500
    }

    const TITLE = {
        text: "",
        color: COLOR_BLACK,
        fontSize: FONT._20,
        bold: true,
        textAlign: POSITION.CENTER,
        paddingLeft: 0,
        paddingRight: 0,
        subtitle: {
            color: COLOR_GREY,
            text: "",
            fontSize: FONT._16,
            bold: false
        }
    }

    const LEGEND = {
        show: true,
        bold: false,
        backgroundColor: COLOR_WHITE,
        color: COLOR_BLACK,
        fontSize: FONT._14
    }

    const TOOLTIP = {
        show: true,
        color: COLOR_BLACK,
        backgroundColor: COLOR_WHITE,
        fontSize: FONT._14,
        customFormat: null,
        borderRadius: 4,
        borderColor: COLOR_GREY_LIGHT,
        borderWidth: 1,
        backgroundOpacity: 100,
        position: POSITION.CENTER,
        offsetY: 24,
        smooth: true, // v3
        backdropFilter: true, // v3
    }

    const AXIS_DATE_FORMATTER = {
        enable: false,
        locale: 'en',
        useUTC: false,
        januaryAsYear: false,
        options: {
            year: 'yyyy',
            month: `MMM 'yy`,
            day: 'dd MMM',
            hour: 'HH:mm',
            minute: 'HH:mm:ss',
            second: 'HH:mm:ss'
        }
    }

    const USER_OPTIONS = ({
        tooltip = false,
        pdf = false,
        csv = false,
        img = false,
        table = false,
        labels = false,
        fullscreen = false,
        sort = false,
        stack = false,
        animation = false,
        annotator = false
    }) => {

        const buttonTitles = {
            open: 'Open options',
            close: 'Close options',
            tooltip: 'Toggle tooltip',
            pdf: 'Download PDF',
            csv: 'Download CSV',
            img: 'Download PNG',
            table: 'Toggle table',
            labels: 'Toggle labels',
            fullscreen: 'Toggle fullscreen',
            sort: "Toggle sort",
            stack: "Toggle stack mode",
            animation: "Toggle animation",
            annotator: "Toggle annotator"
        }

        if (!tooltip) delete buttonTitles.tooltip
        if (!pdf) delete buttonTitles.pdf
        if (!csv) delete buttonTitles.csv
        if (!img) delete buttonTitles.img
        if (!table) delete buttonTitles.table
        if (!labels) delete buttonTitles.labels
        if (!fullscreen) delete buttonTitles.fullscreen
        if (!sort) delete buttonTitles.sort
        if (!stack) delete buttonTitles.stack
        if (!animation) delete buttonTitles.animation
        if (!annotator) delete buttonTitles.annotator

        return {
            show: true,
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: 'right',
            buttons: {
                tooltip,
                pdf,
                csv,
                img,
                table,
                labels,
                fullscreen,
                sort,
                stack,
                animation,
                annotator
            },
            callbacks: {
                animation: null,
                annotator: null,
                csv: null,
                fullscreen: null,
                img: null,
                labels: null,
                pdf: null,
                sort: null,
                stack: null,
                table: null,
                tooltip: null,
            },
            buttonTitles,
            print: {
                allowTaint: false,
                backgroundColor: COLOR_WHITE,
                useCORS: false,
                onclone: null,
                scale: 2,
                logging: false
            }
        }
    }

    /**
     * @param {Number[]} p - [T,R,B,L]
     */
    const PADDING = p => {
        return {
            top: p[0],
            right: p[1],
            bottom: p[2],
            left: p[3]
        }
    }

    const TABLE_TH = {
        backgroundColor: COLOR_WHITE_ALMOST,
        color: COLOR_BLACK,
        outline: 'none'
    }

    const TABLE_TD = {
        backgroundColor: COLOR_WHITE,
        color: COLOR_BLACK,
        outline: 'none',
    }

    const TABLE = {
        show: false,
        responsiveBreakpoint: 400
    }

    const ZOOM = {
        show: true,
        color: COLOR_GREY_MID,
        highlightColor: COLOR_GREY_DARK,
        fontSize: FONT._14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null,
        enableRangeHandles: true,
        enableSelectionDrag: true
    }

    const MINIMAP = {
        show: false,
        smooth: false,
        selectedColor: COLOR_BLUE,
        selectedColorOpacity: 0.2,
        lineColor: COLOR_BLACK,
        selectionRadius: 2,
        indicatorColor: COLOR_BLACK,
        verticalHandles: false,
    }

    const vue_ui_stackbar = {
        loading: false, // v3
        debug: false, // v3
        theme: '',
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        customPalette: [],
        useCssAnimation: false, // v3 (v2 = true)
        orientation: 'vertical', // or 'horizontal'
        table: {
            ...TABLE,
            columnNames: {
                period: 'Period',
                total: 'Total'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0
            },
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 500,
                width: 800,
                padding: PADDING([12, 12, 12, 12]),
                title: TITLE,
                legend: {
                    ...LEGEND,
                    position: 'bottom'
                },
                zoom: ZOOM,
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showTimeLabel: true
                },
                highlighter: {
                    color: COLOR_BLACK,
                    opacity: 5
                },
                bars: {
                    gapRatio: 0.5,
                    distributed: false,
                    showDistributedPercentage: true,
                    borderRadius: 0,
                    strokeWidth: 1,
                    gradient: {
                        show: true,
                        intensity: 20
                    },
                    totalValues: {
                        show: true,
                        offsetY: 0,
                        fontSize: FONT._16,
                        bold: false,
                        color: COLOR_BLACK
                    },
                    dataLabels: {
                        show: true,
                        hideEmptyValues: false,
                        hideUnderValue: null,
                        hideEmptyPercentages: false,
                        hideUnderPercentage: null,
                        adaptColorToBackground: true,
                        color: COLOR_BLACK,
                        fontSize: FONT._14,
                        bold: false,
                        rounding: 0,
                        prefix: '',
                        suffix: '',
                        formatter: null
                    }
                },
                grid: {
                    scale: {
                        ticks: 10,
                        scaleMin: null, // Force min scale (defaults to dataset's min)
                        scaleMax: null, // Force max scale (defaults to dataset's max)
                    },
                    x: {
                        showAxis: true,
                        showHorizontalLines: false,
                        axisColor: COLOR_GREY_LIGHT,
                        linesColor: COLOR_GREY_LIGHT,
                        linesThickness: 1,
                        linesStrokeDasharray: 0,
                        axisThickness: 2,
                        axisName: {
                            show: true,
                            text: '',
                            fontSize: FONT._14,
                            color: COLOR_BLACK,
                            bold: false,
                            offsetY: 0,
                        },
                        timeLabels: {
                            show: true,
                            values: [],
                            datetimeFormatter: AXIS_DATE_FORMATTER,
                            offsetY: 0,
                            rotation: 0,
                            autoRotate: { // v3
                                enable: true, // v3
                                angle: -30 // v3
                            },
                            fontSize: FONT._14,
                            color: COLOR_BLACK,
                            bold: false
                        }
                    },
                    y: {
                        showAxis: true,
                        showVerticalLines: false,
                        linesColor: COLOR_GREY_LIGHT,
                        linesThickness: 1,
                        linesStrokeDasharray: 0,
                        axisColor: COLOR_GREY_LIGHT,
                        axisThickness: 2,
                        axisName: {
                            show: true,
                            text: '',
                            fontSize: FONT._14,
                            color: COLOR_BLACK,
                            bold: false,
                            offsetX: 0,
                        },
                        axisLabels: {
                            formatter: null,
                            show: true,
                            color: COLOR_BLACK,
                            fontSize: FONT._14,
                            bold: false,
                            rounding: 0
                        }
                    },
                }
            }
        }
    }

    // NOTE: Any update to this config will be reflected in VueUiRidgeline, which uses VueUiXy in its dialog.
    const vue_ui_xy = {
        debug: false, // v3
        theme: '',
        responsive: false,
        loading: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null // v3
        },
        responsiveProportionalSizing: true,
        customPalette: [],
        useCssAnimation: false, // v3 (v2 = true)
        downsample: LTTB,
        chart: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            height: 600,
            width: 1000,
            // Annotations are hidden in stack mode
            annotations: [
                {
                    show: false,
                    yAxis: {
                        yTop: null,
                        yBottom: null,
                        label: {
                            text: '',
                            textAnchor: 'start', // or middle or end
                            position: 'start', // or end
                            offsetX: 0,
                            offsetY: 0,
                            padding: PADDING([12, 12, 12, 12]),
                            border: {
                                stroke: COLOR_WHITE,
                                strokeWidth: 1,
                                rx: 0,
                                ry: 0,
                            },
                            fontSize: 14,
                            color: COLOR_BLACK,
                            backgroundColor: COLOR_GREY_LIGHT
                        },
                        line: {
                            stroke: COLOR_BLACK,
                            strokeWidth: 1,
                            strokeDasharray: 0,
                        },
                        area: {
                            fill: COLOR_GREY_LIGHT,
                            opacity: 30
                        }
                    }
                }
            ],
            zoom: {
                ...ZOOM,
                minimap: MINIMAP,
                preview: { // v3
                    enable: true,
                    fill: '#CCCCCC50',
                    stroke: '#6A6A6A',
                    strokeWidth: 2,
                    strokeDasharray: 0,
                },
                useDefaultFormat: true,
                timeFormat: 'yyyy-MM-dd HH:mm:ss', // When datetimeFormatter is enabled
                customFormat: null // overrides all if callback => string
            },
            padding: PADDING([12, 12, 6, 6]),
            highlighter: {
                color: COLOR_BLACK,
                opacity: 5,
                useLine: false,
                lineDasharray: 2,
                lineWidth: 1
            },
            // Highlight area was initially a single object of type VueUiXyHighlightArea.
            // It now also works with a type VueUiXyHighlightArea[]
            highlightArea: {
                show: false,
                from: 0,
                to: 0,
                color: COLOR_BLACK,
                opacity: 20,
                caption: {
                    text: '',
                    fontSize: FONT._10,
                    color: COLOR_BLACK,
                    bold: false,
                    offsetY: 0,
                    width: 'auto',
                    padding: 3,
                    textAlign: POSITION.CENTER
                }
            },
            timeTag: {
                show: false,
                backgroundColor: COLOR_GREY_LIGHT,
                color: COLOR_BLACK,
                fontSize: FONT._12,
                circleMarker: {
                    radius: 3,
                    color: COLOR_BLACK
                },
                useDefaultFormat: true,
                timeFormat: 'yyyy-MM-dd HH:mm:ss', // When datetimeFormatter is enabled
                customFormat: null // overrides all if callback => string
            },
            grid: {
                stroke: COLOR_GREY_LIGHT,
                showVerticalLines: false,
                showHorizontalLines: false,
                position: 'middle', // or 'start'
                frame: {
                    show: false,
                    stroke: COLOR_GREY_LIGHT,
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeDasharray: 0
                },
                labels: {
                    show: true,
                    color: COLOR_BLACK,
                    fontSize: FONT._16,
                    axis: {
                        yLabel: '',
                        yLabelOffsetX: 0,
                        xLabel: '',
                        xLabelOffsetY: 0,
                        fontSize: FONT._14
                    },
                    zeroLine: {
                        show: true
                    },
                    xAxis: {
                        showBaseline: false,
                        showCrosshairs: true,
                        crosshairsAlwaysAtZero: false,
                        crosshairSize: 6,
                    },
                    yAxis: {
                        position: 'left',
                        showBaseline: true,
                        showCrosshairs: true,
                        crosshairSize: 6,
                        commonScaleSteps: 10,
                        useIndividualScale: false,
                        useNiceScale: false,
                        stacked: false,
                        gap: 12,
                        labelWidth: 64,
                        formatter: null,
                        scaleMin: null, // Overrides auto scaling
                        scaleMax: null, // idem
                        groupColor: null, // force yAxis labels color
                        scaleLabelOffsetX: 0,
                        scaleValueOffsetX: 0,
                        rounding: 1,
                        serieNameFormatter: null // v3, for individual scale & stacked modes
                    },
                    xAxisLabels: {
                        color: COLOR_BLACK,
                        show: true,
                        values: [],
                        datetimeFormatter: AXIS_DATE_FORMATTER,
                        fontSize: FONT._14,
                        showOnlyFirstAndLast: false,
                        showOnlyAtModulo: false,
                        modulo: 12,
                        yOffset: 24,
                        rotation: 0,
                        autoRotate: { // v3
                            enable: true, // v3
                            angle: -30, // v3
                        }
                    }
                }
            },
            comments: {
                show: true,
                showInTooltip: true,
                width: 200,
                offsetX: 0,
                offsetY: 0,
            },
            labels: {
                fontSize: FONT._10,
                prefix: '',
                suffix: ''
            },
            legend: {
                color: COLOR_BLACK,
                show: true,
                fontSize: FONT._14,
                position: 'bottom', // bottom | top
            },
            title: {
                ...TITLE,
                show: true,
            },
            tooltip: {
                ...TOOLTIP,
                showTimeLabel: true,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                useDefaultTimeFormat: true,
                timeFormat: 'yyyy-MM-dd HH:mm:ss', // When datetimeFormatter is used
            },
            userOptions: USER_OPTIONS({
                tooltip: true,
                pdf: true,
                csv: true,
                img: true,
                table: true,
                labels: true,
                fullscreen: true,
                stack: true,
                annotator: true
            })
        },
        bar: {
            showTransition: true,
            transitionDurationMs: 300,
            borderRadius: 2,
            useGradient: true,
            periodGap: 0.1,
            innerGap: 0,
            border: {
                useSerieColor: false,
                strokeWidth: 0,
                stroke: COLOR_WHITE
            },
            labels: {
                show: false,
                offsetY: -6,
                rounding: 0,
                color: COLOR_BLACK,
                formatter: null
            },
            serieName: {
                show: false,
                offsetY: -6,
                useAbbreviation: true,
                abbreviationSize: 3,
                useSerieColor: true,
                color: COLOR_BLACK,
                bold: false
            }
        },
        line: {
            showTransition: true,
            transitionDurationMs: 300,
            radius: 3,
            useGradient: true,
            strokeWidth: 3,
            cutNullValues: false,
            interLine: {
                pairs: [],
                colors: [],
                fillOpacity: 0.25,
            },
            dot: {
                hideAboveMaxSerieLength: 62,
                useSerieColor: true,
                fill: COLOR_WHITE,
                strokeWidth: 0.5
            },
            labels: {
                show: false,
                offsetY: -6,
                rounding: 0,
                color: COLOR_BLACK,
                formatter: null
            },
            area: {
                useGradient: true,
                opacity: 30
            },
            tag: {
                followValue: true,
                formatter: null,
                fontSize: FONT._14
            }
        },
        plot: {
            showTransition: true,
            transitionDurationMs: 300,
            radius: 3,
            useGradient: true,
            dot: {
                useSerieColor: true,
                fill: COLOR_WHITE,
                strokeWidth: 0.5
            },
            labels: {
                show: false,
                offsetY: -6,
                rounding: 0,
                color: COLOR_BLACK,
                formatter: null
            },
            tag: {
                followValue: true,
                formatter: null,
                fontSize: FONT._14
            }
        },
        table: {
            responsiveBreakpoint: 400,
            rounding: 0,
            sparkline: true,
            showSum: true,
            columnNames: {
                period: 'Period',
                total: 'Total'
            },
            th: TABLE_TH,
            td: TABLE_TD
        },
        showTable: false
    }

    const vue_ui_donut = {
        debug: false, // v3
        type: 'classic',
        loading: false, // v3
        pie: false, // v3
        autoSize: true, // false = v2
        responsive: false,
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v3 (v2 = true)
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null // v3
        },
        serieToggleAnimation: {
            show: true,
            durationMs: 500,
        },
        startAnimation: {
            show: false, // v3 (v2 = true)
            durationMs: 1000,
            staggerMs: 50
        },
        useBlurOnHover: true,
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            annotator: true,
        }),
        translations: {
            total: 'Total',
            average: 'Average'
        },
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0,
            },
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            }
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                useGradient: true,
                gradientIntensity: 40,
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                padding: PADDING([0,0,0,0]),
                width: 512,
                height: 360,
                layout: {
                    curvedMarkers: true, // v2 = false
                    labels: {
                        dataLabels: {
                            show: true,
                            useLabelSlots: false,
                            hideUnderValue: 3,
                            prefix: '',
                            suffix: '',
                        },
                        value: {
                            rounding: 0,
                            show: true,
                            formatter: null
                        },
                        percentage: {
                            color: COLOR_BLACK,
                            bold: true,
                            fontSize: FONT._18,
                            minFontSize: MIN_FONT_SIZE, // v3
                            rounding: 0,
                            formatter: null
                        },
                        name: {
                            color: COLOR_BLACK,
                            bold: false,
                            fontSize: FONT._14,
                            minFontSize: MIN_FONT_SIZE, // v3
                        },
                        hollow: {
                            show: true,
                            total: {
                                show: true,
                                bold: false,
                                fontSize: FONT._18,
                                color: COLOR_GREY,
                                text: 'Total',
                                offsetY: 0,
                                value: {
                                    color: COLOR_BLACK,
                                    fontSize: FONT._18,
                                    bold: true,
                                    suffix: '',
                                    prefix: '',
                                    offsetY: 0,
                                    rounding: 0,
                                    formatter: null
                                }
                            },
                            average: {
                                show: true,
                                bold: false,
                                fontSize: FONT._18,
                                color: COLOR_GREY,
                                text: 'Average',
                                offsetY: 0,
                                value: {
                                    color: COLOR_BLACK,
                                    fontSize: FONT._18,
                                    bold: true,
                                    suffix: '',
                                    prefix: '',
                                    offsetY: 0,
                                    rounding: 0,
                                    formatter: null
                                }
                            }
                        }
                    },
                    donut: {
                        radiusRatio: 0.3, // v3 (clamped between 0.1 and 0.5)
                        strokeWidth: 64, // v3 (v2 = 55)
                        borderWidth: 1,
                        useShadow: false,
                        shadowColor: COLOR_BLACK,
                        emptyFill: COLOR_GREY_LIGHT,
                        selectedColor: '#0000001A',
                        borderColorAuto: true,
                        borderColor: '#CCCCCC'
                    }
                },
                comments: {
                    show: true,
                    showInTooltip: true,
                    width: 100,
                    offsetY: 0,
                    offsetX: 0
                },
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showPercentage: true,
                    showValue: true,
                    position: 'bottom'
                },
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
                title: TITLE,
            }
        }
    }

    const vue_ui_treemap = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 500,
                width: 800,
                padding: PADDING([0, 0, 0, 0]),
                layout: {
                    sorted: true,
                    rects: {
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 1,
                        borderRadius: 0,
                        colorRatio: 0.3,
                        gradient: {
                            show: true,
                            intensity: 30
                        },
                        selected: {
                            stroke: COLOR_GREY_LIGHT,
                            strokeWidth: 1,
                            unselectedOpacity: 0.6
                        }
                    },
                    labels: {
                        showDefaultLabels: true,
                        fontSize: FONT._24,
                        minFontSize: FONT._10,
                        hideUnderProportion: 0.03,
                        prefix: 'Value: ',
                        suffix: '',
                        rounding: 0,
                        formatter: null
                    }
                },
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showValue: true,
                    showPercentage: true,
                    position: 'bottom'
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    roundingValue: 1
                }
            }
        },
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_waffle = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useBlurOnHover: true,
        useCustomCells: false,
        useAnimation: true,
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    labels: {
                        dataLabels: {
                            prefix: '',
                            suffix: '',
                            formatter: null
                        },
                        captions: {
                            show: false,
                            showSerieName: false,
                            serieNameAbbreviation: true,
                            serieNameMaxAbbreviationSize: 3,
                            fontSize: FONT._12,
                            showValue: true,
                            showPercentage: true,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    grid: {
                        size: 10,
                        spaceBetween: 2,
                        vertical: false
                    },
                    rect: {
                        rounded: true,
                        rounding: 2,
                        stroke: COLOR_BLACK,
                        strokeWidth: 1,
                        useGradient: true,
                        gradientIntensity: 40
                    }
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0
                },
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showValue: true,
                    showPercentage: true,
                    position: 'bottom'
                }
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_radar = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    plots: {
                        show: true,
                        radius: 2
                    },
                    outerPolygon: {
                        stroke: COLOR_GREY_MID,
                        strokeWidth: 1
                    },
                    dataPolygon: {
                        strokeWidth: 1,
                        transparent: false,
                        opacity: 20,
                        useGradient: true
                    },
                    grid: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 0.5,
                        graduations: 5
                    },
                    labels: {
                        dataLabels: {
                            show: true,
                            fontSize: FONT._12,
                            color: COLOR_BLACK
                        }
                    }
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    animation: {
                        show: true,
                        animationFrames: 60
                    }
                },
                legend: {
                    ...LEGEND,
                    roundingPercentage: 0,
                    position: 'bottom'
                }
            }
        },
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        translations: {
            target: 'Target',
            value: 'Value',
            datapoint: 'Datapoint'
        }
    }

    const vue_ui_quadrant = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        zoomAnimationFrames: 20,
        downsample: LTTB,
        style: {
            fontFamily: 'inherit',
            chart: {
                height: 512,
                width: 512,
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    labels: {
                        quadrantLabels: {
                            show: true,
                            tl: {
                                text: '',
                                color: COLOR_BLACK,
                                fontSize: FONT._16,
                                bold: true
                            },
                            tr: {
                                text: '',
                                color: COLOR_BLACK,
                                fontSize: FONT._16,
                                bold: true
                            },
                            br: {
                                text: '',
                                color: COLOR_BLACK,
                                fontSize: FONT._16,
                                bold: true
                            },
                            bl: {
                                text: '',
                                color: COLOR_BLACK,
                                fontSize: FONT._16,
                                bold: true
                            }
                        },
                        plotLabels: {
                            showAsTag: false,
                            show: true,
                            fontSize: FONT._10,
                            color: COLOR_BLACK,
                            offsetY: 8,
                            rounding: 0,
                            x: {
                                formatter: null
                            },
                            y: {
                                formatter: null
                            }
                        },
                        axisLabels: {
                            show: true,
                            fontSize: FONT._14,
                            color: {
                                positive: COLOR_BLACK,
                                negative: COLOR_BLACK
                            }
                        }
                    },
                    grid: {
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 1.5,
                        showArrows: true,
                        graduations: {
                            stroke: COLOR_GREY_LIGHT,
                            strokeWidth: 0.5,
                            show: true,
                            steps: 5,
                            fill: true,
                            color: COLOR_GREY_LIGHT,
                            roundingForce: 10
                        },
                        xAxis: {
                            min: -100,
                            max: 100,
                            auto: true,
                            name: ''
                        },
                        yAxis: {
                            min: -100,
                            max: 100,
                            auto: true,
                            name: ''
                        }
                    },
                    plots: {
                        radius: 6,
                        outline: true,
                        outlineColor: COLOR_WHITE,
                        outlineWidth: 1
                    },
                    areas: {
                        show: true,
                        opacity: 40,
                        useGradient: true
                    }
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    roundingValue: 0,
                    showShape: true,
                },
                legend: {
                    ...LEGEND,
                    position: 'bottom'
                }
            }
        },
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            annotator: true
        }),
        translations: {
            category: 'Category',
            item: 'Item',
            side: 'Side'
        }
    }

    const vue_ui_gauge = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                animation: {
                    use: true,
                    speed: 1,
                    acceleration: 1
                },
                layout: {
                    radiusRatio: 1,
                    track: {
                        size: 1,
                        useGradient: true,
                        gradientIntensity: 20
                    },
                    markers: {
                        show: true,
                        color: COLOR_BLACK,
                        bold: true,
                        fontSizeRatio: 1,
                        offsetY: 0,
                        roundingValue: 0,
                        formatter: null,
                        prefix: '',
                        suffix: '',
                    },
                    segmentSeparators: {
                        show: false,
                        offsetOut: 0,
                        offsetIn: 0,
                        stroke: COLOR_BLACK,
                        strokeWidth: 2
                    },
                    segmentNames: {
                        show: true,
                        curved: true,
                        offsetRatio: 1.1,
                        fontSize: FONT._16,
                        minFontSize: MIN_FONT_SIZE, // v3
                        useSerieColor: true,
                        color: COLOR_BLACK,
                        bold: false,
                    },
                    indicatorArc: {
                        show: false,
                        radius: 123,
                        fill: COLOR_GREY_LIGHT,
                    },
                    pointer: {
                        show: true,
                        type: 'pointy',
                        size: 1,
                        stroke: COLOR_WHITE,
                        strokeWidth: 12,
                        useRatingColor: true,
                        color: COLOR_GREY_MID,
                        circle: {
                            radius: 10,
                            stroke: COLOR_BLACK,
                            strokeWidth: 2,
                            color: COLOR_WHITE
                        }
                    }
                },
                legend: {
                    show: true,
                    fontSize: FONT._48,
                    prefix: '',
                    suffix: '',
                    roundingValue: 1,
                    showPlusSymbol: true,
                    useRatingColor: true,
                    color: COLOR_BLACK,
                    formatter: null
                },
                title: TITLE
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        }),
        translations: {
            base: 'Base'
        }
    }

    const vue_ui_wheel = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        theme: '',
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                animation: {
                    use: true,
                    speed: 0.5,
                    acceleration: 1
                },
                layout: {
                    wheel: {
                        ticks: {
                            type: 'classic', // or 'arc'
                            rounded: true,
                            inactiveColor: COLOR_GREY_LIGHT,
                            activeColor: COLOR_BLUE,
                            sizeRatio: 0.9,
                            quantity: 100, // min 100
                            strokeWidth: 5,
                            gradient: {
                                show: true,
                                shiftHueIntensity: 100
                            }
                        }
                    },
                    innerCircle: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 1
                    },
                    percentage: {
                        show: true,
                        fontSize: FONT._48,
                        rounding: 1,
                        bold: true,
                        formatter: null
                    }
                },
                title: TITLE
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        })
    }

    const vue_ui_tiremarks = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        theme: '',
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                width: 312, // v3
                height: 56, // v3
                animation: {
                    use: true,
                    speed: 0.5,
                    acceleration: 1
                },
                layout: {
                    display: 'horizontal',
                    crescendo: false,
                    curved: false,
                    curveAngleX: 10,
                    curveAngleY: 10,
                    activeColor: COLOR_BLUE,
                    inactiveColor: COLOR_GREY_LIGHT,
                    ticks: {
                        gradient: {
                            show: true,
                            shiftHueIntensity: 100
                        }
                    }
                },
                percentage: {
                    show: true,
                    useGradientColor: true,
                    color: COLOR_BLUE,
                    fontSize: FONT._16,
                    bold: true,
                    rounding: 1,
                    verticalPosition: POSITION.BOTTOM,
                    horizontalPosition: POSITION.LEFT,
                    formatter: null
                },
                title: TITLE
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        })
    }

    const vue_ui_chestnut = {
        debug: false, // v3
        loading: false, // v3
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    grandTotal: {
                        show: true,
                        fontSize: FONT._20,
                        bold: true,
                        prefix: '',
                        suffix: '',
                        roundingValue: 0,
                        color: COLOR_BLACK,
                        text: 'Grand total',
                        offsetY: 0,
                        formatter: null,
                    },
                    roots: {
                        stroke: COLOR_WHITE,
                        strokeWidth: 5,
                        useGradient: true,
                        gradientIntensity: 20,
                        underlayerColor: COLOR_WHITE,
                        labels: {
                            show: true,
                            fontSize: FONT._16,
                            adaptColorToBackground: true,
                            color: COLOR_WHITE,
                            bold: true,
                            roundingValue: 0,
                            prefix: '',
                            suffix: '',
                            formatter: null,
                            name: {
                                color: COLOR_BLACK,
                                fontSize: FONT._16,
                                bold: true
                            }
                        }
                    },
                    verticalSeparator: {
                        stroke: COLOR_WHITE,
                        strokeWidth: 5
                    },
                    links: {
                        opacity: 10
                    },
                    branches: {
                        stroke: COLOR_WHITE,
                        strokeWidth: 0,
                        borderRadius: 6,
                        useGradient: true,
                        gradientIntensity: 20,
                        underlayerColor: COLOR_WHITE,
                        widthRatio: 1.5,
                        labels: {
                            show: true,
                            fontSize: FONT._14,
                            color: COLOR_BLACK,
                            bold: true,
                            dataLabels: {
                                show: true,
                                hideUnderValue: 5,
                                fontSize: FONT._14,
                                roundingValue: 0,
                                roundingPercentage: 0,
                                prefix: '',
                                suffix: '',
                                formatter: null
                            }
                        }
                    },
                    nuts: {
                        offsetX: 20,
                        useGradient: true,
                        gradientIntensity: 30,
                        selected: {
                            useMotion: true,
                            useGradient: true,
                            gradientIntensity: 40,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            labels: {
                                dataLabels: {
                                    hideUnderValue: 5,
                                    color: COLOR_BLACK,
                                    fontSize: FONT._12,
                                    bold: true,
                                    prefix: '',
                                    suffix: '',
                                    formatter: null
                                },
                                core: {
                                    total: {
                                        color: COLOR_BLACK,
                                        fontSize: FONT._24,
                                        bold: false
                                    },
                                    value: {
                                        color: COLOR_BLACK,
                                        fontSize: FONT._24,
                                        bold: true,
                                        prefix: '',
                                        suffix: ''
                                    }
                                }
                            }
                        }
                    },
                    legend: {
                        fontSize: FONT._16,
                        color: COLOR_BLACK,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        prefix: '',
                        suffix: ''
                    },
                    title: {
                        ...TITLE,
                        offsetY: 0,
                        subtitle: {
                            ...TITLE.subtitle,
                            offsetY: 0
                        }
                    }
                }
            }
        },
        table: {
            ...TABLE,
            th: {
                ...TABLE_TH,
                translations: {
                    rootName: "root name",
                    rootValue: "root value",
                    rootToTotal: "%/total",
                    branchName: "branch name",
                    branchValue: "branch value",
                    branchToRoot: "%/root",
                    branchToTotal: "%/total",
                    nutName: "nut name",
                    nutValue: "nut value",
                    nutToBranch: "%/branch",
                    nutToRoot: "%/root",
                    nutToTotal: "%/total"
                }
            },
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        translations: {
            total: 'Total',
            proportionToTree: 'of grand total',
            of: 'of'
        }
    }

    const vue_ui_onion = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        useStartAnimation: true,
        useBlurOnHover: true,
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                useGradient: true,
                gradientIntensity: 20,
                layout: {
                    maxThickness: 64,
                    gutter: {
                        color: COLOR_GREY_LIGHT,
                        width: 0.62
                    },
                    track: {
                        width: 0.62
                    },
                    labels: {
                        show: true,
                        fontSize: FONT._14,
                        minFontSize: MIN_FONT_SIZE, // v3
                        color: COLOR_BLACK,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        bold: true,
                        offsetX: 0,
                        offsetY: 0,
                        value: {
                            show: true,
                            formatter: null
                        },
                        percentage: {
                            show: true
                        }
                    }
                },
                title: TITLE,
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    position: 'bottom'
                },
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0
                }
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            },
            translations: {
                value: 'Value',
                percentage: 'Percentage',
                serie: 'Serie'
            }
        }
    }

    const vue_ui_vertical_bar = { // v3 renamed to _horizontal_ (yet still works)
        debug: false, // v3
        loading: false, // v3
        autoSize: true, // v3
        responsive: false,
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v3 (v2 = true)
        events: {
            datapointEnter: null,
            datapointLeave: null,
            datapointClick: null
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    bars: {
                        sort: SORT.DESC,
                        useStroke: false,
                        strokeWidth: 2,
                        height: 32,
                        gap: 6,
                        borderRadius: 4,
                        offsetX: 64,
                        paddingRight: 0,
                        useGradient: true,
                        gradientIntensity: 20,
                        fillOpacity: 90,
                        underlayerColor: COLOR_WHITE,
                        dataLabels: {
                            color: COLOR_BLACK,
                            bold: true,
                            fontSize: FONT._14, // v3 increased
                            value: {
                                show: true,
                                roundingValue: 0,
                                prefix: '',
                                suffix: '',
                                formatter: null
                            },
                            percentage: {
                                show: true,
                                roundingPercentage: 0
                            },
                            offsetX: 0
                        },
                        nameLabels: {
                            show: true,
                            color: COLOR_BLACK,
                            bold: false,
                            fontSize: FONT._14, // v3 increased
                            offsetX: 0
                        },
                        parentLabels: {
                            show: true,
                            color: COLOR_BLACK,
                            bold: false,
                            fontSize: FONT._14, // v3 increased
                            offsetX: 0
                        }
                    },
                    highlighter: {
                        color: COLOR_BLACK,
                        opacity: 5
                    },
                    separators: {
                        show: false,
                        color: COLOR_GREY_LIGHT,
                        strokeWidth: 1,
                        fullWidth: true,
                    }
                },
                title: TITLE,
                legend: {
                    ...LEGEND,
                    position: POSITION.TOP,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: '',
                    suffix: ''
                },
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: '',
                    suffix: ''
                }
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            sort: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0,
                prefix: '',
                suffix: ''
            }
        },
        translations: {
            parentName: "Serie",
            childName: "Child",
            value: "value",
            percentageToTotal: "%/total",
            percentageToSerie: "%/serie"
        }
    }

    const vue_ui_horizontal_bar = vue_ui_vertical_bar;

    const vue_ui_heatmap = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null // v3
        },
        theme: '',
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            layout: {
                height: 300, // v3
                width: 1000, // v3
                padding: PADDING([0, 0, 0, 0]),
                cells: {
                    // height: 36, // v3 deprecated
                    rowTotal: {
                        value: {
                            show: false,
                        },
                        color: {
                            show: false
                        }
                    },
                    columnTotal: {
                        value: {
                            show: false,
                            rotation: 0,
                            autoRotate: { // v3
                                enable: true, // v3
                                angle: -30, // v3
                            },
                            offsetX: 0,
                            offsetY: 0
                        },
                        color: {
                            show: false
                        },
                    },
                    value: {
                        show: false,
                        fontSize: FONT._18,
                        bold: false,
                        roundingValue: 0,
                        color: COLOR_BLACK,
                        formatter: null
                    },
                    colors: {
                        hot: COLOR_RED,
                        cold: COLOR_BLUE,
                        underlayer: COLOR_WHITE
                    },
                    spacing: 2,
                    selected: {
                        border: 4,
                        color: COLOR_BLACK
                    }
                },
                dataLabels: {
                    prefix: '',
                    suffix: '',
                    xAxis: {
                        show: true,
                        values: [],
                        datetimeFormatter: AXIS_DATE_FORMATTER,
                        showOnlyAtModulo: null,
                        rotation: 0,
                        autoRotate: { // v3
                            enable: true, // v3
                            angle: -30, // v3
                        },
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        bold: false,
                        offsetX: 0,
                        offsetY: 0
                    },
                    yAxis: {
                        show: true,
                        values: [],
                        datetimeFormatter: AXIS_DATE_FORMATTER,
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        bold: false,
                        offsetX: 0,
                        offsetY: 0
                    }
                }
            },
            title: TITLE,
            legend: {
                ...LEGEND,
                fontSize: FONT._12,
                roundingValue: 0,
                width: 24,
                // position: POSITION.RIGHT, // v3 deprecated
                // scaleBorderRadius: 18 // v3 deprecated
            },
            tooltip: {
                ...TOOLTIP,
                roundingValue: 0
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            colNames: {
                xAxis: 'X'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0
            }
        }
    }

    const vue_ui_scatter = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: {
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        downsample: LTTB,
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            layout: {
                height: 316,
                width: 512,
                padding: PADDING([0, 0, 0, 0]), // v3 modification
                axis: {
                    show: true,
                    stroke: COLOR_GREY_LIGHT,
                    strokeWidth: 1
                },
                marginalBars: {
                    show: false,
                    size: 40,
                    tranches: 20,
                    opacity: 0.6,
                    fill: COLOR_BLACK,
                    strokeWidth: 1,
                    offset: 20,
                    borderRadius: 2,
                    useGradient: true,
                    showLines: false,
                    linesStrokeWidth: 1,
                    highlighter: {
                        show: true,
                        opacity: 0.1,
                        color: COLOR_BLACK,
                        stroke: COLOR_BLACK,
                        strokeWidth: 0.5,
                        strokeDasharray: 2,
                        highlightBothAxes: false,
                    }
                },
                plots: {
                    radius: 2,
                    stroke: COLOR_WHITE,
                    strokeWidth: 0.3,
                    opacity: 0.6,
                    significance: {
                        show: true,
                        useDistanceOpacity: false,
                        deviationThreshold: 10,
                        opacity: 0.3
                    },
                    deviation: {
                        translation: 'deviation',
                        roundingValue: 1
                    },
                    giftWrap: {
                        show: false,
                        strokeWidth: 1,
                        strokeDasharray: 0,
                        fillOpacity: 0.2
                    },
                    selectors: {
                        show: true,
                        stroke: COLOR_BLACK,
                        strokeWidth: 0.7,
                        strokeDasharray: 0,
                        labels: {
                            fontSize: FONT._12,
                            color: COLOR_BLACK,
                            rounding: 2,
                            bold: false,
                            showName: true,
                            prefix: '',
                            suffix: '',
                            x: {
                                formatter: null
                            },
                            y: {
                                formatter: null
                            }
                        },
                        markers: {
                            radius: 1.5,
                            stroke: COLOR_WHITE,
                            strokeWidth: 0.5,
                            fill: COLOR_BLACK
                        }
                    }
                },
                correlation: {
                    show: true,
                    strokeDasharray: 2,
                    strokeWidth: 1,
                    label: {
                        show: true,
                        fontSize: FONT._12,
                        color: COLOR_BLACK,
                        bold: true,
                        roundingValue: 2,
                        useSerieColor: true
                    }
                },
                dataLabels: {
                    xAxis: {
                        name: 'xAxis',
                        show: true,
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        bold: false,
                        offsetX: 0,
                        offsetY: 0,
                        roundingValue: 0
                    },
                    yAxis: {
                        name: 'yAxis',
                        show: true,
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        bold: false,
                        offsetX: 0,
                        offsetY: 0,
                        roundingValue: 0
                    }
                }
            },
            title: TITLE,
            legend: {
                ...LEGEND,
                roundingValue: 0,
                position: 'bottom'
            },
            tooltip: {
                ...TOOLTIP,
                roundingValue: 2,
                showShape: true,
                prefix: '',
                suffix: ''
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 2,
                roundingAverage: 1
            },
            translations: {
                correlationCoefficient: "Correlation Coef.",
                nbrPlots: "Nbr plots",
                average: "Average",
                series: "Series"
            }
        }
    }

    const vue_ui_candlestick = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        responsiveProportionalSizing: true,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        useCssAnimation: false, // v3 (v2 = true)
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            height: 316,
            width: 512,
            layout: {
                padding: PADDING([0, 0, 0, 0]),
                selector: {
                    color: COLOR_GREY_LIGHT,
                    opacity: 10
                },
                grid: {
                    show: true,
                    stroke: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5,
                    xAxis: {
                        dataLabels: {
                            show: true,
                            fontSize: FONT._10,
                            color: COLOR_BLACK,
                            offsetY: 0,
                            bold: false,
                            rotation: 0,
                            autoRotate: { // v3
                                enable: true, // v3
                                angle: -30 // v3
                            },
                            datetimeFormatter: AXIS_DATE_FORMATTER
                        },
                    },
                    yAxis: {
                        scale: {
                            min: null,
                            max: null,
                        },
                        dataLabels: {
                            show: true,
                            fontSize: FONT._12,
                            color: COLOR_BLACK,
                            roundingValue: 0,
                            offsetX: 0,
                            bold: false,
                            steps: 10,
                            prefix: '',
                            suffix: '',
                        }
                    }
                },
                wick: {
                    stroke: COLOR_BLACK,
                    strokeWidth: 0.5,
                    extremity: {
                        shape: SHAPE.LINE,
                        size: 'auto',
                        color: COLOR_BLACK
                    }
                },
                candle: {
                    borderRadius: 1,
                    stroke: COLOR_BLACK,
                    strokeWidth: 0.5,
                    colors: {
                        bearish: COLOR_RED,
                        bullish: COLOR_GREEN
                    },
                    gradient: {
                        show: true,
                        underlayer: COLOR_WHITE
                    },
                    widthRatio: 0.5
                }
            },
            zoom: ZOOM,
            title: TITLE,
            tooltip: {
                ...TOOLTIP,
                roundingValue: 0,
                prefix: '',
                suffix: '',
            }
        },
        translations: {
            period: "Period",
            open: "Open",
            high: "High",
            low: "Low",
            last: "Last",
            volume: "Volume"
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 2,
                prefix: '',
                suffix: ''
            }
        }
    }

    const vue_ui_sparkline = {
        debug: false, // v3
        loading: false, // v3
        theme: '',
        responsive: false,
        type: SHAPE.LINE,
        downsample: LTTB,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null // v3
        },
        style: {
            chartWidth: 290,
            animation: {
                show: true,
                animationFrames: 360
            },
            padding: PADDING([12, 12, 3, 0]),
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            scaleMin: null,
            scaleMax: null,
            line: {
                color: COLOR_BLUE,
                strokeWidth: 3,
                smooth: false
            },
            bar: {
                borderRadius: 3,
                color: COLOR_BLUE
            },
            zeroLine: {
                color: COLOR_BLACK,
                strokeWidth: 1
            },
            plot: {
                show: true,
                radius: 4,
                stroke: COLOR_WHITE,
                strokeWidth: 1
            },
            verticalIndicator: {
                show: true,
                strokeWidth: 1.5,
                color: COLOR_BLUE,
                strokeDasharray: 3
            },
            dataLabel: {
                show: true,
                position: POSITION.LEFT,
                offsetX: 0,
                offsetY: 0,
                fontSize: FONT._20,
                bold: true,
                color: COLOR_BLACK,
                roundingValue: 0,
                valueType: 'latest',
                prefix: '',
                suffix: '',
                formatter: null,
                datetimeFormatter: AXIS_DATE_FORMATTER // v3
            },
            title: {
                show: true,
                textAlign: POSITION.LEFT,
                color: COLOR_BLACK,
                fontSize: FONT._16,
                bold: true,
                text: ''
            },
            tooltip: {
                show: false,
                fontSize: FONT._14,
                color: COLOR_BLACK,
                backgroundColor: COLOR_WHITE,
                offsetY: 0,
                borderWidth: 0,
                borderColor: COLOR_GREY_LIGHT,
                borderRadius: 2,
                backgroundOpacity: 100
            },
            area: {
                show: true,
                useGradient: true,
                opacity: 30,
                color: COLOR_BLUE
            }
        }
    }

    const vue_ui_sparkbar = {
        debug: false, // v3
        loading: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            animation: {
                show: true,
                animationFrames: 60
            },
            layout: {
                independant: true,
                percentage: true,
                target: 0,
                showTargetValue: false,
                targetValueText: ''
            },
            gutter: {
                backgroundColor: COLOR_GREY_LIGHT,
                opacity: 100
            },
            bar: {
                gradient: {
                    show: true,
                    intensity: 40,
                    underlayerColor: COLOR_WHITE
                }
            },
            labels: {
                fontSize: FONT._16,
                name: {
                    position: 'top-left',
                    width: '100%',
                    color: COLOR_BLACK,
                    bold: false
                },
                value: {
                    show: true,
                    bold: true
                }
            },
            title: {
                text: '',
                color: COLOR_BLACK,
                fontSize: FONT._16,
                bold: true,
                textAlign: POSITION.LEFT,
                margin: '0 0 6px 0',
                subtitle: { 
                    color: COLOR_GREY,
                    text: '', 
                    fontSize: FONT._12, 
                    bold: false 
                },
            },
            gap: 4
        }
    }

    const vue_ui_sparkstackbar = {
        debug: false, // v3
        loading: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            animation: {
                show: true,
                animationFrames: 60
            },
            bar: {
                gradient: {
                    show: true,
                    intensity: 40,
                    underlayerColor: COLOR_WHITE
                }
            },
            legend: {
                show: true,
                textAlign: POSITION.LEFT,
                fontSize: FONT._12,
                margin: '6px 0 0 0',
                name: {
                    color: COLOR_BLACK,
                    bold: false
                },
                value: {
                    show: true,
                    bold: false,
                    color: COLOR_BLACK,
                    prefix: '',
                    suffix: '',
                    rounding: 0,
                    formatter: null
                },
                percentage: {
                    show: true,
                    bold: true,
                    color: COLOR_BLACK,
                    rounding: 1
                }
            },
            title: {
                ...TITLE,
                textAlign: POSITION.LEFT,
                margin: '0 0 6px 0'
            },
            tooltip: {
                ...TOOLTIP
            }
        }
    }

    const vue_ui_sparkhistogram = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        events: {
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            animation: {
                show: true,
                speedMs: 500
            },
            layout: {
                height: 96,
                width: 640,
                padding: PADDING([24, 0, 36, 0])
            },
            bars: {
                shape: SHAPE.SQUARE,
                strokeWidth: 0,
                colors: {
                    positive: COLOR_BLUE,
                    negative: COLOR_RED,
                    gradient: {
                        show: true
                    }
                },
                borderRadius: 24,
                gap: 12
            },
            labels: {
                value: {
                    fontSize: FONT._14,
                    minFontSize: MIN_FONT_SIZE, // v3
                    color: COLOR_BLACK,
                    bold: true,
                    rounding: 1,
                    prefix: '',
                    suffix: '',
                    offsetY: 0,
                    formatter: null,
                },
                valueLabel: {
                    fontSize: FONT._14,
                    minFontSize: MIN_FONT_SIZE, // v3
                    color: COLOR_BLACK,
                    bold: false,
                    rounding: 0,
                },
                timeLabel: {
                    fontSize: FONT._12,
                    minFontSize: MIN_FONT_SIZE, // v3
                    color: COLOR_BLACK,
                    bold: false,
                }
            },
            selector: {
                stroke: COLOR_BLUE,
                fill: '#2D353C10',
                strokeWidth: 2,
                strokeDasharray: 0,
                borderRadius: 2
            },
            title: {
                text: '',
                color: COLOR_BLACK,
                fontSize: FONT._16,
                bold: true,
                textAlign: POSITION.LEFT,
                subtitle: { 
                    color: COLOR_GREY,
                    text: '', 
                    fontSize: FONT._12, 
                    bold: false 
                },
                margin: '0 0 6px 0',
            }
        }
    }

    const vue_ui_sparkgauge = {
        debug: false, // v3
        loading: false, // v3
        theme: '',
        style: {
            fontFamily: 'inherit',
            background: COLOR_WHITE,
            height: 84,
            basePosition: 72,
            animation: {
                show: true,
                speedMs: 150
            },
            title: {
                show: true,
                fontSize: FONT._12,
                position: POSITION.TOP,
                textAlign: POSITION.CENTER,
                bold: false,
                color: COLOR_BLACK
            },
            dataLabel: {
                fontSize: FONT._20,
                autoColor: true,
                color: COLOR_BLACK,
                offsetY: 0,
                bold: true,
                rounding: 0,
                prefix: '',
                suffix: '',
                formatter: null
            },
            colors: {
                min: COLOR_RED,
                max: COLOR_GREEN,
                showGradient: true
            },
            track: {
                autoColor: true,
                color: COLOR_BLUE,
                strokeLinecap: SHAPE.ROUND
            },
            gutter: {
                color: COLOR_GREY_LIGHT,
                strokeLinecap: SHAPE.ROUND
            }
        }
    }

    const vue_ui_spark_trend = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        theme: '',
        downsample: LTTB,
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            height: 80,
            width: 300,
            animation: {
                show: true,
                animationFrames: 20
            },
            line: {
                stroke: COLOR_BLACK,
                strokeWidth: 2,
                strokeLinecap: SHAPE.ROUND,
                strokeLinejoin: SHAPE.ROUND,
                smooth: true,
                useColorTrend: true
            },
            area: {
                show: true,
                useGradient: true,
                opacity: 20
            },
            dataLabel: {
                show: true,
                useColorTrend: true,
                color: COLOR_BLACK,
                fontSize: FONT._14,
                bold: false,
                prefix: '',
                suffix: '',
                rounding: 0,
                formatter: null
            },
            trendLabel: {
                trendType: 'global',
                useColorTrend: true,
                color: COLOR_BLACK,
                fontSize: FONT._14,
                bold: true,
                rounding: 0
            },
            arrow: {
                colors: {
                    positive: COLOR_GREEN,
                    neutral: COLOR_GREY,
                    negative: COLOR_RED
                }
            },
            padding: PADDING([12, 12, 12, 82])
        }
    }

    const vue_ui_quick_chart = {
        debug: false, // v3
        loading: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        responsive: false,
        theme: '',
        axisLabelsFontSize: FONT._12,
        backgroundColor: COLOR_WHITE,
        barGap: 12,
        barAnimated: true,
        barStrokeWidth: 1,
        blurOnHover: true,
        chartIsBarUnderDatasetLength: 6,
        color: COLOR_BLACK,
        customPalette: [],
        dataLabelFontSize: FONT._14,
        dataLabelRoundingPercentage: 1,
        dataLabelRoundingValue: 0,
        donutHideLabelUnderPercentage: 3,
        donutCurvedMarkers: true, // v3
        donutLabelMarkerStrokeWidth: 1,
        donutRadiusRatio: 0.4,
        donutShowTotal: true,
        donutStrokeWidth: 2,
        donutStroke: '#FFFFFF',
        donutThicknessRatio: 0.18,
        donutTotalLabelFontSize: FONT._24,
        donutTotalLabelOffsetY: 0,
        donutTotalLabelText: 'Total',
        donutUseShadow: false,
        donutShadowColor: COLOR_BLACK,
        fontFamily: 'inherit',
        formatter: null,
        height: 338,
        legendFontSize: FONT._12,
        legendIcon: 'circleFill',
        legendIconSize: FONT._12,
        legendPosition: 'bottom',
        lineAnimated: true,
        lineSmooth: true,
        lineStrokeWidth: 2,
        paletteStartIndex: 0,
        showDataLabels: true,
        showLegend: true,
        showTooltip: true,
        showUserOptions: true,
        userOptionsPosition: 'right',
        showUserOptionsOnChartHover: false,
        keepUserOptionsStateOnChartLeave: true,
        userOptionsButtons: {
            tooltip: true,
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        },
        userOptionsButtonTitles: {
            open: 'Open options',
            close: 'Close options',
            tooltip: 'Toggle tooltip',
            pdf: 'Download PDF',
            img: 'Download PNG',
            fullscreen: 'Toggle fullscreen',
            annotator: 'Toggle annotator'
        },
        userOptionsPrint: {
            allowTaint: false,
            backgroundColor: COLOR_WHITE,
            useCORS: false,
            onclone: null,
            scale: 2,
            logging: false,
        },
        userOptionsCallbacks: {
            tooltip: null,
            pdf: null,
            img: null,
            fullscreen: null,
            annotator: null
        },
        title: '',
        titleBold: true,
        titleFontSize: FONT._16,
        titleTextAlign: 'center',
        tooltipCustomFormat: null,
        tooltipBackgroundOpacity: 100,
        tooltipBorderRadius: 4,
        tooltipBorderColor: COLOR_GREY_LIGHT,
        tooltipBorderWidth: 1,
        tooltipFontSize: FONT._14,
        tooltipPosition: POSITION.CENTER,
        tooltipOffsetY: 24,
        tooltipSmooth: true,
        tooltipBackdropFilter: true,
        useCustomLegend: false,
        valuePrefix: '',
        valueSuffix: '',
        width: 512,
        xAxisLabel: '',
        xyAxisStroke: COLOR_GREY_MID,
        xyAxisStrokeWidth: 1,
        xyGridStroke: COLOR_GREY_LIGHT,
        xyGridStrokeWidth: 0.5,
        xyHighlighterColor: COLOR_BLACK,
        xyHighlighterOpacity: 0.05,
        xyLabelsXFontSize: FONT._10,
        xyLabelsYFontSize: FONT._12,
        xyPaddingBottom: 12,
        xyPaddingLeft: 12,
        xyPaddingRight: 12,
        xyPaddingTop: 12,
        xyPeriodLabelsRotation: 0,
        xyPeriodLabelsAutoRotate: { // v3
            enable: true, // v3
            angle: -30, // v3
        },
        xyPeriods: [],
        datetimeFormatter: AXIS_DATE_FORMATTER,
        xyPeriodsShowOnlyAtModulo: false,
        xyPeriodsModulo: 12,
        xyScaleSegments: 15,
        xyShowAxis: true,
        xyShowGrid: true,
        xyShowScale: true,
        yAxisLabel: '',
        zoomXy: true,
        zoomColor: COLOR_GREY_MID,
        zoomHighlightColor: COLOR_GREY_DARK,
        zoomFontSize: FONT._14,
        zoomUseResetSlot: false,
        zoomMinimap: MINIMAP,
        zoomStartIndex: null,
        zoomEndIndex: null,
        zoomEnableRangeHandles: true,
        zoomEnableSelectionDrag: true
    }

    const vue_ui_age_pyramid = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null // v3
        },
        theme: '',
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            height: 500,
            width: 500,
            layout: {
                padding: PADDING([12, 12, 36, 12]),
                grid: {
                    show: true,
                    stroke: COLOR_GREY_LIGHT,
                    strokeWidth: 1
                },
                dataLabels: {
                    sideTitles: {
                        show: true,
                        fontSize: FONT._18,
                        color: COLOR_BLACK,
                        useSideColor: true,
                        bold: false,
                        offsetY: 0
                    },
                    xAxis: {
                        show: true,
                        fontSize: FONT._12,
                        color: COLOR_BLACK,
                        bold: false,
                        scale: 1000,
                        translation: 'in thousands',
                        formatter: null,
                        rotation: 0, // v3
                        autoRotate: { // v3
                            enable: true, // v3
                            angle: -30 // v3
                        }
                    },
                    yAxis: {
                        show: true,
                        display: 'age',
                        fontSize: FONT._12,
                        color: COLOR_BLACK,
                        bold: false,
                        showEvery: 5,
                        formatter: null
                    }
                },
                centerSlit: {
                    width: 20
                },
                bars: {
                    gap: 2,
                    borderRadius: 2,
                    left: {
                        color: COLOR_RED
                    },
                    right: {
                        color: COLOR_BLUE
                    },
                    gradient: {
                        show: true,
                        underlayer: COLOR_WHITE,
                        intensity: 60,
                        shiftHue: 0.05
                    }
                }
            },
            highlighter: {
                color: COLOR_BLACK,
                opacity: 5
            },
            title: TITLE,
            tooltip: {
                ...TOOLTIP,
                roundingValue: 0
            }
        },
        translations: {
            age: 'age',
            male: 'male',
            female: 'female',
            total: 'total',
            year: 'year'
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: TABLE_TD
        }
    }

    const vue_ui_relation_circle = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        responsiveProportionalSizing: true,
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            size: 400,
            limit: 50,
            animation: {
                show: true,
                speedMs: 300
            },
            labels: {
                color: COLOR_BLACK,
                fontSize: FONT._14,
                minFontSize: MIN_FONT_SIZE, // v3
            },
            weightLabels: {
                size: 8,
                show: true,
                formatter: null,
                prefix: '',
                suffix: '',
                rounding: 0
            },
            links: {
                curved: false,
                maxWidth: 3
            },
            circle: {
                radiusProportion: 0.2,
                stroke: COLOR_GREY_MID,
                strokeWidth: 1,
                offsetY: 0
            },
            plot: {
                radius: 3,
                useSerieColor: true,
                color: COLOR_BLACK
            },
            title: TITLE
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        })
    }

    const vue_ui_thermometer = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 360,
                width: 256, // v3
                thermometer: {
                    width: 48
                },
                padding: {
                    // v3 left and right are deprecated
                    top: 12,
                    bottom: 12,
                },
                graduations: {
                    show: true,
                    sides: 'both',
                    height: 2,
                    stroke: COLOR_GREY_LIGHT,
                    strokeWidth: 1,
                    showIntermediate: true,
                    gradient: {
                        show: true,
                        intensity: 20
                    }
                },
                animation: {
                    use: true,
                    speedMs: 1000
                },
                label: {
                    show: true, // v3
                    fontSize: FONT._20,
                    minFontSize: MIN_FONT_SIZE, // v3
                    rounding: 1,
                    bold: true,
                    color: COLOR_BLACK,
                    prefix: '',
                    suffix: '',
                    formatter: null
                }
            },
            title: TITLE,
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        })
    }

    const vue_ui_rings = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: {
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        useBlurOnHover: true,
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    labels: {
                        dataLabels: {
                            prefix: '',
                            suffix: '',
                            formatter: null
                        }
                    },
                    rings: {
                        strokeWidth: 2,
                        stroke: COLOR_GREY_LIGHT,
                        gradient: {
                            show: true,
                            intensity: 40,
                            underlayerColor: COLOR_WHITE
                        },
                        useShadow: true
                    }
                },
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showValue: true,
                    showPercentage: true,
                    position: 'bottom'
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0
                }
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_donut_evolution = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        theme: '',
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                zoom: ZOOM,
                donuts: {
                    hover: {
                        hideLabelsUnderValue: 5,
                    },
                },
                dialog: {
                    show: true,
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK,
                    header: {
                        backgroundColor: COLOR_WHITE,
                        color: COLOR_BLACK
                    },
                    donutChart: {
                        ...vue_ui_donut,
                        responsive: true,
                        userOptions: {
                            ...vue_ui_donut.userOptions,
                            buttons: {
                                ...vue_ui_donut.userOptions.buttons,
                                pdf: false,
                            }
                        },
                        style: {
                            ...vue_ui_donut.style,
                            chart: {
                                ...vue_ui_donut.style.chart,
                                layout: {
                                    ...vue_ui_donut.style.chart.layout,
                                    donut: {
                                        ...vue_ui_donut.style.chart.layout.donut,
                                        strokeWidth: 64,
                                    },
                                    labels: {
                                        ...vue_ui_donut.style.chart.layout.labels,
                                        percentage: {
                                            ...vue_ui_donut.style.chart.layout.labels.percentage,
                                            fontSize: 16
                                        },
                                        name: {
                                            ...vue_ui_donut.style.chart.layout.labels.name,
                                            fontSize: 12
                                        },
                                        hollow: {
                                            ...vue_ui_donut.style.chart.layout.labels.hollow,
                                            average: {
                                                ...vue_ui_donut.style.chart.layout.labels.hollow.average,
                                                show: false,
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                layout: {
                    height: 316,
                    width: 512,
                    padding: PADDING([5, 10, 5, 10]),
                    grid: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 0.7,
                        showVerticalLines: true,
                        axis: {
                            yLabel: '',
                            yLabelOffsetX: 0,
                            xLabel: '',
                            xLabelOffsetY: 0,
                            fontSize: FONT._14,
                            color: COLOR_BLACK,
                        },
                        yAxis: {
                            dataLabels: {
                                show: true,
                                fontSize: FONT._10,
                                color: COLOR_BLACK,
                                roundingValue: 0,
                                offsetX: 0,
                                bold: false,
                                steps: 10
                            }
                        },
                        xAxis: {
                            dataLabels: {
                                show: true,
                                values: [],
                                datetimeFormatter: AXIS_DATE_FORMATTER,
                                fontSize: FONT._10,
                                showOnlyFirstAndLast: false,
                                color: COLOR_BLACK,
                                rotation: 0,
                                autoRotate: { // v3
                                    enable: true, // v3
                                    angle: -30, // v3
                                },
                                offsetY: 0
                            }
                        }
                    },
                    line: {
                        show: true,
                        stroke: COLOR_GREY_MID,
                        strokeWidth: 4
                    },
                    highlighter: {
                        color: COLOR_BLACK,
                        opacity: 5
                    },
                    dataLabels: {
                        show: true,
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        bold: false,
                        rounding: 0,
                        prefix: '',
                        suffix: '',
                        offsetY: 0,
                        formatter: null
                    }
                },
                title: TITLE,
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showValue: true,
                    showPercentage: true,
                    position: 'bottom'
                }
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            columnNames: {
                period: 'Period',
                total: 'Total'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_mood_radar = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        events: {
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    grid: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 0.5,
                    },
                    outerPolygon: {
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 1
                    },
                    dataPolygon: {
                        color: COLOR_BLUE,
                        opacity: 60,
                        gradient: {
                            show: true,
                            intensity: 1
                        },
                        stroke: COLOR_BLUE,
                        strokeWidth: 0
                    },
                    smileys: {
                        strokeWidth: 1,
                        colors: {
                            '1': '#e20001',
                            '2': '#ff9f03',
                            '3': '#ffd004',
                            '4': '#9ac900',
                            '5': '#059f00'
                        }
                    },
                    dataLabel: {
                        color: COLOR_BLACK,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        bold: true,
                        prefix: '',
                        suffix: '',
                        formatter: null
                    }
                },
                title: TITLE,
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    position: 'bottom'
                }
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_molecule = {
        debug: false, // v3
        loading: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                nodes: {
                    stroke: COLOR_WHITE,
                    strokeHovered: COLOR_BLACK
                },
                links: {
                    stroke: COLOR_GREY_MID
                },
                title: TITLE,
                tooltip: TOOLTIP,
                zoom: {
                    speed: 1
                }
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: TABLE_TD,
            translations: {
                nodeName: 'Node name',
                details: 'Details',
                ancestor: 'Parent node'
            }
        }
    }

    const vue_ui_nested_donuts = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v3 (v2 = true)
        useBlurOnHover: true,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null // v3
        },
        serieToggleAnimation: {
            show: true,
            durationMs: 500,
        },
        startAnimation: {
            show: false, // v3 (v2 = false)
            durationMs: 1000,
            staggerMs: 50
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                useGradient: true,
                gradientIntensity: 40,
                padding: PADDING([0,0,0,0]),
                width: 512,
                height: 512,
                layout: {
                    labels: {
                        dataLabels: {
                            show: true,
                            prefix: '',
                            suffix: '',
                            hideUnderValue: 3,
                            fontSize: FONT._14,
                            offsetX: 4,
                            offsetY: 12,
                            useSerieColor: false,
                            color: COLOR_BLACK,
                            showValue: true,
                            showPercentage: true,
                            boldValue: false,
                            boldPercentage: true,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            showDonutName: true,
                            boldDonutName: true,
                            curvedDonutName: true, // v3
                            donutNameAbbreviation: false, // v2 = true
                            donutNameMaxAbbreviationSize: 3,
                            donutNameOffsetY: 0,
                            formatter: null
                        }
                    },
                    donut: {
                        strokeWidth: 200,
                        borderWidth: 2,
                        spacingRatio: 0.5,
                        useShadow: false,
                        shadowColor: COLOR_BLACK,
                        emptyFill: COLOR_GREY_LIGHT,
                        selectedColor: '#0000001A',
                        borderColorAuto: true,
                        borderColor: '#CCCCCC'
                    }
                },
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showValue: true,
                    showPercentage: true,
                    position: 'bottom'
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    showAllItemsAtIndex: true,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0
                }
            }
        },
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_galaxy = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        useBlurOnHover: true,
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                layout: {
                    arcs: {
                        strokeWidth: 24,
                        borderWidth: 12,
                        offsetX: 0,
                        offsetY: 0,
                        hoverEffect: {
                            show: true,
                            multiplicator: 1.1
                        },
                        gradient: {
                            show: true,
                            intensity: 30,
                            color: COLOR_WHITE
                        }
                    },
                    labels: {
                        dataLabels: {
                            prefix: '',
                            suffix: '',
                            formatter: null
                        }
                    }
                },
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    showValue: true,
                    showPercentage: true,
                    position: 'bottom'
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0
                }
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_strip_plot = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        responsiveProportionalSizing: true,
        theme: '',
        customPalette: [],
        useCssAnimation: true,
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 600,
                width: 600, // v3
                // stripWidth: 120, v3 deprecated
                padding: PADDING([12, 12, 12, 12]), // v3 modified
                grid: {
                    show: true,
                    stroke: COLOR_GREY_MID,
                    strokeWidth: 1,
                    scaleSteps: 10,
                    horizontalGrid: {
                        show: true,
                        stroke: COLOR_GREY_MID,
                        strokeWidth: 0.5,
                        strokeDasharray: 4
                    },
                    verticalGrid: {
                        show: true,
                        stroke: COLOR_GREY_MID,
                        strokeWidth: 0.5,
                        strokeDasharray: 4
                    }
                },
                plots: {
                    opacity: 0.5,
                    radius: 20,
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    shape: SHAPE.CIRCLE,
                    gradient: {
                        show: true,
                        intensity: 40
                    }
                },
                labels: {
                    prefix: '',
                    suffix: '',
                    formatter: null,
                    bestPlotLabel: {
                        show: true,
                        showValue: true,
                        fontSize: FONT._14,
                        color: COLOR_BLACK,
                        rounding: 0,
                        offsetY: 0
                    },
                    axis: {
                        xLabel: '',
                        xLabelOffsetY: 0,
                        yLabel: '',
                        yLabelOffsetX: 0,
                        fontSize: FONT._14,
                        color: COLOR_BLACK
                    },
                    xAxisLabels: {
                        show: true,
                        color: COLOR_BLACK,
                        fontSize: FONT._14,
                        offsetY: 0,
                        rotation: 0, // v3,
                        autoRotate: { // v3
                            enable: true, // v3
                            angle: -30, // v3
                        }
                    },
                    yAxisLabels: {
                        show: true,
                        color: COLOR_BLACK,
                        fontSize: FONT._14,
                        rounding: 0,
                        offsetX: 0
                    }
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    roundingValue: 0
                }
            }
        },
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0
            }
        }
    }

    const vue_ui_dumbbell = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        useAnimation: false, // v2 = true
        animationSpeed: 2,
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                width: 600,
                rowHeight: 48, // v3 modified
                padding: PADDING([12, 24, 12, 12]), // v3 modified
                plots: {
                    startColor: COLOR_RED,
                    endColor: COLOR_BLUE,
                    evaluationColors: { // v3
                        enable: false, // v3
                        positive: '#2ca02c', // v3
                        negative: '#d62728', // v3
                        neutral: '#c7c7c7', // v3
                    },
                    radius: 6,
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    link: {
                        strokeWidth: 2,
                        type: SHAPE.CURVED
                    },
                    gradient: {
                        show: true,
                        intensity: 40
                    }
                },
                grid: {
                    strokeWidth: 1,
                    scaleSteps: 10,
                    scaleMin: null, // v3
                    scaleMax: null, // V3
                    horizontalGrid: {
                        show: true,
                        stroke: COLOR_GREY_MID,
                        strokeWidth: 0.5,
                        strokeDasharray: 0
                    },
                    verticalGrid: {
                        show: true,
                        stroke: COLOR_GREY_MID,
                        strokeWidth: 0.5,
                        strokeDasharray: 0
                    }
                },
                comparisonLines: { // v3
                    show: true,// v3
                    strokeWidth: 1, // v3
                    strokeDasharray: 4, // v3
                    showRect: true, // v3
                    rectColor: COLOR_BLACK, // v3
                    rectOpacity: 5, // v3
                    showLabel: true, // v3
                    labelColor: COLOR_BLACK, // v3
                    labelFontSize: FONT._12, // v3
                },
                highlighter: { // v3
                    color: COLOR_BLACK, // v3
                    opacity: 5, // v3
                },
                labels: {
                    prefix: '',
                    suffix: '',
                    formatter: null,
                    axis: { // v3
                        yLabel: '', // v3
                        yLabelOffsetX: 0, // v3
                        xLabel: '', // v3
                        xLabelOffsetY: 0, // v3
                        fontSize: FONT._14, // v3
                        color: COLOR_BLACK, // v3
                    },
                    yAxisLabels: {
                        show: true,
                        fontSize: FONT._14,
                        color: COLOR_BLACK,
                        offsetX: 0,
                        bold: true,
                        showProgression: true,
                        rounding: 1,
                        formatter: null // v3
                    },
                    xAxisLabels: {
                        show: true,
                        fontSize: FONT._14,
                        color: COLOR_BLACK,
                        offsetY: 0,
                        bold: false,
                        rounding: 0,
                        rotation: 0, // v3
                        autoRotate: { // v3
                            enable: true, // v3
                            angle: -30, // v3
                        }
                    },
                    startLabels: {
                        show: true,
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        offsetY: 0,
                        rounding: 0,
                        useStartColor: true,
                        useEvaluationColor: true, // v3
                    },
                    endLabels: {
                        show: true,
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        offsetY: 0,
                        rounding: 0,
                        useEndColor: true,
                        useEvaluationColor: true, // v3
                    }
                },
                legend: {
                    ...LEGEND,
                    labelStart: 'start',
                    labelEnd: 'end',
                    labelPositive: 'positive', // v3
                    labelNegative: 'negative', // v3
                    labelNeutral: 'neutral', // v3
                    position: 'bottom'
                },
                title: TITLE
            }
        },
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                start: 'Start value',
                end: 'End value',
                progression: 'Progression'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_3d_bar = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v3
        style: {
            fontFamily: 'inherit',
            shape: SHAPE.BAR,
            chart: {
                animation: {
                    use: true,
                    speed: 1,
                    acceleration: 1,
                },
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                bar: {
                    color: COLOR_BLUE,
                    stroke: COLOR_BLUE,
                    strokeWidth: 0.7,
                    shadeColor: COLOR_BLACK
                },
                box: {
                    stroke: COLOR_GREY_MID,
                    strokeWidth: 0.7,
                    strokeDasharray: 2,
                    dimensions: {
                        width: 128,
                        height: 256,
                        top: 27,
                        bottom: 9,
                        left: 24,
                        right: 24,
                        perspective: 18
                    }
                },
                title: TITLE,
                legend: {
                    showDefault: true,
                    fontSize: FONT._10,
                    color: COLOR_BLACK,
                    bold: false,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: '',
                    suffix: '',
                    hideUnderPercentage: 3
                },
                dataLabel: {
                    show: true,
                    bold: true,
                    color: COLOR_BLUE,
                    fontSize: FONT._12,
                    rounding: 1,
                    formatter: null
                }
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }

    const vue_ui_table_sparkline = {
        theme: '',
        customPalette: [],
        responsiveBreakpoint: 500,
        showAverage: true,
        showMedian: true,
        showTotal: true,
        roundingAverage: 0,
        roundingMedian: 0,
        roundingValues: 0,
        roundingTotal: 0,
        prefix: '',
        suffix: '',
        formatter: null,
        showSparklines: true,
        fontFamily: 'inherit',
        colNames: [],
        sortedDataColumnIndices: [],
        sortedSeriesName: false,
        sortedSum: false,
        sortedAverage: false,
        sortedMedian: false,
        resetSortOnClickOutside: false,
        sparkline: {
            useGradient: true,
            showArea: true,
            strokeWidth: 3,
            type: SHAPE.LINE,
            smooth: true,
            dimensions: {
                width: 150,
                heightRatio: 1
            },
            animation: {
                show: true,
                animationFrames: 360
            }
        },
        translations: {
            serie: 'Serie',
            total: 'Total',
            average: 'Average',
            median: 'Median',
            chart: 'Evolution'
        },
        title: {
            text: '',
            color: COLOR_BLACK,
            fontSize: FONT._20,
            bold: true,
            textAlign: 'center',
            backgroundColor: COLOR_WHITE,
            subtitle: { 
                color: COLOR_GREY,
                text: '', 
                fontSize: FONT._16, 
                bold: false 
            },
        },
        thead: {
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            fontSize: FONT._14,
            outline: "none",
            textAlign: POSITION.LEFT,
            bold: false
        },
        tbody: {
            showColorMarker: true,
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            fontSize: FONT._14,
            outline: "none",
            textAlign: POSITION.LEFT,
            bold: false,
            selectedColor: {
                useSerieColor: true,
                fallback: COLOR_GREY_LIGHT,
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            fullscreen: true
        })
    }

    const vue_ui_table_heatmap = {
        theme: '',
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            shapeSize: FONT._14,
            heatmapColors: {
                useIndividualScale: false,
                min: COLOR_WHITE,
                max: COLOR_BLUE
            }
        },
        table: {
            responsiveBreakpoint: 400,
            borderWidth: 1,
            showSum: false,
            showAverage: false,
            showMedian: false,
            head: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                values: []
            }
        },
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            fullscreen: true
        })
    }

    const vue_ui_word_cloud = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        animationDelayMs: 20,
        strictPixelPadding: false, // If true, strict per-pixel padding is used (dilateWordMask); if false, just rectangular bounding box (or pad).
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true
        }),
        nodeCategories: {},
        nodeCategoryColors: {},
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 512,
                width: 512,
                zoom: {
                    show: true,
                },
                words: {
                    maxFontSize: 100,
                    minFontSize: FONT._10,
                    bold: false,
                    proximity: 10,
                    packingWeight: 1,
                    color: COLOR_BLACK,
                    usePalette: true
                },
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    roundingValue: 0,
                },
            }
        },
        table: {
            ...TABLE,
            columnNames: {
                series: 'Word',
                value: 'Value'
            },
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                prefix: '',
                suffix: ''
            }
        }
    }

    const vue_ui_xy_canvas = {
        responsive: false,
        theme: '',
        customPalette: [],
        downsample: {
            threshold: 10000
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            stack: true,
            annotator: true
        }),
        style: {
            fontFamily: 'Arial', // A defined font must be provided as 'inherit' fails with canvas
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                aspectRatio: '12 / 9',
                stacked: false,
                stackGap: 20,
                scale: {
                    ticks: 10,
                    min: null,
                    max: null,
                },
                zoom: ZOOM,
                selector: {
                    show: true,
                    color: COLOR_BLACK,
                    dashed: true,
                    showHorizontalSelector: false,
                },
                tooltip: TOOLTIP,
                legend: {
                    ...LEGEND,
                    position: 'bottom',
                },
                title: TITLE,
                grid: {
                    y: {
                        showAxis: true,
                        axisColor: COLOR_BLACK,
                        axisThickness: 2,
                        axisName: '',
                        axisLabels: {
                            show: true,
                            fontSizeRatio: 1,
                            color: COLOR_BLACK,
                            offsetX: 0,
                            rounding: 1,
                            prefix: '',
                            suffix: '',
                            bold: false,
                        },
                        verticalLines: {
                            show: true,
                            color: COLOR_GREY_MID,
                            hideUnderXLength: 20,
                            position: 'middle' // 'start'
                        },
                        timeLabels: {
                            show: true,
                            showMarker: true,
                            fontSizeRatio: 0.8,
                            values: [],
                            datetimeFormatter: AXIS_DATE_FORMATTER,
                            rotation: 0,
                            offsetY: 30,
                            color: COLOR_BLACK,
                            modulo: 12,
                            bold: false,
                        }
                    },
                    x: {
                        showAxis: true,
                        axisColor: COLOR_BLACK,
                        axisThickness: 2,
                        axisName: '',
                        horizontalLines: {
                            show: true,
                            color: COLOR_GREY_MID,
                            alternate: true,
                            opacity: 20
                        },
                    },
                    zeroLine: {
                        show: true,
                        color: COLOR_BLACK,
                        dashed: true
                    }
                },
                line: {
                    plots: {
                        show: true,
                        radiusRatio: 1
                    }
                },
                bar: {
                    gradient: {
                        show: true
                    }
                },
                area: {
                    opacity: 60
                },
                dataLabels: {
                    show: true,
                    fontSizeRatio: 1,
                    useSerieColor: true,
                    color: COLOR_BLACK,
                    offsetY: -12,
                    formatter: null,
                    bold: true
                },
                paddingProportions: {
                    top: 0.1,
                    right: 0.05,
                    bottom: 0.1,
                    left: 0.1,
                }
            }
        },
        table: {
            ...TABLE,
            rounding: 1,
            columnNames: {
                period: 'Period',
                total: 'Total'
            },
            th: TABLE_TH,
            td: TABLE_TD
        }
    }

    const vue_ui_flow = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        userOptions: USER_OPTIONS({
            pdf: true,
            csv: true,
            img: true,
            table: true,
            fullscreen: true,
            annotator: true,
            tooltip: true,
        }),
        nodeCategories: {},
        nodeCategoryColors: {},
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                width: 1000, // v3
                height: 600, // v3
                color: COLOR_BLACK,
                padding: PADDING([12, 12, 12, 12]), // v3 update
                title: TITLE,
                tooltip: {
                    ...TOOLTIP,
                    showPercentage: true,
                    roundingPercentage: 0,
                    translations: {
                        from: 'From:',
                        to: 'To:',
                        percentOfTotal: 'Percent of total:'
                    }
                },
                legend: {
                    ...LEGEND,
                    position: 'bottom'
                },
                nodes: {
                    gap: 10,
                    // minHeight: 20, // v3 deprecated
                    width: 40,
                    labels: {
                        show: true, // v3
                        fontSize: FONT._14,
                        abbreviation: {
                            use: true,
                            length: 3
                        },
                        prefix: '',
                        suffix: '',
                        rounding: 0,
                        formatter: null
                    },
                    stroke: COLOR_WHITE,
                    strokeWidth: 1
                },
                links: {
                    // width: 200, // v3 deprecated
                    opacity: 0.8,
                    stroke: COLOR_WHITE,
                    strokeWidth: 1
                }
            }
        },
        table: {
            ...TABLE,
            columnNames: {
                source: 'Source',
                target: 'Target',
                value: 'Value'
            },
            th: TABLE_TH,
            td: TABLE_TD
        }
    }

    const vue_ui_parallel_coordinate_plot = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        responsiveProportionalSizing: true,
        theme: '',
        useCssAnimation: false, // v3
        customPalette: [],
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: true,
            fullscreen: true,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 600,
                width: 1000,
                padding: PADDING([0, 0, 0, 0]),
                comments: {
                    show: true,
                    showInTooltip: true,
                    width: 200,
                    offsetX: 0,
                    offsetY: 0
                },
                lines: {
                    smooth: true,
                    strokeWidth: 2,
                    opacity: 0.8
                },
                plots: {
                    show: true,
                    radius: 6,
                    opacity: 0.8
                },
                yAxis: {
                    scaleTicks: 10,
                    stroke: COLOR_BLACK,
                    strokeWidth: 1,
                    labels: {
                        showAxisNames: true,
                        axisNames: [],
                        axisNamesRotation: 0, // v3
                        axisNamesAutoRotate: { // v3
                            enable: true, // v3
                            angle: -30 // v3
                        },
                        axisNamesColor: COLOR_BLACK,
                        axisNamesFontSize: FONT._16,
                        axisNamesBold: true,
                        roundings: [],
                        prefixes: [],
                        suffixes: [],
                        formatters: [],
                        ticks: {
                            show: true,
                            fontSize: FONT._14,
                            color: COLOR_BLACK,
                            bold: false,
                            offsetX: 0,
                            offsetY: 0
                        },
                        datapoints: {
                            show: true,
                            fontSize: FONT._14,
                            useSerieColor: true,
                            color: COLOR_BLACK,
                            offsetX: 0,
                            offsetY: 0,
                            bold: true
                        }
                    }
                },
                title: TITLE,
                legend: {
                    ...LEGEND,
                    position: 'bottom'
                },
                tooltip: TOOLTIP
            }
        },
        table: {
            ...TABLE,
            columnNames: {
                series: 'Series',
                item: 'Item'
            },
            th: TABLE_TH,
            td: TABLE_TD
        }
    }

    const vue_ui_timer = {
        type: 'stopwatch',
        responsive: false,
        responsiveProportionalSizing: true,
        style: {
            fontFamily: 'inherit',
            backgroundColor: COLOR_WHITE,
            height: 300,
            width: 300,
            title: TITLE
        },
        stopwatch: {
            showHours: false,
            showHundredth: true,
            cycleSeconds: 5,
            track: {
                radiusRatio: 1,
                stroke: COLOR_GREY_LIGHT,
                fill: COLOR_WHITE,
                strokeWidth: 2
            },
            tracker: {
                radiusRatio: 1,
                stroke: COLOR_WHITE,
                strokeWidth: 1,
                fill: COLOR_BLACK,
                gradient: {
                    show: true,
                    color: COLOR_WHITE
                },
                aura: {
                    show: true,
                    radiusRatio: 1,
                    fill: COLOR_BLACK,
                    stroke: COLOR_WHITE,
                    strokeWidth: 0
                }
            },
            cycleTrack: {
                show: true,
                stroke: COLOR_BLACK,
                strokeWidth: 3
            },
            label: {
                fontSize: FONT._24,
                color: COLOR_BLACK,
                bold: false
            },
            legend: {
                backgroundColor: COLOR_WHITE,
                buttons: {
                    start: true,
                    pause: true,
                    reset: true,
                    restart: true,
                    lap: true,
                    iconColor: COLOR_BLACK
                },
                buttonTitles: {
                    start: 'Start',
                    pause: 'Pause',
                    resume: 'Resume',
                    reset: 'Reset',
                    restart: 'Restart',
                    lap: 'Lap'
                }
            }
        }
    }

    // non chart components
    const vue_ui_cursor = {
        bubbleEffect: true,
        bubbleEffectColor: COLOR_WHITE,
        bubbleEffectOpacity: 0.1,
        centerCircleColor: COLOR_WHITE,
        centerCircleDasharray: 0,
        centerCircleOpacity: 0,
        centerCircleRadius: 50,
        centerCircleStroke: COLOR_GREY_MID,
        centerCircleStrokeWidth: 0.5,
        coordinatesColor: COLOR_GREY_MID,
        coordinatesFontSize: FONT._10,
        coordinatesOffset: 0,
        crosshairDasharray: 0,
        crosshairStroke: COLOR_GREY_MID,
        crosshairStrokeWidth: 0.5,
        intersectCirclesFill: COLOR_GREY_MID,
        intersectCirclesRadius: 2,
        isLoading: false,
        parentId: '',
        showCenterCircle: true,
        showCoordinates: true,
        showCrosshair: true,
        showIntersectCircles: true,
        useWaveOnClick: true
    }

    const vue_ui_accordion = {
        open: false,
        maxHeight: 2000,
        head: {
            useArrowSlot: false,
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            iconColor: COLOR_BLUE,
            padding: '12px 6px'
        },
        body: {
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK
        }
    }

    const vue_ui_kpi = {
        debug: false, // v3
        animationFrames: 60,
        animationValueStart: 0,
        backgroundColor: COLOR_WHITE,
        fontFamily: 'inherit',
        layoutClass: '',
        layoutCss: '',
        prefix: '',
        suffix: '',
        title: '',
        titleBold: true,
        titleColor: COLOR_BLACK,
        titleClass: '',
        titleCss: '',
        titleFontSize: FONT._16,
        useAnimation: true,
        valueBold: true,
        valueColor: COLOR_BLUE,
        valueClass: '',
        valueCss: '',
        valueFontSize: FONT._32,
        valueRounding: 0,
        formatter: null,
        analogDigits: {
            show: false,
            height: 40,
            color: COLOR_BLACK,
            skeletonColor: COLOR_GREY_LIGHT
        }
    }

    const vue_ui_mini_loader = {
        type: 'onion',
        onion: {
            gutterColor: COLOR_GREY_MID,
            gutterOpacity: 0.3,
            gutterBlur: 0,
            trackHueRotate: 20,
            trackBlur: 1,
            trackColor: COLOR_VUE
        },
        line: {
            gutterColor: COLOR_GREY_MID,
            gutterOpacity: 0.3,
            gutterBlur: 0,
            trackHueRotate: 20,
            trackBlur: 1,
            trackColor: COLOR_VUE
        },
        bar: {
            gutterColor: COLOR_GREY_MID,
            gutterOpacity: 0.3,
            gutterBlur: 0,
            trackHueRotate: 20,
            trackBlur: 1,
            trackColor: COLOR_VUE
        }
    }

    const vue_ui_smiley = {
        readonly: false,
        style: {
            fontFamily: 'inherit',
            itemSize: 32,
            backgroundColor: COLOR_WHITE,
            colors: {
                activeReadonly: [
                    '#e20001',
                    '#ff9f03',
                    '#ffd004',
                    '#61c900',
                    '#059f00'
                ],
                active: [
                    '#e20001',
                    '#ff9f03',
                    '#ffd004',
                    '#61c900',
                    '#059f00'
                ],
                inactive: [
                    COLOR_GREY_LIGHT,
                    COLOR_GREY_LIGHT,
                    COLOR_GREY_LIGHT,
                    COLOR_GREY_LIGHT,
                    COLOR_GREY_LIGHT
                ]
            },
            icons: {
                filled: false,
                useGradient: true
            },
            title: {
                ...TITLE,
                textAlign: POSITION.CENTER,
                offsetY: 6,
                subtitle: {
                    ...TITLE.subtitle,
                    offsetY: 12
                }
            },
            rating: {
                show: true,
                fontSize: FONT._24,
                bold: true,
                roundingValue: 1,
                position: POSITION.BOTTOM,
                offsetX: 0,
                offsetY: 0,
                formatter: null
            },
            tooltip: {
                show: true,
                fontSize: FONT._14,
                offsetY: 0,
                color: COLOR_BLACK,
                bold: true,
                backgroundColor: COLOR_WHITE,
                borderColor: COLOR_GREY_LIGHT,
                borderRadius: 4,
                boxShadow: '0 6px 12px -6px rgba(0,0,0,0.2)',
                roundingValue: 0,
                formatter: null
            }
        }
    }

    const vue_ui_rating = {
        type: SHAPE.STAR,
        readonly: false,
        from: 1,
        to: 5,
        style: {
            fontFamily: 'inherit',
            animated: true,
            itemSize: 32,
            backgroundColor: COLOR_WHITE,
            star: {
                activeColor: COLOR_YELLOW,
                borderColor: COLOR_YELLOW,
                borderWidth: 3,
                apexes: 5,
                inactiveColor: COLOR_GREY_LIGHT,
                useGradient: true
            },
            image: {
                src: '',
                inactiveOpacity: 0.3,
                alt: 'rating image'
            },
            title: {
                textAlign: POSITION.CENTER,
                fontSize: FONT._20,
                color: COLOR_BLACK,
                bold: true,
                text: '',
                offsetY: 6,
                subtitle: {
                    fontSize: FONT._14,
                    color: COLOR_GREY_MID,
                    bold: false,
                    text: '',
                    offsetY: 12
                }
            },
            rating: {
                show: true,
                fontSize: FONT._24,
                bold: true,
                roundingValue: 1,
                position: POSITION.BOTTOM,
                offsetY: 0,
                offsetX: 0,
                formatter: null
            },
            tooltip: {
                show: true,
                fontSize: FONT._14,
                offsetY: 0,
                color: COLOR_BLACK,
                bold: true,
                backgroundColor: COLOR_WHITE,
                borderColor: COLOR_GREY_LIGHT,
                borderRadius: 4,
                boxShadow: '0 6px 12px -6px rgba(0,0,0,0.2)',
                roundingValue: 0,
                formatter: null
            }
        }
    }

    const vue_ui_annotator = {
        style: {
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            fixedTools: false,
            fontFamily: 'inherit',
            hideWhenFolded: false,
            showPrint: true,
            showSave: true,
            showTooltips: true,
            buttons: {
                borderRadius: 6,
                controls: {
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK,
                    border: '1px solid #262626',
                    selected: {
                        backgroundColor: COLOR_BLACK,
                        color: COLOR_WHITE_ALMOST,
                        border: `1px solid ${COLOR_GREY_MID}`
                    }
                },
                shapes: {
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK,
                    border: '1px solid #262626',
                    selected: {
                        backgroundColor: COLOR_BLACK,
                        color: COLOR_WHITE_ALMOST,
                        border: `1px solid ${COLOR_GREY_MID}`
                    }
                }
            },
            tooltips: {
                backgroundColor: COLOR_WHITE_ALMOST,
                color: COLOR_BLACK,
                border: `1px solid ${COLOR_GREY_MID}`,
                borderRadius: 6,
                boxShadow: '0 6px 12px -6px rgba(0,0,0,0.2)'
            }
        },
        translations: {
            colorAlpha: 'Color alpha',
            dashedLines: 'Dashed lines',
            filled: 'Filled',
            fontSize: 'Font size',
            thickness: 'Thickness',
            title: 'Annotations',
            tooltipGroup: 'Select & group',
            tooltipDelete: 'Delete',
            tooltipMove: 'Move',
            tooltipResize: 'Resize',
            tooltipBringToFront: 'Bring to front',
            tooltipBringToBack: 'Bring to back',
            tooltipDuplicate: 'Duplicate',
            tooltipUndo: 'Undo last shape',
            tooltipPdf: 'Save pdf',
            tooltipSave: 'Save annotations',
            tooltipShapeCircle: 'Draw circle',
            tooltipShapeRect: 'Draw rect',
            tooltipShapeArrow: 'Draw arrow',
            tooltipShapeFreehand: 'Freehand line',
            tooltipShapeText: 'Text mode',
            tooltipShapeTextLeft: 'Align left',
            tooltipShapeTextCenter: 'Align center',
            tooltipShapeTextRight: 'Align right',
            tooltipShapeTextBullet: 'Bullet points',
            tooltipShapeTextBold: 'Bold',
            tooltipShapeTextItalic: 'Italic',
            tooltipShapeTextUnderline: 'Underlined',
            tooltipShapeColor: 'Color'
        }
    }

    const vue_ui_dashboard = {
        locked: false,
        style: {
            board: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                aspectRatio: '1/1.4141',
                border: `1px solid ${COLOR_GREY_LIGHT}`
            },
            item: {
                backgroundColor: COLOR_WHITE,
                borderColor: COLOR_GREY_LIGHT
            },
            resizeHandles: {
                backgroundColor: COLOR_BLACK,
                border: 'none'
            }
        },
        allowPrint: true
    }

    const vue_ui_skeleton = {
        type: SHAPE.LINE,
        style: {
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            maxHeight: 500,
            animated: true,
            chord: {
                color: COLOR_GREY_LIGHT
            },
            ridgeline: {
                color: COLOR_GREY_LIGHT
            },
            circlePack: {
                color: COLOR_GREY_LIGHT
            },
            historyPlot: {
                color: COLOR_GREY_LIGHT
            },
            bullet: {
                color: COLOR_GREY_LIGHT
            },
            flow: {
                color: COLOR_GREY_LIGHT
            },
            parallelCoordinatePlot: {
                color: COLOR_GREY_LIGHT
            },
            treemap: {
                color: COLOR_GREY_LIGHT
            },
            dumbbell: {
                color: COLOR_GREY_LIGHT
            },
            stripPlot: {
                color: COLOR_GREY_LIGHT
            },
            galaxy: {
                color: COLOR_GREY_LIGHT
            },
            bar3d: {
                color: COLOR_GREY_LIGHT
            },
            sparkHistogram: {
                color: COLOR_GREY_LIGHT
            },
            sparkStackbar: {
                color: COLOR_GREY_LIGHT
            },
            sparkbar: {
                color: COLOR_GREY_LIGHT
            },
            thermometer: {
                color: COLOR_GREY_LIGHT
            },
            relationCircle: {
                color: COLOR_GREY_LIGHT
            },
            molecule: {
                color: COLOR_GREY_LIGHT
            },
            tiremarks: {
                color: COLOR_GREY_LIGHT
            },
            chestnut: {
                color: COLOR_GREY_LIGHT
            },
            sparkline: {
                color: COLOR_GREY_LIGHT,
                strokeWidth: 0.7
            },
            donutEvolution: {
                axis: {
                    show: true,
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                },
                donuts: {
                    strokeWidth: 0.5,
                    color: COLOR_GREY_LIGHT
                }
            },
            line: {
                axis: {
                    show: true,
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                },
                path: {
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 1,
                    showPlots: true
                }
            },
            bar: {
                axis: {
                    show: true,
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                },
                borderRadius: 0.5,
                color: COLOR_GREY_LIGHT,
                barWidth: 9
            },
            donut: {
                color: COLOR_GREY_LIGHT,
                strokeWidth: 64
            },
            onion: {
                color: COLOR_GREY_LIGHT
            },
            gauge: {
                color: COLOR_GREY_LIGHT
            },
            quadrant: {
                grid: {
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                },
                plots: {
                    radius: 1.5,
                    color: COLOR_GREY_LIGHT
                }
            },
            radar: {
                grid: {
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                },
                shapes: {
                    color: COLOR_GREY_LIGHT
                }
            },
            waffle: {
                color: COLOR_GREY_LIGHT
            },
            table: {
                th: {
                    color: COLOR_GREY_LIGHT
                },
                td: {
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                }
            },
            rating: {
                useSmiley: false,
                color: COLOR_GREY_LIGHT,
                filled: true,
                strokeWidth: 1,
                maxWidth: 200
            },
            verticalBar: {
                axis: {
                    show: true,
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                },
                borderRadius: 0.5,
                color: COLOR_GREY_LIGHT
            },
            heatmap: {
                cellsX: 26,
                cellsY: 7,
                color: COLOR_GREY_LIGHT
            },
            candlesticks: {
                axis: {
                    show: true,
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 0.5
                },
                candle: {
                    color: COLOR_GREY_LIGHT,
                    strokeWidth: 1
                }
            },
            pyramid: {
                color: COLOR_GREY_LIGHT
            },
            wheel: {
                color: COLOR_GREY_LIGHT
            },
            rings: {
                color: COLOR_GREY_LIGHT
            }
        }
    }

    const vue_ui_table = {
        fontFamily: "inherit",
        maxHeight: 500,
        rowsPerPage: 25,
        style: {
            th: {
                backgroundColor: COLOR_GREY_LIGHT,
                color: COLOR_BLACK,
                outline: `1px solid ${COLOR_WHITE}`,
                selected: {
                    backgroundColor: COLOR_BLUE,
                    color: COLOR_WHITE
                }
            },
            rows: {
                even: {
                    backgroundColor: '#f3f5f7',
                    color: COLOR_BLACK,
                    selectedCell: {
                        backgroundColor: '#1f77b45b',
                        color: COLOR_BLACK
                    },
                    selectedNeighbors: {
                        backgroundColor: '#63dd821e',
                        color: COLOR_BLACK
                    }
                },
                odd: {
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK,
                    selectedCell: {
                        backgroundColor: '#1f77b45b',
                        color: COLOR_BLACK
                    },
                    selectedNeighbors: {
                        backgroundColor: '#63dd821e',
                        color: COLOR_BLACK
                    }
                }
            },
            inputs: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                border: '1px solid #CCCCCC',
                accentColor: COLOR_BLUE
            },
            dropdowns: {
                backgroundColor: COLOR_GREY_LIGHT,
                color: COLOR_BLACK,
                icons: {
                    selected: {
                        color: COLOR_GREEN,
                        unicode: '✔'
                    },
                    unselected: {
                        color: COLOR_RED,
                        unicode: '✖'
                    }
                }
            },
            infoBar: {
                backgroundColor: COLOR_GREY_LIGHT,
                color: COLOR_BLACK
            },
            pagination: {
                buttons: {
                    backgroundColor: COLOR_GREY_LIGHT,
                    color: COLOR_BLACK,
                    opacityDisabled: 0.5
                },
                navigationIndicator: {
                    backgroundColor: COLOR_BLUE
                }
            },
            exportMenu: {
                backgroundColor: COLOR_GREY_LIGHT,
                color: COLOR_BLACK,
                buttons: {
                    backgroundColor: COLOR_WHITE_ALMOST,
                    color: COLOR_BLACK
                }
            },
            closeButtons: {
                backgroundColor: 'transparent',
                color: COLOR_BLACK,
                borderRadius: '50%'
            },
            chart: {
                modal: {
                    backgroundColor: COLOR_GREY_LIGHT,
                    color: COLOR_BLACK,
                    buttons: {
                        selected: {
                            backgroundColor: COLOR_BLUE,
                            color: COLOR_WHITE
                        },
                        unselected: {
                            backgroundColor: COLOR_WHITE,
                            color: COLOR_BLACK
                        }
                    }
                },
                layout: {
                    backgroundColor: COLOR_WHITE,
                    axis: {
                        stroke: '#ccd1d4',
                        strokeWidth: 2
                    },
                    bar: {
                        fill: COLOR_BLUE,
                        stroke: COLOR_WHITE
                    },
                    line: {
                        smooth: true,
                        useArea: false,
                        stroke: COLOR_BLUE,
                        strokeWidth: 4,
                        plot: {
                            fill: COLOR_BLUE,
                            stroke: COLOR_WHITE, // DEPRECATED
                            strokeWidth: 1,
                            radius: {
                                selected: 6,
                                unselected: 4
                            }
                        },
                        selector: { // DEPRECATED
                            stroke: '#ccc', // DEPRECATED
                            strokeWidth: 1, // DEPRECATED
                            strokeDasharray: 5 // DEPRECATED
                        }
                    },
                    labels: {
                        color: COLOR_BLACK
                    },
                    progression: {
                        stroke: COLOR_BLACK,
                        strokeWidth: 2,
                        strokeDasharray: 4,
                        arrowSize: 7
                    }
                }
            }
        },
        translations: {
            average: 'Average',
            by: 'by',
            chooseCategoryColumn: 'Choose category column',
            exportAllButton: 'CSV all',
            exportAllLabel: 'Export all rows of your current filtered dataset',
            exportPageButton: 'CSV page',
            exportPageLabel: 'Export rows of the current page',
            from: 'From',
            inputPlaceholder: 'Search...',
            makeDonut: 'Generate',
            nb: 'Nb',
            page: 'Page',
            paginatorLabel: 'Rows per page',
            sizeWarning: 'Displaying too many rows at a time can lead to slower performance',
            sum: 'Sum',
            to: 'To',
            total: 'Total',
            totalRows: 'Total rows'
        },
        useChart: true
    }
    const vue_ui_digits = {
        height: '100%',
        width: null,
        backgroundColor: COLOR_WHITE,
        digits: {
            color: COLOR_BLACK,
            skeletonColor: COLOR_GREY_LIGHT
        }
    }

    const vue_ui_carousel_table = {
        responsiveBreakpoint: 400,
        userOptions: USER_OPTIONS({
            tooltip: false,
            pdf: true,
            csv: true,
            img: true,
            table: false,
            labels: false,
            fullscreen: true,
            stack: false,
            animation: true
        }),
        animation: {
            type: 'scroll', // 'scroll' | 'marquee'
            use: true,
            speedMs: 1000,
            pauseOnHover: true,
        },
        style: {
            backgroundColor: COLOR_WHITE,
            color: COLOR_BLACK,
            fontFamily: 'inherit',
        },
        border: {
            size: 0,
            color: COLOR_BLACK
        },
        caption: {
            text: '',
            padding: PADDING([12, 12, 12, 12]),
            style: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                fontSize: `${FONT._16}px`,
                fontWeight: 'bold',
                textAlign: 'left'
            }
        },
        scrollbar: {
            showOnlyOnHover: false,
            hide: false,
        },
        thead: {
            style: {
                verticalAlign: 'middle',
            },
            tr: {
                height: 32,
                border: {
                    size: 0,
                    color: COLOR_BLACK
                },
                style: {
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK,
                    boxShadow: `0px 6px 12px -6px ${COLOR_BLACK}50`
                },
                th: {
                    border: {
                        size: 0,
                        color: COLOR_BLACK
                    },
                    padding: PADDING([0, 12, 0, 0]),
                    style: {
                        borderSpacing: 0,
                        border: 'none',
                        textAlign: 'right',
                        fontVariantNumeric: 'tabular-nums',
                    }
                }
            },
        },
        tbody: {
            backgroundColor: COLOR_WHITE,
            tr: {
                visible: 5,
                height: 32,
                border: {
                    size: 0,
                    color: COLOR_BLACK,
                },
                style: {
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK
                },
                td: {
                    alternateColor: true,
                    alternateOpacity: 0.5,
                    border: {
                        size: 0,
                        color: COLOR_BLACK,
                    },
                    padding: PADDING([0, 12, 0, 0]),
                    style: {
                        fontVariantNumeric: 'tabular-nums',
                        textAlign: 'right',
                        backgroundColor: COLOR_GREY_LIGHT
                    }
                }
            }
        }
    }

    const vue_ui_gizmo = {
        debug: false, // v3
        loading: false, // v3
        type: 'battery', // battery | gauge
        size: 64,
        stroke: COLOR_GREY_MID,
        color: COLOR_BLUE,
        useGradient: true,
        gradientColor: '#9db5ed',
        showPercentage: true,
        textColor: COLOR_BLACK,
        fontFamily: 'inherit',
        formatter: null
    }

    const vue_ui_bullet = {
        debug: false, // v3
        loading: false, // v3
        responsive: false, // v3
        theme: '',
        userOptions: USER_OPTIONS({
            tooltip: false,
            pdf: true,
            csv: false,
            img: true,
            table: false,
            labels: false,
            fullscreen: true,
            stack: false,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 96,
                width: 600,
                padding: PADDING([24, 24, 24, 12]),
                animation: {
                    show: true,
                    animationFrames: 60,
                },
                segments: {
                    baseColor: '#9A9A9A', // default if dataset.segments colors are not provided
                    dataLabels: {
                        show: true,
                        color: COLOR_BLACK,
                        fontSize: FONT._10,
                        formatter: null,
                        bold: false,
                        prefix: '',
                        suffix: '', 
                        rounding: 0,
                        offsetY: 0,
                    },
                    ticks: {
                        show: true,
                        divisions: 10,
                        stroke: '#8A8A8A',
                    }
                },
                target: {
                    show: true, // v3
                    onTop: true,
                    color: COLOR_BLACK,
                    rounded: true,
                    heightRatio: 0.8,
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    width: 6,
                },
                valueBar: {
                    color: '#3A3A3A',
                    heightRatio: 0.33,
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    label: {
                        show: true,
                        color: COLOR_BLACK,
                        fontSize: FONT._14,
                        bold: true,
                        offsetY: 0
                    }
                },
                title: {
                    ...TITLE,
                    textAlign: POSITION.LEFT,
                    paddingLeft: 12
                },
                legend: {
                    ...LEGEND,
                    roundingValue: 0,
                    position: 'bottom'
                },
            }
        }
    }

    const vue_ui_funnel = {
        theme: '',
        responsive: false,
        responsiveProportionalSizing: true,
        useCssAnimation: true,
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
                roundingPercentage: 0,
            },
            columnNames: {
                series: 'Step',
                value: 'Value',
                percentage: 'Percentage'
            }
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: false,
            fullscreen: true,
            stack: false,
            annotator: true
        }),
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                width: 600,
                height: 500,
                title: TITLE,
                padding: PADDING([12, 128, 24, 24]),
                barCircleSpacingRatio: 0.05,
                circles: {
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    dataLabels: {
                        formatter: null,
                        fontSize: FONT._16,
                        offsetY: 0,
                        adaptColorToBackground: true,
                        color: COLOR_BLACK,
                        rounding: 1,
                        bold: true,
                    }
                },
                circleLinks: {
                    show: true,
                    color: COLOR_GREY_LIGHT,
                    widthRatio: 1,
                },
                area: {
                    show: true,
                    color: COLOR_GREY_LIGHT,
                },
                bars: {
                    stroke: COLOR_WHITE,
                    defaultColor: COLOR_BLUE,
                    strokeWidth: 1,
                    gapRatio: 0.2,
                    borderRadius: 3,
                    dataLabels: {
                        name: {
                            fontSize: FONT._16,
                            color: COLOR_BLACK,
                            bold: true,
                            offsetX: 0,
                            offsetY: 0
                        },
                        value: {
                            formatter: null,
                            fontSize: FONT._16,
                            rounding: 0,
                            bold: false,
                            color: COLOR_BLACK,
                            prefix: '',
                            suffix: '',
                            offsetX: 0,
                            offsetY: 0
                        }
                    }
                },
            }
        }
    }

    const vue_ui_history_plot = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        responsiveProportionalSizing: true,
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: false,
            fullscreen: true,
            stack: false,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
            },
            columnNames: {
                series: 'Series',
                datapoint:  'Datapoint',
                x: 'x',
                y: 'y'
            }
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                height: 500,
                width: 600,
                padding: PADDING([12, 12, 12, 12]),
                grid: {
                    xAxis: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 1,
                    },
                    horizontalLines: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 0.6
                    },
                    yAxis: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 1,
                    },
                    verticalLines: {
                        show: true,
                        stroke: COLOR_GREY_LIGHT,
                        strokeWidth: 0.6
                    },
                },
                axes: {
                    x: {
                        scaleMin: null,
                        scaleMax: null,
                        ticks: 10,
                        labels: {
                            show: true,
                            fontSize: FONT._16,
                            color: COLOR_BLACK,
                            bold: false,
                            rounding: 1,
                            offsetY: 0,
                            rotation: 0,
                            autoRotate: { // v3
                                enable: true, // v3
                                angle: -30, // v3
                            },
                            formatter: null,
                            prefix: '',
                            suffix: ''
                        },
                        name: {
                            text: '',
                            fontSize: FONT._16,
                            offsetX: 0,
                            offsetY: 0,
                            bold: false,
                            color: COLOR_BLACK
                        }
                    },
                    y: {
                        scaleMin: null,
                        scaleMax: null,
                        ticks: 10,
                        labels: {
                            show: true,
                            fontSize: FONT._16,
                            color: COLOR_BLACK,
                            bold: false,
                            rounding: 1,
                            offsetX: 0,
                            formatter: null,
                            prefix: '',
                            suffix: ''
                        },
                        name: {
                            text: '',
                            fontSize: FONT._16,
                            offsetX: 0,
                            offsetY: 0,
                            bold: false,
                            color: COLOR_BLACK
                        }
                    }
                },
                plots: {
                    radius: 16,
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    gradient: {
                        show: true,
                        intensity: 40
                    },
                    indexLabels: {
                        show: true,
                        startAtZero: false,
                        adaptColorToBackground: true,
                        color: COLOR_BLACK,
                        fontSize: FONT._16,
                        bold: false,
                        offsetY: 0,
                        offsetX: 0
                    },
                    labels: {
                        show: true,
                        fontSize: FONT._10,
                        color: COLOR_BLACK,
                        bold: false,
                        offsetY: 0,
                        offsetX: 0,
                    }
                },
                paths: {
                    show: true,
                    strokeWidth: 1.6,
                    useSerieColor: true,
                    stroke: COLOR_BLACK
                },
                legend: {
                    ...LEGEND,
                    position: 'bottom'
                },
                title: TITLE,
                tooltip: TOOLTIP

            }
        }
    }

    const vue_ui_circle_pack = {
        debug: false, // v3
        loading: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        userOptions: USER_OPTIONS({
            tooltip: false,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: false,
            fullscreen: true,
            stack: false,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: TABLE_TD,
            columnNames: {
                datapoint: 'Datapoint',
                value: 'Value'
            }
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                title: TITLE,
                circles: {
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    gradient: {
                        show: true,
                        intensity: 40
                    },
                    labels: {
                        name: {
                            fontSizeRatio: 1,
                            show: true,
                            bold: false,
                            offsetY: 0,
                            color: 'auto'
                        },
                        value: {
                            fontSizeRatio: 1,
                            show: true,
                            color: 'auto',
                            rounding: 0,
                            prefix: '',
                            suffix: '',
                            formatter: null,
                            bold: false,
                            offsetY: 0
                        },
                    },
                    zoom: {
                        show: true,
                        shadowForce: 1,
                        opacity: 0.8,
                        animationFrameMs: 200, // The higher the slower
                        zoomRatio: 1,
                        label: {
                            name: {
                                fontSize: FONT._14,
                                bold: false,
                                offsetY: 0,
                                color: 'auto'
                            },
                            value: {
                                fontSize: FONT._14,
                                bold: false,
                                offsetY: 0,
                                rounding: 0,
                                prefix: '',
                                suffix: '',
                                formatter: null,
                                color: 'auto'
                            }
                        }
                    }
                }
            }
        }
    }

    const vue_ui_world = {
        debug: false, // v3
        loading: false, // v3
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        userOptions: USER_OPTIONS({
            tooltip: true,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: false,
            fullscreen: true,
            stack: false,
            annotator: true
        }),
        customPalette: [],
        projection: 'globe',
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                padding: PADDING([12,12,12,12]),
                dataLabels: {
                    prefix: '',
                    suffix: '',
                    rounding: 0,
                    formatter: null
                },
                dimensions: {
                    height: null,
                    width: null
                },
                // Specific config for the globe projection
                globe: {
                    // Center on China: x:98, y:34
                    // Center on USA: x:-101, y:42
                    // Center on Australia: x:133, y:-26.5
                    // Center on Europe: x:13, y:44
                    // etc
                    center: {
                        x: 0,
                        y: 0
                    },
                    waterColor: COLOR_BLUE,
                },
                territory: {
                    stroke: '#666666',
                    emptyColor: '#E0E0E0',
                    strokeWidth: 0.5,
                    strokeWidthSelected: 2,
                    colors: {
                        min: '#E0E0E0',
                        max: null, // defaults to palette[0] if kept null
                    },
                    showTaiwanAsPartOfChina: false,
                },
                tooltip: {
                    ...TOOLTIP,
                    showMinimap: true
                },
                title: TITLE,
                legend: {
                    ...LEGEND,
                    position: 'bottom'
                }
            }
        },
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0,
            },
            columnNames: {
                series: 'Country',
                value: 'Value',
                category: 'Category'
            }
        },
    }

    const vue_ui_ridgeline = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: { // v3
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        useCssAnimation: false, // v2 = true
        userOptions: USER_OPTIONS({
            tooltip: false,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: false,
            fullscreen: true,
            stack: false,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: {
                ...TABLE_TD,
                roundingValue: 0
            },
            columnNames: {
                series: 'Series',
            }
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                padding: PADDING([12, 0, 0, 12]),
                title: TITLE,
                legend: LEGEND,
                dialog: {
                    show: true,
                    backgroundColor: COLOR_WHITE,
                    color: COLOR_BLACK,
                    header: {
                        backgroundColor: COLOR_GREY_LIGHT,
                        color: COLOR_BLACK
                    },
                    xyChart: {
                        ...vue_ui_xy,
                        responsive: true,
                        line: {
                            ...vue_ui_xy.line,
                            showTransition: false,
                            labels: {
                                ...vue_ui_xy.line.labels,
                                show: true
                            }
                        },
                        chart: {
                            ...vue_ui_xy.chart,
                            tooltip: {
                                ...vue_ui_xy.chart.tooltip,
                                showPercentage: false
                            },
                            userOptions: {
                                ...vue_ui_xy.chart.userOptions,
                                buttons: {
                                    ...vue_ui_xy.chart.userOptions.buttons,
                                    pdf: false,
                                    fullscreen: false,
                                }
                            },
                            zoom: {
                                ...vue_ui_xy.chart.zoom,
                                minimap: {
                                    ...vue_ui_xy.chart.zoom.minimap,
                                    show: true,
                                }
                            }
                        }
                    }
                },
                areas: {
                    height: 60, // height > rowHeight results in the classic ridgeline look
                    rowHeight: 30,
                    strokeWidth: 1,
                    stroke: {
                        useSerieColor: false,
                        color: COLOR_WHITE,
                    },
                    smooth: true, // Also applied in dialog chart
                    opacity: 0.9,
                    useCommonColor: false,
                    useGradient: true,
                    maxPoint: {
                        show: true,
                        adaptStrokeToBackground: true,
                        stroke: COLOR_BLACK,
                        strokeWidth: 1,
                        strokeDasharray: 4,
                    },
                },
                selector: {
                    show: true,
                    stroke: COLOR_GREY_MID,
                    strokeWidth: 1,
                    strokeDasharray: 2,
                    labels: {
                        fontSize: 12,
                        formatter: null,
                        rounding: 0,
                        color: COLOR_BLACK,
                    },
                    dot: {
                        radius: 4,
                        useDatapointColor: true,
                        fill: COLOR_GREY_MID,
                        stroke: COLOR_WHITE,
                        strokeWidth: 0.5
                    },
                },
                zeroLine: {
                    show: true,
                    strokeWidth: 1,
                    strokeDasharray: 0,
                    useSerieColor: false,
                    stroke: COLOR_GREY_MID
                },
                xAxis: {
                    labels: {
                        prefix: '',
                        suffix: '',
                        rotation: 0,
                        autoRotate: { // v3
                            enable: true, // v3
                            angle: -30 // v3
                        },
                        values: [],
                        datetimeFormatter: AXIS_DATE_FORMATTER,
                        color: COLOR_BLACK,
                        fontSize: 14,
                        bold: false,
                        showOnlyAtModulo: false,
                        modulo: 12,
                        showOnlyFirstAndLast: false,
                        offsetY: 0,
                    }
                },
                yAxis: {
                    labels: {
                        fontSize: 16,
                        bold: false,
                        color: COLOR_BLACK,
                        offsetX: 0
                    }
                }
            }
        }
    }

    const vue_ui_chord = {
        debug: false, // v3
        loading: false, // v3
        responsive: false,
        events: {
            datapointEnter: null, // v3
            datapointLeave: null, // v3
            datapointClick: null, // v3
        },
        theme: '',
        customPalette: [],
        enableRotation: true,
        initialRotation: 0,
        useCssAnimation: false, // v2 = true
        userOptions: USER_OPTIONS({
            tooltip: false,
            pdf: true,
            csv: true,
            img: true,
            table: true,
            labels: false,
            fullscreen: true,
            stack: false,
            annotator: true
        }),
        table: {
            ...TABLE,
            th: TABLE_TH,
            td: TABLE_TD,
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
                legend: {
                    ...LEGEND,
                    position: 'bottom'
                },
                title: TITLE,
                arcs: {
                    innerRadiusRatio: 1,
                    outerRadiusRatio: 1,
                    padAngle: 5,
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    labels: {
                        show: true,
                        fontSize: 14,
                        bold: false,
                        curved: false,
                        adaptColorToBackground: true, // Applied if curved
                        color: COLOR_BLACK, // If curved, applied if !adaptColorToBackground
                        offset: 0,
                        showPercentage: true,
                        roundingPercentage: 0,
                    }
                },
                ribbons: {
                    stroke: COLOR_WHITE,
                    strokeWidth: 1,
                    underlayerOpacity: 1,
                    labels: {
                        show: true,
                        formatter: null,
                        prefix: '',
                        suffix: '',
                        rounding: 0,
                        fontSize: 14,
                        bold: false,
                        useSerieColor: false,
                        color: COLOR_BLACK,
                        offset: 0,
                        minSeparationDeg: 3,
                        connector: {
                            stroke: COLOR_BLACK,
                            strokeWidth: 1
                        },
                        marker: {
                            show: true,
                            radius: 3,
                            stroke: COLOR_WHITE,
                            strokeWidth: 1
                        }
                    }
                },
            }
        }
    }

    return {
        vue_ui_xy,
        vue_ui_donut,
        vue_ui_treemap,
        vue_ui_waffle,
        vue_ui_radar,
        vue_ui_quadrant,
        vue_ui_gauge,
        vue_ui_wheel,
        vue_ui_tiremarks,
        vue_ui_chestnut,
        vue_ui_onion,
        vue_ui_vertical_bar, // deprecate in v4
        vue_ui_horizontal_bar, // v3
        vue_ui_heatmap,
        vue_ui_scatter,
        vue_ui_candlestick,
        vue_ui_sparkline,
        vue_ui_sparkbar,
        vue_ui_sparkstackbar,
        vue_ui_sparkhistogram,
        vue_ui_sparkgauge,
        vue_ui_spark_trend,
        vue_ui_quick_chart,
        vue_ui_age_pyramid,
        vue_ui_relation_circle,
        vue_ui_thermometer,
        vue_ui_rings,
        vue_ui_donut_evolution,
        vue_ui_mood_radar,
        vue_ui_molecule,
        vue_ui_nested_donuts,
        vue_ui_galaxy,
        vue_ui_strip_plot,
        vue_ui_dumbbell,
        vue_ui_3d_bar,
        vue_ui_table_sparkline,
        vue_ui_table_heatmap,
        vue_ui_word_cloud,
        vue_ui_xy_canvas,
        vue_ui_flow,
        vue_ui_parallel_coordinate_plot,
        vue_ui_timer,
        vue_ui_carousel_table,
        vue_ui_gizmo,
        vue_ui_stackbar,
        vue_ui_bullet,
        vue_ui_funnel,
        vue_ui_history_plot,
        vue_ui_world,
        vue_ui_ridgeline,
        vue_ui_chord,
        // non chart components
        vue_ui_cursor,
        vue_ui_accordion,
        vue_ui_kpi,
        vue_ui_mini_loader,
        vue_ui_smiley,
        vue_ui_rating,
        vue_ui_annotator,
        vue_ui_dashboard,
        vue_ui_skeleton,
        vue_ui_table,
        vue_ui_digits,
        vue_ui_circle_pack
    }
}