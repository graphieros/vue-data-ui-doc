<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiGalaxyConfigFields from "./configuration/VueUiGalaxyConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiGalaxy from "../themes/ThemesVueUiGalaxy.vue";
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

const dataset = ref([
    {
        name: "Serie 1",
        values: [100],
    },
    {
        name: "Serie 2",
        values: [200],
    },
    {
        name: "Serie 1",
        values: [300, 1],
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            useCssAnimation: true,
            useBlurOnHover: true,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            transitions: {
                enable: true,
                pauseOnLoad: true,
                pauseOnDatasetChange: false,
                activationDelayMs: 300,
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    layout: {
                        arcs: {
                            strokeWidth: 24,
                            borderWidth: 12,
                            offsetX: 0,
                            offsetY: 0,
                            hoverEffect: { show: true, multiplicator: 1.1 },
                            gradient: {
                                show: true,
                                intensity: 20,
                                color: isDarkMode.value
                                    ? "#FFFFFF80"
                                    : "#FFFFFF",
                            },
                        },
                        labels: {
                            dataLabels: {
                                showValueFirst: true,
                                usePercentageParens: true,
                                useValueParens: false,
                                prefix: "",
                                suffix: "",
                            },
                        },
                    },
                    legend: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        show: true,
                        fontSize: 16,
                        bold: false,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        showValue: true,
                        showPercentage: true,
                        position: "bottom",
                        selectAllToggle: {
                            show: false,
                            backgroundColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
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
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#FFFFFF",
                        fontSize: 14,
                        showValue: true,
                        showPercentage: true,
                        roundingValue: 0,
                        roundingPercentage: 0,
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
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                    roundingValue: 0,
                    roundingPercentage: 0,
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
                    img: true,
                    csv: true,
                    table: true,
                    fullscreen: true,
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
        }),
    set: configState.set,
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
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
    return `type VueUiGalaxyDatasetItem = {
  name: string
  values: number[]
  color?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiGalaxyDatasetItem[] = [
  {
      name: "Series 1",
      values: [100]
  },
  {
      name: "Series 2",
      values: [200]
  },
  {
      name: "Series 1",
      values: [300, 1]
  },
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

const customFormatCode =
    ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiGalaxy" />

        <BaseDocDescription
            :text="translations.docs.tooltips.galaxy[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-galaxy"
            targetMaker="VueUiGalaxy"
            :configSource="mainConfig.vue_ui_galaxy"
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
                        component="VueUiGalaxy"
                        :dataset="mutableDataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_galaxy" />

        <BaseMigrationInfo cssAnimation debug />

        <Box
            ref="box"
            showResponsive
            showEmits
            showSlots
            showCallbacks
            showTooltip
            showThemes
            schema="vue_ui_galaxy"
            signInfo="positiveOrNegativeOnly"
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
                <DebugHint
                    component="VueUiGalaxy"
                    configType="VueUiGalaxyConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiGalaxyConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiGalaxyConfigFields
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

            <template #tab2>
                <ComponentEmits
                    component="VueUiGalaxy"
                    :names="['selectLegend', 'selectDatapoint', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiGalaxy"
                    getImage
                    showHideSeries
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

      const galaxyChart = ref(null);
      const galaxyDataset = ref([]);

      onMounted(() => {
          galaxyDataset.value = galaxyChart.value.getData();
      });

      const config = ref({
          <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
      });
      const dataset = ref([
          <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
      ]);

  <span class="text-gray-400">&lt;/script&gt;</span>

  <span class="text-gray-400">&lt;template&gt;</span>
      &lt;VueUiGalaxy
          ref="galaxyChart"
          :config="config"
          :dataset="dataset"
      /&gt;
  <span class="text-gray-400">&lt;/template&gt;</span>
</code>
<span class="text-black dark:text-app-green">Using options API:</span>
<code>
  <span class="text-gray-400">&lt;template&gt;</span>
      &lt;VueUiGalaxy
          ref="galaxyChart"
          :config="config"
          :dataset="dataset"
      /&gt;
  <span class="text-gray-400">&lt;/template&gt;</span>

  <span class="text-gray-400">&lt;script&gt;</span>
      export default {
          data() {
              return {
                  galaxyDataset: [],
                  config: {
                      <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                  },
                  dataset: [
                      <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                  ]
              }
          },
          async mounted () {
              this.galaxyDataset = await this.$refs.galaxyChart.getData();
          }
      }
  <span class="text-gray-400">&lt;/script&gt;</span>
</code>
</pre>
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiGalaxy"
                    :types="[
                        'hint',
                        'svg',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-galaxy.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab4>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.style.chart.tooltip.customFormat</code
                >
                <CodeParser
                    class="mt-4"
                    language="javascript"
                    :content="customFormatCode"
                />

                <h3 class="my-4">
                    {{ translations.customFormatCss[store.lang] }}
                </h3>
                <CodeParser
                    language="css"
                    content=".vue-data-ui-custom-tooltip{ }"
                />
            </template>

            <template #tab6>
                <ThemesVueUiGalaxy />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px" minHeight="300px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiGalaxy"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
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
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
