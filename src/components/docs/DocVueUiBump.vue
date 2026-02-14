<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseAttr from "../BaseAttr.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiBump from "../themes/ThemesVueUiBump.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";

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

const dataset = ref([
    {
        name: "JavaScript",
        values: [1.2, 1.35, 1.55, 1.75, 2.1, 2.45, 2.75, 3.05, 3.3, 3.5],
    },
    {
        name: "Python",
        values: [0.65, 0.74, 0.86, 1.02, 1.25, 1.5, 1.75, 2.05, 2.35, 2.6],
    },
    {
        name: "Java",
        values: [0.9, 0.92, 0.94, 0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08],
    },
    {
        name: "TypeScript",
        values: [0.06, 0.09, 0.14, 0.23, 0.38, 0.56, 0.76, 0.98, 1.2, 1.45],
    },
    {
        name: "C#",
        values: [0.52, 0.545, 0.57, 0.6, 0.64, 0.69, 0.74, 0.8, 0.86, 0.92],
    },
    {
        name: "C++",
        values: [0.48, 0.49, 0.5, 0.51, 0.525, 0.54, 0.56, 0.585, 0.61, 0.635],
    },
    {
        name: "Go",
        values: [0.045, 0.07, 0.11, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86],
    },
    {
        name: "Rust",
        values: [0.005, 0.009, 0.018, 0.035, 0.07, 0.12, 0.19, 0.28, 0.38, 0.5],
    },
    {
        name: "PHP",
        values: [0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61],
    },
    {
        name: "Ruby",
        values: [0.23, 0.225, 0.22, 0.215, 0.21, 0.205, 0.2, 0.195, 0.19, 0.185],
    },
]);

const config = ref({
    loading: false,
    debug: false,
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: false,
    events: {
        datapointEnter: null,
        datapointLeave: null,
        datapointClick: null,
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
            svg: true,
            zoom: false,
        },
        callbacks: {
            animation: null,
            annotator: null,
            csv: null,
            fullscreen: null,
            img: null,
            labels: null,
            pdf: null,
            sort: null,
            stack: null,
            table: null,
            tooltip: null,
            svg: null,
            zoom: null,
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
            svg: "Download SVG",
        },
        print: {
            scale: 2,
            orientation: "auto",
            overflowTolerance: 0.2,
        },
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        useDialog: false,
        columnNames: {
            series: "Series",
            period: "Period",
            values: "Values",
            ranking: "Ranking",
        },
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
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            height: 500,
            width: 800,
            layout: {
                timeLabels: {
                    show: true,
                    values: [
                        2016,
                        2017,
                        2018,
                        2019,
                        2020,
                        2021,
                        2022,
                        2023,
                        2024,
                        2025,
                    ],
                    datetimeFormatter: {
                        enable: false,
                        locale: "en",
                        useUTC: false,
                        januaryAsYear: false,
                        options: {
                            year: "yyyy",
                            month: "MMM 'yy",
                            day: "dd MMM",
                            hour: "HH:mm",
                            minute: "HH:mm:ss",
                            second: "HH:mm:ss",
                        },
                    },
                    offsetY: 12,
                    rotation: 0,
                    autoRotate: {
                        enable: true,
                        angle: -30,
                    },
                    fontSize: 14,
                    color: "#1A1A1A",
                    bold: false,
                    showOnlyFirstAndLast: false,
                    showOnlyAtModulo: false,
                    modulo: 12,
                },
                lines: {
                    smooth: true,
                    strokeWidth: 4,
                    coatingColor: "#FFFFFF",
                },
                plots: {
                    stroke: "#FFFFFF",
                    strokeWidth: 1,
                    radius: 12,
                    labels: {
                        color: "auto",
                        show: true,
                        bold: true,
                        displayedValue: "value",
                        fontSize: 12,
                        prefix: "",
                        suffix: "",
                        rounding: 2,
                        formatter: null,
                    },
                },
                nameLabels: {
                    fontSize: 16,
                    color: "#1A1A1A",
                    useSerieColor: false,
                    bold: false,
                    offsetX: 0,
                    leftLabels: {
                        show: true,
                    },
                    rightLabels: {
                        show: true,
                    },
                },
            },
            padding: {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12,
            },
            title: {
                text: "Programming language repository usage",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                textAlign: "center",
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Last 10 years, in Millions",
                    fontSize: 16,
                    bold: false,
                },
            },
        },
    },
});

const darkModeConfig = ref({
    loading: false,
    debug: false,
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: false,
    events: {
        datapointEnter: null,
        datapointLeave: null,
        datapointClick: null,
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
            svg: true,
            zoom: false,
        },
        callbacks: {
            animation: null,
            annotator: null,
            csv: null,
            fullscreen: null,
            img: null,
            labels: null,
            pdf: null,
            sort: null,
            stack: null,
            table: null,
            tooltip: null,
            svg: null,
            zoom: null,
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
            svg: "Download SVG",
        },
        print: {
            scale: 2,
            orientation: "auto",
            overflowTolerance: 0.2,
        },
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        useDialog: false,
        columnNames: {
            series: "Series",
            period: "Period",
            values: "Values",
            ranking: "Ranking",
        },
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
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            height: 500,
            width: 800,
            layout: {
                timeLabels: {
                    show: true,
                    values: [
                        2016,
                        2017,
                        2018,
                        2019,
                        2020,
                        2021,
                        2022,
                        2023,
                        2024,
                        2025,
                    ],
                    datetimeFormatter: {
                        enable: false,
                        locale: "en",
                        useUTC: false,
                        januaryAsYear: false,
                        options: {
                            year: "yyyy",
                            month: "MMM 'yy",
                            day: "dd MMM",
                            hour: "HH:mm",
                            minute: "HH:mm:ss",
                            second: "HH:mm:ss",
                        },
                    },
                    offsetY: 12,
                    rotation: 0,
                    autoRotate: {
                        enable: true,
                        angle: -30,
                    },
                    fontSize: 14,
                    color: "#CCCCCC",
                    bold: false,
                    showOnlyFirstAndLast: false,
                    showOnlyAtModulo: false,
                    modulo: 12,
                },
                lines: {
                    smooth: true,
                    strokeWidth: 4,
                    coatingColor: "#3A3A3A",
                },
                plots: {
                    stroke: "#3A3A3A",
                    strokeWidth: 1,
                    radius: 12,
                    labels: {
                        color: "auto",
                        show: true,
                        bold: true,
                        displayedValue: "value",
                        fontSize: 12,
                        prefix: "",
                        suffix: "",
                        rounding: 2,
                        formatter: null,
                    },
                },
                nameLabels: {
                    fontSize: 16,
                    color: "#CCCCCC",
                    useSerieColor: isDarkMode.value,
                    bold: true,
                    offsetX: 0,
                    leftLabels: {
                        show: true,
                    },
                    rightLabels: {
                        show: true,
                    },
                },
            },
            padding: {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12,
            },
            title: {
                text: "Programming language repository usage",
                color: "#CCCCCC",
                fontSize: 20,
                bold: true,
                textAlign: "center",
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Last 10 years, in Millions",
                    fontSize: 16,
                    bold: false,
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

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const dsTypeCode = computed(() => {
    return `type VueUiBumpDatasetItem = {
    name: string;
    values: Array<number | null>;
    color?: string;
}`
});

const codeDataset = ref(`const dataset: VueUiBumpDatasetItem[] = [
        {
        name: "JavaScript",
        values: [1.2, 1.35, 1.55, 1.75, 2.1, 2.45, 2.75, 3.05, 3.3, 3.5],
    },
    {
        name: "Python",
        values: [0.65, 0.74, 0.86, 1.02, 1.25, 1.5, 1.75, 2.05, 2.35, 2.6],
    },
    {
        name: "Java",
        values: [0.9, 0.92, 0.94, 0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08],
    },
    {
        name: "TypeScript",
        values: [0.06, 0.09, 0.14, 0.23, 0.38, 0.56, 0.76, 0.98, 1.2, 1.45],
    },
    {
        name: "C#",
        values: [0.52, 0.545, 0.57, 0.6, 0.64, 0.69, 0.74, 0.8, 0.86, 0.92],
    },
    {
        name: "C++",
        values: [0.48, 0.49, 0.5, 0.51, 0.525, 0.54, 0.56, 0.585, 0.61, 0.635],
    },
    {
        name: "Go",
        values: [0.045, 0.07, 0.11, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86],
    },
    {
        name: "Rust",
        values: [0.005, 0.009, 0.018, 0.035, 0.07, 0.12, 0.19, 0.28, 0.38, 0.5],
    },
    {
        name: "PHP",
        values: [0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61],
    },
    {
        name: "Ruby",
        values: [0.23, 0.225, 0.22, 0.215, 0.21, 0.205, 0.2, 0.195, 0.19, 0.185],
    },
]`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiBump" />

        <BaseDocDescription :text="translations.docs.tooltips.bump[store.lang]" />

        <BaseDocHeaderActions 
            targetLink="vue-ui-bump"
            targetMaker="VueUiBump"
            :configSource="mainConfig.vue_ui_bump" 
        />

        <div :class="`mx-auto max-w-[600px]`">
            <DocSnapper :isFixed="isFixed" :disabled="!isFixed || isMobile" @fixChart="fixChart"
                @resetDefault="resetDefault" @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)">
                <BaseCard>
                    <VueUiBump :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
                        :key="key" />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-bump"/>
        </div>

        <Rater itemId="vue_ui_bump" />

        <Box ref="box" :show-datetime-formatter="true" showCallbacks showSlots showEmits showThemes showResponsive schema="vue_ui_bump" signInfo="both">
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
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiBumpConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>
<code ref="configCode">
    <BaseDetails attr="const config: VueUiBumpConfig" equal>
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: "", <BaseComment>"dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseDetails attr="events" :level="1">
            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="height" attr="style.chart.height" type="number" defaultVal="500" :min="300" :max="1000" :step="20" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="width" attr="style.chart.width" type="number" defaultVal="800" :min="300" :max="1500" :step="20" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="12" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="12" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="12" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="12" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="show" attr="style.chart.title.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseDetails attr="subtitle" :level="3" title="style.chart.title.subtitle">
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="lines" :level="4" title="style.chart.layout.lines">
                        <BaseAttr name="smooth" attr="style.chart.layout.lines.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.lines.strokeWidth" type="number" defaultVal="4" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="coatingColor" attr="style.chart.layout.lines.coatingColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                    <BaseDetails attr="plots" :level="4" title="style.chart.layout.plots">
                        <BaseAttr name="stroke" attr="style.chart.layout.plots.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.plots.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="radius" attr="style.chart.layout.plots.radius" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseDetails attr="labels" :level="5" title="style.chart.layout.plots.labels">
                            <BaseAttr name="color" attr="style.chart.layout.plots.labels.color" type="text" defaultVal="'auto'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="show" attr="style.chart.layout.plots.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.layout.plots.labels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="displayedValue" attr="style.chart.layout.plots.labels.displayedValue" type="select" defaultVal="value" :options="['rank', 'value']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSize" attr="style.chart.layout.plots.labels.fontSize" type="number" defaultVal="12" :min="8" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="prefix" attr="style.chart.layout.plots.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="suffix" attr="style.chart.layout.plots.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="rounding" attr="style.chart.layout.plots.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                    <BaseDetails attr="nameLabels" :level="4" title="style.chart.layout.nameLabels">
                        <BaseAttr name="fontSize" attr="style.chart.layout.nameLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.layout.nameLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useSerieColor" attr="style.chart.layout.nameLabels.useSerieColor" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.layout.nameLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetX" attr="style.chart.layout.nameLabels.offsetX" type="number" defaultVal="0" :min="-24" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="leftLabels" :level="5" title="style.chart.layout.nameLabels.leftLabels">
                            <BaseAttr name="show" attr="style.chart.layout.nameLabels.leftLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="rightLabels" :level="5" title="style.chart.layout.nameLabels.rightLabels">
                            <BaseAttr name="show" attr="style.chart.layout.nameLabels.rightLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="timeLabels" :level="4" title="style.chart.layout.timeLabels">
                        <BaseAttr name="fontSize" attr="style.chart.layout.timeLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.layout.timeLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.layout.timeLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.layout.timeLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rotation" attr="style.chart.layout.timeLabels.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="autoRotate" title="style.chart.layout.timeLabels.autoRotate">
                            <BaseAttr name="enable" type="checkbox" defaultVal="true" attr="style.chart.layout.timeLabels.autoRotate.enable" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="angle" type="number" :min="-90" :max="90" attr="style.chart.layout.timeLabels.autoRotate.angle" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="datetimeFormatter" :level="6" title="style.chart.layout.timeLabels.datetimeFormatter">
                            <BaseAttr name="enable" attr="style.chart.layout.timeLabels.datetimeFormatter.enable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="locale" attr="style.chart.layout.timeLabels.datetimeFormatter.locale" type="select" defaultVal="en" :options="store.locales" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="useUTC" attr="style.chart.layout.timeLabels.datetimeFormatter.useUTC" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="januaryAsYear" attr="style.chart.layout.timeLabels.datetimeFormatter.januaryAsYear" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="options" :level="7" title="style.chart.layout.timeLabels.datetimeFormatter.options">
                                <BaseAttr name="year" attr="style.chart.layout.timeLabels.datetimeFormatter.options.year" type="text" defaultVal="yyyy" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="month" attr="style.chart.layout.timeLabels.datetimeFormatter.options.month" type="text" :defaultVal="`MMM 'yy`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="day" attr="style.chart.layout.timeLabels.datetimeFormatter.options.day" type="text" :defaultVal="`dd MMM`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="minute" attr="style.chart.layout.timeLabels.datetimeFormatter.options.minute" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="second" attr="style.chart.layout.timeLabels.datetimeFormatter.options.second" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="period" attr="table.columnNames.period" type="text" defaultVal="Period" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="values" attr="table.columnNames.values" type="text" defaultVal="Values" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="ranking" attr="table.columnNames.ranking" type="text" defaultVal="Ranking" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useCursorPointer" attr="userOptions.useCursorPointer" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
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

            <template #tab2>
                <ExposedMethods
                    component="VueUiBump"
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                    ]"
                    get-image
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiBump"
                    :types="[
                        'svg',
                        'time-label',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiBump/>
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiBump" 
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

            <template #tab10>
                <DatetimeFormatterDoc
                    path="style.chart.layout.timeLabels.datetimeFormatter"
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
