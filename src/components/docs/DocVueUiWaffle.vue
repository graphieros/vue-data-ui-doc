<script setup>
import {ref, watch, computed, nextTick } from "vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import Box from "../Box.vue";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import ThemesVueUiWaffle from "../themes/ThemesVueUiWaffle.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";

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
        {
            name: "Serie 1",
            color: "#5f8bee",
            values: [100]
        },
        {
            name: "Serie 2",
            color: "#42d392",
            values: [200]
        },
        {
            name: "Serie 3",
            color: "#ff6400",
            values: [300, 1]
        }
    ]);

    const darkModeConfig = ref({
        responsive: false,
        useBlurOnHover: true,
        useCustomCells: false,
        useAnimation: true,
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                layout: {
                    labels: {
                        dataLabels: {
                            prefix: "",
                            suffix: ""
                        },
                        captions: {
                            "show": false,
                            "showSerieName": false,
                            "serieNameAbbreviation": true,
                            "serieNameMaxAbbreviationSize": 3,
                            "fontSize": 12,
                            "showValue": true,
                            "showPercentage": true,
                            "roundingValue": 0,
                            "roundingPercentage": 0,
                            "offsetX": 0,
                            "offsetY": 0
                        },
                    },
                    grid: {
                        size: 10,
                        spaceBetween: 0,
                        vertical: false,
                    },
                    rect: {
                        rounded: true,
                        rounding:2,
                        stroke: "#1A1A1A",
                        strokeWidth: 3,
                        useGradient: true,
                        gradientIntensity: 40,
                    },
                },
                title: {
                    text: "Title",
                    color: "#FAFAFA",
                    fontSize: 20,
                    bold: true,
                    subtitle: {
                        color: "#CCCCCC",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false
                    }
                },
                tooltip: {
                    show: true,
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
                    fontSize: 14,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor:"#3A3A3A",
                    borderWidth: 1
                },
                legend: {
                    show: true,
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
                    bold: false,
                    fontSize: 14,
                    roundingValue: 0,
                    roundingPercentage: 0,
                }
            }
        },
        userOptions: {
            show: true,
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
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
                fullscreen: "Toggle fullscreen",
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
            columnNames: {
                series: "Series",
                value: "Value",
                percentage: "Percentage"
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
                roundingPercentage: 0
            }
        }
    });

    const config = ref({
        responsive: false,
        useBlurOnHover: true,
        useCustomCells: false,
        useAnimation: true,
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                layout: {
                    labels: {
                        dataLabels: {
                            prefix: "",
                            suffix: ""
                        },
                        captions: {
                            "show": false,
                            "showSerieName": false,
                            "serieNameAbbreviation": true,
                            "serieNameMaxAbbreviationSize": 3,
                            "fontSize": 12,
                            "showValue": true,
                            "showPercentage": true,
                            "roundingValue": 0,
                            "roundingPercentage": 0,
                            "offsetX": 0,
                            "offsetY": 0
                        },
                    },
                    grid: {
                        size: 10,
                        spaceBetween: 0,
                        vertical: false,
                    },
                    rect: {
                        rounded: true,
                        rounding:2,
                        stroke: "#F3F4F6",
                        strokeWidth: 3,
                        useGradient: true,
                        gradientIntensity: 20,
                    },
                },
                title: {
                    text: "Title",
                    color: "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    subtitle: {
                        color: "#565656",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false
                    }
                },
                tooltip: {
                    show: true,
                    backgroundColor: "#F3F4F6",
                    color: "#1A1A1A",
                    fontSize: 14,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor:"#e1e5e8",
                    borderWidth: 1
                },
                legend: {
                    show: true,
                    backgroundColor: "#F3F4F6",
                    color: "#1A1A1A",
                    bold: false,
                    fontSize: 14,
                    roundingValue: 0,
                    roundingPercentage: 0,
                }
            }
        },
        userOptions: {
            show: true,
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
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
                fullscreen: "Toggle fullscreen",
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
            columnNames: {
                series: "Series",
                value: "Value",
                percentage: "Percentage"
            },
            th: {
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                outline: "none"
            },
            td: {
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                outline: "none",
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    });

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

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
            <VueUiIcon name="chartWaffle" stroke="#42d392" :strokeWidth="1.5" />
            VueUiWaffle
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.waffle[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
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
            <VueUiWaffle :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>

        <BaseDocActions
            targetLink="vue-ui-waffle"
            targetMaker="VueUiWaffle"
            :configSource="mainConfig.vue_ui_waffle"
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_waffle">
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiWaffleDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            color: string;
            values: number[];
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
const <span class="text-black dark:text-app-green">dataset: VueUiWaffleDatasetItem[]</span> = [
    {
        name: "Series 1",
        color: <input type="color" v-model="mutableDataset[0].color">, 
        values: [100]
    },
    {
        name: "Series 2",
        color: <input type="color" v-model="mutableDataset[1].color">,
        values: [200]
    },
    {
        name: "Series 1",
        color: <input type="color" v-model="mutableDataset[2].color">,
        values: [300, 1]
    },
]
</code>
</pre> 
                </div>
            </template>

            <template v-slot:tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiWaffleConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiWaffleConfig" equal>
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <span>useBlurOnHover: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useBlurOnHover" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useBlurOnHover" @change="forceChartUpdate()">, (default: true)</span>
        <span>useCustomCells: false, <span class="text-app-blue text-xs">// {{ translations.customization.otherSlots.waffle[store.lang] }}</span></span>
        <span>useAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useAnimation" @change="forceChartUpdate()">, (default: true)</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="grid" :level="4" title="style.chart.layout.grid">
                        <span>size: <input v-if="isDarkMode" type="number" min="2" max="50" v-model="mutableConfigDarkMode.style.chart.layout.grid.size"><input v-else type="number" min="2" max="50" v-model="mutableConfig.style.chart.layout.grid.size">, (default: 20), <span class="text-app-blue text-xs">// {{ translations.docs.comments.waffle.gridSize[store.lang] }}</span></span>
                        <span>spaceBetween: <input v-if="isDarkMode" type="number" min="0" max="5" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.spaceBetween"><input v-else type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.chart.layout.grid.spaceBetween">, (default: 0)</span>
                        <span>vertical: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.vertical" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.vertical" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">
                        <BaseDetails attr="captions" :level="5" title="style.chart.layout.labels.captions">
                            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.show" @change="forceChartUpdate()">, (default: false)</span>
                            <span>showSerieName: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.showSerieName" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.showSerieName" @change="forceChartUpdate()">, (default: false)</span>
                            <span>serieNameAbbreviation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.serieNameAbbreviation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.serieNameAbbreviation" @change="forceChartUpdate()">, (default: true)</span>
                            <span>serieNameMaxAbbreviationSize: <input v-if="isDarkMode" type="number" min="0" max="12" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.serieNameMaxAbbreviationSize"><input v-else type="number" min="0" max="12" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.serieNameMaxAbbreviationSize">, (default: 3)</span>
                            <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.fontSize"><input v-else type="number" min="6" max="48" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.fontSize">, (default: 12)</span>
                            <span>showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.showValue" @change="forceChartUpdate()">, (default: true)</span>
                            <span>showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.showPercentage" @change="forceChartUpdate()">, (default: true)</span>
                            <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.roundingValue"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.roundingValue">, (default: 0)</span>
                            <span>roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.roundingPercentage"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.roundingPercentage">, (default: 0)</span>
                            <span>offsetX: <input v-if="isDarkMode" type="number" min="-100" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.offsetX"><input v-else type="number" min="-100" max="100" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.offsetX">, (default: 0)</span>
                            <span>offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.offsetY"><input v-else type="number" min="-100" max="100" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.offsetY">, (default: 0)</span>
                        </BaseDetails>
                        <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.labels.dataLabels">
                            <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.prefix">, (default: "")</span>
                            <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.suffix">, (default: "")</span>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="rect" :level="4" title="style.chart.layout.rect">
                        <span>rounded: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.rect.rounded" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.rect.rounded" @change="forceChartUpdate()">, (default: true)</span>
                        <span>rounding: <input v-if="isDarkMode" type="number" min="0" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.layout.rect.rounding"><input v-else type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.layout.rect.rounding">, (default: 2)</span>
                        <span> stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.rect.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.rect.stroke">, (default: "#FFFFFF")</span>
                        <span>strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.rect.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.rect.strokeWidth">, (default: 2)</span>
                        <span>useGradient: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.rect.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.rect.useGradient" @change="forceChartUpdate()">, (default: true)</span>
                        <span>gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.rect.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.rect.gradientIntensity">, (default: 40)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")</span>
                    <span> fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)</span>
                    <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate()">, (default: 0)</span>
                    <span>roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate()">, (default: 0)</span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)</span>
                    <span>showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)</span>
                    <span>showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)</span>
                    <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue" @change="forceChartUpdate()">, (default: 0)</span>
                    <span>roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingPercentage" @change="forceChartUpdate()">, (default: 0)</span>
                    <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior, to customize content see 'custom tooltip' tab</span></span>
                    <span>borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)</span>
                    <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8")</span>
                    <span>borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)</span>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
            <span>responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)</span>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <span>series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")</span>
                <span>value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")</span>
                <span>percentage: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.percentage"><input v-else type="text" v-model="mutableConfig.table.columnNames.percentage">, (default: "Percentage")</span>
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
                <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
                <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>tooltip: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.tooltip"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.tooltip">, (default: "Toggle tooltip")</span>
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

            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            name: string;
            value: number;
            color: string;
            proportion: number;
        },
        {...}
    ]
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

            const waffleChart = ref(null);
            const waffleDataset = ref([]);

            onMounted(() => {
                waffleDataset.value = waffleChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        waffleDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.waffleDataset = this.$refs.waffleChart.getData();
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
                    {{ translations.customization.otherSlots.waffle[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiWaffle
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #cell="{ cell, isSelected }"&gt;
            &lt;div&gt;
                ... your custom content (icon, image, etc)
            &lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiWaffle&gt;
</code>
</pre>


                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiWaffle
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiWaffle&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiWaffle
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiWaffle&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiWaffle
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiWaffle&gt;
</code>
</pre> 
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
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
            <template #tab6>
                <ThemesVueUiWaffle />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiWaffle 
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