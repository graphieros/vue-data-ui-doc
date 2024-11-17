<script setup>
import { ref, computed, onMounted } from "vue";
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_tiremarks.model)))

const currentDataset = ref(defaultData.vue_ui_tiremarks.dataset)

const step = ref(0);

onMounted(() => {
    if(localStorage.tiremarksConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.tiremarksConfig);
    } 
    if(localStorage.tiremarksDataset) {
        currentDataset.value = JSON.parse(localStorage.tiremarksDataset)
    }else {
        localStorage.setItem('tiremarksDataset', JSON.stringify(defaultData.vue_ui_tiremarks.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    step.value += 1;
    localStorage.tiremarksDataset = JSON.stringify(currentDataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.tiremarksConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_tiremarks.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.tiremarksConfig) {
        localStorage.setItem('tiremarksConfig', {})
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

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="tiremarksConfig" keyDataset="tiremarksDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-tiremarks" name="VueUiTiremarks"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
                <transition name="fade">                
                    <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? `fixed top-[64px] right-6 z-20 w-[300px]` : 'w-full mx-auto max-w-[600px]'}`" v-if="currentDataset && ![undefined, null].includes(currentDataset.percentage)">
                        <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                            <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                                <PinnedOffIcon v-if="isFixed"/>
                                <PinIcon v-else/>
                            </button>
                            <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
                        </div>
                        <div :class="`${finalConfig.style.chart.layout.display === 'horizontal'  ? '' : 'w-[64px] mx-auto'}`">
                            <VueUiTiremarks :dataset="currentDataset" :config="finalConfig" :key="`chart_${step}`"/>
                        </div>
                    </div>
                </transition>
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
        
                <div class="flex justify-end">
                    <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
                </div>
        
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
                    componentName="VueUiTiremarks"
                    configName="vue_ui_tiremarks"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
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