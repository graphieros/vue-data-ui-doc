<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import ThemesVueUiQuickChart from "../themes/ThemesVueUiQuickChart.vue";
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
    title: "A quick chart",
    titleBold: true,
    titleFontSize: 16,
    titleTextAlign: "center",
    tooltipCustomFormat: null,
    tooltipBorderRadius: 4,
    tooltipBorderColor: '#e1e5e8',
    tooltipBorderWidth: 1,
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
    title: "A quick chart",
    titleBold: true,
    titleFontSize: 16,
    titleTextAlign: "center",
    tooltipCustomFormat: null,
    tooltipBorderRadius: 4,
    tooltipBorderColor: '#3A3A3A',
    tooltipBorderWidth: 1,
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
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-full'}`">
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
                <div class="w-full p-2 flex flex-col gap-2 rounded bg-white shadow dark:bg-[#2A2A2A]">
                    <VueUiQuickChart :dataset="quickDatasetSimpleLine" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                        <template #reset-action="{ reset }">
                            <button @click="reset()">CUSTOM RESET</button>
                        </template>
                    </VueUiQuickChart>

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
                <VueUiQuickChart :dataset="quickDatasetSimpleBar" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
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
                <VueUiQuickChart :dataset="quickDatasetLine" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
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
                <VueUiQuickChart :dataset="quickDatasetDonut" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
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
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_quick_chart)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-quick-chart"/>
        </div>
        <Box showSlots showTooltip showEmits showThemes showResponsive>
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
    responsive: false; <span class="text-app-orange break-keep text-xs">// {{ translations.responsive[store.lang] }}</span>
    theme: ""; ("zen" | "hack" | "concrete" | "")
    axisLabelsFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.axisLabelsFontSize"><input v-else type="range" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.axisLabelsFontSize">, (default: 12)
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.backgroundColor"><input v-else type="color" v-model="mutableConfig.backgroundColor">, (default: "#FFFFFF")
    barAnimated: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.barAnimated" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.barAnimated" @change="forceChartUpdate()">, (default: true)
    barGap: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="64" v-model="mutableConfigDarkMode.barGap"><input v-else type="range" class="accent-app-blue" min="0" max="64" v-model="mutableConfig.barGap">, (default: 12)
    barStrokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" v-model="mutableConfigDarkMode.barStrokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" v-model="mutableConfig.barStrokeWidth">, (default: 1)
    blurOnHover: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.blurOnHover" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.blurOnHover" @change="forceChartUpdate()">, (default: true)
    chartIsBarUnderDatasetLength: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" v-model="mutableConfigDarkMode.chartIsBarUnderDatasetLength"><input v-else type="range" class="accent-app-blue" min="0" max="12" v-model="mutableConfig.chartIsBarUnderDatasetLength">, (default: 6)
    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.color"><input v-else type="color" v-model="mutableConfig.color">, (default: "#2D353C")
    customPalette: []; // string[]
    dataLabelFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.dataLabelFontSize"><input v-else type="range" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.dataLabelFontSize">, (default: 14)
    dataLabelRoundingPercentage: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="3" v-model="mutableConfigDarkMode.dataLabelRoundingPercentage"><input v-else type="range" class="accent-app-blue" min="0" max="3" v-model="mutableConfig.dataLabelRoundingPercentage">, (default: 1)
    dataLabelRoundingValue: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="3" v-model="mutableConfigDarkMode.dataLabelRoundingValue"><input v-else type="range" class="accent-app-blue" min="0" max="3" v-model="mutableConfig.dataLabelRoundingValue">, (default: 0)
    donutHideLabelUnderPercentage: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="10" v-model="mutableConfigDarkMode.donutHideLabelUnderPercentage"><input v-else type="range" class="accent-app-blue" min="0" max="10" v-model="mutableConfig.donutHideLabelUnderPercentage">, (default: 3)
    donutLabelMarkerStrokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" v-model="mutableConfigDarkMode.donutLabelMarkerStrokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" v-model="mutableConfig.donutLabelMarkerStrokeWidth">, (default: 1)
    donutRadiusRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.2" step="0.01" max="0.5" v-model="mutableConfigDarkMode.donutRadiusRatio"><input v-else type="range" class="accent-app-blue" min="0.2" step="0.01" max="0.5" v-model="mutableConfig.donutRadiusRatio">, (default: 0.4)
    donutShowTotal: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.donutShowTotal" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.donutShowTotal" @change="forceChartUpdate()">, (default: true)
    donutStrokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" v-model="mutableConfigDarkMode.donutStrokeWidth"><input v-else type="number" class="accent-app-blue" min="0" max="12" v-model="mutableConfig.donutStrokeWidth">, (default: 2)
    donutThicknessRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.05" step="0.01" max="0.4" v-model="mutableConfigDarkMode.donutThicknessRatio"><input v-else type="range" class="accent-app-blue" min="0.01" step="0.01" max="0.4" v-model="mutableConfig.donutThicknessRatio">, (default: 0.18)
    donutTotalLabelFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.donutTotalLabelFontSize"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.donutTotalLabelFontSize">, (default: 24)
    donutTotalLabelText: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.donutTotalLabelText"><input v-else type="text" v-model="mutableConfig.donutTotalLabelText">, (default: "Total")
    donutUseShadow: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.donutUseShadow" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.donutUseShadow" @change="forceChartUpdate()">, (default: false)
    donutShadowColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.donutShadowColor"><input v-else type="color" v-model="mutableConfig.donutShadowColor">, (default: "#2D353C")
    fontFamily: "inherit",
    height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="100" max="600" v-model="mutableConfigDarkMode.height"><input v-else type="range" class="accent-app-blue" min="100" max="600" v-model="mutableConfig.height">, (default: 338)
    legendFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.legendFontSize"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.legendFontSize">, (default: 12)
    legendIcon: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.legendIcon"><option v-for="i in icons">{{ i }}</option></select><select v-else v-model="mutableConfig.legendIcon"><option v-for="i in icons">{{ i }}</option></select> ,(default: "circleFill")
    legendIconSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.legendIconSize"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.legendIconSize">, (default: 12)
    lineAnimated: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.lineAnimated" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.lineAnimated" @change="forceChartUpdate()">, (default: true)
    lineSmooth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.lineSmooth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.lineSmooth" @change="forceChartUpdate()">, (default: true)
    lineStrokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfigDarkMode.lineStrokeWidth"><input v-else type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfig.lineStrokeWidth">, (default: 2)
    paletteStartIndex: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="39" v-model="mutableConfigDarkMode.paletteStartIndex"><input v-else type="number" class="accent-app-blue" min="0" max="39" v-model="mutableConfig.paletteStartIndex">, (default: 0)
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
    title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.title"><input v-else type="text" v-model="mutableConfig.title">, (default: "")
    titleBold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.titleBold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.titleBold" @change="forceChartUpdate()">, (default: true)
    titleFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.titleFontSize"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.titleFontSize">, (default: 16)
    titleTextAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.titleTextAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.titleTextAlign"><option>left</option><option>center</option><option>right</option></select>,
    tooltipCustomFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
    tooltipBorderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.tooltipBorderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.tooltipBorderRadius" @change="forceChartUpdate()">, (default: 4)
    tooltipBorderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.tooltipBorderColor"><input v-else type="color" v-model="mutableConfig.tooltipBorderColor">, (default: "#e1e5e8"),
    tooltipBorderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.tooltipBorderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.tooltipBorderWidth" @change="forceChartUpdate()">, (default: 1)
    useCustomLegend: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCustomLegend" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCustomLegend" @change="forceChartUpdate()">, (default: false) // Use #legend slot to make a custom legend
    valuePrefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.valuePrefix"><input v-else type="text" v-model="mutableConfig.valuePrefix">, (default: "")
    valueSuffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.valueSuffix"><input v-else type="text" v-model="mutableConfig.valueSuffix">, (default: "")
    width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="200" max="1000" v-model="mutableConfigDarkMode.width"><input v-else type="range" class="accent-app-blue" min="200" max="1000" v-model="mutableConfig.width">, (default: 512)
    xAxisLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.xAxisLabel"><input v-else type="text" v-model="mutableConfig.xAxisLabel">, (default: "")
    xyAxisStroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.xyAxisStroke"><input v-else type="color" v-model="mutableConfig.xyAxisStroke">, (default: "#CCCCCC")
    xyAxisStrokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfigDarkMode.xyAxisStrokeWidth"><input v-else type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfig.xyAxisStrokeWidth">, (default: 1)
    xyGridStroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.xyGridStroke"><input v-else type="color" v-model="mutableConfig.xyGridStroke">,  (default: "#e1e5e8")
    xyGridStrokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfigDarkMode.xyGridStrokeWidth"><input v-else type="number" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfig.xyGridStrokeWidth">, (default: 0.5)
    xyHighlighterColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.xyHighlighterColor"><input v-else type="color" v-model="mutableConfig.xyHighlighterColor">,  (default: "#000000")
    xyHighlighterOpacity: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.xyHighlighterOpacity"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.xyHighlighterOpacity">, (default: 0.05)
    xyLabelsXFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.xyLabelsXFontSize"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.xyLabelsXFontSize">, (default: 8)
    xyLabelsYFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.xyLabelsYFontSize"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.xyLabelsYFontSize">, (default: 12)
    xyPaddingBottom: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfigDarkMode.xyPaddingBottom"><input v-else type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfig.xyPaddingBottom">, (default: 24)
    xyPaddingLeft: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfigDarkMode.xyPaddingLeft"><input v-else type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfig.xyPaddingLeft">, (default: 24)
    xyPaddingRight: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfigDarkMode.xyPaddingRight"><input v-else type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfig.xyPaddingRight">, (default: 12)
    xyPaddingTop: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfigDarkMode.xyPaddingTop"><input v-else type="number" class="accent-app-blue" min="0" max="48" v-model="mutableConfig.xyPaddingTop">, (default: 24)
    xyPeriods: [], (Array&lt;string | number&gt;)
    xyPeriodLabelsRotation: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="-360" max="360" v-model="mutableConfigDarkMode.xyPeriodLabelsRotation"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.xyPeriodLabelsRotation">, (default: 0)
    xyScaleSegments: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="20" v-model="mutableConfigDarkMode.xyScaleSegments"><input v-else type="number" class="accent-app-blue" min="0" max="20" v-model="mutableConfig.xyScaleSegments">, (default: 10)
    xyShowAxis: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.xyShowAxis" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.xyShowAxis" @change="forceChartUpdate()">, (default: true)
    xyShowGrid: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.xyShowGrid" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.xyShowGrid" @change="forceChartUpdate()">, (default: true)
    xyShowScale: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.xyShowScale" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.xyShowScale" @change="forceChartUpdate()">, (default: true)
    yAxisLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.yAxisLabel"><input v-else type="text" v-model="mutableConfig.yAxisLabel">, (default: "")
    zoomXy: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.zoomXy" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.zoomXy" @change="forceChartUpdate()">, (default: true)
    zoomColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.zoomColor"><input v-else type="color" v-model="mutableConfig.zoomColor">,  (default: "#CCCCCC")
    zoomHighlightColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.zoomHighlightColor"><input v-else type="color" v-model="mutableConfig.zoomHighlightColor">,  (default: "#4A4A4A")
    zoomFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfigDarkMode.zoomFontSize"><input v-else type="number" class="accent-app-blue" min="6" max="48" v-model="mutableConfig.zoomFontSize">, (default: 14)
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