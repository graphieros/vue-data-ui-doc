<script setup>
import {ref, computed } from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useRouter } from "vue-router";
import DocVueUiXy from '../components/docs/DocVueUiXy.vue';
import DocVueUiTable from "../components/docs/DocVueUiTable.vue";
import DocVueUiDonut from "../components/docs/DocVueUiDonut.vue";
import DocVueUiWaffle from "../components/docs/DocVueUiWaffle.vue";
import DocVueUiRadar from "../components/docs/DocVueUiRadar.vue";
import DocVueUiQuadrant from "../components/docs/DocVueUiQuadrant.vue";
import DocVueUiGauge from "../components/docs/DocVueUiGauge.vue";
import DocVueUiChestnut from "../components/docs/DocVueUiChestnut.vue";
import DocVueUiOnion from "../components/docs/DocVueUiOnion.vue";
import DocVueUiVerticalBar from "../components/docs/DocVueUiVerticalBar.vue";
import DocVueUiScreenshot from "../components/docs/DocVueUiScreenshot.vue";
import DocVueUiRating from "../components/docs/DocVueUiRating.vue";
import DocVueUiSkeleton from "../components/docs/DocVueUiSkeleton.vue";
import DocVueUiSparkline from "../components/docs/DocVueUiSparkline.vue";
import DocVueUiHeatmap from "../components/docs/DocVueUiHeatmap.vue";
import DocVueUiScatter from "../components/docs/DocVueUiScatter.vue";
import DocVueUiCandlestick from "../components/docs/DocVueUiCandlestick.vue";
import DocVueUiAgePyramid from "../components/docs/DocVueUiAgePyramid.vue";
import DocVueUiSparkbar from "../components/docs/DocVueUiSparkbar.vue";
import MenuDetail from "../components/MenuDetail.vue";
import DocVueUiDashboard from "../components/docs/DocVueUiDashboard.vue";
import DocVueUiAnnotator from "../components/docs/DocVueUiAnnotator.vue";
import DocVueUiSmiley from "../components/docs/DocVueUiSmiley.vue";
import DocVueUiRelationCircle from "../components/docs/DocVueUiRelationCircle.vue";
import DocVueUiThermometer from "../components/docs/DocVueUiThermometer.vue";
import DocVueUiSparkStackbar from "../components/docs/DocVueUiSparkStackbar.vue";
import DocVueUiSparkHistogram from "../components/docs/DocVueUiSparkHistogram.vue";
import DocVueUiRings from "../components/docs/DocVueUIRings.vue";
import DocVueUiWheel from "../components/docs/DocVueUiWheel.vue";
import DocVueUiTiremarks from "../components/docs/DocVueUiTiremarks.vue";
import DocVueUiDonutEvolution from "../components/docs/DocVueUiDonutEvolution.vue";
import DocVueUiIcon from "../components/docs/DocVueUiIcon.vue";
import DocVueUiMoodRadar from "../components/docs/DocVueUiMoodRadar.vue";
import DeepSearch from "../components/DeepSearch.vue";

import { CheckIcon } from "vue-tabler-icons";

import { useMainStore } from "../stores";

const store = useMainStore();
const translations = computed(() => {
    return store.translations;
})


const isCopy = computed(() => store.isCopy);

const router = useRouter();
const isOpen = ref(window.innerWidth > 768);

function toggleMenu(state) {
    isOpen.value = state;
}

const menuItems = computed(() => [
    {
        name: "Xy",
        icon: "chartLine",
        tooltip: translations.value.docs.tooltips.xy[store.lang],
        link: "/docs#vue-ui-xy",
        type: "classic",
        thumb: new URL('../assets/thumb_xy.png', import.meta.url).href
    },
    {
        name: "Donut",
        icon: "chartDonut",
        tooltip: translations.value.docs.tooltips.donut[store.lang],
        link: "/docs#vue-ui-donut",
        type: "classic",
        thumb: new URL('../assets/thumb_donut.png', import.meta.url).href
    },
    {
        name: "DonutEvolution",
        icon: "chartDonutEvolution",
        tooltip: translations.value.docs.tooltips.donutEvolution[store.lang],
        link: "/docs#vue-ui-donut-evolution",
        type: "combined",
        thumb: new URL('../assets/thumb_donut_evolution.png', import.meta.url).href
    },
    {
        name: "Waffle",
        icon: "chartWaffle",
        tooltip: translations.value.docs.tooltips.waffle[store.lang],
        link: "/docs#vue-ui-waffle",
        type: "classic",
        thumb: new URL('../assets/thumb_waffle.png', import.meta.url).href
    },
    {
        name: "Rings",
        icon: "chartRings",
        tooltip: translations.value.docs.tooltips.rings[store.lang],
        link: "/docs#vue-ui-rings",
        type: "classic",
        thumb: new URL('../assets/thumb_rings.png', import.meta.url).href
    },
    {
        name: "Radar",
        icon: "chartRadar",
        tooltip: translations.value.docs.tooltips.radar[store.lang],
        link: "/docs#vue-ui-radar",
        type: "classic",
        thumb: new URL('../assets/thumb_radar.png', import.meta.url).href
    },
    {
        name: "Quadrant",
        icon: "chartQuadrant",
        tooltip: translations.value.docs.tooltips.quadrant[store.lang],
        link: "/docs#vue-ui-quadrant",
        type: "classic",
        thumb: new URL('../assets/thumb_quadrant.png', import.meta.url).href
    },
    {
        name: "Gauge",
        icon: "chartGauge",
        tooltip: translations.value.docs.tooltips.gauge[store.lang],
        link: "/docs#vue-ui-gauge",
        type: "measure",
        thumb: new URL('../assets/thumb_gauge.png', import.meta.url).href
    },
    {
        name: "Wheel",
        icon: "chartWheel",
        tooltip: translations.value.docs.tooltips.wheel[store.lang],
        link: "/docs#vue-ui-wheel",
        type: "measure",
        thumb: new URL('../assets/thumb_wheel.png', import.meta.url).href
    },
    {
        name: "Tiremarks",
        icon: "chartTiremarks",
        tooltip: translations.value.docs.tooltips.tiremarks[store.lang],
        link: "/docs#vue-ui-tiremarks",
        type: "measure",
        thumb: new URL('../assets/thumb_tiremarks.png', import.meta.url).href
    },
    {
        name: "Chestnut",
        icon: "chartChestnut",
        tooltip: translations.value.docs.tooltips.chestnut[store.lang],
        link: "/docs#vue-ui-chestnut",
        type: "combined",
        thumb: new URL('../assets/thumb_chestnut.png', import.meta.url).href
    },
    {
        name: "Onion",
        icon: "chartOnion",
        tooltip: translations.value.docs.tooltips.onion[store.lang],
        link: "/docs#vue-ui-onion",
        type: "classic",
        thumb: new URL('../assets/thumb_onion.png', import.meta.url).href
    },
    {
        name: "VerticalBar",
        icon: "chartVerticalBar",
        tooltip: translations.value.docs.tooltips.verticalBar[store.lang],
        link: "/docs#vue-ui-vertical-bar",
        type: "classic",
        thumb: new URL('../assets/thumb_vertical_bar.png', import.meta.url).href
    },
    {
        name: "Heatmap",
        icon: "chartHeatmap",
        tooltip: translations.value.docs.tooltips.heatmap[store.lang],
        link: "/docs#vue-ui-heatmap",
        type: "classic",
        thumb: new URL('../assets/thumb_heatmap.png', import.meta.url).href
    },
    {
        name: "Scatter",
        icon: "chartScatter",
        tooltip: translations.value.docs.tooltips.scatter[store.lang],
        link: "/docs#vue-ui-scatter",
        type: "classic",
        thumb: new URL('../assets/thumb_scatter.png', import.meta.url).href
    },
    {
        name: "Candlestick",
        icon: "chartCandlestick",
        tooltip: translations.value.docs.tooltips.candlestick[store.lang],
        link: "/docs#vue-ui-candlestick",
        type: "classic",
        thumb: new URL('../assets/thumb_candlestick.png', import.meta.url).href
    },
    {
        name: "AgePyramid",
        icon: "chartAgePyramid",
        tooltip: translations.value.docs.tooltips.agePyramid[store.lang],
        link: "/docs#vue-ui-age-pyramid",
        type: "classic",
        thumb: new URL('../assets/thumb_age_pyramid.png', import.meta.url).href
    },
    {
        name: "Sparkline",
        icon: "chartLine",
        tooltip: translations.value.docs.tooltips.sparkline[store.lang],
        link: "/docs#vue-ui-sparkline",
        type: "mini",
        thumb: new URL('../assets/thumb_sparkline.png', import.meta.url).href
    },
    {
        name: "Sparkbar",
        icon: "chartVerticalBar",
        tooltip: translations.value.docs.tooltips.sparkbar[store.lang],
        link: "/docs#vue-ui-sparkbar",
        type: "mini",
        thumb: new URL('../assets/thumb_sparkbar.png', import.meta.url).href
    },
    {
        name: "SparkStackbar",
        icon: "chartSparkStackbar",
        tooltip: translations.value.docs.tooltips.stackbar[store.lang],
        link: "/docs#vue-ui-sparkstackbar",
        type: "mini",
        thumb: new URL('../assets/thumb_stackbar.png', import.meta.url).href
    },
    {
        name: "SparkHistogram",
        icon: "chartSparkHistogram",
        tooltip: translations.value.docs.tooltips.histogram[store.lang],
        link: "/docs#vue-ui-sparkhistogram",
        type: "mini",
        thumb: new URL('../assets/thumb_histogram.png', import.meta.url).href
    },
    {
        name: "RelationCircle",
        icon: "chartRelationCircle",
        tooltip: translations.value.docs.tooltips.relationCircle[store.lang],
        link: "/docs#vue-ui-relation-circle",
        type: "semantic",
        thumb: new URL('../assets/thumb_relation_circle.png', import.meta.url).href
    },
    {
        name: "Thermometer",
        icon: "chartThermometer",
        tooltip: translations.value.docs.tooltips.thermometer[store.lang],
        link: "/docs#vue-ui-thermometer",
        type: "measure",
        thumb: new URL('../assets/thumb_thermometer.png', import.meta.url).href
    },
    {
        name: "Table",
        icon: "chartTable",
        tooltip: translations.value.docs.tooltips.table[store.lang],
        link: "/docs#vue-ui-table",
        type: "table",
        thumb: new URL('../assets/thumb_table.png', import.meta.url).href
    },
    {
        name: "Rating",
        icon: "star",
        tooltip: translations.value.docs.tooltips.rating[store.lang],
        link: "/docs#vue-ui-rating",
        type: "measure",
        thumb: new URL('../assets/thumb_rating.png', import.meta.url).href
    },
    {
        name: "Smiley",
        icon: "smiley",
        tooltip: translations.value.docs.tooltips.smiley[store.lang],
        link: "/docs#vue-ui-smiley",
        type: "measure",
        thumb: new URL('../assets/thumb_smiley.png', import.meta.url).href
    },
    {
        name: "Screenshot",
        icon: "screenshot",
        tooltip: translations.value.docs.tooltips.screenshot[store.lang],
        link: "/docs#vue-ui-screenshot",
        type: "tool"
    },
    {
        name: "Skeleton",
        icon: "skeleton",
        tooltip: translations.value.docs.tooltips.skeleton[store.lang],
        link: "/docs#vue-ui-skeleton",
        type: "tool"
    },
    {
        name: "Dashboard",
        icon: "dashboard",
        tooltip: translations.value.docs.tooltips.dashboard[store.lang],
        link: "/docs#vue-ui-dashboard",
        type: "tool"
    },
    {
        name: "Annotator",
        icon: "annotator",
        tooltip: translations.value.docs.tooltips.annotator[store.lang],
        link: "/docs#vue-ui-annotator",
        type: "tool"
    },
    {
        name: "Icon",
        icon: "smiley",
        tooltip: translations.value.docs.tooltips.icon[store.lang],
        link: "/docs#vue-ui-icon",
        type: "tool"
    },
    {
        name: "MoodRadar",
        icon: "chartMoodRadar",
        tooltip: translations.value.docs.tooltips.moodRadar[store.lang],
        link: "/docs#vue-ui-mood-radar",
        type: "measure",
        thumb: new URL('../assets/thumb_mood_radar.png', import.meta.url).href
    },
])

</script>

<template>
    <div v-if="isCopy" class="animate-pulse origin-center z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] w-[80px] flex place-items-center place-content-center border-2 border-gray-400 dark:border-app-green dark:bg-black rounded-full bg-white">
        <CheckIcon size="42" class="dark:text-app-green"/>
    </div>
    <SideMenu @toggle="toggleMenu"/>
    
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden`">
        <DeepSearch/>
        <div :class="`px-2 pt-6 sm:pt-0 ${isOpen ? `xl:w-5/6 hidden sm:block` : ''}`">
            <DocVueUiXy v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-xy'" />
            <DocVueUiTable v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-table'"/>
            <DocVueUiDonut v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-donut'"/>
            <DocVueUiWaffle v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-waffle'"/>
            <DocVueUiRadar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-radar'"/>
            <DocVueUiQuadrant v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-quadrant'"/>
            <DocVueUiGauge v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-gauge'"/>
            <DocVueUiChestnut v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-chestnut'"/>
            <DocVueUiOnion v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-onion'"/>
            <DocVueUiVerticalBar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-vertical-bar'"/>
            <DocVueUiScreenshot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-screenshot'"/>
            <DocVueUiRating v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-rating'"/>
            <DocVueUiSkeleton v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-skeleton'"/>
            <DocVueUiSparkline v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkline'"/>
            <DocVueUiHeatmap v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-heatmap'"/>
            <DocVueUiScatter v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-scatter'"/>
            <DocVueUiCandlestick v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-candlestick'"/>
            <DocVueUiAgePyramid v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-age-pyramid'"/>
            <DocVueUiSparkbar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkbar'"/>
            <DocVueUiDashboard v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-dashboard'"/>
            <DocVueUiAnnotator v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-annotator'"/>
            <DocVueUiSmiley v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-smiley'"/>
            <DocVueUiRings v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-rings'"/>
            <DocVueUiRelationCircle v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-relation-circle'"/>
            <DocVueUiThermometer v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-thermometer'"/>
            <DocVueUiSparkStackbar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-sparkstackbar'"/>
            <DocVueUiSparkHistogram v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-sparkhistogram'"/>
            <DocVueUiWheel v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-wheel'"/>
            <DocVueUiTiremarks v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-tiremarks'"/>
            <DocVueUiDonutEvolution v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-donut-evolution'"/>
            <DocVueUiIcon v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-icon'"/>
            <DocVueUiMoodRadar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-mood-radar'"/>
            <div v-if="router.currentRoute.value.fullPath === '/docs'" class="flex flex-col place-items-center place-content-center">
                <h1 class="flex gap-2 text-md">
                    <img src="../assets/logo.png" class="h-6">
                    {{ translations.docs.props[store.lang] }}
                </h1>
<div class="w-fit mx-auto border border-gray-700 rounded-md py-1 px-6 sm:px-10 mt-6 bg-gray-200 dark:bg-[rgb(30,30,30)]">
<pre>
<code class="text-gray-500 text-md">
&lt;VueUiXy
    <span class="text-black dark:text-app-green">:dataset</span>="{{ translations.docs.dataset[store.lang] }}"
    <span class="text-black dark:text-app-blue">:config</span>="{{ translations.docs.config[store.lang] }}"
/&gt;
</code>
</pre>
</div>
                <div class="w-full px-2 sm:px-0 sm:w-1/2 text-left mx-auto mt-4 text-xs sm:text-sm">
                    {{ translations.docs.p1[store.lang] }}
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-6 mb-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.classic[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'classic')" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip>
                            <div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div>
                        </template>
                    </MenuDetail>
                </div>  

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.measure[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'measure')" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.mini[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'mini')" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.combined[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'combined')" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.table[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'table')" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>       

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.semantic[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'semantic')" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div> 

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.tool[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'tool')" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>                
            </div>
        </div>
    </div>
</template>