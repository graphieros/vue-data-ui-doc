<script setup>
import { ref, onMounted, computed } from "vue";
import { useCase } from "./useCase";
import UseCaseTitle from "./UseCaseTitle.vue";
import { useMainStore } from "../../stores";
import { useCaseStore } from "../../stores/cases";
import CodeParser from "../customization/CodeParser.vue";

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
    SCATTER_LARGE_DATASET,
    SCATTER_LARGE_CONFIG
} = useCase()

const code = ref(`import { VueUiScatter } from "vue-data-ui";
    function makeScatterBigData() {
        const arr = [];
        for (let i = -50000; i < 50000; i += 1) {
            arr.push({
                x: Math.random() * (Math.random() > 0.5 ? i / 4 : -i / 4),
                y: Math.random() * (Math.random() > 0.5 ? i / 4 : -i / 4),
                name: \`datapoint_\${i}\`,
            });
        }
        return arr;
    }

    const dataset = ref([
        {
            name: 'Big data',
            values: makeScatterBigData(),
        }
    ]);

    const config = ref({
        usePerformanceMode: true,
        style: {
            layout: {
                correlation: { show: false },
                padding: {
                    right: 8,
                },
                plots: {
                    radius: 0.5,
                }
            },
            tooltip: { show: false }
        }
    })
`);

</script>

<template>
    <UseCaseTitle>
        <template #title>
            {{ cases.SCATTER_LARGE.title[store.lang] }}
        </template>
        <template #description>
            {{ cases.SCATTER_LARGE.description[store.lang] }}
        </template>
    </UseCaseTitle>
    <div class="w-full rounded p-4 bg-white">
        <VueDataUi
            component="VueUiScatter" 
            :dataset="SCATTER_LARGE_DATASET"
            :config="SCATTER_LARGE_CONFIG"
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
                <CodeParser
                    title="script"
                    language="javascript"
                    :content="code"
                    @copy="store.copy()"
                />
            </template>
        </VueDataUi>
    </div>
</template>