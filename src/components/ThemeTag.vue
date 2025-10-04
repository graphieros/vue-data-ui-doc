<script setup>
import { ref, computed } from "vue";
import BaseTag from "./BaseTag.vue";

const props = defineProps({
    type: {
        type: String,
        default: 'default'
    }
});

const themes = ref({
    default: {
        backgroundColor: "#FFFFFF",
        color: '#1A1A1A',
        fill: '#FFFFFF'
    },
    zen: {
        backgroundColor: "#fbfafa",
        color: "#8A9892",
        fill: "#B9B99D"
    },
    concrete: {
        backgroundColor: "#f6f6fb",
        color: "#50606C",
        fill: "#4A6A75"
    },
    hack: {
        backgroundColor: "#1A1A1A",
        color: "#99AA99",
        fill: "#009900"
    },
    celebration: {
        backgroundColor: "#FFF8E1",
        color: "#424242",
        fill: "#D32F2F"
    },
    celebrationNight: {
        backgroundColor: "#1E1E1E",
        color: "#BDBDBD",
        fill: "#D32F2F"
    },
})

</script>

<template>
    <BaseTag class="mb-4" :backgroundColor="themes[type].backgroundColor" :color="themes[type].color">
        <svg class="rounded-full shadow-[inset_0_2px_2px_#FFFFFF,0_2px_3px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_2px_3px_rgba(0,0,0,0.5)]" viewBox="0 0 10 10" height="16" width="16"><circle cx="5" cy="5" r="5" :fill="themes[type].fill"/></svg>
        {{ type }}
    </BaseTag>
</template>