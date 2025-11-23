<script setup>
import { ref, computed } from "vue";
import FlexibleTooltip from "../FlexibleTooltip.vue";

const props = defineProps({
    tooltip: { type: String, default: '' },
    tooltipPosition: { type: String, default: 'top' },
    fab: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    padding: { type: String, default: 'p1'},
    size: { type: Number, default: 6 },
    tw: { type: String, default: '' },
});

const emit = defineEmits('click');
const button = ref(null);

const styles = ref({
    primary: 'from-app-blue-light to-app-blue text-app-blue-dark',
    success: 'from-app-green-light to-app-green-dark text-app-green-darker',
    error: 'from-app-orange to-app-red-dark text-white',
    warning: 'from-app-warning-light to-app-warning text-app-warning-dark'
});

const commonStyle = computed(() => {
    return `${props.padding} flex flex-row align-center place-items-center justify-center gap-2 shadow-md bg-gradient-to-br hover:bg-gradient-to-tl transition-all h-${props.size}`
});

const mergedStyle = computed(() => {
    return `${commonStyle.value} ${styles.value[props.color]} ${props.fab ? `rounded-full w-${props.size}` : 'rounded-md'} ${props.tw}`
});

function gellyClick() {
    emit('click');
    animate();
}

const to = ref(null);

function animate() {
    if (button.value) {
        button.value.classList.add('anim');
        if (to.value) clearTimeout(to.value);
        to.value = setTimeout(() => {
            button.value.classList.remove('anim');
        }, 300);
    }
}

</script>

<template>
    <FlexibleTooltip :content="tooltip" :position="tooltipPosition" :mute="!tooltip">
        <button
            ref="button"
            @click="gellyClick()"
            :class="mergedStyle"
        >
            <slot/>
        </button>
    </FlexibleTooltip>
</template>

<style scoped>
.anim {
    animation: btn 300ms ease-in-out;
}

@keyframes btn {
    0% {
        transform: scale(0.9, 0.9);
    }
    50% {
        transform: scale(1.02, 1.02);
    }
    75% {
        transform: scale(0.95, 0.95)
    }
    90% {
        transform: scale(1.01, 1.01);
    }
    100% {
        transform: scale(1, 1);
    }
}
</style>