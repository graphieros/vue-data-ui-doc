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
            <path class="w1" fill="none" :stroke="stroke" :stroke-width="strokeWidth" stroke-linecap="round" d="M 15 3 A 1 1 0 0 0 15 7 A 1 1 0 0 0 15 3 M 13 5 L 12 5 M 15 7 L 15 8 M 17 5 L 18 5 M 15 3 L 15 2" transform-origin="15 5"/>
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