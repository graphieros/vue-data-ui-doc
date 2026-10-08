<script setup>
import { ref, computed } from "vue";
import BaseTypeDirectory from "../components/docs/BaseTypeDirectory.vue";
import typesSource from "../vue-data-ui.d.ts?raw";
import ConfirmCopy from "../components/ConfirmCopy.vue";
</script>

<template>
    <BaseTypeDirectory
        :source="typesSource"
        :show-global-link="false"
        filename="vue-data-ui.d.ts"
        theme="auto"
    />
    <ConfirmCopy />
</template>
