<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
    isSelected: Function,
    cssClasses: String,
    route: String,
    tooltipContent: String,
    icon: String,
    index: Number
})


const ico = defineAsyncComponent(() => import("vue-tabler-icons").then(module => module[props.icon]))

function scrollToTop() {
    window.scrollTo({ top: 0});
}

</script>

<template>
    <div class="overflow-visible relative">
        <router-link :to="route" @click="scrollToTop">
            <div :class="`-ml-2 my-2 ${index === 0 ? 'mt-12' : ''}`"><component :is="ico" :class="`${cssClasses} ${isSelected(route) ? 'text-app-blue' : 'text-black dark:text-gray-400'}`" :stroke-width="isSelected(route) ? 2 : 1"/></div>
        </router-link>
    </div>
</template>