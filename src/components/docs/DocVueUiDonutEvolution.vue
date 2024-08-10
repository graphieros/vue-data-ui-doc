<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiDonutEvolution from "../themes/ThemesVueUiDonutEvolution.vue";

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
            <VueUiIcon name="chartDonutEvolution" stroke="#42d392" :strokeWidth="1.5" />
            VueUiDonutEvolution
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.donutEvolution[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[700px]'}`">
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
            <VueUiDonutEvolution ref="donutEvol" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_donut_evolution)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-donut-evolution"/>
            <MakerLink to="VueUiDonutEvolution" />
        </div>

        <Box showEmits showSlots showThemes>
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
<pre>
<code>
const <span class="text-app-blue">config: VueUiDonutEvolutionConfig</span> = {
  theme: ""; ("zen" | "hack" | "concrete" | "")
  customPalette: []; // string[]
  style: {
    customPalette: []; // string[]
    fontFamily: "inherit",
    chart: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
      zoom: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.zoom.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.zoom.show" @change="forceChartUpdate()">, (default: true)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.zoom.color" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.chart.zoom.color" @change="forceChartUpdate()">, (default: "#CCCCCC")
            highlightColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.zoom.highlightColor" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.chart.zoom.highlightColor" @change="forceChartUpdate()">, (default: "#4A4A4A")
            fontSize: <input v-if="isDarkMode" type="number" min="1" max="50" v-model="mutableConfigDarkMode.style.chart.zoom.fontSize"><input v-else type="number" min="1" max="50" v-model="mutableConfig.style.chart.zoom.fontSize">, (default: 14)
            useResetSlot: false; // To use a custom slot for the reset feature (see slots tab)
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
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.show" @change="forceChartUpdate()">, (default: true)
          stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")
          strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="6" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.strokeWidth"><input v-else type="number" min="0" max="6" step="0.1" v-model="mutableConfig.style.chart.layout.grid.strokeWidth">, (default: 0.7)
          showVerticalLines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.showVerticalLines" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.showVerticalLines" @change="forceChartUpdate()">, (default: true)
          yAxis: {
            dataLabels: {
              show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()">, (default: true)
              fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.fontSize">, (default: 10)
              color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.color">, (default: "#2D353C")
              roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.roundingValue">, (default: 0)
              offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.offsetX"><input v-else type="number" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.offsetX">, (default: 0)
              bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()">, (default: false)
              steps: <input v-if="isDarkMode" type="number" min="2" max="50" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.dataLabels.steps"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.grid.yAxis.dataLabels.steps">, (default: 10)
            }
          },
          xAxis: {
            dataLabels: {
              show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()">, (default: true)
              values: string[], 
              fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.fontSize">, (default: 8)
              color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.color">, (default: "#2D353C")
              offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.offsetY"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.offsetY">, (default: 0)
              rotation: <input v-if="isDarkMode" type="number" min="-360" max="360" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.dataLabels.offsetY"><input v-else type="number" min="-360" max="360" v-model="mutableConfig.style.chart.layout.grid.xAxis.dataLabels.offsetY">, (default: 0)
            }
          }
        },
        line: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.line.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.line.show" @change="forceChartUpdate()">, (default: true)
          stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.line.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.line.stroke">, (default: "#CCCCCC")
          strokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="42" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.line.strokeWidth"><input v-else type="number" min="0.1" max="42" step="0.1" v-model="mutableConfig.style.chart.layout.line.strokeWidth">, (default: 4)
        },
        highlighter: {
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.highlighter.color">, (default: "#2D353C")
          opacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.opacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.highlighter.opacity">, (default: 5)
        },
        dataLabels: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataLabels.show" @change="forceChartUpdate()">, (default: true)
          fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.dataLabels.fontSize">, (default: 10)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.dataLabels.color">, (default: "#2D353C")
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataLabels.bold" @change="forceChartUpdate()">, (default: false)
          rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.dataLabels.rounding">, (default: 0)
          prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.dataLabels.prefix">, (default: "")
          suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.dataLabels.suffix">, (default: "")
          offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.dataLabels.offsetY"><input v-else type="number" v-model="mutableConfig.style.chart.layout.dataLabels.offsetY">, (default: 0)
        }
      },
      title: {
        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
        fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
        subtitle: {
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
          text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
          fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
        }
      },
      legend: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
        fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
        roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage">, (default: 0)
        roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue">, (default: 0)
      }
    }
  },
  table: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
    responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
    columnNames: {
        period: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.period"><input v-else type="text" v-model="mutableConfig.table.columnNames.period">, (default: "Period")
        total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.total"><input v-else type="text" v-model="mutableConfig.table.columnNames.total">, (default: "Total")
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
},
  userOptions: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    buttons: {
        pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)
        img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)
        csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)
        table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)
        fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)
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