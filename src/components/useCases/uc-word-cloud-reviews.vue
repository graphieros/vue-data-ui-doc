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
const hidden = ref({ "Before release": [], "After release": [] });
const reviews = [
    {
        title: "Before release",
        data: make([
            [
                "#dc6357",
                "slow confusing crashes limited buggy awkward difficult unreliable frustrating expensive outdated clunky broken laggy inconsistent complicated cumbersome disappointing unstable restrictive inefficient incomplete unresponsive poor tedious",
            ],
            [
                "#209b78",
                "useful friendly helpful affordable promising functional familiar flexible simple attractive accessible practical clear convenient customizable informative popular responsive effective versatile robust capable reliable organized intuitive",
            ],
        ]),
    },
    {
        title: "After release",
        data: make([
            [
                "#209b78",
                "fast intuitive reliable useful friendly smooth efficient clear responsive stable polished accessible helpful flexible seamless simple powerful convenient effective attractive practical customizable consistent impressive delightful engaging accurate dependable innovative organized",
            ],
            [
                "#dc6357",
                "expensive missing confusing limited slow buggy awkward complex delayed difficult incomplete inconsistent costly clunky frustrating restrictive outdated unreliable cumbersome disappointing",
            ],
        ]),
    },
];
const reviewLegend = [
    ["Positive", "#209b78"],
    ["Negative", "#dc6357"],
];
</script>

<template>
    <div class="p-4">
        <UseCaseTitle
            ><template #title
                >Product reviews before and after a release</template
            ><template #description
                >Compare common feedback terms across two periods.</template
            ></UseCaseTitle
        >
        <div class="grid md:grid-cols-2 gap-4">
            <div
                v-for="review in reviews"
                :key="review.title"
                class="p-4 bg-white dark:bg-[#1A1A1A] rounded-md"
            >
                <h4 class="text-center">{{ review.title }}</h4>
                <div class="relative">
                    <VueDataUi
                        component="VueUiWordCloud"
                        :dataset="
                            review.data.some(
                                (item) =>
                                    !hidden[review.title].includes(item.color),
                            )
                                ? review.data.filter(
                                      (item) =>
                                          !hidden[review.title].includes(
                                              item.color,
                                          ),
                                  )
                                : review.data
                        "
                        :config="config"
                        :style="{
                            visibility: review.data.some(
                                (item) =>
                                    !hidden[review.title].includes(item.color),
                            )
                                ? 'visible'
                                : 'hidden',
                        }"
                    />
                    <p
                        v-if="
                            !review.data.some(
                                (item) =>
                                    !hidden[review.title].includes(item.color),
                            )
                        "
                        class="absolute inset-0 flex items-center justify-center text-center"
                        role="status"
                    >
                        All categories are hidden.
                    </p>
                </div>
                <WordCloudLegend
                    v-model="hidden[review.title]"
                    :items="reviewLegend"
                    label="Review sentiment legend"
                />
            </div>
        </div>
        <div class="flex justify-center mt-6">
            <a
                class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors"
                href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/uc-word-cloud-reviews.vue"
                target="_blank"
                rel="noopener noreferrer"
                >{{ store.translations.githubCode[store.lang] }}</a
            >
        </div>
    </div>
</template>
