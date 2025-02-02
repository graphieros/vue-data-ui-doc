<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const props = defineProps({
    dataset: {
        type: Array,
        default() {
            return []
        }
    }
})

const config = ref({
    style: {
        chart: {
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            }
        }
    }
})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiCirclePack"
        componentTheme="vue_ui_circle_pack"
    />
</template>