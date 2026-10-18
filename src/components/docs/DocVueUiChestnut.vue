<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiChestnutConfigFields from "./configuration/VueUiChestnutConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiChestnut from "../themes/ThemesVueUiChestnut.vue";
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

const dataset = ref([
    {
        name: "Root1",
        branches: [
            {
                name: "branch 1.1",
                value: 200,
                breakdown: [
                    {
                        name: "break 1.1.1",
                        value: 50,
                        color: "#F17171",
                    },
                    {
                        name: "break 1.1.2",
                        value: 25,
                        color: "#ffc800",
                    },
                    {
                        name: "break 1.1.3",
                        value: 25,
                        color: "#42d392",
                    },
                ],
            },
            {
                name: "branch 1.2",
                value: 100,
                breakdown: [
                    {
                        name: "break 1.2.1",
                        value: 10,
                        color: "#F17171",
                    },
                    {
                        name: "break 1.2.2",
                        value: 20,
                        color: "#ffc800",
                    },
                    {
                        name: "break 1.2.3",
                        value: 70,
                        color: "#42d392",
                    },
                ],
            },
            {
                name: "branch 1.3",
                value: 175,
                breakdown: [
                    {
                        name: "break 1.3.1",
                        value: 90,
                        color: "#F17171",
                    },
                    {
                        name: "break 1.3.2",
                        value: 10,
                        color: "#ffc800",
                    },
                    {
                        name: "break 1.3.3",
                        value: 75,
                        color: "#42d392",
                    },
                ],
            },
        ],
    },
    {
        name: "Root2",
        branches: [
            {
                name: "branch 2.1",
                value: 200,
                breakdown: [
                    {
                        name: "break 2.1.1",
                        value: 150,
                        color: "#F17171",
                    },
                    {
                        name: "break 2.1.2",
                        value: 25,
                        color: "#ffc800",
                    },
                    {
                        name: "break 2.1.3",
                        value: 25,
                        color: "#42d392",
                    },
                ],
            },
            {
                name: "branch 2.2",
                value: 300,
                breakdown: [
                    {
                        name: "break 2.2.1",
                        value: 100,
                        color: "#F17171",
                    },
                    {
                        name: "break 2.2.2",
                        value: 10,
                        color: "#ffc800",
                    },
                    {
                        name: "break 2.2.3",
                        value: 150,
                        color: "#42d392",
                    },
                ],
            },
            {
                name: "branch 2.3",
                value: 125,
                breakdown: [
                    {
                        name: "break 2.3.1",
                        value: 80,
                        color: "#F17171",
                    },
                    {
                        name: "break 2.3.2",
                        value: 20,
                        color: "#ffc800",
                    },
                    {
                        name: "break 2.3.3",
                        value: 25,
                        color: "#42d392",
                    },
                ],
            },
        ],
    },
    {
        name: "Root3",
        branches: [
            {
                name: "branch 3.1",
                value: 120,
                breakdown: [
                    {
                        name: "break 3.1.1",
                        value: 100,
                        color: "#F17171",
                    },
                    {
                        name: "break 3.1.2",
                        value: 10,
                        color: "#ffc800",
                    },
                    {
                        name: "break 3.1.3",
                        value: 10,
                        color: "#42d392",
                    },
                ],
            },
            {
                name: "branch 3.2",
                value: 90,
                breakdown: [
                    {
                        name: "break 3.2.1",
                        value: 30,
                        color: "#F17171",
                    },
                    {
                        name: "break 3.2.2",
                        value: 30,
                        color: "#ffc800",
                    },
                    {
                        name: "break 3.2.3",
                        value: 40,
                        color: "#42d392",
                    },
                ],
            },
            {
                name: "branch 3.3",
                value: 390,
                breakdown: [
                    {
                        name: "break 3.3.1",
                        value: 90,
                        color: "#F17171",
                    },
                    {
                        name: "break 3.3.2",
                        value: 200,
                        color: "#ffc800",
                    },
                    {
                        name: "break 3.3.3",
                        value: 100,
                        color: "#42d392",
                    },
                ],
            },
        ],
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
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    layout: {
                        grandTotal: {
                            show: true,
                            fontSize: 20,
                            bold: true,
                            suffix: "",
                            prefix: "",
                            roundingValue: 0,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            text: "Grand total",
                            offsetY: 0,
                        },
                        roots: {
                            stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                            strokeWidth: 5,
                            useGradient: true,
                            gradientIntensity: 20,
                            underlayerColor: "#FFFFFF",
                            labels: {
                                show: true,
                                fontSize: 16,
                                adaptColorToBackground: true,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                bold: true,
                                roundingValue: 0,
                                prefix: "",
                                suffix: "",
                                name: {
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    fontSize: 16,
                                    bold: true,
                                },
                            },
                        },
                        verticalSeparator: {
                            stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                            strokeWidth: 5,
                        },
                        links: { opacity: 20 },
                        branches: {
                            stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                            strokeWidth: 0,
                            borderRadius: 6,
                            useGradient: true,
                            gradientIntensity: isDarkMode.value ? 30 : 20,
                            underlayerColor: isDarkMode.value
                                ? "#2A2A2A"
                                : "#FFFFFF",
                            widthRatio: 1.5,
                            labels: {
                                show: true,
                                fontSize: 14,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                bold: true,
                                dataLabels: {
                                    show: true,
                                    hideUnderValue: 5,
                                    fontSize: 14,
                                    roundingValue: 0,
                                    roundingPercentage: 0,
                                    prefix: "",
                                    suffix: "",
                                },
                            },
                        },
                        nuts: {
                            offsetX: 20,
                            useGradient: true,
                            gradientIntensity: 30,
                            selected: {
                                useMotion: true,
                                useGradient: true,
                                gradientIntensity: isDarkMode.value ? 40 : 20,
                                roundingValue: 0,
                                roundingPercentage: 0,
                                labels: {
                                    dataLabels: {
                                        hideUnderValue: 5,
                                        color: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#1A1A1A",
                                        fontSize: 12,
                                        bold: false,
                                        prefix: "",
                                        suffix: "",
                                    },
                                    core: {
                                        total: {
                                            color: isDarkMode.value
                                                ? "#CCCCCC"
                                                : "#1A1A1A",
                                            fontSize: 24,
                                            bold: false,
                                        },
                                        value: {
                                            color: isDarkMode.value
                                                ? "#FAFAFA"
                                                : "#1A1A1A",
                                            fontSize: 24,
                                            bold: true,
                                            prefix: "",
                                            suffix: "",
                                        },
                                    },
                                },
                            },
                        },
                        legend: {
                            fontSize: 16,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "",
                            suffix: "",
                        },
                        title: {
                            color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                            fontSize: 20,
                            text: "Title",
                            bold: true,
                            offsetY: 0,
                            subtitle: {
                                text: "Subtitle",
                                color: isDarkMode.value ? "#CCCCCC" : "#565656",
                                bold: false,
                                fontSize: 16,
                                offsetY: 0,
                            },
                        },
                    },
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
                    translations: {
                        rootName: "root name",
                        rootValue: "root value",
                        rootToTotal: "%/total",
                        branchName: "branch name",
                        branchValue: "branch value",
                        branchToRoot: "%/root",
                        branchToTotal: "%/total",
                        nutName: "nut name",
                        nutValue: "nut value",
                        nutToBranch: "%/branch",
                        nutToRoot: "%/root",
                        nutToTotal: "%/total",
                    },
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                position: "right",
                showOnChartHover: false,
                keepStateOnChartLeave: true,
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
            translations: {
                total: "Total",
                proportionToTree: "of grand total",
                of: "of",
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
    return `type VueUiChestnutDatasetRoot = {
  name: string
  color?: string
  branches: Array<{
    name: string;
    value: number;
    breakdown: Array<{
      name: string;
      value: number;
      color?: string;
    }>
  }>
}`;
});

const codeDataset = ref(`const dataset: VueUiChestnutDatasetRoot[] = [
  {
    name: "Root1",
    color: "#ff6400",
    branches: [
      {
        name: "branch 1.1",
        value: 200,
        breakdown: [
          {
            name: "break 1.1.1",
            value: 50,
            color: "#F17171"
          },
          {
            name: "break 1.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 1.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.2",
        value: 100,
        breakdown: [
          {
            name: "break 1.2.1",
            value: 10,
            color: "#F17171"
          },
          {
            name: "break 1.2.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 1.2.3",
            value: 70,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.3",
        value: 175,
        breakdown: [
          {
            name: "break 1.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 1.3.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 1.3.3",
            value: 75,
            color: "#42d392"
          },
        ]
      },
    ]
  }
];`);

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
        <BaseDocTitle name="VueUiChestnut" />

        <BaseDocDescription
            :text="translations.docs.tooltips.chestnut[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-chestnut"
            targetMaker="VueUiChestnut"
            :configSource="mainConfig.vue_ui_chestnut"
        />

        <div :class="`transition-all mx-auto w-full sm:w-3/4`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiChestnut
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_chestnut" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            schema="vue_ui_chestnut"
            signInfo="positiveOnly"
        >
            <template v-slot:tab0>
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
                </div>

                <div class="w-full overflow-x auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>

            <template v-slot:tab1>
                <DebugHint
                    component="VueUiChestnut"
                    configType="VueUiChestnutConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiChestnutConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiChestnutConfigFields
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

                <div class="overflow-w-auto"></div>
            </template>

            <template v-slot:tab2>
                <ComponentEmits
                    component="VueUiChestnut"
                    :names="[
                        'selectRoot',
                        'selectBranch',
                        'selectNut',
                        'copyAlt',
                    ]"
                />

                <ExposedMethods
                    component="VueUiChestnut"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                    ]"
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

            const chestnutChart = ref(null);
            const chestnutDataset = ref([]);

            onMounted(async () => {
                chestnutDataset.value = await chestnutChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiChestnut
                ref="chestnutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiChestnut
                ref="chestnutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        chestnutDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.chestnutDataset = await this.$refs.chestnutChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiChestnut"
                    :types="[
                        'hint',
                        'svg',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-chestnut.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiChestnut />
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
