<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiGalaxy from "../themes/ThemesVueUiGalaxy.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
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
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

watch(
  () => store.isDarkMode,
  (val) => {
    nextTick(() => {
      key.value += 1;
    });
  }
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

const config = ref({
  debug: false,
  loading: false,
  responsive: false,
  useCssAnimation: true,
  useBlurOnHover: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      layout: {
        arcs: {
          strokeWidth: 24,
          borderWidth: 12,
          offsetX: 0,
          offsetY: 0,
          hoverEffect: {
            show: true,
            multiplicator: 1.1
          },
          gradient: {
            show: true,
            intensity: 20,
            color: "#FFFFFF"
          }
        },
        labels: {
          dataLabels: {
            prefix: "",
            suffix: ""
          }
        }
      },
      legend: {
        backgroundColor: "#F3F4F6",
        color: "#2D353C",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
        showValue: true,
        showPercentage: true,
        position: 'bottom'
      },
      title: {
        text: "Title",
        color: "#2D353C",
        fontSize: 20,
        bold: true,
        textAlign: 'center',
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
        show: true,
        color: "#2D353C",
        backgroundColor: "#FFFFFF",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
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
      backgroundColor: "#f3f4f6",
      color: "#2D353C",
      outline: "none",
    },
    td: {
      backgroundColor: "#f3f4f6",
      color: "#2D353C",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
    },
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
});

const darkModeConfig = ref({
  debug: false,
  loading: false,
  responsive: false,
  useCssAnimation: true,
  useBlurOnHover: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      layout: {
        arcs: {
          strokeWidth: 24,
          borderWidth: 12,
          offsetX: 0,
          offsetY: 0,
          hoverEffect: {
            show: true,
            multiplicator: 1.1
          },
          gradient: {
            show: true,
            intensity: 20,
            color: "#FFFFFF80"
          }
        },
        labels: {
          dataLabels: {
            prefix: "",
            suffix: ""
          }
        }
      },
      legend: {
        backgroundColor: "#2A2A2A",
        color: "#CCCCCC",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
        showValue: true,
        showPercentage: true,
        position: 'bottom'
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
          bold: false,
        },
      },
      tooltip: {
        show: true,
        color: "#CCCCCC",
        backgroundColor: "#1A1A1A",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
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
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      outline: "none",
    },
    td: {
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
    },
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
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(
  JSON.parse(JSON.stringify(darkModeConfig.value))
);
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
function resetDefault() {
  mutableConfig.value = JSON.parse(JSON.stringify(config.value));
  mutableConfigDarkMode.value = JSON.parse(
    JSON.stringify(darkModeConfig.value)
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

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
  return `type VueUiGalaxyDatasetItem = {
  name: string
  values: number[]
  color?: string
}`
})

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
];`)

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
    <BaseDocTitle name="VueUiGalaxy" />

    <BaseDocDescription :text="translations.docs.tooltips.galaxy[store.lang]" />

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
          @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
      >
        <BaseCard>
          <VueDataUi
            component="VueUiGalaxy"
            :dataset="mutableDataset"
            :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
            :key="key"
          />
        </BaseCard>
      </DocSnapper>
    </div>

    <Rater itemId="vue_ui_galaxy" />

    <BaseMigrationInfo
        cssAnimation
        debug
    />

    <Box ref="box" showResponsive showEmits showSlots showCallbacks showTooltip showThemes schema="vue_ui_galaxy" signInfo="positiveOrNegativeOnly">
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
        <div class="flex gap-2">
          <button
            @click="resetDefault"
            class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all"
          >
            {{ translations.docs.reset[store.lang] }}
          </button>
          <button
            @click="
              copyToClipboard(
                isDarkMode ? mutableConfigDarkMode : mutableConfig
              )
            "
            class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"
          >
            <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
          </button>
        </div>
        <div class="mt-4">
          TS type: <code class="text-app-blue">VueUiGalaxyConfig</code>
        </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiGalaxyConfig" equal>
    <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
    <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
    <BaseAttr name="useBlurOnHover" attr="useBlurOnHover" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseDetails attr="events" :level="1">
        <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
        <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
    </BaseDetails>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
        <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <BaseDetails attr="arcs" :level="4" title="style.chart.layout.arcs">
            <BaseAttr name="strokeWidth" attr="style.chart.layout.arcs.strokeWidth" type="number" defaultVal="24" :min="1" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="borderWidth" attr="style.chart.layout.arcs.borderWidth" type="number" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="offsetX" attr="style.chart.layout.arcs.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="offsetY" attr="style.chart.layout.arcs.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="gradient" :level="5" title="style.chart.layout.arcs.gradient">
              <BaseAttr name="show" attr="style.chart.layout.arcs.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="intensity" attr="style.chart.layout.arcs.gradient.intensity" type="range" defaultVal="30" :min="20" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.chart.layout.arcs.gradient.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="hoverEffect" :level="5" title="style.chart.layout.arcs.hoverEffect">
              <BaseAttr name="show" attr="style.chart.layout.arcs.hoverEffect.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="multiplicator" attr="style.chart.layout.arcs.hoverEffect.multiplicator" type="number" defaultVal="1.1" :min="0.5" :max="1.4" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">
            <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.labels.dataLabels">
              <BaseAttr name="prefix" attr="style.chart.layout.labels.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="suffix" attr="style.chart.layout.labels.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <div class="flex flex-row gap-2 place-items-center">
                  <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                  <div class="min-w-[200px]">
                      <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                          Go to page
                      </BaseTabLink>
                  </div>
              </div>
            </BaseDetails>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="legend" :level="3" title="style.chart.legend">
          <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="roundingValue" attr="style.chart.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="roundingPercentage" attr="style.chart.legend.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="showValue" attr="style.chart.legend.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="showPercentage" attr="style.chart.legend.showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="position" attr="style.chart.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
        </BaseDetails>
        <BaseDetails attr="title" :level="3" title="style.chart.title">
          <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
            <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
          <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="showValue" attr="style.chart.tooltip.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="showPercentage" attr="style.chart.tooltip.showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="roundingValue" attr="style.chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="roundingPercentage" attr="style.chart.tooltip.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <div class="flex flex-row gap-2 place-items-center">
              <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
              <div class="min-w-[200px]">
                  <BaseTabLink :action="() => setActiveTab(4)" icon="tooltip">
                      Check out 'Custom tooltip' tab
                  </BaseTabLink>
              </div>
          </div>
          <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smooth" attr="style.chart.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smoothForce" attr="style.chart.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smoothSnapThreshold" attr="style.chart.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
      <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
        <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
        <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
        <BaseAttr name="percentage" attr="table.columnNames.percentage" type="text" defaultVal="Percentage" :light="mutableConfig" :dark="mutableConfigDarkMode"  @change="forceChartUpdate()"/>
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
        <BaseAttr name="roundingPercentage" attr="table.td.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiGalaxy
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiGalaxyDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            name: string;
            value: number;
            color: string;
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
                <ExposedMethods
                  component="VueUiGalaxy"
                  getImage
                  showHideSeries
                  :names="[
                    'generatePdf',
                    'generateCsv',
                    'generateImage',
                    'generateSvg',
                    'toggleTable'
                  ]"
                />
              </div>

      </template>

      <template #tab3>
        <BaseSlotDocumenter
            componentName="VueUiGalaxy"
            :types="[
                'svg',
                'legend',
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
                <code class="text-gray-500 dark:text-[#8A8A8A]">config.style.chart.tooltip.customFormat</code>
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
        <ThemesVueUiGalaxy />
      </template>

      <template #tab7>
          <ResponsiveUnit height="500px" minHeight="300px">
              <template #chart>
                  <VueDataUi 
                      component="VueUiGalaxy" 
                      :dataset="dataset" 
                      :config="
                          isDarkMode 
                              ? {
                                  ...mutableConfigDarkMode,
                                  responsive: true
                              }
                              : {
                                  ...mutableConfig,
                                  responsive: true
                              }
                          " 
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
