<script setup>
import Shape from "./Shape.vue";

defineProps({
    color: {
        type: String,
        default: '#000000'
    },
    shape: {
        type: String,
        default: 'circle'
    }
})

</script>

<template>
    <svg viewBox="0 0 24 24" width="100%">
        <Shape
            :color="color"
            :shape="shape"
            :radius="8"
            :plot="{ x: 12, y: 12 }"
        />
    </svg>
</template>