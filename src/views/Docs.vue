<script setup>
import {ref, computed} from "vue";
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
        icon: "ChartHistogramIcon",
        tooltip: translations.value.docs.tooltips.xy[store.lang],
        link: "/docs#vue-ui-xy"
    },
    {
        name: "Donut",
        icon: "ChartDonut3Icon",
        tooltip: translations.value.docs.tooltips.donut[store.lang],
        link: "/docs#vue-ui-donut"
    },
    {
        name: "Waffle",
        icon: "LayoutGridIcon",
        tooltip: translations.value.docs.tooltips.waffle[store.lang],
        link: "/docs#vue-ui-waffle"
    },
    {
        name: "Radar",
        icon: "ChartRadarIcon",
        tooltip: translations.value.docs.tooltips.radar[store.lang],
        link: "/docs#vue-ui-radar"
    },
    {
        name: "Quadrant",
        icon: "PlusIcon",
        tooltip: translations.value.docs.tooltips.quadrant[store.lang],
        link: "/docs#vue-ui-quadrant"
    },
    {
        name: "Gauge",
        icon: "GaugeIcon",
        tooltip: translations.value.docs.tooltips.gauge[store.lang],
        link: "/docs#vue-ui-gauge"
    },
    {
        name: "Chestnut",
        icon: "BinaryTree2Icon",
        tooltip: translations.value.docs.tooltips.chestnut[store.lang],
        link: "/docs#vue-ui-chestnut"
    },
    {
        name: "Onion",
        icon: "ChartArcs3Icon",
        tooltip: translations.value.docs.tooltips.onion[store.lang],
        link: "/docs#vue-ui-onion"
    },
    {
        name: "VerticalBar",
        icon: "ChartBarIcon",
        tooltip: translations.value.docs.tooltips.verticalBar[store.lang],
        link: "/docs#vue-ui-vertical-bar"
    },
    {
        name: "Heatmap",
        icon: "LayoutGridIcon",
        tooltip: translations.value.docs.tooltips.heatmap[store.lang],
        link: "/docs#vue-ui-heatmap"
    },
    {
        name: "Scatter",
        icon: "ChartBubbleIcon",
        tooltip: translations.value.docs.tooltips.scatter[store.lang],
        link: "/docs#vue-ui-scatter"
    },
    {
        name: "Candlestick",
        icon: "ChartCandleIcon",
        tooltip: translations.value.docs.tooltips.candlestick[store.lang],
        link: "/docs#vue-ui-candlestick"
    },
    {
        name: "AgePyramid",
        icon: "PyramidIcon",
        tooltip: translations.value.docs.tooltips.agePyramid[store.lang],
        link: "/docs#vue-ui-age-pyramid"
    },
    {
        name: "Sparkline",
        icon: "ChartLineIcon",
        tooltip: translations.value.docs.tooltips.sparkline[store.lang],
        link: "/docs#vue-ui-sparkline"
    },
    {
        name: "Sparkbar",
        icon: "ChartBarIcon",
        tooltip: translations.value.docs.tooltips.sparkbar[store.lang],
        link: "/docs#vue-ui-sparkbar"
    },
    {
        name: "Table",
        icon: "TableIcon",
        tooltip: translations.value.docs.tooltips.table[store.lang],
        link: "/docs#vue-ui-table"
    },
    {
        name: "Rating",
        icon: "StarIcon",
        tooltip: translations.value.docs.tooltips.rating[store.lang],
        link: "/docs#vue-ui-rating"
    },
    {
        name: "Smiley",
        icon: "MoodSmileIcon",
        tooltip: translations.value.docs.tooltips.smiley[store.lang],
        link: "/docs#vue-ui-smiley"
    },
    {
        name: "Screenshot",
        icon: "ScreenshotIcon",
        tooltip: translations.value.docs.tooltips.screenshot[store.lang],
        link: "/docs#vue-ui-screenshot"
    },
    {
        name: "Skeleton",
        icon: "SkullIcon",
        tooltip: translations.value.docs.tooltips.skeleton[store.lang],
        link: "/docs#vue-ui-skeleton"
    },
    {
        name: "Dashboard",
        icon: "LayoutDashboardIcon",
        tooltip: translations.value.docs.tooltips.dashboard[store.lang],
        link: "/docs#vue-ui-dashboard"
    },
    {
        name: "Annotator",
        icon: "EditIcon",
        tooltip: translations.value.docs.tooltips.annotator[store.lang],
        link: "/docs#vue-ui-annotator"
    },
])

</script>

<template>
    <div v-if="isCopy" class="animate-pulse origin-center z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] w-[80px] flex place-items-center place-content-center border-2 border-gray-400 dark:border-app-green dark:bg-black rounded-full bg-white">
        <CheckIcon size="42" class="dark:text-app-green"/>
    </div>
    <SideMenu @toggle="toggleMenu"/>
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden`">
        <div :class="`px-2 ${isOpen ? `xl:w-5/6 hidden sm:block` : ''}`">
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
            <div v-if="router.currentRoute.value.fullPath === '/docs'" class="h-[calc(100svh_-_89px)] flex flex-col place-items-center place-content-center">
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
                <div class="w-full px-2 sm:px-0 sm:w-1/2 text-left mx-auto mt-4">
                    {{ translations.docs.p1[store.lang] }}
                </div>

                <div class="text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-4 gap-2 my-6 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700">
                    <MenuDetail v-for="item in menuItems" :icon="item.icon" :link="item.link">
                        <template #name>{{ item.name }}</template>
                        <template #tooltip>{{ item.tooltip }}</template>
                    </MenuDetail>
                </div>                
            </div>
        </div>
    </div>
</template>