<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js";
import { useDefaultDataStore } from "../../stores/defaultData"
import BaseShape from "../../components/BaseShape.vue";
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

const isDarkMode = computed(() => store.isDarkMode);

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
            key: 'grid',
            title: makerTranslations.value.categories.grid[store.lang]
        },
        {
            key: 'datapoints',
            title: makerTranslations.value.categories.datapoints[store.lang]
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
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_quadrant.model)))

const shapeOptions = ref([
    'circle',
    'triangle',
    'square',
    'diamond',
    'pentagon',
    'hexagon',
    'star'
])

const options = ref({
    name: 'name',
    shape: 'circle',
    color: '#42d392',
    series: [
        { 
            name: 'serie name',
            x: 0,
            y: 0
        }
    ]
});

const datasetItems = ref(defaultData.vue_ui_quadrant.dataset);

onMounted(() => {
    if(localStorage.quadrantConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.quadrantConfig);
    } 
    if(localStorage.quadrantDataset) {
        datasetItems.value = JSON.parse(localStorage.quadrantDataset)
    }else {
        localStorage.setItem('quadrantDataset', JSON.stringify(defaultData.vue_ui_quadrant.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.quadrantDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.quadrantConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_quadrant.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.quadrantConfig) {
        localStorage.setItem('quadrantConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage();
}

function addSerieItem(id) {
    const thisDs = datasetItems.value.find(ds => ds.id === id);
    thisDs.series.push({ name: 'serie name', x: 0, y: 0});
    saveDatasetToLocalStorage();
}

function deleteSerieItem(id, index) {
    const thisDs = datasetItems.value.find(ds => ds.id === id);
    thisDs.series.splice(index, 1);
    saveDatasetToLocalStorage();
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
</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="quadrantConfig" keyDataset="quadrantDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-quadrant" componentName="VueUiQuadrant"/>

<div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
    <Transition name="fade">
        <BaseMakerChart
            v-if="!isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiQuadrant ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</div>

<details open>
    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
    <div class="flex flex-col gap-2">
        <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
            <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
            <table>
                <thead>
                    <tr>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.shape[store.lang] }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>                    
                        <td><input type="color" v-model="ds.color" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                        <td><div class="flex flex-row gap-2 place-items-center"><select class="h-[36px] pl-2" v-model="ds.shape" @change="saveDatasetToLocalStorage"><option v-for="opt in shapeOptions">{{ opt }}</option></select><div class="w-[24px]"><BaseShape :shape="ds.shape" :color="ds.color" /></div></div></td>
                        <td v-for="(serie, j) in ds.series">
                            <div class="relative flex flex-col gap-2 bg-[#FFFFFF33] shadow dark:bg-[#FFFFFF12] p-2 rounded ml-2">
                                <label class="text-xs text-left">{{ makerTranslations.labels.datapoint[store.lang] }}</label>
                                <input type="text" v-model="datasetItems[i].series[j].name" @change="saveDatasetToLocalStorage">
                                <label class="text-xs text-left">X</label>
                                <input type="number" v-model="datasetItems[i].series[j].x"  @change="saveDatasetToLocalStorage(); forceChartUpdate()">
                                <label class="text-xs text-left">Y</label>
                                <input type="number" v-model="datasetItems[i].series[j].y" @change="saveDatasetToLocalStorage(); forceChartUpdate">
                                <button tabindex="0" @click="deleteSerieItem(ds.id, j)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2.5 left-1" /></button>
                            </div>
                        </td>
                        <td>
                            <Tooltip :content="translations.maker.tooltips.addData[store.lang]">
                                <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addSerieItem(ds.id)"><PlusIcon/></button>
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
        :dataset="datasetItems.map(({name, shape, color, series}) => {return {name, shape, color, series}})"
        :config="finalConfig"
        componentName="VueUiQuadrant"
        configName="vue_ui_quadrant"
        @click="() => copyComponent('componentContent', store)"
        :copyComponentFunc="() => copyComponent('componentContent', store)"
        keyConfig="quadrantConfig"
        keyDataset="quadrantDataset"
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
            <VueUiQuadrant :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>    
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
