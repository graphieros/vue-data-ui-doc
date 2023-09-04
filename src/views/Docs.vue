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
            <div v-if="router.currentRoute.value.fullPath === '/docs'" class="h-[calc(100svh_-_89px)] flex flex-col place-items-center place-content-center">
                <h1 class="flex gap-2 text-xl">
                    <img src="../assets/logo.png" class="h-6">
                    2 props are required:
                </h1>
<div class="w-fit mx-auto border border-gray-700 rounded-md py-3 px-6 sm:px-20 mt-6 bg-[rgb(30,30,30)]">
<pre>
<code class="text-gray-500 text-xl">
&lt;NameOfComponent
    <span class="text-app-green">:dataset</span>="dataset"
    <span class="text-app-blue">:config</span>="config"
&lt;/NameOfComponent&gt;
</code>
</pre>
</div>
                <AppSkeletons/>
            </div>
        </div>
    </div>
</template>