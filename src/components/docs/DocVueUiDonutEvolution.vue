<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiDonutEvolution from "../themes/ThemesVueUiDonutEvolution.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";

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
        values: [55, 34, 21, 13, 8, 5, 8, 13, 21, 34, 55 ],
    },
    {
        name: "Serie 2",
        values: [1, 12, 24, 32, 5, 8, 13, 21, 34, 55, 89 ]
    },
    {
        name: "Serie 3",
        values: [16, 2, 3, 5, 28, 13, 21, 34, 55, 89, 134 ]
    },
    {
        name: "Serie 4",
        values: [5, null, 5, 5, 5, 5 ]
    }
]);

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            zoom: {
                show: true,
                color: "#CCCCCC",
                highlightColor: "#4A4A4A",
                fontSize: 14,
                useResetSlot: false,
            },
            layout: {
                height: 316,
                width: 500,
                padding: {
                    top: 24,
                    left: 48,
                    right: 48,
                    bottom: 24
                },
                grid: {
                show: true,
                stroke: "#e1e5e8",
                strokeWidth: 0.7,
                showVerticalLines: true,
                yAxis: {
                    dataLabels: {
                        show: true,
                        fontSize: 10,
                        color: "#2D353C",
                        roundingValue: 0,
                        offsetX: 0,
                        bold: false,
                        steps: 10
                    }
                },
                xAxis: {
                    dataLabels: {
                        color: "#2D353C",
                        show: true,
                        values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                        fontSize: 8,
                        showOnlyFirstAndLast: false,
                        offsetY: 0,
                        rotation: 0
                    }
                }
                },
                line: {
                    show: true,
                    stroke: "#CCCCCC",
                    strokeWidth: 4
                },
                highlighter: {
                    color: "#2D353C",
                    opacity: 5
                },
                dataLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#2D353C",
                    bold: false,
                    rounding: 0,
                    prefix: "",
                    suffix: "",
                    offsetY: 0
                }
            },
            title: {
                text: "Title",
                color: "#2D353C",
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
            legend: {
                color: "#2D353C",
                backgroundColor: "#F3F4F6",
                bold: false,
                show: true,
                fontSize: 16,
                roundingPercentage: 0,
                roundingValue: 0
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            period: "Period",
            total: "Total"
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
    }
})

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            zoom: {
                show: true,
                color: "#CCCCCC",
                highlightColor: '#4A4A4A',
                fontSize: 14,
                useResetSlot: false,
            },
            layout: {
                height: 316,
                width: 500,
                padding: {
                    top: 24,
                    left: 48,
                    right: 48,
                    bottom: 24
                },
                grid: {
                    show: true,
                    stroke: "#4A4A4A",
                    strokeWidth: 0.7,
                    showVerticalLines: true,
                    yAxis: {
                        dataLabels: {
                            show: true,
                            fontSize: 10,
                            color: "#CCCCCC",
                            roundingValue: 0,
                            offsetX: 0,
                            bold: false,
                            steps: 10
                        }
                    },
                    xAxis: {
                        dataLabels: {
                            show: true,
                            values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                            fontSize: 8,
                            showOnlyFirstAndLast: false,
                            color: "#CCCCCC",
                            offsetY: 0,
                            rotation: 0
                        }
                    }
                },
                line: {
                    show: true,
                    stroke: "#4A4A4A",
                    strokeWidth: 4
                },
                highlighter: {
                    color: "#FFFFFF",
                    opacity: 5
                },
                dataLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#CCCCCC",
                    bold: false,
                    rounding: 0,
                    prefix: "",
                    suffix: "",
                    offsetY: 0
                }
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
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            legend: {
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                bold: false,
                show: true,
                fontSize: 16,
                roundingPercentage: 0,
                roundingValue: 0
            }
        }
    },
    table: {
        show: false,
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
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
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
            <VueUiIcon name="chartDonutEvolution" stroke="#42d392" :strokeWidth="1.5" />
            VueUiDonutEvolution
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.donutEvolution[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[700px]'}`">
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
                    <VueUiDonutEvolution ref="donutEvol" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-donut-evolution"
            targetMaker="VueUiDonutEvolution"
            :configSource="mainConfig.vue_ui_donut_evolution"
        />

        <Box showEmits showSlots showThemes schema="vue_ui_donut_evolution">
            <template #tab0>
            
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiDonutEvolutionDatasetItem[]</code>
                </div>

                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            values: number[];
            color?: string; 
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
const <span class="text-black dark:text-app-green">dataset: VueUiDonutEvolutionDatasetItem[]</span> = [
    {
        name: "Serie 1",
        values: [55, 34, 21, 13, 8, 5, 8, 13, 21, 34, 55 ],
    },
    {
        name: "Serie 2",
        values: [1, 12, 24, 32, 5, 8, 13, 21, 34, 55, 89 ]
    },
    {
        name: "Serie 3",
        values: [16, 2, 3, 5, 28, 13, 21, 34, 55, 89, 134 ]
    },
    {
        name: "Serie 4",
        values: [5, null, 5, 5, 5, 5 ]
    }
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
                    TS type: <code class="text-app-blue">VueUiDonutEvolutionConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiDonutEvolutionConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <span>height: 316,</span>
                    <span>width: 512,</span>
                    <BaseDetails attr="dataLabels" :level="4" title="style.chart.layout.dataLabels">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.dataLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.dataLabels.fontSize" :min="8" :max="42"/>, (default: 10)</span>
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.dataLabels.color">, (default: "#2D353C")</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataLabels.bold" @change="forceChartUpdate()">, (default: false)</span>
                        <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.dataLabels.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.dataLabels.rounding" :min="0" :max="6"/>, (default: 0)</span>
                        <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.dataLabels.prefix">, (default: "")</span>
                        <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.dataLabels.suffix">, (default: "")</span>
                        <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.dataLabels.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.dataLabels.offsetY" :min="-100" :max="100"/>, (default: 0)</span>
                    </BaseDetails>
                    <BaseDetails attr="grid" :level="4" title="style.chart.layout.grid">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")</span>
                        <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.strokeWidth" :min="0" :max="12" :step="0.1"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.strokeWidth" :min="0" :max="12" :step="0.1"/>, (default: 0.7)</span>
                        <span>showVerticalLines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.showVerticalLines" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.showVerticalLines" @change="forceChartUpdate()">, (default: true)</span>
                        <BaseDetails attr="xAxis" :level="5" title="style.chart.layout.grid.xAxis">
                            <BaseDetails attr="dataLabels" :level="6" title="style.chart.layout.grid.xAxis.dataLabels">
                                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                                <span>values: string[],</span>
                                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.fontSize" :min="8" :max="42"/>, (default: 8)</span>
                                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.color">, (default: "#2D353C")</span>
                                <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.offsetY" :min="-100" :max="100"/>, (default: 0)</span>
                                <span>rotation: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.rotation" :min="-360" :max="360"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.rotation" :min="-360" :max="360"/>, (default: 0)</span>
                                <span>showOnlyFirstAndLast: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.showOnlyFirstAndLast" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.showOnlyFirstAndLast" @change="forceChartUpdate()">, (default: true)</span>
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="yAxis" :level="5" title="style.chart.layout.grid.yAxis">
                            <BaseDetails attr="dataLabels" :level="6" title="style.chart.layout.grid.yAxis.dataLabels">
                                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.fontSize" :min="8" :max="42"/>, (default: 10)</span>
                                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.color">, (default: "#2D353C")</span>
                                <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                                <span> offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.offsetX" :min="-100" :max="100"/>, (default: 0)</span>
                                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()">, (default: false)</span>
                                <span>steps: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.steps" :min="2" :max="20"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.steps" :min="2" :max="20"/>, (default: 10)</span>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="highlighter" :level="4" title="style.chart.layout.highlighter">
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.highlighter.color">, (default: "#2D353C")</span>
                        <span>opacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.opacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.highlighter.opacity">, (default: 5)</span>
                    </BaseDetails>
                    <BaseDetails attr="line" :level="4" title="style.chart.layout.line">
                        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.line.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.line.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.line.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.line.stroke">, (default: "#CCCCCC")</span>
                        <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.line.strokeWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.line.strokeWidth" :min="0" :max="24"/>, (default: 4)</span>
                    </BaseDetails>
                    <BaseDetails attr="padding" :level="4" title="style.chart.layout.padding">
                        <span>top: 24,</span>
                        <span>right: 48,</span>
                        <span>bottom: 24,</span>
                        <span>left: 48,</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)</span>
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                    <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
                    <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select></span>
                    <span>paddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <span>paddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
                        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="zoom" :level="3" title="style.chart.zoom">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.zoom.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.zoom.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.zoom.color" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.chart.zoom.color" @change="forceChartUpdate()">, (default: "#CCCCCC")</span>
                    <span>highlightColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.zoom.highlightColor" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.chart.zoom.highlightColor" @change="forceChartUpdate()">, (default: "#4A4A4A")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.zoom.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.zoom.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                    <span>useResetSlot: false; <span class="text-app-blue text-xs">// To use a custom slot for the reset feature (see slots tab)</span></span>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
            <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <span>period: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.period"><input v-else type="text" v-model="mutableConfig.table.columnNames.period">, (default: "Period")</span>
                <span>total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.total"><input v-else type="text" v-model="mutableConfig.table.columnNames.total">, (default: "Total")</span>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")</span>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")</span>
                <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
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
                <span> img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
                <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            color: string;
            length: number;
            name: string;
            uid: string;
            values: number[];
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

            const donutEvolutionChart = ref(null);
            const donutEvolutionDataset = ref([]);

            onMounted(() => {
                donutEvolutionDataset.value = donutEvolutionChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonutEvolution
                ref="donutEvolutionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonutEvolution
                ref="donutEvolutionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        donutEvolutionDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.donutEvolutionDataset = this.$refs.donutEvolutionChart.getData();
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
                </div>
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiDonutEvolution
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiDonutEvolution&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiDonutEvolution
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiDonutEvolution&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.resetButton[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiDonutEvolution
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #reset-action="{ reset }"&gt;
            &lt;button @click="reset()"&gt;Refresh&lt;/button&gt;
        &lt;/template&gt;
    &lt;/VueUiDonutEvolution&gt;
</code>
</pre>
            </template>
            <template #tab6>
                <ThemesVueUiDonutEvolution />
            </template>
        </Box>
    </div>
</template>