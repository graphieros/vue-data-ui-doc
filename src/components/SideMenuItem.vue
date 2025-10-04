<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router";
import { useMainStore } from "../stores";

defineProps({
    itsRoute: {
        type: String,
        default: '404'
    },
    componentName: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['close', 'scrollToTop'])

const router = useRouter();
const store = useMainStore();
const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath
})

function isSelected(route) {
    return currentRoute.value === route;
}

function getIconColor(route) {
    if(isSelected(route)) {
        if(isDarkMode.value) {
            return '#42d392'
        } else {
            return '#5f8bee'
        }
    } else {
        if(isDarkMode.value) {
            return 'rgb(156, 163, 175)'
        } else {
            return 'rgb(31, 41, 55)'
        }
    }
}

</script>

<template>
    <router-link :to="itsRoute" @click="emit('scrollToTop')">
        <div :class="`
            my-1 text-sm relative 
            rounded-[12px]
            py-2
            ${isSelected(itsRoute) ? `shadow-[inset_0_1px_1px_#FFFFFF,0_2px_3px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_1px_#4A4A4A,0_2px_3px_rgba(0,0,0,0.5)] ${isDarkMode ? 'border-r-2 border-app-green' : ''}` : ''}
            ${isSelected(itsRoute) ? isDarkMode ? `bg-[#3A3A3A] shadow` : 'bg-gray-100 shadow' : ''} 
            flex place-items-center transition-all 
            ${isDarkMode ? 'hover:bg-[#3A3A3A]' : 'hover:bg-gray-100'} 
            py-1 gap-1 pl-4 
            ${isSelected(itsRoute) ? 'text-app-blue dark:text-app-green hover:cursor-default font-bold' : ''}`" 
            @click="emit('close')"
        >
            <VueUiIcon :size="18" :name="icon" :stroke="getIconColor(itsRoute)"/>
            <span v-if="!['/docs#utility-functions'].includes(itsRoute)" class="text-gray-500">VueUi</span>
            <span class="text-gray-800 dark:text-gray-300">
                {{ componentName }}
            </span>
        </div>
    </router-link>
</template>

<style>
.is-item-selected {
    position: absolute;
    right: 2px;
    top: 0;
    height: 100%;
    width: 4px;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.is-active {
    opacity: 1
}
</style>