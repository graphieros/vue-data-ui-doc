<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);
const props = defineProps({
    config: Object,
});

const emit = defineEmits(["reset"]);

function copyToClipboard() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(props.config);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    store.copy();
}
</script>

<template>
    <div
        class="flex flex-row gap-2 rounded-xl p-2 border border-gray-400 dark:border-[#5A5A5A] w-fit"
    >
        <button
            @click="emit('reset')"
            class="flex place-items-center gap-2 text-black dark:text-[#CCCCCC] rounded-md border border-gray-400 dark:border-none dark:border-[#6A6A6A] py-2 px-4 pr-5 dark:bg-[#3A3A3A] dark:hover:bg-[#ff660050] hover:bg-white hover:shadow-xl hover:border-app-orange transition-all"
        >
            <VueUiIcon
                name="revert"
                :stroke="isDarkMode ? '#ff6600' : '#1A1A1A'"
                :size="20"
            />
            {{ translations.docs.reset[store.lang] }}
        </button>
        <button
            @click="copyToClipboard()"
            class="flex place-items-center gap-2 text-black dark:text-[#CCCCCC] rounded-md border border-gray-400 dark:border-none dark:border-[#6A6A6A] py-2 px-4 pr-5 dark:bg-[#3A3A3A] dark:hover:bg-[#5f8aee50] hover:bg-white hover:shadow-xl hover:border-app-blue transition-all"
        >
            <VueUiIcon
                name="copy"
                :stroke="isDarkMode ? '#5f8aee' : '#1A1A1A'"
                :size="20"
            />
            {{ translations.docs.copyThisConfig[store.lang] }}
        </button>
    </div>
</template>
