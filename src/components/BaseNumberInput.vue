<script setup>
import { ref, computed } from "vue";

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
    }
});

const emit = defineEmits(['update:value', 'change']);

function decrement() {
    const newVal = props.value - props.step;
    if (newVal >= props.min) {
        emit('update:value', newVal)
    }
}

function increment() {
    const newVal = props.value + props.step;
    if(newVal <= props.max) {
        emit('update:value', newVal)
    }
}
    
</script>

<template>
    <div class="inline-flex flex-row place-items-center">
        <button class="btn-left bg-app-blue w-[24px] h-[24px] opacity-80 hover:opacity-100 transition-all text-white hover:shadow-md" @click="decrement">-</button>
        <input class="numinput pl-2 min-w-[74px]" type="number" :min="min" :max="max" :step="step" :value="Math.round(Number(value) * 1000) / 1000" @input="emit('update:value', $event.target.value)" @change="emit('change')">
        <button class="btn-right bg-app-blue w-[24px] h-[24px] opacity-80 hover:opacity-100 transition-all text-white hover:shadow-md" @click="increment">+</button>
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