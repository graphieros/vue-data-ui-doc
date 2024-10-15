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
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";

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
    forceChartUpdate();
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
        <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
        <span>theme: "", <BaseComment>"zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="animation" :level="3" title="style.chart.animation">
                    <BaseAttr name="use" attr="style.chart.animation.use" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="speed" attr="style.chart.animation.speed" type="range" defaultVal="1" :min="1" :max="100" :step="1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="acceleration" attr="style.chart.animation.acceleration" type="range" defaultVal="1" :min="0.1" :max="5" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseDetails attr="markers" :level="4" title="style.chart.layout.markers">
                        <BaseAttr name="color" attr="style.chart.layout.markers.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.layout.markers.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSizeRatio" attr="style.chart.layout.markers.fontSizeRatio" type="range" defaultVal="1" :min="0.5" :max="2" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.layout.markers.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="roundingValue" attr="style.chart.layout.markers.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="pointer" :level="4" title="style.chart.layout.pointer">
                        <BaseAttr name="type" attr="style.chart.layout.pointer.type" type="select" defaultVal="rounded" :options="['rounded', 'pointy']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="size" attr="style.chart.layout.pointer.size" type="range" defaultVal="1" :min="0.5" :max="1.4" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.pointer.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.pointer.strokeWidth" type="number" defaultVal="12" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" comment="Usable with pointer type rounded"/>
                        <BaseAttr name="useRatingColor" attr="style.chart.layout.pointer.useRatingColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.layout.pointer.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="With useRatingColor set to false"/>
                        <BaseDetails attr="circle" :level="5" title="style.chart.layout.pointer.circle">
                            <BaseAttr name="radius" attr="style.chart.layout.pointer.circle.radius" type="number" defaultVal="10" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseAttr name="stroke" attr="style.chart.layout.pointer.circle.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="strokeWidth" attr="style.chart.layout.pointer.circle.strokeWidth" type="number" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.layout.pointer.circle.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="track" :level="4" title="style.chart.layout.track">
                        <BaseAttr name="size" attr="style.chart.layout.track.size" type="range" defaultVal="1" :min="0.5" :max="4.5" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="useGradient" attr="style.chart.layout.track.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="gradientIntensity" attr="style.chart.layout.track.gradientIntensity" type="range" defaultVal="20" :min="8" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="48" :min="8" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="prefix" attr="style.chart.legend.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="suffix" attr="style.chart.legend.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingValue" attr="style.chart.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showPlusSymbol" attr="style.chart.legend.showPlusSymbol" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="useRatingColor" attr="style.chart.legend.useRatingColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="With useRatingColor set to false" />
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    </BaseDetails>
                    </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="translations" :level="1">
            <BaseAttr name="base" attr="translations.base" type="text" defaultVal="Base" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiGauge
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
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