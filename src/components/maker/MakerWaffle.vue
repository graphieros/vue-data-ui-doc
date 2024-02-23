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

const C = ref(getVueDataUiConfig('vue_ui_waffle'));

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
            key: 'grid',
            title: makerTranslations.value.categories.grid[store.lang]
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
            key: 'tooltip',
            title: makerTranslations.value.categories.tooltip[store.lang]
        },
        {
            key: 'legend',
            title: makerTranslations.value.categories.legend[store.lang]
        },
        {
            key: 'table',
            title: makerTranslations.value.categories.table[store.lang]
        }
    ]
})

const CONFIG_MODEL = ref([
    { key: 'useBlurOnHover', def: true, type: 'checkbox', label: 'useBlurOnHover', category: 'general'},
    { key: 'style.fontFamily', def: 'inherit', type: 'text', label: 'fontFamily', category: 'general'},
    { key: 'style.chart.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category: 'general'},
    { key: 'style.chart.color', def: '#1A1A1A', type: "color", label: 'textColor', category: 'general'},
    { key: 'style.chart.layout.labels.dataLabels.prefix', def: '', type: 'text', label: 'prefix', category: 'labels'},
    { key: 'style.chart.layout.labels.dataLabels.suffix', def: '', type: 'text', label: 'suffix', category: 'labels'},
    { key: 'style.chart.layout.grid.size', def: 10, type: 'number', min: 2, max: 30, label: 'size', category: 'grid'},
    { key: 'style.chart.layout.grid.spaceBetween', def: 0, type: 'number', min: 0, max: 20, label: 'spacing', category: 'grid'},
    { key: 'style.chart.layout.grid.vertical', def: false, type: 'checkbox', label: 'vertical', category: 'grid'},
    { key: 'style.chart.layout.rect.rounding', def: 2, type: 'number', min: 0, max: 100, label: 'borderRadius', category: 'grid'},
    { key: 'style.chart.layout.rect.stroke', def: '#1A1A1A', type: 'color', label: ['border', 'is', 'color'], category: 'grid'},
    { key: 'style.chart.layout.rect.strokeWidth', def: 1, type: 'number', min: 0, max: 20, label: ['border', 'is', 'thickness'], category: 'grid'},
    { key: 'style.chart.layout.rect.useGradient', def: true, type: 'checkbox', label: 'useGradient', category: 'grid'},
    { key: 'style.chart.layout.rect.gradientIntensity', def: 40, type: 'range', min: 0, max: 100, label: 'gradientIntensity', category: 'grid'},
    { key: 'style.chart.title.text', def: 'Title', type: 'text', label: 'textContent', category: 'title'},
    { key: 'style.chart.title.color', def: '#1A1A1A', type: 'color', label: 'textColor', category:  'title'},
    { key: 'style.chart.title.fontSize', def: 20, type: 'number', min: 6, max: 48, label: 'fontSize', category: 'title'},
    { key: 'style.chart.title.bold', def: true, type: 'checkbox', label: 'bold', category: 'title'},
    { key: 'style.chart.title.subtitle.text', def: '', type: 'text', label: 'textContent', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.color', def: '#A1A1A1', type: 'color', label: 'textColor', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.fontSize', def: 16, type: 'number', min: 6, max: 48, label: 'fontSize', category: 'subtitle'},
    { key: 'style.chart.title.subtitle.bold', def: false, type: 'checkbox', label: 'bold', category: 'subtitle'},
    { key: 'style.chart.tooltip.show', def: true, type: 'checkbox', label: 'show', category: 'tooltip'},
    { key: 'style.chart.tooltip.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category: 'tooltip'},
    { key: 'style.chart.tooltip.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'tooltip'},
    { key: 'style.chart.tooltip.fontSize', def: 14, type: 'number', min: 6, max: 24, label: 'fontSize', category: 'tooltip'},
    { key: 'style.chart.tooltip.showValue', def: true, type: 'checkbox', label: 'showValue', category: 'tooltip'},
    { key: 'style.chart.tooltip.roundingValue', def: 0, type: 'number', min: 0, max: 6, label: ['rounding', 'is', 'value'], category: 'tooltip'},
    { key: 'style.chart.tooltip.showPercentage', def: true, type: 'checkbox', label: 'showPercentage', category: 'tooltip'},
    { key: 'style.chart.tooltip.roundingPercentage', def: 0, type: 'number', min: 0, max: 6, label: 'percentageRounding', category: 'tooltip'},
    { key: 'style.chart.legend.show', def: true, type: 'checkbox', label: 'show', category: 'legend'},
    { key: 'style.chart.legend.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category: 'legend'},
    { key: 'style.chart.legend.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'legend'},
    { key: 'style.chart.legend.fontSize', def: 14, type: 'number', min: 6, max: 32, label: 'fontSize', category: 'legend'},
    { key: 'style.chart.legend.bold', def: false, type: 'checkbox', label: 'bold', category: 'legend'},
    { key: 'style.chart.legend.roundingValue', def: 0, type: 'number', min: 0, max: 6, label: ['rounding', 'is', 'value'], category: 'legend'},
    { key: 'style.chart.legend.roundingPercentage', def: 0, type: 'number', min: 0, max: 6, label: 'percentageRounding', category: 'legend'},
    { key: 'userOptions.show', def: true, type: 'checkbox', label: 'showUserOptions', category: 'general'},
    { key: 'table.show', def: false, type: 'checkbox', label: 'show', category: 'table'},
    { key: 'table.responsiveBreakpoint', def: 400, type: 'number', min: 300, max: 800, label: 'responsiveBreakpoint', category: 'table'},
    { key: 'table.columnNames.series', def: 'Series', type: 'text', label: ['columnName', 'is', 'series'], category: 'table'},
    { key: 'table.columnNames.value', def: 'Value', type: 'text', label: ['columnName', 'is', 'value'], category: 'table'},
    { key: 'table.columnNames.percentage', def: 'Percentage', type: 'text', label: ['columnName', 'is', 'percentage'], category: 'table'},
    { key: 'table.th.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColorHeader', category: 'table'},
    { key: 'table.th.color', def: '#1A1A1A', type: 'color', label: 'textColorHeader', category: 'table'},
    { key: 'table.th.outline', def: 'none', type: 'text', label: 'outlineHeader', category: 'table'},
    { key: 'table.td.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColorRow', category: 'table'},
    { key: 'table.td.color', def: '#1A1A1A', type: 'color', label: 'textColorRow', category: 'table'},
    { key: 'table.td.outline', def: 'none', type: 'text', label: 'outlineRow', category: 'table'},
    { key: 'table.td.roundingValue', def: 0, type: 'number', min: 0, max: 6, label: ['rounding', 'is', 'value'], category: 'table'},
    { key: 'table.td.roundingPercentage', def: 0, type: 'number', min: 0, max: 6, label: ['rounding', 'is', 'percentage'], category: 'table'}

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
        values: [60],
        color: '#42d392',
        id: "111"
    },
    {
        name: "series 2",
        values: [40],
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
                    <VueUiWaffle :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
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
    import { VueUiWaffle } from "vue-data-ui";
    import "vue-data-ui/style.css"

    const config = ref({{ finalConfig }});

    const dataset = ref({{ datasetItems.map(({name, values, color }) => {
        return {
            name, values, color
        }
    }) }});
&lt;/script&gt;

&lt;template&gt;
    &lt;div style="width:600px"&gt;
        &lt;VueUiWaffle :config="config" :dataset="dataset" /&gt;
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
