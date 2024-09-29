<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import ThemesVueUiTiremarks from "../themes/ThemesVueUiTiremarks.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

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
            <VueUiIcon name="chartTiremarks" stroke="#42d392" :strokeWidth="1.5" />
            VueUiTiremarks
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.tiremarks[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[450px]'} ${(mutableConfigDarkMode.style.chart.layout.display === 'vertical' && isDarkMode) || (mutableConfig.style.chart.layout.display === 'vertical' && !isDarkMode) ? 'max-w-[100px]' : ''}`">
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
                <VueUiTiremarks :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                    <div class="min-h-[300px]"></div>
                </template>
            </Suspense>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_tiremarks)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-tiremarks"/>
            <MakerLink to="VueUiTiremarks" />
        </div>

        <Box showEmits showSlots showThemes schema="vue_ui_tiremarks">
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
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
        <BaseDetails attr="animation" :level="3" title="style.chart.animation">
          <span> use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)</span>
          <span>speed: 1,</span>
          <span>acceleration: 1,</span>
        </BaseDetails>
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <span>display: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.layout.display"><option>horizontal</option><option>vertical</option></select><select v-else v-model="mutableConfig.style.chart.layout.display"><option>horizontal</option><option>vertical</option></select>, (default: "horizontal")</span>
          <span> crescendo: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.crescendo" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.crescendo" @change="forceChartUpdate()">, (default: false)</span>
          <span>curved: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.curved" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.curved" @change="forceChartUpdate()">, (default: false)</span>
          <span>curveAngleX: <input v-if="isDarkMode" type="range" min="1" max="30" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.curveAngleX"><input v-else type="range" min="1" max="30" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.curveAngleX">, (default: 10)</span>
          <span>curveAngleY: <input v-if="isDarkMode" type="range" min="1" max="30" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.curveAngleY"><input v-else type="range" min="1" max="30" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.curveAngleY">, (default: 10)</span>
          <span>activeColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.activeColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.activeColor">,  (default: "#5f8bee")</span>
          <span>inactiveColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.inactiveColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.inactiveColor">, (default: "#e1e5e8")</span>
          <BaseDetails attr="ticks" :level="4" title="style.chart.layout.ticks">
            <BaseDetails attr="gradient" :level="5" title="style.chart.layout.ticks.gradient">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.ticks.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.ticks.gradient.show" @change="forceChartUpdate()">, (default: true)</span>
              <span>shiftHueIntensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.ticks.gradient.shiftHueIntensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.ticks.gradient.shiftHueIntensity">, (default: 100)</span>
            </BaseDetails>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="percentage" :level="3" title="style.chart.percentage">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.percentage.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.percentage.show" @change="forceChartUpdate()">, (default: true)</span>
          <span>useGradientColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.percentage.useGradientColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.percentage.useGradientColor" @change="forceChartUpdate()">, (default: true)</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.percentage.color"><input v-else type="color" v-model="mutableConfig.style.chart.percentage.color">, (default: "#5f8bee")</span>
          <span>fontSize: <input v-if="isDarkMode" type="range" min="8" max="32" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.percentage.fontSize"><input v-else type="range" min="8" max="32" class="accent-app-blue" v-model="mutableConfig.style.chart.percentage.fontSize">, (default: 16)</span>
          <span> bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.percentage.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.percentage.bold" @change="forceChartUpdate()">, (default: true)</span>
          <span>rounding: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.percentage.rounding" @change="forceChartUpdate"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.percentage.rounding" @change="forceChartUpdate">, (default: 1)</span>
          <span>verticalPosition: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.percentage.verticalPosition"><option>top</option><option>bottom</option></select><select v-else v-model="mutableConfig.style.chart.percentage.verticalPosition"><option>top</option><option>bottom</option></select>, (default: "bottom")</span>
          <span>horizontalPosition: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.percentage.horizontalPosition"><option>left</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.percentage.horizontalPosition"><option>left</option><option>right</option></select>, (default: "left")</span>
        </BaseDetails>
        <BaseDetails attr="title" :level="3" title="style.chart.title">
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.color" @change="forceChartUpdate">, (default: "#2D353C")</span>
          <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
          <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color" @change="forceChartUpdate">, (default: "#A1A1A1")</span>
            <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text" @change="forceChartUpdate">, (default: "")</span>
            <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span> pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span> img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <span> open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
        <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
        <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
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
    &lt;VueUiTiremarks
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiTiremarks&gt;
</code>
</pre>                    

            </template>

            <template #tab6>
              <ThemesVueUiTiremarks />
            </template>
        </Box>
    </div>
</template>