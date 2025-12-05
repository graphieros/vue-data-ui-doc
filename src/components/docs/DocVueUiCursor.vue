<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";

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

const config = ref({
    bubbleEffect: true,
    bubbleEffectColor: "#FFFFFF",
    bubbleEffectOpacity: 0.1,
    centerCircleColor: "#FFFFFF",
    centerCircleDasharray: 0,
    centerCircleOpacity: 0,
    centerCircleRadius: 50,
    centerCircleStroke: "#1A1A1A",
    centerCircleStrokeWidth: 0.5,
    coordinatesColor: "#1A1A1A",
    coordinatesFontSize: 10,
    coordinatesOffset: 0,
    crosshairDasharray: 0,
    crosshairStroke: "#1A1A1A",
    crosshairStrokeWidth: 0.5,
    intersectCirclesFill: "#1A1A1A",
    intersectCirclesRadius: 2,
    isLoading: false,
    parentId: "",
    showCenterCircle: true,
    showCoordinates: true,
    showCrosshair: true,
    showIntersectCircles: true,
    useWaveOnClick: true
})

const darkModeConfig = ref({
    bubbleEffect: true,
    bubbleEffectColor: "#FFFFFF",
    bubbleEffectOpacity: 0.1,
    centerCircleColor: "#FFFFFF",
    centerCircleDasharray: 0,
    centerCircleOpacity: 0,
    centerCircleRadius: 50,
    centerCircleStroke: "#CCCCCC",
    centerCircleStrokeWidth: 0.5,
    coordinatesColor: "#CCCCCC",
    coordinatesFontSize: 10,
    coordinatesOffset: 0,
    crosshairDasharray: 0,
    crosshairStroke: "#CCCCCC",
    crosshairStrokeWidth: 0.5,
    intersectCirclesFill: "#CCCCCC",
    intersectCirclesRadius: 2,
    isLoading: false,
    parentId: "",
    showCenterCircle: true,
    showCoordinates: true,
    showCrosshair: true,
    showIntersectCircles: true,
    useWaveOnClick: true
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

const isActive = ref(true);

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <VueDataUi component="VueUiCursor" v-if="isActive" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" />
        <div style="min-height:100vh">
            <BaseDocTitle name="VueUiCursor"/>

            <BaseDocDescription :text="translations.docs.tooltips.cursor[store.lang]" />

            <BaseDocHeaderActions
                targetLink="vue-ui-cursor"
                :configSource="mainConfig.vue_ui_cursor"
            />

            <div class="my-12 w-full flex place-items-center justify-center">
                <button :class="`select-none flex flex-col gap-2 place-items-center justify-center h-[100px] w-[100px] rounded-full text-black shadow-md cursor-pointer ${isActive ? 'bg-app-orange' : 'bg-app-green'} transition-colors`" @click="isActive = !isActive">
                    <VueUiIcon :name="isActive ? 'squareFill' : 'arrowRight'" stroke="#1A1A1A"/>
                    {{ isActive ? 'STOP' : 'START' }}
                </button>
            </div>
            <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
    
                <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
            </div>

            <Box :activeTab="1" >
                <template #tab0>
                    {{ translations.docs.comments.noDataset[store.lang] }}
                </template>
                <template #tab1>
                    <div class="flex gap-2">
                            <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                            <button @click="copyToClipboard" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                        </div>
                    
                    <div class="mt-4">
                        TS type: <code class="text-app-blue">VueUiCursorConfig</code>
                    </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiCursorConfig" equal>
        <BaseAttr name="bubbleEffect" attr="bubbleEffect" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bubbleEffectColor" attr="bubbleEffectColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bubbleEffectOpacity" attr="bubbleEffectOpacity" type="range" defaultVal="0.1" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>

        <BaseAttr name="showCenterCircle" attr="showCenterCircle" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="centerCircleColor" attr="circleCenterColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="centerCircleDasharray" attr="centerCircleDasharray" type="range" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="centerCircleOpacity" attr="centerCircleOpacity" type="range" defaultVal="0" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="centerCircleRadius" attr="centerCircleRadius" type="range" defaultVal="50" :min="20" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="centerCircleStroke" attr="centerCircleStroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="centerCircleStrokeWidth" attr="centerCircleStrokeWidth" type="range" defaultVal="0.5" :min="0" :max="24" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>

        <BaseAttr name="showCoordinates" attr="showCoordinates" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="coordinatesColor" attr="coordinatesColor" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="coordinatesFontSize" attr="coordinatesFontSize" type="range" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="coordinatesOffset" attr="coordinatesOffset" type="range" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>

        <BaseAttr name="showCrosshair" attr="showCrosshair" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="crosshairDasharray" attr="crosshairDasharray" type="range" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="crosshairStroke" attr="crosshairStroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="crosshairStrokeWidth" attr="crosshairStrokeWidth" type="range" defaultVal="0.5" :min="0" :max="24" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>

        <BaseAttr name="showIntersectCircles" attr="showIntersectCircles" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="intersectCirclesFill" attr="intersectCirclesFill" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="intersectCirclesRadius" attr="intersectCirclesRadius" type="range" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="isLoading" attr="isLoading" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="parentId" attr="parentId" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Use an id to only show the cursor on a specific element" />
        <BaseAttr name="useWaveOnClick" attr="useWaveOnClick" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    </BaseDetails>
</code>

                </template>
            </Box>
        </div>
    </div>
</template>