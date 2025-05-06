<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue"
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
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
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_circle_pack.model)))

const options = ref({
    datasetItems: {
        name: 'name',
        value: 1
    },
    dataset: [],
    config: {}
})

const datasetItems = ref(defaultData.vue_ui_circle_pack.dataset)

onMounted(() => {
    if(localStorage.circlePackConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.circlePackConfig);
    } 
    if(localStorage.circlePackDataset) {
        datasetItems.value = JSON.parse(localStorage.circlePackDataset)
    }else {
        localStorage.setItem('circlePackDataset', JSON.stringify(defaultData.vue_ui_circle_pack.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.circlePackDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.circlePackConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_circle_pack.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.circlePackConfig) {
        localStorage.setItem('circlePackConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems))});
    step.value += 1;
    saveDatasetToLocalStorage()
    focusOnItem()
}

function deleteDatasetItem(index) {
    datasetItems.value = datasetItems.value.filter((_, i) => index !== i);
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});

const datapoints = ref(null);
const highlighted = ref(false);

function focusOnItem() {
    if (!datapoints.value) return;

    requestAnimationFrame(() => {
        datapoints.value.scrollTo({
            top: datapoints.value.scrollHeight,
            behavior: 'smooth'
        })
    });

    highlighted.value = true;
    setTimeout(() => {
        highlighted.value = false;
    }, 1000)
}

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="circlePackConfig" keyDataset="circlePackDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-circle-pack" componentName="VueUiCirclePack" :example="false"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <div style="max-height: 600px">
                        <VueDataUi ref="chart" component="VueUiCirclePack" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                    </div>
                </BaseMakerChart>
            </Transition>
        </div>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="overflow-auto max-h-[400px] w-fit" ref="datapoints">
                <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                        <button tabindex="0" @click="deleteDatasetItem(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                                    <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                    <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :style="{
                                    background: i === datasetItems.length - 1 && highlighted ? '#42d392' : 'transparent'
                                }" class="transition-colors">
                                    <td><code>{{ i }}</code></td>
                                    <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                                    <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                    <td><input class="h-[36px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-4 mt-4 mb-6">
                <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                    <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatasetItem"><PlusIcon/></button>
                </Tooltip>
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
                :dataset="datasetItems.map(({name, value, color}) => { return {name, value, color}})"
                :config="finalConfig"
                componentName="VueUiCirclePack"
                configName="vue_ui_circle_pack"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
                keyConfig="circlePackConfig"
                keyDataset="circlePackdataset"
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
            <div style="max-height: 400px">
                <VueDataUi component="VueUiCirclePack" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </div>
        </BaseMakerChart>
    </Transition>
</template>