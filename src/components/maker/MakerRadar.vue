<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, XIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js";
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
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_radar.model)))

const options = ref({
    datasetItems: {
        name:  'name',
        values: [],
        target: 100,
    },
    categoryItems: {
        name: 'category',
        color: '#8A8A8A'
    },
    dataset: {
        categories: [],
        series: []
    },
    config: {},
})

const datasetItems = ref(defaultData.vue_ui_radar.dataset);
const categoryItems = ref(defaultData.vue_ui_radar.categories);

onMounted(() => {
    if(localStorage.radarConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.radarConfig);
    } 
    if(localStorage.radarDataset) {
        datasetItems.value = JSON.parse(localStorage.radarDataset)
    }else {
        localStorage.setItem('radarDataset', JSON.stringify(defaultData.vue_ui_radar.dataset))
    }
    if(localStorage.radarCategories) {
        categoryItems.value = JSON.parse(localStorage.radarCategories)
    } else {
        localStorage.setItem('radarCategories', JSON.stringify(defaultData.vue_ui_radar.categories))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.radarDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveCategoriesToLocalStorage() {
    localStorage.radarCategories = JSON.stringify(categoryItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.radarConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_radar.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.radarConfig) {
        localStorage.setItem('radarConfig', {});
        localStorage.setItem('radarDataset', []);
        localStorage.setItem('radarCategories', []);
    }
    saveConfigToLocalStorage();
    saveDatasetToLocalStorage();
    saveCategoriesToLocalStorage();
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems)), id: createUid(), values: categoryItems.value.map(_ => 0)});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function addCategoryItem() {
    categoryItems.value.push({...JSON.parse(JSON.stringify(options.value.categoryItems)), id: createUid()});
    datasetItems.value.forEach(ds => {
        ds.values.push(0)
    })
    step.value += 1;
    saveCategoriesToLocalStorage()
    saveDatasetToLocalStorage()
}

function deleteCategoryItem(index, id) {
    categoryItems.value = categoryItems.value.filter(_ => _.id !== id);
    datasetItems.value.forEach(ds => {
        ds.values.splice(index, 1)
    })
    saveCategoriesToLocalStorage()
    saveDatasetToLocalStorage()
}

function pushValueToSeries({ value, id }) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem.values.push(value)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function removeValueFromSeries({id, index}) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem.values.splice(index, i)
    step.value += 1;
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(! makerTranslations.value.labels[l]) return l
        return  makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

const dataset = computed(() => {
    return {
        categories: categoryItems.value,
        series: datasetItems.value
    }
});
</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="radarConfig" keyDataset="radarDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-radar" componentName="VueUiRadar"/>

    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <Transition name="fade">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiRadar ref="chart" :dataset="dataset" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>
    </div>

    <BaseCard>
        <details open>
            <summary class="cursor-pointer mb-4">{{  makerTranslations.categoriesLabel[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in categoryItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
    
                    <BaseButton
                        color="error"
                        :size="6"
                        fab
                        @click="deleteCategoryItem(i, ds.id)"
                        tw="absolute -top-2 -left-4"
                    >
                        <XIcon size="16" />
                    </BaseButton>
    
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.categoryName[store.lang] }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="color" v-model="categoryItems[i].color" @change="saveCategoriesToLocalStorage"></td>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveCategoriesToLocalStorage"></td>
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
                    @click="addCategoryItem"
                    :tooltip="translations.maker.tooltips.addCategory[store.lang]"
                    tooltip-position="right"
                >
                    <PlusIcon/>
                </BaseButton>
            </div>
        </details>
    </BaseCard>

    <BaseCard class="mt-4">
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#2A2A2A]`">
    
                    <BaseButton
                        color="error"
                        :size="6"
                        fab
                        @click="deleteDatasetItem(ds.id)"
                        tw="absolute -top-2 -left-4"
                    >
                        <XIcon size="16" />
                    </BaseButton>
                    
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.target[store.lang] }}</th>
                                <th class="text-left text-xs" v-for="category in categoryItems">{{ category.name }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="number" v-model="ds.target" @change="saveDatasetToLocalStorage"></td>
                                <td v-for="(val, i) in ds.values" @change="saveDatasetToLocalStorage"><input class="h-[36px] w-[84px]" type="number" v-model="ds.values[i]"></td>
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
        :dataset="{
            categories: categoryItems.map(({name, color }) => {return {name, color }}),
            series: datasetItems.map(({ name, values, color, target}) => { return {name, values, color, target}})
        }"
            :config="finalConfig"
            componentName="VueUiRadar"
            configName="vue_ui_radar"
            @click="() => copyComponent('componentContent', store)"
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            keyConfig="radarConfig"
            keyDataset="radarDataset"
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
            <VueUiRadar :dataset="dataset" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
