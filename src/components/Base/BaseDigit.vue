<script setup>
import { ref, computed } from "vue";
import { VueUiDigits } from "vue-data-ui";
import { useMainStore } from "../../stores";

const props = defineProps({
    value: { type: Number, required: true },
    h: { type: Number, default: 5 },
    color: { type: String },
    backgroundColor:  { type: String, default: 'transparent' },
    skeletonColor: { type: String },
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const wrapperClass = computed(() => {
    return `h-${props.h}`;
});

const _color = computed(() => {
    if (!props.color) {
        return isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
    }
    return props.color;
});

const _skeletonColor = computed(() => {
    if (!props.skeletonColor) {
        return isDarkMode.value ? '#3A3A3A' : '#E1E5E8'
    }
    return props.skeletonColor;
})

const config = computed(() => {
    return {
        backgroundColor: props.backgroundColor,
        digits: {
            color: _color.value,
            skeletonColor: _skeletonColor.value,
        }
    }
});

</script>

<template>
    <div :class="wrapperClass">
        <VueUiDigits :dataset="value" :config="config"/>
    </div>
</template>