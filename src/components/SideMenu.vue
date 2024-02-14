<script setup>
import { ref, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, CaretRightIcon, LayoutDashboardIcon, EditIcon, PlaystationCircleIcon, ChartDotsIcon, WashDryIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
import LinkTooltip from "../components/LinkTooltip.vue";
import DynamicTooltip from "./DynamicTooltip.vue";
import { useMainStore } from "../stores";

const router = useRouter();

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath
})

const store = useMainStore();
const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const isOpen = ref(window.innerWidth > 768);

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

function scrollToTop() {
    window.scrollTo({ top: 0});
}

const smallMenu = ref([
    {
        route: '/docs#vue-ui-xy',
        icon: 'chartLine',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Xy',
        thumb: new URL('../assets/thumb_xy.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_xy_light.png', import.meta.url).href
    },
    {
        route: '/docs#vue-ui-donut',
        icon: 'chartDonut',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Donut',
        thumb: new URL('../assets/thumb_donut.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_donut_light.png', import.meta.url).href
    },
    {
        route: '/docs#vue-ui-waffle',
        icon: 'chartWaffle',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Waffle',
        thumb: new URL('../assets/thumb_waffle.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_waffle_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-radar',
        icon: 'chartRadar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Radar',
        thumb: new URL('../assets/thumb_radar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_radar_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-quadrant',
        icon: 'chartQuadrant',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Quadrant',
        thumb: new URL('../assets/thumb_quadrant.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href
    },
    {
        route: '/docs#vue-ui-gauge',
        icon: 'chartGauge',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Gauge',
        thumb: new URL('../assets/thumb_gauge.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_gauge_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-wheel',
        icon: 'chartWheel',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Wheel',
        thumb: new URL('../assets/thumb_wheel.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_wheel_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-tiremarks',
        icon: 'chartTiremarks',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Tiremarks',
        thumb: new URL('../assets/thumb_tiremarks.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_tiremarks_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-chestnut',
        icon: 'chartChestnut',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Chestnut',
        thumb: new URL('../assets/thumb_chestnut.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_chestnut_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-onion',
        icon: 'chartOnion',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Onion',
        thumb: new URL('../assets/thumb_onion.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_onion_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-vertical-bar',
        icon: 'chartVerticalBar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VerticalBar',
        thumb: new URL('../assets/thumb_vertical_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-heatmap',
        icon: 'chartHeatmap',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Heatmap',
        thumb: new URL('../assets/thumb_heatmap.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-scatter',
        icon: 'chartScatter',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Scatter',
        thumb: new URL('../assets/thumb_scatter.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_scatter_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-candlestick',
        icon: 'chartCandlestick',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Candlestick',
        thumb: new URL('../assets/thumb_candlestick.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_candlestick_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-age-pyramid',
        icon: 'chartAgePyramid',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'AgePyramid',
        thumb: new URL('../assets/thumb_age_pyramid.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_age_pyramid_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-relation-circle',
        icon: 'chartRelationCircle',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'RelationCircle',
        thumb: new URL('../assets/thumb_relation_circle.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_relation_circle_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-thermometer',
        icon: 'chartThermometer',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Thermometer',
        thumb: new URL('../assets/thumb_thermometer.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_thermometer_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-rings',
        icon: 'chartRings',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Rings',
        thumb: new URL('../assets/thumb_rings.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_rings_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-donut-evolution',
        icon: 'chartDonutEvolution',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'DonutEvolution',
        thumb: new URL('../assets/thumb_donut_evolution.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_donut_evolution_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-mood-radar',
        icon: 'chartMoodRadar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'MoodRadar',
        thumb: new URL('../assets/thumb_mood_radar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_mood_radar_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-molecule',
        icon: 'chartCluster',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Molecule',
        thumb: new URL('../assets/thumb_molecule.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_molecule_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-sparkline',
        icon: 'chartLine',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Sparkline',
        thumb: new URL('../assets/thumb_sparkline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-sparkbar',
        icon: 'chartVerticalBar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Sparkbar',
        thumb: new URL('../assets/thumb_sparkbar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkbar_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-sparkstackbar',
        icon: 'chartSparkStackbar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'SparkStackbar',
        thumb: new URL('../assets/thumb_stackbar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_stackbar_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-sparkhistogram',
        icon: 'chartSparkHistogram',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'SparkHistogram',
        thumb: new URL('../assets/thumb_histogram.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_histogram_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-3d-bar',
        icon: 'chart3dBar',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: '3dBar',
        thumb: new URL('../assets/thumb_3d_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_3d_bar_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-table-sparkline',
        icon: 'chartTable',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'TableSparkline',
        thumb: new URL('../assets/thumb_table_sparkline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_sparkline_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-table',
        icon: 'chartTable',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Table',
        thumb: new URL('../assets/thumb_table.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-rating',
        icon: 'star',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Rating',
        thumb: new URL('../assets/thumb_rating.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_rating_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-smiley',
        icon: 'smiley',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Smiley',
        thumb: new URL('../assets/thumb_smiley.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_smiley_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-screenshot',
        icon: 'screenshot',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Screenshot',
    },
    {
        route: '/docs#vue-ui-skeleton',
        icon: 'skeleton',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Skeleton',
    },
    {
        route: '/docs#vue-ui-dashboard',
        icon: 'dashboard',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Dashboard',
    },
    {
        route: '/docs#vue-ui-annotator',
        icon: 'annotator',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Annotator',
    },
    {
        route: '/docs#vue-ui-icon',
        icon: 'smiley',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Icon',
    },
    {
        route: '/docs#vue-ui-digits',
        icon: 'digit8',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Digits',
    },
    {
        route: '/docs#vue-ui-mini-loader',
        icon: 'chartWheel',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'MiniLoader',
    },
])

const isTooltip = ref(false);
const tooltipContent = ref('');

function showTooltip(source) {
    isTooltip.value = true;
    tooltipContent.value = `<div class="flex flex-center flex-col gap-2 place-items-center"><div class="flex flex-row place-items-center"><span>VueUi</span><b class="text-app-blue">${source.tooltipContent}</b></div>${source.thumb ? `<img class="h-12 max-w-[150px]" src="${isDarkMode.value ? source.thumb : source.thumbLight}">` : ''}</div>`
}

function nukeTooltip() {
    isTooltip.value = false;
    tooltipContent.value = "";
}

const thisApp = computed(() => {
    return document.getElementById("app")
})

</script>

<template>
    <aside :class="`transition-all fixed left-0 top-[49px] ${isOpen ? 'w-[300px]' : 'w-[59px]'} h-[calc(100svh_-_49px)] bg-gray-200 dark:bg-black overflow-y-auto border-r border-gray-700 p-6`">
    <button class="absolute right-4 top-4" v-if="isOpen" @click="toggle">
        <ChevronLeftIcon class="text-black dark:text-app-green"/>
    </button>
    <button class="absolute top-5 left-1/2 -translate-x-1/2" v-if="!isOpen" @click="toggle">
        <ChevronRightIcon class="text-black dark:text-app-green animate-ping sm:animate-none"/>
    </button>
    <template v-if="isOpen">
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Charts</div>
            <router-link to="/docs#vue-ui-xy" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-xy') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-xy')" class="-ml-6"/> <VueUiIcon :size="18" name="chartLine" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-xy')"/> <span class="text-gray-500">VueUi</span>Xy</div>
            </router-link>
            <router-link to="/docs#vue-ui-donut" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-donut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-donut')" class="-ml-6"/> <VueUiIcon :size="18" name="chartDonut" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-donut')"/>  <span class="text-gray-500">VueUi</span>Donut</div>
            </router-link>
            <router-link to="/docs#vue-ui-waffle" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-waffle') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-waffle')" class="-ml-6"/><VueUiIcon :size="18" name="chartWaffle" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-waffle')"/>  <span class="text-gray-500">VueUi</span>Waffle</div>
            </router-link>
            <router-link to="/docs#vue-ui-radar" @click="scrollToTop" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-radar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-radar')" class="-ml-6"/><VueUiIcon :size="18" name="chartRadar" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-radar')"/> <span class="text-gray-500">VueUi</span>Radar</div>
            </router-link>
            <router-link to="/docs#vue-ui-quadrant" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-quadrant') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-quadrant')" class="-ml-6"/><VueUiIcon :size="18" name="chartQuadrant" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-quadrant')"/>  <span class="text-gray-500">VueUi</span>Quadrant</div>
            </router-link>
            <router-link to="/docs#vue-ui-gauge" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-gauge') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-gauge')" class="-ml-6"/><VueUiIcon :size="18" name="chartGauge" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-gauge')"/>  <span class="text-gray-500">VueUi</span>Gauge</div>
            </router-link>
            <router-link to="/docs#vue-ui-wheel" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-wheel') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-wheel')" class="-ml-6"/><VueUiIcon :size="18" name="chartWheel" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-wheel')"/>  <span class="text-gray-500">VueUi</span>Wheel</div>
            </router-link>
            <router-link to="/docs#vue-ui-tiremarks" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-tiremarks') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-tiremarks')" class="-ml-6"/><VueUiIcon :size="18" name="chartTiremarks" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-tiremarks')"/>  <span class="text-gray-500">VueUi</span>Tiremarks</div>
            </router-link>
            <router-link to="/docs#vue-ui-chestnut" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-chestnut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-chestnut')" class="-ml-6"/><VueUiIcon :size="18" name="chartChestnut" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-chestnut')"/>  <span class="text-gray-500">VueUi</span>Chestnut</div>
            </router-link>
            <router-link to="/docs#vue-ui-onion" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-onion') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-onion')" class="-ml-6"/><VueUiIcon :size="18" name="chartOnion" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-onion')"/>  <span class="text-gray-500">VueUi</span>Onion</div>
            </router-link>
            <router-link to="/docs#vue-ui-vertical-bar" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-vertical-bar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-vertical-bar')" class="-ml-6"/><VueUiIcon :size="18" name="chartVerticalBar" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-vertical-bar')"/>  <span class="text-gray-500">VueUi</span>VerticalBar</div>
            </router-link>
            <router-link to="/docs#vue-ui-heatmap" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-heatmap') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-heatmap')" class="-ml-6"/><VueUiIcon :size="18" name="chartHeatmap" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-heatmap')"/>  <span class="text-gray-500">VueUi</span>Heatmap</div>
            </router-link>
            <router-link to="/docs#vue-ui-scatter" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-scatter') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-scatter')" class="-ml-6"/><VueUiIcon :size="18" name="chartScatter" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-scatter')"/>  <span class="text-gray-500">VueUi</span>Scatter</div>
            </router-link>
            <router-link to="/docs#vue-ui-candlestick" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-candlestick') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-candlestick')" class="-ml-6"/><VueUiIcon :size="18" name="chartCandlestick" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-candlestick')"/>  <span class="text-gray-500">VueUi</span>Candlestick</div>
            </router-link>
            <router-link to="/docs#vue-ui-age-pyramid" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-age-pyramid') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-age-pyramid')" class="-ml-6"/><VueUiIcon :size="18" name="chartAgePyramid" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-age-pyramid')"/>  <span class="text-gray-500">VueUi</span>AgePyramid</div>
            </router-link>
            <router-link to="/docs#vue-ui-relation-circle" @click="scrollToTop" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-relation-circle') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-relation-circle')" class="-ml-6"/><VueUiIcon :size="18" name="chartRelationCircle" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-relation-circle')"/>  <span class="text-gray-500">VueUi</span>RelationCircle</div>
            </router-link>
            <router-link to="/docs#vue-ui-thermometer" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-thermometer') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-thermometer')" class="-ml-6"/><VueUiIcon :size="18" name="chartThermometer" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-thermometer')"/>  <span class="text-gray-500">VueUi</span>Thermometer</div>
            </router-link>
            <router-link to="/docs#vue-ui-rings" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-rings') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-rings')" class="-ml-6"/><VueUiIcon :size="18" name="chartRings" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-rings')"/>  <span class="text-gray-500">VueUi</span>Rings</div>
            </router-link>
            <router-link to="/docs#vue-ui-donut-evolution" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-donut-evolution') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-donut-evolution')" class="-ml-6"/><VueUiIcon :size="18" name="chartDonutEvolution" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-donut-evolution')"/>  <span class="text-gray-500">VueUi</span>DonutEvolution</div>
            </router-link>
            <router-link to="/docs#vue-ui-mood-radar" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-mood-radar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-mood-radar')" class="-ml-6"/><VueUiIcon :size="18" name="chartMoodRadar" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-mood-radar')"/>  <span class="text-gray-500">VueUi</span>MoodRadar</div>
            </router-link>
            <router-link to="/docs#vue-ui-molecule" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-molecule') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-molecule')" class="-ml-6"/><VueUiIcon :size="18" name="chartCluster" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-molecule')"/>  <span class="text-gray-500">VueUi</span>Molecule</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Mini charts</div>
            <router-link to="/docs#vue-ui-sparkline" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkline') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkline')" class="-ml-6"/><VueUiIcon :size="18" name="chartLine" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-sparkline')"/>  <span class="text-gray-500">VueUi</span>Sparkline</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkbar" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkbar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkbar')" class="-ml-6"/><VueUiIcon :size="18" name="chartVerticalBar" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-sparkbar')"/>  <span class="text-gray-500">VueUi</span>Sparkbar</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkstackbar" @click="scrollToTop" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkstackbar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkstackbar')" class="-ml-6"/><VueUiIcon :size="18" name="chartSparkStackbar" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-sparkstackbar')"/>  <span class="text-gray-500">VueUi</span>SparkStackbar</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkhistogram" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkhistogram') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkhistogram')" class="-ml-6"/><VueUiIcon :size="18" name="chartSparkHistogram" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-sparkhistogram')"/>  <span class="text-gray-500">VueUi</span>SparkHistogram</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">3d charts</div>
            <router-link to="/docs#vue-ui-3d-bar" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-3d-bar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-3d-bar')" class="-ml-6"/><VueUiIcon :size="18" name="chart3dBar" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-3d-bar')"/>  <span class="text-gray-500">VueUi</span>3dBar</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Tables</div>
            <router-link to="/docs#vue-ui-table-sparkline" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-table-sparkline') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-table-sparkline')" class="-ml-6"/><VueUiIcon :size="18" name="chartTable" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-table-sparkline')"/>  <span class="text-gray-500">VueUi</span>TableSparkline</div>
            </router-link>
            <router-link to="/docs#vue-ui-table" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-table') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-table')" class="-ml-6"/><VueUiIcon :size="18" name="chartTable" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-table')"/>  <span class="text-gray-500">VueUi</span>Table</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Rating</div>
            <router-link to="/docs#vue-ui-rating" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-rating') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-rating')" class="-ml-6"/><VueUiIcon :size="18" name="star" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-rating')"/>  <span class="text-gray-500">VueUi</span>Rating</div>
            </router-link>
            <router-link to="/docs#vue-ui-smiley" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-smiley') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-smiley')" class="-ml-6"/><VueUiIcon :size="18" name="smiley" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-smiley')"/>  <span class="text-gray-500">VueUi</span>Smiley</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Utilities</div>
            <router-link to="/docs#vue-ui-screenshot" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-screenshot') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-screenshot')" class="-ml-6"/><VueUiIcon :size="18" name="screenshot" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-screenshot')"/>  <span class="text-gray-500">VueUi</span>Screenshot</div>
            </router-link>
            <router-link to="/docs#vue-ui-skeleton" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-skeleton') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-skeleton')" class="-ml-6"/><VueUiIcon :size="18" name="skeleton" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-skeleton')"/>  <span class="text-gray-500">VueUi</span>Skeleton</div>
            </router-link>
            <router-link to="/docs#vue-ui-dashboard" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-dashboard') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-dashboard')" class="-ml-6"/><VueUiIcon :size="18" name="dashboard" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-dashboard')"/>  <span class="text-gray-500">VueUi</span>Dashboard</div>
            </router-link>
            <router-link to="/docs#vue-ui-annotator" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-annotator') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-annotator')" class="-ml-6"/><VueUiIcon :size="18" name="annotator" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-annotator')"/>  <span class="text-gray-500">VueUi</span>Annotator</div>
            </router-link>
            <router-link to="/docs#vue-ui-icon" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-icon') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-icon')" class="-ml-6"/><VueUiIcon :size="18" name="smiley" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-icon')"/>  <span class="text-gray-500">VueUi</span>Icon</div>
            </router-link>
            <router-link to="/docs#vue-ui-digits" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-digits') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-digits')" class="-ml-6"/><VueUiIcon :size="18" name="digit8" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-digits')"/>  <span class="text-gray-500">VueUi</span>Digits</div>
            </router-link>
            <router-link to="/docs#vue-ui-mini-loader" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-mini-loader') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-mini-loader')" class="-ml-6"/><VueUiIcon :size="18" name="chartWheel" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" v-if="!isSelected('/docs#vue-ui-mini-loader')"/>  <span class="text-gray-500">VueUi</span>MiniLoader</div>
            </router-link>
        </section>
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