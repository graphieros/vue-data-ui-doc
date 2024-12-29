<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkTrend from "../themes/ThemesVueUiSparkTrend.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const positiveDs = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
const neutralDs = ref([10, 12, 8, 4, 9, 6, 7, 4, 8, 8])
const negativeDs = ref([89, 55, 34, 21, 13, 8, 5, 3, 2, 1])

const config = ref({
    downsample: {
        threshold: 500
    },
    style: {
        backgroundColor: "#F3F4F6",
        fontFamily: "inherit",
        animation: {
            show: true,
            animationFrames: 20
        },
        line: {
            stroke: "#2D353C",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            smooth: true,
            useColorTrend: true
        },
        area: {
            show: true,
            useGradient: true,
            opacity: 20
        },
        dataLabel: {
            show: true,
            useColorTrend: true,
            color: "#2D353C",
            fontSize: 14,
            bold: false,
            prefix: "",
            suffix: "",
            rounding: 0
        },
        trendLabel: {
            trendType: "n-1",
            useColorTrend: true,
            color: "#2D353C",
            fontSize: 14,
            bold: true,
            rounding: 0
        },
        arrow: {
            colors: {
                positive: "#42d392",
                neutral: "#7f7f7f",
                negative: "#ff6400"
            }
        },
        padding: {
            top: 12,
            left: 82,
            right: 12,
            bottom: 12
        }
    }
})

const darkModeConfig = ref({
    downsample: {
        threshold: 500
    },
    style: {
        backgroundColor: "#1A1A1A00",
        fontFamily: "inherit",
        animation: {
            show: true,
            animationFrames: 20
        },
        line: {
            stroke: "#CCCCCC",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            smooth: true,
            useColorTrend: true
        },
        area: {
            show: true,
            useGradient: true,
            opacity: 20
        },
        dataLabel: {
            show: true,
            useColorTrend: true,
            color: "#CCCCCC",
            fontSize: 14,
            bold: false,
            prefix: "",
            suffix: "",
            rounding: 0
        },
        trendLabel: {
            trendType: "n-1",
            useColorTrend: true,
            color: "#CCCCCC",
            fontSize: 14,
            bold: true,
            rounding: 0
        },
        arrow: {
            colors: {
                positive: "#42d392",
                neutral: "#7f7f7f",
                negative: "#ff6400"
            }
        },
        padding: {
            top: 12,
            left: 82,
            right: 12,
            bottom: 12
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
    store.docSnap = !store.docSnap;
} 

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="trend" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">SparkTrend</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.trend[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-spark-trend"
            :configSource="mainConfig.vue_ui_spark_trend"
        />

        <div :class="`transition-all mx-auto w-1/2 max-w-[350px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <div class="flex flex-col gap-4 mx-auto">
                    <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                    <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                    <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                </div>
            </DocSnapper>
        </div>

        <Box showThemes showSlots schema="vue_ui_spark_trend" signInfo="both">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="border-b my-6 pb-6 border-gray-700">
                    TS type: <code class="text-app-green">number[]</code>
                </div>
                <div class="w-full">
                    {{ translations.docs.example[store.lang] }} :
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = [1, 2, 3, 5, 8, -13, 21, 34];
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
                    TS type: <code class="text-app-blue">VueUiSparkTrendConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiSparkTrendConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <BaseDetails attr="downsample" :level="1">
            <BaseAttr name="threshold" attr="downsample.threshold" type="number" defaultVal="500" :min="100" :max="5000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Threshold above which LTTB algorithm kicks in"/>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseDetails attr="animation" :level="2" title="style.animation">
                <BaseAttr name="animation" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="animationFrames" attr="style.animation.animationFrames" type="number" defaultVal="20" :min="5" :max="60" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="area" :level="2" title="style.area">
                <BaseAttr name="show" attr="style.area.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useGradient" attr="style.area.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="opacity" attr="style.area.opacity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="arrow" :level="2" title="style.arrow">
                <BaseDetails attr="colors" :level="3" title="style.arrow.colors">
                    <BaseAttr name="positive" attr="style.arrow.colors.positive" type="color" defaultVal="#2CA02C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="neutral" attr="style.arrow.colors.neutral" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="negative" attr="style.arrow.colors.negative" type="color" defaultVal="#DC3912" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="dataLabel" :level="2" title="style.dataLabel">
                <BaseAttr name="show" attr="style.dataLabel.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useColorTrend" attr="style.dataLabel.useColorTrend" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.dataLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="style.dataLabel.fontSize" type="number" defaultVal="14" :min="6" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="style.dataLabel.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="prefix" attr="style.dataLabel.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="suffix" attr="style.dataLabel.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="rounding" attr="style.dataLabel.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
            </BaseDetails>
            <BaseDetails attr="line" :level="2" title="style.line">
                <BaseAttr name="useColorTrend" attr="style.line.useColorTrend" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="stroke" attr="style.line.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeWidth" attr="style.line.strokeWidth" type="number" defaultVal="2" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeLinecap" attr="style.line.strokeLinecap" type="select" defaultVal="round" :options="['round', 'square', 'butt']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeLinejoin" attr="style.line.strokeLinejoin" type="select" defaultVal="round" :options="['round', 'bevel', 'arcs', 'miter', 'miter-clip']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="smooth" attr="style.line.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="padding" :level="2" title="style.padding">
                <BaseAttr name="top" attr="style.padding.top" type="number" defaultVal="12" :min="0" :max="120" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="right" attr="style.padding.right" type="number" defaultVal="12" :min="0" :max="120" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bottom" attr="style.padding.bottom" type="number" defaultVal="12" :min="0" :max="120" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="left" attr="style.padding.left" type="number" defaultVal="82" :min="0" :max="120" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="trendLabel" :level="2" title="style.trendLabel">
                <BaseAttr name="trendType" attr="style.trendLabel.trendType" type="select" defaultVal="global" :options="['global', 'n-1', 'lastToFirst']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useColorTrend" attr="style.trendLabel.useColorTrend" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.trendLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="style.trendLabel.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="bold" attr="style.trendLabel.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="rounding" attr="style.trendLabel.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiSparkTrend"
                    :types="[
                        'source'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiSparkTrend />
            </template>
        </Box>
    </div>
</template>