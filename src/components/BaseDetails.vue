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
    <details ref="det" :style="level ? `margin-left:0px` : ''" :class="`border-l ${isSelected ? 'border-app-blue dark:border-app-green' : 'border-gray-500'} rounded-md pl-2 bg-[#1A1A1A05] dark:bg-[#FFFFFF05] mb-2 shadow`">
        <summary @mouseenter="isSelected=true" @mouseout="isSelected=false" :title="title" class="cursor-pointer font-black hover:bg-[#5f8aee20] dark:hover:bg-[#42d39220]">{{ attr }} {{ equal ? '=' : ':' }} {{ isOpen ? `{` : `{ ... }`}}</summary>
        <code class="pl-6 flex flex-col">
            <slot/>
        </code>
    <span v-if="isOpen">{{`}`}}</span>
    </details>
</template>