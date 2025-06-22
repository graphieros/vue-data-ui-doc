<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon, ExclamationCircleIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiChord from "../themes/ThemesVueUiChord.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";

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

const dataset = ref({
    matrix: [
        [ 12000, 6000, 9000, 3000],
        [ 2000, 10000, 2000, 6001], 
        [ 8000, 1600, 8000, 8001], 
        [ 1000, 1000, 1000, 7001]  
    ],
    labels: ["Group A", "Group B", "Group C", "Group D"],
});

const config = ref({
    theme: "",
    customPalette: [],
    enableRotation: true,
    initialRotation: 0,
    useCssAnimation: true,
    responsive: false,
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
            allowTaint: false,
            backgroundColor: "#F3F4F6",
            useCORS: false,
            onclone: null,
            scale: 2,
            logging: false,
        },
    },
    table: {
        show: false,
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
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "1A1A1A",
            legend: {
                show: true,
                bold: false,
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                fontSize: 14,
            },
            title: {
                text: "Title",
                color: "#1A1A1A",
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
            arcs: {
                innerRadiusRatio: 0.8,
                outerRadiusRatio: 0.8,
                padAngle: 5,
                stroke: "#F3F4F6",
                strokeWidth: 1,
                labels: {
                    show: true,
                    fontSize: 14,
                    bold: false,
                    curved: false,
                    adaptColorToBackground: true,
                    color: "#1A1A1A",
                    offset: 0,
                    showPercentage: true,
                    roundingPercentage: 0
                },
            },
            ribbons: {
                stroke: "#F3F4F6",
                strokeWidth: 1,
                underlayerOpacity: 1,
                labels: {
                    show: true,
                    formatter: null,
                    prefix: "",
                    suffix: "",
                    rounding: 0,
                    fontSize: 14,
                    bold: false,
                    useSerieColor: false,
                    color: "#1A1A1A",
                    offset: 0,
                    minSeparationDeg: 3,
                    connector: {
                        stroke: "#1A1A1A",
                        strokeWidth: 1,
                    },
                    marker: {
                        show: true,
                        radius: 3,
                        stroke: "#F3F4F6",
                        strokeWidth: 1,
                    },
                },
            },
        },
    },
});

const darkModeConfig = ref({
    theme: "",
    customPalette: [],
    enableRotation: true,
    initialRotation: 0,
    useCssAnimation: true,
    responsive: false,
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
        },
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            legend: {
                show: true,
                bold: false,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
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
            arcs: {
                innerRadiusRatio: 0.8,
                outerRadiusRatio: 0.8,
                padAngle: 5,
                stroke: "#1A1A1A",
                strokeWidth: 1,
                labels: {
                    show: true,
                    fontSize: 14,
                    bold: false,
                    curved: false,
                    adaptColorToBackground: true,
                    color: "#CCCCCC",
                    offset: 0,
                    showPercentage: true,
                    roundingPercentage: 0
                },
            },
            ribbons: {
                stroke: "#1A1A1A",
                strokeWidth: 1,
                underlayerOpacity: 1,
                labels: {
                    show: true,
                    formatter: null,
                    prefix: "",
                    suffix: "",
                    rounding: 0,
                    fontSize: 14,
                    bold: false,
                    useSerieColor: false,
                    color: "#CCCCCC",
                    offset: 0,
                    minSeparationDeg: 3,
                    connector: {
                        stroke: "#CCCCCC",
                        strokeWidth: 1,
                    },
                    marker: {
                        show: true,
                        radius: 3,
                        stroke: "#1A1A1A",
                        strokeWidth: 1,
                    },
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
    return `type VueUiChordDataset = {
    matrix: number[][]
    labels?: string[]
    colors?: string[]
}`
});

const codeDataset = ref(`const dataset: VueUiChordDataset = {
    matrix: [
        [ 12000, 6000, 9000, 3000],
        [ 2000, 10000, 2000, 6001], 
        [ 8000, 1600, 8000, 8001], 
        [ 1000, 1000, 1000, 7001]  
    ],
    labels: ["Group A", "Group B", "Group C", "Group D"],
    colors: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"]
}`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiChord" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.chord[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-chord"
            targetMaker="VueUiChord"
            :configSource="mainConfig.vue_ui_chord"
        />

        <div :class="`transition-all mx-auto w-2/3`">
            <DocSnapper :isFixed="isFixed" :disabled="!isFixed || isMobile" @fixChart="fixChart"
                @resetDefault="resetDefault" @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)">
                <VueDataUi component="VueUiChord" :dataset="dataset"
                    :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-chord"/>
        </div>

        <Rater itemId="vue_ui_chord" />

        <Box showEmits showSlots showThemes showResponsive showPatterns signInfo="postiveOnly" schema="vue_ui_chord">
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
                    TS type: <code class="text-app-blue">VueUiChordConfig</code>
                </div>
<code ref="configCode">
    <BaseDetails attr="const config: VueUiChordConfig" equal>
        <BaseAttr inactive name="responsive" defaultVal="false" :comment="translations.responsive[store.lang]"/>
        <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
        <BaseAttr inactive name="customPalette" defaultVal="[]" comment="string[]"/>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="initialRotation" attr="initialRotation" defaultVal="0" :min="0" :max="360" type="number" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="style" :level="1">
            <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="arcs" :level="3" title="style.chart.arcs">
                    <BaseAttr name="innerRadiusRatio" attr="style.chart.arcs.innerRadiusRatio" type="number" :min="0" :max="1.5" :step="0.01" defaultVal="1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="outerRadiusRatio" attr="style.chart.arcs.outerRadiusRatio" type="number" :min="0" :max="1.5" :step="0.01" defaultVal="1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="padAngle" attr="style.chart.arcs.padAngle" type="number" :min="0" :max="270" defaultVal="5" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.arcs.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.arcs.strokeWidth" type="number" :min="0" :max="12" defaultVal="1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="labels" :level="4" title="style.chart.arcs.labels">
                        <BaseAttr name="show" attr="style.chart.arcs.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.arcs.labels.fontSize" type="number" :min="8" :max="42" defaultVal="14" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.arcs.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="curved" attr="style.chart.arcs.labels.curved" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="adaptColorToBackground" attr="style.chart.arcs.labels.adaptColorToBackground" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.arcs.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offset" attr="style.chart.arcs.labels.offset" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="showPercentage" attr="style.chart.arcs.labels.showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="roundingPercentage" attr="style.chart.arcs.labels.roundingPercentage" type="number" :min="0" :max="6" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="ribbons" :level="3" title="style.chart.ribbons">
                    <BaseAttr name="stroke" attr="style.chart.ribbons.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.ribbons.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="underlayerOpacity" attr="style.chart.ribbons.underlayerOpacity" type="number" defaultVal="1" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="labels" :level="4" title="style.chart.ribbons.labels">
                        <BaseAttr name="show" attr="style.chart.ribbons.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                        <BaseAttr name="prefix" attr="style.chart.ribbons.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="suffix" attr="style.chart.ribbons.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rounding" attr="style.chart.ribbons.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.ribbons.labels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.ribbons.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useSerieColor" attr="style.chart.ribbons.labels.useSerieColor" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.ribbons.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offset" attr="style.chart.ribbons.labels.offset" type="number" :min="-100" :max="100" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="minSeparationDeg" attr="style.chart.ribbons.labels.minSeparationDeg" type="number" :min="0" :max="90" defaultVal="3" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="connector" :level="5" title="style.chart.ribbons.labels.connector">
                            <BaseAttr name="stroke" attr="style.chart.ribbons.labels.connector.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="strokeWidth" attr="style.chart.ribbons.labels.connector.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="marker" :level="5" title="style.chart.ribbons.labels.connector.marker">
                            <BaseAttr name="show" attr="style.chart.ribbons.labels.connector.marker.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="radius" attr="style.chart.ribbons.labels.connector.marker.radius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="stroke" attr="style.chart.ribbons.labels.connector.marker.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="strokeWidth" attr="style.chart.ribbons.labels.connector.marker.strokeWidth" type="number" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab2>
                <div>
                    <div>Emits:</div>
                    <ul>
                        <li><code>@selectDatapoint</code> : {{ translations.docs.emits.selectDatapoint[store.lang] }}</li>
                        <li><code>@selectGroup</code> : {{ translations.docs.emits.selectGroup[store.lang] }}</li>
                        <li><code>@selectRibbon</code> : {{ translations.docs.emits.selectRibbon[store.lang] }}</li>
                        <li></li>
                    </ul>

                    <ExposedMethods
                    component="VueUiDonut"
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'toggleTable'
                    ]"
                />
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiChord"
                    :types="[
                        'svg',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'pattern'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiChord />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiChord" 
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
                <VueDataUi component="VueUiChord" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern v-if="seriesIndex === 0" :id="patternId" name="scales" stroke="#85e7f2" :strokeWidth="1" :scale="0.7"/>
                        <VueUiPattern v-if="seriesIndex === 1" :id="patternId" name="flooring" stroke="#85e7f2" :strokeWidth="1" :scale="0.7"/>
                        <VueUiPattern v-if="seriesIndex === 2" :id="patternId" name="maze" stroke="#85e7f2" :strokeWidth="1" :scale="0.7"/>
                        <VueUiPattern v-if="seriesIndex === 3" :id="patternId" name="redrum" stroke="#85e7f2" :strokeWidth="1" :scale="0.7"/>
                    </template>
                </VueDataUi>
            </template>
        </Box>
    </div>
</template>
