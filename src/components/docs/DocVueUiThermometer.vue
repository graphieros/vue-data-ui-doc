<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiThermometer from "../themes/ThemesVueUiThermometer.vue";
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

const dataset = ref({
  value: 37,
  from: -100,
  to: 100,
  steps: 20,
  colors: {
    from: "#ff3700",
    to: "#5f8bee",
  }
});

const config = ref({
  debug: false,
  loading: false,
  responsive: false,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#f3f4f6",
      color: "#2D353C",
      height: 360,
      width: 256,
      thermometer: {
        width: 48
      },
      padding: {
        top: 12,
        bottom: 12,
      },
      graduations: {
        show: true,
        sides: "both",
        height: 2,
        stroke: "#e1e5e8",
        strokeWidth: 1,
        showIntermediate: true,
        gradient: {
          show: true,
          intensity: 40
        }
      },
      animation: {
        use: true,
        speedMs: 1000
      },
      label: {
        show: true,
        fontSize: 20,
        minFontSize: 6,
        rounding: 1,
        bold: true,
        color: "#2D353C",
        prefix: "",
        suffix: ""
      }
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
        bold: false
      }
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
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
  }
});

const darkModeConfig = ref({
  debug: false,
  loading: false,
  responsive: false,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      height: 360,
      width: 256,
      thermometer: {
        width: 48
      },
      padding: {
        top: 12,
        bottom: 12,
      },
      graduations: {
        show: true,
        sides: "both",
        height: 2,
        stroke: "#e1e5e8",
        strokeWidth: 1,
        showIntermediate: true,
        gradient: {
          show: true,
          intensity: 40
        }
      },
      animation: {
        use: true,
        speedMs: 1000
      },
      label: {
        show: true,
        fontSize: 20,
        minFontSize: 6,
        rounding: 1,
        bold: true,
        color: "#CCCCCC",
        prefix: "",
        suffix: ""
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
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    forceChartUpdate();
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
  return `
  type VueUiThermometerDataset = {
      value: number
      from: number
      to: number
      steps?: number // default: 10
      colors?: {
          from?: string // default: "#dc3912"
          to?: string // default: "#3366cc"
      }
  }
  `
})

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiThermometer" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.thermometer[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-thermometer"
          targetMaker="VueUiThermometer"
          :configSource="mainConfig.vue_ui_thermometer"
        />

        <div :class="`transition-all mx-auto max-w-[200px]`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <div :style="{ width: isFixed ? '150px' : '200px' }" class="mx-auto">
              <VueUiThermometer :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </div>
          </DocSnapper>
        </div>

        <Rater itemId="vue_ui_thermometer" />

        <BaseMigrationInfo
            debug 
            padding
        />

        <Box showResponsive showEmits showSlots showThemes schema="vue_ui_thermometer">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                  TS type: <code class="text-app-green">VueUiThermometerDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

          <CodeParser
            language="javascript"
            @copy="store.copy()"
            :content="dsTypeCode"
            class="my-6"
        />
      {{ translations.docs.example[store.lang] }} :
                    <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiThermometerDataset</span> = {
    value: 37,
    from: -100,
    to: 100,
    steps: 20,
    colors: {
        from: "#dc3912",
        to: "#3366cc",
    }
}
</code>
</pre>                     
                    </div>
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiThermometerConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiThermometerConfig" equal>
    <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
    <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
        <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
        <BaseAttr name="height" attr="style.chart.height" type="number" defaultVal="360" :min="100" :max="360" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="width" attr="style.chart.width" type="number" defaultVal="256" :min="100" :max="360" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="animation" :level="3" title="style.chart.animation">
          <BaseAttr name="use" attr="style.chart.animation.use" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="speedMs" attr="style.chart.animation.speedMs" type="number" defaultVal="1000" :min="50" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
        <BaseDetails attr="graduations" :level="3" title="style.chart.graduations">
          <BaseAttr name="show" attr="style.chart.graduations.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="sides" attr="style.chart.graduations.sides" type="select" defaultVal="both" :options="['both', 'left', 'right', 'none']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="stroke" attr="style.chart.graduations.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.chart.graduations.strokeWidth" type="number" defaultVal="1" :min="1" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="showIntermediate" attr="style.chart.graduations.showIntermediate" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="gradient" :level="4" title="style.chart.graduations.gradient">
            <BaseAttr name="show" attr="style.chart.graduations.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="intensity" attr="style.chart.graduations.gradient.intensity" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="label" :level="3" title="style.chart.label">
          <BaseAttr name="show" attr="style.chart.label.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.chart.label.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="minFontSize" attr="style.chart.label.minFontSize" type="number" defaultVal="6" :min="6" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="rounding" attr="style.chart.label.rounding" type="number" defaultVal="0" :min="1" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.chart.label.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.chart.label.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="prefix" attr="style.chart.label.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="suffix" attr="style.chart.label.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.chart.padding">
          <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
        <BaseDetails attr="thermometer" :level="3" title="style.chart.thermometer">
          <BaseAttr name="width" attr="style.chart.thermometer.width" type="number" defaultVal="48" :min="10" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
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
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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
              <ExposedMethods
                component="VueUiThermometer"
                getImage
                :names="[
                  'generatePdf',
                  'generateImage'
                ]"
              />
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiThermometer"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <template #tab6>
              <ThemesVueUiThermometer />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px" minHeight="200px">
                    <template #chart>
                        <VueDataUi 
                            component="VueUiThermometer" 
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

        </Box>
    </div>
</template>