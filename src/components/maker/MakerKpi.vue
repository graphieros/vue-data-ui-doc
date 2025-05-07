<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";;
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import useMaker from "./useMaker.js";

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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_kpi.model)))

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
        },
    ]
})

const datasetItems = ref(defaultData.vue_ui_kpi.dataset);

onMounted(() => {
    if(localStorage.kpiConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.kpiConfig);
    } 
    if(localStorage.kpiDataset) {
        datasetItems.value = JSON.parse(localStorage.kpiDataset)
    }else {
        localStorage.setItem('kpiDataset', JSON.stringify(defaultData.vue_ui_kpi.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.kpiDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
    step.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.kpiConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_kpi.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function forceChartUpdate() {
    if(!localStorage.kpiConfig) {
        localStorage.setItem('kpiConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const accordionConfig = ref(
    {
            open: true,
            head: {
                backgroundColor: 'transparent',
                iconColor: '#42d392'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            }
        }
)
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="kpiConfig" keyDataset="kpiDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-kpi" :example="false" componentName="VueUiKpi"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                    expandedWidth="max-w-[300px]"
                >
                    <VueDataUi ref="chart" component="VueUiKpi" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
            </div>
        
            <VueDataUi
                component="VueUiAccordion"
                :config="accordionConfig"
            >
                <template #title>
                    {{ makerTranslations.dataset[store.lang] }}
                </template>
                <template #content>
                    <div class="flex flex-col gap-2">
                        <div  :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.value[store.lang] }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="number" v-model="datasetItems" @change="saveDatasetToLocalStorage"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
            </VueDataUi>
        
            <VueDataUi
                component="VueUiAccordion"
                :config="accordionConfig"
            >
                <template #title>
                    {{ makerTranslations.config[store.lang] }}
                </template>
                <template #content>
        
                    <MakerKnobs
                        :categories="CONFIG_CATEGORIES"
                        :model="CONFIG_MODEL"
                        @change="forceChartUpdate"
                    />
                </template>
            </VueDataUi>
        
        
            <div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
                <ComponentContent
                    :dataset="datasetItems"
                    :config="finalConfig"
                    componentName="VueUiKpi"
                    configName="vue_ui_kpi"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="kpiConfig"
                    keyDataset="kpiDataset"
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
            expandedWidth="max-w-[300px]"
        >
            <VueDataUi component="VueUiKpi" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>