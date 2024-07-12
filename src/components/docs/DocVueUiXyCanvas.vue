<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import ucXyCanvas from "../../components/useCases/ux-xy-canvas.vue"
import ThemesVueUiXyCanvas from "../themes/ThemesVueUiXyCanvas.vue";

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
        name: "Series 1",
        series: [-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)",
        scaleSteps: 5,
        dataLabels: false
    },
    {
        name: "Series 2",
        series: [55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)",
        useArea: true,
        dataLabels: false,
        scaleSteps: 5,
    },
    {
        name: "Series 3",
        series: [64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)",
        scaleSteps: 5,
    },
])

const config = ref({
    theme: "",
    customPalette: [],
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "Arial",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            aspectRatio: "14 / 9",
            stacked: false,
            stackGap: 20,
            scale: {
                ticks: 10
            },
            zoom: {
                show: true,
                color: "#CCCCCC",
                highlightColor: "#4A4A4A",
                fontSize: 14,
                useResetSlot: false
            },
            selector: {
                show: true,
                color: "#2D353C",
                dashed: true
            },
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#F3F4F6",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#e1e5e8",
                borderWidth: 1
            },
            legend: {
                backgroundColor: "#F3F4F6",
                color: "#2D353C",
                show: true,
                fontSize: 16,
                bold: false
            },
            title: {
                text: "Title",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            grid: {
                y: {
                    showAxis: true,
                    axisColor: "#2D353C",
                    axisThickness: 2,
                    axisName: "",
                    axisLabels: {
                        show: true,
                        fontSizeRatio: 1,
                        color: "#2D353C",
                        offsetX: 0,
                        rounding: 1,
                        prefix: "",
                        suffix: ""
                    },
                    verticalLines: {
                        show: true,
                        color: "#CCCCCC",
                        hideUnderXLength: 20
                    },
                    timeLabels: {
                        show: true,
                        fontSizeRatio: 0.8,
                        values: [],
                        rotation: 0,
                        offsetY: 30,
                        color: "#2D353C"
                    }
                },
                x: {
                    showAxis: true,
                    axisColor: "#2D353C",
                    axisThickness: 2,
                    axisName: "",
                    horizontalLines: {
                        show: true,
                        color: "#CCCCCC",
                        alternate: true,
                        opacity: 20
                    }
                },
                zeroLine: {
                    show: true,
                    color: "#2D353C",
                    dashed: true
                }
            },
            line: {
                plots: {
                    show: true,
                    radiusRatio: 1
                }
            },
            area: {
                opacity: 60
            },
            dataLabels: {
                show: true,
                fontSizeRatio: 1,
                useSerieColor: true,
                color: "#2D353C",
                offsetY: -12
            },
            paddingProportions: {
                top: 0.1,
                left: 0.1,
                right: 0.05,
                bottom: 0.1
            }
        }
    },
    table: {
        show: false,
        rounding: 1,
        responsiveBreakpoint: 400,
        columnNames: {
            period: "Period",
            total: "Total"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        }
    }
})

const darkModeConfig = ref({
    theme: "",
    customPalette: [],
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "Satoshi",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            aspectRatio: "14 / 9",
            stacked: false,
            stackGap: 20,
            scale: {
                ticks: 10
            },
            zoom: {
                show: true,
                color: "#6A6A6A",
                highlightColor: "#4A4A4A",
                fontSize: 14,
                useResetSlot: false,
            },
            selector: {
                show: true,
                color: "#6A6A6A",
                dashed: true
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#8A8A8A",
                borderWidth: 1
            },
            legend: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                show: true,
                fontSize: 16,
                bold: false
            },
            title: {
                text: "Title",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            grid: {
                y: {
                    showAxis: true,
                    axisColor: "#6A6A6A",
                    axisThickness: 2,
                    axisName: "Y Axis",
                    axisLabels: {
                        show: true,
                        fontSizeRatio: 1,
                        color: "#6A6A6A",
                        offsetX: 0,
                        rounding: 1,
                        prefix: "",
                        suffix: ""
                    },
                    verticalLines: {
                        show: true,
                        color: "#4A4A4A",
                        hideUnderXLength: 20
                    },
                    timeLabels: {
                        show: true,
                        fontSizeRatio: 0.8,
                        values: [],
                        rotation: 0,
                        offsetY: 30,
                        color: "#6A6A6A"
                    }
                },
                x: {
                    showAxis: true,
                    axisColor: "#4A4A4A",
                    axisThickness: 2,
                    axisName: "X Axis",
                    horizontalLines: {
                        show: true,
                        color: "#3A3A3A",
                        alternate: true,
                        opacity: 20
                    }
                },
                zeroLine: {
                    show: true,
                    color: "#6A6A6A",
                    dashed: true
                }
            },
            line: {
                plots: {
                    show: true,
                    radiusRatio: 1
                }
            },
            area: {
                opacity: 60
            },
            dataLabels: {
                show: true,
                fontSizeRatio: 1,
                useSerieColor: true,
                color: "#CCCCCC",
                offsetY: -12
            },
            paddingProportions: {
                top: 0.1,
                left: 0.1,
                right: 0.05,
                bottom: 0.1
            }
        }
    },
    table: {
        show: false,
        rounding: 1,
        responsiveBreakpoint: 400,
        columnNames: {
            period: "Period",
            total: "Total"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        }
    }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    forceChartUpdate()
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
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartLine" stroke="#42d392" :strokeWidth="1.5" />
            VueUiXyCanvas
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.xyCanvas[store.lang] }}
        </p>
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-2/3'}`">
            <button @click="fixChart"
                class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed" />
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible" />
                    <div
                        class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <VueDataUi v-if="!!dataset" component="VueUiXyCanvas" :dataset="dataset"
                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button
                class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
                @click="copyToClipboard(mainConfig.vue_ui_xy_canvas)">
                <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang] }}
            </button>
            <GitHubLink link="vue-ui-xy-canvas" />
            <!-- <MakerLink to="VueUiXy"/> -->
        </div>

        <Box showEmits showSlots showUseCases showThemes showTooltip>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiXyCanvasDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
    [
        {
            name: string;
            series: number[];
            type?: "line" | "bar" | "plot";
            useArea?: boolean;
            dataLabels?: boolean;
            scaleSteps?: number;
            prefix?: string;
            suffix?: string;
            rounding?: number;
            autoScaling?: boolean;
            stackRatio?: number; // if used on all datapoints, must sum up to 1
        },
        {...}
    ]
</code>
</pre>
                </div>

                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
                    <pre class="break-words">
<code class="break-words">
const <span class="text-black dark:text-app-green">dataset: VueUiXyCanvasDatasetItem[]</span> = [
    {
        name: "Series 1",
        series: [-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)",
        scaleSteps: 5,
        dataLabels: false
    },
    {
        name: "Series 2",
        series: [55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)",
        useArea: true,
        dataLabels: false,
        scaleSteps: 5,
    },
    {
        name: "Series 3",
        series: [64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)",
        scaleSteps: 5,
    },  
]
</code>
</pre>
                </div>
            </template>

            <template #tab1>
                <div class="w-full overflow-x-auto">
                    <div class="flex gap-2">
                        <button @click="resetDefault"
                            class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                            class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                            <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                        </button>
                    </div>

                    <div class="mt-6">
                        TS type: <code class="text-app-blue">VueUiXyCanvasConfig</code>
                    </div>
                    <pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiXyCanvasConfig</span> = {
    theme: ""; ("zen" | "hack" | "concrete" | "")
    customPalette: []; // string[]
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show">, (default: true)
    },
    style: {
        fontFamily: "Arial",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor" @input="forceChartUpdate">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.color" @input="forceChartUpdate">, (default:"#2D353C")
            aspectRatio: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.aspectRatio" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.aspectRatio" @change="forceChartUpdate" >, (default: "12 / 9")
            stacked: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.stacked" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.stacked" @change="forceChartUpdate">, (default: true)
            stackGap: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.stackGap" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.stackGap" @change="forceChartUpdate">, (default: 20)
            scale: {
                ticks: <input v-if="isDarkMode" type="number" min="2" max="20" v-model="mutableConfigDarkMode.style.chart.scale.ticks" @change="forceChartUpdate"><input v-else type="number" min="2" max="20" v-model="mutableConfig.style.chart.scale.ticks" @change="forceChartUpdate">, (default: 10)
            },
            zoom: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.zoom.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.zoom.show" @change="forceChartUpdate">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.zoom.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.zoom.color" @input="forceChartUpdate">, (default: "#CCCCCC")
                highlightColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.zoom.highlightColor" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.zoom.highlightColor" @input="forceChartUpdate">, (default: "#4A4A4A")
                fontSize: <input v-if="isDarkMode" type="number" min="8" max="42" v-model="mutableConfigDarkMode.style.chart.zoom.fontSize" @change="forceChartUpdate"><input v-else type="number" min="8" max="42" v-model="mutableConfig.style.chart.zoom.fontSize" @change="forceChartUpdate">, (default: 14)
                useResetSlot: false // To use a custom slot for the reset feature (see slots tab)
            },
            selector: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.selector.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.selector.show" @change="forceChartUpdate">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.selector.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.selector.color" @input="forceChartUpdate">, (default: "#2D353C") 
                dashed: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.selector.dashed" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.selector.dashed" @change="forceChartUpdate">, (default: true)
            },
            tooltip: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color" @input="forceChartUpdate">, (default: "#2D353C") 
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor" @input="forceChartUpdate">, (default: "#FFFFFF") 
                fontSize: <input v-if="isDarkMode" type="number" min="8" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize" @change="forceChartUpdate"><input v-else type="number" min="8" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize" @change="forceChartUpdate">, (default: 14)
                customFormat: null, // default behavior. To customize, check out the 'custom tooltip' tab
                borderRadius: <input v-if="isDarkMode" type="number" min="0" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate"><input v-else type="number" min="0" max="42" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate">, (default: 4)
                borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor" @input="forceChartUpdate"><input v-else type="borderColor" v-model="mutableConfig.style.chart.tooltip.e1e5e8r" @input="forceChartUpdate">, (default: "#e1e5e8") 
                borderWidth: <input v-if="isDarkMode" type="number" min="0" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate"><input v-else type="number" min="0" max="42" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate">, (default: 1)
            },
            legend: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor" @input="forceChartUpdate">, (default: "#FFFFFF") 
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color" @input="forceChartUpdate">, (default: "#2D353C") 
                fontSize: <input v-if="isDarkMode" type="number" min="8" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize" @change="forceChartUpdate"><input v-else type="number" min="8" max="42" v-model="mutableConfig.style.chart.legend.fontSize" @change="forceChartUpdate">, (default: 16)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate">, (default: false)
            },
            title: {
                text: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate" >, (default: "")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.color" @input="forceChartUpdate">, (default: "#2D353C") 
                fontSize: <input v-if="isDarkMode" type="number" min="8" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize" @change="forceChartUpdate"><input v-else type="number" min="8" max="42" v-model="mutableConfig.style.chart.title.fontSize" @change="forceChartUpdate">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color" @input="forceChartUpdate">, (default: "#A1A1A1") 
                    text: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text" @change="forceChartUpdate" >, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="8" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" @change="forceChartUpdate"><input v-else type="number" min="8" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize" @change="forceChartUpdate">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate">, (default: false)
                }
            },
            grid: {
                y: {
                    showAxis: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.y.showAxis" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.y.showAxis" @change="forceChartUpdate">, (default: true)
                    axisColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.y.axisColor" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.grid.y.axisColor" @input="forceChartUpdate">, (default: "#2D353C") 
                    axisThickness: <input v-if="isDarkMode" type="number" min="0" max="42" v-model="mutableConfigDarkMode.style.chart.grid.y.axisThickness" @change="forceChartUpdate"><input v-else type="number" min="0" max="42" v-model="mutableConfig.style.chart.grid.y.axisThickness" @change="forceChartUpdate">, (default: 2)
                    axisName: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.grid.y.axisName" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.grid.y.axisName" @change="forceChartUpdate" >, (default: "")
                    axisLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.y.axisLabels.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.y.axisLabels.show" @change="forceChartUpdate">, (default: true)
                        fontSizeRatio: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.grid.y.axisLabels.fontSizeRatio" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.grid.y.axisLabels.fontSizeRatio" @change="forceChartUpdate">, (default: 1)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.y.axisLabels.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.grid.y.axisLabels.color" @input="forceChartUpdate">, (default: "#2D353C") 
                        offsetX: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.chart.grid.y.axisLabels.offsetX" @change="forceChartUpdate"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.chart.grid.y.axisLabels.offsetX" @change="forceChartUpdate">, (default: 0)
                        rounding: <input v-if="isDarkMode" type="number" min="0" max="6" v-model="mutableConfigDarkMode.style.chart.grid.y.axisLabels.rounding" @change="forceChartUpdate"><input v-else type="number" min="0" max="6" v-model="mutableConfig.style.chart.grid.y.axisLabels.rounding" @change="forceChartUpdate">, (default: 0)
                        prefix: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.grid.y.axisLabels.prefix" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.grid.y.axisLabels.prefix" @change="forceChartUpdate" >, (default: "")
                        suffix: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.grid.y.axisLabels.suffix" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.grid.y.axisLabels.suffix" @change="forceChartUpdate" >, (default: "")
                    },
                    verticalLines: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.y.verticalLines.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.y.verticalLines.show" @change="forceChartUpdate">, (default: true)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.y.verticalLines.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.grid.y.verticalLines.color" @input="forceChartUpdate">, (default: "#CCCCCC")
                        hideUnderXLength: <input v-if="isDarkMode" type="number" min="0" max="42" v-model="mutableConfigDarkMode.style.chart.grid.y.verticalLines.hideUnderXLength" @change="forceChartUpdate"><input v-else type="number" min="0" max="42" v-model="mutableConfig.style.chart.grid.y.verticalLines.hideUnderXLength" @change="forceChartUpdate">, (default: 20)
                    },
                    timeLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.y.timeLabels.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.y.timeLabels.show" @change="forceChartUpdate">, (default: true)
                        fontSizeRatio: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.grid.y.timeLabels.fontSizeRatio" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.grid.y.timeLabels.fontSizeRatio" @change="forceChartUpdate">, (default: 0.8)
                        values: [], // Example: ["JAN", "FEB", "MAR"...] or ["01/01/24", "01/02/24",...]
                        rotation: <input v-if="isDarkMode" type="number" min="-360" max="360" v-model="mutableConfigDarkMode.style.chart.grid.y.timeLabels.rotation" @change="forceChartUpdate"><input v-else type="number" min="-360" max="360" v-model="mutableConfig.style.chart.grid.y.timeLabels.rotation" @change="forceChartUpdate">, (default: 0)
                        offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.chart.grid.y.timeLabels.offsetY" @change="forceChartUpdate"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.chart.grid.y.timeLabels.offsetY" @change="forceChartUpdate">, (default: 30)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.y.timeLabels.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.grid.y.timeLabels.color" @input="forceChartUpdate">, (default: "#2D353C")
                    }
                },
                x: {
                    showAxis: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.x.showAxis" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.x.showAxis" @change="forceChartUpdate">, (default: true)
                    axisColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.x.axisColor" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.grid.x.axisColor" @input="forceChartUpdate">, (default: "#2D353C") 
                    axisThickness: <input v-if="isDarkMode" type="number" min="0" max="42" v-model="mutableConfigDarkMode.style.chart.grid.x.axisThickness" @change="forceChartUpdate"><input v-else type="number" min="0" max="42" v-model="mutableConfig.style.chart.grid.x.axisThickness" @change="forceChartUpdate">, (default: 2)
                    axisName: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.grid.x.axisName" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.grid.x.axisName" @change="forceChartUpdate" >, (default: "")
                    horizontalLines: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.x.horizontalLines.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.x.horizontalLines.show" @change="forceChartUpdate">, (default: true)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.x.horizontalLines.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.grid.x.horizontalLines.color" @input="forceChartUpdate">, (default: "#CCCCCC")
                        alternate: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.x.horizontalLines.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.x.horizontalLines.show" @change="forceChartUpdate">, (default: true)
                        opacity: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.grid.x.horizontalLines.opacity" @change="forceChartUpdate"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.grid.x.horizontalLines.opacity" @change="forceChartUpdate">, (default: 20)
                    }
                },
                zeroLine: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.zeroLine.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.zeroLine.show" @change="forceChartUpdate">, (default: true)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.grid.zeroLine.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.grid.zeroLine.color" @input="forceChartUpdate">, (default: "#2D353C") 
                    dashed: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.grid.zeroLine.dashed" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.grid.zeroLine.dashed" @change="forceChartUpdate">, (default: true)
                }
            },
            line: {
                plots: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.line.plots.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.line.plots.show" @change="forceChartUpdate">, (default: true)
                    radiusRatio: <input v-if="isDarkMode" type="number" min="0" max="2" step="0.01" v-model="mutableConfigDarkMode.style.chart.line.plots.radiusRatio" @change="forceChartUpdate"><input v-else type="number" min="0" max="2" step="0.01" v-model="mutableConfig.style.chart.line.plots.radiusRatio" @change="forceChartUpdate">, (default: 1)
                }
            },
            area: {
                opacity: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.area.opacity" @change="forceChartUpdate"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.area.opacity" @change="forceChartUpdate">, (default: 60)
            },
            dataLabels: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.dataLabels.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.dataLabels.show" @change="forceChartUpdate">, (default: true)
                fontSizeRatio: <input v-if="isDarkMode" type="number" min="0" max="2" step="0.01" v-model="mutableConfigDarkMode.style.chart.dataLabels.fontSizeRatio" @change="forceChartUpdate"><input v-else type="number" min="0" max="2" step="0.01" v-model="mutableConfig.style.chart.dataLabels.fontSizeRatio" @change="forceChartUpdate">, (default: 1)
                useSerieColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.dataLabels.useSerieColor" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.dataLabels.useSerieColor" @change="forceChartUpdate">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.dataLabels.color" @input="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.dataLabels.color" @input="forceChartUpdate">, (default: "#2D353C") 
                offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.chart.dataLabels.offsetY" @change="forceChartUpdate"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.chart.dataLabels.offsetY" @change="forceChartUpdate">, (default: -12)
            },
            paddingProportions: {
                top: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.paddingProportions.top" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.paddingProportions.top" @change="forceChartUpdate">, (default: 0.1)
                left: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.paddingProportions.left" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.paddingProportions.left" @change="forceChartUpdate">, (default: 0.1)
                right: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.paddingProportions.right" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.paddingProportions.right" @change="forceChartUpdate">, (default: 0.05)
                bottom: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.paddingProportions.bottom" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.paddingProportions.bottom" @change="forceChartUpdate">, (default: 0.1)
            }
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate">, (default: false)
        rounding: <input v-if="isDarkMode" type="number" min="0" max="6" v-model="mutableConfigDarkMode.table.rounding" @change="forceChartUpdate"><input v-else type="number" min="0" max="6" v-model="mutableConfig.table.rounding" @change="forceChartUpdate">, (default: 0)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
        columnNames: {
            period: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.period"  @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.table.columnNames.period"  @change="forceChartUpdate()">, (default: "Period")
            total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.total"  @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.table.columnNames.total"  @change="forceChartUpdate()">, (default: "Total")
        },
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"  @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor"  @change="forceChartUpdate()">, (default: "#FAFAFA"),
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"  @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.table.th.color"  @change="forceChartUpdate()">, (default: "#2D353C"),
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"  @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.table.th.outline"  @change="forceChartUpdate()">, (default: "1px solid #e1e5e8")
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"  @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor"  @change="forceChartUpdate()">, (default: "#FAFAFA"),
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"  @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.table.td.color"  @change="forceChartUpdate()">, (default: "#2D353C"),
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"  @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.table.td.outline"  @change="forceChartUpdate()">, (default: "1px solid #e1e5e8")
        },
    }
}
</code>
</pre>
                </div>
            </template>

            <!-- EMITS -->
            <template #tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            name: string;
            values: number[];
            color: string;
            type: "bar" | "line" | "plot"
        },
        {...}
    ]
    </code>
    </pre>

    <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-gray-600 dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const xyChart = ref(null);
            const xyDataset = ref([]);

            onMounted(() => {
                xyDataset.value = xyChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXyCanvas
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXyCanvas
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        xyDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.xyDataset = this.$refs.xyChart.getData();
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

            <!-- SLOTS -->
            <template #tab3>
              
                <div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiXyCanvas
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre> 

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiXyCanvas
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.resetButton[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiXyCanvas
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #reset-action="{ reset }"&gt;
            &lt;button @click="reset()"&gt;Refresh&lt;/button&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>
            </template>

            <!-- TOOLTIP -->
            <template #tab4>
                <pre>
<code>
<span class="text-gray-400">config.chart.tooltip.customFormat</span>

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

            USE CASES
            <template #tab5>
                <ucXyCanvas />
            </template>

            <!-- THEMES -->
            <template #tab6>
               <ThemesVueUiXyCanvas/>
            </template>

        </Box>
    </div>
</template>