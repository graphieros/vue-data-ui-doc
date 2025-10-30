<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiVerticalBar from "../themes/ThemesVueUiVerticalBar.vue";
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
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import BaseTabLink from "../BaseTabLink.vue";
import { useRouter } from "vue-router";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

watch(() => store.isDarkMode, (_val) => {
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
  debug: false,
  loading: false,
  autoSize: true,
  responsive: false,
  useCssAnimation: true,
  events: {
    datapointEnter: null,
    datapointLeave: null,
    datapointClick: null
  },
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
        smooth: true,
        smoothForce: 0.18,
        smoothSnapThreshold: 0.25
      }
    }
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
        tooltip: true,
        pdf: true,
        img: true,
        csv: true,
        table: true,
        sort: true,
        fullscreen: true,
        annotator: true
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
        annotator: "Toggle annotator"
    },
    print: {
        scale: 2,
        orientation: 'auto',
        overflowTolerance: 0.2
    },
  },
  table: {
    show: false,
    useDialog: false,
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
  debug: false,
  loading: false,
  autoSize: true,
  responsive: false,
  useCssAnimation: true,
  events: {
    datapointEnter: null,
    datapointLeave: null,
    datapointClick: null
  },
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#2A2A2A",
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
        backgroundColor: "#2A2A2A",
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
        smooth: true,
        smoothForce: 0.18,
        smoothSnapThreshold: 0.25
      }
    }
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      sort: true,
      fullscreen: true,
      annotator: true
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
        annotator: "Toggle annotator"
    },
    print: {
        scale: 2,
        orientation: 'auto',
        overflowTolerance: 0.2
    },
  },
  table: {
    show: false,
    useDialog: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      outline: "none"
    },
    td: {
      backgroundColor: "#2A2A2A",
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

const renameWarning = ref({
  en: 'This component was renamed to VueUiHorizontalBar. Using the old VueUiVerticalBar will work in v3, but we recommend you switch to the new name.',
  fr: 'Ce composant a été renommé en VueUiHorizontalBar. L’ancien VueUiVerticalBar continuera de fonctionner en v3, mais nous vous recommandons de passer au nouveau nom.',
  pt: 'Este componente foi renomeado para VueUiHorizontalBar. Usar o antigo VueUiVerticalBar continuará funcionando na v3, mas recomendamos que você mude para o novo nome.',
  de: 'Diese Komponente wurde in VueUiHorizontalBar umbenannt. Die Verwendung von VueUiVerticalBar funktioniert in v3 weiterhin, wir empfehlen jedoch, zum neuen Namen zu wechseln.',
  zh: '该组件已重命名为 VueUiHorizontalBar。旧的 VueUiVerticalBar 在 v3 中仍可使用，但建议您切换到新名称。',
  jp: 'このコンポーネントは VueUiHorizontalBar に名称変更されました。従来の VueUiVerticalBar も v3 では動作しますが、新しい名称への移行をおすすめします。',
  es: 'Este componente pasó a llamarse VueUiHorizontalBar. El antiguo VueUiVerticalBar seguirá funcionando en la v3, pero te recomendamos cambiar al nuevo nombre.',
  ko: '이 컴포넌트는 VueUiHorizontalBar로 이름이 변경되었습니다. 기존 VueUiVerticalBar는 v3에서 계속 동작하지만, 새로운 이름으로 전환하길 권장합니다.',
  ar: 'تمت إعادة تسمية هذا المكوّن إلى VueUiHorizontalBar. سيستمر الاسم القديم VueUiVerticalBar بالعمل في الإصدار v3، لكن نوصي بالانتقال إلى الاسم الجديد.'
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
  dataset.value[0].children[0].value = Math.random() * 100;
  dataset.value[0].children[1].value = Math.random() * 65;
  dataset.value[0].value = dataset.value[0].children.map(c => c.value).reduce((a, b) => a + b, 0)
  
  dataset.value[1].value = Math.random() * 300;
  dataset.value[2].value = Math.random() * 250;
  dataset.value[3].value = Math.random() * 200;
  
  dataset.value[4].children[0].value = Math.random() * 100;
  dataset.value[4].children[1].value = Math.random() * 100;
  dataset.value[4].children[2].value = Math.random() * 100;
  dataset.value[4].value = dataset.value[4].children.map(c => c.value).reduce((a, b) => a + b, 0)
}

const dsTypeCode = computed(() => {
  return `type VueUiHorizontalBarDatasetItem = {
  name: string;
  value: number;
  color: string; // ${translations.value.docs.comments.xy.color[store.lang]}
  children: Array<{  // ${translations.value.docs.comments.verticalBar.breakdown[store.lang]}
    name: string;
    value: number;
  }>
}`
})

const codeDataset = ref(`const dataset: VueUiHorizontalBarDatasetItem[] = [
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
]`)

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiHorizontalBar" />

      <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
          {{ translations.docs.tooltips.verticalBar[store.lang] }}
      </p>
      <div class="mx-auto max-w-[500px] rounded-xl text-md text-[#c2410c] dark:text-app-orange p-4 border border-app-orange flex bg-[#ff370010] gap-4">
        <div class="h-[40px] w-[40px]">
          <VueUiIcon name="circleExclamation" stroke="#ff6600"/>
        </div>
        {{ renameWarning[store.lang] }}
      </div>

        <BaseDocHeaderActions
          targetLink="vue-ui-vertical-bar"
          targetMaker="VueUiHorizontalBar"
          :configSource="mainConfig.vue_ui_horizontal_bar"
        />

        <div :class="`transition-all mx-auto w-1/2`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <BaseCard>
              <VueUiHorizontalBar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </BaseCard>
          </DocSnapper>
          <BaseRandomButton @click="randomizeData"/>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-horizontal-bar"/>
        </div>

        <Rater itemId="vue_ui_horizontal_bar" />

        <Box ref="box" showEmits showSlots showTooltip showThemes showResponsive showPatterns showCallbacks schema="vue_ui_horizontal_bar" signInfo="both">
            <template v-slot:tab0>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

          <CodeParser
            language="typescript"
            @copy="store.copy()"
            :content="dsTypeCode"
            :title="translations.docs.datastructure[store.lang]"
            class="my-6"
        />  
                </div>

                <div class="w-full overflow-x auto">

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
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiHorizontalBarConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config:VueUiHorizontalBarConfig" equal>
    <span>theme: "", ("celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")</span>
    <span>customPalette: []; <span class="text-app-blue text-xs">// string[]</span></span>
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="autoSize" attr="autoSize" type="checkbox" defaultVal="true"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseDetails attr="events" :level="1">
      <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
      <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
      <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
    </BaseDetails>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <BaseDetails attr="bars" :level="4" title="style.chart.layout.bars">
            <BaseAttr name="sort" attr="style.chart.layout.bars.sort" type="select" defaultVal="desc" :options="['desc', 'asc', 'none']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" comment="The 'none' option is supported since v2.4.69"/>
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
                <div class="flex flex-row gap-2 place-items-center">
                    <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
                    <div class="min-w-[200px]">
                        <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                            Go to page
                        </BaseTabLink>
                    </div>
                </div>
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
          <div class="flex flex-row gap-2 place-items-center">
              <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
              <div class="min-w-[200px]">
                  <BaseTabLink :action="() => setActiveTab(4)" icon="tooltip">
                      Check out 'Custom tooltip' tab
                  </BaseTabLink>
              </div>
          </div>
          <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="smooth" attr="style.chart.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smoothForce" attr="style.chart.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="smoothSnapThreshold" attr="style.chart.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
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
      <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="sort" attr="userOptions.buttons.sort" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
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
        <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="callbacks" :level="2" title="userOptions.callbacks">
          <BaseTabLink :action="() => setActiveTab(11)" icon="lambda">
              Check out 'callbacks' tab
          </BaseTabLink>
      </BaseDetails>
      <BaseDetails attr="print" :level="2" title="userOptions.print">
        <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
        <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
        <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
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

            onMounted(async () => {
                verticalBarDataset.value = await verticalBarChart.value.getData();
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
                async mounted () {
                    this.verticalBarDataset = await this.$refs.verticalBarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>

                <ExposedMethods
                  component="VueUiHorizontalBar"
                  getImage
                  showHideSeries
                  :names="[
                    'generatePdf',
                    'generateCsv',
                    'generateImage',
                    'generateSvg',
                    'toggleTable',
                    'toggleSort'
                  ]"
                />
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                  componentName="VueUiHorizontalBar"
                  :types="[
                    'svg',
                    'legend',
                    'tooltip-before',
                    'tooltip-after',
                    'watermark',
                    'source',
                    'chart-background',
                    'pattern',
                    'user-menu',
                    'annotator-actions'
                  ]" 
              />
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

            <template #tab8>
              <VueUiVerticalBar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern :id="patternId" name="maze" stroke="#FFFFFF80" :strokeWidth="3" :scale="0.5"/>
                    </template>
              </VueUiVerticalBar>
            </template>

            <template #tab11>
              <UserOptionCallbacks
                  :items="[
                      'annotator',
                      'csv',
                      'fullscreen',
                      'img',
                      'pdf',
                      'table',
                      'sort',
                      'tooltip',
                      'svg'
                  ]"
              />
          </template>
        </Box>
    </div>
</template>