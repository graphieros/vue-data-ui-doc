<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiGauge from "../themes/ThemesVueUiGauge.vue";
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

const dataset1 = ref({
    base: 12250,
    value: 4.2,
    series: [
        {
            from: 1,
            to: 3,
            color: "#ff6400"
        },
        {
            from: 3,
            to: 4,
            color: "#5f8bee"
        },
        {
            from: 4,
            to: 5,
            color: "#42d392",
        },
    ]
});

const dataset2 = ref({
    base: 21200,
    value: -42,
    series: [
        {
            from: -100,
            to: 0,
            color: "#ff6400"
        },
        {
            from: 0,
            to: 100,
            color: "#42d392",
        },
    ]
});

const config = ref({
    responsive: false,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            animation: {
                use: true,
                speed: 1,
                acceleration: 1,
            },
            layout: {
                track: {
                    size: 1,
                    useGradient: true,
                    gradientIntensity: 20,
                },
                markers: {
                    color: "#1A1A1A",
                    bold: true,
                    fontSizeRatio: 1,
                    offsetY: 0,
                    roundingValue: 0,
                },
                pointer: {
                    type: "pointy",
                    size: 1,
                    stroke: "#1A1A1A",
                    strokeWidth: 12,
                    useRatingColor: true,
                    color: "#1A1A1A",
                    circle: {
                        radius: 10,
                        stroke: "#1A1A1A",
                        strokeWidth: 2,
                        color: "#F3F4F6"
                    }
                }
            },
            legend: {
                fontSize: 48,
                prefix: "",
                suffix: "",
                roundingValue: 1,
                showPlusSymbol: true,
                useRatingColor: true,
                color: "#1A1A1A"
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
        }
    },
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
        }
    },
    translations: {
        base: "Base"
    }
});
const darkModeConfig = ref({
    responsive: false,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            animation: {
                use: true,
                speed: 1,
                acceleration: 1,
            },
            layout: {
                track: {
                    size: 1,
                    useGradient: true,
                    gradientIntensity: 20,
                },
                markers: {
                    color: "#CCCCCC",
                    bold: true,
                    fontSizeRatio: 1,
                    offsetY: 0,
                    roundingValue: 0,
                },
                pointer: {
                    type: "pointy",
                    size: 1,
                    stroke: "#CCCCCC",
                    strokeWidth: 12,
                    useRatingColor: true,
                    color: "#1A1A1A",
                    circle: {
                        radius: 10,
                        stroke: "#CCCCCC",
                        strokeWidth: 2,
                        color: "#1A1A1A"
                    }
                }
            },
            legend: {
                fontSize: 48,
                prefix: "",
                suffix: "",
                roundingValue: 1,
                showPlusSymbol: true,
                useRatingColor: true,
                color: "#CCCCCC"
            },
            title: {
                text: "Title",
                color: "#E1E5E8",
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
        }
    },
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
        }
    },
    translations: {
        base: "Base"
    }
});

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
            <VueUiIcon name="chartGauge" stroke="#42d392" :strokeWidth="1.5" />
            VueUiGauge
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.gauge[store.lang] }}
        </p>
        <button v-if="!isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <div class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
                </button>
        <div class="w-3/4 mx-auto flex flex-row gap-2">
            
            <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
                <button v-if="isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <PinnedOffIcon/>
                </button>
                <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <Suspense>
                    <template #default>
                        <VueUiGauge :dataset="dataset1" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                    </template>
                    <template #fallback>
                        <BaseSpinner/>
                    </template>
                </Suspense>
            </div>
            <div class="transition-all w-1/2">
                <Suspense>
                    <template #default>
                        <VueUiGauge :dataset="dataset2" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_2_${key}`"/>
                    </template>
                    <template #fallback>
                        <div class="min-h-[500px]"></div>
                    </template>
                </Suspense>
            </div>
        </div>

        <BaseDocActions
            targetLink="vue-ui-gauge"
            targetMaker="VueUiGauge"
            :configSource="mainConfig.vue_ui_gauge"
        />

        <Box showEmits showSlots showThemes showResponsive schema="vue_ui_gauge">
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiGaugeDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        base: number; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.optional[store.lang] }}</span>
        value: number;
        series: [
            <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.gauge.steps[store.lang] }}</span>
            {
                from: number;
                to: number;
            },
            {
                from: number;
                to: number;
            },
            {...and so on}
        ]
    }
</code>
</pre>                
                </div>

                {{ translations.docs.example[store.lang] }} 1:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiGaugeDataset</span> = {
    base: 12250,
    value: 4.2,
    series: [
        {
            from: 1,
            to: 3,
            color: "#ff6400"
        },
        {
            from: 3,
            to: 4,
            color: "#5f8bee"
        },
        {
            from: 4,
            to: 5,
            color: "#42d392",
        },
    ]
}
</code>
</pre>                
                </div>
                {{ translations.docs.example[store.lang] }}  2:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = {
    base: 21200,
    value: -42,
    series: [
        {
            from: -100,
            to: 0,
            color: "#ff6400"
        },
        {
            from: 0,
            to: 100,
            color: "#42d392",
        },
    ]
}
</code>
</pre>               
                </div>
            </template>
            <template v-slot:tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiGaugeConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiGaugeConfig" equal>
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <BaseDetails attr="animation" :level="3" title="style.chart.animation">
                    <span>use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)</span>
                    <span>speed: 1,</span>
                    <span>acceleration: 1,</span>
                </BaseDetails>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="markers" :level="4" title="style.chart.layout.markers">
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.markers.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.markers.color">, (default: "#2D353C")</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.markers.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.markers.bold" @change="forceChartUpdate()">, (default: true)</span>
                        <span>fontSizeRatio: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.markers.fontSizeRatio" :min="0.5" :max="2" :step="0.1"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.markers.fontSizeRatio" :min="0.5" :max="2" :step="0.1"/>, (default: 1)</span>
                        <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.markers.offsetY" :min="-100" :max="100" @change="forceChartUpdate()" /><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.markers.offsetY" :min="-100" :max="100" @change="forceChartUpdate()"/>, (default: 0)</span>
                        <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.markers.roundingValue" :min="0" :max="6" /><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.markers.roundingValue" :min="0" :max="6" />, (default: 0)</span>
                    </BaseDetails>
                    <BaseDetails attr="pointer" :level="4" title="style.chart.layout.pointer">
                        <span>type: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.layout.pointer.type"><option>rounded</option><option>pointy</option></select><select v-else v-model="mutableConfig.style.chart.layout.pointer.type"><option>rounded</option><option>pointy</option></select>, (default: "rounded")</span>
                        <span>size: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.pointer.size" :min="0.5" :max="2" :step="0.1" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.pointer.size" :min="0.5" :max="2" :step="0.1" @change="forceChartUpdate()"/>, (default: 1)</span>
                        <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.stroke">, (default: "#2D353C")</span>
                        <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.pointer.strokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.pointer.strokeWidth" :min="0" :max="12"/>, (default: 12)</span>
                        <span>useRatingColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.pointer.useRatingColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.pointer.useRatingColor" @change="forceChartUpdate()">, (default: true)</span>
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.color">, (default: "#CCCCCC")<span class="text-app-blue text-xs"> // Active if useRatingColor is false</span></span>
                        <BaseDetails attr="circle" :level="5" title="style.chart.layout.pointer.circle">
                            <span>radius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.pointer.circle.radius" :min="0" :max="24" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.pointer.circle.radius" :min="0" :max="24" @change="forceChartUpdate()"/>, (default: 10)</span>
                            <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.circle.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.circle.stroke">, (default: "#2D353C")</span>
                            <span>strokeWidth:  <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.pointer.circle.strokeWidth" :min="0" :max="24" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.pointer.circle.strokeWidth" :min="0" :max="24" @change="forceChartUpdate()"/>, (default: 2)</span>
                            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.circle.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.circle.color">, (default: "#FFFFFF")</span>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="track" :level="4" title="style.chart.layout.track">
                        <span>size: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.track.size" :min="0.5" :max="2" :step="0.1" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.track.size" :min="0.5" :max="2" :step="0.1" @change="forceChartUpdate()"/>, (default: 1)</span>
                        <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.track.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.track.useGradient" @change="forceChartUpdate()">, (default: true)</span>
                        <span>gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.track.gradientIntensity" :min="1" :max="20"/><input type="range" class="accent-app-blue" v-else v-model="mutableConfig.style.chart.layout.track.gradientIntensity" :min="1" :max="20"/>, (default: 20)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.fontSize" :min="8" :max="100" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.fontSize" :min="8" :max="100" @change="forceChartUpdate()"/>, (default: 48)</span>
                    <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.prefix">, (default: "")</span>
                    <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.suffix">, (default: "")</span>
                    <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                    <span>showPlusSymbol: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.showPlusSymbol" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.showPlusSymbol" @change="forceChartUpdate()">, (default: true)</span>
                    <span>useRatingColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.useRatingColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.useRatingColor" @change="forceChartUpdate()">, (default: true)</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")<span class="text-app-blue text-xs"> // Active if useRatingColor is false</span></span>
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
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="translations" :level="1">
            <span>base: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.base"><input v-else type="text" v-model="mutableConfig.translations.base">, (default: "Base")</span>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
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
    &lt;VueUiGauge
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiGauge&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiGauge
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiGauge&gt;
</code>
</pre> 
            </template>

            <template #tab6>
                <ThemesVueUiGauge />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiGauge 
                            :dataset="dataset1" 
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
                            :key="`gauge_1_${key}`"
                        />
                    </template>
                </ResponsiveUnit>
            </template>
        </Box>
    </div>

</template>