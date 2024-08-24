<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon, ThumbUpIcon, ThumbDownIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiParallelCoordinatePlot from "../themes/ThemesVueUiParallelCoordinatePlot.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    {
        name: "Series 1",
        shape: "triangle",
        series: [
            {
                name: 'Item 1.1',
                values: [1200, 300, 12, 1.2]
            },
            {
                name: 'Item 1.2',
                values: [1000, 100, 10, 1]
            },
            {
                name: 'Item 1.3',
                values: [-800, 85, 8.5, 0.85]
            },
        ]
    },
    {
        name: "Series 2",
        series: [
            {
                name: 'Item 2.1',
                values: [2300, 230, 23, 2.3]
            },
            {
                name: 'Item 2.2',
                values: [2500, 250, 25, 2.5]
            },
            {
                name: 'Item 2.3',
                values: [2800, 280, 28, 2.8]
            },
        ]
    },
])

const config = ref({
    responsive: false,
    theme: "",
    useCssAnimation: true,
    customPalette: [],
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            height: 600,
            width: 1000,
            padding: {
                top: 24,
                left: 0,
                right: 0,
                bottom: 36
            },
            lines: {
                smooth: true,
                strokeWidth: 2,
                opacity: 0.8
            },
            plots: {
                show: true,
                radius: 6,
                opacity: 0.8
            },
            yAxis: {
                scaleTicks: 10,
                stroke: "#2D353C",
                strokeWidth: 1,
                labels: {
                    showAxisNames: true,
                    axisNames: ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4'],
                    axisNamesColor: "#2D353C",
                    axisNamesFontSize: 16,
                    axisNamesBold: true,
                    roundings: [0, 0, 0, 2],
                    prefixes: ['$', '', '', ''],
                    suffixes: ['', '', '%', '°'],
                    ticks: {
                        show: true,
                        fontSize: 14,
                        color: "#2D353C",
                        bold: false,
                        offsetX: 0,
                        offsetY: 0
                    },
                    datapoints: {
                        show: true,
                        fontSize: 14,
                        useSerieColor: true,
                        color: "#2D353C",
                        offsetX: 0,
                        offsetY: 0,
                        bold: true
                    }
                }
            },
            title: {
                text: "Title",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            legend: {
                backgroundColor: "#F3F4F6",
                color: "#2D353C",
                show: true,
                fontSize: 16,
                bold: false
            },
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#e1e5e8",
                borderWidth: 1
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            series: "Series",
            item: "Item"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        }
    }
})

const darkModeConfig = ref({
    responsive: false,
    theme: "",
    useCssAnimation: true,
    customPalette: [],
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 600,
            width: 1000,
            padding: {
                top: 24,
                left: 0,
                right: 0,
                bottom: 36
            },
            lines: {
                smooth: true,
                strokeWidth: 2,
                opacity: 0.8
            },
            plots: {
                show: true,
                radius: 6,
                opacity: 0.8
            },
            yAxis: {
                scaleTicks: 10,
                stroke: "#4A4A4A",
                strokeWidth: 1,
                labels: {
                    showAxisNames: true,
                    axisNames: ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4'],
                    axisNamesColor: "#6A6A6A",
                    axisNamesFontSize: 16,
                    axisNamesBold: true,
                    roundings: [0, 0, 0, 2],
                    prefixes: ['$', '', '', ''],
                    suffixes: ['', '', '%', '°'],
                    ticks: {
                        show: true,
                        fontSize: 14,
                        color: "#6A6A6A",
                        bold: false,
                        offsetX: 0,
                        offsetY: 0
                    },
                    datapoints: {
                        show: true,
                        fontSize: 14,
                        useSerieColor: true,
                        color: "#2D353C",
                        offsetX: 0,
                        offsetY: 0,
                        bold: true
                    }
                }
            },
            title: {
                text: "Title",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            legend: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                show: true,
                fontSize: 16,
                bold: false
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#3A3A3A",
                borderWidth: 1
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            series: "Series",
            item: "Item"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        }
    }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
}


</script>

<template>
    <div>
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartParallelCoordinatePlot" stroke="#42d392" :strokeWidth="1.5" />
            VueUiParallelCoordinatePlot
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.pcp[store.lang] }}
        </p>
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
            <button @click="fixChart"
                class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed" />
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible" />
                    <div
                        class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <VueDataUi component="VueUiParallelCoordinatePlot" :dataset="dataset"
                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
            </VueDataUi>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button
                class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
                @click="copyToClipboard(mainConfig.vue_ui_parallel_coordinate_plot)">
                <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang] }}
            </button>
            <GitHubLink link="vue-ui-parallel-coordinate-plot" />
            <!-- <MakerLink to="VueUiParallelCoordinatePlot"/> -->
        </div>
        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_parallel_coordinate_plot">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiParallelCoordinatePlotDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
    [
        {
            name: string;
            shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star";
            series: [
                {
                    name: string;
                    values: number[];
                },
                {...}
            ]
        },
        {...}
    ]
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiParallelCoordinatePlotDatasetItem[]</span> = [
    {
        name: "Series 1",
        shape: "triangle",
        series: [
            {
                name: 'Item 1.1',
                values: [1200, 300, 12, 1.2]
            },
            {
                name: 'Item 1.2',
                values: [1000, 100, 10, 1]
            },
            {
                name: 'Item 1.3',
                values: [-800, 85, 8.5, 0.85]
            },
        ]
    },
    {
        name: "Series 2",
        series: [
            {
                name: 'Item 2.1',
                values: [2300, 230, 23, 2.3]
            },
            {
                name: 'Item 2.2',
                values: [2500, 250, 25, 2.5]
            },
            {
                name: 'Item 2.3',
                values: [2800, 280, 28, 2.8]
            },
        ]
    },
]
</code>
</pre>
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiParallelCoordinatePlotConfig</code>
                </div>
                <pre>
<code>
const <span class="text-app-blue">config: VueUiParallelCoordinatePlotConfig</span> = {
    responsive: false; <span class="text-app-orange break-keep text-xs">// {{ translations.responsive[store.lang] }}</span>
    theme: ""; ("zen" | "hack" | "concrete" | "")
    customPalette: []; // string[]
    useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true) 
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        buttons: {
            tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)
            pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)
            img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)
            csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)
            table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)
            labels: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.labels" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.labels" @change="forceChartUpdate()">, (default: true)
            fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.chart.height"><input v-else type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.chart.height">, (default: 600)
            width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1500" v-model="mutableConfigDarkMode.style.chart.width"><input v-else type="range" class="accent-app-blue" min="300" max="1500" v-model="mutableConfig.style.chart.width">, (default: 1000)
            padding: {
                top: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.top"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.top">, (default: 24)
                right: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.right"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.right">, (default: 24)
                bottom: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.bottom"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.bottom">, (default: 36)
                left: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.left"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.left">, (default: 36)
            },
            lines: {
                smooth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.lines.smooth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.lines.smooth" @change="forceChartUpdate()">, (default: true) 
                strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.yAxis.strokeWidth"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.lines.strokeWidth">, (default: 2)
                opacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.lines.opacity"><input v-else type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.lines.opacity">, (default: 0.8)
            },
            plots: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.plots.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.plots.show" @change="forceChartUpdate()">, (default: true) 
                radius: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="2" max="64" step="1" v-model="mutableConfigDarkMode.style.chart.plots.radius"><input v-else type="range" class="accent-app-blue" min="2" max="64" step="1" v-model="mutableConfig.style.chart.plots.radius">, (default: 6)
                opacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.plots.opacity"><input v-else type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.plots.opacity">, (default: 0.8)
            },
            yAxis: {
                scaleTicks: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="2" max="20" step="1" v-model="mutableConfigDarkMode.style.chart.yAxis.scaleTicks"><input v-else type="range" class="accent-app-blue" min="2" max="20" step="1" v-model="mutableConfig.style.chart.yAxis.scaleTicks">, (default: 10)
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.yAxis.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.yAxis.stroke">, (default: "#2D353C")
                strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.yAxis.strokeWidth"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.yAxis.strokeWidth">, (default: 1)
                labels: {
                    showAxisNames: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.showAxisNames" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.yAxis.labels.showAxisNames" @change="forceChartUpdate()">, (default: true) 
                    axisNames: [], // string[]
                    axisNamesColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.axisNamesColor"><input v-else type="color" v-model="mutableConfig.style.chart.yAxis.labels.axisNamesColor">, (default: "#2D353C")
                    axisNamesFontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.axisNamesFontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.yAxis.labels.axisNamesFontSize">, (default: 16)
                    axisNamesBold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.axisNamesBold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.yAxis.labels.axisNamesBold" @change="forceChartUpdate()">, (default: true) 
                    roundings: [], // number[], rounding for each axis
                    prefixes: [], // string[], prefixes for each axis
                    suffixes: [], // string[], suffixes for each axis
                    ticks: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.ticks.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.yAxis.labels.ticks.show" @change="forceChartUpdate()">, (default: true) 
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.ticks.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.yAxis.labels.ticks.fontSize">, (default: 14)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.ticks.color"><input v-else type="color" v-model="mutableConfig.style.chart.yAxis.labels.ticks.color">, (default: "#2D353C")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.ticks.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.yAxis.labels.ticks.bold" @change="forceChartUpdate()">, (default: false) 
                        offsetX: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.ticks.offsetX"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.yAxis.labels.ticks.offsetX">, (default: 0)
                        offsetY: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.ticks.offsetY"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.yAxis.labels.ticks.offsetY">, (default: 0)
                    },
                    datapoints: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.datapoints.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.yAxis.labels.datapoints.show" @change="forceChartUpdate()">, (default: true) 
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.datapoints.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.yAxis.labels.datapoints.fontSize">, (default: 14)
                        useSerieColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.datapoints.useSerieColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.yAxis.labels.datapoints.useSerieColor" @change="forceChartUpdate()">, (default: true) 
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.datapoints.color"><input v-else type="color" v-model="mutableConfig.style.chart.yAxis.labels.datapoints.color">, (default: "#2D353C")
                        offsetX: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.datapoints.offsetX"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.yAxis.labels.datapoints.offsetX">, (default: 0)
                        offsetY: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.datapoints.offsetY"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.yAxis.labels.datapoints.offsetY">, (default: 0)
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.yAxis.labels.datapoints.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.yAxis.labels.datapoints.bold" @change="forceChartUpdate()">, (default: false) 
                    }
                }
            },
            title: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate()">, (default: "")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text" @change="forceChartUpdate()">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            legend: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                },
                tooltip: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                    customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
                    borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)
                    borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8"),
                    borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)
                }
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
        columnNames: {
            series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")
            item: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.item"><input v-else type="text" v-model="mutableConfig.table.columnNames.item">, (default: "Item")
        },
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")
        }
    }
}
</code>
</pre>
            </template>

            <!-- EMITS -->
            <template #tab2>
                @selectDatapoint<br><br>

                Emitted when clicing on a datapoint (plot).

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiParallelCoordinatePlot
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint(datapoint) {
    console.log(datapoint)
  }
&lt;/script&gt;
</code>
</pre>

                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
   VueUiParallelCoordinatePlotDatasetItem = {
        name: string;
        shape: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star";
        series: VueUiParallelCoordinatePlotDatasetSerieItem[]
   } & {
        id: string;
        isSegregated: boolean;
        opacity: number;
        seriesIndex: number;
   }
    </code>
    </pre>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const pcpChart = ref(null);
            const pcpDataset = ref([]);

            onMounted(() => {
                pcpDataset.value = pcpChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiParallelCoordinatePlot
                ref="pcpChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiParallelCoordinatePlot
                ref="pcpChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        pcpDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.pcpDataset = this.$refs.pcpChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleLabels</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleLabels[store.lang] }}</div>
                </div>
                </div>
            </template>

            <!-- SLOTS -->
            <template #tab3>
                <div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiParallelCoordinatePlot
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiParallelCoordinatePlot&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiParallelCoordinatePlot
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiParallelCoordinatePlot&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiParallelCoordinatePlot
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiParallelCoordinatePlot&gt;
</code>
</pre> 
            </template>

            <!-- TOOLTIP -->
            <template #tab4>
                <pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">serie, seriesIndex, series, config, scales</span> }) => {
    <span class="text-gray-400">// use args to build your custom content</span>
    const content = "My custom content";
    return `&lt;div&gt;${content}&lt;/div&gt;`
}
</code>
</pre> 
Using custom mode, the tooltip will be headless.
Target the following css class to apply custom styles:
<pre>
<code>
.vue-data-ui-custom-tooltip
</code>
</pre>     
            </template>

            <!-- THEMES -->
            <template #tab6>
                <ThemesVueUiParallelCoordinatePlot/>
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi 
                            component="VueUiParallelCoordinatePlot" 
                            :dataset="dataset"
                            :config="
                                isDarkMode 
                                    ? {
                                        ...mutableConfigDarkMode,
                                        responsive: true
                                    } 
                                    : {
                                        ...mutableConfig,
                                        responsive: true
                                    }
                                " 
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>