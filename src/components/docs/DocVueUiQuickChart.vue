<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiQuickChart from "../themes/ThemesVueUiQuickChart.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";

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

const palette = ref([
    "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
    "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
    "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939",
    "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39",
    "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b",
    "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
]);

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const icons = ref([
    "spin",
    "circle",
    "circleFill",
    "hexagon",
    "hexagonFill",
    "pentagon",
    "pentagonFill",
    "square",
    "squareFill",
    "star",
    "starFill",
    "triangle",
    "triangleFill",
])

const quickDatasetDonut = ref([
    {
        name: 'serie1',
        value: 20,
    },
    {
        name: 'Serie 2',
        value: 10,
    },
    {
        name: 'Serie 3',
        value: 5,
    },
    {
        name: 'Serie 4',
        value: 2,
    },
    {
        name: 'Serie 5',
        value: 1,
    },
]);

const quickDatasetLine = ref([
    {
        name: 'Serie1',
        values: [1, 2, 3, 2, 3, 4, 3, 4, 5]
    },
    {
        name: 'Serie2',
        values: [5, 6, 7, 6, 7, 8, 7, 8, 9]
    },
    {
        name: 'Serie3',
        values: [1, 2, 3, 5, 8, 13, 21, 13, 8]
    },
])


const quickDatasetSimpleLine = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
const quickDatasetSimpleBar = ref([1, 2, -3, 5, 8])

const quickDatasetBar = ref([
    {
        name: 'Serie1',
        values: [1, 2, 3, 2, 3]
    },
    {
        name: 'Serie2',
        values: [5, 6, 7, 6, 7]
    },
    {
        name: 'Serie3',
        values: [1, 2, 3, 5, 8,]
    },
])

const config = ref({
    responsive: false,
    backgroundColor: "#FFFFFF",
    barAnimated: true,
    barGap: 12,
    barStrokeWidth: 1,
    blurOnHover: true,
    chartIsBarUnderDatasetLength: 6,
    color: "#2D353C",
    dataLabelFontSize: 14,
    dataLabelRoundingPercentage: 1,
    dataLabelRoundingValue: 1,
    donutHideLabelUnderPercentage: 3,
    donutLabelMarkerStrokeWidth: 1,
    donutRadiusRatio: 0.4,
    donutShowTotal: true,
    donutStrokeWidth: 2,
    donutThicknessRatio: 0.18,
    donutTotalLabelFontSize: 24,
    donutTotalLabelOffsetY: 0,
    donutTotalLabelText: "Total",
    donutUseShadow: false,
    donutShadowColor: '#1A1A1A',
    fontFamily: "inherit",
    height: 338,
    legendFontSize: 12,
    legendIcon: "circleFill",
    legendIconSize: 12,
    lineAnimated: true,
    lineSmooth: true,
    lineStrokeWidth: 2,
    paletteStartIndex: 0,
    showDataLabels: true,
    showLegend: true,
    showTooltip: true,
    showUserOptions: true,
    userOptionsButtons: {
        tooltip: true,
        pdf: true,
        img: true,
        fullscreen: true
    },
    userOptionsButtonTitles: {
        open: 'Open options',
        close: 'Close options',
        tooltip: 'Toggle tooltip',
        pdf: 'Download PDF',
        img: 'Download PNG',
        fullscreen: 'Toggle fullscreen'
    },
    title: "A quick chart",
    titleBold: true,
    titleFontSize: 16,
    titleTextAlign: "center",
    tooltipCustomFormat: null,
    tooltipBorderRadius: 4,
    tooltipBorderColor: '#e1e5e8',
    tooltipBorderWidth: 1,
    tooltipFontSize: 14,
    tooltipBackgroundOpacity: 90,
    useCustomLegend: false,
    valuePrefix: "",
    valueSuffix: "",
    width: 512,
    xyAxisStroke: "#CCCCCC",
    xyAxisStrokeWidth: 1,
    xyGridStroke: "#e1e5e8",
    xyGridStrokeWidth: 0.5,
    xyHighlighterColor: "#000000",
    xyHighlighterOpacity: 0.05,
    xyLabelsXFontSize: 8,
    xyLabelsYFontSize: 12,
    xyPaddingBottom: 48,
    xyPaddingLeft: 48,
    xyPaddingRight: 12,
    xyPaddingTop: 24,
    xyPeriods: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    xyPeriodLabelsRotation: 0,
    xyScaleSegments: 10,
    xyShowAxis: true,
    xyShowGrid: true,
    xyShowScale: true,
    yAxisLabel: 'Quantity',
    xAxisLabel: 'Time',
    axisLabelsFontSize: 12,
    zoomXy: true,
    zoomColor: '#CCCCCC',
    zoomHighlightColor: '#4A4A4A',
    zoomFontSize: 14,
    zoomUseResetSlot: false
})

const darkModeConfig = ref({
    responsive: false,
    backgroundColor: "#2A2A2A",
    barAnimated: true,
    barGap: 12,
    barStrokeWidth: 1,
    blurOnHover: true,
    chartIsBarUnderDatasetLength: 6,
    color: "#CCCCCC",
    dataLabelFontSize: 14,
    dataLabelRoundingPercentage: 1,
    dataLabelRoundingValue: 1,
    donutHideLabelUnderPercentage: 3,
    donutLabelMarkerStrokeWidth: 1,
    donutRadiusRatio: 0.4,
    donutShowTotal: true,
    donutStrokeWidth: 2,
    donutThicknessRatio: 0.18,
    donutTotalLabelFontSize: 24,
    donutTotalLabelOffsetY: 0,
    donutTotalLabelText: "Total",
    donutUseShadow: false,
    donutShadowColor: '#1A1A1A',
    fontFamily: "inherit",
    height: 338,
    legendFontSize: 12,
    legendIcon: "circleFill",
    legendIconSize: 12,
    lineAnimated: true,
    lineSmooth: true,
    lineStrokeWidth: 2,
    paletteStartIndex: 0,
    showDataLabels: true,
    showLegend: true,
    showTooltip: true,
    showUserOptions: true,
    userOptionsButtons: {
        tooltip: true,
        pdf: true,
        img: true,
        fullscreen: true
    },
    userOptionsButtonTitles: {
        open: 'Open options',
        close: 'Close options',
        tooltip: 'Toggle tooltip',
        pdf: 'Download PDF',
        img: 'Download PNG',
        fullscreen: 'Toggle fullscreen'
    },
    title: "A quick chart",
    titleBold: true,
    titleFontSize: 16,
    titleTextAlign: "center",
    tooltipCustomFormat: null,
    tooltipBorderRadius: 4,
    tooltipBorderColor: '#3A3A3A',
    tooltipBorderWidth: 1,
    tooltipFontSize: 14,
    tooltipBackgroundOpacity: 90,
    useCustomLegend: false,
    valuePrefix: "",
    valueSuffix: "",
    width: 512,
    xyAxisStroke: "#4A4A4A",
    xyAxisStrokeWidth: 1,
    xyGridStroke: "#5A5A5A",
    xyGridStrokeWidth: 0.5,
    xyHighlighterColor: "#FFFFFF",
    xyHighlighterOpacity: 0.05,
    xyLabelsXFontSize: 8,
    xyLabelsYFontSize: 12,
    xyPaddingBottom: 48,
    xyPaddingLeft: 48,
    xyPaddingRight: 12,
    xyPaddingTop: 24,
    xyPeriods: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    xyPeriodLabelsRotation: 0,
    xyScaleSegments: 10,
    xyShowAxis: true,
    xyShowGrid: true,
    xyShowScale: true,
    yAxisLabel: 'Quantity',
    xAxisLabel: 'Time',
    axisLabelsFontSize: 12,
    zoomXy: true,
    zoomColor: '#CCCCCC',
    zoomHighlightColor: '#4A4A4A',
    zoomFontSize: 14,
    zoomUseResetSlot: false
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
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="vueDataUi" stroke="#42d392" :strokeWidth="1.5" />
            VueUiQuickChart
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-4 text-center">
            {{ translations.docs.tooltips.quickChart[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-full'}`">
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
                <div class="w-full p-2 flex flex-col gap-2 rounded bg-white shadow dark:bg-[#2A2A2A]">
                    <Suspense>
                        <template #default>
                            <VueUiQuickChart :dataset="quickDatasetSimpleLine" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                                <template #reset-action="{ reset }">
                                    <button @click="reset()">CUSTOM RESET</button>
                                </template>
                            </VueUiQuickChart>
                        </template>
                        <template #fallback>
                            <BaseSpinner/>
                        </template>
                    </Suspense>

                <code class="text-xs rounded bg-gray-200 dark:bg-[#1A1A1A] p-2 text-black dark:text-[#A1A1A1]">
                    const dataset = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
                </code>

                <VueDataUi component="VueUiAccordion" :config="{
                    head: {
                        useArrowSlot: true,
                        backgroundColor: 'transparent'
                    },
                    body: {
                        backgroundColor: isDarkMode ? '#1A1A1A' : 'rgb(229, 231, 235)',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                    }
                }">
                    <template #arrow="{ iconColor }">
                        <VueUiIcon name="arrowRight" :size="10" :stroke="iconColor"/>
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div style="background:transparent" class="p-2">
                            <code class="text-[10px]">
                                &lt;script setup&gt;<br>
                                &nbsp;&nbsp;import { ref } from "vue";<br>
                                &nbsp;&nbsp;import { VueUiQuickChart } from "vue-data-ui";<br>
                                &nbsp;&nbsp;import "vue-data-ui/style.css";<br><br>
                                &nbsp;&nbsp;const dataset = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);<br><br>
                                &nbsp;&nbsp;const config = ref({{ isDarkMode ? mutableConfigDarkMode : mutableConfig }});<br>
                                &lt;/script&gt;<br><br>
                                
                                &lt;template&gt;<br>
                                &nbsp;&nbsp;&lt;div style="width: 500px"&gt;<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiQuickChart<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:dataset="dataset"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:config="config"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
                                &nbsp;&nbsp;&lt/div&gt;<br>
                                &lt;/template&gt;
                            </code>
                        </div>
                    </template>
                </VueDataUi>                     
                
            </div>
            <div class="w-full p-2 flex flex-col gap-2 rounded bg-white shadow dark:bg-[#2A2A2A]">
                <Suspense>
                    <template #default>
                        <VueUiQuickChart :dataset="quickDatasetSimpleBar" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>
                <code class="text-xs rounded bg-gray-200 dark:bg-[#1A1A1A] p-2 text-black dark:text-[#A1A1A1]">
                    const dataset = ref([1, 2, -3, 5, 8])
                </code>
                <VueDataUi component="VueUiAccordion" :config="{
                    head: {
                        useArrowSlot: true,
                        backgroundColor: 'transparent'
                    },
                    body: {
                        backgroundColor: isDarkMode ? '#1A1A1A' : 'rgb(229, 231, 235)',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                    }
                }">
                    <template #arrow="{ iconColor }">
                        <VueUiIcon name="arrowRight" :size="10" :stroke="iconColor"/>
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div style="background:transparent" class="p-2">
                            <code class="text-[10px]">
                                &lt;script setup&gt;<br>
                                &nbsp;&nbsp;import { ref } from "vue";<br>
                                &nbsp;&nbsp;import { VueUiQuickChart } from "vue-data-ui";<br>
                                &nbsp;&nbsp;import "vue-data-ui/style.css";<br><br>
                                &nbsp;&nbsp;const dataset = ref([1, 2, -3, 5, 8]);<br><br>
                                &nbsp;&nbsp;const config = ref({{ isDarkMode ? mutableConfigDarkMode : mutableConfig }});<br>
                                &lt;/script&gt;<br><br>
                                
                                &lt;template&gt;<br>
                                &nbsp;&nbsp;&lt;div style="width: 500px"&gt;<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiQuickChart<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:dataset="dataset"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:config="config"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
                                &nbsp;&nbsp;&lt/div&gt;<br>
                                &lt;/template&gt;
                            </code>
                        </div>
                    </template>
                </VueDataUi>                          
            </div>
            <div class="w-full p-2 flex flex-col gap-2 rounded bg-white shadow dark:bg-[#2A2A2A]">
                <Suspense>
                    <template #default>
                        <VueUiQuickChart :dataset="quickDatasetLine" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>
                <code class="text-xs rounded bg-gray-200 dark:bg-[#1A1A1A] p-2 text-black dark:text-[#A1A1A1]">
                    const dataset = ref([<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie1',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;values: [1, 2, 3, 2, 3, 4, 3, 4, 5]<br>
                    &nbsp;&nbsp;},<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie2',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;values: [5, 6, 7, 6, 7, 8, 7, 8, 9]<br>
                    &nbsp;&nbsp;},<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie3',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;values: [1, 2, 3, 5, 8, 13, 21, 13, 8]<br>
                    &nbsp;&nbsp;},<br>
                    ])
                </code>
                <VueDataUi component="VueUiAccordion" :config="{
                    head: {
                        useArrowSlot: true,
                        backgroundColor: 'transparent'
                    },
                    body: {
                        backgroundColor: isDarkMode ? '#1A1A1A' : 'rgb(229, 231, 235)',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                    }
                }">
                    <template #arrow="{ iconColor }">
                        <VueUiIcon name="arrowRight" :size="10" :stroke="iconColor"/>
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div style="background:transparent" class="p-2">
                            <code class="text-[10px]">
                                &lt;script setup&gt;<br>
                                &nbsp;&nbsp;import { ref } from "vue";<br>
                                &nbsp;&nbsp;import { VueUiQuickChart } from "vue-data-ui";<br>
                                &nbsp;&nbsp;import "vue-data-ui/style.css";<br><br>
                                &nbsp;&nbsp;const dataset = ref([<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie1',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values: [1, 2, 3, 2, 3, 4, 3, 4, 5]<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie2',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values: [5, 6, 7, 6, 7, 8, 7, 8, 9]<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie3',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values: [1, 2, 3, 5, 8, 13, 21, 13, 8]<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;]);<br><br>
                                &nbsp;&nbsp;const config = ref({{ isDarkMode ? mutableConfigDarkMode : mutableConfig }});<br>
                                &lt;/script&gt;<br><br>
                                
                                &lt;template&gt;<br>
                                &nbsp;&nbsp;&lt;div style="width: 500px"&gt;<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiQuickChart<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:dataset="dataset"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:config="config"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
                                &nbsp;&nbsp;&lt/div&gt;<br>
                                &lt;/template&gt;
                            </code>
                        </div>
                    </template>
                </VueDataUi>                  
            </div>
            <div class="w-full p-2 flex flex-col gap-2 rounded bg-white shadow dark:bg-[#2A2A2A]">
                <Suspense>
                    <template #default>
                        <VueUiQuickChart :dataset="quickDatasetDonut" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>
                <code class="text-xs rounded bg-gray-200 dark:bg-[#1A1A1A] p-2 text-black dark:text-[#A1A1A1]">
                    const dataset = ref([<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie1',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;value: 10<br>
                    &nbsp;&nbsp;},<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie2',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;value: 20<br>
                    &nbsp;&nbsp;},<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie3',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;value: 5<br>
                    &nbsp;&nbsp;},<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie4',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;value: 2<br>
                    &nbsp;&nbsp;},<br>
                    &nbsp;&nbsp;{<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie5',<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;value: 1<br>
                    &nbsp;&nbsp;},<br>
                    ])
                </code>
                <VueDataUi component="VueUiAccordion" :config="{
                    head: {
                        useArrowSlot: true,
                        backgroundColor: 'transparent'
                    },
                    body: {
                        backgroundColor: isDarkMode ? '#1A1A1A' : 'rgb(229, 231, 235)',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                    }
                }">
                    <template #arrow="{ iconColor }">
                        <VueUiIcon name="arrowRight" :size="10" :stroke="iconColor"/>
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div style="background:transparent" class="p-2">
                            <code class="text-[10px]">
                                &lt;script setup&gt;<br>
                                &nbsp;&nbsp;import { ref } from "vue";<br>
                                &nbsp;&nbsp;import { VueUiQuickChart } from "vue-data-ui";<br>
                                &nbsp;&nbsp;import "vue-data-ui/style.css";<br><br>
                                &nbsp;&nbsp;const dataset = ref([<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie1',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: 10<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie2',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: 20<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie3',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: 5<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie4',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: 2<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;{<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Serie5',<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: 1<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;},<br>
                                &nbsp;&nbsp;])<br><br>
                                &nbsp;&nbsp;const config = ref({{ isDarkMode ? mutableConfigDarkMode : mutableConfig }});<br>
                                &lt;/script&gt;<br><br>
                                
                                &lt;template&gt;<br>
                                &nbsp;&nbsp;&lt;div style="width: 500px"&gt;<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiQuickChart<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:dataset="dataset"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:config="config"<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
                                &nbsp;&nbsp;&lt/div&gt;<br>
                                &lt;/template&gt;
                            </code>
                        </div>
                    </template>
                </VueDataUi>                         
            </div>
        </div>

        <BaseDocActions
            targetLink="vue-ui-quick-chart"
            :configSource="mainConfig.vue_ui_quick_chart"
        />

        <Box showSlots showTooltip showEmits showThemes showResponsive schema="vue_ui_quick_chart">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiQuickChartDataset</code>
                </div>
                <div class="my-4">{{ translations.docs.comments.quickChart[store.lang] }}</div>
                <div class="my-4">{{ translations.docs.comments.quickChartKeys[store.lang] }}</div>

                <div class="my-4 flex flex-row gap-8">
                    <div>
                        <div class="mb-2 pb-2 border-b border-gray-500">Object keys for names:</div>
                        <ul class="text-gray-500">
                            <li><code>description</code></li>
                            <li><code>label</code></li>
                            <li><code>name</code></li>
                            <li><code>title</code></li>
                        </ul>
                    </div>
                    <div>
                        <div class="mb-2 pb-2 border-b border-gray-500">Object keys for data:</div>
                        <ul class="text-gray-500">
                            <li><code>data</code></li>
                            <li><code>num</code></li>
                            <li><code>serie</code></li>
                            <li><code>series</code></li>
                            <li><code>value</code></li>
                            <li><code>values</code></li>
                        </ul>
                    </div>
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiQuickChartConfig</code>
                </div>
<pre>
<code>
const <span class="text-app-blue">config: VueUiQuickChartConfig</span> = {
    responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span>
    theme: ""; ("zen" | "hack" | "concrete" | "")
    axisLabelsFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.axisLabelsFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.axisLabelsFontSize" :min="8" :max="42"/>, (default: 12)
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.backgroundColor"><input v-else type="color" v-model="mutableConfig.backgroundColor">, (default: "#FFFFFF")
    barAnimated: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.barAnimated" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.barAnimated" @change="forceChartUpdate()">, (default: true)
    barGap:  <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.barGap" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.barGap" :min="0" :max="24"/>, (default: 12)
    barStrokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.barStrokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.barStrokeWidth" :min="0" :max="12"/>, (default: 1)
    blurOnHover: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.blurOnHover" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.blurOnHover" @change="forceChartUpdate()">, (default: true)
    chartIsBarUnderDatasetLength: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chartIsBarUnderDatasetLength" :min="1" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.chartIsBarUnderDatasetLength" :min="1" :max="12"/>, (default: 6)
    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.color"><input v-else type="color" v-model="mutableConfig.color">, (default: "#2D353C")
    customPalette: []; <span class="text-app-blue break-keep text-xs">// string[]</span>
    dataLabelFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.dataLabelFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.dataLabelFontSize" :min="8" :max="42"/>, (default: 14)
    dataLabelRoundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.dataLabelRoundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.dataLabelRoundingPercentage" :min="0" :max="6"/>, (default: 1)
    dataLabelRoundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.dataLabelRoundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.dataLabelRoundingValue" :min="0" :max="6"/>, (default: 0)
    donutHideLabelUnderPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.donutHideLabelUnderPercentage" :min="0" :max="10"/><BaseNumberInput v-else v-model:value="mutableConfig.donutHideLabelUnderPercentage" :min="0" :max="10"/>, (default: 3)
    donutLabelMarkerStrokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.donutLabelMarkerStrokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.donutLabelMarkerStrokeWidth" :min="0" :max="12"/>, (default: 1)
    donutRadiusRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.2" step="0.01" max="0.5" v-model="mutableConfigDarkMode.donutRadiusRatio"><input v-else type="range" class="accent-app-blue" min="0.2" step="0.01" max="0.5" v-model="mutableConfig.donutRadiusRatio">, (default: 0.4)
    donutShowTotal: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.donutShowTotal" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.donutShowTotal" @change="forceChartUpdate()">, (default: true)
    donutStrokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.donutStrokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.donutStrokeWidth" :min="0" :max="12"/>, (default: 2)
    donutThicknessRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.05" step="0.01" max="0.4" v-model="mutableConfigDarkMode.donutThicknessRatio"><input v-else type="range" class="accent-app-blue" min="0.01" step="0.01" max="0.4" v-model="mutableConfig.donutThicknessRatio">, (default: 0.18)
    donutTotalLabelFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.donutTotalLabelFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.donutTotalLabelFontSize" :min="8" :max="42"/>, (default: 24)
    donutTotalLabelText: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.donutTotalLabelText"><input v-else type="text" v-model="mutableConfig.donutTotalLabelText">, (default: "Total")
    donutUseShadow: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.donutUseShadow" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.donutUseShadow" @change="forceChartUpdate()">, (default: false)
    donutShadowColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.donutShadowColor"><input v-else type="color" v-model="mutableConfig.donutShadowColor">, (default: "#2D353C")
    fontFamily: "inherit",
    height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="100" max="600" v-model="mutableConfigDarkMode.height"><input v-else type="range" class="accent-app-blue" min="100" max="600" v-model="mutableConfig.height">, (default: 338)
    legendFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.legendFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.legendFontSize" :min="8" :max="42"/>, (default: 12)
    legendIcon: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.legendIcon"><option v-for="i in icons">{{ i }}</option></select><select v-else v-model="mutableConfig.legendIcon"><option v-for="i in icons">{{ i }}</option></select> ,(default: "circleFill")
    legendIconSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.legendIconSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.legendIconSize" :min="8" :max="42"/>, (default: 12)
    lineAnimated: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.lineAnimated" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.lineAnimated" @change="forceChartUpdate()">, (default: true)
    lineSmooth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.lineSmooth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.lineSmooth" @change="forceChartUpdate()">, (default: true)
    lineStrokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.lineStrokeWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.lineStrokeWidth" :min="0" :max="24"/>, (default: 2)
    paletteStartIndex: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.paletteStartIndex" :min="0" :max="39"/><BaseNumberInput v-else v-model:value="mutableConfig.paletteStartIndex" :min="0" :max="39"/>, (default: 0) <template v-if="isDarkMode"><div class="inline-flex border border-black" v-for="(_,i) in 6" :style="{ background: palette[mutableConfigDarkMode.paletteStartIndex + i], height: '18px', width: '18px', borderRadius: '50%'}"/></template><template v-else><div class="inline-flex border border-white" v-for="(_,i) in 6" :style="{ background: palette[mutableConfig.paletteStartIndex + i], height: '18px', width: '18px', borderRadius: '50%'}"/></template>
    showDataLabels: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showDataLabels" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showDataLabels" @change="forceChartUpdate()">, (default: true)
    showLegend: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showLegend" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showLegend" @change="forceChartUpdate()">, (default: true)
    showTooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showTooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showTooltip" @change="forceChartUpdate()">, (default: true)
    showUserOptions: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showUserOptions" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showUserOptions" @change="forceChartUpdate()">, (default: true)
    userOptionsButtons: {
        tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptionsButtons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptionsButtons.tooltip" @change="forceChartUpdate()">, (default: true)
        pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptionsButtons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptionsButtons.pdf" @change="forceChartUpdate()">, (default: true)
        img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptionsButtons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptionsButtons.img" @change="forceChartUpdate()">, (default: true)
        fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptionsButtons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptionsButtons.fullscreen" @change="forceChartUpdate()">, (default: true)
    },
    userOptionsButtonTitles: {
        open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptionsButtonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptionsButtonTitles.open">, (default: "Open options")
        close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptionsButtonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptionsButtonTitles.close">, (default: "Close options")
        tooltip: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptionsButtonTitles.tooltip"><input v-else type="text" v-model="mutableConfig.userOptionsButtonTitles.tooltip">, (default: "Toggle tooltip")
        pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptionsButtonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptionsButtonTitles.pdf">, (default: "Download PDF")
        img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptionsButtonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptionsButtonTitles.img">, (default: "Download PNG")
        fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptionsButtonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptionsButtonTitles.fullscreen">, (default: "Toggle fullscreen")
    },
    title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.title"><input v-else type="text" v-model="mutableConfig.title">, (default: "")
    titleBold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.titleBold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.titleBold" @change="forceChartUpdate()">, (default: true)
    titleFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.titleFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.titleFontSize" :min="8" :max="42"/>, (default: 16)
    titleTextAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.titleTextAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.titleTextAlign"><option>left</option><option>center</option><option>right</option></select>,
    tooltipCustomFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
    tooltipBorderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tooltipBorderRadius" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.tooltipBorderRadius" :min="0" :max="24"/>, (default: 4)
    tooltipBorderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.tooltipBorderColor"><input v-else type="color" v-model="mutableConfig.tooltipBorderColor">, (default: "#e1e5e8"),
    tooltipBorderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tooltipBorderWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.tooltipBorderWidth" :min="0" :max="24"/>, (default: 1)
    useCustomLegend: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCustomLegend" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCustomLegend" @change="forceChartUpdate()">, (default: false) // Use #legend slot to make a custom legend
    tooltipFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tooltipFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.tooltipFontSize" :min="8" :max="42"/>, (default: 14)
    tooltipBackgroundOpacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.tooltipBackgroundOpacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.tooltipBackgroundOpacity">, (default: 100)
    valuePrefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.valuePrefix"><input v-else type="text" v-model="mutableConfig.valuePrefix">, (default: "")
    valueSuffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.valueSuffix"><input v-else type="text" v-model="mutableConfig.valueSuffix">, (default: "")
    width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="200" max="1000" v-model="mutableConfigDarkMode.width"><input v-else type="range" class="accent-app-blue" min="200" max="1000" v-model="mutableConfig.width">, (default: 512)
    xAxisLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.xAxisLabel"><input v-else type="text" v-model="mutableConfig.xAxisLabel">, (default: "")
    xyAxisStroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.xyAxisStroke"><input v-else type="color" v-model="mutableConfig.xyAxisStroke">, (default: "#CCCCCC")
    xyAxisStrokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyAxisStrokeWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.xyAxisStrokeWidth" :min="0" :max="24"/>, (default: 1)
    xyGridStroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.xyGridStroke"><input v-else type="color" v-model="mutableConfig.xyGridStroke">,  (default: "#e1e5e8")
    xyGridStrokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyGridStrokeWidth" :min="0" :max="24" :step="0.1"/><BaseNumberInput v-else v-model:value="mutableConfig.xyGridStrokeWidth" :min="0" :max="24" :step="0.1"/>, (default: 0.5)
    xyHighlighterColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.xyHighlighterColor"><input v-else type="color" v-model="mutableConfig.xyHighlighterColor">,  (default: "#000000")
    xyHighlighterOpacity: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.xyHighlighterOpacity"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.xyHighlighterOpacity">, (default: 0.05)
    xyLabelsXFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyLabelsXFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.xyLabelsXFontSize" :min="8" :max="42"/>, (default: 8)
    xyLabelsYFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyLabelsYFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.xyLabelsYFontSize" :min="8" :max="42"/>, (default: 12)
    xyPaddingBottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyPaddingBottom" :min="0" :max="48"/><BaseNumberInput v-else v-model:value="mutableConfig.xyPaddingBottom" :min="0" :max="48"/>, (default: 24)
    xyPaddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyPaddingLeft" :min="0" :max="48"/><BaseNumberInput v-else v-model:value="mutableConfig.xyPaddingLeft" :min="0" :max="48"/>, (default: 24)
    xyPaddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyPaddingRight" :min="0" :max="48"/><BaseNumberInput v-else v-model:value="mutableConfig.xyPaddingRight" :min="0" :max="48"/>, (default: 12)
    xyPaddingTop: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyPaddingTop" :min="0" :max="48"/><BaseNumberInput v-else v-model:value="mutableConfig.xyPaddingTop" :min="0" :max="48"/>, (default: 24)
    xyPeriods: [], <span class="text-app-blue text-xs">// Array&lt;string | number&gt;</span> 
    xyPeriodLabelsRotation: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyPeriodLabelsRotation" :min="-360" :max="360"/><BaseNumberInput v-else v-model:value="mutableConfig.xyPeriodLabelsRotation" :min="-360" :max="360"/>, (default: 0)
    xyScaleSegments: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.xyScaleSegments" :min="0" :max="20"/><BaseNumberInput v-else v-model:value="mutableConfig.xyScaleSegments" :min="0" :max="20"/>, (default: 10)
    xyShowAxis: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.xyShowAxis" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.xyShowAxis" @change="forceChartUpdate()">, (default: true)
    xyShowGrid: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.xyShowGrid" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.xyShowGrid" @change="forceChartUpdate()">, (default: true)
    xyShowScale: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.xyShowScale" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.xyShowScale" @change="forceChartUpdate()">, (default: true)
    yAxisLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.yAxisLabel"><input v-else type="text" v-model="mutableConfig.yAxisLabel">, (default: "")
    zoomXy: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.zoomXy" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.zoomXy" @change="forceChartUpdate()">, (default: true)
    zoomColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.zoomColor"><input v-else type="color" v-model="mutableConfig.zoomColor">,  (default: "#CCCCCC")
    zoomHighlightColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.zoomHighlightColor"><input v-else type="color" v-model="mutableConfig.zoomHighlightColor">,  (default: "#4A4A4A")
    zoomFontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.zoomFontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.zoomFontSize" :min="8" :max="42"/>, (default: 14)
    zoomUseResetSlot: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.zoomUseResetSlot" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.zoomUseResetSlot" @change="forceChartUpdate()">, (default: false)
}
</code>
</pre>                
            </template>
            <template #tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiQuickChart
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint}) {
    console.log({ datapoint })
  }
&lt;/script&gt;
</code>
</pre>

                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
            </template>
            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiQuickChart
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiQuickChart&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiQuickChart
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiQuickChart&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiQuickChart
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiQuickChart&gt;
</code>
</pre>
            </template>
            <template #tab4>
                <pre>
<code>
<span class="text-gray-400">config.tooltipCustomFormat</span>

tooltipCustomFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
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
                <ThemesVueUiQuickChart />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiQuickChart 
                            :dataset="quickDatasetSimpleLine" 
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