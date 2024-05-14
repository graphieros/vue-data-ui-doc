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
    XY_MULTIPLE_Y_AXES_CONFIG,
    XY_MULTIPLE_Y_AXES_DATASET
} = useCase()


</script>

<template>
    <UseCaseTitle>
        <template #title>
            {{ cases.XY_MULTIPLE_Y_AXES.title[store.lang] }}
        </template>
        <template #description>
            {{ cases.XY_MULTIPLE_Y_AXES.description[store.lang] }}
        </template>
    </UseCaseTitle>
    <div class="w-full rounded p-2 bg-white dark:bg-[#2A2A2A]">
        <VueDataUi
            component="VueUiXy" 
            :dataset="XY_MULTIPLE_Y_AXES_DATASET"
            :config="XY_MULTIPLE_Y_AXES_CONFIG"
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
                        const dataset = ref({{ XY_MULTIPLE_Y_AXES_DATASET }});
                    </code>
                    <br><br>
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const config = ref({{ XY_MULTIPLE_Y_AXES_CONFIG }});
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>
</template>