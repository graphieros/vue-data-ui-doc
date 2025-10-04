<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import { useRouter } from "vue-router";
import BaseCard from "./BaseCard.vue";

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
    <BaseCard class="mx-auto w-fit" rounding="rounded-full" type="dark">
        <div class="flex flex-row flex-wrap gap-4 place-items-center justify-center">
            <button @click="goToDocs" :class="`
            flex flex-row place-items-center gap-2
            py-2 px-4 rounded-full
            bg-gray-100 dark:bg-[#3A3A3A]
            shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
            dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]
            hover:bg-[#42d39233]
            dark:hover:bg-[#3D5F54]   /* more visible on dark */
            hover:shadow-xl
            transition-colors
            `">
    <VueUiIcon name="clipBoard" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" size="20"/> {{ componentName }} {{ translations.menu.docs[store.lang] }}</button>
            <RouterLink v-if="example" :to="`/examples/categories#${link}`">
                <button :class="`
            flex flex-row place-items-center gap-2
            py-2 px-4 rounded-full
            bg-gray-100 dark:bg-[#3A3A3A]
            shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
            dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]
            hover:bg-[#42d39233]
            dark:hover:bg-[#3D5F54]   /* more visible on dark */
            hover:shadow-xl
            transition-colors
            `">
                    <VueUiIcon name="clipboardLine" :stroke="isDarkMode ? '#42D392' : '#1A1A1A'" :size="20"/>
                    {{ translations.viewExamples[store.lang] }}
                </button>
            </RouterLink>
        </div>
    </BaseCard>
</template>