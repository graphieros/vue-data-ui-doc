<script setup>
import { useDocConfigState } from "../../useDocConfigState";
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
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            type: "onion",
            onion: {
                gutterColor: "#CCCCCC",
                gutterOpacity: 0.3,
                gutterBlur: 0,
                trackHueRotate: 360,
                trackBlur: 1,
                trackColor: "#42d392",
            },
            line: {
                gutterColor: "#CCCCCC",
                gutterOpacity: 0.3,
                gutterBlur: 0,
                trackHueRotate: 360,
                trackBlur: 1,
                trackColor: "#42d392",
            },
            bar: {
                gutterColor: "#CCCCCC",
                gutterOpacity: 0.3,
                gutterBlur: 0,
                trackHueRotate: 360,
                trackBlur: 1,
                trackColor: "#42d392",
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
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
        <BaseDocTitle name="VueUiMiniLoader" />

        <BaseDocDescription
            :text="translations.docs.tooltips.miniLoader[store.lang]"
        />

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
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <div
                        class="flex flex-row gap-6 place-items-center justify-center max-w-[300px] mx-auto"
                    >
                        <VueUiMiniLoader
                            :config="{ ...config, type: 'line' }"
                            :key="key"
                        />
                        <VueUiMiniLoader
                            :config="{ ...config, type: 'bar' }"
                            :key="key"
                        />
                        <VueUiMiniLoader :config="config" :key="key" />
                    </div>
                </BaseCard>
            </DocSnapper>
        </div>

        <Box :activeTab="1">
            <template #dataset>
                {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template #configuration>
                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiMiniLoaderConfig</code>
                </div>
                <pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiMiniLoaderConfig</span> = {
    type: "line" | "bar" | "onion", (default: "onion")
    line: {
        gutterColor: <input type="color" v-model="config.line.gutterColor">, (default: "#CCCCCC")
        gutterOpacity: <input type="number" min="0" max="1" step="0.1" v-model="config.line.gutterOpacity">, (default: 0.3)
        gutterBlur: <input type="number" min="0" max="5" step="0.1" v-model="config.line.gutterBlur">, (default: 0)
        trackHueRotate: <input type="number" min="0" max="360" step="1" v-model="config.line.trackHueRotate">, (default: 20)
        trackBlur: <input type="number" min="0" max="5" step="0.1" v-model="config.line.trackBlur">, (default: 1)
        trackColor: <input type="color" v-model="config.line.trackColor">, (default: "#42d392")
    },
    bar: {
        gutterColor: <input type="color" v-model="config.onion.gutterColor">, (default: "#CCCCCC")
        gutterOpacity: <input type="number" min="0" max="1" step="0.1" v-model="config.bar.gutterOpacity">, (default: 0.3)
        gutterBlur: <input type="number" min="0" max="5" step="0.1" v-model="config.bar.gutterBlur">, (default: 0)
        trackHueRotate: <input type="number" min="0" max="360" step="1" v-model="config.bar.trackHueRotate">, (default: 20)
        trackBlur: <input type="number" min="0" max="5" step="0.1" v-model="config.bar.trackBlur">, (default: 1)
        trackColor: <input type="color" v-model="config.bar.trackColor">, (default: "#42d392")
    },
    onion: {
        gutterColor: <input type="color" v-model="config.onion.gutterColor">, (default: "#CCCCCC")
        gutterOpacity: <input type="number" min="0" max="1" step="0.1" v-model="config.onion.gutterOpacity">, (default: 0.3)
        gutterBlur: <input type="number" min="0" max="5" step="0.1" v-model="config.onion.gutterBlur">, (default: 0)
        trackHueRotate: <input type="number" min="0" max="360" step="1" v-model="config.onion.trackHueRotate">, (default: 20)
        trackBlur: <input type="number" min="0" max="5" step="0.1" v-model="config.onion.trackBlur">, (default: 1)
        trackColor: <input type="color" v-model="config.onion.trackColor">, (default: "#42d392")
    },
}
</code>
</pre>
            </template>
        </Box>
    </div>
</template>
