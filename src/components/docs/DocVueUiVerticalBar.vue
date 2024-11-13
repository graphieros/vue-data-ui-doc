<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiVerticalBar from "../themes/ThemesVueUiVerticalBar.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

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
    name: "Serie 1",
    value: 100,
    children: [
      {
        name: "serie 1 child 1",
        value: 80
      },
      {
        name: "serie 1 child 2",
        value: 20
      },
    ]
  },
  {
    name: "Serie 2",
    value: 345,
  },
  {
    name: "Serie 3",
    value: 210,
  },
  {
    name: "Serie 4",
    value: 188,
  },
  {
    name: "Serie 5",
    value: 120,
    children: [
      {
        name: "Serie 5 child 1",
        value: 60,
      },
      {
        name: "Serie 5 child 2",
        value: 20,
      },
      {
        name: "Serie 5 child 3",
        value: 40,
      },
    ]
  }
]);

const config = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      layout: {
        bars: {
          sort: "desc",
          useStroke: false,
          strokeWidth: 2,
          height: 32,
          gap: 6,
          borderRadius: 4,
          offsetX: 64,
          paddingRight: 0,
          useGradient: true,
          gradientIntensity: 20,
          fillOpacity: 10,
          underlayerColor: "#FFFFFF",
          dataLabels: {
            color: "#1A1A1A",
            bold: true,
            fontSize: 12,
            value: {
              show: true,
              roundingValue: 0,
              prefix: "",
              suffix: ""
            },
            percentage: {
              show: true,
              roundingPercentage: 0
            },
            offsetX: 0
          },
          nameLabels: {
            show: true,
            color: "#1A1A1A",
            bold: false,
            fontSize: 10,
            offsetX: 0
          },
          parentLabels: {
            show: true,
            color: "#1A1A1A",
            bold: false,
            fontSize: 10,
            offsetX: 0
          }
        },
        highlighter: {
          color: "#1A1A1A",
          opacity: 5
        },
        separators: {
          show: true,
          color: "#CCCCCC",
          strokeWidth: 1
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
        position: "top",
        show: true,
        fontSize: 14,
        color: "#1A1A1A",
        bold: true,
        roundingValue: 0,
        backgroundColor: "#F3F4F6",
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      },
      tooltip: {
        show: true,
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: "",
        suffix: "",
        customFormat: null,
        borderRadius: 4,
        borderColor:"#e1e5e8",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: 'center',
        offsetY: 24,
      }
    }
  },
  userOptions: {
    show: true,
    position: 'right',
    buttons: {
        tooltip: true,
        pdf: true,
        img: true,
        csv: true,
        table: true,
        sort: true,
        fullscreen: true
    },
    buttonTitles: {
        open: "Open options",
        close: "Close options",
        tooltip: "Toggle tooltip",
        pdf: "Download PDF",
        csv: "Download CSV",
        img: "Download PNG",
        table: "Toggle table",
        sort: "Toggle sort",
        fullscreen: "Toggle fullscreen",
    }
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
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: "",
      suffix: ""
    }
  },
  translations: {
    parentName: "Serie",
    childName: "Child",
    value: "value",
    percentageToTotal: "%/total",
    percentageToSerie: "%/serie"
  }
});
const darkModeConfig = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      layout: {
        bars: {
          sort: "desc",
          useStroke: false,
          strokeWidth: 2,
          height: 32,
          gap: 6,
          borderRadius: 4,
          offsetX: 64,
          paddingRight: 0,
          useGradient: true,
          gradientIntensity: 20,
          fillOpacity: 10,
          underlayerColor: "#FFFFFF",
          dataLabels: {
            color: "#CCCCCC",
            bold: true,
            fontSize: 12,
            value: {
              show: true,
              roundingValue: 0,
              prefix: "",
              suffix: ""
            },
            percentage: {
              show: true,
              roundingPercentage: 0
            },
            offsetX: 0
          },
          nameLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          },
          parentLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          }
        },
        highlighter: {
          color: "#FFFFFF",
          opacity: 5
        },
        separators: {
          show: true,
          color: "#343434",
          strokeWidth: 1
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
        position: "top",
        show: true,
        fontSize: 14,
        color: "#CCCCCC",
        bold: true,
        roundingValue: 0,
        backgroundColor: "#1A1A1A",
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      },
      tooltip: {
        show: true,
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: "",
        suffix: "",
        customFormat: null,
        borderRadius: 4,
        borderColor:"#3A3A3A",
        borderWidth: 1,
        backgroundOpacity: 50,
        position: 'center',
        offsetY: 24,
      }
    }
  },
  userOptions: {
    show: true,
    position: 'right',
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      sort: true,
      fullscreen: true
    },
    buttonTitles: {
        open: "Open options",
        close: "Close options",
        tooltip: "Toggle tooltip",
        pdf: "Download PDF",
        csv: "Download CSV",
        img: "Download PNG",
        table: "Toggle table",
        sort: "Toggle sort",
        fullscreen: "Toggle fullscreen",
    }
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
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: "",
      suffix: ""
    }
  },
  translations: {
    parentName: "Serie",
    childName: "Child",
    value: "value",
    percentageToTotal: "%/total",
    percentageToSerie: "%/serie"
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
} 

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartVerticalBar" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">VerticalBar</span></span>
        </h1>
    <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.verticalBar[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-vertical-bar"
          targetMaker="VueUiVerticalBar"
          :configSource="mainConfig.vue_ui_vertical_bar"
        />

    <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
        <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <Suspense>
              <template #default>
                <VueUiVerticalBar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                  <BaseSpinner/>
              </template>
            </Suspense>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-vertical-bar"/>
        </div>

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_vertical_bar" signInfo="both">
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">VueUiVerticalBarDatasetItem[]</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            value: number;
            color: string; <span class="text-app-green">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
            children: [
                <span class="text-app-green">// {{ translations.docs.comments.verticalBar.breakdown[store.lang] }}</span>
                {
                    name: string;
                    value: number;
                },
                {...}
            ]
        },
        {...}
    ]
</code>
</pre>          
                </div>
                {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-app-green">dataset: VueUiVerticalBarDatasetItem[]</span> = [
    {
        name: "Serie 1",
        value: 100,
        children: [
        {
            name: "serie 1 child 1",
            value: 80
        },
        {
            name: "serie 1 child 2",
            value: 20
        },
        ]
    },
    {
        name: "Serie 2",
        value: 345,
    },
    {
        name: "Serie 3",
        value: 210,
    },
    {
        name: "Serie 4",
        value: 188,
    },
    {
        name: "Serie 5",
        value: 120,
        children: [
        {
            name: "Serie 5 child 1",
            value: 60,
        },
        {
            name: "Serie 5 child 2",
            value: 20,
        },
        {
            name: "Serie 5 child 3",
            value: 40,
        },
        ]
    }
]
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab1>
                <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiVerticalBarConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config:VueUiVerticalBarConfig" equal>
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <span>customPalette: []; <span class="text-app-blue text-xs">// string[]</span></span>
    <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <BaseDetails attr="bars" :level="4" title="style.chart.layout.bars">
            <BaseAttr name="sort" attr="style.chart.layout.bars.sort" type="select" defaultVal="desc" :options="['desc', 'asc']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="useStroke" attr="style.chart.layout.bars.useStroke" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.chart.layout.bars.strokeWidth" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="height" attr="style.chart.layout.bars.height" type="number" defaultVal="32" :min="1" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="gap" attr="style.chart.layout.bars.gap" type="number" defaultVal="6" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="borderRadius" attr="style.chart.layout.bars.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="offsetX" attr="style.chart.layout.bars.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useGradient" attr="style.chart.layout.bars.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="gradientIntensity" attr="style.chart.layout.bars.gradientIntensity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fillOpacity" attr="style.chart.layout.bars.fillOpacity" type="range" defaultVal="90" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="underlayerColor" attr="style.chart.layout.bars.underlayerColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.bars.dataLabels">
              <BaseAttr name="color" attr="style.chart.layout.bars.dataLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.chart.layout.bars.dataLabels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.chart.layout.bars.dataLabels.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetX" attr="style.chart.layout.bars.dataLabels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseDetails attr="percentage" :level="6" title="style.chart.layout.bars.dataLabels.percentage">
                <BaseAttr name="show" attr="style.chart.layout.bars.dataLabels.percentage.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="roundingPercentage" attr="style.chart.layout.bars.dataLabels.percentage.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              </BaseDetails>
              <BaseDetails attr="value" :level="6" title="style.chart.layout.bars.dataLabels.value">
                <BaseAttr name="show" attr="style.chart.layout.bars.dataLabels.value.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="roundingValue" attr="style.chart.layout.bars.dataLabels.value.roundingValue" type="number" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="prefix" attr="style.chart.layout.bars.dataLabels.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="suffix" attr="style.chart.layout.bars.dataLabels.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
              </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="nameLabels" :level="5" title="style.chart.layout.bars.nameLabels">
              <BaseAttr name="show" attr="style.chart.layout.bars.nameLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.chart.layout.bars.nameLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.chart.layout.bars.nameLabels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.chart.layout.bars.nameLabels.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetX" attr="style.chart.layout.bars.nameLabels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="parentLabels" :level="5" title="style.chart.layout.bars.parentLabels">
              <BaseAttr name="show" attr="style.chart.layout.bars.parentLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.chart.layout.bars.parentLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.chart.layout.bars.parentLabels.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.chart.layout.bars.parentLabels.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetX" attr="style.chart.layout.bars.parentLabels.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="highlighter" :level="4" title="style.chart.layout.highlighter">
            <BaseAttr name="color" attr="style.chart.layout.highlighter.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="opacity" attr="style.chart.layout.highlighter.opacity" type="range" defaultVal="5" :min="0" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
          <BaseDetails attr="separators" :level="4" title="style.chart.layout.separators">
            <BaseAttr name="show" attr="style.chart.layout.separators.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.chart.layout.separators.color" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.chart.layout.separators.strokeWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="legend" :level="3" title="style.chart.legend">
          <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="position" attr="style.chart.legend.position" type="select" defaultVal="top" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseAttr name="roundingValue" attr="style.chart.legend.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="roundingPercentage" attr="style.chart.legend.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="prefix" attr="style.chart.legend.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="suffix" attr="style.chart.legend.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="title" :level="3" title="style.chart.title">
          <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
            <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
          <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="showValue" attr="style.chart.tooltip.showValue" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="showPercentage" attr="style.chart.tooltip.showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="roundingValue" attr="style.chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="roundingPercentage" attr="style.chart.tooltip.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="prefix" attr="style.chart.tooltip.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="suffix" attr="style.chart.tooltip.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <span>customFormat: null, <span class="text-app-blue break-keep text-xs">// default behavior. To customize, check out the 'custom tooltip' tab</span></span>
          <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="th" :level="2" title="table.th">
        <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="prefix" attr="table.td.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="suffix" attr="table.td.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <BaseAttr name="parentName" attr="translations.parentName" type="text" defaultVal="Serie" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="childName" attr="translations.childName" type="text" defaultVal="Child" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="value" attr="translations.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="percentageToTotal" attr="translations.percentageToTotal" type="text" defaultVal="%/total" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="percentageToSerie" attr="translations.percentageToSerie" type="text" defaultVal="%/serie" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="sort" attr="userOptions.buttons.sort" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="sort" attr="userOptions.buttonTitles.sort" type="text" defaultVal="Toggle sort" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>
                <div class="overflow-x-auto">
                </div>
            </template>
            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
<pre>
<code>
[
    {
        children: [
            {
                childIndex: number;
                color: string;
                isChild: boolean;
                isFirstChild: boolean;
                isLastChild: boolean;
                name: string;
                parentId: string;
                parentName: string;
                parentValue: number;
                value: number;
            },
            {...}
        ],
        color: string;
        hasChildren: boolean;
        id: string;
        isChild: boolean;
        name: string;
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

            const verticalBarChart = ref(null);
            const verticalBarDataset = ref([]);

            onMounted(() => {
                verticalBarDataset.value = verticalBarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        verticalBarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.verticalBarDataset = this.$refs.verticalBarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleSort</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleSort[store.lang] }}</div>
                </div>
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre> 

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre>
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

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
              <ThemesVueUiVerticalBar />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiVerticalBar 
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