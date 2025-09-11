export const xyDataset = [
    {
        name: "Series 1",
        series: [ -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)"
    },
    {
        name: "Series 2",
        series: [ 55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)",
        useProgression: true,
        dataLabels: false,
    },
    {
        name: "Series 3",
        series: [ 64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)"
    },
    {
        name: "Target",
        series: [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        type: "line",
        color: "#404040",
        dashed: true,
        useTag: "start",
        dataLabels: false,
    },
];

export const xyConfig = {
    responsive: true,
    chart: {
        backgroundColor: "transparent",
        color: "#1A1A1A",
        highlighter: {
            color: "#1A1A1A",
            opacity: 10,
        },
        zoom: {
            color: "#42d392"
        },
        grid: {
            stroke: "#C4C4C4",
            showVerticalLines: false,
            labels: {
                show: true,
                color: "#1A1A1A",
                fontSize: 12,
                axis: {
                    yLabel: "yLabel",
                    xLabel: "xLabel",
                    fontSize: 12
                },
                xAxisLabels: {
                    color: "#1A1A1A",
                    show: true,
                    showOnlyFirstAndLast: false,
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
                    fontSize: 6,
                }
            }
        },
        legend: {
            show: true,
            color: "#1A1A1A",
            fontSize: 12
        },
        title: {
           show:true,
           text: "Title",
           color: "#1A1A1A",
           fontSize: 20,
           bold: true,
           subtitle: {
            fontSize: 16,
            color: "#565656",
            text: "Subtitle"
           }
        },
        tooltip: {
            color: "#1A1A1A",
            backgroundColor: "#FFFFFF",
            show: true,
            showValue: true,
            showPercentage: false,
            roundingValue: 0,
            roundingPercentage: 0,
        },
        userOptions: {
            show: false,
            title:"options",
            labels: {
                dataLabels: "Show datalabels",
                titleInside: "Title inside",
                legendInside: "Legend inside",
                showTable: "Show table"
            }
        },
    },
    bar: {
        useGradient: true,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        }
    },
    line: {
        radius: 3,
        useGradient: true,
        strokeWidth: 2,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        }

    },
    plot: {
        radius: 3,
        useGradient: true,
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#1A1A1A",
        }
    },
    table: {
        rounding: 0,
        th: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
        }
    }
}

export const donutDataset = [
    {
        name: "Serie 1",
        color: "#5f8bee",
        values: [100]
    },
    {
        name: "Serie 2",
        color: "#42d392",
        values: [200]
    },
    {
        name: "Serie 1",
        color: "#ff6400",
        values: [300, 1]
    },
];

export const donutConfig = {
    responsive: true,
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            layout: {
                labels: {
                    dataLabels: {
                        show: true,
                        hideUnderValue: 3,
                    },
                    percentage: {
                        color: "#1A1A1A",
                        bold: true,
                        fontSize: 18
                    },
                    name: {
                        color: "#1A1A1A",
                        bold: false,
                        fontSize: 14,
                    },
                    hollow: {
                        total: {
                            show: false,
                            bold: false,
                            fontSize: 18,
                            color: "#1A1A1A",
                            text:  "Total",
                            offsetY: -16,
                            value: {
                                color: "#1A1A1A",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: -12,
                                rounding: 0,
                            }
                        },
                        average: {
                            show: false,
                            bold: false,
                            fontSize: 18,
                            color: "#1A1A1A",
                            text:  "Average",
                            offsetY: 0,
                            value: {
                                color: "#1A1A1A",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: 6,
                                rounding: 0,
                            }
                        }
                    }
                },
                donut: {
                    strokeWidth: 55
                },
            },
            legend: {
                    backgroundColor: "#FFFFFF",
                    color: "#1A1A1A",
                    show: true,
                    fontSize: 12,
                    bold: false,
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
            title: {
                text: "Title",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#565656",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#1A1A1A",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
            }
        }
    },
    userOptions: {
        show: false
    },
    translations: {
        total: "Total",
        average: "Average",
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            roundingValue: 0,
            roundingPercentage: 0
        }
    }
}

export const waffleDataset = [
    {
        name: "Serie 1",
        color: "#5f8bee",
        values: [100]
    },
    {
        name: "Serie 2",
        color: "#42d392",
        values: [200]
    },
    {
        name: "Serie 3",
        color: "#ff6400",
        values: [300, 1]
    }
];

export const waffleConfig = {
    responsive: true,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "transparent",
            color: "#1A1A1A",
            layout: {
                grid: {
                    size: 20,
                    spaceBetween: 0,
                    vertical: false,
                },
                rect: {
                    rounded: true,
                    rounding:2,
                    stroke: "#FFFFFF",
                    strokeWidth: 3,
                    useGradient: true,
                    gradientIntensity: 20,
                },
            },
            title: {
                text: "Title",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#565656",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
            },
            legend: {
                show: true,
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                bold: false,
                fontSize: 12,
                roundingValue: 0,
                roundingPercentage: 0,
            }
        }
    },
    userOptions: {
        show: false
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            roundingValue: 0,
            roundingPercentage: 0
        }
    }
}

export const radarDataset = {
    categories: [
      {
        name: "category 1",
        color: "#5f8bee",
      },
      {
        name: "category 2",
        color: "#42d392",
      },
      {
        name: "category 3",
        color: "#ff6400",
      }
  ],
    series: [
      {
        name: "Serie 1",
        values: [65, 45, 12],
        color: "",
        target: 100
      },
      {
        name: "Serie 2",
        values: [2525, 3472, 4950],
        color: "",
        target: 10000
      },
      {
        name: "Serie 3",
        values: [4.7, 1, 3],
        color: "",
        target: 5
      },
      {
        name: "Serie 4",
        values: [400, 250, 325],
        color: "",
        target: 500
      },
      {
        name: "Serie 5",
        values: [53, 95, 67],
        color: "",
        target: 100
      },
      {
        name: "Serie 6",
        values: [166, 107, 75],
        color: "",
        target: 200
      },
      {
        name: "Serie 7",
        values: [6, 7, 10],
        color: "",
        target: 10
      },
      {
        name: "Serie 8",
        values: [6, 3, 10],
        color: "",
        target: 10
      },
      {
        name: "Serie 9",
        values: [2, 7, 9],
        color: "",
        target: 10
      },
      {
        name: "Serie 10",
        values: [6, 7, 8],
        color: "",
        target: 10
      },
    ]
  };

export const radarConfig = {
    responsive: true,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "transparent",
            color: "#1A1A1A",
            layout: {
                plots: {
                    show: true,
                    radius: 2,
                },
                outerPolygon: {
                    stroke: "#6a6b6a",
                    strokeWidth: 1,
                },
                dataPolygon: {
                    strokeWidth: 1,
                    transparent: false,
                    opacity: 50,
                    useGradient: true,
                },
                grid: {
                    show: true,
                    stroke: "#C4C4C4",
                    strokeWidth: 0.5,
                    graduations: 5
                },
                labels: {
                    dataLabels: {
                        show: true,
                        fontSize: 12,
                        color: "#1A1A1A"
                    }
                },
            },
            title: {
                text: "Title",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#565656",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                fontSize: 14,
                roundingPercentage: 0,
            }
        }
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: false
    },
    translations: {
        target: "Target"
    }
}

export const chestnutDataset = [
    {
    name: "Root1",
    color: "#ff6400",
    branches: [
      {
        name: "branch 1.1",
        value: 200,
        breakdown: [
          {
            name: "break 1.1.1",
            value: 50,
            color: "#F17171"
          },
          {
            name: "break 1.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 1.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.2",
        value: 100,
        breakdown: [
          {
            name: "break 1.2.1",
            value: 10,
            color: "#F17171"
          },
          {
            name: "break 1.2.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 1.2.3",
            value: 70,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.3",
        value: 175,
        breakdown: [
          {
            name: "break 1.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 1.3.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 1.3.3",
            value: 75,
            color: "#42d392"
          },
        ]
      },

    ]
  },
  {
    name: "Root2",
    color: "#5f8bee",
    branches: [
      {
        name: "branch 2.1",
        value: 200,
        breakdown: [
          {
            name: "break 2.1.1",
            value: 150,
            color: "#F17171"
          },
          {
            name: "break 2.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 2.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.2",
        value: 300,
        breakdown: [
          {
            name: "break 2.2.1",
            value: 100,
            color: "#F17171"
          },
          {
            name: "break 2.2.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 2.2.3",
            value: 150,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.3",
        value: 125,
        breakdown: [
          {
            name: "break 2.3.1",
            value: 80,
            color: "#F17171"
          },
          {
            name: "break 2.3.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 2.3.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
    ]
  },
  {
    name: "Root3",
    color: "#42d392",
    branches: [
      {
        name: "branch 3.1",
        value: 120,
        breakdown: [
          {
            name: "break 3.1.1",
            value: 100,
            color: "#F17171"
          },
          {
            name: "break 3.1.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 3.1.3",
            value: 10,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.2",
        value: 90,
        breakdown: [
          {
            name: "break 3.2.1",
            value: 30,
            color: "#F17171"
          },
          {
            name: "break 3.2.2",
            value: 30,
            color: "#ffc800"
          },
          {
            name: "break 3.2.3",
            value: 40,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.3",
        value: 390,
        breakdown: [
          {
            name: "break 3.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 3.3.2",
            value: 200,
            color: "#ffc800"
          },
          {
            name: "break 3.3.3",
            value: 100,
            color: "#42d392"
          },
        ]
      }
    ]
  },
];

export const chestnutConfig = {
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "transparent",
            color: "#1A1A1A",
            layout: {
                grandTotal: {
                    show: true,
                    fontSize: 20,
                    bold: true,
                    suffix: "",
                    prefix: "",
                    roundingValue: 0,
                    color: "#1A1A1A",
                    text: "Grand total",
                    offsetY: 0,
                },
                roots: {
                    stroke: "#FFFFFF",
                    strokeWidth: 5,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    labels: {
                        show: true,
                        fontSize: 16,
                        adaptColorToBackground: true,
                        color: "#1A1A1A",
                        bold: true,
                        roundingValue: 0,
                        prefix: "",
                        suffix: "",
                        name: {
                            color: "#1A1A1A",
                            fontSize: 16,
                            bold: true,
                        }
                    }
                },
                verticalSeparator: {
                    stroke: "#FFFFFF",
                    strokeWidth: 5,
                },
                links: {
                    opacity: 20,
                },
                branches: {
                    stroke: "#FFFFFF",
                    strokeWidth: 0,
                    borderRadius: 6,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    widthRatio: 1.5,
                    labels: {
                        show: true,
                        fontSize: 14,
                        color: "#1A1A1A",
                        bold: true,
                        dataLabels: {
                            show: true,
                            hideUnderValue: 5,
                            fontSize: 14,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "",
                            suffix: "",
                        }
                    }
                },
                nuts: {
                    offsetX: 20,
                    useGradient: true,
                    gradientIntensity: 30,
                    selected: {
                        useMotion: true,
                        useGradient: true,
                        gradientIntensity: 20,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        labels: {
                            dataLabels: {
                                hideUnderValue: 5,
                                color: "#1A1A1A",
                                fontSize: 12,
                                bold: false,
                                prefix: "",
                                suffix: ""
                            },
                            core: {
                                total: {
                                    color: "#1A1A1A",
                                    fontSize: 24,
                                    bold: false,
                                },
                                value: {
                                    color: "#1A1A1A",
                                    fontSize: 24,
                                    bold: true,
                                    prefix: "",
                                    suffix: ""
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: 16,
                    color: "#1A1A1A",
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: "",
                    suffix: ""
                },
                title: {
                    color: "#1A1A1A",
                    fontSize: 20,
                    text: "Title",
                    bold: true,
                    offsetY:0,
                    subtitle: {
                        text: "Subtitle",
                        color: "#565656",
                        bold: false,
                        fontSize: 16,
                        offsetY: 0,
                    }
                }
            }
        }
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            translations: {
                rootName: "root name",
                rootValue: "root value",
                rootToTotal: "%/total",
                branchName: "branch name",
                branchValue: "branch value",
                branchToRoot: "%/root",
                branchToTotal: "%/total",
                nutName: "nut name",
                nutValue: "nut value",
                nutToBranch: "%/branch",
                nutToRoot: "%/root",
                nutToTotal: "%/total"
            }
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: false,
        title: "options",
        labels: {
            showTable: "Show table"
        }
    },
    translations: {
        total: "Total",
        proportionToTree: "of grand total",
        of: "of"
    }
}

const charts = {
    xyConfig,
    xyDataset,
    donutConfig,
    donutDataset,
    waffleConfig,
    waffleDataset,
    radarConfig,
    radarDataset,
    chestnutConfig,
    chestnutDataset
}

export default charts;