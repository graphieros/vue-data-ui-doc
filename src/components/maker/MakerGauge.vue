<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, AlertTriangleIcon, CopyIcon, RefreshIcon } from "vue-tabler-icons"
import { getVueDataUiConfig } from "vue-data-ui";
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, getValueByPath, createUid } from "./lib.js";
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
});

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
            key: "general",
            title: makerTranslations.value.categories.general[store.lang]
        },
        {
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
        },
        {
            key: "legend",
            title: makerTranslations.value.categories.legend[store.lang]
        },
        {
            key: "title",
            title: makerTranslations.value.categories.title[store.lang]
        },
        {
            key: "subtitle",
            title: makerTranslations.value.categories.subtitle[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_gauge.model)))

const options = ref({
    datasetItems: {
        from: 0,
        to: 0,
        color: "#CCCCCC",
        name: 'Label',
        nameOffsetRatio: 1,
    },
    value: 6,
    dataset: {},
    config: {}
})

const datasetItems = ref(defaultData.vue_ui_gauge.dataset)

const step = ref(0);

onMounted(() => {
    if(localStorage.gaugeConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.gaugeConfig);
    } 
    if(localStorage.gaugeDataset) {
        datasetItems.value = JSON.parse(localStorage.gaugeDataset)
    }else {
        localStorage.setItem('gaugeDataset', JSON.stringify(defaultData.vue_ui_gauge.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.gaugeDataset = JSON.stringify(datasetItems.value);
    step.value += 1;
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.gaugeConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_gauge.model))
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
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
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

const usableDataset = computed(() => {
    return {
        series: datasetItems.value,
        base:options.value.base,
        value: options.value.value
    }
})

const currentValue = ref(randomVal());

function makeRandomVal() {
    currentValue.value = randomVal();
    options.value.value = currentValue.value;
}

function randomVal() {
    const min = Math.min(...datasetItems.value.map(d => d.from));
    const max = Math.max(...datasetItems.value.map(d => d.to));
    const rand = Math.random() * max
    return rand < min ? min : rand > max ? max : rand
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
        <ClearStorageAndRefresh keyConfig="gaugeConfig" keyDataset="gaugeDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-gauge" componentName="VueUiGauge"/>

    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <BaseMakerChart
            v-if="!isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiGauge :dataset="usableDataset" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </div>

    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-4 place-items-center pl-16">
                <div class="flex flex-col gap-2">
                    <label class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</label>
                    <tbody>
                        <tr>
                            <button class="py-2 px-5 rounded border border-black dark:border-app-blue hover:bg-[#5f8aee20] transition-colors" @click="makeRandomVal">Random value</button> : {{ currentValue }}
                        </tr>
                    </tbody>
                </div>
            </div>
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <tr>
                            <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.from[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.to[store.lang] }}</th>
                            <th class="text-left text-xs">{{ makerTranslations.labels.name[store.lang] }}</th>
                            <th class="text-left text-xs">name offset ratio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                            <td><input class="h-[36px]" type="number" v-model="ds.from" @change="saveDatasetToLocalStorage"></td>
                            <td><input class="h-[36px]" type="number" v-model="ds.to" @change="saveDatasetToLocalStorage"></td>
                            <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                            <td>
                                <div class="inline-flex place-items-center justify-center gap-2 relative h-[32px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                                    <div class="text-xs z-0 pointer-events-none bg-[#4A4A4A] dark:bg-black px-2 rounded-lg min-w-[64px] text-center text-white tabular-nums">{{ ds.nameOffsetRatio }}</div>
                                    <input :id="`k_${i}_${uid}_${c}`" type="range" v-model="ds.nameOffsetRatio" :min="0.5" :max="1.3" :step="0.01" class="accent-app-blue z-0" @change="saveDatasetToLocalStorage">
                                </div>
                            </td>
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
            :dataset="usableDataset"
            :config="finalConfig"
            componentName="VueUiGauge"
            configName="vue_ui_gauge"
            @click="() => copyComponent('componentContent', store)"
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            keyConfig="gaugeConfig"
            keyDataset="gaugeDataset"
        >
        <template #component-copy>
            <CopyComponent @click="() => copyComponent('componentContent', store)"/>
        </template>
        </ComponentContent>
    </div>
    </div>
    <BaseMakerChart
        v-if="isFixed"
        :isFixed="isFixed"
        @fixChart="fixChart"
        @resetModel="resetModel"
    >
        <VueUiGauge :dataset="usableDataset" :config="finalConfig" :key="`chart_${step}`"/>
    </BaseMakerChart>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
