<script setup>
import { ref, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, CaretRightIcon, ChartHistogramIcon, ChartDonut3Icon, LayoutGridIcon, ChartRadarIcon, PlusIcon, GaugeIcon, ScreenshotIcon, ChartBarIcon, ChartArcs3Icon, ChartBubbleIcon, ChartCandleIcon, PyramidIcon, ChartLineIcon, TableIcon, StarIcon, SkullIcon, BinaryTree2Icon } from "vue-tabler-icons";
import { useRouter } from "vue-router";

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

</script>

<template>
    <aside :class="`z-10 transition-all fixed left-0 top-[49px] ${isOpen ? 'w-[300px]' : 'w-[59px]'} h-[calc(100svh_-_49px)] bg-gray-200 dark:bg-black overflow-y-auto border-r border-gray-700 p-6`">
    <button class="absolute right-4 top-4" v-if="isOpen" @click="toggle">
        <ChevronLeftIcon class="text-black dark:text-app-green"/>
    </button>
    <button class="absolute top-5 left-1/2 -translate-x-1/2" v-if="!isOpen" @click="toggle">
        <ChevronRightIcon class="text-black dark:text-app-green animate-ping sm:animate-none"/>
    </button>
    <template v-if="isOpen">
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Charts</div>
            <router-link to="/docs#vue-ui-xy" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-xy') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-xy')" class="-ml-6"/> <ChartHistogramIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-xy')"/> <span class="text-gray-500">VueUi</span>Xy</div>
            </router-link>
            <router-link to="/docs#vue-ui-donut" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-donut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-donut')" class="-ml-6"/> <ChartDonut3Icon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-donut')"/> <span class="text-gray-500">VueUi</span>Donut</div>
            </router-link>
            <router-link to="/docs#vue-ui-waffle" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-waffle') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-waffle')" class="-ml-6"/><LayoutGridIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-waffle')"/> <span class="text-gray-500">VueUi</span>Waffle</div>
            </router-link>
            <router-link to="/docs#vue-ui-radar" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-radar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-radar')" class="-ml-6"/><ChartRadarIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-radar')"/> <span class="text-gray-500">VueUi</span>Radar</div>
            </router-link>
            <router-link to="/docs#vue-ui-quadrant" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-quadrant') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-quadrant')" class="-ml-6"/><PlusIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-quadrant')"/>  <span class="text-gray-500">VueUi</span>Quadrant</div>
            </router-link>
            <router-link to="/docs#vue-ui-gauge" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-gauge') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-gauge')" class="-ml-6"/><GaugeIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-gauge')"/>  <span class="text-gray-500">VueUi</span>Gauge</div>
            </router-link>
            <router-link to="/docs#vue-ui-chestnut" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-chestnut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-chestnut')" class="-ml-6"/><BinaryTree2Icon class="text-gray-800 dark:text-gray-400 -rotate-90" stroke-width="1" v-if="!isSelected('/docs#vue-ui-chestnut')"/>  <span class="text-gray-500">VueUi</span>Chestnut</div>
            </router-link>
            <router-link to="/docs#vue-ui-onion" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-onion') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-onion')" class="-ml-6"/><ChartArcs3Icon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-onion')"/>  <span class="text-gray-500">VueUi</span>Onion</div>
            </router-link>
            <router-link to="/docs#vue-ui-vertical-bar" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-vertical-bar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-vertical-bar')" class="-ml-6"/><ChartBarIcon class="text-gray-800 dark:text-gray-400 rotate-90" stroke-width="1" v-if="!isSelected('/docs#vue-ui-vertical-bar')"/>  <span class="text-gray-500">VueUi</span>VerticalBar</div>
            </router-link>
            <router-link to="/docs#vue-ui-heatmap" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-heatmap') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-heatmap')" class="-ml-6"/><LayoutGridIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-heatmap')"/>  <span class="text-gray-500">VueUi</span>Heatmap</div>
            </router-link>
            <router-link to="/docs#vue-ui-scatter" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-scatter') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-scatter')" class="-ml-6"/><ChartBubbleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-scatter')"/>  <span class="text-gray-500">VueUi</span>Scatter</div>
            </router-link>
            <router-link to="/docs#vue-ui-candlestick" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-candlestick') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-candlestick')" class="-ml-6"/><ChartCandleIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-candlestick')"/>  <span class="text-gray-500">VueUi</span>Candlestick</div>
            </router-link>
            <router-link to="/docs#vue-ui-age-pyramid" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-age-pyramid') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-age-pyramid')" class="-ml-6"/><PyramidIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-age-pyramid')"/>  <span class="text-gray-500">VueUi</span>AgePyramid</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Mini charts</div>
            <router-link to="/docs#vue-ui-sparkline" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkline') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkline')" class="-ml-6"/><ChartLineIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-sparkline')"/>  <span class="text-gray-500">VueUi</span>Sparkline</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkbar" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkbar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkbar')" class="-ml-6"/><ChartBarIcon class="text-gray-800 dark:text-gray-400 rotate-90" stroke-width="1" v-if="!isSelected('/docs#vue-ui-sparkbar')"/>  <span class="text-gray-500">VueUi</span>Sparkbar</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Tables</div>
            <router-link to="/docs#vue-ui-table">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-table') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-table')" class="-ml-6"/><TableIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-table')"/>  <span class="text-gray-500">VueUi</span>Table</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Rating</div>
            <router-link to="/docs#vue-ui-rating">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-rating') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-rating')" class="-ml-6"/><StarIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-rating')"/>  <span class="text-gray-500">VueUi</span>Rating</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-black dark:text-app-green">Utilities</div>
            <router-link to="/docs#vue-ui-screenshot">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-screenshot') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-screenshot')" class="-ml-6"/><ScreenshotIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-screenshot')"/>  <span class="text-gray-500">VueUi</span>Screenshot</div>
            </router-link>
            <router-link to="/docs#vue-ui-skeleton">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-skeleton') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-skeleton')" class="-ml-6"/><SkullIcon class="text-gray-800 dark:text-gray-400" stroke-width="1" v-if="!isSelected('/docs#vue-ui-skeleton')"/>  <span class="text-gray-500">VueUi</span>Skeleton</div>
            </router-link>
        </section>
    </template>
    <template v-else>
            <router-link to="/docs#vue-ui-xy" >
                <div class="-ml-2 my-2 mt-12"><ChartHistogramIcon :class="`${isSelected('/docs#vue-ui-xy') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-xy') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-donut" >
                <div class="-ml-2 my-2"><ChartDonut3Icon :class="`${isSelected('/docs#vue-ui-donut') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-donut') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-waffle" >
                <div class="-ml-2 my-2"><LayoutGridIcon :class="`${isSelected('/docs#vue-ui-waffle') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-waffle') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-radar" >
                <div class="-ml-2 my-2"><ChartRadarIcon :class="`${isSelected('/docs#vue-ui-radar') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-radar') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-quadrant" >
                <div class="-ml-2 my-2"><PlusIcon :class="`${isSelected('/docs#vue-ui-quadrant') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-quadrant') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-gauge" >
                <div class="-ml-2 my-2"><GaugeIcon :class="`${isSelected('/docs#vue-ui-gauge') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-gauge') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-chestnut" >
                <div class="-ml-2 my-2"><BinaryTree2Icon :class="`-rotate-90 ${isSelected('/docs#vue-ui-chestnut') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-chestnut') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-onion" >
                <div class="-ml-2 my-2"><ChartArcs3Icon :class="`${isSelected('/docs#vue-ui-onion') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-onion') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-vertical-bar" >
                <div class="-ml-2 my-2"><ChartBarIcon :class="`rotate-90 ${isSelected('/docs#vue-ui-vertical-bar') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-vertical-bar') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-heatmap" >
                <div class="-ml-2 my-2"><LayoutGridIcon :class="`${isSelected('/docs#vue-ui-heatmap') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-heatmap') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-scatter" >
                <div class="-ml-2 my-2"><ChartBubbleIcon :class="`${isSelected('/docs#vue-ui-scatter') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-scatter') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-candlestick" >
                <div class="-ml-2 my-2"><ChartCandleIcon :class="`${isSelected('/docs#vue-ui-candlestick') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-candlestick') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-age-pyramid" >
                <div class="-ml-2 my-2"><PyramidIcon :class="`${isSelected('/docs#vue-ui-age-pyramid') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-age-pyramid') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkline" >
                <div class="-ml-2 my-2"><ChartLineIcon :class="`${isSelected('/docs#vue-ui-sparkline') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-sparkline') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkbar" >
                <div class="-ml-2 my-2"><ChartBarIcon :class="`${isSelected('/docs#vue-ui-sparkbar') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-sparkbar') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-table">
                <div class="-ml-2 my-2"><TableIcon :class="`${isSelected('/docs#vue-ui-table') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-table') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-rating">
                <div class="-ml-2 my-2"><StarIcon :class="`${isSelected('/docs#vue-ui-rating') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-rating') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-screenshot">
                <div class="-ml-2 my-2"><ScreenshotIcon :class="`${isSelected('/docs#vue-ui-screenshot') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-screenshot') ? 2 : 1"/></div>
            </router-link>
            <router-link to="/docs#vue-ui-skeleton">
                <div class="-ml-2 my-2"><SkullIcon :class="`${isSelected('/docs#vue-ui-skeleton') ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected('/docs#vue-ui-skeleton') ? 2 : 1"/></div>
            </router-link>

    </template>
    </aside>
</template>