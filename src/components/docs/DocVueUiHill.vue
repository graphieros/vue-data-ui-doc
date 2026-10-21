<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiHillConfigFields from "./configuration/VueUiHillConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import BaseDocTitle from "../BaseDocTitle.vue";
import { useConfig } from "../../assets/useConfig.js";
import useMobile from "../../useMobile.js";
import { useRouter } from "vue-router";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import DocSnapper from "../DocSnapper.vue";
import BaseCard from "../BaseCard.vue";
import VueUiHill from "vue-data-ui/vue-ui-hill";
import Rater from "../Rater.vue";
import CodeParser from "../customization/CodeParser.vue";
import { useConfigCode } from "../../useConfigCode.js";
import ComponentEmits from "../ComponentEmits.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import ThemesVueUiHill from "../themes/ThemesVueUiHill.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import DebugHint from "../DebugHint.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";

const mainConfig = useConfig();
const store = useMainStore();
const { configCode, showAllConfig } = useConfigCode();
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
        label: "TASK A",
        position: 0,
    },
    {
        label: "TASK B",
        position: 0,
    },
    {
        label: "TASK C",
        position: 0.25,
    },
    {
        label: "TASK D",
        position: 0.5,
    },
    {
        label: "TASK E",
        position: 0.8,
    },
    {
        label: "TASK F",
        position: 1,
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            loading: false,
            readonly: false,
            editing: true,
            theme: "",
            customPalette: [],
            transitions: {
                enable: true,
                pauseOnLoad: true,
                pauseOnDatasetChange: false,
                activationDelayMs: 300,
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                buttons: {
                    tooltip: false,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: false,
                    labels: false,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: false,
                    annotator: true,
                    svg: true,
                    zoom: false,
                    altCopy: false,
                },
                callbacks: {
                    animation: null,
                    annotator: null,
                    csv: null,
                    fullscreen: null,
                    img: null,
                    labels: null,
                    pdf: null,
                    sort: null,
                    stack: null,
                    table: null,
                    tooltip: null,
                    svg: null,
                    zoom: null,
                    altCopy: null,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                    svg: "Download SVG",
                    altCopy: "Copy alt text",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
                useCursorPointer: false,
            },
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right arrow keys to adjust the selected datapoint.",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                    topOfHill: "Top of the hill",
                },
            },
            events: {
                edit: null,
                save: null,
                cancel: null,
                change: null,
                dragStart: null,
                dragEnd: null,
                datapointEnter: null,
                datapointLeave: null,
                selectDatapoint: null,
            },
            interaction: { keyboardStep: 0.01, peakTolerance: 0.005 },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    width: 800,
                    height: 300,
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
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
                    toolbar: {
                        show: true,
                        status: {
                            lastUpdated: "Last updated just now",
                            editInstruction:
                                "Drag each dot to adjust its position",
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            fontSize: 14,
                            bold: false,
                            lineHeight: 1.3,
                        },
                        buttons: {
                            translations: {
                                edit: "Edit",
                                cancel: "Cancel",
                                save: "Save",
                            },
                        },
                    },
                    layout: {
                        hill: {
                            geometry: {
                                horizontalPaddingRatio: 0.05,
                                topPaddingRatio: 0.15,
                                bottomPaddingRatio: 0.15,
                                curvature: 0.7,
                            },
                            baseline: {
                                show: true,
                                stroke: isDarkMode.value
                                    ? "#5A5A5A"
                                    : "#CCCCCC",
                                strokeWidth: 1,
                                strokeDasharray: 0,
                            },
                            midline: {
                                show: true,
                                stroke: isDarkMode.value
                                    ? "#5A5A5A"
                                    : "#CCCCCC",
                                strokeWidth: 1,
                                strokeDasharray: "2.5 3.5",
                            },
                            curve: {
                                stroke: isDarkMode.value
                                    ? "#6A6A6A"
                                    : "#A1A1A1",
                                strokeWidth: 1.5,
                                strokeDasharray: 0,
                            },
                        },
                        plots: {
                            radius: 10,
                            hitRadius: 10,
                            stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                            strokeWidth: 2,
                            mutedOpacity: 0.4,
                            disabledOpacity: 0.4,
                            shadow: {
                                show: true,
                                color: "#2D353C",
                                offsetX: 0,
                                offsetY: 0.5,
                                blur: 0.4,
                            },
                            stacking: {
                                show: true,
                                overlapThresholdRatio: 0.8,
                                gap: 5,
                                overflow: {
                                    show: true,
                                    transitionDuration: 300,
                                    marker: {
                                        radius: 10,
                                        stroke: isDarkMode.value
                                            ? "#2A2A2A"
                                            : "#FFFFFF",
                                        strokeWidth: 1,
                                        labelColor: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#2D353C",
                                        labelOffsetY: 0,
                                        fontSize: 14,
                                        bold: false,
                                        fill: "#CCCCCC",
                                    },
                                    menu: {
                                        width: 220,
                                        maxHeight: 220,
                                        backgroundColor: isDarkMode.value
                                            ? "#3A3A3A"
                                            : "#FFFFFF",
                                        color: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#2D353C",
                                        borderColor: "transparent",
                                        borderRadius: 3,
                                        title: "",
                                    },
                                },
                            },
                            dragMarker: {
                                show: true,
                                strokeWidth: 1.5,
                                crossPath: "M-5 0H5M0-5V5",
                                positionIndicator: {
                                    show: true,
                                    useSerieColor: true,
                                    color: isDarkMode.value
                                        ? "#4A4A4A"
                                        : "#e1e5e8",
                                    strokeWidth: 1,
                                    strokeDasharray: "2 4",
                                    circle: {
                                        show: true,
                                        radius: 3,
                                        stroke: isDarkMode.value
                                            ? "#2A2A2A"
                                            : "#FFFFFF",
                                        strokeWidth: 1,
                                    },
                                    value: {
                                        show: true,
                                        offsetY: 0,
                                        fontSize: 12,
                                        useSerieColor: false,
                                        color: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#2D353C",
                                        formatter: null,
                                        rounding: 0,
                                    },
                                },
                            },
                        },
                        labels: {
                            item: {
                                ellipsisThresholdChars: 24,
                                show: true,
                                useSerieColor: false,
                                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                                fontSize: 14,
                                bold: false,
                                offsetX: 0,
                                offsetY: 0,
                                autoSideThreshold: 0.75,
                                stroke: isDarkMode.value
                                    ? "#2A2A2A"
                                    : "#FFFFFF",
                                strokeWidth: 5,
                            },
                            phases: {
                                show: true,
                                color: "#A1A1A1",
                                fontSize: 14,
                                bold: true,
                                letterSpacing: "0.1em",
                                offsetY: 0,
                                left: { text: "FIGURING THINGS OUT" },
                                right: { text: "MAKING IT HAPPEN" },
                            },
                        },
                        stackbar: {
                            show: true,
                            paddingTop: 0,
                            paddingBottom: 12,
                            height: 14,
                            stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                            strokeWidth: 1.5,
                            gutterColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#e1e5e8",
                            label: {
                                show: true,
                                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                                fontSize: 12,
                                formatter: null,
                            },
                        },
                    },
                },
            },
        }),
    set: configState.set,
});

function save(d) {
    dataset.value = d;
}

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

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const dsTypeCode = computed(
    () => `type VueUiHillDatasetItem = {
  label: string
  position: number // 0 to 1
  color?: string
  muted?: boolean
  disabled?: boolean
  id?: string // will be generated internally if not provided
  [key: string]: any // if you need to use additional data, retrieved later through the slots
}`,
);

const codeDataset = ref(`const dataset: VueUiHillDatasetItem[] = [
    {
        label: "TASK A",
        position: 0,
    },
    {
        label: "TASK B",
        position: 0,
    },
    {
        label: "TASK C",
        position: 0.25,
    },
    {
        label: "TASK D",
        position: 0.5,
    },
    {
        label: "TASK E",
        position: 0.8,
    },
    {
        label: "TASK F",
        position: 1,
    },
]`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiHill" />
        <BaseDocDescription
            :text="translations.docs.tooltips.hill[store.lang]"
        />
        <BaseDocHeaderActions
            targetLink="vue-ui-hill"
            targetMaker="VueUiHill"
            :configSource="mainConfig.vue_ui_hill"
        />

        <div :class="`transition-all mx-auto w-full max-w-[800px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiHill :dataset :config="config" @save="save" />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_hill" />

        <Box
            ref="box"
            showEmits
            showSlots
            showCallbacks
            showThemes
            schema="vue_ui_hill"
            signInfo="positiveOnly"
        >
            <template #dataset>
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        :title="translations.docs.datastructure[store.lang]"
                        class="my-6"
                    />
                </div>

                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>

            <template #configuration>
                <DebugHint component="VueUiHill" configType="VueUiHillConfig" />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiHillConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>
                <code ref="configCode">
                    <VueUiHillConfigFields
                        :config="config"
                        :context="{ goToPage, store, translations }"
                    />
                </code>
            </template>

            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiHill"
                    getImage
                    :names="[
                        'edit',
                        'save',
                        'cancel',
                        'dragStart',
                        'dragEnd',
                        'datapointEnter',
                        'datapointLeave',
                        'selectDatapoint',
                        'copyAlt',
                    ]"
                />

                <ExposedMethods
                    component="VueUiHill"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                    ]"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiHill"
                    :withSvgContent="false"
                    :types="[
                        'svg-underlayer',
                        'svg',
                        'analysis',
                        'watermark',
                        'chart-background',
                        'annotator-actions',
                        'hill-actions',
                        'loading',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-hill.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiHill />
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
