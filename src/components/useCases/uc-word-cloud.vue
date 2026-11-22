<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";
import WordCloudLegend from "./WordCloudLegend.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const hidden = ref([]);
const colors = { good: "#1d915d", neutral: "#888888", bad: "#dc4444" };

const dataset = [
    { name: "excellent", value: 100, color: colors.good },
    { name: "helpful", value: 80, color: colors.good },
    { name: "reliable", value: 68, color: colors.good },
    { name: "easy", value: 60, color: colors.good },
    { name: "intuitive", value: 56, color: colors.good },
    { name: "efficient", value: 52, color: colors.good },
    { name: "friendly", value: 47, color: colors.good },
    { name: "fast", value: 44, color: colors.good },
    { name: "useful", value: 41, color: colors.good },
    { name: "pleasant", value: 36, color: colors.good },
    { name: "responsive", value: 57, color: colors.good },
    { name: "smooth", value: 53, color: colors.good },
    { name: "clear", value: 49, color: colors.good },
    { name: "convenient", value: 46, color: colors.good },
    { name: "flexible", value: 42, color: colors.good },
    { name: "simple", value: 39, color: colors.good },
    { name: "impressive", value: 37, color: colors.good },
    { name: "dependable", value: 33, color: colors.good },
    { name: "enjoyable", value: 29, color: colors.good },
    { name: "innovative", value: 27, color: colors.good },
    { name: "welcoming", value: 25, color: colors.good },
    { name: "accessible", value: 32, color: colors.good },
    { name: "polished", value: 39, color: colors.good },
    { name: "effective", value: 46, color: colors.good },
    { name: "creative", value: 53, color: colors.good },
    { name: "thoughtful", value: 30, color: colors.good },
    { name: "seamless", value: 37, color: colors.good },
    { name: "robust", value: 44, color: colors.good },
    { name: "accurate", value: 51, color: colors.good },
    { name: "supportive", value: 28, color: colors.good },
    { name: "prompt", value: 35, color: colors.good },
    { name: "valuable", value: 42, color: colors.good },
    { name: "versatile", value: 49, color: colors.good },
    { name: "delightful", value: 26, color: colors.good },
    { name: "organized", value: 33, color: colors.good },
    { name: "practical", value: 40, color: colors.good },
    { name: "engaging", value: 47, color: colors.good },
    { name: "professional", value: 54, color: colors.good },
    { name: "satisfying", value: 31, color: colors.good },
    { name: "average", value: 85, color: colors.neutral },
    { name: "standard", value: 65, color: colors.neutral },
    { name: "ordinary", value: 48, color: colors.neutral },
    { name: "adequate", value: 55, color: colors.neutral },
    { name: "expected", value: 50, color: colors.neutral },
    { name: "typical", value: 43, color: colors.neutral },
    { name: "acceptable", value: 39, color: colors.neutral },
    { name: "basic", value: 35, color: colors.neutral },
    { name: "moderate", value: 32, color: colors.neutral },
    { name: "average-sized", value: 45, color: colors.neutral },
    { name: "common", value: 42, color: colors.neutral },
    { name: "usual", value: 40, color: colors.neutral },
    { name: "regular", value: 38, color: colors.neutral },
    { name: "conventional", value: 36, color: colors.neutral },
    { name: "familiar", value: 34, color: colors.neutral },
    { name: "routine", value: 31, color: colors.neutral },
    { name: "general", value: 28, color: colors.neutral },
    { name: "unchanged", value: 26, color: colors.neutral },
    { name: "unexceptional", value: 25, color: colors.neutral },
    { name: "middling", value: 25, color: colors.neutral },
    { name: "balanced", value: 32, color: colors.neutral },
    { name: "consistent", value: 39, color: colors.neutral },
    { name: "customary", value: 46, color: colors.neutral },
    { name: "default", value: 53, color: colors.neutral },
    { name: "everyday", value: 30, color: colors.neutral },
    { name: "general-purpose", value: 37, color: colors.neutral },
    { name: "intermediate", value: 44, color: colors.neutral },
    { name: "mainstream", value: 51, color: colors.neutral },
    { name: "medium", value: 28, color: colors.neutral },
    { name: "normal", value: 35, color: colors.neutral },
    { name: "preliminary", value: 42, color: colors.neutral },
    { name: "representative", value: 49, color: colors.neutral },
    { name: "scheduled", value: 26, color: colors.neutral },
    { name: "similar", value: 33, color: colors.neutral },
    { name: "stable", value: 40, color: colors.neutral },
    { name: "traditional", value: 47, color: colors.neutral },
    { name: "unremarkable", value: 54, color: colors.neutral },
    { name: "variable", value: 31, color: colors.neutral },
    { name: "slow", value: 75, color: colors.bad },
    { name: "confusing", value: 58, color: colors.bad },
    { name: "unreliable", value: 45, color: colors.bad },
    { name: "frustrating", value: 40, color: colors.bad },
    { name: "difficult", value: 54, color: colors.bad },
    { name: "expensive", value: 50, color: colors.bad },
    { name: "broken", value: 42, color: colors.bad },
    { name: "delayed", value: 38, color: colors.bad },
    { name: "disappointing", value: 34, color: colors.bad },
    { name: "complicated", value: 30, color: colors.bad },
    { name: "buggy", value: 52, color: colors.bad },
    { name: "clunky", value: 48, color: colors.bad },
    { name: "unhelpful", value: 44, color: colors.bad },
    { name: "unstable", value: 41, color: colors.bad },
    { name: "limited", value: 37, color: colors.bad },
    { name: "inconsistent", value: 35, color: colors.bad },
    { name: "cumbersome", value: 32, color: colors.bad },
    { name: "poor", value: 28, color: colors.bad },
    { name: "inconvenient", value: 26, color: colors.bad },
    { name: "outdated", value: 24, color: colors.bad },
    { name: "awkward", value: 25, color: colors.bad },
    { name: "baffling", value: 32, color: colors.bad },
    { name: "costly", value: 39, color: colors.bad },
    { name: "defective", value: 46, color: colors.bad },
    { name: "disorganized", value: 53, color: colors.bad },
    { name: "disruptive", value: 30, color: colors.bad },
    { name: "error-prone", value: 37, color: colors.bad },
    { name: "glitchy", value: 44, color: colors.bad },
    { name: "incomplete", value: 51, color: colors.bad },
    { name: "inefficient", value: 28, color: colors.bad },
    { name: "inaccurate", value: 35, color: colors.bad },
    { name: "irritating", value: 42, color: colors.bad },
    { name: "laggy", value: 49, color: colors.bad },
    { name: "obsolete", value: 26, color: colors.bad },
    { name: "overpriced", value: 33, color: colors.bad },
    { name: "problematic", value: 40, color: colors.bad },
    { name: "restrictive", value: 47, color: colors.bad },
    { name: "tedious", value: 54, color: colors.bad },
    { name: "unresponsive", value: 31, color: colors.bad },
];
const config = computed(() => ({
    theme: isDarkMode.value ? "dark" : "",
    userOptions: {
        buttons: {
            zoom: false,
        },
    },
    style: {
        chart: {
            height: 800,
            width: 800,
            words: {
                usePalette: false,
                angles: [30, 20, 10, 0, -10, -20, -30],
            },
            title: {
                text: "Customer feedback",
            },
            controls: {
                show: false,
            },
            zoom: {
                show: false,
            },
        },
    },
}));
</script>

<template>
    <div class="p-4">
        <UseCaseTitle>
            <template #title>Customer feedback sentiment</template>
            <template #description>
                Word size represents frequency; color indicates sentiment.
            </template>
        </UseCaseTitle>
        <div
            class="w-full max-w-xl mx-auto p-4 bg-white dark:bg-[#1A1A1A] rounded-md"
        >
            <div class="relative">
                <VueDataUi
                    component="VueUiWordCloud"
                    :dataset="
                        dataset.some((item) => !hidden.includes(item.color))
                            ? dataset.filter(
                                  (item) => !hidden.includes(item.color),
                              )
                            : dataset
                    "
                    :config="config"
                    :style="{
                        visibility: dataset.some(
                            (item) => !hidden.includes(item.color),
                        )
                            ? 'visible'
                            : 'hidden',
                    }"
                />
                <p
                    v-if="!dataset.some((item) => !hidden.includes(item.color))"
                    class="absolute inset-0 flex items-center justify-center text-center"
                    role="status"
                >
                    All categories are hidden.
                </p>
            </div>
            <WordCloudLegend
                v-model="hidden"
                :items="[
                    ['Good', colors.good],
                    ['Neutral', colors.neutral],
                    ['Bad', colors.bad],
                ]"
                label="Sentiment legend"
            />
        </div>
        <div class="flex justify-center mt-6">
            <a
                class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors"
                href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/uc-word-cloud.vue"
                target="_blank"
                rel="noopener noreferrer"
                >{{ store.translations.githubCode[store.lang] }}</a
            >
        </div>
    </div>
</template>
