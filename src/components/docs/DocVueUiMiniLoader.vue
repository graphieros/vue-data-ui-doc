<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
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

const config = ref({
  type: "onion",
  onion: {
    gutterColor: "#CCCCCC",
    gutterOpacity: 0.3,
    gutterBlur: 0,
    trackHueRotate: 360,
    trackBlur: 1,
    trackColor: "#42d392"
  },
  line: {
    gutterColor: "#CCCCCC",
    gutterOpacity: 0.3,
    gutterBlur: 0,
    trackHueRotate: 360,
    trackBlur: 1,
    trackColor: "#42d392"
  },
  bar: {
    gutterColor: "#CCCCCC",
    gutterOpacity: 0.3,
    gutterBlur: 0,
    trackHueRotate: 360,
    trackBlur: 1,
    trackColor: "#42d392"
  }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
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

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartWheel" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">MiniLoader</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.miniLoader[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-mini-loader"
            :configSource="mainConfig.vue_ui_mini_loader"
        />

        <div :class="`transition-all mx-auto w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <div class="flex flex-row gap-6 place-items-center justify-center max-w-[300px] mx-auto">            
                    <VueUiMiniLoader :config="{...mutableConfig, type: 'line'}" :key="key"/>
                    <VueUiMiniLoader :config="{...mutableConfig, type: 'bar'}" :key="key"/>
                    <VueUiMiniLoader :config="mutableConfig" :key="key"/>
                </div>
            </DocSnapper>
        </div>

        <Box :activeTab="1">
            <template #tab0>
                {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiMiniLoaderConfig</code>
                </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiMiniLoaderConfig</span> = {
    type: "line" | "bar" | "onion", (default: "onion")
    line: {
        gutterColor: <input type="color" v-model="mutableConfig.line.gutterColor">, (default: "#CCCCCC")
        gutterOpacity: <input type="number" min="0" max="1" step="0.1" v-model="mutableConfig.line.gutterOpacity">, (default: 0.3)
        gutterBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.line.gutterBlur">, (default: 0)
        trackHueRotate: <input type="number" min="0" max="360" step="1" v-model="mutableConfig.line.trackHueRotate">, (default: 20)
        trackBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.line.trackBlur">, (default: 1)
        trackColor: <input type="color" v-model="mutableConfig.line.trackColor">, (default: "#42d392")
    },
    bar: {
        gutterColor: <input type="color" v-model="mutableConfig.onion.gutterColor">, (default: "#CCCCCC")
        gutterOpacity: <input type="number" min="0" max="1" step="0.1" v-model="mutableConfig.bar.gutterOpacity">, (default: 0.3)
        gutterBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.bar.gutterBlur">, (default: 0)
        trackHueRotate: <input type="number" min="0" max="360" step="1" v-model="mutableConfig.bar.trackHueRotate">, (default: 20)
        trackBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.bar.trackBlur">, (default: 1)
        trackColor: <input type="color" v-model="mutableConfig.bar.trackColor">, (default: "#42d392")
    },
    onion: {
        gutterColor: <input type="color" v-model="mutableConfig.onion.gutterColor">, (default: "#CCCCCC")
        gutterOpacity: <input type="number" min="0" max="1" step="0.1" v-model="mutableConfig.onion.gutterOpacity">, (default: 0.3)
        gutterBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.onion.gutterBlur">, (default: 0)
        trackHueRotate: <input type="number" min="0" max="360" step="1" v-model="mutableConfig.onion.trackHueRotate">, (default: 20)
        trackBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.onion.trackBlur">, (default: 1)
        trackColor: <input type="color" v-model="mutableConfig.onion.trackColor">, (default: "#42d392")
    },
}
</code>
</pre>
            </template>
        </Box>
    </div>
</template>