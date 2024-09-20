<script setup>
    import { ref, onMounted } from "vue";

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
        <div v-if="isSelected && title" class="text-black dark:text-gray-300 hidden sm:flex -top-12 left-0 place-items-center justify-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left p-2 rounded border border-black dark:border-app-green">
            {{ title }}
        </div>
    </div>
</template>