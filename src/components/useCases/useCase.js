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

    const DONUT_PIE_DATASET = ref([
        {
            name: 'Serie 1',
            values: [100]
        },
        {
            name: 'Serie 2',
            values: [45]
        },
        {
            name: 'Serie 3',
            values: [36]
        },
        {
            name: 'Serie 4',
            values: [12]
        }
    ]);

    const DONUT_PIE_CONFIG = computed(() => {
        return {
            style: {
                chart: {
                    backgroundColor: bgColor.value,
                    color: textColor.value,
                    useGradient: true,
                    tooltip: {
                        backgroundColor: bgColor.value,
                        color: textColor.value,
                    },
                    legend: {
                        backgroundColor: bgColor.value,
                        color: textColor.value,
                    },
                    layout: {
                        donut: {
                            strokeWidth: 130
                        },
                        labels: {
                            percentage: {
                                color: textColor.value
                            },
                            name: {
                                color: textColor.value
                            },
                            hollow: {
                                show: false,
                                total: {
                                    show: false
                                },
                                average: {
                                    show: false
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const XY_STACKED_DATASET_WITH_AUTOSCALE = ref([
        {
            name: "S0",
            series: [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
            type: "line",
            smooth: false,
            useArea: true,
            dataLabels: false,
            scaleSteps: 2,
        },
        {
            name: "S1",
            series: [0,1,1,1,1,1,0,0, 1, 1, 0],
            type: "line",
            smooth: false,
            useArea: true,
            dataLabels: false,
            scaleSteps: 2,
        },
        {
            name: "S2",
            series: [0,0,0,1,1,0,0,1,1,1, 0],
            type: "line",
            smooth: false,
            useArea: true,
            dataLabels: false,
            scaleSteps: 2
        },
        {
            name: "S3",
            series: [23.12, 23.12, 23.05, 23.07, 23.65, 23.69, 23.72, 23.21, 23.36, 23.41, 23.08],
            type: "line",
            smooth: false,
            useArea: true,
            scaleSteps: 5,
            autoScaling: true,
            stackRatio: 0.7
        },
    ]);

    const XY_STACKED_DATASET = ref([
        {
            name: "Serie 0",
            series: [0, 0, 1, 1, 1, 0, 0, 1],
            type: "line",
            smooth: false,
            useArea: true,
            dataLabels: false,
            scaleSteps: 2,
            scaleLabel: 'Binary'
        },
        {
            name: "Serie 1",
            series: [100, 113, 265, 290, 320, 145, 115, 197],
            type: "line",
            smooth: false,
            useArea: true,
            scaleSteps: 3,
            scaleLabel: 'Newtons'
        },
        {
            name: "Serie 2",
            series: [35, 22, 66, 55, 32, 23, 12, 40],
            type: "line",
            smooth: false,
            useArea: true,
            scaleSteps: 3,
            scaleLabel: 'Pounds'
        },
        {
            name: "Serie 3",
            series: [1.1, 2, 1.3, 2.6, 2.7, 1.1, 0.9, 1.2],
            type: "line",
            smooth: false,
            useArea: true,
            scaleSteps: 3,
            scaleLabel: 'Grams'
        },
    ]);

    const XY_STACKED_CONFIG = computed(() => {
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
                    showHorizontalLines: true,
                    stroke: isDarkMode.value ? '#6A6A6A' : '#e1e5e8',
                    labels: {
                        color: textColor.value,
                        axis: {
                            xLabel: 'Time',
                            xLabelOffsetY: 12
                        },
                        xAxisLabels: {
                            color: textColor.value,
                            values: ['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
                            fontSize: 12,
                            yOffset: 0
                        },
                        yAxis: {
                            useIndividualScale: true,
                            stacked: true,
                            gap: 24
                        }
                    }
                },
                highlighter: {
                    color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                    opacity: 5
                },
                timeTag: {
                    show: true,
                },
                legend: {
                    color: textColor.value
                },
                padding: {
                    bottom: 48
                },
                title: {
                    text: "Grams, Pounds, Newtons & Binary",
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
                            xLabel: 'Time',
                            xLabelOffsetY: 12
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
        XY_STACKED_DATASET_WITH_AUTOSCALE,
        XY_MULTIPLE_Y_AXES_CONFIG,
        XY_MULTIPLE_Y_AXES_DATASET,
        XY_STACKED_CONFIG,
        XY_STACKED_DATASET,
        DONUT_PIE_CONFIG,
        DONUT_PIE_DATASET
    }
}
