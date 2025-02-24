<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
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

const dataset = ref(66);

const config = ref({
    type: 'battery',
    size: 82,
    stroke: "#9A9A9A",
    color: "#5f8aee",
    useGradient: true,
    gradientColor: '#9db5ed',
    showPercentage: true,
    textColor: "#1A1A1A",
    fontFamily: 'inherit'
})

const darkModeConfig = ref({
    type: 'battery',
    size: 82,
    stroke: "#6A6A6A",
    color: "#42d392",
    useGradient: true,
    gradientColor: '#79dbaf',
    showPercentage: true,
    textColor: "#CCCCCC",
    fontFamily: 'inherit'
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
        <BaseDocTitle name="VueUiGizmo" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.gizmo[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-gizmo"
            targetMaker="VueUiGizmo"
            :configSource="mainConfig.vue_ui_gizmo"
        />

        <div :class="`transition-all mx-auto w-1/2 max-w-[200px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <div class="w-full flex place-items-center justify-center gap-4 py-6">
                    <VueUiGizmo :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode: mutableConfig"/>
                </div>
            </DocSnapper>
            <Rater itemId="vue_ui_gizmo" />
        </div>

        <Box schema="vue_ui_gizmo" signInfo="positiveOnly">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="my-4">
                    TS type: <code class="text-app-green"> VueUiGizmoDataset</code>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiGizmoDataset</span> = 66.4                  
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
                    TS type: <code class="text-app-blue"> VueUiGizmoConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiGizmoConfig" equal>
        <BaseAttr name="type" attr="type" type="select" defaultVal="battery" :options="['battery', 'gauge']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="size" attr="size" type="number" defaultVal="64" :min="12" :max="128" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="stroke" attr="stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="useGradient" attr="useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="gradientColor" attr="gradientColor" type="color" defaultVal="#9DB5ED" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="showPercentage" attr="showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="textColor" attr="textColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
    </BaseDetails>
</code>
            </template>
        </Box>
    </div>
</template>