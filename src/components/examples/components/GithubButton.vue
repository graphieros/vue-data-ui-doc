<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../../../stores";
import { BrandGithubFilledIcon, StarFilledIcon } from "vue-tabler-icons";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const stars = computed(() => store.stars);

const digitConfig = computed(() => {
    return {
        height: "100%",
        backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
        digits: {
            color: isDarkMode.value ? "#fdd663" : "#2D353C",
            skeletonColor: isDarkMode.value ? "#3A3A3A": "#e1e5e8"
        }
    }
})

</script>

<template>
    <a href="https://github.com/graphieros/vue-data-ui" target="_blank" class="hover:-translate-y-[2px] transition-all z-50 fixed bottom-20 right-2 rounded-full p-2 flex place-items-center justify-center border h-[42px] w-[42px] border-[#fdd663] hover:shadow-md bg-[#fdd663]">
        <BrandGithubFilledIcon class="text-black" size="24"/>
        <StarFilledIcon class="text-black dark:text-[#fdd663] absolute top-0 -left-4" size="14"/>
        <div class="w-[28px] absolute -top-6" v-if="stars">
            <VueDataUi component="VueUiDigits" :dataset="stars" :config="digitConfig"/>
        </div>
    </a>
</template>