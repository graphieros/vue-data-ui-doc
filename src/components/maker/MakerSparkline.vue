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
            key: 'line',
            title: makerTranslations.value.categories.line[store.lang]
        },
        {
            key: 'bar',
            title: makerTranslations.value.categories.bar[store.lang]
        },
        {
            key: 'selector',
            title: makerTranslations.value.categories.selector[store.lang]
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
            key: 'tooltip',
            title: makerTranslations.value.categories.tooltip[store.lang] + ' (since v2.6.18)'
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_sparkline.model)))

const options = ref({
    dataset: {
        period: 'period',
        value: 0
    }
})

const datasetItems = ref(defaultData.vue_ui_sparkline.dataset);

onMounted(() => {
    if(localStorage.sparklineConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.sparklineConfig);
    } 
    if(localStorage.sparklineDataset) {
        datasetItems.value = JSON.parse(localStorage.sparklineDataset)
    }else {
        localStorage.setItem('sparklineDataset', JSON.stringify(defaultData.vue_ui_sparkline.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.sparklineDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.sparklineConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_sparkline.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.sparklineConfig) {
        localStorage.setItem('sparklineConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.dataset)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="sparklineConfig" keyDataset="sparklineDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-sparkline" componentName="VueUiSparkline"/>
    
    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <Transition name="fade">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiSparkline ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>
    </div>
    
    <BaseCard>
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs" v-for="(ds, i) in datasetItems">
                                    <div class="flex flex-col gap-2 px-1 relative">
                                        <div class="flex flex-row place-items-center gap-2">
                                            <label>{{ translations.maker.labels.period[store.lang] }}</label>

                                            <BaseButton
                                                color="error"
                                                :size="4"
                                                fab
                                                @click="deleteDatasetItem(ds.id)"
                                            >
                                                <XIcon size="12" />
                                            </BaseButton> 
                                        </div>
                                        <input class="h-[40px] w-[82px]" type="text" v-model="ds.period" @change="saveDatasetToLocalStorage(); forceChartUpdate()">
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-xs text-left" v-for="ds in datasetItems">
                                    <div class="flex flex-col gap-2 px-1 mt-2">
                                        <label>{{ makerTranslations.labels.value[store.lang] }}</label>
                                        <input class="h-[40px] w-[82px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage(); forceChartUpdate()">
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
                    :tooltip="translations.maker.tooltips.addData[store.lang]"
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
                :dataset="datasetItems.map(({period, value}) => {return {period, value}})"
                :config="finalConfig"
                componentName="VueUiSparkline"
                configName="vue_ui_sparkline"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="sparklineConfig"
                keyDataset="sparklineDataset"
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
            <VueUiSparkline :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
