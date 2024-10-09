<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

const store = useMainStore()

const isDarkMode = computed(() => store.isDarkMode)

const config = ref({
    open: false,
    maxHeight: 2000,
  head: {
    useArrowSlot: false,
    backgroundColor: "transparent",
    color: "#1A1A1A",
    iconColor: "#ff6400",
    padding: "12px 6px"
  },
  body: {
    backgroundColor: "transparent",
    color: "#1A1A1A"
  }
})

const darkModeConfig = ref({
    open: false,
    maxHeight: 2000,
  head: {
    useArrowSlot: false,
    backgroundColor: "transparent",
    color: "#CCCCCC",
    iconColor: "#ff6400",
    padding: "12px 6px"
  },
  body: {
    backgroundColor: "transparent",
    color: "#CCCCCC"
  }
})

</script>

<template>
    <VueDataUi component="VueUiAccordion" :config="isDarkMode ? darkModeConfig : config">
        <template #title="{color}">
            <div dir="auto" :style="`color:${color}`">{{ title }}</div>
        </template>
        <template #content>
            <div class="pb-3 bg-[#FFFFFF40] dark:bg-[#FFFFFF10] py-4 rounded">
                <slot name="content"></slot>
            </div>
        </template>
    </VueDataUi>
</template>