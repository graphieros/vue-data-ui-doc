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
            key: 'title',
            title: makerTranslations.value.categories.title[store.lang]
        },
        {
            key: 'subtitle',
            title: makerTranslations.value.categories.subtitle[store.lang]
        },
        {
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_history_plot.model)))

const options = ref({
    datasetItems: {
        name: "...",
        color: '#CCCCCC',
        values: [
            {x: 0, y: 0, label: '...'}
        ]
    }
});

const datasetItems = ref(defaultData.vue_ui_history_plot.dataset);
const step = ref(0);

onMounted(() => {
    if(localStorage.historyPlotConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.historyPlotConfig);
    } 
    if(localStorage.historyPlotDataset) {
        datasetItems.value = JSON.parse(localStorage.historyPlotDataset)
    }else {
        localStorage.setItem('historyPlotDataset', JSON.stringify(defaultData.vue_ui_history_plot.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.historyPlotDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.historyPlotConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_history_plot.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.historyPlotConfig) {
        localStorage.setItem('historyPlotConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems))});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(index) {
    datasetItems.value = datasetItems.value.filter((_,i) => i !== index);
    saveDatasetToLocalStorage()
}

function addDatapoint(seriesIndex) {
    datasetItems.value[seriesIndex].values.push(JSON.parse(JSON.stringify(options.value.datasetItems.values[0])));
    saveDatasetToLocalStorage();
}

function deleteDatapoint(seriesIndex, datapointIndex) {
    datasetItems.value[seriesIndex].values = datasetItems.value[seriesIndex].values.filter((dp, i) => i !== datapointIndex);
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
        <ClearStorageAndRefresh keyConfig="historyPlotConfig" keyDataset="historyPlotDataset" :key="`clear_${clearStep}`"/>

        <BaseDocExampleLink link="vue-ui-history-plot" componentName="VueUiHistoryPlot"/>

        <BaseMakerChart
            v-if="!isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueDataUi component="VueUiHistoryPlot" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in datasetItems" :class="`w-fit bg-gray-200 dark:bg-[#FFFFFF10] overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <tr>
                            <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.name[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.color[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.series[store.lang] }}</th>
                            <th>
                                <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatapoint(i)"><PlusIcon/></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input class="h-[36px]" type="text" v-model="datasetItems[i].name" @change="saveDatasetToLocalStorage"></td>
                            <td><input class="h-[36px]" type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                            <td>
                                <div class="flex flex-row gap-2 overflow-scroll max-w-[800px]">
                                    <div v-for="dp, i in ds.values">
                                        <div class="flex flex-col gap-1">
                                            <label class="text-xs">Label:</label>
                                            <input type="text" class="w-[84px]" v-model="dp.label"/>
                                        </div>
                                        <div class="flex flex-col gap-1">
                                            <label class="text-xs">X:</label>
                                            <input type="number" class="w-[84px]" v-model="dp.x"/>
                                        </div>
                                        <div class="flex flex-col gap-1">
                                            <label class="text-xs">Y:</label>
                                            <input type="number" class="w-[84px]" v-model="dp.y"/>
                                        </div>
                                    </div>
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
                :dataset="datasetItems.map(({name, values, color}) => { return {name, values, color}})"
                :config="finalConfig"
                componentName="VueUiHistoryPlot"
                configName="vue_ui_history_plot"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="historyPlotConfig"
                keyDataset="historyPlotDataset"
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
        <VueDataUi component="VueUiHistoryPlot" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
    </BaseMakerChart>
</template>