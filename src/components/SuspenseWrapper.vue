<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    height: {
        type: Number,
        default: 1
    },
    width: {
        type: Number,
        default: 1
    },
    background: {
        type: String,
        default: 'inherit'
    }
});
    
</script>

<template>
    <Suspense>
        <template #default>
            <slot/>
        </template>
        <template #fallback>
            <div :style="{ background: background, width: '100%', aspectRatio: `${width} / ${height}` }"/>
        </template>
    </Suspense>
</template>