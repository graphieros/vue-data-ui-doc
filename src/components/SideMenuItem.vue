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
        <div :class="`text-sm relative ${isSelected(itsRoute) ? 'bg-[#42d39220]' : ''} flex place-items-center transition-all hover:bg-[#42d39220] py-1 gap-1 pl-6 ${isSelected(itsRoute) ? 'text-app-blue dark:text-app-green hover:cursor-default font-bold' : ''}`" @click="emit('close')">
            <VueUiIcon :size="18" :name="icon" :stroke="getIconColor(itsRoute)"/>
            <span class="text-gray-500">VueUi</span>
            <span class="text-gray-800 dark:text-gray-300">
                {{ componentName }}
            </span>
            <div :class="`is-item-selected bg-app-green ${isSelected(itsRoute) ? 'is-active' : ''}`"></div>
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