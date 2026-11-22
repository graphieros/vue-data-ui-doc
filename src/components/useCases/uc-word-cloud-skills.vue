<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";
import WordCloudLegend from "./WordCloudLegend.vue";

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
const make = (groups) =>
    groups.flatMap(([color, words]) =>
        words
            .split(" ")
            .map((name, index) => ({ name, value: 50 - index * 2, color })),
    );
const hidden = ref([]);
const skills = make([
    [
        "#5279d1",
        "JavaScript TypeScript Python SQL Java Go Rust CSharp Kotlin Swift HTML CSS Bash",
    ],
    [
        "#9a63bc",
        "Vue React Django Node Angular Svelte Laravel Rails Flask Spring Express Next Nuxt",
    ],
    [
        "#209b78",
        "Docker cloud testing CICD Kubernetes Linux Git AWS Azure Terraform monitoring security automation",
    ],
    [
        "#d17c31",
        "communication teamwork curiosity leadership empathy collaboration creativity adaptability mentoring planning listening problem-solving initiative",
    ],
]);
const skillLegend = [
    ["Languages", "#5279d1"],
    ["Frameworks", "#9a63bc"],
    ["Tools", "#209b78"],
    ["Soft skills", "#d17c31"],
];
</script>

<template>
    <div class="p-4">
        <UseCaseTitle
            ><template #title>Job posting skills</template
            ><template #description
                >Word size represents mentions in job postings; colors group
                skills by type.</template
            ></UseCaseTitle
        >
        <div
            class="w-full max-w-xl mx-auto p-4 bg-white dark:bg-[#1A1A1A] rounded-md"
        >
            <div class="relative">
                <VueDataUi
                    component="VueUiWordCloud"
                    :dataset="
                        skills.some((item) => !hidden.includes(item.color))
                            ? skills.filter(
                                  (item) => !hidden.includes(item.color),
                              )
                            : skills
                    "
                    :config="config"
                    :style="{
                        visibility: skills.some(
                            (item) => !hidden.includes(item.color),
                        )
                            ? 'visible'
                            : 'hidden',
                    }"
                />
                <p
                    v-if="!skills.some((item) => !hidden.includes(item.color))"
                    class="absolute inset-0 flex items-center justify-center text-center"
                    role="status"
                >
                    All categories are hidden.
                </p>
            </div>
            <WordCloudLegend
                v-model="hidden"
                :items="skillLegend"
                label="Category legend"
            />
        </div>
        <div class="flex justify-center mt-6">
            <a
                class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors"
                href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/uc-word-cloud-skills.vue"
                target="_blank"
                rel="noopener noreferrer"
                >{{ store.translations.githubCode[store.lang] }}</a
            >
        </div>
    </div>
</template>
