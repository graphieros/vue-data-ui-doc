<script setup>
import { ref, computed } from "vue";

defineProps({
    backgroundColor: {
        type: String,
        default: '#e1e5e8'
    },
    color: {
        type: String,
        default: '#1A1A1A'
    },
    fontSize: {
        type: String,
        default: '1rem'
    }
})

</script>

<template>
    <div :style="{
        backgroundColor: backgroundColor,
        color: color
    }"
        class="py-1 pl-2 pr-4 rounded-full w-fit flex flex-row gap-2 place-items-center shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
    >
        <slot/>
    </div>
</template>