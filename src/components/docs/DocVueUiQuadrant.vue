<script setup>
import { ref, computed, nextTick, watch } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import { useMainStore } from "../../stores";
import ThemesVueUiQuadrant from "../themes/ThemesVueUiQuadrant.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseDocActions from "./BaseDocActions.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseNumberInput from "../BaseNumberInput.vue";

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
    responsive: false,
    useCssAnimation: true,
    zoomAnimationFrames: 20,
    style: {
        fontFamily: "inherit",
        chart: {
            height: 512, // change to size only ? impose ?
            width: 512,
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
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
                        showAsTag: false,
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
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
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
                customFormat: null,
                showShape: true,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 90,
                position: 'center',
                offsetY: 24
            },
            legend: {
                tooltip: true,
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
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none",
            roundingValue: 0
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
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            tooltip: "Toggle tooltip",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
        }
    },
    translations: {
        category: "Category",
        item: "Item",
        side: "Side"
    }
});

const darkModeConfig = ref({
    responsive: false,
    useCssAnimation: true,
    zoomAnimationFrames: 20,
    style: {
        fontFamily: "inherit",
        chart: {
            height: 512, // change to size only ? impose ?
            width: 512,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
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
                        showAsTag: false,
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
            tooltip: {
                show: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                roundingValue: 0,
                customFormat: null,
                showShape: true,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 90,
                position: 'center',
                offsetY: 24
            },
            legend: {
                tooltip: true,
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
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0
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
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            tooltip: "Toggle tooltip",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
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
            <VueUiIcon name="chartQuadrant" stroke="#42d392" :strokeWidth="1.5" />
            VueUiQuadrant
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.quadrant[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
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
                    <VueUiQuadrant :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-quadrant"
            targetMaker="VueUiQuadrant"
            :configSource="mainConfig.vue_ui_quadrant"
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_quadrant">
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiQuadrantConfig" equal>
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <span>useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)</span>
        <span>zoomAnimationFrames: <input v-if="isDarkMode" type="number" min="5" max="40" v-model="mutableConfigDarkMode.zoomAnimationFrames"><input v-else type="number" min="5" max="40" v-model="mutableConfig.zoomAnimationFrames">, (default: 20)</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <span>height: <input v-if="isDarkMode" type="number" min="100" max="1000" v-model="mutableConfigDarkMode.style.chart.height" @change="forceChartUpdate()"><input v-else type="number" min="100" max="1000" v-model="mutableConfig.style.chart.height" @change="forceChartUpdate()">, (default: 512)</span>
                <span>width: <input v-if="isDarkMode" type="number" min="100" max="1000" v-model="mutableConfigDarkMode.style.chart.width" @change="forceChartUpdate()"><input v-else type="number" min="100" max="1000" v-model="mutableConfig.style.chart.width" @change="forceChartUpdate()">, (default: 512)</span>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="areas" :level="4" title="style.chart.layout.areas">
                        <span>show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.areas.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.areas.show" @change="forceChartUpdate()">, (default: true)</span>
                        <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.areas.opacity"><input v-else type="range" min="0" max="100" v-model="mutableConfig.style.chart.layout.areas.opacity">, (default: 40)</span>
                        <span>useGradient: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.areas.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.areas.useGradient" @change="forceChartUpdate()">, (default: true)</span>
                    </BaseDetails>
                    <BaseDetails attr="grid" :level="4" title="style.chart.layout.grid">
                        <span> stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")</span>
                        <span>strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.grid.strokeWidth">, (default: 1.5)</span>
                        <span>showArrows: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.showArrows" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.showArrows" @change="forceChartUpdate()">, (default: true)</span>
                        <BaseDetails attr="graduations" :level="5" title="style.chart.layout.grid.graduations">
                            <span>show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.graduations.show" @change="forceChartUpdate()">, (default: true)</span>
                            <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.graduations.stroke">, (default: "#e1e5e8")</span>
                            <span>strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.grid.graduations.strokeWidth">, (default: 0.5)</span>
                            <span>steps: <input v-if="isDarkMode" type="number" min="0" max="20" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.steps"><input v-else type="number" min="0" max="20" step="1" v-model="mutableConfig.style.chart.layout.grid.graduations.steps">, (default: 5)</span>
                            <span>fill: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.fill" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.graduations.fill" @change="forceChartUpdate()">, (default: true)</span>
                            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.graduations.color">, (default: "#e1e5e8")</span>
                            <span>roundingForce: <input v-if="isDarkMode" type="range" min="0" max="200" v-model="mutableConfigDarkMode.style.chart.layout.grid.graduations.roundingForce"><input v-else type="range" min="0" max="200" v-model="mutableConfig.style.chart.layout.grid.graduations.roundingForce">, (default: 10)</span>
                        </BaseDetails>
                        <BaseDetails attr="xAxis" :level="5" title="style.chart.layout.grid.xAxis">
                            <span> min: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.min"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.xAxis.min">, (default: -100) <span class="text-app-blue text-xs">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span></span>
                            <span> max: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.max"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.xAxis.max">, (default: 100) <span class="text-app-blue text-xs">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span></span>
                            <span>auto: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.auto" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.xAxis.auto" @change="forceChartUpdate()">, (default: true)</span>
                            <span>name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.grid.xAxis.name"><input v-else type="text" v-model="mutableConfig.style.chart.layout.grid.xAxis.name">, (default: "")</span>
                        </BaseDetails>
                        <BaseDetails attr="yAxis" :level="5" title="style.chart.layout.grid.yAxis">
                            <span> min: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.min"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.yAxis.min">, (default: -100) <span class="text-app-blue text-xs">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span></span>
                            <span>max: <input v-if="isDarkMode" type="number" step="1" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.max"><input v-else type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.yAxis.max">, (default: 100) <span class="text-app-blue text-xs">// {{ translations.docs.comments.quadrant.useWhenAutoFalse[store.lang] }}</span></span>
                            <span>auto: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.auto" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.grid.yAxis.auto" @change="forceChartUpdate()">, (default: true)</span>
                            <span>name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.grid.yAxis.name"><input v-else type="text" v-model="mutableConfig.style.chart.layout.grid.yAxis.name">, (default: "")</span>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">
                        <BaseDetails attr="axisLabels" :level="5" title="style.chart.layout.labels.axisLabels">
                            <span>show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.axisLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                            <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.axisLabels.fontSize">, (default: 14)</span>
                            <BaseDetails attr="color" :level="6" title="style.chart.layout.labels.axisLabels.color">
                                <span>positive: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.color.positive"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.axisLabels.color.positive">,  (default: "#2D353C")</span>
                                <span>negative: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.axisLabels.color.negative"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.axisLabels.color.negative">,  (default: "#2D353C")</span>
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="plotLabels" :level="5" title="style.chart.layout.labels.plotLabels">
                            <span>showAsTag: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.showAsTag" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.plotLabels.showAsTag" @change="forceChartUpdate()">, (default: false)</span>
                            <span>show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.plotLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                            <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.plotLabels.fontSize">, (default: 10)</span>
                            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.plotLabels.color">, (default: "#2D353C") </span>
                            <span>offsetY: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.plotLabels.offsetY"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.plotLabels.offsetY">, (default: 8)</span>
                        </BaseDetails>
                        <BaseDetails attr="quadrantLabels" :level="5" title="style.chart.layout.labels.quadrantLabels">
                            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                            <BaseDetails attr="bl" :level="6" title="style.chart.layout.labels.quadrantLabels.bl">
                                <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.text">, (default: "")</span>
                                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.color">, (default: "#2D353C")</span>
                                <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.fontSize">, (default: 16)</span>
                                <span>bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.bl.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.bold" @change="forceChartUpdate()">, (default: true)</span>
                            </BaseDetails>
                            <BaseDetails attr="br" :level="6" title="style.chart.layout.labels.quadrantLabels.br">
                                <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.text">, (default: "")</span>
                                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.color">, (default: "#2D353C")</span>
                                <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.fontSize">, (default: 16)</span>
                                <span>bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.br.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.bold" @change="forceChartUpdate()">, (default: true)</span>
                            </BaseDetails>
                            <BaseDetails attr="tl" :level="6" title="style.chart.layout.labels.quadrantLabels.tl">
                                <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.text">, (default: "")</span>
                                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.color">, (default: "#2D353C")</span>
                                <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.fontSize">, (default: 16)</span>
                                <span>bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tr.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.bold" @change="forceChartUpdate()">, (default: true)</span>
                            </BaseDetails>
                            <BaseDetails attr="tr" :level="6" title="style.chart.layout.labels.quadrantLabels.tr">
                                <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.text">, (default: "")</span>
                                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.color">, (default: "#2D353C")</span>
                                <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.fontSize">, (default: 16)</span>
                                <span>bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.labels.quadrantLabels.tl.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.bold" @change="forceChartUpdate()">, (default: true)</span>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="plots" :level="4" title="style.chart.layout.plots">
                        <span>radius: <input v-if="isDarkMode" type="number" min="1" max="100" v-model="mutableConfigDarkMode.style.chart.layout.plots.radius"><input v-else type="number" min="1" max="100" v-model="mutableConfig.style.chart.layout.plots.radius">, (default: 6) <span class="text-app-blue text-xs">// used when auto is false</span></span>
                        <span>outline: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.plots.outline" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.plots.outline" @change="forceChartUpdate()">, (default: true)</span>
                        <span>outlineColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.plots.outlineColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.plots.outlineColor">, (default: "#FFFFFF")</span>
                        <span>outlineWidth: <input v-if="isDarkMode" type="number" min="0" step="0.1" max="10" v-model="mutableConfigDarkMode.style.chart.layout.plots.outlineWidth"><input v-else type="number" min="0" step="0.1" max="10" v-model="mutableConfig.style.chart.layout.plots.outlineWidth">, (default: 1)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span>show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)</span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select></span>
                    <span>paddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <span>paddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <span>show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)</span>
                    <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue">, (default: 0)</span>
                    <span>showShape: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.tooltip.showShape" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.style.chart.tooltip.showShape" @change="forceChartUpdate()">, (default: true)</span>
                    <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <span>borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)</span>
                    <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8")</span>
                    <span>borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)</span>
                    <span>backgroundOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundOpacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.tooltip.backgroundOpacity">, (default: 100)</span>
                    <span>position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.tooltip.position"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.tooltip.position"><option>left</option><option>center</option><option>right</option></select></span>
                    <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.offsetY" :min="0" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.offsetY" :min="0" :max="64"/></span>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span> show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
            <span>responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)</span>
            <BaseDetails attr="th" :level="2" title="table.th">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
                <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="translations" :level="1">
            <span>ategory: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.category"><input v-else type="text" v-model="mutableConfig.translations.category">, (default: "Category")</span>
            <span>item: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.item"><input v-else type="text" v-model="mutableConfig.translations.item">, (default: "Item")</span>
            <span>side: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.side"><input v-else type="text" v-model="mutableConfig.translations.side">, (default: "Side")</span>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
                <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
                <span>labels: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.labels" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.labels" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>tooltip: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.tooltip"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.tooltip">, (default: "Toggle tooltip")</span>
                <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
                <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
                <span>labels: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.labels"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.labels">, (default: "Toggle labels")</span>
                <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
                
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
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleLabels</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleLabels[store.lang] }}</div>
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
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiQuadrant
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiQuadrant&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiQuadrant
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiQuadrant&gt;
</code>
</pre> 

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiQuadrant
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiQuadrant&gt;
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

            <template #tab6>
                <ThemesVueUiQuadrant />
            </template>

            <template #tab7>
                <ResponsiveUnit width="300px">
                    <template #chart>
                        <VueUiQuadrant 
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