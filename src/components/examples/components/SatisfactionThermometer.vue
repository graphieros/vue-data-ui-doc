<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const averageRating = computed(() => store.ratings.average);

const config = computed(() => {
    return {
        userOptions: { show: false },
        style: {
            chart: {
                backgroundColor: 'transparent',
                width: 100,
                height: 150,
                graduations: {
                    stroke: isDarkMode.value ? '#1A1A1A' : '#2A2A2A',
                    strokeWidth: 1.5,
                    gradient: { show: false },
                },
                label: {
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    fontSize: 28,
                    rounding: 2
                },
                thermometer: {
                    width: 16
                }
            }
        }
    }
})

</script>

<template>
    <VueDataUi
        component="VueUiThermometer"
        :dataset="{
            value: averageRating,
            from: 0,
            to: 5,
            steps: 5,
            colors: {
                from: '#42d392',
                to: '#42d392',
            }
        }"
        :config="thermoConfig"
    />
</template>