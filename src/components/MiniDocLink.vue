<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
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
})

function goToDocs() {
    nextTick(() => {
        router.push({ path: `/docs`, hash: `#${props.to}`})
        window.scrollTo(0,0)
    })
}


</script>

<template>
<button @click="goToDocs" class="flex place-items-center justify-center rounded-full p-1 bg-app-green cursor-pointer">
    <VueUiIcon :name="name" stroke="#1A1A1A" :size="20" />
</button>
</template>