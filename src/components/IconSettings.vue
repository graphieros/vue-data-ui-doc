<script setup>
    import { ref, computed } from "vue";

    defineProps({
        size: {
            type: Number,
            default: 18
        },
        stroke: {
            type: String,
            default: '#1A1A1A'
        },
        strokeWidth: {
            type: Number,
            default: 1
        }
    })    
</script>

<template>
    <div :style="{ width: size + 'px', height: size + 'px'}">
        <svg width="100%" viewBox="0 0 20 20">
            <path class="w1" fill="none" :stroke="stroke" :stroke-width="strokeWidth" stroke-linecap="round" d="M 16 2 A 1 1 0 0 0 16 6 A 1 1 0 0 0 16 2 M 13 4 L 14 4 M 16 6 L 16 7 M 18 4 L 19 4 M 16 1 L 16 2" transform-origin="16 4"/>
            <path class="w2" fill="none" :stroke="stroke" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" d="M 8 7 A 1 1 0 0 0 8 17 A 1 1 0 0 0 8 7 M 8 6 L 8 7 M 2 12 L 3 12 M 13 12 L 14 12 M 8 17 L 8 18 M 3.6 7.6 L 4.4 8.4 M 3.6 16.4 L 4.4 15.5 M 12.4 7.6 L 11.5 8.4 M 11.6 15.5 L 12.4 16.4 M 8 11 A 1 1 0 0 0 8 13 A 1 1 0 0 0 8 11" transform-origin="8 12"/>
        </svg>
    </div>
</template>

<style scoped>
.w1 {
 animation: rotateW1 0.8s infinite linear;
}

.w2{
    animation: rotateW2 2s infinite linear;
}

@keyframes rotateW1 {
    to {
        transform: rotate(360deg);
    }
}

@keyframes rotateW2 {
    to {
        transform: rotate(-360deg);
    }
}
</style>