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
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
        },
        {
            key: 'bars',
            title: makerTranslations.value.categories.bars[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'serieLabels',
            title: makerTranslations.value.categories.serieLabels[store.lang]
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
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_vertical_bar.model)))

const options = ref({
    parent: {
        name: 'name',
        value: 0,
        color: '#42d392',
        children: []
    },
    child: {
        name: 'child serie',
        value: 0
    }
})

const datasetItems = ref(defaultData.vue_ui_vertical_bar.dataset);

onMounted(() => {
    if(localStorage.verticalBarConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.verticalBarConfig);
    } 
    if(localStorage.verticalBarDataset) {
        datasetItems.value = JSON.parse(localStorage.verticalBarDataset)
    }else {
        localStorage.setItem('verticalBarDataset', JSON.stringify(defaultData.vue_ui_vertical_bar.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.verticalBarDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.verticalBarConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_vertical_bar.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.verticalBarConfig) {
        localStorage.setItem('verticalBarConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.parent)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    step.value += 1;
    saveDatasetToLocalStorage()
}

function addChild({parentId}) {
    const thisParent = datasetItems.value.find(_ => _.id === parentId);
    thisParent.children.push(JSON.parse(JSON.stringify(options.value.child)));
    step.value += 1;
    saveDatasetToLocalStorage();
}

function nukeChild({parentId, index}) {
    const thisParent = datasetItems.value.find(_ => _.id === parentId);
    thisParent.children.splice(index, 1);
    step.value += 1;
    saveDatasetToLocalStorage();
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function updateParent({parentId}) {
    const thisParent = datasetItems.value.find(_ => _.id === parentId);
    thisParent.value = thisParent.children.map(c => c.value).reduce((a,b) => a + b, 0);
    step.value += 1;
    saveDatasetToLocalStorage();
}
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="verticalBarConfig" keyDataset="verticalBarDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-vertical-bar" componentName="VueUiVerticalBar"/>
    
    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <Transition name="fade">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiVerticalBar ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>
    </div>
    
    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <div class="flex flex-col gap-2 place-items-end">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.breakdown[store.lang] }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="color" v-model="ds.color" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage"></td>
                                <td>
                                    <div v-for="(child, j) in ds.children" class="relative p-2 bg-[#FFFFFF33] dark:bg-[#FFFFFF10] rounded shadow-md mb-2">
                                        <button tabindex="0" @click="nukeChild({ parentId: ds.id, index: j})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-2 left-1" /></button>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="text-xs text-left">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                                    <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input class="h-[36px]" type="text" v-model="child.name" @change="saveDatasetToLocalStorage"></td>
                                                    <td><input class="h-[36px]" type="number" v-model="child.value" @change="updateParent({parentId: ds.id})"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Tooltip :content="translations.maker.tooltips.addData[store.lang]">
                        <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addChild({parentId: ds.id})"><PlusIcon/></button>
                    </Tooltip>
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
                :dataset="datasetItems.map(({name, value, color, children}) => {return {name, value, color, children}})"
                :config="finalConfig"
                componentName="VueUiVerticalBar"
                configName="vue_ui_vertical_bar"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="verticalBarConfig"
                keyDataset="verticalBarDataset"
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
            <VueUiVerticalBar :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>