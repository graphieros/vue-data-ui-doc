<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon, ThumbUpIcon, ThumbDownIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
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

const dataset = ref([
    {
        name: "Series 1",
        series: [ -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)"
    },
    {
        name: "Series 2",
        series: [ 55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)",
        useProgression: true,
        dataLabels: false,
    },
    {
        name: "Series 3",
        series: [ 64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)"
    },
    {
        name: "Target",
        series: [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        type: "line",
        color: "#404040",
        dashed: true,
        useTag: "start",
        dataLabels: false,
    },
]);

const config = ref({
    useCanvas: false,
    chart: {
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        height: 300,
        width: 500,
        highlighter: {
            color: "#1A1A1A",
            opacity: 10,
        },
        zoom: {
            show: true,
            color: "#42d392"
        },
        padding: {
            top:  36,
            right: 12,
            bottom: 36,
            left: 48
        },
        grid: {
            stroke: "#C4C4C4",
            showVerticalLines: false,
            labels: {
                show: true,
                color: "#1A1A1A",
                fontSize: 12,
                axis: {
                    yLabel: "yLabel",
                    xLabel: "xLabel",
                    fontSize: 12
                },
                xAxisLabels: {
                    color: "#1A1A1A",
                    show: true,
                    showOnlyFirstAndLast: false,
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
                    fontSize: 6,
                }
            }
        },
        labels: {
            fontSize: 10,
        },
        legend: {
            show: true,
            color: "#1A1A1A",
            useDiv: true,
            fontSize: 16
        },
        title: {
           show:true,
           text: "Title",
           color: "#1A1A1A",
           fontSize: 20,
           bold: true,
           subtitle: {
            fontSize: 16,
            color: "#565656",
            text: "Subtitle"
           }
        },
        tooltip: {
            color: "#1A1A1A",
            backgroundColor: "#FFFFFF",
            show: true,
            showValue: true,
            showPercentage: false,
            roundingValue: 0,
            roundingPercentage: 0,
        },
        userOptions: {
            show: true,
            title:"options",
            labels: {
                dataLabels: "Show datalabels",
                titleInside: "Title inside",
                legendInside: "Legend inside",
                showTable: "Show table"
            }
        },
    },
    bar: {
        borderRadius: 2,
        useGradient: true,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        }
    },
    line: {
        radius: 3,
        useGradient: true,
        strokeWidth: 2,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        }

    },
    plot: {
        radius: 3,
        useGradient: true,
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        }
    },
    table: {
        rounding: 0,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
        }
    }
});

const darkModeConfig = ref({
    useCanvas: false,
    chart: {
        backgroundColor: "#1A1A1A",
        color: "#c8c8c8",
        height: 300,
        width: 500,
        highlighter: {
            color: "#e1e5e8",
            opacity: 10,
        },
        zoom: {
            show: true,
            color: "#42d392"
        },
        padding: {
            top:  36,
            right: 12,
            bottom: 36,
            left: 48
        },
        grid: {
            stroke: "#e1e5e8",
            showVerticalLines: false,
            labels: {
                show: true,
                color: "#c8c8c8",
                fontSize: 12,
                axis: {
                    yLabel: "yLabel",
                    xLabel: "xLabel",
                    fontSize: 12
                },
                xAxisLabels: {
                    color: "#c8c8c8",
                    show: true,
                    showOnlyFirstAndLast: false,
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
                    fontSize: 6,
                }
            }
        },
        labels: {
            fontSize: 10,
        },
        legend: {
            show: true,
            color: "#c8c8c8",
            useDiv: true,
            fontSize: 16
        },
        title: {
           show:true,
           text: "Title",
           color: "#c8c8c8",
           fontSize: 20,
           bold: true,
           subtitle: {
            fontSize: 16,
            color: "#c8c8c8",
            text: "Subtitle"
           }
        },
        tooltip: {
            color: "#FFFFFF",
            backgroundColor: "#1A1A1A",
            show: true,
            showValue: true,
            showPercentage: false,
            roundingValue: 0,
            roundingPercentage: 0,
        },
        userOptions: {
            show: true,
            title:"options",
            labels: {
                dataLabels: "Show datalabels",
                titleInside: "Title inside",
                legendInside: "Legend inside",
                showTable: "Show table"
            }
        },
    },
    bar: {
        borderRadius: 2,
        useGradient: true,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }
    },
    line: {
        radius: 3,
        useGradient: true,
        strokeWidth: 2,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }

    },
    plot: {
        radius: 3,
        useGradient: true,
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }
    },
    table: {
        rounding: 0,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "1px solid #e1e5e8"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "1px solid #e1e5e8",
        }
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

const useCanvas = ref(false);

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

function toggleUseCanvas() {
    if (useCanvas.value) {
        mutableConfig.value.useCanvas = true;
        mutableConfig.value.chart.height = 600;
        mutableConfig.value.chart.width = 1000;
        mutableConfig.value.chart.padding = {
            top: 72,
            right: 48,
            left: 92,
            bottom: 72
        };
        mutableConfig.value.chart.grid.labels.fontSize = 20;
        mutableConfig.value.chart.grid.labels.axis.fontSize = 24;
        mutableConfig.value.chart.grid.labels.xAxisLabels.fontSize = 12;
        mutableConfig.value.chart.labels.fontSize = 20;
        mutableConfig.value.line.strokeWidth = 4;
        mutableConfig.value.line.radius = 6;
        mutableConfig.value.plot.radius = 6;
        
        mutableConfigDarkMode.value.useCanvas = true;
        mutableConfigDarkMode.value.chart.height = 600;
        mutableConfigDarkMode.value.chart.width = 1000;
        mutableConfigDarkMode.value.chart.padding = {
            top: 72,
            right: 48,
            left: 92,
            bottom: 72
        };
        mutableConfigDarkMode.value.chart.grid.labels.fontSize = 20;
        mutableConfigDarkMode.value.chart.grid.labels.axis.fontSize = 24;
        mutableConfigDarkMode.value.chart.grid.labels.xAxisLabels.fontSize = 12;
        mutableConfigDarkMode.value.chart.labels.fontSize = 20;
        mutableConfigDarkMode.value.line.strokeWidth = 4;
        mutableConfigDarkMode.value.line.radius = 6;
        mutableConfigDarkMode.value.plot.radius = 6;

        forceChartUpdate();
    } else {
        resetDefault();
        forceChartUpdate();
    }
}

</script>


<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiXy</h1>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-2/3'}`">
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
            <VueUiXy :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green hover:shadow-xl transition-all" @click="copyToClipboard(mainConfig.vue_ui_xy)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
        </div>
        <div class="w-full mx-auto max-w-[500px] flex flex-col p-6 border border-app-blue rounded-md bg-[#5f8bee12]">
            <span class="dark:text-blue-300">
                v 1.8.1 : {{ translations.docs.comments.xy.canvas.description[store.lang] }}
            </span>
            <details class="mt-2">
                <summary class="cursor-pointer select-none">
                    {{  translations.docs.comments.xy.canvas.moreInfo[store.lang] }}
                </summary>
                    <div class="text-sm my-2 pb-4 border-b border-app-blue">
                        {{ translations.docs.comments.xy.canvas.details[store.lang] }}
                    </div>
                    <div class="grid grid-cols-12 place-items-center gap-4">
                        <div class="col-span-2"></div>
                        <div class="col-span-5 flex flex-row place-items-center gap-2"><ThumbUpIcon class="text-app-green" />{{ translations.docs.comments.xy.canvas.advantage[store.lang] }}</div>
                        <div class="col-span-5 flex flex-row place-items-center gap-2"><ThumbDownIcon class="text-app-orange" />{{ translations.docs.comments.xy.canvas.drawbacks[store.lang] }}</div>
                        
                        <div class="col-span-2">SVG</div>
                        <div class="col-span-5 bg-[#42d39233] rounded-md p-2 text-xs w-full h-full flex place-items-center shadow" v-html="translations.docs.comments.xy.canvas.svgAdvantage[store.lang]"></div>
                        <div class="col-span-5 bg-[#ff640033] rounded-md p-2 text-xs w-full h-full flex place-items-center shadow" v-html="translations.docs.comments.xy.canvas.svgDrawbacks[store.lang]"></div>
                    </div>
                    <div class="grid grid-cols-12 place-items-center gap-4 mt-4 pb-4 border-b border-app-blue mb-4">
                        <div class="col-span-2">CANVAS</div>
                        <div class="col-span-5 bg-[#42d39233] rounded-md p-2 text-xs w-full h-full flex place-items-center shadow" v-html="translations.docs.comments.xy.canvas.canvasAdvantages[store.lang]"></div>
                        <div class="col-span-5 bg-[#ff640033] rounded-md p-2 text-xs w-full h-full flex place-items-center shadow" v-html="translations.docs.comments.xy.canvas.canvasDrawbacks[store.lang]"></div>
                    </div>
            </details>
            <div class="w-full flex flex-row place-items-center justify-center gap-2 mt-2">
                <input id="useCanvas" class="accent-app-blue" type="checkbox" v-model="useCanvas" @change="toggleUseCanvas">
                <label for="useCanvas" class="font-black dark:text-blue-300 cursor-pointer">Use canvas</label>
            </div>
        </div>
        <Box showEmits>
            <template v-slot:tab0>

            {{ translations.docs.datastructure[store.lang] }}
            <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            series: number[];
            type: "bar" | "line" | "plot";
            <span class="text-gray-600 dark:text-app-orange">// {{ translations.docs.comments.xy.type[store.lang] }}</span>
            color: string; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
            dashed: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.dashed[store.lang] }}</span>
            useTag: "start" | "end"; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.useTag[store.lang] }}</span>
            dataLabels: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.dataLabels[store.lang] }}</span>
            useProgression: boolean; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.useProgression[store.lang] }}</span>
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
const <span class="text-black dark:text-app-green">dataset</span> = [
    {
        name: <span class="text-app-blue">"Series 1",</span>
        series: <span class="text-app-blue">[-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],</span>
        type:<span class="text-app-blue"><select v-model="mutableDataset[0].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-blue">"rgb(95,139,238)",</span>
    },
    {
        name: <span class="text-app-green">"Series 2",</span>
        series: <span class="text-app-green">[55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],</span>
        type:<span class="text-app-green"><select v-model="mutableDataset[1].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-green">"rgb(66,211,146)"</span>
        useProgression: <span class="text-app-green">true,</span>
        dataLabels: <span class="text-app-green">false</span>
    },
    {
        name: <span class="text-app-orange">"Series 3",</span>
        series: <span class="text-app-orange">[64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],</span>
        type:<span class="text-app-orange"><select v-model="mutableDataset[2].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-orange">"rgb(255,100,0)"</span>
    },
    {
        name: <span class="text-gray-500">"Target",</span> 
        series: <span class="text-gray-500">[ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],</span>
        type: <span class="text-gray-500">"line",</span>
        color: <span class="text-gray-500">"#404040",</span>
        dashed: <span class="text-gray-500">true,</span>
        useTag: <span class="text-gray-500">"start",</span>
        dataLabels: <span class="text-gray-500">false,</span>
    },
];
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

                    <p class="mt-3 text-gray-400">
                        {{  translations.docs.cssOverride[store.lang]  }}
                    </p>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config</span> = {
        chart: {
            useCanvas: {{ useCanvas }},
            fontFamily: "inherit",
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.color"><input v-else type="color" v-model="mutableConfig.chart.color">, (default:"#2D353C")
            height: <input v-if="isDarkMode" type="number" min="50" max="2000" v-model="mutableConfigDarkMode.chart.height"><input v-else type="number" min="50" max="2000" v-model="mutableConfig.chart.height">, (default: 300)
            width: <input v-if="isDarkMode" type="number" min="50" max="2000" v-model="mutableConfigDarkMode.chart.width"><input v-else type="number" min="50" max="2000" v-model="mutableConfig.chart.width">, (default: 500)
            highlighter: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.highlighter.color"><input v-else type="color" v-model="mutableConfig.chart.highlighter.color">, (default:"#2D353C")
                opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.highlighter.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.chart.highlighter.opacity">, (default: 5)
            },
            padding: {
                top: <input v-if="isDarkMode" type="number" min="0" max="200" v-model="mutableConfigDarkMode.chart.padding.top"><input v-else type="number" min="0" max="200" v-model="mutableConfig.chart.padding.top">, (default: 36)
                right: <input v-if="isDarkMode" type="number" min="0" max="200" v-model="mutableConfigDarkMode.chart.padding.right"><input v-else type="number" min="0" max="200" v-model="mutableConfig.chart.padding.right">, (default: 12)
                bottom: <input v-if="isDarkMode" type="number" min="0" max="200" v-model="mutableConfigDarkMode.chart.padding.bottom"><input v-else type="number" min="0" max="200" v-model="mutableConfig.chart.padding.bottom">, (default: 12)
                left: <input v-if="isDarkMode" type="number" min="0" max="200" v-model="mutableConfigDarkMode.chart.padding.left"><input v-else type="number" min="0" max="200" v-model="mutableConfig.chart.padding.left">, (default: 48)
            },
            zoom: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.zoom.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.zoom.show" @change="forceChartUpdate()">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.zoom.color"><input v-else type="color" v-model="mutableConfig.chart.zoom.color">, (default: "#2D353C")
            },
            grid: {
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.grid.stroke"><input v-else type="color" v-model="mutableConfig.chart.grid.stroke">, (default: "#E1E5E8"),
                showVerticalLines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.showVerticalLines"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.showVerticalLines"> (default: false)
                labels: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.show">, (default: true)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.grid.labels.color"><input v-else type="color" v-model="mutableConfig.chart.grid.labels.color">, (default: "#2D353C"),
                    fontSize: <input v-if="isDarkMode" type="number" min="1" max="50" v-model="mutableConfigDarkMode.chart.grid.labels.fontSize"><input v-else type="number" min="1" max="50" v-model="mutableConfig.chart.grid.labels.fontSize">, (default: 12)
                    axis: {
                        yLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.grid.labels.axis.yLabel"><input v-else type="text" v-model="mutableConfig.chart.grid.labels.axis.yLabel">, (default: "")
                        xLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.grid.labels.axis.xLabel"><input v-else type="text" v-model="mutableConfig.chart.grid.labels.axis.xLabel">, (default: "")
                        fontSize: <input v-if="isDarkMode" type="number" min="1" max="50" v-model="mutableConfigDarkMode.chart.grid.labels.axis.fontSize"><input v-else type="number" min="1" max="50" v-model="mutableConfig.chart.grid.labels.axis.fontSize">, (default: 12)
                    },
                    xAxisLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.xAxisLabels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.xAxisLabels.show">, (default: true)
                        showOnlyFirstAndLast: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.grid.labels.xAxisLabels.showOnlyFirstAndLast"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.xAxisLabels.showOnlyFirstAndLast">, (default: false)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.grid.labels.xAxisLabels.color"><input v-else type="color" v-model="mutableConfig.chart.grid.labels.xAxisLabels.color">, (default: "#2D353C"),
                        fontSize: <input v-if="isDarkMode" type="number" min="1" max="50" v-model="mutableConfigDarkMode.chart.grid.labels.xAxisLabels.fontSize"><input v-else type="number" min="1" max="50" v-model="mutableConfig.chart.grid.labels.xAxisLabels.fontSize">, (default: 6)
                        values: <span class="text-app-blue">string[]</span>,
                    }
                }
            },
            legend: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.legend.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.legend.show">, (default: true),
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.legend.color"><input v-else type="color" v-model="mutableConfig.chart.legend.color">, (default: "#2D353C"),
                fontSize: <input v-if="isDarkMode" type="number" min="1" max="50" v-model="mutableConfigDarkMode.chart.legend.fontSize"><input v-else type="number" min="1" max="50" v-model="mutableConfig.chart.legend.fontSize">, (default: 16)
                useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.legend.useDiv"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.legend.useDiv">, (default: true),
            },
            title: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.title.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.title.show">, (default: true)
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.title.text"><input v-else type="text" v-model="mutableConfig.chart.title.text">, (default: "")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.title.color"><input v-else type="color" v-model="mutableConfig.chart.title.color">, (default: "#2D353C"),
                fontSize: <input v-if="isDarkMode" type="number" min="1" max="50" v-model="mutableConfigDarkMode.chart.title.fontSize"><input v-else type="number" min="1" max="50" v-model="mutableConfig.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.title.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.title.bold">, (default: true)
                subtitle: {
                    fontSize: <input v-if="isDarkMode" type="number" min="1" max="50" v-model="mutableConfigDarkMode.chart.title.subtitle.fontSize"><input v-else type="number" min="1" max="50" v-model="mutableConfig.chart.title.subtitle.fontSize">, (default: 16)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.chart.title.subtitle.color">, (default: "#808080"),
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.chart.title.subtitle.text">, (default: "")
                }
            },
            tooltip: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.tooltip.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.show">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.chart.tooltip.color">, (default: "#2D353C"),
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.chart.tooltip.backgroundColor">, (default: "#FFFFFF"),
                showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.tooltip.showValue"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.showValue">, (default: true)
                showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.tooltip.showPercentage"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.showPercentage">, (default: false)
            },
            userOptions: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.chart.userOptions.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.show">, (default: true)
                title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.title"><input v-else type="text" v-model="mutableConfig.chart.userOptions.title">, (default: "options")
                labels: {
                    dataLabels: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.labels.dataLabels"><input v-else type="text" v-model="mutableConfig.chart.userOptions.labels.dataLabels">, (default: "Show datalabels")
                    titleInside: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.labels.titleInside"><input v-else type="text" v-model="mutableConfig.chart.userOptions.labels.titleInside">, (default: "Title inside")
                    legendInside: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.labels.legendInside"><input v-else type="text" v-model="mutableConfig.chart.userOptions.labels.legendInside">, (default: "Legend inside")
                    showTable: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.chart.userOptions.labels.showTable"><input v-else type="text" v-model="mutableConfig.chart.userOptions.labels.showTable">, (default: "Show table")
                },
            },
        },
        <span class="text-gray-600 dark:text-app-green">// use the following for the config of a specific chart type:</span>
        bar: {
            borderRadius: <input v-if="isDarkMode" type="number" min="0" max="50" v-model="mutableConfigDarkMode.bar.borderRadius"><input v-else type="number" min="0" max="50" v-model="mutableConfig.bar.borderRadius">, (default: 2)
            useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.useGradient">, (default: true)
            labels: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bar.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.labels.show">, (default: false)
                offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.bar.labels.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.bar.labels.offsetY">, (default: -6)
                rounding: <input type="number" min="0" max="5" v-model="mutableConfig.bar.labels.rounding">, (default: 0)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.bar.labels.color"><input v-else type="color" v-model="mutableConfig.bar.labels.color">, (default: "#2D353C"),
            }
        },
        line: {
            radius: <input v-if="isDarkMode" type="number" min="0" max="50" v-model="mutableConfigDarkMode.line.radius"><input v-else type="number" min="0" max="50" v-model="mutableConfig.line.radius">, (default: 3)
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="50" v-model="mutableConfigDarkMode.line.strokeWidth"><input v-else type="number" min="0" max="50" v-model="mutableConfig.line.strokeWidth">, (default: 2)
            labels: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.line.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.line.labels.show">, (default: false)
                offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.line.labels.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.line.labels.offsetY">, (default: -6)
                rounding: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.line.labels.rounding"><input v-else type="number" min="0" max="5" v-model="mutableConfig.line.labels.rounding">, (default: 0)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.line.labels.color"><input v-else type="color" v-model="mutableConfig.line.labels.color">, (default: "#2D353C"),
            }
        },
        plot: {
            radius: <input v-if="isDarkMode" type="number" min="0" max="50" v-model="mutableConfigDarkMode.plot.radius"><input v-else type="number" min="0" max="50" v-model="mutableConfig.plot.radius">, (default: 3)
            labels: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.plot.labels.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.plot.labels.show">, (default: false)
                offsetY: <input v-if="isDarkMode" type="number" min="-50" max="50" v-model="mutableConfigDarkMode.plot.labels.offsetY"><input v-else type="number" min="-50" max="50" v-model="mutableConfig.plot.labels.offsetY">, (default: -6)
                rounding: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.plot.labels.rounding"><input v-else type="number" min="0" max="5" v-model="mutableConfig.plot.labels.rounding">, (default: 0)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.plot.labels.color"><input v-else type="color" v-model="mutableConfig.plot.labels.color">, (default: "#2D353C"),
            }
        },
        table: {
            rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.rounding">, (default: 0)
            th: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA"),
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C"),
                outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
            },
            td: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FAFAFA"),
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C"),
                outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
            }
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
            values: number[];
            color: string;
            type: "bar" | "line" | "plot"
        },
        {...}
    ]
    </code>
    </pre>
                <div><code><b>@selectX</b></code></div>
                <div class="text-gray-400 pl-5">{{  translations.docs.emits.xy.selectX[store.lang]  }}</div>
    <pre>
    <code>
    {
        dataset: [
            {
                name: string;
                value: number;
                color: string;
                type: "bar" | "line" | "plot"
            },
            {...}
        ],
        index: number;
        indexLabel: string;
    }
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
            &lt;VueUiXy
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXy
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
                    <div><code>generateXls</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateXls[store.lang] }}</div>
                </div>
            </template>
        </Box>
    </div>
</template>