<script setup>
import { writeClipboardText } from "../clipboard.js";

import { useMainStore } from "../stores";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import { CopyIcon } from "vue-tabler-icons";

const props = defineProps({
    color: {
        type: String,
        default: "#FFFFFF",
    },
    tooltipPosition: {
        type: String,
        default: "top",
    },
});

const store = useMainStore();

function copyColor() {
    writeClipboardText(JSON.stringify(props.color))
        .then(() => {
            store.copy();
        })
        .catch((_err) => {
            console.warn(`${props.color} could not be copied to the clipboard`);
        });
}
</script>

<template>
    <span
        class="relative"
        data-copy-feedback-anchor
        data-copy-action="color"
        @click="copyColor"
    >
        <FlexibleTooltip
            :position="tooltipPosition"
            :content="color"
            width="w-fit min-w-[80px]"
            delay="delay-150"
        >
            <template #before>
                <CopyIcon />
            </template>
            <span
                class="h-[24px] w-[24px] inline-block border border-white rounded"
                :style="`background:${color}`"
            />
        </FlexibleTooltip>
    </span>
</template>
