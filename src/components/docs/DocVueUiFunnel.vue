<script setup>
import { ref, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiFunnel from "../themes/ThemesVueUiFunnel.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

const mainConfig = useConfig();
const store = useMainStore();
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);
const key = ref(0);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

function forceChartUpdate() {
    key.value += 1;
}

const dataset = ref([
    {
        name: "Lead",
        value: 8249,
    },
    {
        name: "Opportunity",
        value: 6322,
    },
    {
        name: "Qualified",
        value: 4562,
    },
    {
        name: "Sold",
        value: 3021,
    },
    {
        name: "Retained",
        value: 1412,
    },
]);

const config = ref({
    theme: "",
    responsive: false,
    responsiveProportionalSizing: true,
    useCssAnimation: true,
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0,
        },
        columnNames: {
            series: "Step",
            value: "Value",
            percentage: "Percentage",
        },
    },
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
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            width: 600,
            height: 500,
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
            padding: {
                top: 12,
                right: 128,
                bottom: 24,
                left: 24,
            },
            barCircleSpacingRatio: 0.05,
            circles: {
                stroke: "#FFFFFF",
                strokeWidth: 1,
                dataLabels: {
                    formatter: null,
                    fontSize: 16,
                    offsetY: 0,
                    adaptColorToBackground: true,
                    color: "#2D353C",
                    rounding: 1,
                    bold: true,
                },
            },
            circleLinks: {
                show: true,
                color: "#e1e5e8",
                widthRatio: 1,
            },
            area: {
                show: true,
                color: "#e1e5e8",
            },
            bars: {
                stroke: "#FFFFFF",
                defaultColor: "#1f77b4",
                strokeWidth: 1,
                gapRatio: 0.2,
                borderRadius: 3,
                dataLabels: {
                    name: {
                        fontSize: 16,
                        color: "#2D353C",
                        bold: true,
                        offsetX: 0,
                        offsetY: 0,
                    },
                    value: {
                        formatter: null,
                        fontSize: 16,
                        rounding: 0,
                        bold: false,
                        color: "#2D353C",
                        prefix: "",
                        suffix: "",
                        offsetX: 0,
                        offsetY: 0,
                    },
                },
            },
        },
    },
});
const darkModeConfig = ref({
    theme: "",
    responsive: false,
    responsiveProportionalSizing: true,
    useCssAnimation: true,
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
            roundingValue: 0,
            roundingPercentage: 0,
        },
        columnNames: {
            series: "Step",
            value: "Value",
            percentage: "Percentage",
        },
    },
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
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            width: 600,
            height: 500,
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
            padding: {
                top: 12,
                right: 128,
                bottom: 24,
                left: 24,
            },
            barCircleSpacingRatio: 0.05,
            circles: {
                stroke: "#1A1A1A",
                strokeWidth: 1,
                dataLabels: {
                    formatter: null,
                    fontSize: 16,
                    offsetY: 0,
                    adaptColorToBackground: true,
                    color: "#2D353C",
                    rounding: 1,
                    bold: true,
                },
            },
            circleLinks: {
                show: true,
                color: "#2A2A2A",
                widthRatio: 1,
            },
            area: {
                show: true,
                color: "#2A2A2A",
            },
            bars: {
                stroke: "#1A1A1A",
                defaultColor: "#1f77b4",
                strokeWidth: 1,
                gapRatio: 0.2,
                borderRadius: 3,
                dataLabels: {
                    name: {
                        fontSize: 16,
                        color: "#CCCCCC",
                        bold: true,
                        offsetX: 0,
                        offsetY: 0,
                    },
                    value: {
                        formatter: null,
                        fontSize: 16,
                        rounding: 0,
                        bold: false,
                        color: "#6A6A6A",
                        prefix: "",
                        suffix: "",
                        offsetX: 0,
                        offsetY: 0,
                    },
                },
            },
        },
    },
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
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

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
    return `type VueUiFunnelDatasetItem = {
    name: string
    value: number
}`
})

const codeDataset = ref(`const dataset: VueUiFunnelDatasetItem[] = [
    {
        name: "Lead",
        value: 8249,
    },
    {
        name: "Opportunity",
        value: 6322,
    },
    {
        name: "Qualified",
        value: 4562,
    },
    {
        name: "Sold",
        value: 3021,
    },
    {
        name: "Retained",
        value: 1412,
    },
]`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiFunnel" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.funnel[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-funnel"
            targetMaker="VueUiFunnel"
            :configSource="mainConfig.vue_ui_funnel"
        />

        <div
            :class="`transition-all mx-auto w-2/4`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <VueDataUi component="VueUiFunnel" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-funnel"/>
        </div>

        <Rater itemId="vue_ui_funnel" />

        <Box showEmits showSlots showThemes showResponsive schema="vue_ui_funnel" signInfo="positiveOnly">
            <template #tab0>
                <div class="w-full overflow-x-auto border-b my-6 border-gray-700">

        <CodeParser
            language="typescript"
            @copy="store.copy()"
            :title="translations.docs.datastructure[store.lang]"
            :content="dsTypeCode"
            class="my-6"
        /> 

                </div>
    <CodeParser
        language="typescript"
        @copy="store.copy()"
        :content="codeDataset"
        :title="translations.docs.example[store.lang]"
    />  
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
                    TS type: <code class="text-app-blue">VueUiFunnelConfig</code>
                </div>
<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiFunnelConfig" equal>
        <BaseAttr inactive name="responsive" defaultVal="false" :comment="translations.responsive[store.lang]"/>
        <BaseAttr inactive name="responsiveProportionalSizing" defaultVal="true" :comment="translations.responsiveProportionalSizing[store.lang]"/>
        <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseAttr name="width" attr="style.chart.width" type="range" defaultVal="600" :min="300" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="height" attr="style.chart.height" type="range" defaultVal="500" :min="300" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="barCircleSpacingRatio" attr="style.chart.barCircleSpacingRatio" type="range" defaultVal="0.05" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" />
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
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="12" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="128" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="24" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="24" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
                <BaseDetails attr="circles" :level="3" title="style.chart.circles">
                    <BaseAttr name="stroke" attr="style.chart.circles.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.circles.strokeWidth" type="range" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="dataLabels" :level="4" title="style.chart.circles.dataLabels">
                        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                        <BaseAttr name="fontSize" attr="style.chart.circles.dataLabels.fontSize" defaultVal="16" :min="8" :max="42" type="number" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="offsetY" attr="style.chart.circles.dataLabels.offsetY" defaultVal="0" type="number" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="adaptColorToBackground" attr="style.chart.circles.dataLabels.adaptColorToBackground" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="color" attr="style.chart.circles.dataLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="rounding" attr="style.chart.circles.dataLabels.rounding" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.circles.dataLabels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="circleLinks" :level="3" title="style.chart.circleLinks">
                    <BaseAttr name="show" attr="style.chart.circleLinks.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.circleLinks.color" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="widthRatio" attr="style.chart.circleLinks.widthRatio" type="range" :min="0.1" :max="3" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="area" :level="3" title="style.chart.area">
                    <BaseAttr name="show" attr="style.chart.area.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.area.color" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="bars" :level="3" title="style.chart.bars">
                    <BaseAttr name="stroke" attr="style.chart.bars.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="defaultColor" attr="style.chart.bars.defaultColor" type="color" defaultVal="#1f77b4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.bars.strokeWidth" type="range" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="gapRatio" attr="style.chart.bars.gapRatio" type="range" :min="0" :max="0.8" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderRadius" attr="style.chart.bars.borderRadius" type="range" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="dataLabels" :level="4" title="style.chart.bars.dataLabels">
                        <BaseDetails attr="name" :level="5" title="style.chart.bars.dataLabels.name">
                            <BaseAttr name="fontSize" attr="style.chart.bars.dataLabels.name.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.bars.dataLabels.name.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.bars.dataLabels.name.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetX" attr="style.chart.bars.dataLabels.name.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.bars.dataLabels.name.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="value" :level="5" title="style.chart.bars.dataLabels.value">
                            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                            <BaseAttr name="fontSize" attr="style.chart.bars.dataLabels.value.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="rounding" attr="style.chart.bars.dataLabels.value.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.bars.dataLabels.value.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.bars.dataLabels.value.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="prefix" attr="style.chart.bars.dataLabels.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="suffix" attr="style.chart.bars.dataLabels.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetX" attr="style.chart.bars.dataLabels.value.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.bars.dataLabels.value.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Step" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="percentage" attr="table.columnNames.percentage" type="text" defaultVal="Percentage" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="roundingPercentage" attr="table.td.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="2" title="userOptions">
                <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="buttons" :level="3" title="userOptions.buttons">
                    <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                </BaseDetails>
                <BaseDetails attr="buttonTitles" :level="3" title="userOptions.buttonTitles">
                    <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="print" :level="2" title="userOptions.print">
                    <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
                </BaseDetails>
            </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <!--EMITS-->
            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const funnelChart = ref(null);
            const funnelDataset = ref({});

            onMounted(async () => {
                funnelDataset.value = await funnelChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref(
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            );

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFunnel
                ref="funnelChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFunnel
                ref="funnelChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        funnelDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [] <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        
                    }
                },
                async mounted () {
                    this.funnelDataset = await this.$refs.funnelChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <ExposedMethods
                    component="VueUiFunnel"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateImage'
                    ]"
                />
                </div>
            </template>

            <!--SLOTS-->
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiFunnel"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <!--THEMES-->
            <template #tab6>
                <ThemesVueUiFunnel/>
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiFunnel" 
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
