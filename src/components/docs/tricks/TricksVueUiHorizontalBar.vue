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
            en: "How to have bars height constant regardless of the number of data points ?",
            fr: "Comment garder une hauteur de barres constante quel que soit le nombre de points de données ?",
            pt: "Como manter a altura das barras constante, independentemente do número de pontos de dados?",
            de: "Wie kann die Höhe der Balken unabhängig von der Anzahl der Datenpunkte konstant gehalten werden?",
            es: "¿Cómo mantener constante la altura de las barras independientemente del número de puntos de datos?",
            zh: "如何让柱条高度保持不变，而不受数据点数量的影响？",
            ja: "データポイントの数に関係なく、バーの高さを一定に保つには？",
            ko: "데이터 포인트 수와 관계없이 막대 높이를 일정하게 유지하려면 어떻게 해야 하나요?",
            ar: "كيف يمكن الحفاظ على ارتفاع الأشرطة ثابتًا بغض النظر عن عدد نقاط البيانات؟",
        },
        snippet: `// Use this property in \`config.style.chart.height\`
const chartHeight = computed(() => {
  // Required: compensate fixed internal padding 
  const imposedPadding = 24;

  // Your preferred fixed bar height
  const unitHeight = 26;

  // Required: fallback when there is a single datapoint in the dataset. Use your own value.
  const minUnitHeight = 36;
  
  const baseHeight = dataset.value.length * unitHeight + imposedPadding;
  return Math.max(minUnitHeight, baseHeight);
})`,
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
