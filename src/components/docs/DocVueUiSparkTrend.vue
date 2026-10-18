<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiSparkTrendConfigFields from "./configuration/VueUiSparkTrendConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkTrend from "../themes/ThemesVueUiSparkTrend.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { createNumbers } from "../maker/lib.js";

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

const positiveDs = ref(
    createNumbers({ count: 10, seed: "V", trend: null, mult: 10000 }),
);
const neutralDs = ref([
    10000, 1200, 8000, 4000, 9000, 6000, 7000, 4000, 8000, 8000,
]);
const negativeDs = ref(
    createNumbers({ count: 10, seed: "R", trend: null, mult: 10000 }),
);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            downsample: { threshold: 1095 },
            style: {
                backgroundColor: isDarkMode.value ? "#1A1A1A00" : "#F3F4F6",
                fontFamily: "inherit",
                animation: { show: false, animationFrames: 20 },
                line: {
                    stroke: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    smooth: true,
                    useColorTrend: true,
                },
                area: { show: true, useGradient: true, opacity: 20 },
                dataLabel: {
                    show: true,
                    useColorTrend: true,
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    fontSize: 14,
                    bold: false,
                    prefix: "",
                    suffix: "",
                    rounding: 0,
                },
                trendLabel: {
                    trendType: "n-1",
                    useColorTrend: true,
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    fontSize: 14,
                    bold: true,
                    rounding: 0,
                },
                arrow: {
                    colors: {
                        positive: "#42d392",
                        neutral: "#7f7f7f",
                        negative: "#ff6400",
                    },
                },
                padding: { top: 12, left: 82, right: 12, bottom: 12 },
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
        <BaseDocTitle name="VueUiSparkTrend" />

        <BaseDocDescription
            :text="translations.docs.tooltips.trend[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-spark-trend"
            :configSource="mainConfig.vue_ui_spark_trend"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2 sm:max-w-[400px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        component="VueUiSparkTrend"
                        :dataset="positiveDs"
                        :config="config"
                        :key="key"
                    />
                    <VueDataUi
                        component="VueUiSparkTrend"
                        :dataset="neutralDs"
                        :config="config"
                        :key="key"
                    />
                    <VueDataUi
                        component="VueUiSparkTrend"
                        :dataset="negativeDs"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>

            <Rater itemId="vue_ui_spark_trend" />
        </div>

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showResponsive
            showThemes
            showSlots
            schema="vue_ui_spark_trend"
            signInfo="both"
        >
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="border-b my-6 pb-6 border-gray-700">
                    TS type: <code class="text-app-green">number[]</code>
                </div>
                <div class="w-full">
                    {{ translations.docs.example[store.lang] }} :
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = [1, 2, 3, 5, 8, -13, 21, 34];
</code>
</pre>
                </div>
            </template>
            <template #tab1>
                <DebugHint
                    component="VueUiSparkTrend"
                    configType="VueUiSparkTrendConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiSparkTrendConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiSparkTrendConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiSparkTrend"
                    :types="['source', 'chart-background']"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-spark-trend.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiSparkTrend />
            </template>

            <template #tab7>
                <ResponsiveUnit height="200px" width="300px" minHeight="64px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiSparkTrend"
                            :dataset="positiveDs"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>
