<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiThermometer from "../themes/ThemesVueUiThermometer.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";

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
});

const dataset = ref({
  value: 37,
  from: -100,
  to: 100,
  steps: 20,
  colors: {
    from: "#42d392",
    to: "#5f8bee",
  }
});

const config = ref({
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#f3f4f6",
      color: "#2D353C",
      height: 360,
      thermometer: {
        width: 48
      },
      padding: {
        top: 12,
        bottom: 12,
        left: 64,
        right: 64
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
        fontSize: 20,
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
        }
  }
});

const darkModeConfig = ref({
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      height: 360,
      thermometer: {
        width: 48
      },
      padding: {
        top: 12,
        bottom: 12,
        left: 64,
        right: 64
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
        fontSize: 20,
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
        }
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
} 

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartThermometer" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Thermometer</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.thermometer[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-thermometer"
          targetMaker="VueUiThermometer"
          :configSource="mainConfig.vue_ui_thermometer"
        />

        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'sm:w-1/4 sm:max-w-[300px]'}`">
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
            <div class="w-full max-w-[200px] mx-auto">
              <Suspense>
                <template #default>
                  <VueUiThermometer :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                  <BaseSpinner/>
                </template>
              </Suspense>
            </div>
        </div>

        <Box showEmits showSlots showThemes schema="vue_ui_thermometer">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                  TS type: <code class="text-app-green">VueUiThermometerDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        value: number;
        from: number;
        to: number;
        steps?: number; (default: 10)
        colors?: {
            from?: string; (default: "#dc3912")
            to?: string; (default: "#3366cc")
        }
    }
</code>
</pre>          {{ translations.docs.example[store.lang] }} :
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
    <span>theme: "", <BaseComment>"zen" | "hack" | "concrete" | ""</BaseComment></span>
    <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
        <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
        <BaseAttr name="height" attr="style.chart.height" type="number" defaultVal="360" :min="100" :max="360" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
          <BaseAttr name="fontSize" attr="style.chart.label.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="rounding" attr="style.chart.label.rounding" type="number" defaultVal="0" :min="1" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.chart.label.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.chart.label.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="prefix" attr="style.chart.label.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="suffix" attr="style.chart.label.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.chart.padding">
          <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="64" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="64" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
  </BaseDetails>
  </BaseDetails>
</code>
            
            </template>
            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiThermometer"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                    ]" 
                />
            </template>

            <template #tab6>
              <ThemesVueUiThermometer />
            </template>

        </Box>
    </div>
</template>