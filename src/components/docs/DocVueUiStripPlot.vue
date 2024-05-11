<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import ConfigAttribute from "../ConfigAttribute.vue";

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
        name: "Asia",
        plots: [
            { name: "Shanghai", value: 24.9 },
            { name: "Beijing", value: 21.9 },
            { name: "Delhi", value: 16.8 },
            { name: "Guangzhou", value: 16.1 },
            { name: "Istanbul", value: 15.6 },
            { name: "Chengdu", value: 15.4 },
            { name: "Mumbai", value: 15.4 },
            { name: "Karachi", value: 14.9 },
            { name: "Shenzen", value: 14.7 },
            { name: "Tokyo", value: 14 },
        ]
    },
    {
        name: "Africa",
        plots: [
            { name: "Kinshasa", value: 17.1 },
            { name: "Lagos", value: 14.9 },
            { name: "Cairo", value: 9.3 },
            { name: "Johannesburg", value: 5.6 },
            { name: "Giza", value: 5.6 },
            { name: "Khartoum", value: 5.3 },
            { name: "Abidjan", value: 5 },
            { name: "Alexandria", value: 4.9 },
            { name: "Dar es Salaam", value: 4.7 },
            { name: "Nairobi", value: 4.4 },
        ]
    },
    {
        name: "Europe",
        plots: [
            { name: "Moscow", value: 13 },
            { name: "London", value: 9 },
            { name: "Saint Petersburg", value: 5.4 },
            { name: "Berlin", value: 3.8 },
            { name: "Madrid", value: 3.3 },
            { name: "Kyiv", value: 3 },
            { name: "Rome", value: 2.7 },
            { name: "Paris", value: 2.1 },
            { name: "Minsk", value: 2 },
            { name: "Vienna", value: 1.9 }
        ]
    },
    {
        name: "America",
        plots: [
            { name: "Sao Paulo", value: 12.2 },
            { name: "Lima", value: 9.7 },
            { name: "Mexico City", value: 9.2 },
            { name: "New York", value: 8.4 },
            { name: "Bogota", value: 8 },
            { name: "Rio de Janeiro", value: 6.7 },
            { name: "Santiago", value: 6.2 },
            { name: "Los Angeles", value: 4 },
            { name: "Buenos Aires", value: 3 },
            { name: "Brasilia", value: 2.9 }
        ]
    },
    {
        name: "Australia & Oceania",
        plots: [
            { name: "Sydney", value: 5.4 },
            { name: "Melbourne", value: 5.1 },
            { name: "Brisbane", value: 2.6 },
            { name: "Perth", value: 2.1 },
            { name: "Auckland", value: 1.7 },
            { name: "Adelaide", value: 1.4 },
            { name: "Honolulu", value: 1 },
            { name: "Gold Coast", value: 0.7 },
            { name: "Newcastle-Maitland", value: 0.5 },
            { name: "Canberra", value: 0.46 },
        ]
    },
]);

const config = ref({
    useCssAnimation: true,
    userOptions: {
        show: true
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            height: 600,
            stripWidth: 120,
            padding: {
                top: 24,
                left: 64,
                right: 24,
                bottom: 64
            },
            grid: {
                show: true,
                stroke: "#cccccc",
                strokeWidth: 1,
                scaleSteps: 10,
                horizontalGrid: {
                    show: true,
                    stroke: "#cccccc",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                },
                verticalGrid: {
                    show: true,
                    stroke: "#cccccc",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                }
            },
            plots: {
                opacity: 0.5,
                radius: 20,
                stroke: "#FFFFFF",
                strokeWidth: 1,
                shape: "circle",
                gradient: {
                    show: true,
                    intensity: 40
                }
            },
            labels: {
                prefix: "",
                suffix: "M",
                bestPlotLabel: {
                    show: true,
                    showValue: true,
                    fontSize: 14,
                    color: "#2D353C",
                    rounding: 0,
                    offsetY: 0
                },
                axis: {
                    xLabel: "Continents",
                    xLabelOffsetY: 0,
                    yLabel: "Population in Millions",
                    yLabelOffsetX: 0,
                    fontSize: 14,
                    color: "#2D353C"
                },
                xAxisLabels: {
                    show: true,
                    color: "#2D353C",
                    fontSize: 14,
                    offsetY: 0
                },
                yAxisLabels: {
                    show: true,
                    color: "#2D353C",
                    fontSize: 14,
                    rounding: 0,
                    offsetX: 0
                }
            },
            title: {
                text: "Top 10 largest cities",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "By continent",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                roundingValue: 0,
                customFormat: null
            }
        }
    }
})

const darkModeConfig = ref({
    useCssAnimation: true,
    userOptions: {
        show: true
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCC",
            outline: "none",
            roundingValue: 0
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 600,
            stripWidth: 120,
            padding: {
                top: 24,
                left: 64,
                right: 24,
                bottom: 64
            },
            grid: {
                show: true,
                stroke: "#8A8A8A",
                strokeWidth: 1,
                scaleSteps: 10,
                horizontalGrid: {
                    show: true,
                    stroke: "#6A6A6A",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                },
                verticalGrid: {
                    show: true,
                    stroke: "#6A6A6A",
                    strokeWidth: 0.5,
                    strokeDasharray: 4
                }
            },
            plots: {
                opacity: 0.5,
                radius: 20,
                stroke: "#1A1A1A",
                strokeWidth: 1,
                shape: "circle",
                gradient: {
                    show: true,
                    intensity: 40
                }
            },
            labels: {
                prefix: "",
                suffix: "M",
                bestPlotLabel: {
                    show: true,
                    showValue: true,
                    fontSize: 14,
                    color: "#CCCCCC",
                    rounding: 0,
                    offsetY: 0
                },
                axis: {
                    xLabel: "Continents",
                    xLabelOffsetY: 0,
                    yLabel: "Population in Millions",
                    yLabelOffsetX: 0,
                    fontSize: 14,
                    color: "#CCCCCC"
                },
                xAxisLabels: {
                    show: true,
                    color: "#6A6A6A",
                    fontSize: 14,
                    offsetY: 0
                },
                yAxisLabels: {
                    show: true,
                    color: "#6A6A6A",
                    fontSize: 14,
                    rounding: 0,
                    offsetX: 0
                }
            },
            title: {
                text: "Top 10 largest cities",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "By continent",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                roundingValue: 0,
                customFormat: null
            }
        }
    }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
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
            <VueUiIcon name="chartStripPlot" stroke="#42d392" :strokeWidth="1.5" />
            VueUiStripPlot
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.stripPlot[store.lang] }}
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
            <VueUiStripPlot :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_strip_plot)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-strip-plot"/>
            <MakerLink to="VueUiStripPlot"/>
        </div>
        <Box showEmits showSlots showTooltip>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiStripPlotDataset[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            plots: [
                {
                    name: string;
                    value: number;
                },
                {...}
            ]
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
const <span class="text-black dark:text-app-green">dataset: VueUiStripPlotDataset[]</span> = [
    {
        name: "Asia",
        plots: [
            { name: "Shanghai", value: 24.9 },
            { name: "Beijing", value: 21.9 },
            { name: "Delhi", value: 16.8 },
            { name: "Guangzhou", value: 16.1 },
            { name: "Istanbul", value: 15.6 },
            { name: "Chengdu", value: 15.4 },
            { name: "Mumbai", value: 15.4 },
            { name: "Karachi", value: 14.9 },
            { name: "Shenzen", value: 14.7 },
            { name: "Tokyo", value: 14 },
        ]
    },
    {
        name: "Africa",
        plots: [
            { name: "Kinshasa", value: 17.1 },
            { name: "Lagos", value: 14.9 },
            { name: "Cairo", value: 9.3 },
            { name: "Johannesburg", value: 5.6 },
            { name: "Giza", value: 5.6 },
            { name: "Khartoum", value: 5.3 },
            { name: "Abidjan", value: 5 },
            { name: "Alexandria", value: 4.9 },
            { name: "Dar es Salaam", value: 4.7 },
            { name: "Nairobi", value: 4.4 },
        ]
    },
    {
        name: "Europe",
        plots: [
            { name: "Moscow", value: 13 },
            { name: "London", value: 9 },
            { name: "Saint Petersburg", value: 5.4 },
            { name: "Berlin", value: 3.8 },
            { name: "Madrid", value: 3.3 },
            { name: "Kyiv", value: 3 },
            { name: "Rome", value: 2.7 },
            { name: "Paris", value: 2.1 },
            { name: "Minsk", value: 2 },
            { name: "Vienna", value: 1.9 }
        ]
    },
    {
        name: "America",
        plots: [
            { name: "Sao Paulo", value: 12.2 },
            { name: "Lima", value: 9.7 },
            { name: "Mexico City", value: 9.2 },
            { name: "New York", value: 8.4 },
            { name: "Bogota", value: 8 },
            { name: "Rio de Janeiro", value: 6.7 },
            { name: "Santiago", value: 6.2 },
            { name: "Los Angeles", value: 4 },
            { name: "Buenos Aires", value: 3 },
            { name: "Brasilia", value: 2.9 }
        ]
    },
    {
        name: "Australia & Oceania",
        plots: [
            { name: "Sydney", value: 5.4 },
            { name: "Melbourne", value: 5.1 },
            { name: "Brisbane", value: 2.6 },
            { name: "Perth", value: 2.1 },
            { name: "Auckland", value: 1.7 },
            { name: "Adelaide", value: 1.4 },
            { name: "Honolulu", value: 1 },
            { name: "Gold Coast", value: 0.7 },
            { name: "Newcastle-Maitland", value: 0.5 },
            { name: "Canberra", value: 0.46 },
        ]
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
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiStripPlotConfig</code>
                </div>
<pre>
<code>
const <span class="text-app-blue">config: VueUiStripPlotConfig</span> = {
    useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true) 
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.chart.height" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.chart.height" @change="forceChartUpdate()">, (default: 600)
            stripWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="64" max="200" v-model="mutableConfigDarkMode.style.chart.stripWidth" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="64" max="200" v-model="mutableConfig.style.chart.stripWidth" @change="forceChartUpdate()">, (default: 120)
            padding: {
                top: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.top" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.top" @change="forceChartUpdate()">, (default: 24)
                left: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.left" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.left" @change="forceChartUpdate()">, (default: 64)
                right: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.right" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.right" @change="forceChartUpdate()">, (default: 24)
                bottom: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.bottom" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.bottom" @change="forceChartUpdate()">, (default: 64)
            },
            grid: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.show" @change="forceChartUpdate()">, (default: true) 
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.grid.stroke">, (default: "#CCCCCC")
                strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.chart.grid.strokeWidth" @change="forceChartUpdate()">, (default: 1)
                scaleSteps: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="2"  v-model="mutableConfigDarkMode.style.chart.grid.scaleSteps" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="2" v-model="mutableConfig.style.chart.grid.scaleSteps" @change="forceChartUpdate()">, (default: 10)
                horizontalGrid: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.horizontalGrid.show" @change="forceChartUpdate()">, (default: true) 
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.grid.horizontalGrid.stroke">, (default: "#CCCCCC")
                    strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.chart.grid.horizontalGrid.strokeWidth" @change="forceChartUpdate()">, (default: 0.5)
                    strokeDasharray: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.horizontalGrid.strokeDasharray" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfig.style.chart.grid.horizontalGrid.strokeDasharray" @change="forceChartUpdate()">, (default: 4)
                },
                verticalGrid: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.verticalGrid.show" @change="forceChartUpdate()">, (default: true) 
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.grid.verticalGrid.stroke">, (default: "#CCCCCC")
                    strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.chart.grid.verticalGrid.strokeWidth" @change="forceChartUpdate()">, (default: 0.5)
                    strokeDasharray: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfigDarkMode.style.chart.grid.verticalGrid.strokeDasharray" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfig.style.chart.grid.verticalGrid.strokeDasharray" @change="forceChartUpdate()">, (default: 4)
                }
            },
            plots: {
                opacity: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.plots.opacity" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.plots.opacity" @change="forceChartUpdate()">, (default: 0.5)
                radius: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="2" max="100"  v-model="mutableConfigDarkMode.style.chart.plots.radius" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="2" max="100" v-model="mutableConfig.style.chart.plots.radius" @change="forceChartUpdate()">, (default: 20)
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.plots.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.plots.stroke">, (default: "#FFFFFF")
                strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.plots.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.chart.plots.strokeWidth" @change="forceChartUpdate()">, (default: 1)
                shape: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.plots.shape"><option>circle</option><option>triangle</option><option>square</option><option>diamond</option><option>pentagon</option><option>hexagon</option><option>star</option></select><select v-else v-model="mutableConfig.style.chart.plots.shape"><option>circle</option><option>triangle</option><option>square</option><option>diamond</option><option>pentagon</option><option>hexagon</option><option>star</option></select> (default: "circle")
                gradient: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.plots.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.plots.gradient.show" @change="forceChartUpdate()">, (default: true) 
                    intensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.plots.gradient.intensity" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.plots.gradient.intensity" @change="forceChartUpdate()">, (default: 40)
                }
            },
            labels: {
                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.labels.prefix">, (default: "")
                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.labels.suffix">, (default: "")
                bestPlotLabel: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.bestPlotLabel.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.bestPlotLabel.show" @change="forceChartUpdate()">, (default: true) 
                    showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.bestPlotLabel.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.bestPlotLabel.showValue" @change="forceChartUpdate()">, (default: true) 
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.bestPlotLabel.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.bestPlotLabel.fontSize">, (default: 14)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.bestPlotLabel.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.bestPlotLabel.color">, (default: "#2D353C")
                    rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.labels.bestPlotLabel.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.labels.bestPlotLabel.rounding">, (default: 0)
                    offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.bestPlotLabel.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.bestPlotLabel.offsetY">, (default: 0)
                },
                axis: {
                    xLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.labels.axis.xLabel"><input v-else type="text" v-model="mutableConfig.style.chart.labels.axis.xLabel">, (default: "")
                    xLabelOffsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.axis.xLabelOffsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.axis.xLabelOffsetY">, (default: 0)
                    yLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.labels.axis.yLabel"><input v-else type="text" v-model="mutableConfig.style.chart.labels.axis.yLabel">, (default: "")
                    yLabelOffsetX: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.axis.yLabelOffsetX"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.axis.yLabelOffsetX">, (default: 0)
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.axis.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.axis.fontSize">, (default: 14)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.axis.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.axis.color">, (default: "#2D353C")
                },
                xAxisLabels: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.xAxisLabels.show" @change="forceChartUpdate()">, (default: true) 
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.xAxisLabels.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.xAxisLabels.fontSize">, (default: 14)
                    offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.xAxisLabels.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.xAxisLabels.offsetY">, (default: 0)
                },
                yAxisLabels: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.labels.yAxisLabels.show" @change="forceChartUpdate()">, (default: true) 
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.labels.yAxisLabels.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.labels.yAxisLabels.fontSize">, (default: 14)
                    rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.labels.yAxisLabels.rounding">, (default: 0)
                    offsetX: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.style.chart.labels.yAxisLabels.offsetX"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.style.chart.labels.yAxisLabels.offsetX">, (default: 0)
                }
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
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue" @change="forceChartUpdate()">, (default: 0)
                customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
            }
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true) 
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 300)
        columnNames: {
            series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")
            value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")
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
        }
    },
}
</code>
</pre>                
            </template>
            <template #tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiStripPlot
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  function selectDatapoint(datapoint) {
    console.log({ datapoint })
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

            const stripPlotChart = ref(null);
            const stripPlotDataset = ref([]);

            onMounted(() => {
                stripPlotDataset.value = stripPlotChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStripPlot
                ref="stripPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStripPlot
                ref="stripPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        stripPlotDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.stripPlotDataset = this.$refs.stripPlotChart.getData();
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
    &lt;VueUiStripPlot
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiStripPlot&gt;
</code>
</pre>                    
                <div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiStripPlot
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiStripPlot&gt;
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