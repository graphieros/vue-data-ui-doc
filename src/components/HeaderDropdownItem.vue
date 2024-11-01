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
        <span @click="emit('click')"
            class="flex flex-row place-items-center justify-end gap-2 w-full py-1 pr-4 cursor-pointer border-r-2 border-transparent hover:border-r-2 hover:border-app-green hover:bg-[#42d39220] hover:shadow-xl">
            <span v-if="isSelected(link)" class="text-app-green text-xs">⬤</span>
            {{ title }}
        </span>
    </router-link>
</template>