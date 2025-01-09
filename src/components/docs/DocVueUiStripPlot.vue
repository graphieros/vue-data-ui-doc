<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiStripPlot from "../themes/ThemesVueUiStripPlot.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

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
        name: "Asia",
        plots: [
            { name: "Shanghai", value: 24.9 },
            { name: "Beijing", value: 21.9 },
            { name: "Delhi", value: 16.8 },
            { name: "Guangzhou", value: 16.1 },
            { name: "Istanbul", value: 15.6 },
            { name: "Chengdu", value: 15.4 },
            { name: "Mumbai", value: 15.4 },
            { name: "Karachi", value: 14.9 },
            { name: "Shenzen", value: 14.7 },
            { name: "Tokyo", value: 14 },
        ]
    },
    {
        name: "Africa",
        plots: [
            { name: "Kinshasa", value: 17.1 },
            { name: "Lagos", value: 14.9 },
            { name: "Cairo", value: 9.3 },
            { name: "Johannesburg", value: 5.6 },
            { name: "Giza", value: 5.6 },
            { name: "Khartoum", value: 5.3 },
            { name: "Abidjan", value: 5 },
            { name: "Alexandria", value: 4.9 },
            { name: "Dar es Salaam", value: 4.7 },
            { name: "Nairobi", value: 4.4 },
        ]
    },
    {
        name: "Europe",
        plots: [
            { name: "Moscow", value: 13 },
            { name: "London", value: 9 },
            { name: "Saint Petersburg", value: 5.4 },
            { name: "Berlin", value: 3.8 },
            { name: "Madrid", value: 3.3 },
            { name: "Kyiv", value: 3 },
            { name: "Rome", value: 2.7 },
            { name: "Paris", value: 2.1 },
            { name: "Minsk", value: 2 },
            { name: "Vienna", value: 1.9 }
        ]
    },
    {
        name: "America",
        plots: [
            { name: "Sao Paulo", value: 12.2 },
            { name: "Lima", value: 9.7 },
            { name: "Mexico City", value: 9.2 },
            { name: "New York", value: 8.4 },
            { name: "Bogota", value: 8 },
            { name: "Rio de Janeiro", value: 6.7 },
            { name: "Santiago", value: 6.2 },
            { name: "Los Angeles", value: 4 },
            { name: "Buenos Aires", value: 3 },
            { name: "Brasilia", value: 2.9 }
        ]
    },
    {
        name: "Australia & Oceania",
        plots: [
            { name: "Sydney", value: 5.4 },
            { name: "Melbourne", value: 5.1 },
            { name: "Brisbane", value: 2.6 },
            { name: "Perth", value: 2.1 },
            { name: "Auckland", value: 1.7 },
            { name: "Adelaide", value: 1.4 },
            { name: "Honolulu", value: 1 },
            { name: "Gold Coast", value: 0.7 },
            { name: "Newcastle-Maitland", value: 0.5 },
            { name: "Canberra", value: 0.46 },
        ]
    },
]);

const config = ref({
    responsive: false,
    useCssAnimation: true,
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
            labels: true,
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
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            series: "Series",
            value: "Value"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            height: 600,
            stripWidth: 120,
            padding: {
                top: 24,
                left: 64,
                right: 24,
                bottom: 64
            },
            grid: {
                show: true,
                stroke: "#cccccc",
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
                    strokeDasharray: 4
                }
            },
            plots: {
                opacity: 0.5,
                radius: 20,
                stroke: "#FFFFFF",
                strokeWidth: 1,
                shape: "circle",
                gradient: {
                    show: true,
                    intensity: 40
                }
            },
            labels: {
                prefix: "",
                suffix: "M",
                bestPlotLabel: {
                    show: true,
                    showValue: true,
                    fontSize: 14,
                    color: "#2D353C",
                    rounding: 0,
                    offsetY: 0
                },
                axis: {
                    xLabel: "Continents",
                    xLabelOffsetY: 0,
                    yLabel: "Population in Millions",
                    yLabelOffsetX: 0,
                    fontSize: 14,
                    color: "#2D353C"
                },
                xAxisLabels: {
                    show: true,
                    color: "#2D353C",
                    fontSize: 14,
                    offsetY: 0
                },
                yAxisLabels: {
                    show: true,
                    color: "#2D353C",
                    fontSize: 14,
                    rounding: 0,
                    offsetX: 0
                }
            },
            title: {
                text: "Top 10 largest cities",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "By continent",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                roundingValue: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: 'center',
                offsetY: 24
            }
        }
    }
})

const darkModeConfig = ref({
    responsive: false,
    useCssAnimation: true,
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
            labels: true,
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
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            series: "Series",
            value: "Value"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCC",
            outline: "none",
            roundingValue: 0
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 600,
            stripWidth: 120,
            padding: {
                top: 24,
                left: 64,
                right: 24,
                bottom: 64
            },
            grid: {
                show: true,
                stroke: "#8A8A8A",
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
                    strokeDasharray: 4
                }
            },
            plots: {
                opacity: 0.5,
                radius: 20,
                stroke: "#1A1A1A",
                strokeWidth: 1,
                shape: "circle",
                gradient: {
                    show: true,
                    intensity: 40
                }
            },
            labels: {
                prefix: "",
                suffix: "M",
                bestPlotLabel: {
                    show: true,
                    showValue: true,
                    fontSize: 14,
                    color: "#CCCCCC",
                    rounding: 0,
                    offsetY: 0
                },
                axis: {
                    xLabel: "Continents",
                    xLabelOffsetY: 0,
                    yLabel: "Population in Millions",
                    yLabelOffsetX: 0,
                    fontSize: 14,
                    color: "#CCCCCC"
                },
                xAxisLabels: {
                    show: true,
                    color: "#6A6A6A",
                    fontSize: 14,
                    offsetY: 0
                },
                yAxisLabels: {
                    show: true,
                    color: "#6A6A6A",
                    fontSize: 14,
                    rounding: 0,
                    offsetX: 0
                }
            },
            title: {
                text: "Top 10 largest cities",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "By continent",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                roundingValue: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: 'center',
                offsetY: 24
            }
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
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartStripPlot" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">StripPlot</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.stripPlot[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-strip-plot"
            targetMaker="VueUiStripPlot"
            :configSource="mainConfig.vue_ui_strip_plot"
        />

        <div :class="`transition-all mx-auto w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <VueUiStripPlot :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-strip-plot"/>
        </div>

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_strip_plot" signInfo="both">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiStripPlotDataset[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            plots: [
                {
                    name: string;
                    value: number;
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
const <span class="text-black dark:text-app-green">dataset: VueUiStripPlotDataset[]</span> = [
    {
        name: "Asia",
        plots: [
            { name: "Shanghai", value: 24.9 },
            { name: "Beijing", value: 21.9 },
            { name: "Delhi", value: 16.8 },
            { name: "Guangzhou", value: 16.1 },
            { name: "Istanbul", value: 15.6 },
            { name: "Chengdu", value: 15.4 },
            { name: "Mumbai", value: 15.4 },
            { name: "Karachi", value: 14.9 },
            { name: "Shenzen", value: 14.7 },
            { name: "Tokyo", value: 14 },
        ]
    },
    {
        name: "Africa",
        plots: [
            { name: "Kinshasa", value: 17.1 },
            { name: "Lagos", value: 14.9 },
            { name: "Cairo", value: 9.3 },
            { name: "Johannesburg", value: 5.6 },
            { name: "Giza", value: 5.6 },
            { name: "Khartoum", value: 5.3 },
            { name: "Abidjan", value: 5 },
            { name: "Alexandria", value: 4.9 },
            { name: "Dar es Salaam", value: 4.7 },
            { name: "Nairobi", value: 4.4 },
        ]
    },
    {
        name: "Europe",
        plots: [
            { name: "Moscow", value: 13 },
            { name: "London", value: 9 },
            { name: "Saint Petersburg", value: 5.4 },
            { name: "Berlin", value: 3.8 },
            { name: "Madrid", value: 3.3 },
            { name: "Kyiv", value: 3 },
            { name: "Rome", value: 2.7 },
            { name: "Paris", value: 2.1 },
            { name: "Minsk", value: 2 },
            { name: "Vienna", value: 1.9 }
        ]
    },
    {
        name: "America",
        plots: [
            { name: "Sao Paulo", value: 12.2 },
            { name: "Lima", value: 9.7 },
            { name: "Mexico City", value: 9.2 },
            { name: "New York", value: 8.4 },
            { name: "Bogota", value: 8 },
            { name: "Rio de Janeiro", value: 6.7 },
            { name: "Santiago", value: 6.2 },
            { name: "Los Angeles", value: 4 },
            { name: "Buenos Aires", value: 3 },
            { name: "Brasilia", value: 2.9 }
        ]
    },
    {
        name: "Australia & Oceania",
        plots: [
            { name: "Sydney", value: 5.4 },
            { name: "Melbourne", value: 5.1 },
            { name: "Brisbane", value: 2.6 },
            { name: "Perth", value: 2.1 },
            { name: "Auckland", value: 1.7 },
            { name: "Adelaide", value: 1.4 },
            { name: "Honolulu", value: 1 },
            { name: "Gold Coast", value: 0.7 },
            { name: "Newcastle-Maitland", value: 0.5 },
            { name: "Canberra", value: 0.46 },
        ]
    },
]
</code>
</pre>                    
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiStripPlotConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiStripPlotConfig" equal>
        <span> responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
        <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseAttr name="height" attr="style.chart.height" type="number" :min="300" :max="1000" :step="50" defaultVal="600" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="stripWidth" attr="style.chart.stripWidth" type="number" defaultVal="120" :min="64" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseDetails attr="grid" :level="3" title="style.chart.grid">
                    <BaseAttr name="show" attr="style.chart.grid.show" type="checkbox" defaultval="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="stroke" attr="style.chart.grid.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="strokeWidth" attr="style.chart.grid.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="scaleSteps" attr="style.chart.grid.scaleSteps" type="select" defaultVal="10" :options="[2, 5, 10, 20]" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseDetails attr="horizontalGrid" :level="4" title="style.chart.grid.horizontalGrid">
                        <BaseAttr name="show" attr="style.chart.grid.horizontalGrid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                        <BaseAttr name="stroke" attr="style.chart.grid.horizontalGrid.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.horizontalGrid.strokeWidth" type="range" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeDasharray" attr="style.chart.grid.horizontalGrid.strokeDasharray" type="range" defaultVal="4" :min="0" :max="40" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                    <BaseDetails attr="verticalGrid" :level="4" title="style.chart.grid.verticalGrid">
                        <BaseAttr name="show" attr="style.chart.grid.verticalGrid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                        <BaseAttr name="stroke" attr="style.chart.grid.verticalGrid.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.verticalGrid.strokeWidth" type="range" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeDasharray" attr="style.chart.grid.verticalGrid.strokeDasharray" type="range" defaultVal="4" :min="0" :max="40" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="labels" :level="3" title="style.chart.labels">
                    <BaseAttr name="prefix" attr="style.chart.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="suffix" attr="style.chart.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                    <BaseDetails attr="axis" :level="4" title="style.chart.labels.axis">
                        <BaseAttr name="xLabel" attr="style.chart.labels.axis.xLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="xLabelOffsetY" attr="style.chart.labels.axis.xLabelOffsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="yLabel" attr="style.chart.labels.axis.yLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="yLabelOffsetX" attr="style.chart.labels.axis.yLabelOffsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="fontSize" attr="style.chart.labels.axis.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="color" attr="style.chart.labels.axis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                    <BaseDetails attr="bestPlotLabel" :level="4" title="style.chart.labels.bestPlotLabel">
                        <BaseAttr name="show" attr="style.chart.labels.bestPlotLabel.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="showValue" attr="style.chart.labels.bestPlotLabel.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="fontSize" attr="style.chart.labels.bestPlotLabel.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.labels.bestPlotLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rounding" attr="style.chart.labels.bestPlotLabel.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.labels.bestPlotLabel.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="xAxisLabels" :level="4" title="style.chart.labels.xAxisLabels">
                        <BaseAttr name="show" attr="style.chart.labels.xAxisLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="color" attr="style.chart.labels.xAxisLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.labels.xAxisLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.labels.xAxisLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="yAxisLabels" :level="4" title="style.chart.labels.yAxisLabels">
                        <BaseAttr name="show" attr="style.chart.labels.yAxisLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="color" attr="style.chart.labels.yAxisLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.labels.yAxisLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rounding" attr="style.chart.labels.yAxisLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetX" attr="style.chart.labels.yAxisLabels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="64" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="lzft" attr="style.chart.padding.left" type="number" defaultVal="64" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
                <BaseDetails attr="plots" :level="3" title="style.chart.plots">
                    <BaseAttr name="opacity" attr="style.chart.plots.opacity" type="range" defaultVal="0.5" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="radius" attr="style.chart.plots.radius" type="number" defaultVal="20" :min="2" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="stroke" attr="style.chart.plots.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.plots.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="shape" attr="style.chart.plots.shape" type="select" defaultVal="circle" :options="['circle', 'triangle', 'square', 'diamond', 'pentagon', 'hexagon', 'star']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="gradient" :level="4" title="style.chart.plots.gradient">
                        <BaseAttr name="show" attr="style.chart.plots.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="intensity" attr="style.chart.plots.gradient.intensity" type="range" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
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
                    <BaseAttr name="roundingValue" attr="style.chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                <BaseAttr name="labels" attr="userOptions.buttons.labels" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
                <BaseAttr name="labels" attr="userOptions.buttonTitles.labels" type="text" defaultVal="Toggle labels" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
              
            </template>
            <template #tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiStripPlot
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  function selectDatapoint(datapoint) {
    console.log({ datapoint })
  }
&lt;/script&gt;
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

            const stripPlotChart = ref(null);
            const stripPlotDataset = ref([]);

            onMounted(() => {
                stripPlotDataset.value = stripPlotChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStripPlot
                ref="stripPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStripPlot
                ref="stripPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        stripPlotDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.stripPlotDataset = this.$refs.stripPlotChart.getData();
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
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiStripPlot"
                    :types="[
                        'svg',
                        'tooltip-before',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background'
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
                <ThemesVueUiStripPlot />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiStripPlot 
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