<script setup>
import { ref, computed } from "vue";
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    component: { type: String },
    name: { type: String },
    description: { type: String }
});

const contentTemplate = computed(() => `<${props.component}
    :dataset
    :config
    @${props.name}="${props.name}"
/>
`)

const contentScript = computed(() => `function ${props.name}(args) {
    console.log({ args });
}`)

</script>

<template>
    <div class="flex flex-col mt-4 py-4">
        <code class="text-xl text-[#559AD3]">@{{ name }}</code>
        <div class="text-gray-500">{{ description }}</div>
    </div>
    <CodeParser :content="contentTemplate" language="html"/>
    <CodeParser :content="contentScript" language="javascript"/>
</template>