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

    const bgGreyColor = computed(() => {
        return isDarkMode.value ? '#3A3A3A' : '#CCCCCC'
    })

    const SPARKLINE_SLOT_DATASET = ref([
        {
            period: "period 1",
            value: 0
        },
        {
            period: "period 2",
            value: 1
        },
        {
            period: "period 3",
            value: 0
        },
        {
            period: "period 4",
            value: 2
        },
        {
            period: "period 5",
            value: 1
        },
        {
            period: "period 6",
            value: 3
        },
        {
            period: "period 7",
            value: 2
        },
        {
            period: "period 8",
            value: 5
        },
        {
            period: "period 9",
            value: 3
        },
        {
            period: "period 10",
            value: 8
        },
        {
            period: "period 11",
            value: 5
        },
        {
            period: "period 12",
            value: 13
        },
        {
            period: "period 13",
            value: 8
        },
        {
            period: "period 14",
            value: 21
        },
        {
            period: "period 15",
            value: 13
        },
        {
            period: "period 16",
            value: 34
        },
        {
            period: "period 17",
            value: 21
        },
    ]);

    const SPARKLINE_SLOT_CONFIG = computed(() => {
        return {
            type: "line",
            style: {
                backgroundColor: bgColor.value,
                area: {
                    color: "#5f8bee",
                },
                line: {
                    smooth: true,
                    color: "#5f8bee",
                },
                dataLabel: {
                    show: false,
                },
                title: {
                    show: false,
                },
                zeroLine: {
                    color: isDarkMode.value ? '#5A5A5A' : '#CCCCCC'
                }
            }
        }
    })

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
                            strokeWidth: 120
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
            series: [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
            type: "line",
            smooth: false,
            useArea: true,
            dataLabels: false,
            scaleSteps: 2,
        },
        {
            name: "S2",
            series: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
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

    const XY_FIXED_SCALE_DATASET = ref([
        {
            name: "Serie 1",
            series: [-87, -80, -60, -30, 0, 30, 60, 80, 87, 80, 60, 30, 0, -30, -60, -80, -87],
            type: "line",
            smooth: true,
            useArea: false,
        },
    ])

    const XY_FIXED_SCALE_CONFIG = computed(() => {
        return {
            line: {
                radius: 6,
                useGradient: false,
                labels: {
                    show: true,
                    color: textColor.value,
                    offsetY: -12
                }
            },
            chart: {
                backgroundColor: bgColor.value,
                color: textColor.value,
                labels: {
                    fontSize: 16,
                },
                highlighter: {
                    useLine: true,
                    color: textColor.value,
                    opacity: 0,
                    lineDasharray: 0
                },
                grid: {
                    stroke: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                    position: 'start',
                    labels: {
                        color: textColor.value,
                        fontSize: 16,
                        yAxis: {
                            scaleMin: -120,
                            scaleMax: 120
                        },
                        xAxisLabels: {
                            show: false,
                            values: ['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T13', 'T14', 'T15', 'T16']
                        }
                    }
                },
                title: {
                    text: "Position",
                    color: textColor.value
                },
                timeTag: {
                    show: true,
                    backgroundColor: bgGreyColor.value,
                    color: textColor,
                    fontSize: 16
                },
                tooltip: {
                    show: false,
                },
                legend: {
                    color: textColor.value
                },
                padding: {
                    bottom: 48
                },
                zoom: {
                    minimap: {
                        show: true,
                        smooth: true,
                        lineColor: "#1F77B4",
                        selectedColor: isDarkMode.value ? '#8A8A8A' : '#8A8A8A'
                    }
                }
            }
        }
    })



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

    const XY_CANVAS_CONFIG = computed(() => {
        return {
            style: {
                fontFamily: "Satoshi",
                chart: {
                    backgroundColor: bgColor.value,
                    color: textColor.value,
                    selector: {
                        color: textColor.value
                    },
                    tooltip: {
                        backgroundColor: bgColor.value,
                        color: textColor.value
                    },
                    legend: {
                        backgroundColor: bgColor.value,
                        color: textColor.value
                    },
                    grid: {
                        y: {
                            axisLabels: {
                                color: textColor.value,
                                suffix: "%"
                            },
                            timeLabels: {
                                color: textColor.value
                            }
                        },
                        x: {
                            horizontalLines: {
                                show: true,
                                opacity: isDarkMode.value ? 5 : 20
                            }
                        }
                    },
                    line: {
                        plots: {
                            radiusRatio: 1
                        }
                    },
                    paddingProportions: {
                        left: 0.08
                    }
                }
            }
        }
    })

    const arr = [];
    let incr = 20000;

    for (let i = 0; i < 20000; i += 1) {
        incr -= 1
        arr.push(Math.random()*0.000001*i*incr)
    }

    const XY_CANVAS_DS = [
        {
            name: 'Serie',
            series: arr,
            type: 'line',
            dataLabels: false,
            useArea: false
        }
    ]

    return {
        DONUT_PIE_CONFIG,
        DONUT_PIE_DATASET,
        SPARKLINE_SLOT_CONFIG,
        SPARKLINE_SLOT_DATASET,
        XY_CANVAS_CONFIG,
        XY_CANVAS_DS,
        XY_FIXED_SCALE_CONFIG,
        XY_FIXED_SCALE_DATASET,
        XY_MULTIPLE_Y_AXES_CONFIG,
        XY_MULTIPLE_Y_AXES_DATASET,
        XY_STACKED_CONFIG,
        XY_STACKED_DATASET,
        XY_STACKED_DATASET_WITH_AUTOSCALE,
    }
}
