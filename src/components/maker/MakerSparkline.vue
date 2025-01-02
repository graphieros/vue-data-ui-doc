<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
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
            key: 'line',
            title: makerTranslations.value.categories.line[store.lang]
        },
        {
            key: 'bar',
            title: makerTranslations.value.categories.bar[store.lang]
        },
        {
            key: 'selector',
            title: makerTranslations.value.categories.selector[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'title',
            title: makerTranslations.value.categories.title[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_sparkline.model)))

const options = ref({
    dataset: {
        period: 'period',
        value: 0
    }
})

const datasetItems = ref(defaultData.vue_ui_sparkline.dataset)

const step = ref(0)

onMounted(() => {
    if(localStorage.sparklineConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.sparklineConfig);
    } 
    if(localStorage.sparklineDataset) {
        datasetItems.value = JSON.parse(localStorage.sparklineDataset)
    }else {
        localStorage.setItem('sparklineDataset', JSON.stringify(defaultData.vue_ui_sparkline.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.sparklineDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.sparklineConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_sparkline.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.sparklineConfig) {
        localStorage.setItem('sparklineConfig', {})
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

        <ClearStorageAndRefresh keyConfig="sparklineConfig" keyDataset="sparklineDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-sparkline" componentName="VueUiSparkline"/>
    
    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <BaseMakerChart
            v-if="!isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiSparkline :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </div>
    
    <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs" v-for="(ds, i) in datasetItems">
                                    <div class="flex flex-col gap-2 px-1 relative">
                                        <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-1 right-0" /></button>
                                        <label>{{ translations.maker.labels.period[store.lang] }}</label>
                                        <input class="h-[40px] w-[82px]" type="text" v-model="ds.period" @change="saveDatasetToLocalStorage(); forceChartUpdate()">
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-xs text-left" v-for="ds in datasetItems">
                                    <div class="flex flex-col gap-2 px-1 mt-2">
                                        <label>{{ makerTranslations.labels.value[store.lang] }}</label>
                                        <input class="h-[40px] w-[82px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage(); forceChartUpdate()">
                                    </div>
                                </td>
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
                :dataset="datasetItems.map(({period, value}) => {return {period, value}})"
                :config="finalConfig"
                componentName="VueUiSparkline"
                configName="vue_ui_sparkline"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="sparklineConfig"
                keyDataset="sparklineDataset"
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
        <VueUiSparkline :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
    </BaseMakerChart>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
