<script setup>
import { ref, computed, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
import LinkTooltip from "../components/LinkTooltip.vue";
import DynamicTooltip from "./DynamicTooltip.vue";
import { useMainStore } from "../stores";
import Dropdown from "./Dropdown.vue";

const router = useRouter();

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath
})

const store = useMainStore();
const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const translations = computed(() => store.translations)

const isOpen = ref(window.innerWidth > 768);

onMounted(() => {
    if (window.innerWidth > 768) {
        emit('toggle', true)
    }
})

const emit = defineEmits(['toggle']);

function toggle() {
    isOpen.value = !isOpen.value;
    emit('toggle', isOpen.value);
}

function closeIfOpen(){
    if(window.innerWidth <= 768 && isOpen.value) {
        isOpen.value = false;
        emit('toggle', isOpen.value);
    }
}

function isSelected(route) {
    return currentRoute.value === route;
}

const smallMenu = ref([
    {
        route: '/docs#vue-ui-sparkline',
        icon: 'chartSparkline',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Sparkline',
        thumb: new URL('../assets/thumb_sparkline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href,
        component: 'Sparkline'
    },
    {
        route: '/docs#vue-ui-sparkbar',
        icon: 'chartSparkbar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Sparkbar',
        thumb: new URL('../assets/thumb_sparkbar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkbar_light.png', import.meta.url).href,
        component: 'Sparkbar'
    },
    {
        route: '/docs#vue-ui-sparkstackbar',
        icon: 'chartSparkStackbar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'SparkStackbar',
        thumb: new URL('../assets/thumb_stackbar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_stackbar_light.png', import.meta.url).href,
        component: 'SparkStackbar'
    },
    {
        route: '/docs#vue-ui-sparkhistogram',
        icon: 'chartSparkHistogram',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'SparkHistogram',
        thumb: new URL('../assets/thumb_histogram.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_histogram_light.png', import.meta.url).href,
        component: 'SparkHistogram'
    },
    {
        route: '/docs#vue-ui-sparkgauge',
        icon: 'chartGauge',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Sparkgauge',
        thumb: new URL('../assets/thumb_sparkgauge.png', import.meta.url).href, 
        thumbLight: new URL('../assets/thumb_sparkgauge_light.png', import.meta.url).href, 
        component: 'Sparkgauge'
    },
    {
        route: '/docs#vue-ui-spark-trend',
        icon: 'trend',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'SparkTrend',
        thumb: new URL('../assets/thumb_spark_trend.png', import.meta.url).href, 
        thumbLight: new URL('../assets/thumb_spark_trend_light.png', import.meta.url).href, 
        component: 'SparkTrend'
    },
    {
        route: '/docs#vue-ui-gizmo',
        icon: 'battery',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Gizmo',
        thumb: new URL('../assets/thumb_gizmo.png', import.meta.url).href, 
        thumbLight: new URL('../assets/thumb_gizmo_light.png', import.meta.url).href, 
        component: 'Gizmo'
    },
    {
        route: '/docs#vue-ui-quick-chart',
        icon: 'vueDataUi',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'QuickChart',
        thumb: new URL('../assets/thumb_quick_chart.png', import.meta.url).href, 
        thumbLight: new URL('../assets/thumb_quick_chart_light.png', import.meta.url).href, 
        component: 'QuickChart'
    },
    {
        route: '/docs#vue-ui-bullet',
        icon: 'chartBullet',
        cssClasses:'',
        isSelected: isSelected,
        tooltipContent: 'Bullet',
        thumb: new URL('../assets/thumb_bullet.png', import.meta.url).href, 
        thumbLight: new URL('../assets/thumb_bullet_light.png', import.meta.url).href, 
        component: 'Bullet'
    },
    {
        route: '/docs#vue-ui-xy',
        icon: 'chartLine',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Xy',
        thumb: new URL('../assets/thumb_xy.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_xy_light.png', import.meta.url).href,
        component: 'Xy'
    },
    {
        route: '/docs#vue-ui-xy-canvas',
        icon: 'chartLine',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'XyCanvas',
        thumb: new URL('../assets/thumb_xy_canvas.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_xy_canvas_light.png', import.meta.url).href,
        component: 'XyCanvas'
    },
    {
        route: '/docs#vue-ui-horizontal-bar',
        icon: 'chartVerticalBar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'HorizontalBar',
        thumb: new URL('../assets/thumb_vertical_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href,
        component: 'HorizontalBar'
    },
    {
        route: '/docs#vue-ui-parallel-coordinate-plot',
        icon: 'chartParallelCoordinatePlot',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'ParallelCoordinatePlot',
        thumb: new URL('../assets/thumb_pcp.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_pcp_light.png', import.meta.url).href,
        component: 'PCP'
    },
    {
        route: '/docs#vue-ui-flow',
        icon: 'chartFlow',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Flow',
        thumb: new URL('../assets/thumb_flow.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_flow_light.png', import.meta.url).href,
        component: 'Flow'
    },
    {
        route: '/docs#vue-ui-candlestick',
        icon: 'chartCandlestick',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Candlestick',
        thumb: new URL('../assets/thumb_candlestick.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_candlestick_light.png', import.meta.url).href,
        component: 'Candlestick'
    },
    {
        route: '/docs#vue-ui-age-pyramid',
        icon: 'chartAgePyramid',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'AgePyramid',
        thumb: new URL('../assets/thumb_age_pyramid.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_age_pyramid_light.png', import.meta.url).href,
        component: 'AgePyramid'
    },
    {
        route: '/docs#vue-ui-stackbar',
        icon: 'chartStackbar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Stackbar',
        thumb: new URL('../assets/thumb_stack_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_stack_bar_light.png', import.meta.url).href,
        component: 'Stackbar'
    },
    {
        route: '/docs#vue-ui-donut-evolution',
        icon: 'chartDonutEvolution',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'DonutEvolution',
        thumb: new URL('../assets/thumb_donut_evolution.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_donut_evolution_light.png', import.meta.url).href,
        component: 'DonutEvolution'
    },
    {
        route: '/docs#vue-ui-funnel',
        icon: 'chartFunnel',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Funnel',
        thumb: new URL('../assets/thumb_funnel.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_funnel_light.png', import.meta.url).href,
        component: 'Funnel'
    },
    {
        route: '/docs#vue-ui-history-plot',
        icon: 'chartHistoryPlot',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'HistoryPlot',
        thumb: new URL('../assets/thumb_history_plot.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_history_plot_light.png', import.meta.url).href,
        component: 'HistoryPlot'
    },
    {
        route: '/docs#vue-ui-ridgeline',
        icon: 'chartRidgeline',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Ridgeline',
        thumb: new URL('../assets/thumb_ridgeline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_ridgeline_light.png', import.meta.url).href,
        component: 'Ridgeline'
    },
    {
        route: '/docs#vue-ui-donut',
        icon: 'chartDonut',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Donut',
        thumb: new URL('../assets/thumb_donut.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_donut_light.png', import.meta.url).href,
        component: 'Donut'
    },
    {
        route: '/docs#vue-ui-nested-donuts',
        icon: 'chartNestedDonuts',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'NestedDonuts',
        thumb: new URL('../assets/thumb_nested_donuts.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_nested_donuts_light.png', import.meta.url).href,
        component: 'NestedDonuts'
    },
    {
        route: '/docs#vue-ui-waffle',
        icon: 'chartWaffle',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Waffle',
        thumb: new URL('../assets/thumb_waffle.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_waffle_light.png', import.meta.url).href,
        component: 'Waffle'
    },
    {
        route: '/docs#vue-ui-heatmap',
        icon: 'chartHeatmap',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Heatmap',
        thumb: new URL('../assets/thumb_heatmap.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href,
        component: 'Heatmap'
    },
    {
        route: '/docs#vue-ui-treemap',
        icon: 'chartTreemap',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Treemap',
        thumb: new URL('../assets/thumb_treemap.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_treemap_light.png', import.meta.url).href,
        component: 'Treemap'
    },
    {
        route: '/docs#vue-ui-rings',
        icon: 'chartRings',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Rings',
        thumb: new URL('../assets/thumb_rings.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_rings_light.png', import.meta.url).href,
        component: 'Rings'
    },
    {
        route: '/docs#vue-ui-galaxy',
        icon: 'chartGalaxy',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Galaxy',
        thumb: new URL('../assets/thumb_galaxy.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_galaxy_light.png', import.meta.url).href,
        component: 'Galaxy'
    },
    {
        route: '/docs#vue-ui-circle-pack',
        icon: 'chartCirclePack',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'CirclePack',
        thumb: new URL('../assets/thumb_circle_pack.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_circle_pack_light.png', import.meta.url).href,
        component: 'CirclePack'
    },
    {
        route: '/docs#vue-ui-chestnut',
        icon: 'chartChestnut',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Chestnut',
        thumb: new URL('../assets/thumb_chestnut.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_chestnut_light.png', import.meta.url).href,
        component: 'Chestnut'
    },
    {
        route: '/docs#vue-ui-gauge',
        icon: 'chartGauge',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Gauge',
        thumb: new URL('../assets/thumb_gauge.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_gauge_light.png', import.meta.url).href,
        component: 'Gauge'
    },
    {
        route: '/docs#vue-ui-onion',
        icon: 'chartOnion',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Onion',
        thumb: new URL('../assets/thumb_onion.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_onion_light.png', import.meta.url).href,
        component: 'Onion'
    },
    {
        route: '/docs#vue-ui-wheel',
        icon: 'chartWheel',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Wheel',
        thumb: new URL('../assets/thumb_wheel.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_wheel_light.png', import.meta.url).href,
        component: 'Wheel'
    },
    {
        route: '/docs#vue-ui-tiremarks',
        icon: 'chartTiremarks',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Tiremarks',
        thumb: new URL('../assets/thumb_tiremarks.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_tiremarks_light.png', import.meta.url).href,
        component: 'Tiremarks'
    },
    {
        route: '/docs#vue-ui-thermometer',
        icon: 'chartThermometer',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Thermometer',
        thumb: new URL('../assets/thumb_thermometer.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_thermometer_light.png', import.meta.url).href,
        component: 'Thermometer'
    },
    {
        route: '/docs#vue-ui-word-cloud',
        icon: 'chartWordCloud',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'WordCloud',
        thumb: new URL('../assets/thumb_word_cloud.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_word_cloud_light.png', import.meta.url).href,
        component: 'WordCloud'
    },
    {
        route: '/docs#vue-ui-relation-circle',
        icon: 'chartRelationCircle',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'RelationCircle',
        thumb: new URL('../assets/thumb_relation_circle.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_relation_circle_light.png', import.meta.url).href,
        component: 'RelationCircle'
    },
    {
        route: '/docs#vue-ui-chord',
        icon: 'chartChord',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Chord',
        thumb: new URL('../assets/thumb_chord.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_chord_light.png', import.meta.url).href,
        component: 'Chord'
    },
    {
        route: '/docs#vue-ui-radar',
        icon: 'chartRadar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Radar',
        thumb: new URL('../assets/thumb_radar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_radar_light.png', import.meta.url).href,
        component: 'Radar'
    },
    {
        route: '/docs#vue-ui-mood-radar',
        icon: 'chartMoodRadar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'MoodRadar',
        thumb: new URL('../assets/thumb_mood_radar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_mood_radar_light.png', import.meta.url).href,
        component: 'MoodRadar'
    },
    {
        route: '/docs#vue-ui-quadrant',
        icon: 'chartQuadrant',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Quadrant',
        thumb: new URL('../assets/thumb_quadrant.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href,
        component: 'Quadrant'
    },
    {
        route: '/docs#vue-ui-scatter',
        icon: 'chartScatter',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Scatter',
        thumb: new URL('../assets/thumb_scatter.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_scatter_light.png', import.meta.url).href,
        component: 'Scatter'
    },
    {
        route: '/docs#vue-ui-molecule',
        icon: 'chartCluster',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Molecule',
        thumb: new URL('../assets/thumb_molecule.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_molecule_light.png', import.meta.url).href,
        component: 'Molecule'
    },
    {
        route: '/docs#vue-ui-strip-plot',
        icon: 'chartStripPlot',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'StripPlot',
        thumb: new URL('../assets/thumb_strip_plot.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_strip_plot_light.png', import.meta.url).href,
        component: 'StripPlot'
    },
    {
        route: '/docs#vue-ui-dumbbell',
        icon: 'chartDumbbell',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Dumbbell',
        thumb: new URL('../assets/thumb_dumbbell.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_dumbbell_light.png', import.meta.url).href,
        component: 'Dumbbell'
    },
    {
        route: '/docs#vue-ui-world',
        icon: 'world',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'World',
        thumb: new URL('../assets/thumb_world.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_world_light.png', import.meta.url).href,
        component: 'World'
    },
    {
        route: '/docs#vue-ui-3d-bar',
        icon: 'chart3dBar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: '3dBar',
        thumb: new URL('../assets/thumb_3d_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_3d_bar_light.png', import.meta.url).href,
        component: '3dBar'
    },
    {
        route: '/docs#vue-ui-table-sparkline',
        icon: 'chartTableSparkline',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'TableSparkline',
        thumb: new URL('../assets/thumb_table_sparkline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_sparkline_light.png', import.meta.url).href,
        component: 'TableSparkline'
    },
    {
        route: '/docs#vue-ui-table-heatmap',
        icon: 'chartTable',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'TableHeatmap',
        thumb: new URL('../assets/thumb_table_heatmap.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_heatmap_light.png', import.meta.url).href,
        component: 'TableHeatmap'
    },
    {
        route: '/docs#vue-ui-table',
        icon: 'chartTable',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Table',
        thumb: new URL('../assets/thumb_table.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_light.png', import.meta.url).href,
        component: 'Table'
    },
    {
        route: '/docs#vue-ui-carousel-table',
        icon: 'carouselTable',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'CarouselTable',
        thumb: new URL('../assets/thumb_carousel_table.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_carousel_table_light.png', import.meta.url).href,
        component: 'CarouselTable'
    },
    {
        route: '/docs#vue-ui-rating',
        icon: 'star',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Rating',
        thumb: new URL('../assets/thumb_rating.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_rating_light.png', import.meta.url).href,
        component: 'Rating'
    },
    {
        route: '/docs#vue-ui-smiley',
        icon: 'smiley',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Smiley',
        thumb: new URL('../assets/thumb_smiley.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_smiley_light.png', import.meta.url).href,
        component: 'Smiley'
    },
    {
        route: '/docs#vue-ui-accordion',
        icon: 'accordion',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Accordion',
        component: 'Accordion'
    },
    {
        route: '/docs#vue-ui-skeleton',
        icon: 'skeleton',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Skeleton',
        component: 'Skeleton'
    },
    {
        route: '/docs#vue-ui-dashboard',
        icon: 'dashboard',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Dashboard',
        component: 'Dashboard'
    },
    {
        route: '/docs#vue-ui-annotator',
        icon: 'annotator',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Annotator',
        component: 'Annotator'
    },
    {
        route: '/docs#vue-ui-icon',
        icon: 'icons',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Icon',
        component: 'Icon'
    },
    {
        route: '/docs#vue-ui-digits',
        icon: 'digit8',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Digits',
        component: 'Digits'
    },
    {
        route: '/docs#vue-ui-cursor',
        icon: 'cursor',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Cursor',
        component: 'Cursor'
    },
    {
        route: '/docs#vue-ui-mini-loader',
        icon: 'chartWheel',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'MiniLoader',
        component: 'MiniLoader'
    },
    {
        route: '/docs#vue-ui-kpi',
        icon: 'kpiBox',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Kpi',
        component: 'Kpi'
    },
    {
        route: '/docs#vue-ui-timer',
        icon: 'lap',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Timer',
        component: 'Timer'
    },
    {
        route: '/docs#utility-functions',
        icon: 'func',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: '',
        component: 'Utils'
    }
])

const isTooltip = ref(false);
const tooltipContent = ref('');

function showTooltip(source) {
    isTooltip.value = true;

    if (source.route === '/docs#utility-functions') {
        tooltipContent.value = `<div>${ translations.value.utilityFunctions[store.lang] }</div>`
    } else {
        tooltipContent.value = `<div class="flex flex-center flex-col gap-2 place-items-center"><div class="flex flex-row place-items-center"><span>VueUi</span><b class="text-app-blue">${source.tooltipContent}</b></div>${source.thumb ? `<img class="h-12 max-w-[150px]" src="${isDarkMode.value ? source.thumb : source.thumbLight}">` : ''}</div>`
    }
}

function nukeTooltip() {
    isTooltip.value = false;
    tooltipContent.value = "";
}

const thisApp = computed(() => {
    return document.getElementById("app")
});

const sideMenuItems = computed(() => {
    return [
    {
        title: translations.value.sideMenu.miniCharts[store.lang],
        items: [
            { route: '/docs#vue-ui-sparkline', componentName: 'Sparkline', icon: 'chartSparkline' },
            { route: '/docs#vue-ui-sparkbar', componentName: 'Sparkbar', icon: 'chartSparkbar' },
            { route: '/docs#vue-ui-sparkstackbar', componentName: 'SparkStackbar', icon: 'chartSparkStackbar' },
            { route: '/docs#vue-ui-sparkhistogram', componentName: 'SparkHistogram', icon: 'chartSparkHistogram' },
            { route: '/docs#vue-ui-sparkgauge', componentName: 'Sparkgauge', icon: 'chartGauge' },
            { route: '/docs#vue-ui-spark-trend', componentName: 'SparkTrend', icon: 'trend' },
            { route: '/docs#vue-ui-gizmo', componentName: 'Gizmo', icon: 'battery' },
            { route: '/docs#vue-ui-kpi', componentName: 'Kpi', icon: 'kpiBox' },
        ],
        icon: 'chartSparkline'
    },
    {
        title: translations.value.sideMenu.lineAndBars[store.lang],
        items: [
            { route: '/docs#vue-ui-quick-chart', componentName: 'QuickChart', icon: 'vueDataUi' },
            {route: '/docs#vue-ui-xy', componentName: 'Xy', icon: 'chartLine' },
            {route: '/docs#vue-ui-xy-canvas', componentName: 'XyCanvas', icon: 'chartLine' },
            {route: '/docs#vue-ui-horizontal-bar', componentName: 'HorizontalBar', icon: 'chartVerticalBar' },
            {route: '/docs#vue-ui-parallel-coordinate-plot', componentName: 'ParallelCoordinatePlot', icon: 'chartParallelCoordinatePlot' },
            {route: '/docs#vue-ui-flow', componentName: 'Flow', icon: 'chartFlow' },
            {route: '/docs#vue-ui-candlestick', componentName: 'Candlestick', icon: 'chartCandlestick' },
            {route: '/docs#vue-ui-age-pyramid', componentName: 'AgePyramid', icon: 'chartAgePyramid' },
            {route: '/docs#vue-ui-stackbar', componentName: 'Stackbar', icon: 'chartStackbar' },
            {route: '/docs#vue-ui-funnel', componentName: 'Funnel', icon: 'chartFunnel' },
            {route: '/docs#vue-ui-history-plot', componentName: 'HistoryPlot', icon: 'chartHistoryPlot' },
            {route: '/docs#vue-ui-ridgeline', componentName: 'Ridgeline', icon: 'chartRidgeline' },
        ],
        icon: 'chartLine'
    },
    {
        title: translations.value.sideMenu.donuts[store.lang],
        items: [
            {route: '/docs#vue-ui-donut', componentName: 'Donut', icon: 'chartDonut' },
            {route: '/docs#vue-ui-nested-donuts', componentName: 'NestedDonuts', icon: 'chartNestedDonuts' },
            {route: '/docs#vue-ui-waffle', componentName: 'Waffle', icon: 'chartWaffle' },
            {route: '/docs#vue-ui-heatmap', componentName: 'Heatmap', icon: 'chartHeatmap' },
            {route: '/docs#vue-ui-treemap', componentName: 'Treemap', icon: 'chartTreemap' },
            {route: '/docs#vue-ui-rings', componentName: 'Rings', icon: 'chartRings' },
            {route: '/docs#vue-ui-galaxy', componentName: 'Galaxy', icon: 'chartGalaxy' },
            {route: '/docs#vue-ui-donut-evolution', componentName: 'DonutEvolution', icon: 'chartDonutEvolution' },
            {route: '/docs#vue-ui-circle-pack', componentName: 'CirclePack', icon: 'chartCirclePack'}
        ],
        icon: 'chartDonut'
    },
    {
        title: translations.value.sideMenu.gauges[store.lang],
        items: [
            {route: '/docs#vue-ui-gauge', componentName: 'Gauge', icon: 'chartGauge' },
            { route: '/docs#vue-ui-bullet', componentName: 'Bullet', icon: 'chartBullet' },
            {route: '/docs#vue-ui-onion', componentName: 'Onion', icon: 'chartOnion' },
            {route: '/docs#vue-ui-wheel', componentName: 'Wheel', icon: 'chartWheel' },
            {route: '/docs#vue-ui-tiremarks', componentName: 'Tiremarks', icon: 'chartTiremarks' },
            {route: '/docs#vue-ui-thermometer', componentName: 'Thermometer', icon: 'chartThermometer' },
            { route: '/docs#vue-ui-timer', componentName: 'Timer', icon: 'lap'}
        ],
        icon: 'chartGauge'
    },
    {
        title: translations.value.sideMenu.semantic[store.lang],
        items: [
            {route: '/docs#vue-ui-word-cloud', componentName: 'WordCloud', icon: 'chartWordCloud' },
            {route: '/docs#vue-ui-relation-circle', componentName: 'RelationCircle', icon: 'chartRelationCircle' },
            {route: '/docs#vue-ui-chord', componentName: 'Chord', icon: 'chartChord' },
        ],
        icon: 'chartWordCloud'
    },
    {
        title: translations.value.sideMenu.radars[store.lang],
        items: [
            {route: '/docs#vue-ui-radar', componentName: 'Radar', icon: 'chartRadar' },
            {route: '/docs#vue-ui-mood-radar', componentName: 'MoodRadar', icon: 'chartMoodRadar' },
        ],
        icon: 'chartRadar'
    },
    {
        title: translations.value.sideMenu.misc[store.lang],
        items: [
            {route: '/docs#vue-ui-quadrant', componentName: 'Quadrant', icon: 'chartQuadrant' },
            {route: '/docs#vue-ui-chestnut', componentName: 'Chestnut', icon: 'chartChestnut' },
            {route: '/docs#vue-ui-scatter', componentName: 'Scatter', icon: 'chartScatter' },
            {route: '/docs#vue-ui-molecule', componentName: 'Molecule', icon: 'chartCluster' },
            {route: '/docs#vue-ui-strip-plot', componentName: 'StripPlot', icon: 'chartStripPlot' },
            {route: '/docs#vue-ui-dumbbell', componentName: 'Dumbbell', icon: 'chartDumbbell' },   
            {route: '/docs#vue-ui-world', componentName: 'World', icon: 'world' },   
        ],
        icon: 'chartScatter'
    },
    {
        title: translations.value.sideMenu.charts3d[store.lang],
        items: [
            { route: '/docs#vue-ui-3d-bar', componentName: '3dBar', icon: 'chart3dBar' }
        ],
        icon:  'chart3dBar'
    },
    {
        title: translations.value.sideMenu.tables[store.lang],
        items: [
            { route: '/docs#vue-ui-table-sparkline', componentName: 'TableSparkline', icon: 'chartTableSparkline' },
            { route: '/docs#vue-ui-table-heatmap', componentName: 'TableHeatmap', icon: 'chartTable' },
            { route: '/docs#vue-ui-table', componentName: 'Table', icon: 'chartTable' },
            { route: '/docs#vue-ui-carousel-table', componentName: 'CarouselTable', icon: 'carouselTable' },
        ],
        icon: 'chartTable'
    },
    {
        title: translations.value.sideMenu.rating[store.lang],
        items: [
            { route: '/docs#vue-ui-rating', componentName: 'Rating', icon: 'star' },
            { route: '/docs#vue-ui-smiley', componentName: 'Smiley', icon: 'smiley' },
        ],
        icon: 'starFill'
    },
    {
        title: translations.value.sideMenu.utilities[store.lang],
        items: [
            { route: '/docs#vue-ui-accordion', componentName: 'Accordion', icon: 'accordion' },
            { route: '/docs#vue-ui-skeleton', componentName: 'Skeleton', icon: 'skeleton' },
            { route: '/docs#vue-ui-dashboard', componentName: 'Dashboard', icon: 'dashboard' },
            { route: '/docs#vue-ui-annotator', componentName: 'Annotator', icon: 'annotator' },
            { route: '/docs#vue-ui-icon', componentName: 'Icon', icon: 'icons' },
            { route: '/docs#vue-ui-digits', componentName: 'Digits', icon: 'digit8' },
            { route: '/docs#vue-ui-cursor', componentName: 'Cursor', icon: 'cursor' },
            { route: '/docs#vue-ui-mini-loader', componentName: 'MiniLoader', icon: 'chartWheel' },
            { route: '/docs#vue-ui-kpi', componentName: 'Kpi', icon: 'kpiBox' },
            { route: '/docs#utility-functions', componentName: translations.value.utilityFunctions[store.lang], icon: 'func' },
        ],
        icon: 'func'
    },
]
});

</script>

<template>
    <button
    class="fixed left-[282px] top-[73px] z-30 rounded-full 
        bg-gray-200 dark:bg-[#2A2A2A] 
        hover:bg-gray-100 dark:hover:bg-[#3A3A3A] 
        shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] 
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
    v-if="isOpen"
    @click="toggle"
    >
        <ChevronLeftIcon class="text-black dark:text-app-blue" />
    </button>

    <button
    class="fixed left-[42px] top-[73px] z-30 rounded-full 
        bg-gray-200 dark:bg-[#2A2A2A] 
        hover:bg-gray-100 dark:hover:bg-[#3A3A3A] 
        shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] 
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
    v-if="!isOpen"
    @click="toggle"
    >
        <ChevronRightIcon class="text-black dark:text-app-blue animate-ping sm:animate-none" />
    </button>

    <aside :class="`transition-all fixed left-0 top-[49px] ${isOpen ? 'w-[300px]' : 'w-[59px]'} h-[calc(100svh_-_114px)] bg-gray-300 dark:bg-black overflow-y-auto border-r dark:border-[#2A2A2A] p-6 shadow-2xl z-20`">
    <template v-if="isOpen">
        <div class="mt-8 flex flex-col gap-3">
            <RouterLink to="/universal-component">
                <button :class="`w-full py-2 rounded-full text-center relative text-sm shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] ${router.currentRoute.value.fullPath === '/universal-component' ? isDarkMode ? `bg-gradient-to-r from-[#5f8aee50] to-[#5f8aee20] shadow` : 'bg-app-blue-light' : 'bg-gray-200 dark:bg-[#242424]'}`">

                    <div class="flex flex-row place-items-center justify-center gap-4">
                        <VueUiIcon name="vueDataUi" :stroke="`${router.currentRoute.value.fullPath === '/universal-component' ? isDarkMode ? '#83a4f2' : '#5f8aee' : '#6A6A6A'}`"/>
                        <div style="white-space: nowrap;" :class="`${router.currentRoute.value.fullPath === '/universal-component' ? 'font-inter-medium' : ''}`">
                            Universal component
                        </div>
                    </div>
                </button>
                <div class="w-full mt-6 mb-2 border-b border-gray-500 dark:border-[#3A3A3A]"></div>
            </RouterLink>

            <Dropdown
                v-for="(menu, i) in sideMenuItems"
                :open="menu.items.some(item => item.route === router.currentRoute.value.fullPath)"
                :title="menu.title"
                :items="menu.items"
                :icon="menu.icon"
                @close="closeIfOpen"
            />
        </div>
    </template>
    <template v-else>
        <LinkTooltip 
            v-for="(lt, i) in smallMenu"
            :index="i"
            v-bind="lt"
            @mouseenter="() => showTooltip(lt)"
            @mouseleave="nukeTooltip"
        />
    </template>
    </aside>
    <DynamicTooltip
        v-if="isTooltip"
        :content="tooltipContent"
        :parent="thisApp"
        :show="true"
        :backgroundColor="isDarkMode ? 'rgb(35,35,35)' : 'rgb(243,244, 246)'"
        :color="isDarkMode ? '#CCCCCC' : '#1A1A1A'"
        maxWidth="400px"
    />
</template>