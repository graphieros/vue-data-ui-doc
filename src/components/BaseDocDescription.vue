<script setup>defineProps({ text: { type: String }});</script>
<template>
    <p class="mx-auto max-w-[400px] text-md text-black dark:text-[#AAAAAA] mb-2 text-center">
        <slot>
            {{ text }}
        </slot>
    </p>
</template>