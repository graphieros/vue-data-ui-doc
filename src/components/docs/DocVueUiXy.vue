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

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const lang = computed(() => store.lang)

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
        series: [ -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: lang.value === 'zh' ? 'rgb(200,100,100)' : "rgb(95,139,238)",
        shape: 'circle',
        scaleSteps: 5,
    },
    {
        name: "Series 2",
        series: [ 55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: lang.value === 'zh' ? 'rgb(200,100,0)' : "rgb(66,211,146)",
        useArea: true,
        useProgression: true,
        dataLabels: false,
        shape: "triangle",
        scaleSteps: 5,
        showSerieName: 'end'
    },
    {
        name: "Series 3",
        series: [ 64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)",
        shape: "star",
        scaleSteps: 5,
        showSerieName: 'end'
    },
    {
        name: "Series 4",
        series: [ 0, 1, -2, 3, -4, 5, -6, 7, -8, 9, -10, 36, -12, 13, -14, 15, -16, 17, -18, 19, -20],
        comments: ["", "", "", "", "", "", "", "", "", "", "", "A comment for this specific datapoint"],
        type: "line",
        smooth: true,
        useArea: false,
        dataLabels: false,
        color: "rgb(200,200,50)",
        scaleSteps: 5,
        showSerieName: 'end'
    },
    {
        name: "Target",
        series: [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        type: "line",
        color: "#404040",
        dashed: true,
        useTag: "start",
        dataLabels: false,
        shape: 'circle',
        scaleSteps: 5,
    },
]
})

const config = ref({
    responsive: false,
    useCssAnimation: true,
    showTable: false,
    downsample: {
        threshold: 500
    },
    chart: {
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
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
            }
        },
        highlightArea: {
            show: true,
            from: 5,
            to: 8,
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
            }
        },
        padding: {
            top:  36,
            right: 92,
            bottom: 48,
            left: 64
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
                    stacked: false,
                    gap: 64,
                    labelWidth: 40,
                    showBaseline: true,
                    scaleMin: null,
                    scaleMax: null
                },
                xAxis: {
                    showBaseline: true
                },
                xAxisLabels: {
                    color: "#1A1A1A",
                    show: true,
                    showOnlyFirstAndLast: false,
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'],
                    fontSize: 18,
                    yOffset: 0,
                    rotation: 0,
                    showOnlyAtModulo: false,
                    modulo: 12
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
            fontSize: 16
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
            showTimeLabel: true
        },
        userOptions: {
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
        radius: 3,
        useGradient: true,
        strokeWidth: 2,
        dot: {
            hideAboveMaxSerieLength: 62,
            useSerieColor: true,
            fill: '#FFFFFF',
            strokeWidth: 0.5
        },
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        },
        area: {
            useGradient: true,
            opacity: 30
        }
    },
    plot: {
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
    responsive: false,
    useCssAnimation: true,
    showTable: false,
    chart: {
        backgroundColor: "#1A1A1A",
        color: "#c8c8c8",
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
            }
        },
        highlightArea: {
            show: true,
            from: 5,
            to: 8,
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
            }
        },
        padding: {
            top:  36,
            right: 92,
            bottom: 48,
            left: 64
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
                    stacked: false,
                    gap: 64,
                    labelWidth: 40,
                    showBaseline: true,
                    scaleMin: null,
                    scaleMax: null
                },
                xAxis: {
                    showBaseline: true
                },
                xAxisLabels: {
                    color: "#c8c8c8",
                    show: true,
                    showOnlyFirstAndLast: false,
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'],
                    fontSize: 18,
                    yOffset: 0,
                    rotation: 0,
                    showOnlyAtModulo: false,
                    modulo: 12
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
            fontSize: 16
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
            showTimeLabel: true
        },
        userOptions: {
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
        radius: 3,
        useGradient: true,
        strokeWidth: 2,
        dot: {
            hideAboveMaxSerieLength: 62,
            useSerieColor: true,
            fill: '#FFFFFF',
            strokeWidth: 0.5
        },
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        },
        area: {
            useGradient: true,
            opacity: 30
        }
    },
    plot: {
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
    function makeSet(n ,m) {
        const arr = [];
        for (let i = 0; i < n; i += 1) {
            arr.push(Math.random() * m)
        }
        return arr
    }

    mutableDataset.value[0].series = makeSet(21, 100);
    mutableDataset.value[1].series = makeSet(21, 90);
    mutableDataset.value[2].series = makeSet(21, 80);
    mutableDataset.value[3].series = makeSet(21, 40);
}

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartLine" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Xy</span></span>
        </h1>
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


        <!-- <div class="w-full mx-auto max-w-[500px] flex flex-col p-6 border border-app-blue rounded-md bg-[#5f8bee12]">
            <span class="dark:text-blue-300">
                v2.1.52 : {{ translations.docs.comments.xy.individualScales[store.lang] }}
            </span>
            
            <div class="w-full flex flex-row place-items-center justify-center gap-2 mt-2">
                <input id="useCanvas" class="accent-app-blue" type="checkbox" @change="toggleUseIndividualScale">
                <label for="useCanvas" class="font-black dark:text-blue-300 cursor-pointer">Use individual scales</label>
            </div>
        </div> -->
        <Box showEmits showSlots showTooltip showUseCases showThemes showResponsive showPatterns schema="vue_ui_xy" signInfo="both">
            <template v-slot:tab0>

            {{ translations.docs.datastructure[store.lang] }}
            <div>
                TS type: <code class="text-app-green">VueUiXyDatasetItem[]</code>
            </div>
            <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            series: number[];
            type: "bar" | "line" | "plot";
            <span class="text-gray-600 dark:text-app-orange">// {{ translations.docs.comments.xy.type[store.lang] }}</span>
            color?: string; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
            dashed?: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.dashed[store.lang] }}</span>
            useTag?: "start" | "end"; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.useTag[store.lang] }}</span>
            dataLabels?: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.dataLabels[store.lang] }}</span>
            useProgression?: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.useProgression[store.lang] }}</span>
            useArea?: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.area[store.lang] }}</span>
            smooth?: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.smooth[store.lang] }}</span>
            shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star"; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.shape[store.lang] }}</span>
            scaleSteps?: number; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.scaleSteps[store.lang] }}</span>
            scaleLabel?: string; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.scaleLabel[store.lang] }}</span>
            scaleMax?: number; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.scaleMax[store.lang] }}</span>
            scaleMin?: number; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.scaleMin[store.lang] }}</span>
            autoScaling?: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.autoScaling[store.lang] }}</span>
            stackRatio?: number; (0 to 1) <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.stackRatio[store.lang] }}</span>
            showSerieName?: "start" | "end"; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.showSerieName[store.lang] }}</span>
            prefix?: string; <span class="text-gray-600 dark:text-app-green">// since v2.3.83</span>
            suffix?: string; <span class="text-gray-600 dark:text-app-green">// since v2.3.83</span>

        },
        {...}
    ]
</code>
</pre>      
            </div>

            {{ translations.docs.example[store.lang] }} :
            <div class="w-full overflow-x-auto">
                    
<pre class="break-words">
<code class="break-words">
const <span class="text-black dark:text-app-green">dataset: VueUiXyDatasetItem[]</span> = [
    {
        name: <span class="text-app-blue">"Series 1",</span>
        series: <span class="text-app-blue">[-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],</span>
        type:<span class="text-app-blue"><select v-model="mutableDataset[0].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-blue">"rgb(95,139,238)",</span>
        <template v-if="['line', 'plot'].includes(mutableDataset[0].type)">shape: <span class="text-app-blue"><select v-model="mutableDataset[0].shape"><option v-for="opt in shapeOptions">{{ opt }}</option></select></span> <span class="text-gray-500">// {{ translations.docs.comments.xy.shape[store.lang] }}</span></template>
        scaleSteps: 10,
        scaleLabel: "Blue circles"
    },
    {
        name: <span class="text-app-green">"Series 2",</span>
        series: <span class="text-app-green">[55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],</span>
        type:<span class="text-app-green"><select v-model="mutableDataset[1].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-green">"rgb(66,211,146)"</span>
        useProgression: <span class="text-app-green">true,</span>
        dataLabels: <span class="text-app-green">false,</span>
        useArea: <span class="text-app-green">true</span>
        <template v-if="['line', 'plot'].includes(mutableDataset[1].type)">shape: <span class="text-app-blue"><select v-model="mutableDataset[1].shape"><option v-for="opt in shapeOptions">{{ opt }}</option></select></span> <span class="text-gray-500">// {{ translations.docs.comments.xy.shape[store.lang] }}</span></template>
        scaleSteps: 10,
        scaleLabel: "Triangles"
    },
    {
        name: <span class="text-app-orange">"Series 3",</span>
        series: <span class="text-app-orange">[64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],</span>
        type:<span class="text-app-orange"><select v-model="mutableDataset[2].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-orange">"rgb(255,100,0)"</span>
        <template v-if="['line', 'plot'].includes(mutableDataset[2].type)">shape: <span class="text-app-blue"><select v-model="mutableDataset[2].shape"><option v-for="opt in shapeOptions">{{ opt }}</option></select></span> <span class="text-gray-500">// {{ translations.docs.comments.xy.shape[store.lang] }}</span></template>
        scaleSteps: 10,
        scaleLabel: "Plots"
    },
    {
        name: <span class="text-app-yellow">"Series 4",</span>
        series: <span class="text-app-yellow">[0, 1, -2, 3, -4, 5, -6, 7, -8, 9, -10, 11, -12, 13, -14, 15, -16, 17, -18, 19, -20],</span>
        comments: ["", "", "", "", "", "", "", "", "", "", "", "A comment for this specific datapoint"],
        type:<span class="text-app-yellow"><select v-model="mutableDataset[3].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        smooth: true, <span class="text-gray-500">// {{ translations.docs.comments.xy.smooth2[store.lang] }}</span>
        color: <span class="text-app-yellow">"rgb(200,200,50)"</span>
        <template v-if="['line', 'plot'].includes(mutableDataset[3].type)">shape: <span class="text-app-blue"><select v-model="mutableDataset[3].shape"><option v-for="opt in shapeOptions">{{ opt }}</option></select></span> <span class="text-gray-500">// {{ translations.docs.comments.xy.shape[store.lang] }}</span></template>
        scaleSteps: 10,
        scaleLabel: ""
    },
    {
        name: <span class="text-gray-500">"Target",</span> 
        series: <span class="text-gray-500">[ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],</span>
        type: <span class="text-gray-500">"line",</span>
        color: <span class="text-gray-500">"#404040",</span>
        dashed: <span class="text-gray-500">true,</span>
        useTag: <span class="text-gray-500">"start",</span>
        dataLabels: <span class="text-gray-500">false,</span>
        <template v-if="['line', 'plot'].includes(mutableDataset[4].type)">shape: <span class="text-app-blue"><select v-model="mutableDataset[4].shape"><option v-for="opt in shapeOptions">{{ opt }}</option></select></span> <span class="text-gray-500">// {{ translations.docs.comments.xy.shape[store.lang] }}</span></template>
        scaleSteps: 10,
        scaleLabel: "Black circles"
    },
];
</code>
</pre>
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
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: ""; ("celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; <span class="text-app-blue text-xs">// string[]</span></span>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="showTable" attr="showTable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseDetails attr="downsample" :level="1">
            <BaseAttr name="threshold" attr="downsample.threshold" type="number" defaultVal="500" :min="100" :max="5000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Threshold above which LTTB algorithm kicks in"/>
        </BaseDetails>
        <BaseDetails attr="chart" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="backgroundColor" attr="chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <span>height: 600,</span>
            <span>width: 1000,</span>
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
                    </BaseDetails>
                    <BaseDetails attr="xAxisLabels" :level="4" title="chart.grid.labels.xAxisLabels">
                        <BaseAttr name="show" attr="chart.grid.labels.xAxisLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showOnlyFirstAndLast" attr="chart.grid.labels.xAxisLabels.showOnlyFirstAndLast" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="chart.grid.labels.xAxisLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>values: [], <BaseComment>string[]</BaseComment></span>
                        <BaseAttr name="fontSize" attr="chart.grid.labels.xAxisLabels.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="yOffset" attr="chart.grid.labels.xAxisLabels.yOffset" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rotation" attr="chart.grid.labels.xAxisLabels.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showOnlyAtModulo" attr="chart.grid.labels.xAxisLabels.showOnlyAtModulo" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="modulo" attr="chart.grid.labels.xAxisLabels.modulo" type="number" defaultVal="12" :min="1" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                    <BaseDetails attr="yAxis" :level="4" title="chart.grid.labels.yAxis">
                        <BaseAttr name="commonScaleSteps" attr="chart.grid.labels.yAxis.commonScaleSteps" type="number" defaultVal="10" :min="2" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useIndividualScale" attr="chart.grid.labels.yAxis.useIndividualScale" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="labelWidth" attr="chart.grid.labels.yAxis.labelWidth" type="number" defaultVal="40" :min="40" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stacked" attr="chart.grid.labels.yAxis.stacked" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Always use in combination with useIndividualScale: true" />
                        <BaseAttr name="gap" attr="chart.grid.labels.yAxis.gap" type="number" defaultVal="64" :min="20" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="To be used with useIndividualScale: true && stacked: true"/>
                        <BaseAttr name="showBaseline" attr="chart.grid.labels.yAxis.showBaseline" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                        <BaseAttr name="scaleMin" attr="chart.grid.labels.yAxis.scaleMin" type="number" defaultVal="null" :min="-1000" :max="0" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Force the min scale for the whole chart"/>
                        <BaseAttr name="scaleMax" attr="chart.grid.labels.yAxis.scaleMax" type="number" defaultVal="null" :min="0" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Force the max scale for the whole chart"/>
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
                    <span>width: "auto" | number; (default: "auto")</span>
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
            </BaseDetails>
            <BaseDetails attr="padding" :level="2" title="chart.padding">
                <BaseAttr name="top" attr="chart.padding.top" type="number" defaultVal="36" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="right" attr="chart.padding.right" type="number" defaultVal="24" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bottom" attr="chart.padding.bottom" type="number" defaultVal="64" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="left" attr="chart.padding.left" type="number" defaultVal="48" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                <span>customFormat: null, <span class="text-app-blue break-keep text-xs">// default behavior. To customize, check out the 'custom tooltip' tab</span></span>
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
            </BaseDetails>
            <BaseDetails attr="zoom" :level="2" title="chart.zoom">
                <BaseAttr name="show" attr="chart.zoom.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="chart.zoom.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="highlightColor" attr="chart.zoom.highlightColor" type="color" defaultVal="#4A4A4A" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="chart.zoom.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <span>useResetSlot: false, <span class="text-app-blue break-keep text-xs">// To use a custom slot for the reset feature (see slots tab)</span></span>
                <span>startIndex: number | null, <BaseComment>Force zoom start index</BaseComment></span>
                <span>endIndex: number | null, <BaseComment>Force zoom end index</BaseComment></span>
                <BaseAttr name="enableRangeHandles" attr="chart.zoom.enableRangeHandles" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.63"/>
                <BaseAttr name="enableSelectionDrag" attr="chart.zoom.enableSelectionDrag" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.63"/>
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
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="bar" :level="1">
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
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
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
            <BaseAttr name="radius" attr="line.radius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="line.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="line.strokeWidth" type="number" defaultVal="2" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="plot" :level="1">
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
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
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

            onMounted(() => {
                xyDataset.value = xyChart.value.getData();
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
                mounted () {
                    this.xyDataset = this.$refs.xyChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
                <ExposedMethods
                    component="VueUiXy"
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
        </Box>
    </div>
</template>

<style>
.vue-ui-xy-legend {
    margin-top: 12px !important;
}
</style>