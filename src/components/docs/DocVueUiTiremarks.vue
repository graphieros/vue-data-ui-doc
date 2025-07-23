<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiTiremarks from "../themes/ThemesVueUiTiremarks.vue";
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
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      animation: {
        use: true,
        speed: 0.5,
        acceleration: 1
      },
      layout: {
        display: "horizontal",
        crescendo: false,
        curved: false,
        curveAngleX: 10,
        curveAngleY: 10,
        activeColor: "#FF0000",
        inactiveColor: "#e1e5e8",
        ticks: {
          gradient: {
            show: true,
            shiftHueIntensity: 30
          }
        }
      },
      percentage: {
        show: true,
        useGradientColor: false,
        color: "#1A1A1A",
        fontSize: 16,
        bold: true,
        rounding: 1,
        verticalPosition: "bottom",
        horizontalPosition: "left"
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
        },
  }
})

const darkModeConfig = ref({
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      animation: {
        use: true,
        speed: 0.5,
        acceleration: 1
      },
      layout: {
        display: "horizontal",
        crescendo: false,
        curved: false,
        curveAngleX: 10,
        curveAngleY: 10,
        activeColor: "#FF0000",
        inactiveColor: "#3A3A3A",
        ticks: {
          gradient: {
            show: true,
            shiftHueIntensity: 30
          }
        }
      },
      percentage: {
        show: true,
        useGradientColor: false,
        color: "#CCCCCC",
        fontSize: 16,
        bold: true,
        rounding: 1,
        verticalPosition: "bottom",
        horizontalPosition: "left"
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
        },
  }
})

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
  dataset.value.percentage = Math.random() * 100;
}

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiTiremarks" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.tiremarks[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-tiremarks"
          targetMaker="VueUiTiremarks"
          :configSource="mainConfig.vue_ui_tiremarks"
        />

        <div :class="`transition-all mx-auto ${mutableConfigDarkMode.style.chart.layout.display === 'vertical' ? 'max-w-[100px]' : 'max-w-[500px]'}`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <VueUiTiremarks :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
          </DocSnapper>
            <BaseRandomButton @click="randomizeData"/>
        </div>

        <Rater itemId="vue_ui_tiremarks" />

        <Box showEmits showSlots showThemes schema="vue_ui_tiremarks" signInfo="positiveOnly">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                  TS type: <code class="text-app-green">VueUiTiremarksDataset</code>
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
const <span class="text-black dark:text-app-green">dataset: VueUiTiremarksDataset</span> = {
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
                  TS type: <code class="text-app-blue">VueUiTiremarksConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiTiremarksConfig" equal>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
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
          <BaseAttr name="display" attr="style.chart.layout.display" type="select" defaultVal="horizontal" :options="['horizontal', 'vertical']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="crescendo" attr="style.chart.layout.crescendo" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="curved" attr="style.chart.layout.curved" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="curveAngleX" attr="style.chart.layout.curveAngleX" type="range" defaultVal="10" :min="1" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="curveAngleY" attr="style.chart.layout.curveAngleY" type="range" defaultVal="10" :min="1" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="activeColor" attr="style.chart.layout.activeColor" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="inactiveColor" attr="style.chart.layout.inactiveColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="ticks" :level="4" title="style.chart.layout.ticks">
            <BaseDetails attr="gradient" :level="5" title="style.chart.layout.ticks.gradient">
              <BaseAttr name="show" attr="style.chart.layout.ticks.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="shiftHueIntensity" attr="style.chart.layout.ticks.gradient.shiftHueIntensity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="percentage" :level="3" title="style.chart.percentage">
          <BaseAttr name="show" attr="style.chart.percentage.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="useGradientColor" attr="style.chart.percentage.useGradientColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.chart.percentage.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.chart.percentage.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.chart.percentage.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="rounding" attr="style.chart.percentage.rounding" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="verticalPosition" attr="style.chart.percentage.verticalPosition" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="horizontalPosition" attr="style.chart.percentage.horizontalPosition" type="select" defaultVal="left" :options="['left', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
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
      </BaseDetails>
  </BaseDetails>
  </BaseDetails>
</code>
            </template>
            <template #tab2>
              <ExposedMethods
                component="VueUiTiremarks"
                getImage
                :names="[
                  'generatePdf',
                  'generateImage'
                ]"
              />
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiTiremarks"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <template #tab6>
              <ThemesVueUiTiremarks />
            </template>
        </Box>
    </div>
</template>