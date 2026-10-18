<script setup>
import { computed } from "vue";
import { useMainStore } from "../../../stores";
import { useDocConfigBindings } from "../../../useDocConfigBindings";
import { createVueUiXyConfigFields } from "./vue-ui-xy-config.js";
import { getEditableConfigPaths } from "./configFields.js";
import DocConfigFields from "./DocConfigFields.vue";

const props = defineProps({
    config: { type: Object, required: true },
});
const emit = defineEmits(["refresh-chart", "navigate", "select-tab"]);
const store = useMainStore();
const fields = computed(() =>
    createVueUiXyConfigFields(store.translations, store.lang, {
        locales: store.locales,
        goToPage: (route) => emit("navigate", route),
        setActiveTab: (tab) => emit("select-tab", tab),
    }),
);
const activeConfig = computed(() => props.config);
const bindings = useDocConfigBindings(
    activeConfig,
    getEditableConfigPaths(fields.value),
);
</script>

<template>
    <DocConfigFields
        :fields="fields"
        :bindings="bindings"
        @refresh-chart="emit('refresh-chart')"
    />
</template>
