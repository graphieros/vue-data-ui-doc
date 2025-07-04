<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";
import CodeParser from "./CodeParser.vue";
import ComponentsTable from "../docs/ComponentsTable.vue";
import { CheckIcon } from "vue-tabler-icons";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
  return store.translations;
});

const dataset = ref([
  {
    name: "Serie 1",
    values: [100]
  },
  {
    name: "Serie 2",
    values: [200]
  },
  {
    name: "Serie 3",
    values: [300, 1]
  },
]);

const darkModeConfig = ref({
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
            hideUnderValue: 3,
            prefix: "",
            suffix: ""
          },
          value: {
            rounding: 0,
            show: true,
          },
          percentage: {
            color: "#CCCCCC",
            bold: true,
            fontSize: 18
          },
          name: {
            color: "#CCCCCC",
            bold: false,
            fontSize: 14,
          },
          hollow: {
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
              }
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
              }
            }
          }
        },
        donut: {
          strokeWidth: 64,
          borderWidth: 2,
        },
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
        text: "",
        color: "#FAFAFA",
        fontSize: 20,
        bold: true,
        subtitle: {
          color: "#CCCCCC",
          text: "",
          fontSize: 16,
          bold: false
        }
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
      }
    }
  },
  userOptions: {
    show: false
  },
  translations: {
    total: "Total",
    average: "Average",
  },
  table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
      series: "Series",
      value: "Value",
      percentage: "Percentage"
    },
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0
    }
  }
});

const config = ref({
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
            hideUnderValue: 3,
            prefix: "",
            suffix: ""
          },
          value: {
            rounding: 0,
            show: true
          },
          percentage: {
            color: "#1A1A1A",
            bold: true,
            fontSize: 18
          },
          name: {
            color: "#1A1A1A",
            bold: false,
            fontSize: 14,
          },
          hollow: {
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
              }
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
              }
            }
          }
        },
        donut: {
          strokeWidth: 54,
          borderWidth: 2
        },
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
        text: "",
        color: "#1A1A1A",
        fontSize: 20,
        bold: true,
        subtitle: {
          color: "#565656",
          text: '',
          fontSize: 16,
          bold: false
        }
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
        customFormat: null
      }
    }
  },
  userOptions: {
    show: false
  },
  translations: {
    total: "Total",
    average: "Average",
  },
  table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
      series: "Series",
      value: "Value",
      percentage: "Percentage"
    },
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
      roundingPercentage: 0
    }
  }
});

const sparklineDataset = ref([
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

const darkModeConfigSparkline = ref({
  type: 'line',
  style: {
    backgroundColor: "#1A1A1A",
    fontFamily: "inherit",
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
      fontSize: 14,
      bold: false,
      text: "Evolution"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
    }
  }
});
const configSparkline = ref({
  type: 'line',
  style: {
    backgroundColor: "#F3F4F6",
    fontFamily: "inherit",
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
      fontSize: 14,
      bold: false,
      text: "Evolution"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
    }
  }
});

const code = ref(`<template>
  <VueUiDonut
    :dataset="dataset"
    :config="config"
  >
    <template #tooltip-before={ datapoint, seriesindex, series, config }">
      This content shows first
    </template>
    <template #tooltip-after="{ datapoint, seriesIndex, series, config }">
      This content shows last
    </template>
  </VueUiDonut>
</template>`)

</script>

<template>
  <div class="px-4 max-w-[1200px] mx-auto mt-4 mb-8" dir="auto">
    {{ translations.customization.tooltipSlot[store.lang] }}
  </div>

  <ComponentsTable :cols="['Component', 'Tooltip']" class="mx-auto">
      <template #th="{ col }">
          {{ col }}
      </template>

      <template #Component="{ row }">
          <div class="flex flex-row gap-2 place-items-center">
              <VueUiIcon :name="row.icon" :stroke="isDarkMode ? '#CCCCCC' : '#4A4A4A'" />
              <RouterLink :to="`/docs#${row.link}`" class="hover:underline">
                  <span class="text-gray-500">VueUi</span><span>{{ row.name.replaceAll("VueUi", "") }}</span>
              </RouterLink>
          </div>
      </template>

      <template #Tooltip="{ row }">
          <div class="w-full h-full flex justify-center" :style="{ background: row.tooltip ? '#42d39230' : 'transparent'}">
              <CheckIcon v-if="row.tooltip" :stroke="isDarkMode ? '#42d392': '#1d915d'" />
          </div>
      </template>
  </ComponentsTable>

  <BaseCustomizationBox>
    <template #code>
      <CodeParser :content="code" language="html" @copy="store.copy()"/>
    </template>
    <template #chart>
      <VueDataUi component="VueUiDonut" :dataset="dataset" :config="isDarkMode ? darkModeConfig : config">
        <template #tooltip-before>
          <div class="text-xs max-w-[200px] text-left border-b pb-2 mb-2">
            This comment was added inside the #tooltip-before slot.
          </div>
        </template>
        <template #tooltip-after>
          <div class="w-full max-w-[200px]">
            <div class="text-xs max-w-[200px] text-left pb-2 mb-2">
              This comment and chart are added inside the #tooltip-after slot.
            </div>
            <VueDataUi component="VueUiSparkline" :dataset="sparklineDataset"
              :config="isDarkMode ? darkModeConfigSparkline : configSparkline"></VueDataUi>
          </div>
        </template>
      </VueDataUi>
    </template>
  </BaseCustomizationBox>
</template>