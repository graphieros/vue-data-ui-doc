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
    },
    focused: {
        type: Boolean,
        default: false,
    },
    forceLight: {
        type: Boolean,
        default: false,
    },
    backgroundColor: {
        type: String,
        default: ''
    }
});

const background = computed(() => {
    if (props.backgroundColor) {
        return props.backgroundColor;
    }
    if (props.type === 'light') {
        return 'bg-gray-50 dark:bg-[#3A3A3A]'
    }
    if (props.type === 'medium') {
        return 'bg-gray-100 dark:bg-[#2A2A2A]'
    }
    if (props.type === 'dark') {
        return 'bg-gray-200 dark:bg-[#242424]'
    }
    if (props.type === 'success') {
        return 'bg-gradient-to-br from-app-green-light to-app-green'
    }
    return ''
})

</script>

<template>
    <div :class="`
        base-card
        ${background}
        ${padding}
        ${rounding}
        ${borderRight}
        ${focused ? 'border-2 border-app-green dark:border-app-green' : ''}
        shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] ${!forceLight ? 'dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]' : ''}
        `"
    >
        <slot/>
    </div>
</template>