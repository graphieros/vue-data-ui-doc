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
    { name: "VueUiXy", icon: "chartLine"},
    { name: "VueUiDonut", icon: "chartDonut"},
    { name: "VueUiWaffle", icon: "chartWaffle"},
    { name: "VueUiRadar", icon: "chartRadar"},
    { name: "VueUiGauge", icon: "chartGauge"},
    { name: "VueUiOnion", icon: "chartOnion"},
    { name: "VueUiQuadrant", icon: "chartQuadrant"},
    { name: "VueUiWheel", icon: "chartWheel"},
    { name: "VueUiTiremarks", icon: "chartTiremarks"},
    { name: "VueUiChestnut", icon: "chartChestnut"},
    { name: "VueUiVerticalBar", icon: "chartVerticalBar"},
    { name: "VueUiHeatmap", icon: "chartHeatmap"},
    { name: "VueUiSparkline", icon: "chartLine"},
    { name: "VueUiSparkStackbar", icon: "chartSparkStackbar"},
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
                <Tooltip :content="option.name" width="w-fit" delay="delay-150">
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
                    <div v-html="makerTranslations.steps[store.lang]" class="mx-auto w-fit mt-6"/>
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


    </div>
</template>