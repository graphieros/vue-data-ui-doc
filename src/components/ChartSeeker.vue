<script setup>
import { ref, computed, nextTick } from "vue";
import useCharts from "../useCharts";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const { classification, taxinomy } = useCharts()

const filters = ref(Object.keys(classification.value).map(f => {
        return {
            name: f,
            selected: false
        }
    }))

const selectedFilters = computed(() => {
    return filters.value.filter(f => f.selected).map(f => f.name)
})

const charts = computed(() => {
    return Object.keys(taxinomy.value).map(t => {
        return {
            name: t,
            ...taxinomy.value[t]
        }
    }).filter(t => t.taxinomy.some(tag => selectedFilters.value.includes(tag)))
});

const title = computed(() => {
    return {
        en: "What would you like to display?",
        fr: "Que souhaitez-vous afficher ?",
        pt: "O que você gostaria de exibir?",
        de: "Was möchten Sie anzeigen?",
        zh: "您想展示什么？",
        jp: "何を表示しますか？",
        es: "¿Qué te gustaría mostrar?",
        ko: "무엇을 표시하시겠습니까?",
        ar: "ماذا تريد أن تعرض؟"
    }[store.lang]
})

const step = ref(0);

function updateFilters(f) {
    filters.value = filters.value.map(filter => {
        return {
            ...filter,
            selected: f.name === filter.name ? !f.selected : false
        }
    })
    nextTick(() => {
        step.value += 1;
    })
}

</script>

<template>
    <div class="w-full max-w-[1000px] mx-auto border border-gray-500 dark:border-gray-700 rounded-md">
        <div class="dark:bg-[#FFFFFF10] pb-2">
            <h3 class="p-4 pb-1 text-lg" dir="auto">{{ title }}</h3>
            <div class="flex flex-row flex-wrap gap-2 p-2 rounded-md mx-2 bg-gray-200 dark:bg-[#FFFFFF10]">
                <button 
                    v-for="filter in filters" 
                    @click="() => updateFilters(filter)"
                    :class="`text-xs cursor-pointer flex flex-col gap-2 place-items-center p-2 rounded-md ${filter.selected ? 'bg-app-blue' : 'bg-gray-100 dark:bg-[#FFFFFF10] hover:bg-gray-300 dark:hover:bg-[#FFFFFF20]'} transition-colors`"
                >
                    {{ classification[filter.name][store.lang] }}
                </button>
            </div>
        </div>
        <div class="flex flex-row gap-4 place-items-center mt-2 py-4 dark:bg-[#FFFFFF05]" v-if="charts.length">
            <div class="flex flex-row flex-wrap gap-4 w-full px-4">
                <FlexibleTooltip
                    v-for="chart in charts"
                    position="bottom" 
                    :content="`${chart.description}`" 
                    width="w-fit min-w-[120px]" 
                    delay="delay-150"
                >
                    <RouterLink :to="chart.link">
                        <div class="relative flex place-items-center justify-center p-2 border border-gray-200 dark:border-[#FFFFFF10] hover:bg-[#5f8aee30] hover:shadow-md hover:border-app-blue dark:hover:border-app-blue transition-all pb-3 h-[80px] w-[80px]">
                            <VueUiIcon :name="chart.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'" class="-mt-1" :size="32" />
                            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] pb-[10px]">
                                {{ chart.name === 'VueUiParallelCoordinatePlot' ? 'PCP' : chart.name.replace('VueUi', '') }}
                            </div>
                        </div>
                    </RouterLink>
                </FlexibleTooltip>
            </div>
        </div>
    </div>
</template>

