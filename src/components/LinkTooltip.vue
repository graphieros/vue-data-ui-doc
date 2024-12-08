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
    index: Number,
    component: String
})


function scrollToTop() {
    window.scrollTo({ top: 0});
}

</script>

<template>
    <div class="overflow-visible relative w-fit">
        <router-link :to="route" @click="scrollToTop">
            <div :class="`-ml-2 my-4 ${index === 0 ? 'mt-12' : ''} relative`">
                <VueUiIcon :name="icon" :size="20" :stroke="isSelected(route) ? 'rgb(95, 139, 238)' : isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(31, 41, 55)'" :class="`${cssClasses} hover:stroke-app-blue dark:hover:stroke-app-blue`" :strokeWidth="isSelected(route) ? 2 : 1"/>
                <div class="text-[6px] absolute -bottom-[12xp] left-1/2 -translate-x-1/2" :style="isSelected(route) ? 'color: rgb(95, 139, 238)' : ''">{{ component }}</div>
            </div>
        </router-link>
    </div>
</template>