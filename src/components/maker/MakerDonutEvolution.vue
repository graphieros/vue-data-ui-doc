<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon, AlertTriangleIcon } from "vue-tabler-icons"
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
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_donut_evolution.model)))

const options = ref({
    dataset: {
        name: "Name",
        values: [],
        color: '#CCCCCC'
    }
})

const datasetItems = ref(defaultData.vue_ui_donut_evolution.dataset)

const step = ref(0)

onMounted(() => {
    if(localStorage.donutEvolutionConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.donutEvolutionConfig);
    } 
    if(localStorage.donutEvolutionDataset) {
        datasetItems.value = JSON.parse(localStorage.donutEvolutionDataset)
    }else {
        localStorage.setItem('donutEvolutionDataset', JSON.stringify(defaultData.vue_ui_donut_evolution.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.donutEvolutionDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.donutEvolutionConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_donut_evolution.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.donutEvolutionConfig) {
        localStorage.setItem('donutEvolutionConfig', {})
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

function pushValueToSeries({ value, id }) {
    const thisItem = datasetItems.value.find(_ => _.id === id)
    thisItem.values.push(value)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteValueFromSeries({id, index}) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem.values.splice(index, 1)
    step.value += 1;
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

const maxSeries = computed(() => {
    return Math.max(...datasetItems.value.map(ds => ds.values.length))
})

function fixChart() {
    isFixed.value = !isFixed.value;
    setTimeout(() => {
        step.value += 1;
    }, 100)
}

</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="donutEvolutionConfig" keyDataset="donutEvolutionDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-donut-evolution" name="VueUiDonutEvolution"/>
    
    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <BaseMakerChart
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiDonutEvolution :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
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
                        <th v-for="(_, j) in maxSeries">
                            <div class="flex flex-col">
                                <label class="text-left text-xs flex flex-row gap-2">{{ translations.maker.labels.period[store.lang] }} <AlertTriangleIcon class="text-app-orange" size="14" v-if="!CONFIG_MODEL.find(el => el.key === 'style.chart.layout.grid.xAxis.dataLabels.values').def[j]" /></label>
                                <input @change="saveConfigToLocalStorage(); saveDatasetToLocalStorage()" class="w-[86px]" type="text" v-model="CONFIG_MODEL.find(el => el.key === 'style.chart.layout.grid.xAxis.dataLabels.values').def[j]">
                            </div>
                        </th>
                    </thead>
                    <tbody>
                        <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                        <td v-for="(val, j) in datasetItems[i].values">
                            <div class="relative">
                                <input @change="saveDatasetToLocalStorage" type="number" style="" v-model="datasetItems[i].values[j]" class="h-[36px] w-[86px]"><button tabindex="0" @click="deleteValueFromSeries({id: ds.id, index: j})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2.5 left-1" /></button>
                            </div>
                        </td>
                        <Tooltip :content="translations.maker.tooltips.addData[store.lang]">
                            <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="pushValueToSeries({ value: 0, id: ds.id})"><PlusIcon/></button>
                        </Tooltip>
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
            :dataset="datasetItems.map(({name, values, color}) => {return {name, values, color}})"
            :config="finalConfig"
            componentName="VueUiDonutEvolution"
            configName="vue_ui_donut_evolution"
            @click="() => copyComponent('componentContent', store)"
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            keyConfig="donutEvolutionConfig"
            keyDataset="donutEvolutionDataset"
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
