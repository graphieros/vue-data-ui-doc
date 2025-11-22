<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon, XIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue"
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import useMaker from "./useMaker.js";
import BaseButton from "../Base/BaseButton.vue";
import BaseCard from "../BaseCard.vue";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0)

const { isFixed, step, chart, fixChart } = useMaker();

const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

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
            key: 'donut',
            title: makerTranslations.value.categories.donut[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_donut.model)))

const options = ref({
    datasetItems: {
        name: "name",
        values: [],
        color: "#42d392"
    },
    dataset: [],
    config: {}
})

const datasetItems = ref(defaultData.vue_ui_donut.dataset)

onMounted(() => {
    if(localStorage.donutConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.donutConfig);
    } 
    if(localStorage.donutDataset) {
        datasetItems.value = JSON.parse(localStorage.donutDataset)
    }else {
        localStorage.setItem('donutDataset', JSON.stringify(defaultData.vue_ui_donut.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.donutDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.donutConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_donut.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.donutConfig) {
        localStorage.setItem('donutConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function pushValueToSeries({ value, id }) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem.values = [value];
    step.value += 1;
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="donutConfig" keyDataset="donutDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-donut" componentName="VueUiDonut"/>

    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <Transition name="fade">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiDonut ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>
    </div>

    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <BaseCard>
                <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">

                    <BaseButton
                        color="error"
                        :size="6"
                        fab
                        @click="deleteDatasetItem(ds.id)"
                        tw="absolute -top-2 -left-2"
                    >
                        <XIcon size="14" />
                    </BaseButton>

                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="number" v-model="ds.values[0]" @change="saveDatasetToLocalStorage"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </BaseCard>
        </div>
        <div class="flex flex-row gap-4 mt-4 mb-6">
            <BaseButton
                color="success" 
                fab
                :size="10"
                @click="addDatasetItem"
                :tooltip="translations.maker.tooltips.addDataset[store.lang]"
                tooltip-position="right"
            >
                <PlusIcon/>
            </BaseButton>
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
            :dataset="datasetItems.map(({name, values, color}) => { return {name, values, color}})"
            :config="finalConfig"
            componentName="VueUiDonut"
            configName="vue_ui_donut"
            @click="() => copyComponent('componentContent', store)"
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            keyConfig="donutConfig"
            keyDataset="donutDataset"
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
            <VueUiDonut :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
