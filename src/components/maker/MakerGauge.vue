<script setup>
import { ref, computed} from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, AlertTriangleIcon, CopyIcon, RefreshIcon } from "vue-tabler-icons"
import { getVueDataUiConfig } from "vue-data-ui";
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"
import { copyComponent, convertArrayToObject, getValueByPath, createUid } from "./lib.js"

const store = useMainStore();
const makerStore = useMakerStore();

const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isFixed = ref(true);

const C = ref(getVueDataUiConfig('vue_ui_gauge'));

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

const CONFIG_MODEL = ref([
    { key: 'style.fontFamily', def: 'inherit', type: 'text', label: 'fontFamily', category: 'general'},
    { key: 'style.chart.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category:'general'},
    { key: 'style.chart.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'general'},
    { key: 'style.chart.animation.use', def: false, type: 'checkbox', label: ['animation', 'is', 'show'], category: 'general'},
    { key: 'style.chart.animation.speed', def: 1, min: 0, max: 10, type: 'range', label: ['animation', 'is', 'speed'], category: 'general'},
    { key: 'style.chart.animation.acceleration', def: 1, min: 0, max: 10, type: 'range',label: ['animation', 'is', 'acceleration'], category: 'general' },
    { key: 'style.chart.layout.track.size', def: 1, type: 'number', min: 1, max: 3, label: ['track', 'is', 'thickness'], category: 'general'},
    { key: 'style.chart.layout.track.useGradient', def: true, type: 'checkbox', label: ['track', 'is', 'useGradient'], category: 'general'},
    { key: 'style.chart.layout.track.gradientIntensity', def: 40, min: 0, max: 100, type: 'range', label: ['track', 'is', 'gradientIntensity'], category: 'general'},
    { key: 'style.chart.layout.markers.size', def: 1, min: 1, max: 3, type: 'number', label: ['markers', 'is', 'size'], category: 'general'},
    { key: 'style.chart.layout.markers.color', def: '#1A1A1A', type: 'color', label: ['markers', 'is', 'textColor'], category: 'general'},
    { key: 'style.chart.layout.markers.bold', def: true, type: 'checkbox', label: ['markers', 'is', 'bold'], category: 'general'},
    { key: 'style.chart.layout.markers.fontSizeRatio', def: 1, type: 'number', min: 0, max: 3, label: ['markers', 'fontSize', 'is', 'ratio'], category: 'general'},
    { key: 'style.chart.layout.markers.offsetY', def: 0, type: 'number', min: -100, max: 100, label: ['markers', 'is', 'offsetY'], category: 'general'},
    { key: 'style.chart.layout.markers.stroke', def: '#1A1A1A', type: "color", label: ['markers', 'border', 'is', 'color'], category: 'general'},
    { key: 'style.chart.layout.markers.strokeWidth', def: 1, type: 'number', min: 0, max: 12, label: ['markers', 'border', 'is', 'thickness'], category: 'general'},
    { key: 'style.chart.layout.markers.backgroundColor', def: '#FFFFFF', type: 'color', label: ['markers', 'is', 'backgroundColor'], category: 'general'},
    { key: 'style.chart.layout.markers.roundingValue', def: 0, type: 'number', min: 0, max: 3, label: ['markers', 'is', 'rounding'], category: 'general'},
    { key: 'style.chart.layout.pointer.size', def: 1, type: 'number', min: 0, max: 2, label: ['pointer', 'is', 'size'], category: 'general'},
    { key: 'style.chart.layout.pointer.stroke', def: '#1A1A1A', type: 'color', label: ['pointer', 'border', 'is', 'color'], category: 'general'},
    { key: 'style.chart.layout.pointer.strokeWidth', def: 12, type: 'number', min: 1, max: 48, label: ['pointer', 'is', 'thickness'], category: 'general'},
    { key: 'style.chart.layout.pointer.useRatingColor', def: true, type: 'checkbox', label: ['pointer', 'color', 'is', 'auto'], category: 'general'},
    { key: 'style.chart.layout.pointer.color', def: '#CCCCCC', type: 'color', label: ['pointer', 'is', 'color'], category: 'general'},
    { key: 'style.chart.layout.pointer.circle.radius', def: 10, type: 'number', min: 0, max: 48, label: ['pointer', 'circle', 'is', 'radius'], category: 'general'},
    { key: 'style.chart.layout.pointer.circle.stroke', def: '#1A1A1A', type: 'color', label: ['pointer', 'circle', 'is', 'border', 'color'], category: 'general'},
    { key: 'style.chart.layout.pointer.circle.strokeWidth', def: 2, type: 'number', min: 0, max: 12, label: ['pointer', 'circle', 'is', 'border', 'thickness'], category: 'general'},
    { key: 'style.chart.layout.pointer.circle.color', def: '#FFFFFF', type: 'color', label: ['pointer', 'circle', 'is', 'backgroundColor'], category: 'general'},
    { key: 'style.chart.legend.fontSize', def: 48, type: 'number', min: 12, max: 120, label: 'fontSize', category: 'legend'},
    { key: 'style.chart.legend.prefix', def: '', type: 'text', label: 'prefix', category: 'legend'},
    { key: 'style.chart.legend.suffix', def: '', type: 'text', label: 'suffix', category: 'legend'},
    { key: 'style.chart.legend.showPlusSymbol', def: true, type: 'checkbox', label: "showPlusSymbol", category: 'legend'},
    { key: 'style.chart.legend.useRatingColor', def: true, type: 'checkbox', label: ['textColor', 'is', 'auto'], category: 'legend'},
    { key: 'style.chart.legend.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'legend'},
    { key: 'style.chart.legend.roundingValue', def: 1, type: 'number', min: 0, max: 6, label: 'rounding', category: 'legend'},
    { key: 'style.chart.title.text', def: 'Title', type: 'text', label: 'textContent', category: 'title'},
    { key: 'style.chart.title.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'title'},
    { key: 'style.chart.title.fontSize', def: 20, type: 'number', min: 6, max: 48, label: 'fontSize', category: 'title'},
    { key: 'style.chart.title.bold', def: true, type: 'checkbox', label: 'bold', category: 'title'},
    { key: 'style.chart.title.subtitle.text', def: '', type: 'text', label: 'textContent', category: 'subtitle' },
    { key: 'style.chart.title.subtitle.color', def: '#A1A1A1', type: 'color', label: 'textColor', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.fontSize', def: 16, type: 'number', min: 6, max: 48, label: 'fontSize', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.bold', def: false, type: 'checkbox', label: 'bold', category: 'subtitle'},
    { key: 'userOptions.show', def: true, type: 'checkbox', label: 'showUserOptions', category: 'general'}
])

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

const datasetItems = ref([
    {
        from: 0,
        to: 5,
        color: "#6376DD",
        id: "111"
    },
    {
        from: 5,
        to: 10,
        color: "#42d392",
        id: "222"
    }
])

const step = ref(0)

function forceChartUpdate() {
    step.value += 1;
}

function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(options.value.datasetItems)), id: createUid()});
    step.value += 1
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id);
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
                        <td><input type="color" v-model="datasetItems[i].color"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.from" @change="forceChartUpdate"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.to" @change="forceChartUpdate"></td>
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
