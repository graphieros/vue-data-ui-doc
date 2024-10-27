<script setup>
import { computed } from 'vue';

const props = defineProps({
    content: {
        type: String,
        default: "",
    },
    width: {
        type: String,
        default: 'w-[84px]'
    },
    delay: {
        type: String,
        default: 'delay-300'
    },
    img: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: 'top'
    }
});

const emit = defineEmits(['click'])

const tpClass = computed(() => {
    if(props.position === 'top') {
        return `opacity-0 ${props.width} text-gray-200 bg-[#2A2A2A] dark:text-black dark:bg-[#CCCCCC] text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 transition-opacity ${props.delay} bottom-full left-1/2 -translate-x-1/2 px-3 pointer-events-none`
    }
    return `opacity-0 ${props.width} text-gray-200 bg-[#2A2A2A] dark:text-gray-300 dark:bg-[#3A3A3A] text-center text-xs rounded py-2 absolute z-10 group-hover:opacity-100 transition-opacity ${props.delay} top-full left-1/2 -translate-x-1/2 px-3 pointer-events-none mt-2`
})

</script>

<template>
    <div class="group cursor-pointer relative inline-block overflow-visible">
        <slot />
        <div
            :class="tpClass">
            <div class="flex flex-col gap-2">
                <img v-if="img" :src="img" class="rounded shadow"/>
                <div class="flex flex-row place-items-center gap-1" @click="emit('click')">
                    <slot name="before"/>
                    <span dir="auto">
                        {{ content }}
                    </span>
                </div> 
            </div>
            <svg v-if="position === 'top'" class="absolute text-[#2A2A2A] dark:text-[#CCCCCC] h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"
                xml:space="preserve">
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
            <svg v-if="position === 'bottom'" class="absolute text-[#2A2A2A] dark:text-[#3A3A3A] h-2 w-full left-0 bottom-full" x="0px" y="0px" viewBox="0 0 255 255"
                xml:space="preserve">
                <polygon class="fill-current" points="127.5,127.5 255,255, 0,255" />
            </svg>
        </div>
    </div>
</template>
