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
            key: 'bars',
            title: makerTranslations.value.categories.bars[store.lang]
        },
        {
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'serieLabels',
            title: makerTranslations.value.categories.serieLabels[store.lang]
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
            key: 'tooltip',
            title: makerTranslations.value.categories.tooltip[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_vertical_bar.model)))

const options = ref({
    parent: {
        name: 'name',
        value: 0,
        color: '#42d392',
        children: []
    },
    child: {
        name: 'child serie',
        value: 0
    }
})

const datasetItems = ref(defaultData.vue_ui_vertical_bar.dataset)
const step = ref(0)

onMounted(() => {
    if(localStorage.verticalBarConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.verticalBarConfig);
    } 
    if(localStorage.verticalBarDataset) {
        datasetItems.value = JSON.parse(localStorage.verticalBarDataset)
    }else {
        localStorage.setItem('verticalBarDataset', JSON.stringify(defaultData.vue_ui_vertical_bar.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.verticalBarDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.verticalBarConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_vertical_bar.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.verticalBarConfig) {
        localStorage.setItem('verticalBarConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.parent)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    step.value += 1;
    saveDatasetToLocalStorage()
}

function addChild({parentId}) {
    const thisParent = datasetItems.value.find(_ => _.id === parentId);
    thisParent.children.push(JSON.parse(JSON.stringify(options.value.child)));
    step.value += 1;
    saveDatasetToLocalStorage();
}

function nukeChild({parentId, index}) {
    const thisParent = datasetItems.value.find(_ => _.id === parentId);
    thisParent.children.splice(index, 1);
    step.value += 1;
    saveDatasetToLocalStorage();
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(!makerTranslations.value.labels[l]) return l
        return makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

function updateParent({parentId}) {
    const thisParent = datasetItems.value.find(_ => _.id === parentId);
    thisParent.value = thisParent.children.map(c => c.value).reduce((a,b) => a + b, 0);
    step.value += 1;
    saveDatasetToLocalStorage();
}

</script>

<template>
    <ClearStorageAndRefresh keyConfig="verticalBarConfig" keyDataset="verticalBarDataset" :key="`clear_${clearStep}`"/>
    <DocLink to="vue-ui-vertical-bar" name="VueUiVerticalBar"/>

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
            <VueUiVerticalBar :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
        </div>
    </transition>
</div>

<details open>
    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
    <div class="flex flex-col gap-2">
        <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
            <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
            <div class="flex flex-col gap-2 place-items-end">
                <table>
                    <thead>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.breakdown[store.lang] }}</th>
                    </thead>
                    <tbody>
                        <td><input type="color" v-model="ds.color" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage"></td>
                        <td>
                            <div v-for="(child, j) in ds.children" class="relative p-2 bg-[#FFFFFF33] dark:bg-[#FFFFFF10] rounded shadow-md mb-2">
                                <button tabindex="0" @click="nukeChild({ parentId: ds.id, index: j})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-2 left-1" /></button>
                                <table>
                                    <thead>
                                        <th class="text-xs text-left">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                                        <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                                    </thead>
                                    <tbody>
                                        <td><input class="h-[36px]" type="text" v-model="child.name" @change="saveDatasetToLocalStorage"></td>
                                        <td><input class="h-[36px]" type="number" v-model="child.value" @change="updateParent({parentId: ds.id})"></td>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tbody>
                </table>
                <Tooltip :content="translations.maker.tooltips.addData[store.lang]">
                    <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addChild({parentId: ds.id})"><PlusIcon/></button>
                </Tooltip>
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
            :dataset="datasetItems.map(({name, value, color, children}) => {return {name, value, color, children}})"
            :config="finalConfig"
            componentName="VueUiChestnut"
            @click="() => copyComponent('componentContent', store)"
        />            
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>