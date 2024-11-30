<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, AlertTriangleIcon, CheckIcon, CopyIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { useDefaultDataStore } from "../../stores/defaultData"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { copyComponent, convertArrayToObject, getValueByPath, createUid } from "./lib.js"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
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
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_heatmap.model)))

const options = ref({
    dataset: {
        name: 'Name',
        values: []
    }
})

const currentDataset = ref(defaultData.vue_ui_heatmap.dataset)

const maxSeries = computed(() => {
    return Math.max(...currentDataset.value.map(ds => ds.values.length))
})

const step = ref(0);

onMounted(() => {
    if(localStorage.heatmapConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.heatmapConfig);
    } 
    if(localStorage.heatmapDataset) {
        currentDataset.value = JSON.parse(localStorage.heatmapDataset)
    }else {
        localStorage.setItem('heatmapDataset', JSON.stringify(defaultData.vue_ui_heatmap.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    step.value += 1;
    localStorage.heatmapDataset = JSON.stringify(currentDataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.heatmapConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_heatmap.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.heatmapConfig) {
        localStorage.setItem('heatmapConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    currentDataset.value.push({...JSON.parse(JSON.stringify(options.value.dataset)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    currentDataset.value = currentDataset.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function pushValueToSeries({ value, id}) {
    const thisItem = currentDataset.value.find(_ => _.id === id)
    thisItem.values.push(value)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteValueFromSeries({id, index}) {
    const thisItem = currentDataset.value.find(_ => _.id === id);
    thisItem.values.splice(index, 1)
    step.value += 1;
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
    <div>

        <ClearStorageAndRefresh keyConfig="heatmapConfig" keyDataset="heatmapDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-heatmap" componentName="VueUiHeatmap"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <transition name="fade">                
                <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[88px] right-2 z-20 w-[300px]' : 'w-full mx-auto max-w-[600px]'}`" v-if="currentDataset.length">
                    <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                        <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                            <PinnedOffIcon v-if="isFixed"/>
                            <PinIcon v-else/>
                        </button>
                        <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
                    </div>
                    <VueUiHeatmap :dataset="currentDataset" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </transition>
        </div>
        
        <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in currentDataset" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`" :style="`background:${ds.color}30`">
                        <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                        <table>
                            <thead>
                                <tr>
                                    <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                    <th v-for="(_, j) in maxSeries">
                                        <div class="flex flex-col">
                                            <label class="text-left text-xs flex flex-row gap-2">{{ translations.maker.labels.period[store.lang] }} - {{ j }} <AlertTriangleIcon class="text-app-orange" size="14" v-if="!CONFIG_MODEL.find(el => el.key === 'style.layout.dataLabels.xAxis.values').def[j]" /><CheckIcon class="text-app-green" v-else size="14"/></label>
                                            <input @change="saveConfigToLocalStorage" class="w-[86px]" type="text" v-model="CONFIG_MODEL.find(el => el.key === 'style.layout.dataLabels.xAxis.values').def[j]">
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                    <td v-for="(val, j) in currentDataset[i].values">
                                        <div class="relative">
                                            <input @change="saveDatasetToLocalStorage" type="number" style="" v-model="currentDataset[i].values[j]" class="h-[36px] w-[86px]"><button tabindex="0" @click="deleteValueFromSeries({id: ds.id, index: j})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2.5 left-1" /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <Tooltip :content="translations.maker.tooltips.addData[store.lang]">
                                            <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="pushValueToSeries({ value: 0, id: ds.id})"><PlusIcon/></button>
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
                    :dataset="currentDataset.map(({name, values}) => {return {name, values}})"
                    :config="finalConfig"
                    componentName="VueUiHeatmap"
                    configName="vue_ui_heatmap"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="heatmapConfig"
                    keyDataset="heatmapDataset"
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