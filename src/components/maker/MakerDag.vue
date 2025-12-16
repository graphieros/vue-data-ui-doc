<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";;
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import useMaker from "./useMaker.js";
import BaseCard from "../BaseCard.vue";
import BaseButton from "../Base/BaseButton.vue";
import { PlusIcon, XIcon } from "vue-tabler-icons";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0);

const { isFixed, step, chart, fixChart } = useMaker();

const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_dag.model)));

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
            key: 'title',
            title: makerTranslations.value.categories.title[store.lang]
        },
        {
            key: 'subtitle',
            title: makerTranslations.value.categories.subtitle[store.lang]
        },
        {
            key: 'layout',
            title: makerTranslations.value.categories.layout[store.lang]
        },
        {
            key: 'nodes',
            title: makerTranslations.value.categories.nodes[store.lang]
        },
        {
            key: 'edges',
            title: makerTranslations.value.categories.edges[store.lang]
        },
        {
            key: 'midpoints',
            title: makerTranslations.value.categories.midpoints[store.lang]
        },
        {
            key: 'controls',
            title: makerTranslations.value.categories.controls[store.lang]
        },
    ]
});

const datasetItems = ref(defaultData.vue_ui_dag.dataset);

onMounted(() => {
    if(localStorage.dagConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.dagConfig);
    } 
    if(localStorage.dagDataset) {
        datasetItems.value = JSON.parse(localStorage.dagDataset)
    }else {
        localStorage.setItem('dagDataset', JSON.stringify(defaultData.vue_ui_dag.dataset))
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.dagDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.dagConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_dag.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.dagConfig) {
        localStorage.setItem('dagConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function addNode() {
    const id = datasetItems.value.nodes.length;
    datasetItems.value.nodes.push({
        id: createUid(),
        label: `Node ${id}`
    });
    saveDatasetToLocalStorage();
}

function addEdge() {
    datasetItems.value.edges.push({
        from: '0',
        to: '0',
        animated: false,
        dasharray: '2 6',
        animationDurationMs: 1000,
    });
    saveDatasetToLocalStorage();
}

const allNodeIds = computed(() => {
    return datasetItems.value.nodes.map(n => String(n.id))
})

function deleteNode(nodeId) {
    datasetItems.value.nodes = datasetItems.value.nodes.filter(n => n.id !== nodeId);
    datasetItems.value.edges = datasetItems.value.edges.filter(n => n.from !== nodeId && n.to !== nodeId);
    saveDatasetToLocalStorage();
}

function deleteEdge(edge) {
    datasetItems.value.edges = datasetItems.value.edges.filter(e => `${e.from}${e.to}` !== `${edge.from}${edge.to}`);
    saveDatasetToLocalStorage();
}

</script>

<template>
    <div>
        <ClearStorageAndRefresh keyConfig="dagConfig" keyDataset="dagDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-dag" componentName="VueUiDag"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiDag ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </BaseMakerChart>
            </Transition>
        </div>

        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <BaseCard>
                <div class="font-inter-medium mb-4">Nodes</div>
                <div class="w-full flex flex-col gap-2">
                    <div v-for="node in datasetItems.nodes">
                        <div class="flex flex-row gap-2 place-items-center">
                            <div class="min-w-[64px]"><span class="font-inter-medium">id:</span> <code class="text-[10px] ">{{ node.id }}</code></div>
                            <div>
                                <label>
                                    <span class="font-inter-medium">label</span>
                                    <input type="text" class="ml-2" v-model="node.label" @change="saveDatasetToLocalStorage">
                                </label>
                            </div>
                            <BaseButton
                                color="error"
                                :size="6"
                                fab
                                @click="deleteNode(node.id)"
                            >
                                <XIcon size="14" />
                            </BaseButton>
                        </div>
                    </div>
                    <BaseButton
                        color="success"
                        fab
                        @click="addNode"
                        :tooltip="translations.maker.tooltips.addDataset[store.lang]"
                        tooltip-position="right"
                    >
                        <PlusIcon/>
                    </BaseButton>
                </div>
            </BaseCard>
            <BaseCard class="mt-4">
                <div class="font-inter-medium mb-4">Edges</div>
                <div class="w-full flex flex-col gap-2">
                    <div v-for="edge in datasetItems.edges">
                        <div class="flex flex-row gap-2">
                            <label>
                                <span class="font-inter-medium mr-2">from</span>
                                <select class="min-w-[64px]" v-model="edge.from" @change="saveDatasetToLocalStorage">
                                    <option v-for="nodeId in allNodeIds" :value="nodeId">{{ datasetItems.nodes.find(n => n.id === nodeId).label }}</option>
                                </select>
                                (id: <code class="text-[10px]">{{ edge.from }}</code>)
                            </label>
                            →
                            <label>
                                <span class="font-inter-medium mr-2">to</span>
                                <select class="min-w-[64px]" v-model="edge.to" @change="saveDatasetToLocalStorage">
                                    <option v-for="nodeId in allNodeIds" :value="nodeId">{{ datasetItems.nodes.find(n => n.id === nodeId).label }}</option>
                                </select>
                                (id: <code class="text-[10px]">{{ edge.to }}</code>)
                            </label>
                            <label>
                                <span class="font-inter-medium mr-2">animated</span>
                                <input type="checkbox" v-model="edge.animated" @change="saveDatasetToLocalStorage"/>
                            </label>
                            <BaseButton
                                color="error"
                                :size="6"
                                fab
                                @click="deleteEdge(edge)"
                            >
                                <XIcon size="14" />
                            </BaseButton>
                        </div>
                    </div>
                    <BaseButton
                        color="success"
                        fab
                        @click="addEdge"
                        :tooltip="translations.maker.tooltips.addDataset[store.lang]"
                        tooltip-position="right"
                    >
                        <PlusIcon/>
                    </BaseButton>
                </div>
            </BaseCard>
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
            componentName="VueUiDag"
            configName="vue_ui_dag"
            @click="() => copyComponent('componentContent', store)"
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            keyConfig="dagConfig"
            keyDataset="dagDataset"
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
            <VueUiDag :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>