<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, XIcon } from "vue-tabler-icons"
import Tooltip from "../../components/FlexibleTooltip.vue";
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
    <div>

        <ClearStorageAndRefresh keyConfig="chestnutConfig" keyDataset="chestnutDataset" :key="`clear_${clearStep}`"/>
        <BaseDocExampleLink link="vue-ui-chestnut" :example="false" componentName="VueUiChestnut"/>
    
    <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
        <Transition name="fade">
            <BaseMakerChart
                v-if="!isFixed"
                :isFixed="isFixed"
                @fixChart="fixChart"
                @resetModel="resetModel"
            >
                <VueUiChestnut ref="chart" :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </BaseMakerChart>
        </Transition>
    </div>
    
    <BaseCard>
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2">
                <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 pl-6 rounded flex flex-row gap-3 place-items-center`" :style="`background:${ds.color}30`">

                    <BaseButton
                        color="error"
                        :size="6"
                        fab
                        @click="deleteDatasetItem(ds.id)"
                        tw="absolute -top-2 -left-4"
                    >
                        <XIcon size="16" />
                    </BaseButton>

                    <table>
                        <thead>
                            <tr>
                                <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                <th class="text-left text-xs">{{ makerTranslations.labels.branch[store.lang] }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                                <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                <td v-for="(branch, j) in ds.branches">
                                    <div class="p-2 pt-8 rounded bg-[#FFFFFF33] dark:bg-[#FFFFFF10] mx-2 shadow-md relative flex flex-row place-items-center">

                                        <BaseButton
                                            v-if="ds.branches.length > 1"
                                            color="error"
                                            :size="4"
                                            fab
                                            @click="removeFromRoot({ rootId: ds.id, branchId: branch.id})"
                                            tw="absolute -top-8"
                                        >
                                            <XIcon size="12" />
                                        </BaseButton>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="text-left text-xs">{{ composeLabel(['branch', 'is', 'name']) }}</th>
                                                    <th class="text-left text-xs">{{ composeLabel(['branch', 'is', 'value']) }}</th>
                                                    <th class="text-left text-xs">{{ composeLabel(['breakdown']) }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input v-model="branch.name" type="text" class="h-[32px]" @change="saveDatasetToLocalStorage"></td>
                                                    <td><input v-model="branch.value" type="number" class="h-[32px]" @change="saveDatasetToLocalStorage"></td>
                                                    <td v-for="(br, k) in branch.breakdown">
                                                        <div class="flex flex-col gap-4 p-2 bg-[#FFFFFF33] dark:bg-[#FFFFFF10] rounded mx-1 shadow-md relative">

                                                            <BaseButton
                                                                color="error"
                                                                :size="4"
                                                                fab
                                                                @click="removeFromBranch({ rootId: ds.id, branchId: branch.id, index: k})"
                                                                tw="absolute -top-[2px] -right-[2px]"
                                                            >
                                                                <XIcon size="12" />
                                                            </BaseButton> 

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
                                                </tr>
                                            </tbody>
                                        </table>

                                        <BaseButton
                                            color="success"
                                            fab
                                            @click="pushToBranch({ rootId: ds.id, branchId: branch.id})"
                                            :tooltip="composeLabel(['add', 'is', 'breakdown'])"
                                        >
                                            <PlusIcon/>
                                        </BaseButton>
            
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <BaseButton
                        color="success"
                        fab
                        :size="10"
                        @click="pushToRoot({ rootId: ds.id})"
                        :tooltip="composeLabel(['add', 'is', 'branch'])"
                    >
                        <PlusIcon/>
                    </BaseButton>
                </div>
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
    </BaseCard>
    
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
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            keyConfig="chestnutConfig"
            keyDataset="chestnutDataset"
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
            <VueUiChestnut :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </BaseMakerChart>
    </Transition>
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
