<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PinIcon, PinnedOffIcon, CopyIcon, PlusIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import Tooltip from "../../components/FlexibleTooltip.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
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

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isFixed = ref(!isMobile.value);


const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
        },
        {
            key: 'padding',
            title: makerTranslations.value.categories.padding[store.lang]
        },
        {
            key: 'grid',
            title: makerTranslations.value.categories.grid[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'datapoints',
            title: makerTranslations.value.categories.datapoints[store.lang]
        },
        {
            key: 'highlight',
            title: makerTranslations.value.categories.highlight[store.lang]
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
        },
        {
            key: 'translations',
            title: makerTranslations.value.categories.translations[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_age_pyramid.model)));

const options = ref({
    datasetItem : ['year', 0, 0, 0]
})

const datasetItems = ref(defaultData.vue_ui_age_pyramid.dataset)

const step = ref(0);

onMounted(() => {
    if(localStorage.pyramidConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.pyramidConfig);
    } 
    if(localStorage.pyramidDataset) {
        datasetItems.value = JSON.parse(localStorage.pyramidDataset)
    }else {
        localStorage.setItem('pyramidDataset', JSON.stringify(defaultData.vue_ui_age_pyramid.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    step.value += 1;
    localStorage.pyramidDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.pyramidConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_age_pyramid.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.pyramidConfig) {
        localStorage.setItem('pyramidConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push(JSON.parse(JSON.stringify(options.value.datasetItem)))
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(index) {
    datasetItems.value = datasetItems.value.filter((_, i) => i !== index);
    saveDatasetToLocalStorage()
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

        <ClearStorageAndRefresh keyConfig="pyramidConfig" keyDataset="pyramidDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-age-pyramid" :example="false" componentName="VueUiAgePyramid"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <BaseMakerChart
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiAgePyramid :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
            </div>
        
            <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`" :style="`background:${ds.color}30`">
                        <button tabindex="0" @click="deleteDatasetItem(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                        <table>
                            <thead>
                                <tr>
                                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.period[store.lang] }}</th>
                                    <th class="text-left text-xs">{{ makerTranslations.labels.age[store.lang] }}</th>
                                    <th class="text-left text-xs">{{ makerTranslations.labels.left[store.lang] }}</th>
                                    <th class="text-left text-xs">{{ makerTranslations.labels.right[store.lang] }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input class="h-[36px]" type="text" v-model="ds[0]" @change="saveDatasetToLocalStorage"></td>
                                    <td><input class="h-[36px]" type="number" v-model="ds[1]" @change="saveDatasetToLocalStorage"></td>
                                    <td><input class="h-[36px]" type="number" v-model="ds[2]" @change="saveDatasetToLocalStorage"></td>
                                    <td><input class="h-[36px]" type="number" v-model="ds[3]" @change="saveDatasetToLocalStorage"></td>
                                </tr>
                            </tbody>
                        </table>
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
                    :dataset="datasetItems"
                    :config="finalConfig"
                    componentName="VueUiAgePyramid"
                    configName="vue_ui_age_pyramid"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="pyramidConfig"
                    keyDataset="pyramidDataset"
                >
                    <template #component-copy>
                        <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                    </template>
                </ComponentContent>   
            </div>
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
