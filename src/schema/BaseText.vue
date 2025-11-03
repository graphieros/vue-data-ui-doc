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
    },
    codeTw: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <div class="flex flex-row gap-1">
        <div class="text-gray-500 dark:text-[#8A8A8A] flex flex-row min-w-[110px]">
            {{ label }} :
        </div>
        <slot>
            <code v-if="isCode" :class="codeTw">{{ text }}</code>
            <div v-else>
                {{ text }}
            </div>
        </slot>
    </div>
</template>