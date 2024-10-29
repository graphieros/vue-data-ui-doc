<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiStackbar from "../themes/ThemesVueUiStackbar.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";

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
});

const dataset = ref([
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
]);

const config = ref({
    theme: "",
    responsive: false,
    customPalette: [],
    useCssAnimation: true,
    orientation: 'vertical',
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            period: "Period",
            total: "Total"
        },
        th: {
            backgroundColor: "#fafafa",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0
        }
    },
    userOptions: {
        show: true,
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
            animation: false
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
            fullscreen: "Toggle fullscreen"
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            height: 500,
            width: 800,
            padding: {
                top: 12,
                right: 24,
                bottom: 36,
                left: 64
            },
            title: {
                text: "Title",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                textAlign: "center",
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            legend: {
                show: true,
                bold: false,
                backgroundColor: "#FFFFFF",
                color: "#2D353C",
                fontSize: 14
            },
            zoom: {
                show: true,
                color: "#CCCCCC",
                highlightColor: "#4A4A4A",
                fontSize: 14,
                useResetSlot: false
            },
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 90,
                position: "center",
                offsetY: 24,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0
            },
            highlighter: {
                color: "#2D353C",
                opacity: 5
            },
            bars: {
                gapRatio: 0.5,
                distributed: false,
                showDistributedPercentage: true,
                borderRadius: 3,
                strokeWidth: 1,
                gradient: {
                    show: true,
                    intensity: 20
                },
                totalValues: {
                    show: true,
                    offsetY: 0,
                    fontSize: 16,
                    bold: false,
                    color: "#2D353C"
                },
                dataLabels: {
                    show: true,
                    adaptColorToBackground: true,
                    color: "#2D353C",
                    fontSize: 14,
                    bold: false,
                    rounding: 0,
                    prefix: "",
                    suffix: ""
                }
            },
            grid: {
                scale: {
                    ticks: 10
                },
                x: {
                    showAxis: true,
                    showHorizontalLines: true,
                    axisColor: "#e1e5e8",
                    axisThickness: 2,
                    axisName: {
                        show: true,
                        text: "xAxis",
                        fontSize: 14,
                        color: "#2D353C",
                        bold: false,
                        offsetY: 0
                    },
                    timeLabels: {
                        show: true,
                        values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
                        offsetY: 0,
                        rotation: 0,
                        fontSize: 14,
                        color: "#2D353C",
                        bold: false
                    }
                },
                y: {
                    showAxis: true,
                    showVerticalLines: false,
                    axisColor: "#e1e5e8",
                    axisThickness: 2,
                    axisName: {
                        show: true,
                        text: "yAxis",
                        fontSize: 14,
                        color: "#2D353C",
                        bold: false,
                        offsetX: 0
                    },
                    axisLabels: {
                        show: true,
                        color: "#2D353C",
                        fontSize: 14,
                        bold: false
                    }
                }
            }
        }
    }
})

const darkModeConfig = ref({
    theme: "",
    responsive: false,
    customPalette: [],
    useCssAnimation: true,
    orientation: 'vertical',
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            period: "Period",
            total: "Total"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0
        }
    },
    userOptions: {
        show: true,
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
            animation: false
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
            fullscreen: "Toggle fullscreen"
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 500,
            width: 800,
            padding: {
                top: 12,
                right: 24,
                bottom: 36,
                left: 64
            },
            title: {
                text: "Title",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                textAlign: "center",
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            legend: {
                show: true,
                bold: false,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14
            },
            zoom: {
                show: true,
                color: "#CCCCCC",
                highlightColor: "#4A4A4A",
                fontSize: 14,
                useResetSlot: false
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#2A2A2A",
                borderWidth: 1,
                backgroundOpacity: 90,
                position: "center",
                offsetY: 24,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0
            },
            highlighter: {
                color: "#e1e5e8",
                opacity: 5
            },
            bars: {
                gapRatio: 0.5,
                distributed: false,
                showDistributedPercentage: true,
                borderRadius: 3,
                strokeWidth: 1,
                gradient: {
                    show: true,
                    intensity: 20
                },
                totalValues: {
                    show: true,
                    offsetY: 0,
                    fontSize: 16,
                    bold: false,
                    color: "#CCCCCC"
                },
                dataLabels: {
                    show: true,
                    adaptColorToBackground: true,
                    color: "#1A1A1A",
                    fontSize: 14,
                    bold: false,
                    rounding: 0,
                    prefix: "",
                    suffix: ""
                }
            },
            grid: {
                scale: {
                    ticks: 10
                },
                x: {
                    showAxis: true,
                    showHorizontalLines: true,
                    axisColor: "#3A3A3A",
                    axisThickness: 2,
                    axisName: {
                        show: true,
                        text: "xAxis",
                        fontSize: 14,
                        color: "#CCCCCC",
                        bold: false,
                        offsetY: 0
                    },
                    timeLabels: {
                        show: true,
                        values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
                        offsetY: 0,
                        rotation: 0,
                        fontSize: 14,
                        color: "#CCCCCC",
                        bold: false
                    }
                },
                y: {
                    showAxis: true,
                    showVerticalLines: false,
                    axisColor: "#3A3A3A",
                    axisThickness: 2,
                    axisName: {
                        show: true,
                        text: "yAxis",
                        fontSize: 14,
                        color: "#CCCCCC",
                        bold: false,
                        offsetX: 0
                    },
                    axisLabels: {
                        show: true,
                        color: "#CCCCCC",
                        fontSize: 14,
                        bold: false
                    }
                }
            }
        }
    }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

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

const { configCode, showAllConfig } = useConfigCode()

const innerTranslations = ref({
    distributed: {
        en: 'This bar chart has a config option to show distributed bars. In this mode, all bars take the full height of the chart, and show proportions of each datapoint.',
        fr: 'Ce graphique à barres dispose d’une option de configuration pour afficher des barres réparties. Dans ce mode, toutes les barres occupent la pleine hauteur du graphique et montrent les proportions de chaque point de données.',
        pt: 'Este gráfico de barras possui uma opção de configuração para mostrar barras distribuídas. Neste modo, todas as barras ocupam a altura total do gráfico e mostram as proporções de cada ponto de dados.',
        de: 'Dieses Balkendiagramm hat eine Konfigurationsoption, um verteilte Balken anzuzeigen. In diesem Modus nehmen alle Balken die volle Höhe des Diagramms ein und zeigen die Anteile jedes Datenpunkts.',
        zh: '该条形图有一个配置选项，可以显示分布的条形。在此模式下，所有条形占据图表的全部高度，并显示每个数据点的比例。',
        jp: 'この棒グラフには、バーを分布表示するための設定オプションがあります。このモードでは、すべてのバーがグラフの全高を占め、各データポイントの割合を示します。',
        es: 'Este gráfico de barras tiene una opción de configuración para mostrar barras distribuidas. En este modo, todas las barras ocupan toda la altura del gráfico y muestran las proporciones de cada punto de datos.',
        ko: '이 막대 차트에는 분포된 막대를 표시하는 구성 옵션이 있습니다. 이 모드에서는 모든 막대가 차트의 전체 높이를 차지하며 각 데이터 포인트의 비율을 보여줍니다.',
        ar: 'يحتوي مخطط الأعمدة هذا على خيار تكوين لعرض الأعمدة الموزعة. في هذا الوضع، تأخذ جميع الأعمدة الارتفاع الكامل للمخطط وتعرض نسب كل نقطة بيانات.'
    },
    toggle: {
        en: 'Toggle distributed mode',
        fr: 'Basculer en mode distribué',
        pt: 'Alternar para o modo distribuído',
        de: 'Verteilten Modus umschalten',
        zh: '切换分布模式',
        jp: '分布モードを切り替える',
        es: 'Alternar modo distribuido',
        ko: '분포 모드 전환',
        ar: 'تبديل وضع التوزيع'
    }
})

</script>

<template>
    <div>
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartStackbar" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Stackbar</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.stackbarBig[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-stackbar"
            targetMaker="VueUiStackbar"
            :configSource="mainConfig.vue_ui_stackbar"
        />
        
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
            <button @click="fixChart"
                class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed" />
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible" />
                    <div
                        class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <Suspense>
                <template #default>
                    <div>
                        <VueUiStackbar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </div>
                </template>
                <template #fallback>
                    <BaseSpinner />
                </template>
            </Suspense>
        </div>

        <div class="w-full mt-6 pt-6 border-t border-gray-500 max-w-[600px] mx-auto">
            <div dir="auto">{{ innerTranslations.distributed[store.lang] }}</div>
            <code class="mt-4 flex flex-row place-items-center gap-4">
                <BaseAttr name="distributed" attr="style.chart.bars.distributed" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </code>
            <code class="mt-4 flex flex-row place-items-center gap-4">
                <BaseAttr name="orientation" attr="orientation" type="select" defaultVal="vertical" :options="['vertical', 'horizontal']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" comment="Since v2.3.45"/>
            </code>
        </div>

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_stackbar" signInfo="both">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiStackbarDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b my-6 border-gray-700">
                    <pre>
<code>
    [
        {
            name: string;
            series: number[];
        },
        {...}
    ]
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiStackbarDatasetItem[]</span> = [
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
]
</code>
</pre>                    
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiStackbarConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiStackbarConfig" equal>
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: "", <BaseComment>"zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="orientation" attr="orientation" type="select" defaultVal="vertical" :options="['vertical', 'horizontal']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" comment="Since v2.3.45"/>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="height" attr="style.chart.height" type="number" defaultVal="500" :min="300" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="width" attr="style.chart.width" type="number" defaultVal="800" :min="300" :max="1500" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="36" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="48" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="title" :level="2" title="style.chart.title">
                    <BaseAttr name="show" attr="style.chart.title.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseDetails attr="subtitle" :level="3" title="style.chart.title.subtitle">
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                        <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                    <BaseDetails attr="zoom" :level="3" title="style.chart.zoom">
                        <BaseAttr name="show" attr="style.chart.zoom.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.zoom.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="highlightColor" attr="style.chart.zoom.highlightColor" type="color" defaultVal="#4A4A4A" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.zoom.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>useResetSlot: false, <BaseComment>To use a custom slot for the reset feature (see slots tab)</BaseComment></span>
                    </BaseDetails>
                    <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                        <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="showValue" attr="style.chart.tooltip.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showPercentage" attr="style.chart.tooltip.showPercentage" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>customFormat: null, <span class="text-app-blue break-keep text-xs">// default behavior. To customize, check out the 'custom tooltip' tab</span></span>
                        <BaseAttr name="roundingValue" attr="style.chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="roundingPercentage" attr="style.chart.tooltip.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="highlighter" :level="3" title="style.chart.highlighter">
                        <BaseAttr name="color" attr="style.chart.highlighter.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="opacity" attr="style.chart.highlighter.opacity" type="range" defaultVal="5" :min="0" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="bars" :level="3" title="style.chart.bars">
                        <BaseAttr name="gapRatio" attr="style.chart.bars.gapRatio" type="range" defaultVal="0.5" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="distributed" attr="style.chart.bars.distributed" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showDistributedPercentage" attr="style.chart.bars.showDistributedPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="borderRadius" attr="style.chart.bars.borderRadius" type="range" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.bars.strokeWidth" type="range" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="gradient" :level="4" title="style.chart.bars.gradient">
                            <BaseAttr name="show" attr="style.chart.bars.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="intensity" attr="style.chart.bars.gradient.intensity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="totalValues" :level="4" title="style.chart.bars.totalValues">
                            <BaseAttr name="show" attr="style.chart.bars.totalValues.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.bars.totalValues.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.bars.totalValues.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.bars.totalValues.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.bars.totalValues.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="dataLabels" :level="4" title="style.chart.bars.dataLabels">
                            <BaseAttr name="show" attr="style.chart.bars.dataLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseAttr name="adaptColorToBackground" attr="style.chart.bars.dataLabels.adaptColorToBackground" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            <BaseAttr name="color" attr="style.chart.bars.dataLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.bars.dataLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.bars.dataLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseAttr name="rounding" attr="style.chart.bars.dataLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="prefix" attr="style.chart.bars.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="suffix" attr="style.chart.bars.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="grid" :level="3" title="style.chart.grid">
                        <BaseDetails attr="scale" :level="4" title="style.chart.grid.scale">
                            <BaseAttr name="ticks" attr="style.chart.grid.scale.ticks" type="select" defaultVal="10" :options="[2, 5, 10, 20]" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="scaleMin" attr="style.chart.grid.scale.scaleMin" type="number" defaultVal="null" :min="-10000" :max="10000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="scaleMax" attr="style.chart.grid.scale.scaleMax" type="number" defaultVal="null" :min="-10000" :max="10000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="x" :level="4" title="style.chart.grid.x">
                            <BaseAttr name="showAxis" attr="style.chart.grid.x.showAxis" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="showHorizontalLines" attr="style.chart.grid.x.showHorizontalLines" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseAttr name="axisColor" attr="style.chart.grid.x.axisColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="axisThickness" attr="style.chart.grid.x.axisThickness" type="number" defaultVal="2" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="axisName" :level="5" title="style.chart.grid.x.axisName">
                                <BaseAttr name="show" attr="style.chart.grid.x.axisName.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="text" attr="style.chart.grid.x.axisName.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.chart.grid.x.axisName.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.grid.x.axisName.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.grid.x.axisName.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.chart.grid.x.axisName.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="timeLabels" :level="5" title="style.chart.grid.x.timeLabels">
                                <BaseAttr name="show" attr="style.chart.grid.x.tileLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <span>values: string[],</span>
                                <BaseAttr name="fontSize" attr="style.chart.grid.x.timeLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.grid.x.timeLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.chart.grid.x.timeLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.grid.x.timeLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="rotation" attr="style.chart.grid.x.timeLabels.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="y" :level="4" title="style.chart.grid.y">
                            <BaseAttr name="showAxis" attr="style.chart.grid.y.showAxis" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="showVerticalLines" attr="style.chart.grid.y.showVerticalLines" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseAttr name="axisColor" attr="style.chart.grid.y.axisColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="axisThickness" attr="style.chart.grid.y.axisThickness" type="number" defaultVal="2" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="axisName" :level="5" title="style.chart.grid.y.axisName">
                                <BaseAttr name="show" attr="style.chart.grid.y.axisName.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="text" attr="style.chart.grid.y.axisName.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.chart.grid.y.axisName.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.grid.y.axisName.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.grid.y.axisName.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetX" attr="style.chart.grid.y.axisName.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="axisLabels" :level="5" title="style.chart.grid.y.axisLabels">
                                <BaseAttr name="show" attr="style.chart.grid.y.tileLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.chart.grid.y.axisLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.grid.y.axisLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.grid.y.axisLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="labels" attr="userOptions.buttons.labels" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="labels" attr="userOptions.buttonTitles.labels" type="text" defaultVal="Toggle labels" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiStackbar
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  function selectDatapoint({ datapoint, period }) {
    console.log({ datapoint, period })
  }
&lt;/script&gt;
</code>
</pre>

                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            name: string;
            value: number;
            color: string;
        },
        {...}
    ]
    </code>
    </pre>
    <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const stackbarChart = ref(null);
            const stackbarDatasett = ref([]);

            onMounted(() => {
                stackbarDatasett.value = stackbarChart.value.getData();
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
                mounted () {
                    this.stackbarDatasett = this.$refs.stackbarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
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
                </div>
            </template>
            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiStackbar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiStackbar&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiStackbar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiStackbar&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiStackbar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>
            </template>
            <template #tab4>
                <pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
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

<pre>
<code>
    &lt;VueUiStackbar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #reset-action="{ reset }"&gt;
            &lt;button @click="reset()"&gt;Refresh&lt;/button&gt;
        &lt;/template&gt;
    &lt;/VueUiWordCloud&gt;
</code>
</pre>
            </template>
            <template #tab6>
                <ThemesVueUiStackbar/>
            </template>
            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiStackbar" 
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
        </Box>

    </div>
</template>
