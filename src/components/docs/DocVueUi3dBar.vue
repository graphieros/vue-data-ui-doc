<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUi3dBar from "../themes/ThemesVueUi3dBar.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseAttr from "../BaseAttr.vue";
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
});

const dataset = ref({
    percentage: 66.5,
    series: [
        {
            name:  'Serie 1 with a long name that should be shorter but we do not have the choice',
            value: 256,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 90
                },
                {
                    name: 'Sub serie 3',
                    value: 66
                }
            ]
        },
        {
            name: 'Serie 2',
            value: 128,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 28
                }
            ]
        },
        {
            name: 'Serie 3',
            value: 64,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 30
                },
                {
                    name: 'Sub serie 2',
                    value: 20
                },
                {
                    name: 'Sub serie 3',
                    value: 14
                }
            ]
        },
        {
            name: 'Serie 4',
            value: 32,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 12
                },
                {
                    name: 'Sub serie 2',
                    value: 12
                },
                {
                    name: 'Sub serie 3',
                    value: 8
                }
            ]
        },
        {
            name: 'Serie 5',
            value: 16,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 10
                },
                {
                    name: 'Sub serie 2',
                    value: 6
                }
            ]
        },
        {
            name: 'Serie 6',
            value: 8,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 6
                },
                {
                    name: 'Sub serie 2',
                    value: 2
                }
            ]
        }
    ]
})

const shapeOptions = ref([
    "bar",
    "tube"
]);

const isSeries = ref(true);

const config = ref({
    style: {
        fontFamily: "inherit",
        shape: "bar",
        chart: {
            animation: {
                use: true,
                speed: 1,
                acceleration: 1
            },
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            bar: {
                color: "#5f8bee",
                stroke: "#5f8bee",
                strokeWidth: 0.7,
                shadeColor: "#1A1A1A"
            },
            box: {
                stroke: "#CCCCCC",
                strokeWidth: 0.7,
                strokeDasharray: 2,
                dimensions: {
                    width: 128,
                    height: 256,
                    top: 27,
                    bottom: 9,
                    left: 24,
                    right: 24,
                    perspective: 18
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
            legend: {
                showDefault: true,
                fontSize: 10,
                color: "#1A1A1A",
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0,
                prefix: "",
                suffix: "",
                hideUnderPercentage: 3
            },
            dataLabel: {
                show: true,
                bold: true,
                color: "#5f8bee",
                fontSize: 12,
                rounding: 1
            }
        }
    },
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
    }
});

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        shape: "bar",
        chart: {
            animation: {
                use: true,
                speed: 1,
                acceleration: 1
            },
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            bar: {
                color: "#5f8bee",
                stroke: "#5f8bee",
                strokeWidth: 0.7,
                shadeColor: '#1A1A1A'
            },
            box: {
                stroke: "#5A5A5A",
                strokeWidth: 0.7,
                strokeDasharray: 2,
                dimensions: {
                    width: 128,
                    height: 256,
                    top: 27,
                    bottom: 9,
                    left: 24,
                    right: 24,
                    perspective: 18
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
                showDefault: true,
                fontSize: 10,
                color: "#CCCCCC",
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0,
                prefix: "",
                suffix: "",
                hideUnderPercentage: 3
            },
            dataLabel: {
                show: true,
                bold: true,
                color: "#5f8bee",
                fontSize: 12,
                rounding: 1
            }
        }
    },
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
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    key.value += 1;
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
            <VueUiIcon name="chart3dBar" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">3dBar</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.bar3d[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-3d-bar"
            targetMaker="VueUi3dBar"
            :configSource="mainConfig.vue_ui_3d_bar"
        />

        <div :class="`mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : isSeries ? 'max-w-[400px]' : 'max-w-[200px]'}`">
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
            <div :class="`mx-auto ${isFixed ? 'max-w-[150px]' : 'w-full'}`">
                <Suspense>
                    <template #default>
                        <VueUi3dBar :dataset="isSeries ? dataset : { percentage: dataset.percentage }" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </template>
                    <template #fallback>
                        <BaseSpinner/>
                    </template>
                </Suspense>
            </div>
            <div class="w-full mx-auto flex flex-row place-items-center justify-center mt-10 gap-3">
                <label for="is_series">Stack mode</label>
                <input id="is_series" type="checkbox" v-model="isSeries">
            </div>
        </div>
        <div class="w-full mx-auto max-w-[600px] text-gray-500 mb-10 mt-5 text-center">
            {{ translations.docs.comments.bar3d.mode[store.lang] }}
        </div>

        <Box showEmits showSlots showThemes schema="vue_ui_3d_bar">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUi3dBarDataset</code>
                </div>
                <div class="w-full overflow-x-auto mb-6 border-gray-700">
Percentage mode:                    
<pre>
<code>
    {
        percentage: number; (from 0 to 100)
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUi3dBarDataset</span> = {
    percentage: 66.5
}
</code>
</pre>
<div class="border-b border-gray-700 mb-6"></div>                
Stack mode:
<pre>
<code>
    {
        series: [
            {
                name: string;
                value: number;
                color?: string;
                breakdown?: [ <span class="text-gray-500">// will display donuts in the legend</span>
                    {
                        name: string;
                        value: number;
                    }
                ]
            },
            {...}
        ]
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUi3dBarDataset</span> = {
    series: [
        {
            name:  'Serie 1 with a long name that should be shorter but we do not have the choice',
            value: 256,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 90
                },
                {
                    name: 'Sub serie 3',
                    value: 66
                }
            ]
        },
        {
            name: 'Serie 2',
            value: 128
        },
        {
            name: 'Serie 3',
            value: 64
        },
        {
            name: 'Serie 4',
            value: 32
        },
        {
            name: 'Serie 5',
            value: 16
        },
        {
            name: 'Serie 6',
            value: 8
        }
    ]
}
</code>
</pre>  
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUi3dBarConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUi3dBarConfig">
        <span>theme: "", <BaseComment>"zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="shape" attr="style.shape" type="select" defaultVal="bar" :options="['bar', 'tube']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D3535C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="animation" :level="3" title="style.chart.animation">
                    <span><BaseComment>Animation only with percentage mode</BaseComment></span>
                    <BaseAttr name="use" attr="style.chart.animation.use" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="speed" attr="style.chart.animation.speed" type="number" defaultVal="1" :min="0" :max="10" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="acceleration" attr="style.chart.animation.acceleration" type="number" defaultVal="1" :min="0" :max="10" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
                <BaseDetails attr="bar" :level="3" title="style.chart.bar">
                    <BaseAttr name="color" attr="style.chart.bar.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only" />
                    <BaseAttr name="stroke" attr="style.chart.bar.stroke" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only" />
                    <BaseAttr name="strokeWidth" attr="style.chart.bar.strokeWidth" type="number" defaultVal="0.7" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only" />
                    <BaseAttr name="shadeColor" attr="style.chart.bar.shadeColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Stack mode only" />
                </BaseDetails>
                <BaseDetails attr="box" :level="3" title="style.chart.box">
                    <BaseAttr name="stroke" attr="style.chart.box.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only" />
                    <BaseAttr name="strokeWidth" attr="style.chart.box.strokeWidth" type="number" defaultVal="0.7" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeDasharray" attr="style.chart.box.strokeDasharray" type="range" defaultVal="2" :min="0" :max="100" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="dimensions" :level="4" title="style.chart.box.dimensions">
                        <BaseAttr name="width" attr="style.chart.box.dimensions.width" type="number" defaultVal="128" :min="60" :max="360" :step="8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="height" attr="style.chart.box.dimensions.height" type="number" defaultVal="256" :min="60" :max="1024" :step="8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="top" attr="style.chart.box.dimensions.top" type="number" defaultVal="27" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="right" attr="style.chart.box.dimensions.right" type="number" defaultVal="24" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bottom" attr="style.chart.box.dimensions.bottom" type="number" defaultVal="9" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="left" attr="style.chart.box.dimensions.left" type="number" defaultVal="24" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="perspective" attr="style.chart.box.dimensions.perspective" type="range" defaultVal="18" :min="0" :max="60" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="dataLabel" :level="3" title="style.chart.dataLabel">
                    <BaseAttr name="show" attr="style.chart.dataLabel.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only"/>
                    <BaseAttr name="bold" attr="style.chart.dataLabel.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only"/>
                    <BaseAttr name="color" attr="style.chart.dataLabel.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only"/>
                    <BaseAttr name="fontSize" attr="style.chart.dataLabel.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only" />
                    <BaseAttr name="rounding" attr="style.chart.dataLabel.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Percentage mode only" />
                    <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span><BaseComment>Legend is for stack mode only</BaseComment></span>
                    <BaseAttr name="showDefault" attr="style.chart.legend.showDefault" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingValue" attr="style.chart.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                    <BaseAttr name="roundingPercentage" attr="style.chart.legend.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                    <BaseAttr name="prefix" attr="style.chart.legend.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="suffix" attr="style.chart.legend.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="hideUnderPercentage" attr="style.chart.legend.hideUnderPercentage" type="number" defaultVal="3" :min="1" :max="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
            <span><BaseComment>Table is for stack mode only</BaseComment></span>
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
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
            </template>
            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUi3dBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUi3dBar&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUi3dBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUi3dBar&gt;
</code>
</pre>
            </template>

            <template #tab6>
                <ThemesVueUi3dBar />
            </template>
        </Box>
    </div>
</template>