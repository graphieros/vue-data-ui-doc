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

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="gizmoConfig" keyDataset="gizmoDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-gizmo" name="VueUiGizmo"/>

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
                    <div class="w-full max-w-[300px] mx-auto bg-white flex place-items-center justify-center py-12">
                        <VueUiGizmo :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                    </div>
                </div>
            </transition>
        </div>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <BaseNumberInput v-model:value="datasetItems" :min="0" :max="100" @change="saveDatasetToLocalStorage()"/>
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
            <CopyComponent @click="() => copyComponent('componentContent', store)"/>
            <ComponentContent
                :dataset="datasetItems"
                :config="finalConfig"
                componentName="VueUiGizmo"
                configName="vue_ui_gizmo"
                @click="() => copyComponent('componentContent', store)"
            />          
        </div>
    </div>
</template>