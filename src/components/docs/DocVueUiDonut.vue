<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import UcDonut from "../useCases/uc-donut.vue";
import ThemesVueUiDonut from "../themes/ThemesVueUiDonut.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";

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
})

const dataset = ref([
    {
        name: "Serie 1",
        color: "#5f8bee",
        values: [100],
    },
    {
        name: "Serie 2",
        color: "#42d392",
        values: [200]
    },
    {
        name: "Serie 3",
        color: "#ff6400",
        values: [300, 1],
        comment: "A comment for this specific datapoint"
    },
]);

const darkModeConfig = ref({
    responsive: false,
    useBlurOnHover: true,
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
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
                        fontSize: 18
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
                    strokeWidth: 55,
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
                backgroundOpacity: 90,
                position: "center",
                offsetY: 24
            }
        }
    },
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
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
        }
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
    responsive: false,
    useBlurOnHover: true,
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
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
                        fontSize: 18
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
                    strokeWidth: 55,
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
                backgroundOpacity: 90,
                position: "center",
                offsetY: 24
            }
        }
    },
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
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
        }
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

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartDonut" stroke="#42d392" :strokeWidth="1.5" />
            VueUiDonut
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.donut[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
            <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <Suspense>
                <template #default>
                    <VueDataUi component="VueUiDonut" :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                        <template #plot-comment="{ plot }">
                            <div :style="`text-align:${plot.textAlign};font-size: 10px; padding: 6px;`">
                                {{ plot.comment }}
                            </div>
                        </template>
                    </VueDataUi>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-donut"
            targetMaker="VueUiDonut"
            :configSource="mainConfig.vue_ui_donut"
        />

        <Box showEmits showSlots showTooltip showUseCases showThemes showResponsive schema="vue_ui_donut">
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiDonutDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            color: string;
            values: number[];
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
const <span class="text-black dark:text-app-green">dataset: VueUiDonutDatasetItem[]</span> = [
    {
        name: "Series 1",
        color: <input type="color" v-model="mutableDataset[0].color">,
        values: [100]
    },
    {
        name: "Series 2",
        color: <input type="color" v-model="mutableDataset[1].color">,
        values: [200]
    },
    {
        name: "Series 3",
        color: <input type="color" v-model="mutableDataset[2].color">,
        values: [300, 1]
    },
]
</code>
</pre>                
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
        <span>responsive: false; <span class="text-gray-600 dark:text-app-blue text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        theme: ""; ("zen" | "hack" | "concrete" | "")<br>
        <span>customPalette: []; <span class="text-xs text-app-blue">// string[]</span></span>
        <BaseAttr name="useBlurOnHover" attr="useBlurOnHover" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="style" :level="1">
            fontFamily: "inherit";
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="useGradient" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.useGradient" defaultVal="true"/>
                <BaseAttr name="gradientIntensity" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" :min="0" :max="100" attr="style.chart.gradientIntensity" defaultVal="40" />
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="comments" :level="3" title="style.chart.comments">
                    <BaseAttr name="show" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.comments.show" defaultVal="true"/>
                    <BaseAttr name="showInTooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.comments.showInTooltip" defaultVal="true"/>
                    <BaseAttr name="width" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.comments.width" :min="50" :max="400" :step="10" defaultVal="100"/>
                    <BaseAttr name="offsetX" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.comments.offsetX" :min="-50" :max="50" defaultVal="0"/>
                    <BaseAttr name="offsetY" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.comments.offsetY" :min="-50" :max="50" defaultVal="0"/>
                </BaseDetails>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="donut" :level="4" title="style.chart.layout.donut">
                        <BaseAttr name="strokeWidth" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.layout.donut.strokeWidth" :min="6" :max="100" defaultVal="55"/>
                        <BaseAttr name="borderWidth" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.layout.donut.borderWidth" :min="0" :max="12" defaultVal="2"/>
                        <BaseAttr name="useShadow" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.layout.donut.useShadow" defaultVal="false"/>
                        <BaseAttr name="shadowColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.layout.donut.shadowColor" defaultVal="#2D353C"/>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">                    
                        <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.labels.dataLabels">
                            <BaseAttr name="show" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" attr="style.chart.layout.labels.dataLabels.show" defaultVal="true" @change="forceChartUpdate()"/>
                            <span>useLabelSlots: false, <span class="text-gray-600 dark:text-app-blue text-xs">// Check out the slots tab for information on how to use custom data labels</span></span>
                            <BaseAttr name="hideUnderValue" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" attr="style.chart.layout.labels.dataLabels.hideUnderValue" :min="0" :max="10" defaultVal="3" :comment="translations.docs.comments.donut.hideUnderValue[store.lang]"/>
                            <BaseAttr name="prefix" :light="mutableConfig" :dark="mutableConfigDarkMode" type="text" attr="style.chart.layout.labels.dataLabels.prefix" defaultVal="''"/>
                            <BaseAttr name="suffix" :light="mutableConfig" :dark="mutableConfigDarkMode" type="text" attr="style.chart.layout.labels.dataLabels.suffix" defaultVal="''"/>
                        </BaseDetails>
                        <BaseDetails attr="percentage" :level="5" title="style.chart.layout.labels.percentage">
                            <BaseAttr name="color" attr="style.chart.layout.labels.percentage.color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" defaultVal="#2D353C"/>
                            <BaseAttr name="bold" attr="style.chart.layout.labels.percentage.bold" :light="mutableConfig" :dark="mutableConfigDarkMode" type="checkbox" defaultVal="true"/>
                            <BaseAttr name="fontSize" attr="style.chart.layout.labels.percentage.fontSize" :light="mutableConfig" :dark="mutableConfigDarkMode" type="number" :min="8" :max="42" defaultVal="18"/>
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
                    <span>customFormat: null, <span class="text-gray-600 dark:text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
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
    If your dataset contains a comments attribute, you can display comments on the chart using the #plot-comment slot.
</div>

<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #plot-comment="{ plot }"&gt;
            &lt;div :style="`width:100%; text-align:${plot.textAlign}; color:${plot.color}`"&gt;<span v-pre>{{ plot.comment }}</span>&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.donutDataLabels[store.lang]  }}
Set <code class="text-app-orange">config.style.chart.layout.labels.dataLabels.useLabelSlots</code> to true. 
</div>
<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #dataLabel="{ datapoint, isBlur, isVisible, isSafari, textAlign, flexAlign, percentage }"&gt;
            &lt;div :style="`background:${datapoint.color}`"&gt;
                <span v-pre>{{ datapoint.name }} : {{ percentage }}</span>
            &lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
</code>
</pre>


<fieldset class="flex flex-row gap-2 mb-6 place-items-center justify-center">        
    <label :for="slotOptions[0]">Simple label</label>
    <input type="radio" v-model="slotOption" :value="slotOptions[0]" class="accent-app-orange">
    <label :for="slotOptions[1]">Chart</label>
    <input type="radio" v-model="slotOption" :value="slotOptions[1]" class="accent-app-orange">
</fieldSet>


<div class="mx-auto max-w-[600px] mb-6">
    <VueUiDonut :dataset="mutableDataset" :config="isDarkMode ? slotsConfig.darkMode : slotsConfig.lightMode" :key="key">
        <template #dataLabel="{ datapoint, percentage }">
            <div v-if="slotOption === 'justLabels'" :style="`background:${datapoint.color}33;`" class="rounded text-xs py-2">
                {{ datapoint.name }} : {{ percentage }}
            </div>
            <div v-if="slotOption === 'chart'" class="w-[100px]">
                <VueDataUi v-if="datapoint.name === 'Serie 1'" component="VueUiSparkgauge" :dataset="sparkGaugeDatasets[0]" :config="isDarkMode ? {
                    ...sparkGaugeConfigDarkMode,
                    style: {
                        ...sparkGaugeConfigDarkMode.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                } 
                    : {
                    ...sparkGaugeConfig,
                    style: {
                        ...sparkGaugeConfig.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                }"
                />
                <VueDataUi v-if="datapoint.name === 'Serie 2'" component="VueUiSparkgauge" :dataset="sparkGaugeDatasets[1]" :config="isDarkMode ? {
                    ...sparkGaugeConfigDarkMode,
                    style: {
                        ...sparkGaugeConfigDarkMode.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                } 
                    : {
                    ...sparkGaugeConfig,
                    style: {
                        ...sparkGaugeConfig.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                }"/>
                <VueDataUi v-if="datapoint.name === 'Serie 3'" component="VueUiSparkgauge" :dataset="sparkGaugeDatasets[2]" :config="isDarkMode ? {
                    ...sparkGaugeConfigDarkMode,
                    style: {
                        ...sparkGaugeConfigDarkMode.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                } 
                    : {
                    ...sparkGaugeConfig,
                    style: {
                        ...sparkGaugeConfig.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                }"/>
            </div>
        </template>
    </VueUiDonut>
</div>


<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
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

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
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
        </Box>
    </div>
</template>