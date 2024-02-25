<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, AlertTriangleIcon, CopyIcon, RefreshIcon } from "vue-tabler-icons"
import { getVueDataUiConfig } from "vue-data-ui";
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, getValueByPath, createUid } from "./lib.js";
import { useDefaultDataStore } from "../../stores/defaultData"

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();

const isMobile = computed(() => {
    return window.innerWidth < 800;
});

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
            key: "general",
            title: makerTranslations.value.categories.general[store.lang]
        },
        {
            key: "legend",
            title: makerTranslations.value.categories.legend[store.lang]
        },
        {
            key: "title",
            title: makerTranslations.value.categories.title[store.lang]
        },
        {
            key: "subtitle",
            title: makerTranslations.value.categories.subtitle[store.lang]
        },
    ]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_gauge.model)))

const options = ref({
    datasetItems: {
        from: 0,
        to: 0,
        color: "#42d392"
    },
    value: 6,
    dataset: {},
    config: {}
})

const datasetItems = ref(defaultData.vue_ui_gauge.dataset)

const step = ref(0);

onMounted(() => {
    if(localStorage.gaugeConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.gaugeConfig);
    } 
    if(localStorage.gaugeDataset) {
        datasetItems.value = JSON.parse(localStorage.gaugeDataset)
    }else {
        localStorage.setItem('gaugeDataset', JSON.stringify(defaultData.vue_ui_gauge.dataset))
    }
    step.value += 1;
})

function saveDatasetToLocalStorage() {
    localStorage.gaugeDataset = JSON.stringify(datasetItems.value);
    step.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.gaugeConfig = JSON.stringify(CONFIG_MODEL.value)
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_gauge.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.waffleConfig) {
        localStorage.setItem('waffleConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems)), id: createUid()});
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage();
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => makerTranslations.value.labels[l][store.lang]).join(" ") :
    makerTranslations.value.labels[label][store.lang]
}

const usableDataset = computed(() => {
    return {
        series: datasetItems.value,
        base:options.value.base,
        value: options.value.value
    }
})

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
                    <VueUiGauge :dataset="usableDataset" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </transition>
    </div>

    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-4 place-items-center pl-16">
                <div class="flex flex-col gap-2">
                    <label class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</label>
                    <input type="number" class="w-[82px] h-[32px]" v-model="options.value" @change="forceChartUpdate">
                </div>
            </div>
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.from[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.to[store.lang] }}</th>
                    </thead>
                    <tbody>
                        <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.from" @change="saveDatasetToLocalStorage"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.to" @change="saveDatasetToLocalStorage"></td>
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

        <template v-for="category in CONFIG_CATEGORIES">
        
            <div class="flex flex-col gap-2 shadow dark:shadow-md bg-[#5f8bee30] p-3 rounded my-4">
                <h4>{{ category.title }}</h4> 
                <div class="flex flex-row gap-4 place-items-center flex-wrap">
                    <div v-for="knob in CONFIG_MODEL.filter(k => k.category === category.key)" class="flex flex-col justify-start">
                        <label class="text-xs">{{ getLabel(knob.label) }}</label>
                        <div class="flex place-items-center justify-start h-[40px]">
                            <input  class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :type="knob.type" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def" @change="forceChartUpdate">
                            <select v-if="knob.type === 'select'" v-model="knob.def">
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
    import { VueUiGauge } from "vue-data-ui";
    import "vue-data-ui/style.css"

    const config = ref({{ finalConfig }});

    const dataset = ref({{ usableDataset }})
&lt;/script&gt;

&lt;template&gt;
    &lt;div style="width:600px"&gt;
        &lt;VueUiGauge :config="config" :dataset="dataset" /&gt;
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
