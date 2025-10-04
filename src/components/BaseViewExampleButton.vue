<script setup>
    import { ref, computed } from "vue";
import { useMainStore } from "../stores";

    const props = defineProps({
        link: {
            type: String,
            default: '/examples/categories'
        }
    })

    const store = useMainStore();
    const translations = computed(() => store.translations)

</script>

<template>
    <RouterLink :to="link">
        <button dir="auto" class="rounded-full py-2 px-6 bg-gray-100 dark:bg-[#2A2A2A] flex flex-row place-items-center gap-4 hover:bg-[#FAFAFA] dark:hover:bg-[#42D39230] transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
            {{ translations.viewExamples[store.lang]  }}
        </button>
    </RouterLink>
</template>