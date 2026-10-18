<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiSparkbarConfigFields from "./configuration/VueUiSparkbarConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkbar from "../themes/ThemesVueUiSparkbar.vue";
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
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
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
        name: "quality",
        value: 61.95,
        rounding: 2,
        suffix: "%",
    },
    {
        name: "popularity",
        value: 2.04,
        rounding: 2,
        suffix: "%",
    },
    {
        name: "maintenance",
        value: 33.33,
        rounding: 2,
        suffix: "%",
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            style: {
                backgroundColor: isDarkMode.value ? "transparent" : "#F3F4F6",
                fontFamily: "inherit",
                animation: { show: true, animationFrames: 60 },
                layout: {
                    independant: true,
                    percentage: true,
                    target: 0,
                    showTargetValue: false,
                    targetValueText: "",
                },
                gutter: {
                    backgroundColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                    opacity: 100,
                },
                bar: {
                    borderRadius: null,
                    gradient: {
                        show: true,
                        intensity: 40,
                        underlayerColor: "#FFFFFF",
                    },
                },
                labels: {
                    fontSize: 16,
                    name: {
                        position: "top-left",
                        width: "100%",
                        color: isDarkMode.value ? "#BABABA" : "#2D353C",
                        bold: false,
                    },
                    value: { show: true, bold: true },
                },
                title: {
                    backgroundColor: "transparent",
                    text: "Title",
                    color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    textAlign: "left",
                    margin: "0 0 12px 0",
                    subtitle: {
                        color: "#CCCCCC",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false,
                    },
                },
                gap: 4,
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
    dataset.value[0].value = Math.random() * 100;
    dataset.value[1].value = Math.random() * 100;
    dataset.value[2].value = Math.random() * 100;
}

const dsTypeCode = computed(() => {
    return `type VueUiSparkbarDatasetItem = {
    name: string
    value: number
    color?: string
    prefix?: string // ${translations.value.docs.comments.onion.prefix[store.lang]}
    suffix?: string // ${translations.value.docs.comments.onion.suffix[store.lang]}
    rounding?: number
    target?: number // ${translations.value.docs.comments.sparkbar.target[store.lang]}
    formatter?: null | ({ value: number; config?: any }) => number | string // ${translations.value.formatterLink[store.lang]}
}
`;
});

const codeDataset = ref(`const dataset: VueUiSparkbarDatasetItem[] = [
    {
        name: "quality",
        value: 61.953,
        rounding: 2,
        suffix: "%",
    },
    {
        name: "popularity",
        value: 2.0412,
        rounding: 2,
        suffix: "%",
    },
    {
        name: "maintenance",
        value: 33.3291,
        rounding: 2,
        suffix: "%",
    },
];`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiSparkbar" />

        <BaseDocDescription
            :text="translations.docs.tooltips.sparkbar[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkbar"
            targetMaker="VueUiSparkbar"
            :configSource="mainConfig.vue_ui_sparkbar"
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
                    <VueUiSparkbar
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />

            <Rater itemId="vue_ui_sparkbar" />
        </div>

        <BaseMigrationInfo debug />

        <Box
            showSlots
            showEmits
            showThemes
            schema="vue_ui_sparkbar"
            signInfo="positiveOnly"
        >
            <template #tab0>
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        class="my-6"
                        :title="translations.docs.datastructure[store.lang]"
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
            <template #tab1>
                <div class="w-full overflow-x-auto">
                    <DebugHint
                        component="VueUiSparkbar"
                        configType="VueUiSparkbarConfig"
                    />

                    <BaseCopyConfig :config="config" @reset="resetDefault" />

                    <div class="mt-4">
                        TS type:
                        <code class="text-app-blue">VueUiSparkbarConfig</code>
                    </div>

                    <div class="my-4">
                        Toggle tree view:
                        <input type="checkbox" v-model="showAllConfig" />
                    </div>

                    <code ref="configCode">
                        <VueUiSparkbarConfigFields
                            :config="config"
                            :context="{ forceChartUpdate }"
                        />
                    </code>
                </div>
            </template>

            <template #tab2>
                <ComponentEmits
                    component="VueUiSparkbar"
                    :names="['selectDatapoint']"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiSparkbar"
                    :types="['title', 'data-label', 'source']"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-sparkbar.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiSparkbar />
            </template>
        </Box>
    </div>
</template>
