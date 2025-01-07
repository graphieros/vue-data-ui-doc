<script setup>
import { ref, onMounted } from 'vue';

const svgWidth = 500;
const svgHeight = 500;
const maxBubbles = 15;

const bubbles = ref([]);

const random = (min, max) => Math.random() * (max - min) + min;

const createBubble = () => {
    const id = Math.random().toString(36).substring(7);
    return {
        id,
        cx: svgWidth / 2, 
        cy: svgHeight / 2, 
        xMove: random(-1, 1), 
        yMove: random(-1, 1), 
        r: random(5, 8), 
        maxRadius: random(10, 30), 
        lifetime: random(2000, 10000), 
        opacity: 0.5, 
    };
};

const animateBubbles = () => {
    if (bubbles.value.length < maxBubbles) {
        bubbles.value.push(createBubble());
    }

    bubbles.value = bubbles.value.map((bubble) => {
        bubble.r += bubble.maxRadius / (bubble.lifetime / 16);
        bubble.cx += bubble.xMove;
        bubble.cy += bubble.yMove; 
        bubble.opacity -= 1 / (bubble.lifetime / 16);
        return bubble;
    });

    bubbles.value = bubbles.value.filter(
        (bubble) => bubble.r < bubble.maxRadius && bubble.opacity > 0
    );

    requestAnimationFrame(animateBubbles);
};

onMounted(() => {
    animateBubbles();
});
</script>

<template>
    <svg :width="svgWidth" :height="svgHeight" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
        class="bubbles-svg pointer-events-none">
        <circle v-for="bubble in bubbles" :key="bubble.id" :cx="bubble.cx" :cy="bubble.cy" :r="bubble.r"
            :fill="`rgba(255, 255, 255, ${bubble.opacity})`" stroke="#FFFFFF30" stroke-width="1" />
    </svg>
</template>

<style>
.bubbles-svg {
    background: transparent;
    overflow: visible;
}
</style>
