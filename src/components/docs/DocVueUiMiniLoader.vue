<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";

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
  type: "onion",
  onion: {
    gutterColor: "#CCCCCC",
    gutterOpacity: 0,
    gutterBlur: 0,
    trackHueRotate: 360,
    trackBlur: 1,
    trackColor: "#42d392"
  },
  line: {
    color: "#42d392",
    blur: 1,
    hueRotate: 360
  },
  bar: {
    color: "#42d392",
    blur: 1,
    hueRotate: 360
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
} 

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartWheel" stroke="#42d392" :strokeWidth="1.5" />
            VueUiMiniLoader
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.donut[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
            <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <div class="flex flex-row gap-6 place-items-center justify-center max-w-[300px] mx-auto">            
                <VueUiMiniLoader :config="mutableConfig" :key="key"/>
                <VueUiMiniLoader :config="{...mutableConfig, type: 'line'}" :key="key"/>
                <VueUiMiniLoader :config="{...mutableConfig, type: 'bar'}" :key="key"/>
            </div>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_mini_loader)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-mini-loader"/>
        </div>
        <Box>
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
    onion: {
        gutterColor: <input type="color" v-model="mutableConfig.onion.gutterColor">, (default: "#CCCCCC")
        gutterOpacity: <input type="number" min="0" max="1" step="0.1" v-model="mutableConfig.onion.gutterOpacity">, (default: 0)
        gutterBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.onion.gutterBlur">, (default: 0)
        trackHueRotate: <input type="number" min="0" max="360" step="1" v-model="mutableConfig.onion.trackHueRotate">, (default: 20)
        trackBlur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.onion.trackBlur">, (default: 5)
        trackColor: <input type="color" v-model="mutableConfig.onion.trackColor">, (default: "#42d392")
    },
    line: {
        color: <input type="color" v-model="mutableConfig.line.color">, (default: "#42d392"),
        blur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.line.blur">, (default: 1)
        hueRotate: <input type="number" min="0" max="360" step="1" v-model="mutableConfig.line.hueRotate">, (default: 20)
    },
    bar: {
        color: <input type="color" v-model="mutableConfig.bar.color">, (default: "#42d392"),
        blur: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.bar.blur">, (default: 1)
        hueRotate: <input type="number" min="0" max="360" step="1" v-model="mutableConfig.bar.hueRotate">, (default: 20)
    }
}
</code>
</pre>
            </template>
        </Box>
    </div>
</template>