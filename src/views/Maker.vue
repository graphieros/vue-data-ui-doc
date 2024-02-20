<script setup>
import { ref, computed} from "vue";
import { useMainStore } from "../stores";
import { PlusIcon, MinusIcon } from "vue-tabler-icons"
import { getVueDataUiConfig } from "vue-data-ui";

const store = useMainStore();

const translations = computed(() => {
    return store.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

function createUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

const C = ref({
    xy: getVueDataUiConfig('vue_ui_xy')
})

const options = ref([
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
            ...C.value.xy,
            chart: {
                ...C.value.xy.chart,
                padding: { ...C.value.xy.chart.padding, bottom: 48 },
                labels: { ...C.value.xy.chart.labels, fontSize: 20},
                grid: {
                    ...C.value.xy.chart.grid,
                    labels: {
                        ...C.value.xy.chart.grid.labels,
                        fontSize: 20,
                        xAxisLabels: {
                            ...C.value.xy.chart.grid.labels.xAxisLabels,
                            values: [],
                            fontSize: 18,
                            yOffset: 8
                        }
                    }
                }
            },
            bar: {
                ...C.value.xy.bar,
                labels: {...C.value.xy.bar.labels, show: true, rounding: 1}
            },
            line: {
                ...C.value.xy.line,
                radius: 6,
                labels: {...C.value.xy.line.labels, show: true, rounding: 1}
            },
            plot: {
                ...C.value.xy.plot,
                radius: 6,
                labels: {...C.value.xy.plot.labels, show: true, rounding: 1}
            }
        }
    },
    {
        name: "VueUiDonut",
        icon: 'chartDonut'
    },
    {
        name: "VueUiWaffle",
        icon: 'chartWaffle'
    },
])

const selectedChart = ref(options.value[0])


const datasetItems= ref([]);
const currentSerieValue = ref(0);
const step = ref(0);

function nuke() {
    datasetItems.value = [];
    step.value = 0;
}

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

</script>

<template>
    <div class="w-full max-w-[1400px] mx-auto">
        <h1 class="text-3xl top-6 left-6 text-center mt-6">{{ translations.menu.chartBuilder[store.lang] }}</h1>
        <div class="w-full overflow-y-auto mt-[64px]" style="height:calc(100% - 64px)">

            <div class="flex flex-row gap-3 place-items-end justify-center">
                <div class="flex flex-col gap-2">
                    <label for="chartType">Select chart type:</label>
                    <select style="outline:1px solid #42d392 !important;margin-left:1px" id="chartType" v-model="selectedChart" class="h-[40px] px-6" @change="nuke">
                        <option class="text-left" v-for="option in options" :value="option">{{ option.name }}</option>
                    </select>
                </div>
                <div class="mb-2">
                    <VueUiIcon :name="selectedChart.icon" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                </div>
            </div>
                <div class="w-full mx-auto max-w-[600px] shadow-xl rounded p-2" v-if="datasetItems.length > 0 && datasetItems[0].series.length">
                    <VueUiXy v-if="selectedChart.name === 'VueUiXy'" :dataset="datasetItems" :config="selectedChart.config" :key="`chart_${step}`"/>
                </div>

            <div class="flex flex-row gap-4 my-6">
                <button class="h-[40px] w-[40px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="addDatasetItem"><PlusIcon/></button>
            </div>
            <div class="flex flex-col gap-2">
                <div class="w-full overflow-x-auto relative bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded flex flex-row gap-3" v-for="(ds, i) in datasetItems">
                <button tabindex="0" @click="deleteDatasetItem(ds.id)"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute top-1 left-1" /></button>
                    <table>
                        <thead>
                            <th class="text-left text-xs h-[40px]">Color</th>
                            <th class="text-left text-xs">Serie name</th>
                            <th class="text-left text-xs">Type</th>
                            <th class="text-left text-xs">Labels</th>
                            <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Tag</th>
                            <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Area</th>
                            <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Smooth</th>
                            <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Dashed</th>
                            <th v-if="datasetItems[i].type !== 'bar'" class="text-left text-xs">Shape</th>
                            <th v-for="(_, i) in maxSeries">
                                <input class="w-[86px]" type="text" v-model="selectedChart.config.chart.grid.labels.xAxisLabels.values[i]">
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
                                <td v-if="datasetItems[i].type !== 'bar'"><input type="checkbox" v-model="datasetItems[i].useArea"></td>
                                <td v-if="datasetItems[i].type !== 'bar'"><input type="checkbox" v-model="datasetItems[i].smooth"></td>
                                <td v-if="datasetItems[i].type !== 'bar'"><input type="checkbox" v-model="datasetItems[i].dashed"></td>
                                <td v-if="datasetItems[i].type !== 'bar'">
                                    <select class="h-[36px]" v-model="datasetItems[i].shape"><option v-for="shape in selectedChart.shapes">{{ shape }}</option></select>
                                </td>
                                <td v-for="(val, j) in datasetItems[i].series">
                                    <div class="relative">
                                        <input type="number" style="" v-model="datasetItems[i].series[j]" class="h-[36px] w-[86px]"><button tabindex="0" @click="deleteValueFromSeries({id: ds.id, index: j, key: 'series'})"><VueUiIcon name="close" stroke="#ff6400" :size="18" class="cursor-pointer absolute -top-2 left-1" /></button>
                                    </div>
                                </td>
                                <button class="ml-2 h-[36px] w-[36px] rounded-md border border-app-green bg-[#42d392FF] shadow-md dark:bg-[#42d39233] flex place-items-center justify-center" @click="pushValueToSeries({ value: 0, id: ds.id, key:'series'})"><PlusIcon/></button>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-6 mb-2">Dataset: </div>
            <div class="font-[Courier] text-xs bg-[#1A1A1A] text-gray-300 p-6">
                {{ datasetItems }}
            </div>
            <div class="mt-6 mb-2">Config: </div>
            <div class="font-[Courier] text-xs bg-[#1A1A1A] text-gray-300 p-6">
                {{ selectedChart.config }}
            </div>
        </div>
    </div>
</template>