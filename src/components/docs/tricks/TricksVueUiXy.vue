<script setup>
import { ref, computed } from "vue";
import BaseTipsAndTricks from "../../BaseTipsAndTricks.vue";
import BaseTip from "../BaseTip.vue";
import { useMainStore } from "../../../stores";
import CodeParser from "../../customization/CodeParser.vue";

const store = useMainStore();

const tricks = ref([
    {
        title: {
            en: "How to display x-axis labels with a nice modulo ?",
            fr: "",
            pt: "",
            de: "",
            es: "",
            zh: "",
            ja: "",
            ko: "",
            ar: "",
        },
        snippet: `const dataset = computed<VueUiXyDatasetItem[]>(() => []) // your dataset

const NUMBER_OF_XAXIS_TICKS = 6;

const MAX_SERIES_LENGTH = computed(() => {
  return Math.max(...dataset.value.map(dp => dp.series.length))
});

const modulo = computed(() => {
  return Math.max(1, Math.round(MAX_SERIES_LENGTH.value) / NUMBER_OF_AXIS_TICKS)
});

const config = computed<VueUiXyConfig>(() => ({
  chart: {
    grid: {
      labels: {
        xAxisLabels: {
          showOnlyAtModulo: true,
          modulo: modulo.value
        }
      }
    }
  }
}));`,
    },
]);
</script>

<template>
    <div>
        <BaseTipsAndTricks>
            <BaseTip v-for="(trick, i) in tricks" :key="`trick_${i}`">
                <template #title="{ isOpen, color }">
                    {{ trick.title[store.lang] }}
                </template>
                <template #content="{ isOpen, backgroundColor, color }">
                    <CodeParser
                        :content="trick.snippet"
                        language="javascript"
                        @copy="store.copy()"
                    />
                </template>
            </BaseTip>
        </BaseTipsAndTricks>
    </div>
</template>
