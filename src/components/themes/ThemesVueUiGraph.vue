<script setup>
import BaseThemeUnit from "./BaseThemeUnit.vue";
import { graphDataset } from "../docs/graph";

// Leave visual settings unset so each library theme can supply its own colors.
const config = {};
</script>
<template>
    <BaseThemeUnit
        :dataset="graphDataset"
        :config="config"
        component="VueUiGraph"
        componentTheme="vue_ui_graph"
    />
</template>
