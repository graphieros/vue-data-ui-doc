<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiCandlestickConfigFields from "./configuration/VueUiCandlestickConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiCandlestick from "../themes/ThemesVueUiCandlestick.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
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
import ZoomStateVueUiCandlestick from "./zoom-state/ZoomStateVueUiCandlestick.vue";
import BaseZoomState from "../Base/BaseZoomState.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
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

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

function generateRandomCandlestickData({
    count = 12,
    startDate = Date.UTC(2026, 0, 1), // starting date
    interval = 30 * 24 * 60 * 60 * 1000, // 1 month in ms
    startPrice = 100,
    volatility = 0.2, // 20% volatility
} = {}) {
    const data = [];
    let lastClose = startPrice;

    for (let i = 0; i < count; i++) {
        const timestamp = startDate + i * interval;
        const changePercent = (Math.random() - 0.5) * volatility;
        const open = lastClose;
        const close = open * (1 + changePercent);
        const high = Math.max(open, close) * (1 + Math.random() * volatility);
        const low = Math.min(open, close) * (1 - Math.random() * volatility);
        const volume = Math.round(1000 + Math.random() * 9000);

        data.push([
            timestamp,
            Math.round(open),
            Math.round(high),
            Math.round(low),
            Math.round(close),
            volume,
        ]);

        lastClose = close;
    }
    return data;
}

const dataset = ref(generateRandomCandlestickData({ count: 100 }));

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            type: "candlestick",
            debug: false,
            loading: false,
            responsive: false,
            responsiveProportionalSizing: true,
            useCssAnimation: true,
            transitions: {
                enable: true,
                pauseOnLoad: true,
                pauseOnDatasetChange: false,
                activationDelayMs: 300,
            },
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right arrow keys to move between data points.",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontFamily: "inherit",
                height: 316,
                width: 500,
                layout: {
                    padding: { top: 0, right: 36, bottom: 0, left: 0 },
                    selector: {
                        color: isDarkMode.value ? "#E1E5E8" : "#1A1A1A",
                        opacity: isDarkMode.value ? 10 : 5,
                    },
                    grid: {
                        show: true,
                        stroke: isDarkMode.value ? "#666666" : "#C4C4C4",
                        strokeWidth: 0.5,
                        verticalLines: {
                            show: true,
                            strokeDasharray: 4,
                            strokeWidth: 0.5,
                            stroke: isDarkMode.value ? "#4A4A4A" : "#CCCCCC",
                        },
                        horizontalLines: {
                            show: true,
                            strokeDasharray: 4,
                            strokeWidth: 0.5,
                            stroke: isDarkMode.value ? "#4A4A4A" : "#CCCCCC",
                        },
                        xAxis: {
                            ticks: { show: true },
                            dataLabels: {
                                show: true,
                                fontSize: 10,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                offsetY: 0,
                                bold: false,
                                rotation: 0,
                                autoRotate: { enable: true, angle: -30 },
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
                                showOnlyFirstAndLast: false,
                                showFirstAndLast: true,
                                showOnlyAtModulo: true,
                                modulo: 12,
                            },
                        },
                        yAxis: {
                            position: "left",
                            scale: { min: null, max: null },
                            dataLabels: {
                                show: true,
                                fontSize: 12,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                roundingValue: 0,
                                offsetX: 0,
                                bold: false,
                                steps: 10,
                                prefix: "$",
                                suffix: "",
                            },
                        },
                    },
                    wick: {
                        stroke: isDarkMode.value ? "#6A6A6A" : "#8A8A8A",
                        strokeWidth: 0.5,
                        extremity: {
                            shape: "line",
                            size: "auto",
                            color: isDarkMode.value ? "#6A6A6A" : "#8A8A8A",
                        },
                    },
                    candle: {
                        borderRadius: isDarkMode.value ? 0 : 1,
                        stroke: isDarkMode.value ? "#2D353C" : "#1A1A1A",
                        strokeWidth: 0.5,
                        colors: { bearish: "#d62728", bullish: "#2ca02c" },
                        gradient: { show: true, underlayer: "#FFFFFF" },
                        widthRatio: 0.5,
                    },
                },
                zoom: {
                    show: true,
                    autoFit: true,
                    maxWidth: null,
                    color: "#CCCCCC",
                    highlightColor: "#4A4A4A",
                    fontSize: 14,
                    useResetSlot: false,
                    startIndex: null,
                    endIndex: null,
                    focusOnDrag: false,
                    focusRangeRatio: 0.2,
                    minimap: {
                        show: true,
                        selectedColor: "#1f77b4",
                        selectedColorOpacity: 0.2,
                        indicatorColor: "#CCCCCC",
                        verticalHandles: false,
                        compact: true,
                        frameColor: isDarkMode.value ? "#6A6A6A" : "#8A8A8A",
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
                            stroke: isDarkMode.value ? "#CCCCCC" : "#6A6A6A",
                            fillOpacity: 0.2,
                            strokeOpacity: 0.5,
                            strokeWidth: 1,
                            strokeDasharray: 0,
                        },
                    },
                    useDefaultFormat: false,
                    timeFormat: "yyyy-MM-dd",
                    customFormat: null,
                },
                title: {
                    text: "Title",
                    color: isDarkMode.value ? "#fafafa" : "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: isDarkMode.value ? "#A1A1A1" : "#565656",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false,
                    },
                },
                tooltip: {
                    teleportTo: "body",
                    show: true,
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 14,
                    roundingValue: 0,
                    prefix: "$",
                    suffix: "",
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: "center",
                    offsetY: 24,
                    offsetX: 0,
                    smooth: true,
                    smoothForce: 0.18,
                    smoothSnapThreshold: 0.25,
                    showChart: true,
                    useDefaultTimeFormat: false,
                    timeFormat: "yyyy-MM-dd",
                },
            },
            translations: {
                period: "Period",
                open: "Open",
                high: "High",
                low: "Low",
                close: "Close",
                volume: "Volume",
            },
            userOptions: {
                annotator: { showGroupActions: true, followZoom: true },
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    tooltip: true,
                    pdf: true,
                    img: true,
                    csv: true,
                    table: true,
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
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                    roundingValue: 2,
                    prefix: "$",
                    suffix: "",
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

const dsTypeCode = computed(() => {
    return `import { type OHLC } from "vue-data-ui/vue-ui-candlestick";
// Array<OHLC>`;
});

const dsTypeCodeExample = ref(`const dataset: Array<OHLC> = [
  // period | open | high | low | close | volume
  [1704067200000, 100, 107, 80, 93, 6164],
  [1706659200000, 93, 113, 88, 95, 8799],
  [1709251200000, 95, 116, 94, 98, 7490],
  [1711843200000, 98, 117, 73, 89, 4024],
  [1714435200000, 89, 98, 78, 94, 7355],
  [1717027200000, 94, 120, 85, 102, 2472],
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

const fakeDataFn = ref(`function generateRandomCandlestickData({
  count = 12,
  startDate = Date.UTC(2026, 0, 1), // starting date
  interval = 30 * 24 * 60 * 60 * 1000, // 1 month in ms
  startPrice = 100,
  volatility = 0.2 // 20% volatility
} = {}) {
  const data = [];
  let lastClose = startPrice;

  for (let i = 0; i < count; i += 1) {
    const timestamp = startDate + i * interval;
    const changePercent = (Math.random() - 0.5) * volatility;
    const open = lastClose;
    const close = open * (1 + changePercent);
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    const volume = Math.round(1000 + Math.random() * 9000);

    data.push([
      timestamp,
      Math.round(open),
      Math.round(high),
      Math.round(low),
      Math.round(close),
      volume
    ]);

    lastClose = close;
  }
  return data;
}

const fakeDataset = generateRandomCandlestickData({ count: 100 });
`);

const freestyleScript = ref(`function freestyle({ drawingArea, data }) {
  const maxVol = data.filter((d) => !!d.isMaxVolume);
  const minVol = data.filter((d) => !!d.isMinVolume);
  return \`
    <path
        d="M\${minVol[0]?.high?.x},\${minVol[0]?.high?.y} \${maxVol[0]?.high?.x},\${maxVol[0]?.high?.y}"
        stroke="black"
    />
    <path
        d="M\${minVol[0]?.low?.x},\${minVol[0]?.low?.y} \${maxVol[0]?.low?.x},\${maxVol[0]?.low?.y}"
        stroke="black"
    />
    <polygon 
        points="
            \${minVol[0]?.high.x},\${minVol[0]?.high?.y} 
            \${maxVol[0]?.high?.x},\${maxVol[0]?.high?.y} 
            \${maxVol[0]?.low?.x},\${maxVol[0]?.low?.y}
            \${minVol[0]?.low?.x},\${minVol[0]?.low?.y} 
        "
        fill="#00000020"
    />
\`;
}`);

const freestyleTemplate =
    ref(`<VueUiCandlestick :dataset="dataset" :config="config">
  <template #svg="{ svg }">
    <g v-html="freestyle(svg)" style="pointer-events:none;"/>
  </template>
</VueUiCandlestick>  
`);

function freestyle({ drawingArea, data }) {
    const maxVol = data.filter((d) => !!d.isMaxVolume);
    const minVol = data.filter((d) => !!d.isMinVolume);
    return `
        <path
            d="M${minVol[0]?.high?.x},${minVol[0]?.high?.y} ${maxVol[0]?.high?.x},${maxVol[0]?.high?.y}"
            stroke="black"
        />
        <path
            d="M${minVol[0]?.low?.x},${minVol[0]?.low?.y} ${maxVol[0]?.low?.x},${maxVol[0]?.low?.y}"
            stroke="black"
        />
        <polygon 
            points="
                ${minVol[0]?.high.x},${minVol[0]?.high?.y} 
                ${maxVol[0]?.high?.x},${maxVol[0]?.high?.y} 
                ${maxVol[0]?.low?.x},${maxVol[0]?.low?.y}
                ${minVol[0]?.low?.x},${minVol[0]?.low?.y} 
            "
            fill="#00000020"
        />
    `;
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
        <BaseDocTitle name="VueUiCandlestick" />

        <BaseDocDescription
            :text="translations.docs.tooltips.candlestick[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-candlestick"
            :configSource="mainConfig.vue_ui_candlestick"
        />

        <div :class="`transition-all mx-auto max-w-[600px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiCandlestick
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_candlestick" />

        <BaseMigrationInfo autoRotate cssAnimation debug padding />

        <Box
            ref="box"
            showEmits
            showCallbacks
            showSlots
            showTooltip
            showThemes
            showResponsive
            showZoomState
            schema="vue_ui_candlestick"
            signInfo="positiveOnly"
        >
            <template #dataset>
                {{ translations.docs.datastructure[store.lang] }}
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        class="my-6"
                    />
                </div>

                {{ translations.docs.example[store.lang] }}:<br />
                <span class="text-app-orange">
                    {{ translations.docs.comments.candlestick.order[store.lang]
                    }}<br />
                    period | open | high | low | close | volume
                </span>
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCodeExample"
                        class="my-6"
                    />
                </div>

                <div class="w-full">
                    Utility function to generate a fake dataset:
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="fakeDataFn"
                        class="my-6"
                    />
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUiCandlestick"
                    configType="VueUiCandlestickConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiCandlestickConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiCandlestickConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiCandlestick"
                    :names="['selectX', 'copyAlt']"
                />
                <ExposedMethods
                    component="VueUiCandlestick"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                    ]"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiCandlestick"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'svg',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'reset-action',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-candlestick.vue"
                        />
                    </template>
                    <template #after="item">
                        <div v-if="item.names.includes('svg')" class="p-6">
                            {{ item.freestyle }}
                            <CodeParser
                                language="javascript"
                                :content="freestyleScript"
                            />
                            <CodeParser
                                language="html"
                                :content="freestyleTemplate"
                            />
                            <div class="p-4 bg-white">
                                <VueUiCandlestick
                                    :dataset="dataset"
                                    :config="{
                                        style: {
                                            layout: {
                                                grid: {
                                                    xAxis: {
                                                        dataLabels: {
                                                            datetimeFormatter:
                                                                config.style
                                                                    .layout.grid
                                                                    .xAxis
                                                                    .dataLabels
                                                                    .datetimeFormatter,
                                                            showOnlyAtModulo: true,
                                                        },
                                                    },
                                                },
                                                selector: {
                                                    color: '#1A1A1A',
                                                    opacity: 5,
                                                },
                                            },
                                            zoom: {
                                                minimap: { show: true },
                                            },
                                        },
                                    }"
                                >
                                    <template #svg="{ svg }">
                                        <g
                                            v-html="freestyle(svg)"
                                            style="pointer-events: none"
                                        />
                                    </template>
                                </VueUiCandlestick>
                            </div>
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
                <ThemesVueUiCandlestick />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiCandlestick
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

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                        'table',
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>

            <template #zoom-state>
                <BaseZoomState component="VueUiCandlestick">
                    <ZoomStateVueUiCandlestick />
                </BaseZoomState>
            </template>
        </Box>
    </div>
</template>
