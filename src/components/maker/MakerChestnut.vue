<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();

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
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
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
        localStorage.setItem('chestnutDataset', JSON.stringify(defaultData.vue_ui_donut.dataset)).map(ds => {
            return {
                name: ds.name,
                color: ds.color,
                id: ds.id,
                branches: []
            }
        })
    }

    // TODO REMOVE !!!
    localStorage.clear()

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.chestnutDataset = JSON.stringify(datasetItems.value);
}

function saveConfigToLocalStorage() {
    localStorage.chestnutConfig = JSON.stringify(CONFIG_MODEL.value)
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
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.root)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

function pushToRoot({ rootId }) {
    const thisItem = datasetItems.value.find(_ => _.id === rootId);
    thisItem.branches.push({...JSON.parse(JSON.stringify(options.branch)), id: createUid()})
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
    thisBranch.push(JSON.parse(JSON.stringify(options.breakdown)));
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

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => makerTranslations.value.labels[l][store.lang]).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

</script>

<template>
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
            <VueUiChestnut :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </div>
    </transition>
</div>
</template>