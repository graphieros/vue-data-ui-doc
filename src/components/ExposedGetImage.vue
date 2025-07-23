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
    return `
    import { ref, onMounted } from "vue";

    // Add this ref to the chart component
    const ${props.component}Ref = ref(null);

    const chartImageData = ref({})

    onMounted(async () => {
        if (${props.component}Ref.value) {
            const {
                imageUri,
                base64,
                title,
                width,
                height,
                aspectRatio
            } = await ${props.component}Ref.value.getImage({ scale: 2 });

            chartImageData.value = {
                imageUri,
                base64,
                title,
                width,
                height,
                aspectRatio
            }
        }
    })
`
})

</script>

<template>
    <div class="flex flex-col my-4 py-4 border-t border-gray-500">
        <code class="text-xl">getImage</code>
        <div class="text-gray-500">{{ translations.docs.emits.getImage[store.lang] }}</div>
    </div>
    <CodeParser :content="content" language="javascript"/>
</template>