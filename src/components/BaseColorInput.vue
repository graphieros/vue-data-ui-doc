<template>
    <div class="inline-flex flex-col flex-wrap border-l border-r border-b border-[#9A9A9A] dark:border-[#4A4A4A] px-2 mt-2 rounded-md pb-2 bg-[#FFFFFF10]">
        <label class="text-xs text-black dark:text-white">{{ label }}</label>
        <div class="color-picker flex flex-row">
            <div class="flex flex-col place-items-center">

                <button class="h-[20px] my-1 w-[110px] relative rounded-lg outline outline-gray-500" :style="{ background: rgbaColor }" @click="open = true" v-click-outside="close" @keydown.esc="close">
                    <div v-if="open" class="absolute top-[100%] left-1/2 -translate-x-1/2 color-picker-dialog bg-white dark:bg-[#2A2A2A]">
                        <div 
                            v-for="c in defaultPalette" 
                            class="color-picker-option"  
                            :style="{ 
                                backgroundColor: c,
                                outline: `1px solid #CCCCCC`, 
                            }" 
                            @click="() => setColor(c)"
                        />
                        <div class="my-color-picker-option-empty" @click="triggerColorPicker" :style="{
                            background: value
                        }">
                            <VueUiIcon name="palette" :stroke="adaptColorToBackground(convertColorToHex(value))" :size="20"/>
                        </div>
                    </div>
                    <input ref="myColorInput" type="color"  v-model="hexColor" @input="updateColorFromHex" class="hidden-input"/>
                </button>
                
                <div class="inline-flex place-items-center justify-center gap-2 relative h-[20px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                    <input aria-label="Alpha channel" type="range" class="w-full accent-app-blue" v-model="alpha" min="0" max="1" step="0.01" @input="updateColorFromAlpha" />
                </div>
            </div>
            <input :aria-labelledby="labelId" :id="id" type="text" class="text-xs h-[36px] w-[200px]" v-model="colorValue" @input="updateColorFromInput" placeholder="Enter RGBA" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, toRefs, onMounted } from 'vue'
import { adaptColorToBackground } from './maker/lib';
import vClickOutside from "../directives/vClickOutside"
import { convertColorToHex } from '../useNestedProp';

const props = defineProps({
    value: {
        type: String,
        default: 'rgba(255, 0, 0, 0)', 
    },
    label: {
        type: String,
        default: ''
    },
    labelId: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:value', 'change'])

const { value } = toRefs(props)
const hexColor = ref('#000000') 
const alpha = ref(1) 

const defaultPalette = ref([
    '#000000',
    '#FFFFFF',
    "#D3D3D3",
    "#A9A9A9",
    "#808080",
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FFC300',
    '#800080',
    '#FF1493',
    '#00CED1',
]);

function close(_e){
    open.value = false;
}

const open = ref(false);

parseModelValue(value.value)

const myColorInput = ref(null);

const triggerColorPicker = () => {
    myColorInput.value?.click();
};

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

function setColor(c) {
    hexColor.value = c;
    updateColorFromHex();
}

function updateColorFromHex() {
    colorValue.value = rgbaColor.value
    console.log(colorValue.value)
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

.color-picker-dialog {
    border-radius: 0px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
    display: grid;
    gap: 6px;
    grid-template-columns: 32px 32px 32px;
    padding: 6px;
    z-index: 1;
}

.color-picker-option {
    align-items:center;
    border-radius: 0px;
    display: flex;
    height: 32px;
    justify-content: center;
    position: relative;
    width: 32px;
}

.my-color-picker-option-empty {
    height: 32px;
    width: 32px;
    border: 2px dashed #CCCCCC;
    display: flex;
    align-items:center;
    justify-content:center;
}

.hidden-input {
    max-height: 0px;
    max-width: 0px;
    visibility: hidden;
}

</style>

