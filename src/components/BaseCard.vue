<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    type: {
        type: String,
        default: 'medium',
    },
    rounding: {
        type: String,
        default: 'rounded-2xl'
    },
    borderRight: {
        type: String,
        default: ''
    },
    padding: {
        type: String,
        default: 'p-4'
    }
});

const background = computed(() => {
    if (props.type === 'light') {
        return 'bg-gray-50 dark:bg-[#3A3A3A]'
    }
    if (props.type === 'medium') {
        return 'bg-gray-100 dark:bg-[#2A2A2A]'
    }
    if (props.type === 'dark') {
        return 'bg-gray-200 dark:bg-[#242424]'
    }
    return ''
})

</script>

<template>
    <div :class="`
        ${background}
        ${padding}
        ${rounding}
        ${borderRight}
        shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]
        `"
    >
        <slot/>
    </div>
</template>