<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiDigitsConfigFields from "./configuration/VueUiDigitsConfigFields.vue";
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

const dataset = ref(299792458);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            height: "100%",
            width: null,
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
            digits: {
                color: isDarkMode.value ? "#42d392" : "#2D353C",
                skeletonColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                thickness: 1,
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

const { configCode, showAllConfig } = useConfigCode();
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDigits" />

        <BaseDocDescription
            :text="translations.docs.tooltips.digits[store.lang]"
        />

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
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <div
                        style="height: 64px"
                        class="mx-auto flex justify-center"
                    >
                        <VueUiDigits
                            :dataset="dataset"
                            :config="config"
                            :key="key"
                        />
                    </div>
                    <div
                        class="mt-6 mx-auto flex place-items-center justify-center gap-4"
                    >
                        {{
                            translations.docs.comments.screenshot.tryIt[
                                store.lang
                            ]
                        }}:
                        <input type="number" v-model="dataset" />
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
                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiDigitsConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiDigitsConfigFields :config="config" :context="{}" />
                </code>
            </template>
        </Box>
    </div>
</template>
