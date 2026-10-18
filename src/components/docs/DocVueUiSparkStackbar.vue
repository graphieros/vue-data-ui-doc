<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiSparkStackbarConfigFields from "./configuration/VueUiSparkStackbarConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkStackbar from "../themes/ThemesVueUiSparkStackbar.vue";
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
import ExposedMethods from "../ExposedMethods.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
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

const dataset = ref([
    {
        name: "Vue",
        value: 258,
        color: "#42d392",
    },
    {
        name: "JS",
        value: 36,
        color: "#ff9900",
    },
    {
        name: "Other",
        value: 16,
        color: "#5f8bee",
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right arrow keys to move between data points.",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                    series: "Series",
                    percentage: "Percentage",
                    value: "Value",
                },
            },
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                fontFamily: "inherit",
                animation: { show: true, animationFrames: 60 },
                bar: {
                    borderRadius: null,
                    gradient: {
                        show: true,
                        intensity: 40,
                        underlayerColor: "#FFFFFF",
                    },
                },
                legend: {
                    margin: "6px 0 0 0",
                    textAlign: "left",
                    show: true,
                    fontSize: 12,
                    name: {
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        bold: false,
                    },
                    value: {
                        show: true,
                        bold: false,
                        color: isDarkMode.value ? "#DDDDDD" : "#2D353C",
                        prefix: "",
                        suffix: "",
                        rounding: 0,
                    },
                    percentage: {
                        show: true,
                        bold: true,
                        color: isDarkMode.value ? "#DDDDDD" : "#2D353C",
                        rounding: 1,
                    },
                    selectAllToggle: {
                        show: false,
                        backgroundColor: isDarkMode.value
                            ? "#3A3A3A"
                            : "#E1E5E8",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    },
                },
                title: {
                    textAlign: "left",
                    text: "Title",
                    color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                    fontSize: 16,
                    bold: true,
                    margin: "0 0 6px 0",
                    subtitle: {
                        color: "#A1A1A1",
                        text: "Subtitle",
                        fontSize: 12,
                        bold: false,
                    },
                },
                tooltip: {
                    teleportTo: "body",
                    show: true,
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    fontSize: 14,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: "center",
                    offsetY: 24,
                    offsetX: 0,
                    smooth: true,
                    smoothForce: 0.18,
                    smoothSnapThreshold: 0.25,
                },
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

function randomizeData() {
    dataset.value[0].value = Math.random() * 200;
    dataset.value[1].value = Math.random() * 150;
    dataset.value[2].value = Math.random() * 100;
}

const codeDataset = ref(`const dataset: VueUiSparkStackbarDatasetItem[] = [
  {
    name: "Vue",
    value: 258,
    color: "#42d392"
  },
  {
    name: "Javascript",
    value: 36,
    color: "#ff9900"
  },
  {
    name: "Other",
    value: 16,
    color: "#5f8bee"
  }
]`);

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
        <BaseDocTitle name="VueUiSparkStackbar" />

        <BaseDocDescription
            :text="translations.docs.tooltips.stackbar[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkstackbar"
            targetMaker="VueUiSparkStackbar"
            :configSource="mainConfig.vue_ui_sparkstackbar"
        />

        <div :class="`transition-all mx-auto sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiSparkStackbar
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
            <Rater itemId="vue_ui_sparkstackbar" />
        </div>

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showThemes
            showSlots
            schema="vue_ui_sparkstackbar"
            signInfo="positiveOrNegativeOnly"
        >
            <template #dataset>
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :title="translations.docs.datastructure[store.lang]"
                        :content="`type VueUiSparkStackbarDatasetItem = {
  name: string
  value: number
  color?: string
}
    `"
                        class="my-6"
                    />

                    <div class="w-full overflow-x-auto">
                        <CodeParser
                            language="typescript"
                            @copy="store.copy()"
                            :content="codeDataset"
                            :title="translations.docs.example[store.lang]"
                        />
                    </div>
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUiSparkStackbar"
                    configType="VueUiSparkStackbarConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiSparkStackbarConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiSparkStackbarConfigFields
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
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiSparkStackbar"
                    :names="['selectDatapoint', 'selectLegend']"
                />
                <ExposedMethods component="VueUiSparkStackbar" showHideSeries />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiSparkStackbar"
                    :types="[
                        'hint',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'source',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-sparkstackbar.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiSparkStackbar />
            </template>
        </Box>
    </div>
</template>
