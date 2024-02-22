<script setup>
import { ref, computed} from "vue";
import { useMainStore } from "../../stores";
import { PlusIcon, PinIcon, PinnedOffIcon, AlertTriangleIcon, CopyIcon } from "vue-tabler-icons"
import { getVueDataUiConfig } from "vue-data-ui";
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker"

const store = useMainStore();
const makerStore = useMakerStore();

const translations = computed(() => {
    return store.translations;
})

const xyTranslations = computed(() => {
    return makerStore.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isFixed = ref(true);

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

const CONFIG_CATEGORIES = computed(() => {
    return [
    {
        key: 'general',
        title: xyTranslations.value.categories.general[store.lang]
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

const CONFIG_MODEL = ref([
    { key: 'useCssAnimation', def: true, type: 'checkbox', label: 'useCssAnimation', category: 'general' },
    { key: 'chart.fontFamily', def: 'inherit', type: 'text', label: 'fontFamily', category: 'general' },
    { key: 'chart.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category: 'general'},
    { key: 'chart.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'general' },
    { key: 'chart.height', def: 600, type: 'range', min: 300, max: 1000, label: 'height', category: 'general'},
    { key: 'chart.width', def: 1000, type: 'range', min: 300, max: 2000, label: 'width', category: 'general' },
    { key: 'chart.zoom.show', def: false, type: 'checkbox', label: 'zoom', category: 'general' },

    { key: 'chart.padding.top', def: 36, type: 'number', min: 0, max: 100, label: "top", category: 'padding' },
    { key: 'chart.padding.right', def: 24, type: 'number', min: 0, max: 100, label: 'right', category: 'padding' },
    { key: 'chart.padding.bottom', def: 48, type: 'number', min: 0, max: 100, label: 'bottom', category: 'padding' },
    { key: 'chart.padding.left', def: 48, type: 'number', min: 0, max: 100, label: 'left', category: 'padding' },

    { key: 'chart.highlighter.color', def: '#1A1A1A', type: 'color', label: 'highlighterColor', category: 'general' },
    { key: 'chart.highlighter.opacity', def: 5, type: 'range', min: 0, max: 100, label: 'highlighterOpacity', category: 'general'},

    { key: 'chart.highlightArea.show', def: false, type: 'checkbox', label: 'show', category: 'highlight' },
    { key: 'chart.highlightArea.from', def: 0, type: 'number', min: 0, max: 999, label: 'from', category: 'highlight' },
    { key: 'chart.highlightArea.to', def: 0, type: 'number', min: 0, max: 999, label: 'to', category: 'highlight' },
    { key: 'chart.highlightArea.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'highlight' },
    { key: 'chart.highlightArea.opacity', def: 20, type: 'range', min:0, max: 100, label: 'opacity', category: 'highlight' },
    { key: 'chart.highlightArea.caption.text', def: 'Caption', type: 'text', label: 'caption', category: 'highlight' },
    { key: 'chart.highlightArea.caption.fontSize', def: 20, min: 6, max: 28, type: 'number', label: 'fontSize', category: 'highlight' },
    { key: 'chart.highlightArea.caption.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'highlight' },
    { key: 'chart.highlightArea.caption.bold', def: false, type: 'checkbox', label: 'bold', category: 'highlight' },
    { key: 'chart.highlightArea.caption.offsetY', def: 0, type: 'number', label: 'offsetY', category: 'highlight' },
    { key: 'chart.highlightArea.caption.width', def: 'auto', type: 'text', label: 'captionWidth', category: 'highlight' },
    { key: 'chart.highlightArea.caption.padding', def: 3, type: 'number', min:0, max: 48, label: 'captionPadding', category: 'highlight' },
    { key: 'chart.highlightArea.caption.textAlign', def: 'center', type: 'select', options: ['left', 'center', 'right'], label: 'textAlign', category: 'highlight' },

    { key: 'chart.grid.stroke', def: '#e1e5e8', type: 'color', label: 'lineColor', category: 'grid' },
    { key: 'chart.grid.showVerticalLines', def: false, type: 'checkbox', label: 'verticalLines', category: 'grid' },
    { key: 'chart.grid.labels.show', def: true, type: 'checkbox', label: 'showLabels', category: 'grid' },
    { key: 'chart.grid.labels.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'grid' },
    { key: 'chart.grid.labels.fontSize', def: 12, type: 'number', min: 4, max: 30, label: 'fontSize', category: 'grid' },
    { key: 'chart.grid.labels.axis.yLabel', def: '', type: 'text', label: 'yAxisLabel', category: 'grid' },
    { key: 'chart.grid.labels.axis.xLabel', def: '', type: 'text', label: 'xAxisLabel', category: 'grid' },
    { key: 'chart.grid.labels.axis.fontSize', def: 12, type: 'number', min: 4, max: 30, label: 'fontSize', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.show', def: true, type: 'checkbox', label: 'showPeriodLabels', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.color', def: '#1A1A1A', type: 'color', label: 'textColorPeriodLabels', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.values', def: [], type: 'none', label: 'fontSize' },
    { key: 'chart.grid.labels.xAxisLabels.fontSize', def: 18, type: 'number', min: 6, max: 30, label: 'fontSizePeriodLabels', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.showOnlyFirstAndLast', def: false, type: 'checkbox', label: 'showOnlyFirstAndLast', category: 'grid' },
    { key: 'chart.grid.labels.xAxisLabels.yOffset', def: 8, type: 'number', label: 'offsetYPeriodLabels', category: 'grid' },
    
    { key: 'chart.labels.fontSize', def: 10, type: 'number', min: 6, max: 30, label: 'fontSize', category: 'labels' },
    { key: 'chart.labels.prefix', def: '', type: 'text', label: 'prefix', category: 'labels'},
    { key: 'chart.labels.suffix', def: '', type: 'text', label: 'suffix', category: 'labels'},

    { key: 'chart.legend.show', def: true, type: 'checkbox', label: 'show', category: 'legend' },
    { key: 'chart.legend.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'legend'},
    { key: 'chart.legend.fontSize', def: 16, type: 'number', min: 10, max: 36, label: 'fontSize', category: 'legend' },

    { key: 'chart.title.show', def: true, type: 'checkbox', label: 'show', category: 'title' },
    { key: 'chart.title.text', def: 'Title', type: 'text', label: 'textContent', category: 'title' },
    { key: 'chart.title.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'title' },
    { key: 'chart.title.fontSize', def: 20, type: 'number', min: 10, max: 64, label: 'fontSize', category: 'title' },
    { key: 'chart.title.bold', def: true, type: 'checkbox', label: 'bold', category: 'title' },
    { key: 'chart.title.offsetX', def: 0, type: 'number', label: 'offsetX', category: 'title' },
    { key: 'chart.title.offsetY', def: 0, type: 'number', label: 'offsetY', category: 'title' },

    { key: 'chart.title.subtitle.text', def: '', type: 'text', label: 'textContent', category: 'subtitle'},
    { key: 'chart.title.subtitle.color', def: '#CCCCCC', type: 'color', label: 'textColor', category: 'subtitle' },
    { key: 'chart.title.subtitle.fontSize', def: 16, type: 'number', min: 6, max: 64, label: 'fontSize', category: 'subtitle' },

    { key: 'chart.tooltip.show', def: true, type: 'checkbox', label: 'show', category: 'tooltip' },
    { key: 'chart.tooltip.showValue', def: true, type: 'checkbox', label: 'showValue', category: 'tooltip' },
    { key: 'chart.tooltip.showPercentage', def: false, type: 'checkbox', label: 'showPercentage', category: 'tooltip' },
    { key: 'chart.tooltip.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'tooltip' },
    { key: 'chart.tooltip.backgroundColor', def: '#FFFFFF', type: 'color', label: 'backgroundColor', category: 'tooltip' },
    { key: 'chart.tooltip.roundingValue', def: 0, type: 'number', min: 0, max: 6, label: 'valueRounding', category: 'tooltip' },
    { key: 'chart.tooltip.roundingPercentage', def: 0, type: 'number', min: 0, max: 6, label: 'percentageRounding', category: 'tooltip' },

    { key: 'chart.userOptions.show', def: true, type: 'checkbox', label: 'showUserOptions', category: 'general' },

    { key: 'bar.borderRadius', def: 2, type: 'number', min: 0, max: 120, label: 'borderRadius', category: 'bar' },
    { key: 'bar.useGradient', def: true, type: 'checkbox', label: 'useGradient', category: 'bar' },
    { key: 'bar.labels.show', def: true, type: 'checkbox', label: 'showDataLabels', category: 'bar' },
    { key: 'bar.labels.offsetY', def: -8, type: 'number', min: -100, max: 100, label: 'offsetYDataLabels', category: 'bar' },
    { key: 'bar.labels.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'rounding', category: 'bar' },
    { key: 'bar.labels.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'bar' },

    { key: 'line.radius', def: 6, type: 'number', min: 0, max: 20, label: 'radius', category: 'line' },
    { key: 'line.useGradient', def: true, type: 'checkbox', label: 'useGradient', category: 'line' },
    { key: 'line.strokeWidth', def: 2, type: 'number', min: 1, max: 20, label: 'thickness', category: 'line' },
    { key: 'line.labels.show', def: true, type: 'checkbox', label: 'showDataLabels', category: 'line' },
    { key: 'line.labels.offsetY', def: -8, type: 'number', min: -100, max: 100, label: 'offsetYDataLabels', category: 'line' },
    { key: 'line.labels.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'rounding', category: 'line' },
    { key: 'line.labels.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'line' },
    { key: 'line.area.useGradient', def: true, type: 'checkbox', label: 'useGradient', category: 'line' },
    { key: 'line.area.opacity', def: 20, type: 'range', min: 0, max: 100, label: 'opacity', category: 'line'},

    { key: 'plot.radius', def: 6, type: 'number', min: 0, max: 20, label: 'radius', category: 'plot' },
    { key: 'plot.useGradient', def: true, type: 'checkbox', label: 'useGradient', category: 'plot' },
    { key: 'plot.strokeWidth', def: 2, type: 'number', min: 1, max: 20, label: 'thickness', category: 'plot' },
    { key: 'plot.labels.show', def: true, type: 'checkbox', label: 'showDataLabels', category: 'plot' },
    { key: 'plot.labels.offsetY', def: -8, type: 'number', min: -100, max: 100, label: 'offsetYDataLabels', category: 'plot' },
    { key: 'plot.labels.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'rounding', category: 'plot' },
    { key: 'plot.labels.color', def: '#1A1A1A', type: 'color', label: 'textColor', category: 'plot' },

    { key: 'showTable', def: false, type: 'checkbox', label: 'show', category: 'table' },
    { key: 'table.responsiveBreakpoint', def: 400, type: 'number', min: 350, max: 800, label: 'responsiveBreakpoint', category: 'table' },
    { key: 'table.rounding', def: 0, type: 'number', min: 0, max: 6, label: 'rounding', category: 'table' },
    { key: 'table.sparkline', def: true, type: 'checkbox', label: 'sparkline', category: 'table' },
    { key: 'table.columnNames.period', def: 'Period', type: 'text', label: 'columnNamePeriod', category: 'table' },
    { key: 'table.columnNames.total', def: 'Total', type: 'text', label: 'columnNameTotal', category: 'table' },
    { key: 'table.th.backgroundColor', def: '#FAFAFA', type: 'color', label: 'backgroundColorHeader', category: 'table' },
    { key: 'table.th.color', def: '#1A1A1A', type: 'color', label: 'textColorHeader', category: 'table' },
    { key: 'table.th.outline', def: '', type: 'text', label: 'outlineHeader', category: 'table' },
    { key: 'table.td.backgroundColor', def: '#FAFAFA', type: 'color', label: 'backgroundColorRow', category: 'table' },
    { key: 'table.td.color', def: '#1A1A1A', type: 'color', label: 'textColorRow', category: 'table' },
    { key: 'table.td.outline', def: '', type: 'text', label: 'outlineRow', category: 'table' },
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
                if (index === keys.length - 1) {
                    currentObject[nestedKey] = def;
                } else {
                    currentObject[nestedKey] = {};
                }
            }
            currentObject = currentObject[nestedKey];
        });
    });

    return resultObject;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value)
})


function getLabel(label) {
    return xyTranslations.value.labels[label][store.lang]
}

function copyComponent() {
    const content = document.getElementById('componentContent').innerHTML
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = content.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

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
                <summary class="cursor-pointer mb-4">{{ xyTranslations.dataset[store.lang] }}</summary>
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
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">{{ xyTranslations.labels.area[store.lang] }}</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">{{ xyTranslations.labels.smooth[store.lang] }}</th>
                                <th v-if="datasetItems[i].type === 'line'" class="text-left text-xs">{{ xyTranslations.labels.dashed[store.lang] }}</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">{{ xyTranslations.labels.progression[store.lang] }}</th>
                                <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">{{ xyTranslations.labels.shape[store.lang] }}</th>
                                <th v-for="(_, j) in maxSeries">
                                    <div class="flex flex-col">
                                        <label class="text-left text-xs flex flex-row gap-2">{{ translations.maker.labels.period[store.lang] }} <AlertTriangleIcon class="text-app-orange" size="14" v-if="!CONFIG_MODEL.find(el => el.key === 'chart.grid.labels.xAxisLabels.values').def[j]" /></label>
                                        <input class="w-[86px]" type="text" v-model="CONFIG_MODEL.find(el => el.key === 'chart.grid.labels.xAxisLabels.values').def[j]">
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
                <div class="flex flex-row gap-4 mt-4 mb-6">
                    <Tooltip :content="translations.maker.tooltips.addDataset[store.lang]">
                        <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatasetItem"><PlusIcon/></button>
                    </Tooltip>
                </div>
            </details>


            <details open class="mt-6" v-if="xyTranslations.labels">
                <summary class="cursor-pointer">{{ xyTranslations.config[store.lang] }}</summary>

                <template v-for="category in CONFIG_CATEGORIES">
                
                    <div class="flex flex-col gap-2 shadow dark:shadow-md bg-[#5f8bee30] p-3 rounded my-4">
                        <h4>{{ category.title }}</h4> 
                        <div class="flex flex-row gap-4 place-items-center flex-wrap">
                            <div v-for="knob in CONFIG_MODEL.filter(k => k.category === category.key)" class="flex flex-col justify-start">
                                <label class="text-xs">{{ getLabel(knob.label) }}</label>
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
            <div class="mt-6 mb-2 text-lg flex flex-row gap-4 place-items-center">
                <button @click="copyComponent"><CopyIcon/></button>
                {{ xyTranslations.componentCode[store.lang] }} 
            </div>
<pre class="bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded cursor-pointer" @click="copyComponent">
<code id="componentContent">
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

<style scoped>
th, td {
    padding: 0 3px;
}
</style>
