<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"
import { ToolIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router"
import FlexibleTooltip from './FlexibleTooltip.vue'

const store = useMainStore();
const makerStore = useMakerStore();
const router = useRouter()

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
            <button @click="returnToMaker" class="h-[36px] w-[36px] sm:h-[50px] sm:w-[50px] border border-gray-500 flex place-items-center justify-center rounded hover:bg-[#5f8bee20] transition-colors">
                <ToolIcon/>
            </button>
        </FlexibleTooltip>
    </div>

    <button v-else @click="returnToMaker" :class="`flex flex-row gap-2 place-items-center rounded-md border border-black dark:border-app-green ${props.size} hover:bg-[#42d39233] hover:shadow-xl`"><ToolIcon/>{{ translations.menu.chartBuilder[store.lang] }}</button>
</template>