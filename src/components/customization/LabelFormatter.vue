<script setup>
import { ref, computed } from "vue";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";
import { useMainStore } from "../../stores";
import CodeParser from "./CodeParser.vue";

const store = useMainStore();
const translations = computed(() => store.translations);

const code = ref(`formatter: ({ value, config }) => {
  return \`my format:\`\${value.toLocaleString('de-DE')}\`;
}
`)
    
</script>

<template>
    <div class="px-4 max-w-[1200px] mx-auto mt-4 mb-8" dir="auto">
        {{ translations.formatter[store.lang] }}
    </div>

    <div
    class="max-w-[1200px] flex flex-col lg:flex-row gap-4 justify-center place-items-center mx-auto bg-gray-200 dark:bg-[#FFFFFF10] p-4 rounded-md shadow-md"
    style="width: calc(100% - 48px)"
  >
    <div
      class="bg-black p-4 text-gray-300 text-xs w-full overflow-auto rounded-md"
    >
    <CodeParser :content="code" language="javascript"/>
    </div>
</div>
</template>