<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useMainStore } from "../stores";
import staticReleases from "../../public/releases.json"
import { createWordCloudDatasetFromPlainText } from "vue-data-ui"
import { useConfig } from "../assets/useConfig";
import { useIconMap, isValidComponent } from "../useIconMap";
import updates from "../../public/releases.json"
import GithubIssues from "../components/GithubIssues.vue";
import { shiftHue } from '../components/maker/lib'

const globalConfig = useConfig()

const store = useMainStore();
const translations = computed(() => store.translations)
const showWC = ref(false);

const step = ref(0);
watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        step.value += 1;
    })
});

const done = ref(false)

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const isOpen = ref(window.innerWidth > 768);

function toggleMenu(state) {
    isOpen.value = state;
}

const start = ref("2023-07-25");
const lastDate = ref(new Date(Date.now()));
const info = ref(null);

const end = computed(() => {
    const day = lastDate.value.getDate();
    const month = lastDate.value.getMonth()+1;
    const year = lastDate.value.getFullYear();
    return `${year}-${String(month).length === 1 ? `0${month}` : month}-${String(day).length === 1 ? `0${day}` : day}`;
});

const data = ref(null);
const isError = ref(false);
const dates = ref([]);
const versionsList = ref([]);
const isLoadingLine = ref(false);
const isLoadingBar = ref(false);

const url = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui`;
});

const versionsUrl = ref('https://vue-data-ui.graphieros.com/releases.json');

Date.prototype.getWeek = function () {
  const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const weekData = ref([]);

const usableHeatmapData = computed(() => {
  if (!data.value) return [];

  const result = [
    { name: "SUN", values: [] },
    { name: "MON", values: [] },
    { name: "TUE", values: [] },
    { name: "WED", values: [] },
    { name: "THU", values: [] },
    { name: "FRI", values: [] },
    { name: "SAT", values: [] },
  ];

  data.value.forEach(item => {
    const dayOfWeek = new Date(item.period).getDay();
    result[dayOfWeek].values.push(item.value);
  });
  

  return result.map(r => {
    return {
      ...r,
      values: r.values.slice(-52)
    }
  })
});

const usableWeekData = computed(() => {
  if(!weekData.value) return [];
  const weeklyData = [];
  let currentWeek = null;
  let weeklySum = 0;

  weekData.value.forEach((dataPoint) => {
    const date = new Date(dataPoint.day);
    const weekNumber = date.getWeek(); // Custom function to get the week number

    if (currentWeek === null) {
      currentWeek = weekNumber;
    }

    if (currentWeek !== weekNumber) {
      weeklyData.push({ period: `week ${currentWeek}`, value: weeklySum, short: `w${currentWeek}` });
      currentWeek = weekNumber;
      weeklySum = 0;
    }

    weeklySum += dataPoint.downloads;
  });

  // Push the last week's data
  if (currentWeek !== null) {
    weeklyData.push({ period: `week ${currentWeek}`, value: weeklySum, short: `w${currentWeek}` });
  }

  return weeklyData.slice(-52)
});

const heatmapConfig = computed(() => {
  return {
  style: {
    backgroundColor: isDarkMode.value ? '#1A1A1A' : '#f3f4f6',
    color: "#2D353C",
    fontFamily: "inherit",
    layout: {
      padding: {
        top: 36,
        right: 12,
        bottom: 12,
        left: 48
      },
      cells: {
        height: 24,
        value: {
          show: false,
          fontSize: 8,
          bold: false,
          roundingValue: 0,
          color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A',
        },
        colors: {
          hot: "#42d392",
          cold: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
          underlayer: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
        },
        spacing: 0,
        selected: {
          border: 2,
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
        }
      },
      dataLabels: {
        xAxis: {
          show: true,
          values: usableWeekData.value.map(p => p.short),
          fontSize: 14,
          color: isDarkMode.value ? '#BBBBBB' : '#1A1A1A',
          bold: false,
          offsetX: 0,
          offsetY: 0,
          showOnlyAtModulo: 4
        },
        yAxis: {
          show: true,
          values: [],
          fontSize: 14,
          color: isDarkMode.value ? '#BBBBBB' : '#1A1A1A',
          bold: false,
          offsetY: 0,
          offsetX: 0
        }
      }
    },
    title: {
      text: "Downloads heatmap - Last 52 weeks",
      color: isDarkMode.value ? '#BBBBBB' : '#1A1A1A',
      fontSize: 16,
      bold: true,
    },
    legend: {
      show: true,
      backgroundColor: isDarkMode.value ? '#1A1A1A' : '#f3f4f6',
      color: isDarkMode.value ? '#BBBBBB' : '#1A1A1A',
      fontSize: 12,
      bold: true,
      roundingValue: 0,
      position: 'bottom'
    },
    tooltip: {
      show: true,
      backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
      color: isDarkMode.value ? '#BBBBBB' : '#1A1A1A',
      fontSize: 14,
      roundingValue: 0,
      // customFormat: ({datapoint}) => {
      //   return `<div style="border-radius:50%;background:${datapoint.color};display:flex;align-items:center;justify-content:center;height: 64px;width:64px;box-shadow:0 12px 24px -12px rgba(0,0,0,0.3)">${datapoint.value}</div>`
      // }
    }
  },
  userOptions: {
    show: false,
  },
}
})

const histoData = computed(() => {
  return (data.value || []).slice(-14).map(d => {
    return {
      value: d.value,
      timeLabel: d.period,
    }
  })
});

const histoConfig = computed(() => {
  return {
  style: {
    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
    fontFamily: "inherit",
    layout: {
      height: 240,
      width: 1200,
      padding: {
        top: 48,
        right: 0,
        left: 0,
        bottom: 44
      }
    },
    bars: {
      shape: "square",
      strokeWidth: 0,
      colors: {
        positive: "#42d392",
        negative: "#ff6400",
        gradient: {
          show: true
        }
      },
      borderRadius: 6,
      gap: 2
    },
    labels: {
      value: {
        fontSize: 24,
        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
        bold: true,
        rounding: 1,
        prefix: "",
        suffix: "",
        offsetY: -6
      },
      valueLabel: {
        fontSize: 24,
        color: isDarkMode.value ? "#777777" : "#2D353C",
        bold: false,
        rounding: 0
      },
      timeLabel: {
        fontSize: 13,
        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
        bold: false
      }
    },
    selector: {
      stroke: "#42d392",
      borderRadius: 12,
      strokeDasharray: 6
    },
    title: {
      textAlign: "left",
      text: "NPM downloads",
      color: isDarkMode.value ? "#666666" : "#2D353C",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "Last 14 days",
        fontSize: 12,
        bold: false
      }
    }
  }
}
})

const xyConfig = computed({
  get() {
    return {
      ...globalConfig.vue_ui_xy,
      chart: {
        ...globalConfig.vue_ui_xy.chart,
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
        color: isDarkMode.value ? '#F3F4F6': '#1A1A1A',
        highlighter: {
          color: '#42d392',
          opacity: 20,
        },
        tooltip: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
          color: isDarkMode.value ? '#F3F4F6': '#1A1A1A',
        },
        padding: {
          ...globalConfig.vue_ui_xy.chart.padding,
          left: 64,
          right: 64
        },
        legend: {
          ...globalConfig.vue_ui_xy.chart.legend,
          color: isDarkMode.value ? '#F3F4F6' : '#1A1A1A'
        },
        title: {
          ...globalConfig.vue_ui_xy.chart.title,
          text: "Daily npm downloads",
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
        },
        grid: {
          stroke: isDarkMode.value ? '#42d392' : '#CCCCCC',
          labels: {
            color: isDarkMode.value ? '#42d392' : '#1A1A1A',
            xAxisLabels: {
              color: isDarkMode.value ? '#42d392' : '#1A1A1A',
              yOffset: 6,
              fontSize: 12
            }
          }
        },
      },
      line: {
        strokeWidth: 1
      },
      table: {
        th: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
          color: isDarkMode.value ? '#F3F4F6' : '#1A1A1A'
        },
        td: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
          color: isDarkMode.value ? '#F3F4F6' : '#1A1A1A'
        }
      }
    }
  },
  set(v) {
    return v;
  }
});

const xyDataset = ref([]);

const fDates = ref([])

onMounted(() => {
    window.scrollTo(0,0)
    isLoadingLine.value = true;
    isLoadingBar.value = true;
    store.isFetching = true;
    done.value = false;

    fetch(url.value, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        isError.value = false;
        return response.json();
    }).then(json => {
      weekData.value = json.downloads;
        data.value = json.downloads.map(d => {
            return {
                period: d.day,
                value: d.downloads
            }
        }).slice(0,-1);
        isLoadingLine.value = false;
        xyDataset.value = [
          {
            name: "Daily npm downloads",
            series: json.downloads.map(d => d.downloads).slice(0, -1),
            type: "bar",
            useArea: true,
            smooth: false,
            shape: "star"
          }
        ]
        xyConfig.value.chart.grid.labels.xAxisLabels.values = json.downloads.map(d => d.day)
        fDates.value = json.downloads.map(d => d.day)
        xyConfig.value.chart.grid.labels.xAxisLabels.showOnlyFirstAndLast = true
      })
      .catch(err => {
        isError.value = true;
        data.value = [{ period: "", value: 0 }]
      }).finally(() => {
        store.isFetching = false;
        step.value += 1;
    });

    fetch("https://registry.npmjs.org/-/v1/search?text=vue-data-ui", {
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then(json => {
      info.value = json.objects.find(el => el.package.name === 'vue-data-ui').score.detail;
    })

    fetch(versionsUrl.value, {
    method: 'GET',
    cache: 'default',
    }).then((response) => {
        return response.json();
    }).then(data => {
        versionsList.value = data;
    }).catch(err => {
        console.error(err.message);
        versionsList.value = staticReleases
    }).finally(() => {
      done.value = true;
      setTimeout(() => {
        showWC.value = true
      }, 1000);
    })
});


const sparklineReleases = computed(() => {
  if (!versionsList.value) return [];

  return versionsList.value.map(v => {
    return {
      period: v.date,
      value: v.updates.length
    }
  })
});

function computeSumsByChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        const sum = chunk.reduce((a, b) => a + b, 0);
        result.push(sum);
    }
    return result;
}

function getEverySeventhItem(inputArray) {
  const resultArray = [];
  
  for (let i = 0; i < inputArray.length; i += 7) {
    resultArray.push(inputArray[i]);
  }
  
  return resultArray;
}

const weekDataset = computed(() => {
    const series = computeSumsByChunks(data.value.downloads.map(d => d.downloads).slice(0, -1), 7);
    const average = series.reduce((a, b) => a + b, 0) / series.length;
    const avg = [];
    return series.map((s, i) => {
      return {
        period: i,
        value: s
      }
    })
})

const config = computed(() => {
    return {
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            height: 300,
            width: 500,
            highlighter: {
                color: "#FAFAFA"
            },
            padding: {
                top:  36,
                right: 12,
                bottom: 36,
                left: 48
            },        
            grid: {
                stroke: "#e1e5e8",
                showVerticalLines: false,
                labels: {
                    show: true,
                    color: "#c8c8c8",
                    fontSize: 12,
                    axis: {
                        yLabel: "donwloads",
                        xLabel: "days",
                        fontSize: 8
                    },
                    xAxisLabels: {
                        showOnlyFirstAndLast: true,
                        color: "#c8c8c8",
                        show: true,
                        values:  [...dates.value],
                        fontSize: 6,
                    }
                }
            },
            legend: {
                show: true,
                color: "#c8c8c8",
                fontSize: 16
            },
            title: {
            show:true,
            text: "vue-data-ui npm downloads",
            color: "#FAFAFA",
            fontSize: 20,
            bold: true,
            subtitle: {
                fontSize: 16,
                color: "#c8c8c8",
                text: `from ${start.value} to ${end.value}`
            }
            },
            tooltip: {
                color: "#FFFFFF",
                backgroundColor: "#1A1A1A",
                show: true,
                showValue: true,
                showPercentage: false,
                roundingValue: 0,
                roundingPercentage: 0,
            },
            userOptions: {
                show: true,
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
                color: "#c8c8c8",
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
                color: "#c8c8c8",
            }

        },
        plot: {
            radius: 3,
            useGradient: true,
            labels: {
                show: false,
                offsetY: -6,
                rounding: 0,
                color: "#c8c8c8",
            }
        },
        table: {
            rounding: 0,
            th: {
                backgroundColor: "#1A1A1A",
                color: "#c8c8c8",
                outline: "1px solid #e1e5e8"
            },
            td: {
                backgroundColor: "#1A1A1A",
                color: "#c8c8c8",
                outline: "1px solid #e1e5e8",
            }
        }
    }
});

const weekConfig = computed(() => {
    return {
        ...config.value,
        chart: {
            ...config.value.chart,
            grid: {
                ...config.value.chart.grid,
                labels: {
                    ...config.value.chart.grid.labels,
                    axis: {
                        yLabel: "downloads",
                        xLabel: "weeks",
                        fontSize: 8
                    },
                    xAxisLabels: {
                        ...config.value.chart.grid.labels.xAxisLabels,
                        values: getEverySeventhItem(dates.value)
                    }
                }
            },
            title: {
                ...config.value.chart.title,
                subtitle: {
                    ...config.value.chart.title.subtitle,
                    text: "by 7-day chunks"
                }
            }
        }
    }
});

const sparklineConfig = ref({
  style: {
    backgroundColor: "#F3F4F6",
    fontFamily: "inherit",
    line: {
      color: "#42d392",
      strokeWidth: 1,
      smooth: true
    },
    zeroLine: {
      color: "#505050",
      strokeWidth: 1
    },
    plot: {
      show: true,
      radius: 4,
      stroke: "#FFFFFF",
      strokeWidth: 1
    },
    verticalIndicator: {
      show: true,
      strokeWidth: 1.5
    },
    dataLabel: {
      position: "left",
      fontSize: 48,
      bold: true,
      color: "#1A1A1A",
      roundingValue: 1,
      valueType: "latest"
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#1A1A1A",
      fontSize: 16,
      bold: true,
      text: "Daily downloads - Last 100 days"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#42d392"
    }
  }
});
const darkModeSparklineConfig = ref({
  style: {
    backgroundColor: "#1A1A1A",
    fontFamily: "inherit",
    line: {
      color: "#42d392",
      strokeWidth: 1,
      smooth: true
    },
    zeroLine: {
      color: "#505050",
      strokeWidth: 1
    },
    plot: {
      show: true,
      radius: 4,
      stroke: "#FFFFFF",
      strokeWidth: 1
    },
    verticalIndicator: {
      show: true,
      strokeWidth: 1.5
    },
    dataLabel: {
      position: "left",
      fontSize: 48,
      bold: true,
      color: "#42d392",
      roundingValue: 1,
      valueType: "latest"
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#666666",
      fontSize: 16,
      bold: true,
      text: "Daily downloads - Last 100 days"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#42d392"
    }
  }
});

const sparkbarDataset = computed(() => {
  if(info.value) {
    return Object.keys(info.value).filter(key => ['maintenance', 'popularity', 'quality'].includes(key)).map(key => {

      return {
        name: key,
        value: info.value[key] * 100,
        rounding: 2,
        suffix: "%",
        color: "#42d392"
      }
    })
  } else {
    return []
  }
});

const sparkbarConfig = computed(() => {
  return {
    style: {
      backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
      gutter: {
        backgroundColor: isDarkMode.value ? '#3A3A3A' : '#e1e5e6'
      },
      labels: {
        fontSize: 14,
        name: {
          color: isDarkMode.value ? "#BABABA" : "#1A1A1A"
        }
      }
    }
  }
});

const sparklineSkeletonConfig = computed(() => {
  return {
    type: "sparkline",
    style: {
      backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
      sparkline: {
        color: isDarkMode.value ? '#5c5c5c' : '#e1e5e8',
      }
    }
  }
})


const skeletonHeatmapConfig= ref({
    type: "heatmap",
    style: {
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
        heatmap: {
          cellsX: 26,
          cellsY: 7,
          color: isDarkMode.value ? '#5c5c5c' : '#e1e5e8',
        }
    }
});

const tableConfigDarkMode = ref({
    fontFamily: "inherit",
    maxHeight: 700,
    rowsPerPage: 25,
    style: {
        th: {
            backgroundColor: "#1a1a1a",
            color:"#c4c9cc",
            outline: "1px solid #7b8185",
            selected: {
                backgroundColor: "#42d392",
                color: "#1a1a1a"
            }
        },
        rows: {
            even: {
                backgroundColor: "#1a1a1a",
                color: "#c4c9cc",
                selectedCell: {
                    backgroundColor: '#42d392',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#075e37",
                    color: "#FFFFFF"
                }
            },
            odd: {
                backgroundColor: "#2A2A2A",
                color: "#FFFFFF",
                selectedCell: {
                    backgroundColor: '#5de8aa',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#0c7a49",
                    color: "#FFFFFF"
                }
            },
        },
        inputs: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            border: "1px solid #CCCCCC",
            accentColor: "#42d392"
        },
        dropdowns: {
            backgroundColor: "#1a1a1a",
            color: "#c4c9cc",
            icons: {
                selected: {
                    color: "#42d392",
                    unicode: "✔"
                },
                unselected: {
                    color: "#ff6400",
                    unicode: "✖"
                }
            }
        },
        infoBar: {
            backgroundColor: "#1a1a1a",
            color: "#FFFFFF"
        },
        pagination: {
            buttons: {
                backgroundColor: "#1a1a1a",
                color: "#E1E5E8",
                opacityDisabled: 0.3
            },
            navigationIndicator: {
                backgroundColor: "#42d392"
            }
        },
        exportMenu: {
            backgroundColor: "#1a1a1a",
            color: "#E1E5E8",
            buttons: {
                backgroundColor: "#42d392",
                color: "#2D353C"
            }
        },
        closeButtons: {
            backgroundColor: "transparent",
            color: "#ff6400",
            borderRadius: "50%"
        },
        chart: {
            modal: {
                backgroundColor: "#1a1a1a",
                color: "#E1E5E8",
                buttons: {
                  selected: {
                      backgroundColor: "#42d392",
                      color: "#1a1a1a"
                    },
                    unselected: {
                      backgroundColor: "#1a1a1a",
                      color: "#E1E5E8"
                    }
                }
            },
            layout: {
                backgroundColor: "#1a1a1a",
                axis: {
                    stroke: "#ccd1d4",
                    strokeWidth: 2,
                },
                bar: {
                    fill: "#42d392",
                    stroke: "#1a1a1a"
                },
                line: {
                    stroke: "#42d392",
                    strokeWidth: 4,
                    plot: {
                        fill: "#5fe3a8",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        radius: {
                            selected: 6,
                            unselected: 4,
                        }
                    },
                    selector: {
                        stroke: "#ff6400",
                        strokeWidth: 1,
                        strokeDasharray: 5
                    },
                },
                labels: {
                    color: "#ccd1d4"
                },
                progression: {
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeDasharray: 4,
                    arrowSize: 7,
                }
            },
        }
    },
    translations: {
        average: "Average",
        by: "by",
        chooseCategoryColumn: "Choose category column",
        exportAllButton: "CSV all",
        exportAllLabel: "Export all rows of your current filtered dataset",
        exportPageButton: "CSV page",
        exportPageLabel: "Export rows of the current page",
        from: "From",
        inputPlaceholder: "Search...",
        makeDonut: "Generate",
        nb: "Nb",
        page: "Page",
        paginatorLabel: "Rows per page",
        sizeWarning: "Displaying too many rows at a time can lead to slower performance",
        sum: "Sum",
        to: "To",
        total: 'Total',
        totalRows: "Total rows",
    },
    useChart: true
})

const tableConfig = ref({
    fontFamily: "inherit",
    maxHeight: 700,
    rowsPerPage: 25,
    style: {
        th: {
            backgroundColor: "#F3F4F6",
            color:"#1A1A1A",
            outline: "1px solid #C4C4C4",
            selected: {
                backgroundColor: "#42d392",
                color: "#1a1a1a"
            }
        },
        rows: {
            even: {
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                selectedCell: {
                    backgroundColor: '#5de8aa',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#b2d4c4",
                    color: "#1A1A1A"
                }
            },
            odd: {
                backgroundColor: "#e1e5e8",
                color: "#1A1A1A",
                selectedCell: {
                    backgroundColor: '#42d392',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#9cbaac",
                    color: "#1A1A1A"
                }
            },
        },
        inputs: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            border: "1px solid #C4C4C4",
            accentColor: "#42d392"
        },
        dropdowns: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            icons: {
                selected: {
                    color: "#42d392",
                    unicode: "✔"
                },
                unselected: {
                    color: "#ff6400",
                    unicode: "✖"
                }
            }
        },
        infoBar: {
            backgroundColor: "#e1e5e8",
            color: "#1A1A1A"
        },
        pagination: {
            buttons: {
                backgroundColor: "#e1e5e8",
                color: "#1A1A1A",
                opacityDisabled: 0.3
            },
            navigationIndicator: {
                backgroundColor: "#42d392"
            }
        },
        exportMenu: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            buttons: {
                backgroundColor: "#e1e5e8",
                color: "#2D353C"
            }
        },
        closeButtons: {
            backgroundColor: "transparent",
            color: "#ff6400",
            borderRadius: "50%"
        },
        chart: {
            modal: {
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                buttons: {
                  selected: {
                      backgroundColor: "#42d392",
                      color: "#FFFFFF"
                    },
                    unselected: {
                      backgroundColor: "#e1e5e8",
                      color: "#1A1A1A"
                    }
                }
            },
            layout: {
                backgroundColor: "#FFFFFF",
                axis: {
                    stroke: "#ccd1d4",
                    strokeWidth: 2,
                },
                bar: {
                    fill: "#42d392",
                    stroke: "#FFFFFF"
                },
                line: {
                    stroke: "#42d392",
                    strokeWidth: 4,
                    plot: {
                        fill: "#5fe3a8",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        radius: {
                            selected: 6,
                            unselected: 4,
                        }
                    },
                    selector: {
                        stroke: "#ff6400",
                        strokeWidth: 1,
                        strokeDasharray: 5
                    },
                },
                labels: {
                    color: "#1A1A1A"
                },
                progression: {
                    stroke: "#565656",
                    strokeWidth: 2,
                    strokeDasharray: 4,
                    arrowSize: 7,
                }
            },
        }
    },
    translations: {
        average: "Average",
        by: "by",
        chooseCategoryColumn: "Choose category column",
        exportAllButton: "CSV all",
        exportAllLabel: "Export all rows of your current filtered dataset",
        exportPageButton: "CSV page",
        exportPageLabel: "Export rows of the current page",
        from: "From",
        inputPlaceholder: "Search...",
        makeDonut: "Generate",
        nb: "Nb",
        page: "Page",
        paginatorLabel: "Rows per page",
        sizeWarning: "Displaying too many rows at a time can lead to slower performance",
        sum: "Sum",
        to: "To",
        total: 'Total',
        totalRows: "Total rows",
    },
    useChart: true
})

const tableDataset = computed(() => {
  return {
    header: [
      {
        name: 'Day',
        type: "date",
        average: false,
        decimals: false,
        sum: false,
        isSort: true,
        isSearch: false,
        isMultiselect: false,
        isPercentage: false, 
        rangeFilter: false,
      },
      {
        name: 'NPM downloads',
        type: "numeric",
        average: true,
        decimals: 0,
        sum: true,
        isSort: true,
        isSearch: false,
        isMultiselect: false,
        isPercentage: false,  
        rangeFilter: true,
      }
    ],
    body: data.value.map(d => {
      return {
        td: [d.period, d.value]
      }
    })
  }
})

const wheelConfig = computed(() => {
  return {
    userOptions: {
      show: false
    },
    style: {
      chart: {
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
        layout: {
          wheel: {
            ticks: {
              activeColor: '#42d392',
              inactiveColor: isDarkMode.value ? '#3A3A3A' : '#e1e5e8',
              gradient: {
                shiftHueIntensity: 20
              }
            }
          },
          innerCircle: {
            stroke: isDarkMode.value ? '#3A3A3A' : '#e1e5e8',
            strokeWidth: 12
          }
        },
        title: {
          fontSize: 12,
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          bold: false
        }
      }
    }
  }
})

const config3dBar = computed(() => {
  return {
    style: {
        fontFamily: "inherit",
        shape: "tube",
        chart: {
            animation: {
                use: true,
                speed: 1,
                acceleration: 1
            },
            backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
            color: "#CCCCCC",
            bar: {
                color: "#5f8bee",
                stroke: "#5f8bee",
                strokeWidth: 0.7
            },
            box: {
                stroke: "#5A5A5A",
                strokeWidth: 0.7,
                strokeDasharray: 2,
                dimensions: {
                    width: 128,
                    height: 256,
                    top: 27,
                    bottom: 9,
                    left: 24,
                    right: 24,
                    perspective: 18
                }
            },
            title: {
                text: "",
                color:  isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "",
                    fontSize: 16,
                    bold: false
                }
            },
            dataLabel: {
                show: false,
                bold: true,
                color: "#5f8bee",
                fontSize: 12,
                rounding: 1
            }
        }
    },
    userOptions: {
        show: false
    }
};
})

const sparklineConfigForReleases = computed(() => {
  return {
    type: 'bar',
    style: {
      backgroundColor: isDarkMode.value ? '#1E1E1E': '#f3f4f6',
      color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
      bar: {
        borderRadius: 1,
        color: '#5f8bee'
      },
      dataLabel: {
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        suffix: ' updates',
        fontSize: 16,
        valueType: 'sum'
      },
      title: {
        text: 'Releases',
        color: isDarkMode.value ? '#5f8bee' : '#1A1A1A',
        fontSize: 20
      }
    }
  }
})

const trendConfig = computed(() => {
  return {
  style: {
    backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
    fontFamily: "inherit",
    animation: {
      show: true,
      animationFrames: 115
    },
    line: {
      stroke: isDarkMode.value ? '#7A7A7A' : '#5A5A5A',
      strokeWidth: 1,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      smooth: true,
      useColorTrend: false
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 20
    },
    dataLabel: {
      show: true,
      useColorTrend: true,
      color: "#2D353C",
      fontSize: 14,
      bold: false,
      prefix: "",
      suffix: "",
      rounding: 0
    },
    trendLabel: {
      trendType: "global",
      useColorTrend: true,
      color: "#2D353C",
      fontSize: 14,
      bold: true,
      rounding: 0
    },
    arrow: {
      colors: {
        positive: "#42d392",
        neutral: "#7f7f7f",
        negative: "#ff6400"
      }
    },
    padding: {
      top: 12,
      left: 100,
      right: 12,
      bottom: 12
    }
  }
}
})

const uselessWords = ref([
  "A",
  "IT",
  "SO",
  "AT",
  "ARE",
  "A",
  "IN",
  "OR",
  "NOT",
  "0",
  "1",
  "IF",
  "AND",
  "BY",
  "AN",
  "S",
  "D",
  "IS",
  "FOR",
  "AS",
  "HAS",
  "BE",
  "TO",
  "THE",
  "OF",
  "ON",
  "NO",
  "WHEN"
])

const wordCloudDataset = computed(() => {
  const source = staticReleases.map(r => {
    if(!r.updates || !r.updates.length) return ''
    return r.updates.map(u => u.description + ' ').join(' ') + ' '
  }).join(' ')
  return createWordCloudDatasetFromPlainText(source).filter(ds => {
    if(!uselessWords.value.includes(ds.name.toUpperCase())) {
      return ds
    }
  }).sort((a, b) => b.value - a.value).filter(el => el.value > 5)
})

function makeColors({ colorStart, iterations, force }) {
  let color = colorStart;
  const arr = [colorStart];
  for (let i = 0; i < iterations; i += 1) {
    color = shiftHue(color, force);
    arr.push(color)
  }
  return arr;
}

const wordCloudConfig = computed(() => {
  return {
    customPalette: makeColors({
      colorStart: '#5f8aee',
      iterations: 200,
      force: 0.0006
    }),
//     customPalette: [
//   "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F",
//   "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A",
//   "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C",
//   "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5",
//   "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1",
//   "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F",
//   "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A",
//   "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C",
//   "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5",
//   "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1",
//   "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F",
//   "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A",
//   "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C",
//   "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5",
//   "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1",
//   "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F",
//   "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A",
//   "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C",
//   "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1", "#CFD8DC", "#B0BEC5",
//   "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#ECEFF1",
//   "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F",
//   "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B",
//   "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688",
//   "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC",
//   "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB",
//   "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40",
//   "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B",
//   "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688",
//   "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC",
//   "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB",
//   "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40",
//   "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B",
//   "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688",
//   "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC",
//   "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB",
//   "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40",
//   "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B",
//   "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688",
//   "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC",
//   "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40", "#E0F2F1", "#B2DFDB",
//   "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40"
// ],
table: {
  th: {
    backgroundColor: isDarkMode.value ? '#1E1E1E' : '#FFFFFF',
    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
  },
  td: {
    backgroundColor: isDarkMode.value ? '#1E1E1E' : '#FFFFFF',
    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
  }
},
    style: {
      chart: {
        color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
        backgroundColor: isDarkMode.value ? '#1E1E1E' : '#FFFFFF',
        height: 500,
        width: 500,
        words: {
          proximity: 10,
          packingWeight: 5,
          color: isDarkMode.value ? '#8A8A8A' : '#3A3A3A',
          usePalette: true,
        },
        tooltip: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          backgroundOpacity: 30
        },
      }
    }
  }
})

const xyCanvasConfig = computed(() => {
  return {
      customPalette: ['#42d392'],
      style: {
        chart: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          dataLabels: {
            show: false
          },
          zoom: {
            highlightColor: '#42d392',
            color: isDarkMode.value ? '#616161' : '#CCCCCC',
          },
          paddingProportions: {
            top: 0.05
          },
          selector: {
            color: '#42d392'
          },
          tooltip: {
            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            borderColor: isDarkMode.value ? '#4A4A4A' : '#e1e5e8'
          },
          legend: {
            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          },
          title: {
            text: 'Daily NPM Downloads',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          },
          grid: {
            y: {
              axisName: 'Downloads',
              axisLabels: {
                color: isDarkMode.value ? '#6A6A6A' : '#1A1A1A',
                fontSizeRatio: 1,
              },
              verticalLines: {
                show: false
              },
              timeLabels: {
                color: isDarkMode.value ? '#6A6A6A' : '#1A1A1A',
                values: fDates.value,
                fontSizeRatio: 0.8,
                rotation: -20
              }
            },
            x: {
              axisColor: isDarkMode.value ? '#2A2A2A' : '#1A1A1A',
              horizontalLines: {
                alternate: false,
                color: isDarkMode.value ? '#2A2A2A' : '#CCCCCC',
              }
            }
          }
        }
      }}
})

const KPIS = computed(() => {
  return Object.keys(store.pack).map(key => {
    if(typeof store.pack[key] === 'number' && ![
      'watchers_count',
      'forks',
      'watchers',
      'network_count',
      'size',
      'id',
      'open_issues',
    ].includes(key)) {
      return {
        name: key.replaceAll('_', ' '),
        value: store.pack[key]
      }
    }
  }).filter(el => el && el.name)
})

function convertVersionsToTreemap(ds) {
  const componentCountMap = {};
  ds.forEach(entry => {
    entry.updates.forEach(update => {
      const component = update.component;
      if (isValidComponent(component.toString())) {
        if (componentCountMap[component]) {
          componentCountMap[component]++;
        } else {
          componentCountMap[component] = 1;
        }
      }
    });
  });
  return Object.entries(componentCountMap).map(([name, value]) => ({ name, value }));
}

const versionTreemap = computed(() => {
  return [
    {
      name: 'Releases',
      value: convertVersionsToTreemap(versionsList.value).map(e => e.value).reduce((a, b) => a+b, 0),
      children: !versionsList.value ? [] : convertVersionsToTreemap(versionsList.value),
    }
  ]
})

const treemapConfig = computed(() => {
  return {
    table: {
      columnNames: {
        series: 'Components',
        value: 'Updates'
      },
      th: {
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
      },
      td: {
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        roundingPercentage: 1
      }
    },
    style: {
      chart: {
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        tooltip: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          backgroundOpacity: 30
        },
        layout: {
          labels: {
            showDefaultLabels: false,
            fontSize: 100,
            hideUnderProportion: 0.001,
          },
          rects: {
            stroke: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
            colorRatio: 0,
            gradient: {
              intensity: 10,
            },
            selected: {
              stroke: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
            }
          }
        },
        title: {
          text: 'Updates per component',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          textAlign: 'left',
          paddingLeft: 12
        },
        legend: {
          show: false,
        }
      }
    }
  }
})

const parsedData = computed(() => {
  if(!data.value || !data.value.length) return []
  return JSON.parse(JSON.stringify(data.value)).slice(-100)
})

const trendData = computed(() => {
  return data.value.map(d => d.value)
})

const carouselConfig = computed(() => {
  return {
    responsiveBreakpoint: 400,
    userOptions: {
        show: false,
    },
    animation: {
        use: true,
        speedMs: 2000,
        pauseOnHover: true
    },
    style: {
        backgroundColor: isDarkMode.value ? "#2A2A2A" : '#F3F4F6',
        color: "#CCCCCC",
        fontFamily: "inherit"
    },
    border: {
        size: 0,
        color: "#2D353C"
    },
    caption: {
        text: "Latest updates",
        padding: {
            top: 6,
            right: 12,
            bottom: 6,
            left: 12
        },
        style: {
            backgroundColor: isDarkMode.value ? "#2A2A2A" : '#F3F4F6',
            color: isDarkMode.value ? "#42d392" : '#1A1A1A',
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left"
        }
    },
    thead: {
        style: {
            verticalAlign: "middle"
        },
        tr: {
            height: 0,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: isDarkMode.value ? "#3A3A3A" : '#FFFFFF',
                color: isDarkMode.value ? "#8A8A8A" : '#1A1A1A',
                boxShadow: "0px 6px 12px -6px #1A1A1A"
            },
            th: {
                border: {
                    size: 0,
                    color: "#2D353C"
                },
                padding: {
                    top: 0,
                    right: 12,
                    bottom: 0,
                    left: 12
                },
                style: {
                    borderSpacing: 0,
                    border: "none",
                    textAlign: "left",
                    fontVariantNumeric: "tabular-nums"
                }
            }
        }
    },
    tbody: {
        tr: {
            visible: 1,
            height: 32,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: isDarkMode.value ? "#4A4A4A" : '#E1E5E8',
                color: isDarkMode.value ? "#CCCCCC" : '#1A1A1A'
            },
            td: {
                alternateColor: true,
                alternateOpacity: 0.8,
                border: {
                    size: 0,
                    color: "#2D353C"
                },
                padding: {
                    top: 0,
                    right: 12,
                    bottom: 0,
                    left: 12
                },
                style: {
                    fontVariantNumeric: "tabular-nums",
                    textAlign: "left",
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : '#E1E5E8'
                }
            }
        }
    }
}
})

const carouselDataset = computed(() => {

  const arr = [];
  updates.slice(0, 5).forEach(u => {
    for(let i = 0; i < u.updates.length; i += 1) {
        arr.push([
          u.date,
          u.version,
          u.updates[i].component,
          u.updates[i].description
        ])
      }
  })

  return {
    head: [
      'Date',
      'Version',
      'Component',
      'Description',
    ],

    body: arr }
})

const versionsReleases = computed(() => {
  return JSON.parse(JSON.stringify(sparklineReleases.value)).reverse()
})

</script>

<template>
      <div class="carousel hidden sm:block fixed top-[55px] left-0 w-full" style="z-index: 10">
        <VueUiCarouselTable :dataset="carouselDataset" :config="carouselConfig"/>
      </div>
    <!-- <SideMenu @toggle="toggleMenu"/> -->
    <div :class="`pt-9 sm:pt-24 overflow-x-hidden`">
        <div :class="``">
          <h1 class="text-[64px] sm:text-[96px] text-center">{{ translations.menu.versions[store.lang] }}</h1>

          <div class="flex flex-row gap-4 flex-wrap mx-auto max-w-[1200px] px-4 justify-center">
          <div class="flex-1 w-[200px] min-w-[200px]" v-for="kpi in KPIS" >
            <VueDataUi 
              component="VueUiKpi" 
              :dataset="kpi.value"
              :config="{
                backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                layoutClass: 'p-4 rounded-md shadow-md',
                title: kpi.name,
                titleColor: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                valueClass: 'tabular-nums mt-2',
                analogDigits: {
                  show: true,
                  height: 40,
                  color: isDarkMode ? '#5f8aee' : '#1A1A1A',
                  skeletonColor: isDarkMode ? '#3A3A3A' : '#E1E5E8'
                }
              }"
            />
          </div>
        </div>

            <div class="max-w-[800px] mx-auto px-6">
                <div class="max-w-[500px] mx-auto my-6">
                    <VueUiSkeleton v-if="isLoadingLine" :config="sparklineSkeletonConfig"/>
                    <VueUiSkeleton v-if="isLoadingLine" :config="sparklineSkeletonConfig"/>
                    <VueUiSparkline v-if="!isLoadingLine && !!data" :dataset="parsedData" :config="isDarkMode ? darkModeSparklineConfig : sparklineConfig">
                      <template #source>
                        <div class="text-xs text-gray-500 text-right">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                    </VueUiSparkline>
                    <VueUiSparkline v-if="!isLoadingLine && !!data" :dataset="usableWeekData" :config="isDarkMode ? {...darkModeSparklineConfig, type: 'bar', style: {...darkModeSparklineConfig.style, line: {...darkModeSparklineConfig.style.line, color: '#5f8bee'}, area: {...darkModeSparklineConfig.style.area, color: '#5f8bee'}, dataLabel: {...darkModeSparklineConfig.style.dataLabel, color: '#5f8bee'}, verticalIndicator:{...darkModeSparklineConfig.style.verticalIndicator, color: '#42d392'}, title: {...darkModeSparklineConfig.style.title, text: 'Weekly downloads - Last 52 weeks'}}} : {...sparklineConfig, type: 'bar', style: {...sparklineConfig.style, line: {...sparklineConfig.style.line, color: '#5f8bee'}, area: {...sparklineConfig.style.area, color: '#5f8bee'}, title: {...sparklineConfig.style.title, text: 'Weekly downloads - Last 52 weeks'}}} ">
                      <template #source>
                        <div class="text-xs text-gray-500 text-right">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                    </VueUiSparkline>
                  </div>
                  <!-- <div class="max-w-[300px] mx-auto px-6 mb-6">
                    <div class="pb-2 mb-2">
                      Current NPM score:
                    </div>
                    <VueUiSkeleton v-if="isLoadingLine" :config="{ type: 'sparkbar', style: { backgroundColor: isDarkMode ? '#1A1A1A' : '#F3F4F6' }}" />
                    <VueUiSparkbar v-else-if="sparkbarDataset.length" :dataset="sparkbarDataset" :config="sparkbarConfig">
                      <template #source>
                        <div class="text-xs text-gray-500 text-right">
                          Source: <a class="text-app-blue underline" href="https://registry.npmjs.org/-/v1/search?text=vue-data-ui">registry.npmjs.org</a>
                        </div>
                      </template>
                    </VueUiSparkbar>
                </div> -->
                <!-- <div class="flex flew-row gap-2 justify-center mb-6">
                  <div class="w-[100px] sm:w-[150px]" v-for="(wheel, i) in sparkbarDataset">
                    <VueUiSkeleton v-if="isLoadingLine" :config="{ type: 'wheel', style: { backgroundColor: isDarkMode ? '#1A1A1A' : '#F3F4F6'} }" />
                    <div v-else class="flex place-items-center flex-col">
                      <div class="w-full py-6 flex justify-end pr-2">
                        <VueUiGizmo 
                          :dataset="wheel.value"
                          :config="{
                            size: 100,
                            textColor: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                            stroke: isDarkMode ? '#8A8A8A': '#4A4A4A'
                          }"
                        />
                      </div>
                      <VueUiWheel :dataset="{ percentage: wheel.value }" :config="{...wheelConfig, style: {...wheelConfig.style, chart: {...wheelConfig.style.chart, title: {...wheelConfig.style.chart.title, text: i === 0 ? 'Quality' : i === 1 ? 'Popularity' : 'Maintenance'}}}}"/>
                    </div>
                  </div>
                </div> -->
                <!-- <div class="flex flew-row gap-2 justify-center mb-6">
                  <div class="w-[100px] sm:w-[150px]" v-for="(bar, i) in sparkbarDataset">
                    <VueUiSkeleton v-if="isLoadingLine" :config="{ type: 'bar3d', style: { backgroundColor: isDarkMode ? '#1A1A1A' : '#F3F4F6' } }"/>
                    <VueUi3dBar v-else :dataset="{ percentage: bar.value }" :config="{...config3dBar, style: {...config3dBar.style, chart: {...config3dBar.style.chart}}}"/>
                  </div>
                </div> -->
                <div class="max-w-[500px] mx-auto mb-6" v-if="!!data && !isLoadingLine">
                  <VueUiSkeleton v-if="isLoadingLine" :config="{ type: 'sparkHistogram', style: { backgroundColor: isDarkMode ? '#1A1A1A' : '#F3F4F6' } }"/>
                  <VueDataUi v-else component="VueUiSparkHistogram" :dataset="histoData" :config="histoConfig" :key="`histostep_${step}`">
                    <template #source>
                        <div class="text-xs text-gray-500 text-left">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                  </VueDataUi>
                </div>

                <div class="max-w-[800px] mx-auto" v-if="usableHeatmapData.length">
                  <VueUiSkeleton v-if="isLoadingLine" :config="skeletonHeatmapConfig"/>
                  <VueUiHeatmap :dataset="usableHeatmapData" :config="heatmapConfig">
                    <template #source>
                        <div class="text-xs text-gray-500 text-left mt-3 pl-2">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                  </VueUiHeatmap>
                </div>
                <div class="max-w-[800px] mx-auto my-6" v-if="!isLoadingLine">
                  <VueDataUi v-if="xyDataset.length" component="VueUiXyCanvas" :dataset="xyDataset" :config="xyCanvasConfig" :key="`xystep_${step}`">
                    <template #source>
                        <div class="text-xs text-gray-500 text-left pl-2">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                  </VueDataUi>
                </div>
                <div class="max-w-[400px] mx-auto my-6 flex flex-col gap-2">
                  Overall trend
                  <div class="w-full border border-gray-500 shadow-md rounded-md p-2">
                    <VueDataUi component="VueUiSparkTrend" v-if="!!data" :dataset="trendData" :config="trendConfig">
                      <template #source>
                        <div class="text-xs text-gray-500 text-left mt-3 pl-2">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                    </VueDataUi>
                  </div>
                    N - 1
                    <div class="w-full border border-gray-500 shadow-md rounded-md p-2">
                      <VueDataUi component="VueUiSparkTrend" v-if="!!data" :dataset="trendData" :config="{...trendConfig, style: {...trendConfig.style, trendLabel: {...trendConfig.style.trendLabel, trendType: 'n-1'}}}">
                        <template #source>
                        <div class="text-xs text-gray-500 text-left mt-3 pl-2">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                      </VueDataUi>
                    </div>
                    Last to First
                    <div class="w-full border border-gray-500 shadow-md rounded-md p-2">
                      <VueDataUi component="VueUiSparkTrend" v-if="!!data" :dataset="trendData" :config="{...trendConfig, style: {...trendConfig.style, trendLabel: {...trendConfig.style.trendLabel, trendType: 'lastToFirst'}}}">
                        <template #source>
                        <div class="text-xs text-gray-500 text-left mt-3 pl-2">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                      </VueDataUi>
                    </div>
                </div>
                <div class="max-w-[800px] mx-auto my-8 p-6 dark:bg-[#1E1E1E] rounded-md" v-if="sparklineReleases.length">
                  <VueUiSparkline :dataset="versionsReleases" :config="sparklineConfigForReleases">
                    <template #source>
                        <div class="text-xs text-gray-500 text-right mt-3 pl-2">
                          Source: Vue Data UI
                        </div>
                      </template>
                  </VueUiSparkline>
                  <div style="height: 48px"/>
                  <div class="w-full shadow-lg" v-if="showWC">
                    <VueDataUi v-if="done" component="VueUiWordCloud" :dataset="wordCloudDataset" :config="wordCloudConfig">
                      <template #source>
                        <div class="text-xs text-gray-500 text-right mt-3 pl-2">
                          Source: Vue Data UI
                        </div>
                      </template>
                    </VueDataUi>
                  </div>
                </div>

                <div class="w-full dark:bg-[#1E1E1E] p-4">
                  Releases:
                </div>
                <div class="w-full max-h-[500px] overflow-y-auto dark:bg-[#1E1E1E] p-4">
                    <ul>
                        <li v-for="log in versionsList" class="border-l border-gray-500 mb-4">
                          <div class="bg-gray-200 dark:bg-[#FFFFFF10] pl-6 py-2 mb-2">
                            {{ log.date }} | <span class="text-black dark:text-app-green">{{ log.version }}</span><br>
                          </div>
                            <div class="pl-6" v-if="log.updates">
                                <template v-for="update in log.updates">
                                    <div class="text-gray-500">
                                          <a class="text-app-blue hover:underline text-bold flex flex-row flex-wrap gap-2" v-if="update.component && update.link" :href="update.link">
                                            <VueUiIcon :name="useIconMap(update.component)" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                                            {{ update.component }}</a>
                                        <span v-else-if="update.component" class="text-app-blue flex flex-row gap-2 flex-wrap">
                                          <VueUiIcon :name="useIconMap(update.component)" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                                          {{ update.component }}
                                        </span>
                                        {{ update.description }}
                                    </div>
                                    <br>
                                </template>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="w-full p-4 bg-gray-200 dark:bg-[#FFFFFF10] shadow-md rounded-md my-6 treemap-wrapper">
                  <VueDataUi v-if="versionsList.length" component="VueUiTreemap" :dataset="versionTreemap" :config="treemapConfig">
                    <template #rect="{ rect, fontSize }">
                      <div class="h-full w-full flex flex-col place-items-center justify-center treemap-icon">
                        <VueUiIcon :name="useIconMap(rect.name)" stroke="white"/>

                      </div>
                    </template>
                    <template #source>
                        <div class="text-xs text-gray-500 text-right pr-3">
                          Source: Vue Data UI
                        </div>
                      </template>
                  </VueDataUi>
                </div>

                <div class="w-full max-w-[800px] mx-auto mt-12">
                  <VueUiTable :key="`table_${step}`" v-if="!isLoadingLine && !!data" :dataset="tableDataset" :config="isDarkMode ? tableConfigDarkMode: tableConfig"/>
                </div>

                <div class="w-full max-w-[800] mx-auto py-6">
                  <GithubIssues/>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.treemap-icon svg {
  height: unset;
  width: 50%;
}
.carousel td {
  width: fit-content;
  min-width: 120px;
  font-size: 14px;
}
</style>