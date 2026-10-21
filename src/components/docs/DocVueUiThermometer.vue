<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiThermometerConfigFields from "./configuration/VueUiThermometerConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiThermometer from "../themes/ThemesVueUiThermometer.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";

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

const dataset = ref({
    value: 37,
    from: -100,
    to: 100,
    steps: 20,
    colors: {
        from: "#ff3700",
        to: "#5f8bee",
    },
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    height: 360,
                    width: 256,
                    thermometer: { width: 48 },
                    padding: { top: 12, bottom: 12 },
                    graduations: {
                        show: true,
                        sides: "both",
                        height: 2,
                        stroke: "#e1e5e8",
                        strokeWidth: 1,
                        showIntermediate: true,
                        gradient: { show: true, intensity: 40 },
                    },
                    animation: { use: true, speedMs: 1000 },
                    label: {
                        show: true,
                        fontSize: 20,
                        minFontSize: 6,
                        rounding: 1,
                        bold: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        prefix: "",
                        suffix: "",
                    },
                },
                title: {
                    text: "Title",
                    color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                    fontSize: 20,
                    bold: true,
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: "#A1A1A1",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false,
                    },
                },
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    pdf: true,
                    img: true,
                    fullscreen: true,
                    annotator: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    img: "Download PNG",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
    forceChartUpdate();
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

const dsTypeCode = computed(() => {
    return `
  type VueUiThermometerDataset = {
      value: number
      from: number
      to: number
      steps?: number // default: 10
      colors?: {
          from?: string // default: "#dc3912"
          to?: string // default: "#3366cc"
      }
  }
  `;
});

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
        <BaseDocTitle name="VueUiThermometer" />

        <BaseDocDescription
            :text="translations.docs.tooltips.thermometer[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-thermometer"
            targetMaker="VueUiThermometer"
            :configSource="mainConfig.vue_ui_thermometer"
        />

        <div :class="`transition-all mx-auto max-w-[250px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <div
                        :style="{ width: isFixed ? '150px' : '' }"
                        class="mx-auto"
                    >
                        <VueUiThermometer
                            :dataset="dataset"
                            :config="config"
                            :key="key"
                        />
                    </div>
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_thermometer" />

        <BaseMigrationInfo debug padding />

        <Box
            ref="box"
            showResponsive
            showEmits
            showCallbacks
            showSlots
            showThemes
            schema="vue_ui_thermometer"
        >
            <template #dataset>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type:
                    <code class="text-app-green">VueUiThermometerDataset</code>
                </div>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        class="my-6"
                    />
                    {{ translations.docs.example[store.lang] }} :
                    <div class="w-full overflow-x-auto">
                        <pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiThermometerDataset</span> = {
    value: 37,
    from: -100,
    to: 100,
    steps: 20,
    colors: {
        from: "#dc3912",
        to: "#3366cc",
    }
}
</code>
</pre>
                    </div>
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUiThermometer"
                    configType="VueUiThermometerConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiThermometerConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiThermometerConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiThermometer"
                    :names="['copyAlt']"
                />
                <ExposedMethods
                    component="VueUiThermometer"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiThermometer"
                    :types="[
                        'svg-underlayer',
                        'svg',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-thermometer.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiThermometer />
            </template>

            <template #responsive>
                <ResponsiveUnit height="500px" minHeight="200px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiThermometer"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="['annotator', 'fullscreen', 'img', 'pdf', 'svg']"
                />
            </template>
        </Box>
    </div>
</template>
