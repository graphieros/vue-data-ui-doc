<script setup>
import { ref, computed, watch, toRefs, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { adaptColorToBackground } from './maker/lib';
import { convertColorToHex } from '../useNestedProp';
import { useMainStore } from '../stores';
import BaseCard from './BaseCard.vue';
import { getPalette } from 'vue-data-ui';
import ThemeTag from './ThemeTag.vue';

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
    },
    withRange: {
        type: Boolean,
        default: true,
    },
    withTextInput: {
        type: Boolean,
        default: true
    },
    wrapperTw: {
        type: String,
        default: 'w-fit'
    },
    labelAsCode: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:value', 'change'])
const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const { value } = toRefs(props)
const hexColor = ref('#000000') 
const alpha = ref(1);

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
])

const palette = ref(defaultPalette.value);
const selectedPalette = ref('base')

const themePalettes = computed(() => {
    const baseColor = {
        default: '#2A2A2A',
        zen: '#B9B99D',
        concrete: '#4A6A75',
        base: '#000000',
        hack: '#009900',
        celebration: '#D32F2F',
        minimal: '#454862',
        minimalDark: '#65698E'
    }

    const p = [
        'default',
        'celebration',
        'zen',
        'concrete',
        'hack',
        'minimal',
        'minimalDark'
    ].map(theme => {
        return {
            name: theme,
            palette: getPalette(theme),
            grid: '32px 32px 32px 32px 32px 32px',
            accent: baseColor[theme]
        }
    });

    return [{
        name: 'base',
        palette: defaultPalette.value,
        grid: '32px 32px 32px 32px',
        accent: baseColor.base
    }, ...p]
});

const open = ref(false);
const pickerButton = ref(null)
const pickerPosition = ref({ top: 0, left: 0 })
const pickerRef = ref(null)
const pickerPlacement = ref('below') // 'below' | 'above'

const to = ref(null)

function close() {
    if (to.value) {
        clearTimeout(to.value)
    }
    to.value = setTimeout(() => {
        open.value = false;
    }, 0)
}

/**
 * Position the picker above or below the button depending on viewport space.
 * While open, this is called on scroll/resize to keep it anchored.
 * Also used before first open to avoid the top-left bug.
 */
function updatePickerPosition() {
    if (!pickerButton.value) return

    const buttonRect = pickerButton.value.getBoundingClientRect()
    const pickerEl = pickerRef.value
    const estimatedHeight = 220 // fallback in case ref is not ready
    const pickerHeight = pickerEl?.offsetHeight ?? estimatedHeight

    const spaceBelow = window.innerHeight - buttonRect.bottom
    const spaceAbove = buttonRect.top

    // Prefer below when possible; otherwise above
    const placeBelow = spaceBelow >= pickerHeight || spaceBelow >= spaceAbove
    pickerPlacement.value = placeBelow ? 'below' : 'above'

    const top = placeBelow
        ? buttonRect.bottom + 4
        : Math.max(4, buttonRect.top - pickerHeight - 4)

    pickerPosition.value = {
        top,
        left: buttonRect.left + buttonRect.width / 2
    }
}

async function openPicker() {
    open.value = true;
    await nextTick();
    updatePickerPosition();
}

function handleDocumentClick(e) {
    if (!open.value) return

    const dialogEl = pickerRef.value
    const buttonEl = pickerButton.value

    if (!dialogEl) return

    if (dialogEl.contains(e.target)) {
        return
    }

    // If click is on the button, ignore
    if (buttonEl && buttonEl.contains(e.target)) {
        return
    }

    open.value = false
}

onMounted(() => {
    window.addEventListener('scroll', updatePickerPosition, true)
    window.addEventListener('resize', updatePickerPosition)
    document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updatePickerPosition, true)
    window.removeEventListener('resize', updatePickerPosition)
    document.removeEventListener('click', handleDocumentClick)
})

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
});

const colorValue = ref(rgbaColor.value)
const updatingFromTextInput = ref(false)

watch(rgbaColor, (newColor) => {
    if (!updatingFromTextInput.value) {
        colorValue.value = newColor
    }
    emit('update:value', newColor)
    emit('change')
    updatingFromTextInput.value = false
})

function setColor(c) {
    hexColor.value = c;
    updateColorFromHex();
}

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

function parseHexColorInput(input) {
    let hex = input.trim();

    if (!hex.startsWith('#')) return null;
    hex = hex.slice(1);

    if (![3, 4, 6, 8].includes(hex.length)) return null;
    if (!/^[0-9a-fA-F]+$/.test(hex)) return null;

    if (hex.length === 3 || hex.length === 4) {
        hex = hex.split('').map(ch => ch + ch).join('');
    }

    let a = 1;

    if (hex.length === 8) {
        const rgbHex = hex.slice(0, 6);
        const aHex = hex.slice(6);
        const aInt = parseInt(aHex, 16);

        if (!Number.isNaN(aInt)) {
            a = +(aInt / 255).toFixed(2);
        }

        hex = rgbHex;
    }

    return {
        hex: `#${hex.toUpperCase()}`,
        alpha: a
    };
}

function updateColorFromInput() {
    updatingFromTextInput.value = true
    const input = colorValue.value.trim()

    // Accept both rgb and rgba
    if (input.startsWith('rgba') || input.startsWith('rgb')) {
        const match = input.match(
            /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d?\.?\d+))?\s*\)/
        )
        if (match) {
            const r = +match[1]
            const g = +match[2]
            const b = +match[3]
            const a = match[4] !== undefined ? +match[4] : 1

            hexColor.value = rgbToHex(r, g, b)
            alpha.value = a
        }
    } else if (input.startsWith('hsla') || input.startsWith('hsl')) {
        const match = input.match(
            /hsla?\(\s*(\d+)\s*,\s*(\d+)%,\s*(\d+)%(?:\s*,\s*(\d?\.?\d+))?\s*\)/
        )
        if (match) {
            const [r, g, b] = hslToRgb(+match[1], +match[2], +match[3])
            const a = match[4] !== undefined ? +match[4] : 1

            hexColor.value = rgbToHex(r, g, b)
            alpha.value = a
        }
    } else if (input.startsWith('#')) {
        const parsed = parseHexColorInput(input)
        if (parsed) {
            hexColor.value = parsed.hex
            alpha.value = parsed.alpha
        } else {
            return
        }
    }
}

function parseModelValue(val) {
    const input = val.trim()

    // Accept both rgb and rgba
    if (input.startsWith('rgba') || input.startsWith('rgb')) {
        const match = input.match(
            /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d?\.?\d+))?\s*\)/
        )
        if (match) {
            const r = +match[1]
            const g = +match[2]
            const b = +match[3]
            const a = match[4] !== undefined ? +match[4] : 1

            hexColor.value = rgbToHex(r, g, b)
            alpha.value = a
        }
    } else if (input.startsWith('#')) {
        const parsed = parseHexColorInput(input)
        if (parsed) {
            hexColor.value = parsed.hex
            alpha.value = parsed.alpha
        }
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

const grid = ref('32px 32px 32px 32px');

function setPalette(p) {
    palette.value = p.palette;
    grid.value = p.grid;
    selectedPalette.value = p.name;
}
</script>

<template>
    <BaseCard padding="0" type="light" :class="wrapperTw">
        <div class="inline-flex flex-col flex-wrap px-2 mt-2 pb-2">
            <slot name="before"/>
            <code v-if="labelAsCode" class="text-black dark:text-[#CCCCCC]">{{ label }}</code>
            <label v-else class="text-xs text-black dark:text-white">{{ label }}</label>
            <div class="color-picker flex flex-row">
                <div class="flex flex-col place-items-center">
    
                    <button
                        ref="pickerButton"
                        class="h-[20px] my-1 w-[110px] relative rounded-lg outline outline-[#CCCCCC] dark:outline-[#5A5A5A] hover:!outline-app-blue dark:hover:!outline-[#8A8A8A] !transition-colors"
                        :style="{ background: rgbaColor }"
                        @click="openPicker"
                        @keydown.esc="close"
                    >
                        <input
                            ref="myColorInput"
                            type="color"
                            v-model="hexColor"
                            @input="updateColorFromHex"
                            class="hidden-input"
                        />
                    </button>

                    <Teleport to="body">
                        <Transition :name="pickerPlacement === 'above' ? 'picker-top' : 'picker-bottom'">
                            <div
                                v-if="open"
                                ref="pickerRef"
                                class="fixed z-[2147483647] -translate-x-1/2"
                                :style="{
                                    top: pickerPosition.top + 'px',
                                    left: pickerPosition.left + 'px'
                                }"
                            >
                                <BaseCard type="light" padding="p-2">
                                    <div class="flex flex-col">
                                        <div class="flex flex-row flex-wrap max-w-[150px] p-1 gap-1 text-xs justify-center mx-auto">
                                            <button v-for="p in themePalettes" @click="setPalette(p)" class="pl-1 pr-2 bg-white shadow-md dark:bg-[#5A5A5A] text-black dark:text-[#FFFFFF] rounded-full flex flex-row place-items-center gap-1" :style="{
                                                outline: selectedPalette === p.name ? isDarkMode ? '1px solid white' : '1px solid #2A2A2A' : undefined
                                            }">
                                                <svg class="rounded-full shadow-[inset_0_2px_2px_#FFFFFF,0_2px_3px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_2px_3px_rgba(0,0,0,0.5)]" viewBox="0 0 10 10" height="10" width="10"><circle cx="5" cy="5" r="5" :fill="p.accent"/></svg>
                                                {{ p.name }}
                                            </button>
                                        </div>
                                        <div class="color-picker-dialog bg-transparent" :style="{
                                            gridTemplateColumns: grid
                                        }">
                                            <button 
                                                v-for="c in palette" 
                                                :key="c"
                                                class="color-picker-option outline outline-gray-300 dark:outline-[#5A5A5A] hover:outline-gray-500 hover:dark:outline-gray-200 hover:outline-dotted"  
                                                :style="{ backgroundColor: c }" 
                                                @click="() => setColor(c)"
                                            />
                                            <div
                                                class="my-color-picker-option-empty"
                                                @click="triggerColorPicker"
                                                :style="{ background: value }"
                                            >
                                                <VueUiIcon
                                                    name="palette"
                                                    :stroke="adaptColorToBackground(convertColorToHex(value))"
                                                    :size="20"
                                                />
                                            </div>
                                            <div/>
                                            <div class="absolute -top-3 -right-3 bg-white dark:bg-[#2A2A2A] shadow-md rounded-full">
                                                <button
                                                    @click="close"
                                                    class="flex place-items-center justify-center rounded-full p-1 hover:bg-gray-100 hover:dark:bg-[#4A4A4A] transition-colors"
                                                >
                                                    <VueUiIcon
                                                        name="close"
                                                        :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </BaseCard>
                            </div>
                        </Transition>
                    </Teleport>
                    
                    <div
                        v-if="withRange"
                        class="inline-flex place-items-center justify-center gap-2 relative h-[20px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md dark:border-t dark:border-[#6A6A6A]"
                    >
                        <input
                            aria-label="Alpha channel"
                            type="range"
                            class="w-full accent-app-blue"
                            v-model="alpha"
                            min="0"
                            max="1"
                            step="0.01"
                            @input="updateColorFromAlpha"
                        />
                    </div>
                </div>
                <input
                    v-if="withTextInput"
                    :aria-labelledby="labelId"
                    :id="id"
                    type="text"
                    class="text-xs h-[36px] w-[200px]"
                    v-model="colorValue"
                    @input="updateColorFromInput"
                    placeholder="Enter RGBA / HSLA / HEX"
                />
            </div>
            <slot name="after"/>
        </div>
        <slot/>
    </BaseCard>
</template>

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
    /* box-shadow: 0 6px 12px rgba(0,0,0,0.3); */
    display: grid;
    gap: 6px;
    padding: 6px;
    z-index: 1;
}

.color-picker-option {
    align-items:center;
    border-radius: 3px;
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
    border-radius: 3px;
    cursor: pointer;
}

.hidden-input {
    max-height: 0px;
    max-width: 0px;
    visibility: hidden;
}

.picker-bottom-enter-active,
.picker-bottom-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.picker-bottom-enter-from,
.picker-bottom-leave-to {
    opacity: 0;
    transform: translateY(-40px) translateX(-50%) scale(1,0.7);
}

.picker-top-enter-active,
.picker-top-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.picker-top-enter-from,
.picker-top-leave-to {
    opacity: 0;
    transform: translateY(40px) translateX(-50%) scale(1,0.7);
}
</style>
