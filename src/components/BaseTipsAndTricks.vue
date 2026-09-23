<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const title = computed(() => {
    return {
        en: "Tips and tricks",
        fr: "Trucs et astuces",
        pt: "Dicas e truques",
        de: "Tipps und Tricks",
        zh: "技巧与窍门",
        ja: "ヒントとコツ",
        es: "Consejos y trucos",
        ko: "팁과 요령",
        ar: "نصائح وحيل",
    }[store.lang];
});
</script>

<template>
    <div>
        <div class="flex flex-row gap-2 place-items-center justify-center">
            <div class="shrink-0">
                <VueUiIcon
                    name="lightBulbOn"
                    :stroke="isDarkMode ? '#fdd663' : '#1A1A1A'"
                />
            </div>
            <h3 class="font-inter-medium text-lg">{{ title }}</h3>
        </div>

        <div class="flex flex-col gap-2 mt-4">
            <slot />
        </div>
    </div>
</template>
