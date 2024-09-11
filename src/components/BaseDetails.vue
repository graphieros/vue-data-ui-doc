<script setup>
    import { ref, onMounted } from "vue";

    defineProps({
        attr: {
            type: String,
            default: ''
        },
        level: {
            type: Number,
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

</script>

<template>
    <details ref="det" :style="level ? `margin-left:0px` : ''" class="border-l border-gray-500 rounded-md pl-2 bg-[#1A1A1A05] dark:bg-[#FFFFFF05] mb-2 shadow">
        <summary :title="title" class="cursor-pointer font-black hover:bg-[#5f8aee20] dark:hover:bg-[#FFFFFF10]">{{ attr }} {{ equal ? '=' : ':' }} {{ isOpen ? `{` : `{ ... }`}}</summary>
        <code class="pl-6 flex flex-col">
            <slot/>
        </code>
    <span v-if="isOpen">{{`}`}}</span>
    </details>
</template>