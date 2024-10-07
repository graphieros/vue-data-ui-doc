<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiThermometer from "../themes/ThemesVueUiThermometer.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseDocActions from "./BaseDocActions.vue";
import BaseSpinner from "../BaseSpinner.vue";

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
    buttons: {
            pdf: true,
            img: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
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
    buttons: {
            pdf: true,
            img: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
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

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})


</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartThermometer" stroke="#42d392" :strokeWidth="1.5" />
            VueUiThermometer
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.thermometer[store.lang] }}
        </p>
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

        <BaseDocActions
          targetLink="vue-ui-thermometer"
          targetMaker="VueUiThermometer"
          :configSource="mainConfig.vue_ui_thermometer"
        />

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
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <span>customPalette: []; // string[]</span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
        <span>height: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.height" :min="100" :max="360"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.height" :min="100" :max="360"/>, (default: 360)</span>
        <BaseDetails attr="animation" :level="3" title="style.chart.animation">
          <span> use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)</span>
          <span> speedMs: <input v-if="isDarkMode" type="range" min="50" max="1000" step="50" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.speedMs"><input v-else type="range" min="50" max="1000" step="50" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.speedMs"></span>
        </BaseDetails>
        <BaseDetails attr="graduations" :level="3" title="style.chart.graduations">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.show" @change="forceChartUpdate()">, (default: true)</span>
          <span>sides: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.graduations.sides"><option value="both">both</option><option value="left">left</option><option value="right">right</option><option value="none">none</option></select><select v-else v-model="mutableConfig.style.chart.graduations.sides"><option value="both">both</option><option value="left">left</option><option value="right">right</option><option value="none">none</option></select> , (default: "both")</span>
          <span> stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.graduations.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.graduations.stroke">, (default: "#e1e5e8")</span>
          <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.graduations.strokeWidth" :min="1" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.graduations.strokeWidth" :min="1" :max="24"/>, (default: 1)</span>
          <span>showIntermediate: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.showIntermediate" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.showIntermediate" @change="forceChartUpdate()">, (default: true)</span>
          <BaseDetails attr="gradient" :level="4" title="style.chart.graduations.gradient">
            <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.gradient.show" @change="forceChartUpdate()">, (default: true)</span>
            <span>intensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.gradient.intensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.gradient.intensity">, (default: 20)</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="label" :level="3" title="style.chart.label">
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.label.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.label.fontSize" :min="8" :max="42" />, (default: 20)</span>
          <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.label.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.label.rounding" :min="0" :max="6" />, (default: 1)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.label.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.label.bold" @change="forceChartUpdate()">, (default: true)</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.label.color"><input v-else type="color" v-model="mutableConfig.style.chart.label.color">, (default: "#2D353C")</span>
          <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.label.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.label.prefix">, (default: "")</span>
          <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.label.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.label.suffix">, (default: "")</span>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.chart.padding">
          <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.top" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.top" :min="0" :max="100"/>, (default: 12)</span>
          <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.right" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.right" :min="0" :max="100"/>, (default: 64)</span>
          <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.bottom" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.bottom" :min="0" :max="100"/>, (default: 12)</span>
          <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.left" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.left" :min="0" :max="100"/>, (default: 64)</span>
        </BaseDetails>
        <BaseDetails attr="thermometer" :level="3" title="style.chart.thermometer">
          <span>width: <input v-if="isDarkMode" type="number" min="10" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.thermometer.width" @change="forceChartUpdate"><input v-else type="number" min="10" max="100" step="1" v-model="mutableConfig.style.chart.thermometer.width" @change="forceChartUpdate">, (default: 48)</span>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")</span>
        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)</span>
        <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select></span>
        <span>paddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
        <span>paddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")</span>
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
        </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
        <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
        <span> pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
        <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
        <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
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
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiThermometer
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiThermometer&gt;
</code>
</pre>                    

            </template>

            <template #tab6>
              <ThemesVueUiThermometer />
            </template>

        </Box>
    </div>
</template>