<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import CodeParser from "./CodeParser.vue";
import ConfirmCopy from "../ConfirmCopy.vue";
import BaseCard from "../BaseCard.vue";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);

const dataset = ref([
  {
    name: "Serie 1",
    values: [100],
  },
  {
    name: "Serie 2",
    values: [200],
  },
  {
    name: "Serie 3",
    values: [300, 1],
    comment: "A comment for this specific datapoint",
  },
]);

const darkModeConfig = ref({
  responsive: false,
  useBlurOnHover: true,
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      useGradient: true,
      gradientIntensity: 40,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      layout: {
        curvedMarkers: true,
        labels: {
          dataLabels: {
            show: true,
            useLabelSlots: false,
            hideUnderValue: 3,
            prefix: "",
            suffix: "",
          },
          value: {
            rounding: 0,
            show: true,
          },
          percentage: {
            color: "#CCCCCC",
            bold: true,
            fontSize: 18,
          },
          name: {
            color: "#CCCCCC",
            bold: false,
            fontSize: 14,
          },
          hollow: {
            show: true,
            total: {
              show: true,
              bold: false,
              fontSize: 18,
              color: "#CCCCCC",
              text: "Total",
              offsetY: -16,
              value: {
                color: "#CCCCCC",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: -12,
                rounding: 0,
              },
            },
            average: {
              show: true,
              bold: false,
              fontSize: 18,
              color: "#CCCCCC",
              text: "Average",
              offsetY: 0,
              value: {
                color: "#CCCCCC",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: 6,
                rounding: 0,
              },
            },
          },
        },
        donut: {
          strokeWidth: 64,
          borderWidth: 2,
          useShadow: false,
          shadowColor: "#1A1A1A",
        },
      },
      comments: {
        show: true,
        showInTooltip: true,
        width: 100,
        offsetX: 0,
        offsetY: 0,
      },
      legend: {
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
      },
      title: {
        text: "Title",
        color: "#FAFAFA",
        fontSize: 20,
        bold: true,
        textAlign: "center",
        paddingLeft: 0,
        paddingRight: 0,
        subtitle: {
          color: "#CCCCCC",
          text: "Subtitle",
          fontSize: 16,
          bold: false,
        },
      },
      tooltip: {
        show: true,
        color: "#CCCCCC",
        backgroundColor: "#1A1A1A",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        customFormat: null,
        borderRadius: 4,
        borderColor: "#3A3A3A",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
      },
    },
  },
  userOptions: {
    show: true,
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      labels: true,
      fullscreen: true,
    },
    buttonTitles: {
      open: "Open options",
      close: "Close options",
      tooltip: "Toggle tooltip",
      pdf: "Download PDF",
      csv: "Download CSV",
      img: "Download PNG",
      table: "Toggle table",
      labels: "Toggle labels",
      fullscreen: "Toggle fullscreen",
    },
  },
  table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
      series: "Series",
      value: "Value",
      percentage: "Percentage",
    },
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
    },
  },
});

const config = ref({
  responsive: false,
  useBlurOnHover: true,
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      useGradient: true,
      gradientIntensity: 40,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      layout: {
        labels: {
          dataLabels: {
            show: true,
            useLabelSlots: false,
            hideUnderValue: 3,
            prefix: "",
            suffix: "",
          },
          value: {
            rounding: 0,
            show: true,
          },
          percentage: {
            color: "#1A1A1A",
            bold: true,
            fontSize: 18,
          },
          name: {
            color: "#1A1A1A",
            bold: false,
            fontSize: 14,
          },
          hollow: {
            show: true,
            total: {
              show: true,
              bold: false,
              fontSize: 18,
              color: "#1A1A1A",
              text: "Total",
              offsetY: -16,
              value: {
                color: "#1A1A1A",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: -12,
                rounding: 0,
              },
            },
            average: {
              show: true,
              bold: false,
              fontSize: 18,
              color: "#1A1A1A",
              text: "Average",
              offsetY: 0,
              value: {
                color: "#1A1A1A",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: 6,
                rounding: 0,
              },
            },
          },
        },
        donut: {
          strokeWidth: 55,
          borderWidth: 2,
          useShadow: false,
          shadowColor: "#1A1A1A",
        },
      },
      comments: {
        show: true,
        showInTooltip: true,
        width: 100,
        offsetX: 0,
        offsetY: 0,
      },
      legend: {
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
      },
      title: {
        text: "Title",
        color: "#1A1A1A",
        fontSize: 20,
        bold: true,
        textAlign: "center",
        paddingLeft: 0,
        paddingRight: 0,
        subtitle: {
          color: "#565656",
          text: "Subtitle",
          fontSize: 16,
          bold: false,
        },
      },
      tooltip: {
        show: true,
        color: "#1A1A1A",
        backgroundColor: "#F3F4F6",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        customFormat: null,
        borderRadius: 4,
        borderColor: "#e1e5e8",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
      },
    },
  },
  userOptions: {
    show: true,
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      labels: true,
      fullscreen: true,
    },
    buttonTitles: {
      open: "Open options",
      close: "Close options",
      tooltip: "Toggle tooltip",
      pdf: "Download PDF",
      csv: "Download CSV",
      img: "Download PNG",
      table: "Toggle table",
      labels: "Toggle labels",
      fullscreen: "Toggle fullscreen",
    },
  },
  table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
      series: "Series",
      value: "Value",
      percentage: "Percentage",
    },
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none",
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
    },
  },
});

const title = ref({
  en: "A watermark can be added on most big charts. This watermark can be set to be visible at all times, or only on the PDF and PNG downloads.",
  fr: `Un filigrane peut être ajouté sur la plupart des grands graphiques. Ce filigrane peut être configuré pour être visible à tout moment, ou uniquement sur les téléchargements PDF et PNG.`,
  pt: `Uma marca d'água pode ser adicionada na maioria dos gráficos grandes. Esta marca d'água pode ser configurada para ficar visível o tempo todo ou apenas nos downloads de PDF e PNG.`,
  de: "Den meisten großen Diagrammen kann ein Wasserzeichen hinzugefügt werden. Dieses Wasserzeichen kann so eingestellt werden, dass es jederzeit oder nur bei PDF- und PNG-Downloads sichtbar ist.",
  zh: "可以在大多数大图表上添加水印。该水印可以设置为始终可见，或仅在 PDF 和 PNG 下载中可见。",
  ja: "ウォーターマークは、ほとんどの大きなチャートに追加できます。このウォーターマークは、常に表示されるように設定することも、PDF および PNG のダウンロード時にのみ表示されるように設定することもできます。",
  es: "Se puede agregar una marca de agua en la mayoría de los gráficos grandes. Esta marca de agua se puede configurar para que sea visible en todo momento o solo en las descargas de PDF y PNG.",
  ko: "대부분의 큰 차트에는 워터마크를 추가할 수 있습니다. 이 워터마크는 항상 표시되도록 설정하거나 PDF 및 PNG 다운로드에만 표시되도록 설정할 수 있습니다.",
  ar: "يمكن إضافة علامة مائية على معظم المخططات الكبيرة. يمكن ضبط هذه العلامة المائية لتكون مرئية في جميع الأوقات، أو فقط عند تنزيل ملفات PDF وPNG.",
});

const comment1 = ref({
  en: "Always show the watermark:",
  fr: `Afficher toujours le filigrane :`,
  pt: `Sempre mostre a marca d'água:`,
  de: "Zeigen Sie immer das Wasserzeichen an:",
  zh: "始终显示水印：",
  ja: "常に透かしを表示します:",
  es: "Mostrar siempre la marca de agua:",
  ko: "항상 워터마크 표시:",
  ar: "إظهار العلامة المائية دائمًا:",
});

const comment2 = ref({
  en: "Or make it only visible on PDF and PNG download:",
  fr: `Ou rendez-le visible uniquement sur les téléchargements PDF et PNG :`,
  pt: "Ou torne-o visível apenas no download de PDF e PNG:",
  de: "Oder machen Sie es nur beim PDF- und PNG-Download sichtbar:",
  zh: "或者使其仅在 PDF 和 PNG 下载中可见：",
  ja: "または、PDF および PNG のダウンロードでのみ表示されるようにします。",
  es: "O hazlo solo visible en descargas PDF y PNG:",
  ko: "또는 PDF 및 PNG 다운로드에서만 표시되도록 설정하세요.",
  ar: "أو اجعله مرئيًا فقط على تنزيل PDF وPNG:",
});

const codeWatermarkAlways = ref(`<!-- ${comment1.value[store.lang]} -->
<VueUiDonut
  :dataset="dataset"
  :config="config"
>
    <template #watermark>
        <div class="text-gray-500 -rotate-12 text-[90px] opacity-30 mx-auto">
            WATERMARK
        </div>
    </template>
</VueUiDonut>
`)

const codeWatermarkPrintOnly = ref(`<!-- ${comment2.value[store.lang]} -->
<VueUiDonut
  :dataset="dataset"
  :config="config"
>
    <template #watermark="{ isPrinting }">
        <div v-if="isPrinting " class="text-gray-500 -rotate-12 text-[90px] opacity-30 mx-auto">
            WATERMARK
        </div>
    </template>
</VueUiDonut>
`)

</script>

<template>
  <Suspense>
    <template #default>
      <div class="w-full max-w-[800px] overflow-hidden mx-auto px-4">
        <div class="my-6" dir="auto">
          {{ title[store.lang] }}
        </div>
        <BaseCard>
          <VueUiDonut
            :dataset="dataset"
            :config="isDarkMode ? darkModeConfig : config"
          >
            <template #watermark="{ isPrinting }">
              <div
                class="text-gray-500 -rotate-12 text-[90px] opacity-30 mx-auto"
              >
                WATERMARK
              </div>
            </template>
          </VueUiDonut>
        </BaseCard>
        <div class="my-6 w-full bg-[#2A2A2A] text-gray-300 p-4 rounded-md text-xs overflow-auto">
          <CodeParser :content="codeWatermarkAlways" language="html" @copy="store.copy()"/>
          <CodeParser :content="codeWatermarkPrintOnly" language="html" @copy="store.copy()"/>
        </div>
      </div>
    </template>
    <template #fallback>
      <BaseSpinner />
    </template>
  </Suspense>
  <ConfirmCopy/>
</template>


