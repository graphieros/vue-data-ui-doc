<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";

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
});

const dataset = ref({
    percentage: 66.5,
    series: [
        {
            name:  'Serie 1 with a long name that should be shorter but we do not have the choice',
            value: 256,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 90
                },
                {
                    name: 'Sub serie 3',
                    value: 66
                }
            ]
        },
        {
            name: 'Serie 2',
            value: 128,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 28
                }
            ]
        },
        {
            name: 'Serie 3',
            value: 64,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 30
                },
                {
                    name: 'Sub serie 2',
                    value: 20
                },
                {
                    name: 'Sub serie 3',
                    value: 14
                }
            ]
        },
        {
            name: 'Serie 4',
            value: 32,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 12
                },
                {
                    name: 'Sub serie 2',
                    value: 12
                },
                {
                    name: 'Sub serie 3',
                    value: 8
                }
            ]
        },
        {
            name: 'Serie 5',
            value: 16,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 10
                },
                {
                    name: 'Sub serie 2',
                    value: 6
                }
            ]
        },
        {
            name: 'Serie 6',
            value: 8,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 6
                },
                {
                    name: 'Sub serie 2',
                    value: 2
                }
            ]
        }
    ]
})

const shapeOptions = ref([
    "bar",
    "tube"
]);

const isSeries = ref(true);

const config = ref({
    style: {
        fontFamily: "inherit",
        shape: "bar",
        chart: {
            animation: {
                use: true,
                speed: 1,
                acceleration: 1
            },
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            bar: {
                color: "#5f8bee",
                stroke: "#5f8bee",
                strokeWidth: 0.7,
                shadeColor: "#1A1A1A"
            },
            box: {
                stroke: "#CCCCCC",
                strokeWidth: 0.7,
                strokeDasharray: 2,
                dimensions: {
                    width: 128,
                    height: 256,
                    top: 27,
                    bottom: 9,
                    left: 24,
                    right: 24,
                    perspective: 18
                }
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
            legend: {
                showDefault: true,
                fontSize: 10,
                color: "#1A1A1A",
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0,
                prefix: "",
                suffix: "",
                hideUnderPercentage: 3
            },
            dataLabel: {
                show: true,
                bold: true,
                color: "#5f8bee",
                fontSize: 12,
                rounding: 1
            }
        }
    },
    userOptions: {
        show: true
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
            backgroundColor: "#FAFAFA",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
        }
    }
});

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        shape: "bar",
        chart: {
            animation: {
                use: true,
                speed: 1,
                acceleration: 1
            },
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            bar: {
                color: "#5f8bee",
                stroke: "#5f8bee",
                strokeWidth: 0.7,
                shadeColor: '#1A1A1A'
            },
            box: {
                stroke: "#5A5A5A",
                strokeWidth: 0.7,
                strokeDasharray: 2,
                dimensions: {
                    width: 128,
                    height: 256,
                    top: 27,
                    bottom: 9,
                    left: 24,
                    right: 24,
                    perspective: 18
                }
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
            legend: {
                showDefault: true,
                fontSize: 10,
                color: "#CCCCCC",
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0,
                prefix: "",
                suffix: "",
                hideUnderPercentage: 3
            },
            dataLabel: {
                show: true,
                bold: true,
                color: "#5f8bee",
                fontSize: 12,
                rounding: 1
            }
        }
    },
    userOptions: {
        show: true
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

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    key.value += 1;
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
            <VueUiIcon name="chart3dBar" stroke="#42d392" :strokeWidth="1.5" />
            VueUi3dBar
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.bar3d[store.lang] }}
        </p>
        <div :class="`mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : isSeries ? 'max-w-[400px]' : 'max-w-[200px]'}`">
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
            <div :class="`mx-auto ${isFixed ? 'max-w-[150px]' : 'w-full'}`">
            
                <VueUi3dBar :dataset="isSeries ? dataset : { percentage: dataset.percentage }" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </div>
            <div class="w-full mx-auto flex flex-row place-items-center justify-center mt-10 gap-3">
                <label for="is_series">Stack mode</label>
                <input id="is_series" type="checkbox" v-model="isSeries">
            </div>
        </div>
        <div class="w-full mx-auto max-w-[600px] text-gray-500 mb-10 mt-5 text-center">
            {{ translations.docs.comments.bar3d.mode[store.lang] }}
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_3d_bar)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-3d-bar"/>
            <MakerLink to="VueUi3dBar"/>
        </div>

        <Box showEmits showSlots>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUi3dBarDataset</code>
                </div>
                <div class="w-full overflow-x-auto mb-6 border-gray-700">
Percentage mode:                    
<pre>
<code>
    {
        percentage: number; (from 0 to 100)
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUi3dBarDataset</span> = {
    percentage: 66.5
}
</code>
</pre>
<div class="border-b border-gray-700 mb-6"></div>                
Stack mode:
<pre>
<code>
    {
        series: [
            {
                name: string;
                value: number;
                color?: string;
                breakdown?: [ <span class="text-gray-500">// will display donuts in the legend</span>
                    {
                        name: string;
                        value: number;
                    }
                ]
            },
            {...}
        ]
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUi3dBarDataset</span> = {
    series: [
        {
            name:  'Serie 1 with a long name that should be shorter but we do not have the choice',
            value: 256,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 90
                },
                {
                    name: 'Sub serie 3',
                    value: 66
                }
            ]
        },
        {
            name: 'Serie 2',
            value: 128
        },
        {
            name: 'Serie 3',
            value: 64
        },
        {
            name: 'Serie 4',
            value: 32
        },
        {
            name: 'Serie 5',
            value: 16
        },
        {
            name: 'Serie 6',
            value: 8
        }
    ]
}
</code>
</pre>  
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUi3dBarConfig</code>
                </div>

                <div class="overflow-w-auto">
<pre>
<code>
    const <span class="text-black dark:text-app-blue">config: VueUi3dBarConfig</span> = {
        customPalette: []; // string[]
        style: {
            fontFamily: "inherit",
            shape:  <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.shape">
            <option>bar</option>
            <option>tube</option>
          </select><select v-else v-model="mutableConfig.style.shape">
            <option>bar</option>
            <option>tube</option>
          </select>, (default: "bar")
            chart: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
                animation: { <span class="text-gray-500">// percentage mode only</span>
                    use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)
                    speed: 1,
                    acceleration: 1,
                },
                bar: { 
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.bar.color"><input v-else type="color" v-model="mutableConfig.style.chart.bar.color">,  (default: "#5f8bee") <span class="text-gray-500">// percentage mode only</span>
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.bar.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.bar.stroke">,  (default: "#5f8bee") <span class="text-gray-500">// percentage mode only</span>
                    strokeWidth: <input v-if="isDarkMode" type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.bar.strokeWidth"><input v-else type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfig.style.chart.bar.strokeWidth">, (default: 0.7) <span class="text-gray-500">// percentage mode only</span>
                    shadeColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.bar.shadeColor"><input v-else type="color" v-model="mutableConfig.style.chart.bar.shadeColor">,  (default: "#2D353C") <span class="text-gray-500">// stack mode only</span>
                },
                box: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.box.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.box.stroke">, (default: "#CCCCCC") <span class="text-gray-500">// percentage mode only</span>
                    strokeWidth: <input v-if="isDarkMode" type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.box.strokeWidth"><input v-else type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfig.style.chart.box.strokeWidth">, (default: 0.7) <span class="text-gray-500">// percentage mode only</span>
                    strokeDasharray: <input v-if="isDarkMode" type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.box.strokeDasharray"><input v-else type="range" min="0" max="24" class="accent-app-blue" v-model="mutableConfig.style.chart.box.strokeDasharray">, (default: 2) <span class="text-gray-500">// percentage mode only</span>
                    dimensions: {
                        width: <input v-if="isDarkMode" type="range" min="64" max="512" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.box.dimensions.width"><input v-else type="range" min="0" max="512" class="accent-app-blue" v-model="mutableConfig.style.chart.box.dimensions.width">, (default: 128)
                        height: <input v-if="isDarkMode" type="range" min="64" max="512" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.box.dimensions.height"><input v-else type="range" min="0" max="512" class="accent-app-blue" v-model="mutableConfig.style.chart.box.dimensions.height">, (default: 256)
                        top: 27,
                        bottom: 9,
                        left: 24,
                        right: 24,
                        perspective: 18
                    }
                },
                title: {
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                    subtitle: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "#A1A1A1")
                        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "")
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                    }
                },
                legend: { <span class="text-gray-500">// stack mode only</span>
                    showDefault: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.showDefault" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.showDefault" @change="forceChartUpdate()">, (default: true)
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 10)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">,  (default: "#2D353C")
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue" @change="forceChartUpdate"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate">, (default: 0)
                    roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage" @change="forceChartUpdate"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate">, (default: 0)
                    prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.prefix" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.legend.prefix" @change="forceChartUpdate">, (default: "")
                    suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.suffix" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.legend.suffix" @change="forceChartUpdate">, (default: "")
                    hideUnderPercentage: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.legend.hideUnderPercentage" @change="forceChartUpdate"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.legend.hideUnderPercentage" @change="forceChartUpdate">, (default: 3)
                },
                dataLabel: { <span class="text-gray-500">// percentage mode only</span>
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.dataLabel.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.dataLabel.show" @change="forceChartUpdate()">, (default: true)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.dataLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.dataLabel.bold" @change="forceChartUpdate()">, (default: true)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.dataLabel.color"><input v-else type="color" v-model="mutableConfig.style.chart.dataLabel.color">,  (default: "#5f8bee")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.dataLabel.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.dataLabel.fontSize">, (default: 12)
                    rounding:  <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.dataLabel.rounding" @change="forceChartUpdate"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.dataLabel.rounding" @change="forceChartUpdate">, (default: 1)
                }
            }
        },
        userOptions: {
            <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        },
        table: { <span class="text-gray-500">// stack mode only</span>
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
            responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 300)
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
                </div>
            </template>
            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
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
    &lt;VueUi3dBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUi3dBar&gt;
</code>
</pre>                    
            </template>
        </Box>
    </div>
</template>