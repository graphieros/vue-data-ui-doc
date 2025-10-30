<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import ThemesVueUiRadar from "../themes/ThemesVueUiRadar.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
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

const dataset = ref({
    categories: [
        {
            name: "category 1",
            color: "#5f8bee",
        },
        {
            name: "category 2",
            color: "#42d392",
        },
        {
            name: "category 3",
            color: "#ff6400",
        }
    ],
    series: [
        {
            name: "Serie 1",
            values: [65, 45, 12],
            color: "",
            target: 100
        },
        {
            name: "Serie 2",
            values: [2525, 3472, 4950],
            color: "",
            target: 10000
        },
        {
            name: "Serie 3",
            values: [4.7, 1, 3],
            color: "",
            target: 5
        },
        {
            name: "Serie 4",
            values: [400, 250, 325],
            color: "",
            target: 500
        },
        {
            name: "Serie 5",
            values: [53, 95, 67],
            color: "",
            target: 100
        },
        {
            name: "Serie 6",
            values: [166, 107, 75],
            color: "",
            target: 200
        },
        {
            name: "Serie 7",
            values: [6, 7, 10],
            color: "",
            target: 10
        },
        {
            name: "Serie 8",
            values: [6, 3, 10],
            color: "",
            target: 10
        },
        {
            name: "Serie 9",
            values: [2, 7, 9],
            color: "",
            target: 10
        },
        {
            name: "Serie 10",
            values: [6, 7, 8],
            color: "",
            target: 10
        },
    ]
});

const config = ref({
    debug: false,
    loading: false,
    responsive: false,
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
                plots: {
                    show: true,
                    radius: 2,
                },
                outerPolygon: {
                    stroke: "#6a6b6a",
                    strokeWidth: 1,
                },
                dataPolygon: {
                    strokeWidth: 1,
                    transparent: false,
                    opacity: 50,
                    useGradient: true,
                },
                grid: {
                    show: true,
                    stroke: "#C4C4C4",
                    strokeWidth: 0.5,
                    graduations: 5
                },
                labels: {
                    dataLabels: {
                        show: true,
                        fontSize: 12,
                        color: "#1A1A1A"
                    }
                },
            },
            title: {
                text: "Title",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#565656",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                animation: {
                    show: true,
                    animationFrames: 60
                },
                borderRadius: 4,
                borderColor: "#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: 'center',
                offsetY: 24,
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                fontSize: 14,
                roundingPercentage: 0,
                position: 'bottom'
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
        }
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
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    translations: {
        target: "Target",
        value: "Value",
        datapoint: "Datapoint"
    }
});

const darkModeConfig = ref({
    debug: false,
    loading: false,
    responsive: false,
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            layout: {
                plots: {
                    show: true,
                    radius: 2,
                },
                outerPolygon: {
                    stroke: "#6a6b6a",
                    strokeWidth: 1,
                },
                dataPolygon: {
                    strokeWidth: 1,
                    transparent: false,
                    opacity: 50,
                    useGradient: true,
                },
                grid: {
                    show: true,
                    stroke: "#565756",
                    strokeWidth: 0.5,
                    graduations: 5
                },
                labels: {
                    dataLabels: {
                        show: true,
                        fontSize: 12,
                        color: "#CCCCCC"
                    }
                },
            },
            title: {
                text: "Title",
                color: "#e1e5e8",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                animation: {
                    show: true,
                    animationFrames: 60
                },
                borderRadius: 4,
                borderColor: "#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: 'center',
                offsetY: 24,
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#2A2A2A",
                color: "#CCCCCC",
                fontSize: 14,
                roundingPercentage: 0,
                position: 'bottom'
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
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
            roundingPercentage: 0
        }
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
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    translations: {
        target: "Target",
        value: "Value",
        datapoint: "Datapoint"
    }
});

const slicer = ref(6);

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

function updateDataset() {
    mutableDataset.value = JSON.parse(JSON.stringify({ ...dataset.value, series: dataset.value.series.slice(0, slicer.value) }));
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

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
    return `type VueUiRadarDataset = {
    categories: Array<{
        name: string
        color?: string
    }>
    // ${translations.value.docs.comments.radar.polygon[store.lang]}
    series: Array<{
        name: string
        values: number[] // ${translations.value.docs.comments.radar.seriesValues[store.lang]}
        target: number[] // ${translations.value.docs.comments.radar.target[store.lang]}
        formatter?: null // ${translations.value.formatterLink[store.lang]}
    }>
}`
});

const codeDataset = ref(`const dataset: VueUiRadarDataset = {
    categories: [
        {
            name: "category 1",
            color: "#5f8bee"
        },
        {
            name: "category 2",
            color: "#42d392"
        },
        {
            name: "category 3",
            color: "#ff6400"
        }
    ],
    // Each serie can have its own scale using the target attribute, so you can represent all types of data relations (revenue, satisfaction, percentages...)
    series: [
        {
            name: "Serie 1",
            values: [65, 45, 12],
            color: "",
            target: 100
        },
        {
            name: "Serie 2",
            values: [2525, 3472, 4950],
            color: "",
            target: 10000
        },
        {
            name: "Serie 3",
            values: [4.7, 1, 3],
            color: "",
            target: 5
        },
        {
            name: "Serie 4",
            values: [400, 250, 325],
            color: "",
            target: 500
        },
        {
            name: "Serie 5",
            values: [5, 9, 7],
            color: "",
            target: 10
        },
        {
            name: "Serie 6",
            values: [6, 7, 10],
            color: "",
            target: 10
        },
    ]
}`)

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
        <BaseDocTitle name="VueUiRadar" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.radar[store.lang] }}
        </p>

        <BaseDocHeaderActions targetLink="vue-ui-radar" targetMaker="VueUiRadar"
            :configSource="mainConfig.vue_ui_radar" />

        <div :class="`transition-all mx-auto w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <VueUiRadar 
                        :dataset="mutableDataset" 
                        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
                        :key="key" 
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <div class="flex flex-col gap-3">
                <label for="player">{{ translations.docs.showMoreSeries[store.lang] }}</label>
                <input id="player" type="range" :min="3" :max="10" v-model="slicer" @input="updateDataset"
                class="accent-gray-400 dark:accent-500 max-w-[200px]">
            </div>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-radar"/>
        </div>

        <Rater itemId="vue_ui_radar" />

        <BaseMigrationInfo
            cssAnimation
            debug
        />

        <Box ref="box" showEmits showSlots showTooltip showCallbacks showThemes showResponsive schema="vue_ui_radar" signInfo="both">
            <template v-slot:tab0>

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

            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                    <div class="flex gap-2">
                        <button @click="resetDefault"
                            class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                            class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                            <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                        </button>
                    </div>
                    <div class="mt-6">
                        TS type: <code class="text-app-blue">VueUiRadarConfig</code>
                    </div>

                    <div class="my-4">
                        Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                    </div>

                    <code ref="configCode">
    <BaseDetails attr="const config: VueUiRadarConfig" equal>
        <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="dataPolygon" :level="4" title="style.chart.layout.dataPolygon">
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.dataPolygon.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="transparent" attr="style.chart.layout.dataPolygon.transparent" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="opacity" attr="style.chart.layout.dataPolygon.opacity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="useGradient" attr="style.chart.layout.dataPolygon.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                    <BaseDetails attr="grid" :level="4" title="style.chart.layout.grid">
                        <BaseAttr name="show" attr="style.chart.layout.grid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="stroke" attr="style.chart.layout.grid.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.grid.strokeWidth" type="number" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="graduations" attr="style.chart.layout.grid.graduations" type="select" defaultVal="5" :options="[2, 5, 10]" :light="mutableConfig" :dark="mutableConfigDarkMode" />

                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">
                        <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.labels.dataLabels">
                            <BaseAttr name="show" attr="style.chart.layout.labels.dataLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            <BaseAttr name="fontSize" attr="style.chart.layout.labels.dataLabels.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            <BaseAttr name="color" attr="style.chart.layout.labels.dataLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="outerPolygon" :level="4" title="style.chart.layout.outerPolygon">
                        <BaseAttr name="stroke" attr="style.chart.layout.outerPolygon.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.outerPolygon.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                    <BaseDetails attr="plots" :level="4" title="style.chart.layout.plots">
                        <BaseAttr name="show" attr="style.chart.layout.plots.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="radius" attr="style.chart.layout.plots.radius" type="range" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="roundingPercentage" attr="style.chart.legend.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="position" attr="style.chart.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
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
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showValue" attr="style.chart.tooltip.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="showPercentage" attr="style.chart.tooltip.showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="roundingValue" attr="style.chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingPercentage" attr="style.chart.tooltip.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <div class="flex flex-row gap-2 place-items-center">
                        <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
                        <div class="min-w-[200px]">
                            <BaseTabLink :action="() => setActiveTab(4)" icon="tooltip">
                                Check out 'Custom tooltip' tab
                            </BaseTabLink>
                        </div>
                    </div>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smooth" attr="style.chart.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothForce" attr="style.chart.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothSnapThreshold" attr="style.chart.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="animation" :level="4" title="style.chart.tooltip.animation">
                        <BaseAttr name="show" attr="style.chart.tooltip.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="animationFrames" attr="style.chart.tooltip.animation.animationFrames" type="number" defaultVal="60" :min="0" :max="300" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
        <BaseDetails attr="translations" :level="1">
            <BaseAttr name="target" attr="translations.target" type="text" defaultVal="Target" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="value" attr="translations.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="datapoint" attr="translations.datapoint" type="text" defaultVal="Datapoint" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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
            color: string;
            proportion: number;
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

            const radarChart = ref(null);
            const radarDataset = ref([]);

            onMounted(async () => {
                radarDataset.value = await radarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRadar
                ref="radarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRadar
                ref="radarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        radarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.radarDataset = await this.$refs.radarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
</div>
                <ExposedMethods
                    component="VueUiRadar"
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
                    componentName="VueUiRadar"
                    :types="[
                        'svg',
                        'legend',
                        'tooltip-before',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions'
                    ]" 
                />
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
            </template>

            <template #tab6>
                <ThemesVueUiRadar />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiRadar :dataset="mutableDataset" :config="isDarkMode
                    ? {
                        ...mutableConfigDarkMode,
                        responsive: true
                    }
                    : {
                        ...mutableConfig,
                        responsive: true
                    }
                                " :key="key" />
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
                        'tooltip',
                        'svg'
                    ]"
                />
            </template>
        </Box>
    </div>
</template>