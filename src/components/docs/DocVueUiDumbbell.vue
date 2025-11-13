<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiDumbbell from "../themes/ThemesVueUiDumbbell.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
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
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

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

const dataset = ref([
    { name: 'Sweden', start: 5000, end: 7100 },
    { name: 'Korea, Rep.', start: 4900, end: 7050 },
    { name: 'Iceland', start: 6500, end: 8000 },
    { name: 'Finland', start: 6400, end: 7600 },
    { name: 'Norway', start: 5400, end: 6050 },
    { name: 'Ireland', start: 3000, end: 2000 }
]);

const config = ref({
    debug: false,
    loading: false,
    responsive: false,
    useAnimation: true,
    animationSpeed: 2,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            width: 600,
            rowHeight: 48,
            padding: {
                top: 12,
                right: 24,
                bottom: 12,
                left: 12,
            },
            plots: {
                startColor: "#ff6400",
                endColor: "#5f8bee",
                radius: 6,
                stroke: "#FFFFFF",
                strokeWidth: 1,
                link: {
                    strokeWidth: 2,
                    type: "curved"
                },
                gradient: {
                    show: true,
                    intensity: 40
                },
                evaluationColors: {
                    enable: false,
                    positive: '#2ca02c',
                    negative: '#d62728',
                    neutral: '#c7c7c7',
                }
            },
            grid: {
                strokeWidth: 1,
                scaleSteps: 10,
                scaleMin: null,
                scaleMax: null,
                horizontalGrid: {
                    show: true,
                    stroke: "#cccccc",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                },
                verticalGrid: {
                    show: true,
                    stroke: "#cccccc",
                    strokeWidth: 0.5,
                    strokeDasharray: 0
                }
            },
            comparisonLines: {
                show: true,
                strokeWidth: 1,
                strokeDasharray: 4,
                showRect: true,
                rectColor: '#2D353C',
                rectOpacity: 5,
                showLabel: true,
                labelColor: '#2D353C',
                labelFontSize: 12,
            },
            highlighter: {
                color: '#2D353C',
                opacity: 5  
            },
            labels: {
                prefix: "",
                suffix: "",
                axis: {
                    yLabel: 'Y axis',
                    yLabelOffsetX: 0,
                    xLabel: 'X axis',
                    xLabelOffsetY: 0,
                    fontSize: 14,
                    color: '#2D353C'
                },
                yAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#2D353C",
                    offsetX: 0,
                    bold: true,
                    showProgression: true,
                    rounding: 1,
                    formatter: null
                },
                xAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#2D353C",
                    offsetY: 0,
                    bold: false,
                    rounding: 0,
                    rotation: 0,
                    autoRotate: {
                        enable: true,
                        angle: -30
                    }
                },
                startLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#2D353C",
                    offsetY: 0,
                    rounding: 0,
                    useStartColor: true,
                    useEvaluationColor: true,
                },
                endLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#2D353C",
                    offsetY: 0,
                    rounding: 0,
                    useEndColor: true,
                    useEvaluationColor: true,
                }
            },
            legend: {
                show: true,
                labelStart: "2014",
                labelEnd: "2024",
                labelPositive: 'positive',
                labelNegative: 'negative',
                labelNeutral: 'neutral',
                backgroundColor: "#F3F4F6",
                color: "#2D353C",
                fontSize: 14,
                bold: false,
                position: 'bottom'
            },
            title: {
                text: "Number of researchers",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "From 2014 to 2024",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        columnNames: {
            series: "Series",
            start: "Start value",
            end: "End value",
            progression: "Progression"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 1
        }
    }
})

const darkModeConfig = ref({
    debug: false,
    loading: false,
    responsive: false,
    useAnimation: true,
    animationSpeed: 2,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            width: 600,
            rowHeight: 48,
            padding: {
                top: 12,
                right: 24,
                bottom: 12,
                left: 12,
            },
            plots: {
                startColor: "#ff6400",
                endColor: "#5f8bee",
                radius: 6,
                stroke: "#2A2A2A",
                strokeWidth: 1,
                link: {
                    strokeWidth: 2,
                    type: "curved"
                },
                gradient: {
                    show: true,
                    intensity: 40
                },
                evaluationColors: {
                    enable: false,
                    positive: '#2ca02c',
                    negative: '#d62728',
                    neutral: '#c7c7c7',
                }
            },
            grid: {
                strokeWidth: 1,
                scaleSteps: 10,
                scaleMin: null,
                scaleMax: null,
                horizontalGrid: {
                    show: true,
                    stroke: "#6A6A6A",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                },
                verticalGrid: {
                    show: true,
                    stroke: "#6A6A6A",
                    strokeWidth: 0.5,
                    strokeDasharray: 0
                }
            },
            comparisonLines: {
                show: true,
                strokeWidth: 1,
                strokeDasharray: 4,
                showRect: true,
                rectColor: '#CCCCCC',
                rectOpacity: 5,
                showLabel: true,
                labelColor: '#CCCCCC',
                labelFontSize: 12,
            },
            highlighter: {
                color: '#CCCCCC',
                opacity: 5  
            },
            labels: {
                prefix: "",
                suffix: "",
                axis: {
                    yLabel: 'Y axis',
                    yLabelOffsetX: 0,
                    xLabel: 'X axis',
                    xLabelOffsetY: 0,
                    fontSize: 14,
                    color: '#CCCCCC'
                },
                yAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#CCCCCC",
                    offsetX: 0,
                    bold: true,
                    showProgression: true,
                    rounding: 1,
                    formatter: null,
                },
                xAxisLabels: {
                    show: true,
                    fontSize: 14,
                    color: "#CCCCCC",
                    offsetY: 0,
                    bold: false,
                    rounding: 0,
                    rotation: 0,
                    autoRotate: {
                        enable: true,
                        angle: -30
                    }
                },
                startLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#CCCCCC",
                    offsetY: 0,
                    rounding: 0,
                    useStartColor: true,
                    useEvaluationColor: true,
                },
                endLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#CCCCCC",
                    offsetY: 0,
                    rounding: 0,
                    useEndColor: true,
                    useEvaluationColor: true,
                }
            },
            legend: {
                show: true,
                labelStart: "2014",
                labelEnd: "2024",
                labelPositive: 'positive',
                labelNegative: 'negative',
                labelNeutral: 'neutral',
                backgroundColor: "#2A2A2A",
                color: "#CCCCCC",
                fontSize: 14,
                bold: false,
                position: 'bottom'
            },
            title: {
                text: "Number of researchers",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "From 2014 to 2024",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        columnNames: {
            series: "Series",
            start: "Start value",
            end: "End value",
            progression: "Progression"
        },
        th: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 1
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
    store.docSnap = !store.docSnap;
}

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

const dsTypeCode = computed(() => {
    return `type VueUiDumbbellDataset = {
    name: string
    start: number
    end: number
}`
});

const codeDataset = ref(`const dataset: VueUiDumbbellDataset[] = [
    { name: 'Sweden', start: 5000, end: 7100 },
    { name: 'Korea, Rep.', start: 4900, end: 7050 },
    { name: 'Iceland', start: 6500, end: 8000 },
    { name: 'Finland', start: 6400, end: 7600 },
    { name: 'Norway', start: 5400, end: 6050 },
    { name: 'Ireland', start: 3000, end: 2000 }
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
        <BaseDocTitle name="VueUiDumbbell" />

        <BaseDocDescription :text="translations.docs.tooltips.dumbbell[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-dumbbell"
            :configSource="mainConfig.vue_ui_dumbbell"
        />

        <div :class="`transition-all mx-auto w-full sm:w-3/4`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <VueDataUi component="VueUiDumbbell" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_dumbbell" />

        <BaseMigrationInfo
            autoRotate
            debug 
            padding
        />

        <Box ref="box" showEmits showSlots showThemes showCallbacks showResponsive schema="vue_ui_dumbbell" signInfo="both">
            <template #tab0>
                <div>
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
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiDumbbellConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiDumbbellConfig">
        <span> responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
        <BaseAttr name="useAnimation" attr="useAnimation" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="animationSpeed" attr="animationSpeed" type="range" defaultVal="2" :min="0.1" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseDetails attr="events" :level="1">
            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="width" attr="style.chart.width" type="number" defaultVal="600" :min="300" :max="1000" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="rowHeight" attr="style.chart.rowHeight" type="range" defaultVal="48" :min="40" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseDetails attr="grid" :level="3" title="style.chart.grid">
                    <BaseAttr name="strokeWidth" attr="style.chart.grid.strokeWidth" type="number" defaultVal="1" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="scaleSteps" attr="style.chart.grid.scaleSteps" type="select" defaultVal="10" :options="[2, 5, 10, 20]" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="scaleMin" attr="style.chart.grid.scaleMin" type="number" defaultVal="null" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="scaleMax" attr="style.chart.grid.scaleMax" type="number" defaultVal="null" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="horizontalGrid" :level="4" title="style.chart.grid.horizontalGrid">
                        <BaseAttr name="show" attr="style.chart.grid.horizontalGrid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="stroke" attr="style.chart.grid.horizontalGrid.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.horizontalGrid.strokeWidth" type="range" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeDasharray" attr="style.chart.grid.horizontalGrid.strokeDasharray" type="range" defaultVal="4" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="verticalGrid" :level="4" title="style.chart.grid.verticalGrid">
                        <BaseAttr name="show" attr="style.chart.grid.verticalGrid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="stroke" attr="style.chart.grid.verticalGrid.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.verticalGrid.strokeWidth" type="range" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeDasharray" attr="style.chart.grid.verticalGrid.strokeDasharray" type="range" defaultVal="4" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>

                <BaseDetails attr="comparisonLines" :level="3" title="style.chart.comparisonLines">
                    <BaseAttr name="show" attr="style.chart.comparisonLines.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.comparisonLines.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeDasharray" attr="style.chart.comparisonLines.strokeDasharray" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showRect" attr="style.chart.comparisonLines.showRect" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="rectColor" attr="style.chart.comparisonLines.rectColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="rectOpacity" attr="style.chart.comparisonLines.rectOpacity" type="range" defaultVal="5" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showLabel" attr="style.chart.comparisonLines.showLabel" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="labelColor" attr="style.chart.comparisonLines.labelColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="labelFontSize" attr="style.chart.comparisonLines.labelFontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>

                <BaseDetails attr="highlighter" :level="3" title="style.chart.highlighter">
                    <BaseAttr name="color" attr="style.chart.highlighter.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="opacity" attr="style.chart.highlighter.opacity" type="range" defaultVal="5" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>

                <BaseDetails attr="labels" :level="3" title="style.chart.labels">
                    <BaseAttr name="prefix" attr="style.chart.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="suffix" attr="style.chart.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <div class="flex flex-row gap-2 place-items-center">
                        <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                        <div class="min-w-[200px]">
                            <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                                Go to page
                            </BaseTabLink>
                        </div>
                    </div>

                    <BaseDetails attr="axis" :level="4" title="style.chart.labels.axis">
                        <BaseAttr name="yLabel" attr="style.chart.labels.axis.yLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="yLabelOffsetX" attr="style.chart.labels.axis.yLabelOffsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="xLabel" attr="style.chart.labels.axis.xLabel" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="xLabelOffsetY" attr="style.chart.labels.axis.xLabelOffsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.labels.axis.fontSize"  type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.labels.axis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>

                    <BaseDetails attr="endLabels" :level="4" title="style.chart.labels.endLabels">
                        <BaseAttr name="show" attr="style.chart.labels.endLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="fontSize" attr="style.chart.labels.endLabels.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.labels.endLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.labels.endLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rounding" attr="style.chart.labels.endLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useEndColor" attr="style.chart.labels.endLabels.useEndColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useEvaluationColor" attr="style.chart.labels.endLabels.useEvaluationColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="startLabels" :level="4" title="style.chart.labels.startLabels">
                        <BaseAttr name="show" attr="style.chart.labels.startLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.labels.startLabels.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.labels.startLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.labels.startLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rounding" attr="style.chart.labels.startLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useStartColor" attr="style.chart.labels.startLabels.useStartColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useEvaluationColor" attr="style.chart.labels.startLabels.useEvaluationColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="xAxisLabels" :level="4" title="style.chart.labels.xAxisLabels">
                        <BaseAttr name="show" attr="style.chart.labels.xAxisLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="fontSize" attr="style.chart.labels.xAxisLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.labels.xAxisLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.labels.xAxisLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.labels.xAxisLabels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="rounding" attr="style.chart.labels.xAxisLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rotation" attr="style.chart.labels.xAxisLabels.rotation" type="number" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="autoRotate" :level="5" title="style.chart.labels.xAxisLabels.autoRotate">
                            <BaseAttr name="enable" attr="style.chart.labels.xAxisLabels.autoRotate.enable" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="angle" attr="style.chart.labels.xAxisLabels.autoRotate.angle" type="number" defaultVal="-30" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="yAxisLabels" :level="4" title="style.chart.labels.yAxisLabels">
                        <BaseAttr name="show" attr="style.chart.labels.yAxisLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="fontSize" attr="style.chart.labels.yAxisLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.labels.yAxisLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetX" attr="style.chart.labels.yAxisLabels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.labels.yAxisLabels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="rounding" attr="style.chart.labels.yAxisLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showProgression" attr="style.chart.labels.yAxisLabels.showProgression" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <div class="flex flex-row gap-2 place-items-center">
                            <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                            <div class="min-w-[200px]">
                                <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                                    Go to page
                                </BaseTabLink>
                            </div>
                        </div>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="labelStart" attr="style.chart.legend.labelStart" type="text" defaultVal="start" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="labelEnd" attr="style.chart.legend.labelEnd" type="text" defaultVal="end" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="labelPositive" attr="style.chart.legend.labelPositive" type="text" defaultVal="positive" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="labelNegative" attr="style.chart.legend.labelNegative" type="text" defaultVal="negative" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="labelNeutral" attr="style.chart.legend.labelNeutral" type="text" defaultVal="neutral" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="position" attr="style.chart.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                </BaseDetails>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                </BaseDetails>
                <BaseDetails attr="plots" :level="3" title="style.chart.plots">
                    <BaseAttr name="startColor" attr="style.chart.plots.startColor" type="color" defaultVal="#DC3912" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="endColor" attr="style.chart.plots.endColor" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="radius" attr="style.chart.plots.radius" type="number" defaultVal="6" :min="2" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.plots.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.plots.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="gradient" :level="4" title="style.chart.plots.gradient">
                        <BaseAttr name="show" attr="style.chart.plots.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                        <BaseAttr name="intensity" attr="style.chart.plots.gradient.intensity" type="range" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="link" :level="4" title="style.chart.plots.link">
                        <BaseAttr name="type" attr="style.chart.plots.link.type" type="select" defaultVal="curved" :options="['curved', 'line']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.plots.link.strokeWidth" type="number" defaultVal="2" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="For type line"/>
                    </BaseDetails>
                    <BaseDetails attr="evaluationColors" :level="4" title="style.chart.plots.evaluationColors">
                        <BaseAttr name="enable" attr="style.chart.plots.evaluationColors.enable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="positive" attr="style.chart.plots.evaluationColors.positive" type="color" defaultVal="#2ca02c" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="negative" attr="style.chart.plots.evaluationColors.negative" type="color" defaultVal="#d62728" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="neutral" attr="style.chart.plots.evaluationColors.neutral" type="color" defaultVal="#c7c7c7" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
                <BaseAttr name="start" attr="table.columnNames.start" type="text" defaultVal="Start value" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
                <BaseAttr name="end" attr="table.columnNames.end" type="text" defaultVal="End value" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
                <BaseAttr name="progression" attr="table.columnNames.progression" type="text" defaultVal="Progression" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="roundingPercentage" attr="table.td.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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
    </BaseDetails>
</code>

            </template>
            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const dumbbellChart = ref(null);
            const dumbbellDataset = ref([]);

            onMounted(async () => {
                dumbbellDataset.value = await dumbbellChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDumbbell
                ref="dumbbellChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDumbbell
                ref="dumbbellChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        dumbbellDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.dumbbellDataset = await this.$refs.dumbbellChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <ExposedMethods
                    component="VueUiDumbbell"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable'
                    ]"
                />
                </div>
            </template>
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiDumbbell"
                    :types="[
                        'svg',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiDumbbell />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi 
                            component="VueUiDumbbell" 
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