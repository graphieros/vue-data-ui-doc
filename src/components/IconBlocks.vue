<script setup>
import { onMounted, nextTick, ref } from "vue";

defineProps({
    size: { type: Number, default: 18 },
    stroke: { type: String, default: "#1A1A1A" },
    strokeWidth: { type: Number, default: 1 }
});

const svgRef = ref(null);

function offsetSvgPath(path, n, m) {
    return path.replace(/(-?\d+(?:\.\d+)?)/g, (match, number, index, full) => {
        const numbersBefore = full.slice(0, index).match(/-?\d+(?:\.\d+)?/g);
        const isX = !numbersBefore || numbersBefore.length % 2 === 0;
        const num = Number(number);
        return String(isX ? num + n : num + m);
    });
}

const cube = "M 25 1 L 20 3 L 25 5 L 30 3 L 25 1 M 25 5 L 25 11 L 30 9 L 30 3 M 25 11 L 20 9 L 20 3";
const cubeFill = "M 20 3 L 25 5 L 25 11 L 20 9 L 20 3";

const cubes = [
    { a: offsetSvgPath(cube, 0, 0), b: offsetSvgPath(cubeFill, 0, 0) },
    { a: offsetSvgPath(cube, -5, 8), b: offsetSvgPath(cubeFill, -5, 8) },
    { a: offsetSvgPath(cube, 5, 8), b: offsetSvgPath(cubeFill, 5, 8) },
    { a: offsetSvgPath(cube, 0, 16), b: offsetSvgPath(cubeFill, 0, 16) },
    { a: offsetSvgPath(cube, -10, 16), b: offsetSvgPath(cubeFill, -10, 16) },
    { a: offsetSvgPath(cube, 10, 16), b: offsetSvgPath(cubeFill, 10, 16) },
    { a: offsetSvgPath(cube, -5, 24), b: offsetSvgPath(cubeFill, -5, 24) },
    { a: offsetSvgPath(cube, 5, 24), b: offsetSvgPath(cubeFill, 5, 24) },
    { a: offsetSvgPath(cube, 15, 24), b: offsetSvgPath(cubeFill, 15, 24) },
    { a: offsetSvgPath(cube, -15, 24), b: offsetSvgPath(cubeFill, -15, 24) },
    { a: offsetSvgPath(cube, 0, 32), b: offsetSvgPath(cubeFill, 0, 32) },
    { a: offsetSvgPath(cube, -10, 32), b: offsetSvgPath(cubeFill, -10, 32) },
    { a: offsetSvgPath(cube, 10, 32), b: offsetSvgPath(cubeFill, 10, 32) },
    { a: offsetSvgPath(cube, 20, 32), b: offsetSvgPath(cubeFill, 20, 32) },
    { a: offsetSvgPath(cube, -20, 32), b: offsetSvgPath(cubeFill, -20, 32) }
];

function animateCubesFallToTheirOwnCoordinates(svgEl, options = {}) {
    const {
        gSelector = "g",
        fallDuration = 700,
        stagger = 90,
        easing = "cubic-bezier(.2,.8,.2,1)",
        dropDistanceUnits = 30,
        extraDelay = 0
    } = options;

    if (!svgEl) return;

    const gList = Array.from(svgEl.querySelectorAll(gSelector));
    if (gList.length === 0) return;

    const order = gList.slice().reverse();

    const vb = svgEl.viewBox.baseVal;
    const svgRect = svgEl.getBoundingClientRect();
    const scaleY = vb.height ? svgRect.height / vb.height : 1;
    const dropPx = dropDistanceUnits * scaleY;

    order.forEach((g, i) => {
        g.style.willChange = "transform";
        g.style.transformBox = "fill-box";
        g.style.transformOrigin = "center";

        const startY = -dropPx * (i + 1);

        g.style.transition = "none";
        g.style.transform = `translateY(${startY}px)`;
    });

    // Force flush so the browser applies the start transforms
    svgEl.getBoundingClientRect();

    order.forEach((g, i) => {
        const delay = extraDelay + i * stagger;
        g.style.transition = `transform ${fallDuration}ms ${easing} ${delay}ms`;
        g.style.transform = "translateY(0px)";
    });
}

onMounted(async () => {
    await nextTick();
    animateCubesFallToTheirOwnCoordinates(svgRef.value, {
        gSelector: "g",
        fallDuration: 500,
        stagger: 50,
        easing: "cubic-bezier(.2,.8,.2,1)",
        dropDistanceUnits: 18
    });
});
</script>

<template>
    <div :style="{ width: size + 'px', height: size + 'px' }">
        <svg ref="svgRef" width="100%"
            :viewBox="`${-strokeWidth} ${-strokeWidth} ${50 + strokeWidth * 2} ${50 + strokeWidth * 2}`">
            <g v-for="(cube, i) in cubes" :key="i">
                <path :d="cube.a" stroke-linecap="round" stroke-linejoin="round" fill="none" :stroke="stroke"
                    :stroke-width="strokeWidth" />
                <path class="cube-shade" :d="cube.b" :fill="stroke" />
            </g>
        </svg>
    </div>
</template>

<style scoped>
.cube-shade {
    opacity: 0.5;
}
</style>
