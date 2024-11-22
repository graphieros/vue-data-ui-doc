<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
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
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'grid',
            title: makerTranslations.value.categories.grid[store.lang]
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
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_waffle.model)))

const options = ref({
    datasetItems: {
        name: "name",
        values: [],
        color: "#CCCCCC"
    },
    dataset: [],
    config: {}
})

const datasetItems = ref(defaultData.vue_ui_waffle.dataset)

const step = ref(0)

onMounted(() => {
    if(localStorage.waffleConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.waffleConfig);
    } 
    if(localStorage.waffleDataset) {
        datasetItems.value = JSON.parse(localStorage.waffleDataset)
    }else {
        localStorage.setItem('waffleDataset', JSON.stringify(defaultData.vue_ui_waffle.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.waffleDataset = JSON.stringify(datasetItems.value);
    nextTick(() => {
        clearStep.value += 1;
        step.value += 1;
    })
}

function saveConfigToLocalStorage() {
    localStorage.waffleConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_waffle.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.waffleConfig) {
        localStorage.setItem('waffleConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems)), id: createUid()});
    saveDatasetToLocalStorage()
    nextTick(() => {
        step.value += 1;
    })
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage();
}

function pushValueToSeries({ value, id }) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem.values = [value];
    step.value += 1;
    saveDatasetToLocalStorage();
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

function fixChart() {
    isFixed.value = !isFixed.value;
    setTimeout(() => {
        step.value += 1;
    }, 100)
}

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="waffleConfig" keyDataset="waffleDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-waffle" componentName="VueUiWaffle"/>

    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <BaseMakerChart
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiWaffle :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </div>

    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                    </thead>
                    <tbody>
                        <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.values[0]" @change="saveDatasetToLocalStorage"></td>
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
            :dataset="datasetItems.map(({name, values, color }) => {return {name, values, color}})"
            :config="finalConfig"
            componentName="VueUiWaffle"
            configName="vue_ui_waffle"
            @click="() => copyComponent('componentContent', store)"
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            keyConfig="waffleConfig"
            keyDataset="waffleDataset"
        >
            <template #component-copy>
                <CopyComponent @click="() => copyComponent('componentContent', store)"/>
            </template>
        </ComponentContent>    
    </div>
    </div>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
