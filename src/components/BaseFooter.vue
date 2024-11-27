<script setup>
import { ref, computed } from "vue";
import DeepSearch from "./DeepSearch.vue";
import BaseSignature from "./BaseSignature.vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

</script>

<template>
    <footer class="w-full fixed bottom-0 left-0 h-[64px] font-satoshi bg-gray-200 dark:bg-black text-gray-800 dark:text-slate-300 border-t dark:border-[#2A2A2A] transition-all flex place-items-center  justify-between pl-6" style="z-index: 1000">
        <DeepSearch :fixed="false"/>
        <!-- <div class="w-[64px]">
            <BaseSignature :color="isDarkMode ? '#3A3A3A' : '#CCCCCC'" :strokeWidth="7"/>
        </div> -->
    </footer>
</template>