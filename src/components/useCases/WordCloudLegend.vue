<script setup>
const hidden = defineModel({ type: Array, required: true });
defineProps({
    items: { type: Array, required: true },
    label: { type: String, required: true },
});
function toggle(color) {
    hidden.value = hidden.value.includes(color)
        ? hidden.value.filter((item) => item !== color)
        : [...hidden.value, color];
}
</script>

<template>
    <div class="flex flex-wrap justify-center gap-4 mt-4" :aria-label="label">
        <button
            v-for="[name, color] in items"
            :key="color"
            type="button"
            class="flex flex-row gap-1 items-center rounded focus-visible:outline focus-visible:outline-2"
            :class="{ 'opacity-50 line-through': hidden.includes(color) }"
            :aria-pressed="!hidden.includes(color)"
            @click="toggle(color)"
        >
            <span
                :style="{ backgroundColor: color }"
                class="shrink-0 h-3 w-3 rounded-sm"
            />
            <span>{{ name }}</span>
        </button>
    </div>
</template>
