import { ref, computed } from "vue";
import { useMainStore } from "./stores";
import { createWordCloudDatasetFromPlainText } from "vue-data-ui";
import { shiftHue } from "./components/maker/lib";
import colorBridge from "color-bridge";

// nested donuts où l'externe est le détail de l'interne, (mêmes couleurs)

const { utils } = colorBridge();

const { lightenHexColor } = utils();

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

    //-------------- VUE-UI-WORLD --------------//
    const DATASET_WORLD = ref({
        AFG: { value: 12.8 },
        ALB: { value: 13.5 },
        DZA: { value: 22.2 },
        AGO: { value: 22.4 },
        ARG: { value: 14.8 },
        ARM: { value: 7.2 },
        AUS: { value: 21.8 },
        AUT: { value: 8.5 },
        AZE: { value: 12.4 },
        BHS: { value: 24.9 },
        BHR: { value: 27.5 },
        BGD: { value: 25.9 },
        BRB: { value: 26.5 },
        BLR: { value: 7.0 },
        BEL: { value: 10.5 },
        BLZ: { value: 25.9 },
        BEN: { value: 27.8 },
        BTN: { value: 12.0 },
        BOL: { value: 20.1 },
        BIH: { value: 10.9 },
        BWA: { value: 21.5 },
        BRA: { value: 24.9 },
        BRN: { value: 26.8 },
        BGR: { value: 10.8 },
        BFA: { value: 28.3 },
        BDI: { value: 19.9 },
        KHM: { value: 27.5 },
        CMR: { value: 24.6 },
        CAN: { value: -5.35 },
        CPV: { value: 24.0 },
        CAF: { value: 25.6 },
        TCD: { value: 26.9 },
        CHL: { value: 8.5 },
        CHN: { value: 6.9 },
        COL: { value: 24.2 },
        COM: { value: 25.4 },
        COG: { value: 24.5 },
        COD: { value: 24.8 },
        CRI: { value: 24.8 },
        HRV: { value: 11.6 },
        CUB: { value: 25.2 },
        CYP: { value: 19.6 },
        CZE: { value: 8.0 },
        DNK: { value: 7.7 },
        DJI: { value: 29.8 },
        DMA: { value: 26.0 },
        DOM: { value: 25.5 },
        TLS: { value: 26.9 },
        ECU: { value: 21.8 },
        EGY: { value: 22.0 },
        SLV: { value: 24.8 },
        GNQ: { value: 25.0 },
        ERI: { value: 26.0 },
        EST: { value: 5.2 },
        SWZ: { value: 20.0 },
        ETH: { value: 22.0 },
        FJI: { value: 26.0 },
        FIN: { value: 2.0 },
        FRA: { value: 11.5 },
        GAB: { value: 25.0 },
        GMB: { value: 27.5 },
        GEO: { value: 7.5 },
        DEU: { value: 8.5 },
        GHA: { value: 26.8 },
        GRC: { value: 16.5 },
        GRD: { value: 26.5 },
        GTM: { value: 22.0 },
        GIN: { value: 26.0 },
        GNB: { value: 26.5 },
        GUY: { value: 26.8 },
        HTI: { value: 25.5 },
        HND: { value: 23.5 },
        HUN: { value: 10.5 },
        ISL: { value: 1.75 },
        IND: { value: 24.0 },
        IDN: { value: 25.5 },
        IRN: { value: 17.0 },
        IRQ: { value: 22.0 },
        IRL: { value: 9.5 },
        ISR: { value: 20.0 },
        ITA: { value: 13.5 },
        JAM: { value: 25.5 },
        JPN: { value: 11.5 },
        JOR: { value: 18.0 },
        KAZ: { value: 5.0 },
        KEN: { value: 24.0 },
        KIR: { value: 28.0 },
        PRK: { value: 8.0 },
        KOR: { value: 12.5 },
        KWT: { value: 27.5 },
        KGZ: { value: 5.0 },
        LAO: { value: 25.0 },
        LVA: { value: 6.0 },
        LBN: { value: 15.0 },
        LSO: { value: 12.0 },
        LBR: { value: 26.5 },
        LBY: { value: 22.0 },
        LIE: { value: 8.0 },
        LTU: { value: 6.5 },
        LUX: { value: 9.0 },
        MDG: { value: 22.0 },
        MWI: { value: 22.5 },
        MYS: { value: 26.5 },
        MDV: { value: 28.0 },
        MLI: { value: 28.3 },
        MLT: { value: 18.8 },
        MHL: { value: 27.5 },
        MRT: { value: 26.0 },
        MUS: { value: 23.0 },
        MEX: { value: 21.0 },
        FSM: { value: 27.0 },
        MDA: { value: 9.0 },
        MCO: { value: 16.0 },
        MNG: { value: -0.5 },
        MNE: { value: 11.5 },
        MAR: { value: 17.5 },
        MOZ: { value: 23.5 },
        MMR: { value: 25.5 },
        NAM: { value: 20.0 },
        NRU: { value: 28.0 },
        NPL: { value: 12.0 },
        NLD: { value: 9.5 },
        NZL: { value: 10.5 },
        NIC: { value: 25.5 },
        NER: { value: 28.3 },
        NGA: { value: 26.0 },
        MKD: { value: 11.0 },
        NOR: { value: 1.5 },
        OMN: { value: 27.0 },
        PAK: { value: 20.0 },
        PLW: { value: 27.5 },
        PAN: { value: 25.5 },
        PNG: { value: 25.5 },
        PRY: { value: 23.5 },
        PER: { value: 19.5 },
        PHL: { value: 26.5 },
        POL: { value: 7.5 },
        PRT: { value: 15.5 },
        QAT: { value: 28.0 },
        ROU: { value: 9.5 },
        RUS: { value: -5.1 },
        RWA: { value: 19.0 },
        KNA: { value: 26.5 },
        LCA: { value: 26.5 },
        VCT: { value: 26.5 },
        WSM: { value: 26.5 },
        SMR: { value: 13.5 },
        STP: { value: 26.5 },
        SAU: { value: 24.5 },
        SEN: { value: 27.5 },
        SRB: { value: 11.0 },
        SYC: { value: 27.0 },
        SLE: { value: 26.5 },
        SGP: { value: 27.0 },
        SVK: { value: 8.5 },
        SVN: { value: 9.0 },
        SLB: { value: 26.5 },
        SOM: { value: 27.5 },
        ZAF: { value: 17.5 },
        SSD: { value: 27.5 },
        ESP: { value: 15.5 },
        LKA: { value: 26.0 },
        SDN: { value: 27.5 },
        SUR: { value: 27.0 },
        SWE: { value: 2.0 },
        CHE: { value: 6.0 },
        SYR: { value: 18.0 },
        TWN: { value: 21.7 },
        TJK: { value: 7.0 },
        TZA: { value: 22.5 },
        THA: { value: 26.3 },
        TGO: { value: 27.2 },
        TON: { value: 24.8 },
        TTO: { value: 26.5 },
        TUN: { value: 18.7 },
        TUR: { value: 13.2 },
        TKM: { value: 15.8 },
        TUV: { value: 28.0 },
        UGA: { value: 22.8 },
        UKR: { value: 7.7 },
        ARE: { value: 27.7 },
        GBR: { value: 9.3 },
        USA: { value: 8.6 },
        URY: { value: 16.7 },
        UZB: { value: 13.2 },
        VUT: { value: 24.0 },
        VAT: { value: 15.0 },
        VEN: { value: 26.8 },
        VNM: { value: 24.7 },
        YEM: { value: 23.5 },
        ZMB: { value: 21.7 },
        ZWE: { value: 21.1 },
        CIV: { value: 26.5 },
        SOM: { value: 27.5 },
        XKX: { value: 10.7 },
    });

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

    const BG_SET = ref([
        12, 25, 16, 24, 28, 44, 32, 19, 65, 67, 55, 34, 32, 67, 89
    ])

    const DATASET_XY_BASIC_LINE = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: LINESET,
        }
    ]);

    const DATASET_XY_BACKGROUND = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: false,
            series: BG_SET,
            color: 'white',
            useArea: true
        }
    ])

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

    const TRENDSET = ref([12, 25, 31, 19, 17, 34, 55, 12, 29, 29, 29, 20])
    
    function makeTrendComments(ds) {
        return ds.map((d,i) => {
            if (i > 0) {
                return {
                    trend: d === ds[i - 1] ? 'eq' : d > ds[i - 1] ? 'up' : 'down',
                    evolution: ((d / ds[i - 1]) - 1) * 100
                }
            }
            return {
                trend: '',
                evolution: null
            }
        })
    }

    const DATASET_XY_COMMENTS_TRENDS = ref([
        {
            name: 'Series 1',
            type: 'line',
            dataLabels: true,
            series: TRENDSET.value,
            comments: makeTrendComments(TRENDSET.value),
            color: '#8A8A8A',
            smooth: true,
        }
    ])

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
            useTag: 'end',
            dataLabels: false
        }
    ])

    const DATASET_XY_GROUPS = ref([
        {
            name: 'Pizza satisfaction',
            type: 'bar',
            smooth: true,
            series: makeDs(21, 100),
            dataLabels: false,
            scaleLabel: 'Satisfaction',
            scaleMin: 0,
            scaleMax: 100,
            suffix: '%',
            color: '#8A8A8A'
        },
        {
            name: 'Donut satisfaction',
            type: 'bar',
            smooth: true,
            series: makeDs(21, 100),
            dataLabels: false,
            scaleLabel: 'Satisfaction',
            scaleMin: 0,
            scaleMax: 100,
            suffix: '%',
            color: '#5A5A5A'
        },
        {
            name: 'Donut sales',
            type: 'line',
            smooth: true,
            series: makeDs(21, 1000),
            dataLabels: false,
            scaleLabel: 'Revenue',
            scaleMin: 0,
            scaleMax: 2000,
        },
        {
            name: 'Pizza sales',
            type: 'line',
            smooth: true,
            series: makeDs(21, 2000),
            dataLabels: false,
            scaleLabel: 'Revenue',
            scaleMin: 0,
            scaleMax: 2000,
        },
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
                        curvedMarkers: true,
                        donut: {
                            strokeWidth: 64,
                        },
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
                        rowTotal: {
                            value: {
                                show: true,
                            },
                            color: {
                                show: true
                            }
                        },
                        columnTotal: {
                            value: {
                                show: true,
                                rotation: 0,
                                offsetX: 0,
                                offsetY: 0
                            },
                            color: {
                                show: true
                            },
                        },
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
            { from: 0, to: 4, color: '#c96747', name: 'Critical' },
            { from: 4, to: 6, color: '#c7c34c', name: 'Nominal' },
            { from: 6, to: 10, color: '#54b840', name: 'Excellent' }
        ]
    })

    const DATASET_GAUGE_MIXED = ref({
        value: -20,
        series: [
            { from: -100, to: 0, color: '#c96747', name: 'Critical' },
            { from: 0, to: 100, color: '#54b840', name: 'Nominal' }
        ]
    })

    const DATASET_GAUGE_SINGLE = ref({
        value: 66,
        series: [
            { from: 0, to: 100, name: 'CURRENT SATISFACTION'}
        ]
    })

    const DATASET_GAUGE_SINGLE_TEXT = ref({
        value: 66,
        series: [
            { from: 0, to: 50, color: '#c96747', name: 'CRITICAL' },
            { from: 50, to: 100, color: '#54b840', name: ' NOMINAL' },
        ]
    })

    const DATASET_GAUGE_EMOJIS = ref({
        value: 3.5,
        series: [
            { from: 0, to: 1, color: '#c95247', name: '😧' },
            { from: 1, to: 2, color: '#c97047', name: '🙁' },
            { from: 2, to: 3, color: '#c5c947', name: '😐' },
            { from: 3, to: 4, color: '#86c947', name: '🙂' },
            { from: 4, to: 5, color: '#54b840', name: '😀' },
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
                    title: {
                        text: 'Title',
                        color: colors.value.textColor,
                        textAlign: 'left',
                        paddingLeft: 24,
                        subtitle: {
                            text: 'Subtitle'
                        }
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
        return [
            { name: '编程', value: 95 },
            { name: '代码', value: 55 },
            { name: '算法', value: 18 },
            { name: '调试', value: 15 },
            { name: '变量', value: 22 },
            { name: '函数', value: 13 },
            { name: '对象', value: 26 },
            { name: '类', value: 16 },
            { name: '继承', value: 10 },
            { name: '多态', value: 11 },
            { name: '接口', value: 23 },
            { name: '数组', value: 25 },
            { name: '链表', value: 12 },
            { name: '栈', value: 14 },
            { name: '队列', value: 20 },
            { name: '哈希', value: 19 },
            { name: '递归', value: 16 },
            { name: '循环', value: 13 },
            { name: '条件', value: 28 },
            { name: '异常', value: 12 },
            { name: '编译', value: 29 },      
            { name: '解释', value: 14 },
            { name: '框架', value: 24 },
            { name: '模块', value: 21 },
            { name: '库', value: 27 },
            { name: '包', value: 18 },
            { name: '主函数', value: 20 },
            { name: '流程', value: 11 },
            { name: '事件', value: 17 },
            { name: '回调', value: 13 },
            { name: '异步', value: 95 },      
            { name: '同步', value: 22 },
            { name: '线程', value: 16 },
            { name: '进程', value: 12 },
            { name: '内存', value: 23 },
            { name: '指针', value: 29 },
            { name: '引用', value: 18 },
            { name: '堆', value: 20 },
            { name: 'API', value: 93 },    
            { name: '表', value: 15 },
            { name: '字段', value: 25 },
            { name: '查询', value: 21 },
            { name: '排序', value: 13 },
            { name: '过滤', value: 12 },
            { name: '映射', value: 15 },
            { name: '合并', value: 14 },
            { name: 'API', value: 12 },       
            { name: '请求', value: 26 },
            { name: '响应', value: 17 },
            { name: '服务器', value: 44 },    
            { name: '前端', value: 12 },
          ].sort((a,b) => b.value - a.value)
    })

    const DATASET_WORDCLOUD_ENGLISH = computed(() => {
        return [
            { name: 'Programming', value: 95 },
            { name: 'Code', value: 55 },
            { name: 'Algorithm', value: 18 },
            { name: 'Debugging', value: 15 },
            { name: 'Variable', value: 22 },
            { name: 'Function', value: 13 },
            { name: 'Object', value: 26 },
            { name: 'Class', value: 16 },
            { name: 'Inheritance', value: 10 },
            { name: 'Polymorphism', value: 11 },
            { name: 'Interface', value: 23 },
            { name: 'Array', value: 25 },
            { name: 'Linked List', value: 12 },
            { name: 'Stack', value: 14 },
            { name: 'Queue', value: 20 },
            { name: 'Hash', value: 19 },
            { name: 'Recursion', value: 16 },
            { name: 'Loop', value: 13 },
            { name: 'Condition', value: 28 },
            { name: 'Exception', value: 12 },
            { name: 'Compile', value: 29 },
            { name: 'Interpret', value: 14 },
            { name: 'Framework', value: 24 },
            { name: 'Module', value: 21 },
            { name: 'Library', value: 27 },
            { name: 'Package', value: 18 },
            { name: 'Main Function', value: 20 },
            { name: 'Process Flow', value: 11 },
            { name: 'Event', value: 17 },
            { name: 'Callback', value: 13 },
            { name: 'Asynchronous', value: 95 },
            { name: 'Synchronous', value: 22 },
            { name: 'Thread', value: 16 },
            { name: 'Process', value: 12 },
            { name: 'Memory', value: 23 },
            { name: 'Pointer', value: 29 },
            { name: 'Reference', value: 18 },
            { name: 'Heap', value: 20 },
            { name: 'API', value: 93 },
            { name: 'Table', value: 15 },
            { name: 'Field', value: 25 },
            { name: 'Query', value: 21 },
            { name: 'Sorting', value: 13 },
            { name: 'Filter', value: 12 },
            { name: 'Mapping', value: 15 },
            { name: 'Merge', value: 14 },
            { name: 'API', value: 12 },
            { name: 'Request', value: 26 },
            { name: 'Response', value: 17 },
            { name: 'Server', value: 44 },
            { name: 'Frontend', value: 12 },     
          ].sort((a,b) => b.value - a.value).map(el => {
            return {
                ...el,
                name: el.name.toUpperCase()
            }
          })
    })

    const DATASET_WORDCLOUD_ARABIC = computed(() => {
        return [
            { name: 'برمجة', value: 95 },     
            { name: 'كود', value: 55 },       
            { name: 'خوارزمية', value: 18 },  
            { name: 'تصحيح', value: 15 },     
            { name: 'متغير', value: 22 },     
            { name: 'دالة', value: 13 },      
            { name: 'كائن', value: 26 },      
            { name: 'فئة', value: 16 },       
            { name: 'وراثة', value: 10 },     
            { name: 'تعدد الأشكال', value: 11 }, 
            { name: 'واجهة', value: 23 },     
            { name: 'مصفوفة', value: 25 },    
            { name: 'قائمة مرتبطة', value: 12 }, 
            { name: 'مكدس', value: 14 },      
            { name: 'طابور', value: 20 },     
            { name: 'تجزئة', value: 19 },     
            { name: 'استدعاء ذاتي', value: 16 }, 
            { name: 'حلقة', value: 13 },      
            { name: 'شرط', value: 28 },       
            { name: 'استثناء', value: 12 },   
            { name: 'ترجمة', value: 29 },     
            { name: 'تفسير', value: 14 },     
            { name: 'إطار عمل', value: 24 },  
            { name: 'وحدة', value: 21 },      
            { name: 'مكتبة', value: 27 },     
            { name: 'حزمة', value: 18 },      
            { name: 'الدالة الرئيسية', value: 20 }, 
            { name: 'تدفق العملية', value: 11 }, 
            { name: 'حدث', value: 17 },       
            { name: 'نداء العودة', value: 13 }, 
            { name: 'غير متزامن', value: 95 }, 
            { name: 'متزامن', value: 22 },     
            { name: 'خيط', value: 16 },        
            { name: 'عملية', value: 12 },      
            { name: 'ذاكرة', value: 23 },      
            { name: 'مؤشر', value: 29 },       
            { name: 'مرجع', value: 18 },       
            { name: 'كومة', value: 20 },       
            { name: 'واجهة برمجة التطبيقات', value: 93 }, 
            { name: 'جدول', value: 15 },       
            { name: 'حقل', value: 25 },        
            { name: 'استعلام', value: 21 },    
            { name: 'ترتيب', value: 13 },      
            { name: 'تصفية', value: 12 },      
            { name: 'تعيين', value: 15 },      
            { name: 'دمج', value: 14 },        
            { name: 'API', value: 12 },        
            { name: 'طلب', value: 26 },        
            { name: 'استجابة', value: 17 },    
            { name: 'خادم', value: 44 },       
            { name: 'الواجهة الأمامية', value: 12 }, 
          ].sort((a,b) => b.value - a.value)
    })

    const DATASET_WORDCLOUD_HINDI = computed(() => {
        return [
            { name: 'प्रोग्रामिंग', value: 95 },  
            { name: 'कोड', value: 55 },           
            { name: 'एल्गोरिदम', value: 18 },      
            { name: 'डीबग', value: 15 },          
            { name: 'वेरिएबल', value: 22 },       
            { name: 'फ़ंक्शन', value: 13 },       
            { name: 'ऑब्जेक्ट', value: 26 },      
            { name: 'क्लास', value: 16 },         
            { name: 'इनहेरिटेंस', value: 10 },    
            { name: 'पॉलीमॉर्फिज़्म', value: 11 },
            { name: 'इंटरफ़ेस', value: 23 },      
            { name: 'ऐरे', value: 25 },           
            { name: 'लिंक्ड लिस्ट', value: 12 },   
            { name: 'स्टैक', value: 14 },          
            { name: 'क्यू', value: 20 },           
            { name: 'हैश', value: 19 },           
            { name: 'रिकर्सन', value: 16 },       
            { name: 'लूप', value: 13 },           
            { name: 'कंडीशन', value: 28 },        
            { name: 'एक्सेप्शन', value: 12 },     
            { name: 'कंपाइल', value: 29 },        
            { name: 'इंटरप्रेट', value: 14 },     
            { name: 'फ्रेमवर्क', value: 24 },      
            { name: 'मॉड्यूल', value: 21 },       
            { name: 'लाइब्रेरी', value: 27 },      
            { name: 'पैकेज', value: 18 },         
            { name: 'मुख्य फ़ंक्शन', value: 20 }, 
            { name: 'प्रोसेस फ्लो', value: 11 },   
            { name: 'इवेंट', value: 17 },         
            { name: 'कॉलबैक', value: 13 },        
            { name: 'असिंक', value: 95 },         
            { name: 'सिंक', value: 22 },          
            { name: 'थ्रेड', value: 16 },         
            { name: 'प्रोसेस', value: 12 },       
            { name: 'मेमोरी', value: 23 },        
            { name: 'पॉइंटर', value: 29 },        
            { name: 'रेफरेंस', value: 18 },       
            { name: 'हीप', value: 20 },           
            { name: 'एपीआई', value: 93 },         
            { name: 'टेबल', value: 15 },          
            { name: 'फ़ील्ड', value: 25 },        
            { name: 'क्वेरी', value: 21 },        
            { name: 'सॉर्टिंग', value: 13 },      
            { name: 'फिल्टर', value: 12 },        
            { name: 'मैपिंग', value: 15 },        
            { name: 'मरज', value: 14 },           
            { name: 'एपीआई', value: 12 },         
            { name: 'रिक्वेस्ट', value: 26 },     
            { name: 'रिस्पॉन्स', value: 17 },     
            { name: 'सर्वर', value: 44 },         
            { name: 'फ्रंटएंड', value: 12 },      
          ].sort((a,b) => b.value - a.value)
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

    const DATASET_BULLET_BACKGROUND = computed(() => {
        return {
            value: 80,
            target: 75,
            segments: [
                {
                    name: 'Low',
                    from: 0,
                    to: 50,
                    color: isDarkMode.value ? '#FFFFFF40' : '#1A1A1A10'
                },
                {
                    name: 'Medium',
                    from: 50,
                    to: 70,
                    color: isDarkMode.value ? '#FFFFFF60' : '#1A1A1A20'
                },
                {
                    name: 'High',
                    from: 70,
                    to: 100,
                    color: isDarkMode.value ? '#FFFFFF80' : '#1A1A1A40'
                },
            ]
        }
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

    //-------------- VUE-UI-HISTORY-MAP --------------//
    const DATASET_HISTORY_PLOT_BASIC = ref([
        {
            name: "2024",
            values: [
                { x: 355, y: 2.3, label: "January" },
                { x: 112, y: 1.2, label: "February" },
                { x: 313, y: 0.4, label: "March" },
                { x: 555, y: 1.2, label: "April" },
            ],
        },
        {
            name: "2025",
            values: [
                { x: 1000, y: 2, label: "January" },
                { x: 655, y: 4, label: "February" },
                { x: 350, y: 3, label: "March" },
                { x: 815, y: 2.5, label: "April" },
            ],
        },
    ]);

    const CONFIG_HISTORY_PLOT_BASIC = computed(() => {
        return {
            table: {
                ...TABLE.value,
            },
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
                        paddingLeft: 36,
                        subtitle: {
                            text: 'Subtitle',
                        }
                    },
                    grid: {
                        xAxis: {
                            stroke: colors.value.gridStroke
                        },
                        yAxis: {
                            stroke: colors.value.gridStroke
                        },
                        horizontalLines: {
                            stroke: colors.value.greyStroke
                        },
                        verticalLines: {
                            stroke: colors.value.greyStroke
                        }
                    },
                    axes: {
                        x: {
                            labels: {
                                color: colors.value.grey,
                                prefix: '$'
                            },
                            name: {
                                text: 'Average revenue',
                                color: colors.value.grey
                            }
                        },
                        y: {
                            labels: {
                                color: colors.value.grey
                            },
                            name: {
                                text: 'Average satisfaction',
                                color: colors.value.grey
                            }
                        }
                    },
                    plots: {
                        stroke: colors.value.bg,
                        labels: {
                            color: colors.value.grey
                        }
                    }
                }
            }
        }
    })

    const CONFIG_WORLD_BASIC = computed(() => {
        return {
            style: {
                chart: {
                    backgroundColor: colors.value.bg,
                    color: colors.value.textColor,
                    territory: {
                        stroke: isDarkMode.value ? '#FFFFFF' : '#FFFFFF',
                        colors: {
                            min: '#b8c8fc',
                            max: '#b54f0b'
                        },
                        emptyColor: isDarkMode.value ? '#4A4A4A' : '#E0E0E0'
                    },
                    dataLabels: {
                        suffix: '°C'
                    },
                    title: {
                        text: 'Average yearly temperatures °C',
                        color: colors.value.textColor,
                        subtitle: {
                            text: '(Approximation)',
                            color: colors.value.grey
                        }
                    },
                    tooltip: {
                        backgroundColor: colors.value.bg,
                        color: colors.value.textColor,
                        showPercentage: false,
                        borderColor: colors.value.gridStroke,
                        backgroundOpacity: 30
                    },
                }
            }
        }
    })

    const examples = computed(() => {
        return [
            // WORLD GLOBE
            {
                dataset: DATASET_WORLD.value,
                config: CONFIG_WORLD_BASIC.value,
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Globe projection',
                    fr: 'Projection du globe',
                    pt: 'Projeção do globo',
                    de: 'Globus-Projektion',
                    zh: '地球投影',
                    jp: '地球儀投影',
                    es: 'Proyección del globo',
                    ko: '지구본 투영',
                    ar: 'إسقاط الكرة الأرضية'
                }
            },
            // WORLD MERCATOR
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'mercator'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Mercator projection',
                    fr: 'Projection de Mercator',
                    pt: 'Projeção de Mercator',
                    de: 'Mercator-Projektion',
                    zh: '墨卡托投影',
                    jp: 'メルカトル図法',
                    es: 'Proyección de Mercator',
                    ko: '메르카토르 도법',
                    ar: 'إسقاط مركاتور'
                }
            },
            // WORLD AITOFF
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'aitoff'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Aitoff projection',
                    fr: 'Projection Aitoff',
                    pt: 'Projeção de Aitoff',
                    de: 'Aitoff-Projektion',
                    zh: '艾托夫投影',
                    jp: 'アイトフ図法',
                    es: 'Proyección de Aitoff',
                    ko: '아이토프 도법',
                    ar: 'إسقاط أيتوف'
                }
            },
            // WORLD AZIMUTAL EQUIDISTANT
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'azimuthalEquidistant'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Azimuthal equidistant projection',
                    fr: 'Projection azimutale équidistante',
                    pt: 'Projeção azimutal equidistante',
                    de: 'Azimutal äquidistante Projektion',
                    zh: '方位等距投影',
                    jp: '方位等距図法',
                    es: 'Proyección azimutal equidistante',
                    ko: '방위 등거리 투영법',
                    ar: 'إسقاط سمتي متساوي البعد'
                }
            },
            // WORLD BONNE
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'bonne'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Bonne projection',
                    fr: 'Projection de Bonne',
                    pt: 'Projeção de Bonne',
                    de: 'Bonne-Projektion',
                    zh: '邦纳投影',
                    jp: 'ボンヌ図法',
                    es: 'Proyección de Bonne',
                    ko: '본 도법',
                    ar: 'إسقاط بونيه'
                }
            },
            // WORLD EQUI RECTANGULAR
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'equirectangular'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Equirectangular projection',
                    fr: 'Projection équirectangulaire',
                    pt: 'Projeção equiretangular',
                    de: 'Equirektangulare Projektion',
                    zh: '等矩形投影',
                    jp: '等緯度経線図法',
                    es: 'Proyección equirectangular',
                    ko: '등직각 도법',
                    ar: 'الإسقاط المستطيل المتساوي'
                }
            },
            // WORLD GALL PETERS
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'gallPeters'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Gall Peters projection',
                    fr: 'Projection Gall-Peters',
                    pt: 'Projeção Gall-Peters',
                    de: 'Gall-Peters-Projektion',
                    zh: '盖尔-彼得斯投影',
                    jp: 'ガル＝ピーターズ図法',
                    es: 'Proyección Gall-Peters',
                    ko: '갈-피터스 도법',
                    ar: 'إسقاط غال-بيترز'
                }
            },
            // WORLD HAMMER
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'hammer'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Hammer projection',
                    fr: 'Projection Hammer',
                    pt: 'Projeção Hammer',
                    de: 'Hammer-Projektion',
                    zh: '哈默投影',
                    jp: 'ハマー図法',
                    es: 'Proyección Hammer',
                    ko: '해머 도법',
                    ar: 'إسقاط هامَر'
                }
            },
            // WORLD MOLLWEIDE
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'mollweide'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Mollweide projection',
                    fr: 'Projection Mollweide',
                    pt: 'Projeção Mollweide',
                    de: 'Mollweide-Projektion',
                    zh: '莫尔魏德投影',
                    jp: 'モルワイデ図法',
                    es: 'Proyección Mollweide',
                    ko: '몰바이데 도법',
                    ar: 'إسقاط مولفايده'
                }
            },
            // WORLD ROBINSON
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'robinson'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Robinson projection',
                    fr: 'Projection Robinson',
                    pt: 'Projeção de Robinson',
                    de: 'Robinson-Projektion',
                    zh: '罗宾逊投影',
                    jp: 'ロビンソン図法',
                    es: 'Proyección Robinson',
                    ko: '로빈슨 도법',
                    ar: 'إسقاط روبنسون'
                }
            },
            // WORLD SINUSOIDAL
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'sinusoidal'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Sinusoidal projection',
                    fr: 'Projection sinusoïdale',
                    pt: 'Projeção sinusoidal',
                    de: 'Sinusoidal-Projektion',
                    zh: '正弦曲线投影',
                    jp: 'サイノソイダル図法',
                    es: 'Proyección sinusoidal',
                    ko: '사인 곡선 도법',
                    ar: 'إسقاط جيبي'
                }
            },
            // WORLD VAN DER GRINTEN
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'vanDerGrinten'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Van Der Grinten projection',
                    fr: 'Projection Van Der Grinten',
                    pt: 'Projeção Van Der Grinten',
                    de: 'Van-der-Grinten-Projektion',
                    zh: '范德格林滕投影',
                    jp: 'ヴァン・デル・グリント図法',
                    es: 'Proyección Van Der Grinten',
                    ko: '반 데어 그린텐 도법',
                    ar: 'إسقاط فان دير غرينتن'
                }
            },
            // WORLD WINKEL TRIPEL
            {
                dataset: DATASET_WORLD.value,
                config: {
                    ...CONFIG_WORLD_BASIC.value,
                    projection: 'winkelTripel'
                },
                component: 'VueUiWorld',
                icon: 'world',
                link: 'vue-ui-world',
                description: {
                    en: 'Winkel Tripel projection',
                    fr: 'Projection Winkel Tripel',
                    pt: 'Projeção Winkel Tripel',
                    de: 'Winkel-Tripel-Projektion',
                    zh: '温克尔三重投影',
                    jp: 'ウィンケル・トリペル図法',
                    es: 'Proyección Winkel Tripel',
                    ko: '빈켈 트리펠 도법',
                    ar: 'إسقاط وينكل تريبل'
                }
            },

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
                tags: ['#plot-comment'],
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'line-comment',
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

            // XY LINE WITH TREND COMMENT
            { 
                dataset: DATASET_XY_COMMENTS_TRENDS.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        comments: {
                            showInTooltip: false,
                            width: 100,
                            offsetY: -80
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: 0,
                                    scaleMax: 100
                                }
                            }
                        }
                    }
                },
                tags: ['#plot-comment'],
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'line-comment-trend',
                link: 'vue-ui-xy',
                description: {
                    en: 'With an individual datapoint comment as a trend arrow',
                    fr: 'Avec un commentaire de point de données individuel sous forme de flèche de tendance',
                    pt: 'Com um comentário de ponto de dados individual como uma seta de tendência',
                    de: 'Mit einem einzelnen Datenpunktkommentar als Trendpfeil',
                    zh: '带有单个数据点评论的趋势箭头',
                    jp: '個々のデータポイントに対するトレンド矢印としてのコメント付き',
                    es: 'Con un comentario individual de punto de datos como una flecha de tendencia',
                    ko: '개별 데이터 포인트 주석을 추세 화살표로 표시',
                    ar: 'مع تعليق على نقطة بيانات فردية كسهم للاتجاه'
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
            // XY CUSTOM BACKGROUND
            { 
                dataset: DATASET_XY_BACKGROUND.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        highlightArea: {
                            show: false,
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            position: 'start',
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: 0,
                                    scaleMax: 100
                                }
                            }
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'xy-background',
                link: 'vue-ui-xy',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
                }
            },
            // XY CUSTOM BACKGROUND PATTERN
            { 
                dataset: DATASET_XY_BACKGROUND.value.map(ds => {
                    return {
                        ...ds,
                        color: undefined,
                    }
                }),
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        highlightArea: {
                            show: false,
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            position: 'start',
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: 0,
                                    scaleMax: 100
                                }
                            }
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'xy-background',
                link: 'vue-ui-xy',
                chartBackgroundPattern: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background pattern",
                    fr: "Avec un motif d'arrière-plan personnalisé",
                    pt: "Com um padrão de fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrundmuster",
                    zh: "带有自定义背景图案",
                    jp: "カスタム背景パターン付き",
                    es: "Con un patrón de fondo personalizado",
                    ko: "사용자 정의 배경 패턴과 함께",
                    ar: "مع نمط خلفية مخصص"
                }
            },
            // XY PATTERN
            { 
                dataset: DATASET_XY_BACKGROUND.value.map(ds => {
                    return {
                        ...ds,
                        color: undefined,
                    }
                }),
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        highlightArea: {
                            show: false,
                        },
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            position: 'start',
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    scaleMin: 0,
                                    scaleMax: 100
                                }
                            }
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'xy-pattern',
                link: 'vue-ui-xy',
                tags: ['#pattern'],
                pattern: true,
                description: {
                    en: "Using a custom pattern",
                    fr: "Utilisation d'un motif personnalisé",
                    pt: "Usando um padrão personalizado",
                    de: "Verwendung eines benutzerdefinierten Musters",
                    zh: "使用自定义图案",
                    jp: "カスタムパターンの使用",
                    es: "Usando un patrón personalizado",
                    ko: "맞춤형 패턴 사용",
                    ar: "استخدام نمط مخصص"
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
                        radius: 5,
                        useGradient: false,
                        strokeWidth: 2,
                        labels: {
                            show: false,
                        },
                        dot: {
                            useSerieColor: false,
                            fill: '#ff3700'
                        },
                        tag: {
                            formatter: ({ value, config }) => {
                                const { serieName } = config
                                return `<div>
                                    <span style="font-size:10px">${serieName}</span>
                                    <span>${value.toFixed(1)}</span>
                                </div>`
                            }
                        }

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
            // XY GROUPS
            { 
                dataset: DATASET_XY_GROUPS.value, 
                config: {
                    ...BASE_XY_CONFIG.value,
                    chart: {
                        ...BASE_XY_CONFIG.value.chart,
                        grid: {
                            ...BASE_XY_CONFIG.value.chart.grid,
                            labels: {
                                ...BASE_XY_CONFIG.value.chart.grid.labels,
                                yAxis: {
                                    ...BASE_XY_CONFIG.value.chart.grid.labels.yAxis,
                                    useIndividualScale: true,
                                    groupColor: colors.value.textColor,
                                    labelWidth: 36,
                                    scaleLabelOffsetX: -26
                                }
                            }
                        }
                    }
                },
                component: 'VueUiXy',
                icon: 'chartLine',
                id: 'line-scale-groups',
                link: 'vue-ui-xy',
                description: {
                    en: 'Grouped y axis scales',
                    fr: 'Échelles de l’axe des ordonnées groupées',
                    pt: 'Escalas do eixo y agrupadas',
                    de: 'Gruppierte Y-Achsenskalen',
                    zh: '分组的 Y 轴刻度',
                    jp: 'グループ化されたY軸スケール',
                    es: 'Escalas del eje Y agrupadas',
                    ko: '그룹화된 Y축 스케일',
                    ar: 'مقاييس محور Y مجمعة'
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
                tags: ['#plot-comment'],
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
                                    strokeWidth: 180,
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
                                    strokeWidth: 180,
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
                                    strokeWidth: 180,
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
            // DONUT BACKGROUND
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
                                    useShadow: false,
                                },
                                labels: {
                                    ...CONFIG_DONUT_BASE.value.style.chart.layout.labels,
                                    hollow: {
                                        show: false,
                                        average: { show: false },
                                        total: { show: false },
                                    }
                                }
                            }
                        }
                    }
                },
                chartBackground: true,
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-bg',
                link: 'vue-ui-donut',
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
                }
            },
            // DONUT PATTERN
            {
                dataset: DATASET_DONUT_BASIC.value,
                config: CONFIG_DONUT_BASE.value,
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-pattern',
                link: 'vue-ui-donut',
                multiPattern: true,
                tags: ['#pattern'],
                description: {
                    en: "Using a custom pattern",
                    fr: "Utilisation d'un motif personnalisé",
                    pt: "Usando um padrão personalizado",
                    de: "Verwendung eines benutzerdefinierten Musters",
                    zh: "使用自定义图案",
                    jp: "カスタムパターンの使用",
                    es: "Usando un patrón personalizado",
                    ko: "맞춤형 패턴 사용",
                    ar: "استخدام نمط مخصص"
                }
            },
            // POLAR PATTERN
            {
                dataset: DATASET_DONUT_POLAR.value,
                config: {
                    ...CONFIG_DONUT_BASE.value,
                    type: 'polar'
                },
                component: 'VueUiDonut',
                icon: 'chartDonut',
                id: 'donut-polar-pattern',
                multiPattern: true,
                tags: ['#pattern'],
                link: 'vue-ui-donut',
                description: {
                    en: "Polar area chart - Using a custom pattern",
                    fr: "Diagramme en aires polaires - Utilisation d'un motif personnalisé",
                    pt: "Gráfico de área polar - Usando um padrão personalizado",
                    de: "Polarer Flächendiagramm - Verwendung eines benutzerdefinierten Musters",
                    zh: "极区面积图 使用自定义图案",
                    jp: "ポーラーエリアチャート カスタムパターンの使用",
                    es: "Gráfico de área polar - Usando un patrón personalizado",
                    ko: "극 영역 차트 - 맞춤형 패턴 사용",
                    ar: "استخدام نمط مخصص - مخطط المساحة القطبية"
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
            // SPARKLINE BACKGROUND
            {
                dataset: DATASET_SPARKLINE.value,
                config: {
                    ...CONFIG_SPARKLINE_BASE.value,
                    style: {
                        ...CONFIG_SPARKLINE_BASE.value.style,
                        line: {
                            ...CONFIG_SPARKLINE_BASE.value.style.line,
                            color: isDarkMode.value ? 'white' : 'black'
                        }
                    }
                },
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-background',
                chartBackground: true,
                link: 'vue-ui-sparkline',
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
                }
            },
            // SPARKLINE TOOLTIP
            {
                dataset: DATASET_SPARKLINE.value,
                config: {
                    ...CONFIG_SPARKLINE_BASE.value,
                    style: {
                        ...CONFIG_SPARKLINE_BASE.value.style,
                        line: {
                            ...CONFIG_SPARKLINE_BASE.value.style.line,
                        },
                        area: {
                            show: true,
                        },
                        tooltip: {
                            show: true,
                            backgroundOpacity: 20,
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                        },
                        title: { show: false },
                        dataLabel: { show: false }
                    }
                },
                component: 'VueUiSparkline',
                icon: 'chartSparkline',
                id: 'sparkline-tooltip',
                link: 'vue-ui-sparkline',
                description: {
                    en: "With a tooltip",
                    fr: "Avec une info-bulle",
                    pt: "Com uma dica de ferramenta",
                    de: "Mit einem Tooltip",
                    zh: "带有工具提示",
                    jp: "ツールチップ付き",
                    es: "Con un tooltip",
                    ko: "툴팁 포함",
                    ar: "مع تلميح الأدوات"
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
                id: 'stack-bar-horizontal-distributed',
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
            // STACKBAR NO GAP
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
                                gapRatio: 0
                            }
                        }
                    }
                },
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-basic-no-gap',
                link: 'vue-ui-stackbar',
                description: {
                    en: "Without gaps",
                    fr: "Sans espaces",
                    pt: "Sem lacunas",
                    de: "Ohne Lücken",
                    zh: "没有间隙",
                    jp: "隙間なし",
                    es: "Sin espacios",
                    ko: "간격 없이",
                    ar: "بدون فجوات"
                }
            },
            // STACKBAR BACKGROUND
            { 
                dataset: DATASET_STACKBAR_BASIC.value, 
                config: CONFIG_STACKBAR_BASE.value,
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-background',
                link: 'vue-ui-stackbar',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
                }
            },
            // STACKBAR PATTERN
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
                                dataLabels: {
                                    ...CONFIG_STACKBAR_BASE.value.style.chart.bars.dataLabels,
                                    show: false
                                }
                            }
                        }
                    }
                },
                component: 'VueUiStackbar',
                icon: 'chartStackbar',
                id: 'stack-bar-pattern',
                link: 'vue-ui-stackbar',
                tags: ['#pattern'],
                pattern: true,
                description: {
                    en: "Using a custom pattern",
                    fr: "Utilisation d'un motif personnalisé",
                    pt: "Usando um padrão personalizado",
                    de: "Verwendung eines benutzerdefinierten Musters",
                    zh: "使用自定义图案",
                    jp: "カスタムパターンの使用",
                    es: "Usando un patrón personalizado",
                    ko: "맞춤형 패턴 사용",
                    ar: "استخدام نمط مخصص"
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
            // NESTED DONUTS BACKGROUND
            { 
                dataset: DATASET_NESTED_DONUTS_BASIC.value, 
                config: CONFIG_NESTED_DONUTS_BASE.value,
                component: 'VueUiNestedDonuts',
                icon: 'chartNestedDonuts',
                id: 'nested-donuts-background',
                link: 'vue-ui-nested-donuts',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // VERTICAL BAR BACKGROUND
            { 
                dataset: DATASET_VERTICAL_BAR_BASE.value, 
                config: CONFIG_VERTICAL_BAR_BASIC.value,
                component: 'VueUiVerticalBar',
                icon: 'chartVerticalBar',
                id: 'vertical-bar-background',
                link: 'vue-ui-vertical-bar',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
                }
            },
            // VERTICAL BAR PATTERN
            { 
                dataset: DATASET_VERTICAL_BAR_BASE.value, 
                config: CONFIG_VERTICAL_BAR_BASIC.value,
                component: 'VueUiVerticalBar',
                icon: 'chartVerticalBar',
                id: 'vertical-bar-pattern',
                link: 'vue-ui-vertical-bar',
                tags: ['#pattern'],
                multiPattern: true,
                description: {
                    en: "Using a custom pattern",
                    fr: "Utilisation d'un motif personnalisé",
                    pt: "Usando um padrão personalizado",
                    de: "Verwendung eines benutzerdefinierten Musters",
                    zh: "使用自定义图案",
                    jp: "カスタムパターンの使用",
                    es: "Usando un patrón personalizado",
                    ko: "맞춤형 패턴 사용",
                    ar: "استخدام نمط مخصص"
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
                                spacing: 0,
                                columnTotal: {
                                    ...CONFIG_HEATMAP_BASIC.value.style.layout.cells.columnTotal,
                                    value: {
                                        ...CONFIG_HEATMAP_BASIC.value.style.layout.cells.columnTotal.value,
                                        offsetY: 20
                                    }
                                }
                            }
                        },
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
                        layout: {
                            ...CONFIG_HEATMAP_BASIC.value.style.layout,
                            cells: {
                                ...CONFIG_HEATMAP_BASIC.value.style.layout.cells,
                                columnTotal: {
                                    ...CONFIG_HEATMAP_BASIC.value.style.layout.cells.columnTotal,
                                    value: {
                                        ...CONFIG_HEATMAP_BASIC.value.style.layout.cells.columnTotal.value,
                                    }
                                }
                            }
                        },
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
            // HEATMAP BACKGROUND
            { 
                dataset: DATASET_HEATMAP_BASE.value, 
                config: CONFIG_HEATMAP_BASIC.value,
                component: 'VueUiHeatmap',
                icon: 'chartHeatmap',
                id: 'heatmap-background',
                link: 'vue-ui-heatmap',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // GAUGE SINGLE WITH HUGE LABEL
            { 
                dataset: DATASET_GAUGE_SINGLE.value, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                radiusRatio: 0.8,
                                segmentNames: {
                                    fontSize: 44
                                }
                            }
                        }
                    }
                },
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gaueg-single',
                link: 'vue-ui-gauge',
                description: {
                    en: "Single segment with huge name label",
                    fr: "Segment unique avec une étiquette de nom énorme",
                    pt: "Segmento único com um rótulo de nome enorme",
                    de: "Einzelnes Segment mit riesigem Namenslabel",
                    zh: "带有巨大名称标签的单个段",
                    jp: "巨大な名前ラベルを持つ単一セグメント",
                    es: "Segmento único con una etiqueta de nombre enorme",
                    ko: "큰 이름 레이블이 있는 단일 세그먼트",
                    ar: "قطاع واحد يحمل تسمية اسم كبيرة"
                }
            },
            // GAUGE SINGLE WITH TEXT ONLY
            { 
                dataset: DATASET_GAUGE_SINGLE_TEXT.value, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                radiusRatio: 0.8,
                                track: {
                                    size: 0,
                                },
                                markers: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.markers,
                                    offsetY: 40
                                },
                                segmentNames: {
                                    fontSize: 55
                                },
                                pointer: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.pointer,
                                    size: 1.1,
                                },
                                segmentSeparators: {
                                    show: true,
                                    stroke: colors.value.gridStrokeLight,
                                    offsetOut: 36,
                                    offsetIn: 150,
                                },
                            }
                        }
                    }
                },
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-text-only',
                link: 'vue-ui-gauge',
                description: {
                    en: "Text only",
                    fr: "Texte uniquement",
                    pt: "Somente texto",
                    de: "Nur Text",
                    zh: "仅文本",
                    jp: "テキストのみ",
                    es: "Solo texto",
                    ko: "텍스트만",
                    ar: "نص فقط"
                }
            },
            // GAUGE SINGLE WITH EMOJIS
            { 
                dataset: DATASET_GAUGE_EMOJIS.value, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                radiusRatio: 0.8,
                                track: {
                                    size: 0,
                                },
                                markers: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.markers,
                                    offsetY: 40
                                },
                                segmentNames: {
                                    fontSize: 55
                                },
                                pointer: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.pointer,
                                    size: 1.1,
                                },
                                segmentSeparators: {
                                    show: true,
                                    stroke: colors.value.gridStrokeLight,
                                    offsetOut: 36,
                                    offsetIn: 150,
                                },
                            }
                        }
                    }
                },
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-emojis',
                link: 'vue-ui-gauge',
                description: {
                    en: "Emojis only",
                    fr: "Emojis uniquement",
                    pt: "Apenas emojis",
                    de: "Nur Emojis",
                    zh: "仅表情符号",
                    jp: "絵文字のみ",
                    es: "Solo emojis",
                    ko: "이모지만",
                    ar: "إيموجيات فقط"
                }
            },
            // GAUGE WITH SEPARATORS
            { 
                dataset: {
                    ...DATASET_GAUGE_BASIC.value,
                    series: DATASET_GAUGE_BASIC.value.series.map(s => {
                        return {
                            ...s,
                            name: s.name.toUpperCase()
                        }
                    })
                }, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                radiusRatio: 0.8,
                                segmentNames: {
                                    fontSize: 20
                                },
                                segmentSeparators: {
                                    show: true,
                                    stroke: colors.value.gridStrokeLight,
                                    offsetOut: 36
                                },
                                markers: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.markers,
                                    offsetY: 36
                                }
                            }
                        }
                    }
                },
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-separators',
                link: 'vue-ui-gauge',
                description: {
                    en: "With segment separators",
                    fr: "Avec séparateurs de segments",
                    pt: "Com separadores de segmentos",
                    de: "Mit Segmenttrennzeichen",
                    zh: "带段分隔符",
                    jp: "セグメントセパレーター付き",
                    es: "Con separadores de segmentos",
                    ko: "세그먼트 구분선 포함",
                    ar: "مع فواصل المقاطع"
                }
            },
            // MORE GAUGE WITH SEPARATORS
            { 
                dataset: {
                    ...DATASET_GAUGE_MIXED.value,
                    series: DATASET_GAUGE_MIXED.value.series.map(s => {
                        return {
                            ...s,
                            name: s.name.toUpperCase()
                        }
                    })
                }, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                radiusRatio: 0.8,
                                segmentNames: {
                                    fontSize: 50
                                },
                                segmentSeparators: {
                                    show: true,
                                    stroke: colors.value.gridStrokeLight,
                                    offsetOut: 36
                                },
                                markers: {
                                    ...CONFIG_GAUGE_BASE.value.style.chart.layout.markers,
                                    offsetY: 36
                                },
                                track: {
                                    size: 4
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
                id: 'gauge-separators-2',
                link: 'vue-ui-gauge',
                description: {
                    en: "With huge labels and separators",
                    fr: "Avec de grandes étiquettes et des séparateurs",
                    pt: "Com rótulos enormes e separadores",
                    de: "Mit großen Beschriftungen und Trennlinien",
                    zh: "带有大标签和分隔符",
                    jp: "巨大なラベルとセパレーター付き",
                    es: "Con etiquetas grandes y separadores",
                    ko: "큰 레이블과 구분선 포함",
                    ar: "بعلامات كبيرة وفواصل"
                }
            },
            // GAUGE SINGLE WITH HUGE LABEL AND INDICATOR ARC
            { 
                dataset: {
                    ...DATASET_GAUGE_SINGLE.value,
                    series: [{
                        ...DATASET_GAUGE_SINGLE.value.series[0],
                    }]
                }, 
                config: {
                    ...CONFIG_GAUGE_BASE.value,
                    style: {
                        ...CONFIG_GAUGE_BASE.value.style,
                        chart: {
                            ...CONFIG_GAUGE_BASE.value.style.chart,
                            layout: {
                                ...CONFIG_GAUGE_BASE.value.style.chart.layout,
                                radiusRatio: 0.8,
                                track: {
                                    size: 0.1,
                                    useGradient: false
                                },
                                segmentNames: {
                                    fontSize: 44
                                },
                                pointer: {
                                    show: false
                                },
                                indicatorArc: {
                                    show: true,
                                    radius: 1610,
                                    fill: lightenHexColor({ hexColor: colors.value.blue, force: 0.2 })
                                }
                            }
                        }
                    }
                },
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-indicator-arc',
                link: 'vue-ui-gauge',
                description: {
                    en: "With only a label and arc indicator",
                    fr: "Avec seulement une étiquette et un indicateur en arc",
                    pt: "Com apenas um rótulo e um indicador de arco",
                    de: "Nur mit einem Label und einem Bogenindikator",
                    zh: "仅带标签和弧形指示器",
                    jp: "ラベルとアークインジケーターのみ",
                    es: "Con solo una etiqueta y un indicador de arco",
                    ko: "레이블과 아크 표시기만 포함",
                    ar: "بمؤشر قوسي ووسم فقط"
                }
            },
            // GAUGE BACKGROUND
            { 
                dataset: DATASET_GAUGE_BASIC.value, 
                config: CONFIG_GAUGE_BASE.value,
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-background',
                link: 'vue-ui-gauge',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
                }
            },
            // GAUGE PATTERN
            { 
                dataset: DATASET_GAUGE_BASIC.value, 
                config: CONFIG_GAUGE_BASE.value,
                component: 'VueUiGauge',
                icon: 'chartGauge',
                id: 'gauge-pattern',
                tags: ['#pattern'],
                link: 'vue-ui-gauge',
                multiPattern: true,
                description: {
                    en: "Using a custom pattern",
                    fr: "Utilisation d'un motif personnalisé",
                    pt: "Usando um padrão personalizado",
                    de: "Verwendung eines benutzerdefinierten Musters",
                    zh: "使用自定义图案",
                    jp: "カスタムパターンの使用",
                    es: "Usando un patrón personalizado",
                    ko: "맞춤형 패턴 사용",
                    ar: "استخدام نمط مخصص"
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
            // ONION BACKGROUND
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
                                    color: isDarkMode.value ? '#FFFFFF40' : '#FFFFFF60'
                                }
                            }
                        }
                    }
                },
                component: 'VueUiOnion',
                icon: 'chartOnion',
                id: 'onion-background',
                link: 'vue-ui-onion',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // WORD CLOUD CUSTOM PALETTE BACKGROUND
            { 
                dataset: DATASET_WORDCLOUD_CHINESE.value, 
                config: {
                    ...CONFIG_WORD_WLOUD_BASIC.value,
                    customPalette: makeColors({
                        colorStart: '#FFFFFF',
                        iterations: 200,
                        force: 0.0006
                    })
                },
                component: 'VueUiWordCloud',
                icon: 'chartWordCloud',
                id: 'word-cloud-chinese-custom-palette-background',
                link: 'vue-ui-word-cloud',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // SCATTER MULTIPLE
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
                id: 'scatter-multiple',
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
            // WHEEL BACKGROUND
            { 
                dataset: DATASET_WHEEL_BASIC.value, 
                config: CONFIG_WHEEL_BASIC.value,
                component: 'VueUiWheel',
                icon: 'chartWheel',
                id: 'wheel-background',
                link: 'vue-ui-wheel',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // SPARKHISTOGRAM STRECHED, SDQUARED, NO GAP, BACKGROUND
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
                                positive: '#FFFFFF'
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
                id: 'sparkhistogram-stretched-background',
                link: 'vue-ui-sparkhistogram',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // QUADRANT WITH AREAS, BACKGROUND
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
                id: 'quadrant-areas-background',
                link: 'vue-ui-quadrant',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // RADAR FILLED, BACKGROUND
            { 
                dataset: {
                    ...DATASET_RADAR_BASE.value,
                    categories: DATASET_RADAR_BASE.value.categories.map(c => {
                        return {
                            ...c,
                            color: '#FFFFFF'
                        }
                    })
                }, 
                config: {
                    ...CONFIG_RADAR_BASIC.value,
                    style: {
                        ...CONFIG_RADAR_BASIC.value.style,
                        chart: {
                            ...CONFIG_RADAR_BASIC.value.style.chart,
                            layout: {
                                ...CONFIG_RADAR_BASIC.value.style.chart.layout,
                                grid: {
                                    ...CONFIG_RADAR_BASIC.value.style.chart.layout.grid,
                                    stroke: '#FFFFFF'
                                },
                                dataPolygon: {
                                    transparent: false,
                                    opacity: 70
                                },
                                outerPolygon: {
                                    ...CONFIG_RADAR_BASIC.value.style.chart.layout.outerPolygon,
                                    stroke: '#FFFFFF'
                                }
                            }
                        }
                    }

                },
                component: 'VueUiRadar',
                icon: 'chartRadar',
                id: 'radar-filled-background',
                link: 'vue-ui-radar',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // STRIP PLOT SHAPES STAR, BACKGROUND
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
                id: 'strip-plot-star-background',
                link: 'vue-ui-strip-plot',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
                id: 'bullet-mixed',
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
            // BULLET BASIC, BACKGROUND
            { 
                dataset: DATASET_BULLET_BACKGROUND.value, 
                config: CONFIG_BULLET_BASE.value,
                component: 'VueUiBullet',
                icon: 'chartBullet',
                id: 'bullet-background',
                link: 'vue-ui-bullet',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // FUNNEL BACKGROUND
            { 
                dataset: DATASET_FUNNEL_BASIC.value, 
                config: {
                    ...CONFIG_FUNNEL_BASIC.value,
                    style: {
                        ...CONFIG_FUNNEL_BASIC.value.style,
                        chart: {
                            ...CONFIG_FUNNEL_BASIC.value.style.chart,
                            area: {
                                ...CONFIG_FUNNEL_BASIC.value.style.chart.area,
                                color: '#FFFFFF40'
                            },
                            circleLinks: {
                                ...CONFIG_FUNNEL_BASIC.value.style.chart.circleLinks,
                                color: '#FFFFFF40'
                            },
                            bars: {
                                ...CONFIG_FUNNEL_BASIC.value.style.chart.bars,
                                dataLabels: {
                                    ...CONFIG_FUNNEL_BASIC.value.style.chart.bars.dataLabels,
                                    name: {
                                        color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
                                    },
                                    value: {
                                        color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
                                    }
                                }
                            }
                        }
                    }
                },
                component: 'VueUiFunnel',
                icon: 'chartFunnel',
                id: 'funnel-background',
                link: 'vue-ui-funnel',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
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
            // BASIC HISTORY PLOT
            { 
                dataset: DATASET_HISTORY_PLOT_BASIC.value, 
                config: CONFIG_HISTORY_PLOT_BASIC.value,
                component: 'VueUiHistoryPlot',
                icon: 'chartHistoryPlot',
                id: 'history-plot-basic',
                link: 'vue-ui-history-plot',
                description: {
                    en: "Basic layout",
                    fr: "Disposition de base",
                    pt: "Layout básico",
                    de: "Grundlegendes Layout",
                    zh: "基本布局",
                    jp: "基本レイアウト",
                    es: "Diseño básico",
                    ko: "기본 레이아웃",
                    ar: "تخطيط أساسي"
                }
            },
            // HISTORY PLOT THICK PATH
            { 
                dataset: DATASET_HISTORY_PLOT_BASIC.value, 
                config: {
                    ...CONFIG_HISTORY_PLOT_BASIC.value,
                    style: {
                        ...CONFIG_HISTORY_PLOT_BASIC.value.style,
                        chart: {
                            ...CONFIG_HISTORY_PLOT_BASIC.value.style.chart,
                            paths: {
                                useSerieColor: false,
                                strokeWidth: 24,
                                stroke: colors.value.gridStroke + '40'
                            }
                        }
                    }
                },
                component: 'VueUiHistoryPlot',
                icon: 'chartHistoryPlot',
                id: 'history-plot-thick-path',
                link: 'vue-ui-history-plot',
                description: {
                    en: "With Thick path",
                    fr: "Avec chemin épais",
                    pt: "Com caminho grosso",
                    de: "Mit dickem Pfad",
                    zh: "带粗线路径",
                    jp: "太いパス付き",
                    es: "Con trazo grueso",
                    ko: "두꺼운 경로 포함",
                    ar: "بمسار سميك"
                }
            },
            // BASIC HISTORY PLOT BACKGROUND
            { 
                dataset: DATASET_HISTORY_PLOT_BASIC.value, 
                config: CONFIG_HISTORY_PLOT_BASIC.value,
                component: 'VueUiHistoryPlot',
                icon: 'chartHistoryPlot',
                id: 'history-plot-background',
                link: 'vue-ui-history-plot',
                chartBackground: true,
                tags: ['#chart-background'],
                description: {
                    en: "With a custom background",
                    fr: "Avec un arrière-plan personnalisé",
                    pt: "Com um fundo personalizado",
                    de: "Mit einem benutzerdefinierten Hintergrund",
                    zh: "带有自定义背景",
                    jp: "カスタム背景付き",
                    es: "Con un fondo personalizado",
                    ko: "사용자 정의 배경과 함께",
                    ar: "مع خلفية مخصصة"
                }
            },
        ]
    })

    return {
        examples
    }

}