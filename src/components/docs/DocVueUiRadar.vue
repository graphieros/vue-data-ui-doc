<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import ThemesVueUiRadar from "../themes/ThemesVueUiRadar.vue";

import { useMainStore } from "../../stores";

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
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
                useDiv: true,
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
                borderColor:"#e1e5e8",
                borderWidth: 1
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                fontSize: 14,
                roundingPercentage: 0,
            }
        }
    },
    table: {
        show: false,
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
        show: true
    },
    translations: {
        target: "Target",
        value: "Value",
        datapoint: "Datapoint"
    }
});

const darkModeConfig = ref({
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                useDiv: true,
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
                borderColor:"#3A3A3A",
                borderWidth: 1
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                roundingPercentage: 0,
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
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
    },
    userOptions: {
        show: true
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
    mutableDataset.value = JSON.parse(JSON.stringify({...dataset.value, series: dataset.value.series.slice(0,slicer.value)}));
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
            <VueUiIcon name="chartRadar" stroke="#42d392" :strokeWidth="1.5" />
            VueUiRadar
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.radar[store.lang] }}
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
            <VueUiRadar :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>

        <div class="mt-6 flex flex-col gap-3">
            <label for="player">{{  translations.docs.showMoreSeries[store.lang] }}</label>
            <input id="player" type="range" :min="3" :max="10" v-model="slicer" @input="updateDataset" class="accent-app-green max-w-[200px]">
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_radar)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-radar"/>
            <MakerLink to="VueUiRadar"/>
        </div>
        <Box showEmits showSlots showTooltip showThemes>
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiRadarDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        categories: [
            {
                name: string;
                color: string;
            },
            {...}
        ],
        series: [
            {
                name: string;
                values: number[]; <span class="text-gray-600 dark:text-app-green">// {{  translations.docs.comments.radar.seriesValues[store.lang]  }}</span>
                target: number; <span class="text-gray-600 dark:text-app-green">// {{  translations.docs.comments.radar.target[store.lang] }}</span>
            },
            {...} <span class="text-gray-600 dark:text-app-orange">// {{  translations.docs.comments.radar.polygon[store.lang]  }}</span>
        ]
    }
</code>
</pre>
                </div>

                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiRadarDataset</span> = {
    categories: [
        {
            name: "category 1",
            color: "#5f8bee"
        },
        {
            name: "category 2",
            color: "#42d392
        },
        {
            name: "category 3",
            color: "#ff6400"
        }
    ],
    <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.radar.scale[store.lang] }}</span>
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
}
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                    <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                    <div class="mt-6">
                        TS type: <code class="text-app-blue">VueUiRadarConfig</code>
                    </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiRadarConfig</span> = {
    theme: ""; ("zen" | "hack" | "concrete" | "")
    customPalette: []; // string[]
    useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: true) <span class="text-gray-600 dark:text-app-blue">// {{ translations.docs.comments.donut.layoutTitle[store.lang] }}</span>
                plots: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.plots.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.plots.show" @change="forceChartUpdate()">, (default: true),
                    radius: <input v-if="isDarkMode" type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.plots.radius"><input v-else type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.plots.radius">, (default: 2)
                },
                outerPolygon: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.outerPolygon.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.outerPolygon.stroke">, (default: "#CCCCCC") 
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.outerPolygon.strokeWidth"><input v-else type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.outerPolygon.strokeWidth">, (default: 1)
                },
                dataPolygon: {
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.strokeWidth"><input v-else type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.strokeWidth">, (default: 1)
                    transparent: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.transparent" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.transparent" @change="forceChartUpdate()">, (default: false),
                    opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.opacity">, (default: 20)
                    useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.useGradient" @change="forceChartUpdate()">, (default: true)
                },
                grid: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.show" @change="forceChartUpdate()">, (default: true)
                },
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.strokeWidth">, (default: 0.5)
                    graduations: <input v-if="isDarkMode" type="number" min="0" max="30" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations"><input v-else type="number" min="0" max="30" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.graduations">, (default: 5)
                },
                labels: {
                    dataLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.fontSize"><input v-else type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.fontSize">, (default: 12)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.dataLabels.color">, (default: "#2D353C")
                    }
                },
            },
            title: {
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            tooltip: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)
                showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue"><input v-else type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.roundingValue">, (default: 0)
                roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingPercentage"><input v-else type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.roundingPercentage">, (default: 0),
                customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab,
                animation: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.animation.show" @change="forceChartUpdate()">, (default: true)
                    animationFrames: <input v-if="isDarkMode" type="number" min="0" max="300" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.animation.animationFrames"><input v-else type="number" min="0" max="300" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.animation.animationFrames">, (default: 60)
                },
                borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)
                borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8"),
                borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)
            },
            legend: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)
                roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage"><input v-else type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.roundingPercentage">, (default: 0)
            }
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
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
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    },
    translations: {
        target: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.target"><input v-else type="text" v-model="mutableConfig.translations.target">, (default: "Target")
        value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.value"><input v-else type="text" v-model="mutableConfig.translations.value">, (default: "Value")
        datapoint: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.datapoint"><input v-else type="text" v-model="mutableConfig.translations.datapoint">, (default: "Datapoint")
    }
}
</code>
</pre>                    
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

            onMounted(() => {
                radarDataset.value = radarChart.value.getData();
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
                mounted () {
                    this.radarDataset = this.$refs.radarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
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
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiRadar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiRadar&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiRadar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiRadar&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiRadar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiRadar&gt;
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

            <template #tab6>
                <ThemesVueUiRadar />
            </template>
        </Box>
    </div>
</template>