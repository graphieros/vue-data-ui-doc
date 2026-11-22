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
const tickets = make([
    [
        "#dc6357",
        "outage crash timeout failure interruption degradation disconnected unresponsive unavailable slow error freeze inaccessible",
    ],
    [
        "#209b78",
        "access password software hardware account license onboarding installation equipment information permissions provisioning reset",
    ],
    [
        "#9a63bc",
        "recurrence investigation diagnosis root-cause workaround correlation analysis defect trend known-error prevention underlying documentation",
    ],
    [
        "#5279d1",
        "upgrade migration patch deployment release configuration rollback approval assessment implementation maintenance scheduling authorization",
    ],
]);
const ticketLegend = [
    ["Incident", "#dc6357"],
    ["Service request", "#209b78"],
    ["Problem", "#9a63bc"],
    ["Change", "#5279d1"],
];
</script>

<template>
    <div class="p-4">
        <UseCaseTitle
            ><template #title>IT service management records</template
            ><template #description
                >Word size represents ticket counts; colors distinguish
                topics.</template
            ></UseCaseTitle
        >
        <div
            class="w-full max-w-xl mx-auto p-4 bg-white dark:bg-[#1A1A1A] rounded-md"
        >
            <div class="relative">
                <VueDataUi
                    component="VueUiWordCloud"
                    :dataset="
                        tickets.some((item) => !hidden.includes(item.color))
                            ? tickets.filter(
                                  (item) => !hidden.includes(item.color),
                              )
                            : tickets
                    "
                    :config="config"
                    :style="{
                        visibility: tickets.some(
                            (item) => !hidden.includes(item.color),
                        )
                            ? 'visible'
                            : 'hidden',
                    }"
                />
                <p
                    v-if="!tickets.some((item) => !hidden.includes(item.color))"
                    class="absolute inset-0 flex items-center justify-center text-center"
                    role="status"
                >
                    All categories are hidden.
                </p>
            </div>
            <WordCloudLegend
                v-model="hidden"
                :items="ticketLegend"
                label="Category legend"
            />
        </div>
        <div class="flex justify-center mt-6">
            <a
                class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors"
                href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/uc-word-cloud-tickets.vue"
                target="_blank"
                rel="noopener noreferrer"
                >{{ store.translations.githubCode[store.lang] }}</a
            >
        </div>
    </div>
</template>
