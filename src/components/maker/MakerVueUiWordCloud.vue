<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue"
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import { createWordCloudDatasetFromPlainText } from "vue-data-ui"
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0)

const isMobile = computed(() => {
    return window.innerWidth < 800;
})

const translations = computed(() => {
    return store.translations;
})

const isDarkMode = computed(() => store.isDarkMode);

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const isFixed = ref(!isMobile.value);

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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_word_cloud.model)))

const step = ref(0)

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
})

function fixChart() {
    isFixed.value = !isFixed.value;
    setTimeout(() => {
        step.value += 1;
    }, 100)
}


</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="wordCloudConfig" keyDataset="wordCloudDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-word-cloud" componentName="VueUiWordCloud"/>
    
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiWordCloud :dataset="createWordCloudDatasetFromPlainText(datasetItems, w => w.toLowerCase())" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>

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
    <BaseMakerChart
        v-if="isFixed"
        :isFixed="isFixed"
        @fixChart="fixChart"
        @resetModel="resetModel"
    >
        <VueUiWordCloud :dataset="createWordCloudDatasetFromPlainText(datasetItems, w => w.toLowerCase())" :config="finalConfig" :key="`chart_${step}`"/>
    </BaseMakerChart>
</template>