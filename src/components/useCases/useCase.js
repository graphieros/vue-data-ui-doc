import { ref, computed } from "vue";
import { useMainStore } from "../../stores";

export function useCase() {
    const store = useMainStore();
    const isDarkMode = computed(() => store.isDarkMode);
    const bgColor = computed(() => {
        return isDarkMode.value ? '#2A2A2A' : '#FFFFFF'
    });
    const textColor = computed(() => {
        return isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
    });

    const XY_MULTIPLE_Y_AXES_DATASET = ref([
        {
            name: "Serie 1",
            series: [100, 113, 125, 119, 320, 245, 219, 220],
            type: "line",
            dataLabels: true,
            smooth: true,
            scaleSteps: 10,
            scaleLabel: "Newtons"
        },
        {
            name: "Serie 2",
            series: [35, 22, 12, 54, 32, 23, 36, 67],
            type: "line",
            dataLabels: true,
            smooth: true,
            scaleSteps: 10,
            scaleLabel: "Pounds"
        },
        {
            name: "Serie 3",
            series: [3, 2, 1.3, 2.6, 2.1, 1.1, 0.9, 0.6],
            type: "line",
            dataLabels: true,
            smooth: true,
            scaleSteps: 10,
            scaleLabel: "Grams"
        },
    ]);
    
    const XY_MULTIPLE_Y_AXES_CONFIG = computed(() => {
        return {
            line: {
                labels: {
                    show: true,
                    color: textColor.value,
                    rounding: 1
                }
            },
            chart: {
                backgroundColor: bgColor.value,
                color: textColor.value,
                grid: {
                    labels: {
                        color: textColor.value,
                        axis: {
                            xLabel: 'Time'
                        },
                        xAxisLabels: {
                            color: textColor.value,
                            values: ['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                            fontSize: 12,
                            yOffset: -18
                        },
                        yAxis: {
                            useIndividualScale: true,
                        }
                    }
                },
                highlighter: {
                    color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                    opacity: 5
                },
                legend: {
                    color: textColor.value
                },
                padding: {
                    bottom: 48
                },
                title: {
                    text: "Grams, Pounds & Newtons",
                    color: textColor.value
                },
                tooltip: {
                    backgroundColor: bgColor.value,
                    color: textColor.value,
                    roundingValue: 1
                },
            },
            table: {
                rounding: 1,
                th: {
                    backgroundColor: bgColor.value,
                    color: textColor.value
                },
                td: {
                    backgroundColor: bgColor.value,
                    color: textColor.value
                }
            }
        }
    });

    return {
        XY_MULTIPLE_Y_AXES_CONFIG,
        XY_MULTIPLE_Y_AXES_DATASET
    }
}