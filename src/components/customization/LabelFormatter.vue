<script setup>
import { ref, computed } from "vue";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";
import { useMainStore } from "../../stores";
import CodeParser from "./CodeParser.vue";
import BaseCard from "../BaseCard.vue";

const store = useMainStore();
const translations = computed(() => store.translations);

const code = ref(`
formatter: ({ value, config }) => {
  return \`my format:\${value.toLocaleString('de-DE')}\`;
}
`)

const codeConfig = ref(`
// Example for labels in VueUiDonut

const configDonut = ref({
  style: {
    chart: {
      layout: {
        labels: {
          value: {
            formatter: ({ value, config }) => {
              return \`my format:\${value.toLocaleString('de-DE')}\`;
            }
          }
        }
      }
    }
  }
});
`)
    
</script>

<template>
    <div class="px-4 max-w-[1200px] mx-auto mt-4 mb-8" dir="auto">
        {{ translations.formatter[store.lang] }}
    </div>

    <BaseCard class="max-w-[1200px] mx-auto">
      <CodeParser :content="code" language="javascript" @copy="store.copy()"/>
      <CodeParser class="mt-4" :content="codeConfig" language="javascript" @copy="store.copy()"/>
    </BaseCard>
</template>