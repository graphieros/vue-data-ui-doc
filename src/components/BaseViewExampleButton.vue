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
        <button dir="auto" class="rounded-full py-2 px-6 border border-app-green bg-[#42d39220] flex flex-row place-items-center gap-4 hover:shadow-md hover:bg-[#42D39230] transition-all">
            {{ translations.viewExamples[store.lang]  }}
        </button>
    </RouterLink>
</template>