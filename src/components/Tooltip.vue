<script setup>
import { InfoCircleIcon } from 'vue-tabler-icons';
</script>

<template>
    <div class="vueUiTooltip absolute hidden peer-hover:block bottom-[calc(100%_+_6px)] left-1/2 -translate-x-1/2 bg-white dark:bg-[rgb(30,30,30)] dark:text-gray-300 w-full z-10 p-2 text-sm rounded-md border border-black-100 dark:border-app-blue">
        <div class="w-full flex place-content-center">
            <InfoCircleIcon class="text-gray-500 mb-1"/>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.vueUiTooltip {
    opacity: 0;
    animation: showTooltip 0.3s ease-in forwards;
}
@keyframes showTooltip {
    from {
        transform: translateY(10px) translateX(-50%) scale(1,0.95);
        opacity: 0;
    }
    to {
        transform: translateY(0) translateX(-50%) scale(1,1);
        opacity: 1;
    }
}
</style>