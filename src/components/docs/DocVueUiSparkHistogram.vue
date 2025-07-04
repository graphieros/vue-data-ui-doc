<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkHistogram from "../themes/ThemesVueUiSparkHistogram.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

const currentShape = ref('square');

const shapes = ref([
  "circle",
  "triangle",
  "square",
  "diamond",
  "pentagon",
  "hexagon",
  "star"
]);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
  {
    value: 1.2,
    valueLabel: "20%",
    timeLabel: "09:00",
    intensity: 0.2,
  },
  {
    value: 1.3,
    valueLabel: "50%",
    timeLabel: "10:00",
    intensity: 0.5,

  },
  {
    value: 1.1,
    valueLabel: "60%",
    timeLabel: "11:00",
    intensity: 0.6,

  },
  {
    value: 0.8,
    valueLabel: "70%",
    timeLabel: "12:00",
    intensity: 0.7,

  },
  {
    value: 2,
    valueLabel: "100%",
    timeLabel: "13:00",
    intensity: 1,

  },
  {
    value: 2.1,
    valueLabel: "100%",
    timeLabel: "14:00",
    intensity: 1,

  },
  {
    value: 2.3,
    valueLabel: "80%",
    timeLabel: "15:00",
    intensity: 0.8,

  },
  {
    value: 2.1,
    valueLabel: "70%",
    timeLabel: "16:00",
    intensity: 0.7,

  },
  {
    value: 0.9,
    valueLabel: "60%",
    timeLabel: "17:00",
    intensity: 0.6,

  },
  {
    value: 0.7,
    valueLabel: "50%",
    timeLabel: "18:00",
    intensity: 0.5,

  },
  {
    value: 0.3,
    valueLabel: "30%",
    timeLabel: "19:00",
    intensity: 0.3,

  },
  {
    value: 0.2,
    valueLabel: "20%",
    timeLabel: "20:00",
    intensity: 0.2,

  },
]);

const config = ref({
  style: {
    backgroundColor: "#F3F4F6",
    fontFamily: "inherit",
    animation: {
      show: true,
      speedMs: 500,
    },
    layout: {
      height: 160,
      width: 1200,
      padding: {
        top: 36,
        right: 0,
        left: 0,
        bottom: 64
      }
    },
    bars: {
      shape: currentShape.value,
      strokeWidth: 0,
      colors: {
        positive: "#5f8bee",
        negative: "#ff6400",
        gradient: {
          show: true
        }
      },
      borderRadius: 24,
      gap: 12
    },
    labels: {
      value: {
        fontSize: 24,
        color: "#2D353C",
        bold: true,
        rounding: 1,
        prefix: "",
        suffix: "",
        offsetY: -4
      },
      valueLabel: {
        fontSize: 24,
        color: "#2D353C",
        bold: false,
        rounding: 0
      },
      timeLabel: {
        fontSize: 24,
        color: "#2D353C",
        bold: false
      }
    },
    selector: {
      stroke: "#5f8bee",
      borderRadius: 12,
      strokeWidth: 2,
      strokeDasharray: 0
    },
    title: {
      textAlign: "left",
      text: "Rainfall in mm",
      color: "#2D353C",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "",
        fontSize: 12,
        bold: false
      }
    }
  }
});

const darkModeConfig = ref({
  style: {
    backgroundColor: "#1A1A1A00",
    fontFamily: "inherit",
    animation: {
      show: true,
      speedMs: 500,
    },
    layout: {
      height: 160,
      width: 1200,
      padding: {
        top: 36,
        right: 0,
        left: 0,
        bottom: 64
      }
    },
    bars: {
      shape: currentShape.value,
      strokeWidth: 0,
      colors: {
        positive: "#5f8bee",
        negative: "#ff6400",
        gradient: {
          show: true
        }
      },
      borderRadius: 24,
      gap: 12
    },
    labels: {
      value: {
        fontSize: 24,
        color: "#CCCCCC",
        bold: true,
        rounding: 1,
        prefix: "",
        suffix: "",
        offsetY: -4
      },
      valueLabel: {
        fontSize: 24,
        color: "#777777",
        bold: false,
        rounding: 0
      },
      timeLabel: {
        fontSize: 24,
        color: "#CCCCCC",
        bold: false
      }
    },
    selector: {
      stroke: "#5f8bee",
      borderRadius: 12,
      strokeWidth: 2,
      strokeDasharray: 0
    },
    title: {
      textAlign: "left",
      text: "Rainfall in mm",
      color: "#FAFAFA",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "",
        fontSize: 12,
        bold: false
      }
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
  return `type VueUiSparkHistogramDatasetItem = {
  value: number
  intensity?: number // (0 to 1)
  valueLabel?: string
  timeLabel?: string
}`
})

const codeDataset = ref(`const dataset: VueUiSparkHistogramDatasetItem[] = [
  {
    value: 1.2,
    valueLabel: "20%",
    timeLabel: "09:00",
    intensity: 0.2,
  },
  {
    value: 1.3,
    valueLabel: "50%",
    timeLabel: "10:00",
    intensity: 0.5,
  },
  {
    value: 1.1,
    valueLabel: "60%",
    timeLabel: "11:00",
    intensity: 0.6,
  },
  {
    value: 0.8,
    valueLabel: "70%",
    timeLabel: "12:00",
    intensity: 0.7,
  },
  {
    value: 2,
    valueLabel: "100%",
    timeLabel: "13:00",
    intensity: 1,
  },
  {
    value: 2.1,
    valueLabel: "100%",
    timeLabel: "14:00",
    intensity: 1,
  },
  {
    value: 2.3,
    valueLabel: "80%",
    timeLabel: "15:00",
    intensity: 0.8,
  },
  {
    value: 2.1,
    valueLabel: "70%",
    timeLabel: "16:00",
    intensity: 0.7,
  },
  {
    value: 0.9,
    valueLabel: "60%",
    timeLabel: "17:00",
    intensity: 0.6,
  },
  {
    value: 0.7,
    valueLabel: "50%",
    timeLabel: "18:00",
    intensity: 0.5,
  },
  {
    value: 0.3,
    valueLabel: "30%",
    timeLabel: "19:00",
    intensity: 0.3,
  },
  {
    value: 0.2,
    valueLabel: "20%",
    timeLabel: "20:00",
    intensity: 0.2,
  }
];`)

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiSparkHistogram" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.histogram[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-sparkhistogram"
          targetMaker="VueUiSparkHistogram"
          :configSource="mainConfig.vue_ui_sparkhistogram"
        />

        <div :class="`transition-all mx-auto sm:w-full max-w-[600px]`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <VueUiSparkHistogram :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
          </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-sparkhistogram"/>
        </div>
        
        <Rater itemId="vue_ui_sparkhistogram" />

        <Box showEmits showThemes showSlots schema="vue_ui_sparkhistogram" signInfo="positiveOnly">
            <template #tab0>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

    <CodeParser
      language="typescript"
      @copy="store.copy()"
      :content="dsTypeCode"
      :title="translations.docs.datastructure[store.lang]"
      class="my-6"
    />   

                <div class="w-full overflow-x-auto">
    <CodeParser
      language="typescript"
      @copy="store.copy()"
      :content="codeDataset"
      :title="translations.docs.example[store.lang]"
    />               
                </div>
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiSparkHistogramConfig</code>
                </div>

<div class="my-4">
  Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiSparkHistogramConfig" equal>
    <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
    <BaseDetails attr="style" :level="1">
      <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="animation" :level="2" title="style.animation">
        <BaseAttr name="show" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="speedMs" attr="style.animation.speedMs" type="range" defaultVal="500" :min="0" :max="1000" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="bars" :level="2" title="style.bars">
        <BaseAttr name="shape" attr="style.bars.shape" type="select" defaultVal="square" :options="shapes" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeWidth" attr="style.bars.strokeWidth" type="number" defaultVal="0" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderRadius" attr="style.bars.borderRadius" type="range" defaultVal="24" :min="0" :max="24" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="gap" attr="style.bars.gap" type="range" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="colors" :level="3" title="style.bars.colors">
          <BaseAttr name="positive" attr="style.bars.colors.positive" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseAttr name="negative" attr="style.bars.colors.negative" type="color" defaultVal="#DC3912" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseDetails attr="gradient" :level="4" title="style.bars.colors.gradient">
            <BaseAttr name="show" attr="style.bars.colors.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="labels" :level="2" title="style.labels">
        <BaseDetails attr="timeLabel" :level="3" title="style.labels.timeLabel">
          <BaseAttr name="fontSize" attr="style.labels.timeLabel.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.labels.timeLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.labels.timeLabel.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="value" :level="3" title="style.labels.value">
          <BaseAttr name="fontSize" attr="style.labels.value.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.labels.value.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.labels.value.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="rounding" attr="style.labels.value.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="prefix" attr="style.labels.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="suffix" attr="style.labels.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="offsetY" attr="style.labels.value.offsetY" type="number" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
        </BaseDetails>
        <BaseDetails attr="valueLabel" :level="3" title="style.labels.valueLabel">
          <BaseAttr name="fontSize" attr="style.labels.valueLabel.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.labels.valueLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.labels.valueLabel.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="rounding" attr="style.labels.valueLabel.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="layout" :level="2" title="style.layout">
        <BaseAttr name="height" attr="style.layout.height" type="number" defaultVal="96" :min="64" :max="600" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="padding" :level="3" title="style.layout.padding">
          <BaseAttr name="top" attr="style.layout.padding.top" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="right" attr="style.layout.padding.right" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bottom" attr="style.layout.padding.bottom" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="left" attr="style.layout.padding.left" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="selector" :level="2" title="style.selector">
        <BaseAttr name="stroke" attr="style.selector.stroke" type="color" defaultVal="#5F8BEE"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeWidth" attr="style.selector.strokeWidth" type="number" defaultVal="2" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="strokeDasharray" attr="style.selector.strokeDasharray" type="range" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderRadius" attr="style.selector.borderRadius" type="range" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="margin" attr="style.title.margin" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
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
  &lt;VueUiSparkHistogram
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiSparkHistogramDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiSparkHistogram"
                    :types="[
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <template #tab6>
              <ThemesVueUiSparkHistogram />
            </template>
        </Box>

    </div>
</template>