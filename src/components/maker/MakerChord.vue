<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { convertArrayToObject, copyComponent } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue"
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import useMaker from "./useMaker.js";
import { getPalette } from "vue-data-ui";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0);
const palette  = getPalette()

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
        {
            key: 'arcs',
            title: makerTranslations.value.categories.arcs[store.lang]
        },
        {
            key: 'ribbons',
            title: makerTranslations.value.categories.ribbons[store.lang]
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
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
});

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_chord.model)))

const datasetItems = ref(defaultData.vue_ui_chord.dataset);

onMounted(() => {
    if(localStorage.chordConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.chordConfig);
    } 
    if(localStorage.chordDataset) {
        datasetItems.value = JSON.parse(localStorage.chordDataset)
    }else {
        localStorage.setItem('chordDataset', JSON.stringify(defaultData.vue_ui_chord.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.chordDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.chordConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_chord.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.chordConfig) {
        localStorage.setItem('chordConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});

function deleteDatasetItem(index) {
    if (datasetItems.value.matrix.length <= 2) return;

    datasetItems.value.matrix.splice(index, 1);
    datasetItems.value.labels.splice(index, 1);
    datasetItems.value.colors.splice(index, 1);
    datasetItems.value.matrix.forEach(m => {
        m.splice(index, 1);
    });
    saveDatasetToLocalStorage();
}

function addDatasetItem() {
    datasetItems.value.matrix.forEach(row => {
        row.push(0)
    })
    datasetItems.value.matrix.push(new Array(datasetItems.value.matrix.length + 1).fill(0));
    datasetItems.value.labels.push('?')
    datasetItems.value.colors.push(JSON.parse(JSON.stringify(palette))[datasetItems.value.matrix.length + 1]);
    saveDatasetToLocalStorage();
}

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="chordConfig" keyDataset="chordDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-chord" :example="false" componentName="VueUiChord"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueDataUi ref="chart" component="VueUiChord" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th v-for="(ds, i) in datasetItems.matrix">
                                    <div class="relative pt-6 flex flex-col">
                                        <button v-if="datasetItems.matrix.length > 2" tabindex="0" @click="deleteDatasetItem(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-0 left-1" /></button>
                                        <input type="color" v-model="datasetItems.colors[i]" class="w-[100px]"/>
                                        <input type="text" v-model="datasetItems.labels[i]" class="w-[100px]"/>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ds, i) in datasetItems.matrix">
                                <td>
                                    <div class="flex flex-row">
                                        <button v-if="datasetItems.matrix.length > 2" tabindex="0" @click="deleteDatasetItem(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer mr-3" /></button>
                                        <input type="color" v-model="datasetItems.colors[i]" class="w-[100px]"/>
                                        <input type="text" v-model="datasetItems.labels[i]" class="w-[100px]"/>
                                    </div>
                                </td>
                                <td v-for="(cell, j) in ds" :style="{
                                    background: i === j ? datasetItems.colors[j] : ''
                                }">
                                    <input type="number" :min="0" v-model="datasetItems.matrix[i][j]" class="w-[100px]"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex flex-row gap-4 mt-7 mb-6">
                        <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                            <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatasetItem"><PlusIcon/></button>
                        </Tooltip>
                    </div>
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
                :dataset="datasetItems"
                :config="finalConfig"
                componentName="VueUiChord"
                configName="vue_ui_chord"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="chordConfig"
                keyDataset="chordDataset"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent> 
            <slot name="rater"/>        
        </div>
        <Transition name="fade">
            <BaseMakerChart
                v-if="isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueDataUi component="VueUiChord" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>
    </div>
</template>