<script setup>
import { ref } from "vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";

const props = defineProps({
    value: {
        type: String,
        default: null,
    },
    ariaLabel: {
        type: String,
        default: "Copy to clipboard",
    },
});

const emit = defineEmits(["copied", "error"]);
const store = useMainStore();

const wrapperEl = ref(null);
const btnEl = ref(null);

async function copyToClipboard() {
    const text =
        props.value ??
        (wrapperEl.value
            ? (wrapperEl.value.querySelector("[data-copy-root]")?.innerText ??
                wrapperEl.value.innerText ??
                "")
            : "");

    try {
        if (!text) throw new Error("Nothing to copy");

        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.setAttribute("readonly", "");
            ta.style.position = "absolute";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            if (!ok) throw new Error("Copy command was blocked");
        }

        emit("copied", text);
        store.copy();
    } catch (err) {
        emit("error", err instanceof Error ? err.message : String(err));
    }
}

function onLeave() {
    btnEl.value?.blur();
}
</script>

<template>
    <div ref="wrapperEl" class="base-copy-text" @mouseleave="onLeave">
        <span data-copy-root class="bct-content">
            <slot />
        </span>

        <button ref="btnEl" class="bct-popover" type="button" :aria-label="ariaLabel" title="Copy" @mousedown.prevent
            @click="copyToClipboard">
            <CopyIcon class="text-gray-400 dark:text-[#8A8A8A]" />
        </button>
    </div>
</template>

<style scoped>
.base-copy-text {
    position: relative;
    display: inline-block;
}

.bct-popover {
    position: absolute;
    top: -0.4rem;
    right: -1.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    opacity: 0;
    transform: translateX(-12px) scale(0.5, 0.5);
    transition: opacity 120ms ease, transform 120ms ease, background 120ms ease;
    pointer-events: none;
}

.base-copy-text:hover .bct-popover,
.base-copy-text:focus-within .bct-popover {
    opacity: 1;
    transform: translateX(0) scale(1, 1);
    pointer-events: auto;
}

.bct-content {
    padding-right: 0.5rem;
}
</style>
