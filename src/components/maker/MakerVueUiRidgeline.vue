<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon, AlertTriangleIcon, XIcon } from "vue-tabler-icons"
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
import useMaker from "./useMaker.js";
import BaseButton from "../Base/BaseButton.vue";
import BaseCard from "../BaseCard.vue";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0)

const { isFixed, step, chart, fixChart } = useMaker();

const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

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
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
        },
        {
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
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
            key: 'dialog',
            title: makerTranslations.value.categories.modalDialog[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
});

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_ridgeline.model)))

const options = ref({
    datasetItems: {
        name: "name",
        datapoints: []
    },
    datapoint: {
        name: 'datapoint',
        values: [0]
    }
})

const datasetItems = ref(defaultData.vue_ui_ridgeline.dataset)

onMounted(() => {
    if(localStorage.ridgelineConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.ridgelineConfig);
    } 
    if(localStorage.ridgelineDataset) {
        datasetItems.value = JSON.parse(localStorage.ridgelineDataset)
    }else {
        localStorage.setItem('ridgelineDataset', JSON.stringify(defaultData.vue_ui_ridgeline.dataset))
    }
    step.value += 1;
});

const maxSeries = computed(() => {
    return Math.max(...datasetItems.value.flatMap(ds => ds.datapoints.flatMap(dp => dp.values.length)))
})

function saveDatasetToLocalStorage() {
    localStorage.ridgelineDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.ridgelineConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_ridgeline.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.ridgelineConfig) {
        localStorage.setItem('ridgelineConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems))});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(idx) {
    datasetItems.value = datasetItems.value.filter((el,i) => i !== idx);
    saveDatasetToLocalStorage()
}

function addDatapoint(datasetIndex) {
    const wasSingle = datasetItems.value[datasetIndex].datapoints.length >= 1;
    datasetItems.value[datasetIndex].datapoints.push({...JSON.parse(JSON.stringify(options.value.datapoint))})
    if (wasSingle) {
        datasetItems.value[datasetIndex].datapoints[datasetItems.value[datasetIndex].datapoints.length - 1].name = datasetItems.value[0].datapoints[0].name
    }
    saveDatasetToLocalStorage()
}

function addDatapointValue(datasetIndex, datapointIndex) {
    datasetItems.value[datasetIndex].datapoints[datapointIndex].values.push(0)
}

function deleteDatapoint(datasetIndex, datapointIndex) {
    datasetItems.value[datasetIndex].datapoints = datasetItems.value[datasetIndex].datapoints.filter((el, i) => i !== datapointIndex);
    saveDatasetToLocalStorage()
}

function deleteDatapointValue(datasetIndex, datapointIndex, valueIndex) {
    datasetItems.value[datasetIndex].datapoints[datapointIndex].values = datasetItems.value[datasetIndex].datapoints[datapointIndex].values.filter((el, i) => i !== valueIndex);
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="ridgelineConfig" keyDataset="ridgelineDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-ridgeline" componentName="VueUiRidgeline"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiRidgeline ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>

        <BaseCard>
            <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in datasetItems" :key="`ds-${i}`" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
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
                                    <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                    <th class="text-left text-xs flex flex-row place-items-center gap-4">
                                        {{ makerTranslations.datapoints[store.lang] }}
                                        <BaseButton
                                            color="success" 
                                            fab
                                            :size="6"
                                            @click="addDatapoint(i)"
                                            :tooltip="translations.maker.tooltips.addData[store.lang]"
                                            tooltip-position="right"
                                        >
                                            <PlusIcon/>
                                        </BaseButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input class="h-[36px] mr-2" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                    <td>
                                        <div class="border border-gray-500 p-2 rounded bg-[#1A1A1A10] dark:bg-[#FFFFFF10]">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="text-left text-xs">{{ makerTranslations.datapointName[store.lang] }} </th>
                                                        <th class="text-left text-xs">{{ makerTranslations.datapointColor[store.lang] }} </th>
                                                        <th class="text-left text-xs">{{ makerTranslations.datapointValues[store.lang] }} </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(dp, j) in ds.datapoints" :key="`dp-${i}-${j}`">
                                                        <td>
                                                            <div class="flex flex-row items-center gap-2">
                                                                <BaseButton
                                                                    color="error"
                                                                    :size="6"
                                                                    fab
                                                                    @click="deleteDatapoint(i,j)"
                                                                >
                                                                    <XIcon size="14" />
                                                                </BaseButton>
                                                                <input class="h-[36px] text-xs" v-model="dp.name" @change="saveDatasetToLocalStorage">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="color" v-model="dp.color" @change="saveDatasetToLocalStorage">
                                                        </td>
                                                        <td>
                                                            <div class="border border-gray-500 p-2 rounded bg-[#1A1A1A10] dark:bg-[#FFFFFF10]">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th class="text-left text-xs flex flex-row place-items-center gap-2">
                                                                        {{ makerTranslations.values[store.lang] }}
                                                                        <BaseButton
                                                                            color="success" 
                                                                            fab
                                                                            :size="6"
                                                                            @click="addDatapointValue(i,j)"
                                                                            :tooltip="translations.maker.tooltips.addData[store.lang]"
                                                                            tooltip-position="right"
                                                                        >
                                                                            <PlusIcon/>
                                                                        </BaseButton>
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td v-for="(val, k) in dp.values" :key="`val-${i}-${j}-${k}`">
                                                                    <div class="border border-gray-500 p-2 rounded bg-[#1A1A1A10] dark:bg-[#FFFFFF10]">
                                                                        <div class="flex flex-col">
                                                                            <button tabindex="0" @click="deleteDatapointValue(i,j,k)">
                                                                            <VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer" />
                                                                            </button>
                                                                            <label class="text-left text-xs flex flex-row gap-2">{{ translations.maker.labels.period[store.lang] }} <AlertTriangleIcon class="text-app-orange" size="14" v-if="!CONFIG_MODEL.find(el => el.key === 'style.chart.xAxis.labels.values').def[k]" /></label>
                                                                            <input @change="saveConfigToLocalStorage" class="w-[86px]" type="text" v-model="CONFIG_MODEL.find(el => el.key === 'style.chart.xAxis.labels.values').def[k]">
                                                                        </div>
                                                                        <input type="number" class="h[36px] w-[86px]" v-model="dp.values[k]">
                                                                    </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
                :dataset="datasetItems"
                :config="finalConfig"
                componentName="VueUiRidgeline"
                configName="vue_ui_ridgeline"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="ridgelineConfig"
                keyDataset="ridgelineDataset"
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
            <VueUiRidgeline :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>