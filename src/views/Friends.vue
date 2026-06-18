<script setup>
import { ref, computed } from "vue";
import NpmxAd from "../components/NpmxAd.vue";
import CockpitAd from "../components/CockpitAd.vue";
import { useMainStore } from "../stores/index.js";
import AgentScanAd from "../components/AgentScanAd.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

</script>

<template>
    <div class="w-full flex flex-row gap-4 place-items-center justify-center mt-12">
      <VueUiIcon
                class="hidden md:block"
                name="pin"
                :size="62"
                :strokeWidth="1.5"
                :stroke="isDarkMode ? '#8A8A8A' : '#8A8A8A'"
            />
            <h1
                :class="`font-inter-bold text-[48px] sm:text-[72px] text-center ${isDarkMode ? 'bg-gradient-to-r from-app-green to-indigo-400 bg-clip-text text-transparent' : 'text-vue-blue'} z-10`"
                style="letter-spacing: -1px"
            >
                {{ translations.menu.friends[store.lang] }}
            </h1>
    </div>
    <div class="pb-12">
      <AgentScanAd/>
      <NpmxAd/>
      <CockpitAd/>
    </div>
</template>