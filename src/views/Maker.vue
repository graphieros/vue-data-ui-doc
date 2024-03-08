<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"
import { CheckIcon, InfoSquareRoundedIcon } from "vue-tabler-icons"
import MakerXy from "../components/maker/MakerXy.vue"
import MakerDonut from "../components/maker/MakerDonut.vue"
import MakerWaffle from "../components/maker/MakerWaffle.vue"
import MakerRadar from "../components/maker/MakerRadar.vue"
import MakerGauge from "../components/maker/MakerGauge.vue"
import MakerOnion from "../components/maker/MakerOnion.vue"
import MakerQuadrant from "../components/maker/MakerQuadrant.vue"
import MakerWheel from "../components/maker/MakerWheel.vue"
import MakerTiremarks from "../components/maker/MakerTiremarks.vue"
import MakerChestnut from "../components/maker/MakerChestnut.vue"
import MakerVerticalBar from "../components/maker/MakerVerticalBar.vue";
import MakerHeatmap from "../components/maker/MakerHeatmap.vue";
import MakerSparkline from "../components/maker/MakerSparkline.vue";
import MakerSparkStackbar from "../components/maker/MakerSparkStackbar.vue";
import MakerSparkbar from "../components/maker/MakerSparkbar.vue";
import MakerSparkHistogram from "../components/maker/MakerSparkHistogram.vue";
import MakerDonutEvolution from "../components/maker/MakerDonutEvolution.vue";
import MakerRings from "../components/maker/MakerRings.vue";
import MakerScatter from "../components/maker/MakerScatter.vue";
import Tooltip from "../components/FlexibleTooltip.vue";

const store = useMainStore();
const makerStore = useMakerStore();

const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isCopy = computed(() => store.isCopy);

const options = ref([
    { name: "VueUiXy", icon: "chartLine", thumb: new URL('../assets/thumb_xy_light.png', import.meta.url).href},
    { name: "VueUiDonut", icon: "chartDonut", thumb: new URL('../assets/thumb_donut_light.png', import.meta.url).href},
    { name: "VueUiWaffle", icon: "chartWaffle", thumb: new URL('../assets/thumb_waffle_light.png', import.meta.url).href},
    { name: "VueUiRadar", icon: "chartRadar", thumb: new URL('../assets/thumb_radar_light.png', import.meta.url).href},
    { name: "VueUiGauge", icon: "chartGauge", thumb: new URL('../assets/thumb_gauge_light.png', import.meta.url).href},
    { name: "VueUiOnion", icon: "chartOnion", thumb: new URL('../assets/thumb_onion_light.png', import.meta.url).href},
    { name: "VueUiQuadrant", icon: "chartQuadrant", thumb: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href},
    { name: "VueUiWheel", icon: "chartWheel", thumb: new URL('../assets/thumb_wheel_light.png', import.meta.url).href},
    { name: "VueUiTiremarks", icon: "chartTiremarks", thumb: new URL('../assets/thumb_tiremarks_light.png', import.meta.url).href},
    { name: "VueUiChestnut", icon: "chartChestnut", thumb: new URL('../assets/thumb_chestnut_light.png', import.meta.url).href},
    { name: "VueUiVerticalBar", icon: "chartVerticalBar", thumb: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href},
    { name: "VueUiHeatmap", icon: "chartHeatmap", thumb: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href},
    { name: "VueUiSparkline", icon: "chartLine", thumb: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href},
    { name: "VueUiSparkStackbar", icon: "chartSparkStackbar", thumb: new URL('../assets/thumb_stackbar_light.png', import.meta.url).href},
    { name: "VueUiSparkbar", icon: "chartVerticalBar", thumb: new URL('../assets/thumb_sparkbar_light.png', import.meta.url).href},
    { name: "VueUiSparkHistogram", icon: "chartSparkHistogram", thumb: new URL('../assets/thumb_histogram_light.png', import.meta.url).href},
    { name: "VueUiDonutEvolution", icon: "chartDonutEvolution", thumb: new URL('../assets/thumb_donut_evolution_light.png', import.meta.url).href},
    { name: "VueUiRings", icon: "chartRings", thumb: new URL('../assets/thumb_rings_light.png', import.meta.url).href},
    { name: "VueUiScatter", icon: "chartScatter", thumb: new URL('../assets/thumb_scatter_light.png', import.meta.url).href}
])

const selectedChart = ref({name: "VueUiXy", icon: "chartLine"});

onMounted(() => {
    if(!localStorage.currentChart) {
        localStorage.setItem('currentChart', 'VueUiXy')
    } else {
        selectedChart.value = options.value.find(item => item.name === localStorage.currentChart)
    }
})

function saveSelectedChartToLocalStorage() {
    localStorage.currentChart = selectedChart.value.name;
}

function selectChart(opt) {
    selectedChart.value = opt;
    saveSelectedChartToLocalStorage()
}

</script>

<template>
    <div v-if="isCopy" class="animate-pulse origin-center z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] w-[80px] flex place-items-center place-content-center border-2 border-gray-400 dark:border-app-green dark:bg-black rounded-full bg-white">
        <CheckIcon size="42" class="dark:text-app-green"/>
    </div>
    <div class="w-full max-w-[1400px] mx-auto overflow-visible">
        <div class="w-full flex flex-row gap-4 place-items-center justify-center mt-6">
            <img src="../assets/logo.png" class="h-6">
            <h1 class="text-3xl text-center">{{ translations.menu.chartBuilder[store.lang] }}</h1>
        </div>

        <div class="mx-auto max-w-[400px] dark:text-app-green mt-6 flex flex-row gap-2">
            <div class="h-[40px] w-[40px]">
                <InfoSquareRoundedIcon/>
            </div>
            <div>
            
            <span>{{ makerTranslations.atWork[store.lang] }} : </span>
            <router-link to="/docs" class="text-app-blue underline">
                {{ translations.menu.docs[store.lang] }}
            </router-link>
            </div>
        </div>

        <div class="w-full max-w-[400px] flex flex-row flex-wrap gap-2 mx-auto justify-center my-12">
            <div v-for="option in options" class="relative">
                <Tooltip :content="option.name" width="w-fit min-w-[120px]" delay="delay-150" :img="option.thumb">
                    <button  @click="selectChart(option)" :class="`border p-2 rounded hover:bg-[#42d39233] transition-colors ${selectedChart.name === option.name ? 'border-app-blue bg-[#6376DD33] hover:bg-[#6376DD33] shadow-md' : 'border-gray-400 hover:border-app-green '}`">
                        <VueUiIcon :name="option.icon" :stroke="selectedChart.name === option.name ? '#6376DD' : isDarkMode ? '#AAAAAA' : '#1A1A1A'"></VueUiIcon>
                    </button>
                </Tooltip>
            </div>
        </div>

        <div class="w-full mt-6">
            <div class="flex flex-row gap-3 place-items-end justify-center">
                <div class="flex flex-col gap-2">
                    <label for="chartType">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>
                    <select @change="saveSelectedChartToLocalStorage" style="outline:1px solid #42d392 !important;margin-left:1px" id="chartType" v-model="selectedChart" class="h-[40px] px-6">
                        <option class="text-left" v-for="option in options" :value="option">{{ option.name }}</option>
                    </select>
                </div>
                <div style="margin-bottom:0.3px">
                    <VueUiIcon :size="38" :stroke-width="0.8" :name="selectedChart.icon" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                </div>
            </div>

                <div class="font-bold flex flex-col sm:flex-row gap-4 justify-center place-items-center my-12 bg-gray-200 dark:bg-[#FFFFFF10] w-fit mx-auto p-4 rounded-full">
                    <div class="py-2 px-4 rounded-full bg-gradient-to-r from-[#42d39210] to-[#42d39230] shadow-md">1. {{ makerTranslations.steps.one[store.lang] }}</div>
                    <div class="hidden sm:block">
                        <VueUiIcon name="arrowRight" stroke="#42d392" class="drop-shadow-lg" />
                    </div>
                    <div class="sm:hidden">
                        <VueUiIcon name="arrowBottom" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="py-2 px-4 rounded-full bg-gradient-to-r from-[#42d39230] to-[#42d39250] shadow-md">2. {{ makerTranslations.steps.two[store.lang] }}</div>
                    <div class="hidden sm:block">
                        <VueUiIcon name="arrowRight" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="sm:hidden">
                        <VueUiIcon name="arrowBottom" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="py-2 px-4 rounded-full bg-gradient-to-r from-[#42d39250] to-[#42d39270]  shadow-md">3. {{ makerTranslations.steps.three[store.lang] }}</div>
                </div>

        </div>

        <MakerXy v-if="selectedChart.name === 'VueUiXy'"/>
        <MakerDonut v-if="selectedChart.name === 'VueUiDonut'"/>
        <MakerWaffle v-if="selectedChart.name === 'VueUiWaffle'"/>
        <MakerRadar v-if="selectedChart.name === 'VueUiRadar'"/>
        <MakerGauge v-if="selectedChart.name === 'VueUiGauge'"/>
        <MakerOnion v-if="selectedChart.name === 'VueUiOnion'"/>
        <MakerQuadrant v-if="selectedChart.name === 'VueUiQuadrant'"/>
        <MakerWheel v-if="selectedChart.name === 'VueUiWheel'"/>
        <MakerTiremarks v-if="selectedChart.name === 'VueUiTiremarks'"/>
        <MakerChestnut v-if="selectedChart.name === 'VueUiChestnut'"/>
        <MakerVerticalBar v-if="selectedChart.name === 'VueUiVerticalBar'"/>
        <MakerHeatmap v-if="selectedChart.name === 'VueUiHeatmap'"/>
        <MakerSparkline v-if="selectedChart.name === 'VueUiSparkline'"/>
        <MakerSparkStackbar v-if="selectedChart.name === 'VueUiSparkStackbar'"/>
        <MakerSparkbar v-if="selectedChart.name === 'VueUiSparkbar'"/>
        <MakerSparkHistogram v-if="selectedChart.name === 'VueUiSparkHistogram'"/>
        <MakerDonutEvolution v-if="selectedChart.name === 'VueUiDonutEvolution'"/>
        <MakerRings v-if="selectedChart.name === 'VueUiRings'"/>
        <MakerScatter v-if="selectedChart.name === 'VueUiScatter'"/>
    </div>
</template>