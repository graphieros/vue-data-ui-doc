<script setup>
import { ref, computed, nextTick, watch } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import GitHubLink from "../GitHubLink.vue";

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
    name: "Stars",
    shape: "star",
    color: "#5f8bee",
    series: [
      {
        name: "Star 1",
        x: 50,
        y: 50
      },
      {
        name: "Star 2",
        x: -10,
        y: -10
      },
      {
        name: "Star 3",
        x: -15,
        y: 20
      },
      {
        name: "Star 4",
        x: 15,
        y: -20
      },
    ]
  },
  {
    name: "Triangles",
    shape: "triangle",
    color: "#42d392",
    series: [
      {
        name: "Triangle 1",
        x: -50,
        y: -50
      },
      {
        name: "Triangle 2",
        x: 25,
        y: -25
      },
      {
        name: "Triangle 3",
        x: -25,
        y: 25
      },
      {
        name: "Triangle 4",
        x: 10,
        y: 10
      }
    ]
  },
  {
    name: "Hexagons",
    shape: "hexagon",
    color: "#ff6400",
    series: [
      {
        name: "Hexagon 1",
        x: -39,
        y: 39
      },
      {
        name: "Hexagon 2",
        x: -2,
        y: 45
      },
      {
        name: "Hexagon 3",
        x: -15,
        y: 30
      },
    ]
  },
]);

const config = ref({
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            height: 512, // change to size only ? impose ?
            width: 512,
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
                useDiv: true,
                labels: {
                    quadrantLabels: {
                        show: true,
                        tl: {
                            text: "top left",
                            color: "#1A1A1A",
                            fontSize: 16,
                            bold: true,
                        },
                        tr: {
                            text: "top right",
                            color: "#1A1A1A",
                            fontSize: 16,
                            bold: true,
                        },
                        br: {
                            text: "bottom right",
                            color: "#1A1A1A",
                            fontSize: 16,
                            bold: true,
                        },
                        bl: {
                            text: "bottom left",
                            color: "#1A1A1A",
                            fontSize: 16,
                            bold: true,
                        },
                    },
                    plotLabels: {
                        show: true,
                        fontSize: 10,
                        color: "#1A1A1A",
                        offsetY: 10,
                    },
                    axisLabels: {
                        show: true,
                        fontSize: 14,
                        color: {
                            positive: "#1A1A1A",
                            negative: "#1A1A1A"
                        }
                    }
                },
                grid: {
                    stroke: "#1A1A1A",
                    strokeWidth: 0.5,
                    showArrows: true,
                    graduations: {
                        stroke: "#C4C4C4",
                        strokeWidth: 0.5,
                        show: true,
                        steps: 5,
                        fill: true,
                        color: "#E1E5E8",
                        roundingForce: 10,
                    },
                    xAxis: {
                        min: -100,
                        max: 100,
                        auto: true,
                        name: "xAxis"
                    },
                    yAxis: {
                        min: -100,
                        max: 100,
                        auto: true,
                        name: "yAxis"
                    }
                },
                plots: {
                    radius: 6,
                    outline: true,
                    outlineColor: "#F3F4F6",
                    outlineWidth: 1,
                },
                areas: {
                    show: true,
                    opacity: 40,
                    useGradient: true,
                }
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
                roundingValue: 0,
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                fontSize: 14,
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            roundingValue: 0
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            useDiv: "Title & legend inside",
            showTable: "Show table",
            showPlotLabels: "Show plot labels"
        }
    },
    translations: {
        category: "Category",
        item: "Item",
        side: "Side"
    }
});

const darkModeConfig = ref({
    useCssAnimation: true,
    style: {
        fontFamily: "inherit",
        chart: {
            height: 512, // change to size only ? impose ?
            width: 512,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                useDiv: true,
                labels: {
                    quadrantLabels: {
                        show: true,
                        tl: {
                            text: "top left",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                        tr: {
                            text: "top right",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                        br: {
                            text: "bottom right",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                        bl: {
                            text: "bottom left",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                    },
                    plotLabels: {
                        show: true,
                        fontSize: 10,
                        color: "#CCCCCC",
                        offsetY: 10,
                    },
                    axisLabels: {
                        show: true,
                        fontSize: 14,
                        color: {
                            positive: "#CCCCCC",
                            negative: "#CCCCCC"
                        }
                    }
                },
                grid: {
                    stroke: "#AAAAAA",
                    strokeWidth: 0.5,
                    showArrows: true,
                    graduations: {
                        stroke: "#AAAAAA",
                        strokeWidth: 0.5,
                        show: true,
                        steps: 5,
                        fill: true,
                        color: "#E1E5E8",
                        roundingForce: 10,
                    },
                    xAxis: {
                        min: -100,
                        max: 100,
                        auto: true,
                        name: "xAxis"
                    },
                    yAxis: {
                        min: -100,
                        max: 100,
                        auto: true,
                        name: "yAxis"
                    }
                },
                plots: {
                    radius: 6,
                    outline: true,
                    outlineColor: "#CCCCCC",
                    outlineWidth: 0.5,
                },
                areas: {
                    show: true,
                    opacity: 50,
                    useGradient: true,
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
            tooltip: {
                show: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                roundingValue: 0,
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #e1e5e8"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #e1e5e8",
            roundingValue: 0
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            useDiv: "Title & legend inside",
            showTable: "Show table",
            showPlotLabels: "Show plot labels"
        }
    },
    translations: {
        category: "Category",
        item: "Item",
        side: "Side"
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

const shapes = ref([
    "circle",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "star"
]);

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
            <VueUiIcon name="chartQuadrant" stroke="#42d392" :strokeWidth="1.5" />
            VueUiQuadrant
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.quadrant[store.lang] }}
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
            <VueUiQuadrant :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_quadrant)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-quadrant"/>
        </div>
        <Box showEmits showSlots>
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiQuadrantDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            shape: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star", (default: "circle")
            color: string;
            series: [
                {
                    name: string;
                    x: number;
                    y: number;
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
const <span class="text-black dark:text-app-green">dataset: VueUiQuadrantDatasetItem[]</span> = [
    {
        name: "Stars",
        shape: <select v-model="mutableDataset[0].shape"><option v-for="shape in shapes" :value="shape">{{ shape }}</option></select>,
        color: <input type="color" v-model="mutableDataset[0].color">,
        series: [
            {
                name: "Star 1",
                x: 50,
                y: 50
            },
            {
                name: "Star 2",
                x: -10,
                y: -10
            },
            {
                name: "Star 3",
                x: -15,
                y: 20
            },
            {
                name: "Star 4",
                x: 15,
                y: -20
            },
        ]
  },
  {
    name: "Triangles",
    shape: <select v-model="mutableDataset[1].shape"><option v-for="shape in shapes" :value="shape">{{ shape }}</option></select>,
    color: <input type="color" v-model="mutableDataset[1].color">,
        series: [
            {
                name: "Triangle 1",
                x: -50,
                y: -50
            },
            {
                name: "Triangle 2",
                x: 25,
                y: -25
            },
            {
                name: "Triangle 3",
                x: -25,
                y: 25
            },
            {
                name: "Triangle 4",
                x: 10,
                y: 10
            }
        ]
  },
  {
    name: "Hexagons",
    shape: <select v-model="mutableDataset[2].shape"><option v-for="shape in shapes" :value="shape">{{ shape }}</option></select>,
    color: <input type="color" v-model="mutableDataset[2].color">,
    series: [
        {
            name: "Hexagon 1",
            x: -39,
            y: 39
        },
        {
            name: "Hexagon 2",
            x: -2,
            y: 45
        },
        {
            name: "Hexagon 3",
            x: -15,
            y: 30
        },
    ]
  },
]
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
                    <div class="mt-4">
                        TS type: <code class="text-app-blue">VueUiQuadrantConfig</code>
                    </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiQuadrantConfig</span> = {
    useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true) 
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: true) <span class="text-gray-600 dark:text-app-blue">// {{ translations.docs.comments.donut.layoutTitle[store.lang] }}</span>
                labels: {
                    quadrantLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.show" @change="forceChartUpdate()">, (default: true)
                        tl: {
                            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.text">, (default: "")
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.color">, (default: "#2D353C")
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.fontSize">, (default: 16)
                            bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.bold" @change="forceChartUpdate()">, (default: true)
                        },
                        tr: {
                            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.text">, (default: "")
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.color">, (default: "#2D353C")
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.fontSize">, (default: 16)
                            bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.bold" @change="forceChartUpdate()">, (default: true)
                        },
                        br: {
                            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.text">, (default: "")
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.color">, (default: "#2D353C")
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.fontSize">, (default: 16)
                            bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.bold" @change="forceChartUpdate()">, (default: true)
                        },
                        bl: {
                            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.text">, (default: "")
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.color">, (default: "#2D353C")
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.fontSize">, (default: 16)
                            bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.bold" @change="forceChartUpdate()">, (default: true)
                        },
                    },
                    plotLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.plotLabels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.plotLabels.fontSize">, (default: 10)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.plotLabels.color">, (default: "#2D353C") 
                        offsetY: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.offsetY"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.plotLabels.offsetY">, (default: 8)
                    },
                    axisLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.axisLabels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.axisLabels.fontSize">, (default: 14)
                        color: {
                            positive: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.color.positive"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.axisLabels.color.positive">,  (default: "#2D353C")
                            negative: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.color.negative"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.axisLabels.color.negative">,  (default: "#2D353C")
                        }
                    }
                },
                grid: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.grid.strokeWidth">, (default: 1.5)
                    showArrows: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.showArrows" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.showArrows" @change="forceChartUpdate()">, (default: true)
                    graduations: {
                        show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.graduations.show" @change="forceChartUpdate()">, (default: true)
                        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.graduations.stroke">, (default: "#e1e5e8")
                        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.grid.graduations.strokeWidth">, (default: 0.5)
                        steps: <input v-if="isDarkMode" type="number" min="0" max="20" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.steps"><input v-else type="number" min="0" max="20" step="1" v-model="mutableConfig.style.chart.layout.grid.graduations.steps">, (default: 5)
                        fill: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.fill" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.graduations.fill" @change="forceChartUpdate()">, (default: true),
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.graduations.color">, (default: "#e1e5e8")
                        roundingForce: <input v-if="isDarkMode" type="range" min="0" max="200" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.roundingForce"><input v-else type="range" min="0" max="200" v-model="mutableConfig.style.chart.layout.grid.graduations.roundingForce">, (default: 10)
                    },
                    xAxis: {
                        min: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.min"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.xAxis.min">, (default: -100) <span class="text-black dark:text-app-blue">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span>
                        max: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.max"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.xAxis.max">, (default: 100) <span class="text-grat-600 dark:text-app-blue">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span>
                        auto: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.auto" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.xAxis.auto" @change="forceChartUpdate()">, (default: true)
                        name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.name"><input v-else type="text" v-model="mutableConfig.style.chart.layout.grid.xAxis.name">, (default: "")
                    },
                    yAxis: {
                        min: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.min"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.yAxis.min">, (default: -100) <span class="text-grat-600 dark:text-app-blue">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span>
                        max: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.max"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.yAxis.max">, (default: 100) <span class="text-grat-600 dark:text-app-blue">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span>
                        auto: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.auto" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.yAxis.auto" @change="forceChartUpdate()">, (default: true)
                        name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.name"><input v-else type="text" v-model="mutableConfig.style.chart.layout.grid.yAxis.name">, (default: "")
                    }
                },
                plots: {
                    radius: <input v-if="isDarkMode" type="number" min="1" max="100" v-model="mutableConfigDarkMode.style.chart.layout.plots.radius"><input v-else type="number" min="1" max="100" v-model="mutableConfig.style.chart.layout.plots.radius">, (default: 6) <span class="dtext-gray-600 ark:text-app-blue">// used when auto is false</span>
                    outline: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.plots.outline" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.plots.outline" @change="forceChartUpdate()">, (default: true)
                    outlineColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.plots.outlineColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.plots.outlineColor">, (default: "#FFFFFF")
                    outlineWidth: <input v-if="isDarkMode" type="number" min="0" step="0.1" max="10" v-model="mutableConfigDarkMode.style.chart.layout.plots.outlineWidth"><input v-else type="number" min="0" step="0.1" max="10" v-model="mutableConfig.style.chart.layout.plots.outlineWidth">, (default: 1)
                },
                areas: {
                    show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.areas.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.areas.show" @change="forceChartUpdate()">, (default: true)
                    opacity: <input v-if="isDarkMode" type="range" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.areas.opacity"><input v-else type="range" min="0" max="100" v-model="mutableConfig.style.chart.layout.areas.opacity">, (default: 40)
                    useGradient: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.areas.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.areas.useGradient" @change="forceChartUpdate()">, (default: true)
                }
            },
            title: {
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            tooltip: {
                show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue">, (default: 0)
            },
            legend: {
                show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)
            }
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF"),
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            showPlotLabels: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.showPlotLabels"><input v-else type="text" v-model="mutableConfig.userOptions.labels.showPlotLabels">, (default: "Show plot labels"),
            useDiv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.useDiv"><input v-else type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside"),
            showTable: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.showTable"><input v-else type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table"),
        }
    },
    translations: {
        category: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.category"><input v-else type="text" v-model="mutableConfig.translations.category">, (default: "Category"),
        item: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.item"><input v-else type="text" v-model="mutableConfig.translations.item">, (default: "Item"),
        side: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.side"><input v-else type="text" v-model="mutableConfig.translations.side">, (default: "Side"),
    }
}
</code>
</pre>                    
                </div>
            </template>
            
            <template v-slot:tab2>
            
                <div class="overflow-auto">                
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.quadrant.selectLegend[store.lang]}}</div>
<pre>
<code>
    [
        {
            color: string;
            name: string;
            shape: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon"| "star";
            series: [
                {
                    name: string;
                    x: number;
                    y: number;
                    quadrantSide: "tl" | "tr" | "br" | "bl";
                    sideName: string;
                },
                {...}
            ]
        },
        {...}
    ]
</code>
</pre>
                <div class="pt-6 border-t border-gray-700"><code><b>@selectPlot</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.quadrant.selectPlot[store.lang] }}</div>    
<pre>
<code>
    {
        category: string;
        itemName: string;
        x: number;
        y: number;
        quadrantSide: "tl" | "tr" | "br" | "bl";
        sideName: string; 
    }
</code>
</pre>
                <div class="pt-6 border-t border-gray-700"><code><b>@selectSide</b></code></div>
                <div class="text-gray-400 pl-5">{{  translations.docs.emits.quadrant.selectSide[store.lang] }}</div>
<pre>
<code>
    {
        quadrantSide: "tl" | "tr" | "br" | "bl";
        sideName: string;
        items: [
            {
                category: string;
                itemName: string;
                x: number;
                y: number;
            },
            {...}
        ] 
    }
</code>
</pre>
                <div class="pt-6 border-t border-gray-700"><code><b>getData</b></code></div>
                <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const quadrantChart = ref(null);
            const quadrantDataset = ref([]);

            onMounted(() => {
                quadrantDataset.value = quadrantChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiQuadrant
                ref="quadrantChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiQuadrant
                ref="quadrantChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        quadrantDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.quadrantDataset = this.$refs.quadrantChart.getData();
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
    &lt;VueUiQuadrant
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiQuadrant&gt;
</code>
</pre>                    

            </template>
        </Box>
    </div>
</template>