<script setup>
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
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import { VueUiPattern } from "vue-data-ui";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseComment from "../BaseComment.vue";
import ExposedMethods from "../ExposedMethods.vue";
import colorBridge from "color-bridge";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { RouterLink, useRouter } from "vue-router";
import ThemesVueUiRidgeline from "../themes/ThemesVueUiRidgeline.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

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
    }
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
            Math.random() * (Math.random() > 0 ? 100 : -100) * (i === 12 ? 3 : 1)
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
                    color: shiftHue({ hexColor: color.value, force: (isDarkMode.value ? -0.01 : -0.005) * i }),
                };
            }),
        };
    });
});

const darkModeConfig = ref({
    debug: false,
    loading: false,
    theme: "",
    customPalette: [],
    responsive: false,
    useCssAnimation: true,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: "right",
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
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none",
        },
        td: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0,
        },
        columnNames: {
            series: "Series",
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            padding: {
                top: 12,
                right: 0,
                bottom: 0,
                left: 12,
            },
            title: {
                text: "Average temperatures",
                color: "#CCCCCC",
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
            },
            dialog: {
                show: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                header: {
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
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
                            fill: '#FFFFFF',
                            strokeWidth: 0.5
                        },
                        labels: {
                            show: true,
                            offsetY: -12,
                            rounding: 0,
                            color: "#c8c8c8",
                        },
                        area: {
                            useGradient: true,
                            opacity: 30
                        }
                    },
                    table: {
                        rounding: 0,
                        responsiveBreakpoint: 400,
                        sparkline: true,
                        showSum: true,
                        th: {
                            backgroundColor: "#2A2A2A",
                            color: "#c8c8c8",
                            outline: "none"
                        },
                        td: {
                            backgroundColor: "#2A2A2A",
                            color: "#c8c8c8",
                            outline: "none",
                        },
                        columnNames: {
                            period: "Period",
                            total: "Total"
                        }
                    },
                    chart:  {
                        backgroundColor: "#1A1A1A",
                        color: "#c8c8c8",
                        highlighter: {
                            color: "#e1e5e8",
                            opacity: 10,
                            useLine: false,
                            lineDasharray: 2,
                            lineWidth: 1
                        },
                        legend: {
                            color: '#CCCCCC',
                        },
                        tooltip: {
                            color: "#CCCCCC",
                            backgroundColor: "#1A1A1A",
                            show: true,
                            showValue: true,
                            showPercentage: false,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            customFormat: null,
                            borderRadius: 4,
                            borderColor:"#3A3A3A",
                            borderWidth: 1,
                            fontSize: 14,
                            backgroundOpacity: 30,
                            position: "center",
                            offsetY: 24,
                            showTimeLabel: true
                        },
                        zoom: {
                            show: true,
                            color: "#6A6A6A",
                            highlightColor: "#4A4A4A",
                            minimap: {
                                show: true,
                                smooth: true,
                                lineColor: "#1F77B4",
                                selectedColorOpacity: 0.2,
                                selectedColor: '#8A8A8A',
                                selectionRadius: 2,
                                indicatorColor: '#CCCCCC',
                                verticalHandles: false
                            }
                        },
                        grid: {
                            stroke: "#e1e5e8",
                            showVerticalLines: false,
                            showHorizontalLines: false,
                            position: 'middle',
                            frame: {
                                show: false,
                                stroke: '#E1E5E8',
                                strokeWidth: 2,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeDasharray: 0
                            },
                            labels: {
                                show: true,
                                color: "#c8c8c8",
                                fontSize: 20,
                                zeroLine: {
                                    show: true,
                                },
                                xAxisLabels: {
                                    color: "#CCCCCC",
                                    show: true,
                                    showOnlyFirstAndLast: false,
                                    values: monthValues.value,
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
                                    fontSize: 18,
                                    yOffset: 0,
                                    showOnlyAtModulo: false,
                                    modulo: 12,
                                    rotation: 0,
                                }
                            }
                        },
                    }
                },
            },
            areas: {
                height: 60,
                rowHeight: 30,
                strokeWidth: 1,
                useCommonColor: false,
                useGradient: true,
                stroke: {
                    useSerieColor: false,
                    color: "#3A3A3A",
                },
                smooth: true,
                opacity: 0.9,
                useCommonColor: false,
                maxPoint: {
                    show: true,
                    adaptStrokeToBackground: false,
                    stroke: "#9A9A9A",
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
                    color: "#CCCCCC",
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
                stroke: "#4A4A4A",
            },
            xAxis: {
                labels: {
                    prefix: "",
                    suffix: "",
                    rotation: 0,
                    autoRotate: {
                        enable: true,
                        angle: -30
                    },
                    values: monthValues.value,
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
                    color: "#8A8A8A",
                    fontSize: 14,
                    bold: false,
                    showOnlyAtModulo: true,
                    modulo: 6,
                    showOnlyFirstAndLast: false,
                    offsetY: 0,
                },
            },
            yAxis: {
                labels: {
                    fontSize: 16,
                    bold: false,
                    color: "#8A8A8A",
                    offsetX: 0,
                },
            },
        },
    },
});

const config = ref({
    debug: false,
    loading: false,
    theme: "",
    customPalette: [],
    responsive: false,
    useCssAnimation: true,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: "right",
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
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none",
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none",
            roundingValue: 0,
        },
        columnNames: {
            series: "Series",
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            padding: {
                top: 12,
                right: 0,
                bottom: 0,
                left: 12,
            },
            title: {
                text: "Average temperatures",
                color: "#1A1A1A",
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
            },
            dialog: {
                show: true,
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                header: {
                    backgroundColor: "#F3F4F6",
                    color: "#1A1A1A",
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
                            fill: '#FFFFFF',
                            strokeWidth: 0.5
                        },
                        labels: {
                            show: true,
                            offsetY: -12,
                            rounding: 0,
                            color: "#1A1A1A",
                        },
                        area: {
                            useGradient: true,
                            opacity: 30
                        }
                    },
                    table: {
                        rounding: 0,
                        responsiveBreakpoint: 400,
                        sparkline: true,
                        showSum: true,
                        th: {
                            backgroundColor: "#F3F4F6",
                            color: "#1A1A1A",
                            outline: "none"
                        },
                        td: {
                            backgroundColor: "#F3F4F6",
                            color: "#1A1A1A",
                            outline: "none",
                        },
                        columnNames: {
                            period: "Period",
                            total: "Total"
                        }
                    },
                    chart:  {
                        backgroundColor: "#F3F4F6",
                        color: "#1A1A1A",
                        highlighter: {
                            color: "#1A1A1A",
                            opacity: 10,
                            useLine: false,
                            lineDasharray: 2,
                            lineWidth: 1
                        },
                        tooltip: {
                            color: "#1A1A1A",
                            backgroundColor: "#FFFFFF",
                            show: true,
                            showValue: true,
                            showPercentage: false,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            customFormat: null,
                            borderRadius: 4,
                            borderColor:"#e1e5e8",
                            borderWidth: 1,
                            fontSize: 14,
                            backgroundOpacity: 30,
                            position: "center",
                            offsetY: 24,
                            showTimeLabel: true
                        },
                        zoom: {
                            show: true,
                            color: "#CCCCCC",
                            highlightColor: "#4A4A4A",
                            fontSize: 14,
                            useResetSlot: false,
                            startIndex: null,
                            endIndex: null,
                            enableRangeHandles: true,
                            enableSelectionDrag: true,
                            minimap: {
                                show: true,
                                smooth: true,
                                selectedColor: '#1F77B4',
                                selectedColorOpacity: 0.2,
                                lineColor: "#1F77B4",
                                selectionRadius: 2,
                                indicatorColor: '#1A1A1A',
                                verticalHandles: false
                            }
                        },
                        grid: {
                            stroke: "#C4C4C4",
                            showVerticalLines: false,
                            showHorizontalLines: false,
                            position: 'middle',
                            frame: {
                                show: false,
                                stroke: '#E1E5E8',
                                strokeWidth: 2,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeDasharray: 0
                            },
                            labels: {
                                show: true,
                                color: "#1A1A1A",
                                fontSize: 20,
                                zeroLine: {
                                    show: true,
                                },
                                xAxisLabels: {
                                    color: "#1A1A1A",
                                    show: true,
                                    showOnlyFirstAndLast: false,
                                    values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                                    fontSize: 18,
                                    yOffset: 0,
                                    showOnlyAtModulo: false,
                                    modulo: 12,
                                    rotation: 0,
                                }
                            }
                        },
                    }
                },
            },
            areas: {
                height: 60,
                rowHeight: 30,
                strokeWidth: 1,
                useCommonColor: false,
                useGradient: true,
                stroke: {
                    useSerieColor: false,
                    color: "#FFFFFF",
                },
                smooth: true,
                opacity: 0.9,
                useCommonColor: false,
                maxPoint: {
                    show: true,
                    adaptStrokeToBackground: false,
                    stroke: "#4A4A4A",
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
                    color: "#1A1A1A",
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
                stroke: "#8A8A8A",
            },
            xAxis: {
                labels: {
                    prefix: "",
                    suffix: "",
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                    color: "#1A1A1A",
                    fontSize: 14,
                    bold: false,
                    showOnlyAtModulo: true,
                    modulo: 6,
                    showOnlyFirstAndLast: false,
                    offsetY: 0,
                    rotation: 0,
                    autoRotate: {
                        enable: true,
                        angle: -30
                    }
                },
            },
            yAxis: {
                labels: {
                    fontSize: 16,
                    bold: false,
                    color: "#1A1A1A",
                    offsetX: 0,
                },
            },
        },
    },
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(
    JSON.parse(JSON.stringify(darkModeConfig.value))
);

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(
        JSON.stringify(darkModeConfig.value)
    );
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

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
    return `type VueUiRidgelineDatasetItem = {
    name: string
    datapoints: Array<{
        name: string
        values: number[]
        color?: string
    }>
}`
})

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
];`)

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiRidgeline" />

        <BaseDocDescription :text="translations.docs.tooltips.ridgeline[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-ridgeline"
            targetMaker="VueUiRidgeline"
            :configSource="mainConfig.vue_ui_ridgeline"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper :isFixed="isFixed" :disabled="!isFixed || isMobile" @fixChart="fixChart"
                @resetDefault="resetDefault" @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)">
                <BaseCard>
                    <VueDataUi component="VueUiRidgeline" :dataset="dataset"
                        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig">
                    </VueDataUi>
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-ridgeline"/>
        </div>

        <Rater itemId="vue_ui_ridgeline" class="mt-12" />

        <BaseMigrationInfo
            autoRotate
            cssAnimation
            debug
        />

        <Box ref="box" :showDatetimeFormatter="true" showEmits showCallbacks showSlots showThemes showResponsive showPatterns schema="vue_ui_ridgeline" signInfo="both">
            <template #tab0>
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

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiRidgelineConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>

                <code ref="configCode">
                    <BaseDetails attr="const config: VueUiRidgelineConfig" equal>
                        <span>responsive: false, <span class="text-gray-600 dark:text-app-blue text-xs">// {{ translations.responsive[store.lang] }}</span></span>
                        <BaseAttr inactive name="debug" defaultVal="false"/>
                        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        theme: "", ("celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")<br>
                        <span>customPalette: [], <span class="text-xs text-app-blue">// string[]</span></span>
                        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="events" :level="1">
                            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
                            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
                            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
                        </BaseDetails>
                        <BaseDetails attr="style" :level="1">
                            <span>fontFamily: "inherit",</span>
                            <BaseDetails attr="chart" :level="2" title="style.chart">
                                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" :min="0" :max="100" defaultVal="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" :min="0" :max="100" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" :min="0" :max="100" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" :min="0" :max="100" defaultVal="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                </BaseDetails>

                                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                </BaseDetails>

                                <BaseDetails attr="title" :level="3" title="style.chart.title">
                                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                </BaseDetails>

                                <BaseDetails attr="dialog" :level="3" title="style.chart.dialog">
                                    <BaseAttr name="show" attr="style.chart.dialog.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="backgroundColor" attr="style.chart.dialog.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="color" attr="style.chart.dialog.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseDetails attr="header" :level="4" title="style.chart.dialog.header">
                                        <BaseAttr name="backgroundColor" attr="style.chart.dialog.header.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="color" attr="style.chart.dialog.header.color" type="color" defaultVal="#2D353D" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                    <BaseDetails attr="xyChart" :level="4" title="style.chart.dialog.xyChart">
                                        <BaseComment class="hover:underline">
                                            <RouterLink to="/docs#vue-ui-xy">{{ translations.checkVueUiXyConfig[store.lang] }}</RouterLink>
                                        </BaseComment>
                                    </BaseDetails>
                                </BaseDetails>

                                <BaseDetails attr="areas" :level="3" title="style.chart.areas">
                                    <BaseAttr name="height" attr="style.chart.areas.height" type="number" defaultVal="60" :min="30" :max="150" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="rowHeight" attr="style.chart.areas.rowHeight" type="number" defaultVal="30" :min="10" :max="100" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="strokeWidth" attr="style.chart.areas.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseDetails attr="stroke" :level="4" title="style.chart.areas.stroke">
                                        <BaseAttr name="useSerieColor" attr="style.chart.areas.stroke.useSerieColor" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="color" attr="style.chart.areas.stroke.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                    <BaseAttr name="smooth" attr="style.chart.areas.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="opacity" attr="style.chart.areas.opacity" type="range" defaultVal="0.9" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="useCommonColor" attr="style.chart.areas.useCommonColor" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="useGradient" attr="style.chart.areas.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseDetails attr="maxPoint" :level="4" title="style.chart.areas.maxPoint">
                                        <BaseAttr name="show" attr="style.chart.areas.maxPoint.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="adaptStrokeToBackground" attr="style.chart.areas.maxPoint.adaptStrokeToBackground" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="stroke" attr="style.chart.areas.maxPoint.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="strokeWidth" attr="style.chart.areas.maxPoint.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="strokeDasharray" attr="style.chart.areas.maxPoint.strokeDasharray" type="number" defaultVal="4" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                </BaseDetails>

                                <BaseDetails attr="selector" :level="3" title="style.chart.selector">
                                    <BaseAttr name="show" attr="style.chart.selector.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="stroke" attr="style.chart.selector.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="strokeWidth" attr="style.chart.selector.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="strokeDasharray" attr="style.chart.selector.strokeDasharray" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseDetails attr="labels" :level="4" title="style.chart.selector.labels">
                                        <BaseAttr name="fontSize" attr="style.chart.selector.labels.fontSize" type="number" defaultVal="12" :min="8" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <div class="flex flex-row gap-2 place-items-center">
                                            <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                                            <div class="min-w-[200px]">
                                                <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                                                    Go to page
                                                </BaseTabLink>
                                            </div>
                                        </div>
                                        <BaseAttr name="rounding" attr="style.chart.selector.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="color" attr="style.chart.selector.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                    <BaseDetails attr="dot" :level="4" title="style.chart.selector.dot">
                                        <BaseAttr name="radius" attr="style.chart.selector.dot.radius" type="number" defaultVal="4" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="useDatapointColor" attr="style.chart.selector.dot.useDatapointColor" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="fill" attr="style.chart.selector.dot.fill" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="stroke" attr="style.chart.selector.dot.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="strokeWidth" attr="style.chart.selector.dot.strokeWidth" type="number" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                </BaseDetails>

                                <BaseDetails attr="zeroLine" :level="3" title="style.chart.zeroLine">
                                    <BaseAttr name="show" attr="style.chart.zeroLine.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="strokeWidth" attr="style.chart.zeroLine.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :step="0.5" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="strokeDasharray" attr="style.chart.zeroLine.strokeDasharray" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="useSerieColor" attr="style.chart.zeroLine.useSerieColor" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="stroke" attr="style.chart.zeroLine.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                </BaseDetails>

                                <BaseDetails attr="xAxis" :level="3" title="style.chart.xAxis">
                                    <BaseDetails attr="labels" :level="4" title="style.chart.xAxis.labels">
                                        <BaseAttr name="prefix" attr="style.chart.xAxis.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="suffix" attr="style.chart.xAxis.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="rotation" attr="style.chart.xAxis.labels.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseDetails attr="autoRotate" :level="5" title="style.chart.xAxis.labels.autoRotate">
                                            <BaseAttr name="enable" attr="style.chart.xAxis.labels.autoRotate.enable" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                            <BaseAttr name="angle" attr="style.chart.xAxis.labels.autoRotate.angle" type="number" defaultVal="-30" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        </BaseDetails>
                                        <span>values: string[],</span>
                                        <BaseDetails attr="datetimeFormatter" :level="5" title="style.chart.xAxis.labels.datetimeFormatter">
                                            <BaseAttr name="enable" attr="style.chart.xAxis.labels.datetimeFormatter.enable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                            <BaseAttr name="locale" attr="style.chart.xAxis.labels.datetimeFormatter.locale" type="select" defaultVal="en" :options="store.locales" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                            <BaseAttr name="useUTC" attr="style.chart.xAxis.labels.datetimeFormatter.useUTC" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                            <BaseAttr name="januaryAsYear" attr="style.chart.xAxis.labels.datetimeFormatter.januaryAsYear" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                            <BaseDetails attr="options" :level="6" title="style.chart.xAxis.labels.datetimeFormatter.options">
                                                <BaseAttr name="year" attr="style.chart.xAxis.labels.datetimeFormatter.options.year" type="text" defaultVal="yyyy" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                                <BaseAttr name="month" attr="style.chart.xAxis.labels.datetimeFormatter.options.month" type="text" :defaultVal="`MMM 'yy`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                                <BaseAttr name="day" attr="style.chart.xAxis.labels.datetimeFormatter.options.day" type="text" :defaultVal="`dd MMM`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                                <BaseAttr name="minute" attr="style.chart.xAxis.labels.datetimeFormatter.options.minute" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                                <BaseAttr name="second" attr="style.chart.xAxis.labels.datetimeFormatter.options.second" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                            </BaseDetails>
                                        </BaseDetails>
                                        <BaseAttr name="color" attr="style.chart.xAxis.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="fontSize" attr="style.chart.xAxis.labels.fontSize" type="number" defaultVal="14" :min="8" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="bold" attr="style.chart.xAxis.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="showOnlyAtModulo" attr="style.chart.xAxis.labels.showOnlyAtModulo" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="modulo" attr="style.chart.xAxis.labels.modulo" type="number" defaultVal="12" :min="2" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="showOnlyFirstAndLast" attr="style.chart.xAxis.labels.showOnlyFirstAndLast" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="offsetY" attr="style.chart.xAxis.labels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                </BaseDetails>

                                <BaseDetails attr="yAxis" :level="3" title="style.chart.yAxis">
                                    <BaseDetails attr="labels" :level="4" title="style.chart.yAxis.labels">
                                        <BaseAttr name="fontSize" attr="style.chart.yAxis.labels.fontSize" type="number" defaultVal="16" :min="8" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="bold" attr="style.chart.yAxis.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="color" attr="style.chart.yAxis.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="offsetX" attr="style.chart.yAxis.labels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                </BaseDetails>
                            </BaseDetails>
                        </BaseDetails>

                        <BaseDetails attr="userOptions" :level="1">
                            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            </BaseDetails>
                            <BaseDetails attr="callbacks" :level="2" title="userOptions.callbacks">
                                <BaseTabLink :action="() => setActiveTab(11)" icon="lambda">
                                    Check out 'callbacks' tab
                                </BaseTabLink>
                            </BaseDetails>
                            <BaseDetails attr="print" :level="2" title="userOptions.print">
                                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
                                <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
                                <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
                            </BaseDetails>
                        </BaseDetails>

                        <BaseDetails attr="table" :level="1">
                            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
                            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            </BaseDetails>
                            <BaseDetails attr="th" :level="2" title="table.th">
                                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="td" :level="2" title="table.td">
                                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                </code>
            </template>

            <template #tab2>
                <div>Emits:</div>
                <ul>
                    <li><code>@selectDatapoint</code> : {{ translations.docs.emits.selectDatapoint[store.lang] }}</li>
                    <li><code>@selectLegend</code> : {{ translations.docs.emits.xy.selectLegend[store.lang].replaceAll(':', '') }}</li>
                    <li><code>@selectX</code> : {{ translations.docs.emits.xy.selectX[store.lang].replaceAll(':', '') }}</li>
                </ul>

                <div class="mt-6">Exposed methods:</div>
                <ul>
                    <li><code>getData</code> : {{ translations.docs.emits.xy.getData[store.lang] }}</li>
                </ul>
                <ExposedMethods
                    component="VueUiRidgeline"
                    getImage
                    showHideSeries
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable'
                    ]"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiRidgeline"
                    :types="[
                        'svg',
                        'legend',
                        'time-label',
                        'watermark',
                        'source',
                        'chart-background',
                        'pattern',
                        'user-menu',
                        'annotator-actions'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiRidgeline/>
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiRidgeline" 
                            :dataset="dataset" 
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

            <template #tab8>
                <VueDataUi component="VueUiRidgeline" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern v-if="seriesIndex === 0" :id="patternId" name="scales" stroke="grey" :strokeWidth="1" :scale="0.7"/>
                    </template>
                </VueDataUi>
            </template>

            <template #tab10>
                <DatetimeFormatterDoc
                    path="style.chart.xAxis.labels.datetimeFormatter"
                />
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                        'table',
                        'svg'
                    ]"
                />
            </template>
        </Box>
    </div>
</template>