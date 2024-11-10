<template>
    <div class="inline-flex flex-col flex-wrap border-l border-r border-b border-black dark:border-[#8A8A8A] px-2 mt-2 rounded-md pb-2 bg-[#FFFFFF10]">
        <label class="text-xs">{{ label }}</label>
        <div class="color-picker flex flex-row">
            <div class="flex flex-col place-items-center">
                <input type="color" style="width: 120px !important" v-model="hexColor" @input="updateColorFromHex" />
                
                <div class="inline-flex place-items-center justify-center gap-2 relative h-[20px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                    <input type="range" class="w-full accent-app-blue" v-model="alpha" min="0" max="1" step="0.01" @input="updateColorFromAlpha" />
                </div>
            </div>
            <div class="color-preview" :style="{ backgroundColor: rgbaColor }"></div>
            <input type="text" class="text-xs h-[36px] w-[200px]" v-model="colorValue" @input="updateColorFromInput" placeholder="Enter RGBA" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, toRefs } from 'vue'

const props = defineProps({
    value: {
        type: String,
        default: 'rgba(255, 0, 0, 0)', 
    },
    label: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:value', 'change'])

const { value } = toRefs(props)
const hexColor = ref('#000000') 
const alpha = ref(1) 

parseModelValue(value.value)

watch(value, (newValue) => {
    parseModelValue(newValue)
})

const rgbaColor = computed(() => {
    const [r, g, b] = hexToRgb(hexColor.value)
    return `rgba(${r}, ${g}, ${b}, ${alpha.value})`
})

const colorValue = ref(rgbaColor.value)

watch(rgbaColor, (newColor) => {
    colorValue.value = newColor
    emit('update:value', newColor)
    emit('change')
})

function updateColorFromHex() {
    colorValue.value = rgbaColor.value
    emit('update:value', rgbaColor.value)
    emit('change')
}

function updateColorFromAlpha() {
    colorValue.value = rgbaColor.value
    emit('update:value', rgbaColor.value)
    emit('change')
}

function updateColorFromInput() {
    const input = colorValue.value.trim()
    if (input.startsWith('rgba')) {
        const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d(\.\d+)?)\)/)
        if (match) {
            hexColor.value = rgbToHex(+match[1], +match[2], +match[3])
            alpha.value = +match[4]
        }
    } else if (input.startsWith('hsla')) {
        const match = input.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d(\.\d+)?)\)/)
        if (match) {
            const [r, g, b] = hslToRgb(+match[1], +match[2], +match[3])
            hexColor.value = rgbToHex(r, g, b)
            alpha.value = +match[4]
        }
    } else if (input.startsWith('#')) {
        hexColor.value = input.slice(0, 7)
        alpha.value = parseFloat(input.slice(7)) || 1
    }
    emit('update:value', rgbaColor.value)
}

function parseModelValue(value) {
    if (value.startsWith('rgba')) {
        const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d(\.\d+)?)\)/)
        if (match) {
            hexColor.value = rgbToHex(+match[1], +match[2], +match[3])
            alpha.value = +match[4]
        }
    } else if (value.startsWith('#')) {
        hexColor.value = value.slice(0, 7)
        alpha.value = parseFloat(value.slice(7)) || 1
    }
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16)
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

function rgbToHex(r, g, b) {
    return (
        '#' +
        ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase()
    )
}

function hslToRgb(h, s, l) {
    s /= 100
    l /= 100
    const k = n => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}
</script>

<style scoped>
.color-picker {
    display: flex;
    gap: 10px;
    align-items: center;
}

.color-preview {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

input[type="range"] {
    width: 100px;
}
</style>