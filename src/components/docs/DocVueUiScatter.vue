<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiScatter from "../themes/ThemesVueUiScatter.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
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
});

const scat1 = computed(() => {
  const arr = [];
  for(let i = -100; i < 100; i += 1) {
    arr.push({
      x: Math.random()*(Math.random() > 0.3 ? i/3 : -i /5),
      y: Math.random()*i/20,
      name: `plot_${i}_cluster_1`
    });
  }
  return arr;
});

const scat2 = computed(() => {
  const arr = [];
  for(let i = -100; i < 100; i += 1) {
    arr.push({
      x: Math.random()*(Math.random() > 0.1 ? i/10 : -i /10),
      y: Math.random()*i/10,
      name: `plot_${i}_cluster_2`
    });
  }
  return arr;
});

const dataset = computed(() => {
  
  return [
  {
    name: "Cluster 1",
    values: scat1.value,
    color: "#42d392",
    shape: "star"
  },
  {
    name: "Cluster 2",
    values: scat2.value,
    color: "#ff6400",
    shape: "triangle"
  }
]});

const darkModeConfig = ref({
  debug: false,
  loading: false,
  downsample: {
        threshold: 500
    },
  responsive: false,
  useCssAnimation: true,
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    layout: {
      height: 316,
      width: 512,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      axis: {
        show: true,
        stroke: "#565656",
        strokeWidth: 1
      },
      marginalBars: {
        show: true,
        size: 40,
        tranches: 20,
        opacity: 0.5,
        fill: '#CCCCCC',
        strokeWidth: 0.5,
        offset: 20,
        borderRadius: 2,
        useGradient: true,
        showLines: true,
        linesStrokeWidth: 1,
        highlighter: {
            show: true,
            opacity: 0.1,
            color: '#FFFFFF',
            stroke: '#6A6A6A',
            strokeWidth: 0.5,
            strokeDasharray: 2,
            highlightBothAxes: false,
        }
      },
      plots: {
        radius: 3,
        stroke: "#1A1A1A",
        strokeWidth: 0.3,
        opacity: 0.6,
        significance: {
          show: true,
          useDistanceOpacity: false,
          deviationThreshold: 10,
          opacity: 0.3
        },
        deviation: {
          translation: "deviation",
          roundingValue: 1
        },
        giftWrap: {
          show: false,
          strokeWidth: 1,
          strokeDasharray: 0,
          fillOpacity: 0.2
        },
        selectors: {
            show: true,
            stroke: "#CCCCCC",
            strokeWidth: 0.7,
            strokeDasharray: 0,
            labels: {
              fontSize: 8,
              color: "#CCCCCC",
              rounding: 2,
              bold: false,
              showName: true,
              prefix: "",
              suffix: "",
              x: {
                formatter: null
              },
              y: {
                formatter: null
              }
            },
            markers: {
              radius: 1.5,
              stroke: "#CCCCCC",
              strokeWidth: 0.5,
              fill: "#1A1A1A"
            }
        },
      },
      correlation: {
        show: true,
        strokeDasharray: 2,
        strokeWidth: 1,
        label: {
          show: true,
          fontSize: 8,
          color: "#CCCCCC",
          bold: true,
          roundingValue: 2,
          useSerieColor: true
        }
      },
      dataLabels: {
        xAxis: {
          name: "xAxis",
          show: true,
          fontSize: 8,
          color: "#CCCCCC",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
        },
        yAxis: {
          name: "yAxis",
          show: true,
          fontSize: 8,
          color: "#CCCCCC",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
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
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 12,
      bold: true,
      roundingValue: 0,
      position: 'bottom'
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      showShape: true,
      prefix: "",
      suffix: "",
      borderRadius: 4,
      borderColor:"#3A3A3A",
      borderWidth: 1,
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24
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
    },
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 2,
      roundingAverage: 1
    },
    translations: {
      correlationCoefficient: "Correlation Coef.",
      nbrPlots: "Nbr plots",
      average: "Average",
      series: "Series"
    }
  }
});

const config = ref({
  debug: false,
  loading: false,
  downsample: {
        threshold: 500
    },
  responsive: false,
  useCssAnimation: true,
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    layout: {
      height: 316,
      width: 512,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      axis: {
        show: true,
        stroke: "#C4C4C4",
        strokeWidth: 1
      },
      marginalBars: {
        show: true,
        size: 40,
        tranches: 20,
        opacity: 0.5,
        fill: '##2D353C',
        strokeWidth: 0.5,
        offset: 20,
        borderRadius: 2,
        useGradient: true,
        showLines: true,
        linesStrokeWidth: 1,
        highlighter: {
            show: true,
            opacity: 0.1,
            color: '#1A1A1A',
            stroke: '#1A1A1A',
            strokeWidth: 0.5,
            strokeDasharray: 2,
            highlightBothAxes: false,
        }
      },
      plots: {
        radius: 3,
        stroke: "#F3F4F6",
        strokeWidth: 0.3,
        opacity: 0.6,
        significance: {
          show: true,
          useDistanceOpacity: false,
          deviationThreshold: 10,
          opacity: 0.3
        },
        deviation: {
          translation: "deviation",
          roundingValue: 1
        },
        giftWrap: {
          show: false,
          strokeWidth: 1,
          strokeDasharray: 0,
          fillOpacity: 0.2
        },
        selectors: {
            show: true,
            stroke: "#1A1A1A",
            strokeWidth: 0.7,
            strokeDasharray: 0,
            labels: {
              fontSize: 8,
              color: "#1A1A1A",
              rounding: 2,
              bold: false,
              showName: true,
              prefix: "",
              suffix: "",
              x: {
                formatter: null
              },
              y: {
                formatter: null
              }
            },
            markers: {
              radius: 1.5,
              stroke: "#1A1A1A",
              strokeWidth: 0.5,
              fill: "#FFFFFF"
            }
        },
      },
      correlation: {
        show: true,
        strokeDasharray: 2,
        strokeWidth: 1,
        label: {
          show: true,
          fontSize: 8,
          color: "#1A1A1A",
          bold: true,
          roundingValue: 2,
          useSerieColor: true
        }
      },
      dataLabels: {
        xAxis: {
          name: "xAxis",
          show: true,
          fontSize: 8,
          color: "#1A1A1A",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
        },
        yAxis: {
          name: "yAxis",
          show: true,
          fontSize: 8,
          color: "#1A1A1A",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
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
      position: 'bottom'
    },
    tooltip: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      showShape: true,
      prefix: "",
      suffix: "",
      borderRadius: 4,
      borderColor:"#e1e5e8",
      borderWidth: 1,
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24
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
    },
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none"
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none",
      roundingValue: 2,
      roundingAverage: 1
    },
    translations: {
      correlationCoefficient: "Correlation Coef.",
      nbrPlots: "Nbr plots",
      average: "Average",
      series: "Series"
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

const dsTypeCode = computed(() => {
  return `type VueUiScatterDatasetItem = {
  name: string
  color?: string // ${translations.value.docs.comments.xy.color[store.lang]}
  shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star" // default: "circle"
  values: Array<{
    x: number
    y: number
    name?: string
    weight?: number // ${translations.value.docs.comments.scatterWeight[store.lang]}
  }>
}`
});

const codeDataset = ref(`const dataset: VueUiScatterDatasetItem[] = [
  {
    name: "Cluster 1",
    values: [
      {
        x: 1,
        y: 1,
        name: "Cluster 1 point 1"
      },
      {
        x: 0,
        y: -1,
        name: "Cluster 1 point 2"
      },
      {
        x: 2,
        y: 3,
        name: "Cluster 1 point 3"
      },
    ]
},
{
    name: "Cluster 2",
    values: [
      {
        x: -5,
        y: -4,
        name: "Cluster 2 point 1"
      },
      {
        x: 13,
        y: 8,
        name: "Cluster 2 point 2"
      },
      {
        x: -2,
        y: -7,
        name: "Cluster 2 point 3"
      },
    ]
  }
];`);

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiScatter" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.scatter[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-scatter"
          targetMaker="VueUiScatter"
          :configSource="mainConfig.vue_ui_scatter"
        />

        <div :class="`transition-all mx-auto w-2/3`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <VueUiScatter :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
          </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-scatter"/>
        </div>

        <Rater itemId="vue_ui_scatter" />

        <BaseMigrationInfo
            cssAnimation
            debug 
            padding
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_scatter" signInfo="both">
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
                  TS type: <code class="text-app-blue">VueUiScatterConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiScatterConfig" equal>
    <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
    <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
    <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseDetails attr="events" :level="1">
        <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
        <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
    </BaseDetails>
    <BaseDetails attr="downsample" :level="1">
        <BaseAttr name="threshold" attr="downsample.threshold" type="number" defaultVal="500" :min="100" :max="5000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Threshold above which LTTB algorithm kicks in"/>
    </BaseDetails>
    <BaseDetails attr="style" :level="1">
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="color" attr="style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="layout" :level="2" title="style.layout">
        <BaseAttr name="height" attr="style.layout.height" type="number" defaultVal="316" :min="200" :max="1000" :step="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="width" attr="style.layout.width" type="number" defaultVal="512" :min="200" :max="1000" :step="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="axis" :level="3" title="style.layout.axis">
          <BaseAttr name="show" attr="style.layout.axis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="stroke" attr="style.layout.axis.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.axis.strokeWidth" type="range" defaultVal="1" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
        </BaseDetails>
        <BaseDetails attr="correlation" :level="3" title="style.layout.correlation">
          <BaseAttr name="show" attr="style.layout.correlation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeDasharray" attr="style.layout.correlation.strokeDasharray" type="range" defaultVal="2" :min="0" :max="24" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.correlation.strokeWidth" type="range" defaultVal="1" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="label" :level="4" title="style.layout.correlation.label">
            <BaseAttr name="show" attr="style.layout.correlation.label.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.layout.corelation.label.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useSerieColor" attr="style.layout.correlation.label.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.correlation.label.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.layout.correlation.label.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="roundingValue" attr="style.layout.corelation.label.roundingValue" type="number" defaultVal="2" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="dataLabels" :level="3" title="style.layout.dataLabels">
          <BaseDetails attr="xAxis" :level="4" title="style.layout.dataLabels.xAxis">
            <BaseAttr name="show" attr="style.layout.dataLabels.xAxis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="name" attr="style.layout.dataLabels.xAxis.name" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.layout.dataLabels.xAxis.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.dataLabels.xAxis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.layout.dataLabels.xAxis.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="roundingValue" attr="style.layout.dataLabels.xAxis.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>            
            <!-- <BaseAttr name="offsetX" attr="style.layout.dataLabels.xAxis.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="offsetY" attr="style.layout.dataLabels.xAxis.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/> -->
          </BaseDetails>
          <BaseDetails attr="yAxis" :level="4" title="style.layout.dataLabels.yAxis">
            <BaseAttr name="show" attr="style.layout.dataLabels.yAxis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="name" attr="style.layout.dataLabels.yAxis.name" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.layout.dataLabels.yAxis.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.dataLabels.yAxis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.layout.dataLabels.yAxis.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="roundingValue" attr="style.layout.dataLabels.yAxis.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>            
            <!-- <BaseAttr name="offsetX" attr="style.layout.dataLabels.yAxis.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="offsetY" attr="style.layout.dataLabels.yAxis.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/> -->
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="marginalBars" :level="3" title="style.layout.marginalBars">
          <BaseAttr name="show" attr="style.layout.marginalBars.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="size" attr="style.layout.marginalBars.size" type="number" defaultVal="40" :min="20" :max="100" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="tranches" attr="style.layout.marginalBars.tranches" type="number" defaultVal="20" :min="10" :max="100" :step="5" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="opacity" attr="style.layout.marginalBars.opacity" type="range" defaultVal="1" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fill" attr="style.layout.marginalBars.fill" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.marginalBars.strokeWidth" type="number" defaultVal="1" :min="0.1" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="offset" attr="style.layout.marginalBars.offset" type="number" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="borderRadius" attr="style.layout.marginalBars.borderRadius" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="useGradient" attr="style.layout.marginalBars.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="showLines" attr="style.layout.marginalBars.showLines" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="linesStrokeWidth" attr="style.layout.marginalBars.linesStrokeWidth" type="number" defaultVal="1" :min="0.1" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="highlighter" :level="4" title="style.layout.marginalBars.highlighter">
            <BaseAttr name="show" attr="style.layout.marginalBars.highlighter.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="opacity" attr="style.layout.marginalBars.highlighter.opacity" type="number" defaultVal="0.1" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.marginalBars.highlighter.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="stroke" attr="style.layout.marginalBars.highlighter.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.layout.marginalBars.highlighter.strokeWidth" type="number" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeDasharray" attr="style.layout.marginalBars.highlighter.strokeDasharray" type="number" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="highlightBothAxes" attr="style.layout.marginalBars.highlighter.highlightBothAxes" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.layout.padding">
          <BaseAttr name="top" attr="style.layout.padding.top" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="right" attr="style.layout.padding.right" type="number" defaultVal="48" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bottom" attr="style.layout.padding.bottom" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="left" attr="style.layout.padding.left" type="number" defaultVal="48" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="plots" :level="3" title="style.layout.plots">
          <BaseAttr name="radius" attr="style.layout.plots.radius" type="number" defaultVal="2" :min="1" :max="24" :step="1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="stroke" attr="style.layout.plots.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.plots.strokeWidth" type="number" defaultVal="0.3" :min="0" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="opacity" attr="style.layout.plots.opacity" type="range" defaultVal="0.6" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="deviation" :level="4" title="style.layout.plots.deviation">
            <BaseAttr name="translation" attr="style.layout.plots.deviation.translation" type="text" defaultVal="deviation" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="roundingValue" attr="style.layout.plots.deviation.roundingValue" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          </BaseDetails>
          <BaseDetails attr="giftWrap" :level="4" title="style.layout.plots.giftWrap">
            <BaseAttr name="show" attr="style.layout.plots.giftWrap.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.layout.plots.giftWrap.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeDasharray" attr="style.layout.plots.giftWrap.strokeDasharray" type="range" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fillOpacity" attr="style.layout.plots.giftWrap.fillOpacity" type="range" defaultVal="0.2" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
          <BaseDetails attr="selectors" :level="4" title="style.layout.plots.selectors">
            <BaseAttr name="show" attr="style.layout.plots.selectors" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="stroke" attr="style.layout.plots.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.layout.plots.strokeWidth" type="number" defaultVal="0.7" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeDasharray" attr="style.layout.plots.strokeDasharray" type="range" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="labels" :level="5" title="style.layout.plots.selectors.labels">
              <BaseAttr name="fontSize" attr="style.layout.plots.selectors.labels.fontSize" type="number" defaultval="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.layout.plots.selectors.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="rounding" attr="style.layout.plots.selectors.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.layout.plots.selectors.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
              <BaseAttr name="showName" attr="style.layout.plots.selectors.labels.showName" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
              <BaseAttr name="prefix" attr="style.layout.plots.selectors.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="suffix" attr="style.layout.plots.selectors.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseDetails attr="x" :level="6" title="style.layout.plots.selectors.labels.x">
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
              </BaseDetails>
              <BaseDetails attr="y" :level="6" title="style.layout.plots.selectors.labels.y">
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
              </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="markers" :level="5" title="style.layout.plots.selectors.markers">
              <BaseAttr name="radius" attr="style.layout.plots.selectors.markers.radius" type="range" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="stroke" attr="style.layout.plots.selectors.markers.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="strokeWidth" attr="style.layout.plots.selectors.markers.strokeWidth" type="number" defaultVal="0.5" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fill" attr="style.layout.plots.selectors.markers.fill" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="significance" :level="4" title="style.layout.plots.significance">
            <BaseAttr name="show" attr="style.layout.plots.significance.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useDistanceOpacity" attr="style.layout.plots.significance.useDistanceOpacity" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="deviationThreshold" attr="style.layout.plots.significance.deviationThreshold" type="number" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="opacity" attr="style.layout.plots.significance.opacity" type="range" defaultVal="0.3" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="legend" :level="2" title="style.legend">
        <BaseAttr name="show" attr="style.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="backgroundColor" attr="style.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.legend.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bold" attr="style.legend.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="roundingValue" attr="style.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="position" attr="style.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
      </BaseDetails>
      <BaseDetails attr="title" :level="3" title="style.title">
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="paddingLeft" attr="style.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="paddingRight" attr="style.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="subtitle" :level="4" title="style.title.subtitle">
          <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <BaseAttr name="show" attr="style.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="backgroundColor" attr="style.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="style.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="fontSize" attr="style.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="showShape" attr="style.tooltip.showShape" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="prefix" attr="style.tooltip.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="suffix" attr="style.tooltip.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />        
        <span>customFormat: null, <BaseComment>Default behavior. To customize content, see 'custom tooltip' tab</BaseComment></span>
        <BaseAttr name="borderRadius" attr="style.tooltip.borderRadidus" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="borderColor" attr="style.tooltip.borderColor" type="color" defaultval="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="borderWidth" attr="style.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="backgroundOpacity" attr="style.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="position" attr="style.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="offsetY" attr="style.tooltip.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
      <BaseDetails attr="translations" :level="2" title="table.translations">
        <BaseAttr name="correlationCoefficient" attr="table.translations.correlationCoefficient" type="text" defaultVal="Correlation Coef." :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="nbrPlots" attr="table.translations.nbrPlots" type="text" defaultVal="Nbr plots" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="average" attr="table.translations.average" type="text" defaultVal="Average" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="series" attr="table.translations.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
      <BaseDetails attr="print" :level="2" title="userOptions.print">
          <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>

            </template>
            <template v-slot:tab2>
              <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-gray-600 dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const scatterChart = ref(null);
            const scatterDataset = ref([]);

            onMounted(async () => {
                scatterDataset.value = await scatterChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiScatter
                ref="scatterChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiScatter
                ref="scatterChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        scatterDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                async mounted () {
                    this.scatterDataset = await this.$refs.scatterChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>

                <ExposedMethods
                  component="VueUiScatter"
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
                  componentName="VueUiScatter"
                  :types="[
                      'svg',
                      'legend',
                      'tooltip-before',
                      'tooltip-after',
                      'watermark',
                      'source',
                      'chart-background'
                  ]" 
              />
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
    <span class="text-gray-400">// use args to build your custom content</span>
    const content = "My custom content";
    return `&lt;div&gt;${content}&lt;/div&gt;`
}
</code>
</pre> 
Using custom mode, the tooltip will be headless.
Target the following css class to apply custom styles:
<pre>
<code>
.vue-data-ui-custom-tooltip
</code>
</pre>           
            </template>

            <template #tab6>
              <ThemesVueUiScatter />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiScatter 
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
                    :key="key"
                  />
                </template>
              </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>