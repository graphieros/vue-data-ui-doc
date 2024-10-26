<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import ConfigAttribute from "../ConfigAttribute.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocActions from "./BaseDocActions.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";

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

</script>

<template>
    <div>
        <VueDataUi component="VueUiCursor" v-if="isActive" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" />
        <div style="min-height:100vh">
            <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
                <VueUiIcon name="cursor" stroke="#42d392" :strokeWidth="1.5" />
                <span>VueUi<span class="text-black dark:text-app-blue-light">Cursor</span></span>
            </h1>
            <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
                {{ translations.docs.tooltips.cursor[store.lang] }}
            </p>

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
                    <div class="overflow-x-auto">
    <pre>
    <code>
    const <span class="text-black dark:text-app-blue">config: VueUiCursorConfig</span> = {
        bubbleEffect: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.bubbleEffect" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.bubbleEffect" @change="forceChartUpdate()">, (default: true) 
        bubbleEffectColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.bubbleEffectColor"><input v-else type="color" v-model="mutableConfig.bubbleEffectColor">, (default: "#FFFFFF")
        bubbleEffectOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.bubbleEffectOpacity"><input v-else type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.bubbleEffectOpacity">, (default: 0.1)
        centerCircleColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.centerCircleColor"><input v-else type="color" v-model="mutableConfig.centerCircleColor">, (default: "#FFFFFF")
        centerCircleOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.centerCircleOpacity"><input v-else type="range" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.centerCircleOpacity">, (default: 0.1),
        centerCircleDasharray: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" step="1" v-model="mutableConfigDarkMode.centerCircleDasharray"><input v-else type="range" class="accent-app-blue" min="0" max="100" step="1" v-model="mutableConfig.centerCircleDasharray">, (default: 0),
        centerCircleRadius: 50,
        centerCircleStroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.centerCircleStroke"><input v-else type="color" v-model="mutableConfig.centerCircleStroke">, (default: "#CCCCCC")
        centerCircleStrokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.01" v-model="mutableConfigDarkMode.centerCircleStrokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.01" v-model="mutableConfig.centerCircleStrokeWidth">, (default: 0.5),
        coordinatesColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.coordinatesColor"><input v-else type="color" v-model="mutableConfig.coordinatesColor">, (default: "#CCCCCC")
        coordinatesFontSize: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="6" max="48" step="1" v-model="mutableConfigDarkMode.coordinatesFontSize"><input v-else type="range" class="accent-app-blue" min="6" max="48" step="1" v-model="mutableConfig.coordinatesFontSize">, (default: 10),
        coordinatesOffset: 0
        crosshairDasharray: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" step="1" v-model="mutableConfigDarkMode.crosshairDasharray"><input v-else type="range" class="accent-app-blue" min="0" max="100" step="1" v-model="mutableConfig.crosshairDasharray">, (default: 0),
        crosshairStroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.crosshairStroke"><input v-else type="color" v-model="mutableConfig.crosshairStroke">, (default: "#CCCCCC")
        crosshairStrokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.01" v-model="mutableConfigDarkMode.crosshairStrokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.01" v-model="mutableConfig.crosshairStrokeWidth">, (default: 0.5),
        intersectCirclesFill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.intersectCirclesFill"><input v-else type="color" v-model="mutableConfig.intersectCirclesFill">, (default: "#CCCCCC")
        intersectCirclesRadius: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.01" v-model="mutableConfigDarkMode.intersectCirclesRadius"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.01" v-model="mutableConfig.intersectCirclesRadius">, (default: 2),
        isLoading: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.isLoading" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.isLoading" @change="forceChartUpdate()">, (default: false) 
        parentId: "", // By default will attach to the first div of your page.
        showCenterCircle: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showCenterCircle" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showCenterCircle" @change="forceChartUpdate()">, (default: true) 
        showCoordinates: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showCoordinates" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showCoordinates" @change="forceChartUpdate()">, (default: true) 
        showCrosshair: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showCrosshair" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showCrosshair" @change="forceChartUpdate()">, (default: true) 
        showIntersectCircles: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showIntersectCircles" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showIntersectCircles" @change="forceChartUpdate()">, (default: true) 
        useWaveOnClick: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useWaveOnClick" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useWaveOnClick" @change="forceChartUpdate()">, (default: true) 
    }
    </code>
    </pre>                    
                    </div>
                </template>
            </Box>
        </div>
    </div>
</template>