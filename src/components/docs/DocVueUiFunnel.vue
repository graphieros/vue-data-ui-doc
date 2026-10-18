<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiFunnelConfigFields from "./configuration/VueUiFunnelConfigFields.vue";
import { ref, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiFunnel from "../themes/ThemesVueUiFunnel.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
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
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);
const key = ref(0);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

function forceChartUpdate() {
    key.value += 1;
}

const dataset = ref([
    {
        name: "Lead",
        value: 8249,
    },
    {
        name: "Opportunity",
        value: 6322,
    },
    {
        name: "Qualified",
        value: 4562,
    },
    {
        name: "Sold",
        value: 3021,
    },
    {
        name: "Retained",
        value: 1412,
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            debug: false,
            devHints: { enable: false },
            theme: "",
            responsive: false,
            responsiveProportionalSizing: true,
            useCssAnimation: true,
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
                columnNames: {
                    series: "Step",
                    value: "Value",
                    percentage: "Percentage",
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
                    tooltip: true,
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
                    tooltip: "Toggle tooltip",
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
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    width: 600,
                    height: 500,
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
                    padding: { top: 12, right: 128, bottom: 24, left: 24 },
                    barCircleSpacingRatio: 0.05,
                    circles: {
                        stroke: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                        strokeWidth: 1,
                        dataLabels: {
                            formatter: null,
                            fontSize: 16,
                            offsetY: 0,
                            adaptColorToBackground: true,
                            color: "#2D353C",
                            rounding: 1,
                            bold: true,
                        },
                    },
                    circleLinks: {
                        show: true,
                        color: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
                        widthRatio: 1,
                    },
                    area: {
                        show: true,
                        color: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
                    },
                    bars: {
                        stroke: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                        defaultColor: "#1f77b4",
                        strokeWidth: 1,
                        gapRatio: 0.2,
                        borderRadius: 3,
                        dataLabels: {
                            name: {
                                fontSize: 16,
                                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                                bold: true,
                                offsetX: 0,
                                offsetY: 0,
                            },
                            value: {
                                formatter: null,
                                fontSize: 16,
                                rounding: 0,
                                bold: false,
                                color: isDarkMode.value ? "#6A6A6A" : "#2D353C",
                                prefix: "",
                                suffix: "",
                                offsetX: 0,
                                offsetY: 0,
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
    return `type VueUiFunnelDatasetItem = {
    name: string
    value: number
}`;
});

const codeDataset = ref(`const dataset: VueUiFunnelDatasetItem[] = [
    {
        name: "Lead",
        value: 8249,
    },
    {
        name: "Opportunity",
        value: 6322,
    },
    {
        name: "Qualified",
        value: 4562,
    },
    {
        name: "Sold",
        value: 3021,
    },
    {
        name: "Retained",
        value: 1412,
    },
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
        <BaseDocTitle name="VueUiFunnel" />

        <BaseDocDescription
            :text="translations.docs.tooltips.funnel[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-funnel"
            targetMaker="VueUiFunnel"
            :configSource="mainConfig.vue_ui_funnel"
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
                    <VueDataUi
                        component="VueUiFunnel"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-funnel" />
        </div>

        <Rater itemId="vue_ui_funnel" />

        <Box
            ref="box"
            showEmits
            showCallbacks
            showSlots
            showThemes
            showResponsive
            schema="vue_ui_funnel"
            signInfo="positiveOnly"
        >
            <template #tab0>
                <div
                    class="w-full overflow-x-auto border-b my-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :title="translations.docs.datastructure[store.lang]"
                        :content="dsTypeCode"
                        class="my-6"
                    />
                </div>
                <CodeParser
                    language="typescript"
                    @copy="store.copy()"
                    :content="codeDataset"
                    :title="translations.docs.example[store.lang]"
                />
            </template>

            <template #tab1>
                <DebugHint
                    component="VueUiFunnel"
                    configType="VueUiFunnelConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiFunnelConfig</code>
                </div>
                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiFunnelConfigFields
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

            <!--EMITS-->
            <template #tab2>
                <ComponentEmits component="VueUiFunnel" :names="['copyAlt']" />
                <ExposedMethods
                    component="VueUiFunnel"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
                />
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.xy.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const funnelChart = ref(null);
            const funnelDataset = ref({});

            onMounted(async () => {
                funnelDataset.value = await funnelChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref(
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            );

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFunnel
                ref="funnelChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFunnel
                ref="funnelChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        funnelDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [] <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        
                    }
                },
                async mounted () {
                    this.funnelDataset = await this.$refs.funnelChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <!--SLOTS-->
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiFunnel"
                    :types="['svg', 'watermark', 'source', 'chart-background']"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-funnel.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <!--THEMES-->
            <template #tab6>
                <ThemesVueUiFunnel />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiFunnel"
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

            <template #tab11>
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
