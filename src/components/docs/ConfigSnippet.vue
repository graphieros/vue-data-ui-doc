<script setup>
import { ref, onMounted, onUpdated } from "vue";
import CodeParser from "../customization/CodeParser.vue";
import { decorateSnippetRows } from "./configSnippetRows.js";

const props = defineProps({
    rows: { type: Array, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    copyLabel: { type: String, default: "Copy code" },
});
const emit = defineEmits(["select"]);
const root = ref(null);
function decorateRows() {
    const copy = root.value?.querySelector(".code-copy");
    if (copy) {
        copy.setAttribute("aria-label", `${props.copyLabel}: ${props.title}`);
        copy.setAttribute("title", props.copyLabel);
    }
    decorateSnippetRows(
        root.value?.querySelector(".code-container"),
        props.rows,
    );
}
function selectRow(event) {
    if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
    const row = event.target.closest?.(".snippet-row");
    if (!row || !root.value?.contains(row)) return;
    const property = props.rows[Number(row.dataset.rowIndex)];
    if (!property) return;
    if (event.type === "keydown") event.preventDefault();
    emit("select", property.id);
}
onMounted(decorateRows);
onUpdated(decorateRows);
</script>

<template>
    <div
        ref="root"
        class="config-snippet"
        @click="selectRow"
        @keydown="selectRow"
    >
        <CodeParser
            class="snippet-parser"
            language="javascript"
            :content="content"
            :title="title"
            @vue:updated="decorateRows"
        />
    </div>
</template>

<style scoped>
.config-snippet,
.snippet-parser,
:deep(.code-wrapper) {
    height: 100%;
    min-height: 0;
}
.snippet-parser {
    align-items: stretch;
}
:deep(.code-container) {
    height: 100%;
    max-height: none;
    margin: 0;
}
:deep(.snippet-row) {
    display: block;
    width: max-content;
    min-width: 100%;
    cursor: pointer;
    white-space: pre;
}
:deep(.snippet-row:hover) {
    background: #5f8aee20;
}
:deep(.snippet-row:focus-visible) {
    outline: 2px solid #5f8aee;
    outline-offset: -2px;
}
</style>
