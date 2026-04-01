<script setup>
import { ref, computed } from "vue";
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    component: { type: String },
    name: { type: String },
    description: { type: String },
});

const contentTemplate = computed(
    () => `<${props.component}
    :dataset
    :config
    @${props.name}="${props.name}"
/>
`,
);

const noArgs = ["start", "pause", "reset", "restart", "onMidpointLeave"];

const contentScript = computed(
    () => `function ${props.name}(${noArgs.includes(props.name) ? "" : "args"}) {
    ${noArgs.includes(props.name) ? "// do something" : "console.log({ args });"}
}`,
);
</script>

<template>
    <div class="flex flex-col mt-4 py-4 gap-2">
        <div
            class="text-xs bg-[#559AD3] text-[#1A1A1A] font-inter-medium px-2 py-0.5 rounded-full w-fit"
        >
            EMIT
        </div>
        <code class="text-xl text-[#559AD3]">@{{ name }}</code>
        <div class="text-gray-500">{{ description }}</div>
    </div>
    <CodeParser :content="contentTemplate" language="html" />
    <CodeParser :content="contentScript" language="javascript" />
</template>
