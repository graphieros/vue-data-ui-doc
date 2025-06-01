<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";;
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import useMaker from "./useMaker.js";
import worldGeo from "../../../worldGeo.js";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0);

const { isFixed, step, chart, fixChart } = useMaker();

const makerTranslations = computed(() => {
    return makerStore.translations;
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_world.model)))

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
            key: 'userOptions',
            title: makerTranslations.value.categories.userOptions[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
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
            key: 'tooltip',
            title: makerTranslations.value.categories.tooltip[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const datasetItems = ref(defaultData.vue_ui_world.dataset);

function getCountryCodesFromGeoJSON(geojson, codeKey = 'ISO_A3') {
    if (!geojson || !Array.isArray(geojson.features)) return [];
    const possibleKeys = ['ISO_A3', 'iso_a3', 'ADM0_A3', 'country_code', 'id'];
    const features = geojson.features;
    const keyToUse = features.length > 0
        ? possibleKeys.find(k => k in (features[0].properties || {})) || codeKey
        : codeKey;
    const codes = features
        .map(f => f.properties && f.properties[keyToUse])
        .filter(Boolean);
    return Array.from(new Set(codes));
}

const countryCodes = computed(() => {
    return getCountryCodesFromGeoJSON(worldGeo)
});

onMounted(() => {
    if(localStorage.worldConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.worldConfig);
    } 
    if(localStorage.worldDataset) {
        datasetItems.value = JSON.parse(localStorage.worldDataset)
    }else {
        localStorage.setItem('worldDataset', JSON.stringify(defaultData.vue_ui_world.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.worldDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
    step.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.worldConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_world.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function forceChartUpdate() {
    if(!localStorage.worldConfig) {
        localStorage.setItem('worldConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="worldConfig" keyDataset="worldDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-world" :example="false" componentName="VueUiWorld"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueDataUi component="VueUiWorld" ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>

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
                componentName="VueUiWorld"
                configName="vue_ui_world"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="worldConfig"
                keyDataset="worldDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>          
            <slot name="rater"/>
        </div>

    </div>
    <Transition name="fade">
        <BaseMakerChart
            v-if="isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueDataUi component="VueUiWorld" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>

</template>