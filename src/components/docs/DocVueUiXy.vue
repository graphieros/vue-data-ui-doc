<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucXy from "../useCases/uc-xy.vue";
import ThemesVueUiXy from "../themes/ThemesVueUiXy.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import useMobile  from "../../useMobile";
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

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const lang = computed(() => store.lang)
const average = ref(0);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const patternDataset = computed(() => {
    return [
    {
        name: "Series 1",
        series: [ 12, 25, 32, 64, 34, 26],
        type: "bar",
        color: "rgb(95,139,238)",
        shape: 'circle',
        dataLabels: false,
        scaleSteps: 3,
    },
    {
        name: "Series 2",
        series: [ 12, 25, 32, 64, 34, 26],
        type: "line",
        color: "rgb(66,211,146)",
        useArea: false,
        useProgression: false,
        dataLabels: false,
        scaleSteps: 3,
    },
    {
        name: "Series 4",
        series: [ 8, 20, 27, 48, 27, 20],
        type: "bar",
        smooth: true,
        useArea: false,
        dataLabels: false,
        color: "rgb(200,100,50)",
        scaleSteps: 3,
    },
]
})

const dataset = computed(() => {
    return [
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
        series: [75, 82, 80, null, 90, 97],
        type: "line",
        color: "#ff7f0e",
        useArea: false,
        dataLabels: false,
        smooth: true,
        shape: "circle",
        scaleSteps: 5,
        showSerieName: 'end'
    },
]
})

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
        showSerieName: 'end'
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

const config = ref({
    debug: true,
    loading: false,
    events: {
        datapointEnter: null,
        datapointLeave: null,
        datapointClick: null,
    },
    responsive: false,
    responsiveProportionalSizing: true,
    useCssAnimation: false,
    showTable: false,
    downsample: {
        threshold: 500
    },
    chart: {
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        annotations: [
            {
                show: true,
                yAxis: {
                    yTop: 70,
                    yBottom: 60,
                    label: {
                        text: 'Target range',
                        backgroundColor: '#42d392',
                        offsetX: 3,
                        fontSize: 18,
                        border: {
                            stroke: '#42d392',
                        }
                    },
                    line: {
                        stroke: '#42d392',
                        strokeDasharray: 5,
                    },
                    area: {
                        fill: '#42d392'
                    }
                }
            },
            {
                show: true,
                yAxis: {
                    yTop: 50,
                    yBottom: null,
                    label: {
                        text: 'Target n-1',
                        position: 'end',
                        textAnchor: 'end',
                        backgroundColor: '#ff6600',
                        color: '#1A1A1A',
                        fontSize: 18,
                        offsetY: 2,
                        border: {
                            stroke: '#3A3A3A',
                        },
                    },
                    line: {
                        stroke: '#ff6600',
                        strokeDasharray: 5,
                    }
                }
            }
        ],
        highlighter: {
            color: "#1A1A1A",
            opacity: 10,
            useLine: false,
            lineDasharray: 2,
            lineWidth: 1
        },
        timeTag: {
            show: false,
            backgroundColor: "#e1e5e8",
            color: "#1A1A1A",
            fontSize: 12,
            circleMarker: {
                radius: 3,
                color: "#1A1A1A"
            },
            useDefaultFormat: true,
            timeFormat: 'yyyy-MM-dd HH:mm:ss',
            customFormat: null
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
                color: "#2D353C",
                bold: false,
                offsetY: 0,
                width: "auto",
                padding: 3,
                textAlign: "center"
            }
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
            },
            preview: {
                enable: true,
                enable: false,
                fill: '#CCCCCC50',
                stroke: '#6A6A6A',
                strokeWidth: 2,
                strokeDasharray: 0,
            },
            useDefaultFormat: true,
            timeFormat: 'yyyy-MM-dd HH:mm:ss',
            customFormat: null
        },
        padding: {
            top:  12,
            right: 12,
            bottom: 12,
            left: 12
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
                axis: {
                    yLabel: "yLabel",
                    yLabelOffsetX: 0,
                    xLabel: "xLabel",
                    xLabelOffsetY: 0,
                    fontSize: 20
                },
                zeroLine: {
                    show: true,
                },
                yAxis: {
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
                    serieNameFormatter: null
                },
                xAxis: {
                    showBaseline: true,
                    showCrosshairs: true,
                    crosshairsAlwaysAtZero: false,
                    crosshairSize: 6,
                },
                xAxisLabels: {
                    color: "#1A1A1A",
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
                    rotation: 0,
                    showOnlyAtModulo: false,
                    modulo: 12,
                    autoRotate: {
                        enable: true,
                        angle: -30
                    }
                }
            }
        },
        comments: {
            show: true,
            showInTooltip: true,
            width: 200,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            fontSize: 20,
            prefix: '',
            suffix: ''
        },
        legend: {
            show: true,
            color: "#1A1A1A",
            fontSize: 16,
            position: 'bottom'
        },
        title: {
            show:true,
            text: "Title",
            color: "#1A1A1A",
            fontSize: 20,
            bold: true,
            textAlign: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            subtitle: {
                fontSize: 16,
                color: "#565656",
                text: "Subtitle"
            }
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
            showTimeLabel: true,
            useDefaultTimeFormat: true,
            timeFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        userOptions: {
            print: {
                scale: 2,
            },
            show: true,
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: 'right',
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
                labels: true,
                stack: true,
                fullscreen: true,
                annotator: true
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
                annotator: "Toggle annotator"
            }
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
            stroke: "#F3F4F6"
        },
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        },
        serieName: {
            show: false,
            offsetY: -6,
            useAbbreviation: true,
            useSerieColor: true,
            color: "#1A1A1A",
            bold: false,
            abbreviationSize: 3
        }
    },
    line: {
        showTransition: true,
        radius: 4,
        useGradient: true,
        strokeWidth: 2,
        cutNullValues: false,
        interLine: {
            pairs: [],
            colors: [],
            fillOpacity: 0.25
        },
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
        },
        tag: {
            followValue: true,
            formatter: null,
            fontSize: 14
        }
    },
    plot: {
        showTransition: true,
        radius: 3,
        useGradient: true,
        dot: {
            useSerieColor: true,
            fill: '#FFFFFF',
            strokeWidth: 0.5
        },
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        },
        tag: {
            followValue: true,
            formatter: null,
            fontSize: 14
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
    }
});

const darkModeConfig = ref({
    downsample: {
        threshold: 500
    },
    debug: true,
    loading: false,
    events: {
        datapointEnter: null,
        datapointLeave: null,
        datapointClick: null,
    },
    responsive: false,
    responsiveProportionalSizing: true,
    useCssAnimation: false,
    showTable: false,
    chart: {
        backgroundColor: "#1A1A1A",
        color: "#c8c8c8",
        annotations: [
            {
                show: true,
                yAxis: {
                    yTop: 70,
                    yBottom: 60,
                    label: {
                        text: 'Target range',
                        backgroundColor: '#42d392',
                        offsetX: 3,
                        fontSize: 18,
                        border: {
                            stroke: '#42d392',
                        }
                    },
                    line: {
                        stroke: '#42d392',
                        strokeDasharray: 5,
                    },
                    area: {
                        fill: '#42d392'
                    }
                }
            },
            {
                show: true,
                yAxis: {
                    yTop: 50,
                    yBottom: null,
                    label: {
                        text: 'Target n-1',
                        position: 'end',
                        textAnchor: 'end',
                        backgroundColor: '#ff6600',
                        color: '#1A1A1A',
                        fontSize: 18,
                        offsetY: 2,
                        border: {
                            stroke: '#3A3A3A',
                        },
                    },
                    line: {
                        stroke: '#ff6600',
                        strokeDasharray: 5,
                    }
                }
            }
        ],
        highlighter: {
            color: "#e1e5e8",
            opacity: 10,
            useLine: false,
            lineDasharray: 2,
            lineWidth: 1
        },
        timeTag: {
            show: false,
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            fontSize: 12,
            circleMarker: {
                radius: 3,
                color: "#6A6A6A"
            },
            useDefaultFormat: true,
            timeFormat: 'yyyy-MM-dd HH:mm:ss',
            customFormat: null
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
                color: "#FAFAFA",
                bold: false,
                offsetY: 0,
                width: "auto",
                padding: 3,
                textAlign: "center"
            }
        },
        zoom: {
            show: true,
            color: "#6A6A6A",
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
                lineColor: "#1F77B4",
                selectedColorOpacity: 0.2,
                selectedColor: '#8A8A8A',
                selectionRadius: 2,
                indicatorColor: '#CCCCCC',
                verticalHandles: false
            },
            preview: {
                enable: true,
                enable: false,
                fill: '#CCCCCC50',
                stroke: '#6A6A6A',
                strokeWidth: 2,
                strokeDasharray: 0,
            },
            useDefaultFormat: true,
            timeFormat: 'yyyy-MM-dd HH:mm:ss',
            customFormat: null
        },
        padding: {
            top:  12,
            right: 12,
            bottom: 12,
            left: 12
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
                axis: {
                    yLabel: "yLabel",
                    yLabelOffsetX: 0,
                    xLabel: "xLabel",
                    xLabelOffsetY: 0,
                    fontSize: 20
                },
                zeroLine: {
                    show: true,
                },
                yAxis: {
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
                    crosshairSize: 6,
                    crosshairsAlwaysAtZero: false,
                },
                xAxisLabels: {
                    color: "#c8c8c8",
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
                    rotation: 0,
                    showOnlyAtModulo: false,
                    modulo: 12,
                    autoRotate: {
                        enable: true,
                        angle: -30
                    }
                }
            }
        },
        comments: {
            show: true,
            showInTooltip: true,
            width: 200,
            offsetX: 0,
            offsetY: -64
        },
        labels: {
            fontSize: 20,
            prefix: "",
            suffix: ""
        },
        legend: {
            show: true,
            color: "#c8c8c8",
            fontSize: 16,
            position: 'bottom'
        },
        title: {
            show:true,
            text: "Title",
            color: "#c8c8c8",
            fontSize: 20,
            bold: true,
            textAlign: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            subtitle: {
                fontSize: 16,
                color: "#c8c8c8",
                text: "Subtitle"
            }
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
            showTimeLabel: true,
            useDefaultTimeFormat: true,
            timeFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        userOptions: {
            print: {
                scale: 2,
            },
            show: true,
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: 'right',
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
                labels: true,
                stack: true,
                fullscreen: true,
                annotator: true
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
                annotator: "Toggle annotator"
            }
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
            stroke: "#1A1A1A"
        },
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        },
        serieName: {
            show: false,
            offsetY: -6,
            useAbbreviation: true,
            useSerieColor: true,
            color: "#c8c8c8",
            bold: false,
            abbreviationSize: 3
        }
    },
    line: {
        showTransition: true,
        radius: 4,
        useGradient: true,
        strokeWidth: 2,
        cutNullValues: false,
        interLine: {
            pairs: [],
            colors: [],
            fillOpacity: 0.25
        },
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
    plot: {
        showTransition: true,
        radius: 3,
        useGradient: true,
        dot: {
            useSerieColor: true,
            fill: '#FFFFFF',
            strokeWidth: 0.5
        },
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }
    },
    table: {
        rounding: 0,
        responsiveBreakpoint: 400,
        sparkline: true,
        showSum: true,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "none",
        },
        columnNames: {
            period: "Period",
            total: "Total"
        }
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

watch(() => lang.value, (v) => {
    mutableDataset.value = JSON.parse(JSON.stringify(dataset.value))
})

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
    store.docSnap = !store.docSnap;
}

function toggleUseIndividualScale() {
    mutableConfig.value.chart.grid.labels.yAxis.useIndividualScale = !mutableConfig.value.chart.grid.labels.yAxis.useIndividualScale;
    mutableConfigDarkMode.value.chart.grid.labels.yAxis.useIndividualScale = !mutableConfigDarkMode.value.chart.grid.labels.yAxis.useIndividualScale;
    forceChartUpdate();
}

function toggleUseStacked() {
    mutableConfig.value.chart.grid.labels.yAxis.stacked = !mutableConfig.value.chart.grid.labels.yAxis.stacked;
    mutableConfigDarkMode.value.chart.grid.labels.yAxis.stacked = !mutableConfigDarkMode.value.chart.grid.labels.yAxis.stacked;
    forceChartUpdate();
}

const shapeOptions = ref([
    'circle',
    'triangle',
    'square',
    'diamond',
    'pentagon',
    'hexagon',
    'star'
]);

const { configCode, showAllConfig } = useConfigCode()

function randomizeData() {
    const len = 6;
    function makeSet(n ,m) {
        const arr = [];
        for (let i = 0; i < n; i += 1) {
            arr.push(Math.random() * m)
        }
        return arr
    }

    mutableDataset.value[0].series = makeSet(len, 30);
    mutableDataset.value[1].series = makeSet(len, 30);
    mutableDataset.value[2].series = (() => {
        const s1 = mutableDataset.value[0].series;
        const s2 = mutableDataset.value[1].series;
        let arr = []
        for (let i = 0; i < len; i += 1) {
            arr.push(s1[i] + s2[i] + 20)
        }
        return arr;
    })()

    average.value = [
        ...mutableDataset.value[0].series,
        ...mutableDataset.value[1].series,
        ...mutableDataset.value[2].series,
    ].reduce((a, b) => a + b, 0) / (mutableDataset.value[0].series.length + mutableDataset.value[1].series.length + mutableDataset.value[1].series.length)
}

const dsTypeCode = computed(() => {
    return `type VueUiXyDatasetItem = {
    name: string
    series: number[]
    type: "bar" | "line" | "plot"
    // ${translations.value.docs.comments.xy.type[store.lang]}
    color?: string // ${translations.value.docs.comments.xy.color[store.lang]}
    dashed?: boolean // ${translations.value.docs.comments.xy.dashed[store.lang]}
    useTag?: "start" | "end" // ${translations.value.docs.comments.xy.useTag[store.lang]}
    dataLabels?: boolean // ${translations.value.docs.comments.xy.dataLabels[store.lang]}
    useProgression?: boolean // ${translations.value.docs.comments.xy.useProgression[store.lang]}
    useArea?: boolean // ${translations.value.docs.comments.xy.area[store.lang]}
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
}`
})

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
`

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
})`

const timeFormatTranslation = ref({
    en: 'When datetimeFormatter is enabled, you can also customize time labels for:',
    fr: 'Lorsque datetimeFormatter est activé, vous pouvez également personnaliser les étiquettes de temps pour :',
    pt: 'Quando o datetimeFormatter está ativado, você também pode personalizar os rótulos de tempo para:',
    de: 'Wenn datetimeFormatter aktiviert ist, können Sie auch die Zeitbeschriftungen anpassen für:',
    zh: '启用 datetimeFormatter 后，您还可以自定义以下时间标签：',
    jp: 'datetimeFormatter が有効な場合、時間ラベルをカスタマイズできます：',
    es: 'Cuando datetimeFormatter está habilitado, también puede personalizar las etiquetas de tiempo para:',
    ko: 'datetimeFormatter가 활성화되면 시간 레이블을 다음에 대해 사용자 정의할 수 있습니다:',
    ar: 'عند تفعيل datetimeFormatter، يمكنك أيضًا تخصيص تسميات الوقت لـ:'
})

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiXy" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.xy[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-xy"
            targetMaker="VueUiXy"
            :configSource="mainConfig.vue_ui_xy"
        />

        <div :class="`doc-whart-wrapper transition-all mx-auto w-2/3`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <VueUiXy :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                    <template #plot-comment="{ plot }">
                        <div style="width:100%;text-align:center">
                            {{ plot.comment }}
                        </div>
                    </template>
                </VueUiXy>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData"/>
            <div class="w-full flex justify-center mt-6">
                <BaseViewExampleButton link="/examples/categories#vue-ui-xy"/>
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
        <Box :showDatetimeFormatter="true" showEmits showSlots showTooltip showUseCases showThemes showResponsive showPatterns schema="vue_ui_xy" signInfo="both">
            <template v-slot:tab0>

            <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
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
                    <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>

                    <p class="mt-3 text-gray-400">
                        {{  translations.docs.cssOverride[store.lang]  }}
                    </p>
                    <div>
                    TS type: <code class="text-app-blue">VueUiXyConfig</code>
                    </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>
<code ref="configCode">
    <BaseDetails attr="const config: VueUiXyConfig" equal>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="responsive" defaultVal="false" :comment="translations.responsive[store.lang]"/>
        <BaseAttr inactive name="responsiveProportionalSizing" defaultVal="true" :comment="translations.responsiveProportionalSizing[store.lang]"/>
        <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
        <BaseAttr inactive name="customPalette" defaultVal="[]" comment="string[]"/>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="showTable" attr="showTable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseDetails attr="events" :level="1">
            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        </BaseDetails>
        <BaseDetails attr="downsample" :level="1">
            <BaseAttr name="threshold" attr="downsample.threshold" type="number" defaultVal="500" :min="100" :max="5000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Threshold above which LTTB algorithm kicks in"/>
        </BaseDetails>
        <BaseDetails attr="chart" :level="1">
            <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
            <BaseAttr name="backgroundColor" attr="chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr inactive name="height" defaultVal="600"/>
            <BaseAttr inactive name="width" defaultVal="1000"/>
            <BaseDetails brackets attr="annotations" :level="2" title="chart.annotations">
                <BaseComment>{{ translations.annotationsArray[store.lang] }}</BaseComment>
                {
                    <BaseAttr indent inactive name="show" defaultVal="false,"/>
                    <BaseDetails indent attr="yAxis" title="chart.annotations[i].yAxis" :level="3">
                        <BaseAttr inactive name="yTop" defaultVal="null," :comment="translations.annotationsYTop[store.lang]"/>
                        <BaseAttr inactive name="yBottom" defaultVal="null," :comment="translations.annotationsYBottom[store.lang]"/>
                        <BaseDetails attr="label" :level="4" title="chart.annotations[i].yAxis.label">
                            <BaseAttr inactive name="text" defaultVal="'',"/>
                            <BaseAttr inactive name="color" defaultVal="'#2D353C',"/>
                            <BaseAttr inactive name="backgroundColor" defaultVal="'#E1E5E8',"/>
                            <BaseAttr inactive name="offsetX" defaultVal="0,"/>
                            <BaseAttr inactive name="offsetY" defaultVal="0,"/>
                            <BaseAttr inactive name="fontSize" defaultVal="14,"/>
                            <BaseAttr inactive name="textAnchor" defaultVal="'start'," comment="or 'end'"/>
                            <BaseAttr inactive name="position" defaultVal="'start'," comment="or 'end'"/>
                            <BaseDetails attr="padding" :level="5" title="chart.annotations[i].yAxis.label.padding">
                                <BaseAttr inactive name="top" defaultVal="5,"/>
                                <BaseAttr inactive name="right" defaultVal="10,"/>
                                <BaseAttr inactive name="bottom" defaultVal="5,"/>
                                <BaseAttr inactive name="left" defaultVal="10,"/>
                            </BaseDetails>
                            <BaseDetails attr="border" :level="5" title="chart.annotations[i].yAxis.label.border">
                                <BaseAttr inactive name="stroke" defaultVal="'#FFFFFF',"/>
                                <BaseAttr inactive name="strokeWidth" defaultVal="1,"/>
                                <BaseAttr inactive name="rx" defaultVal="0,"/>
                                <BaseAttr inactive name="ry" defaultVal="0,"/>
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="line" :level="4" title="chart.annotations[i].yAxis.line">
                            <BaseAttr inactive name="stroke" defaultVal="'#2D353C',"/>
                            <BaseAttr inactive name="strokeWidth" defaultVal="1,"/>
                            <BaseAttr inactive name="strokeDasharray" defaultVal="0,"/>
                        </BaseDetails>
                        <BaseDetails attr="area" :level="2" title="chart.annotations[i].yAxis.area">
                            <BaseAttr inactive name="fill" defaultVal="'#E1E5E8',"/>
                            <BaseAttr inactive name="opacity" defaultVal="30,"/>
                        </BaseDetails>
                    </BaseDetails>
                }, <BaseComment>Other annotations...</BaseComment>
            </BaseDetails>
            <BaseDetails attr="comments" :level="2" title="chart.comments">
                <BaseAttr name="show" attr="chart.comments.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showInTooltip" attr="chart.comments.showInTooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="width" attr="chart.comments.width" type="number" defaultVal="200" :min="50" :max="400" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetX" attr="chart.comments.offsetX" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="chart.comments.offsetY" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="grid" :level="2" title="chart.grid">
                <BaseAttr name="stroke" attr="chart.grid.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showVerticalLines" attr="chart.grid.showVerticalLines" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showHorizontalLines" attr="chart.grid.showHorizontalLines" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="position" attr="chart.grid.position" type="select" defaultVal="middle" :options="['middle', 'start']" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.3.40" :tooltip="translations.docTooltips.xy.gridPosition[store.lang]"/>
                <BaseDetails attr="frame" :level="3" title="chart.grid.frame">
                    <span><BaseComment>Since v2.3.40</BaseComment></span>
                    <BaseAttr name="show" attr="chart.grid.frame.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="chart.grid.frame.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="chart.grid.frame.strokeWidth" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeLinecap" attr="chart.grid.frame.strokeLinecap" type="select" defaultVal="round" :options="['round', 'square', 'butt']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeLinejoin" attr="chart.grid.frame.strokeLinejoin" type="select" defaultVal="round" :options="['round', 'arcs', 'bevel', 'miter', 'miter-clip']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeDasharray" attr="chart.grid.frame.strokeDasharray" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="labels" :level="3" title="chart.grid.labels">
                    <BaseAttr name="show" attr="chart.grid.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" :tooltip="translations.docTooltips.xy.labelsShow[store.lang]"/>
                    <BaseAttr name="color" attr="chart.grid.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="chart.grid.labels.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="axis" :level="4" title="chart.grid.labels.axis">
                        <BaseAttr name="yLabel" attr="chart.grid.labels.axis.yLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" :tooltip="translations.docTooltips.xy.axisLabels[store.lang]"/>
                        <BaseAttr name="yLabelOffsetX" attr="chart.grid.labels.axis.yLabelOffsetX" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="xLabel" attr="chart.grid.labels.axis.xLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" :tooltip="translations.docTooltips.xy.axisLabels[store.lang]"/>
                        <BaseAttr name="xLabelOffsetY" attr="chart.grid.labels.axis.xLabelOffsetY" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="chart.grid.labels.axis.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="xAxis" :level="4" title="chart.grid.labels.xAxis">
                        <BaseAttr name="showBaseline" attr="chart.grid.labels.xAxis.showBaseline" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showCrosshairs" attr="chart.grid.labels.xAxis.showCrosshairs" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="crosshairSize" attr="chart.grid.labels.xAxis.crosshairSize" type="number" defaultVal="6" :min="0" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="crosshairsAlwaysAtZero" attr="chart.grid.labels.xAxis.crosshairsAlwaysAtZero" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="xAxisLabels" :level="4" title="chart.grid.labels.xAxisLabels">
                        <BaseAttr name="show" attr="chart.grid.labels.xAxisLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showOnlyFirstAndLast" attr="chart.grid.labels.xAxisLabels.showOnlyFirstAndLast" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="chart.grid.labels.xAxisLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>values: [], <BaseComment>string[]</BaseComment></span>
                        <BaseDetails attr="datetimeFormatter" :level="5" title="chart.grid.labels.xAxisLabels.datetimeFormatter">
                            <BaseAttr name="enable" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.enable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="locale" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.locale" type="select" defaultVal="en" :options="store.locales" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="useUTC" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.useUTC" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="januaryAsYear" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.januaryAsYear" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="options" :level="6" title="chart.grid.labels.xAxisLabels.datetimeFormatter.options">
                                <BaseAttr name="year" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.options.year" type="text" defaultVal="yyyy" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="month" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.options.month" type="text" :defaultVal="`MMM 'yy`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="day" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.options.day" type="text" :defaultVal="`dd MMM`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="minute" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.options.minute" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="second" attr="chart.grid.labels.xAxisLabels.datetimeFormatter.options.second" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                        <BaseAttr name="fontSize" attr="chart.grid.labels.xAxisLabels.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="yOffset" attr="chart.grid.labels.xAxisLabels.yOffset" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showOnlyAtModulo" attr="chart.grid.labels.xAxisLabels.showOnlyAtModulo" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="modulo" attr="chart.grid.labels.xAxisLabels.modulo" type="number" defaultVal="12" :min="1" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="rotation" attr="chart.grid.labels.xAxisLabels.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="autoRotate" title="chart.grid.labels.xAxisLabels.autoRotate">
                            <BaseAttr name="enable" type="checkbox" defaultVal="true" attr="chart.grid.labels.xAxisLabels.autoRotate.enable" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="angle" type="number" :min="-90" :max="90" attr="chart.grid.labels.xAxisLabels.autoRotate.angle" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="yAxis" :level="4" title="chart.grid.labels.yAxis">
                        <BaseAttr name="commonScaleSteps" attr="chart.grid.labels.yAxis.commonScaleSteps" type="number" defaultVal="10" :min="2" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useIndividualScale" attr="chart.grid.labels.yAxis.useIndividualScale" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="useNiceScale" attr="chart.grid.labels.yAxis.useNiceScale" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="labelWidth" attr="chart.grid.labels.yAxis.labelWidth" type="number" defaultVal="40" :min="40" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stacked" attr="chart.grid.labels.yAxis.stacked" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Always use in combination with useIndividualScale: true" />
                        <BaseAttr name="gap" attr="chart.grid.labels.yAxis.gap" type="number" defaultVal="64" :min="20" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="To be used with useIndividualScale: true && stacked: true"/>
                        <BaseAttr name="showBaseline" attr="chart.grid.labels.yAxis.showBaseline" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                        <BaseAttr name="scaleMin" attr="chart.grid.labels.yAxis.scaleMin" type="number" defaultVal="null" :min="-1000" :max="0" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Force the min scale for the whole chart"/>
                        <BaseAttr name="scaleMax" attr="chart.grid.labels.yAxis.scaleMax" type="number" defaultVal="null" :min="0" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Force the max scale for the whole chart"/>
                        <BaseAttr name="groupColor" attr="chart.grid.labels.yAxis.groupColor" type="color" defaultVal="null" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set color of scales when they are grouped by the same scaleLabel (requires useIndividualScale: true)"/>
                        <BaseAttr name="scaleLabelOffsetX" attr="chart.grid.labels.yAxis.scaleLabelOffsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Active when useIndividualScale is set to true"/>
                        <BaseAttr name="scaleValueOffsetX" attr="chart.grid.labels.yAxis.scaleValueOffsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Active when useIndividualScale is set to true"/>
                        <BaseAttr name="showCrosshairs" attr="chart.grid.labels.yAxis.showCrosshairs" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="crosshairSize" attr="chart.grid.labels.yAxis.crosshairSize" type="number" defaultVal="6" :min="0" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="zeroLine" :level="4" title="chart.grid.labels.zeroLine">
                        <BaseAttr name="show" attr="chart.grid.labels.zeroLine.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" /> 
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="highlightArea" :level="2" title="chart.highlightArea">
                <span><BaseComment>Since v2.3.40, you can pass an array of highlighter objects in here for multiple highlight areas</BaseComment></span>
                <BaseAttr name="show" attr="chart.highlightArea.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="from" attr="chart.highlightArea.from" type="number" defaultVal="0" :min="0" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="to" attr="chart.highlightArea.to" type="number" defaultVal="0" :min="0" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="chart.highlightArea.color" type="color" :rgba="false" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="opacity" attr="chart.highlightArea.opacity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="caption" :level="3" title="chart.highlightArea.caption">
                    <BaseAttr name="text" attr="chart.highlightArea.caption.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="chart.highlightArea.caption.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="chart.highlightArea.caption.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="chart.highlightArea.caption.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="offsetY" attr="chart.highlightArea.caption.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
                    <BaseAttr inactive name="width" defaultVal="'auto' | number"/>
                    <BaseAttr name="padding" attr="chart.highlightArea.caption.padding" type="number" defaultVal="3" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="textAlign" attr="chart.highlightArea.caption.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="highlighter" :level="2" title="chart.highlighter">
                <BaseAttr name="color" attr="chart.highlighter.color" type="color" :rgba="false" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="opacity" attr="chart.highlighter.opacity" type="range" defaultVal="5" :min="0" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="useLine" attr="chart.highlighter.useLine" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="lineDasharray" attr="chart.highlighter.lineDasharray" type="number" defaultVal="2" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="lineWidth" attr="chart.highlighter.lineWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="chart.labels">
                <BaseAttr name="fontSize" attr="chart.labels.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="prefix" attr="chart.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="suffix" attr="chart.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="legend" :level="2" title="chart.legend">
                <BaseAttr name="show" attr="chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="position" attr="chart.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="padding" :level="2" title="chart.padding">
                <BaseAttr name="top" attr="chart.padding.top" type="number" defaultVal="0" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="right" attr="chart.padding.right" type="number" defaultVal="0" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bottom" attr="chart.padding.bottom" type="number" defaultVal="0" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="left" attr="chart.padding.left" type="number" defaultVal="0" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="timeTag" :level="2" title="chart.timeTag">
                <BaseAttr name="show" attr="chart.timeTag.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="backgroundColor" attr="chart.timeTag.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="chart.timeTag.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="chart.timeTag.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="circleMarker" :level="3" title="chart.timeTag.circleMarker">
                    <BaseAttr name="radius" attr="chart.timeTag.circleMarker.radius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="chart.timeTag.circleMarker.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseAttr name="useDefaultFormat" attr="chart.timeTag.useDefaultFormat" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="timeFormat" attr="chart.timeTag.timeFormat" type="text" defaultVal="yyyy-MM-dd HH:mm:ss" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Use with datetimeFormatter.enable = true"/>
                <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
            </BaseDetails>
            <BaseDetails attr="title" :level="2" title="chart.title">
                <BaseAttr name="show" attr="chart.title.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="text" attr="chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="textAlign" attr="chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="paddingLeft" attr="chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="paddingRight" attr="chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseDetails attr="subtitle" :level="3" title="chart.title.subtitle">
                    <BaseAttr name="fontSize" attr="chart.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="chart.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="text" attr="chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="tooltip" :level="2" title="chart.tooltip">
                <BaseAttr name="show" attr="chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="chart.tooltip.color" type="color" defaultVal="#2D353C" :rgba="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="backgroundColor" attr="chart.tooltip.backgroundColor" :rgba="false" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="showValue" attr="chart.tooltip.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showPercentage" attr="chart.tooltip.showPercentage" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab"/>
                <BaseAttr name="roundingValue" attr="chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="roundingPercentage" attr="chart.tooltip.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="borderRadius" attr="chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="borderColor" attr="chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="borderWidth" attr="chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="backgroundOpacity" attr="chart.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="position" attr="chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="chart.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showTimeLabel" attr="chart.tooltip.showTimeLabel" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useDefaultTimeFormat" attr="chart.tooltip.useDefaultTimeFormat" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="timeFormat" attr="chart.tooltip.timeFormat" type="text" defaultVal="yyyy-MM-dd HH:mm:ss" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="userOptions" :level="2" title="chart.userOptions">
                <BaseAttr name="show" attr="chart.userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showOnChartHover" attr="chart.userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="keepStateOnChartLeave" attr="chart.userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="position" attr="chart.userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="buttons" :level="3" title="chart.userOptions.buttons">
                    <BaseAttr name="tooltip" attr="chart.userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="pdf" attr="chart.userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="img" attr="chart.userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="csv" attr="chart.userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="table" attr="chart.userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="labels" attr="chart.userOptions.buttons.labels" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="stack" attr="chart.userOptions.buttons.stack" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="fullscreen" attr="chart.userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="annotator" attr="chart.userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                </BaseDetails>
                <BaseDetails attr="buttonTitles" :level="3" title="chart.userOptions.buttonTitles">
                    <BaseAttr name="open" attr="chart.userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="close" attr="chart.userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="tooltip" attr="chart.userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="pdf" attr="chart.userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="csv" attr="chart.userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="img" attr="chart.userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="table" attr="chart.userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="labels" attr="chart.userOptions.buttonTitles.labels" type="text" defaultVal="Toggle labels" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fullscreen" attr="chart.userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stack" attr="chart.userOptions.buttonTitles.stack" type="text" defaultVal="Toggle stack mode" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="annotator" attr="chart.userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="print" :level="3" title="chart.userOptions.print">
                    <BaseAttr name="scale" attr="chart.userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="zoom" :level="2" title="chart.zoom">
                <BaseAttr name="show" attr="chart.zoom.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="chart.zoom.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="highlightColor" attr="chart.zoom.highlightColor" type="color" defaultVal="#4A4A4A" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="chart.zoom.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr inactive name="useResetSlot" defaultVal="false" comment="To use a custom slot for the reset feature (see slots tab)"/>
                <BaseAttr inactive name="startIndex" defaultVal="null" comment="Force zoom start index (number)"/>
                <BaseAttr inactive name="endIndex" defaultVal="null" comment="Force zoom end index (number)"/>
                <BaseAttr name="enableRangeHandles" attr="chart.zoom.enableRangeHandles" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.63"/>
                <BaseAttr name="enableSelectionDrag" attr="chart.zoom.enableSelectionDrag" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.63"/>
                <BaseAttr name="useDefaultFormat" attr="chart.zoom.useDefaultFormat" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="timeFormat" attr="chart.zoom.timeFormat" type="text" defaultVal="yyyy-MM-dd HH:mm:ss" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Use with datetimeFormatter.enable = true"/>
                <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
                <BaseDetails attr="minimap" :level="3" title="chart.zoom.minimap">
                    <span><BaseComment>Since v2.3.49</BaseComment></span>
                    <BaseAttr name="show" attr="chart.zoom.minimap.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smooth" attr="chart.zoom.minimap.smooth" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="lineColor" attr="chart.zoom.minimap.lineColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="selectedColor" attr="chart.zoom.minimap.selectedColor" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="selectedColorOpacity" attr="chart.zoom.minimap.selectedColorOpacity" type="range" defaultVal="0.2" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="selectionRadius" attr="chart.zoom.minimap.selectionRadius" type="range" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="indicatorColor" attr="chart.zoom.minimap.indicatorColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="verticalHandles" attr="chart.zoom.minimap.verticalHandles" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.72"/>
                </BaseDetails>
                <BaseDetails attr="preview" :level="3" title="chart.zoom.preview">
                    <BaseAttr name="enable" attr="chart.zoom.preview.enable" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr inactive name="fill" attr="chart.zoom.preview.fill" type="color" defaultVal="#CCCCCC50" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Important: use a transparent color"/>
                    <BaseAttr name="stroke" attr="chart.zoom.preview.stroke" type="color" defaultVal="#6A6A6A" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="chart.zoom.preview.strokeWidth" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeDasharray" attr="chart.zoom.preview.strokeDasharray" type="number" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="bar" :level="1">
            <BaseAttr name="showTransition" attr="bar.showTransition" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="borderRadius" attr="bar.borderRadius" type="number" defaultVal="2" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="bar.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="periodGap" attr="bar.periodGap" type="range" defaultVal="0.1" :min="0" :max="0.9" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="border" :level="2" title="bar.border">
                <BaseAttr name="useSerieColor" attr="bar.border.useSerieColor" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeWidth" attr="bar.border.strokeWidth" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="stroke" attr="bar.border.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="bar.labels">
                <BaseAttr name="show" attr="bar.labels.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="bar.labels.offsetY" type="number" defaultVal="-6" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="rounding" attr="bar.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="bar.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
            </BaseDetails>
            <BaseDetails attr="serieName" :level="2" title="bar.serieName">
                <BaseAttr name="show" attr="bar.serieName.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="bar.serieName.offsetY" type="number" defaultVal="-6" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useSerieColor" attr="bar.serieName.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="bar.serieName.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="bar.serieName.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useAbbreviation" attr="bar.serieName.useAbbreviation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="abbreviationSize" attr="bar.serieName.abbreviationSize" type="number" defaultVal="3" :min="1" :max="8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="line" :level="1">
            <BaseAttr name="showTransition" attr="line.showTransition" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="radius" attr="line.radius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="line.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="line.strokeWidth" type="number" defaultVal="2" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="cutNullValues" attr="line.cutNullValues" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.7.2"/>
            <BaseDetails attr="interLine" :level="2" title="line.interLine">
                <BaseAttr inactive name="pairs" attr="line.interLine.pairs" defaultVal="[]" :comment="translations.xyInterLinePairs[store.lang]"/>
                <BaseAttr inactive name="colors" attr="line.interLine.colors" defaultVal="[]" :comment="translations.xyInterLineColors[store.lang]"/>
                <BaseAttr inactive name="fillOpacity" attr="line.interLine.fillOpacity" defaultVal="0.25"/>
            </BaseDetails>
            <BaseDetails attr="dot" :level="2" title="line.dot">
                <BaseAttr name="useSerieColor" attr="line.dot.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fill" attr="line.dot.fill" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeWidth" attr="line.dot.strokeWidth" type="number" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="area" :level="2" title="line.area">
                <BaseAttr name="useGradient" attr="line.area.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="opacity" attr="line.area.opacity" type="range" defaultVal="30" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="line.labels">
                <BaseAttr name="show" attr="line.labels.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="line.labels.offsetY" type="number" defaultVal="-6" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="rounding" attr="line.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="line.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
            </BaseDetails>
            <BaseDetails attr="tag" :level="2" title="line.tag">
                <BaseAttr name="followValue" attr="line.tag.followValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="line.tag.fontSize" type="number" :min="8" :max="42" defaultVal="14" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="plot" :level="1">
            <BaseAttr name="showTransition" attr="plot.showTransition" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="radius" attr="plot.radius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="plot.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="dot" :level="2" title="plot.dot">
                <BaseAttr name="useSerieColor" attr="plot.dot.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fill" attr="plot.dot.fill" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeWidth" attr="plot.dot.strokeWidth" type="number" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="plot.labels">
                <BaseAttr name="show" attr="plot.labels.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="plot.labels.offsetY" type="number" defaultVal="-6" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="rounding" attr="plot.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="plot.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
            </BaseDetails>
            <BaseDetails attr="tag" :level="2" title="plot.tag">
                <BaseAttr name="followValue" attr="plot.tag.followValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="plot.tag.fontSize" type="number" :min="8" :max="42" defaultVal="14" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="rounding" attr="table.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="showSum" attr="table.showSul" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.3.84"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="period" attr="table.columnNames.period" type="text" defaultVal="Period" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="total" attr="table.columnNames.total" type="text" defaultVal="Total" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>                    
                </div>
            </template>

            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            name: string;
            values: number[];
            color: string;
            type: "bar" | "line" | "plot"
        },
        {...}
    ]
    </code>
    </pre>

    <div><code><b>@selectTimeLabel</b></code></div>
    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.selectTimeLabel[store.lang] }}</div>

                <div><code><b>@selectX</b></code></div>
                <div class="text-gray-400 pl-5">{{  translations.docs.emits.xy.selectX[store.lang]  }}</div>
    <pre>
    <code>
    {
        dataset: [
            {
                name: string;
                value: number;
                color: string;
                type: "bar" | "line" | "plot"
            },
            {...}
        ],
        index: number;
        indexLabel: string;
    }
    </code>
    </pre>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
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
                <ExposedMethods
                    component="VueUiXy"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'toggleTable',
                        'toggleStack',
                        'toggleLabels'
                    ]"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiXy"
                    :types="[
                        'svg',
                        'legend',
                        'tooltip-before',
                        'tooltip-after',
                        'reset-action',
                        'time-label',
                        'watermark',
                        'source',
                        'plot-comment',
                        'chart-background',
                        'pattern'
                    ]" 
                />
            </template>

            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config, bars, lines, plots</span> }) => {
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

            <template #tab5>
                <uc-xy/>
            </template>

            <template #tab6>
                <ThemesVueUiXy/>
            </template>

            <template #tab7>
                <ResponsiveUnit height="600px">
                    <template #chart>
                        <VueUiXy 
                            :dataset="mutableDataset" 
                            :config="
                                isDarkMode 
                                    ? {
                                        ...mutableConfigDarkMode, 
                                        responsive: true,
                                        chart: {
                                            ...mutableConfigDarkMode.chart,
                                            highlightArea: {
                                                show: false,
                                            }
                                        }
                                    } 
                                    : {
                                        ...mutableConfig, 
                                        responsive: true,
                                        chart: {
                                            ...mutableConfig.chart,
                                            highlightArea: {
                                                show: false,
                                            }
                                        }
                                    }" 
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab8>
                <VueUiXy :dataset="patternDataset" :config="
                    isDarkMode ? 
                    {
                        ...mutableConfigDarkMode,
                        chart: {
                            ...mutableConfigDarkMode.chart,
                            highlightArea: { show: false }
                        },
                        line: {
                            ...mutableConfigDarkMode.line,
                            radius: 4
                        }
                    } : 
                    {
                        ...mutableConfig,
                        chart: {
                            ...mutableConfig.chart,
                            highlightArea: { show: false }
                        },
                        line: {
                            ...mutableConfig.line,
                            radius: 4
                        }
                    }" 
                    :key="key">
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern v-if="seriesIndex === 0" :id="patternId" name="bubbles" stroke="blue" :strokeWidth="1" :scale="1"/>
                        <VueUiPattern v-if="seriesIndex === 2" :id="patternId" name="maze" stroke="#fdd663"/>
                    </template>
                </VueUiXy>
            </template>

            <template #tab9>
                <BaseCssOverride
                    :content="cssContent"
                />
            </template>

            <template #tab10>
                <DatetimeFormatterDoc
                    path="chart.grid.labels.xAxisLabels.datetimeFormatter"
                >
                    <div class="mt-6">
                        {{ timeFormatTranslation[store.lang] }}
                        <CodeParser class="mt-2" language="javascript" :content="timeFormats"/>
                    </div>
                </DatetimeFormatterDoc>
            </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-xy-legend {
    padding: 12px 0;
}
</style>