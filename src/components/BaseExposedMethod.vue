<script setup>
import { ref, computed } from "vue";
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    component: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
})

const content = computed(() => {
    return `
    import { ref } from "vue";

    // Add this ref to the chart component
    const ${props.component}Ref = ref(null);

    function ${props.name}()  {
        if (${props.component}Ref.value) {
            ${props.component}Ref.value.${props.name}();
        }
    }
`
})

</script>

<template>
    <div class="flex flex-col my-4 py-4 border-t border-gray-500">
        <code class="text-xl">{{ name }}</code>
        <div class="text-gray-500">{{ description }}</div>
    </div>
    <CodeParser :content="content" language="javascript"/>
</template>