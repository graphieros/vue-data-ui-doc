<script setup>
defineProps({
    dot: {
        type: String,
        default: '#FAFAFA'
    },
    barStart: {
        type:String,
        default: '#42d392'
    },
    barEnd: {
        type:String,
        default: '#5f8aee'
    },
})
</script>

<template>
    <svg viewBox="0 -2 20 25" class="h-full w-full">
        <linearGradient id="npmxgrad">
            <stop offset="0%" :stop-color="barStart" />
            <stop offset="100%" :stop-color="barEnd" />
        </linearGradient>
        <rect
            x="4.5"
            y="12"
            width="2.5"
            height="2.5"
            :fill="dot"
            stroke="none"
        />
        <path d="M 16.8 2 L 15 2 L 10 17 L 11.8 17 L 16.8 2" stroke="none" fill="url(#npmxgrad)"/>
    </svg>
</template>