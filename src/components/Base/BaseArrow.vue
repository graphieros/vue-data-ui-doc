<script setup>
import { ref, computed } from "vue";
import { createUid } from "../maker/lib";

const props = defineProps({
    top: { type: String },
    right: { type: String, default: undefined },
    left: { type: String, default: undefined },
    color: { type: String },
    animated: { type: Boolean, default: true },
    direction: { type: String, default: 'right' }
})

const ID = ref(createUid());

const animationOffset = computed(() => props.direction === 'right' ? '-10px' : '100px');

</script>

<template>
<svg 
    :class="`overflow-visible [transform-box:fill-box] origin-center pointer-events-none absolute right-12 ${animated ? 'animation-hounce' : ''}`" 
    width="100" 
    viewBox="0 0 100 10"
    :style="{
        top,
        right,
        left
    }"
>
    <defs>
        <marker
            :id="ID"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            :orient="direction === 'right' ? 'auto-start-reverse' : 'auto'"
            :fill="color"
        >
            <path v-if="direction === 'right'" d="M 0 0 L 10 5 L 0 10 z" />
            <path v-else d="M 10 0 L 0 5 L 10 10 Z" />
        </marker>
    </defs>
    <line
        :x1="0"
        :y1="5"
        :x2="90"
        :y2="5"
        stroke-linecap="round"
        stroke-width="2"
        :stroke="color"
        :marker-end="direction === 'right' ? `url(#${ID})` : undefined"
        :marker-start="direction === 'left' ? `url(#${ID})` : undefined"
    />
</svg>
</template>

<style scoped>
@keyframes hounce {
    0%, 100% {
        transform: translateX(v-bind(animationOffset));
    }
    50% {
        transform: translateX(0);
    }
}

.animation-hounce {
    animation: hounce 1s ease-in-out infinite;
}
</style>