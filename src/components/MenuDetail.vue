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
    icon: String
});

function scrollToTop() {
    window.scrollTo({ top: 0});
}

</script>

<template>
    <router-link :to="link" @click="scrollToTop">
        <div class="relative">
            <div class="peer p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black bg-gray-100 dark:bg-[rgb(35,35,35)] hover:bg-white hover:shadow-xl dark:hover:bg-[rgb(40,40,40)] dark:hover:border-app-green">
                <VueUiIcon :name="icon" :size="20" :stroke="isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" :strokeWidth="1"/>
                <span>VueUi<span class="text-gray-600 dark:text-app-green"><slot name="name"></slot></span></span>
            </div>
            <Tooltip>
                <slot name="tooltip"></slot>
            </Tooltip>
        </div>
    </router-link>
</template>