<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import VueUiXyConfigFields from "./configuration/VueUiXyConfigFields.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucXy from "../useCases/uc-xy.vue";
import ThemesVueUiXy from "../themes/ThemesVueUiXy.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import useMobile from "../../useMobile";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCssOverride from "../BaseCssOverride.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import BaseTextCopy from "../BaseTextCopy.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import SsrGeneration from "../SsrGeneration.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";
import BaseZoomState from "../Base/BaseZoomState.vue";
import ZoomStateVueUiXy from "./zoom-state/ZoomStateVueUiXy.vue";
import TricksVueUiXy from "./tricks/TricksVueUiXy.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);
const average = ref(0);

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

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const patternDataset = computed(() => {
    return [
        {
            name: "Series 1",
            series: [12, 25, 32, 64, 34, 26, 12],
            type: "bar",
            color: "rgb(95,139,238)",
            shape: "circle",
            dataLabels: false,
            scaleSteps: 3,
        },
        {
            name: "Series 2",
            series: [12, 25, 32, 64, 34, 26, 16],
            type: "line",
            color: "rgb(66,211,146)",
            useArea: false,
            useProgression: false,
            dataLabels: false,
            scaleSteps: 3,
        },
        {
            name: "Series 4",
            series: [8, 20, 27, 48, 27, 20, 15],
            type: "bar",
            smooth: true,
            useArea: false,
            dataLabels: false,
            color: "rgb(200,100,50)",
            scaleSteps: 3,
        },
    ];
});

const dataset = computed(() => {
    return [
        {
            name: "Series 1",
            series: [12, 25, 32, 64, 34, 26, 22, 20, 18, 15, 12],
            type: "bar",
            color: "#1f77b4",
            shape: "circle",
            scaleSteps: 5,
        },
        {
            name: "Series 2",
            series: [8, 20, 27, 48, 27, 20, 21, 16, 12, 8, 5],
            type: "bar",
            color: "#aec7e8",
            shape: "star",
            scaleSteps: 5,
            showSerieName: "end",
        },
        {
            name: "Series 3",
            series: [90, 82, 80, null, 90, 97, null, 45, 80],
            type: "line",
            color: "#ff7f0e",
            useArea: false,
            dataLabels: false,
            smooth: true,
            shape: "circle",
            scaleSteps: 5,
            showSerieName: "end",
            dashIndices: [8],
        },
        {
            name: "Series 4",
            series: [40, 45, 30, 35, 30, 40, 45, 55, 50, 45, 30, 20],
            type: "line",
            useStepper: true,
            useArea: false,
            dataLabels: false,
            color: "rgb(200,55,50)",
            scaleSteps: 3,
        },
    ];
});

const codeDataset = ref(`const dataset: VueUiXyDatasetItem[] = [
    {
        name: "Series 1",
        series: [ 12, 25, 32, 64, 34, 26],
        type: "bar",
        color: "#1f77b4",
        shape: 'circle',
        scaleSteps: 5,
    },
    {
        name: "Series 2",
        series: [ 8, 20, 27, 48, 27, 20],
        type: "bar",
        color: "#aec7e8",
        shape: "star",
        scaleSteps: 5,
        showSerieName: 'end'
    },
    {
        name: "Series 3",
        series: [75, 82, 80, 72, 90, 100],
        type: "line",
        color: "#ff7f0e",
        useArea: false,
        dataLabels: false,
        smooth: true,
        shape: "circle",
        scaleSteps: 5,
        showSerieName: 'end',
        dashIndices: [5] // ${translations.value.docs.comments.xy.dashIndices[store.lang]}
    },
    {
        name: "Series 4",
        series: [40, 45, 30, 35, 30, 40, 45, 55, 50, 45, 30, 20],
        type: "line",
        useStepper: true,
        useArea: false,
        dataLabels: false,
        color: "rgb(200,55,50)",
        scaleSteps: 3,
    },
]`);

const monthValues = computed(() => {
    const yearStart = 2026;
    const arr = [];
    for (let i = 0; i < 21; i += 1) {
        const d = new Date(yearStart, i, 1);
        arr.push(d.getTime());
    }
    return arr;
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            theme: "",
            debug: false,
            loading: false,
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
            events: {
                datapointEnter: null,
                datapointLeave: null,
                datapointClick: null,
            },
            responsive: false,
            responsiveProportionalSizing: true,
            useCssAnimation: false,
            showTable: false,
            downsample: { threshold: 1095 },
            chart: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                annotations: [
                    {
                        show: true,
                        yAxis: {
                            yTop: 70,
                            yBottom: 60,
                            label: {
                                text: "Target range",
                                backgroundColor: "#42d392",
                                offsetX: 3,
                                fontSize: 18,
                                border: {
                                    stroke: "#42d392",
                                },
                            },
                            line: {
                                stroke: "#42d392",
                                strokeDasharray: 5,
                            },
                            area: {
                                fill: "#42d392",
                            },
                        },
                    },
                    {
                        show: true,
                        yAxis: {
                            yTop: 50,
                            yBottom: null,
                            label: {
                                text: "Target n-1",
                                position: "end",
                                textAnchor: "end",
                                backgroundColor: "#ff6600",
                                color: "#1A1A1A",
                                fontSize: 18,
                                offsetY: 2,
                                border: {
                                    stroke: "#3A3A3A",
                                },
                            },
                            line: {
                                stroke: "#ff6600",
                                strokeDasharray: 5,
                            },
                        },
                    },
                ],
                highlighter: {
                    color: isDarkMode.value ? "#e1e5e8" : "#1A1A1A",
                    opacity: 10,
                    useLine: false,
                    lineDasharray: 2,
                    lineWidth: 1,
                    crosshairs: {
                        show: false,
                        stroke: isDarkMode.value ? "#e1e5e8" : "#1A1A1A",
                        strokeWidth: 1,
                        strokeDasharray: 3,
                        stopOnPoint: false,
                        dot: {
                            radius: 2,
                            fill: isDarkMode.value ? "#e1e5e8" : "#1A1A1A",
                            stroke: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                            strokeWidth: 1,
                        },
                    },
                },
                timeTag: {
                    show: false,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 12,
                    circleMarker: {
                        radius: 3,
                        color: isDarkMode.value ? "#6A6A6A" : "#1A1A1A",
                    },
                    useDefaultFormat: true,
                    timeFormat: "yyyy-MM-dd HH:mm:ss",
                    customFormat: null,
                },
                highlightArea: {
                    show: true,
                    from: 1,
                    to: 2,
                    color: "#1f77b4",
                    opacity: 10,
                    caption: {
                        text: "This area is highlighted",
                        fontSize: 20,
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                        bold: false,
                        offsetY: 0,
                        width: "auto",
                        padding: 3,
                        textAlign: "center",
                    },
                },
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
                        smooth: true,
                        selectedColor: isDarkMode.value ? "#8A8A8A" : "#1F77B4",
                        selectedColorOpacity: 0.2,
                        lineColor: "#1F77B4",
                        selectionRadius: 2,
                        indicatorColor: isDarkMode.value
                            ? "#CCCCCC"
                            : "#1A1A1A",
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
                    preview: {
                        enable: true,
                        fill: "#CCCCCC50",
                        stroke: "#6A6A6A",
                        strokeWidth: 2,
                        strokeDasharray: 0,
                    },
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
                    useDefaultFormat: true,
                    timeFormat: "yyyy-MM-dd HH:mm:ss",
                    customFormat: null,
                },
                padding: { top: 12, right: 36, bottom: 12, left: 12 },
                grid: {
                    stroke: isDarkMode.value ? "#e1e5e8" : "#C4C4C4",
                    showVerticalLines: false,
                    showHorizontalLines: false,
                    position: "middle",
                    frame: {
                        show: false,
                        stroke: "#E1E5E8",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: 0,
                    },
                    labels: {
                        show: true,
                        color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                        fontSize: 20,
                        axis: {
                            yLabel: "yLabel",
                            yLabelOffsetX: 0,
                            xLabel: "xLabel",
                            xLabelOffsetY: 0,
                            fontSize: 20,
                        },
                        zeroLine: { show: true },
                        yAxis: {
                            reverse: false,
                            position: "left",
                            commonScaleSteps: 10,
                            useIndividualScale: false,
                            useNiceScale: true,
                            stacked: false,
                            gap: 28,
                            labelWidth: 40,
                            showBaseline: true,
                            scaleMin: null,
                            scaleMax: 100,
                            groupColor: null,
                            scaleLabelOffsetX: 0,
                            scaleValueOffsetX: 0,
                            showCrosshairs: true,
                            crosshairSize: 6,
                            serieNameFormatter: null,
                        },
                        xAxis: {
                            showBaseline: true,
                            showCrosshairs: true,
                            crosshairsAlwaysAtZero: false,
                            crosshairSize: 6,
                            commonScaleSteps: 10,
                            useNiceScale: true,
                            scaleMin: null,
                            scaleMax: null,
                            rounding: 1,
                            formatter: null,
                            reverse: false,
                        },
                        xAxisLabels: {
                            color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                            show: true,
                            showOnlyFirstAndLast: false,
                            showFirstAndLast: true,
                            values: monthValues.value,
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
                            fontSize: 18,
                            yOffset: 0,
                            rotation: 0,
                            showOnlyAtModulo: false,
                            modulo: 12,
                            autoRotate: { enable: true, angle: -30 },
                        },
                    },
                },
                comments: {
                    show: true,
                    showInTooltip: true,
                    width: 200,
                    offsetX: 0,
                    offsetY: isDarkMode.value ? -64 : 0,
                },
                labels: { fontSize: 20, prefix: "", suffix: "" },
                legend: {
                    show: true,
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    fontSize: 16,
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
                    show: true,
                    text: "Title",
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        fontSize: 16,
                        color: isDarkMode.value ? "#c8c8c8" : "#565656",
                        text: "Subtitle",
                    },
                },
                tooltip: {
                    teleportTo: "body",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                    show: true,
                    showValue: true,
                    showPercentage: false,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                    borderWidth: 1,
                    fontSize: 14,
                    backgroundOpacity: 30,
                    position: "center",
                    offsetY: 24,
                    showTimeLabel: true,
                    useDefaultTimeFormat: true,
                    timeFormat: "yyyy-MM-dd HH:mm:ss",
                    smooth: true,
                    smoothForce: 0.18,
                    smoothSnapThreshold: 0.25,
                },
                userOptions: {
                    annotatorPalette: COLOR_PICKER_PALETTE,
                    useCursorPointer: false,
                    print: {
                        scale: 2,
                        orientation: "auto",
                        overflowTolerance: 0.2,
                    },
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
                },
            },
            bar: {
                showTransition: true,
                borderRadius: 2,
                useGradient: true,
                periodGap: 0.1,
                border: {
                    useSerieColor: false,
                    strokeWidth: 1,
                    stroke: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                },
                labels: {
                    show: true,
                    offsetY: -6,
                    rounding: 0,
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    offsetX: 0,
                    rotation: 0,
                    textAnchor: null,
                    alwaysOnTop: false,
                },
                serieName: {
                    show: false,
                    offsetY: -6,
                    useAbbreviation: true,
                    useSerieColor: true,
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    bold: false,
                    abbreviationSize: 3,
                },
            },
            line: {
                showTransition: true,
                radius: 4,
                useGradient: true,
                strokeWidth: 2,
                cutNullValues: false,
                nullDashes: { show: false },
                interLine: { pairs: [], colors: [], fillOpacity: 0.25 },
                dot: {
                    hideAboveMaxSerieLength: 62,
                    useSerieColor: true,
                    fill: "#FFFFFF",
                    strokeWidth: 0.5,
                    selectedRadius: 4.5,
                },
                labels: {
                    show: true,
                    offsetY: -12,
                    rounding: 0,
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    offsetX: 0,
                    rotation: 0,
                    textAnchor: null,
                    alwaysOnTop: false,
                },
                area: { useGradient: true, opacity: 30 },
                tag: { followValue: true, formatter: null, fontSize: 14 },
            },
            plot: {
                showTransition: true,
                radius: 3,
                useGradient: true,
                dot: { useSerieColor: true, fill: "#FFFFFF", strokeWidth: 0.5 },
                labels: {
                    show: false,
                    offsetY: -6,
                    rounding: 0,
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    offsetX: 0,
                    rotation: 0,
                    textAnchor: null,
                    alwaysOnTop: false,
                },
                tag: { followValue: true, formatter: null, fontSize: 14 },
            },
            table: {
                rounding: 0,
                responsiveBreakpoint: 400,
                sparkline: true,
                showSum: true,
                useDialog: false,
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    outline: "none",
                },
                columnNames: { period: "Period", total: "Total" },
            },
        }),
    set: configState.set,
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

watch(
    () => lang.value,
    (v) => {
        mutableDataset.value = JSON.parse(JSON.stringify(dataset.value));
    },
);

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
    store.docSnap = !store.docSnap;
}

function toggleUseIndividualScale() {
    config.value.chart.grid.labels.yAxis.useIndividualScale =
        !config.value.chart.grid.labels.yAxis.useIndividualScale;

    forceChartUpdate();
}

function toggleUseStacked() {
    config.value.chart.grid.labels.yAxis.stacked =
        !config.value.chart.grid.labels.yAxis.stacked;

    forceChartUpdate();
}

const shapeOptions = ref([
    "circle",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "star",
]);

const { configCode, showAllConfig } = useConfigCode();

function randomizeData(N = 11) {
    const len = N;
    function makeSet(n, m) {
        const arr = [];
        for (let i = 0; i < n; i += 1) {
            arr.push(Math.random() * m);
        }
        return arr;
    }

    mutableDataset.value[0].series = makeSet(len, 30);
    mutableDataset.value[1].series = makeSet(len, 30);
    mutableDataset.value[2].series = (() => {
        const s1 = mutableDataset.value[0].series;
        const s2 = mutableDataset.value[1].series;
        let arr = [];
        for (let i = 0; i < len; i += 1) {
            arr.push(s1[i] + s2[i] + 20);
        }
        return arr;
    })().slice(0, -2);

    average.value =
        [
            ...mutableDataset.value[0].series,
            ...mutableDataset.value[1].series,
            ...mutableDataset.value[2].series,
        ].reduce((a, b) => a + b, 0) /
        (mutableDataset.value[0].series.length +
            mutableDataset.value[1].series.length +
            mutableDataset.value[1].series.length);
}

const typeImports = computed(() => {
    return `import { VueUiXy, type VueUiXyDatasetItem, type VueUiXyConfig } from "vue-data-ui/vue-ui-xy"`;
});

const dsTypeCode = computed(() => {
    return `type VueUiXyDatasetItem = {
    name: string
    series: number[] | Array<{ x: number | null; y: number | null }> //  ${translations.value.docs.comments.xy.continuousX[store.lang]}
    type: "bar" | "line" | "plot"
    // ${translations.value.docs.comments.xy.type[store.lang]}
    color?: string // ${translations.value.docs.comments.xy.color[store.lang]}
    dashed?: boolean // ${translations.value.docs.comments.xy.dashed[store.lang]}
    useTag?: "start" | "end" // ${translations.value.docs.comments.xy.useTag[store.lang]}
    dataLabels?: boolean // ${translations.value.docs.comments.xy.dataLabels[store.lang]}
    useProgression?: boolean // ${translations.value.docs.comments.xy.useProgression[store.lang]}
    useArea?: boolean // ${translations.value.docs.comments.xy.area[store.lang]}
    useStepper?: boolean // ${translations.value.docs.comments.xy.useStepper[store.lang]}
    smooth?: boolean // ${translations.value.docs.comments.xy.smooth[store.lang]}
    shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star" // ${translations.value.docs.comments.xy.shape[store.lang]}
    scaleSteps?: number // ${translations.value.docs.comments.xy.scaleSteps[store.lang]}
    scaleLabel?: string // ${translations.value.docs.comments.xy.scaleLabel[store.lang]}
    scaleMax?: number // ${translations.value.docs.comments.xy.scaleMax[store.lang]}
    scaleMin?: number // ${translations.value.docs.comments.xy.scaleMin[store.lang]}
    autoScaling?: boolean // ${translations.value.docs.comments.xy.autoScaling[store.lang]}
    stackRatio?: number // (0 to 1) ${translations.value.docs.comments.xy.stackRatio[store.lang]}
    showSerieName?: "start" | "end" // ${translations.value.docs.comments.xy.showSerieName[store.lang]}
    prefix?: string // since v2.3.83
    suffix?: string // since v2.3.83
    dashIndices?: number[] // since v3.15.0 ${translations.value.docs.comments.xy.dashIndices[store.lang]}
    temperatureColors?: string[] // since v3.15.4 ${translations.value.docs.comments.xy.temperatureColors[store.lang]}
}`;
});

const cssContent = `
/* Main wrapper */
.vue-ui-xy {}

/* Title container */
.vue-ui-xy-title {}

/* Legend */
.vue-ui-xy-legend {}
.vue-ui-xy-legend-item {}
.vue-ui-xy-legend-item-segregated{}

/* Tags */
.vue-ui-xy-tag[data-tag="right"] {}
.vue-ui-xy-tag[data-tag="left"] {}
`;

const timeFormats = `const config = ref({
    chart: {
        tooltip: {
            customFormat: null,
            useDefaultTimeFormat: false,
            timeFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        timeTag: {
            show: true,
            customFormat: null,
            useDefaultFormat: false,
            timeFormat: 'yyyy-MM-dd HH:mm:ss',
        },
        zoom: {
            customFormat: null,
            useDefaultFormat: false,
            timeFormat: 'yyyy-MM-dd HH:mm:ss'
        }
    }
})`;

const timeFormatTranslation = ref({
    en: "When datetimeFormatter is enabled, you can also customize time labels for:",
    fr: "Lorsque datetimeFormatter est activé, vous pouvez également personnaliser les étiquettes de temps pour :",
    pt: "Quando o datetimeFormatter está ativado, você também pode personalizar os rótulos de tempo para:",
    de: "Wenn datetimeFormatter aktiviert ist, können Sie auch die Zeitbeschriftungen anpassen für:",
    zh: "启用 datetimeFormatter 后，您还可以自定义以下时间标签：",
    ja: "datetimeFormatter が有効な場合、時間ラベルをカスタマイズできます：",
    es: "Cuando datetimeFormatter está habilitado, también puede personalizar las etiquetas de tiempo para:",
    ko: "datetimeFormatter가 활성화되면 시간 레이블을 다음에 대해 사용자 정의할 수 있습니다:",
    ar: "عند تفعيل datetimeFormatter، يمكنك أيضًا تخصيص تسميات الوقت لـ:",
});

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const freestyleDataset = ref(`const dataset = ref([
    {
        name: 'Series A',
        type: 'line',
        color: '#8A8A8A',
        series: [12, 25, 31, 8, 42, 19, 16, 52, 29, 13],
        // Add custom metadata which will be exposed by the #svg slot:
        marked: true
    }
]);

function freestyle({ drawingArea, data }) {
    const filtered = (data || []).filter(d => !!d?.marked);
    const lines = (filtered || []).map((d, i) => {
        const max = getObjectByY((d?.plots || []), 'min')
        const min = getObjectByY((d?.plots || []), 'max')

        return \`
        <circle
            class="flashy-pos"
            cx="\${max?.x}"
            cy="\${max?.y}"
            r="12"
            stroke="#2ca02c"
            fill="#2ca02c50"
            stroke-width="2"
            fill="none"
        />
        <circle
            class="flashy-neg"
            cx="\${min?.x}"
            cy="\${min?.y}"
            r="12"
            stroke="#d62728"
            stroke-width="2"
            fill="#d6272850"
        />
        \`
    });
    return lines;
}

function getObjectByY(arr, type = 'max') {
    if (!Array.isArray(arr) || arr.length === 0) return null;

    return arr.reduce((selected, current) => {
        if (type === 'min') {
            return current?.y < selected?.y ? current : selected;
        }
        return current?.y > selected?.y ? current : selected;
    });
}`);

const freestyleTemplate = ref(`<VueUiXy :dataset="dataset" :config="config">
    <template #svg="{ svg }">
        <!-- Injected content -->
        <g v-html="freestyle(svg)"/>
    </template>
</VueUiXy>
`);

const freestyleStyle = ref(`.flashy-pos {
    animation: flashy-pos infinite 1s alternate-reverse;
}
.flashy-neg {
    animation: flashy-neg infinite 1s alternate-reverse;
}

@keyframes flashy-pos {
    from {
        r: 6;
        stroke: transparent;
        stroke-width: 1;
    }
    to {
        r: 12;
        stroke: #2ca02c;
        stroke-width: 3;
    }
}
@keyframes flashy-neg {
    from {
        r: 6;
        stroke: transparent;
        stroke-width: 1;
    }
    to {
        r: 12;
        stroke: #d62728;
        stroke-width: 3;
    }
}`);

function freestyle({ drawingArea, data }) {
    const filtered = (data || []).filter((d) => !!d?.marked);
    const lines = (filtered || []).map((d, i) => {
        const max = getObjectByY(d?.plots || [], "min");
        const min = getObjectByY(d?.plots || [], "max");

        return `
        <circle
            class="flashy-pos"
            cx="${max?.x}"
            cy="${max?.y}"
            r="12"
            stroke="#2ca02c"
            fill="#2ca02c50"
            stroke-width="2"
            fill="none"
        />
        <circle
            class="flashy-neg"
            cx="${min?.x}"
            cy="${min?.y}"
            r="12"
            stroke="#d62728"
            stroke-width="2"
            fill="#d6272850"
        />
        `;
    });
    return lines;
}

function getObjectByY(arr, type = "max") {
    if (!Array.isArray(arr) || arr.length === 0) return null;

    return arr.reduce((selected, current) => {
        if (type === "min") {
            return current?.y < selected?.y ? current : selected;
        }
        return current?.y > selected?.y ? current : selected;
    });
}

const customFormatCode =
    ref(`customFormat: ({ seriesIndex, datapoint, series, config, bars, lines, plots }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiXy" />

        <BaseDocDescription :text="translations.docs.tooltips.xy[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-xy"
            targetMaker="VueUiXy"
            :configSource="mainConfig.vue_ui_xy"
        />

        <div
            :class="`doc-whart-wrapper transition-all mx-auto w-full sm:w-2/3`"
        >
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiXy
                        :dataset="mutableDataset"
                        :config="config"
                        :key="key"
                    >
                        <template #plot-comment="{ plot }">
                            <div style="width: 100%; text-align: center">
                                {{ plot.comment }}
                            </div>
                        </template>
                    </VueUiXy>
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
            <div class="w-full flex justify-center mt-6">
                <BaseViewExampleButton link="/examples/categories#vue-ui-xy" />
            </div>
            <Rater itemId="vue_ui_xy" />
        </div>

        <BaseMigrationInfo
            autoRotate
            cssAnimation
            debug
            padding
            xyTransitions
            zoomPreview
        />

        <!-- <div class="w-full mx-auto max-w-[500px] flex flex-col p-6 border border-app-blue rounded-md bg-[#5f8bee12]">
            <span class="dark:text-blue-300">
                v2.1.52 : {{ translations.docs.comments.xy.individualScales[store.lang] }}
            </span>

            <div class="w-full flex flex-row place-items-center justify-center gap-2 mt-2">
                <input id="useCanvas" class="accent-app-blue" type="checkbox" @change="toggleUseIndividualScale">
                <label for="useCanvas" class="font-black dark:text-blue-300 cursor-pointer">Use individual scales</label>
            </div>
        </div> -->
        <Box
            ref="box"
            :showDatetimeFormatter="true"
            showEmits
            showSlots
            showTooltip
            showUseCases
            showThemes
            showResponsive
            showPatterns
            showCallbacks
            showSsr
            showZoomState
            showTricks
            schema="vue_ui_xy"
            signInfo="both"
        >
            <template v-slot:tab0>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        :title="translations.docs.datastructure[store.lang]"
                        class="mt-6"
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

            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                    <DebugHint component="VueUiXy" configType="VueUiXyConfig" />

                    <BaseCopyConfig :config="config" @reset="resetDefault" />

                    <p class="mt-3 text-gray-400">
                        {{ translations.docs.cssOverride[store.lang] }}
                    </p>
                    <div>
                        TS type:
                        <code class="text-app-blue"
                            ><BaseTextCopy>VueUiXyConfig</BaseTextCopy></code
                        >
                    </div>

                    <div class="my-4">
                        Toggle tree view:
                        <input type="checkbox" v-model="showAllConfig" />
                    </div>
                    <code ref="configCode">
                        <BaseDetails attr="const config: VueUiXyConfig" equal>
                            <VueUiXyConfigFields
                                :config="config"
                                @navigate="goToPage"
                                @select-tab="setActiveTab"
                            />
                        </BaseDetails>
                    </code>
                </div>
            </template>

            <template v-slot:tab2>
                <ComponentEmits
                    component="VueUiXy"
                    :names="[
                        'selectLegend',
                        'selectTimeLabel',
                        'selectX',
                        'zoomStart',
                        'zoomEnd',
                        'zoomReset',
                        'copyAlt',
                    ]"
                />

                <ExposedMethods
                    component="VueUiXy"
                    getImage
                    showHideSeries
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
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
            &lt;VueUiXy
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXy
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

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiXy"
                    :types="[
                        'hint',
                        'svg',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'reset-action',
                        'time-label',
                        'watermark',
                        'source',
                        'plot-comment',
                        'chart-background',
                        'pattern',
                        'area-gradient',
                        'bar-gradient',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-xy.vue"
                        />
                    </template>

                    <template #after="item">
                        <div v-if="item.names.includes('svg')" class="p-6">
                            {{ item.freestyle }}
                            <CodeParser
                                language="javascript"
                                :content="freestyleDataset"
                            />
                            <CodeParser
                                language="html"
                                :content="freestyleTemplate"
                            />
                            <!-- <CodeParser
                            language="css"
                            :content="freestyleStyle"
                        /> -->
                            <VueUiXy
                                :dataset="[
                                    {
                                        name: 'Series A',
                                        type: 'line',
                                        color: '#8A8A8A',
                                        series: [
                                            12, 25, 31, 8, 42, 19, 16, 52, 29,
                                            13,
                                        ],
                                        smooth: true,
                                        marked: true,
                                    },
                                ]"
                                :config="{
                                    chart: {
                                        zoom: { show: false },
                                    },
                                }"
                            >
                                <template #svg="{ svg }">
                                    <g v-html="freestyle(svg)" />
                                </template>
                            </VueUiXy>
                        </div>
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab4>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.chart.tooltip.customFormat</code
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

            <template #tab5>
                <uc-xy />
            </template>

            <template #tab6>
                <ThemesVueUiXy />
            </template>

            <template #tab7>
                <ResponsiveUnit height="600px">
                    <template #chart>
                        <VueUiXy
                            :dataset="mutableDataset"
                            :config="{
                                ...config,
                                responsive: true,
                                chart: {
                                    ...config.chart,
                                    highlightArea: {
                                        show: false,
                                    },
                                },
                            }"
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab8>
                <VueUiXy
                    :dataset="patternDataset"
                    :config="{
                        ...config,
                        chart: {
                            ...config.chart,
                            highlightArea: { show: false },
                        },
                        line: {
                            ...config.line,
                            radius: 4,
                        },
                    }"
                    :key="key"
                >
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern
                            v-if="seriesIndex === 0"
                            :id="patternId"
                            name="bubbles"
                            stroke="blue"
                            :strokeWidth="1"
                            :scale="1"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 2"
                            :id="patternId"
                            name="maze"
                            stroke="#fdd663"
                        />
                    </template>
                </VueUiXy>
            </template>

            <template #tab9>
                <BaseCssOverride :content="cssContent" />
            </template>

            <template #tab10>
                <DatetimeFormatterDoc
                    path="chart.grid.labels.xAxisLabels.datetimeFormatter"
                >
                    <div class="mt-6">
                        {{ timeFormatTranslation[store.lang] }}
                        <CodeParser
                            class="mt-2"
                            language="javascript"
                            :content="timeFormats"
                        />
                    </div>
                </DatetimeFormatterDoc>
            </template>

            <template #tab11>
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
                    path="chart"
                />
            </template>

            <template #tab12>
                <SsrGeneration component="VueUiXy" />
            </template>

            <template #tab13>
                <TricksVueUiXy />
            </template>

            <template #tab14>
                <BaseZoomState component="VueUiXy">
                    <ZoomStateVueUiXy />
                </BaseZoomState>
            </template>
        </Box>
    </div>
</template>
