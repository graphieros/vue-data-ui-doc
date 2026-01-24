<script setup>
import { ref, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import ThemesVueUiHistoryPlot from "../themes/ThemesVueUiHistoryPlot.vue";
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

const mainConfig = useConfig();
const store = useMainStore();
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

const dataset = ref([
    {
        name: "Series 1",
        values: [
            { x: 355, y: 2.3, label: "January" },
            { x: 112, y: 1.2, label: "February" },
            { x: 313, y: 0.4, label: "March" },
            { x: 555, y: 1.2, label: "April" },
        ],
    },
    {
        name: "Series 2",
        values: [
            { x: 1000, y: 2, label: "January" },
            { x: 655, y: 4, label: "February" },
            { x: 350, y: 3, label: "March" },
            { x: 815, y: 2.5, label: "April" },
        ],
    },
]);

const config = ref({
    debug: false,
    loading: false,
    responsive: false,
    responsiveProportionalSizing: true,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: "right",
        buttons: {
            tooltip: true,
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
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#f3f4f6",
            color: "#2D353Cff",
            outline: "none",
        },
        td: {
            backgroundColor: "#f3f4f6",
            color: "#2D353Cff",
            outline: "none",
            roundingValue: 0,
        },
        columnNames: {
            series: "Series",
            datapoint: "Datapoint",
            x: "x",
            y: "y",
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#f3f4f6",
            color: "#2D353C",
            height: 500,
            width: 600,
            padding: {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12,
            },
            grid: {
                xAxis: {
                    show: true,
                    stroke: "#e1e5e8",
                    strokeWidth: 1,
                },
                horizontalLines: {
                    show: true,
                    stroke: "#e1e5e8",
                    strokeWidth: 0.6,
                },
                yAxis: {
                    show: true,
                    stroke: "#e1e5e8",
                    strokeWidth: 1,
                },
                verticalLines: {
                    show: true,
                    stroke: "#e1e5e8",
                    strokeWidth: 0.6,
                },
            },
            axes: {
                x: {
                    scaleMin: null,
                    scaleMax: null,
                    ticks: 10,
                    labels: {
                        show: true,
                        fontSize: 16,
                        color: "#2D353C",
                        bold: false,
                        rounding: 1,
                        offsetY: 0,
                        formatter: null,
                        prefix: "",
                        suffix: "",
                        rotation: 0,
                        autoRotate: {
                            enable: true,
                            angle: -30
                        }
                    },
                    name: {
                        text: "x Axis",
                        fontSize: 16,
                        offsetX: 0,
                        offsetY: -12,
                        bold: false,
                        color: "#2D353C",
                    },
                },
                y: {
                    scaleMin: null,
                    scaleMax: null,
                    ticks: 10,
                    labels: {
                        show: true,
                        fontSize: 16,
                        color: "#2D353Cff",
                        bold: false,
                        rounding: 1,
                        offsetX: 0,
                        formatter: null,
                        prefix: "",
                        suffix: "",
                    },
                    name: {
                        text: "y Axis",
                        fontSize: 16,
                        offsetX: 0,
                        offsetY: 0,
                        bold: false,
                        color: "#2D353C",
                    },
                },
            },
            plots: {
                radius: 16,
                stroke: "#FFFFFF",
                strokeWidth: 1,
                gradient: {
                    show: true,
                    intensity: 40,
                },
                indexLabels: {
                    show: true,
                    startAtZero: false,
                    adaptColorToBackground: true,
                    color: "#2D353C",
                    fontSize: 16,
                    bold: false,
                    offsetY: 0,
                    offsetX: 0,
                },
                labels: {
                    show: true,
                    fontSize: 10,
                    color: "#2D353C",
                    bold: false,
                    offsetY: 0,
                    offsetX: 0,
                },
            },
            paths: {
                show: true,
                strokeWidth: 1.6,
                useSerieColor: true,
                stroke: "#2D353C",
            },
            legend: {
                show: true,
                bold: false,
                backgroundColor: "#f3f4f6",
                color: "#2D353Cff",
                fontSize: 14,
                position: 'bottom',
                selectAllToggle: {
                    show: false,
                    backgroundColor: '#E1E5E8',
                    color: '#1A1A1A'
                }
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
                    bold: false,
                },
            },
            tooltip: {
                teleportTo: 'body',
                show: true,
                color: "#2D353Cff",
                backgroundColor: "#FFFFFFff",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 100,
                position: "center",
                offsetY: 24,
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
        },
    },
});

const darkModeConfig = ref({
    debug: false,
    loading: false,
    responsive: false,
    responsiveProportionalSizing: true,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: "right",
        buttons: {
            tooltip: true,
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
            datapoint: "Datapoint",
            x: "x",
            y: "y",
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            height: 500,
            width: 600,
            padding: {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12,
            },
            grid: {
                xAxis: {
                    show: true,
                    stroke: "#5A5A5A",
                    strokeWidth: 1,
                },
                horizontalLines: {
                    show: true,
                    stroke: "#3A3A3A",
                    strokeWidth: 0.6,
                },
                yAxis: {
                    show: true,
                    stroke: "#5A5A5A",
                    strokeWidth: 1,
                },
                verticalLines: {
                    show: true,
                    stroke: "#3A3A3A",
                    strokeWidth: 0.6,
                },
            },
            axes: {
                x: {
                    scaleMin: null,
                    scaleMax: null,
                    ticks: 10,
                    labels: {
                        show: true,
                        fontSize: 16,
                        color: "#8A8A8A",
                        bold: false,
                        rounding: 1,
                        offsetY: 0,
                        formatter: null,
                        prefix: "",
                        suffix: "",
                        rotation: 0,
                        autoRotate: {
                            enable: true,
                            angle: -30
                        }
                    },
                    name: {
                        text: "x Axis",
                        fontSize: 16,
                        offsetX: 0,
                        offsetY: -12,
                        bold: false,
                        color: "#8A8A8A",
                    },
                },
                y: {
                    scaleMin: null,
                    scaleMax: null,
                    ticks: 10,
                    labels: {
                        show: true,
                        fontSize: 16,
                        color: "#8A8A8A",
                        bold: false,
                        rounding: 1,
                        offsetX: 0,
                        formatter: null,
                        prefix: "",
                        suffix: "",
                    },
                    name: {
                        text: "y Axis",
                        fontSize: 16,
                        offsetX: 0,
                        offsetY: 0,
                        bold: false,
                        color: "#6A6A6A",
                    },
                },
            },
            plots: {
                radius: 16,
                stroke: "#2A2A2A",
                strokeWidth: 1,
                gradient: {
                    show: true,
                    intensity: 40,
                },
                indexLabels: {
                    show: true,
                    startAtZero: false,
                    adaptColorToBackground: true,
                    color: "#CCCCCC",
                    fontSize: 16,
                    bold: false,
                    offsetY: 0,
                    offsetX: 0,
                },
                labels: {
                    show: true,
                    fontSize: 10,
                    color: "#CCCCCC",
                    bold: false,
                    offsetY: 0,
                    offsetX: 0,
                },
            },
            paths: {
                show: true,
                strokeWidth: 1.6,
                useSerieColor: true,
                stroke: "#6A6A6A",
            },
            legend: {
                show: true,
                bold: false,
                backgroundColor: "#2A2A2A",
                color: "#CCCCCC",
                fontSize: 14,
                position: 'bottom',
                selectAllToggle: {
                    show: false,
                    backgroundColor: '#3A3A3A',
                    color: '#CCCCCC'
                }
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
                    bold: false,
                },
            },
            tooltip: {
                teleportTo: 'body',
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24,
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
        },
    },
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
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

const key = ref(0)

function forceChartUpdate() {
    key.value += 1;
}

const dsTypeCode = computed(() => {
    return `type VueUiHistoryPlotDatasetItem = {
    name: string
    values: Array<{
        x: number;
        y: number;
        label: string
    }>
}`
})

const codeDataset = ref(`const dataset: VueUiHistoryPlotDatasetItem[] = [
    {
        name: "Series 1",
        values: [
            { x: 355, y: 2.3, label: "January" },
            { x: 112, y: 1.2, label: "February" },
            { x: 313, y: 0.4, label: "March" },
            { x: 555, y: 1.2, label: "April" },
        ],
    },
    {
        name: "Series 2",
        values: [
            { x: 1000, y: 2, label: "January" },
            { x: 655, y: 4, label: "February" },
            { x: 350, y: 3, label: "March" },
            { x: 815, y: 2.5, label: "April" },
        ],
    },
]`)

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

const customFormatCode = ref(`customFormat: ({ seriesIndex, datapoint, datapointIndex series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiHistoryPlot" />

        <BaseDocDescription :text="translations.docs.tooltips.historyPlot[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-history-plot"
            targetMaker="VueUiHistoryPlot"
            :configSource="mainConfig.vue_ui_history_plot"
        />

        <div
            :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <VueDataUi component="VueUiHistoryPlot" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-history-plot"/>
        </div>

        <Rater itemId="vue_ui_history_plot" />

        <BaseMigrationInfo
            autoRotate
            cssAnimation
            debug 
            padding
        />

        <Box ref="box" showEmits showCallbacks showSlots showThemes showResponsive showTooltip signInfo="both" schema="vue_ui_history_plot">
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
                    TS type: <code class="text-app-blue">VueUiHistoryPlotConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiHistoryPlotConfig" equal>
        <BaseAttr inactive name="responsive" defaultVal="false" :comment="translations.responsive[store.lang]"/>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="responsiveProportionalSizing" defaultVal="true" :comment="translations.responsiveProportionalSizing[store.lang]"/>
        <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
        <BaseAttr inactive name="customPalette" defaultVal="[]" comment="string[]"/>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
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
                <BaseAttr name="height" attr="style.chart.height" type="number" defaultVal="600" :min="300" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="width" attr="style.chart.width" type="number" defaultVal="500" :min="300" :max="1500" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="12" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="48" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="48" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="grid" :level="3" title="style.chart.grid">
                    <BaseDetails attr="xAxis" :level="4" title="style.chart.grid.xAxis">
                        <BaseAttr name="show" attr="style.chart.grid.xAxis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.grid.xAxis.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.xAxis.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="horizontalLines" :level="4" title="style.chart.grid.horizontalLines">
                        <BaseAttr name="show" attr="style.chart.grid.horizontalLines.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.grid.horizontalLines.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.horizontalLines.strokeWidth" type="number" defaultVal="0.6" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="yAxis" :level="4" title="style.chart.grid.yAxis">
                        <BaseAttr name="show" attr="style.chart.grid.yAxis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.grid.yAxis.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.yAxis.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="verticalLines" :level="4" title="style.chart.grid.verticalLines">
                        <BaseAttr name="show" attr="style.chart.grid.verticalLines.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.grid.verticalLines.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.grid.verticalLines.strokeWidth" type="number" defaultVal="0.6" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="axes" :level="3" title="style.chart.axes">
                    <BaseDetails attr="x" :level="4" title="style.chart.axes.x">
                        <span>scaleMin: null,</span>
                        <span>scaleMax: null,</span>
                        <BaseAttr name="ticks" attr="style.chart.axes.x.ticks" type="select" :options="[2, 3, 5, 10, 20]" defaultVal="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="labels" title="style.chart.axes.x.labels" :level="5">
                            <BaseAttr name="show" attr="style.chart.axes.x.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.axes.x.labels.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.axes.x.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.axes.x.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="rounding" attr="style.chart.axes.x.labels.rounding" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.axes.x.labels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <div class="flex flex-row gap-2 place-items-center">
                                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                                <div class="min-w-[200px]">
                                    <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                                        Go to page
                                    </BaseTabLink>
                                </div>
                            </div>
                            <BaseAttr name="prefix" attr="style.chart.axes.x.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="suffix" attr="style.chart.axes.x.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="rotation" attr="style.chart.axes.x.labels.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="autoRotate" :level="6" title="style.chart.axes.x.labels.autoRotate">
                                <BaseAttr name="enable" attr="style.chart.axes.x.labels.autoRotate.enable" :light="mutableConfig" :dark="mutableConfigDarkMode" defaultVal="true" type="checkbox"/>
                                <BaseAttr name="angle" attr="style.chart.axes.x.labels.autoRotate.angle" type="number" defaultVal="-30" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="name" title="style.chart.axes.x.name" :level="5">
                            <BaseAttr name="text" attr="style.chart.axes.x.name.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.axes.x.name.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetX" attr="style.chart.axes.x.name.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.axes.x.name.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.axes.x.name.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="y" :level="4" title="style.chart.axes.y">
                        <span>scaleMin: null,</span>
                        <span>scaleMax: null,</span>
                        <BaseAttr name="ticks" attr="style.chart.axes.y.ticks" type="select" :options="[2, 3, 5, 10, 20]" defaultVal="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="labels" title="style.chart.axes.y.labels" :level="5">
                            <BaseAttr name="show" attr="style.chart.axes.y.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.axes.y.labels.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.axes.y.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.axes.y.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="rounding" attr="style.chart.axes.y.labels.rounding" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.axes.y.labels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <div class="flex flex-row gap-2 place-items-center">
                                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                                <div class="min-w-[200px]">
                                    <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                                        Go to page
                                    </BaseTabLink>
                                </div>
                            </div>
                            <BaseAttr name="prefix" attr="style.chart.axes.y.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="suffix" attr="style.chart.axes.y.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="name" title="style.chart.axes.y.name" :level="5">
                            <BaseAttr name="text" attr="style.chart.axes.y.name.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.axes.y.name.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetX" attr="style.chart.axes.y.name.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.axes.y.name.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.axes.y.name.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="plots" :level="3" title="style.chart.plots">
                    <BaseAttr name="radius" attr="style.chart.plots.radius" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.plots.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.plots.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="gradient" :level="4" title="style.chart.plots.gradient">
                        <BaseAttr name="show" attr="style.chart.plots.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="intensity" attr="style.chart.plots.gradient.intensity" type="range" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="indexLabels" :level="4" title="style.chart.plots.indexLabels">
                        <BaseAttr name="show" attr="style.chart.plots.indexLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="startAtZero" attr="style.chart.plots.indexLabels.startAtZero" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="adaptColorToBackground" attr="style.chart.plots.indexLabels.adaptColorToBackground" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.plots.indexLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.plots.indexLabels.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.plots.indexLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetX" attr="style.chart.plots.indexLabels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.plots.indexLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.plots.labels">
                        <BaseAttr name="show" attr="style.chart.plots.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.plots.labels.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.plots.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.plots.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetX" attr="style.chart.plots.labels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.plots.labels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="paths" :level="3" title="style.chart.paths">
                    <BaseAttr name="show" attr="style.chart.paths.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.paths.strokeWidth" type="number" defaultVal="1.6" :min="0.1" :max="24" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="useSerieColor" attr="style.chart.paths.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.paths.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="position" attr="style.chart.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseDetails attr="selectAllToggle" :level="4" title="style.chart.legend.selectAllToggle">
                        <BaseAttr name="show" attr="style.chart.legend.selectAllToggle.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="backgroundColor" attr="style.chart.legend.selectAllToggle.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.legend.selectAllToggle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="title" :level="2" title="style.chart.title">
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
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr inactive name="teleportTo" defaultVal="'body'" comment="Sets the 'to' attr of the Teleport Vue component"/>
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="showValue" attr="style.chart.tooltip.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showPercentage" attr="style.chart.tooltip.showPercentage" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <div class="flex flex-row gap-2 place-items-center">
                        <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
                        <div class="min-w-[200px]">
                            <BaseTabLink :action="() => setActiveTab(4)" icon="tooltip">
                                Check out 'Custom tooltip' tab
                            </BaseTabLink>
                        </div>
                    </div>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smooth" attr="style.chart.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothForce" attr="style.chart.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothSnapThreshold" attr="style.chart.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="datapoint" attr="table.columnNames.datapoint" type="text" defaultVal="Datapoint" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="x" attr="table.columnNames.x" type="text" defaultVal="x" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="y" attr="table.columnNames.y" type="text" defaultVal="y" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
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

            <!-- EMITS -->
            <template #tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiHistoryPlot
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiHistoryPlotDatasetItem, index: number }) {
    console.log({ datapoint, index })
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

            const historyPlotChart = ref(null);
            const historyPlotDataset = ref([]);

            onMounted(async () => {
                historyPlotDataset.value = await historyPlotChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiHistoryPlot
                ref="historyPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiHistoryPlot
                ref="historyPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        historyPlotDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.historyPlotDataset = await this.$refs.historyPlotChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <ExposedMethods
                    component="VueUiHistoryPlot"
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
                </div>
            </template>

            <!-- SLOTS -->
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiHistoryPlot"
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
                <h3 class="mb-4">{{ translations.customFormat[store.lang] }}</h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]">config.style.chart.tooltip.customFormat</code>
                <CodeParser
                    class="mt-4"
                    language="javascript"
                    :content="customFormatCode"
                />

                <h3 class="my-4">{{ translations.customFormatCss[store.lang] }}</h3>
                <CodeParser
                    language="css"
                    content=".vue-data-ui-custom-tooltip{ }"
                />
            </template>

            <!-- THEMES -->
            <template #tab6>
                <ThemesVueUiHistoryPlot/>
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiHistoryPlot" 
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
                        'tooltip',
                        'svg'
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
