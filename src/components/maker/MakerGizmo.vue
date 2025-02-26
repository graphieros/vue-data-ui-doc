<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js";
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
});
</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="gizmoConfig" keyDataset="gizmoDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-gizmo" :example="false" componentName="VueUiGizmo"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <div class="w-full max-w-[300px] mx-auto bg-white flex place-items-center justify-center py-12">
                        <VueUiGizmo ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                    </div>
                </BaseMakerChart>
            </Transition>
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
    <Transition name="fade">
        <BaseMakerChart
            v-if="isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <div class="w-full max-w-[300px] mx-auto bg-white flex place-items-center justify-center py-12">
                <VueUiGizmo :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </div>
        </BaseMakerChart>
    </Transition>
</template>