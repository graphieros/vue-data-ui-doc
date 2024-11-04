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

    const DATASET_XY_BASIC_LINE = ref([
        {
            name: 'Serie 1',
            type: 'line',
            dataLabels: true,
            series: LINESET
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

    const examples = computed(() => {
        return [
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
        ]
    })

    return {
        examples
    }

}