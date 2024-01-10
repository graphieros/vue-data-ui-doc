<script setup>
import { computed } from "vue";
import Tooltip from './Tooltip.vue';
import { useMainStore } from "../stores";
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
    <router-link :to="link" @click="scrollToTop">
            <div class="relative peer h-full p-2 rounded-md flex flex-col gap-2 place-items-center place-content-center justify-between border border-black bg-gray-100 dark:bg-[rgb(35,35,35)] hover:shadow-xl hover:outline hover:outline-app-green transition-all">
                <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon :name="icon" :size="20" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" :strokeWidth="1"/>
                    <span>VueUi<span class="text-gray-600 dark:text-app-green"><slot name="name"></slot></span></span>
                </div>
                <img v-if="item.thumb" :src="isDarkMode ? item.thumb : item.thumbLight"/>
                <small>
                    {{ item.tooltip }}
                </small>
            </div>
    </router-link>
</template>