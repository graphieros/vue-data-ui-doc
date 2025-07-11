<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkgauge from "../themes/ThemesVueUiSparkgauge.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);

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
            fontSize: 36,
            autoColor: true,
            color: "#1A1A1A",
            offsetY: -2,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: lang.value === 'zh' ? '#00FF00' : "#FF0000",
            max: lang.value === 'zh' ? '#FF0000' : "#00FF00",
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
            color: "#8A8A8A"
        },
        dataLabel: {
            fontSize: 36,
            autoColor: true,
            color: "#CCCCCC",
            offsetY: -2,
            bold: true,
            rounding: 0,
            prefix: "",
            suffix: ""
        },
        colors: {
            min: lang.value === 'zh' ? '#00FF00' : "#FF0000",
            max: lang.value === 'zh' ? '#FF0000' : "#00FF00",
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

watch(() => lang.value, (v) => {
    mutableConfig.value.style.colors.min = v === 'zh' ? '#00FF00' : '#FF0000';
    mutableConfig.value.style.colors.max = v === 'zh' ? '#FF0000' : '#00FF00';
    mutableConfigDarkMode.value.style.colors.min = v === 'zh' ? '#00FF00' : '#FF0000';
    mutableConfigDarkMode.value.style.colors.max = v === 'zh' ? '#FF0000' : '#00FF00';
})

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

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomizeData() {
    dataset1.value.value = getRandomNumber(-10, 10);
    dataset2.value.value = getRandomNumber(-10, 10);
    dataset3.value.value = getRandomNumber(-10, 10);
}

const dsTypeCode = computed(() => {
    return `type VueUiSparkgaugeDataset = {
    value: number
    min: number
    max: number
    title?: string
}`
})

const codeDataset = ref(`const dataset: VueUiSparkgaugeDataset = {
    value: -8,
    min: -10,
    max: 10,
    title: "KPI 1"
}`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiSparkgauge" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.gauge[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkgauge"
            targetMaker="VueUiSparkgauge"
            :configSource="mainConfig.vue_ui_sparkgauge"
        />

        <div class="w-3/4 mx-auto flex flex-row gap-2 max-w-[400px]">
            
            <div :class="`transition-all mx-auto`">
                <DocSnapper
                    :isFixed="isFixed"
                    :disabled="!isFixed || isMobile"
                    @fixChart="fixChart"
                    @resetDefault="resetDefault"
                    @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                >
                    <div class="flex flex-row gap-4">
                        <VueUiSparkgauge :dataset="dataset1" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                        <VueUiSparkgauge :dataset="dataset2" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                        <VueUiSparkgauge :dataset="dataset3" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
                    </div>
                </DocSnapper>

                <BaseRandomButton @click="randomizeData"/>

                <Rater itemId="vue_ui_sparkgauge" />
            </div>
        </div>

        <Box showThemes showSlots schema="vue_ui_sparkgauge">
            <template #tab0>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

    <CodeParser
        language="typescript"
        @copy="store.copy()"
        :content="dsTypeCode"
        :title="translations.docs.datastructure[store.lang]"
        class="my-6"
    />  
    
    <CodeParser
      language="typescript"
      @copy="store.copy()"
      :content="codeDataset"
      :title="translations.docs.example[store.lang]"
    />  
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiSparkgaugeConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiSparkgaugeConfig" equal>
        <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
        <BaseDetails attr="style" level="1">
            <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
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
                <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
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
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiSparkgauge />
            </template>
        </Box>
    </div>
</template>