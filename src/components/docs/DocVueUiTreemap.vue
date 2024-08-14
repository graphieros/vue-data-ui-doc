<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiTreemap from "../themes/ThemesVueUiTreemap.vue";

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    }
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref(
    [
        {
            name: "Parent 1",
            value: 100,
            children: [
                {
                    name: "P1 C1",
                    value: 70,
                },
                {
                    name: 'P1 C2',
                    value: 20
                },
                {
                    name: 'P1 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 2",
            value: 110,
            children: [
                {
                    name: "P2 C1",
                    value: 80,
                },
                {
                    name: 'P2 C2',
                    value: 20
                },
                {
                    name: 'P2 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 3",
            value: 75,
            children: [
                {
                    name: "P3 C1",
                    value: 20,
                },
                {
                    name: 'P3 C2',
                    value: 10
                },
                {
                    name: 'P3 C3',
                    value: 10
                },
                {
                    name: 'P3 C4',
                    value: 5
                },
                {
                    name: 'P3 C5',
                    value: 5
                },
                {
                    name: 'P3 C6',
                    value: 10
                },
                {
                    name: 'P3 C7',
                    value: 5
                },
                {
                    name: 'P3 C8',
                    value: 10,
                    children: [
                        {
                            name: 'P3 C8 CC1',
                            value: 5,
                        },
                        {
                            name: 'P3 C8 CC2',
                            value: 5,
                        },
                    ]
                },
            ]
        },
    ]
)

const config = ref({
    responsive: false,
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            height: 500,
            width: 800,
            padding: {
                top: 0,
                left: 6,
                bottom: 12,
                right: 6
            },
            layout: {
                sorted: true,
                rects: {
                    stroke: "#FFFFFF",
                    strokeWidth: 1,
                    borderRadius: 0,
                    colorRatio: 0.3,
                    gradient: {
                        show: true,
                        intensity: 30
                    },
                    selected: {
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        unselectedOpacity: 0.6
                    }
                },
                labels: {
                    showDefaultLabels: true,
                    fontSize: 24,
                    minFontSize: 10,
                    hideUnderProportion: 0.03,
                    prefix: "Value: ",
                    suffix: "",
                    rounding: 0
                }
            },
            legend: {
                backgroundColor: "#F3F4F6",
                color: "#2D353C",
                show: true,
                fontSize: 16,
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0
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
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                roundingValue: 1,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1
            }
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
})

const darkModeConfig = ref({
    responsive: false,
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 500,
            width: 800,
            padding: {
                top: 0,
                left: 6,
                bottom: 12,
                right: 6
            },
            layout: {
                sorted: true,
                rects: {
                    stroke: "#1A1A1A",
                    strokeWidth: 1,
                    borderRadius: 0,
                    colorRatio: 0.3,
                    gradient: {
                        show: true,
                        intensity: 30
                    },
                    selected: {
                        stroke: "#1A1A1A",
                        strokeWidth: 1,
                        unselectedOpacity: 0.6
                    }
                },
                labels: {
                    showDefaultLabels: true,
                    fontSize: 24,
                    minFontSize: 10,
                    hideUnderProportion: 0.03,
                    prefix: "Value: ",
                    suffix: "",
                    rounding: 0
                }
            },
            legend: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                show: true,
                fontSize: 16,
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0
            },
            title: {
                text: "Title",
                color: "#fafafa",
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
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                roundingValue: 1,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1
            }
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
const mutableConfigDarkMode = ref(
    JSON.parse(JSON.stringify(darkModeConfig.value))
);

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(
        JSON.stringify(darkModeConfig.value)
    );
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
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
            <VueUiIcon name="chartTreemap" stroke="#42d392" :strokeWidth="1.5" />
            VueUiTreemap
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.treemap[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed
                ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl'
                : 'w-1/2'
                }`">
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
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">
                    {{ translations.docs.reset[store.lang] }}
                </button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <VueDataUi component="VueUiTreemap" :dataset="dataset"
                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
        </div>

        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button
                class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
                @click="copyToClipboard(mainConfig.vue_ui_treemap)">
                <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang] }}
            </button>
            <GitHubLink link="vue-ui-treemap" />
            <!-- <MakerLink to="VueUiGalaxy" /> -->
        </div>

        <Box showEmits showSlots showTooltip :showThemes="false">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiTreemapDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
    [
        {
            name: string;
            value: number;
            color?: string;
            children?: VueUiTreemapDatasetItem[];
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
const <span class="text-black dark:text-app-green">dataset: VueUiTreemapDatasetItem[]</span> = [
    {
        name: "Parent 1",
        value: 100,
        children: [
            {
                name: "P1 C1",
                value: 70,
            },
            {
                name: 'P1 C2',
                value: 20
            },
            {
                name: 'P1 C3',
                value: 10,
            },
        ]
    },
    {
        name: "Parent 2",
        value: 110,
        children: [
            {
                name: "P2 C1",
                value: 80,
            },
            {
                name: 'P2 C2',
                value: 20
            },
            {
                name: 'P2 C3',
                value: 10,
            },
        ]
    }
]
</code>
</pre>
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiTreemapConfig</code>
                </div>
                <pre>
<code>
const <span class="text-app-blue">config: VueUiTreemapConfig</span> = {
    responsive: false; <span class="text-app-orange break-keep text-xs">// {{ translations.responsive[store.lang] }}</span>
    theme: ""; ("zen" | "hack" | "concrete" | "")
    customPalette: []; // string[]
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        buttons: {
            pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)
            img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)
            csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)
            table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)
            fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.chart.height" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.chart.height" @change="forceChartUpdate()">, (default: 500)
            width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.chart.width" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.chart.width" @change="forceChartUpdate()">, (default: 800)
            padding: {
                top: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.top" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.top" @change="forceChartUpdate()">, (default: 0)
                left: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.left" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.left" @change="forceChartUpdate()">, (default: 6)
                bottom: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.bottom" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.bottom" @change="forceChartUpdate()">, (default: 12)
                right: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.right" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.padding.right" @change="forceChartUpdate()">, (default: 6)
            },
            layout: {
                sorted: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.sorted" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.sorted" @change="forceChartUpdate()">, (default: true)
                rects: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.rects.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.rects.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.layout.rects.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfig.style.chart.layout.rects.strokeWidth" @change="forceChartUpdate()">, (default: 1)
                    borderRadius: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.layout.rects.borderRadius" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfig.style.chart.layout.rects.borderRadius" @change="forceChartUpdate()">, (default: 0)
                    colorRatio: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.layout.rects.colorRatio" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.layout.rects.colorRatio" @change="forceChartUpdate()">, (default: 0.3)
                    gradient: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.rects.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.rects.gradient.show" @change="forceChartUpdate()">, (default: true)
                        intensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.rects.gradient.intensity" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.rects.gradient.intensity" @change="forceChartUpdate()">, (default: 30)
                    },
                    selected: {
                        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.rects.selected.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.rects.selected.stroke">, (default: "#FFFFFF")
                        strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.layout.rects.selected.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfig.style.chart.layout.rects.selected.strokeWidth" @change="forceChartUpdate()">, (default: 1)
                        unselectedOpacity: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.layout.rects.selected.unselectedOpacity" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.layout.rects.selected.unselectedOpacity" @change="forceChartUpdate()">, (default: 0.6)
                    },
                },
                labels: {
                    showDefaultLabels: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.showDefaultLabels" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.showDefaultLabels" @change="forceChartUpdate()">, (default: true)
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.fontSize">, (default: 24)
                    minFontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.layout.labels.minFontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.minFontSize">, (default: 10)
                    hideUnderProportion: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.layout.labels.hideUnderProportion" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.layout.labels.hideUnderProportion" @change="forceChartUpdate()">, (default: 0.03)
                    prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.prefix">, (default: "Value: ")
                    suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.suffix">, (default: "")
                    rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.labels.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.labels.rounding">, (default: 0)
                },
            },
            legend: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate()">, (default: 0)
                roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
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
                },
            },
            tooltip: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue" @change="forceChartUpdate()">, (default: 0)
                customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
                borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)
                borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8"),
                borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)
            },
        },
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: 300,
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
            </template>

            <template #tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiTreemap
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiTreemapDatapoint, index: number }) {
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

            const treemapChart = ref(null);
            const treemapDataset = ref([]);

            onMounted(() => {
                treemapDataset.value = treemapChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiTreemap
                ref="treemapChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiTreemap
                ref="treemapChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        treemapDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.treemapDataset = this.$refs.treemapChart.getData();
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
    {{ translations.slots.rect[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiTreemap
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #rect="{ rect, shouldShow, fontSize, isZoom, textColor }"&gt;
            ...your content here, applied to all cells.
        &lt;/template&gt;
    &lt;/VueUiTreemap&gt;
</code>
</pre>  

<div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiTreemap
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiTreemap&gt;
</code>
</pre>                    
<div class="text-gray-500">
    {{ translations.slots.legendDetail[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiTreemap
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiTreemap&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiTreemap
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiTreemap&gt;
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

            <!-- <template #tab6>
                <ThemesVueUiTreemap />
            </template> -->

        </Box>
    </div>
</template>