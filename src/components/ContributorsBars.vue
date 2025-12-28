<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const contributors = computed(() => store.contributors);

const dataset = computed(() => {
    return contributors.value.map(c => {
        return {
            name: c.login,
            id: c.id,
            avatar: c.avatar_url,
            value: c.contributions,
            color: '#1f77b4'
        }
    })
})

const config = computed(() => {
    return {
        userOptions: { show: false },
        style: {
            chart: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                legend: { show: false },
                layout: {
                    bars: {
                        underlayerColor: 'transparent',
                        gradientIntensity: 0,
                        borderRadius: 1,
                        dataLabels: {
                            color: isDarkMode.value ? '#9A9A9A' : '#4A4A4A',
                            percentage: {
                                roundingPercentage: 2
                            },
                            offsetX: 12
                        },
                        nameLabels: {
                            color: isDarkMode.value ? '#579ecf' : '#1f77b4',
                            offsetX: -12
                        }
                    },
                    highlighter: {
                        color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
                    }
                },
                title: {
                    text: 'Commits',
                    color: isDarkMode.value ? '#579ecf' : '#1f77b4'
                },
                tooltip: {
                    borderColor: isDarkMode.value ? '#4A4A4A'  : '#E1E5E8',
                    customFormat: ({ datapoint }) => {
                        return `<div style="display: flex; flex-direction: column; align-items:center; justify-content:center; padding: 1rem; color:${isDarkMode.value ? '#CCCCCC' : '#1A1A1A'};border: 2px solid ${isDarkMode.value ? '#3A3A3A' : '#FFFFFF'}">
                            <img height="40" width="40" style="height:40px;width:40px;border-radius:50%;box-shadow: 0 3px 6px rgba(0,0,0,0.3)" src="${datapoint.avatar}"/>
                            <div>${datapoint.name}</div>
                            <div style="margin-top: 1rem; padding-top: 1rem;border-top: 1px solid ${isDarkMode.value ? '#6A6A6A' : '#CCCCCC'}">
                                <span>Contributions: ${datapoint.value}</span>    
                            </div>
                        </div>`
                    }
                }
            }
        }
    }
})

</script>

<template>
    <div class="w-full mt-6 max-w-[600px] mx-auto">
        <VueDataUi 
            component="VueUiHorizontalBar"
            :dataset="dataset"
            :config="config"
        />
    </div>
</template>