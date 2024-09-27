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

const datasetItems = ref(defaultData.vue_ui_nested_donuts.dataset)

const step = ref(0)

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
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => makerTranslations.value.labels[l][store.lang]).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

</script>

<template>
    <ClearStorageAndRefresh keyConfig="donutConfig" keyDataset="donutDataset" :key="`clear_${clearStep}`"/>
    <DocLink to="vue-ui-nested-donuts" name="VueUiNestedDonuts"/>

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
                <VueUiNestedDonuts :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </div>
        </transition>
    </div>

    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`" :style="`background:${ds.color}30`">
                <button v-if="datasetItems.length > 1" tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                        <th class="text-left text-xs" v-for="(s, j) in ds.series"><span class="pl-2">{{ makerTranslations.labels.series[store.lang] }}</span></th>
                        <th/>
                    </thead>
                    <tbody>
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
        />  
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>