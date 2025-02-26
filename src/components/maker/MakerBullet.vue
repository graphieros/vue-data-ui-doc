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

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref(defaultData.vue_ui_bullet.dataset);

const CONFIG_CATEGORIES = computed(() => {
    return [
    {
        key: 'general',
        title: makerTranslations.value.categories.general[store.lang]
    },
    {
        key: 'labels',
        title: makerTranslations.value.categories.labels[store.lang]
    },
    {
        key: 'datapoints',
        title: makerTranslations.value.categories.datapoints[store.lang]
    },
    {
        key: 'userOptions',
        title: makerTranslations.value.categories.userOptions[store.lang]
    },
    {
        key: 'padding',
        title: makerTranslations.value.categories.padding[store.lang]
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
]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_bullet.model)))

onMounted(() => {
    if(localStorage.bulletConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.bulletConfig);
    } 
    if(localStorage.bulletDataset) {
        dataset.value = JSON.parse(localStorage.bulletDataset)
    }else {
        localStorage.setItem('bulletDataset', JSON.stringify(defaultData.vue_ui_bullet.dataset))
    }
    step.value += 1;
});

const options = ref({
    name: 'Segment',
    from: 0,
    to: 0,
    color: '#CCCCCC'
})

function saveDatasetToLocalStorage() {
    localStorage.bulletDataset = JSON.stringify(dataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.bulletConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_bullet.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.bulletConfig) {
        localStorage.setItem('bulletConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
});

function addSegment() {
    dataset.value.segments.push(JSON.parse(JSON.stringify(options.value)))
    saveDatasetToLocalStorage();
}

function deleteSegment(index) {
    dataset.value.segments = dataset.value.segments.filter((s, i) => i !== index);
    saveDatasetToLocalStorage();
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomizeValue() {
    const min = Math.min(...dataset.value.segments.map(s => s.from));
    const max = Math.max(...dataset.value.segments.map(s => s.to));
    dataset.value.value = getRandomNumber(min, max);
    saveDatasetToLocalStorage();
}

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="bulletConfig" keyDataset="configDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-bullet" componentName="VueUiBullet"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueDataUi ref="chart" component="VueUiBullet" :dataset="dataset" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div class="flex flex-row gap-2 place-items-center">
                    <button class="py-2 px-5 rounded border border-black dark:border-app-blue hover:bg-[#5f8aee20] transition-colors" @click="randomizeValue">Random value</button> : {{ dataset.value.toFixed(2) }}
                </div>
                <div class="flex flex-row gap-2 place-items-center">
                    <label for="target">Target:</label>
                    <input type="number" v-model="dataset.target" @change="saveDatasetToLocalStorage">
                </div>
                <div v-for="(ds, i) in dataset.segments" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                    <button tabindex="0" @click="deleteSegment(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.name[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.from[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.to[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.color[store.lang] }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input class="h-[36px]" type="text" v-model="dataset.segments[i].name" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="number" v-model="dataset.segments[i].from" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="number" v-model="dataset.segments[i].to" @change="saveDatasetToLocalStorage"></td>
                                <td><input type="color" v-model="dataset.segments[i].color" @change="saveDatasetToLocalStorage"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="flex flex-row gap-4 mt-4 mb-6">
                <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                    <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addSegment"><PlusIcon/></button>
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
                    :dataset="dataset"
                    :config="finalConfig"
                    componentName="VueUiBullet"
                    configName="vue_ui_bullet"
                    @click="() => copyComponent('componentContent', store)"
                    :copyComponentFunc="() => copyComponent('componentContent', store)"
                    keyConfig="bulletConfig"
                    keyDataset="bulletDataset"
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
            <VueDataUi component="VueUiBullet" :dataset="dataset" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>