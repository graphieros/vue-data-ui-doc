<script setup>
import { computed } from "vue";
import { useMainStore } from '../stores';

const props = defineProps({
    name: String,
    type: String,
    min: Number,
    max: Number,
    step: Number,
    defaultVal: [String, Number],
    tooltip: String
})

const store = useMainStore()

const isDarkMode = computed(() => store.isDarkMode);

const emit = defineEmits(['change'])
const modelValue = defineModel()

</script>

<template>
    <span class="relative"><code class="peer"><span class="select-none">{{ name }}:</span> <input class="accent-app-blue" :value="model" :type="type" :min="min" :max="max" :step="step" v-model="modelValue" @change="emit('change')">, (default: {{ defaultVal }})</code><div v-if="tooltip" class="absolute -top-[100px] left-0 peer-hover:flex hidden w-[100%] max-w-[300px] rounded shadow-md px-4 h-[84px] bg-white dark:bg-[#2A2A2A] border-app-blue border-2 text-xs place-items-center justify-center whitespace-break-spaces"><span><b>{{ name }}: </b>{{ tooltip }}</span><div class="absolute -bottom-[13px] left-4"><VueUiIcon name="triangleFill" class="rotate-180" stroke="#5f8bee" :size="14"/></div></div>
    </span>
</template>