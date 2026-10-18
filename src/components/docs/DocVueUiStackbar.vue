<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiStackbarConfigFields from "./configuration/VueUiStackbarConfigFields.vue";
import { ref, watch, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiStackbar from "../themes/ThemesVueUiStackbar.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";
import ZoomStateVueUiStackbar from "./zoom-state/ZoomStateVueUiStackbar.vue";
import BaseZoomState from "../Base/BaseZoomState.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

const emit = defineEmits(["forceDocReload"]);

watch(
    () => store.isDarkMode,
    (val) => {
        emit("forceDocReload");
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
        name: "Serie 1",
        series: [19, 20.07, 30, 40, 50, 60, 25, 29, 32],
    },
    {
        name: "Serie 2",
        series: [13, 8, 9, 13, 25, 27, 16, 18, 19],
    },
    {
        name: "Serie 3",
        series: [13, 10, 9, 13, 25, 19, 12, 13, 21],
    },
    {
        name: "Serie 4",
        series: [25, 23, 9, 13, 25, 31, 16, 19, 18],
    },
]);

const datasetWaterfall = ref([
    {
        name: "Revenue breakdown",
        type: "waterfall",
        series: [
            {
                name: "Initial revenue",
                type: "total",
                series: [
                    { name: "Product A", value: 250, color: "#FF8000" },
                    { name: "Product B", value: 150, color: "#A3D22D" },
                    { name: "Product C", value: 100, color: "#327F9C" },
                ],
            },
            {
                name: "Growth",
                type: "change",
                series: [
                    { name: "Product A", value: 80 },
                    { name: "Product B", value: 40 },
                    { name: "Product C", value: 30 },
                ],
            },
            {
                name: "Expenses",
                type: "change",
                series: [
                    { name: "Product A", value: -60 },
                    { name: "Product B", value: -40 },
                ],
            },
            {
                name: "Final revenue",
                type: "total",
                series: [
                    { name: "Product A", value: 270 },
                    { name: "Product B", value: 150 },
                    { name: "Product C", value: 130 },
                ],
            },
        ],
    },
]);

const isWaterfall = ref(false);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            theme: "",
            responsive: false,
            customPalette: [],
            useCssAnimation: true,
            orientation: "vertical",
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
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
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                columnNames: { period: "Period", total: "Total" },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                    roundingValue: 0,
                },
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: true,
                buttons: {
                    tooltip: true,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: true,
                    labels: true,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: false,
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
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    height: 500,
                    width: 800,
                    padding: { top: 12, right: 36, bottom: 12, left: 12 },
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
                    legend: {
                        show: true,
                        bold: false,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#f3f4f6",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        fontSize: 14,
                        position: "bottom",
                        selectAllToggle: {
                            show: false,
                            backgroundColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                    },
                    waterfall: {
                        bars: {
                            gapRatio: 0.5,
                            borderRadius: 0,
                            strokeWidth: 1,
                            stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                            gradient: { show: true, intensity: 20 },
                        },
                        colors: {
                            useSeriesColor: true,
                            positive: "#36A783",
                            negative: "#E76F51",
                            total: "#4C7899",
                            subtotal: "#8192B0",
                            neutral: "#A3A3A3",
                        },
                        connectors: {
                            show: true,
                            stroke: "#8B8B8B",
                            strokeWidth: 1,
                            strokeDasharray: "3 3",
                            adaptToRadius: false,
                            inset: 0,
                        },
                        categoryLabels: {
                            show: true,
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            rotation: 0,
                            offsetY: 0,
                        },
                        segmentLabels: {
                            show: true,
                            fontSize: 14,
                            bold: false,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            adaptColorToBackground: true,
                            minHeight: 14,
                            minWidth: 26,
                            showZero: false,
                            prefix: "",
                            suffix: "",
                            rounding: 0,
                            formatter: null,
                        },
                        stepLabels: {
                            show: true,
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            prefix: "",
                            suffix: "",
                            rounding: 0,
                            offset: 0,
                            showPlusSign: false,
                            showZero: true,
                            useBalanceForTotals: true,
                            formatter: null,
                        },
                    },
                    zoom: {
                        show: true,
                        autoFit: true,
                        keepState: false,
                        maxWidth: null,
                        color: "#CCCCCC",
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
                            indicatorColor: isDarkMode.value
                                ? "#CCCCCC"
                                : "#1A1A1A",
                            verticalHandles: false,
                            compact: true,
                            frameColor: isDarkMode.value
                                ? "#6A6A6A"
                                : "#CCCCCC",
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
                            fill: isDarkMode.value ? "#CCCCCC20" : "#CCCCCC50",
                            stroke: "#6A6A6A",
                            strokeWidth: 2,
                            strokeDasharray: 4,
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
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#FFFFFF",
                        fontSize: 14,
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
                        borderWidth: 1,
                        backgroundOpacity: 30,
                        position: "center",
                        offsetY: 24,
                        offsetX: 0,
                        showValue: true,
                        showPercentage: true,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        showTimeLabel: true,
                        smooth: true,
                        smoothForce: 0.18,
                        smoothSnapThreshold: 0.25,
                        useDefaultTimeFormat: true,
                        timeFormat: "yyyy-MM-dd HH:mm:ss",
                        showTotal: true,
                        totalTranslation: "Total",
                    },
                    highlighter: {
                        color: isDarkMode.value ? "#e1e5e8" : "#2D353C",
                        opacity: 5,
                    },
                    bars: {
                        gapRatio: 0.5,
                        distributed: false,
                        showDistributedPercentage: true,
                        borderRadius: 3,
                        strokeWidth: 1,
                        gradient: { show: true, intensity: 20 },
                        totalValues: {
                            show: true,
                            offsetY: 0,
                            fontSize: 16,
                            bold: false,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        },
                        dataLabels: {
                            show: true,
                            hideEmptyValues: false,
                            hideEmptyPercentages: false,
                            adaptColorToBackground: true,
                            color: isDarkMode.value ? "#1A1A1A" : "#2D353C",
                            fontSize: 14,
                            bold: false,
                            rounding: 0,
                            prefix: "",
                            suffix: "",
                        },
                    },
                    grid: {
                        frame: {
                            show: false,
                            stroke: isDarkMode.value ? "#6A6A6A" : "#E1E5E8",
                            strokeWidth: 2,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeDasharray: 0,
                        },
                        scale: { ticks: 10, scaleMin: null, scaleMax: null },
                        x: {
                            showAxis: true,
                            showHorizontalLines: true,
                            axisColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                            axisThickness: 2,
                            linesColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            linesThickness: 1,
                            linesStrokeDasharray: 0,
                            axisName: {
                                show: true,
                                text: "xAxis",
                                fontSize: 14,
                                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                                bold: false,
                                offsetY: 0,
                            },
                            timeLabels: {
                                show: true,
                                values: monthValues.value,
                                showOnlyFirstAndLast: false,
                                showFirstAndLast: true,
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
                                offsetY: 0,
                                rotation: 0,
                                autoRotate: { enable: true, angle: -30 },
                                fontSize: 14,
                                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                                bold: false,
                            },
                        },
                        y: {
                            position: "left",
                            showAxis: true,
                            showVerticalLines: isDarkMode.value ? true : false,
                            axisColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                            axisThickness: 2,
                            linesColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            linesThickness: 1,
                            linesStrokeDasharray: 0,
                            axisName: {
                                show: true,
                                text: "yAxis",
                                fontSize: 14,
                                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                                bold: false,
                                offsetX: 0,
                            },
                            axisLabels: {
                                formatter: null,
                                show: true,
                                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                                fontSize: 14,
                                bold: false,
                                rounding: 0,
                            },
                        },
                    },
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
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode();

const innerTranslations = ref({
    distributed: {
        en: "This bar chart has a config option to show distributed bars. In this mode, all bars take the full height of the chart, and show proportions of each datapoint.",
        fr: "Ce graphique à barres dispose d’une option de configuration pour afficher des barres réparties. Dans ce mode, toutes les barres occupent la pleine hauteur du graphique et montrent les proportions de chaque point de données.",
        pt: "Este gráfico de barras possui uma opção de configuração para mostrar barras distribuídas. Neste modo, todas as barras ocupam a altura total do gráfico e mostram as proporções de cada ponto de dados.",
        de: "Dieses Balkendiagramm hat eine Konfigurationsoption, um verteilte Balken anzuzeigen. In diesem Modus nehmen alle Balken die volle Höhe des Diagramms ein und zeigen die Anteile jedes Datenpunkts.",
        zh: "该条形图有一个配置选项，可以显示分布的条形。在此模式下，所有条形占据图表的全部高度，并显示每个数据点的比例。",
        ja: "この棒グラフには、バーを分布表示するための設定オプションがあります。このモードでは、すべてのバーがグラフの全高を占め、各データポイントの割合を示します。",
        es: "Este gráfico de barras tiene una opción de configuración para mostrar barras distribuidas. En este modo, todas las barras ocupan toda la altura del gráfico y muestran las proporciones de cada punto de datos.",
        ko: "이 막대 차트에는 분포된 막대를 표시하는 구성 옵션이 있습니다. 이 모드에서는 모든 막대가 차트의 전체 높이를 차지하며 각 데이터 포인트의 비율을 보여줍니다.",
        ar: "يحتوي مخطط الأعمدة هذا على خيار تكوين لعرض الأعمدة الموزعة. في هذا الوضع، تأخذ جميع الأعمدة الارتفاع الكامل للمخطط وتعرض نسب كل نقطة بيانات.",
    },
    toggle: {
        en: "Toggle distributed mode",
        fr: "Basculer en mode distribué",
        pt: "Alternar para o modo distribuído",
        de: "Verteilten Modus umschalten",
        zh: "切换分布模式",
        ja: "分布モードを切り替える",
        es: "Alternar modo distribuido",
        ko: "분포 모드 전환",
        ar: "تبديل وضع التوزيع",
    },
});

function randomizeData() {
    dataset.value[0].series = [
        Math.random() * 20,
        Math.random() * 25,
        Math.random() * 18,
        Math.random() * 50,
        Math.random() * 40,
        Math.random() * 55,
        Math.random() * 12,
        Math.random() * 20,
        Math.random() * 32,
    ];
    dataset.value[1].series = [
        Math.random() * 20,
        Math.random() * 25,
        Math.random() * 18,
        Math.random() * 55,
        Math.random() * 50,
        Math.random() * 40,
        Math.random() * 12,
        Math.random() * 20,
        Math.random() * 32,
    ];
    dataset.value[2].series = [
        Math.random() * 20,
        Math.random() * 18,
        Math.random() * 50,
        Math.random() * 55,
        Math.random() * 40,
        Math.random() * 25,
        Math.random() * 12,
        Math.random() * 20,
        Math.random() * 32,
    ];
    dataset.value[3].series = [
        Math.random() * 20,
        Math.random() * 18,
        Math.random() * 25,
        Math.random() * 50,
        Math.random() * 55,
        Math.random() * 40,
        Math.random() * 12,
        Math.random() * 20,
        Math.random() * 32,
    ];
}

const dsTypeCode = computed(() => {
    return `
    type VueUiStackbarDatasetItem =
        | VueUiStackbarStandardDatasetItem // default
        | VueUiStackbarWaterfallDatasetItem; // waterfall variant

    // Default stackbar layout
    type VueUiStackbarStandardDatasetItem = {
        [key: string]: any;
        name: string;
        series: Array<number | null>;
        color?: string;
    };

    // Waterfall variant (since v3.27.0)
    type VueUiStackbarWaterfallDatasetItem = {
        [key: string]: any;
        name: string;
        type: 'waterfall';
        startValue?: number;
        series: VueUiStackbarDatasetItemWaterfallSeries[];
        color?: string;
    };

    type VueUiStackbarDatasetItemWaterfallSeries = {
        name?: string;
        label?: string;
        type?: VueUiStackbarWaterfallKind;
        color?: string;
        series?: VueUiStackbarWaterfallSegment[];
    };
    
    type VueUiStackbarWaterfallKind = 'total' | 'subtotal' | 'change';

    type VueUiStackbarWaterfallSegment = {
        key?: string | number;
        id?: string | number;
        name?: string;
        label?: string;
        value: number;
        color?: string;
    };`;
});

const codeDataset = ref(`// Default standard stackbar layout
const dataset: VueUiStackbarDatasetItem[] = [
    {
        name: "Serie 1",
        series: [19, 20.07, 30, 40, 50, 60],
    },
    {
        name: "Serie 2",
        series: [13, 8, 9, 13, 25, 27],
    },
    {
        name: "Serie 3",
        series: [13, 10, 9, 13, 25, 19],
    },
    {
        name: "Serie 4",
        series: [25, 23, 9, 13, 25, 31],

    },
]`);

const codeDatasetWaterfall = ref(`// Waterfall dataset variant (since v3.27.0)
const dataset: VueUiStackbarDatasetItem[] = [
    {
        name: "Revenue breakdown",
        type: "waterfall",
        series: [
            {
                name: "Initial revenue",
                type: "total",
                series: [
                    { name: "Product A", value: 250, color: "#FF8000" },
                    { name: "Product B", value: 150, color: "#A3D22D" },
                    { name: "Product C", value: 100, color: "#327F9C" },
                ],
            },
            {
                name: "Growth",
                type: "change",
                series: [
                    { name: "Product A", value: 80 },
                    { name: "Product B", value: 40 },
                    { name: "Product C", value: 30 },
                ],
            },
            {
                name: "Expenses",
                type: "change",
                series: [
                    { name: "Product A", value: -60 },
                    { name: "Product B", value: -40 },
                ],
            },
            {
                name: "Final revenue",
                type: "total",
                series: [
                    { name: "Product A", value: 270 },
                    { name: "Product B", value: 150 },
                    { name: "Product C", value: 130 },
                ],
            },
        ],
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

const freestyleDataset = ref(`const dataset = ref([
    {
        name: 'Series A',
        series: [1, 2, 3, 4, 5, 6],
        // custom metadata, available in the #svg slot
        marked: true,
    },
    {
        name: 'Series B',
        series: [12, 2, 8, 7, 3, 1],
        // custom metadata, available in the #svg slot
        marked: true,
    },
    {
        name: 'Series C',
        series: [3, 4, 5, 6, 7, 8],
    },
]);

function freestyle({ drawingArea, data }) {
    const marked = data?.filter((d) => !!d.marked);
    const paths = marked.map((m, i) => {
        const dp = m ?? { x: [], y: [] };
        const minY = Math.min(...dp?.y);
        const minX = dp.x[dp.y.indexOf(minY)];
        const maxY = Math.max(...dp?.y);
        const maxX = dp.x[dp.y.indexOf(maxY)];
        return \`
                <defs>
                    <marker
                        id="arrow_\${i}"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>
                <path
                    d="M\${
                    minX > maxX
                        ? \`\${maxX},\${maxY} \${minX},\${minY}\`
                        : \`\${minX},\${minY} \${maxX},\${maxY}\`
                    }"
                    stroke="#000000"
                    marker-end=\"url(#arrow_\${i})"
                />
            \`;
    });
    return paths;
}`);

const freestyleTemplate =
    ref(`<VueUiStackbar :config="config" :dataset="dataset">
    <template #svg="{ svg }">
        <g v-html="freestyle(svg)"/>
    </template>
</VueUiStackbar>
`);

function freestyle({ drawingArea, data }) {
    const marked = data?.filter((d) => !!d.marked);
    const paths = marked.map((m, i) => {
        const dp = m ?? { x: [], y: [] };
        const minY = Math.min(...dp?.y);
        const minX = dp.x[dp.y.indexOf(minY)];
        const maxY = Math.max(...dp?.y);
        const maxX = dp.x[dp.y.indexOf(maxY)];
        return `
            <defs>
                <marker
                    id="arrow_${i}"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            <path
                d="M${
                    minX > maxX
                        ? `${maxX},${maxY} ${minX},${minY}`
                        : `${minX},${minY} ${maxX},${maxY}`
                }"
                stroke="#000000"
                marker-end="url(#arrow_${i})"
            />
        `;
    });
    return paths;
}

const customFormatCode =
    ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);

const waterfallSwitch = ref({
    fr: "Voir la variante en cascade",
    en: "View waterfall variant",
    pt: "Ver variante em cascata",
    de: "Wasserfallvariante anzeigen",
    zh: "查看瀑布图变体",
    ja: "ウォーターフォールチャートのバリエーションを見る",
    es: "Ver variante de cascada",
    ko: "워터폴 차트 변형 보기",
    ar: "عرض نوع المخطط الشلالي",
});

const waterfallExplain = ref({
    fr: "Cette section de la configuration est disponible lorsque le jeu de données est structuré pour un graphique en cascade. Consultez l'onglet des données pour plus d'informations.",
    en: "This section of the configuration is available when the dataset is configured for a waterfall chart. See the dataset tab for more information.",
    pt: "Esta seção da configuração está disponível quando o conjunto de dados está estruturado para um gráfico em cascata. Consulte a aba de dados para mais informações.",
    de: "Dieser Konfigurationsabschnitt ist verfügbar, wenn der Datensatz für ein Wasserfalldiagramm strukturiert ist. Weitere Informationen finden Sie auf der Registerkarte „Datensatz“.",
    zh: "当数据集按照瀑布图的要求进行配置时，此配置部分才可用。有关更多信息，请参阅数据集选项卡。",
    ja: "この設定セクションは、データセットがウォーターフォールチャート用に構成されている場合に利用できます。詳細については、データセットタブをご覧ください。",
    es: "Esta sección de la configuración está disponible cuando el conjunto de datos está estructurado para un gráfico de cascada. Consulta la pestaña de datos para obtener más información.",
    ko: "이 설정 섹션은 데이터셋이 워터폴 차트에 맞게 구성된 경우에 사용할 수 있습니다. 자세한 내용은 데이터셋 탭을 참조하세요.",
    ar: "يتوفر قسم الإعدادات هذا عندما تكون مجموعة البيانات مهيأة لمخطط شلالي. راجع علامة تبويب مجموعة البيانات لمزيد من المعلومات.",
});
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiStackbar" />

        <BaseDocDescription
            :text="translations.docs.tooltips.stackbarBig[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-stackbar"
            targetMaker="VueUiStackbar"
            :configSource="mainConfig.vue_ui_stackbar"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <label class="w-full flex flex-row justify-center mb-2 gap-2">
                    <input type="checkbox" v-model="isWaterfall" />
                    <span
                        >{{ waterfallSwitch[store.lang] }}
                        <code class="text-xs text-gray-500"
                            >(v3.27.0+)</code
                        ></span
                    >
                </label>

                <BaseCard>
                    <VueUiStackbar
                        :dataset="isWaterfall ? datasetWaterfall : dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton v-if="!isWaterfall" @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-stackbar"
            />
        </div>

        <div class="w-full pt-6 pb-4 max-w-[600px] mx-auto">
            <code class="mt-4 flex flex-row place-items-center gap-4">
                <BaseAttr
                    name="orientation"
                    attr="orientation"
                    type="select"
                    defaultVal="vertical"
                    :options="['vertical', 'horizontal']"
                    :config="config"
                    @change="forceChartUpdate()"
                    comment="Since v2.3.45"
                />
            </code>
            <template v-if="!isWaterfall">
                <div dir="auto" class="mt-6 pt-4 border-t border-gray-500">
                    {{ innerTranslations.distributed[store.lang] }}
                </div>
                <code
                    class="mt-4 flex flex-row place-items-center gap-4 border-b border-gray-500 pb-4"
                >
                    <BaseAttr
                        name="distributed"
                        attr="style.chart.bars.distributed"
                        type="checkbox"
                        defaultVal="false"
                        :config="config"
                    />
                </code>
            </template>
        </div>

        <Rater itemId="vue_ui_stackbar" />

        <BaseMigrationInfo autoRotate cssAnimation debug padding />

        <Box
            ref="box"
            :showDatetimeFormatter="true"
            showCallbacks
            showEmits
            showSlots
            showTooltip
            showThemes
            showResponsive
            showPatterns
            showZoomState
            schema="vue_ui_stackbar"
            signInfo="both"
        >
            <template #dataset>
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        :title="translations.docs.datastructure[store.lang]"
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

                <div class="w-full overflow-x-auto mt-6">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDatasetWaterfall"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>

            <template #configuration>
                <DebugHint
                    component="VueUiStackbar"
                    configType="VueUiStackbarConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiStackbarConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiStackbarConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            setActiveTab,
                            store,
                            translations,
                            waterfallExplain,
                        }"
                    />
                </code>
            </template>

            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiStackbar"
                    :names="[
                        'selectLegend',
                        'selectDatapoint',
                        'selectTimeLabel',
                        'selectX',
                        'copyAlt',
                    ]"
                />
                <ExposedMethods
                    component="VueUiStackbar"
                    getImage
                    showHideSeries
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                        'toggleLabels',
                    ]"
                />

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.xy.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const stackbarChart = ref(null);
            const stackbarDatasett = ref([]);

            onMounted(async () => {
                stackbarDatasett.value = await stackbarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStackbar
                ref="stackbarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStackbar
                ref="stackbarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        stackbarDatasett: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.stackbarDatasett = await this.$refs.stackbarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>
            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiStackbar"
                    :types="[
                        'hint',
                        'svg',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'time-label',
                        'watermark',
                        'source',
                        'chart-background',
                        'pattern',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-stackbar.vue"
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
                            <VueUiStackbar
                                :dataset="[
                                    {
                                        name: 'Series A',
                                        series: [1, 2, 3, 4, 5, 6],
                                        marked: true,
                                    },
                                    {
                                        name: 'Series B',
                                        series: [12, 2, 8, 7, 3, 1],
                                        marked: true,
                                    },
                                    {
                                        name: 'Series C',
                                        series: [3, 4, 5, 6, 7, 8],
                                    },
                                ]"
                            >
                                <template #svg="{ svg }">
                                    <g v-html="freestyle(svg)" />
                                </template>
                            </VueUiStackbar>
                        </div>
                    </template>
                </BaseSlotDocumenter>
            </template>
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
            <template #themes>
                <ThemesVueUiStackbar :is-waterfall="isWaterfall" />
            </template>
            <template #responsive>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiStackbar"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #patterns>
                <VueUiStackbar :dataset="dataset" :config="config" :key="key">
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern
                            v-if="seriesIndex === 0"
                            :id="patternId"
                            name="zig-zag"
                            stroke="#FFFFFF40"
                            :strokeWidth="3"
                            :scale="0.5"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 1"
                            :id="patternId"
                            name="maze"
                            stroke="#6376DD60"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 2"
                            :id="patternId"
                            name="hexagon-flooring"
                            stroke="#FF000050"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 3"
                            :id="patternId"
                            name="bubbles"
                            stroke="#FF000050"
                        />
                    </template>
                </VueUiStackbar>
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
                        'table',
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>

            <template #zoom-state>
                <BaseZoomState component="VueUiStackbar">
                    <ZoomStateVueUiStackbar />
                </BaseZoomState>
            </template>
        </Box>
    </div>
</template>
