<script setup>
import { computed, ref } from "vue";
import { calcTooltipPosition } from "../calcTooltipPosition";
import { useMouse } from "../useMouse";
import BaseCard from "./BaseCard.vue";
import { useMainStore } from "../stores";

const props = defineProps({
    backgroundColor: {
        type: String,
        default: "#FFFFFF"
    },
    color: {
        type: String,
        default: "#000000"
    },
    content: String,
    maxWidth: {
        type: String,
        default: '300px'
    },
    parent: {
        type: Object
    },
    show: {
        type: Boolean,
        default: false,
    },
});
const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const tooltip = ref(null)

const clientPosition = ref(useMouse());

const position = computed(() => {
    return calcTooltipPosition({
        tooltip: tooltip.value,
        chart: props.parent,
        clientPosition: clientPosition.value
    });
})

</script>

<template>
    <div
        ref="tooltip"
        data-cy="tooltip"
        class="tltip hidden sm:block"
        v-if="show"
        :style="`top:${position.top - 32}px;left:${position.left}px;color:${props.color};max-width:${props.maxWidth}`"
    >
        <BaseCard type="dark">
            <slot/>
            <div v-html="content"/>
            <slot name="content-after"/>
            <svg viewBox="0 0 10 18" height="18" width="12" class="absolute -left-[10px] top-1/2 -translate-y-1/2">
                <path d="M 0,9 10,0 10,18Z" :fill="isDarkMode ? '#2A2A2A' : '#e5e7eb'"/>
                <path 
                    d="M 0,9 10,0 10,3Z" 
                    stroke-linecap="round" 
                    :stroke="isDarkMode ? '#4A4A4A' : '#FFFFFF'"
                    :fill="isDarkMode ? '#4A4A4A' : '#FFFFFF'"
                />
            </svg>
        </BaseCard>
    </div>
</template>

<style scoped>
.tltip {
    position: fixed;
    z-index:100000;
}
</style>