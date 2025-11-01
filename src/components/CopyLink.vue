<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { LinkIcon } from "vue-tabler-icons";
import FlexibleTooltip from "./FlexibleTooltip.vue";

const props = defineProps({
    link: {
        type: String,
        default: ''
    },
    enableMessenger: {
        type: Boolean,
        default: true
    }
})

const store = useMainStore();

async function copyToClipboard(conf) {
    const text = typeof conf === "string" ? conf : JSON.stringify(conf, null, 2);
    if (window.isSecureContext && navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            store.copy({ message: props.enableMessenger ? text : '', type: 'success'});
            return true;
        } catch (err) {
            console.warn("Clipboard API failed, using fallback:", err);
        }
    }

    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        textarea.setAttribute("readonly", "");

        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (ok) {
            store.copy({ message: props.enableMessenger ? text : '', type: 'success'});
            return true;
        }
        console.error("document.execCommand('copy') returned false");
        return false;
    } catch (err) {
        console.error("Copy failed:", err);
        return false;
    }
}

const tooltipContent = ref({
    en: 'Copy link to this example',
    fr: 'Copier le lien vers cet exemple',
    pt: 'Copiar o link deste exemplo',
    de: 'Link zu diesem Beispiel kopieren',
    zh: '复制此示例的链接',
    jp: 'この例へのリンクをコピー',
    es: 'Copiar el enlace de este ejemplo',
    ko: '이 예제의 링크를 복사',
    ar: 'انسخ رابط هذا المثال'
})

</script>

<template>
    <FlexibleTooltip
        :content="tooltipContent[store.lang]"
    >
        <button
            class="p-2 rounded-full shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]  bg-gray-100 dark:bg-[#242424] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors"
            @click="copyToClipboard(link)"
        >
            <LinkIcon />
        </button>
    </FlexibleTooltip>
</template>