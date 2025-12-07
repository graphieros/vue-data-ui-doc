<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiHeatmap from "../themes/ThemesVueUiHeatmap.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
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
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

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

function initDataset() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const arr = [];
    const dsLen = 26;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
        values.push((i + j * 2))
        }
        arr.push({
            name: `${days[i]}`,
            values
        })
    }
    return arr
}

const dataset = ref(initDataset());

const config = ref({
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    layout: {
      height: 300,
      width: 1000,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      cells: {
        rowTotal: {
          value: {
              show: true,
          },
          color: {
              show: true
          }
        },
        columnTotal: {
          value: {
              show: true,
              offsetX: 0,
              offsetY: 16,
              rotation: 0,
              autoRotate: {
                enable: true,
                angle: -30
              }
          },
          color: {
              show: true
          },
        },
        value: {
          show: true,
          fontSize: 12,
          bold: false,
          roundingValue: 0,
          color: "#1A1A1A"
        },
        colors: {
          hot: "#ff6400",
          cold: "#5f8bee",
          underlayer: "#F3F4F6"
        },
        spacing: 0.5,
        selected: {
          border: 2,
          color: "#1A1A1A"
        }
      },
      dataLabels: {
        prefix: "",
        suffix: "",
        xAxis: {
          show: true,
          values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
          datetimeFormatter: {
              enable: false,
              locale: 'en',
              useUTC: false,
              januaryAsYear: false,
              options: {
                  year: 'yyyy',
                  month: `MMM 'yy`,
                  day: 'dd MMM',
                  hour: 'HH:mm',
                  minute: 'HH:mm:ss',
                  second: 'HH:mm:ss'
              }
          },
          fontSize: 12,
          color: "#1A1A1A",
          bold: false,
          offsetX: 0,
          offsetY: 0,
          showOnlyAtModulo: null,
          rotation: 0,
          autoRotate: {
            enable: true,
            angle: -30
          }
        },
        yAxis: {
          show: true,
          values: [],
          fontSize: 12,
          color: "#1A1A1A",
          bold: false,
          offsetY: 0,
          offsetX: 0
        }
      }
    },
    title: {
      text: "Title",
      color: "#1A1A1A",
      fontSize: 20,
      bold: true,
      textAlign: 'center',
      paddingLeft: 0,
      paddingRight: 0,
      subtitle: {
        color: "#565656",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    },
    legend: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 12,
      bold: true,
      roundingValue: 0,
      width: 24
    },
    tooltip: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      borderRadius: 4,
      borderColor:"#e1e5e8",
      borderWidth: 1,
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24,
      smooth: true,
      smoothForce: 0.18,
      smoothSnapThreshold: 0.25
    }
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
      tooltip: true,
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
        tooltip: "Toggle tooltip",
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
  table: {
    show: false,
    useDialog: false,
    responsiveBreakpoint: 400,
    colNames: {
      xAxis: "Week"
    },
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none"
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none",
      roundingValue: 0
    }
  }
});
const darkModeConfig = ref({
  style: {
    backgroundColor: "#2A2A2A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    layout: {
      height: 300,
      width: 1000,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      cells: {
        rowTotal: {
          value: {
              show: true,
          },
          color: {
              show: true
          }
        },
        columnTotal: {
          value: {
              show: true,
              rotation: 0,
              offsetX: 0,
              offsetY: 16,
              autoRotate: {
                enable: true,
                angle: -30
              }
          },
          color: {
              show: true
          },
        },
        value: {
          show: true,
          fontSize: 12,
          bold: false,
          roundingValue: 0,
          color: "#FFFFFF"
        },
        colors: {
          hot: "#ff6400",
          cold: "#5f8bee",
          underlayer: "#1A1A1A"
        },
        spacing: 0.5,
        selected: {
          border: 2,
          color: "#FFFFFF"
        }
      },
      dataLabels: {
        prefix: "",
        suffix: "",
        xAxis: {
          show: true,
          values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
          datetimeFormatter: {
              enable: false,
              locale: 'en',
              useUTC: false,
              januaryAsYear: false,
              options: {
                  year: 'yyyy',
                  month: `MMM 'yy`,
                  day: 'dd MMM',
                  hour: 'HH:mm',
                  minute: 'HH:mm:ss',
                  second: 'HH:mm:ss'
              }
          },
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          offsetX: 0,
          offsetY: 0,
          showOnlyAtModulo: null,
          rotation: 0,
          autoRotate: {
            enable: true,
            angle: -30
          }
        },
        yAxis: {
          show: true,
          values: [],
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          offsetY: 0,
          offsetX: 0
        }
      }
    },
    title: {
      text: "Title",
      color: "#FAFAFA",
      fontSize: 20,
      bold: true,
      textAlign: 'center',
      paddingLeft: 0,
      paddingRight: 0,
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    },
    legend: {
      show: true,
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      fontSize: 12,
      bold: true,
      roundingValue: 0,
      width: 24
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      borderRadius: 4,
      borderColor:"#3A3A3A",
      borderWidth: 1,
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24,
      smooth: true,
      smoothForce: 0.18,
      smoothSnapThreshold: 0.25
    }
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
      tooltip: true,
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
        tooltip: "Toggle tooltip",
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
  table: {
    show: false,
    useDialog: false,
    responsiveBreakpoint: 400,
    colNames: {
      xAxis: "Week"
    },
    th: {
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      outline: "none"
    },
    td: {
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 0
    }
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

function randomizeData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const arr = [];
    const dsLen = 26;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
        values.push(Math.random() * 100)
        }
        arr.push({
            name: `${days[i]}`,
            values
        })
    }
    dataset.value = arr
}

const dsTypeCode = computed(() => {
  return `type VueUiHeatmapDatasetItem = {
  name: string
  values: number[]
}`
})

const codeDataset = ref(`const dataset: VueUiHeatmapDatasetItem[] = [
    {
        name: "Mon",
        values: [31, 58, 12, 25, 13]
    },
    {
        name: "Tue",
        values: [3, 12, 7, 9, 15, 27]
    },
    {
        name: "Wed",
        values: [8, 9, 3, 18, 11, 7]
    }
];`)


/**
 * {
    "side": "up",
    "color": "#be4133",
    "ratio": 0.6428571428571429,
    "value": 46,
    "yAxisName": "Fri",
    "xAxisName": 21,
    "id": "vue-data-ui-heatmap-cell-77e48fa5-4062-43ad-9d8f-b8d88f074c1d"
}
 */

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

const customFormatCode = ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiHeatmap" />

      <BaseDocDescription :text="translations.docs.tooltips.heatmap[store.lang]" />

        <BaseDocHeaderActions
          targetLink="vue-ui-heatmap"
          targetMaker="VueUiHeatmap"
          :configSource="mainConfig.vue_ui_heatmap"
        />

        <div :class="`transition-all mx-auto`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <BaseCard>
              <VueUiHeatmap :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </BaseCard>
          </DocSnapper>
            <BaseRandomButton @click="randomizeData"/>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-heatmap"/>
        </div>

        <Rater itemId="vue_ui_heatmap" />

        <BaseMigrationInfo
            autoRotate
            debug 
            padding
            heatmapSize
        />

        <Box ref="box" showEmits showSlots showTooltip showThemes showCallbacks showResponsive schema="vue_ui_heatmap" signInfo="both">
            <template v-slot:tab0>
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
            <template v-slot:tab1>
              <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiHeatmapConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiHeatmapConfig" equal>
      <span>theme: "", <BaseComment>"dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
      <BaseDetails attr="style" :level="1">
        <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>fontFamily: "inherit",</span>
        <BaseDetails attr="layout" :level="2" title="style.layout">
          <BaseAttr name="width" attr="style.layout.width" type="number" defaultVal="1000" :min="300" :max="2000" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="height" attr="style.layout.height" type="number" defaultVal="300" :min="100" :max="2000" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="cells" :level="3" title="style.layout.cells">
            <BaseAttr name="height" attr="style.layout.cells.height" type="number" defaultVal="36" :min="16" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="spacing" attr="style.layout.cells.spacing" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="colors" :level="4" title="style.layout.cells.colors">
              <BaseAttr name="hot" attr="style.layout.cells.colors.hot" type="color" defaultVal="#DC3912" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="cold" attr="style.layout.cells.colors.cold" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="selected" :level="4" title="style.layout.cells.selected">
              <BaseAttr name="border" attr="style.layout.cells.selected.border" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.layout.cells.selected.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="value" :level="4" title="style.layout.cells.value">
              <BaseAttr name="show" attr="style.layout.cells.value.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.layout.cells.value.fontSize" type="number" defaultVal="18" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.layout.cells.value.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="roundingValue" attr="style.layout.cells.value.roundingValue" type="number" defaulVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.layout.cells.value.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <div class="flex flex-row gap-2 place-items-center">
                  <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                  <div class="min-w-[200px]">
                      <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                          Go to page
                      </BaseTabLink>
                  </div>
              </div>
            </BaseDetails>
            <BaseDetails attr="rowTotal" :level="4" title="style.layout.cells.rowTotal">
              <BaseDetails attr="value" :level="5" title="style.layout.cells.rowTotal.value">
                <BaseAttr name="show" attr="style.layout.cells.rowTotal.value.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              </BaseDetails>
              <BaseDetails attr="color" :level="5" title="style.layout.cells.rowTotal.color">
                <BaseAttr name="show" attr="style.layout.cells.rowTotal.color.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="columnTotal" :level="4" title="style.layout.cells.columnTotal">
              <BaseDetails attr="value" :level="5" title="style.layout.cells.columnTotal.value">
                <BaseAttr name="show" attr="style.layout.cells.columnTotal.value.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetX" attr="style.layout.cells.columnTotal.value.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="offsetY" attr="style.layout.cells.columnTotal.value.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="rotation" attr="style.layout.cells.columnTotal.value.rotation" type="number" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="autoRotate" :level="5" title="style.layout.cells.columnTotal.value.autoRotate">
                  <BaseAttr name="enable" attr="style.layout.cells.columnTotal.value.autoRotate.enable" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="angle" attr="style.layout.cells.columnTotal.value.autoRotate.angle" type="number" defaultVal="-30" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
              </BaseDetails>
              <BaseDetails attr="color" :level="5" title="style.layout.cells.columnTotal.color">
                <BaseAttr name="show" attr="style.layout.cells.columnTotal.color.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              </BaseDetails>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="dataLabels" :level="3" title="style.layout.dataLabels">
            <BaseAttr name="prefix" attr="style.layout.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="suffix" attr="style.layout.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="xAxis" :level="4" title="style.layout.dataLabels.xAxis">
              <BaseAttr name="show" attr="style.layout.dataLabels.xAxis.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <span>values: [],</span>
              <BaseDetails attr="datetimeFormatter" :level="5" title="style.layout.dataLabels.xAxis.datetimeFormatter">
                  <BaseAttr name="enable" attr="style.layout.dataLabels.xAxis.datetimeFormatter.enable" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="locale" attr="style.layout.dataLabels.xAxis.datetimeFormatter.locale" type="select" defaultVal="en" :options="store.locales" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="useUTC" attr="style.layout.dataLabels.xAxis.datetimeFormatter.useUTC" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseAttr name="januaryAsYear" attr="style.layout.dataLabels.xAxis.datetimeFormatter.januaryAsYear" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  <BaseDetails attr="options" :level="6" title="style.layout.dataLabels.xAxis.datetimeFormatter.options">
                      <BaseAttr name="year" attr="style.layout.dataLabels.xAxis.datetimeFormatter.options.year" type="text" defaultVal="yyyy" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                      <BaseAttr name="month" attr="style.layout.dataLabels.xAxis.datetimeFormatter.options.month" type="text" :defaultVal="`MMM 'yy`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                      <BaseAttr name="day" attr="style.layout.dataLabels.xAxis.datetimeFormatter.options.day" type="text" :defaultVal="`dd MMM`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                      <BaseAttr name="minute" attr="style.layout.dataLabels.xAxis.datetimeFormatter.options.minute" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                      <BaseAttr name="second" attr="style.layout.dataLabels.xAxis.datetimeFormatter.options.second" type="text" :defaultVal="`HH:mm:ss`" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                  </BaseDetails>
              </BaseDetails>
              <BaseAttr name="fontSize" attr="style.layout.dataLabels.xAxis.fontSize" type="number" defaultVal="8" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.layout.dataLabels.xAxis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.layout.dataLabels.xAxis.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetX" attr="style.layout.dataLabels.xAxis.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetY" attr="style.layout.dataLabels.xAxis.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="showOnlyAtModulo" attr="style.layout.dataLabels.xAxis.showOnlyAtModulo" type="number" defaultVal="null" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="rotation" attr="style.layout.dataLabels.xAxis.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseDetails attr="autoRotate" :level="5" title="style.layout.dataLabels.xAxis.autoRotate">
                <BaseAttr name="enable" attr="style.layout.dataLabels.xAxis.autoRotate.enable" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="angle" attr="style.layout.dataLabels.xAxis.autoRotate.angle" type="number" defaultVal="-30" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="yAxis" :level="4" title="style.layout.dataLabels.yAxis">
              <BaseAttr name="show" attr="style.layout.dataLabels.yAxis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <span>values: [],</span>
              <BaseAttr name="fontSize" attr="style.layout.dataLabels.yAxis.fontSize" type="number" defaultVal="8" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.layout.dataLabels.yAxis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.layout.dataLabels.yAxis.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetX" attr="style.layout.dataLabels.yAxis.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetY" attr="style.layout.dataLabels.yAxis.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="padding" :level="3" title="style.layout.padding">
            <BaseAttr name="top" attr="style.layout.padding.top" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="right" attr="style.layout.padding.right" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bottom" attr="style.layout.padding.bottom" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="left" attr="style.layout.padding.left" type="number" defaultVal="48" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="legend" :level="2" title="style.legend">
          <BaseAttr name="show" attr="style.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="width" attr="style.legend.width" type="number" defaultVal="24" :min="12" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="backgroundColor" attr="style.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.legend.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.legend.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="roundingValue" attr="style.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>          
        </BaseDetails>
        <BaseDetails attr="title" :level="2" title="style.title">
          <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="paddingLeft" attr="style.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="paddingRight" attr="style.title.paddingRight" type="number" defaultVal="0" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
            <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
          <BaseAttr name="show" attr="style.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="backgroundColor" attr="style.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.tooltip.color" type="color" defaultVal="#2C353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="roundingValue" attr="style.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <div class="flex flex-row gap-2 place-items-center">
              <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
              <div class="min-w-[200px]">
                  <BaseTabLink :action="() => setActiveTab(4)" icon="tooltip">
                      Check out 'Custom tooltip' tab
                  </BaseTabLink>
              </div>
          </div>
          <BaseAttr name="borderRadius" attr="style.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="borderColor" attr="style.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="borderWidth" attr="style.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="position" attr="style.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>          
          <BaseAttr name="offsetY" attr="style.tooltip.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smooth" attr="style.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smoothForce" attr="style.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smoothSnapThreshold" attr="style.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="table" :level="1">
        <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
        <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="colNames" :level="2" title="table.colNames">
          <BaseAttr name="xAxis" attr="table.colNames.xAxis" type="text" defaultVal="X" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
        <BaseDetails attr="th" :level="2" title="table.th">
          <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
        <BaseDetails attr="td" :level="2" title="table.td">
          <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="userOptions" :level="1">
        <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
            <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
        <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
            <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        </BaseDetails>
        <BaseDetails attr="callbacks" :level="2" title="userOptions.callbacks">
            <BaseTabLink :action="() => setActiveTab(11)" icon="lambda">
                Check out 'callbacks' tab
            </BaseTabLink>
        </BaseDetails>
        <BaseDetails attr="print" :level="2" title="userOptions.print">
          <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
          <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
          <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>

            </template>
            <template #tab2>
              @selectDatapoint<br><br>

              {{ translations.docs.emits.selectDatapoint[store.lang] }}
              <ExposedMethods
                component="VueUiHeatmap"
                getImage
                :names="[
                  'generatePdf',
                  'generateCsv',
                  'generateImage',
                  'generateSvg',
                  'toggleTable'
                ]"
              />
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiHeatmap"
                    :types="[
                        'svg',
                        'tooltip-before',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions'
                    ]" 
                />
            </template>
            <template #tab4>
                <h3 class="mb-4">{{ translations.customFormat[store.lang] }}</h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]">config.style.tooltip.customFormat</code>
                <CodeParser
                    class="mt-4"
                    language="javascript"
                    :content="customFormatCode"
                />

                <h3 class="my-4">{{ translations.customFormatCss[store.lang] }}</h3>
                <CodeParser
                    language="css"
                    content=".vue-data-ui-custom-tooltip{ }"
                />
            </template>

            <template #tab6>
              <ThemesVueUiHeatmap />
            </template>

            <template #tab7>
              <ResponsiveUnit height="200px">
                <template #chart>
                  <VueUiHeatmap 
                    :dataset="dataset"
                    :config="isDarkMode ? {
                      ...mutableConfigDarkMode,
                      responsive: true,
                    } : {
                      ...mutableConfig,
                      responsive: true
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
                      'svg'
                  ]"
              />
          </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-heatmap rect {
  transition: all 0.2s ease-in-out !important;
}
</style>