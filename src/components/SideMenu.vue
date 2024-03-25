<script setup>
import { ref, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
import LinkTooltip from "../components/LinkTooltip.vue";
import DynamicTooltip from "./DynamicTooltip.vue";
import { useMainStore } from "../stores";
import Dropdown from "./Dropdown.vue";
import SideMenuItem from "./SideMenuItem.vue";

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

function getIconColor(route) {
    if(isSelected(route)) {
        if(isDarkMode.value) {
            return '#5f8bee'
        } else {
            return '#5f8bee'
        }
    } else {
        if(isDarkMode.value) {
            return 'rgb(156, 163, 175)'
        } else {
            return 'rgb(31, 41, 55)'
        }
    }
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
        route: '/docs#vue-ui-nested-donuts',
        icon: 'chartNestedDonuts',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'NestedDonuts',
        thumb: new URL('../assets/thumb_nested_donuts.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_nested_donuts_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-sparkline',
        icon: 'chartSparkline',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Sparkline',
        thumb: new URL('../assets/thumb_sparkline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href,
    },
    {
        route: '/docs#vue-ui-sparkbar',
        icon: 'chartSparkbar',
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
        route: '/docs#vue-ui-sparkgauge',
        icon: 'chartGauge',
        cssClasses: '',
        isSelected: isSelected,
        tooltipContent: 'Sparkgauge',
        thumb: new URL('../assets/thumb_sparkgauge.png', import.meta.url).href, 
        thumbLight: new URL('../assets/thumb_sparkgauge_light.png', import.meta.url).href, 
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

const sideMenuItems = ref([
    {
        title: translations.value.sideMenu.miniCharts[store.lang],
        items: [
            { route: '/docs#vue-ui-sparkline', componentName: 'Sparkline', icon: 'chartSparkline' },
            { route: '/docs#vue-ui-sparkbar', componentName: 'Sparkbar', icon: 'chartSparkbar' },
            { route: '/docs#vue-ui-sparkstackbar', componentName: 'SparkStackbar', icon: 'chartSparkStackbar' },
            { route: '/docs#vue-ui-sparkhistogram', componentName: 'SparkHistogram', icon: 'chartSparkHistogram' },
            { route: '/docs#vue-ui-sparkgauge', componentName: 'Sparkgauge', icon: 'chartGauge' },
        ],
    },
    {
        title: translations.value.sideMenu.charts[store.lang],
        items: [
            {route: '/docs#vue-ui-xy', componentName: 'Xy', icon: 'chartLine' },
            {route: '/docs#vue-ui-donut', componentName: 'Donut', icon: 'chartDonut' },
            {route: '/docs#vue-ui-waffle', componentName: 'Waffle', icon: 'chartWaffle' },
            {route: '/docs#vue-ui-radar', componentName: 'Radar', icon: 'chartRadar' },
            {route: '/docs#vue-ui-quadrant', componentName: 'Quadrant', icon: 'chartQuadrant' },
            {route: '/docs#vue-ui-gauge', componentName: 'Gauge', icon: 'chartGauge' },
            {route: '/docs#vue-ui-wheel', componentName: 'Wheel', icon: 'chartWheel' },
            {route: '/docs#vue-ui-tiremarks', componentName: 'Tiremarks', icon: 'chartTiremarks' },
            {route: '/docs#vue-ui-chestnut', componentName: 'Chestnut', icon: 'chartChestnut' },
            {route: '/docs#vue-ui-onion', componentName: 'Onion', icon: 'chartOnion' },
            {route: '/docs#vue-ui-vertical-bar', componentName: 'VerticalBar', icon: 'chartVerticalBar' },
            {route: '/docs#vue-ui-heatmap', componentName: 'Heatmap', icon: 'chartHeatmap' },
            {route: '/docs#vue-ui-scatter', componentName: 'Scatter', icon: 'chartScatter' },
            {route: '/docs#vue-ui-candlestick', componentName: 'Candlestick', icon: 'chartCandlestick' },
            {route: '/docs#vue-ui-age-pyramid', componentName: 'AgePyramid', icon: 'chartAgePyramid' },
            {route: '/docs#vue-ui-relation-circle', componentName: 'RelationCircle', icon: 'chartRelationCircle' },
            {route: '/docs#vue-ui-thermometer', componentName: 'Thermometer', icon: 'chartThermometer' },
            {route: '/docs#vue-ui-rings', componentName: 'Rings', icon: 'chartRings' },
            {route: '/docs#vue-ui-donut-evolution', componentName: 'DonutEvolution', icon: 'chartDonutEvolution' },
            {route: '/docs#vue-ui-mood-radar', componentName: 'MoodRadar', icon: 'chartMoodRadar' },
            {route: '/docs#vue-ui-molecule', componentName: 'Molecule', icon: 'chartCluster' },
            {route: '/docs#vue-ui-nested-donuts', componentName: 'NestedDonuts', icon: 'chartNestedDonuts' },
        ]
    },
    {
        title: translations.value.sideMenu.charts3d[store.lang],
        items: [
            { route: '/docs#vue-ui-3d-bar', componentName: '3dBar', icon: 'chart3dBar' }
        ]
    },
    {
        title: translations.value.sideMenu.tables[store.lang],
        items: [
            { route: '/docs#vue-ui-table-sparkline', componentName: 'TableSparkline', icon: 'chartTable' },
            { route: '/docs#vue-ui-table', componentName: 'Table', icon: 'chartTable' },
        ]
    },
    {
        title: translations.value.sideMenu.rating[store.lang],
        items: [
            { route: '/docs#vue-ui-rating', componentName: 'Rating', icon: 'star' },
            { route: '/docs#vue-ui-smiley', componentName: 'Smiley', icon: 'smiley' },
        ]
    },
    {
        title: translations.value.sideMenu.utilities[store.lang],
        items: [
            { route: '/docs#vue-ui-screenshot', componentName: 'Screenshot', icon: 'screenshot' },
            { route: '/docs#vue-ui-skeleton', componentName: 'Skeleton', icon: 'skeleton' },
            { route: '/docs#vue-ui-dashboard', componentName: 'Dashboard', icon: 'dashboard' },
            { route: '/docs#vue-ui-annotator', componentName: 'Annotator', icon: 'annotator' },
            { route: '/docs#vue-ui-icon', componentName: 'Icon', icon: 'smiley' },
            { route: '/docs#vue-ui-digits', componentName: 'Digits', icon: 'digit8' },
            { route: '/docs#vue-ui-mini-loader', componentName: 'MiniLoader', icon: 'chartWheel' },
        ]
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
        <div class="mt-6">
            <Dropdown 
                v-for="menu in sideMenuItems"
                :title="menu.title"
                :items="menu.items"
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