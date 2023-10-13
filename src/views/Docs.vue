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
        tooltip: "Visualize relative proportions with this classic representation",
        link: "/docs#vue-ui-donut"
    },
    {
        name: "Waffle",
        icon: "LayoutGridIcon",
        tooltip: "Visualize relative proportions with a representation known to be easier to grasp by the human brain",
        link: "/docs#vue-ui-waffle"
    },
    {
        name: "Radar",
        icon: "ChartRadarIcon",
        tooltip: "Reveal outliers and commonality of different measures on the same scale",
        link: "/docs#vue-ui-radar"
    },
    {
        name: "Quadrant",
        icon: "PlusIcon",
        tooltip: "Identify patterns and trends to prioritize actions based on the position of data points",
        link: "/docs#vue-ui-quadrant"
    },
    {
        name: "Gauge",
        icon: "GaugeIcon",
        tooltip: "Quickly show how well a given metric is performing against a target goal",
        link: "/docs#vue-ui-gauge"
    },
    {
        name: "Chestnut",
        icon: "BinaryTree2Icon",
        tooltip: "Represent nested information from a general base to detailed breakdowns",
        link: "/docs#vue-ui-chestnut"
    },
    {
        name: "Onion",
        icon: "ChartArcs3Icon",
        tooltip: "Compare the values of multiple categories or groups in a single visualization",
        link: "/docs#vue-ui-onion"
    },
    {
        name: "VerticalBar",
        icon: "ChartBarIcon",
        tooltip: "Compare different categorical or discrete variables, with the option to show their breakdowns",
        link: "/docs#vue-ui-vertical-bar"
    },
    {
        name: "Heatmap",
        icon: "LayoutGridIcon",
        tooltip: "Show relationships and patterns between two variables by observing how cell colors change across each axis",
        link: "/docs#vue-ui-heatmap"
    },
    {
        name: "Scatter",
        icon: "ChartBubbleIcon",
        tooltip: "From a large dataset, reveal the correlation between two variables",
        link: "/docs#vue-ui-scatter"
    },
    {
        name: "Candlestick",
        icon: "ChartCandleIcon",
        tooltip: "Determine possible price movements based on past patterns",
        link: "/docs#vue-ui-candlestick"
    },
    {
        name: "AgePyramid",
        icon: "PyramidIcon",
        tooltip: "Show how populations are composed and how they are changing",
        link: "/docs#vue-ui-age-pyramid"
    },
    {
        name: "Sparkline",
        icon: "ChartLineIcon",
        tooltip: "Visualize evolution on a tiny line chart",
        link: "/docs#vue-ui-sparkline"
    },
    {
        name: "Sparkbar",
        icon: "ChartBarIcon",
        tooltip: "Show kpi performance with a tiny vertical bar chart",
        link: "/docs#vue-ui-sparkbar"
    },
    {
        name: "Table",
        icon: "TableIcon",
        tooltip: "Powerful dynamic table that allows the user to select data and calculate sums, averages, and visualize charts based on their selection",
        link: "/docs#vue-ui-table"
    },
    {
        name: "Rating",
        icon: "StarIcon",
        tooltip: "A classic rating component to rate or visualize rating results. Control the number of stars to display, and their shape",
        link: "/docs#vue-ui-rating"
    },
    {
        name: "Screenshot",
        icon: "ScreenshotIcon",
        tooltip: "Select an area on the screen and either download or post the image as base64 with additional metadata",
        link: "/docs#vue-ui-screenshot"
    },
    {
        name: "Skeleton",
        icon: "SkullIcon",
        tooltip: "Display gorgeous skeleton charts while data is loading",
        link: "/docs#vue-ui-skeleton"
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