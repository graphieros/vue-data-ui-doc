<script setup>
import {ref, watch, computed, nextTick } from "vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import Box from "../Box.vue";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"

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
            values: [100]
        },
        {
            name: "Serie 2",
            color: "#42d392",
            values: [200]
        },
        {
            name: "Serie 3",
            color: "#ff6400",
            values: [300, 1]
        }
    ]);

    const darkModeConfig = ref({
        useBlurOnHover: true,
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                layout: {
                    labels: {
                        dataLabels: {
                            prefix: "",
                            suffix: ""
                        },
                        captions: {
                            "show": false,
                            "showSerieName": false,
                            "serieNameAbbreviation": true,
                            "serieNameMaxAbbreviationSize": 3,
                            "fontSize": 12,
                            "showValue": true,
                            "showPercentage": true,
                            "roundingValue": 0,
                            "roundingPercentage": 0,
                            "offsetX": 0,
                            "offsetY": 0
                        },
                    },
                    grid: {
                        size: 10,
                        spaceBetween: 0,
                        vertical: false,
                    },
                    rect: {
                        rounded: true,
                        rounding:2,
                        stroke: "#1A1A1A",
                        strokeWidth: 3,
                        useGradient: true,
                        gradientIntensity: 40,
                    },
                    useDiv: true,
                },
                title: {
                    text: "Title",
                    color: "#FAFAFA",
                    fontSize: 20,
                    bold: true,
                    subtitle: {
                        color: "#CCCCCC",
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
                    customFormat: null
                },
                legend: {
                    show: true,
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
                    bold: false,
                    fontSize: 14,
                    roundingValue: 0,
                    roundingPercentage: 0,
                }
            }
        },
        userOptions: {
            show: true,
            title: "options",
            labels: {
                useDiv: "Title & legend inside",
                showTable: "Show table"
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
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
        useBlurOnHover: true,
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                layout: {
                    labels: {
                        dataLabels: {
                            prefix: "",
                            suffix: ""
                        },
                        captions: {
                            "show": false,
                            "showSerieName": false,
                            "serieNameAbbreviation": true,
                            "serieNameMaxAbbreviationSize": 3,
                            "fontSize": 12,
                            "showValue": true,
                            "showPercentage": true,
                            "roundingValue": 0,
                            "roundingPercentage": 0,
                            "offsetX": 0,
                            "offsetY": 0
                        },
                    },
                    grid: {
                        size: 10,
                        spaceBetween: 0,
                        vertical: false,
                    },
                    rect: {
                        rounded: true,
                        rounding:2,
                        stroke: "#F3F4F6",
                        strokeWidth: 3,
                        useGradient: true,
                        gradientIntensity: 20,
                    },
                    useDiv: true,
                },
                title: {
                    text: "Title",
                    color: "#1A1A1A",
                    fontSize: 20,
                    bold: true,
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
                    customFormat: null
                },
                legend: {
                    show: true,
                    backgroundColor: "#F3F4F6",
                    color: "#1A1A1A",
                    bold: false,
                    fontSize: 14,
                    roundingValue: 0,
                    roundingPercentage: 0,
                }
            }
        },
        userOptions: {
            show: true,
            title: "options",
            labels: {
                useDiv: "Title & legend inside",
                showTable: "Show table"
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
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

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartWaffle" stroke="#42d392" :strokeWidth="1.5" />
            VueUiWaffle
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.waffle[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
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
            <VueUiWaffle :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_waffle)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-waffle"/>
            <MakerLink to="VueUiWaffle"/>
        </div>
        <Box showEmits showSlots showTooltip>
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiWaffleDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            color: string; <span class="text-gray-600 dark:text-app-orange">// HEX, RGB, HSL</span>
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
const <span class="text-black dark:text-app-green">dataset: VueUiWaffleDatasetItem[]</span> = [
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
        name: "Series 1",
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
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiWaffleConfig</code>
                </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiWaffleConfig</span> = {
    style: {
        useBlurOnHover: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useBlurOnHover" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useBlurOnHover" @change="forceChartUpdate()">, (default: true) <span class="text-app-blue">// since v.1.9.17</span>
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                labels: {
                    dataLabels: {
                        prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.prefix">, (default: "")
                        suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.suffix">, (default: "")
                    },
                    captions: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.show" @change="forceChartUpdate()">, (default: false)
                        showSerieName: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.showSerieName" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.showSerieName" @change="forceChartUpdate()">, (default: false)
                        serieNameAbbreviation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.serieNameAbbreviation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.serieNameAbbreviation" @change="forceChartUpdate()">, (default: true)
                        serieNameMaxAbbreviationSize: <input v-if="isDarkMode" type="number" min="0" max="12" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.serieNameMaxAbbreviationSize"><input v-else type="number" min="0" max="12" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.serieNameMaxAbbreviationSize">, (default: 3)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.fontSize"><input v-else type="number" min="6" max="48" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.fontSize">, (default: 12)
                        showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.showValue" @change="forceChartUpdate()">, (default: true)
                        showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.captions.showPercentage" @change="forceChartUpdate()">, (default: true)
                        roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.roundingValue"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.roundingValue">, (default: 0)
                        roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.roundingPercentage"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.roundingPercentage">, (default: 0)
                        offsetX: <input v-if="isDarkMode" type="number" min="-100" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.offsetX"><input v-else type="number" min="-100" max="100" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.offsetX">, (default: 0)
                        offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.layout.labels.captions.offsetY"><input v-else type="number" min="-100" max="100" step="1" v-model="mutableConfig.style.chart.layout.labels.captions.offsetY">, (default: 0)
                    }
                },
                grid: {
                    size: <input v-if="isDarkMode" type="number" min="2" max="50" v-model="mutableConfigDarkMode.style.chart.layout.grid.size"><input v-else type="number" min="2" max="50" v-model="mutableConfig.style.chart.layout.grid.size">, (default: 20), <span class="text-app-blue">// {{ translations.docs.comments.waffle.gridSize[store.lang] }}</span>
                    spaceBetween: <input v-if="isDarkMode" type="number" min="0" max="5" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.spaceBetween"><input v-else type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.chart.layout.grid.spaceBetween">, (default: 0)
                    vertical: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.vertical" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.vertical" @change="forceChartUpdate()">, (default: false)
                },
                rect: {
                    rounded: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.rect.rounded" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.rect.rounded" @change="forceChartUpdate()">, (default: true)
                    rounding: <input v-if="isDarkMode" type="number" min="0" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.layout.rect.rounding"><input v-else type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.layout.rect.rounding">, (default: 2),
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.rect.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.rect.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.rect.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.rect.strokeWidth">, (default: 2)
                    useGradient: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.rect.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.rect.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.rect.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.rect.gradientIntensity">, (default: 40)
                },
            },
            title: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                    subtitle: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                    }
                },
                tooltip: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                    showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)
                    showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue" @change="forceChartUpdate()">, (default: 0)
                    roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
                    customFormat: null, // default behavior, to customize content see 'custom tooltip' tab
                }
                legend: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate()">, (default: 0)
                    roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
                },
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
        columnNames: {
            series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")
            value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")
            percentage: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.percentage"><input v-else type="text" v-model="mutableConfig.table.columnNames.percentage">, (default: "Percebtage")
        },
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")
            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
            roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
        }
    }
}
</code>
</pre>
            </template>

            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            name: string;
            value: number;
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

            const waffleChart = ref(null);
            const waffleDataset = ref([]);

            onMounted(() => {
                waffleDataset.value = waffleChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        waffleDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.waffleDataset = this.$refs.waffleChart.getData();
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
                </div>
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiWaffle
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiWaffle&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiWaffle
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiWaffle&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiWaffle
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiWaffle&gt;
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
            </template>
        </Box>
    </div>
</template>