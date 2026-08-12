<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseCard from "../BaseCard.vue";
import { useRouter } from "vue-router";
import BaseTabLink from "../BaseTabLink.vue";
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

const config = ref({
    devHints: { enable: false },
    a11y: {
        translations: {
            label: "Progress",
        },
    },
    debug: false,
    loading: false,
    type: "battery",
    size: 82,
    stroke: "#9A9A9A",
    color: "#5f8aee",
    useGradient: true,
    gradientColor: "#9db5ed",
    showPercentage: true,
    textColor: "#1A1A1A",
    fontFamily: "inherit",
});

const darkModeConfig = ref({
    devHints: { enable: false },
    a11y: {
        translations: {
            label: "Progress",
        },
    },
    debug: false,
    loading: false,
    type: "battery",
    size: 82,
    stroke: "#6A6A6A",
    color: "#42d392",
    useGradient: true,
    gradientColor: "#79dbaf",
    showPercentage: true,
    textColor: "#CCCCCC",
    fontFamily: "inherit",
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(
    JSON.parse(JSON.stringify(darkModeConfig.value)),
);

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(
        JSON.stringify(darkModeConfig.value),
    );
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
                @copyToClipboard="
                    copyToClipboard(isDarkMode ? darkModeConfig : config)
                "
            >
                <BaseCard>
                    <div
                        class="w-full flex place-items-center justify-center pl-3 py-3"
                    >
                        <VueUiGizmo
                            :dataset="dataset"
                            :config="
                                isDarkMode
                                    ? mutableConfigDarkMode
                                    : mutableConfig
                            "
                        />
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

                <BaseCopyConfig
                    :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
                    @reset="resetDefault"
                />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue"> VueUiGizmoConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <BaseDetails attr="const config: VueUiGizmoConfig" equal>
                        <BaseDetails attr="devHints" :level="1">
                            <BaseAttr
                                name="enable"
                                attr="devHints.enable"
                                type="checkbox"
                                defaultVal="false"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                        </BaseDetails>
                        <BaseDetails attr="a11y" :level="1">
                            <BaseDetails
                                attr="translations"
                                :level="2"
                                title="a11y.translations"
                            >
                                <BaseAttr
                                    name="label"
                                    attr="a11y.translations.label"
                                    type="text"
                                    defaultVal="'Progress'"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                            </BaseDetails>
                        </BaseDetails>
                        <BaseAttr inactive name="debug" defaultVal="false" />
                        <BaseAttr
                            name="loading"
                            attr="loading"
                            type="checkbox"
                            defaultVal="false"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="type"
                            attr="type"
                            type="select"
                            defaultVal="battery"
                            :options="['battery', 'gauge']"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="size"
                            attr="size"
                            type="number"
                            defaultVal="64"
                            :min="12"
                            :max="128"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="stroke"
                            attr="stroke"
                            type="color"
                            defaultVal="#CCCCCC"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="color"
                            attr="color"
                            type="color"
                            defaultVal="#5F8BEE"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="useGradient"
                            attr="useGradient"
                            type="checkbox"
                            defaultVal="true"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="gradientColor"
                            attr="gradientColor"
                            type="color"
                            defaultVal="#9DB5ED"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="showPercentage"
                            attr="showPercentage"
                            type="checkbox"
                            defaultVal="true"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="textColor"
                            attr="textColor"
                            type="color"
                            defaultVal="#2D353C"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <div class="flex flex-row gap-2 place-items-center">
                            <BaseAttr
                                inactive
                                name="formatter"
                                defaultVal="null"
                                :comment="
                                    translations.formatterLink[store.lang]
                                "
                            />
                            <div class="min-w-[200px]">
                                <BaseTabLink
                                    :action="
                                        () =>
                                            goToPage('/customization#formatter')
                                    "
                                    icon="cursor"
                                >
                                    Go to page
                                </BaseTabLink>
                            </div>
                        </div>
                    </BaseDetails>
                </code>
            </template>
        </Box>
    </div>
</template>
