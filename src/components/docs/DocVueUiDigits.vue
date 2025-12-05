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
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";

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
        skeletonColor: "#e1e5e8",
        thickness: 1
    }
});

const darkModeConfig = ref({
    height: "100%",
    width: null,
    backgroundColor: "#2A2A2A",
    digits: {
        color: "#42d392",
        skeletonColor: "#3A3A3A",
        thickness: 1
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
        <BaseDocTitle name="VueUiDigits" />

        <BaseDocDescription :text="translations.docs.tooltips.digits[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-digits"
            :configSource="mainConfig.vue_ui_digits"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <div style="height: 64px" class="mx-auto flex justify-center">
                        <VueUiDigits :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </div>
                    <div class="mt-6 mx-auto flex place-items-center justify-center gap-4">
                        {{ translations.docs.comments.screenshot.tryIt[store.lang] }}:
                        <input type="number" v-model="dataset">
                    </div>
                </BaseCard>
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiDigitsConfig" equal>
        <BaseAttr name="height" attr="height" type="text" defaultVal="'100%'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="width" attr="width" type="text" defaultVal="null" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="backgroundColor" attr="backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="digits">
            <BaseAttr name="color" attr="digits.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="skeletonColor" attr="digits.skeletonColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="thickness" attr="digits.thickness" type="range" defaultVal="1" :min="0.1" :max="3" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
    </BaseDetails>
</code>

            </template>
        </Box>
    </div>
</template>