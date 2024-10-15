<script setup>
import { ref, computed } from "vue";

defineProps({
  title: {
    type: String,
  },
});
</script>

<template>
  <div class="px-[24px] max-w-[1200px] mx-auto my-4 text-2xl" dir="auto">
    {{ title }}
  </div>
  <div class="px-[24px] max-w-[1200px] mx-auto my-4">
    <slot name="before" />
  </div>
  <div
    class="max-w-[1200px] flex flex-col lg:flex-row gap-4 justify-center place-items-center mx-auto bg-gray-200 dark:bg-[#FFFFFF10] p-4 rounded-md shadow-md"
    style="width: calc(100% - 48px)"
  >
    <div
      class="bg-black p-4 text-gray-300 text-xs w-full mx-auto max-w-[600px] overflow-auto rounded-md"
    >
      <pre>
<code>
<slot name="code"/>
</code>
</pre>
    </div>

    <div class="w-full max-w-[600px]">
      <slot name="chart" />
    </div>
  </div>
  <div class="px-[24px] max-w-[1200px] mx-auto my-4">
    <slot name="after" />
  </div>
</template>
