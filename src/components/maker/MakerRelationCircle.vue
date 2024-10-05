<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon, AlertTriangleIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";

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

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isFixed = ref(!isMobile.value);

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
        },
        {
            key: 'datapoints',
            title: makerTranslations.value.categories.datapoints[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_relation_circle.model)))

const options = ref({
    dataset:  {
        id: '',
        label: 'Name...',
        relations: [],
        weights: [],
        color: '#CCCCCC'
    }
})

const datasetItems = ref(defaultData.vue_ui_relation_circle.dataset)

const step = ref(0)

onMounted(() => {
    if(localStorage.relationCircleConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.relationCircleConfig);
    } 
    if(localStorage.relationCircleDataset) {
        datasetItems.value = JSON.parse(localStorage.relationCircleDataset)
    }else {
        localStorage.setItem('relationCircleDataset', JSON.stringify(defaultData.vue_ui_relation_circle.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.relationCircleDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
    step.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.relationCircleConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_relation_circle.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.relationCircleConfig) {
        localStorage.setItem('relationCircleConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.dataset)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    removeNodeById(id);
    step.value += 1;
}

function removeNodeById(nodeId) {
    datasetItems.value = datasetItems.value.filter(el => el.id !== nodeId)
    datasetItems.value.forEach(ds => removeRelation(ds, nodeId))
}

function addRelationTo(e, nodeId) {
    if(!e.target.options[e.target.selectedIndex].value) return
    const selectedNode = JSON.parse(e.target.options[e.target.selectedIndex].value)
    const thisNode = datasetItems.value.find(n => n.id === nodeId);
    thisNode.relations.push(selectedNode.id)
    thisNode.weights.push(1)
    saveDatasetToLocalStorage()
    step.value += 1
}

function removeRelation(node, relationId) {
    const relationIndex = node.relations.indexOf(relationId)
    console.log({relationIndex})
    node.weights.splice(relationIndex, 1)
    node.relations = node.relations.filter(n => n !== relationId);
    saveDatasetToLocalStorage();
    step.value += 1;
}


const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(!makerTranslations.value.labels[l]) return l;
        return makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

function getAvailableNodes(nodeId) {
    const allNodes = datasetItems.value.filter(n => n.id !== nodeId);
    const thisNode = datasetItems.value.find(n => n.id === nodeId);
    const availableNodes = [];
    allNodes.forEach(node => {
        if(!thisNode.relations.includes(node.id)) {
            availableNodes.push(node)
        }
    })
    return availableNodes
}

function getRelationNodes(relationIds) {
    const nodes = [];
    relationIds.forEach(r => {
        nodes.push(datasetItems.value.find(n => n.id === r))
    })
    return nodes
}

</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="relationCircleConfig" keyDataset="relationCircleDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-relation-circle" name="VueUiRelationCircle"/>
        
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <transition name="fade">                
                <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[300px]' : 'w-full mx-auto max-w-[600px]'}`" v-if="datasetItems.length">
                    <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                        <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                            <PinnedOffIcon v-if="isFixed"/>
                            <PinIcon v-else/>
                        </button>
                        <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
                    </div>
                    <div class="w-full bg-white p-2">
                        <VueUiRelationCircle :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                    </div>
                </div>
            </transition>
        </div>
        
        <details open>
                <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
                <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                        <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                        <table>
                            <tbody>
                                <tr> 
                                    <td>
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs">{{ makerTranslations.labels.name[store.lang] }}</label>
                                            <input type="text" class="h-[32px] mr-4" v-model="ds.label" @change="saveDatasetToLocalStorage">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs">{{ makerTranslations.labels.color[store.lang] }}</label>
                                            <input type="color" v-model="ds.color" @change="saveDatasetToLocalStorage">
                                        </div>
                                    </td>
                                    <td v-if="datasetItems.length">
                                        <div class="flex flex-col gap-2 ml-4">
                                            <label class="text-xs">{{ makerTranslations.addRelations[store.lang] }}</label>
                                            <select class="h-[32px] min-w-[100px]" @input="(e) => addRelationTo(e, ds.id)">
                                                <option selected value/>
                                                <option v-for="node in getAvailableNodes(ds.id)" :value="JSON.stringify(node)">{{ node.label }}</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex flex-col gap-2 ml-4">
                                            <label class="text-xs">{{ makerTranslations.activeRelations[store.lang] }}</label>
                                            <div class="flex flex-row gap-2 max-w-[800px] flex-wrap">
                                                <div v-for="relation in getRelationNodes(ds.relations)" class="p-1 pl-4 pr-10 bg-gray-100 dark:bg-[#FFFFFF20] rounded-full relative shadow-md flex flex-row gap-2 place-items-center">
                                                    <div class="flex flex-col gap-1">
                                                        <label class="text-xs text-left">{{ makerTranslations.labels.weight[store.lang] }}</label>
                                                        <input class="w-[72px] tabular-nums" type="number" min="0" max="1" step="0.01" v-model="ds.weights[ds.relations.indexOf(relation.id)]" @change="saveDatasetToLocalStorage">
                                                    </div>
                                                    <div>{{ relation.label }}</div>
                                                    <button class="absolute right-3 top-1/2 -translate-y-1/2" @click="removeRelation(ds, relation.id)">
                                                        <VueUiIcon name="close" stroke="#ff6400" :size="18"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                    componentName="VueUiRelationCircle"
                    configName="vue_ui_relation_circle"
                    @click="() => copyComponent('componentContent', store)"
                />    
            </div>
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>