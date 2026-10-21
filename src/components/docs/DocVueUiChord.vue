<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiChordConfigFields from "./configuration/VueUiChordConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon, ExclamationCircleIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiChord from "../themes/ThemesVueUiChord.vue";
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
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
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
    matrix: [
        [12000, 6000, 9000, 3000],
        [2000, 10000, 2000, 6001],
        [8000, 1600, 8000, 8001],
        [1000, 1000, 1000, 7001],
    ],
    labels: ["Group A", "Group B", "Group C", "Group D"],
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            theme: "",
            customPalette: [],
            enableRotation: true,
            initialRotation: 0,
            useCssAnimation: true,
            responsive: false,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
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
                    tooltip: false,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: true,
                    labels: false,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: false,
                    annotator: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    table: "Toggle table",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "1A1A1A",
                    legend: {
                        show: true,
                        bold: false,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        position: "bottom",
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
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
                    arcs: {
                        innerRadiusRatio: 0.8,
                        outerRadiusRatio: 0.8,
                        padAngle: 5,
                        stroke: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                        strokeWidth: 1,
                        labels: {
                            show: true,
                            fontSize: 14,
                            bold: false,
                            curved: false,
                            adaptColorToBackground: true,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            offset: 0,
                            showPercentage: true,
                            roundingPercentage: 0,
                        },
                    },
                    ribbons: {
                        stroke: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                        strokeWidth: 1,
                        underlayerOpacity: 1,
                        labels: {
                            show: true,
                            formatter: null,
                            prefix: "",
                            suffix: "",
                            rounding: 0,
                            fontSize: 14,
                            bold: false,
                            useSerieColor: false,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            offset: 0,
                            minSeparationDeg: 3,
                            connector: {
                                stroke: isDarkMode.value
                                    ? "#CCCCCC"
                                    : "#1A1A1A",
                                strokeWidth: 1,
                            },
                            marker: {
                                show: true,
                                radius: 3,
                                stroke: isDarkMode.value
                                    ? "#1A1A1A"
                                    : "#F3F4F6",
                                strokeWidth: 1,
                            },
                        },
                    },
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

const dsTypeCode = computed(() => {
    return `type VueUiChordDataset = {
    matrix: number[][]
    labels?: string[]
    colors?: string[]
}`;
});

const codeDataset = ref(`const dataset: VueUiChordDataset = {
    matrix: [
        [ 12000, 6000, 9000, 3000],
        [ 2000, 10000, 2000, 6001], 
        [ 8000, 1600, 8000, 8001], 
        [ 1000, 1000, 1000, 7001]  
    ],
    labels: ["Group A", "Group B", "Group C", "Group D"],
    colors: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78"]
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
        <BaseDocTitle name="VueUiChord" />

        <BaseDocDescription
            :text="translations.docs.tooltips.chord[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-chord"
            targetMaker="VueUiChord"
            :configSource="mainConfig.vue_ui_chord"
        />

        <div :class="`transition-all mx-auto w-full sm:w-2/3`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        component="VueUiChord"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-chord" />
        </div>

        <Rater itemId="vue_ui_chord" />

        <BaseMigrationInfo cssAnimation debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showResponsive
            showCallbacks
            showPatterns
            signInfo="positiveOnly"
            schema="vue_ui_chord"
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
                <DebugHint
                    component="VueUiChord"
                    configType="VueUiChordConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiChordConfig</code>
                </div>
                <code ref="configCode">
                    <VueUiChordConfigFields
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
                <div>
                    <ComponentEmits
                        component="VueUiChord"
                        :names="[
                            'selectLegend',
                            'selectGroup',
                            'selectRibbon',
                            'copyAlt',
                        ]"
                    />

                    <ExposedMethods
                        component="VueUiDonut"
                        getImage
                        :names="[
                            'generatePdf',
                            'generateCsv',
                            'generateImage',
                            'generateSvg',
                            'toggleTable',
                        ]"
                    />
                </div>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiChord"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'svg',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'pattern',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-chord.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiChord />
            </template>

            <template #responsive>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiChord"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #patterns>
                <VueDataUi
                    component="VueUiChord"
                    :dataset="dataset"
                    :config="config"
                    :key="key"
                >
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern
                            v-if="seriesIndex === 0"
                            :id="patternId"
                            name="scales"
                            stroke="#85e7f2"
                            :strokeWidth="1"
                            :scale="0.7"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 1"
                            :id="patternId"
                            name="flooring"
                            stroke="#85e7f2"
                            :strokeWidth="1"
                            :scale="0.7"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 2"
                            :id="patternId"
                            name="maze"
                            stroke="#85e7f2"
                            :strokeWidth="1"
                            :scale="0.7"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 3"
                            :id="patternId"
                            name="redrum"
                            stroke="#85e7f2"
                            :strokeWidth="1"
                            :scale="0.7"
                        />
                    </template>
                </VueDataUi>
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                        'table',
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
