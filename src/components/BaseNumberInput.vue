<script setup>
import { ref, computed } from "vue";
import { adaptColorToBackground } from "./maker/lib";
import { useMainStore } from "../stores";
import { navigationMessage } from "../navigation/messages.js";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    value: {
        type: [Number, String],
        default: 0,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER,
    },
    step: {
        type: Number,
        default: 1,
    },
    buttonColor: {
        type: String,
        default: "#5f8aee",
    },
    rangeColor: {
        type: String,
        default: "#42d392",
    },
    labelId: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:value", "change"]);

function decrement() {
    const newVal = props.value - props.step;
    if (newVal >= props.min) {
        emit("update:value", +newVal);
        emit("change");
    }
}

function increment() {
    const newVal = props.value + props.step;
    if (newVal <= props.max) {
        emit("update:value", +newVal);
        emit("change");
    }
}

const valueRatio = computed(
    () => (props.value - props.min) / (props.max - props.min),
);
</script>

<template>
    <div
        class="number-input inline-flex flex-row place-items-center relative"
        :dir="store.lang === 'ar' ? 'rtl' : 'ltr'"
        data-testid="number-input"
    >
        <div
            style="
                position: absolute;
                top: 0;
                inset-inline-start: 24px;
                width: calc(100% - 48px);
                pointer-events: none;
            "
        >
            <div
                :style="{
                    width: `100%`,
                    background: isDarkMode ? '#1A1A1A' : '#E1E5E8',
                    height: '5px',
                    position: 'absolute',
                    insetInlineStart: 0,
                    top: '-3px',
                    borderRadius: '3px',
                    border: isDarkMode
                        ? '0.25px solid #4A4A4A'
                        : '0.25px solid #CCCCCC',
                }"
            />
            <div
                :style="{
                    width: `${valueRatio * 100}%`,
                    background: rangeColor,
                    height: '3px',
                    position: 'absolute',
                    insetInlineStart: 0,
                    top: '-2px',
                    borderRadius: '3px',
                }"
            />
            <div
                :style="{
                    width: `${valueRatio * 100}%`,
                    background: buttonColor,
                    height: '24px',
                    position: 'absolute',
                    insetInlineStart: 0,
                    top: '2px',
                    borderRadius: '3px',
                    opacity: 0.2,
                }"
            />
        </div>
        <button
            :style="{
                background: buttonColor,
                color: adaptColorToBackground(buttonColor),
            }"
            class="btn-start w-[24px] h-[24px] opacity-80 hover:opacity-100 transition-all hover:shadow-md shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#CCCCCC,0_4px_6px_rgba(0,0,0,0.5)]"
            data-number-action="decrement"
            :aria-label="navigationMessage('numberDecrement', store.lang)"
            @click="decrement"
        >
            <VueUiIcon name="minus" stroke="#FFFFFF" />
        </button>
        <input
            :aria-labelledby="labelId"
            class="numinput px-2 min-w-[74px] max-w-[120px] tabular-nums"
            dir="ltr"
            type="number"
            :min="min"
            :max="max"
            :step="step"
            :value="Math.round(Number(value) * 1000) / 1000"
            @input="emit('update:value', Number($event.target.value))"
            @change="emit('change')"
        />
        <button
            :style="{
                background: buttonColor,
                color: adaptColorToBackground(buttonColor),
            }"
            class="btn-end w-[24px] h-[24px] opacity-80 hover:opacity-100 transition-all hover:shadow-md shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#CCCCCC,0_4px_6px_rgba(0,0,0,0.5)]"
            data-number-action="increment"
            :aria-label="navigationMessage('numberIncrement', store.lang)"
            @click="increment"
        >
            <VueUiIcon name="plus" stroke="#FFFFFF" />
        </button>
    </div>
</template>

<style scoped>
button {
    font-weight: bold;
}

.btn-start {
    border-start-start-radius: 12px;
    border-end-start-radius: 12px;
}
.btn-end {
    border-start-end-radius: 12px;
    border-end-end-radius: 12px;
}
.number-input[dir="rtl"] .numinput {
    appearance: textfield;
    text-align: right;
}
.number-input[dir="rtl"] .numinput::-webkit-inner-spin-button,
.number-input[dir="rtl"] .numinput::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
