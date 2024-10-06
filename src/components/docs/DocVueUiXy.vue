<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucXy from "../useCases/uc-xy.vue";
import ThemesVueUiXy from "../themes/ThemesVueUiXy.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const dataset = ref([
    {
        name: "Series 1",
        series: [ -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)",
        shape: 'circle',
        scaleSteps: 2,
    },
    {
        name: "Series 2",
        series: [ 55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)",
        useArea: true,
        useProgression: true,
        dataLabels: false,
        shape: "triangle",
        scaleSteps: 2,
        showSerieName: 'end'
    },
    {
        name: "Series 3",
        series: [ 64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)",
        shape: "star",
        scaleSteps: 2,
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
        shape: 'Yellow circles',
        scaleSteps: 2,
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
        scaleSteps: 2,
    },
]);

const config = ref({
    responsive: false,
    useCssAnimation: true,
    showTable: false,
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
            color: "#FF0000",
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
                    showBaseline: true
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
            backgroundOpacity: 90
        },
        userOptions: {
            show: true,
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
                labels: true,
                stack: true,
                fullscreen: true
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
                stack: "Toggle stack mode"
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
            color: "#FF0000",
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
                    showBaseline: true
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
            backgroundOpacity: 90
        },
        userOptions: {
            show: true,
            buttons: {
                tooltip: true,
                pdf: true,
                img: true,
                csv: true,
                table: true,
                labels: true,
                stack: true,
                fullscreen: true
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
                stack: "Toggle stack mode"
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

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartLine" stroke="#42d392" :strokeWidth="1.5" />
            VueUiXy
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.xy[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-2/3'}`">
            <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <Suspense>
                <template #default>
                    <VueUiXy :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                        <template #plot-comment="{plot}">
                            <div style="width:100%;text-align:center">
                                {{ plot.comment }}
                            </div>
                        </template>
                    </VueUiXy>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>
        <BaseDocActions
            targetLink="vue-ui-xy"
            targetMaker="VueUiXy"
            :configSource="mainConfig.vue_ui_xy"
        />

        <div class="w-full mx-auto max-w-[500px] flex flex-col p-6 border border-app-blue rounded-md bg-[#5f8bee12]">
            <span class="dark:text-blue-300">
                v2.1.52 : {{ translations.docs.comments.xy.individualScales[store.lang] }}
            </span>
            
            <div class="w-full flex flex-row place-items-center justify-center gap-2 mt-2">
                <input id="useCanvas" class="accent-app-blue" type="checkbox" @change="toggleUseIndividualScale">
                <label for="useCanvas" class="font-black dark:text-blue-300 cursor-pointer">Use individual scales</label>
            </div>
        </div>
        <Box showEmits showSlots showTooltip showUseCases showThemes showResponsive schema="vue_ui_xy">
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
        <span>theme: ""; ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <span>useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)</span>
        <span>showTable: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showTable" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showTable" @change="forceChartUpdate()">, (default: true)</span>
        <BaseDetails attr="chart" :level="1">
            <span>fontFamily: "inherit",</span>
            <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.chart.backgroundColor">, (default: "#FFFFFF")</span>
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.color"><input v-else type="color" v-model="mutableConfig.chart.color">, (default:"#2D353C")</span>
            <span>height: 600,</span>
            <span>width: 1000,</span>
            <BaseDetails attr="comments" :level="2" title="chart.comments">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.comments.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.comments.show">, (default: true)</span>
                <span>showInTooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.comments.showInTooltip"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.comments.showInTooltip">, (default: true)</span>
                <span>width: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.comments.width" :min="50" :max="400" :step="10"/><BaseNumberInput v-else v-mode:value="mutableConfig.chart.comments.width" :min="-50" :max="50"/>, (default: 200)</span>
                <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.comments.offsetX" :min="-50" :max="50"/><BaseNumberInput v-else v-mode:value="mutableConfig.chart.comments.offsetX" :min="-50" :max="50"/>, (default: 0)</span>
                <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.comments.offsetY" :min="-50" :max="50"/><BaseNumberInput v-else v-mode:value="mutableConfig.chart.comments.offsetY" :min="-50" :max="50"/>, (default: 0)</span>
            </BaseDetails>
            <BaseDetails attr="grid" :level="2" title="chart.grid">
                <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.grid.stroke"><input v-else type="color" v-model="mutableConfig.chart.grid.stroke">, (default: "#E1E5E8")</span>
                <span>showVerticalLines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.showVerticalLines"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.showVerticalLines"> (default: false)</span>
                <span>showHorizontalLines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.showHorizontalLines"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.showVerticalLines"> (default: false)</span>
                <BaseDetails attr="labels" :level="3" title="chart.grid.labels">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.show">, (default: true)</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.grid.labels.color"><input v-else type="color" v-model="mutableConfig.chart.grid.labels.color">, (default: "#2D353C")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.grid.labels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.grid.labels.fontSize" :min="8" :max="42"/>, (default: 12)</span>
                    <BaseDetails attr="axis" :level="4" title="chart.grid.labels.axis">
                        <span>yLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.grid.labels.axis.yLabel"><input v-else type="text" v-model="mutableConfig.chart.grid.labels.axis.yLabel">, (default: "")</span>
                        <span>yLabelOffsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.grid.labels.axis.yLabelOffsetX" :min="-50" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.grid.labels.axis.yLabelOffsetX" :min="-50" :max="50"/>, (default: 0)</span>
                        <span>xLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.grid.labels.axis.xLabel"><input v-else type="text" v-model="mutableConfig.chart.grid.labels.axis.xLabel">, (default: "")</span>
                        <span>xLabelOffsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.grid.labels.axis.xLabelOffsetY" :min="-50" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.grid.labels.axis.xLabelOffsetY" :min="-50" :max="50"/>, (default: 0)</span>
                        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.grid.labels.axis.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.grid.labels.axis.fontSize" :min="8" :max="42"/>, (default: 12)</span>
                    </BaseDetails>
                    <BaseDetails attr="xAxis" :level="4" title="chart.grid.labels.xAxis">
                        <span>showBaseline: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.xAxis.showBaseline"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.xAxis.showBaseline">, (default: true)</span>
                    </BaseDetails>
                    <BaseDetails attr="yAxis" :level="4" title="chart.grid.labels.yAxis">
                        <span>commonScaleSteps: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.grid.labels.yAxis.commonScaleSteps" :min="2" :max="30"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.grid.labels.yAxis.commonScaleSteps" :min="2" :max="30"/>, (default: 10)</span>
                        <span>useIndividualScale: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.yAxis.useIndividualScale" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.yAxis.useIndividualScale" @change="forceChartUpdate()">, (default: false)</span>
                        <span>labelWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.grid.labels.yAxis.labelWidth" :min="40" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.grid.labels.yAxis.labelWidth" :min="40" :max="64"/>, (default: 40)</span>
                        <span>stacked: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.yAxis.stacked" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.yAxis.stacked" @change="forceChartUpdate()">, (default: false) <span class="text-app-blue break-keep text-xs">// always use in combination with useIndividualScale: true</span></span>
                        <span>gap: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.grid.labels.yAxis.gap" :min="20" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.grid.labels.yAxis.gap" :min="20" :max="100"/>, (default: 64) <span class="text-app-blue break-keep text-xs">// to be used with useIndividualScale: true && stacked: true</span></span>
                        <span>showBaseline: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.yAxis.showBaseline"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.yAxis.showBaseline">, (default: true)</span>
                    </BaseDetails>
                    <BaseDetails attr="zeroLine" :level="4" title="chart.grid.labels.zeroLine">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.zeroLine.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.zeroLine.show" @change="forceChartUpdate()">, (default: true)</span>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="highlightArea" :level="2" title="chart.highlightArea">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.highlightArea.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.highlightArea.show" @change="forceChartUpdate()">, (default: false)</span>
                <span>from: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.highlightArea.from" :min="0" :max="10000" /><BaseNumberInput v-else v-model:value="mutableConfig.chart.highlightArea.from" :min="0" :max="10000" />, (default: 0)</span>
                <span>to: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.highlightArea.to" :min="0" :max="10000" /><BaseNumberInput v-else v-model:value="mutableConfig.chart.highlightArea.to" :min="0" :max="10000" />, (default: 0)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.highlightArea.color"><input v-else type="color" v-model="mutableConfig.chart.highlightArea.color">, (default:"#2D353C")</span>
                <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.highlightArea.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.chart.highlightArea.opacity">, (default: 20)</span>
                <BaseDetails attr="caption" :level="3" title="chart.highlightArea.caption">
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.highlightArea.caption.text"><input v-else type="text" v-model="mutableConfig.chart.highlightArea.caption.text">, (default: "")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.highlightArea.caption.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.highlightArea.caption.fontSize" :min="8" :max="42"/>, (default: 10)</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.highlightArea.caption.color"><input v-else type="color" v-model="mutableConfig.chart.highlightArea.caption.color">, (default:"#2D353C")</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.highlightArea.caption.bold" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.highlightArea.caption.bold" @change="forceChartUpdate">, (default: true)</span>
                    <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.highlightArea.caption.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.highlightArea.caption.offsetY" :min="-100" :max="100"/>, (default: 0)</span>
                    <span>width: "auto" | number; (default: "auto")</span>
                    <span>padding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.highlightArea.caption.padding" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.highlightArea.caption.padding" :min="0" :max="24"/>, (default: 3)</span>
                    <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.chart.highlightArea.caption.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.chart.highlightArea.caption.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")</span>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="highlighter" :level="2" title="chart.highlighter">
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.highlighter.color"><input v-else type="color" v-model="mutableConfig.chart.highlighter.color">, (default:"#2D353C")</span>
                <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.highlighter.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.chart.highlighter.opacity">, (default: 5)</span>
                <span>useLine: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.highlighter.useLine" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.highlighter.useLine" @change="forceChartUpdate()">, (default: false)</span>
                <span>lineDasharray: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.highlighter.lineDasharray" :min="0" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.highlighter.lineDasharray" :min="0" :max="50"/>, (default: 2)</span>
                <span>lineWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.highlighter.lineWidth" :min="0" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.highlighter.lineWidth" :min="0" :max="50" />, (default: 1)</span>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="chart.labels">
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.labels.fontSize" :min="1" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.labels.fontSize" :min="1" :max="50"/>, (default: 10)</span>
                <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.labels.prefix"><input v-else type="text" v-model="mutableConfig.chart.labels.prefix">, (default: "")</span>
                <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.labels.suffix"><input v-else type="text" v-model="mutableConfig.chart.labels.suffix">, (default: "")</span>
            </BaseDetails>
            <BaseDetails attr="legend" :level="2" title="chart.legend">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.legend.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.legend.show">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.legend.color"><input v-else type="color" v-model="mutableConfig.chart.legend.color">, (default: "#2D353C")</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.legend.fontSize" :min="1" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.legend.fontSize" :min="1" :max="50"/>, (default: 14)</span>
            </BaseDetails>
            <BaseDetails attr="padding" :level="2" title="chart.padding">
                <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.padding.top" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.padding.top" :min="0" :max="200"/>, (default: 36)</span>
                <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.padding.right" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.padding.right" :min="0" :max="200"/>, (default: 12)</span>
                <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.padding.bottom" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.padding.bottom" :min="0" :max="200"/>, (default: 12)</span>
                <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.padding.left" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.padding.left" :min="0" :max="200"/>, (default: 48)</span>
            </BaseDetails>
            <BaseDetails attr="timeTag" :level="2" title="chart.timeTag">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.timeTag.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.timeTag.show" @change="forceChartUpdate()">, (default: false)</span>
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.timeTag.backgroundColor"><input v-else type="color" v-model="mutableConfig.chart.timeTag.backgroundColor">, (default: "#E1E5E8")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.timeTag.color"><input v-else type="color" v-model="mutableConfig.chart.timeTag.color">, (default: "#2D353C")</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.timeTag.fontSize" :min="8" :max="42" /><BaseNumberInput v-else v-model:value="mutableConfig.chart.timeTag.fontSize" :min="8" :max="42"/>, (default: 12)</span>
                <BaseDetails attr="circleMarker" :level="3" title="chart.timeTag.circleMarker">
                    <span>radius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.timeTag.circleMarker.radius" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.timeTag.circleMarker.radius" :min="0" :max="12"/>, (default: 3)</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.timeTag.circleMarker.color"><input v-else type="color" v-model="mutableConfig.chart.timeTag.circleMarker.color">, (default: "#2D353C")</span>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="title" :level="2" title="chart.title">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.title.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.title.show">, (default: true)</span>
                <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.title.text"><input v-else type="text" v-model="mutableConfig.chart.title.text">, (default: "")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.title.color"><input v-else type="color" v-model="mutableConfig.chart.title.color">, (default: "#2D353C")</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.title.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.title.bold">, (default: true)</span>
                <BaseDetails attr="subtitle" :level="3" title="chart.title.subtitle">
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.chart.title.subtitle.text">, (default: "")</span>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="tooltip" :level="2" title="chart.tooltip">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.tooltip.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.show">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.chart.tooltip.color">, (default: "#2D353C")</span>
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.chart.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
                <span>showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.tooltip.showValue"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.showValue">, (default: true)</span>
                <span>showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.tooltip.showPercentage"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.showPercentage">, (default: false)</span>
                <span>customFormat: null, <span class="text-app-blue break-keep text-xs">// default behavior. To customize, check out the 'custom tooltip' tab</span></span>
                <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.tooltip.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.tooltip.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.tooltip.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.tooltip.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.tooltip.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.tooltip.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.tooltip.borderRadius" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.tooltip.borderRadius" :min="0" :max="24"/>, (default: 4)</span>
                <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.chart.tooltip.borderColor">, (default: "#e1e5e8")</span>
                <span>borderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.tooltip.borderWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.tooltip.borderWidth" :min="0" :max="24"/>, (default: 1)</span>
                <span>backgroundOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.chart.tooltip.backgroundOpacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.chart.tooltip.backgroundOpacity">, (default: 100)</span>
            </BaseDetails>
            <BaseDetails attr="userOptions" :level="2" title="chart.userOptions">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.show">, (default: true)</span>
                <BaseDetails attr="buttons" :level="3" title="chart.userOptions.buttons">
                    <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
                    <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                    <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                    <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                    <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
                    <span>labels: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.labels" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.labels" @change="forceChartUpdate()">, (default: true)</span>
                    <span>stack: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.stack" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.stack" @change="forceChartUpdate()">, (default: true)</span>
                    <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
                </BaseDetails>
                <BaseDetails attr="buttonTitles" :level="3" title="chart.userOptions.buttonTitles">
                    <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.open">, (default: "Open options")</span>
                    <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.close">, (default: "Close options")</span>
                    <span>tooltip: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.tooltip"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.tooltip">, (default: "Toggle tooltip")</span>
                    <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                    <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
                    <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                    <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
                    <span>labels: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.labels"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.labels">, (default: "Toggle labels")</span>
                    <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
                    <span>stack: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.buttonTitles.stack"><input v-else type="text" v-model="mutableConfig.chart.userOptions.buttonTitles.stack">, (default: "Toggle stack mode")</span>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="zoom" :level="2" title="chart.zoom">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.zoom.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.zoom.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.zoom.color" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.chart.zoom.color" @change="forceChartUpdate()">, (default: "#CCCCCC")</span>
                <span>highlightColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.zoom.highlightColor" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.chart.zoom.highlightColor" @change="forceChartUpdate()">, (default: "#4A4A4A")</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.chart.zoom.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.chart.zoom.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                <span>useResetSlot: false, <span class="text-app-blue break-keep text-xs">// To use a custom slot for the reset feature (see slots tab)</span></span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="bar" :level="1">
            <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.bar.borderRadius" :min="0" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.bar.borderRadius" :min="0" :max="64"/>, (default: 2)</span>
            <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.useGradient">, (default: true)</span>
            <span>periodGap: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.bar.periodGap" :min="0" :max="1" :step="0.01"/><BaseNumberInput v-else v-model:value="mutableConfig.bar.periodGap" :min="0" :max="1" :step="0.01"/>, (default: 0.1)</span>
            <BaseDetails attr="border" :level="2" title="bar.border">
                <span>useSerieColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.border.useSerieColor"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.border.useSerieColor">, (default: false)</span>
                <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.bar.border.strokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.bar.border.strokeWidth" :min="0" :max="12"/>, (default: 0)</span>
                <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.bar.border.stroke"><input v-else type="color" v-model="mutableConfig.bar.border.stroke">, (default: "#FFFFFF")</span>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="bar.labels">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.labels.show">, (default: false)</span>
                <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.bar.labels.offsetY" :min="-50" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.bar.labels.offsetY" :min="-50" :max="50"/>, (default: -6)</span>
                <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.bar.labels.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.bar.labels.rounding" :min="0" :max="6"/>, (default: 0)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.bar.labels.color"><input v-else type="color" v-model="mutableConfig.bar.labels.color">, (default: "#2D353C")</span>
            </BaseDetails>
            <BaseDetails attr="serieName" :level="2" title="bar.serieName">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.serieName.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.serieName.show">, (default: false)</span>
                <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.bar.serieName.offsetY" :min="-50" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.bar.serieName.offsetY" :min="-50" :max="50"/>, (default: -6)</span>
                <span>useSerieColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.serieName.useSerieColor"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.serieName.useSerieColor">, (default: true)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.bar.serieName.color"><input v-else type="color" v-model="mutableConfig.bar.serieName.color">, (default: "#2D353C")</span>
                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.serieName.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.serieName.bold">, (default: false)</span>
                <span>useAbbreviation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.serieName.useAbbreviation"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.serieName.useAbbreviation">, (default: true)</span>
                <span>abbreviationSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.bar.serieName.abbreviationSize" :min="1" :max="8"/><BaseNumberInput v-else v-model:value="mutableConfig.bar.serieName.abbreviationSize" :min="1" :max="8"/>, (default: 3)</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="line" :level="1">
            <span>radius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.line.radius" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.line.radius" :min="0" :max="12"/>, (default: 3)</span>
            <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.line.strokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.line.strokeWidth" :min="0" :max="12"/>, (default: 2)</span>
            <BaseDetails attr="area" :level="2" title="line.area">
                <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.line.area.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.line.area.useGradient" @change="forceChartUpdate()"> ,(default: true)</span>
                <span>opacity: <input type="range" v-if="isDarkMode" v-model="mutableConfigDarkMode.line.area.opacity" class="accent-app-blue" min="0" max="100" @change="forceChartUpdate()"><input type="range" v-else v-model="mutableConfig.line.area.opacity" class="accent-app-blue" min="0" max="100" @change="forceChartUpdate()">, (default: 30)</span>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="line.labels">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.line.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.line.labels.show">, (default: false)</span>
                <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.line.labels.offsetY" :min="-50" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.line.labels.offsetY" :min="-50" :max="50"/>, (default: -6)</span>
                <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.line.labels.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.line.labels.rounding" :min="0" :max="6"/>, (default: 0)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.line.labels.color"><input v-else type="color" v-model="mutableConfig.line.labels.color">, (default: "#2D353C")</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="plot" :level="1">
            <span>radius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.plot.radius" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.plot.radius" :min="0" :max="12"/>, (default: 3)</span>
            <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.plot.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.plot.useGradient">, (default: true)</span>
            <BaseDetails attr="labels" :level="2" title="plot.labels">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.plot.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.plot.labels.show">, (default: false)</span>
                <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.plot.labels.offsetY" :min="-50" :max="50"/><BaseNumberInput v-else v-model:value="mutableConfig.plot.labels.offsetY" :min="-50" :max="50"/>, (default: -6)</span>
                <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.plot.labels.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.plot.labels.rounding" :min="0" :max="6"/>, (default: 0)</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.plot.labels.color"><input v-else type="color" v-model="mutableConfig.plot.labels.color">, (default: "#2D353C")</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
            <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.rounding" :min="0" :max="6"/>, (default: 0)</span>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <span>period: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.period"><input v-else type="text" v-model="mutableConfig.table.columnNames.period">, (default: "Period")</span>
                <span>total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.total"><input v-else type="text" v-model="mutableConfig.table.columnNames.total">, (default: "Total")</span>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.th">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FAFAFA")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
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

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleLabels</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleLabels[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleStack</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleStack[store.lang] }}</div>
                </div>
            </template>

            <template #tab3>
<div class="text-gray-500">
    If your dataset contains a comments attribute, you can display comments on the chart using the #plot-comment slot.
</div>

<pre>
<code>
    &lt;VueUiXy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #plot-comment="{ plot }"&gt;
            &lt;div :style="`width:100%; text-align:center; color:${plot.color}`"&gt;<span v-pre>{{ plot.comment }}</span>&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>


                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiXy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>                    
                
                <div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiXy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre> 

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiXy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config, bars, lines, plots }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config, bars, lines, plots }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.resetButton[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiXy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #reset-action="{ reset }"&gt;
            &lt;button @click="reset()"&gt;Refresh&lt;/button&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>

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
        </Box>
    </div>
</template>