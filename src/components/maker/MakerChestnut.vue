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
            key: 'roots',
            title: makerTranslations.value.categories.roots[store.lang]
        },
        {
            key: 'branches',
            title: makerTranslations.value.categories.branches[store.lang]
        },
        {
            key: 'donutCharts',
            title: makerTranslations.value.categories.donutCharts[store.lang]
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
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        },
        {
            key: 'translations',
            title: makerTranslations.value.categories.translations[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_chestnut.model)))

const options = ref({
    root: {
        name: 'Root name',
        color: '#42d392',
        id: createUid(),
        branches: []
    },
    branch: {
        name: 'Branch name',
        value: 0,
        id: createUid(),
        breakdown: []
    },
    breakdown: {
        name: 'Breakdown name',
        value: 0,
        color: '#6376DD'
    }
})

const datasetItems = ref(defaultData.vue_ui_chestnut.dataset);

const step = ref(0);

onMounted(() => {
    if(localStorage.chestnutConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.chestnutConfig);
    } 
    if(localStorage.chestnutDataset) {
        datasetItems.value = JSON.parse(localStorage.chestnutDataset)
    }else {
        localStorage.setItem('chestnutDataset', JSON.stringify(defaultData.vue_ui_chestnut.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.chestnutDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.chestnutConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_chestnut.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.chestnutConfig) {
        localStorage.setItem('chestnutConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.root)), id: createUid(), branches: [JSON.parse(JSON.stringify(options.value.branch))]});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function pushToRoot({ rootId }) {
    const thisItem = datasetItems.value.find(_ => _.id === rootId);
    thisItem.branches.push({...JSON.parse(JSON.stringify(options.value.branch)), id: createUid(), breakdown: [JSON.parse(JSON.stringify(options.value.breakdown))]})
    step.value += 1;
    saveDatasetToLocalStorage();
}

function removeFromRoot({ rootId, branchId }) {
    const thisRoot = datasetItems.value.find(_ => _.id === rootId);
    thisRoot.branches = thisRoot.branches.filter(_ => _.id !== branchId);
    step.value += 1;
    saveDatasetToLocalStorage();
}

function pushToBranch({ rootId, branchId }) {
    const thisRoot = datasetItems.value.find(_ => _.id === rootId);
    const thisBranch = thisRoot.branches.find(_ => _.id === branchId);
    thisBranch.breakdown.push(JSON.parse(JSON.stringify(options.value.breakdown)));
    step.value += 1;
    saveDatasetToLocalStorage();
}

function removeFromBranch({ rootId, branchId, index }) {
    const thisRoot = datasetItems.value.find(_ => _.id === rootId);
    const thisBranch = thisRoot.branches.find(_ => _.id === branchId);
    thisBranch.breakdown.splice(index, 1)
    step.value += 1;
    saveDatasetToLocalStorage();
}

function updateBranchValue({ branchId, rootId }) {
    const thisRoot = datasetItems.value.find(_ => _.id === rootId);
    const thisBranch = thisRoot.branches.find(_ => _.id === branchId);
    thisBranch.value = thisBranch.breakdown.map(b => b.value).reduce((a,b) => a + b, 0)
    saveDatasetToLocalStorage();
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(!makerTranslations.value.labels[l]) return l;
        return  makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

function composeLabel(labels) {
    return labels.map(l => {
        if(!makerTranslations.value.labels[l]) return `!${l}`
        return makerTranslations.value.labels[l][store.lang] ?? `!${l}`
    }).join(' ')
}

</script>

<template>
    <ClearStorageAndRefresh keyConfig="chestnutConfig" keyDataset="chestnutDataset" :key="`clear_${clearStep}`"/>
    <DocLink to="vue-ui-chestnut" name="VueUiChestnut"/>

<div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
    <transition name="fade">                
        <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[300px]' : 'w-full mx-auto max-w-[800px]'}`" v-if="datasetItems.length">
            <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                    <PinnedOffIcon v-if="isFixed"/>
                    <PinIcon v-else/>
                </button>
                <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
            </div>
            <VueUiChestnut :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </div>
    </transition>
</div>

<details open>
    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
    <div class="flex flex-col gap-2">
        <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 place-items-center`" :style="`background:${ds.color}30`">
            <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
            <table>
                <thead>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                    <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                    <th class="text-left text-xs">{{ makerTranslations.labels.branch[store.lang] }}</th>
                </thead>
                <tbody>
                    <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                    <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                    <td v-for="(branch, j) in ds.branches">
                        <div class="p-2 pt-8 rounded bg-[#FFFFFF33] dark:bg-[#FFFFFF10] mx-2 shadow-md relative flex flex-row place-items-center">
                            <button v-if="ds.branches.length > 1" tabindex="0" @click="removeFromRoot({ rootId: ds.id, branchId: branch.id})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute left-2 top-2" /></button>
                            <table>
                                <thead>
                                    <th class="text-left text-xs">{{ composeLabel(['branch', 'is', 'name']) }}</th>
                                    <th class="text-left text-xs">{{ composeLabel(['branch', 'is', 'value']) }}</th>
                                    <th class="text-left text-xs">{{ composeLabel(['breakdown']) }}</th>
                                </thead>
                                <tbody>
                                    <td><input v-model="branch.name" type="text" class="h-[32px]" @change="saveDatasetToLocalStorage"></td>
                                    <td><input v-model="branch.value" type="number" class="h-[32px]" @change="saveDatasetToLocalStorage"></td>
                                    <td v-for="(br, k) in branch.breakdown">
                                        <div class="flex flex-col gap-4 p-2 bg-[#FFFFFF33] dark:bg-[#FFFFFF10] rounded mx-1 shadow-md relative">
                                            <button tabindex="0" @click="removeFromBranch({ rootId: ds.id, branchId: branch.id, index: k})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-2 right-2" /></button>
                                            <div class="flex flex-col gap-1">
                                                <label class="text-xs text-left">{{ composeLabel(['breakdown', 'is', 'color']) }}</label>
                                                <input v-model="br.color" type="color" @change="saveDatasetToLocalStorage">
                                            </div>
                                            <div class="flex flex-col gap-1">
                                                <label class="text-xs text-left">{{ composeLabel(['breakdown', 'is', 'name']) }}</label>
                                                <input v-model="br.name" type="text" class="h-[32px]" @change="saveDatasetToLocalStorage">
                                            </div>
                                            <div class="flex flex-col gap-1">
                                                <label class="text-xs text-left">{{ composeLabel(['breakdown', 'is', 'value']) }}</label>
                                                <input v-model="br.value" type="number" class="h-[32px] w-[82px]" @change="updateBranchValue({ rootId: ds.id, branchId: branch.id })">
                                            </div>
                                        </div>
                                    </td>
                                </tbody>
                            </table>
                            <Tooltip :content="composeLabel(['add', 'is', 'breakdown'])">
                                <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="pushToBranch({ rootId: ds.id, branchId: branch.id})"><PlusIcon/></button>
                            </Tooltip>
                        </div>
                    </td>
                </tbody>
            </table>
            <Tooltip :content="composeLabel(['add', 'is', 'branch'])">
                <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="pushToRoot({ rootId: ds.id})"><PlusIcon/></button>
            </Tooltip>
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

    <template v-for="category in CONFIG_CATEGORIES">
    
        <div class="flex flex-col gap-2 shadow dark:shadow-md bg-[#5f8bee30] p-3 rounded my-4">
            <h4>{{ category.title }}</h4> 
            <div class="flex flex-row gap-4 place-items-center flex-wrap">
                <div v-for="knob in CONFIG_MODEL.filter(k => k.category === category.key)" class="flex flex-col justify-start">
                    <label class="text-xs">{{ getLabel(knob.label) }}</label>
                    <div class="flex place-items-center justify-start h-[40px]">
                        <input class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :type="knob.type" :step="knob.step ?? 1" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def" @change="forceChartUpdate">
                        <select v-if="knob.type === 'select'" v-model="knob.def" @change="forceChartUpdate" class="h-[32px] px-2">
                            <option v-for="opt in knob.options">{{ opt }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </template>
</details>

<div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
    <ComponentContent 
        :dataset="datasetItems.map(ds => {
            return {
                name: ds.name,
                color: ds.color,
                branches: ds.branches.map(b => {
                    return {
                        name: b.name,
                        value: b.value,
                        breakdown: b.breakdown
                    }
                })
            }})"
        :config="finalConfig"
        componentName="VueUiChestnut"
        configName="vue_ui_chestnut"
        @click="() => copyComponent('componentContent', store)"
    />            
</div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
