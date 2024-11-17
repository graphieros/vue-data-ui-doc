<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js";
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
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

const isFixed = ref(!isMobile.value);

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_gizmo.model)))
    
const datasetItems = ref(defaultData.vue_ui_gizmo.dataset)

const step = ref(0);

onMounted(() => {
    if(localStorage.gizmoConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.gizmoConfig);
    } 
    if(localStorage.gizmoDataset) {
        datasetItems.value = Number(localStorage.gizmoDataset)
    }else {
        localStorage.setItem('gizmoDataset', defaultData.vue_ui_gizmo.dataset)
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.gizmoDataset = datasetItems.value;
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.gizmoConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_gizmo.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.gizmoConfig) {
        localStorage.setItem('gizmoConfig', {})
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
        <ClearStorageAndRefresh keyConfig="gizmoConfig" keyDataset="gizmoDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-gizmo" name="VueUiGizmo"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <BaseMakerChart
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <div class="w-full max-w-[300px] mx-auto bg-white flex place-items-center justify-center py-12">
                    <VueUiGizmo :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </BaseMakerChart>
        </div>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <BaseNumberInput v-model:value="datasetItems" :min="0" :max="100" @change="saveDatasetToLocalStorage()"/>
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
                componentName="VueUiGizmo"
                configName="vue_ui_gizmo"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="gizmoConfig"
                keyDataset="gizmoDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>          
        </div>
    </div>
</template>