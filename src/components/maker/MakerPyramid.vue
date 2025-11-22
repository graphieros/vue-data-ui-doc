<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, XIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import Tooltip from "../../components/FlexibleTooltip.vue";
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
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'datapoints',
            title: makerTranslations.value.categories.datapoints[store.lang]
        },
        {
            key: 'highlight',
            title: makerTranslations.value.categories.highlight[store.lang]
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
        },
        {
            key: 'translations',
            title: makerTranslations.value.categories.translations[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_age_pyramid.model)));

const options = ref({
    datasetItem : ['year', 0, 0, 0]
})

const datasetItems = ref(defaultData.vue_ui_age_pyramid.dataset);

onMounted(() => {
    if(localStorage.pyramidConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.pyramidConfig);
    } 
    if(localStorage.pyramidDataset) {
        datasetItems.value = JSON.parse(localStorage.pyramidDataset)
    }else {
        localStorage.setItem('pyramidDataset', JSON.stringify(defaultData.vue_ui_age_pyramid.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    step.value += 1;
    localStorage.pyramidDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.pyramidConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_age_pyramid.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.pyramidConfig) {
        localStorage.setItem('pyramidConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push(JSON.parse(JSON.stringify(options.value.datasetItem)))
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(index) {
    datasetItems.value = datasetItems.value.filter((_, i) => i !== index);
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});
</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="pyramidConfig" keyDataset="pyramidDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-age-pyramid" :example="false" componentName="VueUiAgePyramid"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiAgePyramid ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
            </div>
        
            <BaseCard>
                <details open>
                    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                    <div class="flex flex-col gap-2">
                        <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`" :style="`background:${ds.color}30`">

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
                                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.period[store.lang] }}</th>
                                        <th class="text-left text-xs">{{ makerTranslations.labels.age[store.lang] }}</th>
                                        <th class="text-left text-xs">{{ makerTranslations.labels.left[store.lang] }}</th>
                                        <th class="text-left text-xs">{{ makerTranslations.labels.right[store.lang] }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input class="h-[36px]" type="text" v-model="ds[0]" @change="saveDatasetToLocalStorage"></td>
                                        <td><input class="h-[36px]" type="number" v-model="ds[1]" @change="saveDatasetToLocalStorage"></td>
                                        <td><input class="h-[36px]" type="number" v-model="ds[2]" @change="saveDatasetToLocalStorage"></td>
                                        <td><input class="h-[36px]" type="number" v-model="ds[3]" @change="saveDatasetToLocalStorage"></td>
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
                    :dataset="datasetItems"
                    :config="finalConfig"
                    componentName="VueUiAgePyramid"
                    configName="vue_ui_age_pyramid"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="pyramidConfig"
                    keyDataset="pyramidDataset"
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
            <VueUiAgePyramid :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
