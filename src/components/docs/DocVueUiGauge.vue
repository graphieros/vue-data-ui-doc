<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiGauge from "../themes/ThemesVueUiGauge.vue";
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

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);

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

const value1 = ref(4);
const value2 = ref(-42);

const dataset1 = computed(() => {
    return {
    base: 12250,
    value: value1.value,
    series: [
        {
            from: 1,
            to: 3,
            color: lang.value === 'zh' ? '#42D392' : "#ff6400",
            name: 'BAD'
        },
        {
            from: 3,
            to: 4,
            color: "#5f8bee",
            name: 'ACCEPTABLE'
        },
        {
            from: 4,
            to: 5,
            color: lang.value === 'zh' ? '#FF6400' :  "#42d392",
            name: 'VERY GOOD'
        },
    ]
}
})

const dataset2 = computed(() => {
    return {
    base: 21200,
    value: value2.value,
    series: [
        {
            from: -100,
            to: 0,
            color: lang.value === 'zh' ? '#42D392' : "#ff6400",
            name: 'CRITICAL'
        },
        {
            from: 0,
            to: 100,
            color: lang.value === 'zh' ? '#FF6400' :  "#42d392",
            name: 'NOMINAL'
        },
    ]
}
})

const config = ref({
    responsive: false,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            animation: {
                use: true,
                speed: 1,
                acceleration: 1,
            },
            layout: {
                radiusRatio: 1,
                track: {
                    size: 1,
                    useGradient: true,
                    gradientIntensity: 20,
                },
                markers: {
                    show: true,
                    prefix: '',
                    suffix: '',
                    color: "#1A1A1A",
                    bold: true,
                    fontSizeRatio: 1,
                    offsetY: 0,
                    roundingValue: 0,
                },
                segmentSeparators: {
                    show: false,
                    offsetOut: 0,
                    offsetIn: 0,
                    stroke: "#1A1A1A",
                    strokeWidth: 2
                },  
                segmentNames: {
                    show: true,
                    curved: true,
                    offsetRatio: 1.1,
                    fontSize: 16,
                    useSerieColor: true,
                    color: '#1A1A1A',
                    bold: false,
                },
                indicatorArc: {
                    show: true,
                    radius: 123,
                    fill: '#E1E5E8',
                },
                pointer: {
                    show: true,
                    type: "pointy",
                    size: 1,
                    stroke: "#1A1A1A",
                    strokeWidth: 12,
                    useRatingColor: true,
                    color: "#1A1A1A",
                    circle: {
                        radius: 10,
                        stroke: "#1A1A1A",
                        strokeWidth: 2,
                        color: "#F3F4F6"
                    }
                }
            },
            legend: {
                show: true,
                fontSize: 48,
                prefix: "",
                suffix: "",
                roundingValue: 1,
                showPlusSymbol: true,
                useRatingColor: true,
                color: "#1A1A1A"
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
        }
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        }
    },
    translations: {
        base: "Base"
    }
});
const darkModeConfig = ref({
    responsive: false,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            animation: {
                use: true,
                speed: 1,
                acceleration: 1,
            },
            layout: {
                radiusRatio: 1,
                track: {
                    size: 1,
                    useGradient: true,
                    gradientIntensity: 20,
                },
                markers: {
                    show: true,
                    prefix: '',
                    suffix: '',
                    color: "#CCCCCC",
                    bold: true,
                    fontSizeRatio: 1,
                    offsetY: 0,
                    roundingValue: 0,
                },
                segmentSeparators: {
                    show: false,
                    offsetOut: 0,
                    offsetIn: 0,
                    stroke: "#4A4A4A",
                    strokeWidth: 2
                }, 
                segmentNames: {
                    show: true,
                    curved: true,
                    offsetRatio: 1.1,
                    fontSize: 16,
                    useSerieColor: true,
                    color: '#CCCCCC',
                    bold: false,
                },
                indicatorArc: {
                    show: true,
                    radius: 123,
                    fill: '#3A3A3A',
                },
                pointer: {
                    show: true,
                    type: "pointy",
                    size: 1,
                    stroke: "#CCCCCC",
                    strokeWidth: 12,
                    useRatingColor: true,
                    color: "#1A1A1A",
                    circle: {
                        radius: 10,
                        stroke: "#CCCCCC",
                        strokeWidth: 2,
                        color: "#1A1A1A"
                    }
                }
            },
            legend: {
                show: true,
                fontSize: 48,
                prefix: "",
                suffix: "",
                roundingValue: 1,
                showPlusSymbol: true,
                useRatingColor: true,
                color: "#CCCCCC"
            },
            title: {
                text: "Title",
                color: "#E1E5E8",
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
        }
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        }
    },
    translations: {
        base: "Base"
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    forceChartUpdate();
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

const { configCode, showAllConfig } = useConfigCode()

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomizeData() {
    value1.value = getRandomNumber(1, 5);
    value2.value = getRandomNumber(-100, 100);
}

const dsTypeCode = computed(() => {
    return `
    type VueUiGaugeDataset = {
        value: number
        base?: number
        series: Array<{
            from: number;
            to: number;
            color?: string;
            name?: string;
            nameOffsetRatio?: number // example: 1.1
        }>
    }
    `
})

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiGauge" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.gauge[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-gauge"
            targetMaker="VueUiGauge"
            :configSource="mainConfig.vue_ui_gauge"
        />

        <div class="w-3/4 mx-auto flex flex-row gap-2">
            
            <div :class="`transition-all mx-auto w-full`">
                <DocSnapper
                    :isFixed="isFixed"
                    :disabled="!isFixed || isMobile"
                    @fixChart="fixChart"
                    @resetDefault="resetDefault"
                    @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                >
                    <div class="flex flex-row">
                        <VueUiGauge :dataset="{...dataset1, value: value1 }" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                        <VueUiGauge v-if="!isFixed" :dataset="{...dataset2, value: value2 }" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_2_${key}`"/>
                    </div>
                </DocSnapper>
            </div>

        </div>
        <BaseRandomButton @click="randomizeData"/>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-gauge"/>
        </div>

        <Rater itemId="vue_ui_gauge" />

        <Box showEmits showSlots showThemes showResponsive showPatterns schema="vue_ui_gauge">
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiGaugeDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

        <CodeParser
            language="javascript"
            @copy="store.copy()"
            :content="dsTypeCode"
            class="my-6"
        />                 
                </div>

                {{ translations.docs.example[store.lang] }} 1:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiGaugeDataset</span> = {
    base: 12250,
    value: 4.2,
    series: [
        {
            from: 1,
            to: 3,
            color: "#ff6400",
            name: 'bad'
        },
        {
            from: 3,
            to: 4,
            color: "#5f8bee",
            name: 'acceptable'
        },
        {
            from: 4,
            to: 5,
            color: "#42d392",
            name: 'very good'
        },
    ]
}
</code>
</pre>                
                </div>
                {{ translations.docs.example[store.lang] }}  2:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = {
    base: 21200,
    value: -42,
    series: [
        {
            from: -100,
            to: 0,
            color: "#ff6400",
            name: 'critical'
        },
        {
            from: 0,
            to: 100,
            color: "#42d392",
            name: 'nominal'
        },
    ]
}
</code>
</pre>               
                </div>
            </template>
            <template v-slot:tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiGaugeConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiGaugeConfig" equal>
        <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
        <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="animation" :level="3" title="style.chart.animation">
                    <BaseAttr name="use" attr="style.chart.animation.use" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="speed" attr="style.chart.animation.speed" type="range" defaultVal="1" :min="1" :max="100" :step="1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="acceleration" attr="style.chart.animation.acceleration" type="range" defaultVal="1" :min="0.1" :max="5" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseAttr name="radiusRatio" attr="style.chart.layout.radiusRatio" type="range" defaultVal="1" :min="0.5" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="markers" :level="4" title="style.chart.layout.markers">
                        <BaseAttr name="show" attr="style.chart.layout.markers.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="prefix" attr="style.chart.layout.markers.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="suffix" attr="style.chart.layout.markers.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.layout.markers.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.layout.markers.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSizeRatio" attr="style.chart.layout.markers.fontSizeRatio" type="range" defaultVal="1" :min="0.5" :max="2" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.layout.markers.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="roundingValue" attr="style.chart.layout.markers.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                    </BaseDetails>
                    <BaseDetails attr="segmentNames" :level="4" title="style.chart.layout.segmentNames">
                        <BaseAttr name="show" attr="style.chart.layout.segmentNames.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="curved" attr="style.chart.layout.segmentNames.curved" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetRatio" attr="style.chart.layout.segmentNames.offsetRatio" type="range" defaultVal="1.1" :min="0.6" :max="1.2" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.layout.segmentNames.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="useSerieColor" attr="style.chart.layout.segmentNames.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.layout.segmentNames.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.layout.segmentNames.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="segmentSeparators" :level="4" title="style.chart.layout.segmentSeparators">
                        <BaseAttr name="show" attr="style.chart.layout.segmentSeparators.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetOut" attr="style.chart.layout.segmentSeparators.offsetOut" type="range" defaultVal="0" :min="0" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetIn" attr="style.chart.layout.segmentSeparators.offsetIn" type="range" defaultVal="0" :min="0" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.segmentSeparators.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.segmentSeparators.strokeWidth" type="number" defaultVal="2" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="indicatorArc" :level="4" title="style.chart.layout.indicatorArc">
                        <BaseAttr name="show" attr="style.chart.layout.indicatorArc.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.90"/>
                        <BaseAttr name="radius" attr="style.chart.layout.indicatorArc.radius" type="range" defaultVal="123" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.90"/>
                        <BaseAttr name="fill" attr="style.chart.layout.indicatorArc.fill" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.90"/>
                    </BaseDetails>
                    <BaseDetails attr="pointer" :level="4" title="style.chart.layout.pointer">
                        <BaseAttr name="show" attr="style.chart.layout.pointer.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.90"/>
                        <BaseAttr name="type" attr="style.chart.layout.pointer.type" type="select" defaultVal="rounded" :options="['rounded', 'pointy']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="size" attr="style.chart.layout.pointer.size" type="range" defaultVal="1" :min="0.5" :max="1.4" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.pointer.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.pointer.strokeWidth" type="number" defaultVal="12" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" comment="Usable with pointer type rounded"/>
                        <BaseAttr name="useRatingColor" attr="style.chart.layout.pointer.useRatingColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.layout.pointer.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="With useRatingColor set to false"/>
                        <BaseDetails attr="circle" :level="5" title="style.chart.layout.pointer.circle">
                            <BaseAttr name="radius" attr="style.chart.layout.pointer.circle.radius" type="number" defaultVal="10" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseAttr name="stroke" attr="style.chart.layout.pointer.circle.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="strokeWidth" attr="style.chart.layout.pointer.circle.strokeWidth" type="number" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.layout.pointer.circle.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="track" :level="4" title="style.chart.layout.track">
                        <BaseAttr name="size" attr="style.chart.layout.track.size" type="range" defaultVal="1" :min="0.5" :max="4.5" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="useGradient" attr="style.chart.layout.track.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="gradientIntensity" attr="style.chart.layout.track.gradientIntensity" type="range" defaultVal="20" :min="8" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="48" :min="8" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="prefix" attr="style.chart.legend.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="suffix" attr="style.chart.legend.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingValue" attr="style.chart.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showPlusSymbol" attr="style.chart.legend.showPlusSymbol" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="useRatingColor" attr="style.chart.legend.useRatingColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="With useRatingColor set to false" />
                    <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
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
        <BaseDetails attr="translations" :level="1">
            <BaseAttr name="base" attr="translations.base" type="text" defaultVal="Base" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab2>
                <ExposedMethods
                    component="VueUiGauge"
                    :names="[
                        'generatePdf',
                        'generateImage'
                    ]"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiGauge"
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
                <ThemesVueUiGauge />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiGauge 
                            :dataset="dataset1" 
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
                            :key="`gauge_1_${key}`"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab8>
                <VueUiGauge 
                    :dataset="{...dataset2, value: 42}" 
                    :config="isDarkMode ? 
                    {
                        ...darkModeConfig,
                        style: {
                            ...darkModeConfig.style,
                            chart: {
                                ...darkModeConfig.style.chart,
                                layout: {
                                    ...darkModeConfig.style.chart.layout,
                                    radiusRatio: 0.8,
                                    track: {
                                        ...darkModeConfig.style.chart.layout.track,
                                        size: 4
                                    },
                                    pointer: {
                                        ...darkModeConfig.style.chart.layout.pointer,
                                        size: 1,
                                        useRatingColor: false,
                                        stroke: 'transparent',
                                        color: '#3A3A3A',
                                        circle: {
                                            ...darkModeConfig.style.chart.layout.pointer.circle,
                                            color: '#2A2A2A',
                                            stroke: '#4A4A4A',
                                            strokeWidth: 1
                                        }
                                    },
                                    segmentNames: {
                                        ...darkModeConfig.style.chart.layout.segmentNames,
                                        fontSize: 36
                                    },
                                    segmentSeparators: {
                                        show: true,
                                        offsetOut: 24,
                                        strokeWidth: 1
                                    },
                                    markers: {
                                        ...darkModeConfig.style.chart.layout.markers,
                                        offsetY: 36
                                    }
                                }
                            }
                        }
                    } : 
                    {
                        ...config,
                        style: {
                            ...config.style,
                            chart: {
                                ...config.style.chart,
                                layout: {
                                    ...config.style.chart.layout,
                                    radiusRatio: 0.8,
                                    track: {
                                        ...config.style.chart.layout.track,
                                        size: 4
                                    },
                                    pointer: {
                                        ...config.style.chart.layout.pointer,
                                        size: 0.8,
                                        useRatingColor: false,
                                        stroke: 'transparent',
                                        color: '#3A3A3A',
                                        circle: {
                                            ...config.style.chart.layout.pointer.circle,
                                            color: '#6A6A6A',
                                            stroke: '#e1e5e8',
                                            strokeWidth: 1
                                        }
                                    },
                                    segmentNames: {
                                        ...config.style.chart.layout.segmentNames,
                                        fontSize: 36
                                    },
                                    segmentSeparators: {
                                        show: true,
                                        offsetOut: 24,
                                        strokeWidth: 1
                                    },
                                    markers: {
                                        ...config.style.chart.layout.markers,
                                        offsetY: 36
                                    }
                                }
                            }
                        }
                    }"
                >
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern v-if="seriesIndex === 0" :id="patternId" name="bubbles" stroke="#FFFFFF40" :strokeWidth="1" :scale="1"/>
                        <VueUiPattern v-if="seriesIndex === 1" :id="patternId" name="scales" stroke="#FFFFFF40"/>
                    </template>
                </VueUiGauge>
            </template>
        </Box>
    </div>

</template>