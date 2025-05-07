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
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

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
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_tiremarks.model)));

const currentDataset = ref(defaultData.vue_ui_tiremarks.dataset);

onMounted(() => {
    if(localStorage.tiremarksConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.tiremarksConfig);
    } 
    if(localStorage.tiremarksDataset) {
        currentDataset.value = JSON.parse(localStorage.tiremarksDataset)
    }else {
        localStorage.setItem('tiremarksDataset', JSON.stringify(defaultData.vue_ui_tiremarks.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    step.value += 1;
    localStorage.tiremarksDataset = JSON.stringify(currentDataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.tiremarksConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_tiremarks.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.tiremarksConfig) {
        localStorage.setItem('tiremarksConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(! makerTranslations.value.labels[l]) return l
        return  makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

function randomVal() {
    currentDataset.value.percentage = Math.random() * 100; 
}
</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="tiremarksConfig" keyDataset="tiremarksDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-tiremarks" :example="false" componentName="VueUiTiremarks"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiTiremarks ref="chart" :dataset="currentDataset" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
            </div>
        
            <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div  :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF12]`">
                        <table>
                            <thead>
                                <tr>
                                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.percentage[store.lang] }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <button class="py-2 px-5 rounded border border-black dark:border-app-blue hover:bg-[#5f8aee20] transition-colors" @click="randomVal">Random value</button> : {{ currentDataset.percentage.toFixed(2) }}
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
                    :dataset="currentDataset"
                    :config="finalConfig"
                    componentName="VueUiTiremarks"
                    configName="vue_ui_tiremarks"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="tiremarksConfig"
                    keyDataset="tiremarksDataset"
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
            <VueUiTiremarks :dataset="currentDataset" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>