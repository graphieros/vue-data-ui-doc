<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiXyCanvasConfigFields from "./configuration/VueUiXyCanvasConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucXyCanvas from "../../components/useCases/ux-xy-canvas.vue";
import ThemesVueUiXyCanvas from "../themes/ThemesVueUiXyCanvas.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";
import BaseZoomState from "../Base/BaseZoomState.vue";
import ZoomStateVueUiXyCanvas from "./zoom-state/ZoomStateVueUiXyCanvas.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const monthValues = computed(() => {
    const yearStart = 2026;
    const arr = [];
    for (let i = 0; i < 21; i += 1) {
        const d = new Date(yearStart, i, 1);
        arr.push(d.getTime());
    }
    return arr;
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    {
        name: "Series 1",
        series: [
            -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13,
            21, 34, 55,
        ],
        type: "bar",
        color: "rgb(95,139,238)",
        scaleSteps: 5,
        dataLabels: false,
    },
    {
        name: "Series 2",
        series: [
            55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13,
            -21, -34, -55,
        ],
        type: "line",
        color: "rgb(66,211,146)",
        useArea: true,
        dataLabels: false,
        scaleSteps: 5,
    },
    {
        name: "Series 3",
        series: [
            64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16,
            30, 42, 52, 60, 64,
        ],
        type: "plot",
        color: "rgb(255,100,0)",
        scaleSteps: 5,
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            theme: "",
            customPalette: [],
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right arrow keys to move between data points.",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            downsample: { threshold: 10000 },
            events: {
                datapointEnter: null,
                datapointLeave: null,
                datapointClick: null,
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                useCursorPointer: false,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                buttons: {
                    tooltip: true,
                    pdf: true,
                    img: true,
                    csv: true,
                    table: true,
                    labels: true,
                    stack: true,
                    fullscreen: true,
                    annotator: true,
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
                    stack: "Toggle stack mode",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            style: {
                fontFamily: isDarkMode.value ? "Inter" : "Arial",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    aspectRatio: "14 / 9",
                    stacked: false,
                    stackGap: 20,
                    scale: { ticks: 10, min: null, max: null },
                    zoom: {
                        show: true,
                        autoFit: true,
                        maxWidth: null,
                        color: isDarkMode.value ? "#6A6A6A" : "#CCCCCC",
                        highlightColor: "#4A4A4A",
                        fontSize: 14,
                        useResetSlot: false,
                        startIndex: null,
                        endIndex: null,
                        enableRangeHandles: true,
                        enableSelectionDrag: true,
                        focusOnDrag: false,
                        focusRangeRatio: 0.2,
                        minimap: {
                            show: true,
                            selectedColor: "#1f77b4",
                            selectedColorOpacity: 0.2,
                            indicatorColor: "#CCCCCC",
                            verticalHandles: false,
                            compact: true,
                            frameColor: isDarkMode.value
                                ? "#6A6A6A"
                                : "#8A8A8A",
                            additionalHeight: 0,
                            handleIconColor: null,
                            handleBorderWidth: 1,
                            handleBorderColor: null,
                            handleFill: null,
                            handleWidth: 20,
                            handleType: "grab",
                        },
                        preview: {
                            enable: true,
                            fill: "#CCCCCC20",
                            stroke: "#6A6A6A",
                            strokeWidth: 1,
                            strokeDasharray: 3,
                        },
                        dragToZoom: {
                            show: true,
                            selection: {
                                fill: isDarkMode.value ? "#CCCCCC" : "#6A6A6A",
                                stroke: isDarkMode.value
                                    ? "#CCCCCC"
                                    : "#6A6A6A",
                                fillOpacity: 0.2,
                                strokeOpacity: 0.5,
                                strokeWidth: 1,
                                strokeDasharray: 0,
                            },
                        },
                        useDefaultFormat: true,
                        timeFormat: "yyyy-MM-dd HH:mm:ss",
                        customFormat: null,
                    },
                    selector: {
                        show: true,
                        color: isDarkMode.value ? "#6A6A6A" : "#2D353C",
                        dashed: true,
                        showHorizontalSelector: false,
                    },
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        fontSize: 14,
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#8A8A8A" : "#e1e5e8",
                        borderWidth: 1,
                        backgroundOpacity: 30,
                        position: "center",
                        offsetY: 24,
                        smooth: true,
                        smoothForce: 0.18,
                        smoothSnapThreshold: 0.25,
                        showTimeLabel: true,
                        useDefaultTimeFormat: true,
                        timeFormat: "yyyy-MM-dd HH:mm:ss",
                    },
                    legend: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        show: true,
                        fontSize: 16,
                        bold: false,
                        position: "bottom",
                        selectAllToggle: {
                            show: false,
                            backgroundColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "Subtitle",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                    grid: {
                        y: {
                            showAxis: true,
                            axisColor: isDarkMode.value ? "#6A6A6A" : "#2D353C",
                            axisThickness: 2,
                            axisName: "Y Axis",
                            axisLabels: {
                                show: true,
                                fontSizeRatio: 1,
                                color: isDarkMode.value ? "#8A8A8A" : "#2D353C",
                                offsetX: 0,
                                rounding: 1,
                                prefix: "",
                                suffix: "",
                                bold: false,
                            },
                            verticalLines: {
                                show: true,
                                color: isDarkMode.value ? "#4A4A4A" : "#CCCCCC",
                                hideUnderXLength: 20,
                                position: "middle",
                            },
                        },
                        x: {
                            showAxis: true,
                            axisColor: isDarkMode.value ? "#4A4A4A" : "#2D353C",
                            axisThickness: 2,
                            axisName: "X Axis",
                            horizontalLines: {
                                show: true,
                                color: isDarkMode.value ? "#3A3A3A" : "#CCCCCC",
                                alternate: true,
                                opacity: 20,
                            },
                            timeLabels: {
                                show: true,
                                fontSizeRatio: 0.7,
                                values: monthValues.value,
                                datetimeFormatter: {
                                    enable: true,
                                    locale: "en",
                                    useUTC: false,
                                    januaryAsYear: isDarkMode.value
                                        ? true
                                        : false,
                                    options: {
                                        year: "yyyy",
                                        month: `MMM`,
                                        day: "dd MMM",
                                        hour: "HH:mm",
                                        minute: "HH:mm:ss",
                                        second: "HH:mm:ss",
                                    },
                                },
                                rotation: 0,
                                offsetY: 30,
                                color: isDarkMode.value ? "#8A8A8A" : "#2D353C",
                                modulo: 12,
                                bold: false,
                            },
                        },
                        zeroLine: {
                            show: true,
                            color: isDarkMode.value ? "#6A6A6A" : "#2D353C",
                            dashed: true,
                        },
                    },
                    line: {
                        cutNullValues: true,
                        plots: { show: true, radiusRatio: 1 },
                    },
                    bar: { gradient: { show: true } },
                    area: { opacity: 60 },
                    dataLabels: {
                        show: true,
                        fontSizeRatio: 1,
                        useSerieColor: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        offsetY: -12,
                        bold: false,
                    },
                    paddingProportions: {
                        top: 0.1,
                        left: 0.1,
                        right: 0.08,
                        bottom: 0.1,
                    },
                },
            },
            table: {
                show: false,
                useDialog: false,
                rounding: 1,
                responsiveBreakpoint: 400,
                columnNames: { period: "Period", total: "Total" },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
    forceChartUpdate();
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
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode();

function randomizeData() {
    function makeSet(n, m) {
        const arr = [];
        for (let i = 0; i < n; i += 1) {
            arr.push(Math.random() * m);
        }
        return arr;
    }

    dataset.value[0].series = makeSet(21, 100);
    dataset.value[1].series = makeSet(21, 90);
    dataset.value[2].series = makeSet(21, 80);
    key.value += 1;
}

const dsTypeCode = computed(() => {
    return `type VueUiXyCanvasDatasetItem = {
    name: string;
    series: number[];
    type?: "line" | "bar" | "plot";
    useArea?: boolean;
    dataLabels?: boolean;
    scaleSteps?: number;
    prefix?: string;
    suffix?: string;
    rounding?: number;
    autoScaling?: boolean;
    stackRatio?: number; // if used on all datapoints, must sum up to 1
    scaleMin?: number; // applied in stack mode
    scaleMax?: number; // applied in stack mode
    showYMarker?: boolean; // if true, will show a marker on Y axis with the value at hovered index
}`;
});

const codeDataset = ref(`const dataset:VueUiXyCanvasDatasetItem[] = [
  {
    name: "Series 1",
    series: [-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
    type: "bar",
    color: "rgb(95,139,238)",
    scaleSteps: 5,
    dataLabels: false
  },
  {
    name: "Series 2",
    series: [55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
    type: "line",
    color: "rgb(66,211,146)",
    useArea: true,
    dataLabels: false,
    scaleSteps: 5,
  },
  {
    name: "Series 3",
    series: [64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
    type: "plot",
    color: "rgb(255,100,0)",
    scaleSteps: 5,
  }, 
]`);

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const customFormatCode =
    ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiXyCanvas" />

        <BaseDocDescription
            :text="translations.docs.tooltips.xyCanvas[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-xy-canvas"
            :configSource="mainConfig.vue_ui_xy_canvas"
        />

        <div :class="`transition-all mx-auto w-full sm:w-2/3`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        component="VueUiXyCanvas"
                        :dataset="dataset"
                        :config="{
                            ...config,
                            style: {
                                ...config.style,
                                fontFamily: 'Inter',
                            },
                        }"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>

            <BaseRandomButton @click="randomizeData" />

            <Rater itemId="vue_ui_xy_canvas" />
        </div>

        <Box
            ref="box"
            :showDatetimeFormatter="true"
            showEmits
            showSlots
            showUseCases
            showThemes
            showTooltip
            showResponsive
            showCallbacks
            showZoomState
            schema="vue_ui_xy_canvas"
            signInfo="both"
        >
            <template #dataset>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :title="translations.docs.datastructure[store.lang]"
                        :content="dsTypeCode"
                        class="my-6"
                    />
                </div>

                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>

            <template #configuration>
                <div class="w-full overflow-x-auto">
                    <DebugHint
                        component="VueUiXyCanvas"
                        configType="VueUiXyCanvasConfig"
                    />

                    <BaseCopyConfig :config="config" @reset="resetDefault" />

                    <div class="mt-6">
                        TS type:
                        <code class="text-app-blue">VueUiXyCanvasConfig</code>
                    </div>

                    <div class="my-4">
                        Toggle tree view:
                        <input type="checkbox" v-model="showAllConfig" />
                    </div>

                    <code ref="configCode">
                        <VueUiXyCanvasConfigFields
                            :config="config"
                            :context="{
                                forceChartUpdate,
                                goToPage,
                                setActiveTab,
                                store,
                                translations,
                            }"
                        />
                    </code>
                </div>
            </template>

            <!-- EMITS -->
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiXyCanvas"
                    :names="['selectLegend', 'selectX', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiXyCanvas"
                    getImage
                    showHideSeries
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'toggleTable',
                        'toggleStack',
                        'toggleLabels',
                    ]"
                />

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.xy.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-gray-600 dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const xyChart = ref(null);
            const xyDataset = ref([]);

            onMounted(async () => {
                xyDataset.value = await xyChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXyCanvas
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXyCanvas
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        xyDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.xyDataset = await this.$refs.xyChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <!-- SLOTS -->
            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiXyCanvas"
                    :types="[
                        'hint',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'reset-action',
                        'watermark',
                        'source',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-xy-canvas.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <!-- TOOLTIP -->
            <template #custom-tooltip>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.style.chart.tooltip.customFormat</code
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

            USE CASES
            <template #use-cases>
                <ucXyCanvas />
            </template>

            <!-- THEMES -->
            <template #themes>
                <ThemesVueUiXyCanvas />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi
                            component="VueUiXyCanvas"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                                style: {
                                    ...config.style,
                                    fontFamily: 'Inter',
                                },
                            }"
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #datetime-formatter>
                <DatetimeFormatterDoc
                    path="style.chart.grid.x.timeLabels.datetimeFormatter"
                />
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'labels',
                        'pdf',
                        'stack',
                        'table',
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>

            <template #zoom-state>
                <BaseZoomState component="VueUiXyCanvas">
                    <ZoomStateVueUiXyCanvas />
                </BaseZoomState>
            </template>
        </Box>
    </div>
</template>
