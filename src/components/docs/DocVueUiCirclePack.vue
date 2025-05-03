<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiCirclePack from "../themes/ThemesVueUiCirclePack.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

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

const dataset = ref(makeDs({ qty: 24, maxVal: 1000 }));

const config = ref({
    theme: "",
    customPalette: [],
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
            allowTaint: true,
            backgroundColor: '#FFFFFF',
            useCORS: true,
            onclone: null,
            scale: 2,
            logging: false
        },
    },
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
        },
        columnNames: {
            datapoint: "Datapoint",
            value: "Value",
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
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
            circles: {
                stroke: "#FFFFFF",
                strokeWidth: 1,
                gradient: {
                    show: true,
                    intensity: 40,
                },
                labels: {
                    name: {
                        fontSizeRatio: 0.8,
                        show: true,
                        bold: false,
                        offsetY: 0,
                        color: "auto",
                    },
                    value: {
                        fontSizeRatio: 1,
                        show: true,
                        color: "auto",
                        rounding: 0,
                        prefix: "",
                        suffix: "",
                        formatter: null,
                        bold: false,
                        offsetY: 0,
                    },
                },
                zoom: {
                    show: true,
                    shadowForce: 1,
                    opacity: 0.8,
                    animationFrameMs: 200,
                    zoomRatio: 1,
                    label: {
                        name: {
                            fontSize: 14,
                            bold: false,
                            offsetY: 0,
                            color: "auto",
                        },
                        value: {
                            fontSize: 14,
                            bold: false,
                            offsetY: 0,
                            rounding: 0,
                            prefix: "",
                            suffix: "",
                            formatter: null,
                            color: "auto",
                        },
                    },
                },
            },
        },
    },
});

const darkModeConfig = ref({
    theme: "",
    customPalette: [],
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
            allowTaint: true,
            backgroundColor: '#FFFFFF',
            useCORS: true,
            onclone: null,
            scale: 2,
            logging: false
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
        columnNames: {
            datapoint: "Datapoint",
            value: "Value",
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            title: {
                text: "Title",
                color: "#CCCCCC",
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
            circles: {
                stroke: "#3A3A3A",
                strokeWidth: 1,
                gradient: {
                    show: true,
                    intensity: 40,
                },
                labels: {
                    name: {
                        fontSizeRatio: 0.8,
                        show: true,
                        bold: false,
                        offsetY: 0,
                        color: "auto",
                    },
                    value: {
                        fontSizeRatio: 1,
                        show: true,
                        color: "auto",
                        rounding: 0,
                        prefix: "",
                        suffix: "",
                        formatter: null,
                        bold: false,
                        offsetY: 0,
                    },
                },
                zoom: {
                    show: true,
                    shadowForce: 1,
                    opacity: 0.8,
                    animationFrameMs: 200,
                    zoomRatio: 1,
                    label: {
                        name: {
                            fontSize: 14,
                            bold: false,
                            offsetY: 0,
                            color: "auto",
                        },
                        value: {
                            fontSize: 14,
                            bold: false,
                            offsetY: 0,
                            rounding: 0,
                            prefix: "",
                            suffix: "",
                            formatter: null,
                            color: "auto",
                        },
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
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(
        JSON.stringify(darkModeConfig.value)
    );
}

function makeDs({ qty, maxVal }) {
    let datapoints = [];
    for (let i = 0; i < qty; i += 1) {
        datapoints.push({
            name: `Datapoint ${i}`,
            value: Math.random() * maxVal,
            // color: '#FFFFFF',
            // breakdown: [
            //     { name: 'br 1', value: Math.random() * 10 },
            //     { name: 'br 2', value: Math.random() * 20 },
            //     { name: 'br 3', value: Math.random() * 30 },
            // ]
        });
    }
    return datapoints;
}

function randomizeData() {
    mutableDataset.value = makeDs({ qty: 24, maxVal: 200 });
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

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
    return `
    type VueUiCirclePackDatasetItem = {
        name: string
        value: number
        color?: string
    }
    `
})

</script>

<template>
    <BaseDocTitle name="VueUiCirclePack" />

    <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
        {{ translations.docs.tooltips.circlePack[store.lang] }}
    </p>
    
    <BaseDocHeaderActions
        targetLink="vue-ui-circle-pack"
        targetMaker="VueUiCirclePack"
        :configSource="mainConfig.vue_ui_circle_pack"
    />

    <div :class="`transition-all mx-auto w-2/3 pb-12`">
        <BaseRandomButton @click="randomizeData" />
        <DocSnapper :isFixed="isFixed" :disabled="!isFixed || isMobile" @fixChart="fixChart"
            @resetDefault="resetDefault" @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)">
            <div class="w-full min-h-[500px]">
                <VueDataUi component="VueUiCirclePack" :dataset="mutableDataset"
                    :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                    <template #plot-comment="{ plot }">
                        <div :style="`text-align:${plot.textAlign};font-size: 10px; padding: 6px;`">
                            {{ plot.comment }}
                        </div>
                    </template>
                </VueDataUi>
            </div>
        </DocSnapper>
    </div>

    <Rater itemId="vue_ui_circle_pack" />

    <Box showEmits showSlots showThemes showPatterns schema="vue_ui_circle_pack" signInfo="positiveOnly">
        <template #tab0>
            {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiCirclePackDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
        <CodeParser
            language="typescript"
            @copy="store.copy()"
            :content="dsTypeCode"
            class="my-6"
        />              
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiCirclePackDatasetItem[]</span> = [
    {
        name: "Datapoint A",
        value: 200
    },
    {
        name: "Datapoint B",
        value: 150
    },
    {
        name: "Datapoint C",
        value: 100
    },
]
</code>
</pre>        
                </div>
        </template>

        <template #tab1>
            <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiCirclePackConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>
<code ref="configCode">
    <BaseDetails attr="const config: VueUiCirclePackConfig" equal>
        <span>theme: "", ("celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")<br></span>
        <span>customPalette: [], <span class="text-xs text-app-blue">// string[]</span></span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="circles" :level="3" title="style.chart.circles">
                    <BaseAttr name="stroke" attr="style.chart.circles.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.circles.strokeWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="gradient" :level="4" title="style.chart.circles.gradient">
                        <BaseAttr name="show" attr="style.chart.circles.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="intensity" attr="style.chart.circles.gradient.intensity" type="range" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.circles.labels">
                        <BaseDetails attr="name" :level="5" title="style.chart.circles.labels.name">
                            <BaseAttr name="show" attr="style.chart.circles.labels.name.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSizeRatio" attr="style.chart.circles.labels.name.fontSizeRatio" type="number" defaultVal="1" :min="0" :max="2" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.circles.labels.name.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.circles.labels.name.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.circles.labels.name.color" type="color" defaultVal="auto" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="value" :level="5" title="style.chart.circles.labels.value">
                            <BaseAttr name="show" attr="style.chart.circles.labels.value.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="fontSizeRatio" attr="style.chart.circles.labels.value.fontSizeRatio" type="number" defaultVal="1" :min="0" :max="2" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.circles.labels.value.color" type="color" defaultVal="auto" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="rounding" attr="style.chart.circles.labels.value.rounding" type="number" defaultVal="0"  :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="prefix" attr="style.chart.circles.labels.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="suffix" attr="style.chart.circles.labels.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="bold" attr="style.chart.circles.labels.value.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="offsetY" attr="style.chart.circles.labels.value.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="zoom" :level="4" title="style.chart.circles.zoom">
                        <BaseAttr name="show" attr="style.chart.circles.zoom.show" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="shadowForce" attr="style.chart.circles.zoom.shadowForce" type="range" defaultVal="1" in="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="opacity" attr="style.chart.circles.zoom.opacity" type="range" defaultVal="0.8" :min="0.5" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="animationFrameMs" attr="style.chart.circles.zoom.animationFrameMs" type="range" defaultVal="200" :min="0" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="zoomRatio" attr="style.chart.circles.zoom.zoomRatio" type="range" defaultVal="1" :min="0" :max="1.5" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="label" :level="5" title="style.chart.circles.zoom.label">
                            <BaseDetails attr="name" :level="6" title="style.chart.circles.zoom.label.name">
                                <BaseAttr name="fontSize" attr="style.chart.circles.zoom.label.name.fontSize" type="number" defaultVal="14" :min="6" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.circles.zoom.label.name.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.circles.zoom.label.name.color" type="color" defaultVal="auto" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.chart.circles.zoom.label.name.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="value" :level="6" title="style.chart.circles.zoom.label.value">
                                <BaseAttr name="fontSize" attr="style.chart.circles.zoom.label.value.fontSize" type="number" defaultVal="14" :min="6" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.circles.zoom.label.value.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.circles.zoom.label.value.color" type="color" defaultVal="auto" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.chart.circles.zoom.label.value.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="rounding" attr="style.chart.circles.zoom.label.value.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="prefix" attr="style.chart.circles.zoom.label.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="suffix" attr="style.chart.circles.zoom.label.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                            </BaseDetails>
                        </BaseDetails>
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
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="datapoint" attr="table.columnNames.datapoint" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="allowTaint" attr="userOptions.print.allowTaint" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="backgroundColor" attr="userOptions.print.backgroundColor" type="string" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Apply a background on pdf and img when chart background is transparent"/>
                <BaseAttr name="useCORS" attr="userOptions.print.useCORS" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <span>onclone: null,</span><BaseComment>Modify the document before the print occurs (see html2canvas docs)</BaseComment>
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
                <BaseAttr name="logging" attr="userOptions.print.logging" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
        </template>

        <template #tab2>
            @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br>
<pre><code>
&lt;template&gt;
    &lt;VueUiCirclePack
        :dataset="dataset"
        :config="config"
        @selectDatapoint="selectDatapoint"
    /&gt;
&lt;/template&gt;

&lt;script setup&gt;
    function selectDatapoint(datapoint) {
        console.log(datapoint)
    }
&lt;/script&gt;
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

            const circlePackChart = ref(null);
            const circlePackDataset = ref([]);

            onMounted(() => {
                circlePackDataset.value = circlePackChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiCirclePack
                ref="circlePackChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiCirclePack
                ref="circlePackChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        circlePackDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.circlePackDataset = this.$refs.circlePackChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
        <ExposedMethods
            component="VueUiCirclePack"
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
                componentName="VueUiCirclePack"
                :types="[
                    'svg',
                    'watermark',
                    'source',
                    'chart-background',
                    'pattern',
                    'zoom-label',
                    'data-label-circlePack'
                ]" 
            />
        </template>

        <template #tab6>
            <ThemesVueUiCirclePack :dataset="dataset"/>
        </template>

        <template #tab8>
            <VueDataUi component="VueUiCirclePack" :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                <template #pattern="{ seriesIndex, patternId }">
                    <VueUiPattern :id="patternId" name="maze" stroke="#FFFFFF20" :strokeWidth="3" :scale="0.4"/>
                </template>
            </VueDataUi>
        </template>
    </Box>
</template>
