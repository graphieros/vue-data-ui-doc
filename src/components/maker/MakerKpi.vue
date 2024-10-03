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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_kpi.model)))

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
        },
    ]
})

const datasetItems = ref(defaultData.vue_ui_kpi.dataset)
const step = ref(0);

onMounted(() => {
    if(localStorage.kpiConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.kpiConfig);
    } 
    if(localStorage.kpiDataset) {
        datasetItems.value = JSON.parse(localStorage.kpiDataset)
    }else {
        localStorage.setItem('kpiDataset', JSON.stringify(defaultData.vue_ui_kpi.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.kpiDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
    step.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.kpiConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_kpi.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => makerTranslations.value.labels[l] ? makerTranslations.value.labels[l][store.lang] : l).join(" ") :
    makerTranslations.value.labels[label] ? makerTranslations.value.labels[label][store.lang] : label
}

function forceChartUpdate() {
    if(!localStorage.kpiConfig) {
        localStorage.setItem('kpiConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const accordionConfig = ref(
    {
            open: true,
            head: {
                backgroundColor: 'transparent',
                iconColor: '#42d392'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            }
        }
)


</script>

<template>
<ClearStorageAndRefresh keyConfig="kpiConfig" keyDataset="kpiDataset" :key="`clear_${clearStep}`"/>
<DocLink to="vue-ui-kpi" name="VueUiKpi"/>

<div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <transition name="fade">                
            <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[300px]' : 'w-full mx-auto max-w-[600px]'}`">
                <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                    <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                        <PinnedOffIcon v-if="isFixed"/>
                        <PinIcon v-else/>
                    </button>
                    <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
                </div>
                <div class="w-full">
                    <VueDataUi component="VueUiKpi" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </div>
        </transition>
    </div>

    <VueDataUi
        component="VueUiAccordion"
        :config="accordionConfig"
    >
        <template #title>
            {{ makerTranslations.dataset[store.lang] }}
        </template>
        <template #content>
            <div class="flex flex-col gap-2">
                <div  :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`">
                    <table>
                        <thead>
                            <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.value[store.lang] }}</th>
                        </thead>
                        <tbody>
                            <td><input type="number" v-model="datasetItems" @change="saveDatasetToLocalStorage"></td>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </VueDataUi>

    <VueDataUi
        component="VueUiAccordion"
        :config="accordionConfig"
    >
        <template #title>
            {{ makerTranslations.config[store.lang] }}
        </template>
        <template #content>
            <div class="flex justify-end">
                <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
            </div>

            <MakerKnobs
                :categories="CONFIG_CATEGORIES"
                :model="CONFIG_MODEL"
                @change="forceChartUpdate"
            />
        </template>
    </VueDataUi>


    <div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
        <CopyComponent @click="() => copyComponent('componentContent', store)"/>
        <ComponentContent
            :dataset="datasetItems"
            :config="finalConfig"
            componentName="VueUiKpi"
            configName="vue_ui_kpi"
            @click="() => copyComponent('componentContent', store)"
        />          
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>