<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import UcDonut from "../useCases/uc-donut.vue";
import ThemesVueUiDonut from "../themes/ThemesVueUiDonut.vue";
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
    {
        name: "Serie 1",
        values: [100],
    },
    {
        name: "Serie 2",
        values: [200]
    },
    {
        name: "Serie 3",
        values: [300, 1],
        comment: "A comment for this specific datapoint"
    },
]);

const darkModeConfig = ref({
    type: 'classic',
    responsive: false,
    useBlurOnHover: true,
    useCssAnimation: true,
    serieToggleAnimation: {
        show: true,
        durationMs: 500,
    },
    startAnimation: {
        show: true,
        durationMs: 1000,
        staggerMs: 50
    },
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            width: 512,
            height: 360,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            layout: {
                curvedMarkers: true,
                labels: {
                    dataLabels: {
                        show: true,
                        useLabelSlots: false,
                        hideUnderValue: 3,
                        prefix: "",
                        suffix: ""
                    },
                    value: {
                        rounding: 0,
                        show: true,
                    },
                    percentage: {
                        color: "#CCCCCC",
                        bold: true,
                        fontSize: 18,
                        rounding: 0,
                    },
                    name: {
                        color: "#CCCCCC",
                        bold: false,
                        fontSize: 14,
                    },
                    hollow: {
                        show: true,
                        total: {
                            show: true,
                            bold: false,
                            fontSize: 18,
                            color: "#CCCCCC",
                            text:  "Total",
                            offsetY: -16,
                            value: {
                                color: "#CCCCCC",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: -12,
                                rounding: 0,
                            }
                        },
                        average: {
                            show: true,
                            bold: false,
                            fontSize: 18,
                            color: "#CCCCCC",
                            text:  "Average",
                            offsetY: 0,
                            value: {
                                color: "#CCCCCC",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: 6,
                                rounding: 0,
                            }
                        }
                    }
                },
                donut: {
                    strokeWidth: 64,
                    borderWidth: 2,
                    useShadow: false,
                    shadowColor: '#1A1A1A',
                },
            },
            comments: {
                show: true,
                showInTooltip: true,
                width: 100,
                offsetX: 0,
                offsetY: 0
            },
            legend: {
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
                    show: true,
                    fontSize: 16,
                    bold: false,
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
            title: {
                text: "Title",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#CCCCCC",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24
            }
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
            labels: true,
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
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
        },
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value",
            percentage: "Percentage"
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
            roundingValue: 0,
            roundingPercentage: 0
        }
    }
});

const config = ref({
    type: 'classic',
    responsive: false,
    useBlurOnHover: true,
    useCssAnimation: true,
    serieToggleAnimation: {
        show: true,
        durationMs: 500,
    },
    startAnimation: {
        show: true,
        durationMs: 1000,
        staggerMs: 50
    },
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            width: 512,
            height: 360,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            layout: {
                curvedMarkers: true,
                labels: {
                    dataLabels: {
                        show: true,
                        useLabelSlots: false,
                        hideUnderValue: 3,
                        prefix: "",
                        suffix: ""
                    },
                    value: {
                        rounding: 0,
                        show: true
                    },
                    percentage: {
                        color: "#1A1A1A",
                        bold: true,
                        fontSize: 18,
                        rounding: 0,
                    },
                    name: {
                        color: "#1A1A1A",
                        bold: false,
                        fontSize: 14,
                    },
                    hollow: {
                        show: true,
                        total: {
                            show: true,
                            bold: false,
                            fontSize: 18,
                            color: "#1A1A1A",
                            text:  "Total",
                            offsetY: -16,
                            value: {
                                color: "#1A1A1A",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: -12,
                                rounding: 0,
                            }
                        },
                        average: {
                            show: true,
                            bold: false,
                            fontSize: 18,
                            color: "#1A1A1A",
                            text:  "Average",
                            offsetY: 0,
                            value: {
                                color: "#1A1A1A",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: 6,
                                rounding: 0,
                            }
                        }
                    }
                },
                donut: {
                    strokeWidth: 64,
                    borderWidth: 2,
                    useShadow: false,
                    shadowColor: '#1A1A1A',
                },
            },
            comments: {
                show: true,
                showInTooltip: true,
                width: 100,
                offsetX: 0,
                offsetY: 0
            },
            legend: {
                    backgroundColor: "#F3F4F6",
                    color: "#1A1A1A",
                    show: true,
                    fontSize: 16,
                    bold: false,
                    roundingValue: 0,
                    roundingPercentage: 0,
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
                color: "#1A1A1A",
                backgroundColor: "#F3F4F6",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24
            }
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
            labels: true,
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
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
        },
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value",
            percentage: "Percentage"
        },
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
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

function randomizeData() {
    mutableDataset.value[0].values = [Math.random()*100];
    mutableDataset.value[1].values = [Math.random()*200];
    mutableDataset.value[2].values = [Math.random()*300];
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

const slotsConfig = computed(() => {
    return {
        darkMode: {
            ...mutableConfigDarkMode.value,
            style: {
                ...mutableConfigDarkMode.value.style,
                chart: {
                    ...mutableConfigDarkMode.value.style.chart,
                    layout: {
                        ...mutableConfigDarkMode.value.style.chart.layout,
                        labels: {
                            ...mutableConfigDarkMode.value.style.chart.layout.labels,
                            dataLabels: {
                                ...mutableConfigDarkMode.value.style.chart.layout.labels.dataLabels,
                                useLabelSlots: true
                            }
                        }
                    }
                }
            }
        },
        lightMode: {
            ...mutableConfig.value,
            style: {
                ...mutableConfig.value.style,
                chart: {
                    ...mutableConfig.value.style.chart,
                    layout: {
                        ...mutableConfig.value.style.chart.layout,
                        labels: {
                            ...mutableConfig.value.style.chart.layout.labels,
                            dataLabels: {
                                ...mutableConfig.value.style.chart.layout.labels.dataLabels,
                                useLabelSlots: true
                            }
                        }
                    }
                }
            }
        }
    }
});

const sparkGaugeConfig = ref({
    style: {
        fontFamily: "inherit",
        background: "transparent",
        height: 84,
        basePosition: 72,
        animation: {
            show: true,
            speedMs: 150
        },
        title: {
            show: true,
            fontSize: 12,
            position: "bottom",
            textAlign: "center",
            bold: false,
            color: "#1A1A1A"
        },
        dataLabel: {
            fontSize: 24,
            autoColor: true,
            color: "#1A1A1A",
            offsetY: 0,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: "#FF0000",
            max: "#00FF00",
            showGradient: true,
        },
        track: {
            autoColor: true,
            color: "#5f8bee",
            strokeLinecap: "round"
        },
        gutter: {
            color: "#E1E5E8",
            strokeLinecap: "round"
        }
    }
})

const sparkGaugeDatasets = ref([
    {
        value: 7,
        min: 0,
        max: 10,
        title: 'Serie 1 satisfaction'
    },
    {
        value: 6.5,
        min: 0,
        max: 10,
        title: 'Serie 2 satisfaction'
    },
    {
        value: 9,
        min: 0,
        max: 10,
        title: 'Serie 3 satisfaction'
    },
])

const sparkGaugeConfigDarkMode = ref({
    style: {
        fontFamily: "inherit",
        background: "transparent",
        height: 84,
        basePosition: 72,
        animation: {
            show: true,
            speedMs: 150
        },
        title: {
            show: true,
            fontSize: 12,
            position: "bottom",
            textAlign: "center",
            bold: false,
            color: "#6A6A6A"
        },
        dataLabel: {
            fontSize: 20,
            autoColor: true,
            color: "#CCCCCC",
            offsetY: 0,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: "#FF0000",
            max: "#00FF00",
            showGradient: true,
        },
        track: {
            autoColor: true,
            color: "#5f8bee",
            strokeLinecap: "round"
        },
        gutter: {
            color: "#3A3A3A",
            strokeLinecap: "round"
        }
    }
})

const slotOptions = ref([
    'justLabels',
    'chart',
    'icon'
])

const slotOption = ref(slotOptions.value[0])

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
    return `type VueUiDonutDatasetItem = {
    name: string
    color: string
    values: number[]
    comment?: string
}`
})

const codeDataset = ref(`const dataset: VueUiDonutDatasetItem[] = [
    {
        name: "Serie 1",
        values: [100],
    },
    {
        name: "Serie 2",
        values: [200]
    },
    {
        name: "Serie 3",
        values: [300, 1],
        comment: "A comment for this specific datapoint"
    },
];`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDonut" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.donut[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-donut"
            targetMaker="VueUiDonut"
            :configSource="mainConfig.vue_ui_donut"
        />

        <div :class="`transition-all mx-auto w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <VueDataUi component="VueUiDonut" :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                    <template #plot-comment="{ plot }">
                        <div :style="`text-align:${plot.textAlign};font-size: 10px; padding: 6px;`">
                            {{ plot.comment }}
                        </div>
                    </template>
                </VueDataUi>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData"/>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-donut"/>
        </div>

        <Rater itemId="vue_ui_donut" />

        <Box showEmits showSlots showTooltip showUseCases showThemes showResponsive showPatterns schema="vue_ui_donut" signInfo="positiveOrNegativeOnly">
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
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiDonutConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>
<code ref="configCode">
    <BaseDetails attr="const config: VueUiDonutConfig" equal>
        <BaseAttr name="type" attr="type" type="select" defaultVal="classic" :options="['classic', 'polar']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr inactive name="responsive" defaultVal="false" :comment="translations.responsive[store.lang]"/>
        <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
        <BaseAttr inactive name="customPalette" defaultVal="[]" comment="string[]"/>
        <BaseAttr name="useBlurOnHover" attr="useBlurOnHover" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="serieToggleAnimation" :level="1">
            <BaseAttr name="show" attr="serieToggleAnimation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="durationMs" attr="serieToggleAnimation.durationMs" type="number" defaultVal="500" :min="0" :max="2000" :step="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="startAnimation" :level="1">
            <BaseAttr name="show" attr="startAnimation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="durationMs" attr="startAnimation.durationMs" type="number" defaultVal="1000" :min="0" :max="5000" :step="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="staggerMs" attr="startAnimation.staggerMs" type="number" defaultVal="50" :min="0" :max="500" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="width" attr="style.chart.width" defaultVal="512" type="number" :min="360" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Ignored when responsive is true"/>
                <BaseAttr name="height" attr="style.chart.height" defaultVal="512" type="number" :min="360" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Ignored when responsive is true"/>
                <BaseAttr name="useGradient" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.useGradient" defaultVal="true"/>
                <BaseAttr name="gradientIntensity" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" :min="0" :max="100" attr="style.chart.gradientIntensity" defaultVal="40" />
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" :min="0" :max="100" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" :min="0" :max="100" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" :min="0" :max="100" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" :min="0" :max="100" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="comments" :level="3" title="style.chart.comments">
                    <BaseAttr name="show" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.comments.show" defaultVal="true"/>
                    <BaseAttr name="showInTooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.comments.showInTooltip" defaultVal="true"/>
                    <BaseAttr name="width" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.comments.width" :min="50" :max="400" :step="10" defaultVal="100"/>
                    <BaseAttr name="offsetX" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.comments.offsetX" :min="-50" :max="50" defaultVal="0"/>
                    <BaseAttr name="offsetY" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.comments.offsetY" :min="-50" :max="50" defaultVal="0"/>
                </BaseDetails>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseAttr name="curvedMarkers" attr="style.chart.layout.curvedMarkers" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseDetails attr="donut" :level="4" title="style.chart.layout.donut">
                        <BaseAttr name="strokeWidth" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.layout.donut.strokeWidth" :min="6" :max="100" defaultVal="55"/>
                        <BaseAttr name="borderWidth" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.layout.donut.borderWidth" :min="0" :max="12" defaultVal="2"/>
                        <BaseAttr name="useShadow" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.layout.donut.useShadow" defaultVal="false"/>
                        <BaseAttr name="shadowColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.layout.donut.shadowColor" defaultVal="#2D353C"/>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">                    
                        <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.labels.dataLabels">
                            <BaseAttr name="show" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.layout.labels.dataLabels.show" defaultVal="true" @change="forceChartUpdate()"/>
                            <BaseAttr inactive name="useLabelSlots" defaultVal="false" comment="Check out the slots tab for information on how to use custom data labels"/>
                            <BaseAttr name="hideUnderValue" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.layout.labels.dataLabels.hideUnderValue" :min="0" :max="10" defaultVal="3" :comment="translations.docs.comments.donut.hideUnderValue[store.lang]"/>
                            <BaseAttr name="prefix" :light="mutableConfig" :dark="mutableConfigDarkMode" type="text" attr="style.chart.layout.labels.dataLabels.prefix" defaultVal="''"/>
                            <BaseAttr name="suffix" :light="mutableConfig" :dark="mutableConfigDarkMode" type="text" attr="style.chart.layout.labels.dataLabels.suffix" defaultVal="''"/>
                        </BaseDetails>
                        <BaseDetails attr="value" :level="5" title="style.chart.layout.labels.value">
                            <BaseAttr name="show" attr="style.chart.layout.labels.value.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="rounding" attr="style.chart.layout.labels.value.rounding" type="number" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                        </BaseDetails>
                        <BaseDetails attr="percentage" :level="5" title="style.chart.layout.labels.percentage">
                            <BaseAttr name="color" attr="style.chart.layout.labels.percentage.color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" defaultVal="#2D353C"/>
                            <BaseAttr name="bold" attr="style.chart.layout.labels.percentage.bold" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" defaultVal="true"/>
                            <BaseAttr name="fontSize" attr="style.chart.layout.labels.percentage.fontSize" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" :min="8" :max="42" defaultVal="18"/>
                            <BaseAttr name="rounding" attr="style.chart.layout.labels.percentage.rounding" type="number" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                        </BaseDetails>
                        <BaseDetails attr="name" :level="5" title="style.chart.layout.labels.name">
                            <BaseAttr name="color" attr="style.chart.layout.labels.name.color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" defaultVal="#2D353C"/>
                            <BaseAttr name="bold" attr="style.chart.layout.labels.name.bold" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" defaultVal="false"/>
                            <BaseAttr name="fontSize" attr="style.chart.layout.labels.name.fontSize" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" :min="8" :max="42" defaultVal="14"/>
                        </BaseDetails>
                        <BaseDetails attr="hollow" :level="5" title="style.chart.layout.labels.hollow">
                            <BaseAttr name="show" attr="style.chart.layout.labels.hollow.show" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" defaultVal="true"/>
                            <BaseDetails attr="average" :level="6" title="style.chart.layout.labels.hollow.average">
                                <BaseAttr name="show" attr="style.chart.layout.labels.hollow.average.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.layout.labels.hollow.average.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.chart.layout.labels.hollow.average.fontSize" type="number" defaultVal="18" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.layout.labels.hollow.average.color" type="color" defaultVal="#AAAAAA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="text" attr="style.chart.layout.labels.hollow.average.text" type="text" defaultVal="Average" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.chart.layout.labels.hollow.average.offsetY" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseDetails attr="value" :level="7" title="style.chart.layout.labels.hollow.average.value">
                                    <BaseAttr name="bold" attr="style.chart.layout.labels.hollow.average.value.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="fontSize" attr="style.chart.layout.labels.hollow.average.value.fontSize" type="number" defaultVal="18" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="color" attr="style.chart.layout.labels.hollow.average.value.color" type="color" defaultVal="#AAAAAA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="offsetY" attr="style.chart.layout.labels.hollow.average.value.offsetY" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="rounding" attr="style.chart.layout.labels.hollow.average.value.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="prefix" attr="style.chart.layout.labels.hollow.average.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="suffix" attr="style.chart.layout.labels.hollow.average.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                                </BaseDetails>
                            </BaseDetails>
                            <BaseDetails attr="total" :level="6" title="style.chart.layout.labels.hollow.total">
                                <BaseAttr name="show" attr="style.chart.layout.labels.hollow.total.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.chart.layout.labels.hollow.total.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.chart.layout.labels.hollow.total.fontSize" type="number" defaultVal="18" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.chart.layout.labels.hollow.total.color" type="color" defaultVal="#AAAAAA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="text" attr="style.chart.layout.labels.hollow.total.text" type="text" defaultVal="Total" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.chart.layout.labels.hollow.total.offsetY" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseDetails attr="value" :level="7" title="style.chart.layout.labels.hollow.total.value">
                                    <BaseAttr name="bold" attr="style.chart.layout.labels.hollow.total.value.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="fontSize" attr="style.chart.layout.labels.hollow.total.value.fontSize" type="number" defaultVal="18" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="color" attr="style.chart.layout.labels.hollow.total.value.color" type="color" defaultVal="#AAAAAA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="offsetY" attr="style.chart.layout.labels.hollow.total.value.offsetY" type="number" defaultVal="0" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="rounding" attr="style.chart.layout.labels.hollow.total.value.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="prefix" attr="style.chart.layout.labels.hollow.total.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="suffix" attr="style.chart.layout.labels.hollow.total.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                                    <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                                </BaseDetails>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingValue" attr="style.chart.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingPercentage" attr="style.chart.legend.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                    <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab"/>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
                <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
                <BaseAttr name="percentage" attr="table.columnNames.percentage" type="text" defaultVal="Percentage" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
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
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="labels" attr="userOptions.buttons.labels" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
                <BaseAttr name="labels" attr="userOptions.buttonTitles.labels" type="text" defaultVal="Toggle labels" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            </BaseDetails>
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template v-slot:tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiDonut
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiDonutDatasetItem, index: number }) {
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

            const donutChart = ref(null);
            const donutDataset = ref([]);

            onMounted(() => {
                donutDataset.value = donutChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonut
                ref="donutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonut
                ref="donutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        donutDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.donutDataset = this.$refs.donutChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <ExposedMethods
                    component="VueUiDonut"
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'toggleTable',
                        'toggleLabels'
                    ]"
                />
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiDonut"
                    :types="[
                        'svg',
                        'dataLabel',
                        'legend',
                        'tooltip-before',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'plot-comment',
                        'chart-background',
                        'pattern'
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

            <template #tab5>
                <UcDonut />
            </template>

            <template #tab6>
                <ThemesVueUiDonut />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiDonut" 
                            :dataset="mutableDataset" 
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
                <VueDataUi component="VueUiDonut" :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern v-if="seriesIndex === 0" :id="patternId" name="zig-zag" stroke="blue" :strokeWidth="3" :scale="0.5"/>
                        <VueUiPattern v-if="seriesIndex === 1" :id="patternId" name="scales" stroke="#1A1A1A"/>
                        <VueUiPattern v-if="seriesIndex === 2" :id="patternId" name="hexagon-flooring" stroke="#1A1A1A"/>
                    </template>
                </VueDataUi>
            </template>
        </Box>
    </div>
</template>