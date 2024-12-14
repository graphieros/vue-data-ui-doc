import { computed } from "vue"
import { useMainStore } from "./stores"

export default function useCharts() {
    const store = useMainStore()
    const translations = computed(() => store.translations)

    const classification = computed(() => {
        return {
            dataOverTime: {
                en: "data over time",
                fr: "données dans le temps",
                pt: "dados ao longo do tempo",
                de: "Daten im Laufe der Zeit",
                zh: "随时间变化的数据",
                jp: "時系列データ",
                es: "datos a lo largo del tiempo",
                ko: "시간에 따른 데이터",
                ar: "البيانات مع مرور الوقت"
            },
            proportions: {
                en: "proportions",
                fr: "proportions",
                pt: "proporções",
                de: "Proportionen",
                zh: "比例",
                jp: "割合",
                es: "proporciones",
                ko: "비율",
                ar: "النسب"
            },
            comparisons: {
                en: "comparisons",
                fr: "comparaisons",
                pt: "comparações",
                de: "Vergleiche",
                zh: "比较",
                jp: "比較",
                es: "comparaciones",
                ko: "비교",
                ar: "المقارنات"
            },
            rating: {
                en: "rating",
                fr: "évaluation",
                pt: "classificação",
                de: "Bewertung",
                zh: "评分",
                jp: "評価",
                es: "clasificación",
                ko: "평점",
                ar: "التقييم"
            },
            dataTables: {
                en: "data tables",
                fr: "tableaux de données",
                pt: "tabelas de dados",
                de: "Datentabellen",
                zh: "数据表",
                jp: "データテーブル",
                es: "tablas de datos",
                ko: "데이터 테이블",
                ar: "جداول البيانات"
            },
            relationships: {
                en: "relationships",
                fr: "relations",
                pt: "relacionamentos",
                de: "Beziehungen",
                zh: "关系",
                jp: "関係",
                es: "relaciones",
                ko: "관계",
                ar: "العلاقات"
            },
            hierarchy: {
                en: "hierarchy",
                fr: "hiérarchie",
                pt: "hierarquia",
                de: "Hierarchie",
                zh: "层级",
                jp: "階層",
                es: "jerarquía",
                ko: "계층",
                ar: "التسلسل الهرمي"
            },
            partToAWhole: {
                en: "part to a whole",
                fr: "partie à un tout",
                pt: "parte para um todo",
                de: "Teil eines Ganzen",
                zh: "整体的一部分",
                jp: "全体の一部",
                es: "parte de un todo",
                ko: "전체의 일부",
                ar: "جزء من الكل"
            },
            distribution: {
                en: "distribution",
                fr: "distribution",
                pt: "distribuição",
                de: "Verteilung",
                zh: "分布",
                jp: "分布",
                es: "distribución",
                ko: "분포",
                ar: "التوزيع"
            },
            range: {
                en: "range",
                fr: "plage",
                pt: "alcance",
                de: "Bereich",
                zh: "范围",
                jp: "範囲",
                es: "rango",
                ko: "범위",
                ar: "النطاق"
            },
            semantic: {
                en: "semantic",
                fr: "sémantique",
                pt: "semântico",
                de: "semantisch",
                zh: "语义",
                jp: "セマンティック",
                es: "semántico",
                ko: "의미론적",
                ar: "الدلالي"
            },
            uiTools: {
                en: "UI tools",
                fr: "outils UI",
                pt: "ferramentas UI",
                de: "UI-Tools",
                zh: "UI 工具",
                jp: "UIツール",
                es: "herramientas de UI",
                ko: "UI 도구",
                ar: "أدوات واجهة المستخدم"
            },
        }
    })

    const taxinomy = computed(() => {
        return {
            VueUiXy: {
                icon: 'chartLine',
                link: '/docs#vue-ui-xy',
                description: translations.value.docs.tooltips.xy[store.lang],
                taxinomy: ['comparisons', 'distribution', 'dataOverTime']
            },
            VueUiXyCanvas: {
                icon: 'chartLine',
                link: '/docs#vue-ui-xy-canvas',
                description: translations.value.docs.tooltips.xyCanvas[store.lang],
                taxinomy: ['comparisons', 'distribution', 'dataOverTime']
            },
            VueUiBullet: {
                icon: 'chartBullet',
                link: '/docs#vue-ui-bullet',
                description: translations.value.docs.tooltips.bullet[store.lang],
                taxinomy: ['comparisons', 'range']
            },
            VueUi3dBar: {
                icon: 'chart3dBar',
                link: '/docs#vue-ui-3d-bar',
                description: translations.value.docs.tooltips.bar3d[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiAccordion: {
                icon: 'accordion',
                link: '/docs#vue-ui-accordion',
                description: translations.value.docs.tooltips.accordion[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiAgePyramid: {
                icon: 'chartAgePyramid',
                link: '/docs#vue-ui-age-pyramid',
                description: translations.value.docs.tooltips.agePyramid[store.lang],
                taxinomy: ['comparisons', 'distribution']
            },
            VueUiAnnotator: {
                icon: 'annotator',
                link: '/docs#vue-ui-annotator',
                description: translations.value.docs.tooltips.annotator[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiCandlestick: {
                icon: 'chartCandlestick',
                link: '/docs#vue-ui-candlestick',
                description: translations.value.docs.tooltips.candlestick[store.lang],
                taxinomy: ['distribution', 'range', 'dataOverTime']
            },
            VueUiCarouselTable: {
                icon: 'carouselTable',
                link: '/docs#vue-ui-carousel-table',
                description: translations.value.docs.tooltips.carouselTable[store.lang],
                taxinomy: ['dataTables']
            },
            VueUiChestnut: {
                icon: 'chartChestnut',
                link: '/docs#vue-ui-chestnut',
                description: translations.value.docs.tooltips.chestnut[store.lang],
                taxinomy: ['comparisons', 'proportions', 'hierarchy', 'partToAWhole']
            },
            VueUiCursor: {
                icon: 'cursor',
                link: '/docs#vue-ui-cursor',
                description: translations.value.docs.tooltips.cursor[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiDashboard: {
                icon: 'dashboard',
                link: '/docs#vue-ui-dashboard',
                description: translations.value.docs.tooltips.dashboard[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiDigits: {
                icon: 'digit8',
                link: '/docs#vue-ui-digits',
                description: translations.value.docs.tooltips.digits[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiDonut: {
                icon: 'chartDonut',
                link: '/docs#vue-ui-donut',
                description: translations.value.docs.tooltips.donut[store.lang],
                taxinomy: ['comparisons', 'proportions', 'partToAWhole']
            },
            VueUiDonutEvolution: {
                icon: 'chartDonutEvolution',
                link: '/docs#vue-ui-donut-evolution',
                description: translations.value.docs.tooltips.donutEvolution[store.lang],
                taxinomy: ['comparisons', 'proportions', 'dataOverTime']
            },
            VueUiDumbbell: {
                icon: 'chartDumbbell',
                link: '/docs#vue-ui-dumbbell',
                description: translations.value.docs.tooltips.dumbbell[store.lang],
                taxinomy: ['comparisons', 'range']
            },
            VueUiFlow: {
                icon: 'chartFlow',
                link: '/docs#vue-ui-flow',
                description: translations.value.docs.tooltips.flow[store.lang],
                taxinomy: ['proportions', 'distribution']
            },
            VueUiGalaxy: {
                icon: 'chartGalaxy',
                link: '/docs#vue-ui-galaxy',
                description: translations.value.docs.tooltips.galaxy[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiGauge: {
                icon: 'chartGauge',
                link: '/docs#vue-ui-gauge',
                description: translations.value.docs.tooltips.gauge[store.lang],
                taxinomy: ['range']
            },
            VueUiHeatmap: {
                icon: 'chartHeatmap',
                link: '/docs#vue-ui-heatmap',
                description: translations.value.docs.tooltips.heatmap[store.lang],
                taxinomy: ['comparisons', 'proportions', 'relationships']
            },
            VueUiIcon: {
                icon: 'smiley',
                link: '/docs#vue-ui-icon',
                description: translations.value.docs.tooltips.icon[store.lang],
                taxinomy: ['uiTool']
            },
            VueUiKpi: {
                icon: 'kpiBox',
                link: '/docs#vue-ui-kpi',
                description: translations.value.docs.tooltips.kpi[store.lang],
                taxinomy: ['uiTool']
            },
            VueUiMiniLoader: {
                icon: 'chartWheel',
                link: '/docs#vue-ui-mini-loader',
                description: translations.value.docs.tooltips.miniLoader[store.lang],
                taxinomy: ['uiTool']
            },
            VueUiMolecule: {
                icon: 'chartCluster',
                link: '/docs#vue-ui-molecule',
                description: translations.value.docs.tooltips.molecule[store.lang],
                taxinomy: ['relationships', 'hierarchy']
            },
            VueUiMoodRadar: {
                icon: 'chartMoodRadar',
                link: '/docs#vue-ui-mood-radar',
                description: translations.value.docs.tooltips.moodRadar[store.lang],
                taxinomy: ['comparisons', 'relationships']
            },
            VueUiNestedDonuts: {
                icon: 'chartNestedDonuts',
                link: '/docs#vue-ui-nested-donuts',
                description: translations.value.docs.tooltips.nestedDonuts[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiOnion: {
                icon: 'chartOnion',
                link: '/docs#vue-ui-onion',
                description: translations.value.docs.tooltips.onion[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiParallelCoordinatePlot: {
                icon: 'chartParallelCoordinatePlot',
                link: '/docs#vue-ui-parallel-coordinate-plot',
                description: translations.value.docs.tooltips.pcp[store.lang],
                taxinomy: ['comparisons', 'relationships']
            },
            VueUiQuadrant: {
                icon: 'chartQuadrant',
                link: '/docs#vue-ui-quadrant',
                description: translations.value.docs.tooltips.quadrant[store.lang],
                taxinomy: ['comparisons', 'distribution']
            },
            VueUiQuickChart: {
                icon: 'vueDataUi',
                link: '/docs#vue-ui-quick-chart',
                description: translations.value.docs.tooltips.quickChart[store.lang],
                taxinomy: ['comparisons', 'dataOverTime']
            },
            VueUiRadar: {
                icon: 'chartRadar',
                link: '/docs#vue-ui-radar',
                description: translations.value.docs.tooltips.radar[store.lang],
                taxinomy: ['comparisons', 'relationships']
            },
            VueUiRating: {
                icon: 'star',
                link: '/docs#vue-ui-rating',
                description: translations.value.docs.tooltips.rating[store.lang],
                taxinomy: ['rating']
            },
            VueUiRelationCircle: {
                icon: 'chartRelationCircle',
                link: '/docs#vue-ui-relation-circle',
                description: translations.value.docs.tooltips.relationCircle[store.lang],
                taxinomy: ['comparisons', 'relationships', 'semantic']
            },
            VueUiRings: {
                icon: 'chartRings',
                link: '/docs#vue-ui-rings',
                description: translations.value.docs.tooltips.rings[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiScatter: {
                icon: 'chartScatter',
                link: '/docs#vue-ui-scatter',
                description: translations.value.docs.tooltips.scatter[store.lang],
                taxinomy: ['comparisons', 'relationships', 'distribution']
            },
            VueUiScreenshot: {
                icon: 'screenshot',
                link: '/docs#vue-ui-screenshot',
                description: translations.value.docs.tooltips.screenshot[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiSkeleton: {
                icon: 'skeleton',
                link: '/docs#vue-ui-skeleton',
                description: translations.value.docs.tooltips.skeleton[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiSmiley: {
                icon: 'smiley',
                link: '/docs#vue-ui-smiley',
                description: translations.value.docs.tooltips.smiley[store.lang],
                taxinomy: ['rating']
            },
            VueUiSparkHistogram: {
                icon: 'chartSparkHistogram',
                link: '/docs#vue-ui-sparkhistogram',
                description: translations.value.docs.tooltips.histogram[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiSparkStackbar: {
                icon: 'chartSparkStackbar',
                link: '/docs#vue-ui-sparkstackbar',
                description: translations.value.docs.tooltips.stackbar[store.lang],
                taxinomy: ['comparisons', 'proportions', 'partToAWhole']
            },
            VueUiSparkTrend: {
                icon: 'trend',
                link: '/docs#vue-ui-spark-trend',
                description: translations.value.docs.tooltips.trend[store.lang],
                taxinomy: ['dataOverTime']
            },
            VueUiSparkbar: {
                icon: 'chartSparkbar',
                link: '/docs#vue-ui-sparkbar',
                description: translations.value.docs.tooltips.sparkbar[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiSparkgauge: {
                icon: 'chartGauge',
                link: '/docs#vue-ui-sparkgauge',
                description: translations.value.docs.tooltips.gauge[store.lang],
                taxinomy: ['range']
            },
            VueUiSparkline: {
                icon: 'chartSparkline',
                link: '/docs#vue-ui-sparkline',
                description: translations.value.docs.tooltips.sparkline[store.lang],
                taxinomy: ['dataOverTime']
            },
            VueUiStripPlot: {
                icon: 'chartStripPlot',
                link: '/docs#vue-ui-strip-plot',
                description: translations.value.docs.tooltips.stripPlot[store.lang],
                taxinomy: ['comparisons']
            },
            VueUiTable: {
                icon: 'chartTable',
                link: '/docs#vue-ui-table',
                description: translations.value.docs.tooltips.table[store.lang],
                taxinomy: ['dataTables']
            },
            VueUiTableHeatmap: {
                icon: 'chartTable',
                link: '/docs#vue-ui-table-heatmap',
                description: translations.value.docs.tooltips.tableHeatmap[store.lang],
                taxinomy: ['dataTables', 'relationships']
            },
            VueUiTableSparkline: {
                icon: 'chartTable',
                link: '/docs#vue-ui-table-sparkline',
                description: translations.value.docs.tooltips.sparklineTable[store.lang],
                taxinomy: ['dataTables', 'dataOverTime']
            },
            VueUiThermometer: {
                icon: 'chartThermometer',
                link: '/docs#vue-ui-thermometer',
                description: translations.value.docs.tooltips.thermometer[store.lang],
                taxinomy: ['range']
            },
            VueUiTimer: {
                icon: 'lap',
                link: '/docs#vue-ui-timer',
                description: translations.value.docs.tooltips.timer[store.lang],
                taxinomy: ['uiTools']
            },
            VueUiTiremarks: {
                icon: 'chartTiremarks',
                link: '/docs#vue-ui-tiremarks',
                description: translations.value.docs.tooltips.tiremarks[store.lang],
                taxinomy: ['range']
            },
            VueUiTreemap: {
                icon: 'chartTreemap',
                link: '/docs#vue-ui-treemap',
                description: translations.value.docs.tooltips.treemap[store.lang],
                taxinomy: ['comparisons', 'proportions', 'hierarchy', 'partToAWhole']
            },
            VueUiVerticalBar: {
                icon: 'chartVerticalBar',
                link: '/docs#vue-ui-vertical-bar',
                description: translations.value.docs.tooltips.verticalBar[store.lang],
                taxinomy: ['comparisons', 'proportions']
            },
            VueUiWaffle: {
                icon: 'chartWaffle',
                link: '/docs#vue-ui-waffle',
                description: translations.value.docs.tooltips.waffle[store.lang],
                taxinomy: ['comparisons', 'proportions', 'distribution']
            },
            VueUiWheel: {
                icon: 'chartWheel',
                link: '/docs#vue-ui-wheel',
                description: translations.value.docs.tooltips.wheel[store.lang],
                taxinomy: ['range']
            },
            VueUiWordCloud: {
                icon: 'chartWordCloud',
                link: '/docs#vue-ui-word-cloud',
                description: translations.value.docs.tooltips.wordCloud[store.lang],
                taxinomy: ['comparisons', 'proportions', 'semantic']
            },
            VueUiGizmo: {
                icon: 'battery',
                link: '/docs#vue-ui-gizmo',
                description: translations.value.docs.tooltips.gizmo[store.lang],
                taxinomy: ['range']
            },
            VueUiStackbar: {
                icon: 'chartStackbar',
                link: '/docs#vue-ui-stackbar',
                description: translations.value.docs.tooltips.stackbarBig[store.lang],
                taxinomy: ['comparisons', 'proportions', 'partToAWhole', 'distribution', 'dataOverTime']
            },
            VueUiFunnel: {
                icon: 'chartFunnel',
                link: '/docs#vue-ui-funnel',
                description: translations.value.docs.tooltips.funnel[store.lang],
                taxinomy: ['comparisons']
            },
            VueUiHistoryPlot: {
                icon: 'chartHistoryPlot',
                link: '/docs#vue-ui-history-plot',
                description: translations.value.docs.tooltips.historyPlot[store.lang],
                taxinomy: ['comparisons', 'dataOverTime']
            }
        }
    })

    return {
        classification,
        taxinomy,
    }
}