<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons"
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject } from "./lib.js"
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
            key: 'padding',
            title: makerTranslations.value.categories.padding[store.lang]
        },
        {
            key: 'grid',
            title: makerTranslations.value.categories.grid[store.lang]
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
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_thermometer.model)))
const dataset = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_thermometer.dataset)))

const step = ref(0)

onMounted(() => {
    if(localStorage.thermometerConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.thermometerConfig);
    } 
    if(localStorage.thermometerDataset) {
        dataset.value = JSON.parse(localStorage.thermometerDataset)
    }else {
        localStorage.setItem('thermometerDataset', JSON.stringify(defaultData.vue_ui_thermometer.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.thermometerDataset = JSON.stringify(dataset.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.thermometerConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_thermometer.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.thermometerConfig) {
        localStorage.setItem('thermometerConfig', {})
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

</script>

<template>
    <ClearStorageAndRefresh keyConfig="thermometerConfig" keyDataset="thermometerDataset" :key="`clear_${clearStep}`"/>
    <DocLink to="vue-ui-thermometer" name="VueUiThermometer"/>

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
            <VueUiThermometer :dataset="dataset" :config="finalConfig" :key="`chart_${step}`"/>
        </div>
    </transition>
</div>

<details open>
    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
    <div class="flex flex-col gap-2">
        <div :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`">
            <table>
                <thead>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.value[store.lang] }}</th>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.from[store.lang] }}</th>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.to[store.lang] }}</th>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.scale[store.lang] }}</th>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }} : {{ makerTranslations.labels.from[store.lang] }}</th>
                    <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }} : {{ makerTranslations.labels.to[store.lang] }}</th>

                </thead>
                <tbody>
                    <td><input class="w-[82px]" type="number" v-model="dataset.value" @change="saveDatasetToLocalStorage"></td>
                    <td><input class="w-[82px]" type="number" v-model="dataset.from" @change="saveDatasetToLocalStorage"></td>
                    <td><input class="w-[82px]" type="number" v-model="dataset.to" @change="saveDatasetToLocalStorage"></td>
                    <td><input class="w-[82px]" type="number" v-model="dataset.steps" @change="saveDatasetToLocalStorage"></td>
                    <td><input type="color" v-model="dataset.colors.from" @change="saveDatasetToLocalStorage"></td>
                    <td><input type="color" v-model="dataset.colors.to" @change="saveDatasetToLocalStorage"></td>

                </tbody>
            </table>
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
            :dataset="dataset"
            :config="finalConfig"
            componentName="VueUiThermometer"
            configName="vue_ui_thermometer"
            @click="() => copyComponent('componentContent', store)"
        />    
    </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>