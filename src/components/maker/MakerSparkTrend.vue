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
        {
            key: 'line',
            title: makerTranslations.value.categories.line[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_spark_trend.model)))

const dataset = ref(defaultData.vue_ui_spark_trend.dataset);

const step = ref(0)

onMounted(() => {
    if(localStorage.sparkTrendConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.sparkTrendConfig);
    } 
    if(localStorage.sparkTrendDataset) {
        dataset.value = JSON.parse(localStorage.sparkTrendDataset)
    }else {
        localStorage.setItem('sparkTrendDataset', JSON.stringify(defaultData.vue_ui_spark_trend.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.sparkTrendDataset = JSON.stringify(dataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.sparkTrendConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_spark_trend.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.sparkTrendConfig) {
        localStorage.setItem('sparkTrendConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

</script>

<template>

</template>