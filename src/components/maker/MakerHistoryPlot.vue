<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, XIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
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
import BaseButton from "../Base/BaseButton.vue";
import BaseCard from "../BaseCard.vue";

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
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
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
});
</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="historyPlotConfig" keyDataset="historyPlotDataset" :key="`clear_${clearStep}`"/>

        <BaseDocExampleLink link="vue-ui-history-plot" componentName="VueUiHistoryPlot"/>

        <Transition name="fade">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueDataUi ref="chart" component="VueUiHistoryPlot" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>

        <BaseCard>
            <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in datasetItems" :class="`w-fit bg-gray-200 dark:bg-[#FFFFFF10] overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">

                    <BaseButton
                        color="error"
                        :size="6"
                        fab
                        @click="deleteDatasetItem(i)"
                        tw="absolute -top-1 -left-4"
                    >
                        <XIcon size="16" />
                    </BaseButton>

                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.name[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.series[store.lang] }}</th>
                                <th>
                                    <BaseButton
                                        color="success" 
                                        fab
                                        :size="6"
                                        @click="addDatapoint(i)"
                                        :tooltip="translations.maker.tooltips.addData[store.lang]"
                                        tooltip-position="left"
                                    >
                                        <PlusIcon/>
                                    </BaseButton>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input class="h-[36px]" type="text" v-model="datasetItems[i].name" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                                <td>
                                    <div class="flex flex-row gap-2 overflow-scroll max-w-[800px]">
                                        <div v-for="dp, j in ds.values" class="relative">
                                            <div class="flex flex-col gap-1">
                                                <div class="flex flex-row gap-2 align-center">
                                                    <label class="text-xs">Label:</label>
                                                    <BaseButton
                                                        color="error"
                                                        :size="4"
                                                        fab
                                                        @click="deleteDatapoint(i, j)"
                                                        class="mb-2"
                                                    >
                                                        <XIcon size="12" />
                                                    </BaseButton>
                                                </div>
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
        </BaseCard>

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
            <VueDataUi component="VueUiHistoryPlot" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>