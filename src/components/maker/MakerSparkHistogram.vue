<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import useMaker from "./useMaker.js";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0);

const { isFixed, step, chart, fixChart } = useMaker();

const translations = computed(() => {
    return store.translations;
});

const makerTranslations = computed(() => {
    return makerStore.translations;
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'selector',
            title: makerTranslations.value.categories.selector[store.lang]
        },
        {
            key: 'title',
            title: makerTranslations.value.categories.title[store.lang]
        },
        {
            key: 'subtitle',
            title: makerTranslations.value.categories.subtitle[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_sparkhistogram.model)))

const options = ref({
    dataset: {
        value: 0,
        valueLabel: 'label',
        timeLabel: 'label',
        intensity: 1
    }
})

const datasetItems = ref(defaultData.vue_ui_sparkhistogram.dataset);

onMounted(() => {
    if(localStorage.sparkHistogramConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.sparkHistogramConfig);
    } 
    if(localStorage.sparkHistogramDataset) {
        datasetItems.value = JSON.parse(localStorage.sparkHistogramDataset)
    }else {
        localStorage.setItem('sparkHistogramDataset', JSON.stringify(defaultData.vue_ui_sparkhistogram.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.sparkHistogramDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.sparkHistogramConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_sparkhistogram.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.sparkHistogramConfig) {
        localStorage.setItem('sparkHistogramConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.dataset)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="sparkHistogramConfig" keyDataset="sparkHistogramDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-sparkhistogram" componentName="VueUiSparkHistogram"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiSparkHistogram ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>
        
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-row gap-2 w-full overflow-auto">
                <div v-for="(ds, i) in datasetItems" :class="`shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`" :style="`background:${ds.color}30`">
                    <div class="relative flex flex-col gap-2">
                        <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2 -right-2" /></button>
                        <div class="flex flex-col gap-2">
                            <label class="text-sm text-left">{{ translations.maker.labels.period[store.lang] }} : {{ makerTranslations.labels.labels[store.lang] }}</label>
                            <input class="h-[36px] w-[100px]" type="text" v-model="ds.timeLabel" @change="saveDatasetToLocalStorage">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-sm text-left">{{ makerTranslations.labels.value[store.lang] }} : {{ makerTranslations.labels.labels[store.lang] }}</label>
                            <input class="h-[36px] w-[100px]" type="text" v-model="ds.valueLabel" @change="saveDatasetToLocalStorage">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-sm text-left">{{ makerTranslations.labels.value[store.lang] }}</label>
                            <input class="h-[36px] w-[100px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-sm text-left">{{ makerTranslations.labels.opacity[store.lang] }} : {{ ds.intensity }} </label>
                            <input class="h-[36px] w-[100px] accent-app-blue" type="range" min="0" max="1" step="0.01" v-model="ds.intensity" @change="saveDatasetToLocalStorage">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-4 mt-4 mb-6">
                <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                    <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatasetItem"><PlusIcon/></button>
                </Tooltip>
            </div>
        </details>
        
        <details open class="mt-6" v-if="makerTranslations.labels">
            <summary class="cursor-pointer">{{ makerTranslations.config[store.lang] }}</summary>
        
            <MakerKnobs
                :categories="CONFIG_CATEGORIES"
                :model="CONFIG_MODEL"
                @change="forceChartUpdate"
            />
        </details>
        
        <div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
            <ComponentContent
                :dataset="datasetItems.map(({value, valueLabel, timeLabel, intensity}) => {return {value, valueLabel, timeLabel, intensity}})"
                :config="finalConfig"
                componentName="VueUiSparkHistogram"
                configName="vue_ui_sparkhistogram"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="sparkHistogramConfig"
                keyDataset="sparkHistogramDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>      
            <slot name="rater"/>      
        </div>
    </div>
    <Transition name="fade">
        <BaseMakerChart
            v-if="isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiSparkHistogram :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
