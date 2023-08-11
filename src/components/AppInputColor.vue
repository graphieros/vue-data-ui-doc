<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    color: {
        type: String,
        default: "#2D353C",
    },
    label: {
        type: String,
        default: "Couleur",
    },
    name: {
        type: String,
        default: "",
        required: true,
    },
});

const emit = defineEmits<{
    (event: "select", value: string): void;
}>();

const currentColor = ref(props.color || "#2D353C");
function updateColor() {
    emit("select", currentColor.value);
}
</script>

<template>
    <div>
        <div class="text-blue-label text-sm mb-1">{{ label }}</div>
        <div
            class="pl-[6px] w-[96px] rounded-md border border-light-grey h-[32px] relative flex flex-row gap-[12px] place-items-center"
        >
            <div class="flex flex-row gap-[6px] place-items-center">
                <div
                    class="h-[16px] w-[16px] rounded-[3px] z-10"
                    :style="`background:${currentColor}`"
                />
                <input
                    type="text"
                    :id="name"
                    v-model="currentColor"
                    class="text-xs uppercase w-[64px] p-0 py-1 rounded border-0"
                    @input="updateColor"
                />
            </div>
            <input
                type="color"
                v-model="currentColor"
                class="absolute top-0 left-0 z-10"
                :name="name"
                @input="updateColor"
            />
        </div>
    </div>
</template>

<style scoped>
input[type="color"] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    height: 32px;
    padding: 0 !important;
    width: 32px;
    border-radius: 3px;
    border: none;
    opacity: 0;
}
</style>
