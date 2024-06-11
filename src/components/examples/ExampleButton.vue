<script setup>
defineProps({
    isDarkMode: {
        type: Boolean,
        default: false,
    },
    selected: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['click'])
</script>

<template>
    <button :class="`relative rounded cursor-pointer py-2 px-4 border transition-colors ${selected ? 'bg-app-green cursor-default dark:text-black border-app-green' : 'hover:bg-gray-200 dark:hover:bg-[#42d39230] border-gray-400 dark:border-[#2A2A2A]'}`" @click="emit('click')">
        <svg class="absolute top-0.5 right-0.5" v-if="selected" viewBox="0 0 10 10" height="8" width="8">
            <circle cx="5.5" cy="6" r="5" :fill="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
            <circle cx="5" cy="5" r="5" :fill="isDarkMode ? '#1A1A1A' : '#F3F4F6'"/>
        </svg>
        <slot/>
    </button>
</template>