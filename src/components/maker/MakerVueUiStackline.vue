<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, AlertTriangleIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
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

const datasetItems = ref(defaultData.vue_ui_stackline.dataset)

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
        key: 'zoom',
        title: makerTranslations.value.categories.zoom[store.lang]
    },
    {
        key: 'padding',
        title: makerTranslations.value.categories.padding[store.lang]
    },
    {
        key: 'highlight',
        title: makerTranslations.value.categories.highlight[store.lang]
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
        key: 'line',
        title: makerTranslations.value.categories.lines[store.lang]
    },
    {
        key: 'table',
        title: makerTranslations.value.categories.table[store.lang]
    }
]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_stackline.model)))

onMounted(() => {
    if(localStorage.stacklineConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.stacklineConfig);
    } 
    if(localStorage.stacklineDataset) {
        datasetItems.value = JSON.parse(localStorage.stacklineDataset)
    }else {
        localStorage.setItem('stacklineDataset', JSON.stringify(defaultData.vue_ui_stackline.dataset))
    }
    step.value += 1;
});

const options = ref({
    datasetItem: {
        name: '...',
        color: '#CCCCCC',
        series: [0],
        shape: 'circle',
        standalone: false
    }
})

function saveDatasetToLocalStorage() {
    localStorage.stacklineDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.stacklineConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_stackline.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.stacklineConfig) {
        localStorage.setItem('stacklineConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addSeries() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItem))});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(index) {
    datasetItems.value.splice(index, 1)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function addValue(seriesIndex, itemIndex) {
    datasetItems.value[seriesIndex].series.push(0)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteValue(seriesIndex, valueIndex) {
    datasetItems.value[seriesIndex].series.splice(valueIndex, 1)
    step.value += 1;
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});
</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="stacklineConfig" keyDataset="stacklineDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-stackline" componentName="VueUiStackline"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueDataUi ref="chart" component="VueUiStackbar" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>

            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 mb-2`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <tr>
                            <th class="text-left text-xs h-[40px] px-2">Series name</th>
                            <th class="text-left text-xs h-[40px] px-2">Color</th>
                            <th class="text-left text-xs h-[40px] px-2">Shape</th>
                            <th class="text-left text-xs h-[40px] px-2">Standalone</th>
                            <th class="text-left text-xs h-[40px] px-2">Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" v-model="datasetItems[i].name" @change="saveDatasetToLocalStorage"></td>
                            <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                            <td>
                                <select v-model="datasetItems[i].shape" @change="saveDatasetToLocalStorage">
                                    <option>circle</option>
                                    <option>triangle</option>
                                    <option>square</option>
                                    <option>diamond</option>
                                    <option>pentagon</option>
                                    <option>hexagon</option>
                                    <option>star</option>
                                </select>
                            </td>
                            <td><input type="checkbox" v-model="datasetItems[i].standalone"></input></td>
                            <td class="bg-[#FFFFFF10] p-2 rounded-md flex flex-row place-items-center">
                                <div v-for="(item, j) in ds.series" class="flex flex-row gap-2 place-items-center justify-center">
                                    <div class="flex flex-col p-2 bg-[#FFFFFF10]">
                                        <button tabindex="0" @click="deleteValue(i,j)"><VueUiIcon name="close" stroke="#ff6400" :size="24" class="cursor-pointer" /></button>
                                        <div class="flex flex-col">
                                            <label class="text-left text-xs flex flex-row gap-2">{{ translations.maker.labels.period[store.lang] }} <AlertTriangleIcon class="text-app-orange" size="14" v-if="!CONFIG_MODEL.find(el => el.key === 'style.chart.grid.x.timeLabels.values').def[j]" /></label>
                                            <input @change="saveConfigToLocalStorage" class="w-full" type="text" v-model="CONFIG_MODEL.find(el => el.key === 'style.chart.grid.x.timeLabels.values').def[j]">
                                        </div>
                                        <div class="flex flex-col">
                                            <label :for="`item_${i}_${j}`" class="text-xs mr-2">Value</label>
                                            <input :id="`item_${i}_${j}`" type="number" v-model="datasetItems[i].series[j]" @change="saveDatasetToLocalStorage">
                                        </div>
                                    </div>
                                </div>
                                <button class="h-[40px] w-[40px] ml-2 rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addValue(i, j)"><PlusIcon/></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="mt-6 h-[40px] w-[40px] ml-2 rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addSeries()"><PlusIcon/></button>
        </details>

        <details open class="mt-12" v-if="makerTranslations.labels">
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
                componentName="VueUiStackline"
                configName="vue_ui_stackline"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="stacklineConfig"
                keyDataset="stacklineDataset"
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
            <VueDataUi component="VueUiStackline" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>