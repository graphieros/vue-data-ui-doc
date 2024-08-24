<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import ConfigAttribute from "../ConfigAttribute.vue";
import UcDonut from "../useCases/uc-donut.vue";
import ThemesVueUiDonut from "../themes/ThemesVueUiDonut.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";

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
    },
]);

const darkModeConfig = ref({
    responsive: false,
    useBlurOnHover: true,
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                labels: {
                    dataLabels: {
                        show: true,
                        useLabelSlots: false,
                        hideUnderValue: 3,
                        prefix: "",
                        suffix: ""
                    },
                    value: {
                        rounding: 0,
                        show: true,
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
                        show: true,
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
                    strokeWidth: 55,
                    borderWidth: 2,
                    useShadow: false,
                    shadowColor: '#1A1A1A',
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
                customFormat: null,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1
            }
        }
    },
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
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

const config = ref({
    responsive: false,
    useBlurOnHover: true,
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
                labels: {
                    dataLabels: {
                        show: true,
                        useLabelSlots: false,
                        hideUnderValue: 3,
                        prefix: "",
                        suffix: ""
                    },
                    value: {
                        rounding: 0,
                        show: true
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
                        show: true,
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
                    strokeWidth: 55,
                    borderWidth: 2,
                    useShadow: false,
                    shadowColor: '#1A1A1A',
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
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1
            }
        }
    },
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
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

const slotsConfig = computed(() => {
    return {
        darkMode: {
            ...mutableConfigDarkMode.value,
            style: {
                ...mutableConfigDarkMode.value.style,
                chart: {
                    ...mutableConfigDarkMode.value.style.chart,
                    layout: {
                        ...mutableConfigDarkMode.value.style.chart.layout,
                        labels: {
                            ...mutableConfigDarkMode.value.style.chart.layout.labels,
                            dataLabels: {
                                ...mutableConfigDarkMode.value.style.chart.layout.labels.dataLabels,
                                useLabelSlots: true
                            }
                        }
                    }
                }
            }
        },
        lightMode: {
            ...mutableConfig.value,
            style: {
                ...mutableConfig.value.style,
                chart: {
                    ...mutableConfig.value.style.chart,
                    layout: {
                        ...mutableConfig.value.style.chart.layout,
                        labels: {
                            ...mutableConfig.value.style.chart.layout.labels,
                            dataLabels: {
                                ...mutableConfig.value.style.chart.layout.labels.dataLabels,
                                useLabelSlots: true
                            }
                        }
                    }
                }
            }
        }
    }
});

const sparkGaugeConfig = ref({
    style: {
        fontFamily: "inherit",
        background: "transparent",
        height: 84,
        basePosition: 72,
        animation: {
            show: true,
            speedMs: 150
        },
        title: {
            show: true,
            fontSize: 12,
            position: "bottom",
            textAlign: "center",
            bold: false,
            color: "#1A1A1A"
        },
        dataLabel: {
            fontSize: 24,
            autoColor: true,
            color: "#1A1A1A",
            offsetY: 0,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: "#FF0000",
            max: "#00FF00",
            showGradient: true,
        },
        track: {
            autoColor: true,
            color: "#5f8bee",
            strokeLinecap: "round"
        },
        gutter: {
            color: "#E1E5E8",
            strokeLinecap: "round"
        }
    }
})

const sparkGaugeDatasets = ref([
    {
        value: 7,
        min: 0,
        max: 10,
        title: 'Serie 1 satisfaction'
    },
    {
        value: 6.5,
        min: 0,
        max: 10,
        title: 'Serie 2 satisfaction'
    },
    {
        value: 9,
        min: 0,
        max: 10,
        title: 'Serie 3 satisfaction'
    },
])

const sparkGaugeConfigDarkMode = ref({
    style: {
        fontFamily: "inherit",
        background: "transparent",
        height: 84,
        basePosition: 72,
        animation: {
            show: true,
            speedMs: 150
        },
        title: {
            show: true,
            fontSize: 12,
            position: "bottom",
            textAlign: "center",
            bold: false,
            color: "#6A6A6A"
        },
        dataLabel: {
            fontSize: 20,
            autoColor: true,
            color: "#CCCCCC",
            offsetY: 0,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: "#FF0000",
            max: "#00FF00",
            showGradient: true,
        },
        track: {
            autoColor: true,
            color: "#5f8bee",
            strokeLinecap: "round"
        },
        gutter: {
            color: "#3A3A3A",
            strokeLinecap: "round"
        }
    }
})

const slotOptions = ref([
    'justLabels',
    'chart',
    'icon'
])

const slotOption = ref(slotOptions.value[0])

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartDonut" stroke="#42d392" :strokeWidth="1.5" />
            VueUiDonut
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.donut[store.lang] }}
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
            <VueDataUi component="VueUiDonut" :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_donut)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-donut"/>
            <MakerLink to="VueUiDonut"/>
        </div>
        <Box showEmits showSlots showTooltip showUseCases showThemes showResponsive schema="vue_ui_donut">
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiDonutDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            color: string;
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
const <span class="text-black dark:text-app-green">dataset: VueUiDonutDatasetItem[]</span> = [
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
        name: "Series 3",
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
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiDonutConfig</code>
                </div>
<pre>
<code>
const <span class="text-app-blue">config: VueUiDonutConfig</span> = {
    responsive: false; <span class="text-app-orange break-keep text-xs">// {{ translations.responsive[store.lang] }}</span>
    theme: ""; ("zen" | "hack" | "concrete" | "")
    customPalette: []; // string[]
    <ConfigAttribute v-if="isDarkMode" name="useBlurOnHover" type="checkbox" v-model="mutableConfigDarkMode.useBlurOnHover" @change="forceChartUpdate()" defaultVal="true" />
    <ConfigAttribute v-else name="useBlurOnHover" type="checkbox" v-model="mutableConfig.useBlurOnHover" @change="forceChartUpdate()" defaultVal="true" />
    useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true) 
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.useGradient">, (default: true)
            gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.gradientIntensity">, (default: 40)
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                labels: {
                    dataLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)
                        useLabelSlots: false, <span class="text-gray-600 dark:text-app-blue">// Check out the slots tab for information on how to use custom data labels</span>
                        hideUnderValue: <input v-if="isDarkMode" type="number" min="0" max="10" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.hideUnderValue"><input v-else type="number" min="0" max="10" v-model="mutableConfig.style.chart.layout.labels.dataLabels.hideUnderValue">, (default: 3) <span class="text-gray-600 dark:text-app-blue">// {{ translations.docs.comments.donut.hideUnderValue[store.lang]}} </span>
                        prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.prefix">, (default: "")
                        suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.suffix">, (default: "")
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
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.hollow.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.show" @change="forceChartUpdate()">, (default: true)
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
                        strokeWidth: <input v-if="isDarkMode" type="number" min="6" max="100" v-model="mutableConfigDarkMode.style.chart.layout.donut.strokeWidth"><input v-else type="number" min="6" max="100" v-model="mutableConfig.style.chart.layout.donut.strokeWidth">, (default: 55)
                        borderWidth: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.chart.layout.donut.borderWidth"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.chart.layout.donut.borderWidth">, (default: 2)
                        useShadow: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.donut.useShadow" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.donut.useShadow" @change="forceChartUpdate()">, (default: false)
                        shadowColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.donut.shadowColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.donut.shadowColor">, (default: "#2D353C")
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
                    customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
                    borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)
                    borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8"),
                    borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)
                }
            }
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        buttons: {
            tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)
            pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)
            img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)
            csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)
            table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)
            labels: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.labels" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.labels" @change="forceChartUpdate()">, (default: true)
            fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 300)
        columnNames: {
            series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")
            value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")
            percentage: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.percentage"><input v-else type="text" v-model="mutableConfig.table.columnNames.percentage">, (default: "Percentage")
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
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiDonut
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiDonutDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

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
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleLabels</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleLabels[store.lang] }}</div>
                </div>
                </div>
            </template>

            <template #tab3>
<div class="text-gray-500">
    {{ translations.slots.donutDataLabels[store.lang]  }}
Set <code class="text-app-orange">config.style.chart.layout.labels.dataLabels.useLabelSlots</code> to true. 
</div>
<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #dataLabel="{ datapoint, isBlur, isVisible, isSafari, textAlign, flexAlign, percentage }"&gt;
            &lt;div :style="`background:${datapoint.color}`"&gt;
                <span v-pre>{{ datapoint.name }} : {{ percentage }}</span>
            &lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
</code>
</pre>


<fieldset class="flex flex-row gap-2 mb-6 place-items-center justify-center">        
    <label :for="slotOptions[0]">Simple label</label>
    <input type="radio" v-model="slotOption" :value="slotOptions[0]" class="accent-app-orange">
    <label :for="slotOptions[1]">Chart</label>
    <input type="radio" v-model="slotOption" :value="slotOptions[1]" class="accent-app-orange">
</fieldSet>


<div class="mx-auto max-w-[600px] mb-6">
    <VueUiDonut :dataset="mutableDataset" :config="isDarkMode ? slotsConfig.darkMode : slotsConfig.lightMode" :key="key">
        <template #dataLabel="{ datapoint, percentage }">
            <div v-if="slotOption === 'justLabels'" :style="`background:${datapoint.color}33;`" class="rounded text-xs py-2">
                {{ datapoint.name }} : {{ percentage }}
            </div>
            <div v-if="slotOption === 'chart'" class="w-[100px]">
                <VueDataUi v-if="datapoint.name === 'Serie 1'" component="VueUiSparkgauge" :dataset="sparkGaugeDatasets[0]" :config="isDarkMode ? {
                    ...sparkGaugeConfigDarkMode,
                    style: {
                        ...sparkGaugeConfigDarkMode.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                } 
                    : {
                    ...sparkGaugeConfig,
                    style: {
                        ...sparkGaugeConfig.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                }"
                />
                <VueDataUi v-if="datapoint.name === 'Serie 2'" component="VueUiSparkgauge" :dataset="sparkGaugeDatasets[1]" :config="isDarkMode ? {
                    ...sparkGaugeConfigDarkMode,
                    style: {
                        ...sparkGaugeConfigDarkMode.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                } 
                    : {
                    ...sparkGaugeConfig,
                    style: {
                        ...sparkGaugeConfig.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                }"/>
                <VueDataUi v-if="datapoint.name === 'Serie 3'" component="VueUiSparkgauge" :dataset="sparkGaugeDatasets[2]" :config="isDarkMode ? {
                    ...sparkGaugeConfigDarkMode,
                    style: {
                        ...sparkGaugeConfigDarkMode.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                } 
                    : {
                    ...sparkGaugeConfig,
                    style: {
                        ...sparkGaugeConfig.style,
                        colors: {
                            showGradient: true,
                            min: `${datapoint.color}33`,
                            max: datapoint.color
                        }
                    }
                }"/>
            </div>
        </template>
    </VueUiDonut>
</div>


<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
</code>
</pre>

<hr class="mb-6 border-t-gray-500">

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiDonut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiDonut&gt;
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

            <template #tab5>
                <UcDonut />
            </template>

            <template #tab6>
                <ThemesVueUiDonut />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiDonut" 
                            :dataset="mutableDataset" 
                            :config="
                                isDarkMode 
                                    ? {
                                        ...mutableConfigDarkMode,
                                        responsive: true
                                    }
                                    : {
                                        ...mutableConfig,
                                        responsive: true
                                    }
                                " 
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>