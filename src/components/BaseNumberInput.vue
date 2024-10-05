<script setup>
import { ref, computed } from "vue";
import { adaptColorToBackground } from "./maker/lib";

const props = defineProps({
    value: {
        type: [Number, String],
        default: 0
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
    },
    step: {
        type: Number,
        default: 1
    },
    buttonColor: {
        type: String,
        default: "#5f8aee"
    }
});

const emit = defineEmits(['update:value', 'change']);

function decrement() {
    const newVal = props.value - props.step;
    if (newVal >= props.min) {
        emit('update:value', newVal)
        emit('change')
    }
}

function increment() {
    const newVal = props.value + props.step;
    if(newVal <= props.max) {
        emit('update:value', newVal)
        emit('change')
    }
}
    
</script>

<template>
    <div class="inline-flex flex-row place-items-center">
        <button :style="{ background: buttonColor, color: adaptColorToBackground(buttonColor) }" class="btn-left w-[24px] h-[24px] opacity-80 hover:opacity-100 transition-all hover:shadow-md" @click="decrement">-</button>
        <input class="numinput pl-2 min-w-[74px] max-w-[120px]" type="number" :min="min" :max="max" :step="step" :value="Math.round(Number(value) * 1000) / 1000" @input="emit('update:value', $event.target.value)" @change="emit('change')">
        <button :style="{ background: buttonColor, color: adaptColorToBackground(buttonColor) }" class="btn-right w-[24px] h-[24px] opacity-80 hover:opacity-100 transition-all hover:shadow-md" @click="increment">+</button>
    </div>
</template>

<style scoped>
button {
    font-weight: bold;
}

.btn-left {
    border-radius: 6px 0 0 6px;
}
.btn-right {
    border-radius: 0 6px 6px 0;
}
</style>