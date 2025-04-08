<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucSparkline from "../useCases/uc-sparkline.vue"
import ThemesVueUiSparkline from "../themes/ThemesVueUiSparkline.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
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
    period: "period 1",
    value: 0
  },
  {
    period: "period 2",
    value: 1
  },
  {
    period: "period 3",
    value: 0
  },
  {
    period: "period 4",
    value: 2
  },
  {
    period: "period 5",
    value: 1
  },
  {
    period: "period 6",
    value: 3
  },
  {
    period: "period 7",
    value: 2
  },
  {
    period: "period 8",
    value: 5
  },
  {
    period: "period 9",
    value: 3
  },
  {
    period: "period 10",
    value: 8
  },
  {
    period: "period 11",
    value: 5
  },
  {
    period: "period 12",
    value: 13
  },
  {
    period: "period 13",
    value: 8
  },
  {
    period: "period 14",
    value: 21
  },
  {
    period: "period 15",
    value: 13
  },
  {
    period: "period 16",
    value: 34
  },
  {
    period: "period 17",
    value: 21
  },
]);

const darkModeConfig = ref({
  type: 'line',
  downsample: {
        threshold: 500
    },
  style: {
    backgroundColor: "#FFFFFF05",
    fontFamily: "inherit",
    chartWidth: 290,
    scaleMin: null,
    scaleMax: null,
    padding: {
      top: 12,
      right: 0,
      bottom: 3,
      left: 0
    },
    animation: {
      show: true,
      animationFrames: 360,
    },
    line: {
      color: "#5f8bee",
      strokeWidth: 3,
      smooth: true,
    },
    bar: {
      borderRadius: 3,
      color: "#5f8bee",
    },
    zeroLine: {
      color: "#505050",
      strokeWidth: 1
    },
    plot: {
      show: true,
      radius: 4,
      stroke: "#FFFFFF",
      strokeWidth: 1
    },
    verticalIndicator: {
      show: true,
      strokeWidth: 1.5,
      color: "#5f8bee",
      strokeDasharray: 3
    },
    dataLabel: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      position: "left",
      fontSize: 48,
      bold: true,
      color: "#CCCCCC",
      roundingValue: 1,
      valueType: "latest",
      prefix: "",
      suffix: ""
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#FAFAFA",
      fontSize: 16,
      bold: true,
      text: "Title"
    },
    tooltip: {
      show: false,
      fontSize: 14,
      color: "#CCCCCC",
      backgroundColor: '#1A1A1A',
      offsetY: 0,
      borderWidth: 0,
      borderColor: '#3A3A3A',
      borderRadius: 2,
      backgroundOpacity: 100,
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
    }
  }
});

const config = ref({
  type: 'line',
  downsample: {
        threshold: 500
    },
  style: {
    backgroundColor: "#e1e5e8",
    fontFamily: "inherit",
    chartWidth: 290,
    scaleMin: null,
    scaleMax: null,
    padding: {
      top: 12,
      right: 0,
      bottom: 3,
      left: 0
    },
    animation: {
      show: true,
      animationFrames: 360
    },
    line: {
      color: "#5f8bee",
      strokeWidth: 3,
      smooth: true
    },
    bar: {
      borderRadius: 3,
      color: "#5f8bee",
    },
    zeroLine: {
      color: "#505050",
      strokeWidth: 1
    },
    plot: {
      show: true,
      radius: 4,
      stroke: "#FFFFFF",
      strokeWidth: 1
    },
    verticalIndicator: {
      show: true,
      strokeWidth: 1.5,
      color: "#5f8bee",
      strokeDasharray: 3
    },
    dataLabel: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      position: "left",
      fontSize: 48,
      bold: true,
      color: "#1A1A1A",
      roundingValue: 1,
      valueType: "latest",
      prefix: "",
      suffix: ""
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#1A1A1A",
      fontSize: 16,
      bold: true,
      text: "Title"
    },
    tooltip: {
      show: false,
      fontSize: 14,
      color: "#1A1A1A",
      backgroundColor: '#FFFFFF',
      offsetY: 0,
      borderWidth: 0,
      borderColor: '#E1E5E8',
      borderRadius: 2,
      backgroundOpacity: 100,
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
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

function randomizeData() {
  const arr = []
  for(let i = 0; i < 17; i += 1) {
    arr.push({
      period: `Period ${i+1}`,
      value: Math.random() * 100
    })
  }
  dataset.value = arr;
}

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiSparkline"/>
      <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
          {{ translations.docs.tooltips.sparkline[store.lang] }}
      </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-sparkline"
          targetMaker="VueUiSparkline"
          :configSource="mainConfig.vue_ui_sparkline"
        />

        <div :class="`transition-all mx-auto w-1/2`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <VueUiSparkline :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
            </VueUiSparkline>
          </DocSnapper>
          <BaseRandomButton @click="randomizeData"/>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-sparkline"/>
        </div>

        <Rater itemId="vue_ui_sparkline" />

        <Box showSlots showEmits showUseCases showThemes showResponsive schema="vue_ui_sparkline" signInfo="both">
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">VueUiSparklineDatasetItem[]</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

    <CodeParser
      language="javascript"
      @copy="store.copy()"
      :content="`
      type VueUiSparklineDatasetItem = {
        period: string
        value: number
      }
      `"
      class="my-6"
    />
         {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiSparklineDatasetItem[]</span> = [
    {
      period: "period 1",
      value: 0
    },
    {
      period: "period 2",
      value: -1
    },
    {
      period: "period 3",
      value: 2
    },
    {
      period: "period 4",
      value: -3
    },
    {
      period: "period 5",
      value: 4
    },
    {
      period: "period 6",
      value: -5
    },
    {
      period: "period 7",
      value: 6
    },
    {
      period: "period 8",
      value: -7
    },
    {
      period: "period 9",
      value: 8
    },
    {
      period: "period 10",
      value: -9
    },
    {
      period: "period 11",
      value: 10
    },
    {
      period: "period 12",
      value: -11
    },
    {
      period: "period 13",
      value: 12
    },
    {
      period: "period 14",
      value: -13
    },
    {
      period: "period 15",
      value: 14
    },
    {
      period: "period 16",
      value: -15
    },
    {
      period: "period 17",
      value: 16
    },
]
</code>
</pre>                
                </div>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                  <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiSparklineConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiSparklineConfig" equal>
    <span>responsive: false, <BaseComment>Since v2.3.44 - {{ translations.responsive[store.lang] }}</BaseComment></span>
    <span>theme: "", ("" | "zen" | "hack" | "concrete")</span>
    <BaseAttr name="type" attr="type" type="select" defaultVal="line" :options="['line', 'bar']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseDetails attr="downsample" :level="1">
        <BaseAttr name="threshold" attr="downsample.threshold" type="number" defaultVal="500" :min="100" :max="5000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Threshold above which LTTB algorithm kicks in"/>
    </BaseDetails>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="chartWidth" attr="style.chartWidth" type="number" defaultVal="290" :min="100" :max="400" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="scaleMin" attr="style.scaleMin" type="number" defaultVal="null" :min="-1000" :max="0" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.62 - Force the min scale"/>
      <BaseAttr name="scaleMax" attr="style.scaleMax" type="number" defaultVal="null" :min="0" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.62 - Force the max scale"/>
      <BaseDetails attr="padding" :level="2" title="style.padding">
        <BaseAttr name="top" attr="style.padding.top" type="number" defaultVal="12" :min="0" :max="36" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.62"/>
        <BaseAttr name="right" attr="style.padding.right" type="number" defaultVal="0" :min="0" :max="36" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.62"/>
        <BaseAttr name="bottom" attr="style.padding.bottom" type="number" defaultVal="3" :min="0" :max="36" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.62"/>
        <BaseAttr name="left" attr="style.padding.left" type="number" defaultVal="0" :min="0" :max="36" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.62"/>
      </BaseDetails>
      <BaseDetails attr="animation" :level="2" title="style.animation">
        <BaseAttr name="show" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="animationFrames" attr="style.animation.animationFrames" type="number" defaultVal="60" :min="0" :max="500" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="area" :level="2" title="style.area">
        <BaseAttr name="show" attr="style.area.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useGradient" attr="style.area.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="opacity" attr="style.area.opacity" type="number" defaultVal="30" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.area.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="bar" :level="2" title="style.bar">
        <BaseAttr name="borderRadius" attr="style.bar.borderRadius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.bar.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="dataLabel" :level="2" title="style.dataLabel">
        <BaseAttr name="show" attr="style.dataLabel.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="position" attr="style.dataLabel.position" type="select" defaultVal="left" :options="['left', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="offsetX" attr="style.dataLabel.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="offsetY" attr="style.dataLabel.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.dataLabel.fontSize" type="number" defaultVal="20" :min="8" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bold" attr="style.dataLabel.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.dataLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="roundingValue" attr="style.dataLabel.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueType" attr="style.dataLabel.valueType" type="select" defaultVal="latest" :options="['latest', 'sum', 'average']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="prefix" attr="style.dataLabel.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="suffix" attr="style.dataLabel.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
      </BaseDetails>
      <BaseDetails attr="line" :level="2" title="style.line">
        <BaseAttr name="color" attr="style.line.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeWidth" attr="style.line.strokeWidth" type="number" defaultVal="3" :min="0.1" :max="10" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="smooth" attr="style.line.smooth" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="plot" :level="2" title="style.plot">
        <BaseAttr name="show" attr="style.plot.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="radius" attr="style.plot.radius" type="number" defaultVal="4" :min="1" :max="20" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="stroke" attr="style.plot.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeWidth" attr="style.plot.strokeWidth" type="number" defaultVal="1" :min="0" :max="10" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <BaseAttr name="show" attr="style.title.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <BaseAttr name="show" attr="style.tooltip.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="backgroundColor" attr="style.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="offsetY" attr="style.tooltip.offsetY" type="number" :min="-30" :max="30" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderWidth" attr="style.tooltip.borderWidth" type="number" :min="0" :max="12" defaultVal="0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderColor" attr="style.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderRadius" attr="style.tooltip.borderRadius" type="number" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="backgroundOpacity" attr="style.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="verticalIndicator" :level="2" title="style.verticalIndicator">
        <BaseAttr name="show" attr="style.verticalIndicator.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="strokeWidth" attr="style.verticalIndicator.strokeWidth" type="number" defaultVal="1.5" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="style.verticalIndicator.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeDasharray" attr="style.verticalIndicator.strokeDasharray" type="number" defaultVal="3" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="zeroLine" :level="2" title="style.zeroLine">
        <BaseAttr name="color" attr="style.zeroLine.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="strokeWidth" attr="style.zeroLine.strokeWidth" type="number" defaultVal="1" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>
                
                </div>
            </template>

            <template #tab2>
@selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiSparkline
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiSparklineDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

            </template>

            
            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiSparkline"
                    :types="[
                        'svg',
                        'before',
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <template #tab5>
              <ucSparkline/>
            </template>

            <template #tab6>
              <ThemesVueUiSparkline />
            </template>

            <template #tab7>
              <ResponsiveUnit minHeight="100px" height="150px">
                <template #chart>
                  <VueUiSparkline 
                    :dataset="dataset" 
                    :config="isDarkMode ? 
                      {
                        ...mutableConfigDarkMode,
                        responsive: true
                      } 
                      : {
                        ...mutableConfig,
                        responsive: true
                        }" 
                    :key="key"
                  />
                </template>
              </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>