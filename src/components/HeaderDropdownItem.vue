<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentRoute = computed(() => {
    return router.currentRoute.value.path;
});

function isSelected(route) {
    return currentRoute.value === route;
}

defineProps({
    link: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    clickableWhenActive: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits('click')
    
</script>

<template>
    <router-link :to="link" :class="{'link-disabled': isSelected(link) && !clickableWhenActive, 'text-black-100 dark:text-gray-200': !isSelected(link), 'text-black dark:text-app-green': isSelected(link)}">
        <button @click="emit('click')"
            :class="`pl-2 flex flex-row palce-items-center justify-between transition-all my-2 ${isSelected(link) ? 'bg-gray-100 dark:bg-[#3A3A3A] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]' : 'hover:shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] hover:dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] hover:bg-gray-150 hover:dark:bg-[#3A3A3A]'} flex flex-row place-items-center justify-end gap-2 w-full py-1 pr-4 cursor-pointer rounded-full`">
            <div v-if="isSelected(link)" class="bg-app-green h-3 w-3 rounded-full shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#CCCCCC,0_4px_6px_rgba(0,0,0,0.5)]"/>
            <div v-else class="bg-transparent h-3 w-3 rounded-full"/>
            {{ title }}
        </button>
    </router-link>
</template>