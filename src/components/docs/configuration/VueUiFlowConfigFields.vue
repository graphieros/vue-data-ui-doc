<script setup>
import { getVueDataUiConfig } from "vue-data-ui/utils";
import { computed } from "vue";
import { useDocConfigBindings } from "../../../useDocConfigBindings";
import {
    getEditableConfigPaths,
    getConfigInitialValues,
    withConfigDefaults,
} from "./configFields.js";
import DocConfigFields from "./DocConfigFields.vue";
import { createVueUiFlowConfigFields } from "./vue-ui-flow-config.js";
const props = defineProps({
    config: { type: Object, required: true },
    context: { type: Object, required: true },
});
const fields = computed(() =>
    withConfigDefaults(
        createVueUiFlowConfigFields(props.context),
        getVueDataUiConfig("vue_ui_flow"),
    ),
);
const activeConfig = computed(() => props.config);
const bindings = useDocConfigBindings(
    activeConfig,
    getEditableConfigPaths(fields.value),
    {
        skipArrays: false,
        defaults: getVueDataUiConfig("vue_ui_flow"),
        initialValues: getConfigInitialValues(fields.value),
    },
);
</script>
<template><DocConfigFields :fields="fields" :bindings="bindings" /></template>
