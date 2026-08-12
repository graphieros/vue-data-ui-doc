<script setup>
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
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseTabLink from "../BaseTabLink.vue";
import { useConfigCode } from "../../useConfigCode.js";
import ComponentEmits from "../ComponentEmits.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import ThemesVueUiHill from "../themes/ThemesVueUiHill.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import DebugHint from "../DebugHint.vue";

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

const config = ref({
    devHints: {
        enable: false,
    },
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
            tableAvailable: "A data table for this chart is available below.",
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
    interaction: {
        keyboardStep: 0.01,
        peakTolerance: 0.005,
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            width: 800,
            height: 300,
            title: {
                text: "Title",
                color: "#2D353C",
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
                    editInstruction: "Drag each dot to adjust its position",
                    color: "#2D353C",
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
                        stroke: "#CCCCCC",
                        strokeWidth: 1,
                        strokeDasharray: 0,
                    },
                    midline: {
                        show: true,
                        stroke: "#CCCCCC",
                        strokeWidth: 1,
                        strokeDasharray: "2.5 3.5",
                    },
                    curve: {
                        stroke: "#A1A1A1",
                        strokeWidth: 1.5,
                        strokeDasharray: 0,
                    },
                },
                plots: {
                    radius: 10,
                    hitRadius: 10,
                    stroke: "#FFFFFF",
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
                                stroke: "#FFFFFF",
                                strokeWidth: 1,
                                labelColor: "#2D353C",
                                labelOffsetY: 0,
                                fontSize: 14,
                                bold: false,
                                fill: "#CCCCCC",
                            },
                            menu: {
                                width: 220,
                                maxHeight: 220,
                                backgroundColor: "#FFFFFF",
                                color: "#2D353C",
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
                            color: "#e1e5e8",
                            strokeWidth: 1,
                            strokeDasharray: "2 4",
                            circle: {
                                show: true,
                                radius: 3,
                                stroke: "#FFFFFF",
                                strokeWidth: 1,
                            },
                            value: {
                                show: true,
                                offsetY: 0,
                                fontSize: 12,
                                useSerieColor: false,
                                color: "#2D353C",
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
                        color: "#2D353C",
                        fontSize: 14,
                        bold: false,
                        offsetX: 0,
                        offsetY: 0,
                        autoSideThreshold: 0.75,
                        stroke: "#FFFFFF",
                        strokeWidth: 5,
                    },
                    phases: {
                        show: true,
                        color: "#A1A1A1",
                        fontSize: 14,
                        bold: true,
                        letterSpacing: "0.1em",
                        offsetY: 0,
                        left: {
                            text: "FIGURING THINGS OUT",
                        },
                        right: {
                            text: "MAKING IT HAPPEN",
                        },
                    },
                },
                stackbar: {
                    show: true,
                    paddingTop: 0,
                    paddingBottom: 12,
                    height: 14,
                    stroke: "#FFFFFF",
                    strokeWidth: 1.5,
                    gutterColor: "#e1e5e8",
                    label: {
                        show: true,
                        color: "#2D353C",
                        fontSize: 12,
                        formatter: null,
                    },
                },
            },
        },
    },
});

const darkModeConfig = ref({
    devHints: {
        enable: false,
    },
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
            tableAvailable: "A data table for this chart is available below.",
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
    interaction: {
        keyboardStep: 0.01,
        peakTolerance: 0.005,
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            width: 800,
            height: 300,
            title: {
                text: "Title",
                color: "#CCCCCC",
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
                    editInstruction: "Drag each dot to adjust its position",
                    color: "#CCCCCC",
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
                        stroke: "#5A5A5A",
                        strokeWidth: 1,
                        strokeDasharray: 0,
                    },
                    midline: {
                        show: true,
                        stroke: "#5A5A5A",
                        strokeWidth: 1,
                        strokeDasharray: "2.5 3.5",
                    },
                    curve: {
                        stroke: "#6A6A6A",
                        strokeWidth: 1.5,
                        strokeDasharray: 0,
                    },
                },
                plots: {
                    radius: 10,
                    hitRadius: 10,
                    stroke: "#2A2A2A",
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
                                stroke: "#2A2A2A",
                                strokeWidth: 1,
                                labelColor: "#CCCCCC",
                                labelOffsetY: 0,
                                fontSize: 14,
                                bold: false,
                                fill: "#CCCCCC",
                            },
                            menu: {
                                width: 220,
                                maxHeight: 220,
                                backgroundColor: "#3A3A3A",
                                color: "#CCCCCC",
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
                            color: "#4A4A4A",
                            strokeWidth: 1,
                            strokeDasharray: "2 4",
                            circle: {
                                show: true,
                                radius: 3,
                                stroke: "#2A2A2A",
                                strokeWidth: 1,
                            },
                            value: {
                                show: true,
                                offsetY: 0,
                                fontSize: 12,
                                useSerieColor: false,
                                color: "#CCCCCC",
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
                        color: "#CCCCCC",
                        fontSize: 14,
                        bold: false,
                        offsetX: 0,
                        offsetY: 0,
                        autoSideThreshold: 0.75,
                        stroke: "#2A2A2A",
                        strokeWidth: 5,
                    },
                    phases: {
                        show: true,
                        color: "#A1A1A1",
                        fontSize: 14,
                        bold: true,
                        letterSpacing: "0.1em",
                        offsetY: 0,
                        left: {
                            text: "FIGURING THINGS OUT",
                        },
                        right: {
                            text: "MAKING IT HAPPEN",
                        },
                    },
                },
                stackbar: {
                    show: true,
                    paddingTop: 0,
                    paddingBottom: 12,
                    height: 14,
                    stroke: "#2A2A2A",
                    strokeWidth: 1.5,
                    gutterColor: "#3A3A3A",
                    label: {
                        show: true,
                        color: "#CCCCCC",
                        fontSize: 12,
                        formatter: null,
                    },
                },
            },
        },
    },
});

function save(d) {
    dataset.value = d;
}

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
                @copyToClipboard="
                    copyToClipboard(isDarkMode ? darkModeConfig : config)
                "
            >
                <BaseCard>
                    <VueUiHill
                        :dataset
                        :config="
                            isDarkMode ? mutableConfigDarkMode : mutableConfig
                        "
                        @save="save"
                    />
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
            <template #tab0>
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

            <template #tab1>
                <DebugHint component="VueUiHill" configType="VueUiHillConfig" />

                <BaseCopyConfig
                    :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
                    @reset="resetDefault"
                />

                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiHillConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>
                <code ref="configCode">
                    <BaseDetails attr="const config: VueUiHillConfig" equal>
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
                        <BaseAttr
                            name="loading"
                            attr="loading"
                            defaultVal="false"
                            type="checkbox"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="readonly"
                            attr="readonly"
                            defaultVal="false"
                            type="checkbox"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="editing"
                            attr="editing"
                            defaultVal="false"
                            type="checkbox"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            inactive
                            name="theme"
                            defaultVal="''"
                            comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete' | 'minimal' | 'minimalDark'"
                        />
                        <BaseAttr
                            inactive
                            name="customPalette"
                            defaultVal="[]"
                            comment="string[]"
                        />
                        <BaseDetails attr="transitions" :level="1">
                            <BaseAttr
                                name="enable"
                                attr="transitions.enable"
                                type="checkbox"
                                defaultVal="true"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="pauseOnLoad"
                                attr="transitions.pauseOnLoad"
                                type="checkbox"
                                defaultVal="true"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="pauseOnDatasetChange"
                                attr="transitions.pauseOnDatasetChange"
                                type="checkbox"
                                defaultVal="false"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="activationDelayMs"
                                attr="transitions.activationDelayMs"
                                type="number"
                                :min="100"
                                :max="1000"
                                :step="50"
                                defaultVal="300"
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
                                    name="keyboardNavigation"
                                    attr="a11y.translations.keyboardNavigation"
                                    type="text"
                                    defaultVal="'Use the left and right arrow keys to move between data points.'"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="topOfHill"
                                    attr="a11y.translations.topOfHill"
                                    type="text"
                                    defaultVal="'A data table for this chart is available below.'"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                            </BaseDetails>
                        </BaseDetails>

                        <BaseDetails attr="events" :level="1">
                            <BaseAttr
                                inactive
                                name="edit"
                                defaultVal="null"
                                comment="(data) => { console.log(data) }"
                            />
                            <BaseAttr
                                inactive
                                name="save"
                                defaultVal="null"
                                comment="(data) => { console.log(data) }"
                            />
                            <BaseAttr
                                inactive
                                name="cancel"
                                defaultVal="null"
                                comment="(data) => { console.log(data) }"
                            />
                            <BaseAttr
                                inactive
                                name="datapointEnter"
                                defaultVal="null"
                                comment="({datapoint, index}) => { console.log(datapoint) }"
                            />
                            <BaseAttr
                                inactive
                                name="change"
                                defaultVal="null"
                                comment="({datapoint, dataset}) => { console.log(datapoint, dataset) }"
                            />
                            <BaseAttr
                                inactive
                                name="datapointLeave"
                                defaultVal="null"
                                comment="({datapoint, index}) => { console.log(datapoint) }"
                            />
                            <BaseAttr
                                inactive
                                name="selectDatapoint"
                                defaultVal="null"
                                comment="({datapoint, index}) => { console.log(datapoint) }"
                            />
                            <BaseAttr
                                inactive
                                name="dragStart"
                                defaultVal="null"
                                comment="(datapoint) => { console.log(datapoint) }"
                            />
                            <BaseAttr
                                inactive
                                name="dragEnd"
                                defaultVal="null"
                                comment="(datapoint) => { console.log(datapoint) }"
                            />
                        </BaseDetails>
                        <BaseDetails attr="interaction" :level="1">
                            <BaseAttr
                                name="keyboardStep"
                                attr="interaction.keyboardStep"
                                type="number"
                                defaultVal="0.01"
                                :min="0"
                                :max="0.1"
                                :step="0.01"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="peakTolerance"
                                attr="interaction.peakTolerance"
                                type="number"
                                defaultVal="0.005"
                                :min="0.001"
                                :max="0.1"
                                :step="0.001"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                        </BaseDetails>

                        <BaseDetails attr="style" :level="1">
                            <BaseAttr
                                inactive
                                name="fontFamily"
                                defaultVal="'inherit'"
                            />
                            <BaseDetails
                                attr="chart"
                                :level="2"
                                title="style.chart"
                            >
                                <BaseAttr
                                    name="backgroundColor"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                    type="color"
                                    attr="style.chart.backgroundColor"
                                    defaultVal="#FFFFFF"
                                />
                                <BaseAttr
                                    name="color"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                    type="color"
                                    attr="style.chart.color"
                                    defaultVal="#2D353C"
                                />
                                <BaseAttr
                                    name="width"
                                    attr="style.chart.width"
                                    defaultVal="800"
                                    type="number"
                                    :min="200"
                                    :max="2000"
                                    :step="50"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="height"
                                    attr="style.chart.height"
                                    defaultVal="300"
                                    type="number"
                                    :min="100"
                                    :max="2000"
                                    :step="50"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseDetails
                                    attr="title"
                                    :level="3"
                                    title="style.chart.title"
                                >
                                    <BaseAttr
                                        name="color"
                                        attr="style.chart.title.color"
                                        type="color"
                                        defaultVal="#2D353C"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseAttr
                                        name="text"
                                        attr="style.chart.title.text"
                                        type="text"
                                        defaultVal="''"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseAttr
                                        name="fontSize"
                                        attr="style.chart.title.fontSize"
                                        type="number"
                                        defaultVal="20"
                                        :min="8"
                                        :max="42"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseAttr
                                        name="bold"
                                        attr="style.chart.title.bold"
                                        type="checkbox"
                                        defaultVal="true"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseAttr
                                        name="textAlign"
                                        attr="style.chart.title.textAlign"
                                        type="select"
                                        defaultVal="center"
                                        :options="['left', 'center', 'right']"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseAttr
                                        name="paddingLeft"
                                        attr="style.chart.title.paddingLeft"
                                        type="number"
                                        defaultVal="0"
                                        :min="0"
                                        :max="100"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseAttr
                                        name="paddingRight"
                                        attr="style.chart.title.paddingRight"
                                        type="number"
                                        defaultVal="0"
                                        :min="0"
                                        :max="100"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseDetails
                                        attr="subtitle"
                                        :level="4"
                                        title="style.chart.title.subtitle"
                                    >
                                        <BaseAttr
                                            name="color"
                                            attr="style.chart.title.subtitle.color"
                                            type="color"
                                            defaultVal="#2D353C"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="text"
                                            attr="style.chart.title.subtitle.text"
                                            type="text"
                                            defaultVal="''"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="fontSize"
                                            attr="style.chart.title.subtitle.fontSize"
                                            type="number"
                                            defaultVal="20"
                                            :min="8"
                                            :max="42"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="bold"
                                            attr="style.chart.title.subtitle.bold"
                                            type="checkbox"
                                            defaultVal="false"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                    </BaseDetails>
                                </BaseDetails>

                                <BaseDetails
                                    attr="toolbar"
                                    :level="3"
                                    title="style.chart.toolbar"
                                >
                                    <BaseAttr
                                        name="show"
                                        attr="style.chart.toolbar.show"
                                        type="checkbox"
                                        defaultVal="true"
                                        :light="mutableConfig"
                                        :dark="mutableConfigDarkMode"
                                    />
                                    <BaseDetails
                                        attr="status"
                                        :level="4"
                                        title="style.chart.toolbar.status"
                                    >
                                        <BaseAttr
                                            name="lastUpdated"
                                            attr="style.chart.toolbar.status.lastUpdated"
                                            type="text"
                                            defaultVal="Last updated just now"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="editInstruction"
                                            attr="style.chart.toolbar.status.editInstruction"
                                            type="text"
                                            defaultVal="Drag each dot to adjust its position"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="color"
                                            attr="style.chart.toolbar.status.color"
                                            type="color"
                                            defaultVal="#2D353C"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="fontSize"
                                            attr="style.chart.toolbar.status.fontSize"
                                            type="number"
                                            defaultVal="14"
                                            :min="8"
                                            :max="42"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="bold"
                                            attr="style.chart.toolbar.status.bold"
                                            type="checkbox"
                                            defaultVal="false"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="lineHeight"
                                            attr="style.chart.toolbar.status.lineHeight"
                                            type="number"
                                            defaultVal="1.3"
                                            :min="0"
                                            :max="12"
                                            :step="0.1"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                    </BaseDetails>

                                    <BaseDetails
                                        attr="buttons"
                                        :level="4"
                                        title="style.chart.toolbar.buttons"
                                    >
                                        <BaseDetails
                                            attr="translations"
                                            :level="5"
                                            title="style.chart.toolbar.buttons.translations"
                                        >
                                            <BaseAttr
                                                name="edit"
                                                attr="style.chart.toolbar.buttons.translations.edit"
                                                type="text"
                                                defaultVal="Edit"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="cancel"
                                                attr="style.chart.toolbar.buttons.translations.cancel"
                                                type="text"
                                                defaultVal="Cancel"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="save"
                                                attr="style.chart.toolbar.buttons.translations.save"
                                                type="text"
                                                defaultVal="Save"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                        </BaseDetails>
                                    </BaseDetails>
                                </BaseDetails>

                                <BaseDetails
                                    attr="layout"
                                    :level="3"
                                    title="style.chart.layout"
                                >
                                    <BaseDetails
                                        attr="hill"
                                        :level="4"
                                        title="style.chart.layout.hill"
                                    >
                                        <BaseDetails
                                            attr="geometry"
                                            :level="5"
                                            title="style.chart.layout.hill.geometry"
                                        >
                                            <BaseAttr
                                                name="horizontalPaddingRatio"
                                                attr="style.chart.layout.hill.geometry.horizontalPaddingRatio"
                                                defaultVal="0.05"
                                                type="number"
                                                :min="0"
                                                :max="0.2"
                                                :step="0.01"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="topPaddingRatio"
                                                attr="style.chart.layout.hill.geometry.topPaddingRatio"
                                                type="number"
                                                defaultVal="0.15"
                                                :min="0"
                                                :max="0.5"
                                                :step="0.01"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="bottomPaddingRatio"
                                                attr="style.chart.layout.hill.geometry.bottomPaddingRatio"
                                                type="number"
                                                defaultVal="0.15"
                                                :min="0"
                                                :max="0.5"
                                                :step="0.01"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="curvature"
                                                attr="style.chart.layout.hill.geometry.curvature"
                                                type="number"
                                                defaultVal="0.7"
                                                :min="0"
                                                :max="1"
                                                :step="0.01"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                        </BaseDetails>

                                        <BaseDetails
                                            attr="baseline"
                                            :level="5"
                                            title="style.chart.layout.hill.baseline"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.hill.baseline.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="stroke"
                                                attr="style.chart.layout.hill.baseline.stroke"
                                                type="color"
                                                defaultVal="#CCCCCC"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeWidth"
                                                attr="style.chart.layout.hill.baseline.strokeWidth"
                                                type="number"
                                                defaultVal="1"
                                                :min="0"
                                                :max="6"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeDasharray"
                                                attr="style.chart.layout.hill.baseline.strokeDasharray"
                                                type="text"
                                                defaultVal="'0'"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                        </BaseDetails>

                                        <BaseDetails
                                            attr="midline"
                                            :level="5"
                                            title="style.chart.layout.hill.midline"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.hill.midline.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="stroke"
                                                attr="style.chart.layout.hill.midline.stroke"
                                                type="color"
                                                defaultVal="#CCCCCC"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeWidth"
                                                attr="style.chart.layout.hill.midline.strokeWidth"
                                                type="number"
                                                :min="0"
                                                :max="6"
                                                defaultVal="1"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeDasharray"
                                                attr="style.chart.layout.hill.midline.strokeDasharray"
                                                type="text"
                                                defaultVal="'2.5 3.5'"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                        </BaseDetails>

                                        <BaseDetails
                                            attr="curve"
                                            :level="5"
                                            title="style.chart.layout.hill.curve"
                                        >
                                            <BaseAttr
                                                name="stroke"
                                                attr="style.chart.layout.hill.curve.stroke"
                                                type="color"
                                                defaultVal="#A1A1A1"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeWidth"
                                                attr="style.chart.layout.hill.curve.strokeWidth"
                                                type="number"
                                                defaultVal="1.5"
                                                :min="0.5"
                                                :max="12"
                                                :step="0.5"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeDasharray"
                                                attr="style.chart.layout.hill.curve.strokeDasharray"
                                                type="text"
                                                defaultVal="'0'"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                        </BaseDetails>
                                    </BaseDetails>

                                    <BaseDetails
                                        attr="plots"
                                        :level="4"
                                        title="style.chart.layout.plots"
                                    >
                                        <BaseAttr
                                            name="radius"
                                            attr="style.chart.layout.plots.radius"
                                            type="number"
                                            defaultVal="10"
                                            :min="4"
                                            :max="20"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="hitRadius"
                                            attr="style.chart.layout.plots.hitRadius"
                                            type="number"
                                            defaultVal="10"
                                            :min="4"
                                            :max="20"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="stroke"
                                            attr="style.chart.layout.plots.stroke"
                                            type="color"
                                            defaultVal="#FFFFFF"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="strokeWidth"
                                            attr="style.chart.layout.plots.strokeWidth"
                                            type="number"
                                            defaultVal="2"
                                            :min="0"
                                            :max="6"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="mutedOpacity"
                                            attr="style.chart.layout.plots.mutedOpacity"
                                            type="number"
                                            defaultVal="0.4"
                                            :min="0.1"
                                            :max="1"
                                            :step="0.1"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="disabledOpacity"
                                            attr="style.chart.layout.plots.disabledOpacity"
                                            type="number"
                                            defaultVal="0.4"
                                            :min="0.1"
                                            :max="1"
                                            :step="0.1"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseDetails
                                            attr="shadow"
                                            :level="5"
                                            title="style.chart.layout.plots.shadow"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.plots.shadow.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="color"
                                                attr="style.chart.layout.plots.shadow.color"
                                                type="color"
                                                defaultVal="#2D353C"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="offsetX"
                                                attr="style.chart.layout.plots.shadow.offsetX"
                                                type="number"
                                                defaultVal="0"
                                                :min="-12"
                                                :max="12"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="offsetY"
                                                attr="style.chart.layout.plots.shadow.offsetY"
                                                type="number"
                                                defaultVal="0.5"
                                                :min="-12"
                                                :max="12"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="blur"
                                                attr="style.chart.layout.plots.shadow.blur"
                                                type="number"
                                                defaultVal="0.4"
                                                :min="0"
                                                :max="12"
                                                :step="0.1"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                        </BaseDetails>

                                        <BaseDetails
                                            attr="stacking"
                                            :level="5"
                                            title="style.chart.layout.plots.stacking"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.plots.stacking.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="overlapThresholdRatio"
                                                attr="style.chart.layout.plots.stacking.overlapThresholdRatio"
                                                type="number"
                                                defaultVal="0.8"
                                                :min="0"
                                                :max="1"
                                                :step="0.01"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="gap"
                                                attr="style.chart.layout.plots.stacking.gap"
                                                type="number"
                                                defaultVal="5"
                                                :min="-10"
                                                :max="24"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseDetails
                                                attr="overflow"
                                                :level="6"
                                                title="style.chart.layout.plots.stacking.overflow"
                                            >
                                                <BaseAttr
                                                    name="show"
                                                    attr="style.chart.layout.plots.stacking.overflow.show"
                                                    type="checkbox"
                                                    defaultVal="true"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                                <BaseAttr
                                                    name="transitionDuration"
                                                    attr="style.chart.layout.plots.stacking.overflow.transitionDuration"
                                                    type="number"
                                                    defaultVal="300"
                                                    :min="0"
                                                    :max="1000"
                                                    :step="50"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                                <BaseDetails
                                                    attr="marker"
                                                    :level="7"
                                                    title="style.chart.layout.plots.stacking.overflow.marker"
                                                >
                                                    <BaseAttr
                                                        name="radius"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.radius"
                                                        type="number"
                                                        defaultVal="10"
                                                        :min="4"
                                                        :max="24"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="stroke"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.stroke"
                                                        type="color"
                                                        defaultVal="#FFFFFF"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="strokeWidth"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.strokeWidth"
                                                        type="number"
                                                        defaultVal="1"
                                                        :min="0"
                                                        :max="6"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="labelColor"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.labelColor"
                                                        type="color"
                                                        defaultVal="#2D353C"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="labelOffsetY"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.labelOffsetY"
                                                        type="number"
                                                        defaultVal="0"
                                                        :min="-64"
                                                        :max="64"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="fontSize"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.fontSize"
                                                        type="number"
                                                        defaultVal="14"
                                                        :min="6"
                                                        :max="42"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="bold"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.bold"
                                                        type="checkbox"
                                                        defaultVal="false"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="fill"
                                                        attr="style.chart.layout.plots.stacking.overflow.marker.fill"
                                                        type="color"
                                                        defaultVal="#CCCCCC"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                </BaseDetails>

                                                <BaseDetails
                                                    attr="menu"
                                                    :level="7"
                                                    title="style.chart.layout.plots.stacking.overflow.menu"
                                                >
                                                    <BaseAttr
                                                        name="width"
                                                        attr="style.chart.layout.plots.stacking.overflow.menu.width"
                                                        type="number"
                                                        defaultVal="220"
                                                        :min="200"
                                                        :max="400"
                                                        :step="20"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="maxHeight"
                                                        attr="style.chart.layout.plots.stacking.overflow.menu.maxHeight"
                                                        type="number"
                                                        defaultVal="220"
                                                        :min="200"
                                                        :max="800"
                                                        :step="20"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="backgroundColor"
                                                        attr="style.chart.layout.plots.stacking.overflow.menu.backgroundColor"
                                                        type="color"
                                                        defaultVal="#FFFFFF"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="color"
                                                        attr="style.chart.layout.plots.stacking.overflow.menu.color"
                                                        type="color"
                                                        defaultVal="#2D353C"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="borderColor"
                                                        attr="style.chart.layout.plots.stacking.overflow.menu.borderColor"
                                                        type="color"
                                                        defaultVal="'transparent'"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="borderRadius"
                                                        attr="style.chart.layout.plots.stacking.overflow.menu.borderRadius"
                                                        type="number"
                                                        defaultVal="3"
                                                        :min="0"
                                                        :max="12"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="title"
                                                        attr="style.chart.layout.plots.stacking.overflow.menu.title"
                                                        type="text"
                                                        defaultVal="''"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                </BaseDetails>
                                            </BaseDetails>
                                        </BaseDetails>

                                        <BaseDetails
                                            attr="dragMarker"
                                            :level="5"
                                            title="style.chart.layout.plots.dragMarker"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.plots.dragMarker.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeWidth"
                                                attr="style.chart.layout.plots.dragMarker.strokeWidth"
                                                type="number"
                                                defaultVal="1.5"
                                                :min="0"
                                                :max="6"
                                                :step="0.5"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="crossPath"
                                                attr="style.chart.layout.plots.dragMarker.crossPath"
                                                type="text"
                                                defaultVal="M-5 0H5M0-5V5"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseDetails
                                                attr="positionIndicator"
                                                :level="6"
                                                title="style.chart.layout.plots.dragMarker.positionIndicator"
                                            >
                                                <BaseAttr
                                                    name="show"
                                                    attr="style.chart.layout.plots.dragMarker.positionIndicator.show"
                                                    type="checkbox"
                                                    defaultVal="true"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                                <BaseAttr
                                                    name="useSerieColor"
                                                    attr="style.chart.layout.plots.dragMarker.positionIndicator.useSerieColor"
                                                    type="checkbox"
                                                    defaultVal="true"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                                <BaseAttr
                                                    name="color"
                                                    attr="style.chart.layout.plots.dragMarker.positionIndicator.color"
                                                    type="color"
                                                    defaultVal="#E1E5E8"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                                <BaseAttr
                                                    name="strokeWidth"
                                                    attr="style.chart.layout.plots.dragMarker.positionIndicator.strokeWidth"
                                                    type="number"
                                                    defaultVal="1"
                                                    :min="0"
                                                    :max="6"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                                <BaseAttr
                                                    name="strokeDasharray"
                                                    attr="style.chart.layout.plots.dragMarker.positionIndicator.strokeDasharray"
                                                    type="text"
                                                    defaultVal="'2 4'"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                                <BaseDetails
                                                    attr="circle"
                                                    :level="7"
                                                    title="style.chart.layout.plots.dragMarker.positionIndicator.circle"
                                                >
                                                    <BaseAttr
                                                        name="show"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.circle.show"
                                                        type="checkbox"
                                                        defaultVal="true"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="radius"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.circle.radius"
                                                        type="number"
                                                        defaultVal="3"
                                                        :min="0"
                                                        :max="8"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="stroke"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.circle.stroke"
                                                        type="color"
                                                        defaultVal="#FFFFFF"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="strokeWidth"
                                                        attr="style.chart.layout.plots.dragMarker.positonIndicator.circle.strokeWidth"
                                                        type="number"
                                                        defaultVal="1"
                                                        :min="0"
                                                        :max="6"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                </BaseDetails>

                                                <BaseDetails
                                                    attr="value"
                                                    :level="7"
                                                    title="style.chart.layout.plots.dragMarker.positionIndicator.value"
                                                >
                                                    <BaseAttr
                                                        name="show"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.value.show"
                                                        type="checkbox"
                                                        defaultVal="true"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="offsetY"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.value.offsetY"
                                                        type="number"
                                                        defaultVal="0"
                                                        :min="-24"
                                                        :max="24"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="fontSize"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.value.fontSize"
                                                        type="number"
                                                        defaultVal="12"
                                                        :min="6"
                                                        :max="42"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="useSerieColor"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.value.useSerieColor"
                                                        type="checkbox"
                                                        defaultVal="false"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="color"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.value.color"
                                                        type="color"
                                                        defaultVal="#2D353C"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <BaseAttr
                                                        name="rounding"
                                                        attr="style.chart.layout.plots.dragMarker.positionIndicator.value.rounding"
                                                        type="number"
                                                        defaultVal="0"
                                                        :min="0"
                                                        :max="6"
                                                        :light="mutableConfig"
                                                        :dark="
                                                            mutableConfigDarkMode
                                                        "
                                                    />
                                                    <div
                                                        class="flex flex-row gap-2 place-items-center"
                                                    >
                                                        <BaseAttr
                                                            inactive
                                                            name="formatter"
                                                            defaultVal="null"
                                                            :comment="
                                                                translations
                                                                    .formatterLink[
                                                                    store.lang
                                                                ]
                                                            "
                                                        />
                                                        <div
                                                            class="min-w-[200px]"
                                                        >
                                                            <BaseTabLink
                                                                :action="
                                                                    () =>
                                                                        goToPage(
                                                                            '/customization#formatter',
                                                                        )
                                                                "
                                                                icon="cursor"
                                                            >
                                                                Go to page
                                                            </BaseTabLink>
                                                        </div>
                                                    </div>
                                                </BaseDetails>
                                            </BaseDetails>
                                        </BaseDetails>
                                    </BaseDetails>

                                    <BaseDetails
                                        attr="labels"
                                        :level="4"
                                        title="style.chart.layout.labels"
                                    >
                                        <BaseDetails
                                            attr="item"
                                            :level="5"
                                            title="style.chart.layout.labels.item"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.labels.item.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="ellipsisThresholdChars"
                                                attr="style.chart.layout.labels.item.ellipsisThresholdChars"
                                                type="number"
                                                defaultVal="24"
                                                :min="0"
                                                :max="100"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="useSerieColor"
                                                attr="style.chart.layout.labels.item.useSerieColor"
                                                type="checkbox"
                                                defaultVal="false"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="color"
                                                attr="style.chart.layout.labels.item.color"
                                                type="color"
                                                defaultVal="#2D353C"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="fontSize"
                                                attr="style.chart.layout.labels.item.fontSize"
                                                type="number"
                                                defaultVal="14"
                                                :min="6"
                                                :max="42"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="bold"
                                                attr="style.chart.layout.label.item.bold"
                                                type="checkbox"
                                                defaultVal="false"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="offsetX"
                                                attr="style.chart.layout.label.item.offsetX"
                                                type="number"
                                                defaultVal="0"
                                                :min="-64"
                                                :max="64"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="offsetY"
                                                attr="style.chart.layout.label.item.offsetY"
                                                type="number"
                                                defaultVal="0"
                                                :min="-64"
                                                :max="64"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="autoSideThreshold"
                                                attr="style.chart.layout.labels.item.autoSideThreshold"
                                                type="number"
                                                defaultVal="0.75"
                                                :min="0.5"
                                                :max="1"
                                                :step="0.01"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="stroke"
                                                attr="style.chart.layout.labels.item.stroke"
                                                type="color"
                                                defaultVal="#FFFFFF"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="strokeWidth"
                                                attr="style.chart.layout.labels.item.strokeWidth"
                                                type="number"
                                                defaultVal="5"
                                                :min="0"
                                                :max="12"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                        </BaseDetails>

                                        <BaseDetails
                                            attr="phases"
                                            :level="5"
                                            title="style.chart.layout.labels.phases"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.labels.phases.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="color"
                                                attr="style.chart.layout.labels.phases.color"
                                                type="color"
                                                defaultVal="#A1A1A1"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="fontSize"
                                                attr="style.chart.layout.labels.phases.fontSize"
                                                type="number"
                                                defaultVal="14"
                                                :min="8"
                                                :max="42"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="bold"
                                                attr="style.chart.layout.labels.phases.bold"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="letterSpacing"
                                                attr="style.chart.layout.labels.phases.letterSpacing"
                                                type="text"
                                                defaultVal="'0.1em'"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="offsetY"
                                                attr="style.chart.layout.labels.phases.offsetY"
                                                type="number"
                                                defaultVal="0"
                                                :min="-64"
                                                :max="64"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseDetails
                                                attr="left"
                                                :level="6"
                                                title="style.chart.layout.labels.phases.left"
                                            >
                                                <BaseAttr
                                                    name="text"
                                                    attr="style.chart.layout.labels.phases.left.text"
                                                    type="text"
                                                    defaultVal="FIGURING THINGS OUT"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                            </BaseDetails>
                                            <BaseDetails
                                                attr="right"
                                                :level="6"
                                                title="style.chart.layout.labels.phases.right"
                                            >
                                                <BaseAttr
                                                    name="text"
                                                    attr="style.chart.layout.labels.phases.right.text"
                                                    type="text"
                                                    defaultVal="MAKING IT HAPPEN"
                                                    :light="mutableConfig"
                                                    :dark="
                                                        mutableConfigDarkMode
                                                    "
                                                />
                                            </BaseDetails>
                                        </BaseDetails>
                                    </BaseDetails>

                                    <BaseDetails
                                        attr="stackbar"
                                        :level="4"
                                        title="style.chart.layout.stackbar"
                                    >
                                        <BaseAttr
                                            name="show"
                                            attr="style.chart.layout.stackbar.show"
                                            type="checkbox"
                                            defaultVal="true"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="paddingTop"
                                            attr="style.chart.layout.stackbar.paddingTop"
                                            type="number"
                                            defaultVal="0"
                                            :min="-64"
                                            :max="64"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="paddingBottom"
                                            attr="style.chart.layout.stackbar.paddingBottom"
                                            type="number"
                                            defaultVal="12"
                                            :min="-64"
                                            :max="64"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="height"
                                            attr="style.chart.layout.stackbar.height"
                                            type="number"
                                            defaultVal="14"
                                            :min="6"
                                            :max="24"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="stroke"
                                            attr="style.chart.layout.stackbar.stroke"
                                            type="color"
                                            defaultVal="#FFFFFF"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="strokeWidth"
                                            attr="style.chart.layout.stackbar.strokeWidth"
                                            type="number"
                                            defaultVal="1.5"
                                            :min="0"
                                            :max="6"
                                            :step="0.5"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseAttr
                                            name="gutterColor"
                                            attr="style.chart.layout.stackbar.gutterColor"
                                            type="color"
                                            defaultVal="#E1E5E8"
                                            :light="mutableConfig"
                                            :dark="mutableConfigDarkMode"
                                        />
                                        <BaseDetails
                                            attr="label"
                                            :level="5"
                                            title="style.chart.layout.stackbar.label"
                                        >
                                            <BaseAttr
                                                name="show"
                                                attr="style.chart.layout.stackbar.label.show"
                                                type="checkbox"
                                                defaultVal="true"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="color"
                                                attr="style.chart.layout.stackbar.label.color"
                                                type="color"
                                                defaultVal="#2D353C"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <BaseAttr
                                                name="fontSize"
                                                attr="style.chart.layout.stackbar.label.fontSize"
                                                type="number"
                                                defaultVal="12"
                                                :min="6"
                                                :max="42"
                                                :light="mutableConfig"
                                                :dark="mutableConfigDarkMode"
                                            />
                                            <div
                                                class="flex flex-row gap-2 place-items-center"
                                            >
                                                <BaseAttr
                                                    inactive
                                                    name="formatter"
                                                    defaultVal="null"
                                                    :comment="
                                                        translations
                                                            .formatterLink[
                                                            store.lang
                                                        ]
                                                    "
                                                />
                                                <div class="min-w-[200px]">
                                                    <BaseTabLink
                                                        :action="
                                                            () =>
                                                                goToPage(
                                                                    '/customization#formatter',
                                                                )
                                                        "
                                                        icon="cursor"
                                                    >
                                                        Go to page
                                                    </BaseTabLink>
                                                </div>
                                            </div>
                                        </BaseDetails>
                                    </BaseDetails>
                                </BaseDetails>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                </code>
            </template>

            <template #tab2>
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

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiHill"
                    :withSvgContent="false"
                    :types="[
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

            <template #tab6>
                <ThemesVueUiHill />
            </template>

            <template #tab11>
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
