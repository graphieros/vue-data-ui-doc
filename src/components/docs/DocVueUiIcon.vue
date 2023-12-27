<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const icons = ref([
    "close",
    "excel",
    "image",
    "labelClose",
    "labelOpen",
    "menu",
    "pdf",
    "sort",
    "spin",
    "tableClose",
    "tableOpen",
]);

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-2 text-2xl">VueUiIcon</h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.icon[store.lang] }}
        </p>

        <div class="flex flex-wrap gap-4 place-items-center place-content-center mt-12">
            <div v-for="icon in icons">
                <div class="flex flex-col place-items-center place-content-center gap-4 w-[100px] border border-gray-500 p-6 rounded-lg">
                    <VueUiIcon :name="icon" :stroke="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
                    <div class="dark:text-gray-400 text-black">{{ icon }}</div>
                </div>
            </div>
        </div>

        <div class="w-full text-center mt-12">

<code>
    &lt;<span class="text-app-green">VueUiIcon</span>
        name="excel"
        :size="24"
        stroke="#1A1A1A"
        :strokeWidth="1.5"
    /&gt;
</code>
          
        </div>
    </div>
</template>