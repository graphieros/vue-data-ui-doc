<script setup>
import { ref, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, CaretRightIcon, ChartHistogramIcon, ChartDonut3Icon, LayoutGridIcon, ChartRadarIcon, PlusIcon, GaugeIcon, ScreenshotIcon, ChartBarIcon, ChartArcs3Icon, ChartBubbleIcon, ChartCandleIcon, PyramidIcon, ChartLineIcon, TableIcon, StarIcon, SkullIcon, BinaryTree2Icon, LayoutDashboardIcon, EditIcon, MoodSmileIcon, CircleTriangleIcon, TemperatureIcon, PlaystationCircleIcon, LoaderIcon, Tallymark4Icon, ChartDotsIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
import LinkTooltip from "../components/LinkTooltip.vue";

const router = useRouter();

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath
})

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
        icon: 'ChartHistogramIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiXy',
    },
    {
        route: '/docs#vue-ui-donut',
        icon: 'ChartDonut3Icon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiDonut',
    },
    {
        route: '/docs#vue-ui-waffle',
        icon: 'LayoutGridIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiWaffle',
    },
    {
        route: '/docs#vue-ui-radar',
        icon: 'ChartRadarIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiRadar',
    },
    {
        route: '/docs#vue-ui-quadrant',
        icon: 'PlusIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiQuadrant',
    },
    {
        route: '/docs#vue-ui-gauge',
        icon: 'GaugeIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiGauge',
    },
    {
        route: '/docs#vue-ui-wheel',
        icon: 'LoaderIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiWheel',
    },
    {
        route: '/docs#vue-ui-tiremarks',
        icon: 'Tallymark4Icon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiTiremarks',
    },
    {
        route: '/docs#vue-ui-chestnut',
        icon: 'BinaryTree2Icon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiChestnut',
    },
    {
        route: '/docs#vue-ui-onion',
        icon: 'ChartArcs3Icon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiOnion',
    },
    {
        route: '/docs#vue-ui-vertical-bar',
        icon: 'ChartBarIcon',
        cssClasses: 'rotate-90',
        isSelected: isSelected,
        tooltipContent: 'VueUiVerticalBar',
    },
    {
        route: '/docs#vue-ui-heatmap',
        icon: 'LayoutGridIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiHeatmap',
    },
    {
        route: '/docs#vue-ui-scatter',
        icon: 'ChartBubbleIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiScatter',
    },
    {
        route: '/docs#vue-ui-candlestick',
        icon: 'ChartCandleIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiCandlestick',
    },
    {
        route: '/docs#vue-ui-age-pyramid',
        icon: 'PyramidIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiAgePyramid',
    },
    {
        route: '/docs#vue-ui-relation-circle',
        icon: 'CircleTriangleIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiRelationCircle',
    },
    {
        route: '/docs#vue-ui-thermometer',
        icon: 'TemperatureIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiThermometer',
    },
    {
        route: '/docs#vue-ui-rings',
        icon: 'PlaystationCircleIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiRings',
    },
    {
        route: '/docs#vue-ui-donut-evolution',
        icon: 'ChartDotsIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiDonutEvolution',
    },
    {
        route: '/docs#vue-ui-sparkline',
        icon: 'ChartLineIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiSparkline',
    },
    {
        route: '/docs#vue-ui-sparkbar',
        icon: 'ChartBarIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiSparkbar',
    },
    {
        route: '/docs#vue-ui-sparkstackbar',
        icon: 'ChartBarIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiSparkStackbar',
    },
    {
        route: '/docs#vue-ui-sparkhistogram',
        icon: 'ChartBarIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiSparkHistogram',
    },
    {
        route: '/docs#vue-ui-table',
        icon: 'TableIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiTable',
    },
    {
        route: '/docs#vue-ui-rating',
        icon: 'StarIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiRating',
    },
    {
        route: '/docs#vue-ui-smiley',
        icon: 'MoodSmileIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiSmiley',
    },
    {
        route: '/docs#vue-ui-screenshot',
        icon: 'ScreenshotIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiScreenshot',
    },
    {
        route: '/docs#vue-ui-skeleton',
        icon: 'SkullIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiSkeleton',
    },
    {
        route: '/docs#vue-ui-dashboard',
        icon: 'LayoutDashboardIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiDashboard',
    },
    {
        route: '/docs#vue-ui-annotator',
        icon: 'EditIcon',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'VueUiAnnotator',
    },
])

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
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-xy') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-xy')" class="-ml-6"/> <ChartHistogramIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-xy')"/> <span class="text-gray-500">VueUi</span>Xy</div>
            </router-link>
            <router-link to="/docs#vue-ui-donut" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-donut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-donut')" class="-ml-6"/> <ChartDonut3Icon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-donut')"/> <span class="text-gray-500">VueUi</span>Donut</div>
            </router-link>
            <router-link to="/docs#vue-ui-waffle" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-waffle') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-waffle')" class="-ml-6"/><LayoutGridIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-waffle')"/> <span class="text-gray-500">VueUi</span>Waffle</div>
            </router-link>
            <router-link to="/docs#vue-ui-radar" @click="scrollToTop" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-radar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-radar')" class="-ml-6"/><ChartRadarIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-radar')"/> <span class="text-gray-500">VueUi</span>Radar</div>
            </router-link>
            <router-link to="/docs#vue-ui-quadrant" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-quadrant') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-quadrant')" class="-ml-6"/><PlusIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-quadrant')"/>  <span class="text-gray-500">VueUi</span>Quadrant</div>
            </router-link>
            <router-link to="/docs#vue-ui-gauge" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-gauge') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-gauge')" class="-ml-6"/><GaugeIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-gauge')"/>  <span class="text-gray-500">VueUi</span>Gauge</div>
            </router-link>
            <router-link to="/docs#vue-ui-wheel" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-wheel') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-wheel')" class="-ml-6"/><LoaderIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-wheel')"/>  <span class="text-gray-500">VueUi</span>Wheel</div>
            </router-link>
            <router-link to="/docs#vue-ui-tiremarks" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-tiremarks') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-tiremarks')" class="-ml-6"/><Tallymark4Icon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-tiremarks')"/>  <span class="text-gray-500">VueUi</span>Tiremarks</div>
            </router-link>
            <router-link to="/docs#vue-ui-chestnut" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-chestnut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-chestnut')" class="-ml-6"/><BinaryTree2Icon class="text-gray-800 dark:text-gray-400 -rotate-90" stroke-width="1" v-if="!isSelected('/docs#vue-ui-chestnut')"/>  <span class="text-gray-500">VueUi</span>Chestnut</div>
            </router-link>
            <router-link to="/docs#vue-ui-onion" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-onion') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-onion')" class="-ml-6"/><ChartArcs3Icon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-onion')"/>  <span class="text-gray-500">VueUi</span>Onion</div>
            </router-link>
            <router-link to="/docs#vue-ui-vertical-bar" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-vertical-bar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-vertical-bar')" class="-ml-6"/><ChartBarIcon class="text-gray-800 dark:text-gray-400 rotate-90" stroke-width="1" v-if="!isSelected('/docs#vue-ui-vertical-bar')"/>  <span class="text-gray-500">VueUi</span>VerticalBar</div>
            </router-link>
            <router-link to="/docs#vue-ui-heatmap" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-heatmap') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-heatmap')" class="-ml-6"/><LayoutGridIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-heatmap')"/>  <span class="text-gray-500">VueUi</span>Heatmap</div>
            </router-link>
            <router-link to="/docs#vue-ui-scatter" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-scatter') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-scatter')" class="-ml-6"/><ChartBubbleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-scatter')"/>  <span class="text-gray-500">VueUi</span>Scatter</div>
            </router-link>
            <router-link to="/docs#vue-ui-candlestick" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-candlestick') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-candlestick')" class="-ml-6"/><ChartCandleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-candlestick')"/>  <span class="text-gray-500">VueUi</span>Candlestick</div>
            </router-link>
            <router-link to="/docs#vue-ui-age-pyramid" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-age-pyramid') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-age-pyramid')" class="-ml-6"/><PyramidIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-age-pyramid')"/>  <span class="text-gray-500">VueUi</span>AgePyramid</div>
            </router-link>
            <router-link to="/docs#vue-ui-relation-circle" @click="scrollToTop" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-relation-circle') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-relation-circle')" class="-ml-6"/><CircleTriangleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-relation-circle')"/>  <span class="text-gray-500">VueUi</span>RelationCircle</div>
            </router-link>
            <router-link to="/docs#vue-ui-thermometer" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-thermometer') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-thermometer')" class="-ml-6"/><TemperatureIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-thermometer')"/>  <span class="text-gray-500">VueUi</span>Thermometer</div>
            </router-link>
            <router-link to="/docs#vue-ui-rings" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-rings') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><PlaystationCircleIcon v-if="isSelected('/docs#vue-ui-rings')" class="-ml-6"/><PlaystationCircleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-rings')"/>  <span class="text-gray-500">VueUi</span>Rings</div>
            </router-link>
            <router-link to="/docs#vue-ui-donut-evolution" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-donut-evolution') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><ChartDotsIcon v-if="isSelected('/docs#vue-ui-donut-evolution')" class="-ml-6"/><ChartDotsIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-donut-evolution')"/>  <span class="text-gray-500">VueUi</span>DonutEvolution</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Mini charts</div>
            <router-link to="/docs#vue-ui-sparkline" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkline') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkline')" class="-ml-6"/><ChartLineIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-sparkline')"/>  <span class="text-gray-500">VueUi</span>Sparkline</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkbar" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkbar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkbar')" class="-ml-6"/><ChartBarIcon class="text-gray-800 dark:text-gray-400 rotate-90" stroke-width="1" v-if="!isSelected('/docs#vue-ui-sparkbar')"/>  <span class="text-gray-500">VueUi</span>Sparkbar</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkstackbar" @click="scrollToTop" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkstackbar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkstackbar')" class="-ml-6"/><ChartBarIcon class="text-gray-800 dark:text-gray-400 rotate-90" stroke-width="1" v-if="!isSelected('/docs#vue-ui-sparkstackbar')"/>  <span class="text-gray-500">VueUi</span>SparkStackbar</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkhistogram" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkhistogram') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkhistogram')" class="-ml-6"/><ChartBarIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-sparkhistogram')"/>  <span class="text-gray-500">VueUi</span>SparkHistogram</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Tables</div>
            <router-link to="/docs#vue-ui-table" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-table') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-table')" class="-ml-6"/><TableIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-table')"/>  <span class="text-gray-500">VueUi</span>Table</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Rating</div>
            <router-link to="/docs#vue-ui-rating" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-rating') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-rating')" class="-ml-6"/><StarIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-rating')"/>  <span class="text-gray-500">VueUi</span>Rating</div>
            </router-link>
            <router-link to="/docs#vue-ui-smiley" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-smiley') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-smiley')" class="-ml-6"/><MoodSmileIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-smiley')"/>  <span class="text-gray-500">VueUi</span>Smiley</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Utilities</div>
            <router-link to="/docs#vue-ui-screenshot" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-screenshot') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-screenshot')" class="-ml-6"/><ScreenshotIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-screenshot')"/>  <span class="text-gray-500">VueUi</span>Screenshot</div>
            </router-link>
            <router-link to="/docs#vue-ui-skeleton" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-skeleton') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-skeleton')" class="-ml-6"/><SkullIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-skeleton')"/>  <span class="text-gray-500">VueUi</span>Skeleton</div>
            </router-link>
            <router-link to="/docs#vue-ui-dashboard" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-dashboard') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><LayoutDashboardIcon v-if="isSelected('/docs#vue-ui-dashboard')" class="-ml-6"/><LayoutDashboardIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-dashboard')"/>  <span class="text-gray-500">VueUi</span>Dashboard</div>
            </router-link>
            <router-link to="/docs#vue-ui-annotator" @click="scrollToTop">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-annotator') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><EditIcon v-if="isSelected('/docs#vue-ui-annotator')" class="-ml-6"/><EditIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-annotator')"/>  <span class="text-gray-500">VueUi</span>Annotator</div>
            </router-link>
        </section>
    </template>
    <template v-else>
            <LinkTooltip 
                v-for="(lt, i) in smallMenu"
                :index="i"
                v-bind="lt"
            />
    </template>
    </aside>
</template>