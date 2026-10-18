<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiGizmoConfigFields from "./configuration/VueUiGizmoConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseCard from "../BaseCard.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import DebugHint from "../DebugHint.vue";
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

const dataset = ref(66);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            a11y: { translations: { label: "Progress" } },
            debug: false,
            loading: false,
            type: "battery",
            size: 82,
            stroke: isDarkMode.value ? "#6A6A6A" : "#9A9A9A",
            color: isDarkMode.value ? "#42d392" : "#5f8aee",
            useGradient: true,
            gradientColor: isDarkMode.value ? "#79dbaf" : "#9db5ed",
            showPercentage: true,
            textColor: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
            fontFamily: "inherit",
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

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiGizmo" />

        <BaseDocDescription
            :text="translations.docs.tooltips.gizmo[store.lang]"
        />

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
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <div
                        class="w-full flex place-items-center justify-center pl-3 py-3"
                    >
                        <VueUiGizmo :dataset="dataset" :config="config" />
                    </div>
                </BaseCard>
            </DocSnapper>
            <Rater itemId="vue_ui_gizmo" />
        </div>

        <Box ref="box" schema="vue_ui_gizmo" signInfo="positiveOnly">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="my-4">
                    TS type:
                    <code class="text-app-green"> VueUiGizmoDataset</code>
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
                <DebugHint
                    component="VueUiGizmo"
                    configType="VueUiGizmoConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue"> VueUiGizmoConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiGizmoConfigFields
                        :config="config"
                        :context="{ goToPage, store, translations }"
                    />
                </code>
            </template>
        </Box>
    </div>
</template>
