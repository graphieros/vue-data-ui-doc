<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, XIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { convertArrayToObject, copyComponent } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue"
import BaseShape from "../BaseShape.vue";
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
            key: 'padding',
            title: makerTranslations.value.categories.padding[store.lang]
        },
        {
            key: 'datapoints',
            title: makerTranslations.value.categories.datapoints[store.lang]
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
        }
    ]
});

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_parallel_coordinate_plot.model)))

const options = ref({
    seriesItem: {
        name: 'Series',
        shape: 'circle',
        color: '#CCCCCC',
        series: []
    },
    itemUnit: {
        name: 'Item',
        values: []
    }
});

const datasetItems = ref(defaultData.vue_ui_parallel_coordinate_plot.dataset);

onMounted(() => {
    if(localStorage.pcpConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.pcpConfig);
    } 
    if(localStorage.pcpDataset) {
        datasetItems.value = JSON.parse(localStorage.pcpDataset)
    }else {
        localStorage.setItem('pcpDataset', JSON.stringify(defaultData.vue_ui_parallel_coordinate_plot.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.pcpDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.pcpConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_parallel_coordinate_plot.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.pcpConfig) {
        localStorage.setItem('pcpConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});

function deleteDatasetItem(index) {
    datasetItems.value.splice(index, 1)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function addDatasetItem() {
    datasetItems.value.push(JSON.parse(JSON.stringify(options.value.seriesItem)));
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteItem(seriesIndex, itemIndex) {
    datasetItems.value[seriesIndex].series.splice(itemIndex, 1)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function addItem(seriesIndex) {
    datasetItems.value[seriesIndex].series.push(JSON.parse(JSON.stringify(options.value.itemUnit)))
    step.value += 1;
    saveDatasetToLocalStorage()
}

function addValue(seriesIndex, itemIndex) {
    datasetItems.value[seriesIndex].series[itemIndex].values.push(0)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteValue(seriesIndex, itemIndex, valueIndex) {
    datasetItems.value[seriesIndex].series[itemIndex].values.splice(valueIndex, 1)
    step.value += 1;
    saveDatasetToLocalStorage()
}
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="pcpConfig" keyDataset="pcpDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-parallel-coordinate-plot" :example="false" componentName="VueUiParallelCoordinatePlot"/>
    
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueDataUi ref="chart" component="VueUiParallelCoordinatePlot" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>
    
        <BaseCard>
            <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">

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
                                    <th class="text-left text-xs h-[40px] px-2">Series name</th>
                                    <th class="text-left text-xs h-[40px] px-2">Color</th>
                                    <th class="text-left text-xs h-[40px] px-2">Shape</th>
                                    <th class="text-left text-xs h-[40px] px-2">Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" v-model="datasetItems[i].name" @change="saveDatasetToLocalStorage"></td>
                                    <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                                    <td>
                                        <div class="flex flex-row gap-2 place-items-center mr-2">
                                            <select v-model="datasetItems[i].shape">
                                                <option>circle</option>
                                                <option>triangle</option>
                                                <option>diamond</option>
                                                <option>square</option>
                                                <option>pentagon</option>
                                                <option>hexagon</option>
                                                <option>star</option>
                                            </select>
                                            <div class="w-[40px]">
                                                <BaseShape :shape="ds.shape" :color="ds.color" />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="bg-[#FFFFFF10] p-2 rounded-md ">
                                        <div v-for="(item, j) in ds.series" class="flex flex-row gap-2 place-items-center justify-start">
                                            <BaseButton
                                                color="error"
                                                :size="6"
                                                fab
                                                @click="deleteItem(i,j)"
                                                class="-mb-4"
                                            >
                                                <XIcon size="14" />
                                            </BaseButton> 

                                            <div class="flex flex-col">
                                                <label :for="`item_${i}_${j}`" class="text-xs mr-2">Item name:</label>
                                                <input :id="`item_${i}_${j}`" type="text" v-model="datasetItems[i].series[j].name" @change="saveDatasetToLocalStorage">
                                            </div>
                                            <div class="flex flex-row gap-2 place-items-center">
                                                <div v-for="(val, k) in item.values" class="relative mr-4">
                                                    <label :for="`item_${i}_${j}_${k}`" class="text-xs mr-2">Y Axis {{ k +1 }}</label>
                                                    <div class="flex flex-row gap-2 place-items-center">
                                                        <input class="w-[100px]" :id="`item_${i}_${j}_${k}`" type="number" v-model="datasetItems[i].series[j].values[k]" @change="saveDatasetToLocalStorage">
                                                        <BaseButton
                                                            color="error"
                                                            :size="4"
                                                            fab
                                                            @click="deleteValue(i,j,k)"
                                                        >
                                                            <XIcon size="12" />
                                                        </BaseButton> 
                                                    </div>
                                                </div>
                                                <BaseButton
                                                    color="success"
                                                    :size="4"
                                                    :tooltip="translations.maker.tooltips.addData[store.lang]"
                                                    fab
                                                    @click="addValue(i, j)"
                                                    class="mt-6"
                                                >
                                                    <PlusIcon/>
                                                </BaseButton>
                                            </div>
                                        </div>
                                        <BaseButton
                                            color="success"
                                            fab
                                            @click="addItem(i)"
                                            :tooltip="translations.maker.tooltips.addData[store.lang]"
                                            class="mt-3"
                                        >
                                            <PlusIcon/>
                                        </BaseButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                :dataset="datasetItems"
                :config="finalConfig"
                componentName="VueUiParallelCoordinatePlot"
                configName="vue_ui_parallel_coordinate_plot"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="pcpConfig"
                keyDataset="pcpDataset"
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
            <VueDataUi component="VueUiParallelCoordinatePlot" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>