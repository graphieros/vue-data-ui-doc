<script setup>
import { ref, computed } from "vue";
import BaseAttr from "./BaseAttr.vue";
import BaseColorInfo from "./BaseColorInfo.vue";

defineProps({
    name: {
        type: String,
        default: "annotatorPalette",
    },
    comment: {
        type: String,
        default: "Since v3.25.5",
    },
});

const colors = [
    "#000000",
    "#FFFFFF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FFC300",
    "#800080",
    "#FF1493",
    "#00CED1",
];
</script>

<template>
    <BaseAttr inactive :name="name" :comment="comment">
        <template #inactive-default-val>
            <div class="flex flex-row gap-8">
                <BaseColorInfo
                    v-for="(color, i) in colors"
                    :color="color"
                    :key="color"
                    :tooltip-position="i % 2 === 0 ? 'top' : 'bottom'"
                />
            </div>
        </template>
    </BaseAttr>
</template>
