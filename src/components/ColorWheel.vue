<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '../stores'
import { adaptColorToBackground } from './maker/lib';
import BaseBubbles from './BaseBubbles.vue';

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const emit = defineEmits(['result'])

const size = ref(200)
const showLabels = ref(true) 
const sliceStroke = computed(() => isDarkMode.value ? '#4A4A4A' : '#CCCCCC')
const sliceStrokeWidth = 1
const centerFill = computed(() => isDarkMode.value ? '#4A4A4A' : '#CCCCCC')
const centerInnerFill = computed(() => isDarkMode.value ? '#3A3A3A' : '#FFFFFF')

const colors = [
    "#1f77b4", 
    "#ff7f0e", 
    "#2ca02c", 
    "#d62728", 
    "#ff9896", 
    "#9467bd", 
    "#c5b0d5",
    "#8c564b", 
    "#c49c94", 
    "#e377c2", 
    "#7f7f7f",
    "#bcbd22", 
    "#dbdb8d", 
    "#17becf", 
    "#393b79", 
    "#5254a3", 
    "#6b6ecf", 
    "#9c9ede", 
    "#637939",
    "#8ca252", 
    "#b5cf6b", 
    "#8c6d31", 
    "#bd9e39",
    "#843c39", 
    "#ad494a", 
    "#d6616b",
    "#7b4173", 
    "#a55194", 
    "#ce6dbd", 
];

const N = colors.length
const seg = 360 / N
const rOuter = computed(() => size.value / 2)
const rInner = 0
const labelRadius = computed(() => rOuter.value * 0.62)
const pointerSize = computed(() => Math.round(size.value * 0.18))

const rotation = ref(0)
const spinning = ref(false)
const transitionStyle = ref('')

function degToRad(d) {
    return (Math.PI / 180) * (d - 90)
}

function arcPath(cx, cy, r, startDeg, endDeg) {
    const end = {
        x: cx + r * Math.cos(degToRad(endDeg)),
        y: cy + r * Math.sin(degToRad(endDeg)),
    }
    const largeArc = endDeg - startDeg <= 180 ? 0 : 1
    return `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

function pieSlicePath(r, a0, a1) {
    if (rInner === 0) {
        const m = `M 0 0`
        const l = `L ${r * Math.cos(degToRad(a0))} ${r * Math.sin(degToRad(a0))}`
        const a = arcPath(0, 0, r, a0, a1)
        return `${m} ${l} ${a} Z`
    } else {
        const ro0 = `${r * Math.cos(degToRad(a0))} ${r * Math.sin(degToRad(a0))}`
        const ri1 = `${rInner * Math.cos(degToRad(a1))} ${rInner * Math.sin(degToRad(a1))}`
        const outerArc = arcPath(0, 0, r, a0, a1)
        const innerArc = arcPath(0, 0, rInner, a1, a0).replace(' 1 ', ' 0 ')
        return `M ${ro0} ${outerArc} L ${ri1} ${innerArc} Z`
    }
}

const slices = computed(() => {
    return colors.map((color, i) => {
        const a0 = i * seg
        const a1 = (i + 1) * seg
        const midAngle = a0 + seg / 2
        return {
            color,
            a0,
            a1,
            midAngle,
            path: pieSlicePath(rOuter.value * 0.98, a0, a1),
        }
    })
})

function labelFor(hex) {
    return hex.replace('#', '').toUpperCase()
}

function spin() {
    if (spinning.value) return
    spinning.value = true
    transitionStyle.value = 'none'
    void document?.body?.offsetHeight // flush styles
    const baseSpins = 3 + Math.random() * 3
    const randomOffset = Math.random() * 360
    const target = rotation.value + baseSpins * 360 + randomOffset
    const duration = 3200 + Math.random() * 2000
    const easing = 'cubic-bezier(0.12, 0.5, 0.08, 1)'
    transitionStyle.value = `transform ${duration}ms ${easing}`
    rotation.value = target
}

function onSpinEnd() {
    const norm = ((rotation.value % 360) + 360) % 360
    const pointerAngle = (360 - norm) % 360
    const index = Math.floor(pointerAngle / seg) % N
    const winningColor = colors[index]
    emit('result', winningColor)
    spinning.value = false
}
</script>

<template>
    <div 
        class="color-wheel" 
        :style="{ '--size': size + 'px' }" 
        @click="spin" 
        role="button"
        :aria-disabled="spinning ? 'true' : 'false'" 
        :tabindex="spinning ? -1 : 0" 
        @keydown.enter.prevent="spin"
        @keydown.space.prevent="spin"
    >

        <div class="pointer" aria-hidden="true">
            <svg :width="pointerSize" :height="pointerSize" viewBox="0 0 100 100">
                <polygon points="50,50 20,0 80,0" :stroke="isDarkMode ? '#CCCCCC' : '#4A4A4A'" :fill="isDarkMode ? '#6A6A6A' : '#CCCCCC'" />
            </svg>
        </div>

        <div 
            class="wheel" 
            :style="{
                transform: `rotate(${rotation}deg)`,
                transition: transitionStyle,
            }" 
            @transitionend="onSpinEnd"
        >
            <svg 
                :width="size" 
                :height="size" 
                :viewBox="`0 0 ${size} ${size}`"
            >
                <g :transform="`translate(${size / 2}, ${size / 2})`">
                    <template v-for="(slice) in slices" :key="'wedge-' + i">
                    <path
                        :d="slice.path"
                        :fill="slice.color"
                        :stroke="sliceStroke"
                        :stroke-width="sliceStrokeWidth"
                    />
                    </template>

                    <template v-for="(slice, i) in slices" :key="'label-' + i">
                    <text
                        v-if="showLabels"
                        :transform="`rotate(${slice.midAngle - 3}) translate(${labelRadius + 10} 0) rotate(${slice.midAngle > 90 && slice.midAngle < 270 ? 180 : 0})`"
                        text-anchor="middle"
                        dominant-baseline="central"
                        :fill="adaptColorToBackground(slice.color)"
                        :font-size="Math.round(size * 0.045)"
                        style="pointer-events:none; user-select:none;"
                    >
                        {{ labelFor(slice.color) }}
                    </text>
                    </template>

                    <circle :r="size * 0.21" :fill="centerFill" />
                    <circle :r="size * 0.19" :fill="centerInnerFill" />
                </g>
            </svg>
        </div>
        <BaseBubbles random-color v-if="spinning" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
    </div>
</template>

<style scoped>
.color-wheel {
    --size: 200px;
    position: relative;
    width: var(--size);
    height: var(--size);
    margin: 0 auto;
    user-select: none;
    touch-action: manipulation;
    display: grid;
    place-items: center;
}

.wheel {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: radial-gradient(closest-side, rgba(255, 255, 255, 0.1), transparent);
    will-change: transform;
}

.pointer {
    position: absolute;
    top: -4%;
    left: 50%;
    transform: translateX(-50%);
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 3;
}

.pointer svg polygon {
    stroke-width: 4;
    stroke-linejoin: round;
}

.tap-hint {
    position: absolute;
    bottom: -2.2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.95rem;
    color: #6b7280;
    /* gray-500 */
    letter-spacing: 0.2px;
    pointer-events: none;
}

/* Click feedback when not spinning */
.color-wheel[aria-disabled="false"]:active .wheel {
    filter: brightness(1.03);
}
</style>
