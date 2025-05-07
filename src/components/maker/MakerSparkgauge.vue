<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
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
            key: 'title',
            title: makerTranslations.value.categories.title[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
    ]
});

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_sparkgauge.model)));

const datasetItems = ref(defaultData.vue_ui_sparkgauge.dataset);

onMounted(() => {
    if(localStorage.sparkgaugeConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.sparkgaugeConfig);
    } 
    if(localStorage.sparkgaugeDataset) {
        datasetItems.value = JSON.parse(localStorage.sparkgaugeDataset)
    }else {
        localStorage.setItem('sparkgaugeDataset', JSON.stringify(defaultData.vue_ui_sparkgauge.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.sparkgaugeDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.sparkgaugeConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_sparkgauge.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.sparkgaugeConfig) {
        localStorage.setItem('sparkgaugeConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="sparkgaugeConfig" keyDataset="sparkgaugeDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-sparkgauge" :example="false" componentName="VueUiSparkGauge"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiSparkgauge ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>
        
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs px-2">
                                    {{ makerTranslations.labels.value[store.lang] }}
                                </th>
                                <th class="text-left text-xs px-2">
                                    {{ makerTranslations.labels.min[store.lang] }}
                                </th>
                                <th class="text-left text-xs px-2">
                                    {{ makerTranslations.labels.max[store.lang] }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-xs text-left px-2">
                                    <input class="h-[40px] w-[82px]" type="number" v-model="datasetItems.value" @change="saveDatasetToLocalStorage(); forceChartUpdate()">
                                </td>
                                <td class="text-xs text-left px-2">
                                    <input class="h-[40px] w-[82px]" type="number" v-model="datasetItems.min" @change="saveDatasetToLocalStorage(); forceChartUpdate()">
                                </td>
                                <td class="text-xs text-left px-2">
                                    <input class="h-[40px] w-[82px]" type="number" v-model="datasetItems.max" @change="saveDatasetToLocalStorage(); forceChartUpdate()">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                    :dataset="datasetItems"
                    :config="finalConfig"
                    componentName="VueUiSparkgauge"
                    configName="vue_ui_sparkgauge"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="sparkgaugeConfig"
                    keyDataset="sparkgaugeDataset"
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
            <VueUiSparkgauge :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
