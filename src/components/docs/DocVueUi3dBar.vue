<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUi3dBar from "../themes/ThemesVueUi3dBar.vue";
import { useConfig } from "../../assets/useConfig";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseDetails from "../BaseDetails.vue";

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
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
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
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
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
            <VueUiIcon name="chart3dBar" stroke="#42d392" :strokeWidth="1.5" />
            VueUi3dBar
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.bar3d[store.lang] }}
        </p>
        <div :class="`mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : isSeries ? 'max-w-[400px]' : 'max-w-[200px]'}`">
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
                <Suspense>
                    <template #default>
                        <VueUi3dBar :dataset="isSeries ? dataset : { percentage: dataset.percentage }" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>
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

        <Box showEmits showSlots showThemes schema="vue_ui_3d_bar">
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUi3dBarConfig">
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <span>shape:  <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.shape">
            <option>bar</option>
            <option>tube</option>
            </select><select v-else v-model="mutableConfig.style.shape">
            <option>bar</option>
            <option>tube</option>
            </select>, (default: "bar")</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <BaseDetails attr="animation" :level="3" title="style.chart.animation">
                    <span>use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)</span>
                    <span>speed: 1,</span>
                    <span>acceleration: 1,</span>
                </BaseDetails>
                <BaseDetails attr="bar" :level="3" title="style.chart.bar">
                    <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.bar.color"><input v-else type="color" v-model="mutableConfig.style.chart.bar.color">,  (default: "#5f8bee") <span class="text-app-blue text-xs">// percentage mode only</span></span>
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.bar.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.bar.stroke">,  (default: "#5f8bee") <span class="text-app-blue text-xs">// percentage mode only</span></span>
                    <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.bar.strokeWidth" :min="0" :max="12" :step="0.1"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.bar.strokeWidth" :min="0" :max="12" :step="0.1"/></span>
                    <span>shadeColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.bar.shadeColor"><input v-else type="color" v-model="mutableConfig.style.chart.bar.shadeColor">,  (default: "#2D353C") <span class="text-app-blue text-xs">// stack mode only</span></span>
                </BaseDetails>
                <BaseDetails attr="box" :level="3" title="style.chart.box">
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.box.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.box.stroke">, (default: "#CCCCCC") <span class="text-app-blue text-xs">// percentage mode only</span></span>
                    <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.strokeWidth" :min="0" :max="12" :step="0.1"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.strokeWidth" :min="0" :max="12" :step="0.1"/></span>
                    <span>strokeDasharray: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.strokeDasharray" :min="0" :max="12" :step="0.1"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.strokeDasharray" :min="0" :max="12" :step="0.1"/></span>
                    <BaseDetails attr="dimensions" :level="4" title="style.chart.box.dimensions">
                        <span>width: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.dimensions.width" :min="100" :max="512"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.dimensions.width" :min="100" :max="512"/>, (default: 128)</span>
                        <span>height: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.dimensions.height" :min="100" :max="512"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.dimensions.height" :min="100" :max="512"/>, (default: 256)</span>
                        <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.dimensions.top" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.dimensions.top" :min="0" :max="200"/>, (default: 27)</span>
                        <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.dimensions.right" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.dimensions.right" :min="0" :max="200"/>, (default: 24)</span>
                        <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.dimensions.bottom" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.dimensions.bottom" :min="0" :max="200"/>, (default: 9)</span>
                        <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.dimensions.left" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.dimensions.left" :min="0" :max="200"/>, (default: 24)</span>
                        <span>perspective: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.box.dimensions.perspective" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.box.dimensions.perspective" :min="0" :max="200"/>, (default: 18)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="dataLabel" :level="3" title="style.chart.dataLabel">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.dataLabel.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.dataLabel.show" @change="forceChartUpdate()">, (default: true) <span class="text-app-blue text-xs">// percentage mode only</span></span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.dataLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.dataLabel.bold" @change="forceChartUpdate()">, (default: true) <span class="text-app-blue text-xs">// percentage mode only</span></span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.dataLabel.color"><input v-else type="color" v-model="mutableConfig.style.chart.dataLabel.color">,  (default: "#5f8bee") <span class="text-app-blue text-xs">// percentage mode only</span></span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.dataLabel.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.dataLabel.fontSize" :min="8" :max="42"/>, (default: 12) <span class="text-app-blue text-xs">// percentage mode only</span></span>
                    <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.dataLabel.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.dataLabel.rounding" :min="0" :max="6"/>, (default: 12) <span class="text-app-blue text-xs">// percentage mode only</span></span>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span>showDefault: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.showDefault" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.showDefault" @change="forceChartUpdate()">, (default: true) <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.fontSize" :min="8" :max="42"/>, (default: 12) <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">,  (default: "#2D353C") <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false) <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingValue" :min="0" :max="6"/>, (default: 0) <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingPercentage" :min="0" :max="6"/>, (default: 0) <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.prefix" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.legend.prefix" @change="forceChartUpdate">, (default: "") <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.suffix" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.legend.suffix" @change="forceChartUpdate">, (default: "") <span class="text-app-blue text-xs">// stack mode only</span></span>
                    <span>hideUnderPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.hideUnderPercentage" :min="1" :max="20"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.hideUnderPercentage" :min="1" :max="20"/>, (default: 3) <span class="text-app-blue text-xs">// stack mode only</span></span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "")</span>
                    <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.color" @change="forceChartUpdate">, (default: "#2D353C")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color" @change="forceChartUpdate">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.subtitle.text" @change="forceChartUpdate">, (default: "")</span>
                        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                        <span> bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false) <span class="text-app-blue text-xs">// stack mode only</span></span>
            <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400) <span class="text-app-blue text-xs">// stack mode only</span></span>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <span>series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series") <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span>value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value") <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span> percentage: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.percentage"><input v-else type="text" v-model="mutableConfig.table.columnNames.percentage">, (default: "Percentage") <span class="text-app-blue text-xs">// stack mode only</span></span>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF") <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C") <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span> outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none") <span class="text-app-blue text-xs">// stack mode only</span></span>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF") <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C") <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none") <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingValue" :min="0" :max="6"/>, (default: 0) <span class="text-app-blue text-xs">// stack mode only</span></span>
                <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingPercentage" :min="0" :max="6"/>, (default: 0) <span class="text-app-blue text-xs">// stack mode only</span></span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span> <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span> pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
                <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
                <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>

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

            <template #tab6>
                <ThemesVueUi3dBar />
            </template>
        </Box>
    </div>
</template>