<script setup>
defineProps({
    content: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div class="group cursor-pointer relative inline-block overflow-visible">
        <slot />
        <div
            class="opacity-0 w-[84px] text-gray-200 bg-[#2A2A2A] dark:text-black dark:bg-[#CCCCCC] text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 transition-opacity delay-300 bottom-full left-1/2 -translate-x-1/2 px-3 pointer-events-none">
            <div>
                {{ content }}
            </div>
            <svg class="absolute text-[#2A2A2A] dark:text-[#CCCCCC] h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"
                xml:space="preserve">
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
        </div>
    </div>
</template>
