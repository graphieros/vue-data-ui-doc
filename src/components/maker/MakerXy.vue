<script setup>
import { ref, computed} from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon } from "vue-tabler-icons"
import { getVueDataUiConfig } from "vue-data-ui";
import Tooltip from "../../components/FlexibleTooltip.vue";

const store = useMainStore();

const translations = computed(() => {
    return store.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isFixed = ref(false);

function createUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
}

function getValueByPath(referenceObject, path) {
    const pathArray = path.split('.');
    let currentObject = referenceObject;
    for (const attr of pathArray) {
        if (currentObject.hasOwnProperty(attr)) {
        currentObject = currentObject[attr];
        } else {
        return undefined;
        }
    }
    return currentObject;
}

const C = ref(getVueDataUiConfig('vue_ui_xy'))

const CONFIG_CATEGORIES = ref([
    {
        key: 'general',
        title: 'General settings'
    },
    {
        key: 'padding',
        title: 'Chart padding'
    },
    {
        key: 'highlight',
        title: 'Highlight period area'
    },
    {
        key: 'grid',
        title: 'Grid'
    },
    {
        key: 'labels',
        title: 'Data labels'
    },
    {
        key: 'legend',
        title: 'Legend'
    },
    {
        key: 'title',
        title: 'Chart title'
    },
    {
        key: 'subtitle',
        title: 'Chart subtitle'
    },
    {
        key: 'tooltip',
        title: 'Tooltip settings'
    },
    {
        key: 'bar',
        title: 'Bar types specific settings'
    },
    {
        key: 'line',
        title: 'Line types specific settings'
    },
    {
        key: 'plot',
        title: 'Plot types specific settings'
    },
    {
        key: 'table',
        title: 'Data table'
    }
])

const CONFIG_MODEL = ref([
    { key: 'useCssAnimation', def: true, type: 'checkbox', label: 'Use css animation', category: 'general' },
    { key: 'chart.fontFamily', def: 'inherit', type: 'text', label: 'Font family', category: 'general' },
    { key: 'chart.backgroundColor', def: '#FFFFFF', type: 'color', label: 'Background color', category: 'general'},
    { key: 'chart.color', def: '#1A1A1A', type: 'color', label: 'color', category: 'general' },
    { key: 'chart.height', def: 600, type: 'range', min: 300, max: 1000, label: 'Chart height', category: 'general'},
    { key: 'chart.width', def: 1000, type: 'range', min: 300, max: 2000, label: 'Chart width', category: 'general' },
    { key: 'chart.zoom.show', def: false, type: 'checkbox', label: 'Show zoom inputs', category: 'general' },

    { key: 'chart.padding.top', def: 36, type: 'number', min: 0, max: 100, label: "Top", category: 'padding' },
    { key: 'chart.padding.right', def: 24, type: 'number', min: 0, max: 100, label: 'Right', category: 'padding' },
    { key: 'chart.padding.bottom', def: 48, type: 'number', min: 0, max: 100, label: 'Bottom', category: 'padding' },
    { key: 'chart.padding.left', def: 48, type: 'number', min: 0, max: 100, label: 'Left', category: 'padding' },

    { key: 'chart.highlighter.color', def: '#1A1A1A', type: 'color', label: 'Highlighter color', category: 'general' },
    { key: 'chart.highlighter.opacity', def: 5, type: 'range', min: 0, max: 100, label: 'Highlighter opacity', category: 'general'},

    { key: 'chart.highlightArea.show', def: false, type: 'checkbox', label: 'Show', category: 'highlight' },
    { key: 'chart.highlightArea.from', def: 0, type: 'number', min: 0, max: 999, label: 'From', category: 'highlight' },
    { key: 'chart.highlightArea.to', def: 0, type: 'number', min: 0, max: 999, label: 'To', category: 'highlight' },
    { key: 'chart.highlightArea.color', def: '#1A1A1A', type: 'color', label: 'Color', category: 'highlight' },
    { key: 'chart.highlightArea.opacity', def: 20, type: 'range', label: 'Opacity', category: 'highlight' },
    { key: 'chart.highlightArea.caption.text', def: 'Caption', type: 'text', label: 'Caption', category: 'highlight' },
    { key: 'chart.highlightArea.caption.fontSize', def: 20, type: 'number', label: 'Font size', category: 'highlight' },
    { key: 'chart.highlightArea.caption.color', def: '#1A1A1A', type: 'color', label: 'Color', category: 'highlight' },
    { key: 'chart.highlightArea.caption.bold', def: false, type: 'checkbox', label: 'Bold', category: 'highlight' },
    { key: 'chart.highlightArea.caption.offsetY', def: 0, type: 'number', label: 'Offset Y', category: 'highlight' },
    { key: 'chart.highlightArea.caption.width', def: 'auto', type: 'text', label: 'Caption width', category: 'highlight' },
    { key: 'chart.highlightArea.caption.padding', def: 3, type: 'number', label: 'Caption padding', category: 'highlight' },
    { key: 'chart.highlightArea.caption.textAlign', def: 'center', type: 'select', options: ['left', 'center', 'right'], label: 'Text align', category: 'highlight' },

    { key: 'chart.grid.stroke', def: '#e1e5e8', type: 'color', label: 'Stroke', category: 'grid' },
    { key: 'chart.grid.showVerticalLines', def: false, type: 'checkbox', label: 'Vertical lines', category: 'grid' },
    { key: 'chart.grid.labels.show', def: true, type: 'checkbox', label: 'Show labels', category: 'grid' },
    { key: 'chart.grid.labels.color', def: '#1A1A1A', type: 'color', label: 'Labels color', category: 'grid' },
    { key: 'chart.grid.labels.fontSize', def: 12, type: 'number', min: 4, max: 30, label: 'Font size', category: 'grid' },
    { key: 'chart.grid.labels.axis.yLabel', def: '', type: 'text', label: 'Y axis label', category: 'grid' },
    { key: 'chart.grid.labels.axis.xLabel', def: '', type: 'text', label: 'X axis label', category: 'grid' },
    { key: 'chart.grid.labels.axis.fontSize', def: 12, type: 'number', label: 'Axis labels font size', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.show', def: true, type: 'checkbox', label: 'Show period labels', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.color', def: '#1A1A1A', type: 'color', label: 'Period labels color', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.values', def: [], type: 'none', },
    { key: 'chart.grid.labels.xAxisLabels.fontSize', def: 18, type: 'number', min: 6, max: 30, label: 'Period labels font size', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.showOnlyFirstAndLast', def: false, type: 'checkbox', label: 'Show only first and last', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.yOffset', def: 8, type: 'number', label: 'Period labels offset Y', category: 'grid' },
    
    { key: 'chart.labels.fontSize', def: 10, type: 'number', min: 6, max: 30, label: 'Font size', category: 'labels' },
    { key: 'chart.labels.prefix', def: '', type: 'text', label: 'Prefix', category: 'labels'},
    { key: 'chart.labels.suffix', def: '', type: 'text', label: 'Suffix', category: 'labels'},

    { key: 'chart.legend.show', def: true, type: 'checkbox', label: 'Show', category: 'legend' },
    { key: 'chart.legend.color', def: '#1A1A1A', type: 'color', label: 'Text color', category: 'legend'},
    { key: 'chart.legend.fontSize', def: 16, type: 'number', min: 10, max: 36, label: 'Font size', category: 'legend' },

    { key: 'chart.title.show', def: true, type: 'checkbox', label: 'Show', category: 'title' },
    { key: 'chart.title.text', def: 'Title', type: 'text', label: 'Text content', category: 'title' },
    { key: 'chart.title.color', def: '#1A1A1A', type: 'color', label: 'Color', category: 'title' },
    { key: 'chart.title.fontSize', def: 20, type: 'number', min: 10, max: 64, label: 'Font size', category: 'title' },
    { key: 'chart.title.bold', def: true, type: 'checkbox', label: 'Bold', category: 'title' },
    { key: 'chart.title.offsetX', def: 0, type: 'number', label: 'Offset X', category: 'title' },
    { key: 'chart.title.offsetY', def: 0, type: 'number', label: 'Offset Y', category: 'title' },

    { key: 'chart.title.subtitle.text', def: '', type: 'text', label: 'Text content', category: 'subtitle'},
    { key: 'chart.title.subtitle.color', def: '#CCCCCC', type: 'color', label: 'Color', category: 'subtitle' },
    { key: 'chart.title.subtitle.fontSize', def: 16, type: 'number', min: 6, max: 64, label: 'Font size', category: 'subtitle' },

    { key: 'chart.tooltip.show', def: true, type: 'checkbox', label: 'Show', category: 'tooltip' },
    { key: 'chart.tooltip.showValue', def: true, type: 'checkbox', label: 'Show value', category: 'tooltip' },
    { key: 'chart.tooltip.showPercentage', def: false, type: 'checkbox', label: 'Show percentage', category: 'tooltip' },
    { key: 'chart.tooltip.color', def: '#1A1A1A', type: 'color', label: 'Color', category: 'tooltip' },
    { key: 'chart.tooltip.backgroundColor', def: '#FFFFFF', type: 'color', label: 'Background color', category: 'tooltip' },
    { key: 'chart.tooltip.roundingValue', def: 0, type: 'number', min: 0, max: 6, label: 'Value rounding', category: 'tooltip' },
    { key: 'chart.tooltip.roundingPercentage', def: 0, type: 'number', min: 0, max: 6, label: 'Percentage rounding', category: 'tooltip' },

    { key: 'chart.userOptions.show', def: true, type: 'checkbox', label: 'Show user options', category: 'general' },

    { key: 'bar.borderRadius', def: 2, type: 'number', min: 0, max: 120, label: 'Border radius', category: 'bar' },
    { key: 'bar.useGradient', def: true, type: 'checkbox', label: 'Use gradient', category: 'bar' },
    { key: 'bar.labels.show', def: true, type: 'checkbox', label: 'Show data labels', category: 'bar' },
    { key: 'bar.labels.offsetY', def: -8, type: 'number', label: 'Data labels offset Y', category: 'bar' },
    { key: 'bar.labels.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'Data labels rounding', category: 'bar' },
    { key: 'bar.labels.color', def: '#1A1A1A', type: 'color', label: 'Data labels color', category: 'bar' },

    { key: 'line.radius', def: 6, type: 'number', min: 0, max: 20, label: 'Plot marker radius', category: 'line' },
    { key: 'line.useGradient', def: true, type: 'checkbox', label: 'Plot gradient', category: 'line' },
    { key: 'line.strokeWidth', def: 2, type: 'number', min: 1, max: 20, label: 'Thickness', category: 'line' },
    { key: 'line.labels.show', def: true, type: 'checkbox', label: 'Show data labels', category: 'line' },
    { key: 'line.labels.offsetY', def: -8, type: 'number', label: 'Data labels offset Y', category: 'line' },
    { key: 'line.labels.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'Data labels rounding', category: 'line' },
    { key: 'line.labels.color', def: '#1A1A1A', type: 'color', label: 'Data labels color', category: 'line' },
    { key: 'line.area.useGradient', def: true, type: 'checkbox', label: 'Area gradient', category: 'line' },
    { key: 'line.area.opacity', def: 20, type: 'range', min: 0, max: 100, label: 'Area opacity', category: 'line'},

    { key: 'plot.radius', def: 6, type: 'number', min: 0, max: 20, label: 'Plot marker radius', category: 'plot' },
    { key: 'plot.useGradient', def: true, type: 'checkbox', label: 'Plot gradient', category: 'plot' },
    { key: 'plot.strokeWidth', def: 2, type: 'number', min: 1, max: 20, label: 'Stroke width', category: 'plot' },
    { key: 'plot.labels.show', def: true, type: 'checkbox', label: 'Show data labels', category: 'plot' },
    { key: 'plot.labels.offsetY', def: -8, type: 'number', label: 'Data labels offset Y', category: 'plot' },
    { key: 'plot.labels.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'Data labels rounding', category: 'plot' },
    { key: 'plot.labels.color', def: '#1A1A1A', type: 'color', label: 'Data labels color', category: 'plot' },

    { key: 'showTable', def: false, type: 'checkbox', label: 'Show', category: 'table' },
    { key: 'table.responsiveBreakpoint', def: 400, type: 'number', min: 350, max: 800, label: 'Responsive breakpoint', category: 'table' },
    { key: 'table.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'Rounding', category: 'table' },
    { key: 'table.sparkline', def: true, type: 'checkbox', label: 'Sparkline mode', category: 'table' },
    { key: 'table.columnNames.period', def: 'Period', type: 'text', label: 'Column name: period', category: 'table' },
    { key: 'table.columnNames.total', def: 'Total', type: 'text', label: 'Column name: total', category: 'table' },
    { key: 'table.th.backgroundColor', def: '#FAFAFA', type: 'color', label: 'Header background color', category: 'table' },
    { key: 'table.th.color', def: '#1A1A1A', type: 'color', label: 'Header color', category: 'table' },
    { key: 'table.th.outline', def: '', type: 'text', label: 'Header outline', category: 'table' },
    { key: 'table.td.backgroundColor', def: '#FAFAFA', type: 'color', label: 'Rows background color', category: 'table' },
    { key: 'table.td.color', def: '#1A1A1A', type: 'color', label: 'Rows color', category: 'table' },
    { key: 'table.td.outline', def: '', type: 'text', label: 'Rows outline', category: 'table' },
])



console.log(getValueByPath(C.value, "chart.zoom.show"))

const options = ref(
    {
        name: "VueUiXy",
        icon: 'chartLine',
        types: ['line', 'plot', 'bar'],
        shapes: ['circle', 'triangle', 'square', 'diamond', 'pentagon', 'hexagon', 'star'],
        useTag: ['none', 'start', 'end'],
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
        dataset: [],
        config: {
            ...C.value,
            chart: {
                ...C.value.chart,
                padding: { ...C.value.chart.padding, bottom: 48 },
                labels: { ...C.value.chart.labels, fontSize: 20},
                grid: {
                    ...C.value.chart.grid,
                    labels: {
                        ...C.value.chart.grid.labels,
                        fontSize: 20,
                        xAxisLabels: {
                            ...C.value.chart.grid.labels.xAxisLabels,
                            values: [],
                            fontSize: 18,
                            yOffset: 8
                        }
                    }
                },
                zoom: {
                    ...C.value.chart.zoom,
                    show: false
                }
            },
            bar: {
                ...C.value.bar,
                labels: {...C.value.bar.labels, show: true, rounding: 1, offsetY: -9},
            },
            line: {
                ...C.value.line,
                radius: 6,
                labels: {...C.value.line.labels, show: true, rounding: 1, offsetY: -9},
            },
            plot: {
                ...C.value.plot,
                radius: 6,
                labels: {...C.value.plot.labels, show: true, rounding: 1, offsetY: -9},
            }
        }
    },
)

const selectedChart = ref(options.value)


const datasetItems= ref([
    {
        name: "name",
        series: [1, 2, 4],
        color: "#42d392",
        type: "line",
        shape: 'circle',
        useArea: false,
        useProgression: false,
        dataLabels: true,
        smooth: false,
        dashed: false,
        useTag: 'none'
    }
]);
const step = ref(0);


function addDatasetItem() {
    datasetItems.value.push({...JSON.parse(JSON.stringify(selectedChart.value.datasetItems)), id: createUid()})
    step.value += 1;
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter(_ => _.id !== id)
}

const maxSeries = computed(() => {
    return Math.max(...datasetItems.value.map(ds => ds.series.length))
})

function pushValueToSeries({ value, id, key = 'values'}) {
    const thisItem = datasetItems.value.find(_ => _.id === id)
    thisItem[key].push(value)
    step.value += 1;
}

function deleteValueFromSeries({id, index, key='values'}) {
    const thisItem = datasetItems.value.find(_ => _.id === id);
    thisItem[key].splice(index, 1)
    step.value += 1;
}

function convertArrayToObject(configArray) {
    const resultObject = {};

    configArray.forEach(({ key, def }) => {
        const keys = key.split('.');
        let currentObject = resultObject;

        keys.forEach((nestedKey, index) => {
            if (!currentObject.hasOwnProperty(nestedKey)) {
                // For the last key, assign the 'def' value
                if (index === keys.length - 1) {
                    currentObject[nestedKey] = def;
                } else {
                    // Create an empty object for nested keys
                    currentObject[nestedKey] = {};
                }
            }
            // Move to the next level in the nested structure
            currentObject = currentObject[nestedKey];
        });
    });

    return resultObject;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})

console.log(finalConfig.value)

</script>

<template>
        <div class="w-full mt-[64px]" style="height:calc(100% - 64px)">
            <transition name="fade">                
                <div :class="`transition-all shadow-xl rounded p-2 ${isFixed ? 'fixed top-[64px] right-6 z-20 w-[300px]' : 'w-full mx-auto max-w-[600px]'}`" v-if="datasetItems.length > 0 && datasetItems[0].series.length">
                    <button @click="isFixed = !isFixed">
                        <PinnedOffIcon v-if="isFixed"/>
                        <PinIcon v-else/>
                    </button>
                    <VueUiXy :dataset="datasetItems" :config="finalConfig" :key="`chart_${step}`"/>
                </div>
            </transition>


            <details open>
                <summary class="cursor-pointer mb-4">DATASET</summary>
                <div class="flex flex-row gap-4 my-6">
                    <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                        <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatasetItem"><PlusIcon/></button>
                    </Tooltip>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="w-full overflow-x-auto overflow-y-visible relative bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded flex flex-row gap-3" v-for="(ds, i) in datasetItems">
                    <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                        <table>
                            <thead>
                                <th class="text-left text-xs h-[40px]">Color</th>
                                <th class="text-left text-xs">Serie name</th>
                                <th class="text-left text-xs">Type</th>
                                <th class="text-left text-xs">Labels</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Tag</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">Area</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">Smooth</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">Dashed</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Progression</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Shape</th>
                                <th v-for="(_, i) in maxSeries">
                                    <div class="flex flex-col">
                                        <label class="text-left text-xs">{{ translations.maker.labels.period[store.lang] }}</label>
                                        <input class="w-[86px]" type="text" v-model="CONFIG_MODEL.find(el => el.key === 'chart.grid.labels.xAxisLabels.values').def[i]">
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    
                                    <td><input type="color" v-model="datasetItems[i].color"></td>
                                    <td><input class="h-[36px]" type="text" v-model="ds.name"></td>
                                    <td>
                                        <select class="h-[36px]" v-model="datasetItems[i].type"><option v-for="type in selectedChart.types">{{ type }}</option></select>
                                    </td>
                                    <td><input type="checkbox" v-model="datasetItems[i].dataLabels"></td>
                                    <td v-if="datasetItems[i].type !== 'bar'"><select class="h-[36px]" v-model="datasetItems[i].useTag"><option v-for="tag in selectedChart.useTag">{{ tag }}</option></select></td>
                                    <td v-if="datasetItems[i].type === 'line'"><input type="checkbox" v-model="datasetItems[i].useArea"></td>
                                    <td v-if="datasetItems[i].type === 'line'"><input type="checkbox" v-model="datasetItems[i].smooth"></td>
                                    <td v-if="datasetItems[i].type === 'line'"><input type="checkbox" v-model="datasetItems[i].dashed"></td>
                                    <td v-if="datasetItems[i].type !== 'bar'"><input type="checkbox" v-model="datasetItems[i].useProgression"></td>
                                    <td v-if="datasetItems[i].type !== 'bar'">
                                        <select class="h-[36px]" v-model="datasetItems[i].shape"><option v-for="shape in selectedChart.shapes">{{ shape }}</option></select>
                                    </td>
                                    <td v-for="(val, j) in datasetItems[i].series">
                                        <div class="relative">
                                            <input type="number" style="" v-model="datasetItems[i].series[j]" class="h-[36px] w-[86px]"><button tabindex="0" @click="deleteValueFromSeries({id: ds.id, index: j, key: 'series'})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2.5 left-1" /></button>
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
            </details>


            <details class="mt-6">
                <summary class="cursor-pointer">CONFIG</summary>

                <template v-for="category in CONFIG_CATEGORIES">
                
                    <div class="flex flex-col gap-2 bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded my-4">
                        <h4>{{ category.title }}</h4> 
                        <div class="flex flex-row gap-4 place-items-center flex-wrap">
                            <div v-for="knob in CONFIG_MODEL.filter(k => k.category === category.key)" class="flex flex-col justify-start">
                                <label class="text-xs">{{ knob.label }}</label>
                                <div class="flex place-items-center justify-start h-[40px]">
                                    <input class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :type="knob.type" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def">
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
            <div class="mt-6 mb-2 text-lg">Component code: </div>
<pre class="bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded">
<code>
&lt;script setup&gt;
    import { ref } from "vue";
    import { VueUiXy } from "vue-data-ui";
    import "vue-data-ui/style.css"

    const config = ref({{ finalConfig }});

    const dataset = ref({{ datasetItems.map(({name, series, color, type, shape, useArea, useProgression, dataLabels, smooth, dashed, useTag}) => {
        return {
            name, series, color, type, shape, useArea, useProgression, dataLabels, smooth, dashed, useTag
        }
    }) }});
&lt;/script&gt;

&lt;template&gt;
    &lt;div style="width:600px"&gt;
        &lt;VueUiXy :config="config" :dataset="dataset" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

</code>
</pre>            
            </div>
        </div>
</template>