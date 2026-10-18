<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiQuickChartConfigFields from "./configuration/VueUiQuickChartConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiQuickChart from "../themes/ThemesVueUiQuickChart.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import Rater from "../Rater.vue";
import CodeParser from "../customization/CodeParser.vue";
import { jsonToJsObject, copyCode, createNumbers } from "../maker/lib";
import BaseDocTitle from "../BaseDocTitle.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";
import BaseZoomState from "../Base/BaseZoomState.vue";
import ZoomStateVueUiQuickChart from "./zoom-state/ZoomStateVueUiQuickChart.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const palette = ref([
    "#1f77b4",
    "#aec7e8",
    "#ff7f0e",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#d62728",
    "#ff9896",
    "#9467bd",
    "#c5b0d5",
    "#8c564b",
    "#c49c94",
    "#e377c2",
    "#f7b6d2",
    "#7f7f7f",
    "#c7c7c7",
    "#bcbd22",
    "#dbdb8d",
    "#17becf",
    "#9edae5",
    "#393b79",
    "#5254a3",
    "#6b6ecf",
    "#9c9ede",
    "#637939",
    "#8ca252",
    "#b5cf6b",
    "#cedb9c",
    "#8c6d31",
    "#bd9e39",
    "#e7ba52",
    "#e7cb94",
    "#843c39",
    "#ad494a",
    "#d6616b",
    "#e7969c",
    "#7b4173",
    "#a55194",
    "#ce6dbd",
    "#de9ed6",
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
]);

const quickDatasetDonut = ref([
    {
        name: "serie1",
        value: 20,
    },
    {
        name: "Serie2",
        value: 10,
    },
    {
        name: "Serie3",
        value: 5,
    },
    {
        name: "Serie4",
        value: 2,
    },
    {
        name: "Serie5",
        value: 1,
    },
]);

const quickDatasetLine = ref([
    {
        name: "Serie1",
        values: createNumbers({ count: 10, seed: "M", trend: "up", mult: 100 }),
    },
    {
        name: "Serie2",
        values: createNumbers({ count: 10, seed: "B", trend: "up", mult: 75 }),
    },
    {
        name: "Serie3",
        values: createNumbers({ count: 10, seed: "C", trend: "up", mult: 25 }),
    },
]);

const quickDatasetSimpleLine = ref(
    createNumbers({ count: 10, seed: "M", trend: "up", mult: 100 }),
);
const quickDatasetSimpleBar = ref([1, 2, -3, 5, 8]);

const quickDatasetBar = ref([
    {
        name: "Serie1",
        values: [1, 2, 3, 2, 3],
    },
    {
        name: "Serie2",
        values: [5, 6, 7, 6, 7],
    },
    {
        name: "Serie3",
        values: [1, 2, 3, 5, 8],
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            annotatorPalette: COLOR_PICKER_PALETTE,
            devHints: { enable: false },
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right arrow keys to move between data points.",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            transitions: {
                enable: true,
                pauseOnLoad: true,
                pauseOnDatasetChange: false,
                activationDelayMs: 300,
            },
            useCursorPointer: false,
            debug: false,
            loading: false,
            responsive: false,
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
            barAnimated: true,
            barGap: 12,
            barStrokeWidth: 1,
            blurOnHover: true,
            chartIsBarUnderDatasetLength: 6,
            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
            dataLabelFontSize: 14,
            dataLabelRoundingPercentage: 1,
            dataLabelRoundingValue: 1,
            donutCurvedMarkers: true,
            donutHideLabelUnderPercentage: 3,
            donutLabelMarkerStrokeWidth: 1,
            donutRadiusRatio: 0.4,
            donutShowTotal: true,
            donutStrokeWidth: 2,
            donutStroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            donutThicknessRatio: 0.18,
            donutTotalLabelFontSize: 24,
            donutTotalLabelOffsetY: 0,
            donutTotalLabelText: "Total",
            donutUseShadow: false,
            donutShadowColor: "#1A1A1A",
            fontFamily: "inherit",
            height: 338,
            legendFontSize: 12,
            legendIcon: "circleFill",
            legendIconSize: 12,
            legendPosition: "bottom",
            showLegendSelectAllToggle: false,
            legendSelectAllToggleBackgroundColor: isDarkMode.value
                ? "#3A3A3A"
                : "#E1E5E8",
            legendSelectAllToggleColor: isDarkMode.value
                ? "#CCCCCC"
                : "#1A1A1A",
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
                open: "Open options",
                close: "Close options",
                tooltip: "Toggle tooltip",
                pdf: "Download PDF",
                img: "Download PNG",
                fullscreen: "Toggle fullscreen",
                annotator: "Toggle annotator",
            },
            userOptionsPrint: {
                scale: 2,
                overflowTolerance: 0.2,
                orientation: "auto",
            },
            title: "A quick chart",
            titleBold: true,
            titleFontSize: 16,
            titleTextAlign: "center",
            tooltipTeleportTo: "body",
            tooltipCustomFormat: null,
            tooltipBorderRadius: 4,
            tooltipBorderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
            tooltipBorderWidth: 1,
            tooltipFontSize: 14,
            tooltipBackgroundOpacity: 30,
            tooltipPosition: "center",
            tooltipOffsetX: 0,
            tooltipOffsetY: 24,
            tooltipSmooth: true,
            tooltipSmoothForce: 0.18,
            tooltipSmoothSnapThreshold: 0.25,
            useCustomLegend: false,
            valuePrefix: "",
            valueSuffix: "",
            width: 512,
            xyAxisStroke: isDarkMode.value ? "#4A4A4A" : "#CCCCCC",
            xyAxisStrokeWidth: 1,
            xyGridStroke: isDarkMode.value ? "#5A5A5A" : "#d4d4d8",
            xyGridStrokeWidth: 0.5,
            xyHighlighterColor: isDarkMode.value ? "#FFFFFF" : "#000000",
            xyHighlighterOpacity: 0.05,
            xyLabelsXFontSize: 8,
            xyLabelsYFontSize: 12,
            xyPaddingBottom: 24,
            xyPaddingLeft: 24,
            xyPaddingRight: 36,
            xyPaddingTop: 24,
            xyPeriods: monthValues.value,
            datetimeFormatter: {
                enable: true,
                locale: "en",
                useUTC: false,
                januaryAsYear: false,
                options: {
                    year: "yyyy",
                    month: `MMM 'yy`,
                    day: "dd MMM",
                    hour: "HH:mm",
                    minute: "HH:mm:ss",
                    second: "HH:mm:ss",
                },
            },
            xyPeriodLabelsRotation: 0,
            xyPeriodLabelsAutoRotate: { enable: true, angle: -30 },
            xyPeriodsShowOnlyAtModulo: isDarkMode.value ? true : false,
            xyPeriodsModulo: 12,
            xyScaleSegments: 10,
            xyShowAxis: true,
            xyShowGrid: true,
            xyShowScale: true,
            yAxisLabel: "Quantity",
            xAxisLabel: "Time",
            axisLabelsFontSize: 12,
            userOptionsPosition: "right",
            zoomXy: true,
            zoomXyAutoFit: true,
            zoomColor: "#CCCCCC",
            zoomHighlightColor: "#4A4A4A",
            zoomFontSize: 14,
            zoomUseResetSlot: false,
            zoomMinimap: {
                show: true,
                smooth: true,
                selectedColor: isDarkMode.value ? "#8A8A8A" : "#1f77b4",
                selectedColorOpacity: 0.2,
                lineColor: "#1f77b4",
                selectionRadius: 2,
                indicatorColor: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                verticalHandles: false,
                compact: true,
                merged: false,
                frameColor: isDarkMode.value ? "#6A6A6A" : "#CCCCCC",
                additionalHeight: 0,
                handleIconColor: null,
                handleBorderWidth: 1,
                handleBorderColor: null,
                handleFill: null,
                handleWidth: 20,
                handleType: "grab",
            },
            zoomMaxWidth: null,
            zoomStartIndex: null,
            zoomEndIndex: null,
            showUserOptionsOnChartHover: false,
            keepUserOptionsStateOnChartLeave: true,
            zoomEnableRangeHandles: true,
            zoomEnableSelectionDrag: true,
            zoomFocusOnDrag: false,
            zoomFocusRangeRatio: 0.2,
            dragToZoom: {
                show: true,
                selection: {
                    fill: isDarkMode.value ? "#CCCCCC" : "#6A6A6A",
                    stroke: isDarkMode.value ? "#CCCCCC" : "#6A6A6A",
                    fillOpacity: 0.2,
                    strokeOpacity: 0.5,
                    strokeWidth: 1,
                    strokeDasharray: 0,
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
}

const { configCode, showAllConfig } = useConfigCode();

const datasetSnippets = ref({
    longArray: `const dataset = ref([1, 2, 3, 5, 8, 13, 21, 55, 89]);`,
    shortArray: `const dataset = ref([1, 2, -3, 5, 8]);`,
    lines: `const dataset = ref([
    {
        name: 'Serie1',
        values: [${createNumbers({ count: 10, seed: "M", trend: "up", mult: 100 })}]
    },
    {
        name: 'Serie2',
        values: [${createNumbers({ count: 10, seed: "B", trend: "up", mult: 75 })}]
    },
    {
        name: 'Serie3',
        values: [${createNumbers({ count: 10, seed: "C", trend: "up", mult: 25 })}]
    },
])`,
    donut: `const dataset = ref([
    { name: 'Serie1', value: 10 },
    { name: 'Serie2', value: 20 },
    { name: 'Serie3', value: 5 },
    { name: 'Serie4', value: 2 },
    { name: 'Serie5', value: 1 },
])`,
});

const componentSnippets = computed(() => {
    return {
        longArray: {
            open: "<script setup>",
            close: `${"<"}/script>`,
            js: `import { ref } from "vue"
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);

const config = ref(${jsonToJsObject(config.value)});
        `,
            html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `,
        },
        shortArray: {
            open: "<script setup>",
            close: `${"<"}/script>`,
            js: `import { ref } from "vue"
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref([1, 2, -3, 5, 8]);

const config = ref(${jsonToJsObject(config.value)});
        `,
            html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `,
        },
        lines: {
            open: "<script setup>",
            close: `${"<"}/script>`,
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

const config = ref(${jsonToJsObject(config.value)});
        `,
            html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `,
        },
        donut: {
            open: "<script setup>",
            close: `${"<"}/script>`,
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

const config = ref(${jsonToJsObject(config.value)});
        `,
            html: `<template>
    <div style="width: 600px">
        <VueUiQuickChart 
            :dataset="dataset" 
            :config="config" 
        />
    </div>
</template>
    `,
        },
    };
});

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

const customFormatCode =
    ref(`tooltipCustomFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiQuickChart" />

        <BaseDocDescription
            :text="translations.docs.tooltips.quickChart[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-quick-chart"
            :configSource="mainConfig.vue_ui_quick_chart"
        />

        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-full'}`"
        >
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button
                    @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6"
                >
                    {{ translations.docs.reset[store.lang] }}
                </button>
                <button
                    @click="copyToClipboard(config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"
                >
                    <CopyIcon />
                    {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <BaseCard>
                <Suspense>
                    <template #default>
                        <VueUiQuickChart
                            :dataset="quickDatasetSimpleLine"
                            :config="config"
                            :key="`0_${key}`"
                        >
                            <!-- <template #reset-action="{ reset }">
                                <button @click="reset()">CUSTOM RESET</button>
                            </template> -->
                        </VueUiQuickChart>
                    </template>
                    <template #fallback>
                        <BaseSpinner />
                    </template>
                </Suspense>

                <CodeParser
                    :content="datasetSnippets.longArray"
                    language="javascript"
                    @copy="store.copy()"
                    class="mt-4"
                />

                <VueDataUi
                    component="VueUiAccordion"
                    :config="{
                        maxHeight: 20000,
                        head: {
                            useArrowSlot: true,
                            backgroundColor: 'transparent',
                        },
                        body: {
                            backgroundColor: isDarkMode
                                ? '#1A1A1A'
                                : 'rgb(229, 231, 235)',
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        },
                    }"
                >
                    <template #arrow="{ iconColor }">
                        <VueUiIcon
                            name="arrowRight"
                            :size="10"
                            :stroke="iconColor"
                        />
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div class="relative">
                            <button
                                @click="
                                    copyComponentSnippet(
                                        componentSnippets.longArray,
                                    )
                                "
                                class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md"
                            >
                                <VueUiIcon name="copy" :size="20" />
                            </button>
                            <CodeParser
                                :content="componentSnippets.longArray.open"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.longArray.js"
                                language="javascript"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.longArray.close"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.longArray.html"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                        </div>
                    </template>
                </VueDataUi>
            </BaseCard>

            <BaseCard>
                <Suspense>
                    <template #default>
                        <VueUiQuickChart
                            :dataset="quickDatasetSimpleBar"
                            :config="config"
                            :key="`1_${key}`"
                        />
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>

                <CodeParser
                    :content="datasetSnippets.shortArray"
                    language="javascript"
                    @copy="store.copy()"
                    class="mt-4"
                />

                <VueDataUi
                    component="VueUiAccordion"
                    :config="{
                        maxHeight: 20000,
                        head: {
                            useArrowSlot: true,
                            backgroundColor: 'transparent',
                        },
                        body: {
                            backgroundColor: isDarkMode
                                ? '#1A1A1A'
                                : 'rgb(229, 231, 235)',
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        },
                    }"
                >
                    <template #arrow="{ iconColor }">
                        <VueUiIcon
                            name="arrowRight"
                            :size="10"
                            :stroke="iconColor"
                        />
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div class="relative">
                            <button
                                @click="
                                    copyComponentSnippet(
                                        componentSnippets.shortArray,
                                    )
                                "
                                class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md"
                            >
                                <VueUiIcon name="copy" :size="20" />
                            </button>
                            <CodeParser
                                :content="componentSnippets.shortArray.open"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.shortArray.js"
                                language="javascript"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.shortArray.close"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.shortArray.html"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                        </div>
                    </template>
                </VueDataUi>
            </BaseCard>

            <BaseCard>
                <Suspense>
                    <template #default>
                        <VueUiQuickChart
                            :dataset="quickDatasetLine"
                            :config="config"
                            :key="`2_${key}`"
                        />
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>

                <CodeParser
                    :content="datasetSnippets.lines"
                    language="javascript"
                    @copy="store.copy()"
                    class="mt-4"
                />

                <VueDataUi
                    component="VueUiAccordion"
                    :config="{
                        maxHeight: 20000,
                        head: {
                            useArrowSlot: true,
                            backgroundColor: 'transparent',
                        },
                        body: {
                            backgroundColor: isDarkMode
                                ? '#1A1A1A'
                                : 'rgb(229, 231, 235)',
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        },
                    }"
                >
                    <template #arrow="{ iconColor }">
                        <VueUiIcon
                            name="arrowRight"
                            :size="10"
                            :stroke="iconColor"
                        />
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div class="relative">
                            <button
                                @click="
                                    copyComponentSnippet(
                                        componentSnippets.lines,
                                    )
                                "
                                class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md"
                            >
                                <VueUiIcon name="copy" :size="20" />
                            </button>
                            <CodeParser
                                :content="componentSnippets.lines.open"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.lines.js"
                                language="javascript"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.lines.close"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.lines.html"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                        </div>
                    </template>
                </VueDataUi>
            </BaseCard>

            <BaseCard>
                <Suspense>
                    <template #default>
                        <VueUiQuickChart
                            :dataset="quickDatasetDonut"
                            :config="config"
                            :key="`3_${key}`"
                        />
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>

                <CodeParser
                    :content="datasetSnippets.donut"
                    language="javascript"
                    @copy="store.copy()"
                    class="mt-4"
                />

                <VueDataUi
                    component="VueUiAccordion"
                    :config="{
                        maxHeight: 20000,
                        head: {
                            useArrowSlot: true,
                            backgroundColor: 'transparent',
                        },
                        body: {
                            backgroundColor: isDarkMode
                                ? '#1A1A1A'
                                : 'rgb(229, 231, 235)',
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        },
                    }"
                >
                    <template #arrow="{ iconColor }">
                        <VueUiIcon
                            name="arrowRight"
                            :size="10"
                            :stroke="iconColor"
                        />
                    </template>
                    <template #title>
                        {{ translations.search.viewComponentCode[store.lang] }}
                    </template>
                    <template #content>
                        <div class="relative">
                            <button
                                @click="
                                    copyComponentSnippet(
                                        componentSnippets.donut,
                                    )
                                "
                                class="absolute top-3 right-2.5 z-10 rounded-lg p-1 hover:bg-[#FFFFFF10] hover:shadow-md"
                            >
                                <VueUiIcon name="copy" :size="20" />
                            </button>
                            <CodeParser
                                :content="componentSnippets.donut.open"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.donut.js"
                                language="javascript"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.donut.close"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                            <CodeParser
                                :content="componentSnippets.donut.html"
                                language="html"
                                :with-copy="false"
                                font-size="0.6rem"
                                line-height="1rem"
                                border-radius="none"
                            />
                        </div>
                    </template>
                </VueDataUi>
            </BaseCard>
        </div>
        <Rater itemId="vue_ui_quick_chart" />

        <BaseMigrationInfo autoRotate debug padding />

        <Box
            ref="box"
            :showDatetimeFormatter="true"
            showSlots
            showTooltip
            showEmits
            showThemes
            showResponsive
            showCallbacks
            showZoomState
            schema="vue_ui_quick_chart"
        >
            <template #dataset>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type:
                    <code class="text-app-green">VueUiQuickChartDataset</code>
                </div>
                <div class="my-4">
                    {{ translations.docs.comments.quickChart[store.lang] }}
                </div>
                <div class="my-4">
                    {{ translations.docs.comments.quickChartKeys[store.lang] }}
                </div>

                <div class="my-4 flex flex-row gap-8">
                    <div>
                        <div class="mb-2 pb-2 border-b border-gray-500">
                            Object keys for names:
                        </div>
                        <ul class="text-gray-500">
                            <li><code>description</code></li>
                            <li><code>label</code></li>
                            <li><code>name</code></li>
                            <li><code>title</code></li>
                        </ul>
                    </div>
                    <div>
                        <div class="mb-2 pb-2 border-b border-gray-500">
                            Object keys for data:
                        </div>
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
            <template #configuration>
                <DebugHint
                    component="VueUiQuickChart"
                    configType="VueUiQuickChartConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiQuickChartConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiQuickChartConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            icons,
                            isDarkMode,
                            config,
                            config,
                            palette,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>

            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiQuickChart"
                    :names="['selectDatapoint', 'selectLegend', 'copyAlt']"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiQuickChart"
                    :types="[
                        'hint',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-quick-chart.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>
            <template #custom-tooltip>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.tooltipCustomFormat</code
                >
                <CodeParser
                    class="mt-4"
                    language="javascript"
                    :content="customFormatCode"
                />

                <h3 class="my-4">
                    {{ translations.customFormatCss[store.lang] }}
                </h3>
                <CodeParser
                    language="css"
                    content=".vue-data-ui-custom-tooltip{ }"
                />
            </template>

            <template #themes>
                <ThemesVueUiQuickChart />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiQuickChart
                            :dataset="quickDatasetSimpleLine"
                            :config="{
                                ...config,
                                responsive: true,
                                lineAnimated: false,
                            }"
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #datetime-formatter>
                <DatetimeFormatterDoc path="datetimeFormatter" />
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'fullscreen',
                        'pdf',
                        'img',
                        'tooltip',
                        'svg',
                    ]"
                    root="userOptionsCallbacks"
                />
            </template>

            <template #zoom-state>
                <BaseZoomState component="VueUiQuickChart">
                    <ZoomStateVueUiQuickChart />
                </BaseZoomState>
            </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-quick-chart-legend {
    margin-top: 12px !important;
}
</style>
