<script setup>
import { computed, ref } from "vue";
import { createWordCloudDatasetFromPlainText } from "vue-data-ui/utils";
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";

const store = useMainStore();
const config = computed(() => ({
    theme: store.isDarkMode ? "dark" : "",
    userOptions: { show: false },
    style: {
        chart: {
            height: 700,
            width: 700,
            controls: { show: false },
            zoom: { show: false },
            words: {
                seed: 42,
                minFontSize: 22,
                maxFontSize: 65,
                angles: [30, 20, 10, 0, -10, -20, -30],
            },
        },
    },
}));
const text = ref(
    "Data helps teams understand customers and discover patterns. Teams use data to share insights and make better decisions. Clear charts turn information into stories that people can explore. Analysts collect feedback, measure progress, compare results and identify opportunities. Designers build accessible dashboards using thoughtful colors, labels and layouts. Engineers create reliable tools that connect sources, automate reporting and protect privacy. Leaders ask questions, test assumptions, learn from evidence and plan improvements. Collaboration brings different perspectives together, making complex problems easier to solve. Every project benefits from curiosity, patience, creativity, communication and a willingness to experiment.",
);
const filterCommon = ref(true);
const commonWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "to",
    "with",
]);
const textData = computed(() =>
    createWordCloudDatasetFromPlainText(text.value, (word) =>
        word.toLowerCase(),
    )
        .filter(
            (item) =>
                item.name &&
                (!filterCommon.value || !commonWords.has(item.name)),
        )
        .sort((a, b) => b.value - a.value)
        .slice(0, 100),
);
</script>

<template>
    <div class="p-4">
        <UseCaseTitle
            ><template #title>Analyze your own text</template
            ><template #description
                >Paste English text to visualize word frequencies. The optional
                filter removes a small list of common English words.</template
            ></UseCaseTitle
        >
        <label for="word-cloud-text" class="block mb-2">Text to analyze</label>
        <textarea
            id="word-cloud-text"
            v-model="text"
            rows="5"
            class="w-full border rounded p-2 bg-white dark:bg-[#2A2A2A]"
        />
        <label class="block my-3"
            ><input v-model="filterCommon" type="checkbox" /> Filter common
            words</label
        >
        <div
            v-if="textData.length"
            class="w-full max-w-xl mx-auto p-4 bg-white dark:bg-[#1A1A1A] rounded-md"
        >
            <VueDataUi
                component="VueUiWordCloud"
                :dataset="textData"
                :config="config"
            />
        </div>
        <p v-else>Enter text with words to display a cloud.</p>
        <div class="flex justify-center mt-6">
            <a
                class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors"
                href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/uc-word-cloud-text.vue"
                target="_blank"
                rel="noopener noreferrer"
                >{{ store.translations.githubCode[store.lang] }}</a
            >
        </div>
    </div>
</template>
