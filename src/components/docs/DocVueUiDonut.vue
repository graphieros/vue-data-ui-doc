<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
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
        name: "Serie 1",
        color: "#ff6400",
        values: [300, 1]
    },
]);

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                useDiv: false,
                labels: {
                    dataLabels: {
                        show: true,
                        hideUnderValue: 3,
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
                    strokeWidth: 84
                },
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
            }
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            dataLabels: "Show datalabels",
            useDiv: "Title & legend inside",
            showTable: "Show table"
        }
    },
    translations: {
        total: "Total",
        average: "Average",
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #e1e5e8"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #e1e5e8",
            roundingValue: 0,
            roundingPercentage: 0
        }
    }
});

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
                useDiv: false,
                labels: {
                    dataLabels: {
                        show: true,
                        hideUnderValue: 3,
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
                    strokeWidth: 84
                },
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
            }
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            dataLabels: "Show datalabels",
            useDiv: "Title & legend inside",
            showTable: "Show table"
        }
    },
    translations: {
        total: "Total",
        average: "Average",
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiDonut</h1>
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
            <VueUiDonut :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_donut)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
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
const <span class="text-black dark:text-app-green">dataset</span> = [
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
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
<pre>
<code>
const <span class="text-app-blue">config</span> = {
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.useGradient">, (default: true)
            gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.gradientIntensity">, (default: 40)
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: true) <span class="text-gray-600 dark:text-app-blue">// {{ translations.docs.comments.donut.layoutTitle[store.lang] }}</span>
                labels: {
                    dataLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)
                        hideUnderValue: <input v-if="isDarkMode" type="number" min="0" max="10" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.hideUnderValue"><input v-else type="number" min="0" max="10" v-model="mutableConfig.style.chart.layout.labels.dataLabels.hideUnderValue">, (default: 3) <span class="text-gray-600 dark:text-app-blue">// {{ translations.docs.comments.donut.hideUnderValue[store.lang]}} </span>
                    },
                    percentage: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.percentage.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.percentage.color">, (default: "#2D353C")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.percentage.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.percentage.bold" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.percentage.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.percentage.fontSize">, (default: 18)
                    },
                    name: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.name.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.name.color">, (default: "#2D353C")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.name.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.name.bold" @change="forceChartUpdate()">, (default: false)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.name.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.name.fontSize">, (default: 14)
                    },
                    hollow: {
                        total: {
                            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.total.show" @change="forceChartUpdate()">, (default: true)
                            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.total.bold" @change="forceChartUpdate()">, (default: false)
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.total.fontSize">, (default: 18)
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.total.color">, (default: "#AAAAAA")
                            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.total.text">, (default: "Total")
                            offsetY: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.offsetY"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.total.offsetY">, (default: 0)
                            value: {
                                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.bold" @change="forceChartUpdate()">, (default: true)
                                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.value.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.fontSize">, (default: 18)
                                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.value.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.color">, (default: "#AAAAAA")
                                offsetY: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.value.offsetY"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.offsetY">, (default: 0)
                                rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.value.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.rounding">, (default: 0)
                                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.value.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.suffix">, (default: "")
                                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.total.value.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.prefix">, (default: "")
                            }
                        },
                        average: {
                            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.average.show" @change="forceChartUpdate()">, (default: true)
                            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.average.bold" @change="forceChartUpdate()">, (default: false)
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.average.fontSize">, (default: 18)
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.average.color">, (default: "#AAAAAA")
                            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.average.text">, (default: "Average")
                            offsetY: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.offsetY"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.average.offsetY">, (default: 0)
                            value: {
                                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.bold" @change="forceChartUpdate()">, (default: true)
                                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.value.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.fontSize">, (default: 18)
                                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.value.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.color">, (default: "#AAAAAA")
                                offsetY: <input v-if="isDarkMode" type="number" min="-30" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.value.offsetY"><input v-else type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.offsetY">, (default: 0)
                                rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.value.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.rounding">, (default: 0)
                                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.value.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.suffix">, (default: "")
                                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.average.value.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.prefix">, (default: "")
                            }
                        }
                    },
                    donut: {
                        strokeWidth: <input v-if="isDarkMode" type="number" min="6" max="100" v-model="mutableConfigDarkMode.style.chart.layout.donut.strokeWidth"><input v-else type="number" min="6" max="100" v-model="mutableConfig.style.chart.layout.donut.strokeWidth">, (default: 64)
                    }
                },
                legend: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate()">, (default: 0)
                    roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
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
                }
            }
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            dataLabels: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.dataLabels"><input v-else type="text" v-model="mutableConfig.userOptions.labels.dataLabels">, (default: "Show datalabels")
            useDiv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.useDiv"><input v-else type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside")
            showTable: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.showTable"><input v-else type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
        }
    },
    translations: {
        total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.total"><input v-else type="text" v-model="mutableConfig.translations.total">, (default: "Total")
        average: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.average"><input v-else type="text" v-model="mutableConfig.translations.average">, (default: "Average")
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
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
                    <div><code>generateXls</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateXls[store.lang] }}</div>
                </div>
                </div>
            </template>
        </Box>
    </div>
</template>