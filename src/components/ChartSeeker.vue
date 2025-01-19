<script setup>
import { ref, computed, nextTick } from "vue";
import useCharts from "../useCharts";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import { useMainStore } from "../stores";
import { TerminalIcon } from "vue-tabler-icons";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const { classification, classificationDescription, taxinomy } = useCharts()

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

const cli = computed(() => {
    return {
        en: "Use the official CLI tool to create boilerplate",
        fr: "Utilisez l'outil CLI officiel pour créer un modèle",
        pt: "Use a ferramenta CLI oficial para criar um modelo",
        de: "Verwenden Sie das offizielle CLI-Tool, um eine Vorlage zu erstellen",
        zh: "使用官方CLI工具创建样板",
        jp: "公式CLIツールを使用してボイラープレートを作成します",
        es: "Utilice la herramienta CLI oficial para crear una plantilla",
        ko: "공식 CLI 도구를 사용하여 보일러플레이트를 생성하세요",
        ar: "استخدم أداة CLI الرسمية لإنشاء قالب"
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

const selectedIndex = ref(null);

</script>

<template>
    <div class="w-full max-w-[1000px] mx-auto border border-gray-500 dark:border-gray-700 rounded-md">
        <div class="dark:bg-[#FFFFFF10] pb-2">
            <h3 class="p-4 pb-1 text-lg" dir="auto">{{ title }}</h3>
            <div class="flex flex-row flex-wrap gap-2 p-2 rounded-md mx-2 bg-gray-200 dark:bg-[#FFFFFF10]">
                <FlexibleTooltip
                    v-for="filter in filters"
                    position="bottom" 
                    :content="classificationDescription[filter.name][store.lang]" 
                    width="w-fit min-w-[200px]" 
                    delay="delay-150"
                    :alwaysBlue="true"
                >
                <button 
                    @click="() => updateFilters(filter)"
                    :class="`text-xs cursor-pointer flex flex-col gap-2 place-items-center p-2 rounded-md ${filter.selected ? 'bg-app-blue text-black' : 'bg-gray-100 dark:bg-[#FFFFFF10] hover:bg-gray-300 dark:hover:bg-[#FFFFFF20]'} transition-colors`"
                >
                    {{ classification[filter.name][store.lang] }}
                </button>
            </FlexibleTooltip>
            </div>
        </div>
        <div class="flex flex-row gap-4 place-items-center mt-2 py-4 dark:bg-[#FFFFFF05]" v-if="charts.length">
            <div class="flex flex-row flex-wrap gap-4 w-full px-4">
                <FlexibleTooltip
                    v-for="(chart, i) in charts"
                    position="bottom" 
                    :content="`${chart.description}`" 
                    width="w-fit min-w-[200px]" 
                    delay="delay-150"
                    :alwaysBlue="true"
                >
                    <RouterLink :to="chart.link">
                        <div class="relative flex place-items-center justify-center p-2 border border-gray-200 dark:border-[#FFFFFF10] hover:bg-[#5f8aee30] hover:shadow-md hover:border-app-blue dark:hover:border-app-blue transition-all pb-3 h-[80px] w-[80px]" @mouseover="selectedIndex = i" @mouseout="selectedIndex = null">
                            <VueUiIcon :name="chart.icon" :stroke="selectedIndex !== null && selectedIndex === i ? '#5f8aee' : isDarkMode ? '#CCCCCC' : '#1A1A1A'" class="-mt-1" :size="32" />
                            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] pb-[10px]">
                                {{ chart.name === 'VueUiParallelCoordinatePlot' ? 'PCP' : chart.name.replace('VueUi', '') }}
                            </div>
                        </div>
                    </RouterLink>
                </FlexibleTooltip>
            </div>
        </div>
        <div class="p-2 w-fit">
            <a href="https://github.com/graphieros/vue-data-ui-cli" target="_blank" class="w-fit">
                <button class="py-2 px-4 rounded bg-[#fdd663BB] hover:bg-app-gold transition-colors text-black flex flex-row place-items-center gap-2" dir="auto">
                    <div class="w-[40px] h-[40px] flex place-items-center justify-center">
                        <TerminalIcon/>
                    </div>
                    <div dir="auto" class="text-left">
                        {{ cli }}
                    </div>
                </button>
            </a>
        </div>

        <div class="w-full">
            <VueDataUi
                component="VueUiAccordion"
                :config="{
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
                }"
            >
                <template #arrow="{ iconColor }">
                    <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
                </template>
                <template #title>
                    CLI demo
                </template>
                <template #content>
                    <video controls width="100%" loop="true" autoplay="true">
                        <source src="../assets/vdui_cli.mp4" type="video/mp4" />
                    </video>
                </template>
            </VueDataUi>
        </div>
    </div>
</template>

