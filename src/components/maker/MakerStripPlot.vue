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
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0)
const step = ref(0)
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
            key: 'plots',
            title: makerTranslations.value.categories.plot[store.lang]
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
            key: 'tooltip',
            title: makerTranslations.value.categories.tooltip[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_strip_plot.model)))

const options = ref({
    category: {
        name: 'Category',
        plots: [],
        color: '#6A6A6A'
    },
    plot: {
        name: 'Plot',
        value: 0
    }
})

const datasetItems = ref(defaultData.vue_ui_strip_plot.dataset)

onMounted(() => {
    if(localStorage.stripPlotConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.stripPlotConfig);
    } 
    if(localStorage.stripPlotDataset) {
        datasetItems.value = JSON.parse(localStorage.stripPlotDataset)
    }else {
        localStorage.setItem('stripPlotDataset', JSON.stringify(defaultData.vue_ui_strip_plot.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.stripPlotDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.stripPlotConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_strip_plot.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.stripPlotConfig) {
        localStorage.setItem('stripPlotConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addCategory() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.category)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteCategory(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function addPlot(catId) {
    const cat = datasetItems.value.find(el => el.id === catId);
    cat.plots.push({...JSON.parse(JSON.stringify(options.value.plot)), id: createUid()});
    saveDatasetToLocalStorage()
}

function deletePlot(catId, plotId) {
    const cat = datasetItems.value.find(el => el.id === catId);
    cat.plots = cat.plots.filter(el => el.id !== plotId);
    saveDatasetToLocalStorage();
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

        <ClearStorageAndRefresh keyConfig="stripPlotConfig" keyDataset="stripPlotDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-strip-plot" componentName="VueUiStripPlot"/>
    
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <BaseMakerChart
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
                expandedWidth="max-w-[400px]"
            >
                <VueDataUi component="VueUiStripPlot" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </div>
    
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                    <button tabindex="0" @click="deleteCategory(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.categoryName[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.plots[store.lang] }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                <td class="flex flex-row place-items-center gap-4">
                                    <div class="flex flex-row gap-4">
                                        <div v-for="p in datasetItems[i].plots" class="bg-[#FFFFFF10] rounded-md p-1 shadow-md flex flex-col gap-4 relative">
                                            <div class="flex flex-col gap-2">
                                                <label class="text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</label>
                                                <input type="text" v-model="p.name" @change="saveDatasetToLocalStorage"/>
                                            </div>
                                            <div class="flex flex-col gap-2">
                                                <label class="text-xs">{{ makerTranslations.labels.value[store.lang] }}</label>
                                                <input type="number" v-model="p.value" @change="saveDatasetToLocalStorage"/>
                                            </div>
                                            <button tabindex="0" @click="deletePlot(ds.id, p.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 right-1" /></button>
                                        </div>
                                    </div>
                                    <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                                        <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addPlot(ds.id)"><PlusIcon/></button>
                                    </Tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="flex flex-row gap-4 mt-4 mb-6">
                <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                    <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addCategory"><PlusIcon/></button>
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
                :dataset="datasetItems.map(({name, plots}) => { return {name, plots: plots.map(p => {
                    return {
                        name: p.name,
                        value: p.value
                    }
                })}})"
                :config="finalConfig"
                componentName="VueUiStripPlot"
                configName="vue_ui_strip_plot"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="stripPlotConfig"
                keyDataset="stripPlotDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>          
        </div>
    </div>

</template>