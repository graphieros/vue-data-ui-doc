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

const C = ref(getVueDataUiConfig('vue_ui_donut'));

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
            key: 'donut',
            title: makerTranslations.value.categories.donut[store.lang]
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
        }
    ]
})
const CONFIG_MODEL = ref([
    { key: 'useCssAnimation', def: true, type: 'checkbox', label: 'useCssAnimation', category: 'general' },
    { key: 'useBlurOnHover', def: true, type: 'checkbox', label: "useBlurOnHover", category: 'general' },
    { key: 'style.fontFamily', def: 'inherit', type: 'text', label: "fontFamily", category: 'general'},
    { key: 'style.chart.useGradient', def: true, type: 'checkbox', label: 'useGradient', category: 'general'},
    { key: 'style.chart.gradientIntensity', def: 40, min: 0, max: 100, type: 'range', label: 'gradientIntensity', category: 'general'},
    { key: 'style.chart.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category: 'general'},
    { key: 'style.chart.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'general' },
    { key: 'style.chart.layout.labels.dataLabels.show', def: true, type: 'checkbox', label: 'show', category: 'labels' },
    { key: 'style.chart.layout.labels.dataLabels.hideUnderValue', def: 3, type: 'number', min: 0, max: 100, label: 'hideUnderValue', category: 'labels'},
    { key: 'style.chart.layout.labels.dataLabels.prefix', def: '', type: 'text', label: 'prefix', category: 'labels' },
    { key: 'style.chart.layout.labels.dataLabels.suffix', def: '', type: 'text', label: 'suffix', category: 'labels' },
    { key: 'style.chart.layout.labels.value.show', def: true, type: 'checkbox', label: 'showValue', category: 'labels'},
    { key: 'style.chart.layout.labels.value.rounding', def: 0, type: 'number', min:0, max: 6, label: 'valueRounding', category: 'labels'},
    { key: 'style.chart.layout.labels.percentage.color', def: '#1A1A1A', type: 'color', label: 'colorPercentage', category: 'labels'},
    { key: 'style.chart.layout.labels.percentage.bold', def: true, type: 'checkbox', label: 'bold', category: 'labels'},
    { key: 'style.chart.layout.labels.percentage.fontSize', def: 18, min: 6, max: 48, type: 'number', label: 'fontSize', category: 'labels'},
    { key: 'style.chart.layout.labels.name.color', def: '#1A1A1A', type: 'color', label: 'colorName', category: 'labels'},
    { key: 'style.chart.layout.labels.name.bold', def: false, type: 'checkbox', label: 'bold', category: 'labels'},
    { key: 'style.chart.layout.labels.name.fontSize', def: 14, type: 'number', min: 6, max: 36, label: 'fontSize', category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.show', def: true, type: 'checkbox', label: ['hollow', 'total', 'is', 'show'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.bold', def: false, type: 'checkbox', label: ['hollow', 'total', 'is', 'bold'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.fontSize', def: 18, type: 'number', min: 6, max: 48, label: ['hollow', 'total', 'is', 'fontSize'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.color', def: '#AAAAAA', type: 'color', label: ['hollow', 'total', 'is', 'color'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.text', def: 'Total', type: 'text', label: ['hollow', 'total', 'is', 'textContent'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.offsetY', def: 0, type: 'number', min: -100, max: 100, label: ['hollow', 'total', 'is', 'offsetY'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.value.color', def: '#1A1A1A', type: 'color', label: ['hollow', 'total', 'value', 'is', 'color'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.value.fontSize', def: 18, type: 'number', min: 6, max: 48, label: ['hollow', 'total', 'value', 'is', 'fontSize'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.value.bold', def: true, type: 'checkbox', label: ['hollow', 'total', 'value', 'is', 'bold'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.value.prefix', def: '', type: 'text', label: ['hollow', 'total', 'value', 'is', 'prefix'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.value.suffix', def: '', type: 'text', label: ['hollow', 'total', 'value', 'is', 'suffix'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.value.offsetY', def: 0, type: 'number', min: -100, max: 100, label: ['hollow', 'total', 'value', 'is', 'offsetY'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.total.value.rounding', def: 0, type: 'number', min: 0, max: 6, label: ['hollow', 'total', 'value', 'is', 'rounding'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.show', def: true, type: 'checkbox', label: ['hollow', 'average', 'is', 'show'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.bold', def: false, type: 'checkbox', label: ['hollow', 'average', 'is', 'bold'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.color', def: "#AAAAAA", type: "color", label: ['hollow','average', 'is', 'color'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.fontSize', def: 18, type: 'number', min: 6, max: 48, label: ['hollow', 'average', 'is', 'fontSize'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.text', def: 'Average', type: 'text', label: ['hollow', 'average', 'is', 'textContent'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.offsetY', def: 0, type: 'number', min: -100, max: 100, label: ['hollow', 'average', 'is', 'offsetY'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.value.color', def: "#1A1A1A", type: 'color', label: ['hollow', 'average', 'value', 'is', 'color'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.value.fontSize', def: 18, type: 'number', min: 6, max: 48, label: ['hollow', 'average', 'value', 'is', 'fontSize'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.value.bold', def: true, type: 'checkbox', label: ['hollow', 'average', 'value', 'is', 'bold'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.value.prefix', def: '', type: 'text', label: ['hollow', 'average', 'value', 'is', 'prefix'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.value.suffix', def: '', type: 'text', label: ['hollow', 'average', 'value', 'is', 'suffix'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.value.offsetY', def: 0, type: 'number', min: -100, max: 100, label: ['hollow', 'average', 'value', 'is', 'offsetY'], category: 'labels'},
    { key: 'style.chart.layout.labels.hollow.average.value.rounding', def: 0, type: 'number', min: 0, max: 6, label: ['hollow', 'average', 'value', 'is', 'rounding'], category: 'labels'},
    { key: 'style.chart.layout.donut.strokeWidth', def: 64, type: 'range', min: 3, max: 92, label: 'thickness', category: 'donut'},
    { key: 'style.chart.layout.donut.borderWidth', def: 1, type: 'range', min: 0, max: 36, label: ['border', 'is', 'thickness'], category: 'donut'},
    { key: 'style.chart.legend.show', def: true, type: 'checkbox', label: 'show', category: 'legend'},
    { key: 'style.chart.legend.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category: 'legend'},
    { key: 'style.chart.legend.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'legend'},
    { key: 'style.chart.legend.fontSize', def: 16, type: 'number', min: 6, max: 42, label: 'fontSize', category: 'legend'},
    { key: 'style.chart.legend.bold', def: false, type: 'checkbox', label: 'bold', category: 'legend'},
    { key: 'style.chart.legend.roundingValue', def: 0, type: 'number', min: 0, max: 6, label: ['rounding', 'is', 'value'], category: 'legend'},
    { key: 'style.chart.legend.roundingPercentage', def: 0, type: 'number', min: 0, max: 6, label: 'percentageRounding', category: 'legend'},
    { key: 'style.chart.title.text', def: 'Title', type: 'text', label: 'textContent', category: 'title'},
    { key: 'style.chart.title.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'title'},
    { key: 'style.chart.title.fontSize', def: 20, type: 'number', min: 6, max: 48, label: 'fontSize', category: 'title'},
    { key: 'style.chart.title.bold', def: true, type: 'checkbox', label: 'bold', category: 'title'},
    { key: 'style.chart.title.subtitle.text', def: '', type: 'text', label: 'textContent', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.color', def: '#A1A1A1', type: 'color', label: 'textColor', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.fontSize', def: 16, type: 'number', min: 6, max: 42, label: 'fontSize', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.bold', def: false, type: 'checkbox', label: 'bold', category: 'subtitle'}
])

const options = ref({
    datasetItems: {
        name: "name",
        values: [],
        color: "#42d392"
    },
    dataset: [],
    config: {}
})

const datasetItems = ref([
    {
        name: "series 1",
        values: [50],
        color: '#42d392',
        id: "111"
    },
    {
        name: "series 2",
        values: [50],
        color: '#6376DD',
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

function pushValueToSeries({ value, id }) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem.values = [value];
    step.value += 1;
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
                    </div>
                    <VueUiDonut :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </transition>
    </div>

    <details open>
        <summary class="cursor-pointer mb-4">{{ makerTranslations.dataset[store.lang] }}</summary>
        <div class="flex flex-col gap-2">
            <div v-for="(ds, i) in datasetItems" :class="`w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3`" :style="`background:${ds.color}30`">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                <table>
                    <thead>
                        <th class="text-left text-xs h-[40px]">{{ makerTranslations.labels.color[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.serieName[store.lang] }}</th>
                        <th class="text-left text-xs">{{ makerTranslations.labels.value[store.lang] }}</th>
                    </thead>
                    <tbody>
                        <td><input type="color" v-model="datasetItems[i].color"></td>
                        <td><input class="h-[36px]" type="text" v-model="ds.name"></td>
                        <td><input class="h-[36px]" type="number" v-model="ds.values[0]"></td>
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
                            <input class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :type="knob.type" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def" @change="forceChartUpdate">
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
    import { VueUiDonut } from "vue-data-ui";
    import "vue-data-ui/style.css"

    const config = ref({{ finalConfig }});

    const dataset = ref({{ datasetItems.map(({name, values, color}) => {
        return {
            name, values, color
        }
    }) }});
&lt;/script&gt;

&lt;template&gt;
    &lt;div style="width:600px"&gt;
        &lt;VueUiDonut :config="config" :dataset="dataset" /&gt;
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
