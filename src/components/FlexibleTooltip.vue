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
    },
    mute: {
        type: Boolean,
        default: false
    },
    alwaysBlue: {
        type: Boolean,
        default: false
    },
    opacity: {
        type: String,
        default: 'group-hover:opacity-[1]'
    }
});

const emit = defineEmits(['click'])

const tpClass = computed(() => {
    if(props.position === 'top') {
        return `opacity-0 ${props.width} text-[#2A2A2A] bg-gray-100 dark:bg-[#3A3A3A] dark:text-gray-300 text-center text-xs py-2 absolute z-10 ${props.opacity} transition-opacity ${props.delay} bottom-[calc(100%_+6px)] left-1/2 -translate-x-1/2 px-3 pointer-events-none`
    } else if(props.position === 'bottom' || !props.position) {
        return `opacity-0 ${props.width} text-[#2A2A2A] bg-gray-100 ${props.alwaysBlue ? 'dark:bg-app-blue dark:text-black' : 'dark:bg-[#3A3A3A] dark:text-gray-300'} text-center text-xs py-2 absolute z-10 ${props.opacity} transition-opacity ${props.delay} top-full left-1/2 -translate-x-1/2 px-3 pointer-events-none mt-2`
    } else if (props.position === 'right') {
        return `opacity-0 ${props.width} text-[#2A2A2A] bg-gray-100 dark:text-gray-300 dark:bg-[#3A3A3A] text-center text-xs py-2 absolute z-10 ${props.opacity} transition-opacity ${props.delay} top-1/2 left-full -translate-y-1/2 pointer-events-none ml-2`
    } else if (props.position === 'left') {
        return `opacity-0 ${props.width} text-[#2A2A2A] bg-gray-100 dark:text-gray-300 dark:bg-[#3A3A3A] text-center text-xs py-2 absolute z-10 ${props.opacity} transition-opacity ${props.delay} top-1/2 right-full -translate-y-1/2 pointer-events-none ml-2`
    }
})

</script>

<template>
    <div :class="`group cursor-pointer relative inline-block overflow-visible`">
        <slot />
        <div
            :class="tpClass + ' shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] rounded-lg'" v-if="!mute">
            <div class="flex flex-col gap-2">
                <img v-if="img" :src="img" class="rounded shadow"/>
                <div class="flex flex-row place-items-center gap-1" @click="emit('click')">
                    <slot name="before"/>
                    <div class="flex flex-col gap-2 place-items-center w-full justify-center">
                        <slot name="before-inside"/>
                        <span dir="auto" class="w-full text-center">
                            {{ content }}
                        </span>
                    </div>
                </div> 
            </div>
            <svg v-if="position === 'top'" :class="`absolute text-gray-100 ${props.alwaysBlue ? 'dark:text-app-blue' : 'dark:text-[#3A3A3A]'} h-2 w-full left-0 top-full`" x="0px" y="0px" viewBox="0 0 255 255"
                xml:space="preserve">
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
            <svg v-if="position === 'bottom'" :class="`absolute text-gray-100 ${props.alwaysBlue ? 'dark:text-app-blue' : 'dark:text-[#3A3A3A]'} h-2 w-full left-0 bottom-full`" x="0px" y="0px" viewBox="0 0 255 255"
                xml:space="preserve">
                <polygon class="fill-current" points="127.5,127.5 255,255, 0,255" />
            </svg>
            <svg v-if="position === 'right'" :class="`absolute text-gray-100 ${props.alwaysBlue ? 'dark:text-app-blue' : 'dark:text-[#3A3A3A]'} h-2 top-1/2 -translate-y-1/2 -left-2 bottom-full`" x="0px" y="0px" viewBox="0 0 10 10"
                xml:space="preserve">
                <polygon class="fill-current" points="10,0 3,5 10,10" />
            </svg>
            <svg v-if="position === 'left'" :class="`absolute text-gray-100 ${props.alwaysBlue ? 'dark:text-app-blue' : 'dark:text-[#3A3A3A]'} h-2 top-1/2 -translate-y-1/2 -right-2 bottom-full`" x="0px" y="0px" viewBox="0 0 10 10"
                xml:space="preserve">
                <polygon class="fill-current" points="0,0 0,10 5,5" />
            </svg>
        </div>
    </div>
</template>
