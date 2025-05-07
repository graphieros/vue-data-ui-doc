<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue"
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
            key: 'donut',
            title: makerTranslations.value.categories.donut[store.lang]
        },
        {
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_nested_donuts.model)))

const options = ref({
    datasetItems: {
        name: 'Group',
        series: []
    },
    seriesItem: {
        name: 'Serie',
        color: '#CCCCCC',
        values: [0]
    }
})

const datasetItems = ref(defaultData.vue_ui_nested_donuts.dataset);

onMounted(() => {
    if(localStorage.nestedDonutsConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.nestedDonutsConfig);
    } 
    if(localStorage.nestedDonutsDataset) {
        datasetItems.value = JSON.parse(localStorage.nestedDonutsDataset)
    }else {
        localStorage.setItem('nestedDonutsDataset', JSON.stringify(defaultData.vue_ui_nested_donuts.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.nestedDonutsDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.donutConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_nested_donuts.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.nestedDonutsConfig) {
        localStorage.setItem('nestedDonutsConfig', JSON.stringify(defaultData.vue_ui_nested_donuts.model))
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems)), id: createUid(), series: [{...JSON.parse(JSON.stringify(options.value.seriesItem)), id: createUid()}]});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function addSeriesItem(datasetId) {
    const thisDs = datasetItems.value.find(ds => ds.id === datasetId);
    thisDs.series.push({...JSON.parse(JSON.stringify(options.value.seriesItem)), id: createUid()})
    saveDatasetToLocalStorage()
}

function deleteSeriesItem(datasetId, seriesId) {
    const thisDs = datasetItems.value.find(ds => ds.id === datasetId);
    thisDs.series = thisDs.series.filter(s => s.id !== seriesId)
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="nestedDonutsConfig" keyDataset="nestedDonutsDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-nested-donuts" componentName="VueUiNestedDonuts"/>
    
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiNestedDonuts ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>
    
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`" :style="`background:${ds.color}30`">
                    <button v-if="datasetItems.length > 1" tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                <th class="text-left text-xs" v-for="(s, j) in ds.series"><span class="pl-2">{{ makerTranslations.labels.series[store.lang] }}</span></th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                <td v-for="(s, j) in ds.series">
                                    <div class="flex flex-col gap-2 p-4 mx-2 rounded-md shadow-md relative" :style="`background:${s.color}33`">
                                        <button v-if="ds.series.length > 1" tabindex="0" @click="deleteSeriesItem(ds.id, s.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 right-1" /></button>
                                        <div class="flex flex-row place-items-center gap-2">
                                            <div class="flex flex-col gap-1">
                                                <label class="text-xs">
                                                    {{ makerTranslations.labels.color[store.lang] }}
                                                </label>
                                                <input type="color" v-model="s.color">
                                            </div>
                                            <div class="flex flex-col gap-1">
                                                <label class="text-xs">
                                                    {{ makerTranslations.labels.name[store.lang] }}
                                                </label>
                                                <input class="h-[36px]" type="text" v-model="s.name">
                                            </div>
                                            <div class="flex flex-col gap-1">
                                                <label class="text-xs">
                                                    {{ makerTranslations.labels.value[store.lang] }}
                                                </label>
                                                <input class="h-[36px] w-[64px]" type="number" v-model="s.values[0]">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                                        <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addSeriesItem(ds.id)"><PlusIcon/></button>
                                    </Tooltip>
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
                :dataset="datasetItems.map(({name, series}) => {
                    return {
                        name,
                        series: series.map(({name, color, values}) => {
                            return {
                                name,
                                color,
                                values
                            }
                        })
                    }
                })"
                :config="finalConfig"
                componentName="VueUiNestedDonuts"
                configName="vue_ui_nested_donuts"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="nestedDonutsConfig"
                keyDataset="nestedDonutsDataset"
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
            <VueUiNestedDonuts :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>