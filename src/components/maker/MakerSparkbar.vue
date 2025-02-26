<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
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
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_sparkbar.model)))

const options = ref({
    dataset: {
        name: 'Name',
        value: 0,
        prefix: '',
        suffix: '%',
        color: '#CCCCCC',
        target: null
    }
})

const datasetItems = ref(defaultData.vue_ui_sparkbar.dataset);

onMounted(() => {
    if(localStorage.sparkbarConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.sparkbarConfig);
    } 
    if(localStorage.sparkbarDataset) {
        datasetItems.value = JSON.parse(localStorage.sparkbarDataset)
    }else {
        localStorage.setItem('sparkbarDataset', JSON.stringify(defaultData.vue_ui_sparkbar.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.sparkbarDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
    step.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.sparkbarConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_sparkbar.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.sparkbarConfig) {
        localStorage.setItem('sparkbarConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.dataset)), id: createUid()});
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

        <ClearStorageAndRefresh keyConfig="sparkbarConfig" keyDataset="sparkbarDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-sparkbar" :example="false" componentName="VueUiSparkbar"/>
    
    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <Transition name="fade">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiSparkbar ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>
    </div>
    
    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <tr>
                            <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.rounding[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.prefix[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.suffix[store.lang] }}</th>
                            <th class="text-left text-xs">Target</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="color" v-model="ds.color" @change="saveDatasetToLocalStorage"></td>
                            <td><input class="h-[28px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                            <td><BaseNumberInput :buttonColor="ds.color" v-model:value="ds.value" :min="0" @change="saveDatasetToLocalStorage"/></td>
                            <td><BaseNumberInput :buttonColor="ds.color" v-model:value="ds.rounding" :min="0" :max="12" @change="saveDatasetToLocalStorage"/></td>
                            <td><input class="h-[28px] w-[82px]" type="text" v-model="ds.prefix" @change="saveDatasetToLocalStorage"></td>
                            <td><input class="h-[28px] w-[82px]" type="text" v-model="ds.suffix" @change="saveDatasetToLocalStorage"></td>
                            <td><BaseNumberInput :buttonColor="ds.color" v-model:value="ds.target" @change="saveDatasetToLocalStorage"/></td>
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
                :dataset="datasetItems.map(({name, value, color, prefix, suffix, rounding}) => {return {name, value, color, prefix, suffix, rounding}})"
                :config="finalConfig"
                componentName="VueUiSparkbar"
                configName="vue_ui_sparkbar"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="sparkbarConfig"
                keyDataset="sparkbarDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>            
        </div>
    </div>
    <Transition name="fade">
        <BaseMakerChart
            v-if="isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiSparkbar :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
