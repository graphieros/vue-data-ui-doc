<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiChestnut from "../themes/ThemesVueUiChestnut.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from '../BaseComment.vue';
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

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()


watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

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
            color: "#F17171"
          },
          {
            name: "break 2.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 2.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.2",
        value: 300,
        breakdown: [
          {
            name: "break 2.2.1",
            value: 100,
            color: "#F17171"
          },
          {
            name: "break 2.2.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 2.2.3",
            value: 150,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.3",
        value: 125,
        breakdown: [
          {
            name: "break 2.3.1",
            value: 80,
            color: "#F17171"
          },
          {
            name: "break 2.3.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 2.3.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
    ]
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
            color: "#F17171"
          },
          {
            name: "break 3.1.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 3.1.3",
            value: 10,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.2",
        value: 90,
        breakdown: [
          {
            name: "break 3.2.1",
            value: 30,
            color: "#F17171"
          },
          {
            name: "break 3.2.2",
            value: 30,
            color: "#ffc800"
          },
          {
            name: "break 3.2.3",
            value: 40,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.3",
        value: 390,
        breakdown: [
          {
            name: "break 3.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 3.3.2",
            value: 200,
            color: "#ffc800"
          },
          {
            name: "break 3.3.3",
            value: 100,
            color: "#42d392"
          },
        ]
      }
    ]
  },
]);

const config = ref({
    debug: false,
    loading: false,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
                grandTotal: {
                    show: true,
                    fontSize: 20,
                    bold: true,
                    suffix: "",
                    prefix: "",
                    roundingValue: 0,
                    color: "#1A1A1A",
                    text: "Grand total",
                    offsetY: 0,
                },
                roots: {
                    stroke: "#F3F4F6",
                    strokeWidth: 5,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    labels: {
                        show: true,
                        fontSize: 16,
                        adaptColorToBackground: true,
                        color: "#1A1A1A",
                        bold: true,
                        roundingValue: 0,
                        prefix: "",
                        suffix: "",
                        name: {
                            color: "#1A1A1A",
                            fontSize: 16,
                            bold: true,
                        }
                    }
                },
                verticalSeparator: {
                    stroke: "#F3F4F6",
                    strokeWidth: 5,
                },
                links: {
                    opacity: 20,
                },
                branches: {
                    stroke: "#F3F4F6",
                    strokeWidth: 0,
                    borderRadius: 6,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    widthRatio: 1.5,
                    labels: {
                        show: true,
                        fontSize: 14,
                        color: "#1A1A1A",
                        bold: true,
                        dataLabels: {
                            show: true,
                            hideUnderValue: 5,
                            fontSize: 14,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "",
                            suffix: "",
                        }
                    }
                },
                nuts: {
                    offsetX: 20,
                    useGradient: true,
                    gradientIntensity: 30,
                    selected: {
                        useMotion: true,
                        useGradient: true,
                        gradientIntensity: 20,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        labels: {
                            dataLabels: {
                                hideUnderValue: 5,
                                color: "#1A1A1A",
                                fontSize: 12,
                                bold: false,
                                prefix: "",
                                suffix: ""
                            },
                            core: {
                                total: {
                                    color: "#1A1A1A",
                                    fontSize: 24,
                                    bold: false,
                                },
                                value: {
                                    color: "#1A1A1A",
                                    fontSize: 24,
                                    bold: true,
                                    prefix: "",
                                    suffix: ""
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: 16,
                    color: "#1A1A1A",
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: "",
                    suffix: ""
                },
                title: {
                    color: "#1A1A1A",
                    fontSize: 20,
                    text: "Title",
                    bold: true,
                    offsetY:0,
                    subtitle: {
                        text: "Subtitle",
                        color: "#565656",
                        bold: false,
                        fontSize: 16,
                        offsetY: 0,
                    }
                }
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
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
                nutToTotal: "%/total"
            }
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: true,
        position: 'right',
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    translations: {
        total: "Total",
        proportionToTree: "of grand total",
        of: "of"
    }
});
const darkModeConfig = ref({
  debug: false,
  loading: false,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                grandTotal: {
                    show: true,
                    fontSize: 20,
                    bold: true,
                    suffix: "",
                    prefix: "",
                    roundingValue: 0,
                    color: "#CCCCCC",
                    text: "Grand total",
                    offsetY: 0,
                },
                roots: {
                    stroke: "#1A1A1A",
                    strokeWidth: 5,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    labels: {
                        show: true,
                        fontSize: 16,
                        adaptColorToBackground: true,
                        color: "#CCCCCC",
                        bold: true,
                        roundingValue: 0,
                        prefix: "",
                        suffix: "",
                        name: {
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        }
                    }
                },
                verticalSeparator: {
                    stroke: "#1A1A1A",
                    strokeWidth: 5,
                },
                links: {
                    opacity: 20,
                },
                branches: {
                    stroke: "#1A1A1A",
                    strokeWidth: 0,
                    borderRadius: 6,
                    useGradient: true,
                    gradientIntensity: 30,
                    underlayerColor: "#1A1A1A",
                    widthRatio: 1.5,
                    labels: {
                        show: true,
                        fontSize: 14,
                        color: "#CCCCCC",
                        bold: true,
                        dataLabels: {
                            show: true,
                            hideUnderValue: 5,
                            fontSize: 14,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "",
                            suffix: "",
                        }
                    }
                },
                nuts: {
                    offsetX: 20,
                    useGradient: true,
                    gradientIntensity: 30,
                    selected: {
                        useMotion: true,
                        useGradient: true,
                        gradientIntensity: 40,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        labels: {
                            dataLabels: {
                                hideUnderValue: 5,
                                color: "#CCCCCC",
                                fontSize: 12,
                                bold: false,
                                prefix: "",
                                suffix: ""
                            },
                            core: {
                                total: {
                                    color: "#CCCCCC",
                                    fontSize: 24,
                                    bold: false,
                                },
                                value: {
                                    color: "#FAFAFA",
                                    fontSize: 24,
                                    bold: true,
                                    prefix: "",
                                    suffix: ""
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: 16,
                    color: "#CCCCCC",
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: "",
                    suffix: ""
                },
                title: {
                    color: "#FAFAFA",
                    fontSize: 20,
                    text: "Title",
                    bold: true,
                    offsetY:0,
                    subtitle: {
                        text: "Subtitle",
                        color: "#CCCCCC",
                        bold: false,
                        fontSize: 16,
                        offsetY: 0,
                    }
                }
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
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
                nutToTotal: "%/total"
            }
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    translations: {
        total: "Total",
        proportionToTree: "of grand total",
        of: "of"
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode()

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
}`
})

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
];`)

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiChestnut" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.chestnut[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-chestnut"
          targetMaker="VueUiChestnut"
          :configSource="mainConfig.vue_ui_chestnut"
        />

        <div :class="`transition-all mx-auto w-3/4`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <VueUiChestnut :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
          </DocSnapper>
        </div>

        <Rater itemId="vue_ui_chestnut" />

        <BaseMigrationInfo
            debug 
        />

        <Box showEmits showSlots showThemes schema="vue_ui_chestnut" signInfo="positiveOnly">
            <template v-slot:tab0>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

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
              <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>

              <div class="mt-4">
                TS type: <code class="text-app-blue">VueUiChestnutConfig</code>
              </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiChestnutConfig" equal>
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
    <span>customPalette: []; <BaseComment>string[]</BaseComment></span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <BaseDetails attr="branches" :level="4" title="style.chart.layout.branches">
            <BaseAttr name="stroke" attr="style.chart.layout.branches.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.chart.layout.branches.strokeWidth" type="number" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="borderRadius" attr="style.chart.layout.branches.borderRadius" type="number" defaultVal="6" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="style.chart.layout.branches.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="gradientIntensity" attr="style.chart.layout.branches.gradientIntensity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="underlayerColor" attr="style.chart.layout.branches.underlayerColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="widthRatio" attr="style.chart.layout.branches.widthRatio" type="range" defaultVal="1.5" :min="0.1" :max="1.8" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="labels" :level="5" title="style.chart.layout.branches.labels">
              <BaseAttr name="show" attr="style.chart.layout.branches.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.chart.layout.branches.labels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.chart.layout.branches.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.chart.layout.branches.labels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseDetails attr="dataLabels" :level="6" title="style.chart.layout.branches.labels.dataLabels">
                <BaseAttr name="show" attr="style.chart.layout.branches.labels.dataLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="hideUnderValue" attr="style.chart.layout.branches.labels.dataLabels.hideUnderValue" type="number" defaultVal="5" :min="1" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="style.chart.layout.branches.labels.dataLabels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="roundingValue" attr="style.chart.layout.branches.labels.dataLabels.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="roundingPercentage" attr="style.chart.layout.branches.labels.dataLabels.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="prefix" attr="style.chart.layout.branches.labels.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="suffix" attr="style.chart.layout.branches.labels.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
              </BaseDetails>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="grandTotal" :level="4" title="style.chart.layout.grandTotal">
            <BaseAttr name="show" attr="style.chart.layout.grandTotal.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.chart.layout.grandTotal.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.chart.layout.grandTotal.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="prefix" attr="style.chart.layout.grandTotal.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="suffix" attr="style.chart.layout.grandTotal.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="roundingValue" attr="style.chart.layout.grandTotal.roundingValue" type="number" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.chart.layout.grandTotal.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="text" attr="style.chart.layout.grandTotal.text" type="text" defaultVal="'Grand total'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="offsetY" attr="style.chart.layout.grandTotal.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
          </BaseDetails>
          <BaseDetails attr="legend" :level="4" title="style.chart.layout.legend">
            <BaseAttr name="fontSize" attr="style.chart.layout.legend.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.chart.layout.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="roundingValue" attr="style.chart.layout.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="roundingPercentage" attr="style.chart.layout.legend.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="prefix" attr="style.chart.layout.legend.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="suffix" attr="style.chart.layout.legend.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
          <BaseDetails attr="links" :level="4" title="style.chart.layout.links">
            <BaseAttr name="opacity" attr="style.chart.layout.links.opacity" type="range" defaultVal="10" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
          <BaseDetails attr="nuts" :level="4" title="style.chart.layout.nuts">
            <BaseAttr name="offsetX" attr="style.chart.layout.nuts.offsetX" type="number" defaultVal="20" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="style.chart.layout.nuts.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="gradientIntensity" attr="style.chart.layout.nuts.gradientIntensity" type="range" defaultVal="30" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="selected" :level="5" title="style.chart.layout.nuts.selected">
              <BaseAttr name="useMotion" attr="style.chart.layout.nuts.selected.useMotion" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="useGradient" attr="style.chart.layout.nuts.selected.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="gradientIntensity" attr="style.chart.layout.nuts.selected.gradientIntensity" type="range" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="roundingValue" attr="style.chart.layout.nuts.selected.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="roundingPercentage" attr="style.chart.layout.nuts.selected.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseDetails attr="labels" :level="6" title="style.chart.layout.nuts.selected.labels">
                <BaseDetails attr="core" :level="7" title="style.chart.layout.nuts.selected.labels.core">
                  <BaseDetails attr="total" :level="8" title="style.chart.layout.nuts.selected.labels.core.total">
                    <BaseAttr name="color" attr="style.chart.layout.nuts.selected.labels.core.total.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.layout.nuts.selected.labels.core.total.fontSize" type="number" defaultVal="24" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.layout.nuts.selected.labels.core.total.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  </BaseDetails>
                  <BaseDetails attr="value" :level="8" title="style.chart.layout.nuts.selected.labels.core.value">
                    <BaseAttr name="color" attr="style.chart.layout.nuts.selected.labels.core.value.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.layout.nuts.selected.labels.core.value.fontSize" type="number" defaultVal="24" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.layout.nuts.selected.labels.core.value.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="prefix" attr="style.chart.layout.nuts.selected.labels.core.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="suffix" attr="style.chart.layout.nuts.selected.labels.core.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="dataLabels" :level="7" title="style.chart.layout.nuts.selected.labels.dataLabels">
                  <BaseAttr name="hideUnderValue" attr="style.chart.layout.nuts.selected.labels.dataLabels.hideUnderValue" type="number" defaultVal="5" :min="1" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="color" attr="style.chart.layout.nuts.selected.labels.dataLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="fontSize" attr="style.chart.layout.nuts.selected.labels.dataLabels.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="bold" attr="style.chart.layout.nuts.selected.labels.dataLabels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="prefix" attr="style.chart.layout.nuts.selected.labels.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="suffix" attr="style.chart.layout.nuts.selected.labels.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                </BaseDetails>
              </BaseDetails>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="roots" :level="4" title="style.chart.layout.roots">
            <BaseAttr name="stroke" attr="style.chart.layout.roots.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.chart.layout.roots.strokeWidth" type="number" defaultVal="5" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="style.chart.layout.roots.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="gradientIntensity" attr="style.chart.layout.roots.gradientIntensity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="underlayerColor" attr="style.chart.layout.roots.underlayerColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="labels" :level="5" title="style.chart.layout.roots.labels">
              <BaseAttr name="show" attr="style.chart.layout.roots.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.chart.layout.roots.labels.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="adaptColorToBackground" attr="style.chart.layout.roots.labels.adaptColorToBackground" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.chart.layout.roots.labels.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.chart.layout.roots.labels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="roundingValue" attr="style.chart.layout.roots.labels.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="prefix" attr="style.chart.layout.roots.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="suffix" attr="style.chart.layout.roots.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
              <BaseDetails attr="name" :level="6" title="style.chart.layout.roots.labels.name">
                <BaseAttr name="color" attr="style.chart.layout.roots.labels.name.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="style.chart.layout.roots.labels.name.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="style.chart.layout.roots.labels.name.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              </BaseDetails>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="title" :level="4" title="style.chart.layout.title">
            <BaseAttr name="text" attr="style.chart.layout.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.chart.layout.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.chart.layout.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.chart.layout.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="offsetY" attr="style.chart.layout.title.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="subtitle" :level="5" title="style.chart.layout.title.subtitle">
              <BaseAttr name="text" attr="style.chart.layout.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.chart.layout.title.subtitle.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.chart.layout.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.chart.layout.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetY" attr="style.chart.layout.title.subtitle.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="verticalSeparator" :level="4" title="style.chart.layout.verticalSeparator">
            <BaseAttr name="stroke" attr="style.chart.layout.verticalSeparator.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.chart.layout.verticalSeparator.strokeWidth" type="number" defaultVal="5" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
      <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="th" :level="2" title="table.th">
        <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="translations" :level="3" title="table.th.translations">
          <BaseAttr name="rootName" attr="table.th.translations.rootName" type="text" defaultVal="root name" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="rootValue" attr="table.th.translations.rootValue" type="text" defaultVal="root value" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="rootToTotal" attr="table.th.translations.rootToTotal" type="text" defaultVal="%/total" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="branchName" attr="table.th.translations.branchName" type="text" defaultVal="branch name" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="branchValue" attr="table.th.translations.branchValue" type="text" defaultVal="branch value" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="branchToRoot" attr="table.th.translations.branchToRoot" type="text" defaultVal="%/root" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="branchToTotal" attr="table.th.translations.branchToTotal" type="text" defaultVal="%/total" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="nutName" attr="table.th.translations.nutName" type="text" defaultVal="nut name" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="nutValue" attr="table.th.translations.nutValue" type="text" defaultVal="nut value" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="nutToBranch" attr="table.th.translations.nutToBranch" type="text" defaultVal="%/branch" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="nutToRoot" attr="table.th.translations.nutToRoot" type="text" defaultVal="%/root" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="nutToTotal" attr="table.th.translations.nutToTotal" type="text" defaultVal="%/total" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="roundingPercentage" attr="table.td.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <BaseAttr name="total" attr="translations.total" type="text" defaultVal="Total" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="proportionToTree" attr="translations.proportionToTree" type="text" defaultVal="of grand total" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="of" attr="translations.of" type="text" defaultVal="of" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="print" :level="2" title="userOptions.print">
          <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
          <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
          <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>

                <div class="overflow-w-auto">            
                </div>
            </template>

            <template v-slot:tab2>
              <div><code>@selectRoot</code></div>
              <div class="text-gray-400 pl-5">{{ translations.docs.emits.chestnut.selectRoot[store.lang] }}</div>
<pre>
<code>
{
  branches: [
    {
      breakdown: [
        {
          branchName: string;
          branchTotal: number;
          color: string;
          id: string;
          name: string;
          proportionToBranch: number;
          proportionToRoot: number;
          proportionToTree: number;
          rootIndex: number;
          rootName: string;
          table: {
            branchName: string;
            branchToRoot: number;
            branchToTotal: number;
            branchValue: number;
            nutName: string;
            nutToBranch: number;
            nutToRoot: number;
            nutToTotal: number;
            rootName: string;
            rootToTotal: number;
            rootValue: number;
          },
          type: "nut";
          value: number;
        },
        {...}
      ],
      color: string;
      id: string;
      name: string;
      proportionToTotal: number;
      rootIndex: number;
      rootName: string;
      type: "branch";
      value: number;
    },
    {...}
  ],
  color: string;
  id: string;
  name: string;
  r: number;
  rootIndex: number;
  total: number;
  type: "root",
  x: number;
  y: number;
}
</code>
</pre>
              <div><code>@selectBranch</code></div>
              <div class="text-gray-400 pl-5">{{ translations.docs.emits.chestnut.selectBranch[store.lang] }}</div>
<pre>
<code>
{
  breakdown: [
    {
      branchName: string;
      branchTotal: number;
      color: string;
      id: string;
      name: string;
      proportionToBranch: number;
      proportionToRoot: number;
      proportionToTree: number;
      rootIndex: number;
      rootName: string;
      table: {
        branchName: string;
        branchToRoot: number;
        branchToTotal: number;
        branchValue: number;
        nutName: string;
        nutToBranch: number;
        nutToRoot: number;
        nutToTotal: number;
        rootName: string;
        rootToTotal: number;
        rootValue: number;
      },
      type: "nut";
      value: number;
    },
    {...}
  ],
  color: string;
  id: string;
  name: string;
  proportionToTotal: number;
  rootIndex: number;
  rootName: string;
  type: "branch";
  value: number;
}
</code>
</pre>
              <div><code>@selectNut</code></div>
              <div class="text-gray-400 pl-5">{{  translations.docs.emits.chestnut.selectNut[store.lang] }}</div>
<pre>
<code>
[
  {
      branchName: string;
      branchTotal: number;
      color: string;
      id: string;
      name: string;
      proportionToBranch: number;
      proportionToRoot: number;
      proportionToTree: number;
      rootIndex: number;
      rootName: string;
      table: {
        branchName: string;
        branchToRoot: number;
        branchToTotal: number;
        branchValue: number;
        nutName: string;
        nutToBranch: number;
        nutToRoot: number;
        nutToTotal: number;
        rootName: string;
        rootToTotal: number;
        rootValue: number;
      },
      type: "nut";
      value: number;
    },
    {...}
]
</code>
</pre>

<div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
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
                <ExposedMethods
                  component="VueUiChestnut"
                  getImage
                  :names="[
                    'generatePdf',
                    'generateCsv',
                    'generateImage',
                    'toggleTable'
                  ]"
                />
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                  componentName="VueUiChestnut"
                  :types="[
                      'svg',
                      'legend',
                      'watermark',
                      'source',
                      'chart-background'
                  ]" 
              />
            </template>

            <template #tab6>
              <ThemesVueUiChestnut />
            </template>
        </Box>
    </div>
</template>