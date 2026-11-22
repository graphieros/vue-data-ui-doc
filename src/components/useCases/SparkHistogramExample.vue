<script setup>
import { computed } from "vue";
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";

const props = defineProps({
    title: String,
    description: String,
    dataset: Array,
    source: String,
    color: String,
    timeLabelFontSize: { type: Number, default: 17 },
});
const store = useMainStore();
const config = computed(() => ({
    style: {
        backgroundColor: store.isDarkMode ? "#1A1A1A" : "#FFFFFF",
        fontFamily: "inherit",
        layout: {
            height: 180,
            width: 1000,
            padding: { top: 35, right: 10, bottom: 45, left: 10 },
        },
        bars: {
            shape: "square",
            gap: 10,
            borderRadius: 6,
            colors: { positive: props.color, gradient: { show: true } },
        },
        labels: {
            value: {
                show: true,
                fontSize: 18,
                color: store.isDarkMode ? "#CCCCCC" : "#2D353C",
                rounding: 1,
            },
            valueLabel: {
                show: true,
                fontSize: 16,
                color: store.isDarkMode ? "#CCCCCC" : "#2D353C",
            },
            timeLabel: {
                show: true,
                fontSize: props.timeLabelFontSize,
                color: store.isDarkMode ? "#CCCCCC" : "#2D353C",
            },
        },
    },
}));
</script>

<template>
    <section class="p-4">
        <UseCaseTitle
            ><template #title>{{ title }}</template
            ><template #description>{{ description }}</template></UseCaseTitle
        >
        <div class="w-full p-4 bg-white dark:bg-[#1A1A1A] rounded-md">
            <VueDataUi
                component="VueUiSparkHistogram"
                :dataset="dataset"
                :config="config"
            />
        </div>
        <div class="flex justify-center mt-6">
            <a
                class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors"
                :href="`https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/${source}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ store.translations.githubCode[store.lang] }}</a
            >
        </div>
    </section>
</template>
