import { ref, computed } from "vue";
import { useMainStore } from "./stores";
import { createWordCloudDatasetFromPlainText } from "vue-data-ui";
import { shiftHue } from "./components/maker/lib";

// nested donuts où l'externe est le détail de l'interne, (mêmes couleurs)


export default function useExamples() {
    
    const store = useMainStore();
    const isDarkMode = computed(() => store.isDarkMode);
    const colors = computed(() => {
        return {
            bg: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            textColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            gridStroke: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
            greyStroke: isDarkMode.value ? '#3A3A3A' : '#E1E5E8',
            grey: '#6A6A6A',
            gridStrokeLight: isDarkMode.value ? '#7A7A7A' : '#BBBBBB',
            blue: '#1f77b4',
            green: '#98df8a',
            orange: '#ff7f0e',
            yellow: '#e7ba52',
            red: '#ff3700'
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
    const LIVESET = ref([
        65, 68, 72, 88, 93, 94, 92, 97, 98, 100, 99, 95, 80, 82, 12, 9, 7, 5, 12, 18, 29
    ])

    const CHANGESET = ref([
        12, 10, 9, 11, 7, 4, 10, 11, 8, 9, 7, 19, 27, 25, 32, 29, 37, 48, 52, 51, 60
    ]);

    const DATASET_XY_BASIC_LINE = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: LINESET
        }
    ]);

    const raf = ref(null);
    const to = ref(null);

    const DATASET_XY_LIVE_DATA = computed(() => {

        const ds = LIVESET.value;
        const ds2 = JSON.parse(JSON.stringify(CHANGESET.value));

        function anim() {
            ds.shift()
            ds2.shift()
            ds.push(Math.random() * 100)
            ds2.push(Math.random() * 60)
            to.value = setTimeout(() => {
                raf.value = requestAnimationFrame(anim)
            }, 300)
        }

        anim()

        return [
            {
                name: 'Channel 1',
                type: 'line',
                smooth: true,
                series: ds,
                scaleMin: 0,
                scaleMax: 100,
                scaleSteps: 3
            },
            {
                name: 'Channel 2',
                type: 'bar',
                series: ds2,
                color: colors.value.orange,
                scaleMin: 0,
                scaleMax: 60,
                scaleSteps: 5
            }
        ]
    })

    const DATASET_XY_DUAL = ref([
        {
            name: 'Serie 1',
            type: 'bar',
            dataLabels: true,
            series: [3200, 2450, 3442, 3229, 4274, 1292, 1912, 2915, 3925, 4100, 3300, 4250],
            prefix: '$',
            scaleMin: 0,
            scaleMax: 5000,
        },
        {
            name: 'Serie 2',
            type: 'line',
            dataLabels: true,
            series: [65, 75, 82, 67, 55, 89, 86, 80, 75, 72, 78, 92],
            suffix: '%',
            scaleMin: 0,
            scaleMax: 100,
        },
    ])

    const DATASET_XY_CHANGE = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: CHANGESET
        }
    ])

    const DATASET_XY_COMMENTS = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: KRACHSET,
            comments: ['','','','','','','','','','','','', '', 'WOW!', 'OMG!',]
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

    const DATASET_XY_SINUSOID = ref([
        {
            name: 'Serie 1',
            type: 'line',
            smooth: true,
            dataLabels: false,
            series: [0, -80, 0, 80, 0, -80, 0, 80, 0, -80, 0]
        }
    ])

    function makeDs(n,m,label="") {
        let arr = [];
        for(let i = 0; i < n; i += 1){
            if(label){
                arr.push(`${label} ${i}`)
            } else {
                arr.push(Math.random()*m)
            }
        }
        return arr
    }

    const DATASET_XY_LTTB = ref([
        {
            name: 'Serie',
            type: 'line',
            smooth: false,
            series: makeDs(10000, 100),
            dataLabels: false
        }
    ])

    const DATASET_XY_SHAPES = ref([
        {
            name: 'Stars',
            type: 'line',
            smooth: 'true',
            dataLabels: false,
            shape: 'star',
            series: [100, 110, 100, 90, 100, 110, 100, 90, 100]
        },
        {
            name: 'Triangles',
            type: 'line',
            smooth: 'true',
            dataLabels: false,
            shape: 'triangle',
            series: [80, 90, 80, 70, 80, 90, 80, 70, 80]
        },
        {
            name: 'Squares',
            type: 'line',
            smooth: 'true',
            dataLabels: false,
            shape: 'square',
            series: [60, 70, 60, 50, 60, 70, 60, 50, 60]
        },
        {
            name: 'Pentagons',
            type: 'line',
            smooth: 'true',
            dataLabels: false,
            shape: 'pentagon',
            series: [40, 50, 40, 30, 40, 50, 40, 30, 40]
        },
        {
            name: 'Hexagons',
            type: 'line',
            smooth: 'true',
            dataLabels: false,
            shape: 'hexagon',
            series: [20, 30, 20, 10, 20, 30, 20, 10, 20]
        },
    ])

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

    const DATASET_DONUT_POLAR = computed(() => {
        return [
            {
                name: 'Series 1',
                values: [100]
            },
            {
                name: 'Series 2',
                values: [90]
            },
            {
                name: 'Series 3',
                values: [80]
            },
            {
                name: 'Series 4',
                values: [70]
            },
            {
                name: 'Series 5',
                values: [60]
            },
            {
                name: 'Series 6',
                values: [50]
            },
            {
                name: 'Series 7',
                values: [40]
            },
            {
                name: 'Series 8',
                values: [30]
            },
            {
                name: 'Series 9',
                values: [20]
            },
            {
                name: 'Series 10',
                values: [10]
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

    const DATASET_NESTED_DONUTS_BREADKDOWN = ref([
        {
            name: "Group 2",
            series: [
                {
                    name: 'Breadkdown 1.1',
                    values: [30],
                    color: '#1f77b4'
                },
                {
                    name: 'Breadkdown 1.2',
                    values: [15],
                    color: '#1f77b4'
                },
                {
                    name: 'Breadkdown 1.3',
                    values: [5],
                    color: '#1f77b4'
                },
                {
                    name: 'Breadkdown 2.1',
                    values: [12],
                    color: '#aec7e8'
                },
                {
                    name: 'Breadkdown 2.2',
                    values: [10],
                    color: '#aec7e8'
                },
                {
                    name: 'Breadkdown 2.3',
                    values: [8],
                    color: '#aec7e8'
                },
                {
                    name: 'Breadkdown 3.1',
                    values: [8],
                    color: '#ff7f0e'
                },
                {
                    name: 'Breadkdown 3.2',
                    values: [7],
                    color: '#ff7f0e'
                },
                {
                    name: 'Breadkdown 3.3',
                    values: [5],
                    color: '#ff7f0e'
                },
            ]
        },
        {
            name: "Group 1",
            series: [
                {
                    name: 'Serie 1',
                    values: [50],
                    color: '#1f77b4'
                },
                {
                    name: 'Serie 2',
                    values: [30],
                    color: '#aec7e8'
                },
                {
                    name: 'Serie 3',
                    values: [20],
                    color: '#ff7f0e'
                },
            ]
        },
    ])

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

    //-------------- VUE-UI-GAUGE --------------//
    const CONFIG_GAUGE_BASE = computed(() => {
        return {
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    layout: {
                        markers: {
                            color: colors.value.textColor
                        },
                        pointer: {
                            stroke: colors.value.bg,
                            circle: {
                                color: isDarkMode.value ? '#6A6A6A' : '#FFFFFF'
                            }
                        }
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

    const DATASET_GAUGE_BASIC = ref({
        value: 7,
        series: [
            { from: 0, to: 4, color: '#c96747' },
            { from: 4, to: 6, color: '#c7c34c' },
            { from: 6, to: 10, color: '#54b840' }
        ]
    })

    const DATASET_GAUGE_MIXED = ref({
        value: -20,
        series: [
            { from: -100, to: 0, color: '#c96747' },
            { from: 0, to: 100, color: '#54b840' }
        ]
    })

     //-------------- VUE-UI-ONION --------------//
    const CONFIG_ONION_BASIC = computed(() => {
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
                    layout: {
                        gutter: {
                            color: isDarkMode.value ? '#3A3A3A' : '#E1E5E8'
                        },
                        labels: {
                            color: colors.value.textColor,
                        }
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

    const DATASET_ONION_BASE = ref([
        {
            name: "Serie 1",
            percentage: 21,
            value: 1200,
        },
        {
            name: "Serie 2",
            percentage: 34,
            value: 1000,
        },
        {
            name: "Serie 3",
            percentage: 55,
            value: 500
        },
        {
            name: "Serie 4",
            percentage: 79,
            value: 1280
        }
    ])

    //-------------- VUE-UI-WORD-CLOUD --------------//
    const CONFIG_WORD_WLOUD_BASIC = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    tooltip: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                        borderColor: colors.value.gridStroke,
                        backgroundOpacity: 30,
                    },
                }
            }
        }
    })

    function makeColors({ colorStart, iterations, force }) {
        let color = colorStart;
        const arr = [colorStart];
        for (let i = 0; i < iterations; i += 1) {
          color = shiftHue(color, force);
          arr.push(color)
        }
        return arr;
      }

    const DATASET_WORDCLOUD_CHINESE = computed(() => {
        const data = createWordCloudDatasetFromPlainText('编程，是一门艺术与科学的结合。对于那些热爱技术和解决问题的人来说，编程不仅仅是一项技能，更是一种带来无尽乐趣的活动。在这不断变化的数字世界中，编程已成为塑造未来的重要工具，而它所带来的满足感和成就感则是无与伦比的。首先，编程带来最大的乐趣之一就是创造的自由。编程就像在一片空白的画布上作画，程序员可以随心所欲地构建自己的“作品”。无论是一个简单的网页，还是一个复杂的数据处理系统，编程都为创作者提供了实现想法的工具。写代码的过程充满挑战，但每当一个新的功能实现或者一个棘手的错误被成功解决时，那种心满意足的感觉是无与伦比的。编程的过程犹如解谜。每个程序都是由无数个小问题和挑战组成，程序员需要一步步地寻找解决方案。这就像一个庞大的谜题，每当找到合适的解法时，都会感到兴奋和满足。编程中的调试过程尤为如此。当代码中存在错误时，找到原因并解决问题仿佛在黑暗中找到了光明，这种喜悦总能让人重新振作并继续前行。此外，编程还能让人感受到逻辑思维的美妙。编写一个程序需要精确的思考和合理的逻辑结构，这种思维训练不仅可以帮助人们提高解决问题的能力，还可以在生活的各个方面带来启示。例如，在遇到复杂的生活问题时，程序员常常会运用编程思维，将大问题拆分成更小的可解决部分，然后逐步解决。这种技能不仅让编程充满乐趣，还能让人受益终生。编程还让人体验到学习和成长的乐趣。技术在不断演进，新语言、新框架、新工具层出不穷，这意味着程序员总有新的东西可以学习。尽管这种学习过程有时会令人感到挫败，但每次掌握新技能后的成就感却无比令人满足。编程让人意识到，学习是一种永无止境的过程，正是在这种不断挑战自我的过程中，程序员才能不断进步，并体验到成长的喜悦。团队合作也是编程中一大乐趣所在。在许多项目中，程序员需要与其他开发者、设计师、产品经理甚至客户紧密合作。这种合作不仅让人学会如何更好地沟通和分享想法，还能带来共同创造的喜悦。当一个团队一起努力完成一个项目，并看到它最终成功上线时，那种集体成就感让人感到无比欣慰和骄傲。编程还提供了无限的可能性和探索的空间。一个程序员可以开发应用程序来简化日常任务、构建网站来分享自己的想法，甚至开发游戏来娱乐大众。编程让人体验到创造力的释放，每个人都可以成为自己世界的“建造者”。正是这种无限的可能性，让人们在编程中找到属于自己的乐趣和意义。另一方面，编程的乐趣还来自于它对社会的积极影响。通过编写有用的软件，程序员可以真正改变世界。无论是开发一款改善人们生活质量的健康应用，还是构建一个帮助学生学习的新平台，编程的成果可以直接影响成千上万人的生活。这种贡献社会的满足感，常常成为程序员继续前行的重要动力。编程的挑战也不可忽视，但正是这些挑战让编程更加有趣。每个程序员都会遇到让人头疼的错误，或是面对看似无法解决的难题。然而，正是这些困难让编程过程充满刺激和挑战。当一个复杂的算法终于成功运行，或者一个系统终于稳定下来时，那种如释重负的快感让一切努力都变得值得。最后，编程的乐趣还体现在其独特的灵活性和无限的创造空间。一个程序员可以随时随地用自己的笔记本电脑编写代码，可以自由选择自己感兴趣的项目和技术领域。这种自由和灵活性让编程成为一项能够完全适应个人兴趣和生活方式的活动，无论你是在家里、咖啡馆，还是在旅途中，都可以体验编程的乐趣。总而言之，编程是一项充满乐趣和挑战的活动，它结合了逻辑与创造，让人体验到解决问题的快感、成长的满足感以及创造的喜悦。无论是初学者还是经验丰富的开发者，编程总能为人们带来新鲜和激动人心的体验。正因为如此，编程不仅仅是一项技能，更是一种充满无限可能的乐趣源泉。在这条不断学习和探索的道路上，每个程序员都可以找到自己的快乐和成就感。').sort((a,b) => b.value - a.value)

        return data.filter(el => el.value > 2)
    })

    const DATASET_WORDCLOUD_ENGLISH = computed(() => {
        const data = createWordCloudDatasetFromPlainText(`Programming is a combination of art and science. For those who love technology and problem-solving, programming is more than just a skill; it’s an activity that brings endless joy. In this ever-changing digital world, programming has become a vital tool for shaping the future, and the sense of fulfillment and achievement it brings is unparalleled. One of the greatest joys of programming is the freedom of creation. Programming is like painting on a blank canvas, where programmers can build their "works" as they wish. Whether it’s a simple webpage or a complex data processing system, programming provides creators with the tools to realize their ideas. The process of writing code is full of challenges, but the feeling of satisfaction when a new feature is completed or a tricky bug is fixed is incomparable. Programming is like solving puzzles. Every program consists of countless small problems and challenges, and programmers need to find solutions step by step. It’s like a grand puzzle, and every time a suitable solution is found, there’s excitement and satisfaction. Debugging is especially true. When there’s a bug in the code, finding the cause and solving the problem feels like finding light in the darkness, and this joy always reignites motivation and the drive to move forward. Additionally, programming allows people to appreciate the beauty of logical thinking. Writing a program requires precise thought and logical structure. This kind of mental training not only helps people improve their problem-solving skills but also provides insights in various aspects of life. For example, when facing complex life problems, programmers often apply programming thinking, breaking down big problems into smaller, solvable parts and then addressing them step by step. This skill not only makes programming enjoyable but also brings lifelong benefits. Programming also offers the joy of learning and growth. Technology is continuously evolving, with new languages, frameworks, and tools emerging constantly, meaning programmers always have something new to learn. Although the learning process can sometimes be frustrating, the sense of accomplishment after mastering a new skill is incredibly satisfying. Programming makes people realize that learning is a never-ending journey, and it is through this continuous self-challenge that programmers make progress and experience the joy of growth. Teamwork is another aspect of programming that brings great joy. In many projects, programmers need to collaborate closely with other developers, designers, product managers, and even clients. This collaboration not only teaches people how to communicate better and share ideas but also brings the joy of collective creation. When a team works together to complete a project and sees it successfully launched, the sense of collective achievement is deeply gratifying and proud. Programming offers endless possibilities and areas to explore. A programmer can develop apps to simplify daily tasks, build websites to share ideas, or even create games to entertain people. Programming allows for the release of creativity, and everyone can become a "builder" of their own world. This sense of infinite possibility lets people find their own joy and meaning in programming. On the other hand, the joy of programming also comes from its positive impact on society. By writing useful software, programmers can truly change the world. Whether it’s developing a health app to improve quality of life or building a new platform to help students learn, the results of programming can directly affect the lives of thousands. This sense of contributing to society often serves as a significant motivation for programmers to keep moving forward. The challenges of programming shouldn’t be ignored, but it is these challenges that make programming more exciting. Every programmer will encounter headaches or seemingly unsolvable problems. However, these difficulties make the process stimulating and challenging. When a complex algorithm finally runs successfully or a system stabilizes, the feeling of relief makes all the effort worthwhile. Finally, the joy of programming lies in its unique flexibility and limitless creative space. A programmer can write code anytime, anywhere, with a laptop, and choose projects and technologies that interest them. This freedom and flexibility make programming an activity that can perfectly align with personal interests and lifestyles. Whether at home, in a café, or while traveling, you can always experience the joy of programming. In summary, programming is an activity full of fun and challenges. It combines logic and creativity, allowing people to experience the thrill of problem-solving, the satisfaction of growth, and the joy of creation. Whether a beginner or an experienced developer, programming always brings fresh and exciting experiences. It’s more than just a skill; it’s a source of endless possibilities and joy. On this journey of continuous learning and exploration, every programmer can find their happiness and sense of achievement.`)

        return data.filter(el => el.value > 3)
    })

    const DATASET_WORDCLOUD_ARABIC = computed(() => {
        const data = createWordCloudDatasetFromPlainText(
            'البرمجة هي مزيج من الفن والعلم. بالنسبة لأولئك الذين يحبون التكنولوجيا وحل المشكلات، البرمجة ليست مجرد مهارة؛ إنها نشاط يجلب فرحة لا تنتهي. في هذا العالم الرقمي المتغير باستمرار، أصبحت البرمجة أداة حيوية لتشكيل المستقبل، والإحساس بالرضا والإنجاز الذي تجلبه لا مثيل له. واحدة من أعظم متع البرمجة هي حرية الإبداع. البرمجة تشبه الرسم على لوحة فارغة، حيث يمكن للمبرمجين بناء "أعمالهم" كما يشاؤون. سواء كان ذلك موقعًا إلكترونيًا بسيطًا أو نظام معالجة بيانات معقد، توفر البرمجة للمبدعين الأدوات لتحقيق أفكارهم. عملية كتابة الشيفرة مليئة بالتحديات، ولكن شعور الرضا عند إتمام ميزة جديدة أو حل خطأ معقد لا يوصف. البرمجة تشبه حل الألغاز. كل برنامج يتكون من عدد لا يحصى من المشكلات الصغيرة والتحديات، ويحتاج المبرمجون إلى إيجاد الحلول خطوة بخطوة. إنها مثل لغز ضخم، وكلما تم العثور على الحل المناسب، يكون هناك شعور بالإثارة والرضا. عملية التصحيح (debugging) تجسد ذلك بشكل خاص. عندما يكون هناك خطأ في الشيفرة، فإن العثور على السبب وحل المشكلة يشبه العثور على الضوء في الظلام، وهذه الفرحة دائمًا ما تعيد الدافع وتحث على المضي قدمًا. بالإضافة إلى ذلك، تتيح البرمجة للناس تقدير جمال التفكير المنطقي. كتابة برنامج تتطلب تفكيرًا دقيقًا وبنية منطقية. هذا النوع من التدريب العقلي لا يساعد الناس فقط على تحسين مهارات حل المشكلات، بل يوفر رؤى في مختلف جوانب الحياة. على سبيل المثال، عند مواجهة مشكلات حياتية معقدة، غالبًا ما يطبق المبرمجون التفكير البرمجي، حيث يقومون بتقسيم المشكلة الكبيرة إلى أجزاء أصغر قابلة للحل ثم معالجتها تدريجيًا. هذه المهارة لا تجعل البرمجة ممتعة فحسب، بل تجلب فوائد مدى الحياة. البرمجة تقدم أيضًا متعة التعلم والنمو. التكنولوجيا في تطور مستمر، مع ظهور لغات جديدة، وأطر عمل، وأدوات بشكل مستمر، مما يعني أن المبرمجين دائمًا لديهم شيء جديد ليتعلموه. على الرغم من أن عملية التعلم قد تكون محبطة في بعض الأحيان، فإن شعور الإنجاز بعد إتقان مهارة جديدة لا يقدر بثمن. تجعل البرمجة الناس يدركون أن التعلم عملية لا تنتهي، ومن خلال هذا التحدي المستمر لأنفسهم، يتمكن المبرمجون من التقدم وتجربة فرحة النمو. العمل الجماعي هو جانب آخر من البرمجة يجلب الكثير من الفرح. في العديد من المشاريع، يحتاج المبرمجون إلى التعاون الوثيق مع مطورين آخرين، ومصممين، ومديري منتجات، وحتى العملاء. هذا التعاون لا يعلم الناس كيفية التواصل بشكل أفضل ومشاركة الأفكار فحسب، بل يجلب أيضًا فرحة الإبداع الجماعي. عندما يعمل الفريق معًا لإكمال مشروع ويرى أنه تم إطلاقه بنجاح، فإن شعور الإنجاز الجماعي يكون عميقًا للغاية ومليئًا بالفخر. البرمجة توفر إمكانيات لا حصر لها ومجالات للاستكشاف. يمكن للمبرمج تطوير تطبيقات لتبسيط المهام اليومية، أو بناء مواقع لمشاركة أفكاره، أو حتى إنشاء ألعاب لتسلية الجمهور. تتيح البرمجة إطلاق العنان للإبداع، ويمكن للجميع أن يصبحوا "بناة" لعالمهم الخاص. هذه الإمكانية اللانهائية تجعل الناس يجدون متعتهم ومعناهم في البرمجة. من ناحية أخرى، تأتي متعة البرمجة أيضًا من تأثيرها الإيجابي على المجتمع. من خلال كتابة البرامج المفيدة، يمكن للمبرمجين حقًا تغيير العالم. سواء كان ذلك تطوير تطبيق صحي يحسن نوعية الحياة، أو بناء منصة جديدة تساعد الطلاب على التعلم، يمكن أن تؤثر نتائج البرمجة مباشرة على حياة الآلاف. هذا الإحساس بالمساهمة في المجتمع غالبًا ما يكون دافعًا مهمًا للمبرمجين لمواصلة التقدم. لا ينبغي تجاهل تحديات البرمجة، ولكن هذه التحديات هي ما يجعل البرمجة أكثر إثارة. كل مبرمج سيواجه أخطاء تسبب الصداع، أو يواجه مشكلات تبدو غير قابلة للحل. لكن هذه الصعوبات تجعل العملية مليئة بالإثارة والتحدي. عندما يعمل خوارزم معقد بنجاح أخيرًا، أو يستقر نظام بعد جهد طويل، فإن شعور الراحة يجعل كل الجهد يستحق العناء. أخيرًا، تتمثل متعة البرمجة في مرونتها الفريدة ومساحة الإبداع غير المحدودة. يمكن للمبرمج كتابة الشيفرة في أي وقت وأي مكان، باستخدام جهاز كمبيوتر محمول، ويمكنه اختيار المشاريع والمجالات التقنية التي تهمه. هذه الحرية والمرونة تجعل البرمجة نشاطًا يمكن أن يتكيف تمامًا مع اهتمامات الفرد وأسلوب حياته. سواء كنت في المنزل، أو في مقهى، أو في رحلة، يمكنك دائمًا الاستمتاع بمتعة البرمجة. باختصار، البرمجة نشاط مليء بالمتعة والتحديات. إنها تجمع بين المنطق والإبداع، مما يتيح للناس تجربة إثارة حل المشكلات، ورضا النمو، ومتعة الإبداع. سواء كنت مبتدئًا أو مطورًا ذو خبرة، فإن البرمجة دائمًا ما تجلب تجارب جديدة ومثيرة. إنها أكثر من مجرد مهارة؛ إنها مصدر لإمكانيات وفرح لا تنتهي. في هذه الرحلة المستمرة من التعلم والاستكشاف، يمكن لكل مبرمج أن يجد سعادته وإحساسه بالإنجاز.'
            ).sort((a,b) => b.value - a.value)

            return data.filter(el => el.value > 2)
    })

    const DATASET_WORDCLOUD_HINDI = computed(() => {
        const data = createWordCloudDatasetFromPlainText('प्रोग्रामिंग, एक कला और विज्ञान का संयोजन है। उन लोगों के लिए जो प्रौद्योगिकी और समस्याओं को हल करने के शौकीन हैं, प्रोग्रामिंग केवल एक कौशल नहीं है, बल्कि यह एक ऐसी गतिविधि है जो अनगिनत आनंद लाती है। इस लगातार बदलती डिजिटल दुनिया में, प्रोग्रामिंग भविष्य को आकार देने के लिए एक महत्वपूर्ण उपकरण बन गई है, और इसके द्वारा लाया गया संतोष और सफलता की भावना अनमोल है। सबसे पहले, प्रोग्रामिंग में सबसे बड़ी खुशी में से एक है सृजन की स्वतंत्रता। प्रोग्रामिंग एक खाली कैनवास पर चित्र बनाने के समान है, जहां प्रोग्रामर अपनी इच्छानुसार अपनी "रचनाएँ" बना सकता है। चाहे वह एक साधारण वेब पेज हो, या एक जटिल डेटा प्रोसेसिंग सिस्टम, प्रोग्रामिंग रचनाकारों को अपने विचारों को लागू करने का उपकरण प्रदान करती है। कोड लिखने की प्रक्रिया चुनौतीपूर्ण होती है, लेकिन जब भी एक नई सुविधा लागू होती है या एक जटिल त्रुटि हल हो जाती है, तो उस संतोषजनक भावना का अनुभव अनमोल होता है। प्रोग्रामिंग की प्रक्रिया एक पहेली हल करने जैसी होती है। प्रत्येक प्रोग्राम अनगिनत छोटे समस्याओं और चुनौतियों से बना होता है, और प्रोग्रामर को समाधान ढूंढने के लिए एक-एक कदम उठाना पड़ता है। यह एक विशाल पहेली की तरह है, और जैसे ही एक सही समाधान मिल जाता है, उत्तेजना और संतोष का अनुभव होता है। प्रोग्रामिंग में डिबगिंग की प्रक्रिया विशेष रूप से महत्वपूर्ण होती है। जब कोड में त्रुटियाँ होती हैं, तो कारण को पहचानना और समस्या का समाधान करना जैसे अंधेरे में प्रकाश पाना होता है, और यह खुशी हमेशा प्रोग्रामर को फिर से ऊर्जा देती है। इसके अलावा, प्रोग्रामिंग से हमें तार्किक सोच की सुंदरता का अनुभव होता है। एक प्रोग्राम लिखने के लिए सटीक सोच और उचित तार्किक संरचना की आवश्यकता होती है, और यह सोचने का प्रशिक्षण न केवल समस्या हल करने की क्षमता को बढ़ाता है, बल्कि जीवन के विभिन्न पहलुओं में भी प्रेरणा प्रदान करता है। उदाहरण के लिए, जब जटिल जीवन समस्याओं का सामना होता है, तो प्रोग्रामर अक्सर प्रोग्रामिंग सोच का उपयोग करते हैं, बड़े मुद्दों को छोटे, हल करने योग्य हिस्सों में विभाजित करते हैं, और फिर उन्हें एक-एक करके हल करते हैं। यह कौशल प्रोग्रामिंग को न केवल मजेदार बनाता है, बल्कि जीवन भर लाभकारी भी बनाता है। प्रोग्रामिंग से हम सीखने और बढ़ने के आनंद का अनुभव करते हैं। प्रौद्योगिकी निरंतर विकसित हो रही है, नई भाषाएँ, नए ढांचे और नए उपकरण निरंतर आ रहे हैं, जो यह दर्शाता है कि प्रोग्रामरों के पास हमेशा कुछ नया सीखने के लिए होता है। हालांकि यह सीखने की प्रक्रिया कभी-कभी निराशाजनक हो सकती है, लेकिन हर बार जब नया कौशल सीखा जाता है, तो यह भावना अद्वितीय रूप से संतोषजनक होती है। प्रोग्रामिंग हमें यह एहसास कराती है कि सीखना एक अनंत प्रक्रिया है, और यह वह प्रक्रिया है जिसमें प्रोग्रामर लगातार सुधार करते हैं और बढ़ने की खुशी का अनुभव करते हैं। टीमवर्क भी प्रोग्रामिंग में एक बड़ा आनंद है। कई परियोजनाओं में, प्रोग्रामर को अन्य डेवलपर्स, डिजाइनरों, उत्पाद प्रबंधकों, और यहां तक कि ग्राहकों के साथ भी निकटता से सहयोग करना पड़ता है। यह सहयोग न केवल यह सिखाता है कि विचारों को बेहतर तरीके से कैसे साझा करें, बल्कि सामूहिक रचनात्मकता की खुशी भी लाता है। जब एक टीम एक परियोजना को पूरा करने के लिए मिलकर काम करती है और उसे अंततः सफलतापूर्वक लॉन्च करती है, तो उस सामूहिक सफलता की भावना अविस्मरणीय होती है। प्रोग्रामिंग असीम संभावनाओं और अन्वेषण के स्थान भी प्रदान करती है। एक प्रोग्रामर आवेदन बनाने में सक्षम हो सकता है ताकि रोज़मर्रा के कामों को सरल बनाया जा सके, एक वेबसाइट बना सकता है ताकि अपनी सोच को साझा किया जा सके, और यहां तक कि खेल भी बना सकता है ताकि लोगों का मनोरंजन किया जा सके। प्रोग्रामिंग हमें रचनात्मकता की मुक्ति का अनुभव कराती है, जहां हर कोई अपनी दुनिया का "निर्माता" बन सकता है। यही असीमित संभावनाएँ प्रोग्रामिंग में लोगों को अपने आनंद और उद्देश्य का अनुभव करने का अवसर देती हैं। दूसरी ओर, प्रोग्रामिंग का आनंद इसके समाज पर सकारात्मक प्रभाव से भी आता है। उपयोगी सॉफ़्टवेयर लिखकर, प्रोग्रामर वास्तव में दुनिया को बदल सकते हैं। चाहे वह एक स्वास्थ्य एप्लिकेशन हो जो लोगों की जीवन गुणवत्ता को सुधारता है, या एक नया प्लेटफ़ॉर्म जो छात्रों को सीखने में मदद करता है, प्रोग्रामिंग के परिणाम सीधे लाखों लोगों के जीवन को प्रभावित कर सकते हैं। समाज में योगदान का यह संतोषजनक अनुभव प्रोग्रामर को लगातार प्रेरित करता है। प्रोग्रामिंग की चुनौतियाँ भी महत्वपूर्ण होती हैं, लेकिन इन्हीं चुनौतियों से प्रोग्रामिंग और भी मजेदार बनती है। हर प्रोग्रामर को परेशान करने वाली त्रुटियाँ मिलती हैं, या ऐसी समस्याओं का सामना करना पड़ता है जो हल नहीं हो रही होतीं। लेकिन ये कठिनाइयाँ प्रोग्रामिंग के अनुभव को रोमांचक और चुनौतीपूर्ण बनाती हैं। जब एक जटिल एल्गोरिथम आखिरकार सफलतापूर्वक चलता है, या एक प्रणाली अंततः स्थिर हो जाती है, तो वह राहत का अहसास सभी प्रयासों को सार्थक बना देता है। अंत में, प्रोग्रामिंग का आनंद इसकी अद्वितीय लचीलापन और असीम रचनात्मकता में भी होता है। एक प्रोग्रामर अपनी लैपटॉप के साथ कहीं भी, कभी भी कोड लिख सकता है, और वह जिस परियोजना और तकनीकी क्षेत्र में रुचि रखता है, उसे चुन सकता है। यह स्वतंत्रता और लचीलापन प्रोग्रामिंग को एक ऐसी गतिविधि बनाती है, जो व्यक्तिगत रुचियों और जीवनशैली के अनुरूप हो सकती है। चाहे आप घर पर हों, कैफे में, या यात्रा कर रहे हों, आप हमेशा प्रोग्रामिंग का आनंद ले सकते हैं। कुल मिलाकर, प्रोग्रामिंग एक रोमांचक और चुनौतीपूर्ण गतिविधि है जो तर्क और रचनात्मकता को जोड़ती है, जिससे समस्याओं को हल करने, बढ़ने और सृजनात्मकता का आनंद मिलता है। चाहे आप एक शुरुआत करने वाले हों या अनुभवी डेवलपर, प्रोग्रामिंग हमेशा नए और रोमांचक अनुभव प्रदान करती है। इसलिए, प्रोग्रामिंग केवल एक कौशल नहीं है, बल्कि यह एक ऐसा स्रोत है जिसमें असीमित संभावनाएँ और आनंद है। इस निरंतर सीखने और अन्वेषण की प्रक्रिया में, हर प्रोग्रामर अपनी खुशी और सफलता प्राप्त कर सकता है।').sort((a,b) => b.value - a.value)
    
        return data.filter(el => el.value > 3)
    })

    //-------------- VUE-UI-SCATTER --------------//
    const CONFIG_SCATTER_BASIC = computed(() => {
        return {
            table: TABLE.value,
            style: {
                backgroundColor: colors.value.bg,
                color: colors.value.textColor,
                layout: {
                    axis: {
                        stroke: colors.value.gridStroke
                    },
                    dataLabels: {
                        xAxis: {
                            color: colors.value.textColor,
                        },
                        yAxis: {
                            color: colors.value.textColor
                        }
                    },
                    plots: {
                        radius: 4,
                        stroke: colors.value.bg,
                        selectors:  {
                            stroke: colors.value.gridStroke,
                            labels: {
                                color: colors.value.textColor
                            },
                            markers: {
                                fill: colors.value.gridStroke
                            }
                        },
                        significance: {
                            deviationThreshold: 30
                        }
                    }
                },
                legend: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor
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
                tooltip: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    borderColor: colors.value.gridStroke,
                    backgroundOpacity: 30
                },
            }
        }
    })

    function makeScatterSet({ min, max, n, clusterName, weight = false }) {
        const arr = [];
        for(let i = 0; i < n; i += 1) {
            arr.push({
                y: (Math.random() > 0.4 ? max / 2 : max / 10) + Math.random() * (max - min) + min,
                x: (Math.random() > 0.4 ? max / 2 : max / 10) + Math.random() * (max - min) + min,
                name: `plot_${i}_${clusterName}`,
                weight: weight ? Math.random() * 20 : undefined
            })
        }
        return arr;
    }

    const DATASET_SCATTER_BASIC = ref([
        {
            name: 'Serie',
            values: makeScatterSet({
                min: 0,
                max: 100,
                n: 100,
                clusterName: 'Serie',
            })
        }
    ]);

    const DATASET_SCATTER_BUBBLE = ref([
        {
            name: 'Serie',
            values: makeScatterSet({
                min: 0,
                max: 100,
                n: 100,
                clusterName: 'Serie',
                weight: true
            })
        }
    ]);

    const DATASET_SCATTER_MULTIPLE = ref([
        {
            name: 'Serie1',
            color: '#1f77b4',
            values: makeScatterSet({
                min: 0,
                max: 100,
                n: 100,
                clusterName: 'Serie1',
            })
        },
        {
            name: 'Serie2',
            color: '#ff7f0e',
            values: makeScatterSet({
                min: -200,
                max: 100,
                n: 100,
                clusterName: 'Serie2',
            })
        },
    ]);

    const DATASET_SCATTER_SHAPES = ref(
        [
            {
                name: 'Serie1',
                color: '#1f77b4',
                shape: 'star',
                values: makeScatterSet({
                    min: 0,
                    max: 100,
                    n: 100,
                    clusterName: 'Serie1',
                })
            },
            {
                name: 'Serie2',
                color: '#ff7f0e',
                shape: 'square',
                values: makeScatterSet({
                    min: -200,
                    max: 100,
                    n: 100,
                    clusterName: 'Serie2',
                })
            },
        ]
    )

    //-------------- VUE-UI-WHEEL --------------//
    const CONFIG_WHEEL_BASIC = computed(() => {
        return {
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    layout: {
                        innerCircle: {
                            stroke: colors.value.gridStroke
                        },
                        wheel: {
                            ticks: {
                                inactiveColor: colors.value.gridStroke
                            }
                        }
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddingLeft: 24,
                        subtitle: {
                            text: 'Subtitle'
                        }
                    }    
                }
            }
        }
    })

    const DATASET_WHEEL_BASIC = ref({
        percentage: 80
    })

    //-------------- VUE-UI-SPARKHISTOGRAM --------------//
    const CONFIG_SPARKHISTOGRAM_BASIC = computed(() => {
        return {
            style: {
                backgroundColor: colors.value.bg,
                bars: {
                    colors: {
                        positive: colors.value.blue
                    }
                },
                labels: {
                    timeLabel: {
                        color: colors.value.grey
                    },
                    value: {
                        color: colors.value.textColor
                    },
                    valueLabel: {
                        color: colors.value.textColor
                    }
                },
                selector: {
                    stroke: colors.value.blue
                },
                title: {
                    textAlign: "left",
                    text: "Rainfall in mm",
                    color: colors.value.textColor,
                    fontSize: 24,
                    bold: true,
                    margin: "0 0 6px 0",
                        subtitle: {
                            color: "#A1A1A1",
                            text: "",
                            fontSize: 12,
                            bold: false
                        }
                    }
            }
        }
    })

    const DATASET_SPARKHISTOGRAM_BASE = ref([
        {
            value: 1.2,
            valueLabel: "20%",
            timeLabel: "09:00",
            intensity: 0.2,
        },
        {
            value: 1.3,
            valueLabel: "50%",
            timeLabel: "10:00",
            intensity: 0.5,
    
        },
        {
            value: 1.1,
            valueLabel: "60%",
            timeLabel: "11:00",
            intensity: 0.6,
    
        },
        {
            value: 0.8,
            valueLabel: "70%",
            timeLabel: "12:00",
            intensity: 0.7,
    
        },
        {
            value: 2,
            valueLabel: "100%",
            timeLabel: "13:00",
            intensity: 1,
    
        },
        {
            value: 2.1,
            valueLabel: "100%",
            timeLabel: "14:00",
            intensity: 1,
    
        },
        {
            value: 2.3,
            valueLabel: "80%",
            timeLabel: "15:00",
            intensity: 0.8,
    
        },
        {
            value: 2.1,
            valueLabel: "70%",
            timeLabel: "16:00",
            intensity: 0.7,
    
        },
        {
            value: 0.9,
            valueLabel: "60%",
            timeLabel: "17:00",
            intensity: 0.6,
    
        },
        {
            value: 0.7,
            valueLabel: "50%",
            timeLabel: "18:00",
            intensity: 0.5,
    
        },
        {
            value: 0.3,
            valueLabel: "30%",
            timeLabel: "19:00",
            intensity: 0.3,
    
        },
        {
            value: 0.2,
            valueLabel: "20%",
            timeLabel: "20:00",
            intensity: 0.2,
    
        },
    ]);

    //-------------- VUE-UI-QUADRANT --------------//
    const CONFIG_QUADRANT_BASIC = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    layout: {
                        areas: {
                            show: false,
                        },
                        grid: {
                            stroke: colors.value.gridStroke,
                            graduations: {
                                stroke: colors.value.gridStroke,
                                color: colors.value.gridStroke,
                            },      
                            xAxis: {
                                name: 'xAxis',
                            },
                            yAxis: {
                                name: 'yAxis'
                            }
                        },
                        labels: {
                            axisLabels: {
                                color: {
                                    positive: colors.value.textColor,
                                    negative: colors.value.textColor,
                                },
                            },
                            plotLabels: {
                                color: colors.value.textColor,
                                offsetY: 16
                            },
                            quadrantLabels: {
                                bl: {
                                    text: 'Bottom left',
                                    color: colors.value.red
                                },
                                br: {
                                    text: 'Bottom right',
                                    color: colors.value.blue
                                },
                                tl: {
                                    text: 'Top left',
                                    color: colors.value.yellow
                                },
                                tr: {
                                    text: 'Top right',
                                    color: colors.value.green
                                }
                            }
                        },
                        plots: {
                            outlineColor: colors.value.bg
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
                        paddingLeft: 24,
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
    });

    const DATASET_QUADRANT_BASE = ref([
        {
            name: 'Stars',
            shape: 'star',
            color: colors.value.blue,
            series: [
                {
                    name: "Star 1",
                    x: 50,
                    y: 50
                },
                {
                    name: "Star 2",
                    x: -10,
                    y: -10
                },
                {
                    name: "Star 3",
                    x: -15,
                    y: 20
                },
                {
                    name: "Star 4",
                    x: 15,
                    y: -20
                },
            ]
        },
        {
            name: 'Hexagons',
            shape: 'hexagon',
            color: colors.value.orange,
            series: [
                {
                    name: "Hexagon 1",
                    x: -39,
                    y: 39
                },
                {
                    name: "Hexagon 2",
                    x: -2,
                    y: 45
                },
                {
                    name: "Hexagon 3",
                    x: -15,
                    y: 30
                },
            ]
        }
    ])

    //-------------- VUE-UI-RADAR --------------//
    const CONFIG_RADAR_BASIC = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    layout: {
                        dataPolygon: {
                            transparent: true
                        },
                        grid: {
                            stroke: colors.value.gridStroke
                        },
                        labels: {
                            dataLabels: {
                                color: colors.value.textColor
                            }
                        },
                        outerPolygon: {
                            stroke: colors.value.gridStrokeLight
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
                        paddingLeft: 24,
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

    const DATASET_RADAR_BASE = ref({
        categories: [
            { name: 'Single category' },
        ],
        series: [
            {
                name: 'KPI 1',
                values: [80],
                target: 100
            },
            {
                name: 'KPI 2',
                values: [600],
                target: 2000
            },
            {
                name: 'KPI 3',
                values: [10320],
                target: 15000
            },
            {
                name: 'KPI 4',
                values: [1.8],
                target: 2
            },
            {
                name: 'KPI 5',
                values: [120000],
                target: 500000
            },
            {
                name: 'KPI 6',
                values: [3700],
                target: 3700
            }
        ]
    })

    const DATASET_RADAR_MULTIPLE = ref({
        categories: [
            { name: 'Category 1' },
            { name: 'Category 2' },
            { name: 'Category 3' },
        ],
        series: [
            {
                name: 'KPI 1',
                values: [80, 60,  70],
                target: 100
            },
            {
                name: 'KPI 2',
                values: [600, 320, 1000],
                target: 2000
            },
            {
                name: 'KPI 3',
                values: [10320, 8500, 12400],
                target: 15000
            },
            {
                name: 'KPI 4',
                values: [1.8, 1.9, 1.2],
                target: 2
            },
            {
                name: 'KPI 5',
                values: [120000, 300000, 450000],
                target: 500000
            },
            {
                name: 'KPI 6',
                values: [3700, 2900, 1300],
                target: 3700
            }
        ]
    })

    //-------------- VUE-UI-STRIP-PLOT --------------//
    const CONFIG_STRIP_PLOT_BASE = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    grid: {
                        stroke: colors.value.gridStroke,
                        horizontalGrid: {
                            stroke: colors.value.gridStroke
                        },
                        verticalGrid: {
                            stroke: colors.value.gridStroke
                        }
                    },
                    labels: {
                        axis: {
                            color: colors.value.textColor,
                            xLabel: 'Continents',
                            yLabel: 'Population in Millions'
                        },
                        bestPlotLabel: {
                            color: colors.value.textColor,
                        },
                        xAxisLabels: {
                            color: colors.value.textColor,
                        },
                        yAxisLabels: {
                            color: colors.value.textColor,
                        }
                    },
                    plots: {
                        stroke: colors.value.bg
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

    const DATASET_STRIP_PLOT_BASIC = ref([
        {
            name: "Asia",
            plots: [
                { name: "Shanghai", value: 24.9 },
                { name: "Beijing", value: 21.9 },
                { name: "Delhi", value: 16.8 },
                { name: "Guangzhou", value: 16.1 },
                { name: "Istanbul", value: 15.6 },
                { name: "Chengdu", value: 15.4 },
                { name: "Mumbai", value: 15.4 },
                { name: "Karachi", value: 14.9 },
                { name: "Shenzen", value: 14.7 },
                { name: "Tokyo", value: 14 },
            ]
        },
        {
            name: "Africa",
            plots: [
                { name: "Kinshasa", value: 17.1 },
                { name: "Lagos", value: 14.9 },
                { name: "Cairo", value: 9.3 },
                { name: "Johannesburg", value: 5.6 },
                { name: "Giza", value: 5.6 },
                { name: "Khartoum", value: 5.3 },
                { name: "Abidjan", value: 5 },
                { name: "Alexandria", value: 4.9 },
                { name: "Dar es Salaam", value: 4.7 },
                { name: "Nairobi", value: 4.4 },
            ]
        },
        {
            name: "Europe",
            plots: [
                { name: "Moscow", value: 13 },
                { name: "London", value: 9 },
                { name: "Saint Petersburg", value: 5.4 },
                { name: "Berlin", value: 3.8 },
                { name: "Madrid", value: 3.3 },
                { name: "Kyiv", value: 3 },
                { name: "Rome", value: 2.7 },
                { name: "Paris", value: 2.1 },
                { name: "Minsk", value: 2 },
                { name: "Vienna", value: 1.9 }
            ]
        },
        {
            name: "America",
            plots: [
                { name: "Sao Paulo", value: 12.2 },
                { name: "Lima", value: 9.7 },
                { name: "Mexico City", value: 9.2 },
                { name: "New York", value: 8.4 },
                { name: "Bogota", value: 8 },
                { name: "Rio de Janeiro", value: 6.7 },
                { name: "Santiago", value: 6.2 },
                { name: "Los Angeles", value: 4 },
                { name: "Buenos Aires", value: 3 },
                { name: "Brasilia", value: 2.9 }
            ]
        },
        {
            name: "Australia & Oceania",
            plots: [
                { name: "Sydney", value: 5.4 },
                { name: "Melbourne", value: 5.1 },
                { name: "Brisbane", value: 2.6 },
                { name: "Perth", value: 2.1 },
                { name: "Auckland", value: 1.7 },
                { name: "Adelaide", value: 1.4 },
                { name: "Honolulu", value: 1 },
                { name: "Gold Coast", value: 0.7 },
                { name: "Newcastle-Maitland", value: 0.5 },
                { name: "Canberra", value: 0.46 },
            ]
        },
    ])

    //-------------- VUE-UI-BULLET --------------//
    const CONFIG_BULLET_BASE = computed(() => {
        return {
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    legend: {
                        color: colors.value.textColor
                    },
                    segments: {
                        dataLabels: {
                            color: colors.value.textColor
                        }
                    },
                    valueBar: {
                        stroke: colors.value.bg,
                        label: {
                            color: colors.value.textColor
                        }
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        subtitle: {
                            text: 'Subtitle',
                        }
                    }
                }
            }
        }
    })

    const DATASET_BULLET_BASIC = ref({
        value: 80,
        target: 75,
        segments: [
            {
                name: 'Low',
                from: 0,
                to: 50,
            },
            {
                name: 'Medium',
                from: 50,
                to: 70,
            },
            {
                name: 'High',
                from: 70,
                to: 100,
            },
        ]
    })

    const DATASET_BULLET_COLORS = ref({
        value: 80,
        target: 75,
        segments: [
            {
                name: 'Low',
                from: 0,
                to: 50,
                color: '#cf5932'
            },
            {
                name: 'Medium',
                from: 50,
                to: 70,
                color: '#cc9433'
            },
            {
                name: 'High',
                from: 70,
                to: 100,
                color: '#52cc33'
            },
        ]
    })

    const DATASET_BULLET_MIXED = ref({
        value: 42,
        target: 30,
        segments: [
            {
                name: 'Cold',
                from: -100,
                to: 0,
                color: '#5f8aee'
            },
            {
                name: 'Temperate',
                from: 0,
                to: 40,
                color: '#52cc33'
            },
            {
                name: 'Hot',
                from: 40,
                to: 100,
                color: '#cf5932'
            },
        ]
    })

    //-------------- VUE-UI-FUNNEL --------------//
    const DATASET_FUNNEL_BASIC = ref([
        {
            name: "Lead",
            value: 8249,
        },
        {
            name: "Opportunity",
            value: 6322,
        },
        {
            name: "Qualified",
            value: 4562,
        },
        {
            name: "Sold",
            value: 3021,
        },
        {
            name: "Retained",
            value: 1412,
        },
    ]);

    const DATASET_FUNNEL_COLORS = ref([
        {
            name: "Lead",
            value: 8249,
            color: '#d6616b50'
        },
        {
            name: "Opportunity",
            value: 6322,
            color: '#2ca02c50'
        },
        {
            name: "Qualified",
            value: 4562,
            color: '#17becf50'
        },
        {
            name: "Sold",
            value: 3021,
            color: '#ff7f0e50'
        },
        {
            name: "Retained",
            value: 1412,
            color: '#e7ba5250'
        },
    ]);

    const CONFIG_FUNNEL_BASIC = computed(() => {
        return {
            table: TABLE.value,
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    circles: {
                        stroke: colors.value.bg
                    },
                    circleLinks: {
                        color: colors.value.greyStroke
                    },
                    area: {
                        color: colors.value.greyStroke
                    },
                    bars: {
                        stroke: colors.value.bg,
                        dataLabels: {
                            name: {
                                color: colors.value.textColor
                            },
                            value: {
                                color: isDarkMode.value ? colors.value.gridStrokeLight : '#AAAAAA'
                            }
                        }
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddingLeft: 36,
                        subtitle: {
                            text: 'Subtitle',
                        }
                    }
                }
            }
        }
    })

    //-------------- VUE-UI-TREEMAP --------------//
    const DATASET_TREEMAP_BASIC = ref( [
        {
            name: "Parent 1",
            value: 100,
            children: [
                {
                    name: "P1 C1",
                    value: 70,
                },
                {
                    name: 'P1 C2',
                    value: 20
                },
                {
                    name: 'P1 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 2",
            value: 110,
            children: [
                {
                    name: "P2 C1",
                    value: 80,
                },
                {
                    name: 'P2 C2',
                    value: 20
                },
                {
                    name: 'P2 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 3",
            value: 75,
            children: [
                {
                    name: "P3 C1",
                    value: 20,
                },
                {
                    name: 'P3 C2',
                    value: 10
                },
                {
                    name: 'P3 C3',
                    value: 10
                },
                {
                    name: 'P3 C4',
                    value: 5
                },
                {
                    name: 'P3 C5',
                    value: 5
                },
                {
                    name: 'P3 C6',
                    value: 10
                },
                {
                    name: 'P3 C7',
                    value: 5
                },
                {
                    name: 'P3 C8',
                    value: 10,
                    children: [
                        {
                            name: 'P3 C8 CC1',
                            value: 5,
                        },
                        {
                            name: 'P3 C8 CC2',
                            value: 5,
                        },
                    ]
                },
            ]
        },
    ]);

    const CONFIG_TREEMAP_BASIC = computed(() => {
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
                    layout: {
                        rects: {
                            stroke: colors.value.bg,
                            selected: {
                                stroke: colors.value.bg
                            }
                        }
                    },
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddingLeft: 12,
                        subtitle: {
                            text: 'Subtitle',
                        }
                    }
                }
            }
        }
    })

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
                        highlightArea: {
                            show: false,
                        },
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
                dataset: DATASET_XY_CHANGE.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        highlightArea: [
                            {
                                show: true,
                                from: 0,
                                to: 10,
                                color: '#ff6600',
                                opacity: 10,
                                caption: {
                                    text: 'Before the change',
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
                                from: 11,
                                to: 20,
                                color: '#42d392',
                                opacity: 10,
                                caption: {
                                    text: 'After the change',
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
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: 0,
                                    scaleMax: 200
                                }
                            }
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
            // XY INDIVIDUAL SCALE
            { 
                dataset: DATASET_XY_DUAL.value,
                config: {
                    ...BASE_XY_CONFIG.value,
                    table: {
                        ...BASE_XY_CONFIG.value.table,
                        showSum: false,
                    },
                    bar: {
                        ...BASE_XY_CONFIG.value.bar,
                        labels: {
                            ...BASE_XY_CONFIG.value.bar.labels,
                            color: '#6A6A6A'
                        }
                    },
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                
                                yAxis: {
                                    useIndividualScale: true,
                                    labelWidth: 80
                                },
                                xAxisLabels: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.xAxisLabels,
                                    values: ['01-25', '02-25', '03-25', '04-25', '05-25', '06-25', '07-25', '08-25', '09-25', '10-25', '11-25', '12-25'],
                                    rotation: 0
                                }
                            }
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'xy-dual',
                link: 'vue-ui-xy',
                description: {
                    en: "Multiple series with individual scales",
                    fr: "Séries multiples avec des échelles individuelles",
                    pt: "Múltiplas séries com escalas individuais",
                    de: "Mehrere Serien mit individuellen Skalen",
                    zh: "具有单独刻度的多系列",
                    jp: "個別のスケールを持つ複数のシリーズ",
                    es: "Múltiples series con escalas individuales",
                    ko: "개별 스케일이 있는 여러 시리즈",
                    ar: "سلاسل متعددة بمقاييس فردية"
                }
            },
            // XY STYLED MARKERS
            { 
                dataset: DATASET_XY_SINUSOID.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    line: {
                        ...BASE_XY_CONFIG.value.line,
                        radius: 6,
                        useGradient: false,
                        strokeWidth: 2,
                        dot: {
                            useSerieColor: false,
                            fill: '#fdd663',
                            strokeWidth: 2
                        }
                    },
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: -100,
                                    scaleMax: 100
                                },
                                xAxisLabels: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.xAxisLabels,
                                    rotation: 0
                                }
                            }
                        },
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
                id: 'line-styled-markers',
                link: 'vue-ui-xy',
                description: {
                    en: "Styled plot markers",
                    fr: "Marqueurs de tracé stylisés",
                    pt: "Marcadores de plotagem estilizados",
                    de: "Gestylte Plot-Markierungen",
                    zh: "样式化的绘图标记",
                    jp: "スタイル付きプロットマーカー",
                    es: "Marcadores de trazado estilizados",
                    ko: "스타일이 적용된 플롯 마커",
                    ar: "علامات المؤامرة ذات نمط"
                }
            },
            // XY GRID
            { 
                dataset: DATASET_XY_SINUSOID.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    line: {
                        ...BASE_XY_CONFIG.value.line,
                        radius: 6,
                        useGradient: false,
                        strokeWidth: 2,
                    },
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            showVerticalLines: true,
                            showHorizontalLines: true,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: -100,
                                    scaleMax: 100
                                },
                                xAxisLabels: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.xAxisLabels,
                                    rotation: 0
                                }
                            }
                        },
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
                id: 'line-grid',
                link: 'vue-ui-xy',
                description: {
                    en: "With visible grid",
                    fr: "Avec grille visible",
                    pt: "Com grade visível",
                    de: "Mit sichtbarem Raster",
                    zh: "带可见网格",
                    jp: "可視グリッド付き",
                    es: "Con cuadrícula visible",
                    ko: "보이는 그리드 포함",
                    ar: "مع شبكة مرئية"
                }
            },
            // XY SHAPES
            { 
                dataset: DATASET_XY_SHAPES.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    line: {
                        ...BASE_XY_CONFIG.value.line,
                        radius: 8,
                        useGradient: false,
                        strokeWidth: 2,
                        labels: {
                            ...BASE_XY_CONFIG.value.line.labels,
                            offsetY: -20
                        },
                        dot: {
                            useSerieColor: false,
                            fill: '#FFFFFF',
                            strokeWidth: 2,
                        }
                    },
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: 0,
                                    scaleMax: 120
                                },
                                xAxisLabels: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.xAxisLabels,
                                    rotation: 0
                                }
                            }
                        },
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
                id: 'line-shapes',
                link: 'vue-ui-xy',
                description: {
                    en: "Datapoint markers with geometric shapes",
                    fr: "Marqueurs de points de données avec des formes géométriques",
                    pt: "Marcadores de pontos de dados com formas geométricas",
                    de: "Datenpunktmarkierungen mit geometrischen Formen",
                    zh: "带有几何形状的数据点标记",
                    jp: "幾何形状のデータポイントマーカー",
                    es: "Marcadores de puntos de datos con formas geométricas",
                    ko: "기하학적 모양의 데이터 포인트 마커",
                    ar: "علامات نقاط البيانات بأشكال هندسية"
                }
            },
            // XY LTTB
            { 
                dataset: DATASET_XY_LTTB.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    line: {
                        ...BASE_XY_CONFIG.value.line,
                        radius: 0.1,
                        useGradient: false,
                        strokeWidth: 2,
                    },
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        tooltip: {
                            show: false,
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: 0,
                                    scaleMax: 100
                                },
                                xAxisLabels: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.xAxisLabels,
                                    showOnlyAtModulo: true,
                                    values: makeDs(1000,100,'T'),
                                    modulo: 9,
                                    rotation: 0
                                }
                            }
                        },
                        highlightArea: {
                            show: false,
                        },
                        highlighter: {
                            useLine: true,
                            color: '#ff3700'
                        },
                        timeTag: {
                            show: true,
                            backgroundColor: '#ff3700',
                            color: '#FFFFFF',
                            fontSize: 14,
                            circleMarker: {
                                radius: 0
                            }
                        },
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
                id: 'line-lttb',
                link: 'vue-ui-xy',
                description: {
                    en: "Dataset of 10000 datapoints downsampled to 500 datapoints",
                    fr: "Ensemble de données de 10000 points réduit à 500 points",
                    pt: "Conjunto de dados de 10000 pontos reduzido para 500 pontos",
                    de: "Datensatz mit 10000 Datenpunkten auf 500 Datenpunkte reduziert",
                    zh: "数据集包含10000个数据点，降采样至500个数据点",
                    jp: "10000のデータポイントを500にダウンサンプリングしたデータセット",
                    es: "Conjunto de datos de 10000 puntos reducido a 500 puntos",
                    ko: "10000개의 데이터 포인트를 500개로 다운샘플링한 데이터 세트",
                    ar: "مجموعة بيانات تحتوي على 10000 نقطة بيانات تم تقليلها إلى 500 نقطة بيانات"
                }
            },
            // XY LIVE DATA
            { 
                dataset: DATASET_XY_LIVE_DATA.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        zoom: {
                            show: false
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            showHorizontalLines: true,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    useIndividualScale: true,
                                    stacked: true,
                                    gap: 48
                                },
                                xAxisLabels: {
                                    color: colors.value.textColor,
                                    values: [],
                                    rotation: -45
                                }
                            }
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'xy-live',
                link: 'vue-ui-xy',
                description: {
                    en: "Frequent data update",
                    fr: "Mise à jour fréquente des données",
                    pt: "Atualização frequente de dados",
                    de: "Häufige Datenaktualisierung",
                    zh: "频繁的数据更新",
                    jp: "頻繁なデータ更新",
                    es: "Actualización frecuente de datos",
                    ko: "빈번한 데이터 업데이트",
                    ar: "تحديث متكرر للبيانات"
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
            // POLAR
            {
                dataset: DATASET_DONUT_POLAR.value,
                config: {
                    ...CONFIG_DONUT_BASE.value,
                    type: 'polar'
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-polar',
                link: 'vue-ui-donut',
                description: {
                    en: "Polar area chart",
                    fr: "Diagramme en aires polaires",
                    pt: "Gráfico de área polar",
                    de: "Polarer Flächendiagramm",
                    zh: "极区面积图",
                    jp: "ポーラーエリアチャート",
                    es: "Gráfico de área polar",
                    ko: "극 영역 차트",
                    ar: "مخطط المساحة القطبية"
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
            // DONUT THIN NO GRADIENT
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
                                    strokeWidth: 24,
                                },
                                labels: {
                                    ...CONFIG_DONUT_BASE.value.style.chart.layout.labels,
                                    hollow: {
                                        show: false,
                                        average: {
                                            show: false,
                                        },
                                        total: {
                                            show: true,
                                            text: '',
                                            value: {
                                                color: colors.value.textColor,
                                                offsetY: 4,
                                                fontSize: 64
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-thin',
                link: 'vue-ui-donut',
                description: {
                    en: "Donut with lower fat",
                    fr: "Donut avec moins de gras",
                    pt: "Rosquinha com menos gordura",
                    de: "Donut mit weniger Fett",
                    zh: "低脂甜甜圈",
                    jp: "低脂肪のドーナツ",
                    es: "Donut con menos grasa",
                    ko: "지방이 적은 도넛",
                    ar: "دونات منخفضة الدهون"
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
            // STACKBAR BASIC
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
            // NESTED DONUTS BREAKDOWN
            { 
                dataset: DATASET_NESTED_DONUTS_BREADKDOWN.value, 
                config: {
                    ...CONFIG_NESTED_DONUTS_BASE.value,
                    style: {
                        ...CONFIG_NESTED_DONUTS_BASE.value.style,
                        chart: {
                            ...CONFIG_NESTED_DONUTS_BASE.value.style.chart,
                            tooltip: {
                                ...CONFIG_NESTED_DONUTS_BASE.value.style.chart.tooltip,
                                showAllItemsAtIndex: false
                            }
                        }
                    }
                },
                component: 'VueUiNestedDonuts',
                icon: 'chartNestedDonuts',
                id: 'nested-donuts-breakdown',
                link: 'vue-ui-nested-donuts',
                description: {
                    en: 'Breakdown on the external ring',
                    fr: 'Répartition sur l\'anneau extérieur',
                    pt: 'Detalhamento no anel externo',
                    de: 'Aufschlüsselung auf dem äußeren Ring',
                    zh: '在外环上的分解',
                    jp: '外側リングの内訳',
                    es: 'Desglose en el anillo externo',
                    ko: '외부 링의 분해',
                    ar: 'تفصيل على الحلقة الخارجية'
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
            // HEATMAP LEGEND BELOW
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
            // GAUGE BASIC
            { 
                dataset: DATASET_GAUGE_BASIC.value, 
                config: CONFIG_GAUGE_BASE.value,
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'basic-gauge',
                link: 'vue-ui-gauge',
                description: {
                    en: 'Basic gauge chart',
                    fr: 'Graphique de jauge de base',
                    pt: 'Gráfico de medidor básico',
                    de: 'Grundlegendes Messdiagramm',
                    zh: '基础仪表图',
                    jp: '基本ゲージチャート',
                    es: 'Gráfico de medidor básico',
                    ko: '기본 게이지 차트',
                    ar: 'مخطط عداد أساسي'
                }
            },
            // GAUGE MIXED
            { 
                dataset: DATASET_GAUGE_MIXED.value, 
                config: CONFIG_GAUGE_BASE.value,
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-mixed-scale',
                link: 'vue-ui-gauge',
                description: {
                    en: 'Gauge chart with mixed scale',
                    fr: 'Graphique de jauge avec échelle mixte',
                    pt: 'Gráfico de medidor com escala mista',
                    de: 'Messdiagramm mit gemischter Skala',
                    zh: '带混合刻度的仪表图',
                    jp: '混合スケールのゲージチャート',
                    es: 'Gráfico de medidor con escala mixta',
                    ko: '혼합 스케일 게이지 차트',
                    ar: 'مخطط عداد بمقياس مختلط'
                }
            },
            // GAUGE ROUNDED POINTER
            { 
                dataset: DATASET_GAUGE_BASIC.value, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                pointer: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.pointer,
                                    type: 'rounded'
                                }
                            }
                        }
                    }
                },
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-pointer-rounded',
                link: 'vue-ui-gauge',
                description: {
                    en: 'With rounded pointer',
                    fr: 'Avec pointeur arrondi',
                    pt: 'Com ponteiro arredondado',
                    de: 'Mit abgerundetem Zeiger',
                    zh: '带圆形指针',
                    jp: '丸みを帯びたポインタ付き',
                    es: 'Con puntero redondeado',
                    ko: '둥근 포인터 포함',
                    ar: 'بمؤشر دائري'
                }
            },
            // GAUGE LARGER
            { 
                dataset: DATASET_GAUGE_BASIC.value, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                track: {
                                    size: 5
                                },
                                pointer: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.pointer,
                                    useRatingColor: false,
                                    color: isDarkMode.value ? colors.value.bg : '#3A3A3A'
                                }
                            }
                        }
                    }
                },
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-larger',
                link: 'vue-ui-gauge',
                description: {
                    en: 'Wider',
                    fr: 'Plus large',
                    pt: 'Mais largo',
                    de: 'Breiter',
                    zh: '更宽',
                    jp: 'より広い',
                    es: 'Más ancho',
                    ko: '더 넓은',
                    ar: 'أوسع'
                }
            },
            // ONION BASIC
            { 
                dataset: DATASET_ONION_BASE.value, 
                config: CONFIG_ONION_BASIC.value,
                component: 'VueUiOnion',
                icon: 'chartOnion',
                id: 'onion-basic',
                link: 'vue-ui-onion',
                description: {
                    en: 'Basic radial bar chart',
                    fr: 'Diagramme à barres radial de base',
                    pt: 'Gráfico de barras radial básico',
                    de: 'Grundlegendes Radialbalkendiagramm',
                    zh: '基本径向条形图',
                    jp: '基本的な放射状バー チャート',
                    es: 'Gráfico de barras radial básico',
                    ko: '기본 방사형 막대 차트',
                    ar: 'مخطط شريطي شعاعي أساسي'
                }
            },
            // ONION NO SPACING NO GRADIENT
            { 
                dataset: DATASET_ONION_BASE.value, 
                config: {
                    ...CONFIG_ONION_BASIC.value,
                    style: {
                        ...CONFIG_ONION_BASIC.value.style,
                        chart: {
                            ...CONFIG_ONION_BASIC.value.style.chart,
                            useGradient: false,
                            layout: {
                                ...CONFIG_ONION_BASIC.value.style.chart.layout,
                                gutter: {
                                    ...CONFIG_ONION_BASIC.value.style.chart.layout.gutter,
                                    width: 0.85
                                },
                                track: {
                                    width: 0.85
                                }
                            }
                        }
                    }
                },
                component: 'VueUiOnion',
                icon: 'chartOnion',
                id: 'onion-no-spacing-no-gradient',
                link: 'vue-ui-onion',
                description: {
                    en: 'No spacing, no gradient',
                    fr: 'Pas d\'espacement, pas de dégradé',
                    pt: 'Sem espaçamento, sem gradiente',
                    de: 'Kein Abstand, kein Farbverlauf',
                    zh: '无间距，无渐变',
                    jp: '間隔なし、グラデーションなし',
                    es: 'Sin espaciado, sin degradado',
                    ko: '간격 없음, 그라데이션 없음',
                    ar: 'بدون مسافات، بدون تدرج'
                }
            },
            // ONION THINNER TRACKS
            { 
                dataset: DATASET_ONION_BASE.value, 
                config: {
                    ...CONFIG_ONION_BASIC.value,
                    style: {
                        ...CONFIG_ONION_BASIC.value.style,
                        chart: {
                            ...CONFIG_ONION_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_ONION_BASIC.value.style.chart.layout,
                                gutter: {
                                    ...CONFIG_ONION_BASIC.value.style.chart.layout.gutter,
                                    width: 0.9
                                },
                                track: {
                                    width: 0.2
                                }
                            }
                        }
                    }
                },
                component: 'VueUiOnion',
                icon: 'chartOnion',
                id: 'onion-thinner-tracks',
                link: 'vue-ui-onion',
                description: {
                    en: 'With thinner tracks',
                    fr: 'Avec des pistes plus fines',
                    pt: 'Com trilhas mais finas',
                    de: 'Mit dünneren Spuren',
                    zh: '带有更细的轨道',
                    jp: 'より細いトラック付き',
                    es: 'Con pistas más delgadas',
                    ko: '더 얇은 트랙으로',
                    ar: 'مع مسارات أرق'
                }
            },
            // WORD CLOUD CHINESE
            { 
                dataset: DATASET_WORDCLOUD_CHINESE.value, 
                config: CONFIG_WORD_WLOUD_BASIC.value,
                component: 'VueUiWordCloud',
                icon: 'chartWordCloud',
                id: 'word-cloud-chinese',
                link: 'vue-ui-word-cloud',
                description: {
                    en: "Word cloud based on a Chinese text",
                    fr: "Nuage de mots basé sur un texte chinois",
                    pt: "Nuvem de palavras baseada em um texto chinês",
                    de: "Wortwolke basierend auf einem chinesischen Text",
                    zh: "基于中文文本的词云",
                    jp: "中国語のテキストに基づいたワードクラウド",
                    es: "Nube de palabras basada en un texto chino",
                    ko: "중국어 텍스트를 기반으로 한 워드 클라우드",
                    ar: "سحابة كلمات مستندة إلى نص صيني"
                }
            },
            // WORD CLOUD ENGLISH
            { 
                dataset: DATASET_WORDCLOUD_ENGLISH.value, 
                config: CONFIG_WORD_WLOUD_BASIC.value,
                component: 'VueUiWordCloud',
                icon: 'chartWordCloud',
                id: 'word-cloud-english',
                link: 'vue-ui-word-cloud',
                description: {
                    en: "Word cloud based on an English text",
                    fr: "Nuage de mots basé sur un texte en anglais",
                    pt: "Nuvem de palavras baseada em um texto em inglês",
                    de: "Wortwolke basierend auf einem englischen Text",
                    zh: "基于英文文本的词云",
                    jp: "英語のテキストに基づくワードクラウド",
                    es: "Nube de palabras basada en un texto en inglés",
                    ko: "영어 텍스트를 기반으로 한 단어 구름",
                    ar: "سحابة كلمات مستندة إلى نص إنجليزي"
                }
            },
            // WORD CLOUD ARABIC
            { 
                dataset: DATASET_WORDCLOUD_ARABIC.value, 
                config: CONFIG_WORD_WLOUD_BASIC.value,
                component: 'VueUiWordCloud',
                icon: 'chartWordCloud',
                id: 'word-cloud-arabic',
                link: 'vue-ui-word-cloud',
                description: {
                    en: "Word cloud based on an Arabic text",
                    fr: "Nuage de mots basé sur un texte en arabe",
                    pt: "Nuvem de palavras baseada em um texto em árabe",
                    de: "Wortwolke basierend auf einem arabischen Text",
                    zh: "基于阿拉伯文本的词云",
                    jp: "アラビア語のテキストに基づくワードクラウド",
                    es: "Nube de palabras basada en un texto en árabe",
                    ko: "아랍어 텍스트를 기반으로 한 단어 구름",
                    ar: "سحابة كلمات مستندة إلى نص عربي"
                }
            },
            // WORD CLOUD HINDI
            { 
                dataset: DATASET_WORDCLOUD_HINDI.value, 
                config: CONFIG_WORD_WLOUD_BASIC.value,
                component: 'VueUiWordCloud',
                icon: 'chartWordCloud',
                id: 'word-cloud-hindi',
                link: 'vue-ui-word-cloud',
                description: {
                    en: "Word cloud based on a text in Hindi",
                    fr: "Nuage de mots basé sur un texte en hindi",
                    pt: "Nuvem de palavras baseada em um texto em hindi",
                    de: "Wortwolke basierend auf einem Text in Hindi",
                    zh: "基于印地语文本的词云",
                    jp: "ヒンディー語のテキストに基づくワードクラウド",
                    es: "Nube de palabras basada en un texto en hindi",
                    ko: "힌디어 텍스트를 기반으로 한 워드 클라우드",
                    ar: "سحابة الكلمات بناءً على نص باللغة الهندية"
                }
            },
            // WORD CLOUD CUSTOM PALETTE
            { 
                dataset: DATASET_WORDCLOUD_CHINESE.value, 
                config: {
                    ...CONFIG_WORD_WLOUD_BASIC.value,
                    customPalette: makeColors({
                        colorStart: '#5f8aee',
                        iterations: 200,
                        force: 0.0006
                    })
                },
                component: 'VueUiWordCloud',
                icon: 'chartWordCloud',
                id: 'word-cloud-chinese-custom-palette',
                link: 'vue-ui-word-cloud',
                description: {
                    en: "Custom palette with progressive hue shift",
                    fr: "Palette personnalisée avec un dégradé progressif de teinte",
                    pt: "Paleta personalizada com mudança progressiva de matiz",
                    de: "Benutzerdefinierte Palette mit progressivem Farbtonwechsel",
                    zh: "具有渐进色调变化的自定义调色板",
                    jp: "進行的な色相シフトを伴うカスタムパレット",
                    es: "Paleta personalizada con cambio progresivo de tono",
                    ko: "점진적인 색조 변화를 포함한 사용자 정의 팔레트",
                    ar: "لوحة ألوان مخصصة مع انتقال تدريجي في درجات اللون"
                }
            },
            // SCATTER BASIC
            { 
                dataset: DATASET_SCATTER_BASIC.value, 
                config: CONFIG_SCATTER_BASIC.value,
                component: 'VueUiScatter',
                icon: 'chartScatter',
                id: 'scatter-basic',
                link: 'vue-ui-scatter',
                description: {
                    en: "Basic scatter plot chart",
                    fr: "Graphique de dispersion de base",
                    pt: "Gráfico de dispersão básico",
                    de: "Einfaches Streudiagramm",
                    zh: "基础散点图",
                    jp: "基本的な散布図",
                    es: "Gráfico de dispersión básico",
                    ko: "기본 산점도 차트",
                    ar: "مخطط مبعثر أساسي"
                }
            },
            // SCATTER BUBBLE
            { 
                dataset: DATASET_SCATTER_BUBBLE.value, 
                config: CONFIG_SCATTER_BASIC.value,
                component: 'VueUiScatter',
                icon: 'chartScatter',
                id: 'scatter-bubble',
                link: 'vue-ui-scatter',
                description: {
                    en: "Bubble chart",
                    fr: "Graphique à bulles",
                    pt: "Gráfico de bolhas",
                    de: "Blasendiagramm",
                    zh: "气泡图",
                    jp: "バブルチャート",
                    es: "Gráfico de burbujas",
                    ko: "버블 차트",
                    ar: "مخطط الفقاعات"
                }
            },
            // SCATTER GIFT WRAP
            { 
                dataset: DATASET_SCATTER_BASIC.value, 
                config: {
                    ...CONFIG_SCATTER_BASIC.value,
                    style: {
                        ...CONFIG_SCATTER_BASIC.value.style,
                        layout: {
                            ...CONFIG_SCATTER_BASIC.value.style.layout,
                            plots: {
                                ...CONFIG_SCATTER_BASIC.value.style.layout.plots,
                                giftWrap: {
                                    show: true
                                }
                            }
                        }
                    }
                },
                component: 'VueUiScatter',
                icon: 'chartScatter',
                id: 'scatter-gift-wrap',
                link: 'vue-ui-scatter',
                description: {
                    en: "With gift wrap algorithm",
                    fr: "Avec l'algorithme de cerclage",
                    pt: "Com algoritmo de embrulho de presente",
                    de: "Mit Geschenkverpackungsalgorithmus",
                    zh: "使用礼品包装算法",
                    jp: "ギフトラップアルゴリズムを使用",
                    es: "Con algoritmo de envoltura de regalo",
                    ko: "선물 포장 알고리즘 사용",
                    ar: "مع خوارزمية تغليف الهدايا"
                }
            },
            // SCATTER MARGINAL BARS
            { 
                dataset: DATASET_SCATTER_BASIC.value, 
                config: {
                    ...CONFIG_SCATTER_BASIC.value,
                    style: {
                        ...CONFIG_SCATTER_BASIC.value.style,
                        layout: {
                            ...CONFIG_SCATTER_BASIC.value.style.layout,
                            padding: {
                                top: 0,
                            },
                            marginalBars: {
                                show: true,
                                fill: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                                showLines: true,
                            }
                        }
                    }
                },
                component: 'VueUiScatter',
                icon: 'chartScatter',
                id: 'scatter-marginal-bars',
                link: 'vue-ui-scatter',
                description: {
                    en: "With marginal bars",
                    fr: "Avec des barres marginales",
                    pt: "Com barras marginais",
                    de: "Mit Randbalken",
                    zh: "带有边缘条",
                    jp: "マージナルバー付き",
                    es: "Con barras marginales",
                    ko: "여백 막대 포함",
                    ar: "مع أشرطة هامشية"
                }
            },
            // SCATTER MULTIPLE SERIES WITH MIXED VALUES
            { 
                dataset: DATASET_SCATTER_MULTIPLE.value, 
                config: {
                    ...CONFIG_SCATTER_BASIC.value,
                    style: {
                        ...CONFIG_SCATTER_BASIC.value.style,
                        layout: {
                            ...CONFIG_SCATTER_BASIC.value.style.layout,
                            padding: {
                                top: 0,
                            },
                            marginalBars: {
                                show: true,
                                fill: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                                showLines: true,
                            }
                        }
                    }
                },
                component: 'VueUiScatter',
                icon: 'chartScatter',
                id: 'scatter-multiple-mixed',
                link: 'vue-ui-scatter',
                description: {
                    en: "Multiple series, with mixed values",
                    fr: "Séries multiples, avec des valeurs mixtes",
                    pt: "Séries múltiplas, com valores mistos",
                    de: "Mehrere Reihen, mit gemischten Werten",
                    zh: "多个系列，包含混合值",
                    jp: "複数のシリーズ、混合値あり",
                    es: "Múltiples series, con valores mixtos",
                    ko: "여러 시리즈, 혼합된 값 포함",
                    ar: "سلاسل متعددة، بقيم مختلطة"
                }
            },
            // SCATTER GIFT WRAP
            { 
                dataset: DATASET_SCATTER_MULTIPLE.value, 
                config: {
                    ...CONFIG_SCATTER_BASIC.value,
                    style: {
                        ...CONFIG_SCATTER_BASIC.value.style,
                        layout: {
                            ...CONFIG_SCATTER_BASIC.value.style.layout,
                            plots: {
                                ...CONFIG_SCATTER_BASIC.value.style.layout.plots,
                                giftWrap: {
                                    show: true
                                }
                            }
                        }
                    }
                },
                component: 'VueUiScatter',
                icon: 'chartScatter',
                id: 'scatter-gift-wrap',
                link: 'vue-ui-scatter',
                description: {
                    en: "Multiple series, with mixed values and gift wrap algorithm",
                    fr: "Séries multiples, avec des valeurs mixtes et un algorithme de cerclage",
                    pt: "Séries múltiplas, com valores mistos e algoritmo de envoltório",
                    de: "Mehrere Reihen, mit gemischten Werten und Geschenkverpackungsalgorithmus",
                    zh: "多个系列，包含混合值和凸包算法",
                    jp: "複数のシリーズ、混合値とギフトラップアルゴリズムあり",
                    es: "Múltiples series, con valores mixtos y algoritmo de envoltura de regalo",
                    ko: "여러 시리즈, 혼합된 값 및 기프트 랩 알고리즘 포함",
                    ar: "سلاسل متعددة، بقيم مختلطة وخوارزمية التغليف"
                }
            },
            // SCATTER WITH SHAPES
            { 
                dataset: DATASET_SCATTER_SHAPES.value, 
                config: CONFIG_SCATTER_BASIC.value,
                component: 'VueUiScatter',
                icon: 'chartScatter',
                id: 'scatter-shapes',
                link: 'vue-ui-scatter',
                description: {
                    en: "Datapoint markers with geometric shapes",
                    fr: "Marqueurs de points de données avec des formes géométriques",
                    pt: "Marcadores de pontos de dados com formas geométricas",
                    de: "Datenpunktmarkierungen mit geometrischen Formen",
                    zh: "带有几何形状的数据点标记",
                    jp: "幾何形状のデータポイントマーカー",
                    es: "Marcadores de puntos de datos con formas geométricas",
                    ko: "기하학적 모양의 데이터 포인트 마커",
                    ar: "علامات نقاط البيانات بأشكال هندسية"
                }
            },
            // WHEEL BASIC
            { 
                dataset: DATASET_WHEEL_BASIC.value, 
                config: CONFIG_WHEEL_BASIC.value,
                component: 'VueUiWheel',
                icon: 'chartWheel',
                id: 'wheel-basic',
                link: 'vue-ui-wheel',
                description: {
                    en: "Wheel gauge chart basic",
                    fr: "Jauge en forme de roue basique",
                    pt: "Gráfico de medidor de roda básico",
                    de: "Grundlegendes Radmessgerät-Diagramm",
                    zh: "基本轮式仪表图",
                    jp: "基本ホイールゲージチャート",
                    es: "Gráfico de medidor de rueda básico",
                    ko: "기본 휠 게이지 차트",
                    ar: "مخطط عداد عجلة أساسي"
                }
            },
            // WHEEL LESS GRADIENT SQUARED TICKS
            { 
                dataset: DATASET_WHEEL_BASIC.value, 
                config: {
                    ...CONFIG_WHEEL_BASIC.value,
                    style: {
                        ...CONFIG_WHEEL_BASIC.value.style,
                        chart: {
                            ...CONFIG_WHEEL_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_WHEEL_BASIC.value.style.chart.layout,
                                innerCircle: {
                                    show: false,
                                },
                                percentage: {
                                    fontSize: 90,
                                },
                                wheel: {
                                    ...CONFIG_WHEEL_BASIC.value.style.chart.layout.wheel,
                                    ticks: {
                                        ...CONFIG_WHEEL_BASIC.value.style.chart.layout.wheel.ticks,
                                        rounded: false,
                                        gradient: {
                                            show: false
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiWheel',
                icon: 'chartWheel',
                id: 'wheel-less-gradient-squared',
                link: 'vue-ui-wheel',
                description: {
                    en: "Less gradient, rectangular ticks",
                    fr: "Moins de dégradé, graduations rectangulaires",
                    pt: "Menos gradiente, marcações retangulares",
                    de: "Weniger Verlauf, rechteckige Markierungen",
                    zh: "减少渐变，矩形刻度",
                    jp: "勾配を少なくし、長方形の目盛り",
                    es: "Menos gradiente, marcas rectangulares",
                    ko: "더 적은 그라데이션, 직사각형 눈금",
                    ar: "تدرج أقل، علامات مستطيلة"
                }
            },
            // WHEEL SMALL TICKS
            { 
                dataset: DATASET_WHEEL_BASIC.value, 
                config: {
                    ...CONFIG_WHEEL_BASIC.value,
                    style: {
                        ...CONFIG_WHEEL_BASIC.value.style,
                        chart: {
                            ...CONFIG_WHEEL_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_WHEEL_BASIC.value.style.chart.layout,
                                wheel: {
                                    ...CONFIG_WHEEL_BASIC.value.style.chart.layout.wheel,
                                    ticks: {
                                        ...CONFIG_WHEEL_BASIC.value.style.chart.layout.wheel.ticks,
                                        sizeRatio: 1
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiWheel',
                icon: 'chartWheel',
                id: 'wheel-small-ticks',
                link: 'vue-ui-wheel',
                description: {
                    en: "Smaller tick size",
                    fr: "Taille de graduation réduite",
                    pt: "Tamanho de marca menor",
                    de: "Kleinere Tick-Größe",
                    zh: "较小的刻度尺寸",
                    jp: "より小さい目盛サイズ",
                    es: "Tamaño de marca más pequeño",
                    ko: "작은 눈금 크기",
                    ar: "حجم تدريج أصغر"
                }
            },
            // WHEEL BIG TICKS
            { 
                dataset: DATASET_WHEEL_BASIC.value, 
                config: {
                    ...CONFIG_WHEEL_BASIC.value,
                    style: {
                        ...CONFIG_WHEEL_BASIC.value.style,
                        chart: {
                            ...CONFIG_WHEEL_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_WHEEL_BASIC.value.style.chart.layout,
                                percentage: {
                                    show: false,
                                },
                                innerCircle: {
                                    show: false,
                                },
                                wheel: {
                                    ...CONFIG_WHEEL_BASIC.value.style.chart.layout.wheel,
                                    ticks: {
                                        ...CONFIG_WHEEL_BASIC.value.style.chart.layout.wheel.ticks,
                                        sizeRatio: 0,
                                        gradient: {
                                            shiftHueIntensity: -5
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiWheel',
                icon: 'chartWheel',
                id: 'wheel-big-ticks',
                link: 'vue-ui-wheel',
                description: {
                    en: "Bigger tick size",
                    fr: "",
                    pt: "",
                    de: "",
                    zh: "",
                    jp: "",
                    es: "",
                    ko: "",
                    ar: ''
                }
            },
            // SPARKHISTOGRAM BASIC
            { 
                dataset: DATASET_SPARKHISTOGRAM_BASE.value, 
                config: CONFIG_SPARKHISTOGRAM_BASIC.value,
                component: 'VueUiSparkHistogram',
                icon: 'chartSparkHistogram',
                id: 'sparkhistogram-basic',
                link: 'vue-ui-sparkhistogram',
                description: {
                    en: "Basic spark histogram chart",
                    fr: "Histogramme compact de base",
                    pt: "Histograma compacto básico",
                    de: "Grundlegendes kompaktes Histogrammdiagramm",
                    zh: "基础紧凑型直方图",
                    jp: "基本コンパクトヒストグラムチャート",
                    es: "Histograma compacto básico",
                    ko: "기본 소형 히스토그램 차트",
                    ar: "مخطط المدرج التكراري المضغوط الأساسي"
                }
            },
            // SPARKHISTOGRAM SHAPE STAR
            { 
                dataset: DATASET_SPARKHISTOGRAM_BASE.value, 
                config: {
                    ...CONFIG_SPARKHISTOGRAM_BASIC.value,
                    style: {    
                        ...CONFIG_SPARKHISTOGRAM_BASIC.value.style,
                        bars: {
                            ...CONFIG_SPARKHISTOGRAM_BASIC.value.style.bars,
                            shape: 'star',
                            colors: {
                                positive: colors.value.yellow
                            }
                        },
                        selector: {
                            stroke: colors.value.yellow
                        }
                    }
                },
                component: 'VueUiSparkHistogram',
                icon: 'chartSparkHistogram',
                id: 'sparkhistogram-star',
                link: 'vue-ui-sparkhistogram',
                description: {
                    en: "With stars",
                    fr: "Avec des étoiles",
                    pt: "Com estrelas",
                    de: "Mit Sternen",
                    zh: "带星星",
                    jp: "星付き",
                    es: "Con estrellas",
                    ko: "별 포함",
                    ar: "مع نجوم"
                }
            },
            // SPARKHISTOGRAM STRECHED, SDQUARED, NO GAP
            { 
                dataset: DATASET_SPARKHISTOGRAM_BASE.value, 
                config: {
                    ...CONFIG_SPARKHISTOGRAM_BASIC.value,
                    style: {
                        ...CONFIG_SPARKHISTOGRAM_BASIC.value.style,
                        bars: {
                            ...CONFIG_SPARKHISTOGRAM_BASIC.value.style.bars,
                            borderRadius: 0,
                            gap: 1,
                            colors: {
                                positive: colors.value.orange
                            }
                        },
                        layout: {
                            height: 300
                        },
                        selector: {
                            stroke: colors.value.orange
                        }
                    }
                },
                component: 'VueUiSparkHistogram',
                icon: 'chartSparkHistogram',
                id: 'sparkhistogram-stretched',
                link: 'vue-ui-sparkhistogram',
                description: {
                    en: "Stretched, no border radius, no space between",
                    fr: "Étiré, sans rayon de bordure, sans intervalle",
                    pt: "Esticado, sem raio de borda, sem espaço entre",
                    de: "Gestreckt, ohne Randradius, ohne Zwischenraum",
                    zh: "拉伸，无边框半径，无间隙",
                    jp: "伸縮、境界半径なし、間隔なし",
                    es: "Estirado, sin radio de borde, sin espacio entre",
                    ko: "늘어진, 테두리 반지름 없음, 간격 없음",
                    ar: "ممتد، بدون نصف قطر الحدود، بدون مسافة بين"
                }
            },
            // QUADRANT BASIC
            { 
                dataset: DATASET_QUADRANT_BASE.value, 
                config: CONFIG_QUADRANT_BASIC.value,
                component: 'VueUiQuadrant',
                icon: 'chartQuadrant',
                id: 'quadrant-basic',
                link: 'vue-ui-quadrant',
                description: {
                    en: "Basic quadrant chart",
                    fr: "Graphique de quadrant de base",
                    pt: "Gráfico de quadrante básico",
                    de: "Grundlegendes Quadrantendiagramm",
                    zh: "基本象限图",
                    jp: "基本的な象限チャート",
                    es: "Gráfico de cuadrantes básico",
                    ko: "기본 사분면 차트",
                    ar: "مخطط ربعي أساسي"
                }
            },
            // QUADRANT WITH AREAS
            { 
                dataset: DATASET_QUADRANT_BASE.value, 
                config: {
                    ...CONFIG_QUADRANT_BASIC.value,
                    style: {
                        ...CONFIG_QUADRANT_BASIC.value.style,
                        chart: {
                            ...CONFIG_QUADRANT_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_QUADRANT_BASIC.value.style.chart.layout,
                                areas: {
                                    show: true
                                }
                            }
                        }
                    }
                },
                component: 'VueUiQuadrant',
                icon: 'chartQuadrant',
                id: 'quadrant-areas',
                link: 'vue-ui-quadrant',
                description: {
                    en: "With gift wrap algorithm",
                    fr: "Avec l'algorithme de l'emballage cadeau",
                    pt: "Com algoritmo de embrulho de presente",
                    de: "Mit Geschenkverpackungsalgorithmus",
                    zh: "使用礼品包装算法",
                    jp: "ギフトラッピングアルゴリズム付き",
                    es: "Con algoritmo de envoltura de regalos",
                    ko: "선물 포장 알고리즘 포함",
                    ar: "مع خوارزمية التغليف الهدي"
                }
            },
            // RADAR BASIC
            { 
                dataset: DATASET_RADAR_BASE.value, 
                config: CONFIG_RADAR_BASIC.value,
                component: 'VueUiRadar',
                icon: 'chartRadar',
                id: 'radar-basic',
                link: 'vue-ui-radar',
                description: {
                    en: "Basic radar chart",
                    fr: "Diagramme radar de base",
                    pt: "Gráfico de radar básico",
                    de: "Einfaches Radar-Diagramm",
                    zh: "基础雷达图",
                    jp: "基本レーダーチャート",
                    es: "Gráfico de radar básico",
                    ko: "기본 레이더 차트",
                    ar: "مخطط رادار أساسي"
                }
            },
            // RADAR FILLED
            { 
                dataset: DATASET_RADAR_BASE.value, 
                config: {
                    ...CONFIG_RADAR_BASIC.value,
                    style: {
                        ...CONFIG_RADAR_BASIC.value.style,
                        chart: {
                            ...CONFIG_RADAR_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_RADAR_BASIC.value.style.chart.layout,
                                dataPolygon: {
                                    transparent: false,
                                    opacity: 70
                                }
                            }
                        }
                    }

                },
                component: 'VueUiRadar',
                icon: 'chartRadar',
                id: 'radar-filled',
                link: 'vue-ui-radar',
                description: {
                    en: "Filled polygon",
                    fr: "Polygone rempli",
                    pt: "Polígono preenchido",
                    de: "Gefülltes Polygon",
                    zh: "填充多边形",
                    jp: "塗りつぶされたポリゴン",
                    es: "Polígono relleno",
                    ko: "채워진 다각형",
                    ar: "مضلع مملوء"
                }
            },
            // RADAR BASIC MULTIPLE
            { 
                dataset: DATASET_RADAR_MULTIPLE.value, 
                config: CONFIG_RADAR_BASIC.value,
                component: 'VueUiRadar',
                icon: 'chartRadar',
                id: 'radar-basic-multiple',
                link: 'vue-ui-radar',
                description: {
                    en: "With multiple categories",
                    fr: "Avec plusieurs catégories",
                    pt: "Com várias categorias",
                    de: "Mit mehreren Kategorien",
                    zh: "包含多个类别",
                    jp: "複数のカテゴリー付き",
                    es: "Con múltiples categorías",
                    ko: "여러 카테고리 포함",
                    ar: "مع فئات متعددة"
                }
            },
            // RADAR FILLED MULTIPLE
            { 
                dataset: DATASET_RADAR_MULTIPLE.value, 
                config: {
                    ...CONFIG_RADAR_BASIC.value,
                    style: {
                        ...CONFIG_RADAR_BASIC.value.style,
                        chart: {
                            ...CONFIG_RADAR_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_RADAR_BASIC.value.style.chart.layout,
                                dataPolygon: {
                                    transparent: false,
                                    opacity: 50
                                }
                            }
                        }
                    }

                },
                component: 'VueUiRadar',
                icon: 'chartRadar',
                id: 'radar-filled-multiple',
                link: 'vue-ui-radar',
                description: {
                    en: "Multiple categories with filled polygons",
                    fr: "Plusieurs catégories avec des polygones remplis",
                    pt: "Múltiplas categorias com polígonos preenchidos",
                    de: "Mehrere Kategorien mit gefüllten Polygonen",
                    zh: "包含多个类别的填充多边形",
                    jp: "塗りつぶされたポリゴンを含む複数のカテゴリー",
                    es: "Múltiples categorías con polígonos rellenos",
                    ko: "채워진 다각형이 포함된 여러 카테고리",
                    ar: "فئات متعددة مع مضلعات ممتلئة"
                }
            },
            // STRIP PLOT BASIC
            { 
                dataset: DATASET_STRIP_PLOT_BASIC.value, 
                config: CONFIG_STRIP_PLOT_BASE.value,
                component: 'VueUiStripPlot',
                icon: 'chartStripPlot',
                id: 'strip-plot-basic',
                link: 'vue-ui-strip-plot',
                description: {
                    en: "Basic strip plot chart",
                    fr: "Diagramme de points de base",
                    pt: "Gráfico de pontos básico",
                    de: "Grundlegendes Punktdiagramm",
                    zh: "基本点图",
                    jp: "基本ストリッププロット",
                    es: "Gráfico de puntos básico",
                    ko: "기본 스트립 플롯",
                    ar: "مخطط نقاط أساسي"
                }
            },
            // STRIP PLOT SMALLER
            { 
                dataset: DATASET_STRIP_PLOT_BASIC.value, 
                config: {
                    ...CONFIG_STRIP_PLOT_BASE.value,
                    style: {
                        ...CONFIG_STRIP_PLOT_BASE.value,
                        chart: {
                            ...CONFIG_STRIP_PLOT_BASE.value.style.chart,
                            plots: {
                                ...CONFIG_STRIP_PLOT_BASE.value.style.chart.plots,
                                radius: 6,
                                opacity: 1,
                                gradient: {
                                    show: false,
                                }
                            }
                        }
                    }
                },
                component: 'VueUiStripPlot',
                icon: 'chartStripPlot',
                id: 'strip-plot-smaller',
                link: 'vue-ui-strip-plot',
                description: {
                    en: "Smaller plots, no gradient, no opacity",
                    fr: "Petits graphiques, sans dégradé, sans opacité",
                    pt: "Gráficos menores, sem gradiente, sem opacidade",
                    de: "Kleinere Diagramme, ohne Farbverlauf, ohne Transparenz",
                    zh: "较小的图，无渐变，无不透明度",
                    jp: "小さなプロット、グラデーションなし、不透明度なし",
                    es: "Gráficos más pequeños, sin degradado, sin opacidad",
                    ko: "작은 플롯, 그라디언트 없음, 불투명도 없음",
                    ar: "مخططات أصغر، بدون تدرج، بدون شفافية"
                }
            },
            // STRIP PLOT SHAPES STAR
            { 
                dataset: DATASET_STRIP_PLOT_BASIC.value, 
                config: {
                    ...CONFIG_STRIP_PLOT_BASE.value,
                    style: {
                        ...CONFIG_STRIP_PLOT_BASE.value,
                        chart: {
                            ...CONFIG_STRIP_PLOT_BASE.value.style.chart,
                            plots: {
                                ...CONFIG_STRIP_PLOT_BASE.value.style.chart.plots,
                                shape: 'star',
                                radius: 12,
                                opacity: 1
                            }
                        }
                    }
                },
                component: 'VueUiStripPlot',
                icon: 'chartStripPlot',
                id: 'strip-plot-star',
                link: 'vue-ui-strip-plot',
                description: {
                    en: "Datapoint markers with geometric shapes",
                    fr: "Marqueurs de points de données avec des formes géométriques",
                    pt: "Marcadores de pontos de dados com formas geométricas",
                    de: "Datenpunktmarkierungen mit geometrischen Formen",
                    zh: "带有几何形状的数据点标记",
                    jp: "幾何形状のデータポイントマーカー",
                    es: "Marcadores de puntos de datos con formas geométricas",
                    ko: "기하학적 모양의 데이터 포인트 마커",
                    ar: "علامات نقاط البيانات بأشكال هندسية"
                }
            },
            // STRIP PLOT SHAPES TRIANGLE
            { 
                dataset: DATASET_STRIP_PLOT_BASIC.value, 
                config: {
                    ...CONFIG_STRIP_PLOT_BASE.value,
                    style: {
                        ...CONFIG_STRIP_PLOT_BASE.value,
                        chart: {
                            ...CONFIG_STRIP_PLOT_BASE.value.style.chart,
                            plots: {
                                ...CONFIG_STRIP_PLOT_BASE.value.style.chart.plots,
                                shape: 'triangle',
                                radius: 12,
                                opacity: 1
                            }
                        }
                    }
                },
                component: 'VueUiStripPlot',
                icon: 'chartStripPlot',
                id: 'strip-plot-triangle',
                link: 'vue-ui-strip-plot',
                description: {
                    en: "Datapoint markers with geometric shapes",
                    fr: "Marqueurs de points de données avec des formes géométriques",
                    pt: "Marcadores de pontos de dados com formas geométricas",
                    de: "Datenpunktmarkierungen mit geometrischen Formen",
                    zh: "带有几何形状的数据点标记",
                    jp: "幾何形状のデータポイントマーカー",
                    es: "Marcadores de puntos de datos con formas geométricas",
                    ko: "기하학적 모양의 데이터 포인트 마커",
                    ar: "علامات نقاط البيانات بأشكال هندسية"
                }
            },
            // BULLET BASIC
            { 
                dataset: DATASET_BULLET_BASIC.value, 
                config: CONFIG_BULLET_BASE.value,
                component: 'VueUiBullet',
                icon: 'chartBullet',
                id: 'bullet-basic',
                link: 'vue-ui-bullet',
                description: {
                    en: "Basic bullet chart",
                    fr: "Graphique à barres de performance basique",
                    pt: "Gráfico de desempenho básico",
                    de: "Einfaches Leistungsdiagramm",
                    zh: "基本绩效图",
                    jp: "基本パフォーマンスチャート",
                    es: "Gráfico básico de rendimiento",
                    ko: "기본 성능 차트",
                    ar: "مخطط الأداء الأساسي"
                }
            },
            // BULLET COLORS
            { 
                dataset: DATASET_BULLET_COLORS.value, 
                config: CONFIG_BULLET_BASE.value,
                component: 'VueUiBullet',
                icon: 'chartBullet',
                id: 'bullet-colors',
                link: 'vue-ui-bullet',
                description: {
                    en: "With custom segment colors",
                    fr: "Avec des couleurs de segments personnalisées",
                    pt: "Com cores de segmento personalizadas",
                    de: "Mit benutzerdefinierten Segmentfarben",
                    zh: "具有自定义分段颜色",
                    jp: "カスタムセグメントカラー付き",
                    es: "Con colores de segmentos personalizados",
                    ko: "사용자 정의 세그먼트 색상",
                    ar: "مع ألوان مقاطع مخصصة"
                }
            },
            // BULLET LARGER
            { 
                dataset: DATASET_BULLET_BASIC.value, 
                config: {
                    ...CONFIG_BULLET_BASE.value,
                    style: {
                        ...CONFIG_BULLET_BASE.value.style,
                        chart: {
                            ...CONFIG_BULLET_BASE.value.style.chart,
                            segments: {
                                ...CONFIG_BULLET_BASE.value.style.chart.segments,
                                baseColor: '#1f77b4'
                            },
                            valueBar: {
                                ...CONFIG_BULLET_BASE.value.style.chart.valueBar,
                                heightRatio: 0.5
                            }
                        }
                    }
                },
                component: 'VueUiBullet',
                icon: 'chartBullet',
                id: 'bullet-larger',
                link: 'vue-ui-bullet',
                description: {
                    en: "With larger value bar",
                    fr: "Avec une barre de valeur plus grande",
                    pt: "Com barra de valor maior",
                    de: "Mit größerer Wertleiste",
                    zh: "具有更大数值条",
                    jp: "より大きな値のバー付き",
                    es: "Con barra de valor más grande",
                    ko: "더 큰 값 막대 포함",
                    ar: "مع شريط قيمة أكبر"
                }
            },
            // BULLET THINNER
            { 
                dataset: DATASET_BULLET_BASIC.value, 
                config: {
                    ...CONFIG_BULLET_BASE.value,
                    style: {
                        ...CONFIG_BULLET_BASE.value.style,
                        chart: {
                            ...CONFIG_BULLET_BASE.value.style.chart,
                            segments: {
                                ...CONFIG_BULLET_BASE.value.style.chart.segments,
                                baseColor: '#1f77b4'
                            },
                            valueBar: {
                                ...CONFIG_BULLET_BASE.value.style.chart.valueBar,
                                heightRatio: 0.15
                            }
                        }
                    }
                },
                component: 'VueUiBullet',
                icon: 'chartBullet',
                id: 'bullet-thinner',
                link: 'vue-ui-bullet',
                description: {
                    en: "With thinner value bar",
                    fr: "Avec une barre de valeur plus fine",
                    pt: "Com barra de valor mais fina",
                    de: "Mit dünnerer Wertleiste",
                    zh: "具有更细的数值条",
                    jp: "より細い値のバー付き",
                    es: "Con barra de valor más delgada",
                    ko: "더 얇은 값 막대 포함",
                    ar: "مع شريط قيمة أنحف"
                }
            },
            // BULLET MIXED
            { 
                dataset: DATASET_BULLET_MIXED.value, 
                config: {
                    ...CONFIG_BULLET_BASE.value,
                    style: {
                        ...CONFIG_BULLET_BASE.value.style,
                        chart: {
                            ...CONFIG_BULLET_BASE.value.style.chart,
                            segments: {
                                ...CONFIG_BULLET_BASE.value.style.chart.segments,
                                dataLabels: {
                                    ...CONFIG_BULLET_BASE.value.style.chart.dataLabels,
                                    color: colors.value.textColor,
                                    suffix: '°C'
                                } 
                            },
                        }
                    }
                },
                component: 'VueUiBullet',
                icon: 'chartBullet',
                id: 'bullet-thinner',
                link: 'vue-ui-bullet',
                description: {
                    en: "With negative and positive values",
                    fr: "Avec des valeurs négatives et positives",
                    pt: "Com valores negativos e positivos",
                    de: "Mit negativen und positiven Werten",
                    zh: "具有正负值",
                    jp: "負と正の値付き",
                    es: "Con valores negativos y positivos",
                    ko: "음수와 양수 포함",
                    ar: "مع القيم السالبة والموجبة"
                }
            },
            // FUNNEL BASIC
            { 
                dataset: DATASET_FUNNEL_BASIC.value, 
                config: CONFIG_FUNNEL_BASIC.value,
                component: 'VueUiFunnel',
                icon: 'chartFunnel',
                id: 'funnel-basic',
                link: 'vue-ui-funnel',
                description: {
                    en: "Basic funnel chart",
                    fr: "Graphique en entonnoir de base",
                    pt: "Gráfico de funil básico",
                    de: "Einfaches Trichterdiagramm",
                    zh: "基本漏斗图",
                    jp: "基本的なファネルチャート",
                    es: "Gráfico de embudo básico",
                    ko: "기본 퍼널 차트",
                    ar: "مخطط قمعي أساسي"
                }
            },
            // FUNNEL COLORS
            { 
                dataset: DATASET_FUNNEL_COLORS.value, 
                config: {
                    ...CONFIG_FUNNEL_BASIC.value,
                    style: {
                        ...CONFIG_FUNNEL_BASIC.value.style,
                        chart: {
                            ...CONFIG_FUNNEL_BASIC.value.style.chart,
                            circles: {
                                ...CONFIG_FUNNEL_BASIC.value.style.chart.circles,
                                strokeWidth: 6,
                                dataLabels: {
                                    adaptColorToBackground: false,
                                    color: colors.value.textColor
                                }
                            },
                            bars: {
                                ...CONFIG_FUNNEL_BASIC.value.style.chart.bars,
                                borderRadius: 36,
                                strokeWidth: 6
                            }
                        }
                    }
                },
                component: 'VueUiFunnel',
                icon: 'chartFunnel',
                id: 'funnel-colors',
                link: 'vue-ui-funnel',
                description: {
                    en: "With custom colors and rounded bars",
                    fr: "Avec des couleurs personnalisées et des barres arrondies",
                    pt: "Com cores personalizadas e barras arredondadas",
                    de: "Mit benutzerdefinierten Farben und abgerundeten Balken",
                    zh: "具有自定义颜色和圆角条形图",
                    jp: "カスタムカラーと丸みを帯びたバー付き",
                    es: "Con colores personalizados y barras redondeadas",
                    ko: "사용자 지정 색상 및 둥근 막대 포함",
                    ar: "مع ألوان مخصصة وأشرطة مستديرة"
                }
            },
            // FUNNEL COMPACT
            { 
                dataset: DATASET_FUNNEL_BASIC.value, 
                config: {
                    ...CONFIG_FUNNEL_BASIC.value,
                    style: {
                        ...CONFIG_FUNNEL_BASIC.value.style,
                        chart: {
                            ...CONFIG_FUNNEL_BASIC.value.style.chart,
                            height: 200,
                            barCircleSpacingRatio: 0,
                            circles: {
                                ...CONFIG_FUNNEL_BASIC.value.style.chart.circles,
                                dataLabels: {
                                    ...CONFIG_FUNNEL_BASIC.value.style.chart.dataLabels,
                                    fontSize: 10
                                }
                            },
                            bars: {
                                ...CONFIG_FUNNEL_BASIC.value.style.chart.bars,
                                gapRatio: 0,
                                dataLabels: {
                                    ...CONFIG_FUNNEL_BASIC.value.style.chart.bars.dataLabels,
                                    name: {
                                        ...CONFIG_FUNNEL_BASIC.value.style.chart.bars.dataLabels.name,
                                        offsetY: 4,
                                        fontSize: 12
                                    },
                                    value: {
                                        ...CONFIG_FUNNEL_BASIC.value.style.chart.bars.dataLabels.value,
                                        fontSize: 12
                                    },
                                }
                            }
                        }
                    }
                },
                component: 'VueUiFunnel',
                icon: 'chartFunnel',
                id: 'funnel-compact',
                link: 'vue-ui-funnel',
                description: {
                    en: "Compact",
                    fr: "Compact",
                    pt: "Compacto",
                    de: "Kompakt",
                    zh: "紧凑",
                    jp: "コンパクト",
                    es: "Compacto",
                    ko: "콤팩트",
                    ar: "مضغوط"
                }
            },
            // TREEMAP BASIC
            { 
                dataset: DATASET_TREEMAP_BASIC.value, 
                config: CONFIG_TREEMAP_BASIC.value,
                component: 'VueUiTreemap',
                icon: 'chartTreemap',
                id: 'treemap-basic',
                link: 'vue-ui-treemap',
                description: {
                    en: "Basic treemap chart",
                    fr: "Graphique en treemap de base",
                    pt: "Gráfico de mapa de árvore básico",
                    de: "Einfaches Baumkartendiagramm",
                    zh: "基本树形图",
                    jp: "基本的なツリーマップチャート",
                    es: "Gráfico de mapa de árbol básico",
                    ko: "기본 트리맵 차트",
                    ar: "مخطط شجري أساسي"
                }
            },
            // TREEMAP SPACED
            { 
                dataset: DATASET_TREEMAP_BASIC.value, 
                config: {
                    ...CONFIG_TREEMAP_BASIC.value,
                    style: {
                        ...CONFIG_TREEMAP_BASIC.value.style,
                        chart: {
                            ...CONFIG_TREEMAP_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_TREEMAP_BASIC.value.style.chart.layout,
                                rects: {
                                    ...CONFIG_TREEMAP_BASIC.value.style.chart.layout.rects,
                                    borderRadius: 24,
                                }
                            }
                        }
                    }
                },
                component: 'VueUiTreemap',
                icon: 'chartTreemap',
                id: 'treemap-spaced',
                link: 'vue-ui-treemap',
                description: {
                    en: "Rounded corners",
                    fr: "Coins arrondis",
                    pt: "Cantos arredondados",
                    de: "Abgerundete Ecken",
                    zh: "圆角",
                    jp: "丸い角",
                    es: "Esquinas redondeadas",
                    ko: "둥근 모서리",
                    ar: "زوايا مستديرة"
                }
            },
            // TREEMAP NO GRADIENT
            { 
                dataset: DATASET_TREEMAP_BASIC.value, 
                config: {
                    ...CONFIG_TREEMAP_BASIC.value,
                    style: {
                        ...CONFIG_TREEMAP_BASIC.value.style,
                        chart: {
                            ...CONFIG_TREEMAP_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_TREEMAP_BASIC.value.style.chart.layout,
                                rects: {
                                    ...CONFIG_TREEMAP_BASIC.value.style.chart.layout.rects,
                                    colorRatio: 0.4,
                                    gradient: {
                                        show: false,
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiTreemap',
                icon: 'chartTreemap',
                id: 'treemap-no-gradient',
                link: 'vue-ui-treemap',
                description: {
                    en: "Without gradient",
                    fr: "Sans dégradé",
                    pt: "Sem gradiente",
                    de: "Ohne Verlauf",
                    zh: "无渐变",
                    jp: "グラデーションなし",
                    es: "Sin degradado",
                    ko: "그라데이션 없음",
                    ar: "بدون تدرج"
                }
            },
        ]
    })

    return {
        examples
    }

}