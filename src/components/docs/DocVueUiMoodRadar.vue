<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiMoodRadar from "../themes/ThemesVueUiMoodRadar.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";

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

const dataset = ref({
    "1": 96,
    "2": 64,
    "3": 128,
    "4": 256,
    "5": 384
})

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                grid: {
                    show: true,
                    stroke: "#5A5A5A",
                    strokeWidth: 0.5,
                },
                outerPolygon: {
                    stroke: "#5A5A5A",
                    strokeWidth: 1
                },
                dataPolygon: {
                    color: "#5f8bee",
                    opacity: 60,
                    gradient: {
                        show: true,
                        intensity: 5
                    },
                    stroke: "#5f8bee",
                    strokeWidth: 0
                },
                smileys: {
                    strokeWidth: 1,
                    colors: {
                        1: "#e20001",
                        2: "#ff9f03",
                        3: "#ffd004",
                        4: "#9ac900",
                        5: "#059f00"
                    }
                },
                dataLabel: {
                    color: "#CCCCCC",
                    roundingPercentage: 0,
                    roundingValue: 0,
                    bold: true,
                    prefix: '',
                    suffix: ''
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
            legend: {
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                bold: false,
                show: true,
                fontSize: 16,
                roundingPercentage: 0,
                roundingValue: 0
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
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
    },
    userOptions: {
        show: true,
        position: 'right',
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
    }
})

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            layout: {
                grid: {
                    show: true,
                    stroke: "#e1e5e8",
                    strokeWidth: 0.5,
                },
                outerPolygon: {
                    stroke: "#e1e5e8",
                    strokeWidth: 1
                },
                dataPolygon: {
                    color: "#5f8bee",
                    opacity: 60,
                    gradient: {
                        show: true,
                        intensity: 5
                    },
                    stroke: "#5f8bee",
                    strokeWidth: 0
                },
                smileys: {
                    strokeWidth: 1,
                    colors: {
                        1: "#e20001",
                        2: "#ff9f03",
                        3: "#ffd004",
                        4: "#9ac900",
                        5: "#059f00"
                    }
                },
                dataLabel: {
                    color: "#2D353C",
                    roundingPercentage: 0,
                    roundingValue: 0,
                    bold: true,
                    prefix: '',
                    suffix: ''
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
                    text: "",
                    fontSize: 16,
                    bold: false
                }
            },
            legend: {
                color: "#2D353C",
                backgroundColor: "#F3F4F6",
                bold: false,
                show: true,
                fontSize: 16,
                roundingPercentage: 0,
                roundingValue: 0
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value",
            percentage: "Percentage"
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
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: true,
        position: 'right',
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

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartMoodRadar" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">MoodRadar</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.moodRadar[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-mood-radar"
            targetMaker="VueUiMoodRadar"
            :configSource="mainConfig.vue_ui_mood_radar"
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
                    <VueUiMoodRadar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <Box showEmits showSlots showThemes schema="vue_ui_mood_radar" signInfo="positiveOnly">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiMoodRadarDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
    }
</code>
</pre>      {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
    const <span class="text-black dark:text-app-green">dataset: VueUiMoodRadarDataset</span> = {
        "1": 96,
        "2": 64,
        "3": 128,
        "4": 256,
        "5": 384
    }
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
                    TS type: <code class="text-app-blue">VueUiMoodRadarConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiMoodRadarConfig" equal>
        <span>theme: "", <BaseComment>"zen" | "hack" | "concrete" | ""</BaseComment></span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="dataLabel" :level="4" title="style.chart.layout.dataLabel">
                        <BaseAttr name="color" attr="style.chart.layout.dataLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="roundingValue" attr="style.chart.layout.dataLabel.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="roundingPercentage" attr="style.chart.layout.dataLabel.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.layout.dataLabel.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="prefix" attr="style.chart.layout.dataLabel.prefix" type="text" defaultval="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="suffix" attr="style.chart.layout.dataLabel.suffix" type="text" defaultval="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                    </BaseDetails>
                    <BaseDetails attr="dataPolygon" :level="4" title="style.chart.layout.dataPolygon">
                        <BaseAttr name="color" attr="style.chart.layout.dataPolygon.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="opacity" attr="style.chart.layout.dataPolygon.opacity" type="range" defaultVal="60" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.dataPolygon.stroke" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.dataPolygon.strokeWidth" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="gradient" :level="5" title="style.chart.layout.dataPolygon.gradient">
                            <BaseAttr name="show" attr="style.chart.layout.dataPolygon.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="intensity" attr="style.chart.layout.dataPolygon.gradient.intensity" type="range" defaultVal="5" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="grid" :level="4" title="style.chart.layout.grid">
                        <BaseAttr name="show" attr="style.chart.layout.grid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.grid.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.grid.strokeWidth" type="number" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="outerPolygon" :level="4" title="style.chart.layout.outerPolygon">
                        <BaseAttr name="stroke" attr="style.chart.layout.outerPolygon.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.outerPolygon.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="smileys" :level="4" title="style.chart.layout.smileys">
                        <BaseDetails attr="colors" :level="5" title="style.chart.layout.smileys.colors">
                            <BaseAttr name="'1'" :attr="`style.chart.layout.smileys.colors.1`" type="color" defaultVal="#E20001" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="'2'" :attr="`style.chart.layout.smileys.colors.2`" type="color" defaultVal="#FF9F03" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="'3'" :attr="`style.chart.layout.smileys.colors.3`" type="color" defaultVal="#FFD004" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="'4'" :attr="`style.chart.layout.smileys.colors.4`" type="color" defaultVal="#9AC900" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="'5'" :attr="`style.chart.layout.smileys.colors.5`" type="color" defaultVal="#059F00" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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

            const moodRadarChart = ref(null);
            const moodRadarDataset = ref([]);

            onMounted(() => {
                moodRadarDataset.value = moodRadarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMoodRadar
                ref="moodRadarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMoodRadar
                ref="moodRadarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        moodRadarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.moodRadarDataset = this.$refs.moodRadarChart.getData();
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
    &lt;VueUiMoodRadar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiMoodRadar&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiMoodRadar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiMoodRadar&gt;
</code>
</pre> 

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiMoodRadar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiMoodRadar&gt;
</code>
</pre>
            </template>

            <template #tab6>
                <ThemesVueUiMoodRadar />
            </template>
        </Box>
    </div>
</template>