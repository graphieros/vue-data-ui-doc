<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"
import { ClipboardTextIcon } from "vue-tabler-icons";

import { useRouter } from "vue-router"

const store = useMainStore();
const router = useRouter()

const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode)

const props = defineProps({
    to: {
        type: String,
        default: ''
    },
    name: String,
    size: {
        type: String,
        default: 'py-3 px-4'
    }
})
function goToDocs() {
    nextTick(() => {
        router.push({ path: `/docs`, hash: `#${props.to}`})
        window.scrollTo(0,0)
    })
}

</script>

<template>
    <button @click="goToDocs" :class="`flex flex-row gap-2 place-items-center rounded-md border border-black dark:border-app-green ${props.size} hover:bg-[#42d39233] hover:shadow-xl`"><VueUiIcon name="clipBoard" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" :size="20"/> {{ props.name }} {{ translations.menu.docs[store.lang] }}</button>
</template>