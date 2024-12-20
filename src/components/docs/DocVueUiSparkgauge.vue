<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkgauge from "../themes/ThemesVueUiSparkgauge.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";

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
    value: -6,
    min: -10,
    max: 10,
    title: "KPI 1"
})
const dataset2 = ref({
    value: 0,
    min: -10,
    max: 10,
    title: "KPI 2"
})
const dataset3 = ref({
    value: 8,
    min: -10,
    max: 10,
    title: "KPI 3"
})

const config = ref({
    style: {
        fontFamily: "inherit",
        background: "#F3F4F6",
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

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        background: "#1A1A1A00",
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

const { configCode, showAllConfig } = useConfigCode()

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomizeData() {
    dataset1.value.value = getRandomNumber(-10, 10);
    dataset2.value.value = getRandomNumber(-10, 10);
    dataset3.value.value = getRandomNumber(-10, 10);
}

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartGauge" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Sparkgauge</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.gauge[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkgauge"
            targetMaker="VueUiSparkgauge"
            :configSource="mainConfig.vue_ui_sparkgauge"
        />

        <button v-if="!isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <div class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
                </button>
        <div class="w-3/4 mx-auto flex flex-row gap-2">
            
            <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : ''}`">
                <button v-if="isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <PinnedOffIcon/>
                </button>
                <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="flex flex-row gap-4">
                    <div class="w-[100px]">
                        <Suspense>
                            <template #default>
                                <VueUiSparkgauge :dataset="dataset1" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                            </template>
                            <template #fallback>
                                <BaseSpinner/>
                            </template>
                        </Suspense>
                    </div>
                    <div class="w-[100px]">
                        <Suspense>
                            <template #default>
                                <VueUiSparkgauge :dataset="dataset2" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                            </template>
                            <template #fallback>
                                <div class="min-h-[100px]"></div>
                            </template>
                        </Suspense>
                    </div>
                    <div class="w-[100px]">
                        <Suspense>
                            <template #default>
                                <VueUiSparkgauge :dataset="dataset3" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                            </template>
                            <template #fallback>
                                <div class="min-h-[100px]"></div>
                            </template>
                        </Suspense>
                    </div>
                </div>
                <BaseRandomButton @click="randomizeData"/>
            </div>
        </div>

        <Box showThemes showSlots schema="vue_ui_sparkgauge">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiSparkgaugeDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
    {
        value: number;
        min: number;
        max: number;
        title?: string;
    }
</code>
</pre>                     
                </div>
                {{ translations.docs.example[store.lang] }}
                <div class="w-full overflow-x auto">
<pre>
<code>
    const <span class="text-black dark:text-app-green">dataset: VueUiSparkgaugeDataset</span> = {
        value: -8,
        min: -10,
        max: 10,
        title: 'KPI 1'
    }
</code>
</pre>               
                </div>
            </template>
            <template #tab1>
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
    <BaseDetails attr="const config: VueUiSparkgaugeConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <BaseDetails attr="style" level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="background" attr="style.background" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="height" attr="style.height" type="number" defaultVal="84" :min="84" :max="150" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="basePosition" attr="style.basePosition" type="number" defaultVal="72" :min="72" :max="150" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="animation" :level="2" title="style.animation">
                <BaseAttr name="show" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="speedMs" attr="style.animation.speedMs" type="number" defaultVal="150" :min="10" :max="500" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="colors" :level="2" title="style.colors">
                <BaseAttr name="min" attr="style.colors.min" type="color" defaultVal="#DC3912" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="max" attr="style.colors.max" type="color" defaultVal="#2CA02C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="showGradient" attr="style.colors.showGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="dataLabel" :level="2" title="style.dataLabel">
                <BaseAttr name="fontSize" attr="style.dataLabel.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="autoColor" attr="style.dataLabel.autoColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.dataLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="style.dataLabel.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="style.dataLabel.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="rounding" attr="style.dataLabel.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="prefix" attr="style.dataLabel.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="suffix" attr="style.dataLabel.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
            </BaseDetails>
            <BaseDetails attr="gutter" :level="2" title="style.gutter">
                <BaseAttr name="color" attr="style.gutter.color" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeLinecap" attr="style.gutter.strokeLinecap" type="select" defaultVal="round" :options="['round', 'square', 'butt']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="title" :level="2" title="style.title">
                <BaseAttr name="show" attr="style.title.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="position" attr="style.title.position" type="select" defaultVal="top" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="track" :level="2" title="style.track">
                <!-- <BaseAttr name="autoColor" attr="style.track.autoColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="style.track.color" type="color" defaultVal="#5F88EE" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/> -->
                <BaseAttr name="strokeLinecap" attr="style.track.strokeLinecap" type="select" defaultVal="round" :options="['round', 'square', 'butt']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>

                <div class="overflow-w-auto">
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiSparkgauge"
                    :types="[
                        'source'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiSparkgauge />
            </template>
        </Box>
    </div>
</template>