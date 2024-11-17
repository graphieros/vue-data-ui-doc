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
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_wheel.model)))

const currentDataset = ref(defaultData.vue_ui_wheel.dataset)

const step = ref(0);

onMounted(() => {
    if(localStorage.wheelConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.wheelConfig);
    } 
    if(localStorage.wheelDataset) {
        currentDataset.value = JSON.parse(localStorage.wheelDataset)
    }else {
        localStorage.setItem('wheelDataset', JSON.stringify(defaultData.vue_ui_wheel.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage(clear = true) {
    if(clear) {
        step.value += 1;
    }
    localStorage.wheelDataset = JSON.stringify(currentDataset.value);
    if(clear) {
        clearStep.value += 1;
    }
}

function saveConfigToLocalStorage() {
    localStorage.wheelConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_wheel.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.wheelConfig) {
        localStorage.setItem('wheelConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
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

function randomVal() {
    currentDataset.value.percentage = Math.random() * 100; 
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
        <ClearStorageAndRefresh keyConfig="wheelConfig" keyDataset="wheelDataset" :key="`clear_${clearStep}`"/>
        <div class="flex flex-row flex-wrap gap-4 place-items-center">
            <DocLink to="vue-ui-wheel" name="VueUiWheel"/>
            <RouterLink to="/examples/categories#vue-ui-wheel">
                <button class="flex flex-row gap-2 place-items-center rounded-md border border-black dark:border-app-green py-3 px-4 hover:bg-[#42D39233] hover:shadow-xl">
                    <VueUiIcon name="clipboardLine" :stroke="isDarkMode ? '#42D392' : '#1A1A1A'" :size="20"/>
                    {{ translations.viewExamples[store.lang] }}
                </button>
            </RouterLink>
        </div>
        
            <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
                <BaseMakerChart
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiWheel :dataset="currentDataset" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </div>
        
            <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div  :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF12]`">
                        <table>
                            <thead>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.percentage[store.lang] }}</th>
                            </thead>
                            <tbody>
                                <button class="py-2 px-5 rounded border border-black dark:border-app-blue hover:bg-[#5f8aee20] transition-colors" @click="randomVal">Random value</button> : {{ currentDataset.percentage.toFixed(2) }}
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
                    :dataset="currentDataset"
                    :config="finalConfig"
                    componentName="VueUiWheel"
                    configName="vue_ui_wheel"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="wheelConfig"
                    keyDataset="wheelDataset"
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
