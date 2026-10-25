<script setup>
import { useBuilderTranslations } from "./translations";
import { onErrorCaptured, ref, watch } from "vue";
import HillPreview from "vue-data-ui/vue-ui-hill";

const t = useBuilderTranslations();

const props = defineProps({
    component: String,
    dataset: { type: [Array, Object, Number, String] },
    config: Object,
});

const error = ref(false);

onErrorCaptured((cause) => {
    console.error(`Chart builder preview failed (${props.component})`, cause);
    error.value = true;
    return false;
});

watch(
    [() => props.dataset, () => props.config],
    () => {
        error.value = false;
    },
    { deep: true },
);
</script>

<template>
    <p v-if="error" role="alert">
        {{ t("previewError") }}
    </p>
    <HillPreview
        v-else-if="component === 'VueUiHill'"
        :dataset="dataset"
        :config="config"
    />
    <VueDataUi
        v-else
        :component="component"
        :dataset="dataset"
        :config="config"
    />
</template>
