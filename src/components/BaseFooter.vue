<script setup>
import { ref, computed } from "vue";
import DeepSearch from "./DeepSearch.vue";
    
</script>

<template>
    <footer class="w-full fixed bottom-0 left-0 h-[64px] font-satoshi bg-gray-200 dark:bg-black text-gray-800 dark:text-slate-300 border-t dark:border-[#2A2A2A] transition-all flex place-items-center px-6" style="z-index: 1000">
        <DeepSearch :fixed="false"/>
    </footer>
</template>