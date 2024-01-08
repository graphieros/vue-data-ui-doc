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

const dataset = ref(299792458);

const config = ref({
  height: "100%",
  width: null,
  backgroundColor: "#F3F4F6",
  digits: {
    color: "#2D353C",
    skeletonColor: "#e1e5e8"
  }
});

const darkModeConfig = ref({
  height: "100%",
  width: null,
  backgroundColor: "#1A1A1A",
  digits: {
    color: "#42d392",
    skeletonColor: "#3A3A3A"
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


</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="digit8" stroke="#42d392" :strokeWidth="1.5" />
            VueUiDigits
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.digits[store.lang] }}
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
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <div style="height: 64px" class="mx-auto flex justify-center">
            
            <VueUiDigits :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </div>
            <div class="mt-6 mx-auto flex place-items-center justify-center gap-4">
                {{ translations.docs.comments.screenshot.tryIt[store.lang] }}:
                <input type="number" v-model="dataset">
            </div>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_digits)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-digits"/>
        </div>

        <Box>
            <template #tab0>
                {{ translations.docs.example[store.lang] }} :
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = 299792458;
</code>
</pre>

            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>                     
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiDigitsConfig</code>
                </div>
<pre>
<code>
const <span class="text-app-blue">config: VueUiDigitsConfig</span> = {
    height: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.height"><input v-else type="text" v-model="mutableConfig.height">, (type: string; default: "100%")
    width: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.width"><input v-else type="text" v-model="mutableConfig.width">, (type: string; default: null)
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.backgroundColor"><input v-else type="color" v-model="mutableConfig.backgroundColor">, (default: "#FFFFFF")
    digits: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.digits.color"><input v-else type="color" v-model="mutableConfig.digits.color">, (default: "#2D353C")
        skeletonColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.digits.skeletonColor"><input v-else type="color" v-model="mutableConfig.digits.skeletonColor"> (default: "#e1e5e8")
    }
}
</code>
</pre>   
            </template>
        </Box>
    </div>
</template>