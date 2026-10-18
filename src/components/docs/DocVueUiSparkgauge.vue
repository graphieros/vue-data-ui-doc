<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiSparkgaugeConfigFields from "./configuration/VueUiSparkgaugeConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkgauge from "../themes/ThemesVueUiSparkgauge.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);

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

const dataset1 = ref({
    value: -6,
    min: -10,
    max: 10,
    title: "KPI 1",
});
const dataset2 = ref({
    value: 0,
    min: -10,
    max: 10,
    title: "KPI 2",
});
const dataset3 = ref({
    value: 8,
    min: -10,
    max: 10,
    title: "KPI 3",
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            style: {
                fontFamily: "inherit",
                background: isDarkMode.value ? "#1A1A1A00" : "#F3F4F6",
                height: 84,
                basePosition: 72,
                animation: { show: true, speedMs: 150 },
                title: {
                    show: true,
                    fontSize: 12,
                    position: "bottom",
                    textAlign: "center",
                    bold: false,
                    color: isDarkMode.value ? "#8A8A8A" : "#1A1A1A",
                },
                dataLabel: {
                    fontSize: 36,
                    autoColor: true,
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    offsetY: -2,
                    bold: true,
                    rounding: 0,
                    prefix: "",
                    suffix: "",
                },
                colors: {
                    min: lang.value === "zh" ? "#00FF00" : "#FF0000",
                    max: lang.value === "zh" ? "#FF0000" : "#00FF00",
                    showGradient: true,
                },
                track: {
                    autoColor: true,
                    color: "#5f8bee",
                    strokeLinecap: "round",
                },
                gutter: {
                    color: isDarkMode.value ? "#3A3A3A" : "#E1E5E8",
                    strokeLinecap: "round",
                },
            },
        }),
    set: configState.set,
});

watch(
    () => lang.value,
    (v) => {
        config.value.style.colors.min = v === "zh" ? "#00FF00" : "#FF0000";
        config.value.style.colors.max = v === "zh" ? "#FF0000" : "#00FF00";
        config.value.style.colors.min = v === "zh" ? "#00FF00" : "#FF0000";
        config.value.style.colors.max = v === "zh" ? "#FF0000" : "#00FF00";
    },
);

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

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function randomizeData() {
    dataset1.value.value = getRandomNumber(-10, 10);
    dataset2.value.value = getRandomNumber(-10, 10);
    dataset3.value.value = getRandomNumber(-10, 10);
}

const dsTypeCode = computed(() => {
    return `type VueUiSparkgaugeDataset = {
    value: number
    min: number
    max: number
    title?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiSparkgaugeDataset = {
    value: -8,
    min: -10,
    max: 10,
    title: "KPI 1"
}`);

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
        <BaseDocTitle name="VueUiSparkgauge" />

        <BaseDocDescription
            :text="translations.docs.tooltips.gauge[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkgauge"
            targetMaker="VueUiSparkgauge"
            :configSource="mainConfig.vue_ui_sparkgauge"
        />

        <div class="w-3/4 mx-auto flex flex-row gap-2 max-w-[400px]">
            <div :class="`transition-all mx-auto`">
                <DocSnapper
                    :isFixed="isFixed"
                    :disabled="!isFixed || isMobile"
                    @fixChart="fixChart"
                    @resetDefault="resetDefault"
                    @copyToClipboard="copyToClipboard(config)"
                >
                    <BaseCard>
                        <VueUiSparkgauge
                            :dataset="dataset3"
                            :config="config"
                            :key="`gauge_3_${key}`"
                        />
                    </BaseCard>
                </DocSnapper>

                <BaseRandomButton @click="randomizeData" />

                <Rater itemId="vue_ui_sparkgauge" />
            </div>
        </div>

        <BaseMigrationInfo debug />

        <Box ref="box" showThemes showSlots schema="vue_ui_sparkgauge">
            <template #dataset>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        :title="translations.docs.datastructure[store.lang]"
                        class="my-6"
                    />

                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUiSparkgauge"
                    configType="VueUiSparkgaugeConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiSparkgaugeConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiSparkgaugeConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            store,
                            translations,
                        }"
                    />
                </code>

                <div class="overflow-w-auto"></div>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiSparkgauge"
                    :types="['source', 'chart-background']"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-sparkgauge.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiSparkgauge />
            </template>
        </Box>
    </div>
</template>
