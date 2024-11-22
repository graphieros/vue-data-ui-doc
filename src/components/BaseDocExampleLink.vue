<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import { useRouter } from "vue-router";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);
const router = useRouter()

const props = defineProps({
    link: {
        type: String,
        default: ''
    },
    componentName: {
        type: String,
        default: ''
    },
    example: {
        type: Boolean,
        default: true
    }
});

function goToDocs() {
    nextTick(() => {
        router.push({ path: `/docs`, hash: `#${props.link}`})
        window.scrollTo(0,0)
    })
}
    
</script>

<template>
    <div class="flex flex-row flex-wrap gap-4 place-items-center justify-center w-fit mx-auto p-2 rounded-full bg-gray-200 dark:bg-[#FFFFFF10]">
        <button @click="goToDocs" :class="`flex flex-row gap-2 place-items-center border border-black dark:border-app-green hover:bg-[#42d39233] hover:shadow-xl rounded-full py-2 px-4`"><VueUiIcon name="clipBoard" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" size="20"/> {{ componentName }} {{ translations.menu.docs[store.lang] }}</button>
        <RouterLink v-if="example" :to="`/examples/categories#${link}`">
            <button :class="`flex flex-row gap-2 place-items-center border border-black dark:border-app-green hover:bg-[#42d39233] hover:shadow-xl rounded-full py-2 px-4`">
                <VueUiIcon name="clipboardLine" :stroke="isDarkMode ? '#42D392' : '#1A1A1A'" :size="20"/>
                {{ translations.viewExamples[store.lang] }}
            </button>
        </RouterLink>
    </div>
</template>