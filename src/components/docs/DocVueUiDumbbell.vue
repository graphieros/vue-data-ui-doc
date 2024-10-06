<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiDumbbell from "../themes/ThemesVueUiDumbbell.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocActions from "./BaseDocActions.vue";

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
})

const dataset = ref([
    { name: 'Sweden', start: 5000, end: 7100 },
    { name: 'Korea, Rep.', start: 4900, end: 7050 },
    { name: 'Iceland', start: 6500, end: 8000 },
    { name: 'Finland', start: 6400, end: 7600 },
    { name: 'Norway', start: 5400, end: 6050 },
    { name: 'Ireland', start: 3000, end: 2000 }
]);

const config = ref({
    responsive: false,
    useAnimation: true,
    animationSpeed: 2,
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            width: 600,
            rowHeight: 40,
            padding: {
                top: 12,
                left: 100,
                right: 24,
                bottom: 24
            },
            plots: {
                startColor: "#ff6400",
                endColor: "#5f8bee",
                radius: 6,
                stroke: "#FFFFFF",
                strokeWidth: 1,
                link: {
                    strokeWidth: 2,
                    type: "curved"
                },
                gradient: {
                    show: true,
                    intensity: 40
                }
            },
            grid: {
                strokeWidth: 1,
                scaleSteps: 10,
                horizontalGrid: {
                    show: true,
                    stroke: "#cccccc",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                },
                verticalGrid: {
                    show: true,
                    stroke: "#cccccc",
                    strokeWidth: 0.5,
                    strokeDasharray: 0
                }
            },
            labels: {
                prefix: "",
                suffix: "",
                yAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#2D353C",
                    offsetX: 0,
                    bold: true,
                    showProgression: true,
                    rounding: 1
                },
                xAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#2D353C",
                    offsetY: 0,
                    bold: false,
                    rounding: 0
                },
                startLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#2D353C",
                    offsetY: 0,
                    rounding: 0,
                    useStartColor: true
                },
                endLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#2D353C",
                    offsetY: 0,
                    rounding: 0,
                    useEndColor: true
                }
            },
            legend: {
                show: true,
                labelStart: "2014",
                labelEnd: "2024",
                backgroundColor: "#F3F4F6",
                color: "#2D353C",
                fontSize: 14,
                bold: false
            },
            title: {
                text: "Number of researchers",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "From 2014 to 2024",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            start: "Start value",
            end: "End value",
            progression: "Progression"
        },
        th: {
            backgroundColor: "#FAFAFA",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 1
        }
    }
})

const darkModeConfig = ref({
    responsive: false,
    useAnimation: true,
    animationSpeed: 2,
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            width: 600,
            rowHeight: 40,
            padding: {
                top: 12,
                left: 100,
                right: 24,
                bottom: 24
            },
            plots: {
                startColor: "#ff6400",
                endColor: "#5f8bee",
                radius: 6,
                stroke: "#1A1A1A",
                strokeWidth: 1,
                link: {
                    strokeWidth: 2,
                    type: "curved"
                },
                gradient: {
                    show: true,
                    intensity: 40
                }
            },
            grid: {
                strokeWidth: 1,
                scaleSteps: 10,
                horizontalGrid: {
                    show: true,
                    stroke: "#6A6A6A",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                },
                verticalGrid: {
                    show: true,
                    stroke: "#6A6A6A",
                    strokeWidth: 0.5,
                    strokeDasharray: 0
                }
            },
            labels: {
                prefix: "",
                suffix: "",
                yAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#CCCCCC",
                    offsetX: 0,
                    bold: true,
                    showProgression: true,
                    rounding: 1
                },
                xAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#CCCCCC",
                    offsetY: 0,
                    bold: false,
                    rounding: 0
                },
                startLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#CCCCCC",
                    offsetY: 0,
                    rounding: 0,
                    useStartColor: true
                },
                endLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#CCCCCC",
                    offsetY: 0,
                    rounding: 0,
                    useEndColor: true
                }
            },
            legend: {
                show: true,
                labelStart: "2014",
                labelEnd: "2024",
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                bold: false
            },
            title: {
                text: "Number of researchers",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "From 2014 to 2024",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            start: "Start value",
            end: "End value",
            progression: "Progression"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 1
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
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartDumbbell" stroke="#42d392" :strokeWidth="1.5" />
            VueUiDumbbell
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.dumbbell[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
            <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <Suspense>
                <template #default>
                    <VueDataUi component="VueUiDumbbell" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-dumbbell"
            :configSource="mainConfig.vue_ui_dumbbell"
        />

        <Box showEmits showSlots showThemes showResponsive schema="vue_ui_dumbbell">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiDumbbellDataset[]</code>
                    <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            start: number;
            end: number;
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
const <span class="text-black dark:text-app-green">dataset: VueUiDumbbellDataset[]</span> = [
    { name: 'Sweden', start: 5000, end: 7100 },
    { name: 'Korea, Rep.', start: 4900, end: 7050 },
    { name: 'Iceland', start: 6500, end: 8000 },
    { name: 'Finland', start: 6400, end: 7600 },
    { name: 'Norway', start: 5400, end: 6050 },
    { name: 'Ireland', start: 3000, end: 2000 }
]
</code>
</pre>                    
                </div>
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiDumbbellConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiDumbbellConfig">
        <span> responsive: false; <span class="text-app-blue text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>useAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useAnimation" @change="forceChartUpdate()">, (default: true) </span>
        <span>animationSpeed: <input v-if="isDarkMode" type="number" min="0.1" max="6" step="0.01" v-model="mutableConfigDarkMode.animationSpeed" @change="forceChartUpdate()"><input v-else type="number" min="0.1" max="6" step="0.01" v-model="mutableConfig.animationSpeed" @change="forceChartUpdate()">, (default: 2)</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span> backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <span>width: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.chart.width" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.chart.width" @change="forceChartUpdate()">, (default: 600)</span>
                <span>rowHeight: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="40" max="100" v-model="mutableConfigDarkMode.style.chart.rowHeight" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="40" max="100" v-model="mutableConfig.style.chart.rowHeight" @change="forceChartUpdate()">, (default: 40)</span>
                <BaseDetails attr="grid" :level="3" title="style.chart.grid">
                    <span>strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="1" max="10" v-model="mutableConfigDarkMode.style.chart.grid.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="1" max="10" v-model="mutableConfig.style.chart.grid.strokeWidth" @change="forceChartUpdate()">, (default: 1)</span>
                    <span>scaleSteps: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="2" max="30" v-model="mutableConfigDarkMode.style.chart.grid.scaleSteps" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="2" max="30" v-model="mutableConfig.style.chart.grid.scaleSteps" @change="forceChartUpdate()">, (default: 10)</span>
                    <BaseDetails attr="horizontalGrid" :level="4" title="style.chart.grid.horizontalGrid">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.horizontalGrid.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.grid.horizontalGrid.stroke">, (default: "#cccccc")</span>
                        <span>strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0.1" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.chart.grid.horizontalGrid.strokeWidth" @change="forceChartUpdate()">, (default: 0.5)</span>
                        <span>strokeDasharray: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.strokeDasharray" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" step="0.1" v-model="mutableConfig.style.chart.grid.horizontalGrid.strokeDasharray" @change="forceChartUpdate()">, (default: 4)</span>
                    </BaseDetails>
                    <BaseDetails attr="verticalGrid" :level="4" title="style.chart.grid.verticalGrid">
                        <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.verticalGrid.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.grid.verticalGrid.stroke">, (default: "#cccccc")</span>
                        <span>strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0.1" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.chart.grid.verticalGrid.strokeWidth" @change="forceChartUpdate()">, (default: 0.5)</span>
                        <span>strokeDasharray: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.strokeDasharray" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" step="0.1" v-model="mutableConfig.style.chart.grid.verticalGrid.strokeDasharray" @change="forceChartUpdate()">, (default: 0)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="labels" :level="3" title="style.chart.labels">
                    <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.labels.prefix">, (default: "")</span>
                    <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.labels.suffix">, (default: "")</span>
                    <BaseDetails attr="endLabels" :level="4" title="style.chart.labels.endLabels">
                        <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.endLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.endLabels.show" @change="forceChartUpdate()">, (default: true) </span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.endLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.endLabels.fontSize">, (default: 10)</span>
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.endLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.endLabels.color">, (default: "#2D353C")</span>
                        <span>offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.endLabels.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.endLabels.offsetY">, (default: 0)</span>
                        <span>rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.labels.endLabels.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.labels.endLabels.rounding">, (default: 0)</span>
                        <span>useEndColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.endLabels.useEndColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.endLabels.useEndColor" @change="forceChartUpdate()">, (default: true)</span>
                    </BaseDetails>
                    <BaseDetails attr="startLabels" :level="4" title="style.chart.labels.startLabels">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.startLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.startLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.startLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.startLabels.fontSize">, (default: 10)</span>
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.startLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.startLabels.color">, (default: "#2D353C")</span>
                        <span>offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.startLabels.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.startLabels.offsetY">, (default: 0)</span>
                        <span>rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.labels.startLabels.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.labels.startLabels.rounding">, (default: 0)</span>
                        <span>useStartColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.startLabels.useStartColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.startLabels.useStartColor" @change="forceChartUpdate()">, (default: true)</span>
                    </BaseDetails>
                    <BaseDetails attr="xAxisLabels" :level="4" title="style.chart.labels.xAxisLabels">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.xAxisLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.xAxisLabels.fontSize">, (default: 14)</span>
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.xAxisLabels.color">, (default: "#2D353C")</span>
                        <span>offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.xAxisLabels.offsetY">, (default: 0)</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.xAxisLabels.bold" @change="forceChartUpdate()">, (default: true)</span>
                        <span>rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.labels.xAxisLabels.rounding">, (default: 0)</span>
                    </BaseDetails>
                    <BaseDetails attr="yAxisLabels" :level="4" title="style.chart.labels.yAxisLabels">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.yAxisLabels.show" @change="forceChartUpdate()">, (default: true) </span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.yAxisLabels.fontSize">, (default: 14)</span>
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.yAxisLabels.color">, (default: "#2D353C")</span>
                        <span>offsetX: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.offsetX"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.yAxisLabels.offsetX">, (default: 0)</span>
                        <span>old: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.yAxisLabels.bold" @change="forceChartUpdate()">, (default: true)</span>
                        <span>showProgression: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.showProgression" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.yAxisLabels.showProgression" @change="forceChartUpdate()">, (default: true)</span>
                        <span>rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.labels.yAxisLabels.rounding">, (default: 0)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>labelStart: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.labelStart"><input v-else type="text" v-model="mutableConfig.style.chart.legend.labelStart">, (default: "start")</span>
                    <span>labelEnd: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.labelEnd"><input v-else type="text" v-model="mutableConfig.style.chart.legend.labelEnd">, (default: "end")</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)</span>
                </BaseDetails>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <span>top: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.top" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.top" @change="forceChartUpdate()">, (default: 12)</span>
                    <span>right: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.right" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.right" @change="forceChartUpdate()">, (default: 24)</span>
                    <span>bottom: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.bottom" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.bottom" @change="forceChartUpdate()">, (default: 12)</span>
                    <span> left: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="300" v-model="mutableConfigDarkMode.style.chart.padding.left" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="300" v-model="mutableConfig.style.chart.padding.left" @change="forceChartUpdate()">, (default: 100)</span>
                </BaseDetails>
                <BaseDetails attr="plots" :level="3" title="style.chart.plots">
                    <span>startColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.plots.startColor"><input v-else type="color" v-model="mutableConfig.style.chart.plots.startColor">, (default: "#dc3912")</span>
                    <span>endColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.plots.endColor"><input v-else type="color" v-model="mutableConfig.style.chart.plots.endColor">, (default: "#5f8bee")</span>
                    <span>radius: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="2" max="10" v-model="mutableConfigDarkMode.style.chart.plots.radius" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="2" max="10" v-model="mutableConfig.style.chart.plots.radius" @change="forceChartUpdate()">, (default: 6)</span>
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.plots.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.plots.stroke">, (default: "#FFFFFF")</span>
                    <span>strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="10" v-model="mutableConfigDarkMode.style.chart.plots.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="10" v-model="mutableConfig.style.chart.plots.strokeWidth" @change="forceChartUpdate()">, (default: 1)</span>
                    <BaseDetails attr="gradient" :level="4" title="style.chart.plots.gradient">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.plots.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.plots.gradient.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>intensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.plots.gradient.intensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.plots.gradient.intensity">, (default: 40)</span>
                    </BaseDetails>
                    <BaseDetails attr="link" :level="4" title="style.chart.plots.link">
                        <span>rokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="1" max="10" v-model="mutableConfigDarkMode.style.chart.plots.link.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="1" max="10" v-model="mutableConfig.style.chart.plots.link.strokeWidth" @change="forceChartUpdate()">, (default: 2)</span>
                        <span>type: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.plots.link.type"><option>line</option><option>curved</option></select><select v-else v-model="mutableConfig.style.chart.plots.link.type"><option>line</option><option>curved</option></select>, (default: "curved")</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
            <span>responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)</span>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <span>series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")</span>
                <span>start: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.start"><input v-else type="text" v-model="mutableConfig.table.columnNames.start">, (default: "Start value")</span>
                <span>end: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.end"><input v-else type="text" v-model="mutableConfig.table.columnNames.end">, (default: "End value")</span>
                <span>progression: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.progression"><input v-else type="text" v-model="mutableConfig.table.columnNames.progression">, (default: "Progression")</span>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
                <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)</span>
                <span>roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
                <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
                <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
               
            </template>
            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const dumbbellChart = ref(null);
            const dumbbellDataset = ref([]);

            onMounted(() => {
                dumbbellDataset.value = dumbbellChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDumbbell
                ref="dumbbellChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDumbbell
                ref="dumbbellChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        dumbbellDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.dumbbellDataset = this.$refs.dumbbellChart.getData();
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
                </div>
            </template>
            <template #tab3>
                <div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiDumbbell
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiDumbbell&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiDumbbell
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiDumbbell&gt;
</code>
</pre>
            </template>

            <template #tab6>
                <ThemesVueUiDumbbell />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi 
                            component="VueUiDumbbell" 
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