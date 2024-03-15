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
            key: 'labels',
            title: makerTranslations.value.categories.labels[store.lang]
        },
        {
            key: 'selector',
            title: makerTranslations.value.categories.selector[store.lang]
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

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_sparkhistogram.model)))

const options = ref({
    dataset: {
        value: 0,
        valueLabel: 'label',
        timeLabel: 'label',
        intensity: 1
    }
})

const datasetItems = ref(defaultData.vue_ui_sparkhistogram.dataset)

const step = ref(0)

onMounted(() => {
    if(localStorage.sparkHistogramConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.sparkHistogramConfig);
    } 
    if(localStorage.sparkHistogramDataset) {
        datasetItems.value = JSON.parse(localStorage.sparkHistogramDataset)
    }else {
        localStorage.setItem('sparkHistogramDataset', JSON.stringify(defaultData.vue_ui_sparkhistogram.dataset))
    }

    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.sparkHistogramDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.sparkHistogramConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_sparkhistogram.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.sparkHistogramConfig) {
        localStorage.setItem('sparkHistogramConfig', {})
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
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
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

</script>

<template>

<ClearStorageAndRefresh keyConfig="sparkHistogramConfig" keyDataset="sparkHistogramDataset" :key="`clear_${clearStep}`"/>
<DocLink to="vue-ui-sparkhistogram" name="VueUiSparkHistogram"/>

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
                <VueUiSparkHistogram :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
            </div>
        </div>
    </transition>
</div>

<details open>
    <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
    <div class="flex flex-row gap-2 w-full overflow-auto">
        <div v-for="(ds, i) in datasetItems" :class="`shadow dark:shadow-md p-3 rounded flex flex-row gap-3 bg-gray-200 dark:bg-[#FFFFFF10]`" :style="`background:${ds.color}30`">
            <div class="relative flex flex-col gap-2">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2 -right-2" /></button>
                <div class="flex flex-col gap-2">
                    <label class="text-sm text-left">{{ translations.maker.labels.period[store.lang] }} : {{ makerTranslations.labels.labels[store.lang] }}</label>
                    <input class="h-[36px] w-[100px]" type="text" v-model="ds.timeLabel" @change="saveDatasetToLocalStorage">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sm text-left">{{ makerTranslations.labels.value[store.lang] }} : {{ makerTranslations.labels.labels[store.lang] }}</label>
                    <input class="h-[36px] w-[100px]" type="text" v-model="ds.valueLabel" @change="saveDatasetToLocalStorage">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sm text-left">{{ makerTranslations.labels.value[store.lang] }}</label>
                    <input class="h-[36px] w-[100px]" type="number" v-model="ds.value" @change="saveDatasetToLocalStorage">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sm text-left">{{ makerTranslations.labels.opacity[store.lang] }} : {{ ds.intensity }} </label>
                    <input class="h-[36px] w-[100px] accent-app-blue" type="range" min="0" max="1" step="0.01" v-model="ds.intensity" @change="saveDatasetToLocalStorage">
                </div>
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
    <div class="mt-6 mb-2 text-lg flex flex-row gap-4 place-items-center">
        <button @click="() => copyComponent('componentContent', store)"><CopyIcon/></button>
        {{ makerTranslations.componentCode[store.lang] }} 
    </div>
<pre class="bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded cursor-pointer"  @click="() => copyComponent('componentContent', store)">
<code id="componentContent">
&lt;script setup&gt;
    import { ref } from "vue";
    import { VueUiSparkHistogram } from "vue-data-ui";
    import "vue-data-ui/style.css"

    const config = ref({{ finalConfig }});

    const dataset = ref({{ datasetItems.map(({value, valueLabel, timeLabel, intensity}) => {
        return {
            value, valueLabel, timeLabel, intensity
        }
    }) }});
&lt;/script&gt;

&lt;template&gt;
    &lt;div style="width:600px"&gt;
        &lt;VueUiSparkHistogram :config="config" :dataset="dataset" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

</code>
</pre>            
            </div>
    
</template>

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
