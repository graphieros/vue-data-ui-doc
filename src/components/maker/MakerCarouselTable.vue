<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PinIcon, PinnedOffIcon, PlusIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
import { useDefaultDataStore } from "../../stores/defaultData"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import { VueUiCarouselTable } from "vue-data-ui";
import Tooltip from "../../components/FlexibleTooltip.vue";
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

const isFixed = ref(false);

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
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_carousel_table.model)))

const currentDataset = ref(defaultData.vue_ui_carousel_table.dataset)

const step = ref(0);

onMounted(() => {
    if(localStorage.carouselTableConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.carouselTableConfig);
    } 
    if(localStorage.carouselTableDataset) {
        currentDataset.value = JSON.parse(localStorage.carouselTableDataset)
    }else {
        localStorage.setItem('carouselTableDataset', JSON.stringify(defaultData.vue_ui_carousel_table.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    step.value += 1;
    localStorage.carouselTableDataset = JSON.stringify(currentDataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.carouselTableConfig = JSON.stringify(CONFIG_MODEL.value)
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_carousel_table.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.carouselTableConfig) {
        localStorage.setItem('carouselTableConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(! makerTranslations.value.labels[l]) return l
        return  makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label] ?
    makerTranslations.value.labels[label][store.lang] : label
}

function addCol() {
    currentDataset.value.head.push('...');
    currentDataset.value.body.forEach(el => {
        el.push(0)
    })
    saveDatasetToLocalStorage()
}

function deleteCol(index) {
    currentDataset.value.head.splice(index, 1)
    currentDataset.value.body.forEach(row => row.splice(index, 1))
    saveDatasetToLocalStorage()
}

function addRow() {
    const arr = new Array(currentDataset.value.head.length).fill(0)
    currentDataset.value.body.push(arr)
    saveDatasetToLocalStorage()
}

function deleteRow(index) {
    currentDataset.value.body.splice(index, 1);
    saveDatasetToLocalStorage();
}

const rowDeleteIndexIndicator = ref(null);
const colDeleteIndexIndicator = ref(null);

</script>

<template>
    <div>

        <ClearStorageAndRefresh keyConfig="carouselTableConfig" keyDataset="carouselTableDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-carousel-table" name="VueUiCarouselTable"/>
    
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <transition name="fade">                
                <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[300px]' : 'w-full mx-auto max-w-[600px]'}`">
                    <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                        <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                            <PinnedOffIcon v-if="isFixed"/>
                            <PinIcon v-else/>
                        </button>
                        <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ makerTranslations.reset[store.lang] }}</button>
                    </div>
                    <VueUiCarouselTable :dataset="currentDataset" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </transition>
        </div>
    
        <details open>
            <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
            <div class="flex flex-col gap-2 bg-gray-200 dark:bg-[#FFFFFF10] p-4 rounded-md overflow-x-auto">
                {{ makerTranslations.tableHeader[store.lang] }}
                <table class="table-auto border-collapse border border-slate-500 my-4 w-full">
                    <thead>
                        <tr>
                            <th v-for="(h,i) in currentDataset.head" :class="`relative border border-gray-400 p-2 ${i === colDeleteIndexIndicator ? 'bg-[#FF640050]' : 'bg-gray-300 dark:bg-[#FFFFFF10]' }`">
                                <div class="flex flex-col gap-2 place-items-center">
                                    <label :for="`th_${i}`" class="w-full">th index {{ i }}</label>
                                    <input :id="`th_${i}`" type="text" v-model="currentDataset.head[i]" class="pl-2 h-[40px]">
                                </div>
                                <button tabindex="0" @click="deleteCol(i)" @mouseenter="colDeleteIndexIndicator = i" @mouseleave="colDeleteIndexIndicator = null"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1 z-10"/></button>
                            </th>
                        </tr>
                    </thead>
                </table>
                <div class="flex flex-row gap-4">
                    <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                        <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addCol"><PlusIcon/></button>
                    </Tooltip>
                </div>
            </div>
            <div class="flex flex-col gap-2 bg-gray-200 dark:bg-[#FFFFFF10] p-4 rounded-md mt-4 overflow-x-auto">
                {{ makerTranslations.tableBody[store.lang] }}
                <table class="table-auto border-collapse border border-slate-500 my-4 w-full">
                    <thead>
                        <tr v-for="(row, i) in currentDataset.body" class="relative">
                            <td>
                                <div class="w-full flex place-items-center justify-center">
                                    <button tabindex="0" @click="deleteRow(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer" @mouseenter="rowDeleteIndexIndicator = i" @mouseleave="rowDeleteIndexIndicator = null" /></button>
                                </div>
                            </td>
                            <td v-for="(td, j) in row" :class="`relative border border-gray-400 p-2 ${ i === rowDeleteIndexIndicator ? 'bg-[#FF640050]' : 'bg-gray-300 dark:bg-[#FFFFFF10]'}`">
                                <input v-model="currentDataset.body[i][j]" class="pl-2 h-[40px]">
                            </td>
                            <td>
                                <div class="w-full flex place-items-center justify-center">
                                    <button tabindex="0" @click="deleteRow(i)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer" @mouseenter="rowDeleteIndexIndicator = i" @mouseleave="rowDeleteIndexIndicator = null" /></button>
                                </div>
                            </td>
                        </tr>
                    </thead>
                </table>
                <div class="flex flex-row gap-4">
                    <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                        <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addRow"><PlusIcon/></button>
                    </Tooltip>
                </div>
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
            <ComponentContent
                :dataset="currentDataset"
                :config="finalConfig"
                componentName="VueUiCarouselTable"
                configName="vue_ui_carousel_table"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="() => copyComponent('componentContent', store)"
            >
                <template #component-copy>
                    <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                </template>
            </ComponentContent>          
        </div>
    </div>
</template>