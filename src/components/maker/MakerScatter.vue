<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, XIcon } from "vue-tabler-icons"
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
import BaseButton from "../Base/BaseButton.vue";

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
            key: 'padding',
            title: makerTranslations.value.categories.padding[store.lang]
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
            key: 'correlation',
            title: makerTranslations.value.categories.correlation[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_scatter.model)))

const options = ref({
    datasetItem: {
        name: 'Name',
        color: '#CCCCCC',
        values: [

        ],
        shape: 'circle'
    },
    valueItem: {
        x: 0,
        y: 0,
        name: 'Item',
        weight: 8
    }
})

const shapeOptions = [
    "circle",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "star",
];

const datasetItems = ref(defaultData.vue_ui_scatter.dataset);

onMounted(() => {
    if(localStorage.scatterConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.scatterConfig);
    } 
    if(localStorage.scatterDataset) {
        datasetItems.value = JSON.parse(localStorage.scatterDataset)
    }else {
        localStorage.setItem('scatterDataset', JSON.stringify(defaultData.vue_ui_scatter.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.scatterDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.scatterConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_scatter.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.scatterConfig) {
        localStorage.setItem('scatterConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItem)), id: createUid(), values: [{...JSON.parse(JSON.stringify(options.value.valueItem)), id: createUid()}]});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function addDatapoint(datasetId) {
    const thisDS = datasetItems.value.find(ds => ds.id === datasetId);
    thisDS.values.push({...JSON.parse(JSON.stringify(options.value.valueItem)), id: createUid()})
    saveDatasetToLocalStorage()
}

function deleteDatapoint(datasetId, datapointId) {
    const thisDS = datasetItems.value.find(ds => ds.id === datasetId);
    thisDS.values = thisDS.values.filter(d => d.id !== datapointId)
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="scatterConfig" keyDataset="scatterDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-scatter" componentName="VueUiScatter"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiScatter ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>

        </div>
        
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row place-items-center gap-3`" :style="`background:${ds.color}30`">

                    <BaseButton
                        color="error"
                        :size="6"
                        fab
                        @click="deleteDatasetItem(ds.id)"
                        tw="absolute -top-1 -left-4"
                    >
                        <XIcon size="16" />
                    </BaseButton>

                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.shape[store.lang] }}</th>
                                <th class="text-left text-xs" v-for="dp in ds.values">
                                    <div class="flex flex-col gap-2 relative">
                                        <div class="flex flex-row gap-2 place-items-center">
                                            <label class="text-xs text-left">{{ makerTranslations.labels.datapoint[store.lang] }} : {{ makerTranslations.labels.name[store.lang] }}</label>
                                            <BaseButton
                                                color="error"
                                                fab
                                                :size="4"
                                                @click="deleteDatapoint(ds.id, dp.id)"
                                            >
                                                <XIcon size="12" />
                                            </BaseButton>
                                        </div>
                                        <input class="h-[32px]" type="text" v-model="dp.name">
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>                    
                                <td>
                                    <input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage">
                                </td>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                <td><select class="h-[36px] pl-2" v-model="ds.shape" @change="saveDatasetToLocalStorage"><option v-for="opt in shapeOptions">{{ opt }}</option>
                                        </select></td>
                                <td v-for="dp in ds.values">
                                    <div class="flex flex-col gap-2"> 
                                        <div class="flex flex-col gap-2 mt-2">
                                            <label class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }} X</label>
                                            <input class="h-[32px]" type="number" v-model="dp.x">
                                        </div>
                                        <div class="flex flex-col gap-2 mt-2">
                                            <label class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }} Y</label>
                                            <input class="h-[32px]" type="number" v-model="dp.y">
                                        </div>
                                        <div class="flex flex-col gap-2 mt-2">
                                            <label class="text-left text-xs">{{ makerTranslations.labels.weight[store.lang] }}</label>
                                            <input class="h-[32px]" type="number" v-model="dp.weight">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <BaseButton 
                        color="success" 
                        fab
                        :size="6"
                        @click="addDatapoint(ds.id)"
                        :tooltip="translations.maker.tooltips.addData[store.lang]"
                    >
                        <PlusIcon/>
                    </BaseButton>
                </div>
            </div>
            <div class="flex flex-row gap-4 mt-4 mb-6">
                <BaseButton
                    color="success" 
                    fab
                    :size="10"
                    @click="addDatasetItem"
                    :tooltip="translations.maker.tooltips.addDataset[store.lang]"
                    tooltip-position="right"
                >
                    <PlusIcon/>
                </BaseButton>
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
                    :dataset="datasetItems.map(({name, values, color, shape}) => {
                    return {
                        name, values:values.map((v) => {
                            return {
                                x: v.x,
                                y: v.y,
                                name: v.name,
                                weight: v.weight
                            }
                        }), color, shape
                    }})"
                    :config="finalConfig"
                    componentName="VueUiScatter"
                    configName="vue_ui_scatter"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="scatterConfig"
                    keyDataset="scatterDataset"
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
            <VueUiScatter :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>