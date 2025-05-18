<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import { adaptColorToBackground } from "../maker/lib";

const store = useMainStore()
const translations = computed(() => store.translations)
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
    return {
        userOptions: {
            show: false,
        },
        style: {
            chart: {
                backgroundColor: 'transparent', 
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                tooltip: { show: false },
                links: {
                    stroke:isDarkMode.value ? '#3A3A3A' : '#CCCCCC'
                },
                nodes: {
                    stroke: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                    strokeHovered: isDarkMode.value ? '#8A8A8A' : '#6A6A6A'
                }
            }
        }
    }
})

const dataset = ref([
    {
        name: '',
        details: '',
        icon: 'vueDataUi',
        nodes: [
            {
                name: translations.value.sideMenu.lineAndBars[store.lang],
                details: '',
                nodes: [
                    { route: '/docs#vue-ui-quick-chart', name: 'QuickChart', icon: 'vueDataUi' },
                    { route: '/docs#vue-ui-xy', name: 'Xy', icon: 'chartLine' },
                    { route: '/docs#vue-ui-xy-canvas', name: 'XyCanvas', icon: 'chartLine' },
                    { route: '/docs#vue-ui-vertical-bar', name: 'VerticalBar', icon: 'chartVerticalBar' },
                    { route: '/docs#vue-ui-parallel-coordinate-plot', name: 'ParallelCoordinatePlot', icon: 'chartParallelCoordinatePlot' },
                    { route: '/docs#vue-ui-flow', name: 'Flow', icon: 'chartFlow' },
                    { route: '/docs#vue-ui-candlestick', name: 'Candlestick', icon: 'chartCandlestick' },
                    { route: '/docs#vue-ui-age-pyramid', name: 'AgePyramid', icon: 'chartAgePyramid' },
                    { route: '/docs#vue-ui-stackbar', name: 'Stackbar', icon: 'chartStackbar' },
                    { route: '/docs#vue-ui-donut-evolution', name: 'DonutEvolution', icon: 'chartDonutEvolution' },
                    { route: '/docs#vue-ui-funnel', name: 'Funnel', icon: 'chartFunnel' },
                    { route: '/docs#vue-ui-history-plot', name: 'HistoryPlot', icon: 'chartHistoryPlot' },
                    { route: '/docs#vue-ui-3d-bar', name: '3dBar', icon: 'chart3dBar' }
                ],
                icon: 'chartLine'
            },
            {
                name: translations.value.sideMenu.tables[store.lang],
                nodes: [
                    { route: '/docs#vue-ui-table-sparkline', name: 'TableSparkline', icon: 'chartTableSparkline' },
                    { route: '/docs#vue-ui-table-heatmap', name: 'TableHeatmap', icon: 'chartTable' },
                    { route: '/docs#vue-ui-table', name: 'Table', icon: 'chartTable' },
                    { route: '/docs#vue-ui-carousel-table', name: 'CarouselTable', icon: 'carouselTable' }
                ],
                icon: 'chartTable'
            },
            {
                name: translations.value.sideMenu.donuts[store.lang],
                details: '',
                nodes: [
                    { route: '/docs#vue-ui-donut', name: 'Donut', icon: 'chartDonut' },
                    { route: '/docs#vue-ui-nested-donuts', name: 'NestedDonuts', icon: 'chartNestedDonuts' },
                    { route: '/docs#vue-ui-waffle', name: 'Waffle', icon: 'chartWaffle' },
                    { route: '/docs#vue-ui-heatmap', name: 'Heatmap', icon: 'chartHeatmap' },
                    { route: '/docs#vue-ui-treemap', name: 'Treemap', icon: 'chartTreemap' },
                    { route: '/docs#vue-ui-rings', name: 'Rings', icon: 'chartRings' },
                    { route: '/docs#vue-ui-galaxy', name: 'Galaxy', icon: 'chartGalaxy' },
                    { route: '/docs#vue-ui-donut-evolution', name: 'DonutEvolution', icon: 'chartDonutEvolution' },
                    { route: '/docs#vue-ui-chestnut', name: 'Chestnut', icon: 'chartChestnut' },
                    { route: '/docs#vue-ui-circle-pack', name: 'CirclePack', icon: 'chartCirclePack' }
                ],
                icon: 'chartDonut'
            },
            {
                name: translations.value.sideMenu.gauges[store.lang],
                details: '',
                nodes: [
                    { route: '/docs#vue-ui-gauge', name: 'Gauge', icon: 'chartGauge' },
                    { route: '/docs#vue-ui-bullet', name: 'Bullet', icon: 'chartBullet' },
                    { route: '/docs#vue-ui-onion', name: 'Onion', icon: 'chartOnion' },
                    { route: '/docs#vue-ui-wheel', name: 'Wheel', icon: 'chartWheel' },
                    { route: '/docs#vue-ui-tiremarks', name: 'Tiremarks', icon: 'chartTiremarks' },
                    { route: '/docs#vue-ui-thermometer', name: 'Thermometer', icon: 'chartThermometer' },
                    { route: '/docs#vue-ui-timer', name: 'Timer', icon: 'lap' }
                ],
                icon: 'chartGauge'
            },
            {
                name: translations.value.sideMenu.miniCharts[store.lang],
                details: '',
                nodes: [
                    { route: '/docs#vue-ui-sparkline', name: 'Sparkline', icon: 'chartSparkline' },
                    { route: '/docs#vue-ui-sparkbar', name: 'Sparkbar', icon: 'chartSparkbar' },
                    { route: '/docs#vue-ui-sparkstackbar', name: 'SparkStackbar', icon: 'chartSparkStackbar' },
                    { route: '/docs#vue-ui-sparkhistogram', name: 'SparkHistogram', icon: 'chartSparkHistogram' },
                    { route: '/docs#vue-ui-sparkgauge', name: 'Sparkgauge', icon: 'chartGauge' },
                    { route: '/docs#vue-ui-spark-trend', name: 'SparkTrend', icon: 'trend' },
                    { route: '/docs#vue-ui-gizmo', name: 'Gizmo', icon: 'battery' },
                    { route: '/docs#vue-ui-quick-chart', name: 'QuickChart', icon: 'vueDataUi' },
                    { route: '/docs#vue-ui-kpi', name: 'Kpi', icon: 'kpiBox' },
                    { route: '/docs#vue-ui-bullet', name: 'Bullet', icon: 'chartBullet' }
                ],
                icon: 'chartSparkline'
            },
            {
                name: translations.value.sideMenu.misc[store.lang],
                nodes: [
                    { route: '/docs#vue-ui-quadrant', name: 'Quadrant', icon: 'chartQuadrant' },
                    { route: '/docs#vue-ui-chestnut', name: 'Chestnut', icon: 'chartChestnut' },
                    { route: '/docs#vue-ui-scatter', name: 'Scatter', icon: 'chartScatter' },
                    { route: '/docs#vue-ui-molecule', name: 'Molecule', icon: 'chartCluster' },
                    { route: '/docs#vue-ui-strip-plot', name: 'StripPlot', icon: 'chartStripPlot' },
                    { route: '/docs#vue-ui-dumbbell', name: 'Dumbbell', icon: 'chartDumbbell' },
                    { route: '/docs#vue-ui-word-cloud', name: 'WordCloud', icon: 'chartWordCloud' },
                    { route: '/docs#vue-ui-relation-circle', name: 'RelationCircle', icon: 'chartRelationCircle' },
                    { route: '/docs#vue-ui-radar', name: 'Radar', icon: 'chartRadar' },
                    { route: '/docs#vue-ui-mood-radar', name: 'MoodRadar', icon: 'chartMoodRadar' },
                    { route: '/docs#vue-ui-rating', name: 'Rating', icon: 'star' },
                    { route: '/docs#vue-ui-smiley', name: 'Smiley', icon: 'smiley' }
                ],
                icon: 'chartScatter'
            },
            {
                name: translations.value.sideMenu.utilities[store.lang],
                nodes: [
                    { route: '/docs#vue-ui-accordion', name: 'Accordion', icon: 'accordion' },
                    { route: '/docs#vue-ui-skeleton', name: 'Skeleton', icon: 'skeleton' },
                    { route: '/docs#vue-ui-dashboard', name: 'Dashboard', icon: 'dashboard' },
                    { route: '/docs#vue-ui-annotator', name: 'Annotator', icon: 'annotator' },
                    { route: '/docs#vue-ui-icon', name: 'Icon', icon: 'smiley' },
                    { route: '/docs#vue-ui-digits', name: 'Digits', icon: 'digit8' },
                    { route: '/docs#vue-ui-cursor', name: 'Cursor', icon: 'cursor' },
                    { route: '/docs#vue-ui-mini-loader', name: 'MiniLoader', icon: 'chartWheel' },
                    { route: '/docs#vue-ui-kpi', name: 'Kpi', icon: 'kpiBox' },
                    { route: '/docs#utility-functions', name: translations.value.utilityFunctions[store.lang], icon: 'func' }
                ],
                icon: 'func'
            },
        ],
    },
])

function selectNode(node) {
    console.log(node)
}

</script>

<template>
    <div class="w-full">
        <VueUiMolecule :dataset="dataset" :config="config" @selectNode="selectNode">
            <template #node="{ node }">
                <RouterLink v-if="node.route" :to="node.route">
                    <div class="h-full w-full flex place-items-center justify-center" style="padding: 20%">
                        <VueUiIcon size="100%" :name="node.icon" :stroke="adaptColorToBackground(node.color)" />
                    </div>
                </RouterLink>
                <div v-else class="h-full w-full flex place-items-center justify-center" style="padding: 20%">
                    <VueUiIcon v-if="node.icon !== 'vueDataUi'" size="100%" :name="node.icon" :stroke="adaptColorToBackground(node.color)" />
                    <img v-else data-cy="app-logo" src="../../assets/logo3.png" alt="vue data ui logo" class="mx-auto drop-shadow-xl logo-shape">
                </div>
            </template>
        </VueUiMolecule>
    </div>
</template>