<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiRelationCircle from "../themes/ThemesVueUiRelationCircle.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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

const dataset = ref([
  {
    id: "01",
    label: "Lorem",
    relations: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    weights: [5, 3, 10, 2, 9, 3, 1, 2, 3, 7, 1],
    color: "#eb4034",
  },
  {
    id: "02",
    label: "Ipsum",
    relations: ["01", "03", "07", "06", "07"],
    weights: [3, 2, 9, 7, 1],
    color: "#e0992d",
  },
  {
    id: "03",
    label: "Dolor",
    relations: ["01", "02"],
    weights: [2, 5],
    color: "#decc2c",
  },
  {
    id: "04",
    label: "Consectetur",
    relations: ["01", "05", "10"],
    weights: [2, 1, 4],
    color: "#a8de2a",
  },
  {
    id: "05",
    label: "Amet",
    relations: ["01", "04", "07", "10"],
    weights: [2, 3, 4, 5],
    color: "#5ed622",
  },
  {
    id: "06",
    label: "Rherum",
    relations: ["01", "02"],
    weights: [4, 1],
    color: "#21d92d",
  },
  {
    id: "07",
    label: "Delecta",
    relations: ["01", "02", "08", "12"],
    weights: [4, 8, 2, 1],
    color: "#23d97b",
  },
  {
    id: "08",
    label: "Nitimur",
    relations: ["01", "07", "12", "01"],
    weights: [7, 3, 2, 3],
    color: "#29d6c2",
  },
  {
    id: "09",
    label: "Vetitum",
    relations: ["01"],
    weights: [1],
    color: "#2aacdb",
  },
  {
    id: "10",
    label: "Monumentum",
    relations: ["01", "04", "05"],
    weights: [4, 1, 4],
    color: "#295bd9",
  },
  {
    id: "11",
    label: "Aere",
    relations: ["01"],
    weights: [3],
    color: "#523ed6",
  },
  {
    id: "12",
    label: "Perennius",
    relations: ["01", "07", "08"],
    weights: [8, 1, 1],
    color: "#8235db",
  },
]);

const config = ref({
  responsive: false,
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
            allowTaint: true,
            backgroundColor: '#FFFFFF',
            useCORS: true,
            onclone: null,
            scale: 2,
            logging: false
        },
  },
  style: {
    backgroundColor: "#f3f4f6",
    color: "#2D353C",
    fontFamily: "inherit",
    size: 400,
    limit: 50,
    animation: {
      show: true,
      speedMs: 300,
    },
    labels: {
      color: "#2D353C",
      fontSize: 10,
    },
    weightLabels: {
      show: true,
      size: 8,
      prefix: '',
      suffix: '',
      rounding: 0
    },
    links: {
      curved: false,
      maxWidth: 3,
    },
    circle: {
      radiusProportion: 0.26,
      stroke: "#CCCCCC",
      strokeWidth: 1,
      offsetY: 0,
    },
    plot: {
      radius: 2,
      useSerieColor: true,
      color: "#2D353C",
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
});

const darkModeConfig = ref({
  responsive: false,
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
            allowTaint: true,
            backgroundColor: '#FFFFFF',
            useCORS: true,
            onclone: null,
            scale: 2,
            logging: false
        },
  },
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    size: 400,
    limit: 50,
    animation: {
      show: true,
      speedMs: 300,
    },
    labels: {
      color: "#CCCCCC",
      fontSize: 10,
    },
    weightLabels: {
      show: true,
      size: 8,
      prefix: '',
      suffix: '',
      rounding: 0
    },
    links: {
      curved: false,
      maxWidth: 3,
    },
    circle: {
      radiusProportion: 0.26,
      stroke: "#565656",
      strokeWidth: 1,
      offsetY: 0,
    },
    plot: {
      radius: 2,
      useSerieColor: true,
      color: "#FAFAFA",
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
  let selBox = document.createElement("textarea");
  selBox.style.position = "fixed";
  selBox.style.left = "0";
  selBox.style.top = "0";
  selBox.style.opacity = "0";
  selBox.value = JSON.stringify(conf);
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand("copy");
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
  return `type VueUiRelationCircleDatasetItem = {
  id: string | number
  label: string
  relations: (string | number)[] // ${translations.value.docs.comments.relationCircle.relations[store.lang]}
  weights?: number[] // ${translations.value.docs.comments.relationCircle.weight[store.lang] }
  color?: string
}`
})

const codeDataset = ref(`const dataset: VueUiRelationCircleDatasetItem[] = [
  {
    id: "01",
    label: "Lorem",
    relations: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    weights: [5, 3, 10, 2, 9, 3, 1, 2, 3, 7, 1],
    color: "#eb4034",
  },
  {
      id: "02",
      label: "Ipsum",
      relations: ["01", "03", "07", "06", "07"],
      weights: [3, 2, 9, 7, 1],
      color: "#e0992d",
  },
  {
      id: "03",
      label: "Dolor",
      relations: ["01", "02"],
      weights: [2, 5],
      color: "#decc2c",
  },
  {
      id: "04",
      label: "Consectetur",
      relations: ["01", "05", "10"],
      weights: [2, 1, 4],
      color: "#a8de2a",
  },
  {
      id: "05",
      label: "Amet",
      relations: ["01", "04", "07", "10"],
      weights: [2, 3, 4, 5],
      color: "#5ed622",
  },
  {
      id: "06",
      label: "Rherum",
      relations: ["01", "02"],
      weights: [4, 1],
      color: "#21d92d",
  },
  {
      id: "07",
      label: "Delecta",
      relations: ["01", "02", "08", "12"],
      weights: [4, 8, 2, 1],
      color: "#23d97b",
  },
  {
      id: "08",
      label: "Nitimur",
      relations: ["01", "07", "12", "01"],
      weights: [7, 3, 2, 3],
      color: "#29d6c2",
  },
  {
      id: "09",
      label: "Vetitum",
      relations: ["01"],
      weights: [1],
      color: "#2aacdb",
  },
  {
      id: "10",
      label: "Monumentum",
      relations: ["01", "04", "05"],
      weights: [4, 1, 4],
      color: "#295bd9",
  },
  {
      id: "11",
      label: "Aere",
      relations: ["01"],
      weights: [3],
      color: "#523ed6",
  },
  {
      id: "12",
      label: "Perennius",
      relations: ["01", "07", "08"],
      weights: [8, 1, 1],
      color: "#8235db",
  }
]`)

</script>

<template>
  <div>
    <BaseDocTitle name="VueUiRelationCircle" />

    <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.relationCircle[store.lang] }}
        </p>

    <BaseDocHeaderActions
      targetLink="vue-ui-relation-circle"
      targetMaker="VueUiRelationCircle"
      :configSource="mainConfig.vue_ui_relation_circle"
    />

    <div :class="`transition-all mx-auto w-1/2`">
      <DocSnapper
        :isFixed="isFixed"
        :disabled="!isFixed || isMobile"
        @fixChart="fixChart"
        @resetDefault="resetDefault"
        @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
      >
        <VueUiRelationCircle
          :dataset="dataset"
          :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
          :key="key"
        />
      </DocSnapper>
    </div>

    <Rater itemId="vue_ui_relation_circle" />

    <Box showEmits showSlots showThemes showResponsive schema="vue_ui_relation_circle">
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
          <button
            @click="resetDefault"
            class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all"
          >
            {{ translations.docs.reset[store.lang] }}
          </button>
          <button
            @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
            class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"
          >
            <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
          </button>
        </div>

        <div class="mt-4">
          TS type: <code class="text-app-blue">VueUiRelationCircleConfig</code>
        </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiRelationCircleConfig" equal>
    <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span> 
    <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
    <BaseDetails attr="style">
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="color" attr="style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <span>fontFamily: "inherit",</span>
      <BaseAttr name="size" attr="style.size" type="number" defaultVal="400" :min="200" :max="1000" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="limit" attr="style.limit" type="range" defaultVal="50" :min="3" :max="180" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" :comment="translations.docs.comments.relationCircle.limit[store.lang]"/>
      <BaseDetails attr="animation" :level="2" title="style.animation">
        <BaseAttr name="show" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Animation visible when clicking a word"/>
        <BaseAttr name="speedMs" attr="style.animation.speedMs" type="number" defaultVal="300" :min="0" :max="1000" :step="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/> 
      </BaseDetails>
      <BaseDetails attr="circle" :level="2" title="style.circle">
        <BaseAttr name="radiusProportion" attr="style.circle.radiusProportion" type="range" defaultVal="0.2" :min="0.05" :max="0.4" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate" />
        <BaseAttr name="stroke" attr="style.circle.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeWidth" attr="style.circle.strokeWidth" type="number" defaultVal="1" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="offsetY" attr="style.circle.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="labels" :level="2" title="style.labels">
        <BaseAttr name="color" attr="style.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.labels.fontSize" type="number" defaultVal="10" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="weightLabels" :level="2" title="style.weightLabels">
        <BaseAttr name="show" attr="style.weightLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="size" attr="style.weightLabels.size" type="number" defaultVal="8" :min="2" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
        <BaseAttr name="prefix" attr="style.weightLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="suffix" attr="style.weightLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="rounding" attr="style.weightLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="links" :level="2" title="style.links">
        <BaseAttr name="curved" attr="style.links.curved" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="maxWidth" attr="style.links.maxWidth" type="number" defaultVal="3" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="plot" :level="2" title="style.plot">
        <BaseAttr name="radius" attr="style.plot.radius" type="range" defaultVal="2" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useSerieColor" attr="style.plot.useSerieColor" type="boolean" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.plot.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="paddingLeft" attr="style.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="paddingRight" attr="style.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
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
          <BaseAttr name="allowTaint" attr="userOptions.print.allowTaint" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="backgroundColor" attr="userOptions.print.backgroundColor" type="string" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Apply a background on pdf and img when chart background is transparent"/>
          <BaseAttr name="useCORS" attr="userOptions.print.useCORS" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <span>onclone: null,</span><BaseComment>Modify the document before the print occurs (see html2canvas docs)</BaseComment>
          <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
          <BaseAttr name="logging" attr="userOptions.print.logging" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
  </BaseDetails>
  </BaseDetails>
</code>
      </template>
      <template #tab2>
        <ExposedMethods
          component="VueUiRelationCircle"
          :names="[
            'generatePdf',
            'generateImage'
          ]"
        />
      </template>

      <template #tab3>
        <BaseSlotDocumenter
            componentName="VueUiRelationCircle"
            :types="[
                'svg',
                'watermark',
                'source',
                'chart-background'
            ]" 
        />
            </template>

            <template #tab6>
              <ThemesVueUiRelationCircle />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiRelationCircle
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
