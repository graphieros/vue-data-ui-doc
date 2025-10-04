<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import { ToolIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router"
import FlexibleTooltip from './FlexibleTooltip.vue'

const store = useMainStore();
const router = useRouter();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => store.translations);

const props = defineProps({
    to: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'py-3 px-4'
    },
    simple: {
        type: Boolean,
        default: false
    }
})

function returnToMaker() {
    if(!localStorage.currentChart) {
        localStorage.setItem('currentChart', props.to)
    } else {
        localStorage.currentChart = props.to
    }
    nextTick(() => {
        router.push({ path: '/chart-builder'})
        window.scrollTo(0,0)
    })
}

</script>

<template>
    <div class="relative" v-if="simple">
        <FlexibleTooltip position="bottom" :content="translations.menu.chartBuilder[store.lang]" width="w-fit min-w-[120px]" delay="delay-150">
            <button @click="returnToMaker" class="shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] h-[36px] w-[36px] sm:h-[50px] sm:w-[50px] flex place-items-center justify-center rounded-lg bg-gray-100 dark:bg-[#242424] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors">
                <VueUiIcon name="boxes" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
            </button>
        </FlexibleTooltip>
    </div>

    <button v-else @click="returnToMaker" :class="`flex flex-row gap-2 place-items-center rounded-md border border-black dark:border-app-green ${props.size} hover:bg-[#42d39233] hover:shadow-xl`"><ToolIcon/>{{ translations.menu.chartBuilder[store.lang] }}</button>
</template>