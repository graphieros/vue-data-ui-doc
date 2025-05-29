<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    position: {
        type: String,
        default: 'below'
    },
    buttonClass: {
        type: String,
        default: ''
    },
    popoverClass: {
        type: String,
        default: ''
    },
    openState: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['open']);

const isOpen = ref(props.openState);
const buttonRef = ref(null);

const togglePopover = () => {
    isOpen.value = !isOpen.value;
};

const popoverStyle = computed(() => {
    if (!buttonRef.value) return {};

    const buttonRect = buttonRef.value.getBoundingClientRect();
    const topPosition = props.position === 'above'
        ? buttonRect.top - window.scrollY - buttonRef.value.offsetHeight
        : buttonRect.height;

    return {
        width: `${buttonRect.width}px`,
        position: 'absolute',
        top: `${topPosition}px`,
        left: 0,
    };
});

const popoverToggleProps = computed(() => ({
    'aria-expanded': isOpen.value,
    'aria-haspopup': 'true',
}));

watch(isOpen, (newVal) => {
    emit('open', newVal)
    if (!newVal) return;
    const handleClickOutside = (event) => {
        if (buttonRef.value && !buttonRef.value.contains(event.target)) {
            isOpen.value = false;
            document.removeEventListener('click', handleClickOutside);
        }
    };

    document.addEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="popover-wrapper relative">
        <button :class="buttonClass" ref="buttonRef" @click="togglePopover" v-bind="popoverToggleProps">
            <slot name="button-content"/>
        </button>

        <transition name="fade">
            <div v-if="isOpen" :style="popoverStyle" class="popover-content" :class="popoverClass" data-popover>
                <slot name="popover-content"/>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.popover-wrapper {
    display: inline-block;
    position: relative;
}

button {
    cursor: pointer;
    height: fit-content;
    overflow: hidden;
}

.popover-content {
    z-index: 0;
    overflow: hidden;
    display: block;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(1, 0) translateY(-50%);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: scale(1, 1) translateY(0);
}
</style>