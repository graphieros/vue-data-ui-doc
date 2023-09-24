<script setup>
import {ref} from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useRouter } from "vue-router";
import AppSkeletons from "../components/AppSkeletons.vue";
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

import { ChevronLeftIcon, ChevronRightIcon, CaretRightIcon, ChartHistogramIcon, ChartDonut3Icon, LayoutGridIcon, ChartRadarIcon, PlusIcon, GaugeIcon, ScreenshotIcon, ChartBarIcon, ChartArcs3Icon, ChartBubbleIcon, ChartCandleIcon, PyramidIcon, ChartLineIcon, TableIcon, StarIcon, SkullIcon, BinaryTree2Icon } from "vue-tabler-icons";

const router = useRouter();
const isOpen = ref(window.innerWidth > 768);

function toggleMenu(state) {
    isOpen.value = state;
}

</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden`">
        <div :class="`${isOpen ? 'xl:w-5/6' : ''}`">
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
            <div v-if="router.currentRoute.value.fullPath === '/docs'" class="h-[calc(100svh_-_89px)] flex flex-col place-items-center place-content-center">
                <h1 class="flex gap-2 text-xl">
                    <img src="../assets/logo.png" class="h-6">
                    2 props are required:
                </h1>
<div class="w-fit mx-auto border border-gray-700 rounded-md py-3 px-6 sm:px-20 mt-6 bg-gray-200 dark:bg-[rgb(30,30,30)]">
<pre>
<code class="text-gray-500 text-xl">
&lt;NameOfComponent
    <span class="text-app-green">:dataset</span>="dataset"
    <span class="text-app-blue">:config</span>="config"
&lt;/NameOfComponent&gt;
</code>
</pre>
</div>
                <div class="text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-4 gap-2 my-6">
                    <router-link to="/docs#vue-ui-xy">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartHistogramIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Xy</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-donut">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartDonut3Icon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Donut</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-waffle">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <LayoutGridIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Waffle</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-radar">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartRadarIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Radar</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-quadrant">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <PlusIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Quadrant</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-gauge">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <GaugeIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Gauge</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-chestnut">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <BinaryTree2Icon class="text-gray-800 dark:text-gray-400 -rotate-90" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Chestnut</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-onion">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartArcs3Icon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Onion</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-vertical-bar">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartBarIcon class="text-gray-800 dark:text-gray-400 rotate-90" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">VerticalBar</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-heatmap">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <LayoutGridIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Heatmap</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-scatter">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartBubbleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Scatter</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-candlestick">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartCandleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Candlestick</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-age-pyramid">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <PyramidIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">AgePyramid</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-sparkline">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ChartLineIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Sparkline</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-table">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <TableIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Table</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-rating">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <StarIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Rating</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-screenshot">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <ScreenshotIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Screenshot</span></span>
                        </div>
                    </router-link>
                    <router-link to="/docs#vue-ui-skeleton">
                        <div class="p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black hover:bg-white hover:shadow-xl dark:hover:bg-black-100">
                            <SkullIcon class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                            <span>VueUi<span class="text-gray-600 dark:text-app-green">Skeleton</span></span>
                        </div>
                    </router-link>
                </div>                
            </div>
        </div>
    </div>
</template>