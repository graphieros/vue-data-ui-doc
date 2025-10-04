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
    DONUT_PIE_CONFIG,
    DONUT_PIE_DATASET
} = useCase()


</script>

<template>
    <UseCaseTitle>
        <template #title>
            {{ cases.DONUT_PIE.title[store.lang] }}
        </template>
        <template #description>
            {{ cases.DONUT_PIE.description[store.lang] }}
        </template>
    </UseCaseTitle>
    <div class="w-full bg-gray-50 dark:bg-[#2A2A2A] rounded-xl p-2 shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
        <VueDataUi
            component="VueUiDonut" 
            :dataset="DONUT_PIE_DATASET"
            :config="DONUT_PIE_CONFIG"
        />
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
                        const dataset = ref({{ DONUT_PIE_DATASET }});
                    </code>
                    <br><br>
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const config = ref({{ DONUT_PIE_CONFIG }});
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>
</template>