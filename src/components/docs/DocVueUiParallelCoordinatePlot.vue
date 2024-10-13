<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiParallelCoordinatePlot from "../themes/ThemesVueUiParallelCoordinatePlot.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";

const mainConfig = useConfig()

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
                values: [2300, 230, 23, 2.3],
                comments: ['', 'A comment for this specific datapoint', '', '']
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
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            tooltip: "Toggle tooltip",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
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
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            comments: {
                show: true,
                showInTooltip: true,
                width: 200,
                offsetX: 0,
                offsetY: 0
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
                borderWidth: 1,
                backgroundOpacity: 90,
                position: 'center',
                offsetY: 24
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
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            tooltip: "Toggle tooltip",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
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
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            comments: {
                show: true,
                showInTooltip: true,
                width: 200,
                offsetX: 0,
                offsetY: 0
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
                borderWidth: 1,
                backgroundOpacity: 90,
                position: 'center',
                offsetY: 24
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

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})

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
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
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
            <Suspense>
                <template #default>
                    <VueDataUi component="VueUiParallelCoordinatePlot" :dataset="dataset"
                        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                        <template #plot-comment="{ plot }">
                            <div :style="`width: 100%;`">
                                {{  plot.comment }}
                            </div>
                        </template>
                    </VueDataUi>
                </template>
                <template #fallback>
                    <BaseSpinner />
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-parallel-coordinate-plot"
            targetMaker="VueUiParallelCoordinatePlot"
            :configSource="mainConfig.vue_ui_parallel_coordinate_plot"
        />

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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiParallelCoordinatePlotConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="height" attr="style.chart.height" type="range" defaultVal="600" :min="300" :max="1000" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="width" attr="style.chart.width" type="range" defaultVal="1000" :min="300" :max="1500" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseDetails attr="comments" :level="3" title="style.chart.comments">
                    <BaseAttr name="show" attr="style.chart.comments.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Check out the slots tab for instructions on how to use comments"/>
                    <BaseAttr name="showInTooltip" attr="style.chart.comments.showInTooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="width" attr="style.chart.comments.width" type="number" defaultVal="200" :min="50" :max="400" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="offsetX" attr="style.chart.comments.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="offsetY" attr="style.chart.comments.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                </BaseDetails>
                <BaseDetails attr="lines" :level="3" title="style.chart.lines">
                    <BaseAttr name="smooth" attr="style.chart.lines.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.lines.strokeWidth" type="number" defaultVal="2" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="opacity" attr="style.chart.lines.opacity" type="range" defaultVal="0.8" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="plots" :level="3" title="style.chart.plots">
                    <BaseAttr name="show" attr="style.chart.plots.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="radius" attr="style.chart.plots.radius" type="number" defaultVal="6" :min="2" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="opacity" attr="style.chart.plots.opacity" type="range" defaultVal="0.8" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <span>customFormat: null,<span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
                <BaseDetails attr="yAxis" :level="3" title="style.chart.yAxis">
                    <BaseAttr name="scaleTicks" attr="style.chart.yAxis.scaleTicks" type="number" defaultVal="10" :min="2" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.yAxis.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.yAxis.strokeWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="labels" :level="4" title="style.chart.yAxis.labels">
                        <BaseAttr name="showAxisNames" attr="style.chart.yAxis.labels.showAxisNames" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>axisNames: [], <span class="text-app-blue text-xs">// string[]</span></span>
                        <BaseAttr name="axisNamesColor" attr="style.chart.yAxis.axisNamesColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="axisNamesFontSize" attr="style.chart.yAxis.axisNamesFontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="axisNamesBold" attr="style.chart.yAxis.axisNamesBold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>roundings: [], <span class="text-app-blue text-xs">// number[], rounding for each axis</span> </span>
                        <span>prefixes: [], <span class="text-app-blue text-xs">// number[], prefixes for each axis</span></span>
                        <span>suffixes: [], <span class="text-app-blue text-xs">// number[], suffixes for each axis</span></span>
                        <BaseDetails attr="datapoints" :level="5" title="style.chart.yAxis.labels.datapoints">
                            <BaseAttr name="show" attr="style.chart.yAxis.labels.datapoints.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.yAxis.labels.datapoints.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="useSerieColor" attr="style.chart.yAxis.labels.datapoints.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.yAxis.labels.datapoints.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetX" attr="style.chart.yAxis.labels.datapoints.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.yAxis.labels.datapoints.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.yAxis.labels.datapoints.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="ticks" :level="5" title="style.chart.yAxis.labels.ticks">
                            <BaseAttr name="show" attr="style.chart.yAxis.labels.ticks.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.yAxis.labels.ticks.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.yAxis.labels.ticks.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.yAxis.labels.ticks.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetX" attr="style.chart.yAxis.labels.ticks.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.yAxis.labels.ticks.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="item" attr="table.columnNames.item" type="text" defaultVal="Item" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="labels" attr="userOptions.buttons.labels" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="labels" attr="userOptions.buttonTitles.labels" type="text" defaultVal="Toggle labels" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
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
    If your dataset contains a comments attribute, you can display comments on the chart using the #plot-comment slot.
</div>

<pre>
<code>
    &lt;VueUiParallelCoordinatePlot
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #plot-comment="{ plot }"&gt;
            &lt;div :style="`width:100%; text-align:center; color:${plot.color}`"&gt;<span v-pre>{{ plot.comment }}</span>&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiParallelCoordinatePlot&gt;
</code>
</pre>

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

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiParallelCoordinatePlot
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
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