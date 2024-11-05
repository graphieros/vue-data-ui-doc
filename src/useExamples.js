import { ref, computed } from "vue";
import { useMainStore } from "./stores";


export default function useExamples() {
    
    const store = useMainStore();
    const isDarkMode = computed(() => store.isDarkMode);
    const colors = computed(() => {
        return {
            bg: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            textColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            gridStroke: isDarkMode.value ? '#5A5A5A' : '#CCCCCC'
        }
    });
    


    function makeRandomSet(n, m = 100) {
        const arr = [];
        for( let i = 0; i < n; i += 1) {
            arr.push(Math.random() * m + Math.random()*(m / 10))
        }
        return arr;
    }

    const TABLE = computed(() => {
        return {
            th: {
                backgroundColor: colors.value.bg,
                color: colors.value.textColor
            },
            td: {
                backgroundColor: colors.value.bg,
                color: colors.value.textColor
            },
        }
    })

    //-------------- VUE-UI-XY --------------//

    const LINESET = ref([
        -89, -55, -34, -21, -13, -8, -5, -3, -2, -1, 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
    ]);

    const BARSET = ref([
        21, 13, 29, 51, 12, 19, 16, 32, 64, 16, 21, 19, 45, 32, 12, -17, 34, 12, 2, 19, 40
    ]);

    const LINESET_FIXED_0 = ref([
        20, -20, 20, -20, 20, -20, 20, -20, 20, -20, 20, -20, 20, -20, 20, -20, 20, -20, 20, -20,
    ])
    const LINESET_FIXED_1 = ref([
        -60, 58, -56, 54, -52, 50, -48, 46, -44, 42, -40, 38, -36, 34, -32, 30, -28, 26, -24, 22
    ])
    const BINARYSET = ref([
        1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1
    ])
    const BINARYSET2 = ref([
        0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0
    ])
    const KRACHSET = ref([
        65, 68, 72, 88, 93, 94, 92, 97, 98, 100, 99, 106, 119, 140, 12, 9, 7, 5, 12, 18, 29
    ])

    const DATASET_XY_BASIC_LINE = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: LINESET
        }
    ]);

    const DATASET_XY_COMMENTS = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: KRACHSET,
            comments: ['','','','','','','','','','','','', '', '', 'OMG!',]
        }
    ]);

    const DATASET_XY_LINE_FIXED = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: false,
            smooth: true,
            series: LINESET_FIXED_0
        },
        {
            name: 'Serie 2',
            type: 'line',
            dataLabels: false,
            smooth: true,
            series: LINESET_FIXED_1
        }
    ]);

    const DATASET_XY_BASIC_LINE_SMOOTH = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            smooth: true,
            series: LINESET
        }
    ]);

    const DATASET_XY_BASIC_BAR = ref([
        {
            name: 'Serie 1',
            type: 'bar',
            dataLabels: true,
            series: LINESET
        }
    ]);

    const DATASET_XY_BASIC_COMBINED = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: LINESET
        },
        {
            name: 'Serie 2',
            type: 'bar',
            dataLabels: true,
            series: BARSET
        }
    ]);

    const DATASET_XY_BASIC_COMBINED_STACK = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: false,
            series: LINESET,
            scaleSteps: 5
        },
        {
            name: 'Serie 2',
            type: 'bar',
            dataLabels: false,
            series: BARSET,
            scaleSteps: 4
        },
        {
            name: 'Serie 3',
            type: 'line',
            dataLabels: false,
            series: BINARYSET,
            stackRatio: 0.1,
            scaleSteps: 2
        },
        {
            name: 'Serie 2',
            type: 'line',
            dataLabels: false,
            series: BINARYSET2,
            stackRatio: 0.1,
            scaleSteps: 2
        }
    ]);

    const DATASET_XY_BASIC_MULTIBAR = ref([
        {
            name: 'Serie 1',
            type: 'bar',
            dataLabels: true,
            series: makeRandomSet(8, 100)
        },
        {
            name: 'Serie 2',
            type: 'bar',
            dataLabels: true,
            series: makeRandomSet(8, 100)
        },
        {
            name: 'Serie 3',
            type: 'bar',
            dataLabels: true,
            series: makeRandomSet(8, 100)
        },
    ]);

    const BASE_XY_CONFIG = computed(() => {
        return {
            table: TABLE.value,
            chart: {
                backgroundColor: colors.value.bg,
                color: colors.value.textColor,
                title: {
                    text: 'Title',
                    color: colors.value.textColor,
                    textAlign: 'left',
                    paddingLeft: 24,
                    subtitle: {
                        text: 'Subtitle'
                    }
                },
                padding: {
                    left: 82,
                    bottom: 90,
                    right: 70
                },
                legend: {
                    color: colors.value.textColor,
                },
                tooltip: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    showPercentage: false,
                    borderColor: colors.value.gridStroke,
                    backgroundOpacity: 30
                },
                highlighter: {
                    color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                    opacity: 5
                },
                highlightArea: {
                    show: true,
                    from: 0,
                    to: 20,
                    color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                    opacity: 3,
                    caption: {
                        text: ''
                    }
                },
                grid: {
                    stroke: colors.value.gridStroke,
                    frame: {
                        show: true,
                        stroke: colors.value.gridStroke
                    },
                    labels: {
                        fontSize: 16,
                        color: colors.value.textColor,
                        axis: {
                            yLabel: 'yAxis',
                            fontSize: 20,
                            xLabel: 'xAxis',
                            xLabelOffsetY: 48
                        },
                        xAxis: {
                            showBaseline: true,
                        },
                        xAxisLabels: {
                            color: colors.value.textColor,
                            values: ['01-25', '02-25', '03-25', '04-25', '05-25', '06-25', '07-25', '08-25', '09-25', '10-25', '11-25', '12-25', '01-26', '02-26', '03-26', '04-26', '05-26', '06-26', '07-26', '08-26', '09-26'],
                            rotation: -45
                        }
                    }
                },
                labels: {
                    fontSize: 20,
                },
                zoom: {
                    minimap: {
                        show: true,
                        lineColor: '#1F77B4',
                        indicatorColor: colors.value.textColor
                    }
                }
            },
            line: {
                radius: 5,
                useGradient: false,
                labels: {
                    show: true,
                    color: colors.value.textColor,
                    offsetY: -12
                }
            },
            bar: {
                labels: {
                    show: true,
                    color: colors.value.textColor,
                    offsetY: -6
                }
            }
        }
    })

    //-------------- VUE-UI-DONUT------------- //

    const CONFIG_DONUT_BASE = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    legend: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                    },
                    tooltip: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                        showPercentage: false,
                        borderColor: colors.value.gridStroke,
                        backgroundOpacity: 30,
                        showPercentage: true,
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddingLeft: 24,
                        subtitle: {
                            text: 'Subtitle'
                        }
                    },
                    layout: {
                        labels: {
                            percentage: {
                                color: colors.value.textColor,
                            },
                            name: {
                                color: '#6A6A6A'
                            },
                            hollow: {
                                average: {
                                    color: '#6A6A6A',
                                    value: {
                                        color: colors.value.textColor,
                                    }
                                },
                                total: {
                                    color: '#6A6A6A',
                                    offsetY: -6,
                                    value: {
                                        color: colors.value.textColor,
                                        offsetY: -6
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const DATASET_DONUT_BASIC = computed(() => {
        return [
            {
                name: 'Series 1',
                values: [100]
            },
            {
                name: 'Series 2',
                values: [50]
            },
            {
                name: 'Series 3',
                values: [25]
            },
            {
                name: 'Series 4',
                values: [12.5]
            },
        ]
    });

    const DATASET_DONUT_COMMENT = computed(() => {
        return [
            {
                name: 'Series 1',
                values: [100],
                comment: 'This is a comment for Series 1'
            },
            {
                name: 'Series 2',
                values: [50],
                comment: 'This is a comment for Series 2'
            },
            {
                name: 'Series 3',
                values: [25],
                comment: 'This is a comment for Series 3'
            },
            {
                name: 'Series 4',
                values: [12.5]
            },
        ]
    });

    //-------------- VUE-UI-SPARKLINE ------------- //
    const CONFIG_SPARKLINE_BASE = computed(() => {
        return {
            style: {
                backgroundColor: colors.value.bg,
                chartWidth: 350,
                area: {
                    show: false,
                },
                dataLabel: {
                    fontSize: 64,
                    color: colors.value.textColor
                },
                line: {
                    color: '#1F77B4',
                },
                title: {
                    color: '#6A6A6A',
                    text: 'Title'
                },
            }
        }
    });

    const DATASET_SPARKLINE = ref([
        { period: 'T1', value: 55 },
        { period: 'T0', value: 89 },
        { period: 'T3', value: 21 },
        { period: 'T2', value: 34 },
        { period: 'T4', value: 13 },
        { period: 'T6', value: 5 },
        { period: 'T5', value: 8 },
        { period: 'T9', value: 11 },
        { period: 'T7', value: 31 },
        { period: 'T8', value: 12 },
        { period: 'T11', value: 11 },
        { period: 'T10', value: 7 },
        { period: 'T17', value: 21 },
        { period: 'T12', value: 6 },
        { period: 'T13', value: 9 },
        { period: 'T18', value: 34 },
        { period: 'T20', value: 89 },
        { period: 'T14', value: 5 },
        { period: 'T16', value: 13 },
        { period: 'T15', value: 8 },
        { period: 'T19', value: 55 },
    ]);

    //-------------- VUE-UI-STACKBAR --------------//
    const CONFIG_STACKBAR_BASE = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    grid: {
                        x: {
                            axisColor: colors.value.gridStroke,
                            axisName: {
                                text: 'xAxis',
                                color: colors.value.textColor
                            },
                            timeLabels: {
                                color: colors.value.textColor,
                                values: ['T0', 'T1', 'T2', 'T3', 'T4', 'T5']
                            }
                        },
                        y: {
                            axisColor: colors.value.gridStroke,
                            axisName: {
                                text: 'yAxis',
                                color: colors.value.textColor
                            },
                            axisLabels: {
                                color: colors.value.textColor
                            }
                        }
                    },
                    highlighter: {
                        color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                        opacity: 5
                    },
                    legend: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddintLeft: 24,
                        subtitle: {
                            text: 'Subtitle'
                        }
                    },
                    tooltip: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                        borderColor: colors.value.gridStroke,
                        backgroundOpacity: 30
                    },
                    bars: {
                        totalValues: {
                            color: colors.value.textColor
                        }
                    },
                }
            }
        }
    });

    const DATASET_STACKBAR_BASIC = ref([
        {
            name: "Serie 1",
            series: [19, 20.07, 30, 40, 50, 60],
        },
        {
            name: "Serie 2",
            series: [13, 8, 9, 13, 25, 27],
        },
        {
            name: "Serie 3",
            series: [13, 10, 9, 13, 25, 19],
        },
        {
            name: "Serie 4",
            series: [25, 23, 9, 13, 25, 31],
        },
    ])
    const DATASET_STACKBAR_MIXED = ref([
        {
            name: "Serie 1",
            series: [-19, -20.07, -30, -40, -50, -60],
        },
        {
            name: "Serie 2",
            series: [13, 8, 9, 13, 25, 27],
        },
        {
            name: "Serie 3",
            series: [13, 10, 9, 13, 25, 19],
        },
        {
            name: "Serie 4",
            series: [-25, -23, -9, -13, -25, -31],
        },
    ])

    //-------------- VUE-UI-NESTED-DONUTS --------------//
    const CONFIG_NESTED_DONUTS_BASE = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    layout: {
                        labels: {
                            dataLabels: {
                                color: colors.value.textColor
                            }
                        }
                    },
                    legend: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddintLeft: 24,
                        subtitle: {
                            text: 'Subtitle'
                        }
                    },
                    tooltip: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                        borderColor: colors.value.gridStroke,
                        backgroundOpacity: 30
                    },
                }
            }
        }
    })

    const DATASET_NESTED_DONUTS_BASIC = ref([
        {
            name: "Group 1",
            series: [
                {
                    name: 'Serie 1',
                    values: [50]
                },
                {
                    name: 'Serie 2',
                    values: [30]
                },
                {
                    name: 'Serie 3',
                    values: [20]
                },
            ]
        },
        {
            name: "Group 2",
            series: [
                {
                    name: 'Serie 1',
                    values: [40]
                },
                {
                    name: 'Serie 2',
                    values: [40]
                },
                {
                    name: 'Serie 3',
                    values: [30]
                },
            ]
        },
    ])

    const DATASET_NESTED_DONUTS_QUAD = ref([
        {
            name: "Group 1",
            series: [
                {
                    name: 'Serie 1',
                    values: [50]
                },
                {
                    name: 'Serie 2',
                    values: [30]
                },
                {
                    name: 'Serie 3',
                    values: [20]
                },
            ]
        },
        {
            name: "Group 2",
            series: [
                {
                    name: 'Serie 1',
                    values: [40]
                },
                {
                    name: 'Serie 2',
                    values: [40]
                },
                {
                    name: 'Serie 3',
                    values: [30]
                },
            ]
        },
        {
            name: "Group 3",
            series: [
                {
                    name: 'Serie 1',
                    values: [12]
                },
                {
                    name: 'Serie 2',
                    values: [27]
                },
                {
                    name: 'Serie 3',
                    values: [100]
                },
            ]
        },
        {
            name: "Group 4",
            series: [
                {
                    name: 'Serie 1',
                    values: [55]
                },
                {
                    name: 'Serie 2',
                    values: [55]
                },
                {
                    name: 'Serie 3',
                    values: [55]
                },
            ]
        },
    ]);

    //-------------- VUE-UI-NESTED-DONUTS --------------//
    const CONFIG_WAFFLE_BASE = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    legend: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                    },
                    tooltip: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                        borderColor: colors.value.gridStroke,
                        backgroundOpacity: 30
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddintLeft: 24,
                        subtitle: {
                            text: 'Subtitle'
                        }
                    },
                }
            }
        }
    });

    //-------------- VUE-UI-VERTICAL-BAR --------------//
    const CONFIG_VERTICAL_BAR_BASIC = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    layout: {
                        bars: {
                            dataLabels: {
                                color: colors.value.textColor
                            },
                            nameLabels: {
                                color: colors.value.textColor
                            },
                            parentLabels: {
                                color: colors.value.textColor
                            }
                        },
                        highlighter: {
                            color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                            opacity: 5
                        },
                        separators: {
                            color: colors.value.gridStroke
                        }
                    },
                    legend: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor
                    },
                    tooltip: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                        borderColor: colors.value.gridStroke,
                        backgroundOpacity: 30
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddintLeft: 24,
                        subtitle: {
                            text: 'Subtitle'
                        }
                    },
                }
            }
        }
    })

    const DATASET_VERTICAL_BAR_BASE = ref([
        {
            name: "Parent 1",
            children: [
            {
                name: "Parent 1 Child 1",
                value: 80
            },
            {
                name: "Parent 1 Child 2",
                value: 20
            },
            ]
        },
        {
            name: "Parent 2",
            value: 345,
        },
        {
            name: "Parent 3",
            value: 210,
        },
        {
            name: "Parent 4",
            value: 188,
        },
        {
            name: "Parent 5",
            children: [
            {
                name: "Parent 5 Child 1",
                value: 60,
            },
            {
                name: "Parent 5 Child 2",
                value: 20,
            },
            {
                name: "Parent 5 Child 3",
                value: 40,
            },
            ]
        }
    ])

    const DATASET_VERTICAL_BAR_MIXED = ref([
        {
            name: "Parent 1",
            children: [
            {
                name: "Parent 1 Child 1",
                value: 80
            },
            {
                name: "Parent 1 Child 2",
                value: 20
            },
            ]
        },
        {
            name: "Parent 2",
            children: [
                {
                    name: 'Parent 2 Child 1',
                    value: -92
                },
                {
                    name: 'Parent 2 Child 2',
                    value: -65
                },
                {
                    name: 'Parent 2 Child 3',
                    value: -36
                },
            ]
        },
        {
            name: "Parent 3",
            value: 112,
        },
        {
            name: "Parent 4",
            children: [
                {
                    name: "Parent 4 Child 1",
                    value: 60,
                },
                {
                    name: "Parent 4 Child 2",
                    value: 20,
                },
            ]
        }
    ])

    //-------------- VUE-UI-HEATMAP --------------//
    const CONFIG_HEATMAP_BASIC = computed(() => {
        return {
            table: TABLE.value,
            style: {
                backgroundColor: colors.value.bg,
                color: colors.value.textColor,
                layout: {
                    cells: {
                        colors: {
                            hot: isDarkMode.value ? '#5f8aee' : '#1d7318',
                            cold: isDarkMode.value ? '#3A3A3A' : '#FFFFFF'
                        },
                        selected: {
                            color: colors.value.textColor,
                            border: 1.5
                        }
                    },
                    dataLabels: {
                        xAxis: {
                            values: makeHeatmapLabels(24),
                            color: colors.value.textColor
                        },
                        yAxis: {
                            color: colors.value.textColor

                        }
                    }
                },
                legend: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    fontSize: 8
                },
                tooltip: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    borderColor: colors.value.gridStroke,
                    backgroundOpacity: 30
                },
                title: {
                    text: 'Title',
                    color: colors.value.textColor,
                    textAlign: 'left',
                    paddintLeft: 24,
                    subtitle: {
                        text: 'Subtitle'
                    }
                },
            }
        }
    })

    function makeHeatmapDs(n, m) {
        const arr = [];
        for(let i = 0; i < n; i += 1) {
            arr.push(Math.round(Math.random() * m))
        }
        return arr;
    }

    function makeHeatmapLabels(n) {
        const arr = []
        for(let i = 0; i < n; i += 1) {
            arr.push(`W${i}`)
        }
        return arr
    } 

    const DATASET_HEATMAP_BASE = ref([
        { name: 'SUN', values: makeHeatmapDs(24, 10)},
        { name: 'MON', values: makeHeatmapDs(24, 110)},
        { name: 'TUE', values: makeHeatmapDs(24, 100)},
        { name: 'WED', values: makeHeatmapDs(24, 110)},
        { name: 'THU', values: makeHeatmapDs(24, 110)},
        { name: 'FRI', values: makeHeatmapDs(24, 90)},
        { name: 'SAT', values: makeHeatmapDs(24, 30)},
    ])

    const examples = computed(() => {
        return [
            // XY BASIC LINE
            { 
                dataset: DATASET_XY_BASIC_LINE.value, 
                config: BASE_XY_CONFIG.value,
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'basic-line',
                link: 'vue-ui-xy',
                description: {
                    en: 'Basic line chart',
                    fr: 'Graphique linéaire de base',
                    pt: 'Gráfico de linha básico',
                    de: 'Grundlegendes Liniendiagramm',
                    zh: '基本折线图',
                    jp: '基本的な折れ線グラフ',
                    es: 'Gráfico de línea básico',
                    ko: '기본 선형 차트',
                    ar: 'مخطط خطي أساسي'
                }
            },
            // XY LINE SMOOTH
            { 
                dataset: DATASET_XY_BASIC_LINE_SMOOTH.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        zoom: {
                            ...BASE_XY_CONFIG.value.chart.zoom,
                            minimap: {
                                ...BASE_XY_CONFIG.value.chart.zoom.minimap,
                                smooth: true
                            }
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'basic-smooth-line',
                link: 'vue-ui-xy',
                description: {
                    en: 'Basic smooth line chart',
                    fr: 'Graphique linéaire lisse de base',
                    pt: 'Gráfico de linha suave básico',
                    de: 'Grundlegendes glattes Liniendiagramm',
                    zh: '基本平滑折线图',
                    jp: '基本的な滑らかな折れ線グラフ',
                    es: 'Gráfico de línea suave básico',
                    ko: '기본 부드러운 선형 차트',
                    ar: 'مخطط خطي ناعم أساسي'
                }
            },
            // XY BASIC BAR
            { 
                dataset: DATASET_XY_BASIC_BAR.value, 
                config: BASE_XY_CONFIG.value,
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'basic-bar',
                link: 'vue-ui-xy',
                description: {
                    en: 'Basic histogram',
                    fr: 'Histogramme de base',
                    pt: 'Histograma básico',
                    de: 'Grundlegendes Histogramm',
                    zh: '基本直方图',
                    jp: '基本的なヒストグラム',
                    es: 'Histograma básico',
                    ko: '기본 히스토그램',
                    ar: 'مخطط مدرج تكراري أساسي'
                }
            },
            // XY COMBINED
            { 
                dataset: DATASET_XY_BASIC_COMBINED.value, 
                config: BASE_XY_CONFIG.value,
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'basic-combined',
                link: 'vue-ui-xy',
                description: {
                    en: 'Combined',
                    fr: 'Combiné',
                    pt: 'Combinado',
                    de: 'Kombiniert',
                    zh: '组合图',
                    jp: '組み合わせ',
                    es: 'Combinado',
                    ko: '결합된',
                    ar: 'مركب'
                }
            },
            // XY MULTIBAR
            { 
                dataset: DATASET_XY_BASIC_MULTIBAR.value, 
                config: BASE_XY_CONFIG.value,
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'basic-multibar',
                link: 'vue-ui-xy',
                description: {
                    en: 'Multiple bar series',
                    fr: 'Séries de barres multiples',
                    pt: 'Séries de barras múltiplas',
                    de: 'Mehrere Balkenreihen',
                    zh: '多条柱状系列',
                    jp: '複数の棒グラフシリーズ',
                    es: 'Series de barras múltiples',
                    ko: '다중 막대 시리즈',
                    ar: 'سلاسل شريطية متعددة'
                }
            },
            // XY FIXED SCALE
            { 
                dataset: DATASET_XY_LINE_FIXED.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        zoom: {
                            ...BASE_XY_CONFIG.value.chart.zoom,
                            minimap: {
                                ...BASE_XY_CONFIG.value.chart.zoom.minimap,
                                smooth: true,
                            }
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            position: 'start',
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: -100,
                                    scaleMax: 100
                                },
                            }
                        }
                    }

                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'basic-fixed-scale',
                link: 'vue-ui-xy',
                description: {
                    en: 'Fixed scale, starting point',
                    fr: 'Échelle fixe, point de départ',
                    pt: 'Escala fixa, ponto de partida',
                    de: 'Feste Skala, Ausgangspunkt',
                    zh: '固定比例，起点',
                    jp: '固定スケール、始点',
                    es: 'Escala fija, punto de partida',
                    ko: '고정 스케일, 시작점',
                    ar: 'مقياس ثابت، نقطة البداية'
                }
            },
            // XY HIGHLIGHT AREAS
            { 
                dataset: DATASET_XY_BASIC_LINE.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        highlightArea: [
                            {
                                show: true,
                                from: 2,
                                to: 4,
                                color: '#ff6600',
                                opacity: 10,
                                caption: {
                                    text: 'This period is interesting for some reason.',
                                    color: colors.value.textColor,
                                    fontSize: 16,
                                    offsetY: 24,
                                    width: 'auto',
                                    textAlign: 'center',
                                    padding: 3
                                }
                            },
                            {
                                show: true,
                                from: 12,
                                to: 18,
                                color: '#42d392',
                                opacity: 10,
                                caption: {
                                    text: 'This period is also kind of interesting too.',
                                    color: colors.value.textColor,
                                    fontSize: 16,
                                    offsetY: 24,
                                    width: 'auto',
                                    textAlign: 'center',
                                    padding: 3
                                }
                            }
                        ]
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'xy-highlight-areas',
                link: 'vue-ui-xy',
                description: {
                    en: 'Multiple highlight areas',
                    fr: 'Plusieurs zones en surbrillance',
                    pt: 'Múltiplas áreas de destaque',
                    de: 'Mehrere Hervorhebungsbereiche',
                    zh: '多个高亮区域',
                    jp: '複数のハイライト領域',
                    es: 'Múltiples áreas destacadas',
                    ko: '여러 강조 영역',
                    ar: 'مناطق تمييز متعددة'
                }
            },
            // XY STACKED
            { 
                dataset: DATASET_XY_BASIC_COMBINED_STACK.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            showHorizontalLines: true,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    useIndividualScale: true,
                                    stacked: true,
                                    gap: 24
                                }
                            }
                        }
                    },
                    line: {
                        ...BASE_XY_CONFIG.value.line,
                        radius: 2
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'xy-stacked',
                link: 'vue-ui-xy',
                description: {
                    en: 'Stacked series',
                    fr: 'Séries empilées',
                    pt: 'Séries empilhadas',
                    de: 'Gestapelte Serien',
                    zh: '堆叠系列',
                    jp: '積み重ねられたシリーズ',
                    es: 'Series apiladas',
                    ko: '스택 시리즈',
                    ar: 'سلاسل مكدسة'
                }
            },
            // XY LINE WITH COMMENT
            { 
                dataset: DATASET_XY_COMMENTS.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        comments: {
                            showInTooltip: true,
                            width: 100,
                            offsetY: -120
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'basic-line',
                link: 'vue-ui-xy',
                description: {
                    en: 'With an individual datapoint comment',
                    fr: 'Avec un commentaire sur un point de données individuel',
                    pt: 'Com um comentário de ponto de dados individual',
                    de: 'Mit einem Kommentar zu einem einzelnen Datenpunkt',
                    zh: '带有单个数据点评论',
                    jp: '個別データポイントのコメント付き',
                    es: 'Con un comentario de punto de datos individual',
                    ko: '개별 데이터 포인트에 대한 주석 포함',
                    ar: 'مع تعليق على نقطة بيانات فردية'
                }
            },
            // DONUT BASIC
            {
                dataset: DATASET_DONUT_BASIC.value,
                config: CONFIG_DONUT_BASE.value,
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-basic',
                link: 'vue-ui-donut',
                description: {
                    en: 'Basic donut chart',
                    fr: 'Graphique en anneau de base',
                    pt: 'Gráfico de rosca básico',
                    de: 'Grundlegendes Donut-Diagramm',
                    zh: '基础甜甜圈图表',
                    jp: '基本的なドーナツチャート',
                    es: 'Gráfico de rosquilla básico',
                    ko: '기본 도넛 차트',
                    ar: 'مخطط دائري أساسي'
                }
            },
            // DONUT COMMENTS
            {
                dataset: DATASET_DONUT_COMMENT.value,
                config: {
                    ...CONFIG_DONUT_BASE.value,
                    style: {
                        ...CONFIG_DONUT_BASE.value.style,
                        chart: {
                            ...CONFIG_DONUT_BASE.value.style.chart,
                            comments: {
                                show: true
                            }
                        }
                    }
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-comment',
                link: 'vue-ui-donut',
                description: {
                    en: 'With individual comments in the dataset',
                    fr: 'Avec des commentaires individuels dans le jeu de données',
                    pt: 'Com comentários individuais no conjunto de dados',
                    de: 'Mit individuellen Kommentaren im Datensatz',
                    zh: '数据集中包含单独的注释',
                    jp: 'データセットに個別のコメント付き',
                    es: 'Con comentarios individuales en el conjunto de datos',
                    ko: '데이터 세트에 개별 댓글 포함',
                    ar: 'مع تعليقات فردية في مجموعة البيانات'
                }
            },
            // PIE
            {
                dataset: DATASET_DONUT_BASIC.value,
                config: {
                    ...CONFIG_DONUT_BASE.value,
                    style: {
                        ...CONFIG_DONUT_BASE.value.style,
                        chart: {
                            ...CONFIG_DONUT_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_DONUT_BASE.value.style.chart.layout,
                                donut:{
                                    strokeWidth: 120,
                                },
                                labels: {
                                    ...CONFIG_DONUT_BASE.value.style.chart.layout.labels,
                                    hollow: {
                                        show: false,
                                        average: {
                                            show: false,
                                        },
                                        total: {
                                            show: false
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'pie',
                link: 'vue-ui-donut',
                description: {
                    en: 'Pie chart',
                    fr: 'Diagramme circulaire',
                    pt: 'Gráfico de pizza',
                    de: 'Kreisdiagramm',
                    zh: '饼图',
                    jp: '円グラフ',
                    es: 'Gráfico de pastel',
                    ko: '파이 차트',
                    ar: 'مخطط دائري'
                }                
            },
            // PIE NO GRADIENT
            {
                dataset: DATASET_DONUT_BASIC.value,
                config: {
                    ...CONFIG_DONUT_BASE.value,
                    style: {
                        ...CONFIG_DONUT_BASE.value.style,
                        chart: {
                            ...CONFIG_DONUT_BASE.value.style.chart,
                            useGradient: false,
                            layout: {
                                ...CONFIG_DONUT_BASE.value.style.chart.layout,
                                donut:{
                                    strokeWidth: 120,
                                },
                                labels: {
                                    ...CONFIG_DONUT_BASE.value.style.chart.layout.labels,
                                    hollow: {
                                        show: false,
                                        average: {
                                            show: false,
                                        },
                                        total: {
                                            show: false
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'pie-no-gradient',
                link: 'vue-ui-donut',
                description: {
                    en: 'Pie chart, no gradient',
                    fr: 'Graphique en secteurs, sans dégradé',
                    pt: 'Gráfico de torta, sem gradiente',
                    de: 'Kreisdiagramm, ohne Verlauf',
                    zh: '饼图，无渐变',
                    jp: '円グラフ、グラデーションなし',
                    es: 'Gráfico de pastel, sin degradado',
                    ko: '파이 차트, 그라디언트 없음',
                    ar: 'مخطط دائري، بدون تدرج'
                }              
            },
            // DONUT SHADOW
            {
                dataset: DATASET_DONUT_BASIC.value,
                config: {
                    ...CONFIG_DONUT_BASE.value,
                    style: {
                        ...CONFIG_DONUT_BASE.value.style,
                        chart: {
                            ...CONFIG_DONUT_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_DONUT_BASE.value.style.chart.layout,
                                donut: {
                                    ...CONFIG_DONUT_BASE.value.style.chart.layout.donut,
                                    useShadow: true
                                }
                            }
                        }
                    }
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-shadow',
                link: 'vue-ui-donut',
                description: {
                    en: 'With shadow',
                    fr: 'Avec ombre',
                    pt: 'Com sombra',
                    de: 'Mit Schatten',
                    zh: '带阴影',
                    jp: '影付き',
                    es: 'Con sombra',
                    ko: '그림자 포함',
                    ar: 'مع ظل'
                }
            },
            // PIE SHADOW
            {
                dataset: DATASET_DONUT_BASIC.value,
                config: {
                    ...CONFIG_DONUT_BASE.value,
                    style: {
                        ...CONFIG_DONUT_BASE.value.style,
                        chart: {
                            ...CONFIG_DONUT_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_DONUT_BASE.value.style.chart.layout,
                                donut: {
                                    ...CONFIG_DONUT_BASE.value.style.chart.layout.donut,
                                    useShadow: true,
                                    strokeWidth: 120,
                                },
                                labels: {
                                    ...CONFIG_DONUT_BASE.value.style.chart.layout.labels,
                                    hollow: {
                                        show: false,
                                        average: {
                                            show: false,
                                        },
                                        total: {
                                            show: false
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'pie-shadow',
                link: 'vue-ui-donut',
                description: {
                    en: 'Pie chart with shadow',
                    fr: 'Graphique en secteurs avec ombre',
                    pt: 'Gráfico de torta com sombra',
                    de: 'Kreisdiagramm mit Schatten',
                    zh: '带阴影的饼图',
                    jp: '影付きの円グラフ',
                    es: 'Gráfico de pastel con sombra',
                    ko: '그림자가 있는 파이 차트',
                    ar: 'مخطط دائري مع ظل'
                }
            },
            // SPARKLINE BASIX
            {
                dataset: DATASET_SPARKLINE.value,
                config: CONFIG_SPARKLINE_BASE.value,
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-basic',
                link: 'vue-ui-sparkline',
                description: {
                    en: 'Basic sparkline chart',
                    fr: 'Graphique sparkline de base',
                    pt: 'Gráfico sparkline básico',
                    de: 'Grundlegendes Sparkline-Diagramm',
                    zh: '基本迷你图',
                    jp: '基本スパークラインチャート',
                    es: 'Gráfico sparkline básico',
                    ko: '기본 스파크라인 차트',
                    ar: 'مخطط الشرارة الأساسي'
                }
            },
            // SPARKLINE AREA
            {
                dataset: DATASET_SPARKLINE.value,
                config: {
                    ...CONFIG_SPARKLINE_BASE.value,
                    style: {
                        ...CONFIG_SPARKLINE_BASE.value.style,
                        area: {
                            show: true,
                            color: '#1F77B4',
                        }
                    }
                },
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-area',
                link: 'vue-ui-sparkline',
                description: {
                    en: 'Sparkline area chart',
                    fr: 'Graphique sparkline avec aire',
                    pt: 'Gráfico de área sparkline',
                    de: 'Sparkline-Flächendiagramm',
                    zh: '迷你面积图',
                    jp: 'スパークライン面積チャート',
                    es: 'Gráfico de área sparkline',
                    ko: '스파크라인 영역 차트',
                    ar: 'مخطط منطقة الشرارة'
                }
            },
            // SPARKLINE SMOOTH
            {
                dataset: DATASET_SPARKLINE.value,
                config: {
                    ...CONFIG_SPARKLINE_BASE.value,
                    style: {
                        ...CONFIG_SPARKLINE_BASE.value.style,
                        line: {
                            ...CONFIG_SPARKLINE_BASE.value.style.line,
                            smooth: true
                        }
                    }
                },
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-smooth',
                link: 'vue-ui-sparkline',
                description: {
                    en: 'Smooth line',
                    fr: 'Ligne lissée',
                    pt: 'Linha suave',
                    de: 'Geglättete Linie',
                    zh: '平滑线',
                    jp: '滑らかな線',
                    es: 'Línea suave',
                    ko: '부드러운 선',
                    ar: 'خط سلس'
                },
            },
            // SPARKLINE AREA SMOOTH
            {
                dataset: DATASET_SPARKLINE.value,
                config: {
                    ...CONFIG_SPARKLINE_BASE.value,
                    style: {
                        ...CONFIG_SPARKLINE_BASE.value.style,
                        line: {
                            ...CONFIG_SPARKLINE_BASE.value.style.line,
                            smooth: true
                        },
                        area: {
                            show: true,
                            color: '#1F77B4',
                        }
                    }
                },
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-smooth-area',
                link: 'vue-ui-sparkline',
                description: {
                    en: 'Smooth line with area',
                    fr: 'Ligne lissée avec aire',
                    pt: 'Linha suave com área',
                    de: 'Geglättete Linie mit Fläche',
                    zh: '带区域的平滑线',
                    jp: '面積を含む滑らかな線',
                    es: 'Línea suave con área',
                    ko: '영역이 포함된 부드러운 선',
                    ar: 'خط سلس مع منطقة'
                }
            },
            // SPARKLINE BAR
            {
                dataset: DATASET_SPARKLINE.value,
                config: {
                    ...CONFIG_SPARKLINE_BASE.value,
                    type: 'bar',
                    style: {
                        ...CONFIG_SPARKLINE_BASE.value.style,
                        bar: {
                            color: '#1F77B4'
                        }
                    }
                },
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-bar',
                link: 'vue-ui-sparkline',
                description: {
                    en: 'Basic sparkline bars',
                    fr: 'Barres sparkline de base',
                    pt: 'Barras sparkline básicas',
                    de: 'Grundlegende Sparkline-Balken',
                    zh: '基本迷你柱状图',
                    jp: '基本スパークラインバー',
                    es: 'Barras sparkline básicas',
                    ko: '기본 스파크라인 막대',
                    ar: 'أعمدة الشرارة الأساسية'
                }
            },
            // SPARKLINE BAR ROUNDED
            {
                dataset: DATASET_SPARKLINE.value,
                config: {
                    ...CONFIG_SPARKLINE_BASE.value,
                    type: 'bar',
                    style: {
                        ...CONFIG_SPARKLINE_BASE.value.style,
                        bar: {
                            color: '#1F77B4',
                            borderRadius: 10
                        }
                    }
                },
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-bar-radius',
                link: 'vue-ui-sparkline',
                description: {
                    en: 'Rounded bars',
                    fr: 'Barres arrondies',
                    pt: 'Barras arredondadas',
                    de: 'Abgerundete Balken',
                    zh: '圆角柱状图',
                    jp: '丸みを帯びたバー',
                    es: 'Barras redondeadas',
                    ko: '둥근 막대',
                    ar: 'أعمدة مستديرة'
                }
            },
            // STACBAR BASIC
            { 
                dataset: DATASET_STACKBAR_BASIC.value, 
                config: CONFIG_STACKBAR_BASE.value,
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-basic',
                link: 'vue-ui-stackbar',
                description: {
                    en: 'Basic stacked bar chart',
                    fr: 'Graphique à barres empilées de base',
                    pt: 'Gráfico de barras empilhadas básico',
                    de: 'Grundlegendes gestapeltes Balkendiagramm',
                    zh: '基本堆叠柱状图',
                    jp: '基本的な積み上げ棒グラフ',
                    es: 'Gráfico de barras apiladas básico',
                    ko: '기본 스택형 막대 차트',
                    ar: 'مخطط الأعمدة المتراكمة الأساسي'
                }
            },
            // STACKBAR HORIZONTAL
            { 
                dataset: DATASET_STACKBAR_BASIC.value, 
                config: {
                    ...CONFIG_STACKBAR_BASE.value,
                    orientation: 'horizontal'
                    
                },
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-horizontal',
                link: 'vue-ui-stackbar',
                description: {
                    en: 'Horizontal layout',
                    fr: 'Disposition horizontale',
                    pt: 'Layout horizontal',
                    de: 'Horizontale Anordnung',
                    zh: '水平布局',
                    jp: '水平レイアウト',
                    es: 'Distribución horizontal',
                    ko: '수평 레이아웃',
                    ar: 'تخطيط أفقي'
                }
            },
            // STACKBAR DISTRIBUTED
            { 
                dataset: DATASET_STACKBAR_BASIC.value, 
                config: {
                    ...CONFIG_STACKBAR_BASE.value,
                    style: {
                        ...CONFIG_STACKBAR_BASE.value.style,
                        chart: {
                            ...CONFIG_STACKBAR_BASE.value.style.chart,
                            bars: {
                                ...CONFIG_STACKBAR_BASE.value.style.chart.bars,
                                distributed: true
                            }
                        }
                    }
                },
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-basic-distributed',
                link: 'vue-ui-stackbar',
                description: {
                    en: 'Distributed vertical stack bar',
                    fr: 'Barre empilée verticale distribuée',
                    pt: 'Barra empilhada vertical distribuída',
                    de: 'Verteilte vertikale Stapelleiste',
                    zh: '分布式垂直堆叠柱状图',
                    jp: '分散型垂直スタックバー',
                    es: 'Barra apilada vertical distribuida',
                    ko: '분산형 수직 스택 막대',
                    ar: 'شريط مكدس رأسي موزع'
                }
            },
            // STACKBAR HORIZONTAL DISTRIBUTED
            { 
                dataset: DATASET_STACKBAR_BASIC.value, 
                config: {
                    ...CONFIG_STACKBAR_BASE.value,
                    orientation: 'horizontal',
                    style: {
                        ...CONFIG_STACKBAR_BASE.value.style,
                        chart: {
                            ...CONFIG_STACKBAR_BASE.value.style.chart,
                            bars: {
                                ...CONFIG_STACKBAR_BASE.value.style.chart.bars,
                                distributed: true
                            }
                        }
                    }
                },
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-basic-distributed',
                link: 'vue-ui-stackbar',
                description: {
                    en: 'Distributed horizontal stack bar',
                    fr: 'Barre empilée horizontale distribuée',
                    pt: 'Barra empilhada horizontal distribuída',
                    de: 'Verteilte horizontale Stapelleiste',
                    zh: '分布式水平堆叠柱状图',
                    jp: '分散型水平スタックバー',
                    es: 'Barra apilada horizontal distribuida',
                    ko: '분산형 수평 스택 막대',
                    ar: 'شريط مكدس أفقي موزع'
                }
            },
            // STACKBAR MIXED
            { 
                dataset: DATASET_STACKBAR_MIXED.value, 
                config: {
                    ...CONFIG_STACKBAR_BASE.value,
                    style: {
                        ...CONFIG_STACKBAR_BASE.value.style,
                        chart: {
                            ...CONFIG_STACKBAR_BASE.value.style.chart,
                            grid: {
                                ...CONFIG_STACKBAR_BASE.value.style.chart.grid,
                                x: {
                                    ...CONFIG_STACKBAR_BASE.value.style.chart.grid.x,
                                    showHorizontalLines: true
                                }
                            }
                        }
                    }
                },
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-mixed',
                link: 'vue-ui-stackbar',
                description: {
                    en: 'Positive and negative values',
                    fr: 'Valeurs positives et négatives',
                    pt: 'Valores positivos e negativos',
                    de: 'Positive und negative Werte',
                    zh: '正值和负值',
                    jp: '正の値と負の値',
                    es: 'Valores positivos y negativos',
                    ko: '양수와 음수',
                    ar: 'قيم موجبة وسالبة'
                }
            },
            // NESTED DONUTS BASIC
            { 
                dataset: DATASET_NESTED_DONUTS_BASIC.value, 
                config: CONFIG_NESTED_DONUTS_BASE.value,
                component: 'VueUiNestedDonuts',
                icon: 'chartNestedDonuts',
                id: 'nested-donuts-basic',
                link: 'vue-ui-nested-donuts',
                description: {
                    en: 'Basic nested donuts chart',
                    fr: 'Graphique de beignets imbriqués de base',
                    pt: 'Gráfico de rosquinhas aninhadas básico',
                    de: 'Grundlegendes verschachteltes Donut-Diagramm',
                    zh: '基本嵌套圆环图',
                    jp: '基本的なネストドーナツチャート',
                    es: 'Gráfico de donas anidadas básico',
                    ko: '기본 중첩 도넛 차트',
                    ar: 'مخطط الكعكات المتداخلة الأساسي'
                }
            },
            // NESTED PIES
            { 
                dataset: DATASET_NESTED_DONUTS_BASIC.value, 
                config: {
                    ...CONFIG_NESTED_DONUTS_BASE.value,
                    style: {
                        ...CONFIG_NESTED_DONUTS_BASE.value.style,
                        chart: {
                            ...CONFIG_NESTED_DONUTS_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.layout,
                                donut: {
                                    spacingRatio: 1
                                }
                            }
                        }
                    }
                },
                component: 'VueUiNestedDonuts',
                icon: 'chartNestedDonuts',
                id: 'nested-pies',
                link: 'vue-ui-nested-donuts',
                description: {
                    en: 'Nested pies chart',
                    fr: 'Graphique de secteurs imbriqués',
                    pt: 'Gráfico de tortas aninhadas',
                    de: 'Verschachteltes Kreisdiagramm',
                    zh: '嵌套饼图',
                    jp: 'ネストされた円グラフ',
                    es: 'Gráfico de tartas anidadas',
                    ko: '중첩 파이 차트',
                    ar: 'مخطط الفطائر المتداخلة'
                }
            },
            // NESTED DONUTS QUAD
            { 
                dataset: DATASET_NESTED_DONUTS_QUAD.value, 
                config: {
                    ...CONFIG_NESTED_DONUTS_BASE.value,
                    style: {
                        ...CONFIG_NESTED_DONUTS_BASE.value.style,
                        chart: {
                            ...CONFIG_NESTED_DONUTS_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.layout,
                                labels: {
                                    ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.layout.labels,
                                    dataLabels: {
                                        ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.layout.labels.dataLabels,
                                        offsetX: -10,
                                        offsetY: -10,
                                        donutNameOffsetY: 10
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiNestedDonuts',
                icon: 'chartNestedDonuts',
                id: 'nested-donuts-quad',
                link: 'vue-ui-nested-donuts',
                description: {
                    en: 'With more series',
                    fr: 'Avec plus de séries',
                    pt: 'Com mais séries',
                    de: 'Mit mehr Serien',
                    zh: '含更多系列',
                    jp: 'より多くのシリーズで',
                    es: 'Con más series',
                    ko: '더 많은 시리즈 포함',
                    ar: 'مع المزيد من السلاسل'
                }
            },
            // NESTED PIES QUAD
            { 
                dataset: DATASET_NESTED_DONUTS_QUAD.value, 
                config: {
                    ...CONFIG_NESTED_DONUTS_BASE.value,
                    style: {
                        ...CONFIG_NESTED_DONUTS_BASE.value.style,
                        chart: {
                            ...CONFIG_NESTED_DONUTS_BASE.value.style.chart,
                            useGradient: false,
                            layout: {
                                ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.layout,
                                donut: {
                                    spacingRatio: 1
                                },
                                labels: {
                                    ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.layout.labels,
                                    dataLabels: {
                                        ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.layout.labels.dataLabels,
                                        offsetX: -20,
                                        offsetY: -20,
                                        donutNameOffsetY: 10
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiNestedDonuts',
                icon: 'chartNestedDonuts',
                id: 'nested-pies-quad-no-gradient',
                link: 'vue-ui-nested-donuts',
                description: {
                    en: 'With more series, pies, no gradient',
                    fr: 'Avec plus de séries, secteurs, sans dégradé',
                    pt: 'Com mais séries, tortas, sem gradiente',
                    de: 'Mit mehr Serien, Kreise, ohne Verlauf',
                    zh: '含更多系列、饼图、无渐变',
                    jp: 'より多くのシリーズ、円グラフ、グラデーションなし',
                    es: 'Con más series, tartas, sin degradado',
                    ko: '더 많은 시리즈, 파이, 그라디언트 없음',
                    ar: 'مع المزيد من السلاسل والفطائر، بدون تدرج'
                }
            },
            // WAFFLE BASIC
            { 
                dataset: DATASET_DONUT_BASIC.value, 
                config: CONFIG_WAFFLE_BASE.value,
                component: 'VueUiWaffle',
                icon: 'chartWaffle',
                id: 'waffle-basic',
                link: 'vue-ui-waffle',
                description: {
                    en: 'Basic waffle chart',
                    fr: 'Graphique en gaufre de base',
                    pt: 'Gráfico de waffle básico',
                    de: 'Grundlegendes Waffeldiagramm',
                    zh: '基本华夫图',
                    jp: '基本ワッフルチャート',
                    es: 'Gráfico de waffle básico',
                    ko: '기본 와플 차트',
                    ar: 'مخطط الوافل الأساسي'
                }
            },
            // WAFFLE VERTICAL
            { 
                dataset: DATASET_DONUT_BASIC.value, 
                config: {
                    ...CONFIG_WAFFLE_BASE.value,
                    style: {
                        ...CONFIG_WAFFLE_BASE.value.style,
                        chart: {
                            ...CONFIG_WAFFLE_BASE.value.style.chart,
                            layout: {
                                grid: {
                                    vertical: true
                                }
                            }
                        }
                    }
                },
                component: 'VueUiWaffle',
                icon: 'chartWaffle',
                id: 'waffle-vertical',
                link: 'vue-ui-waffle',
                description: {
                    en: 'Vertical layout',
                    fr: 'Disposition verticale',
                    pt: 'Layout vertical',
                    de: 'Vertikales Layout',
                    zh: '垂直布局',
                    jp: '縦向きレイアウト',
                    es: 'Distribución vertical',
                    ko: '세로 레이아웃',
                    ar: 'تخطيط عمودي'
                }
            },
            // WAFFLE MORE CELLS
            { 
                dataset: DATASET_DONUT_BASIC.value, 
                config: {
                    ...CONFIG_WAFFLE_BASE.value,
                    style: {
                        ...CONFIG_WAFFLE_BASE.value.style,
                        chart: {
                            ...CONFIG_WAFFLE_BASE.value.style.chart,
                            layout: {
                                grid: {
                                    size: 20,
                                    spaceBetween: 0
                                },
                                rect: {
                                    useGradient: false,
                                    rounding: 0,
                                }
                            }
                        }
                    }
                },
                component: 'VueUiWaffle',
                icon: 'chartWaffle',
                id: 'waffle-no-gradient',
                link: 'vue-ui-waffle',
                description: {
                    en: 'More cells, no gradient',
                    fr: 'Plus de cellules, sans dégradé',
                    pt: 'Mais células, sem gradiente',
                    de: 'Mehr Zellen, ohne Verlauf',
                    zh: '更多单元格，无渐变',
                    jp: 'セルを増やして、グラデーションなし',
                    es: 'Más celdas, sin degradado',
                    ko: '더 많은 셀, 그라디언트 없음',
                    ar: 'مزيد من الخلايا، بدون تدرج'
                }
            },
            // WAFFLE ROUNDED CELLS
            { 
                dataset: DATASET_DONUT_BASIC.value, 
                config: {
                    ...CONFIG_WAFFLE_BASE.value,
                    style: {
                        ...CONFIG_WAFFLE_BASE.value.style,
                        chart: {
                            ...CONFIG_WAFFLE_BASE.value.style.chart,
                            layout: {
                                grid: {
                                    size: 10,
                                    spaceBetween: 10
                                },
                                rect: {
                                    useGradient: true,
                                    rounding: 24,
                                }
                            }
                        }
                    }
                },
                component: 'VueUiWaffle',
                icon: 'chartWaffle',
                id: 'waffle-rounded',
                link: 'vue-ui-waffle',
                description: {
                    en: 'Rounded cells',
                    fr: 'Cellules arrondies',
                    pt: 'Células arredondadas',
                    de: 'Abgerundete Zellen',
                    zh: '圆角单元格',
                    jp: '丸みのあるセル',
                    es: 'Celdas redondeadas',
                    ko: '둥근 셀',
                    ar: 'خلايا مستديرة'
                }
            },
            // WAFFLE LABELS
            { 
                dataset: DATASET_DONUT_BASIC.value, 
                config: {
                    ...CONFIG_WAFFLE_BASE.value,
                    style: {
                        ...CONFIG_WAFFLE_BASE.value.style,
                        chart: {
                            ...CONFIG_WAFFLE_BASE.value.style.chart,
                            layout: {
                                labels: {
                                    captions: {
                                        show: true,
                                        showSerieName: true,
                                        fontSize: 16
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiWaffle',
                icon: 'chartWaffle',
                id: 'waffle-labels',
                link: 'vue-ui-waffle',
                description: {
                    en: 'With labels',
                    fr: 'Avec étiquettes',
                    pt: 'Com etiquetas',
                    de: 'Mit Beschriftungen',
                    zh: '带标签',
                    jp: 'ラベル付き',
                    es: 'Con etiquetas',
                    ko: '레이블 포함',
                    ar: 'مع تسميات'
                }
            },
            // VERTICAL BAR BASIC
            { 
                dataset: DATASET_VERTICAL_BAR_BASE.value, 
                config: CONFIG_VERTICAL_BAR_BASIC.value,
                component: 'VueUiVerticalBar',
                icon: 'chartVerticalBar',
                id: 'vertical-bar-basic',
                link: 'vue-ui-vertical-bar',
                description: {
                    en: 'Sorted vertical histogram',
                    fr: 'Histogramme vertical classé',
                    pt: 'Histograma vertical ordenado',
                    de: 'Sortiertes vertikales Histogramm',
                    zh: '排序的垂直直方图',
                    jp: 'ソート済み縦ヒストグラム',
                    es: 'Histograma vertical ordenado',
                    ko: '정렬된 세로 히스토그램',
                    ar: 'مدرج تكراري عمودي مرتب'
                }
            },
            // VERTICAL BAR MIXED
            { 
                dataset: DATASET_VERTICAL_BAR_MIXED.value, 
                config: CONFIG_VERTICAL_BAR_BASIC.value,
                component: 'VueUiVerticalBar',
                icon: 'chartVerticalBar',
                id: 'vertical-bar-mixed',
                link: 'vue-ui-vertical-bar',
                description: {
                    en: 'Positive and negative values',
                    fr: 'Valeurs positives et négatives',
                    pt: 'Valores positivos e negativos',
                    de: 'Positive und negative Werte',
                    zh: '正值和负值',
                    jp: '正の値と負の値',
                    es: 'Valores positivos y negativos',
                    ko: '양수와 음수 값',
                    ar: 'قيم موجبة وسالبة'
                }
            },
            // VERTICAL BAR NO GAP NO GRADIENT
            { 
                dataset: DATASET_VERTICAL_BAR_BASE.value, 
                config: {
                    ...CONFIG_VERTICAL_BAR_BASIC.value,
                    style: {
                        ...CONFIG_VERTICAL_BAR_BASIC.value.style,
                        chart: {
                            ...CONFIG_VERTICAL_BAR_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_VERTICAL_BAR_BASIC.value.style.chart.layout,
                                bars: {
                                    ...CONFIG_VERTICAL_BAR_BASIC.value.style.chart.layout.bars,
                                    useGradient: false,
                                    gap: 0,
                                    borderRadius: 0
                                }
                            }
                        }
                    }
                },
                component: 'VueUiVerticalBar',
                icon: 'chartVerticalBar',
                id: 'vertical-bar-no-gap-no-gradient',
                link: 'vue-ui-vertical-bar',
                description: {
                    en: 'No gap, no gradient',
                    fr: 'Pas d’interstice, pas de dégradé',
                    pt: 'Sem espaço, sem gradiente',
                    de: 'Kein Abstand, kein Verlauf',
                    zh: '无间隙，无渐变',
                    jp: '隙間なし、グラデーションなし',
                    es: 'Sin espacio, sin degradado',
                    ko: '간격 없음, 그라데이션 없음',
                    ar: 'بدون فجوة، بدون تدرج'
                }
            },
            // VERTICAL BAR NO GAP NO GRADIENT SORTED ASC
            { 
                dataset: DATASET_VERTICAL_BAR_BASE.value, 
                config: {
                    ...CONFIG_VERTICAL_BAR_BASIC.value,
                    style: {
                        ...CONFIG_VERTICAL_BAR_BASIC.value.style,
                        chart: {
                            ...CONFIG_VERTICAL_BAR_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_VERTICAL_BAR_BASIC.value.style.chart.layout,
                                bars: {
                                    ...CONFIG_VERTICAL_BAR_BASIC.value.style.chart.layout.bars,
                                    borderRadius: 3,
                                    height: 20,
                                    sort: 'asc'
                                }
                            }
                        }
                    }
                },
                component: 'VueUiVerticalBar',
                icon: 'chartVerticalBar',
                id: 'vertical-bar-no-gap-no-gradient-inverse-sort',
                link: 'vue-ui-vertical-bar',
                description: {
                    en: 'Thinner bars, inverse sort',
                    fr: 'Barres plus fines, tri inversé',
                    pt: 'Barras mais finas, ordenação inversa',
                    de: 'Dünnere Balken, umgekehrte Sortierung',
                    zh: '更细的条形，逆序排列',
                    jp: '細いバー、逆順ソート',
                    es: 'Barras más delgadas, orden inverso',
                    ko: '더 얇은 막대, 역순 정렬',
                    ar: 'أعمدة أرق، ترتيب عكسي'
                }
            },
            // HEATMAP BASIC
            { 
                dataset: DATASET_HEATMAP_BASE.value, 
                config: CONFIG_HEATMAP_BASIC.value,
                component: 'VueUiHeatmap',
                icon: 'chartHeatmap',
                id: 'basic-heatmap',
                link: 'vue-ui-heatmap',
                description: {
                    en: 'Basic heatmap chart',
                    fr: 'Graphique de carte thermique de base',
                    pt: 'Gráfico de mapa de calor básico',
                    de: 'Grundlegendes Heatmap-Diagramm',
                    zh: '基本热图图表',
                    jp: '基本的なヒートマップチャート',
                    es: 'Gráfico de mapa de calor básico',
                    ko: '기본 히트맵 차트',
                    ar: 'مخطط خريطة حرارية أساسي'
                }
            },
            // HEATMAP NO GAP
            { 
                dataset: DATASET_HEATMAP_BASE.value, 
                config: {
                    ...CONFIG_HEATMAP_BASIC.value,
                    style: {
                        ...CONFIG_HEATMAP_BASIC.value.style,
                        layout: {
                            ...CONFIG_HEATMAP_BASIC.value.style.layout,
                            cells: {
                                ...CONFIG_HEATMAP_BASIC.value.style.layout.cells,
                                spacing: 0
                            }
                        }
                    }
                },
                component: 'VueUiHeatmap',
                icon: 'chartHeatmap',
                id: 'heatmap-no-gap',
                link: 'vue-ui-heatmap',
                description: {
                    en: 'No gap',
                    fr: 'Sans interstice',
                    pt: 'Sem intervalo',
                    de: 'Ohne Lücke',
                    zh: '无间隙',
                    jp: '隙間なし',
                    es: 'Sin espacio',
                    ko: '간격 없음',
                    ar: 'بدون فجوة'
                }
            },
            // HEATMAP BASIC
            { 
                dataset: DATASET_HEATMAP_BASE.value, 
                config: {
                    ...CONFIG_HEATMAP_BASIC.value,
                    style: {
                        ...CONFIG_HEATMAP_BASIC.value.style,
                        legend: {
                            ...CONFIG_HEATMAP_BASIC.value.style.legend,
                            position: 'bottom',
                        }
                    }
                },
                component: 'VueUiHeatmap',
                icon: 'chartHeatmap',
                id: 'heatmap-legend-below',
                link: 'vue-ui-heatmap',
                description: {
                    en: 'With legend below',
                    fr: 'Avec légende en dessous',
                    pt: 'Com legenda abaixo',
                    de: 'Mit Legende unten',
                    zh: '带有下方图例',
                    jp: '下に凡例付き',
                    es: 'Con leyenda abajo',
                    ko: '아래에 범례 포함',
                    ar: 'مع وسيلة إيضاح في الأسفل'
                }
            },
        ]
    })

    return {
        examples
    }

}