<script setup>
    import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { useUniversalStore } from "../stores/universal"
import SideMenu from "../components/SideMenu.vue";
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"

onMounted(() => {
    window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll()
})

    const store = useMainStore()
    const universalStore = useUniversalStore()
    const isDarkMode = computed(() => store.isDarkMode);
    const isOpen = ref(window.innerWidth > 768);

    const translations = computed(() => universalStore.translations)

    function toggleMenu(state) {
        isOpen.value = state;
    }
    
</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1`">

        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-6 text-2xl">
            <VueUiIcon name="vueDataUi" stroke="#42d392" :strokeWidth="1.5" />
            VueDataUi
        </h1>
        <p class="mx-auto max-w-[600px] text-md text-black dark:text-gray-500 mb-2 text-left px-4">
            {{ translations.presentation[store.lang] }}
        </p>
        <p class="mx-auto max-w-[600px] text-md  mb-2 text-left px-4">
            {{ translations.features[store.lang] }}
        </p>

        <div class="mx-auto my-6 bg-[#272822] p-4 rounded-md">
            <code class="language-javascript" style="white-space: pre-wrap;">
<pre>
    import { VueDataUi } from "vue-data-ui";

    const lineConfig = ref({}); // A config corresponding to VueUiXy specs
    const donutConfig  = ref({}); // A config corresponding to VueUiDonut specs

    const lineDataset = ref([]); // A dataset corresponding to VueUiXy specs
    const donutDataset = ref([]); // A dataset corresponding to VueUiDonut specs
</pre>
            </code>
        </div>
        <div class="mx-auto my-6 bg-[#272822] p-4 rounded-md">
            <code class="language-html" style="white-space: pre-wrap;">
<pre>
    &lt;template&gt;
        &lt;VueDataUi
            component="VueUiXy"
            :dataset="lineDataset"
            :config="lineConfig"
        /&gt;

        &lt;VueDataUi
            component="VueUiDonut"
            :dataset="donutDataset"
            :config="donutConfig"
        /&gt;
    &lt;/template&gt;
</pre>
            </code>
        </div>
    </div>
</template>