<script setup>
import { computed } from "vue";
import Tooltip from './Tooltip.vue';
import { useMainStore } from "../stores";
import BaseCard from "./BaseCard.vue";
const store = useMainStore();
const isDarkMode = computed(() => {
    return store.isDarkMode;
});


const props = defineProps({
    link: String,
    icon: String,
    item: Object
});

function scrollToTop() {
    window.scrollTo({ top: 0});
}

</script>

<template>
    <BaseCard>
        <router-link :to="link" @click="scrollToTop">
                <div class="relative peer h-full rounded-md flex flex-col gap-2 place-items-center place-content-center justify-between bg-gray-100 dark:bg-[rgb(35,35,35)] hover:shadow-xl hover:outline hover:outline-app-green transition-all">
                    <div class="flex flex-row gap-2 place-items-center w-full justify-center py-2 mb-2 border-b border-gray-300 dark:border-[#3A3A3A]">
                        <VueUiIcon :name="icon" :size="20" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" :strokeWidth="1"/>
                        <span>VueUi<span class="text-gray-600 dark:text-app-green"><slot name="name"></slot></span></span>
                    </div>
                    <img v-if="item.thumb" :src="isDarkMode ? item.thumb : item.thumbLight"/>
                    <div class="text-xs w-full text-center border-t py-2 border-gray-300 dark:border-[#3A3A3A] dark:bg-[#2A2A2A]" dir="auto">
                        <div class="px-4">
                            {{ item.tooltip }}
                        </div>
                    </div>
                </div>
        </router-link>
    </BaseCard>
</template>