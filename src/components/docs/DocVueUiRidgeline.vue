<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiRidgelineConfigFields from "./configuration/VueUiRidgelineConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import useMobile from "../../useMobile";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import CodeParser from "../customization/CodeParser.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import { VueUiPattern } from "vue-data-ui";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ExposedMethods from "../ExposedMethods.vue";
import colorBridge from "color-bridge";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { RouterLink, useRouter } from "vue-router";
import ThemesVueUiRidgeline from "../themes/ThemesVueUiRidgeline.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import ComponentEmits from "../ComponentEmits.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const { utils } = colorBridge();
const { shiftHue } = utils();

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

const monthValues = computed(() => {
    const yearStart = 2026;
    const arr = [];
    for (let i = 0; i < 21; i += 1) {
        const d = new Date(yearStart, i, 1);
        arr.push(d.getTime());
    }
    return arr;
});

function makeDs(n) {
    let arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push(
            Math.random() *
                (Math.random() > 0 ? 100 : -100) *
                (i === 12 ? 3 : 1),
        );
    }
    return arr;
}

function makeDataset(n) {
    let arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push({
            name: `Serie ${i}`,
            datapoints: [
                {
                    name: "Variable 1",
                    values: makeDs(24),
                },
                {
                    name: "Variable 2",
                    values: makeDs(24),
                },
            ],
        });
    }
    return arr;
}

const cities = ref([
    {
        name: "Moscow",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-7, -6, 0, 8, 15, 18, 20, 18, 13, 7, 1, -4],
            },
        ],
    },
    {
        name: "Chicago",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-4, -2, 3, 10, 16, 22, 24, 23, 19, 12, 5, -1],
            },
        ],
    },
    {
        name: "Toronto",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-3, -2, 2, 9, 15, 20, 22, 21, 17, 10, 4, -1],
            },
        ],
    },
    {
        name: "Berlin",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [0, 2, 6, 12, 16, 19, 21, 21, 17, 12, 7, 3],
            },
        ],
    },
    {
        name: "Beijing",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-3, 0, 6, 14, 20, 24, 26, 25, 20, 13, 5, -1],
            },
        ],
    },
    {
        name: "London",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [5, 6, 8, 11, 15, 18, 20, 20, 17, 13, 9, 6],
            },
        ],
    },
    {
        name: "Paris",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [5, 6, 9, 12, 16, 19, 21, 21, 18, 13, 8, 5],
            },
        ],
    },
    {
        name: "San Francisco",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [11, 12, 13, 13, 14, 15, 15, 16, 17, 16, 14, 12],
            },
        ],
    },
    {
        name: "New York",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [0, 2, 7, 13, 18, 24, 27, 26, 22, 15, 9, 3],
            },
        ],
    },
    {
        name: "Milan",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [3, 5, 9, 14, 18, 22, 24, 24, 20, 15, 8, 4],
            },
        ],
    },
    {
        name: "Madrid",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [6, 8, 11, 13, 17, 22, 26, 25, 21, 15, 10, 7],
            },
        ],
    },
    {
        name: "Rome",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [8, 9, 11, 14, 18, 22, 25, 25, 22, 17, 12, 9],
            },
        ],
    },
    {
        name: "Seoul",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-2, 0, 5, 12, 17, 21, 25, 26, 21, 15, 7, 1],
            },
        ],
    },
    {
        name: "Tokyo",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [5, 6, 9, 15, 19, 22, 26, 27, 24, 18, 13, 8],
            },
        ],
    },
    {
        name: "Los Angeles",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [14, 15, 15, 17, 18, 20, 22, 22, 22, 19, 16, 13],
            },
        ],
    },
    {
        name: "Istanbul",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [6, 6, 8, 12, 16, 21, 23, 23, 20, 16, 12, 8],
            },
        ],
    },
    {
        name: "Mexico City",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [13, 14, 15, 16, 16, 16, 15, 15, 15, 14, 13, 13],
            },
        ],
    },
]);

const color = ref("#5f8aee");

const dataset = computed(() => {
    return cities.value.map((c, i) => {
        return {
            ...c,
            datapoints: c.datapoints.map((d) => {
                return {
                    ...d,
                    color: shiftHue({
                        hexColor: color.value,
                        force: (isDarkMode.value ? -0.01 : -0.005) * i,
                    }),
                };
            }),
        };
    });
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            theme: "",
            customPalette: [],
            responsive: false,
            useCssAnimation: true,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            userOptions: {
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    tooltip: false,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: true,
                    labels: false,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: false,
                    annotator: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
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
                    roundingValue: 0,
                },
                columnNames: { series: "Series" },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    padding: { top: 12, right: 0, bottom: 0, left: 12 },
                    title: {
                        text: "Average temperatures",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "In °C",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                    legend: {
                        show: false,
                        bold: false,
                        backgroundColor: "#1A1A1A",
                        color: "#CCCCCC",
                        fontSize: 14,
                        selectAllToggle: {
                            show: false,
                            backgroundColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                    },
                    dialog: {
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        header: {
                            backgroundColor: isDarkMode.value
                                ? "#1A1A1A"
                                : "#F3F4F6",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                        xyChart: {
                            showTable: false,
                            line: {
                                radius: 4,
                                useGradient: true,
                                strokeWidth: 2,
                                cutNullValues: false,
                                dot: {
                                    hideAboveMaxSerieLength: 62,
                                    useSerieColor: true,
                                    fill: "#FFFFFF",
                                    strokeWidth: 0.5,
                                },
                                labels: {
                                    show: true,
                                    offsetY: -12,
                                    rounding: 0,
                                    color: isDarkMode.value
                                        ? "#c8c8c8"
                                        : "#1A1A1A",
                                },
                                area: { useGradient: true, opacity: 30 },
                            },
                            table: {
                                rounding: 0,
                                responsiveBreakpoint: 400,
                                sparkline: true,
                                showSum: true,
                                th: {
                                    backgroundColor: isDarkMode.value
                                        ? "#2A2A2A"
                                        : "#F3F4F6",
                                    color: isDarkMode.value
                                        ? "#c8c8c8"
                                        : "#1A1A1A",
                                    outline: "none",
                                },
                                td: {
                                    backgroundColor: isDarkMode.value
                                        ? "#2A2A2A"
                                        : "#F3F4F6",
                                    color: isDarkMode.value
                                        ? "#c8c8c8"
                                        : "#1A1A1A",
                                    outline: "none",
                                },
                                columnNames: {
                                    period: "Period",
                                    total: "Total",
                                },
                            },
                            chart: {
                                backgroundColor: isDarkMode.value
                                    ? "#1A1A1A"
                                    : "#F3F4F6",
                                color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                                highlighter: {
                                    color: isDarkMode.value
                                        ? "#e1e5e8"
                                        : "#1A1A1A",
                                    opacity: 10,
                                    useLine: false,
                                    lineDasharray: 2,
                                    lineWidth: 1,
                                },
                                tooltip: {
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    backgroundColor: isDarkMode.value
                                        ? "#1A1A1A"
                                        : "#FFFFFF",
                                    show: true,
                                    showValue: true,
                                    showPercentage: false,
                                    roundingValue: 0,
                                    roundingPercentage: 0,
                                    customFormat: null,
                                    borderRadius: 4,
                                    borderColor: isDarkMode.value
                                        ? "#3A3A3A"
                                        : "#e1e5e8",
                                    borderWidth: 1,
                                    fontSize: 14,
                                    backgroundOpacity: 30,
                                    position: "center",
                                    offsetY: 24,
                                    showTimeLabel: true,
                                },
                                zoom: {
                                    show: true,
                                    color: isDarkMode.value
                                        ? "#6A6A6A"
                                        : "#CCCCCC",
                                    highlightColor: "#4A4A4A",
                                    fontSize: isDarkMode.value ? undefined : 14,
                                    useResetSlot: isDarkMode.value
                                        ? undefined
                                        : false,
                                    startIndex: isDarkMode.value
                                        ? undefined
                                        : null,
                                    endIndex: isDarkMode.value
                                        ? undefined
                                        : null,
                                    enableRangeHandles: isDarkMode.value
                                        ? undefined
                                        : true,
                                    enableSelectionDrag: isDarkMode.value
                                        ? undefined
                                        : true,
                                    minimap: {
                                        show: true,
                                        smooth: true,
                                        selectedColor: isDarkMode.value
                                            ? "#8A8A8A"
                                            : "#1F77B4",
                                        selectedColorOpacity: 0.2,
                                        lineColor: "#1F77B4",
                                        selectionRadius: 2,
                                        indicatorColor: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#1A1A1A",
                                        verticalHandles: false,
                                    },
                                },
                                grid: {
                                    stroke: isDarkMode.value
                                        ? "#e1e5e8"
                                        : "#C4C4C4",
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
                                        color: isDarkMode.value
                                            ? "#c8c8c8"
                                            : "#1A1A1A",
                                        fontSize: 20,
                                        zeroLine: { show: true },
                                        xAxisLabels: {
                                            color: isDarkMode.value
                                                ? "#CCCCCC"
                                                : "#1A1A1A",
                                            show: true,
                                            showOnlyFirstAndLast: false,
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
                                            showOnlyAtModulo: false,
                                            modulo: 12,
                                            rotation: 0,
                                        },
                                    },
                                },
                                legend: isDarkMode.value
                                    ? {
                                          color: "#CCCCCC",
                                      }
                                    : undefined,
                            },
                        },
                    },
                    areas: {
                        height: 60,
                        rowHeight: 30,
                        strokeWidth: 1,
                        useGradient: true,
                        stroke: {
                            useSerieColor: false,
                            color: isDarkMode.value ? "#3A3A3A" : "#FFFFFF",
                        },
                        smooth: true,
                        opacity: 0.9,
                        useCommonColor: false,
                        maxPoint: {
                            show: true,
                            adaptStrokeToBackground: false,
                            stroke: isDarkMode.value ? "#9A9A9A" : "#4A4A4A",
                            strokeWidth: 1,
                            strokeDasharray: 4,
                        },
                    },
                    selector: {
                        show: true,
                        stroke: "#6A6A6A",
                        strokeWidth: 1,
                        strokeDasharray: 2,
                        labels: {
                            fontSize: 12,
                            formatter: null,
                            rounding: 0,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            showLast: false,
                        },
                        dot: {
                            radius: 4,
                            useDatapointColor: true,
                            fill: "#CCCCCC",
                            stroke: "#1A1A1A",
                            strokeWidth: 1,
                        },
                    },
                    zeroLine: {
                        show: true,
                        strokeWidth: 1,
                        strokeDasharray: 0,
                        useSerieColor: false,
                        stroke: isDarkMode.value ? "#4A4A4A" : "#8A8A8A",
                    },
                    xAxis: {
                        labels: {
                            prefix: "",
                            suffix: "",
                            values: isDarkMode.value
                                ? monthValues.value
                                : [
                                      "JAN",
                                      "FEB",
                                      "MAR",
                                      "APR",
                                      "MAY",
                                      "JUN",
                                      "JUL",
                                      "AUG",
                                      "SEP",
                                      "OCT",
                                      "NOV",
                                      "DEC",
                                  ],
                            color: isDarkMode.value ? "#8A8A8A" : "#1A1A1A",
                            fontSize: 14,
                            bold: false,
                            showOnlyAtModulo: true,
                            modulo: 2,
                            showOnlyFirstAndLast: false,
                            offsetY: 0,
                            rotation: 0,
                            autoRotate: { enable: true, angle: -30 },
                            datetimeFormatter: isDarkMode.value
                                ? {
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
                                  }
                                : undefined,
                        },
                    },
                    yAxis: {
                        labels: {
                            fontSize: 16,
                            bold: false,
                            color: isDarkMode.value ? "#8A8A8A" : "#1A1A1A",
                            offsetX: 0,
                            offsetY: 0,
                            centered: false,
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
    return `type VueUiRidgelineDatasetItem = {
    name: string
    datapoints: Array<{
        name: string
        values: number[]
        color?: string
    }>
}`;
});

const codeDataset = ref(`const dataset: VueUiRidgelineDatasetItem[] = [
    {
        name: "Toronto",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-3, -2, 2, 9, 15, 20, 22, 21, 17, 10, 4, -1],
            },
        ],
    },
    {
        name: "Berlin",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [0, 2, 6, 12, 16, 19, 21, 21, 17, 12, 7, 3],
            },
        ],
    }, 
    {
        name: "Beijing",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-3, 0, 6, 14, 20, 24, 26, 25, 20, 13, 5, -1],
            },
        ],
    },
];`);

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiRidgeline" />

        <BaseDocDescription
            :text="translations.docs.tooltips.ridgeline[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-ridgeline"
            targetMaker="VueUiRidgeline"
            :configSource="mainConfig.vue_ui_ridgeline"
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
                    <VueDataUi
                        component="VueUiRidgeline"
                        :dataset="dataset"
                        :config="config"
                    >
                    </VueDataUi>
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-ridgeline"
            />
        </div>

        <Rater itemId="vue_ui_ridgeline" class="mt-12" />

        <BaseMigrationInfo autoRotate cssAnimation debug />

        <Box
            ref="box"
            :showDatetimeFormatter="true"
            showEmits
            showCallbacks
            showSlots
            showThemes
            showResponsive
            showPatterns
            schema="vue_ui_ridgeline"
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
                    component="VueUiRidgeline"
                    configType="VueUiRidgelineConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="my-4">
                    TS type:
                    <code class="text-app-blue">VueUiRidgelineConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiRidgelineConfigFields
                        :config="config"
                        :context="{
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
                    component="VueUiRidgeline"
                    :names="[
                        'selectLegend',
                        'selectDatapoint',
                        'selectX',
                        'copyAlt',
                    ]"
                />
                <ExposedMethods
                    component="VueUiRidgeline"
                    getImage
                    showHideSeries
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
                    componentName="VueUiRidgeline"
                    :types="[
                        'hint',
                        'svg',
                        'legend',
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-ridgeline.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiRidgeline />
            </template>

            <template #responsive>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiRidgeline"
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
                <VueDataUi
                    component="VueUiRidgeline"
                    :dataset="dataset"
                    :config="config"
                    :key="key"
                >
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern
                            v-if="seriesIndex === 0"
                            :id="patternId"
                            name="scales"
                            stroke="grey"
                            :strokeWidth="1"
                            :scale="0.7"
                        />
                    </template>
                </VueDataUi>
            </template>

            <template #datetime-formatter>
                <DatetimeFormatterDoc
                    path="style.chart.xAxis.labels.datetimeFormatter"
                />
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
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
