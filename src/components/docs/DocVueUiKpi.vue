<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiKpiConfigFields from "./configuration/VueUiKpiConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import DocSnapper from "../DocSnapper.vue";
import useMobile from "../../useMobile";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const isFixed = ref(false);

onMounted(() => (store.docSnap = false));

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

const dataset0 = ref(299792458);
const dataset1 = ref(40075);
const dataset2 = ref(384400);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            animationFrames: 60,
            animationValueStart: 0,
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            fontFamily: "inherit",
            layoutClass:
                "p-4 rounded-md shadow-md mb-6 w-full max-w-[350px] mx-auto",
            prefix: "",
            suffix: isDarkMode.value ? " m/s" : "m/s",
            title: "Speed of light",
            titleBold: true,
            titleColor: isDarkMode.value ? "#CCCCCC" : "#2D353C",
            titleClass: "",
            titleCss: "",
            titleFontSize: isDarkMode.value ? 18 : 16,
            useAnimation: true,
            valueBold: true,
            valueColor: "#6376DD",
            valueClass: "tabular-nums",
            valueCss: "",
            valueFontSize: isDarkMode.value ? 36 : 32,
            valueRounding: 0,
            analogDigits: {
                show: false,
                height: 40,
                color: isDarkMode.value ? "#6376DD" : "#1A1A1A",
                skeletonColor: isDarkMode.value ? "#2A2A2A" : "#E1E5E8",
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

const { configCode, showAllConfig } = useConfigCode();

const { isMobile } = useMobile();

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiKpi" />

        <BaseDocDescription
            :text="translations.docs.tooltips.kpi[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-kpi"
            targetMaker="VueUiKpi"
            :configSource="mainConfig.vue_ui_kpi"
        />

        <div class="transition-all mx-auto w-full sm:w-1/2">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <VueDataUi
                    component="VueUiKpi"
                    :dataset="dataset0"
                    :config="{
                        ...config,
                        valueFontSize: isFixed ? 28 : config.valueFontSize,
                    }"
                    :key="`kpi0_${key}`"
                >
                    <template #comment-before>
                        <div
                            :class="`max-w-[300px] text-[12px] mt-2 text-gray-500 ${config.analogDigits.show || config.analogDigits.show ? 'mb-2' : ''}`"
                        >
                            According to the special theory of relativity, c is
                            the upper limit for the speed at which conventional
                            matter or energy (and thus any signal carrying
                            information) can travel through space
                        </div>
                    </template>
                </VueDataUi>
            </DocSnapper>
        </div>
        <Rater itemId="vue_ui_kpi" />

        <Box showSlots schema="vue_ui_kpi">
            <template #dataset>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="my-4">
                    TS type: <code class="text-app-green">number</code>
                </div>
                {{ translations.docs.example[store.lang] }}
                <div class="w-full overflow-x auto">
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = 299792458;
</code>
</pre>
                </div>
            </template>

            <template #configuration>
                <DebugHint component="VueUiKpi" configType="VueUiKpiConfig" />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiKpiConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiKpiConfigFields
                        :config="config"
                        :context="{ forceChartUpdate }"
                    />
                </code>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiKpi"
                    :types="[
                        'title_',
                        'value',
                        'comment-before',
                        'comment-after',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-kpi.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>
        </Box>
    </div>
</template>
