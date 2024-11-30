<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { convertArrayToObject, copyComponent } from "./lib.js"
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
});

const translations = computed(() => {
    return store.translations;
});

const makerTranslations = computed(() => {
    return makerStore.translations;
});

const isFixed = ref(!isMobile.value);

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
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
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
});

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_flow.model)))

const options = ref({
    datasetItem: ['', '', 0]
});

const datasetItems = ref(defaultData.vue_ui_flow.dataset);

const step = ref(0);

onMounted(() => {
    if(localStorage.flowConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.flowConfig);
    } 
    if(localStorage.flowDataset) {
        datasetItems.value = JSON.parse(localStorage.flowDataset)
    }else {
        localStorage.setItem('flowDataset', JSON.stringify(defaultData.vue_ui_flow.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.flowDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.flowConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_flow.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.flowConfig) {
        localStorage.setItem('flowConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push(JSON.parse(JSON.stringify(options.value.datasetItem)));
    console.log(datasetItems.value)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(index) {
    datasetItems.value.splice(index, 1)
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});

function fixChart() {
    isFixed.value = !isFixed.value;
    setTimeout(() => {
        step.value += 1;
    }, 100)
}

</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="flowConfig" keyDataset="flowDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-flow" :example="false" componentName="VueUiFlow"/>
    
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <BaseMakerChart
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueDataUi component="VueUiFlow" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </div>
    
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                    <button tabindex="0" @click="deleteDatasetItem(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">Source</th>
                                <th class="text-left text-xs">Target</th>
                                <th class="text-left text-xs">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" v-model="datasetItems[i][0]" @change="saveDatasetToLocalStorage"></td>
                                <td><input type="text" v-model="datasetItems[i][1]" @change="saveDatasetToLocalStorage"></td>
                                <td><input type="number" min="0" v-model="datasetItems[i][2]" @change="saveDatasetToLocalStorage"></td>
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
                :dataset="datasetItems"
                :config="finalConfig"
                componentName="VueUiFlow"
                configName="vue_ui_flow"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="flowConfig"
                keyDataset="flowDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>         
        </div>
    </div>
</template>