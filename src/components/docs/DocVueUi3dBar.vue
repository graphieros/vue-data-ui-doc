<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUi3dBarConfigFields from "./configuration/VueUi3dBarConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUi3dBar from "../themes/ThemesVueUi3dBar.vue";
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
    percentage: 66.5,
    series: [
        {
            name: "Serie 1 with a long name that should be shorter but we do not have the choice",
            value: 256,
            breakdown: [
                {
                    name: "Sub serie 1",
                    value: 100,
                },
                {
                    name: "Sub serie 2",
                    value: 90,
                },
                {
                    name: "Sub serie 3",
                    value: 66,
                },
            ],
        },
        {
            name: "Serie 2",
            value: 128,
            breakdown: [
                {
                    name: "Sub serie 1",
                    value: 100,
                },
                {
                    name: "Sub serie 2",
                    value: 28,
                },
            ],
        },
        {
            name: "Serie 3",
            value: 64,
            breakdown: [
                {
                    name: "Sub serie 1",
                    value: 30,
                },
                {
                    name: "Sub serie 2",
                    value: 20,
                },
                {
                    name: "Sub serie 3",
                    value: 14,
                },
            ],
        },
        {
            name: "Serie 4",
            value: 32,
            breakdown: [
                {
                    name: "Sub serie 1",
                    value: 12,
                },
                {
                    name: "Sub serie 2",
                    value: 12,
                },
                {
                    name: "Sub serie 3",
                    value: 8,
                },
            ],
        },
        {
            name: "Serie 5",
            value: 16,
            breakdown: [
                {
                    name: "Sub serie 1",
                    value: 10,
                },
                {
                    name: "Sub serie 2",
                    value: 6,
                },
            ],
        },
        {
            name: "Serie 6",
            value: 8,
            breakdown: [
                {
                    name: "Sub serie 1",
                    value: 6,
                },
                {
                    name: "Sub serie 2",
                    value: 2,
                },
            ],
        },
    ],
});

const shapeOptions = ref(["bar", "tube"]);

const isSeries = ref(true);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            useCssAnimation: false,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            style: {
                fontFamily: "inherit",
                shape: "bar",
                chart: {
                    animation: { use: true, speed: 1, acceleration: 1 },
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    bar: {
                        color: "#5f8bee",
                        stroke: "#5f8bee",
                        strokeWidth: 0.7,
                        shadeColor: isDarkMode.value ? "#2A2A2A" : "#1A1A1A",
                    },
                    box: {
                        stroke: isDarkMode.value ? "#5A5A5A" : "#CCCCCC",
                        strokeWidth: 0.7,
                        strokeDasharray: 2,
                        dimensions: {
                            width: 128,
                            height: 256,
                            top: 27,
                            bottom: 9,
                            left: 24,
                            right: 24,
                            perspective: 18,
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
                    legend: {
                        showDefault: true,
                        fontSize: 10,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        bold: false,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        prefix: "",
                        suffix: "",
                        hideUnderPercentage: 3,
                    },
                    dataLabel: {
                        show: true,
                        bold: true,
                        color: "#5f8bee",
                        fontSize: 12,
                        rounding: 1,
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
                    csv: true,
                    table: true,
                    fullscreen: true,
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
                responsiveBreakpoint: 300,
                columnNames: {
                    series: "Series",
                    value: "Value",
                    percentage: "Percentage",
                },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FAFAFA",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
    key.value += 1;
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

const dsType1 = ref(`type VueUi3dBarDataset = {
    percentage: number // from 0 to 100
}`);

const dsType2 = ref(`type VueUi3dBarDataset = {
    series: Array<{
        name: string
        value: number
        color?: string
        // Use breakdown to display donuts in the legend
        breakdown?: Array<{
            name: string
            value: number
        }>
    }>
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
        <BaseDocTitle name="VueUi3dBar" />

        <BaseDocDescription
            :text="translations.docs.tooltips.bar3d[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-3d-bar"
            targetMaker="VueUi3dBar"
            :configSource="mainConfig.vue_ui_3d_bar"
        />

        <div :class="`mx-auto max-w-[400px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUi3dBar
                        :dataset="
                            isSeries
                                ? dataset
                                : { percentage: dataset.percentage }
                        "
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <div
                class="w-full mx-auto flex flex-row place-items-center justify-center mt-10 gap-3"
            >
                <label for="is_series">Stack mode</label>
                <input id="is_series" type="checkbox" v-model="isSeries" />
            </div>
        </div>
        <div
            class="w-full mx-auto max-w-[600px] text-gray-500 mb-10 mt-5 text-center"
        >
            {{ translations.docs.comments.bar3d.mode[store.lang] }}
        </div>

        <Rater itemId="vue_ui_3d_bar" />

        <BaseMigrationInfo cssAnimation debug />

        <Box
            ref="box"
            showResponsive
            showEmits
            showSlots
            showThemes
            showCallbacks
            schema="vue_ui_3d_bar"
            signInfo="positiveOrNegativeOnly"
        >
            <template #dataset>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="w-full overflow-x-auto mb-6 border-gray-700">
                    Percentage mode:

                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsType1"
                        class="my-6"
                    />
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUi3dBarDataset</span> = {
    percentage: 66.5
}
</code>
</pre>
                    <div class="border-b border-gray-700 mb-6"></div>
                    Stack mode:
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsType2"
                        class="my-6"
                    />
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUi3dBarDataset</span> = {
    series: [
        {
            name:  'Serie 1 with a long name that should be shorter but we do not have the choice',
            value: 256,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 90
                },
                {
                    name: 'Sub serie 3',
                    value: 66
                }
            ]
        },
        {
            name: 'Serie 2',
            value: 128
        },
        {
            name: 'Serie 3',
            value: 64
        },
        {
            name: 'Serie 4',
            value: 32
        },
        {
            name: 'Serie 5',
            value: 16
        },
        {
            name: 'Serie 6',
            value: 8
        }
    ]
}
</code>
</pre>
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUi3dBar"
                    configType="VueUi3dBarConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUi3dBarConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUi3dBarConfigFields
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
                <ExposedMethods
                    component="VueUi3dBar"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
                />
            </template>
            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUi3dBar"
                    :types="[
                        'svg-underlayer',
                        'hint',
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-3d-bar.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUi3dBar />
            </template>

            <template #responsive>
                <ResponsiveUnit height="450px" minHeight="300px" width="300px">
                    <template #chart>
                        <VueDataUi
                            component="VueUi3dBar"
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
