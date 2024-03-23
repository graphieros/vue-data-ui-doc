<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"
import { ToolIcon } from "vue-tabler-icons";

import { useRouter } from "vue-router"

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
    <button @click="returnToMaker" :class="`flex flex-row gap-2 place-items-center rounded-md border border-black dark:border-app-green ${props.size} hover:bg-[#42d39233] hover:shadow-xl`"><ToolIcon/>{{ translations.menu.chartBuilder[store.lang] }}</button>
</template>