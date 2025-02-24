<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const dataset0 = ref(299792458);
const dataset1 = ref(40075);
const dataset2 = ref(384400);

const config = ref({
    animationFrames: 60,
    animationValueStart: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: "inherit",
    layoutClass: "bg-white p-4 rounded-md shadow-md mb-6",
    prefix: "",
    suffix: "m/s",
    title: "Speed of light",
    titleBold: true,
    titleColor: "#2D353C",
    titleClass: "",
    titleCss: "",
    titleFontSize: 16,
    useAnimation: true,
    valueBold: true,
    valueColor: "#6376DD",
    valueClass: "tabular-nums",
    valueCss: "",
    valueFontSize: 32,
    valueRounding: 0,
    analogDigits: {
        show: false,
        height: 40,
        color: '#1A1A1A',
        skeletonColor: "#E1E5E8"
    }
})

const darkModeConfig = ref({
    animationFrames: 60,
    animationValueStart: 0,
    backgroundColor: "#2A2A2A",
    fontFamily: "inherit",
    layoutClass: "p-4 rounded-md shadow-md mb-6",
    prefix: "",
    suffix: " m/s",
    title: "Speed of light",
    titleBold: true,
    titleColor: "#CCCCCC",
    titleClass: "",
    titleCss: "",
    titleFontSize: 16,
    useAnimation: true,
    valueBold: true,
    valueColor: "#6376DD",
    valueClass: "tabular-nums",
    valueCss: "",
    valueFontSize: 32,
    valueRounding: 0,
    analogDigits: {
        show: false,
        height: 40,
        color: '#6376DD',
        skeletonColor: "#2A2A2A"
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

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiKpi" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.kpi[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-kpi"
            targetMaker="VueUiKpi"
            :configSource="mainConfig.vue_ui_kpi"
        />

        <div class="w-full mx-auto flex flex-row gap-4 flex-grow place-items-center justify-center">
            <Suspense>
                <template #default>
                    <VueDataUi component="VueUiKpi" :dataset="dataset0" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`kpi0_${key}`">
                        <template #comment-before>
                            <div class="max-w-[300px] text-[10px] mt-2 text-gray-500">According to the special theory of relativity, c is the upper limit for the speed at which conventional matter or energy (and thus any signal carrying information) can travel through space</div>
                        </template>
                    </VueDataUi>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>
        <Rater itemId="vue_ui_kpi" />

        <Box showSlots schema="vue_ui_kpi">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="my-4">
                    TS type: <code class="text-app-green">number</code>
                </div>
                {{ translations.docs.example[store.lang] }}
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = 299792458;
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
                    TS type: <code class="text-app-blue">VueUiKpiConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiKpiConfig" equal>
        <BaseAttr name="animationFrames" attr="animationFrames" type="number" defaultVal="60" :min="0" :max="1000" :step="20" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="backgroundColor" attr="backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>fontFamily: "inherit",</span>
        <BaseAttr name="layoutClass" attr="layoutClass" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="layoutCss" attr="layoutCss" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="prefix" attr="prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="suffix" attr="suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="title" attr="title" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleBold" attr="titleBold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleColor" attr="titleColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleClass" attr="titleClass" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleCss" attr="titleCss" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="titleFontSize" attr="titleFontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useAnimation" attr="useAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueBold" attr="valueBold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueClass" attr="valueClass" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueCss" attr="valueCss" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueFontSize" attr="valueFontSize" type="number" defaultVal="32" :min="8" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueRounding" attr="valueRounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="analogDigits" :level="1">
            <BaseAttr name="show" attr="analogDigits.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="height" attr="analogDigits.height" type="number" defaultVal="40" :min="20" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="analogDigits.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="skeletonColor" attr="analogDigits.skeletonColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiKpi"
                    :types="[
                        'title_',
                        'value',
                        'comment-before',
                        'comment-after',
                    ]" 
                />
            </template>
        </Box>
    </div>
</template>