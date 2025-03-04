<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucXyCanvas from "../../components/useCases/ux-xy-canvas.vue";
import ThemesVueUiXyCanvas from "../themes/ThemesVueUiXyCanvas.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
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
    name: "Series 1",
    series: [
      -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21,
      34, 55,
    ],
    type: "bar",
    color: "rgb(95,139,238)",
    scaleSteps: 5,
    dataLabels: false
  },
  {
    name: "Series 2",
    series: [
      55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21,
      -34, -55,
    ],
    type: "line",
    color: "rgb(66,211,146)",
    useArea: true,
    dataLabels: false,
    scaleSteps: 5,
  },
  {
    name: "Series 3",
    series: [
      64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30,
      42, 52, 60, 64,
    ],
    type: "plot",
    color: "rgb(255,100,0)",
    scaleSteps: 5,
  },
]);

const config = ref({
  responsive: false,
  theme: "",
  customPalette: [],
  downsample: {
    threshold: 10000,
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: "right",
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      labels: true,
      stack: true,
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
      labels: "Toggle labels",
      fullscreen: "Toggle fullscreen",
      stack: "Toggle stack mode",
      annotator: "Toggle annotator",
    },
  },
  style: {
    fontFamily: "Arial",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      aspectRatio: "14 / 9",
      stacked: false,
      stackGap: 20,
      scale: {
        ticks: 10,
        min: null,
        max: null,
      },
      zoom: {
        show: true,
        color: "#CCCCCC",
        highlightColor: "#4A4A4A",
        fontSize: 14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null,
        enableRangeHandles: true,
        enableSelectionDrag: true
      },
      selector: {
        show: true,
        color: "#2D353C",
        dashed: true,
        showHorizontalSelector: false,
      },
      tooltip: {
        show: true,
        color: "#2D353C",
        backgroundColor: "#F3F4F6",
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor: "#e1e5e8",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
      },
      legend: {
        backgroundColor: "#F3F4F6",
        color: "#2D353C",
        show: true,
        fontSize: 16,
        bold: false,
      },
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
      grid: {
        y: {
          showAxis: true,
          axisColor: "#2D353C",
          axisThickness: 2,
          axisName: "",
          axisLabels: {
            show: true,
            fontSizeRatio: 1,
            color: "#2D353C",
            offsetX: 0,
            rounding: 1,
            prefix: "",
            suffix: "",
            bold: false,
          },
          verticalLines: {
            show: true,
            color: "#CCCCCC",
            hideUnderXLength: 20,
            position: 'middle'
          },
          timeLabels: {
            show: true,
            fontSizeRatio: 0.8,
            values: [],
            rotation: 0,
            offsetY: 30,
            color: "#2D353C",
            modulo: 12,
            bold: false,
          },
        },
        x: {
          showAxis: true,
          axisColor: "#2D353C",
          axisThickness: 2,
          axisName: "",
          horizontalLines: {
            show: true,
            color: "#CCCCCC",
            alternate: true,
            opacity: 20,
          },
        },
        zeroLine: {
          show: true,
          color: "#2D353C",
          dashed: true,
        },
      },
      line: {
        plots: {
          show: true,
          radiusRatio: 1,
        },
      },
      bar: {
        gradient: {
          show: true
        },
      },
      area: {
        opacity: 60,
      },
      dataLabels: {
        show: true,
        fontSizeRatio: 1,
        useSerieColor: true,
        color: "#2D353C",
        offsetY: -12,
        bold: false,
      },
      paddingProportions: {
        top: 0.1,
        left: 0.1,
        right: 0.05,
        bottom: 0.1,
      },
    },
  },
  table: {
    show: false,
    rounding: 1,
    responsiveBreakpoint: 400,
    columnNames: {
      period: "Period",
      total: "Total",
    },
    th: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      outline: "none",
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      outline: "none",
    },
  },
});

const darkModeConfig = ref({
  responsive: false,
  theme: "",
  downsample: {
    threshold: 10000,
  },
  customPalette: [],
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: "right",
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      labels: true,
      stack: true,
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
      labels: "Toggle labels",
      fullscreen: "Toggle fullscreen",
      stack: "Toggle stack mode",
      annotator: "Toggle annotator",
    },
  },
  style: {
    fontFamily: "Satoshi",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      aspectRatio: "14 / 9",
      stacked: false,
      stackGap: 20,
      scale: {
        ticks: 10,
        min: null,
        max: null,
      },
      zoom: {
        show: true,
        color: "#6A6A6A",
        highlightColor: "#4A4A4A",
        fontSize: 14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null,
        enableRangeHandles: true,
        enableSelectionDrag: true
      },
      selector: {
        show: true,
        color: "#6A6A6A",
        dashed: true,
        showHorizontalSelector: false,
      },
      tooltip: {
        show: true,
        color: "#CCCCCC",
        backgroundColor: "#1A1A1A",
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor: "#8A8A8A",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
      },
      legend: {
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        show: true,
        fontSize: 16,
        bold: false,
      },
      title: {
        text: "Title",
        color: "#FAFAFA",
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
      grid: {
        y: {
          showAxis: true,
          axisColor: "#6A6A6A",
          axisThickness: 2,
          axisName: "Y Axis",
          axisLabels: {
            show: true,
            fontSizeRatio: 1,
            color: "#6A6A6A",
            offsetX: 0,
            rounding: 1,
            prefix: "",
            suffix: "",
            bold: false
          },
          verticalLines: {
            show: true,
            color: "#4A4A4A",
            hideUnderXLength: 20,
            position: 'middle'
          },
          timeLabels: {
            show: true,
            fontSizeRatio: 0.8,
            values: [],
            rotation: 0,
            offsetY: 30,
            color: "#6A6A6A",
            modulo: 12,
            bold: false
          },
        },
        x: {
          showAxis: true,
          axisColor: "#4A4A4A",
          axisThickness: 2,
          axisName: "X Axis",
          horizontalLines: {
            show: true,
            color: "#3A3A3A",
            alternate: true,
            opacity: 20,
          },
        },
        zeroLine: {
          show: true,
          color: "#6A6A6A",
          dashed: true,
        },
      },
      line: {
        plots: {
          show: true,
          radiusRatio: 1,
        },
      },
      bar: {
        gradient: {
          show: true
        },
      },
      area: {
        opacity: 60,
      },
      dataLabels: {
        show: true,
        fontSizeRatio: 1,
        useSerieColor: true,
        color: "#CCCCCC",
        offsetY: -12,
        bold: false
      },
      paddingProportions: {
        top: 0.1,
        left: 0.1,
        right: 0.05,
        bottom: 0.1,
      },
    },
  },
  table: {
    show: false,
    rounding: 1,
    responsiveBreakpoint: 400,
    columnNames: {
      period: "Period",
      total: "Total",
    },
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
    },
  },
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(
  JSON.parse(JSON.stringify(darkModeConfig.value))
);

function resetDefault() {
  mutableConfig.value = JSON.parse(JSON.stringify(config.value));
  mutableConfigDarkMode.value = JSON.parse(
    JSON.stringify(darkModeConfig.value)
  );
  forceChartUpdate();
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

function randomizeData() {
  function makeSet(n, m) {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
      arr.push(Math.random() * m);
    }
    return arr;
  }

  dataset.value[0].series = makeSet(21, 100);
  dataset.value[1].series = makeSet(21, 90);
  dataset.value[2].series = makeSet(21, 80);
  key.value += 1;
}
</script>

<template>
  <div>
    <BaseDocTitle name="VueUiXyCanvas" />

    <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
      {{ translations.docs.tooltips.xyCanvas[store.lang] }}
    </p>

    <BaseDocHeaderActions targetLink="vue-ui-xy-canvas" :configSource="mainConfig.vue_ui_xy_canvas" />

    <div :class="`transition-all mx-auto w-2/3`">
      <DocSnapper
        :isFixed="isFixed"
        :disabled="!isFixed || isMobile"
        @fixChart="fixChart"
        @resetDefault="resetDefault"
        @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
      >
        <VueDataUi component="VueUiXyCanvas" :dataset="dataset" :config="isDarkMode
            ? {
              ...mutableConfigDarkMode,
              style: {
                ...mutableConfigDarkMode.style,
                fontFamily: 'Satoshi',
              },
            }
            : {
              ...mutableConfig,
              style: {
                ...mutableConfig.style,
                fontFamily: 'Satoshi',
              },
            }
          " :key="key" 
        />
      </DocSnapper>

      <BaseRandomButton @click="randomizeData" />

      <Rater itemId="vue_ui_xy_canvas" />
    </div>

    <Box showEmits showSlots showUseCases showThemes showTooltip showResponsive schema="vue_ui_xy_canvas"
      signInfo="both">
      <template #tab0>
        {{ translations.docs.datastructure[store.lang] }}
        <div>
          TS type:
          <code class="text-app-green">VueUiXyCanvasDatasetItem[]</code>
        </div>
        <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
          <pre>
<code>
    [
        {
            name: string;
            series: number[];
            type?: "line" | "bar" | "plot";
            useArea?: boolean;
            dataLabels?: boolean;
            scaleSteps?: number;
            prefix?: string;
            suffix?: string;
            rounding?: number;
            autoScaling?: boolean;
            stackRatio?: number; // if used on all datapoints, must sum up to 1
            scaleMin?: number; // applied in stack mode
            scaleMax?: number; // applied in stack mode
            showYMarker?: boolean; // if true, will show a marker on Y axis with the value at hovered index
        },
        {...}
    ]
</code>
</pre>
        </div>

        {{ translations.docs.example[store.lang] }} :
        <div class="w-full overflow-x-auto">
          <pre class="break-words">
<code class="break-words">
const <span class="text-black dark:text-app-green">dataset: VueUiXyCanvasDatasetItem[]</span> = [
    {
        name: "Series 1",
        series: [-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)",
        scaleSteps: 5,
        dataLabels: false
    },
    {
        name: "Series 2",
        series: [55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)",
        useArea: true,
        dataLabels: false,
        scaleSteps: 5,
    },
    {
        name: "Series 3",
        series: [64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)",
        scaleSteps: 5,
    },  
]
</code>
</pre>
        </div>
      </template>

      <template #tab1>
        <div class="w-full overflow-x-auto">
          <div class="flex gap-2">
            <button @click="resetDefault"
              class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">
              {{ translations.docs.reset[store.lang] }}
            </button>
            <button @click="
        copyToClipboard(
          isDarkMode ? mutableConfigDarkMode : mutableConfig
        )
        "
              class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
              <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
            </button>
          </div>

          <div class="mt-6">
            TS type: <code class="text-app-blue">VueUiXyCanvasConfig</code>
          </div>

          <div class="my-4">
            Toggle tree view: <input type="checkbox" v-model="showAllConfig" />
          </div>

          <code ref="configCode">
            <BaseDetails attr="const config: VueUiXyCanvasConfig" equal>
              <span>theme: "", ("celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")</span>
              <span
                >customPalette: [];
                <span class="text-app-blue text-xs">// string[]</span></span
              >
              <span
                >responsive: false;
                <span class="text-app-blue break-keep text-xs"
                  >// {{ translations.responsive[store.lang] }}</span
                ></span
              >
              <BaseDetails attr="downsample" :level="1">
                <BaseAttr
                  name="threshold"
                  attr="downsample.threshold"
                  type="number"
                  defaultVal="10000"
                  :min="100"
                  :max="20000"
                  :light="mutableConfig"
                  :dark="mutableConfigDarkMode"
                  comment="Threshold above which LTTB algorithm kicks in"
                />
              </BaseDetails>
              <BaseDetails attr="style" :level="1">
                <span>fontFamily: "Arial",</span>
                <BaseDetails attr="chart" :level="2" title="style.chart">
                  <BaseAttr
                    name="backgroundColor"
                    attr="style.chart.backgroundColor"
                    type="color"
                    defaultVal="#FFFFFF"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="color"
                    attr="style.chart.color"
                    type="color"
                    defaultVal="#2D353C"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="aspectRatio"
                    attr="style.chart.aspectRatio"
                    type="text"
                    defaultVal="14 / 9"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="stacked"
                    attr="style.chart.stacked"
                    type="checkbox"
                    defaultVal="false"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="stackGap"
                    attr="style.chart.stackGap"
                    type="range"
                    defaultVal="20"
                    :min="0"
                    :max="48"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                    comment="Use with stacked: true"
                  />
                  <BaseDetails attr="area" :level="3" title="style.chart.area">
                    <BaseAttr
                      name="opacity"
                      attr="style.chart.area.opacity"
                      type="range"
                      defaultVal="60"
                      :min="0"
                      :max="100"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                  </BaseDetails>
                  <BaseDetails
                    attr="dataLabels"
                    :level="3"
                    title="style.chart.dataLabels"
                  >
                    <BaseAttr
                      name="show"
                      attr="style.chart.dataLabels.show"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="bold"
                      attr="style.chart.dataLabels.bold"
                      type="checkbox"
                      defaultVal="false"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="fontSizeRatio"
                      attr="style.chart.dataLabels.fontSizeRatio"
                      type="range"
                      defaultVal="1"
                      :min="0.5"
                      :max="2"
                      :step="0.01"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="useSerieColor"
                      attr="style.chart.dataLabels.useSerieColor"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="color"
                      attr="style.chart.dataLabels.color"
                      type="color"
                      defaultVal="#2D353C"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="offsetY"
                      attr="style.chart.dataLabels.offsetY"
                      type="number"
                      defaultVal="-12"
                      :min="-100"
                      :max="100"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <span
                      >formatter: null,
                      <BaseComment>{{
        translations.formatterLink[store.lang]
      }}</BaseComment></span
                    >
                  </BaseDetails>
                  <BaseDetails attr="grid" :level="3" title="style.chart.grid">
                    <BaseDetails attr="x" :level="4" title="style.chart.grid.x">
                      <BaseAttr
                        name="showAxis"
                        attr="style.chart.grid.x.showAxis"
                        type="checkbox"
                        defaultVal="true"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="axisColor"
                        attr="style.chart.grid.x.axisColor"
                        type="color"
                        defaultVal="#2D353C"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="axisThickness"
                        attr="style.chart.grid.x.axisThickness"
                        type="number"
                        defaultVal="2"
                        :min="0"
                        :max="24"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="axisName"
                        attr="style.chart.grid.x.axisName"
                        type="text"
                        defaultVal="''"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseDetails
                        attr="horizontalLines"
                        :level="5"
                        title="style.chart.grid.x.horizontalLines"
                      >
                        <BaseAttr
                          name="show"
                          attr="style.chart.grid.x.horizontalLines.show"
                          type="checkbox"
                          defaultVal="true"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="color"
                          attr="style.chart.grid.x.horizontalLines.color"
                          type="color"
                          defaultVal="#CCCCCC"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="alternate"
                          attr="style.chart.grid.x.horizontalLines.alternate"
                          type="checkbox"
                          defaultVal="true"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="opacity"
                          attr="style.chart.grid.x.horizontalLines.opacity"
                          type="range"
                          defaultVal="20"
                          :min="0"
                          :max="100"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                      </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="y" :level="4" title="style.chart.grid.y">
                      <BaseAttr
                        name="showAxis"
                        attr="style.chart.grid.y.showAxis"
                        type="checkbox"
                        defaultVal="true"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="axisColor"
                        attr="style.chart.grid.y.axisColor"
                        type="color"
                        defaultVal="#2D353C"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="axisThickness"
                        attr="style.chart.grid.y.axisThickness"
                        type="number"
                        defaultVal="2"
                        :min="0"
                        :max="24"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="axisName"
                        attr="style.chart.grid.y.axisName"
                        type="text"
                        defaultVal="''"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseDetails
                        attr="axisLabels"
                        :level="5"
                        title="style.chart.grid.y.axisLabels"
                      >
                        <BaseAttr
                          name="show"
                          attr="style.chart.grid.y.axisLabels.show"
                          type="checkbox"
                          defaultVal="true"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="bold"
                          attr="style.chart.grid.y.axisLabels.bold"
                          type="checkbox"
                          defaultVal="false"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                          name="fontSizeRatio"
                          attr="style.chart.grid.y.axisLabels.fontSizeRatio"
                          type="range"
                          defaultVal="1"
                          :min="0.5"
                          :max="2"
                          :step="0.01"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="color"
                          attr="style.chart.grid.y.axisLabels.color"
                          type="color"
                          defaultVal="#2D353C"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="offsetX"
                          attr="style.chart.grid.y.axisLabels.offsetX"
                          type="number"
                          defaultVal="0"
                          :min="-100"
                          :max="100"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="rounding"
                          attr="style.chart.grid.y.axisLabels.rounding"
                          type="number"
                          defaultVal="0"
                          :min="0"
                          :max="6"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="prefix"
                          attr="style.chart.grid.y.axisLabels.prefix"
                          type="text"
                          defaultVal="''"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="suffix"
                          attr="style.chart.grid.y.axisLabels.suffix"
                          type="text"
                          defaultVal="''"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                      </BaseDetails>
                      <BaseDetails
                        attr="timeLabels"
                        :level="5"
                        title="style.chart.grid.y.timeLabels"
                      >
                        <span
                          >values: [],
                          <span class="text-app-blue text-xs"
                            >// Example: ["JAN", "FEB", "MAR"...] or
                            ["01/01/24", "01/02/24",...]</span
                          ></span
                        >
                        <BaseAttr
                          name="show"
                          attr="style.chart.grid.y.timeLabels.show"
                          type="checkbox"
                          defaultVal="true"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="bold"
                          attr="style.chart.grid.y.timeLabels.bold"
                          type="checkbox"
                          defaultVal="true"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                          name="fontSizeRatio"
                          attr="style.chart.grid.y.timeLabels.fontSizeRatio"
                          type="range"
                          defaultVal="0.8"
                          :min="0.5"
                          :max="2"
                          :step="0.01"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="rotation"
                          attr="style.chart.grid.y.timeLabels.rotation"
                          type="range"
                          defaultVal="0"
                          :min="-90"
                          :max="90"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="offsetY"
                          attr="style.chart.grid.y.timeLabels.offsetY"
                          type="number"
                          defaultVal="30"
                          :min="-100"
                          :max="100"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="color"
                          attr="style.chart.grid.y.timeLabels.color"
                          type="color"
                          defaultVal="#2D353C"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="modulo"
                          attr="style.chart.grid.y.timeLabels.modulo"
                          type="number"
                          defaultVal="12"
                          :min="2"
                          :max="365"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                      </BaseDetails>
                      <BaseDetails
                        attr="verticalLines"
                        :level="5"
                        title="style.chart.grid.y.verticalLines"
                      >
                        <BaseAttr
                          name="show"
                          attr="style.chart.grid.y.verticalLines.show"
                          type="checkbox"
                          defaultVal="true"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="color"
                          attr="style.chart.grid.y.verticalLines.color"
                          type="color"
                          defaultVal="#CCCCCC"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr
                          name="hideUnderXLength"
                          attr="style.chart.grid.y.verticalLines.hideUnderXLength"
                          type="number"
                          defaultVal="20"
                          :min="0"
                          :max="42"
                          :light="mutableConfig"
                          :dark="mutableConfigDarkMode"
                          @change="forceChartUpdate()"
                        />
                        <BaseAttr name="position" attr="style.chart.grid.y.verticalLines.position" type="select" :options="['start', 'middle']" defaultVal="middle"  :light="mutableConfig" :dark="mutableConfigDarkMode" />
                      </BaseDetails>
                    </BaseDetails>
                    <BaseDetails
                      attr="zeroLine"
                      :level="4"
                      title="style.chart.grid.zeroLine"
                    >
                      <BaseAttr
                        name="show"
                        attr="style.chart.grid.zeroLine.show"
                        type="checkbox"
                        defaultVal="true"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="dashed"
                        attr="style.chart.grid.zeroLine.dashed"
                        type="checkbox"
                        defaultVal="true"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="color"
                        attr="style.chart.grid.zeroLine.color"
                        type="color"
                        defaultVal="#2D353C"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                    </BaseDetails>
                  </BaseDetails>
                  <BaseDetails
                    attr="legend"
                    :level="3"
                    title="style.chart.legend"
                  >
                    <BaseAttr
                      name="show"
                      attr="style.chart.legend.show"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="backgroundColor"
                      attr="style.chart.legend.backgroundColor"
                      type="color"
                      defaultVal="#FFFFFF"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="color"
                      attr="style.chart.legend.color"
                      type="color"
                      defaultVal="#2D353C"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="fontSize"
                      attr="style.chart.legend.fontSize"
                      type="number"
                      defaultVal="14"
                      :min="8"
                      :max="42"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="bold"
                      attr="style.chart.legend.bold"
                      type="checkbox"
                      defaultVal="false"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                  </BaseDetails>
                  <BaseDetails attr="line" :level="3" title="style.chart.line">
                    <BaseDetails
                      attr="plots"
                      :level="4"
                      title="style.chart.line.plots"
                    >
                      <BaseAttr
                        name="show"
                        attr="style.chart.line.plots.show"
                        type="checkbox"
                        defaultVal="true"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="radiusRatio"
                        attr="style.chart.line.plots.radiusRatio"
                        type="range"
                        defaultVal="1"
                        :min="0"
                        :max="2"
                        :step="0.01"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                    </BaseDetails>
                  </BaseDetails>
                  <BaseDetails attr="bar" :level="3" title="style.chart.bar">
                    <BaseDetails attr="gradient" :level="4" title="style.chart.bar.gradient">
                      <BaseAttr name="show" attr="style.chart.bar.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig"
                      :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                  </BaseDetails>
                  <BaseDetails
                    attr="paddingProportions"
                    :level="3"
                    title="style.chart.paddingProportions"
                  >
                    <BaseAttr
                      name="top"
                      attr="style.chart.paddingProportions.top"
                      type="number"
                      defaultVal="0.1"
                      :min="0"
                      :max="1"
                      :step="0.01"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="right"
                      attr="style.chart.paddingProportions.right"
                      type="number"
                      defaultVal="0.05"
                      :min="0"
                      :max="1"
                      :step="0.01"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="bottom"
                      attr="style.chart.paddingProportions.bottom"
                      type="number"
                      defaultVal="0.1"
                      :min="0"
                      :max="1"
                      :step="0.01"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="left"
                      attr="style.chart.paddingProportions.bottom"
                      type="number"
                      defaultVal="0.1"
                      :min="0"
                      :max="1"
                      :step="0.01"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                  </BaseDetails>
                  <BaseDetails
                    attr="scale"
                    :level="3"
                    title="style.chart.scale"
                  >
                    <BaseAttr
                      name="ticks"
                      attr="style.chart.scale.ticks"
                      type="number"
                      defaultVal="10"
                      :min="2"
                      :max="20"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <span
                      >min: number | null; // default: null, Force min scale
                      (applied when stack mode is false)</span
                    >
                    <span
                      >max: number | null; // default: null, Force max scale
                      (applied when stack mode is false)</span
                    >
                  </BaseDetails>
                  <BaseDetails
                    attr="selector"
                    :level="3"
                    title="style.chart.selector"
                  >
                    <BaseAttr
                      name="show"
                      attr="style.chart.selector.show"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="dashed"
                      attr="style.chart.selector.dashed"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="color"
                      attr="style.chart.selector.color"
                      type="color"
                      defaultVal="#2D353C"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr name="showHorizontalSelector" attr="style.chart.selector.showHorizontalSelector" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                  </BaseDetails>
                  <BaseDetails
                    attr="title"
                    :level="3"
                    title="style.chart.title"
                  >
                    <BaseAttr
                      name="text"
                      attr="style.chart.title.text"
                      type="text"
                      defaultVal="''"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="color"
                      attr="style.chart.title.color"
                      type="color"
                      defaultVal="#2D353C"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
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
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="bold"
                      attr="style.chart.title.bold"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="textAlign"
                      attr="style.chart.title.textAlign"
                      type="select"
                      defaultVal="center"
                      :options="['left', 'center', 'right']"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="paddingLeft"
                      attr="style.chart.title.paddingLeft"
                      type="number"
                      defaultVal="0"
                      :min="0"
                      :max="64"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="paddingRight"
                      attr="style.chart.title.paddingRight"
                      type="number"
                      defaultVal="0"
                      :min="0"
                      :max="64"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
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
                        defaultVal="#A1A1A1"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="text"
                        attr="style.chart.title.subtitle.text"
                        type="text"
                        defaultVal="''"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="fontSize"
                        attr="style.chart.title.subtitle.fontSize"
                        type="number"
                        defaultVal="16"
                        :min="8"
                        :max="42"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                      <BaseAttr
                        name="bold"
                        attr="style.chart.title.subtitle.bold"
                        type="checkbox"
                        defaultVal="false"
                        :light="mutableConfig"
                        :dark="mutableConfigDarkMode"
                        @change="forceChartUpdate()"
                      />
                    </BaseDetails>
                  </BaseDetails>
                  <BaseDetails
                    attr="tooltip"
                    :level="3"
                    title="style.chart.tooltip"
                  >
                    <BaseAttr
                      name="show"
                      attr="style.chart.tooltip.show"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="color"
                      attr="style.chart.tooltip.color"
                      type="color"
                      defaultVal="#2D353C"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="backgroundColor"
                      attr="style.chart.tooltip.backgroundColor"
                      type="color"
                      defaultVal="#FFFFFF"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="fontSize"
                      attr="style.chart.tooltip.fontSize"
                      type="number"
                      defaultVal="14"
                      :min="8"
                      :max="42"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <span
                      >customFormat: null,
                      <span class="text-app-blue break-keep text-xs"
                        >// default behavior. To customize, check out the
                        'custom tooltip' tab</span
                      ></span
                    >
                    <BaseAttr
                      name="borderRadius"
                      attr="style.chart.tooltip.borderRadius"
                      type="number"
                      defaultVal="4"
                      :min="0"
                      :max="24"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="borderColor"
                      attr="style.chart.tooltip.borderColor"
                      type="color"
                      defaultVal="#E1E5E8"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="borderWidth"
                      attr="style.chart.tooltip.borderWidth"
                      type="number"
                      defaultVal="1"
                      :min="0"
                      :max="24"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="backgroundOpacity"
                      attr="style.chart.tooltip.backgroundOpacity"
                      type="range"
                      defaultVal="100"
                      :min="0"
                      :max="100"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="position"
                      attr="style.chart.tooltip.position"
                      type="select"
                      defaultVal="center"
                      :options="['left', 'center', 'right']"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="offsetY"
                      attr="style.chart.tooltip.offsetY"
                      type="number"
                      defaultVal="24"
                      :min="0"
                      :max="64"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                  </BaseDetails>
                  <BaseDetails attr="zoom" :level="3" title="style.chart.zoom">
                    <BaseAttr
                      name="show"
                      attr="style.chart.zoom.show"
                      type="checkbox"
                      defaultVal="true"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="color"
                      attr="style.chart.zoom.color"
                      type="color"
                      defaultVal="#CCCCCC"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="highlightColor"
                      attr="style.chart.zoom.highlightColor"
                      type="color"
                      defaultVal="#4A4A4A"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <BaseAttr
                      name="fontSize"
                      attr="style.chart.zoom.fontSize"
                      type="number"
                      defaultVal="14"
                      :min="8"
                      :max="42"
                      :light="mutableConfig"
                      :dark="mutableConfigDarkMode"
                      @change="forceChartUpdate()"
                    />
                    <span>startIndex: number | null, <BaseComment>Force zoom start index</BaseComment></span>
                    <span>endIndex: number | null, <BaseComment>Force zoom end index</BaseComment></span>
                    <span
                      >useResetSlot: false,
                      <span class="text-app-blue break-keep text-xs"
                        >// To use a custom slot for the reset feature (see
                        slots tab)</span
                      ></span
                    >
                    <BaseAttr name="enableRangeHandles" attr="style.chart.zoom.enableRangeHandles" type="chexkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.3.63"/>
                    <BaseAttr name="enableSelectionDrag" attr="style.chart.zoom.enableSelectionDrag" type="chexkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.3.63"/>
                  </BaseDetails>
                </BaseDetails>
              </BaseDetails>
              <BaseDetails attr="table" :level="1">
                <BaseAttr
                  name="show"
                  attr="table.show"
                  type="checkbox"
                  defaultVal="false"
                  :light="mutableConfig"
                  :dark="mutableConfigDarkMode"
                  @change="forceChartUpdate()"
                />
                <BaseAttr
                  name="rounding"
                  attr="table.rounding"
                  type="number"
                  defaultVal="0"
                  :min="0"
                  :max="6"
                  :light="mutableConfig"
                  :dark="mutableConfigDarkMode"
                  @change="forceChartUpdate()"
                />
                <BaseAttr
                  name="responsiveBreakpoint"
                  attr="table.responsiveBreakpoint"
                  type="number"
                  defaultVal="400"
                  :min="300"
                  :max="800"
                  :step="10"
                  :light="mutableConfig"
                  :dark="mutableConfigDarkMode"
                  @change="forceChartUpdate()"
                />
                <BaseDetails
                  attr="columnNames"
                  :level="2"
                  title="table.columnNames"
                >
                  <BaseAttr
                    name="period"
                    attr="table.columnNames.period"
                    type="text"
                    defaultVal="Period"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="total"
                    attr="table.columnNames.total"
                    type="text"
                    defaultVal="Total"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />>
                </BaseDetails>
                <BaseDetails attr="th" :level="2" title="table.th">
                  <BaseAttr
                    name="backgroundColor"
                    attr="table.th.backgroundColor"
                    type="color"
                    defaultVal="#FAFAFA"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="color"
                    attr="table.th.color"
                    type="color"
                    defaultVal="#2D353C"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="outline"
                    attr="table.th.outline"
                    type="text"
                    defaultVal="none"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                </BaseDetails>
                <BaseDetails attr="td" :level="2" title="table.td">
                  <BaseAttr
                    name="backgroundColor"
                    attr="table.td.backgroundColor"
                    type="color"
                    defaultVal="#FAFAFA"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="color"
                    attr="table.td.color"
                    type="color"
                    defaultVal="#2D353C"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="outline"
                    attr="table.td.outline"
                    type="text"
                    defaultVal="none"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                </BaseDetails>
              </BaseDetails>
              <BaseDetails attr="userOptions" :level="1">
                <BaseAttr
                  name="show"
                  attr="userOptions.show"
                  type="checkbox"
                  defaultVal="true"
                  :light="mutableConfig"
                  :dark="mutableConfigDarkMode"
                  @change="forceChartUpdate()"
                />
                <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr
                  name="position"
                  attr="userOptions.position"
                  type="select"
                  defaultVal="right"
                  :options="['right', 'left']"
                  :light="mutableConfig"
                  :dark="mutableConfigDarkMode"
                />
                <BaseDetails
                  attr="buttons"
                  :level="2"
                  title="userOptions.buttons"
                >
                  <BaseAttr
                    name="tooltip"
                    attr="userOptions.buttons.tooltip"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="pdf"
                    attr="userOptions.buttons.pdf"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="img"
                    attr="userOptions.buttons.img"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="csv"
                    attr="userOptions.buttons.csv"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="table"
                    attr="userOptions.buttons.table"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="labels"
                    attr="userOptions.buttons.labels"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="stack"
                    attr="userOptions.buttons.stack"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="fullscreen"
                    attr="userOptions.buttons.fullscreen"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="annotator"
                    attr="userOptions.buttons.annotator"
                    type="checkbox"
                    defaultVal="true"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                </BaseDetails>
                <BaseDetails
                  attr="buttonTitles"
                  :level="2"
                  title="userOptions.buttonTitles"
                >
                  <BaseAttr
                    name="open"
                    attr="userOptions.buttonTitles.open"
                    type="text"
                    defaultVal="Open options"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="close"
                    attr="userOptions.buttonTitles.close"
                    type="text"
                    defaultVal="Close options"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="tooltip"
                    attr="userOptions.buttonTitles.tooltip"
                    type="text"
                    defaultVal="Toggle tooltip"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="pdf"
                    attr="userOptions.buttonTitles.pdf"
                    type="text"
                    defaultVal="Download PDF"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="csv"
                    attr="userOptions.buttonTitles.csv"
                    type="text"
                    defaultVal="Download CSV"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="img"
                    attr="userOptions.buttonTitles.img"
                    type="text"
                    defaultVal="Download PNG"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="table"
                    attr="userOptions.buttonTitles.table"
                    type="text"
                    defaultVal="Toggle table"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="labels"
                    attr="userOptions.buttonTitles.labels"
                    type="text"
                    defaultVal="Toggle labels"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="fullscreen"
                    attr="userOptions.buttonTitles.fullscreen"
                    type="text"
                    defaultVal="Toggle fullscreen"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="stack"
                    attr="userOptions.buttonTitles.stack"
                    type="text"
                    defaultVal="Toggle stack mode"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                  <BaseAttr
                    name="annotator"
                    attr="userOptions.buttonTitles.annotator"
                    type="text"
                    defaultVal="Toggle annotator"
                    :light="mutableConfig"
                    :dark="mutableConfigDarkMode"
                    @change="forceChartUpdate()"
                  />
                </BaseDetails>
              </BaseDetails>
            </BaseDetails>
          </code>
        </div>
      </template>

      <!-- EMITS -->
      <template #tab2>
        <div>
          <code><b>@selectLegend</b></code>
        </div>
        <div class="text-gray-400 pl-5">
          {{ translations.docs.emits.xy.selectLegend[store.lang] }}
        </div>
        <pre>
    <code>
    [
        {
            name: string;
            values: number[];
            color: string;
            type: "bar" | "line" | "plot"
        },
        {...}
    ]
    </code>
    </pre>

        <div class="pt-4 border-t border-gray-700 overflow-x-auto">
          <div><code>getData</code></div>
          <div class="text-gray-400 pl-5 mb-4">
            {{ translations.docs.emits.xy.getData[store.lang] }}
          </div>
          <pre>
    <span class="text-gray-600 dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const xyChart = ref(null);
            const xyDataset = ref([]);

            onMounted(() => {
                xyDataset.value = xyChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXyCanvas
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXyCanvas
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        xyDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.xyDataset = this.$refs.xyChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
        </div>

        <ExposedMethods
          component="VueUiXyCanvas"
          :names="[
            'generatePdf',
            'generateCsv',
            'generateImage',
            'toggleTable',
            'toggleStack',
            'toggleLabels'
          ]"
        />
      </template>

      <!-- SLOTS -->
      <template #tab3>
        <BaseSlotDocumenter
            componentName="VueUiXyCanvas"
            :types="[
                'legend',
                'tooltip-before',
                'tooltip-after',
                'reset-action',
                'watermark',
                'source'
            ]" 
        />
      </template>

      <!-- TOOLTIP -->
      <template #tab4>
        <pre>
<code>
<span class="text-gray-400">config.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
    <span class="text-gray-400">// use args to build your custom content</span>
    const content = "My custom content";
    return `&lt;div&gt;${content}&lt;/div&gt;`
}

</code>
</pre>
        Using custom mode, the tooltip will be headless. Target the following
        css class to apply custom styles:
        <pre>
<code>
.vue-data-ui-custom-tooltip
</code>
</pre>
      </template>

      USE CASES
      <template #tab5>
        <ucXyCanvas />
      </template>

      <!-- THEMES -->
      <template #tab6>
        <ThemesVueUiXyCanvas />
      </template>

      <template #tab7>
        <ResponsiveUnit>
          <template #chart>
            <VueDataUi component="VueUiXyCanvas" :dataset="dataset" :config="isDarkMode
          ? {
            ...mutableConfigDarkMode,
            responsive: true,
            style: {
              ...mutableConfigDarkMode.style,
              fontFamily: 'Satoshi',
            },
          }
          : {
            ...mutableConfig,
            responsive: true,
            style: {
              ...mutableConfig.style,
              fontFamily: 'Satoshi',
            },
          }
        " :key="key" />
          </template>
        </ResponsiveUnit>
      </template>
    </Box>
  </div>
</template>
