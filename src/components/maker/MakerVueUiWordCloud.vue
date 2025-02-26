<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue"
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import { createWordCloudDatasetFromPlainText } from "vue-data-ui"
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

const isDarkMode = computed(() => store.isDarkMode);

const makerTranslations = computed(() => {
    return makerStore.translations;
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
            key: 'subtitle',
            title: makerTranslations.value.categories.subtitle[store.lang]
        },
        {
            key: 'tooltip',
            title: makerTranslations.value.categories.tooltip[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_word_cloud.model)));

const datasetItems = ref(defaultData.vue_ui_word_cloud.dataset)

onMounted(() => {
    if(localStorage.wordCloudConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.wordCloudConfig);
    } 
    if(localStorage.wordCloudDataset) {
        datasetItems.value = JSON.parse(localStorage.wordCloudDataset)
    }else {
        localStorage.setItem('wordCloudDataset', JSON.stringify(defaultData.vue_ui_word_cloud.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.wordCloudDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.wordCloudConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_word_cloud.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.wordCloudConfig) {
        localStorage.setItem('wordCloudConfig', {})
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

        <ClearStorageAndRefresh keyConfig="wordCloudConfig" keyDataset="wordCloudDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-word-cloud" componentName="VueUiWordCloud"/>
    
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiWordCloud ref="chart" :dataset="createWordCloudDatasetFromPlainText(datasetItems, w => w.toLowerCase())" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>

        </div>
    
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <textarea class="p-4 bg-white dark:bg-[#2A2A2A] h-[200px] rounded-md" v-model="datasetItems" @change="step += 1"></textarea>
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
                :dataset="createWordCloudDatasetFromPlainText(datasetItems, word => word.toLowerCase()).sort((a, b) => b.value - a.value)"
                :config="finalConfig"
                componentName="VueUiWordCloud"
                configName="vue_ui_word_cloud"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="wordCloudConfig"
                keyDataset="wordCloudDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>          
        </div>
    </div>
    <Transition name="fade">
        <BaseMakerChart
            v-if="isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiWordCloud :dataset="createWordCloudDatasetFromPlainText(datasetItems, w => w.toLowerCase())" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>