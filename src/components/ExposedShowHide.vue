<script setup>
import { ref, computed } from "vue";
import CodeParser from "./customization/CodeParser.vue";
import { useMainStore } from "../stores";

const props = defineProps({
    component: {
        type: String
    }
})

const store = useMainStore();
const translations = computed(() => store.translations);

const content = computed(() => {
    return `import { ref, onMounted } from "vue";

// Add this ref to the chart component
const ${props.component}Ref = ref(null);

// Create a wrapper around exposed functions
function showSeriesByName(name) {
    if (!${props.component}Ref.value) return;
    ${props.component}Ref.value.showSeries(name);
}

function hideSeriesByName(name) {
    if (!${props.component}Ref.value) return;
    ${props.component}Ref.value.hideSeries(name);
}

// Example:

onMounted(() => {
    hideSeriesByName('Series A');
});
`
})

</script>

<template>
    <div class="flex flex-col my-4 py-4 border-t border-gray-500">
        <code class="text-xl">hideSeries / showSeries</code>
        <div class="text-gray-500">{{ translations.docs.emits.showHideSeries[store.lang] }}</div>
    </div>
    <CodeParser :content="content" language="javascript"/>
</template>