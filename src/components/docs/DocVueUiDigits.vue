<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
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
    store.docSnap = !store.docSnap;
} 


</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDigits" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.digits[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-digits"
            :configSource="mainConfig.vue_ui_digits"
        />

        <div :class="`transition-all mx-auto w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <div style="height: 64px" class="mx-auto flex justify-center">
                    <VueUiDigits :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </div>
                <div class="mt-6 mx-auto flex place-items-center justify-center gap-4">
                    {{ translations.docs.comments.screenshot.tryIt[store.lang] }}:
                    <input type="number" v-model="dataset">
                </div>
            </DocSnapper>
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