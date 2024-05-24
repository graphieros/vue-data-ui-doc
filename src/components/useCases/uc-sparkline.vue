<script setup>
import { ref, onMounted, computed } from "vue";
import { useCase } from "./useCase";
import UseCaseTitle from "./UseCaseTitle.vue";
import { useMainStore } from "../../stores";
import { useCaseStore } from "../../stores/cases";
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"

onMounted(() => {
    window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll()
})

const store = useMainStore();
const cases = useCaseStore();

const isDarkMode = computed(() => store.isDarkMode);
const accordionTitle = computed(() => {
    return cases.code[store.lang]
})

const {
    SPARKLINE_SLOT_CONFIG,
    SPARKLINE_SLOT_DATASET
} = useCase()

</script>

<template>
    <UseCaseTitle>
        <template #title>
            {{ cases.SPARKLINE_SLOT.title[store.lang] }}
        </template>
        <template #description>
            {{ cases.SPARKLINE_SLOT.description[store.lang] }}
        </template>
    </UseCaseTitle>

    <div class="w-full rounded p-2 bg-white dark:bg-[#2A2A2A]">
        <VueDataUi
            component="VueUiSparkline" 
            :dataset="SPARKLINE_SLOT_DATASET"
            :config="SPARKLINE_SLOT_CONFIG"
        >
            <template #before="{ selected, sum, average, median, trend, latest }">
                <div class="relative px-10 pt-4 flex flex-row gap-4 w-full">
                    <div class="w-full">
                        <div class="text-3xl mb-4">My title</div>
                        <div class="text-gray-500">Latest: {{ latest }}</div>
                        <div class="text-gray-500">Sum: {{ sum }}</div>
                        <div class="text-gray-500">Average: {{ average.toFixed(2) }}</div>
                        <div class="text-gray-500">Median: {{ median }}</div>
                        <div class="text-gray-500">Trend: {{ (trend * 100).toFixed(2) }}%</div>
                    </div>
                    <div class="w-full text-right text-app-blue" v-if="selected">
                        <div>Period: {{ selected.period }}</div>
                        <div>Value: {{ selected.absoluteValue }}</div>
                    </div>
                </div>
            </template>
        </VueDataUi>
    </div>

    <div class="w-full">
        <VueDataUi component="VueUiAccordion" :config="{
            maxHeight: 5000,
            head: {
                useArrowSlot: true,
                backgroundColor: 'transparent',
                iconColor: isDarkMode ? '#fdd663' : '#1A1A1A'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }">
            <template #arrow="{ iconColor }">
                <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
            </template>
            <template #title>
                {{ accordionTitle }}
            </template>
            <template #content>
                <div class="bg-[#272822] p-2 rounded">
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const dataset = ref({{ SPARKLINE_SLOT_DATASET }});
                    </code>
                    <br><br>
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const config = ref({{ SPARKLINE_SLOT_CONFIG }});
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>

</template>