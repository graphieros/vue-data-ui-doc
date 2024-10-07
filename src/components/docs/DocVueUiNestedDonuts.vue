<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiNestedDonuts from "../themes/ThemesVueUiNestedDonuts.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
        name: "Group 1",
        series: [
            {
                name: 'Serie 1',
                values: [50]
            },
            {
                name: 'Serie 2',
                values: [30]
            },
            {
                name: 'Serie 3',
                values: [20]
            },
        ]
    },
    {
        name: "Group 2",
        series: [
            {
                name: 'Serie 1',
                values: [40]
            },
            {
                name: 'Serie 2',
                values: [40]
            },
            {
                name: 'Serie 3',
                values: [30]
            },
        ]
    },
])

const darkModeConfig = ref({
    responsive: false,
    useCssAnimation: true,
    useBlurOnHover: true,
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
                        prefix: "",
                        suffix: "",
                        hideUnderValue: 3,
                        fontSize: 14,
                        offsetX: 4,
                        offsetY: 12,
                        useSerieColor: false,
                        color: "#CCCCCC",
                        showValue: true,
                        showPercentage: true,
                        boldValue: false,
                        boldPercentage: true,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        "showDonutName": true,
                        "boldDonutName": true,
                        "donutNameAbbreviation": true,
                        "donutNameMaxAbbreviationSize": 3,
                        "donutNameOffsetY": 0
                    }
                },
                donut: {
                    strokeWidth: 200,
                    borderWidth: 2,
                    spacingRatio: 0.5,
                    useShadow: false,
                    shadowColor: '#1A1A1A'
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
                showAllItemsAtIndex: true,
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
                borderWidth: 1,
                backgroundOpacity: 90
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
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
})

const config = ref({
    responsive: false,
    useCssAnimation: true,
    useBlurOnHover: true,
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
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            layout: {
                labels: {
                    dataLabels: {
                        show: true,
                        prefix: "",
                        suffix: "",
                        hideUnderValue: 3,
                        fontSize: 14,
                        offsetX: 4,
                        offsetY: 12,
                        useSerieColor: false,
                        color: "#2D353C",
                        showValue: true,
                        showPercentage: true,
                        boldValue: false,
                        boldPercentage: true,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        "showDonutName": true,
                        "boldDonutName": true,
                        "donutNameAbbreviation": true,
                        "donutNameMaxAbbreviationSize": 3,
                        "donutNameOffsetY": 0
                    }
                },
                donut: {
                    strokeWidth: 200,
                    borderWidth: 2,
                    spacingRatio: 0.5,
                    useShadow: false,
                    shadowColor: '#1A1A1A'
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
                showAllItemsAtIndex: true,
                color: "#2D353C",
                backgroundColor: "#F3F4F6",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 90
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            series: "Series",
            value: "Value",
            percentage: "Percentage"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
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
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartNestedDonuts" stroke="#42d392" :strokeWidth="1.5" />
            VueUiNestedDonuts
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.nestedDonuts[store.lang] }}
        </p>
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
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
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <Suspense>
                <template #default>
                    <VueUiNestedDonuts :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
                        :key="key" />
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-nested-donuts"
            targetMaker="VueUiNestedDonuts"
            :configSource="mainConfig.vue_ui_nested_donuts"
        />

        <Box showEmits showTooltip showSlots showThemes showResponsive schema="vue_ui_nested_donuts">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiNestedDonutsDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
    [
        {
            name: string;
            series: [
                {
                    name: string;
                    color?: string; 
                    values: number[];
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
const <span class="text-black dark:text-app-green">dataset: VueUiNestedDonutsDatasetItem[]</span> = [
    {
        name: "Group 1",
        series: [
            {
                name: 'Serie 1',
                values: [50]
            },
            {
                name: 'Serie 2',
                values: [30]
            },
            {
                name: 'Serie 3',
                values: [20]
            },
        ]
    },
    {
        name: "Group 2",
        series: [
            {
                name: 'Serie 1',
                values: [40]
            },
            {
                name: 'Serie 2',
                values: [40]
            },
            {
                name: 'Serie 3',
                values: [30]
            },
        ]
    },
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
                    TS type: <code class="text-app-blue">VueUiNestedDonutsConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiNestedDonutsConfig" equal>
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <span>useBlurOnHover: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useBlurOnHover" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useBlurOnHover" @change="forceChartUpdate()">, (default: true) </span>
        <span>useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.useGradient">, (default: true)</span>
                <span>gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.gradientIntensity">, (default: 40)</span>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="donut" :level="4" title="style.chart.layout.donut">
                        <span> strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.donut.strokeWidth" :min="64" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.donut.strokeWidth" :min="64" :max="200"/>, (default: 200)</span>
                        <span> borderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.donut.borderWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.donut.borderWidth" :min="0" :max="12"/>, (default: 2)</span>
                        <span>spacingRatio: <input class="accent-app-blue" v-if="isDarkMode" type="range" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.layout.donut.spacingRatio"><input class="accent-app-blue" v-else type="range" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.layout.donut.spacingRatio">, (default: 0.5)</span>
                        <span> useShadow: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.donut.useShadow" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.donut.useShadow" @change="forceChartUpdate()">, (default: false)</span>
                        <span> shadowColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.donut.shadowColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.donut.shadowColor">, (default: "#2D353C")</span>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">
                        <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.labels.dataLabels">
                            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)</span>
                            <span>hideUnderValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.hideUnderValue" :min="1" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.hideUnderValue" :min="1" :max="12"/>, (default: 3) <span class="text-gray-600 text-xs dark:text-app-blue">// {{ translations.docs.comments.donut.hideUnderValue[store.lang]}} </span></span>
                            <span> prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.prefix">, (default: "")</span>
                            <span> suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.suffix">, (default: "")</span>
                            <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                            <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.offsetX" :min="-100" :max="100"/>, (default: 4)</span>
                            <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.offsetY" :min="-100" :max="100"/>, (default: 12)</span>
                            <span>useSerieColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.useSerieColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.useSerieColor" @change="forceChartUpdate()">, (default: false)</span>
                            <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.dataLabels.color">, (default: "#2D353C")</span>
                            <span>showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.showValue" @change="forceChartUpdate()">, (default: true)</span>
                            <span>showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.showPercentage" @change="forceChartUpdate()">, (default: true)</span>
                            <span> boldValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.boldValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.boldValue" @change="forceChartUpdate()">, (default: false)</span>
                            <span> boldPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.boldPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.boldPercentage" @change="forceChartUpdate()">, (default: false)</span>
                            <span> roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                            <span> roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
                            <span>showDonutName: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.showDonutName" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.showDonutName" @change="forceChartUpdate()">, (default: true)</span>
                            <span> boldDonutName: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.boldDonutName" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.boldDonutName" @change="forceChartUpdate()">, (default: true)</span>
                            <span>donutNameAbbreviation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.donutNameAbbreviation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.donutNameAbbreviation" @change="forceChartUpdate()">, (default: true)</span>
                            <span>donutNameMaxAbbreviationSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.donutNameMaxAbbreviationSize" :min="1" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.donutNameMaxAbbreviationSize" :min="1" :max="12"/>, (default: 3)</span>
                            <span>donutNameOffsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.donutNameOffsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.labels.dataLabels.donutNameOffsetY" :min="-100" :max="100"/>, (default: 0)</span>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)</span>
                    <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                    <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
                    <span> bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select></span>
                    <span>paddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <span>paddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
                        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                        <span> bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>showAllItemsAtIndex: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showAllItemsAtIndex" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showAllItemsAtIndex" @change="forceChartUpdate()">, (default: true)</span>
                    <span>  backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>  color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                    <span>showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)</span>
                    <span>showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)</span>
                    <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                    <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
                    <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.borderRadius" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.borderRadius" :min="0" :max="24"/>, (default: 4)</span>
                    <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8")</span>
                    <span>borderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.borderWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.borderWidth" :min="0" :max="12"/>, (default: 1)</span>
                    <span>backgroundOpacity: <input type="range" v-if="isDarkMode" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundOpacity" min="0" max="100"><input v-else type="range" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.backgroundOpacity" min="0" max="100">, (default: 100)</span>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
            <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <span> series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")</span>
                <span> value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")</span>
                <span>percentage: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.percentage"><input v-else type="text" v-model="mutableConfig.table.columnNames.percentage">, (default: "Percentage")</span>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <span> backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")</span>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
                <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
                <span> pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span> csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
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

            </template>

            <template v-slot:tab2>
                @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiNestedDonuts
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiNestedDonutsDatasetItem, index: number }) {
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

            const nestedDonutsChart = ref(null);
            const nestedDonutsDataset = ref([]);

            onMounted(() => {
                nestedDonutsDataset.value = nestedDonutsChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiNestedDonuts
                ref="nestedDonutsChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiNestedDonuts
                ref="nestedDonutsChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        nestedDonutsDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.nestedDonutsDataset = this.$refs.nestedDonutsChart.getData();
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
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiNestedDonuts
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiNestedDonuts&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiNestedDonuts
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiNestedDonuts&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiNestedDonuts
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiNestedDonuts&gt;
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
                <ThemesVueUiNestedDonuts />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiNestedDonuts 
                            :dataset="dataset" 
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