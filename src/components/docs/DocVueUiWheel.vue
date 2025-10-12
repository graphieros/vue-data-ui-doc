<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiWheel from "../themes/ThemesVueUiWheel.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";

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

const dataset = ref({
  percentage: 66.5,
});

const config = ref({
  debug: false,
  loading: false,
  responsive: false,
  layout: 'classic',
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      animation: {
        use: true,
        speed: 0.5,
        acceleration: 1,
      },
      layout: {
        wheel: {
          radiusRatio: 1,
          tiltAngle3d: 50,
          ticks: {
            type: 'classic',
            rounded: true,
            inactiveColor: "#e1e5e8",
            activeColor: "#5f8bee",
            sizeRatio: 0.9,
            stroke: 'transparent',
            strokeWidth: 5,
            depth3d: 0,
            spacingRatio3d: 1,
            shadeColorRatio3d: 0.15,
            gradient: {
              show: true,
              shiftHueIntensity: 100,
            },
          },
        },
        innerCircle: {
          show: true,
          stroke: "#e1e5e8",
          strokeWidth: 1,
          radiusRatio: 1,
        },
        percentage: {
          show: true,
          fontSize: 48,
          rounding: 1,
          bold: true,
          offsetX: 0,
          offsetY: 0,
          stroke: 'transparent',
          strokeWidth: 0
        },
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
    },
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
  },
});

const darkModeConfig = ref({
  debug: false,
  loading: false,
  responsive: false,
  layout: 'classic',
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      animation: {
        use: true,
        speed: 0.5,
        acceleration: 1,
      },
      layout: {
        wheel: {
          radiusRatio: 1,
          tiltAngle3d: 50,
          ticks: {
            type: 'classic',
            rounded: true,
            inactiveColor: "#3A3A3A",
            activeColor: "#5f8bee",
            sizeRatio: 0.9,
            strokeWidth: 5,
            stroke: 'transparent',
            depth3d: 0,
            spacingRatio3d: 1,
            shadeColorRatio3d: 0.15,
            gradient: {
              show: true,
              shiftHueIntensity: 100,
            },
          },
        },
        innerCircle: {
          show: true,
          stroke: "#3A3A3A",
          strokeWidth: 1,
          radiusRatio: 1,
        },
        percentage: {
          show: true,
          fontSize: 48,
          rounding: 1,
          bold: true,
          offsetX: 0,
          offsetY: 0,
          stroke: 'transparent',
          strokeWidth: 0
        },
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
    },
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
  },
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

function randomizeData() {
  dataset.value.percentage = Math.random() * 100;
}

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiWheel" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.wheel[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-wheel"
          targetMaker="VueUiWheel"
          :configSource="mainConfig.vue_ui_wheel"
        />

        <div :class="`transition-all mx-auto max-w-[450px]`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <BaseCard>
              <VueUiWheel :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </BaseCard>
          </DocSnapper>
            <BaseRandomButton @click="randomizeData"/>
        </div>


        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-wheel"/>
        </div>

        <Rater itemId="vue_ui_wheel" />

        <BaseMigrationInfo
            debug 
        />

        <Box showEmits showSlots showThemes showResponsive schema="vue_ui_wheel" signInfo="positiveOnly">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                  TS type: <code class="text-app-green">VueUiWheelDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        percentage: number; (from 0 to 100)
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiWheelDataset</span> = {
    percentage: 66.5
}
</code>
</pre>                
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiWheelConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiWheelConfig" equal>
    <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
    <BaseAttr name="layout" attr="layout" type="select" defaultVal="classic" :options="['classic', '3d']" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.2.1"/>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
        <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
        <BaseDetails attr="animation" :level="3" title="style.chart.animation">
          <BaseAttr name="use" attr="style.chart.animation.use" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="speed" attr="style.chart.animation.speed" type="number" defaultVal="1" :min="0.1" :max="100" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="acceleration" attr="style.chart.animation.acceleration" type="number" defaultVal="1" :min="0.1" :max="5" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <BaseDetails attr="innerCircle" :level="4" title="style.chart.layout.innerCircle">
            <BaseAttr name="show" attr="style.chart.layout.innerCircle.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="stroke" attr="style.chart.layout.innerCircle.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="strokeWidth" attr="style.chart.layout.innerCircle.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="radiusRatio" attr="style.chart.layout.innerCircle.radiusRatio" type="number" :min="0.2" :max="2" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.2.1" />
          </BaseDetails>
          <BaseDetails attr="percentage" :level="4" title="style.chart.layout.percentage">
            <BaseAttr name="show" attr="style.chart.layout.percentage.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="fontSize" attr="style.chart.layout.percentage.fontSize" type="number" defaultVal="48" :min="8" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="rounding" attr="style.chart.layout.percentage.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.chart.layout.percentage.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="offsetX" attr="style.chart.layout.percentage.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.2.1"/>
            <BaseAttr name="offsetY" attr="style.chart.layout.percentage.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.2.1"/>
            <BaseAttr name="stroke" attr="style.chart.layout.percentage.stroke" type="color" defaultVal="transparent" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.2.1."/>
            <BaseAttr name="strokeWidth" attr="style.chart.layout.percentage.strokeWidth" type="number" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
          </BaseDetails>
          <BaseDetails attr="wheel" :level="4" title="style.chart.layout.wheel">
            <BaseAttr name="radiusRatio" attr="style.chart.layout.wheel.radiusRatio" type="number" :min="0.3" :max="1" :step="0.01" comment="since v3.2.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="tiltAngle3d" attr="style.chart.layout.wheel.tiltAngle3d" type="range" :min="10" :max="80" comment="since v3.2.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="ticks" :level="5" title="style.chart.layout.wheel.ticks">
              <BaseAttr name="type" attr="style.chart.layout.wheel.ticks.type" type="select" defaultVal="classic" :options="['classic', 'arc']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="rounded" attr="style.chart.layout.wheel.ticks.rounded" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="inactiveColor" attr="style.chart.layout.wheel.ticks.inactiveColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="activeColor" attr="style.chart.layout.wheel.ticks.activeColor" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="sizeRatio" attr="style.chart.layout.wheel.ticks.sizeRatio" type="range" defaultVal="0.9" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="stroke" attr="style.chart.layout.wheel.ticks.stroke" type="color" defaultVal="transparent" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="strokeWidth" attr="style.chart.layout.wheel.ticks.strokeWidth" type="number" defaultVal="5" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="depth3d" attr="style.chart.layout.wheel.ticks.depth3d" type="number" defaultVal="0" :min="0" :max="40" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="spacingRatio3d" attr="style.chart.layout.wheel.ticks.spacingRatio3d" type="range" :min="0" :max="1" :step="0.01" defaultVal="1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="shadeColorRatio3d" attr="style.chart.layout.wheel.ticks.shadeColorRatio3d" type="range" :min="0" :max="1" :step="0.01" defaultVal="0.15" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseDetails attr="gradient" :level="6" title="style.chart.layout.wheel.ticks.gradient">
                <BaseAttr name="show" attr="style.chart.layout.wheel.ticks.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="shiftHueIntensity" attr="style.chart.layout.wheel.ticks.gradient.shiftHueIntensity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              </BaseDetails>
            </BaseDetails>
          </BaseDetails>
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

                <div class="overflow-w-auto">              
                </div>
            </template>
            <template #tab2>
              <ExposedMethods
                component="VueUiWheel"
                getImage
                :names="[
                  'generatePdf',
                  'generateImage',
                  'generateSvg',
                ]"
              />
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiWheel"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <template #tab6>
              <ThemesVueUiWheel />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiWheel 
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

<style>
.vue-ui-wheel * {
  font-variant-numeric:tabular-nums !important;
}
</style>
