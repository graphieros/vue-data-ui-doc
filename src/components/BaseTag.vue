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
        class="py-1 pl-2 pr-4 rounded-full w-fit flex flex-row gap-2 place-items-center shadow-md"
    >
        <slot/>
    </div>
</template>