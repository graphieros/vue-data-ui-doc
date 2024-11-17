<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
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
            key: 'title',
            title: makerTranslations.value.categories.title[store.lang]
        },
        {
            key: 'subtitle',
            title: makerTranslations.value.categories.subtitle[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_thermometer.model)))
const dataset = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_thermometer.dataset)))

const step = ref(0)

onMounted(() => {
    if(localStorage.thermometerConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.thermometerConfig);
    } 
    if(localStorage.thermometerDataset) {
        dataset.value = JSON.parse(localStorage.thermometerDataset)
    }else {
        localStorage.setItem('thermometerDataset', JSON.stringify(defaultData.vue_ui_thermometer.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.thermometerDataset = JSON.stringify(dataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.thermometerConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_thermometer.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.thermometerConfig) {
        localStorage.setItem('thermometerConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
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

        <ClearStorageAndRefresh keyConfig="thermometerConfig" keyDataset="thermometerDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-thermometer" name="VueUiThermometer"/>
    
    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <BaseMakerChart
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
            fixedWidth="w-[250px]"
            expandedWidth="max-w-[250px]"
        >
            <VueUiThermometer :dataset="dataset" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>

    </div>
    
    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`">
                <table>
                    <thead>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.value[store.lang] }}</th>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.from[store.lang] }}</th>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.to[store.lang] }}</th>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.scale[store.lang] }}</th>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }} : {{ makerTranslations.labels.from[store.lang] }}</th>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }} : {{ makerTranslations.labels.to[store.lang] }}</th>
    
                    </thead>
                    <tbody>
                        <td><input class="w-[82px]" type="number" v-model="dataset.value" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="w-[82px]" type="number" v-model="dataset.from" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="w-[82px]" type="number" v-model="dataset.to" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="w-[82px]" type="number" v-model="dataset.steps" @change="saveDatasetToLocalStorage"></td>
                        <td><input type="color" v-model="dataset.colors.from" @change="saveDatasetToLocalStorage"></td>
                        <td><input type="color" v-model="dataset.colors.to" @change="saveDatasetToLocalStorage"></td>
    
                    </tbody>
                </table>
            </div>
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
                :dataset="dataset"
                :config="finalConfig"
                componentName="VueUiThermometer"
                configName="vue_ui_thermometer"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="thermometerConfig"
                keyDataset="thermometerDataset"
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