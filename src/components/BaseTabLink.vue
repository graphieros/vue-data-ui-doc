<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    action: {
        type: Function
    },
    icon: {
        type: String,
    }
})

</script>

<template>
    <div class="flex flex-row place-items-center justify-start my-2">
        <button @click="action" class="flex flex-row place-items-center justify-center gap-4 bg-gradient-to-br from-app-blue to-app-blue-dark hover:from-app-blue-dark hover:to-app-blue text-white rounded-full py-1 px-4 font-inter shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#CCCCCC,0_4px_6px_rgba(0,0,0,0.5)] text-left">
            <div class="w-4 h-4">
                <VueUiIcon :name="icon" :size="18" stroke="#FFFFFF"></VueUiIcon>
            </div>
            <slot/>
        </button>
    </div>
</template>