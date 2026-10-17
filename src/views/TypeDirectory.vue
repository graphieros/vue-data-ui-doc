<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import BaseTypeDirectory from "../components/docs/BaseTypeDirectory.vue";
import generated from "virtual:vue-data-ui-types";
import ConfirmCopy from "../components/ConfirmCopy.vue";
const chromeHeight = ref(0);
let chromeObserver;
onMounted(() => {
    const elements = ["app-header", "app-footer"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    const measure = () => {
        chromeHeight.value = elements.reduce(
            (height, element) =>
                height + element.getBoundingClientRect().height,
            0,
        );
    };
    chromeObserver = new ResizeObserver(measure);
    elements.forEach((element) => chromeObserver.observe(element));
    measure();
});
onBeforeUnmount(() => chromeObserver?.disconnect());

// Token spans use compact lengths to avoid duplicating every declaration's text.
const names = new Map(
    generated.entries.map((entry) => [entry.id, entry.fullName]),
);
const documentation = {
    ...generated,
    entries: generated.entries.map((entry) => {
        let offset = 0;
        return {
            ...entry,
            parts: entry.parts.map(([length, kind]) => {
                const text = entry.code.slice(offset, (offset += length));
                return typeof kind === "number"
                    ? { text, targetId: kind, targetName: names.get(kind) }
                    : { text, syntax: kind };
            }),
        };
    }),
};
</script>

<template>
    <BaseTypeDirectory
        class="type-directory-page"
        :style="{ '--app-chrome-height': `${chromeHeight}px` }"
        :documentation="documentation"
        :show-global-link="false"
        :filename="`vue-data-ui ${documentation.version}`"
        theme="auto"
    />
    <ConfirmCopy />
</template>

<style scoped>
.type-directory.type-directory-page {
    --available-height: calc(100vh - var(--app-chrome-height, 0px));
    --available-height: calc(100dvh - var(--app-chrome-height, 0px));
    display: flex;
    flex-direction: column;
    height: var(--available-height);
    min-height: max(440px, var(--available-height));
}

.type-directory-page :deep(.td-toolbar) {
    flex-shrink: 0;
}

.type-directory-page :deep(.td-layout) {
    flex: 1;
    min-height: 0;
    grid-template-rows: minmax(0, 1fr);
}

.type-directory-page :deep(.td-sidebar),
.type-directory-page :deep(.td-detail) {
    min-height: 0;
    max-height: none;
}

@media (max-width: 680px) {
    .type-directory.type-directory-page {
        height: auto;
    }

    .type-directory-page :deep(.td-layout) {
        grid-template-rows: auto auto;
    }

    .type-directory-page :deep(.td-sidebar) {
        max-height: 290px;
    }
}
</style>
