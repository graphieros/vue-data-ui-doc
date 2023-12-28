<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";
const store = useMainStore();
const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const props = defineProps({
    isSelected: Function,
    cssClasses: String,
    route: String,
    tooltipContent: String,
    icon: String,
    index: Number
})


function scrollToTop() {
    window.scrollTo({ top: 0});
}

</script>

<template>
    <div class="overflow-visible relative">
        <router-link :to="route" @click="scrollToTop">
            <div :class="`-ml-2 my-2 ${index === 0 ? 'mt-12' : ''}`"><VueUiIcon :name="icon" :size="20" :stroke="isSelected(route) ? 'rgb(95, 139, 238)' : isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" :class="`${cssClasses} hover:stroke-app-blue dark:hover:stroke-app-blue`" :strokeWidth="isSelected(route) ? 2 : 1"/></div>
        </router-link>
    </div>
</template>