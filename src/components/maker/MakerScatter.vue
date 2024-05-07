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
]

const datasetItems = ref(defaultData.vue_ui_scatter.dataset)

const step = ref(0)

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
<ClearStorageAndRefresh keyConfig="scatterConfig" keyDataset="scatterDataset" :key="`clear_${clearStep}`"/>
<DocLink to="vue-ui-scatter" name="VueUiScatter"/>

<div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
    <transition name="fade">                
        <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[300px]' : 'w-full mx-auto max-w-[600px]'}`" v-if="datasetItems.length">
            <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                    <PinnedOffIcon v-if="isFixed"/>
                    <PinIcon v-else/>
                </button>
                <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
            </div>
            <VueUiScatter :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </div>
    </transition>
</div>

<details open>
    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
    <div class="flex flex-col gap-2">
        <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row place-items-center gap-3`" :style="`background:${ds.color}30`">
            <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
            <table>
                <thead>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                    <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                    <th class="text-left text-xs">{{ makerTranslations.labels.shape[store.lang] }}</th>
                    <th class="text-left text-xs" v-for="dp in ds.values">
                        <div class="flex flex-col gap-2 relative">
                            <label class="text-xs text-left">{{ makerTranslations.labels.datapoint[store.lang] }} : {{ makerTranslations.labels.name[store.lang] }}</label>
                            <input class="h-[32px]" type="text" v-model="dp.name">
                            <button tabindex="0" @click="deleteDatapoint(ds.id, dp.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-0 right-0" /></button>
                        </div>
                    </th>

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
                <Tooltip :content="translations.maker.tooltips.addData[store.lang]">
                    <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatapoint(ds.id)"><PlusIcon/></button>
                </Tooltip>
            
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

        <div class="flex justify-end">
            <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
        </div>

        <template v-for="category in CONFIG_CATEGORIES">
        
            <div class="flex flex-col gap-2 shadow dark:shadow-md bg-[#5f8bee30] p-3 rounded my-4">
                <h4>{{ category.title }}</h4> 
                <div class="flex flex-row gap-4 place-items-center flex-wrap">
                    <div v-for="knob in CONFIG_MODEL.filter(k => k.category === category.key)" class="flex flex-col justify-start">
                        <label class="text-xs">{{ getLabel(knob.label) }}</label>
                        <div class="flex place-items-center justify-start h-[40px]">
                            <input class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :step="knob.step ?? 1" :type="knob.type" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def" @change="forceChartUpdate">
                            <select v-if="knob.type === 'select'" v-model="knob.def" @change="forceChartUpdate" class="h-[32px] px-2">
                                <option v-for="opt in knob.options">{{ opt }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </details>

    <div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
        <CopyComponent @click="() => copyComponent('componentContent', store)"/>
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
            @click="() => copyComponent('componentContent', store)"
        />     
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>