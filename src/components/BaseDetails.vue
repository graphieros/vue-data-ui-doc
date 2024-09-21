<script setup>
    import { ref, onMounted, computed } from "vue";
import { useMainStore } from "../stores";
    
    const store = useMainStore()

    const isDarkMode = computed(() => store.isDarkMode);

    defineProps({
        attr: {
            type: String,
            default: ''
        },
        level: {
            type: [Number, String],
            default: ''
        },
        equal: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: ''
        }
    })
    
    const det = ref(null);
    const isOpen = ref(false);

    onMounted(() => {
        if (det.value) {
            det.value.addEventListener('toggle', () => {
                isOpen.value = !isOpen.value;
            })
        }
    })

    const isSelected = ref(false);

</script>

<template>
    <div class="relative">
        <details ref="det" :style="level ? `margin-left:0px` : ''" :class="`border-l ${isSelected ? 'border-app-blue dark:border-app-green' : 'border-gray-500'} rounded-md pl-2 bg-[#1A1A1A05] dark:bg-[#FFFFFF05] mb-2 shadow`">
            <summary @mouseenter="isSelected=true" @mouseout="isSelected=false" class="cursor-pointer font-black hover:bg-[#5f8aee20] dark:hover:bg-[#42d39220] transition-colors">{{ attr }} {{ equal ? '=' : ':' }} {{ isOpen ? `{` : `{ ... }`}}</summary>
            <code class="pl-6 flex flex-col">
                <slot/>
            </code>
        <span v-if="isOpen">{{`}`}}</span>
        </details>
        <div v-if="isSelected && title" class="text-black dark:text-gray-300 hidden sm:flex -top-12 left-0 place-items-center justify-center absolute z-10 bg-white shadow-xl dark:bg-black-100 text-xs text-left p-2 rounded border-2 border-black dark:border-app-green">
            {{ title }}
            <svg class="absolute -left-4 top-1/2" viewBox="0 0 64 64" height="50" width="50" style="overflow:visible; pointer-events: none;">
                <path v-if="isDarkMode" d="M 17,0 0,0 0,56 17,56" stroke="#42d392" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                <path v-else d="M 17,0 0,0 0,56 17,56" stroke="#1A1A1A" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </div>
    </div>
</template>