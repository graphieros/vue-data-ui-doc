<script setup>
import { ref, computed, watch } from "vue";
import { useMainStore } from "../stores";
import BaseDocHeaderActions from "./BaseDocHeaderActions.vue";

const props = defineProps({
    componentName: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    chartWidth: {
        type: String,
        default: '300px'
    },
    targetLink: {
        type: String,
    },
    targetMaker: {
        type: String
    },
    configSource: {
        type: Object,
    },
    schema: {
        type: String,
        default: ''
    }
})

const store = useMainStore();
const isMenuOpen = ref(store.isMenuOpen);

watch(() => store.isMenuOpen, (state) => {
    isMenuOpen.value = state
}, { immediate: true})

const isPinned = ref(false);


function pin(state) {
    isPinned.value = state;
}
// menu open: 300px; closed: 59px

const headerClass = computed(() => {
    return `fixed top-[50px] left-0 flex flex-row w-full pt-4 sm:pt-12 pb-2 sm:pb-8 z-1 bg-white dark:bg-[#1A1A1A] z-10 overflow-auto`
})
    
</script>

<template>
    <div :class="headerClass">
        <div :class="`${isMenuOpen ? 'w-[360px]' : 'w-[59px]'}`"/>
        <div class="w-full pl-14 flex flex-col">
            <div class="flex flex-row gap-6 pr-24">
                <h1 class="flex flex-col sm:flex-row place-items-center w-full justify-start gap-5 font-inter-medium text-app-blue mb-2 text-2xl">
                    <div class="flex flex-row place-items-center gap-2">
                        <VueUiIcon :name="icon" stroke="#42d392" :strokeWidth="1.5" />
                        <span>VueUi<span class="text-black dark:text-app-blue-light">{{ componentName }}</span></span>
                    </div>
                    <BaseDocHeaderActions
                        :targetLink="targetLink"
                        :targetMaker="targetMaker"
                        :configSource="configSource"
                    />
                </h1>
            </div>
            <p class="max-w-[300px] sm:max-w-[600px] -ml-6 sm:ml-0 text-md text-black dark:text-gray-500 mb-2 text-left">
                {{ description }}
            </p>
        </div>
    </div>
</template>