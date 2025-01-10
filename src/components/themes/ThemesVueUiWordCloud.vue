<script setup>
import { ref } from "vue";
import { createWordCloudDatasetFromPlainText} from "vue-data-ui";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        "name": "lorem",
        "value": 1
    },
    {
        "name": "ipsum",
        "value": 12
    },
    {
        "name": "dolor",
        "value": 4
    },
    {
        "name": "sit",
        "value": 11
    },
    {
        "name": "amet",
        "value": 11
    },
    {
        "name": "consectetur",
        "value": 3
    },
    {
        "name": "adipiscing",
        "value": 1
    },
    {
        "name": "elit",
        "value": 8
    },
    {
        "name": "vivamus",
        "value": 3
    },
    {
        "name": "pretium",
        "value": 7
    },
    {
        "name": "venenatis",
        "value": 4
    }
])

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
        component="VueUiWordCloud"
        componentTheme="vue_ui_word_cloud"
    />
</template>