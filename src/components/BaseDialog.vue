<script setup>
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => {
    emit("update:modelValue", false);
};

const handleKeydown = (event) => {
    if (event.key === "Escape" && props.modelValue) {
        close();
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
    <Teleport to="body">
        <div
            v-if="modelValue"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            @click.self="close"
        >
            <div
                class="w-full max-w-lg rounded-lg bg-white dark:bg-[#2A2A2A] p-6 shadow-xl"
                role="dialog"
                aria-modal="true"
            >
                <div
                    class="mb-4 text-xl font-semibold text-gray-900 dark:text-[#CCCCCC]"
                >
                    <slot name="title" />
                </div>

                <div class="text-gray-700 dark:text-[#CCCCCC]">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>
