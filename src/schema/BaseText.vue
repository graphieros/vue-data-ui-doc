<script setup>

defineProps({
    label: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    isCode: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <div class="flex flex-row gap-1">
        <div class="text-gray-500 flex flex-row min-w-[110px]">
            {{ label }} :
        </div>
        <code v-if="isCode">{{ text }}</code>
        <div v-else>
            {{ text }}
        </div>
    </div>
</template>