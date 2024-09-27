<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, AlertTriangleIcon, CopyIcon } from "vue-tabler-icons"
import { getVueDataUiConfig } from "vue-data-ui";
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { useDefaultDataStore } from "../../stores/defaultData"
import { copyComponent, convertArrayToObject, getValueByPath, createUid } from "./lib.js"
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import BaseShape from "../BaseShape.vue";

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

const xyTranslations = computed(() => {
    return makerStore.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isFixed = ref(!isMobile.value);

const datasetItems = ref(defaultData.vue_ui_xy.dataset)
const step = ref(0);


const CONFIG_CATEGORIES = computed(() => {
    return [
    {
        key: 'general',
        title: xyTranslations.value.categories.general[store.lang]
    },
    {
        key: 'userOptions',
        title: xyTranslations.value.categories.userOptions[store.lang]
    },
    {
        key: 'padding',
        title: xyTranslations.value.categories.padding[store.lang]
    },
    {
        key: 'highlight',
        title: xyTranslations.value.categories.highlight[store.lang]
    },
    {
        key: 'grid',
        title: xyTranslations.value.categories.grid[store.lang]
    },
    {
        key: 'labels',
        title: xyTranslations.value.categories.labels[store.lang]
    },
    {
        key: 'legend',
        title: xyTranslations.value.categories.legend[store.lang]
    },
    {
        key: 'title',
        title: xyTranslations.value.categories.title[store.lang]
    },
    {
        key: 'subtitle',
        title: xyTranslations.value.categories.subtitle[store.lang]
    },
    {
        key: 'tooltip',
        title: xyTranslations.value.categories.tooltip[store.lang]
    },
    {
        key: 'bar',
        title: xyTranslations.value.categories.bar[store.lang]
    },
    {
        key: 'line',
        title: xyTranslations.value.categories.line[store.lang]
    },
    {
        key: 'plot',
        title: xyTranslations.value.categories.plot[store.lang]
    },
    {
        key: 'table',
        title: xyTranslations.value.categories.table[store.lang]
    }
]
})

const CONFIG_MODEL = ref(JSON.parse(JSON.stringify(defaultData.vue_ui_xy.model)))


onMounted(() => {
    if(localStorage.xyConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.xyConfig);
    } 
    if(localStorage.xyDataset) {
        datasetItems.value = JSON.parse(localStorage.xyDataset)
    }else {
        localStorage.setItem('xyDataset', JSON.stringify(defaultData.vue_ui_xy.dataset))
    }
    step.value += 1;
})

const options = ref(
    {
        name: "VueUiXy",
        icon: 'chartLine',
        types: ['line', 'plot', 'bar'],
        shapes: ['circle', 'triangle', 'square', 'diamond', 'pentagon', 'hexagon', 'star'],
        useTag: ['none', 'start', 'end'],
        showSerieName: ['none', 'start', 'end'],
        datasetItems: {
            name: "name",
            series: [],
            color: "#42d392",
            type: "line",
            shape: 'circle',
            useArea: false,
            useProgression: false,
            dataLabels: true,
            smooth: false,
            dashed: false,
            useTag: 'none'
        },
        essentialConfig: {
            xValues: "array"
        },
        dataset: []
    },
)

const selectedChart = ref(options.value)

function saveDatasetToLocalStorage() {
    localStorage.xyDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.xyConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(JSON.stringify(defaultData.vue_ui_xy.model))
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if(!localStorage.xyConfig) {
        localStorage.setItem('xyConfig', {})
    }
    saveConfigToLocalStorage()
    step.value += 1;
}


function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(selectedChart.value.datasetItems)), id: createUid()})
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
    saveDatasetToLocalStorage()
}

const maxSeries = computed(() => {
    return Math.max(...datasetItems.value.map(ds => ds.series.length))
})

function pushValueToSeries({ value, id, key = 'values'}) {
    const thisItem = datasetItems.value.find(_ => _.id === id)
    thisItem[key].push(value)
    step.value += 1;
    saveDatasetToLocalStorage()
}

function deleteValueFromSeries({id, index, key='values'}) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem[key].splice(index, 1)
    step.value += 1;
    saveDatasetToLocalStorage()
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})


function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(!xyTranslations.value.labels[l]) return l
        return xyTranslations.value.labels[l][store.lang]
    }).join(" ") :
    xyTranslations.value.labels[label] ?
    xyTranslations.value.labels[label][store.lang] : label
}

const accordionConfig = ref(
    {
            maxHeight: 5000,
            open: true,
            head: {
                backgroundColor: 'transparent',
                iconColor: '#42d392'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            }
        }
)

</script>

<template>

        <ClearStorageAndRefresh keyConfig="xyConfig" keyDataset="xyDataset" :key="`clear_${clearStep}`"/>
        <DocLink to="vue-ui-xy" name="VueUiXy"/>

        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <transition name="fade">                
                <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[300px]' : 'w-full mx-auto max-w-[600px]'}`">
                    <div class="flex flex-row gap-6 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                        <button @click="isFixed = !isFixed" class="flex align-center justify-center  border border-app-blue p-2 rounded-full">
                            <PinnedOffIcon v-if="isFixed"/>
                            <PinIcon v-else/>
                        </button>

                        <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ xyTranslations.reset[store.lang] }}</button>

                    </div>
                    <VueUiXy :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </transition>

            <VueDataUi
                component="VueUiAccordion"
                :config="accordionConfig"
            >
                <template #title>
                    {{ xyTranslations.dataset[store.lang] }}
                </template>
                <template #content>
                    <div class="flex flex-col gap-2">
                    <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                    <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                        <table>
                            <thead>
                                <th class="text-left text-xs h-[40px]">{{ xyTranslations.labels.color[store.lang] }}</th>
                                <th class="text-left text-xs">{{ xyTranslations.labels.serieName[store.lang] }}</th>
                                <th class="text-left text-xs">{{ xyTranslations.labels.type[store.lang] }}</th>
                                <th class="text-left text-xs">{{ xyTranslations.labels.showDataLabels[store.lang] }}</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">{{ xyTranslations.labels.tag[store.lang] }}</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Show serie name</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">{{ xyTranslations.labels.area[store.lang] }}</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">{{ xyTranslations.labels.smooth[store.lang] }}</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">{{ xyTranslations.labels.dashed[store.lang] }}</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">{{ xyTranslations.labels.progression[store.lang] }}</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">{{ xyTranslations.labels.shape[store.lang] }}</th>
                                <th v-for="(_, j) in maxSeries">
                                    <div class="flex flex-col">
                                        <label class="text-left text-xs flex flex-row gap-2">{{ translations.maker.labels.period[store.lang] }} <AlertTriangleIcon class="text-app-orange" size="14" v-if="!CONFIG_MODEL.find(el => el.key === 'chart.grid.labels.xAxisLabels.values').def[j]" /></label>
                                        <input @change="saveConfigToLocalStorage" class="w-[86px]" type="text" v-model="CONFIG_MODEL.find(el => el.key === 'chart.grid.labels.xAxisLabels.values').def[j]">
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    
                                    <td><input type="color" v-model="datasetItems[i].color" @change="saveDatasetToLocalStorage"></td>
                                    <td><input class="h-[36px]" type="text" v-model="ds.name" @change="saveDatasetToLocalStorage"></td>
                                    <td>
                                        <select class="h-[36px]" v-model="datasetItems[i].type" @change="saveDatasetToLocalStorage"><option v-for="t in selectedChart.types">{{ t }}</option></select>
                                    </td>
                                    <td><input type="checkbox" v-model="datasetItems[i].dataLabels" @change="saveDatasetToLocalStorage"></td>
                                    <td v-if="datasetItems[i].type !== 'bar'"><select class="h-[36px]" v-model="datasetItems[i].useTag" @change="saveDatasetToLocalStorage"><option v-for="tag in selectedChart.useTag">{{ tag }}</option></select></td>
                                    <td v-if="datasetItems[i].type !== 'bar'"><select class="h-[36px]" v-model="datasetItems[i].showSerieName" @change="saveDatasetToLocalStorage"><option v-for="tag in selectedChart.showSerieName">{{ tag }}</option></select></td>
                                    <td v-if="datasetItems[i].type === 'line'"><input type="checkbox" v-model="datasetItems[i].useArea" @change="saveDatasetToLocalStorage"></td>
                                    <td v-if="datasetItems[i].type === 'line'"><input type="checkbox" v-model="datasetItems[i].smooth" @change="saveDatasetToLocalStorage"></td>
                                    <td v-if="datasetItems[i].type === 'line'"><input type="checkbox" v-model="datasetItems[i].dashed" @change="saveDatasetToLocalStorage"></td>
                                    <td v-if="datasetItems[i].type !== 'bar'"><input type="checkbox" v-model="datasetItems[i].useProgression" @change="saveDatasetToLocalStorage"></td>
                                    <td v-if="datasetItems[i].type !== 'bar'">
                                        <div class="flex flex-row place-items-center gap-2">
                                                <select class="h-[36px]" v-model="datasetItems[i].shape" @change="saveDatasetToLocalStorage"><option v-for="shape in selectedChart.shapes">{{ shape }}</option></select>
                                                <div class="w-[40px]">
                                                    <BaseShape :shape="datasetItems[i].shape" :color="datasetItems[i].color" />
                                                </div>
                                            </div>
                                    </td>
                                    <td v-for="(val, j) in datasetItems[i].series">
                                        <div class="relative">
                                            <input @change="saveDatasetToLocalStorage" type="number" style="" v-model="datasetItems[i].series[j]" class="h-[36px] w-[86px]"><button tabindex="0" @click="deleteValueFromSeries({id: ds.id, index: j, key: 'series'})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2.5 left-1" /></button>
                                        </div>
                                    </td>
                                    <Tooltip :content="translations.maker.tooltips.addData[store.lang]">
                                        <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="pushValueToSeries({ value: 0, id: ds.id, key:'series'})"><PlusIcon/></button>
                                    </Tooltip>
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
                </template>
            </VueDataUi>

            <VueDataUi
                component="VueUiAccordion"
                :config="accordionConfig"
            >
                <template #title>
                    {{ xyTranslations.config[store.lang] }}
                </template>
                <template #content>
                    <div class="flex justify-end">
                    <button class="ml-4 py-1 px-4 rounded-full border border-app-orange text-app-orange hover:bg-app-orange hover:text-black transition-colors" @click="resetModel">{{ xyTranslations.reset[store.lang] }}</button>
                </div>

                <template v-for="category in CONFIG_CATEGORIES">
                
                    <div class="flex flex-col gap-2 shadow dark:shadow-md bg-[#5f8bee30] p-3 rounded my-4">
                        <h4>{{ category.title }}</h4> 
                        <div class="flex flex-row gap-4 place-items-center flex-wrap">
                            <div v-for="knob in CONFIG_MODEL.filter(k => k.category === category.key)" class="flex flex-col justify-start">
                                <label class="text-xs">{{ getLabel(knob.label) }}</label>
                                <div class="flex place-items-center justify-start h-[40px]">
                                    <input class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :type="knob.type" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def" @change="forceChartUpdate">
                                    <select v-if="knob.type === 'select'" v-model="knob.def" @change="forceChartUpdate">
                                        <option v-for="opt in knob.options">{{ opt }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                </template>
            </VueDataUi>


            <div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
                <CopyComponent @click="() => copyComponent('componentContent', store)"/>
                <ComponentContent
                    :dataset=" datasetItems.map(({name, series, color, type, shape, useArea, useProgression, dataLabels, smooth, dashed, useTag}) => {
                        return { name, series, color, type, shape, useArea, useProgression, dataLabels, smooth, dashed, useTag }})"
                    :config="finalConfig"
                    componentName="VueUiXy"
                    configName="vue_ui_xy"
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