<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";

const store = useMainStore();

const translations = computed(() => {
  return store.translations;
});

const waffleDataset = ref([
  {
    name: "Serie 1",
    color: "#5f8bee",
    values: [100],
  },
  {
    name: "Serie 2",
    color: "#42d392",
    values: [200],
  },
  {
    name: "Serie 3",
    color: "#ff6400",
    values: [300, 1],
  },
]);

const waffleConfig = computed(() => {
  return {
    useBlurOnHover: true,
    useCustomCells: true,
    style: {
      fontFamily: "inherit",
      chart: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        layout: {
          labels: {
            dataLabels: {
              prefix: "",
              suffix: "",
            },
            captions: {
              show: false,
              showSerieName: false,
              serieNameAbbreviation: true,
              serieNameMaxAbbreviationSize: 3,
              fontSize: 12,
              showValue: true,
              showPercentage: true,
              roundingValue: 0,
              roundingPercentage: 0,
              offsetX: 0,
              offsetY: 0,
            },
          },
          grid: {
            size: 10,
            spaceBetween: 2,
            vertical: false,
          },
          rect: {
            rounded: true,
            rounding: 2,
            stroke: "#2D353C",
            strokeWidth: 1,
            useGradient: true,
            gradientIntensity: 40,
          },
        },
        title: {
          text: "Attendies satisfaction",
          color: "#2D353C",
          fontSize: 20,
          bold: true,
          subtitle: {
            color: "#A1A1A1",
            text: "Yearly meeting",
            fontSize: 16,
            bold: false,
          },
        },
        tooltip: {
          show: true,
          backgroundColor: "#FFFFFF",
          color: "#2D353C",
          fontSize: 14,
          showValue: true,
          showPercentage: true,
          roundingValue: 0,
          roundingPercentage: 0,
          customFormat: null,
        },
        legend: {
          show: true,
          bold: true,
          backgroundColor: "#FFFFFF",
          color: "#2D353C",
          fontSize: 14,
          roundingValue: 0,
          roundingPercentage: 0,
        },
      },
    },
    userOptions: {
      show: true,
    },
    table: {
      show: false,
      responsiveBreakpoint: 400,
      columnNames: {
        series: "Series",
        value: "Value",
        percentage: "Percentage",
      },
      th: {
        backgroundColor: "#FAFAFA",
        color: "#2D353C",
        outline: "none",
      },
      td: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        outline: "none",
        roundingValue: 0,
        roundingPercentage: 0,
      },
    },
  };
});
</script>

<template>
  <BaseCustomizationBox :title="`VueUiWaffle #cell slot`">
    <template #before>
      <p class="text-left" dir="auto">
        {{ translations.customization.otherSlots.waffle[store.lang] }}
      </p>
    </template>
    <template #code>
      <pre>
  &lt;VueUiWaffle
    :config="config"
    :dataset="dataset"
  &gt;
    &lt;template #cell="{ cell, isSelected }"&gt;
      &lt;div :style="`opacity:${isSelected ? 1 : 0.3}`"&gt;
        &lt;VueUiIcon
          v-if="cell.name === 'Serie 3'"
          name="moodFlat"
          size="40"
          :stroke="cell.color"
        /&gt;
        &lt;VueUiIcon
          v-if="cell.name === 'Serie 2'"
          name="moodHappy"
          size="40"
          :stroke="cell.color"
        /&gt;
        &lt;VueUiIcon
          v-if="cell.name === 'Serie 1'"
          name="smiley"
          size="40"
          :stroke="cell.color"
        /&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/VueUiWaffle&gt;
</pre>
    </template>
    <template #chart>
      <VueDataUi component="VueUiWaffle" :dataset="waffleDataset" :config="waffleConfig">
        <template #cell="{ cell, isSelected }">
          <div class="flex place-items-center justify-center transition-opacity h-full w-full"
            :style="`opacity: ${isSelected ? 1 : 0.3}`">
            <VueUiIcon v-if="cell.name === 'Serie 3'" name="moodFlat" :size="40" :stroke="cell.color" />
            <VueUiIcon v-if="cell.name === 'Serie 2'" name="moodHappy" :size="40" :stroke="cell.color" />
            <VueUiIcon v-if="cell.name === 'Serie 1'" name="smiley" :size="40" :stroke="cell.color" />
          </div>
        </template>
      </VueDataUi>
    </template>
  </BaseCustomizationBox>
</template>
