<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
    percentage: 66.5,
    series: [
        {
            name:  'Serie 1 with a long name that should be shorter but we do not have the choice',
            value: 256,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 90
                },
                {
                    name: 'Sub serie 3',
                    value: 66
                }
            ]
        },
        {
            name: 'Serie 2',
            value: 128,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 100
                },
                {
                    name: 'Sub serie 2',
                    value: 28
                }
            ]
        },
        {
            name: 'Serie 3',
            value: 64,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 30
                },
                {
                    name: 'Sub serie 2',
                    value: 20
                },
                {
                    name: 'Sub serie 3',
                    value: 14
                }
            ]
        },
        {
            name: 'Serie 4',
            value: 32,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 12
                },
                {
                    name: 'Sub serie 2',
                    value: 12
                },
                {
                    name: 'Sub serie 3',
                    value: 8
                }
            ]
        },
        {
            name: 'Serie 5',
            value: 16,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 10
                },
                {
                    name: 'Sub serie 2',
                    value: 6
                }
            ]
        },
        {
            name: 'Serie 6',
            value: 8,
            breakdown: [
                {
                    name: 'Sub serie 1',
                    value: 6
                },
                {
                    name: 'Sub serie 2',
                    value: 2
                }
            ]
        }
    ]
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
        component="VueUi3dBar"
        componentTheme="vue_ui_3d_bar"
    />
</template>