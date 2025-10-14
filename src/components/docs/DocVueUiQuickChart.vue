<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiQuickChart from "../themes/ThemesVueUiQuickChart.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import Rater from "../Rater.vue";
import CodeParser from "../customization/CodeParser.vue";
import { jsonToJsObject, copyCode } from "../maker/lib";
import BaseDocTitle from "../BaseDocTitle.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import BaseTabLink from "../BaseTabLink.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

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
});

const monthValues = computed(() => {
    const yearStart = 2026;
    const arr = [];
    for (let i = 0; i < 21; i += 1) {
        const d = new Date(yearStart, i, 1);
        arr.push(d.getTime());
    }
    return arr;
});

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
        name: 'Serie2',
        value: 10,
    },
    {
        name: 'Serie3',
        value: 5,
    },
    {
        name: 'Serie4',
        value: 2,
    },
    {
        name: 'Serie5',
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
    debug: false,
    loading: false,
    responsive: false,
    backgroundColor: "#f3f4f6",
    barAnimated: true,
    barGap: 12,
    barStrokeWidth: 1,
    blurOnHover: true,
    chartIsBarUnderDatasetLength: 6,
    color: "#2D353C",
    dataLabelFontSize: 14,
    dataLabelRoundingPercentage: 1,
    dataLabelRoundingValue: 1,
    donutCurvedMarkers: true,
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
    legendPosition: 'bottom',
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
        fullscreen: true,
        annotator: true,
    },
    userOptionsButtonTitles: {
        open: 'Open options',
        close: 'Close options',
        tooltip: 'Toggle tooltip',
        pdf: 'Download PDF',
        img: 'Download PNG',
        fullscreen: 'Toggle fullscreen',
        annotator: 'Toggle annotator'
    },
    userOptionsPrint: {
        scale: 2,
        overflowTolerance: 0.2,
        orientation: 'auto'
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
    tooltipBackgroundOpacity: 30,
    tooltipPosition: 'center',
    tooltipOffsetY: 24,
    tooltipSmooth: true,
    tooltipSmoothForce: 0.18,
    tooltipSmoothSnapThreshold: 0.25,
    useCustomLegend: false,
    valuePrefix: "",
    valueSuffix: "",
    width: 512,
    xyAxisStroke: "#CCCCCC",
    xyAxisStrokeWidth: 1,
    xyGridStroke: "#d4d4d8",
    xyGridStrokeWidth: 0.5,
    xyHighlighterColor: "#000000",
    xyHighlighterOpacity: 0.05,
    xyLabelsXFontSize: 8,
    xyLabelsYFontSize: 12,
    xyPaddingBottom: 24,
    xyPaddingLeft: 24,
    xyPaddingRight: 12,
    xyPaddingTop: 24,
    xyPeriods: monthValues.value,
    datetimeFormatter: {
        enable: true,
        locale: 'en',
        useUTC: false,
        januaryAsYear: false,
        options: {
            year: 'yyyy',
            month: `MMM 'yy`,
            day: 'dd MMM',
            hour: 'HH:mm',
            minute: 'HH:mm:ss',
            second: 'HH:mm:ss'
        }
    },
    xyPeriodLabelsRotation: 0,
    xyPeriodLabelsAutoRotate: { 
        enable: true, 
        angle: -30, 
    },
    xyPeriodsShowOnlyAtModulo: false,
    xyPeriodsModulo: 12,
    xyScaleSegments: 10,
    xyShowAxis: true,
    xyShowGrid: true,
    xyShowScale: true,
    yAxisLabel: 'Quantity',
    xAxisLabel: 'Time',
    axisLabelsFontSize: 12,
    userOptionsPosition: 'right',
    zoomXy: true,
    zoomColor: '#CCCCCC',
    zoomHighlightColor: '#4A4A4A',
    zoomFontSize: 14,
    zoomUseResetSlot: false,
    zoomMinimap: {
        show: true,
        smooth: true,
        selectedColor: "#1f77b4",
        selectedColorOpacity: 0.2,
        lineColor: "#1f77b4",
        selectionRadius: 2,
        indicatorColor: '#1A1A1A',
        verticalHandles: false,
        compact: true,
        merged: false,
        frameColor: '#CCCCCC'
    },
    zoomStartIndex: null,
    zoomEndIndex: null,
    showUserOptionsOnChartHover: false,
    keepUserOptionsStateOnChartLeave: true,
    zoomEnableRangeHandles: true,
    zoomEnableSelectionDrag: true,
    zoomFocusOnDrag: false,
    zoomFocusRangeRatio: 0.2
})

const darkModeConfig = ref({
    debug: false,
    loading: false,
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
    donutCurvedMarkers: true,
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
    legendPosition: 'bottom',
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
        fullscreen: true,
        annotator: true
    },
    userOptionsButtonTitles: {
        open: 'Open options',
        close: 'Close options',
        tooltip: 'Toggle tooltip',
        pdf: 'Download PDF',
        img: 'Download PNG',
        fullscreen: 'Toggle fullscreen',
        annotator: 'Toggle annotator'
    },
    userOptionsPrint: {
        scale: 2,
        overflowTolerance: 0.2,
        orientation: 'auto'
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
    tooltipBackgroundOpacity: 30,
    tooltipPosition: 'center',
    tooltipOffsetY: 24,
    tooltipSmooth: true,
    tooltipSmoothForce: 0.18,
    tooltipSmoothSnapThreshold: 0.25,
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
    xyPaddingBottom: 24,
    xyPaddingLeft: 24,
    xyPaddingRight: 12,
    xyPaddingTop: 24,
    xyPeriods: monthValues.value,
    datetimeFormatter: {
        enable: true,
        locale: 'en',
        useUTC: false,
        januaryAsYear: false,
        options: {
            year: 'yyyy',
            month: `MMM 'yy`,
            day: 'dd MMM',
            hour: 'HH:mm',
            minute: 'HH:mm:ss',
            second: 'HH:mm:ss'
        }
    },
    xyPeriodLabelsRotation: 0,
    xyPeriodLabelsAutoRotate: { 
        enable: true, 
        angle: -30, 
    },
    xyPeriodsShowOnlyAtModulo: true,
    xyPeriodsModulo: 12,
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
    zoomUseResetSlot: false,
    userOptionsPosition: 'right',
    zoomMinimap: {
        show: true,
        smooth: true,
        selectedColor: "#8A8A8A",
        selectedColorOpacity: 0.2,
        lineColor: "#1f77b4",
        selectionRadius: 2,
        indicatorColor: '#CCCCCC',
        verticalHandles: false,
        compact: true,
        merged: false,
        frameColor: '#6A6A6A'
    },
    zoomStartIndex: null,
    zoomEndIndex: null,
    showUserOptionsOnChartHover: false,
    keepUserOptionsStateOnChartLeave: true,
    zoomEnableRangeHandles: true,
    zoomEnableSelectionDrag: true,
    zoomFocusOnDrag: false,
    zoomFocusRangeRatio: 0.2
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

const datasetSnippets = ref({
    longArray: `const dataset = ref([1, 2, 3, 5, 8, 13, 21, 55, 89]);`,
    shortArray: `const dataset = ref([1, 2, -3, 5, 8]);`,
    lines: `const dataset = ref([
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
])`,
    donut: `const dataset = ref([
    { name: 'Serie1', value: 10 },
    { name: 'Serie2', value: 20 },
    { name: 'Serie3', value: 5 },
    { name: 'Serie4', value: 2 },
    { name: 'Serie5', value: 1 },
])`
})

const componentSnippets = computed(() => {
    return {
    longArray: {
        open: '<script setup>',
        close: `${'<'}/script>`,
        js: `import { ref } from "vue"
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);

const config = ref(${jsonToJsObject(isDarkMode.value ? mutableConfigDarkMode.value : mutableConfig.value)});
        `,
        html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `
    },
    shortArray: {
        open: '<script setup>',
        close: `${'<'}/script>`,
        js: `import { ref } from "vue"
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref([1, 2, -3, 5, 8]);

const config = ref(${jsonToJsObject(isDarkMode.value ? mutableConfigDarkMode.value : mutableConfig.value)});
        `,
        html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `
    },
    lines: {
        open: '<script setup>',
        close: `${'<'}/script>`,
        js: `import { ref } from "vue"
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref([
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
]);

const config = ref(${jsonToJsObject(isDarkMode.value ? mutableConfigDarkMode.value : mutableConfig.value)});
        `,
        html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `
    },
    donut: {
        open: '<script setup>',
        close: `${'<'}/script>`,
        js: `import { ref } from "vue"
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref([
    { name: 'Serie1', value: 10 },
    { name: 'Serie2', value: 20 },
    { name: 'Serie3', value: 5 },
    { name: 'Serie4', value: 2 },
    { name: 'Serie5', value: 1 },
]);

const config = ref(${jsonToJsObject(isDarkMode.value ? mutableConfigDarkMode.value : mutableConfig.value)});
        `,
        html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `
    },
}
})

function copyComponentSnippet(snip) {
    copyCode(`${snip.open}
    ${snip.js}
    ${snip.close}

    ${snip.html}`);
    store.copy();
}

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiQuickChart" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-4 text-center">
            {{ translations.docs.tooltips.quickChart[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-quick-chart"
            :configSource="mainConfig.vue_ui_quick_chart"
        />

        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-full'}`">
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
                <BaseCard>
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
    
                    <CodeParser :content="datasetSnippets.longArray" language="javascript" @copy="store.copy()" class="mt-4"/>
    
                    <VueDataUi component="VueUiAccordion" :config="{
                        maxHeight: 20000,
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
                            <div class="relative">
                                <button @click="copyComponentSnippet(componentSnippets.longArray)" class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md">
                                    <VueUiIcon name="copy" :size="20"/>
                                </button>
                                <CodeParser :content="componentSnippets.longArray.open" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.longArray.js" language="javascript" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.longArray.close" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.longArray.html" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                            </div>
                        </template>
                    </VueDataUi>                     
                </BaseCard>

                <BaseCard>
                    <Suspense>
                        <template #default>
                            <VueUiQuickChart :dataset="quickDatasetSimpleBar" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                        </template>
                        <template #fallback>
                            <div class="min-h-[500px]"></div>
                        </template>
                    </Suspense>

                    <CodeParser :content="datasetSnippets.shortArray" language="javascript" @copy="store.copy()" class="mt-4"/>

                    <VueDataUi component="VueUiAccordion" :config="{
                        maxHeight: 20000,
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
                            <div class="relative">
                                <button @click="copyComponentSnippet(componentSnippets.shortArray)" class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md">
                                    <VueUiIcon name="copy" :size="20"/>
                                </button>
                                <CodeParser :content="componentSnippets.shortArray.open" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.shortArray.js" language="javascript" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.shortArray.close" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.shortArray.html" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                            </div>
                        </template>
                    </VueDataUi>  
                </BaseCard>

                <BaseCard>
                    <Suspense>
                        <template #default>
                            <VueUiQuickChart :dataset="quickDatasetLine" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                        </template>
                        <template #fallback>
                            <div class="min-h-[500px]"></div>
                        </template>
                    </Suspense>

                    <CodeParser :content="datasetSnippets.lines" language="javascript" @copy="store.copy()" class="mt-4"/>

                    <VueDataUi component="VueUiAccordion" :config="{
                        maxHeight: 20000,
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
                            <div class="relative">
                                <button @click="copyComponentSnippet(componentSnippets.lines)" class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md">
                                    <VueUiIcon name="copy" :size="20"/>
                                </button>
                                <CodeParser :content="componentSnippets.lines.open" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.lines.js" language="javascript" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.lines.close" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.lines.html" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                            </div>
                        </template>
                    </VueDataUi>  
                </BaseCard>
                
                <BaseCard>
                    <Suspense>
                        <template #default>
                            <VueUiQuickChart :dataset="quickDatasetDonut" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                        </template>
                        <template #fallback>
                            <div class="min-h-[500px]"></div>
                        </template>
                    </Suspense>

                    <CodeParser :content="datasetSnippets.donut" language="javascript" @copy="store.copy()" class="mt-4"/>

                    <VueDataUi component="VueUiAccordion" :config="{
                        maxHeight: 20000,
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
                            <div class="relative">
                                <button @click="copyComponentSnippet(componentSnippets.donut)" class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md">
                                    <VueUiIcon name="copy" :size="20"/>
                                </button>
                                <CodeParser :content="componentSnippets.donut.open" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.donut.js" language="javascript" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.donut.close" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                                <CodeParser :content="componentSnippets.donut.html" language="html" :with-copy="false" font-size="0.6rem" line-height="1rem" border-radius="none"/>
                            </div>
                        </template>
                    </VueDataUi>  
                </BaseCard>
        </div>
        <Rater itemId="vue_ui_quick_chart" />

        <BaseMigrationInfo
            autoRotate
            debug 
            padding
        />

        <Box
            ref="box"
            :showDatetimeFormatter="true" 
            showSlots 
            showTooltip 
            showEmits 
            showThemes 
            showResponsive
            showCallbacks
            schema="vue_ui_quick_chart"
        >
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiQuickChartConfig" equal>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="responsive" defaultVal="false" :comment="translations.responsive[store.lang]"/>
        <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
        <BaseDetails attr="events" :level="1">
            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        </BaseDetails>
        <BaseAttr name="axisLabelsFontSize" attr="axisLabelsFontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="backgroundColor" attr="backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <div class="py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2">
            <span class="font-black text-black dark:text-app-blue inline-flex gap-2"><VueUiIcon name="chartBar" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/> Bar specific attributes:</span>
            <BaseAttr name="barAnimated" attr="barAnimated" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="barGap" attr="barGap" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="barStrokeWidth" attr="barStrokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </div>    
        <BaseAttr name="chartIsBarUnderDatasetLength" attr="chartIsBarUnderDatasetLength" type="number" defaultVal="6" :min="1" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>customPalette: []; <span class="text-app-blue break-keep text-xs">// string[]</span></span>
        <BaseAttr name="dataLabelFontSize" attr="dataLabelFontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="dataLabelRoundingPercentage" attr="dataLabelRoundingPercentage" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="dataLabelRoundingValue" attr="dataLabelRoundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <div class="py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2">
            <span class="font-black text-black dark:text-app-blue inline-flex gap-2"><VueUiIcon name="chartDonut" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/> Donut specific attributes:</span>
            <BaseAttr name="blurOnHover" attr="blurOnHover" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutHideLabelUnderPercentage" attr="donutHideLabelUnderPercentage" type="number" defaultVal="3" :min="1" :max="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutLabelMarkerStrokeWidth" attr="donutLabelMarkerStrokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutRadiusRatio" attr="donutRadiusRatio" type="range" defaultVal="0.4" :min="0.2" :max="0.5" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutCurvedMarkers" attr="donutCurvedMarkers" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutShowTotal" attr="donutShowTotal" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutStrokeWidth" attr="donutStrokeWidth" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutThicknessRatio" attr="donutThicknessRatio" type="range" defaultVal="0.18" :min="0.01" :max="0.4" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutTotalLabelFontSize" attr="donitTotalLabelFontSize" type="number" defaultVal="24" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutTotalLabelText" attr="donutTotalLabelText" type="text" defaultVal="Total" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutUseShadow" attr="donutUseShadow" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="donutShadowColor" attr="donutShadowColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </div>

        <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
        <div class="flex flex-row gap-2 place-items-center">
            <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
            <div class="min-w-[200px]">
                <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                    Go to page
                </BaseTabLink>
            </div>
        </div>
        <BaseAttr name="height" attr="height" type="number" defaultVal="338" :min="100" :max="600" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="legendFontSize" attr="legendFontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="legendIcon" attr="legendIcon" type="select" defaultVal="circleFill" :options="icons" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="legendIconSize" attr="legendIconSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="legendPosition" attr="legendPosition" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <div class="py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2">
            <span class="font-black text-black dark:text-app-blue inline-flex gap-2"><VueUiIcon name="chartLine" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/> Line specific attributes:</span>
            <BaseAttr name="lineAnimated" attr="lineAnimated" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="lineSmooth" attr="lineSmooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="lineStrokeWidth" attr="lineStrokeWidth" type="number" defaultVal="2" :min="1" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </div>
        <span class="inline-flex"><BaseAttr name="paletteStartIndex" attr="paletteStartIndex" type="number" defaultVal="0" :min="0" :max="39" :light="mutableConfig" :dark="mutableConfigDarkMode"/><div class="ml-4" v-if="isDarkMode"><div class="inline-flex border border-black" v-for="(_,i) in 6" :style="{ background: palette[mutableConfigDarkMode.paletteStartIndex + i], height: '18px', width: '18px', borderRadius: '50%'}"/></div class="ml-4"><div v-else><div class="inline-flex border border-white" v-for="(_,i) in 6" :style="{ background: palette[mutableConfig.paletteStartIndex + i], height: '18px', width: '18px', borderRadius: '50%'}"/></div></span>
        <BaseAttr name="showDataLabels" attr="showDataLabels" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="showLegend" attr="showLegend" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="showTooltip" attr="showTooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="showUserOptions" attr="showUserOptions" defaultVal="true" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="showUserOptionsOnChartHover" attr="showUserOptionsOnChartHover" defaultVal="false" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="keepUserOptionsStateOnChartLeave" attr="keepUserOptionsStateOnChartLeave" defaultVal="false" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="userOptionsPosition" attr="userOptionsPosition" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="userOptionsButtons" :level="1">
            <BaseAttr name="tooltip" attr="userOptionsButtons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="pdf" attr="userOptionsButtons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="img" attr="userOptionsButtons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fullscreen" attr="userOptionsButtons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="annotator" attr="userOptionsButtons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="userOptionsButtonTitles" :level="1">
            <BaseAttr name="open" attr="userOptionsButtonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="close" attr="userOptionsButtonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="tooltip" attr="userOptionsButtonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="pdf" attr="userOptionsButtonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="img" attr="userOptionsButtonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fullscreen" attr="userOptionsButtonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="annotator" attr="userOptionsButtonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="userOptionsCallbacks" :level="1">
            <BaseTabLink :action="() => setActiveTab(11)" icon="lambda">
                Check out 'callbacks' tab
            </BaseTabLink>
        </BaseDetails>
        <BaseDetails attr="print" :level="1" title="userOptionsPrint">
            <BaseAttr name="scale" attr="userOptionsPrint.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
            <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
            <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
        </BaseDetails>
        <BaseAttr name="title" attr="title" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleBold" attr="titleBold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleFontSize" attr="titleFontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleTextAlign" attr="titleTextAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <div class="flex flex-row gap-2 place-items-center">
            <BaseAttr inactive name="tooltipCustomFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
            <div class="min-w-[200px]">
                <BaseTabLink :action="() => setActiveTab(4)" icon="tooltip">
                    Check out 'Custom tooltip' tab
                </BaseTabLink>
            </div>
        </div>
        <BaseAttr name="tooltipBorderRadius" attr="tooltipBorderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipBorderColor" attr="tooltipBorderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipBorderWidth" attr="tooltipBorderWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipFontSize" attr="tooltipFontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipBackgroundOpacity" attr="tooltipBackgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
        <BaseAttr name="tooltipPosition" attr="tooltipPosition" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipOffsetY" attr="tooltipOffsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipSmooth" attr="tooltipSmooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipSmoothForce" attr="tooltipSmoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="tooltipSmoothSnapThreshold" attr="tooltipSmoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useCustomLegend" attr="useCustomLegend" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="If true, use #legend slot to make a custom legend"/>
        <BaseAttr name="valuePrefix" attr="valuePrefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueSuffix" attr="valueSuffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="width" attr="width" type="number" defaultVal="512" :min="200" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <div class="py-4 bg-gray-200 dark:bg-[#FFFFFF10] rounded-md px-4 pl-8 border-l border-black dark:border-app-blue my-2">
            <span class="font-black text-black dark:text-app-blue inline-flex gap-2"><VueUiIcon name="chartLine" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/><VueUiIcon name="chartBar" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>Bar and Line shared attributes:</span>
            <BaseAttr name="xAxisLabel" attr="xAxisLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyAxisStroke"attr="xyAxisStroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyAxisStrokeWidth" attr="xyAxisStrokeWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyGridStroke" attr="xyGridStroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyGridStrokeWidth" attr="xyGridStrokeWidth" type="number" defaultVal="0.5" :min="0" :max="24" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyHighlighterColor" attr="xyHighlighterColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyHighlighterOpacity" attr="xyHighlighterOpacity" type="range" defaultVal="0.05" :min="0" :max="0.3" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyLabelsXFontSize" attr="xyLabelsXFontSize" type="number" defaultVal="8" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyLabelsYFontSize" attr="xyLabelsYFontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyPaddingBottom" attr="xyPaddingBottom" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyPaddingLeft" attr="xyPaddingLeft" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyPaddingRight" attr="xyPaddingRight" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyPaddingTop" attr="xyPaddingTop" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <span>xyPeriods: [], <span class="text-app-blue text-xs">// Array&lt;string | number&gt;</span></span>
            <BaseDetails attr="datetimeFormatter" :level="1" title="datetimeFormatter">
                <BaseAttr name="enable" attr="datetimeFormatter.enable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="locale" attr="datetimeFormatter.locale" type="select" defaultVal="en" :options="store.locales" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useUTC" attr="datetimeFormatter.useUTC" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="januaryAsYear" attr="datetimeFormatter.januaryAsYear" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="options" :level="6" title="datetimeFormatter.options">
                    <BaseAttr name="year" attr="datetimeFormatter.options.year" type="text" defaultVal="yyyy" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="month" attr="datetimeFormatter.options.month" type="text" :defaultVal="`MMM 'yy`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="day" attr="datetimeFormatter.options.day" type="text" :defaultVal="`dd MMM`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="minute" attr="datetimeFormatter.options.minute" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="second" attr="datetimeFormatter.options.second" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseAttr name="xyPeriodLabelsRotation" attr="xyPeriodLabelsRotation" type="number" defaultVal="0" :min="-360" :max="360" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyPeriodsShowOnlyAtModulo" attr="xyPeriodsShowOnlyAtModulo" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" comment="Ideal for large datasets"/>
            <BaseAttr name="xyPeriodsModulo" attr="xyPeriodsModulo" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" comment="With xyPeriodsShowOnlyAtModulo set to true" />
            <BaseDetails attr="xyPeriodLabelsAutoRotate" :level="1" title="xyPeriodLabelsAutoRotate">
                <BaseAttr name="enable" type="checkbox" defaultVal="true" attr="xyPeriodLabelsAutoRotate.enable" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="angle" type="number" defaultVal="-30" attr="xyPeriodLabelsAutoRotate.angle" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseAttr name="xyScaleSegments" attr="xyScaleSegments" type="number" defaultVal="10" :min="2" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyShowAxis" attr="xyShowAxis" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="xyShowGrid" attr="xyShowGrid" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xyShowScale" attr="xyShowScale" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="yAxisLabel" attr="yAxisLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="zoomXy" attr="zoomXy" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="zoomColor" attr="zoomColor" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="zoomHighlightColor" attr="zoomHighlightColor" type="color" defaultVal="#4A4A4A" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="zoomFontSize" attr="zoomFontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="zoomUseResetSlot" attr="zoomUseResetSlot" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="zoomEnableRangeHandles" attr="zoomEnableRangeHandles" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.63"/>
            <BaseAttr name="zoomEnableSelectionDrag" attr="zoomEnableSelectionDrag" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.63"/>
            <BaseDetails attr="zoomMinimap" :level="1">
                <BaseAttr name="show" attr="zoomMinimap.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="smooth" attr="zoomMinimap.smooth" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="selectedColor" attr="zoomMinimap.selectedColor" type="color" defaultVal="#1f77b4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="selectedColorOpacity" attr="zoomMinimap.selectedColorOpacity" type="range" defaultVal="0.2" :min="0" :max="0.5" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="lineColor" attr="zoomMinimap.lineColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="selectionRadius" attr="zoomMinimap.selectionRadius" type="range" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="indicatorColor" attr="zoomMinimap.indicatorColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="verticalHandles" attr="zoomMinimap.verticalHandles" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.72"/>
                <BaseAttr name="compact" attr="zoomMinimap.compact" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v3.1.8"/>
                <BaseAttr name="merged" attr="zoomMinimap.merged" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v3.1.8"/>
                <BaseAttr name="frameColor" attr="zoomMinimap.frameColor" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v3.1.8"/>
            </BaseDetails>
            <BaseAttr inactive name="zoomStartIndex" defaultVal="null" comment="number | null. Force zoom start index"/>
            <BaseAttr inactive name="zoomEndIndex" defaultVal="null" comment="number | null. Force zoom end index"/>
            <BaseAttr name="zoomFocusOnDrag" attr="zoomFocusOnDrag" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="zoomFocusRangeRatio" attr="zoomFocusRangeRatio" type="number" defaultVal="0.2" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </div>
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
                <BaseSlotDocumenter
                    componentName="VueUiQuickChart"
                    :types="[
                        'legend',
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
                                        responsive: true,
                                        lineAnimated: false,
                                    } 
                                    : {
                                        ...mutableConfig,
                                        responsive: true,
                                        lineAnimated: false,
                                    }
                                " 
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab10>
                <DatetimeFormatterDoc
                    path="datetimeFormatter"
                />
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'fullscreen',
                        'pdf',
                        'img',
                        'tooltip',
                        'svg'
                    ]"
                    root="userOptionsCallbacks"
                />
            </template>

        </Box>
    </div>
</template>

<style>
.vue-ui-quick-chart-legend {
    margin-top: 12px !important;
}
</style>