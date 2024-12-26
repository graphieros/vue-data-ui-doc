<script setup>
import {ref, watch, computed, nextTick } from "vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import Box from "../Box.vue";
import { useMainStore } from "../../stores";
import ThemesVueUiWaffle from "../themes/ThemesVueUiWaffle.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";

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
                    textAlign: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
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
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: 'center',
                    offsetY: 24,
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
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: 'right',
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
                fullscreen: true,
                annotator: true
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
                annotator: "Toggle annotator"
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
                    textAlign: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
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
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: 'center',
                    offsetY: 24,
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
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: 'right',
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
                fullscreen: true,
                annotator: true
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
                annotator: "Toggle annotator"
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

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartWaffle" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Waffle</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.waffle[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-waffle"
            targetMaker="VueUiWaffle"
            :configSource="mainConfig.vue_ui_waffle"
        />

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
            <Suspense>
                <template #default>
                    <VueUiWaffle :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-waffle"/>
        </div>

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_waffle" signInfo="positiveOrNegativeOnly">
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
        <span>responsive: false; <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
        <span>theme: "", <BaseComment>"zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: []; <BaseComment>string[]</BaseComment></span>
        <BaseAttr name="useBlurOnHover" attr="useBlurOnHover" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>useCustomCells: false, <BaseComment>{{ translations.customization.otherSlots.waffle[store.lang] }}</BaseComment></span>
        <BaseAttr name="useAnimation" attr="useAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="grid" :level="4" title="style.chart.layout.grid">
                        <BaseAttr name="size" attr="style.chart.layout.grid.size" type="number" defaultVal="20" :min="2" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode" :comment="translations.docs.comments.waffle.gridSize[store.lang]"/>
                        <BaseAttr name="spaceBetween" attr="style.chart.layout.grid.spaceBetween" type="number" defaultVal="0" :min="0" :max="24" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="vertical" attr="style.chart.layout.grid.vertical" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">
                        <BaseDetails attr="captions" :level="5" title="style.chart.layout.labels.captions">
                            <BaseAttr name="show" attr="style.chart.layout.labels.captions.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="showSerieName" attr="style.chart.layout.labels.captions.showSerieName" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="serieNameAbbreviation" attr="style.chart.layout.labels.captions.serieNameAbbreviation" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="serieNameMaxAbbreviationSize" attr="style.chart.layout.labels.captions.serieNameMaxAbbreviationSize" type="number" defaultVal="3" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.layout.labels.captions.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="showValue" attr="style.chart.layout.labels.captions.showValue" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="showPercentage" attr="style.chart.layout.labels.captions.showPercentage" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="roundingValue" attr="style.chart.layout.labels.captions.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="roundingPercentage" attr="style.chart.layout.labels.captions.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetX" attr="style.chart.layout.labels.captions.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.layout.labels.captions.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.labels.dataLabels">
                            <BaseAttr name="prefix" attr="style.chart.layout.labels.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="suffix" attr="style.chart.layout.labels.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="rect" :level="4" title="style.chart.layout.rect">
                        <BaseAttr name="rounded" attr="style.chart.layout.rect.rounded" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rounding" attr="style.chart.layout.rect.rounding" type="number" defaultVal="2" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.rect.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.rect.strokeWidth" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useGradient" attr="style.chart.layout.rect.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="gradientIntensity" attr="style.chart.layout.rect.gradientIntensity" type="range" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingValue" attr="style.chart.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingPercentage" attr="style.chart.legend.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showValue" attr="style.chart.tooltip.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="showPercentage" attr="style.chart.tooltip.showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="roundingValue" attr="style.chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingPercentage" attr="style.chart.tooltip.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <span>customFormat: null, <span class="text-gray-600 dark:text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
                <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
                <BaseAttr name="percentage" attr="table.columnNames.percentage" type="text" defaultVal="Percentage" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="roundingPercentage" attr="table.td.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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
                <BaseSlotDocumenter
                    componentName="VueUiWaffle"
                    :types="[
                        'svg',
                        'cell',
                        'legend',
                        'tooltip-before',
                        'tooltip-after',
                        'watermark',
                        'source'
                    ]" 
                />
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