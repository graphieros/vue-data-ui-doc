<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PinIcon, PinnedOffIcon, CopyIcon, PlusIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, createUid } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import Tooltip from "../../components/FlexibleTooltip.vue";

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

const isStack = ref(true);

const isFixed = ref(!isMobile.value);

const datasetItems = ref(defaultData.vue_ui_3d_bar.dataset.series)

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: 'general',
            title: makerTranslations.value.categories.general[store.lang]
        },
        {
            key: 'container',
            title: makerTranslations.value.categories.container[store.lang]
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
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_3d_bar.model)))
const dataset = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_3d_bar.dataset)))

const step = ref(0)

onMounted(() => {
    if(localStorage.config3dBar) {
        CONFIG_MODEL.value = JSON.parse(localStorage.config3dBar);
    } 
    if(localStorage.dataset3dBar) {
        dataset.value = JSON.parse(localStorage.dataset3dBar)
    }else {
        localStorage.setItem('dataset3dBar', JSON.stringify(defaultData.vue_ui_3d_bar.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    if(isStack.value) {
        dataset.value.series = datasetItems.value;
    }
    localStorage.dataset3dBar = JSON.stringify(dataset.value);
    clearStep.value += 1;
    step.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.config3dBar = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_3d_bar.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.config3dBar) {
        localStorage.setItem('config3dBar', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
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

const options = ref({
    datasetItems: {
        name: 'Serie n',
        value: 0,
        color: '#CCCCCC'
    }
})

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems)), id: createUid()});
    dataset.value.series = datasetItems.value;
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    dataset.value.series = datasetItems.value;
    step.value += 1;
    saveDatasetToLocalStorage()
}


</script>

<template>
  <ClearStorageAndRefresh keyConfig="config3dBar" keyDataset="dataset3dBar" :key="`clear_${clearStep}`"/>
  <DocLink to="vue-ui-3d-bar" name="VueUi3dBar"/>

<div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
    <transition name="fade">                
        <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[250px]' : 'w-full mx-auto max-w-[250px]'}`">
            <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                    <PinnedOffIcon v-if="isFixed"/>
                    <PinIcon v-else/>
                </button>
                <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
            </div>
            <VueUi3dBar :dataset="isStack ? { series: dataset.series } : { percentage: dataset.percentage }" :config="finalConfig" :key="`chart_${step}`"/>
        </div>
    </transition>
</div>

<details open>
    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-3 place-items-center">
            <label for="stack_mode">Stack mode</label>
            <input type="checkbox" v-model="isStack" @change="step += 1">
        </div>
        <div v-if="!isStack" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`">
            <table>
                <thead>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.percentage[store.lang] }}</th>
                </thead>
                <tbody>
                    <td><input class="w-[82px]" min="0" max="100" type="number" v-model="dataset.percentage" @change="saveDatasetToLocalStorage">%</td>
                </tbody>
            </table>
        </div>
        <div class="flex flex-col gap-2" v-if="isStack">
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                    </thead>
                    <tbody>
                        <td><input type="color" v-model="ds.color" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage"></td>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex flex-row gap-4 mt-4 mb-6">
            <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatasetItem"><PlusIcon/></button>
            </Tooltip>
        </div>
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
                            <input class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :step="knob.step ?? 1" :type="knob.type" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def" @change="forceChartUpdate">
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
            :dataset="isStack ? { series: dataset.series } : { percentage: dataset.percentage }"
            :config="finalConfig"
            componentName="VueUi3dBar"
            @click="() => copyComponent('componentContent', store)"
        /> 
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>