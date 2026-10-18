<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiStacklineConfigFields from "./configuration/VueUiStacklineConfigFields.vue";
import { ref, watch, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiStackline from "../themes/ThemesVueUiStackline.vue";
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
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";
import ZoomStateVueUiStackline from "./zoom-state/ZoomStateVueUiStackline.vue";
import BaseZoomState from "../Base/BaseZoomState.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

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
        shape: "square",
    },
    {
        name: "Serie 2",
        series: [13, 8, 9, 13, 25, 27, 16, 18, 19],
        shape: "hexagon",
    },
    {
        name: "Serie 3",
        series: [13, 10, 9, 13, 25, 19, 12, 13, 21],
        shape: "triangle",
    },
    {
        name: "Serie 4",
        series: [25, 23, 9, 13, 25, 31, 16, 19, 18],
        shape: "star",
    },
]);

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
            orientation: isDarkMode.value ? undefined : "vertical",
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
                useCursorPointer: false,
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
                        useLine: false,
                        lineDasharray: 2,
                        lineWidth: 1,
                    },
                    lines: {
                        useArea: true,
                        smooth: true,
                        areaOpacity: 0.5,
                        distributed: false,
                        showDistributedPercentage: true,
                        strokeWidth: 1,
                        gradient: { show: true, intensity: 20 },
                        path: {
                            useSerieColor: true,
                            stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                        },
                        totalValues: {
                            show: true,
                            offsetY: 0,
                            fontSize: 16,
                            bold: false,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        },
                        dot: {
                            hideAboveMaxSerieLength: 62,
                            useSerieColor: true,
                            fill: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                            stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                            strokeWidth: 0.5,
                            radius: 4,
                        },
                        dataLabels: {
                            hideAboveMaxSerieLength: 62,
                            offsetY: 0,
                            show: true,
                            hideEmptyValues: true,
                            hideUnderValue: null,
                            hideEmptyPercentages: true,
                            hideUnderPercentage: null,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            fontSize: 14,
                            bold: false,
                            rounding: 0,
                            prefix: "",
                            suffix: "",
                            formatter: null,
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
                            showVerticalLines: true,
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
        en: "This stacked line chart has a config option to show distributed series. In this mode, all bars take the full height of the chart, and show proportions of each datapoint.",
        fr: "Ce graphique en lignes empilées dispose d’une option de configuration pour afficher des séries distribuées. Dans ce mode, toutes les barres occupent la hauteur totale du graphique et affichent les proportions de chaque point de données.",
        pt: "Este gráfico de linhas empilhadas possui uma opção de configuração para mostrar séries distribuídas. Nesse modo, todas as barras ocupam toda a altura do gráfico e exibem as proporções de cada ponto de dados.",
        de: "Dieses gestapelte Liniendiagramm verfügt über eine Konfigurationsoption, um verteilte Reihen anzuzeigen. In diesem Modus nehmen alle Balken die gesamte Höhe des Diagramms ein und zeigen die Anteile jedes Datenpunkts.",
        zh: "此堆叠折线图具有显示分布系列的配置选项。在此模式下，所有条形都占据图表的全部高度，并显示每个数据点的比例。",
        ja: "この積み上げ折れ線グラフには、分布された系列を表示する設定オプションがあります。このモードでは、すべてのバーがグラフの全高さを占め、各データポイントの比率を表示します。",
        es: "Este gráfico de líneas apiladas tiene una opción de configuración para mostrar series distribuidas. En este modo, todas las barras ocupan toda la altura del gráfico y muestran las proporciones de cada punto de datos.",
        ko: "이 누적 선형 차트에는 분포된 시리즈를 표시하는 구성 옵션이 있습니다. 이 모드에서는 모든 막대가 차트의 전체 높이를 차지하며 각 데이터 포인트의 비율을 표시합니다.",
        ar: "يحتوي هذا المخطط الخطي المكدس على خيار إعداد لعرض السلاسل الموزعة. في هذا الوضع، تشغل جميع الأعمدة الارتفاع الكامل للمخطط وتُظهر نسب كل نقطة بيانات.",
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
    return `type VueUiStacklineDatasetItem = {
    name: string
    series: number[]
    color?: string
    shape?: 'circle' | 'triangle' | 'square' | 'diamond' | 'pentagon' | 'hexagon' | 'star' // defaults to 'circle' if not provided
    standalone?: boolean // If true, shows the series separately from the stack (show a total target for example)
    [key: string]: any // Recoverable through the #svg slot
}`;
});

const codeDataset = ref(`const dataset: VueUiStacklineDatasetItem[] = [
    {
        name: "Serie 1",
        series: [19, 20.07, 30, 40, 50, 60, 25, 29, 32],
        shape: 'square',
    },
    {
        name: "Serie 2",
        series: [13, 8, 9, 13, 25, 27, 16, 18, 19],
        shape: 'hexagon'
    },
    {
        name: "Serie 3",
        series: [13, 10, 9, 13, 25, 19, 12, 13, 21],
        shape: 'triangle'
    },
    {
        name: "Serie 4",
        series: [25, 23, 9, 13, 25, 31, 16, 19, 18],
        shape: 'star'
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
    ref(`<VueUiStackline :config="config" :dataset="dataset">
    <template #svg="{ svg }">
        <g v-html="freestyle(svg)"/>
    </template>
</VueUiStackline>
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiStackline" />

        <BaseDocDescription
            :text="translations.docs.tooltips.stackline[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-stackline"
            targetMaker="VueUiStackline"
            :configSource="mainConfig.vue_ui_stackline"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiStackline
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-stackline"
            />
        </div>

        <div
            class="w-full mt-6 pt-6 border-t border-gray-500 max-w-[600px] mx-auto"
        >
            <div dir="auto">
                {{ innerTranslations.distributed[store.lang] }}
            </div>
            <code class="mt-4 flex flex-row place-items-center gap-4">
                <BaseAttr
                    name="distributed"
                    attr="style.chart.lines.distributed"
                    type="checkbox"
                    defaultVal="false"
                    :config="config"
                />
            </code>
        </div>

        <Rater itemId="vue_ui_stackline" />

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
            schema="vue_ui_stackline"
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
            </template>

            <template #configuration>
                <DebugHint
                    component="VueUiStackline"
                    configType="VueUiStacklineConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiStacklineConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiStacklineConfigFields
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
            </template>

            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiStackline"
                    :names="[
                        'selectLegend',
                        'selectDatapoint',
                        'selectTimeLabel',
                        'selectX',
                        'copyAlt',
                    ]"
                />

                <ExposedMethods
                    component="VueUiStackline"
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

            const stacklineChart = ref(null);
            const stackbarDataset = ref([]);

            onMounted(async () => {
                stackbarDataset.value = await stacklineChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStackline
                ref="stacklineChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStackline
                ref="stacklineChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        stackbarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.stackbarDataset = await this.$refs.stacklineChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiStackline"
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-stackline.vue"
                        />
                    </template>
                    <!-- <template #after="item">
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
                        <VueUiStackline
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
                        </VueUiStackline>
                    </div>
                </template> -->
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
                <ThemesVueUiStackline />
            </template>

            <template #responsive>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiStackline"
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
                <VueUiStackline :dataset="dataset" :config="config" :key="key">
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
                </VueUiStackline>
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
                <BaseZoomState component="VueUiStackline">
                    <ZoomStateVueUiStackline />
                </BaseZoomState>
            </template>
        </Box>
    </div>
</template>
