<script setup>
import { ref, computed, onMounted, watch, nextTick, watchEffect } from "vue";
import { useMainStore } from "../stores";
import staticReleases from "../../public/releases.json"
import { createWordCloudDatasetFromPlainText } from "vue-data-ui"
import { useConfig } from "../assets/useConfig";
import { useIconMap, isValidComponent } from "../useIconMap";
import updates from "../../public/releases.json"
import GithubIssues from "../components/GithubIssues.vue";
import { shiftHue } from '../components/maker/lib'
import RepoStars from "../components/RepoStars.vue";
import { darkenColor, lightenColor } from "vue-data-ui";
import Downloads from "../components/Downloads.vue";
import { BugIcon, GitForkIcon, StarFilledIcon, ToolIcon, UserHeartIcon, XIcon } from "vue-tabler-icons";
import BaseCard from "../components/BaseCard.vue";
import BaseLazy from "../components/BaseLazy.vue";
import BackgroundPattern from "../components/BackgroundPattern.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
import { useIconMapUnderscore } from "../useIconMapUnderscore";
import BaseScroll from "../components/Base/BaseScroll.vue";

const globalConfig = useConfig()

const store = useMainStore();
const translations = computed(() => store.translations)
const showWC = ref(false);
const versionComponent = ref(null);

const chartKeys = computed(() => {
  return Object.keys(globalConfig).toSorted();
})

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
    backgroundColor: isDarkMode.value ? '#2A2A2A' : 'transparent',
    color: "#2D353C",
    fontFamily: "inherit",
    layout: {
      height: 160,
      padding: {
        top: 0,
      },
      cells: {
        height: 24,
        rowTotal: {
            value: {
                show: false,
            },
            color: {
                show: false
            }
        },
        columnTotal: {
            value: {
                show: false,
                rotation: 0,
                offsetX: 0,
                offsetY: 0
            },
            color: {
                show: false
            },
        },
        value: {
          show: false,
          fontSize: 8,
          bold: false,
          roundingValue: 0,
          color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A',
        },
        colors: {
          hot: isDarkMode.value ? "#42d392" : '#1f77b4',
          cold: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
          underlayer: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
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
      textAlign: "left",
      text: "Downloads heatmap",
      color: isDarkMode.value ? "#9A9A9A" : "#2D353C",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "Last 52 weeks",
        fontSize: 12,
        bold: false
      }
    },
    legend: {
      show: true,
      backgroundColor: isDarkMode.value ? '#1A1A1A' : '#f3f4f6',
      color: isDarkMode.value ? '#BBBBBB' : '#1A1A1A',
      fontSize: 12,
      bold: true,
      roundingValue: 0,
      width: 48
    },
    tooltip: {
      show: true,
      backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
      color: isDarkMode.value ? '#BBBBBB' : '#1A1A1A',
      fontSize: 14,
      roundingValue: 0,
      backgroundOpacity: 0,
      borderColor: isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
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
  return (data.value || []).slice(-30).map(d => {
    return {
      value: d.value,
      timeLabel: d.period,
    }
  })
});

const histoConfig = computed(() => {
  return {
  style: {
    backgroundColor: 'transparent',
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
        positive: isDarkMode.value ? "#42d392" : '#1f77b4',
        negative: "#ff6400",
        gradient: {
          show: isDarkMode.value
        }
      },
      borderRadius: 2,
      gap: 1
    },
    labels: {
      value: {
        fontSize: 18,
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
      stroke: isDarkMode.value ? "#42d392" : '#1f77b4',
      borderRadius: 3,
      strokeDasharray: 6
    },
    title: {
      textAlign: "left",
      text: "NPM downloads",
      color: isDarkMode.value ? "#9A9A9A" : "#2D353C",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "Last 30 days",
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
        padding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
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
        zoom: {
          focusOnDrag: true
        }
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
            type: "line",
            useArea: true,
            smooth: true,
            shape: "star",
            showYMarker: true
          }
        ]
        xyConfig.value.chart.grid.labels.xAxisLabels.values = json.downloads.map(d => d.day)
        fDates.value = json.downloads.map(d => d.day)
        xyConfig.value.chart.grid.labels.xAxisLabels.showOnlyFirstAndLast = true
        xyConfig.value.chart.zoom.focusOnDrag = true;
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
        setSem()
    }).catch(err => {
        console.error(err.message);
        versionsList.value = staticReleases
        setSem()
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
                top:  0,
                right: 0,
                bottom: 0,
                left: 0
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
                backgroundOpacity: 0,
                borderColor: isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
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
    chartWidth: 350,
    line: {
      color: "#42d392",
      strokeWidth: 1,
      smooth: true
    },
    bar: {
      borderRadius: 1,
      color: '#5f8aee'
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
      strokeWidth: 1.5,
      strokeDasharray: 0
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
    },
    tooltip: {
      show: true,
      backgroundOpacity: 30,
    }
  }
});

const darkModeSparklineConfig = ref({
  style: {
    backgroundColor: "transparent",
    fontFamily: "inherit",
    chartWidth: 350,
    line: {
      color: "#42d392",
      strokeWidth: 1,
      smooth: true
    },
    bar: {
      borderRadius: 1,
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
      strokeWidth: 1.5,
      strokeDasharray: 0
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
      color: "#9A9A9A",
      fontSize: 16,
      bold: true,
      text: "Daily downloads - Last 100 days"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#42d392"
    },
    tooltip: {
      show: true,
      backgroundColor: '#1A1A1A',
      color: '#CCCCCC',
      backgroundOpacity: 30,
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
      backgroundColor: isDarkMode.value ? '#2A2A2A' : '#F3F4F6',
      sparkline: {
        color: isDarkMode.value ? '#5c5c5c' : '#e1e5e8',
      }
    }
  }
})


const skeletonHeatmapConfig= ref({
    type: "heatmap",
    style: {
        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#F3F4F6',
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
            backgroundColor: "#2A2A2A",
            color:"#c4c9cc",
            outline: "1px solid #3A3A3A",
            selected: {
                backgroundColor: "#42d392",
                color: "#1a1a1a"
            },
            buttons: {
              filter: {
                inactive: {
                  backgroundColor: '#3A3A3A',
                  color: '#9A9A9A'
                },
              },
              cancel: {
                inactive: {
                  backgroundColor: '#2A2A2A',
                  color: '#4A4A4A'
                },
              },
            }
        },
        rows: {
          outline: "1px solid #5A5A5A",
            even: {
                backgroundColor: "#3A3A3A",
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
                backgroundColor: "#4A4A4A",
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
            backgroundColor: "#2A2A2A",
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
            backgroundColor: "#2A2A2A",
            color: "#FFFFFF"
        },
        pagination: {
            buttons: {
                backgroundColor: "#2A2A2A",
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
                backgroundColor: "#2A2A2A",
                color: "#E1E5E8",
                buttons: {
                  selected: {
                      backgroundColor: "#42d392",
                      color: "#2A2A2A"
                    },
                    unselected: {
                      backgroundColor: "#2A2A2A",
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
                    stroke: "#2A2A2A"
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
      animation: { show: false },
      backgroundColor: 'transparent',
      color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
      bar: {
        borderRadius: 0,
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
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "ALL",
  "AN",
  "AND",
  "ANY",
  "ARE",
  "AS",
  "AT",
  "BE",
  "BIG",
  "BY",
  "D",
  "FOR",
  "FROM",
  "GIVEN",
  "HAS",
  "IF",
  "IN",
  "IS",
  "IT",
  "ITS",
  "MORE",
  "NAN",
  "NO",
  "NON",
  "NOT",
  "NOW",
  "OF",
  "ON",
  "ONLY",
  "OR",
  "S",
  "SAME",
  "SO",
  "SOME",
  "T",
  "THE",
  "TO",
  "TOO",
  "USE",
  "WHEN",
  "WITH",
]);

function singularize(sentence) {
  const words = sentence.split(' ');
  return words.map(word => {
    if ([
      "AXIS",
      "CLASSES",
      "CSS",
      "HAS",
      "IS",
      "SERIES",
      "SHOWSERIES",
      "TS",
      "XAXIS",
      "YAXIS",
      "HARMLESS",
      "PROGRESS",
      "MESS"
    ].includes(word.toUpperCase())) {
      return word
    } else {
      return /s$/i.test(word) ? word.slice(0, -1) : word;
    }
  }).join(' ');
}

const wordCloudDataset = computed(() => {
  const source = staticReleases
    .map(r => {
      if (!r.updates || !r.updates.length) return "";
      return r.updates.map(u => singularize(u.description) + " ").join(" ") + " ";
    })
    .join(" ");

  const raw = createWordCloudDatasetFromPlainText(source);
  const mergedMap = raw.reduce((acc, { name, value }) => {
    const key = name.trim().toLowerCase();
    if (!key) return acc;
    if (!acc[key]) {
      acc[key] = { name, value: 0 };
    }
    acc[key].value += value;
    return acc;
  }, {});

  return Object.values(mergedMap)
    .filter(ds => !uselessWords.value.includes(ds.name.toUpperCase()))
    .sort((a, b) => b.value - a.value)
    .filter(el => el.value > 3)
    .map(el => ({ ...el, name: el.name }))
});

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
    userOptions: {
      show: true,
      buttons: {
        tooltip: false,
        pdf: false,
        csv: false,
        img: false,
        table: false,
        svg: false,
        annotator: false,
      }
    },
    strictPixelPadding: true,
    // customPalette: isDarkMode.value ? ['#42d392', '#5f8aee'] : ['#1d915d', '#1d3e54'],
    customPalette: makeColors({
      colorStart: isDarkMode.value ? '#42d392' : '#607D8B',
      iterations: 500,
      force: 0.00059
    }),
    table: {
      th: {
        backgroundColor: 'transparent',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
      },
      td: {
        backgroundColor: 'transparent',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
      }
    },
    style: {
      fontFamily: 'Inter',
      chart: {
        color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
        backgroundColor: 'transparent',
        height: 500,
        width: 500,
        controls: {
            position: 'bottom',
            show: true,
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#E1E5E8',
            buttonColor: isDarkMode.value ? '#2A2A2A' : '#E1E5E8',
            color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
            fontSize: 14,
            border: `1px solid ${isDarkMode.value ? '#4A4A4A' : '#CCCCCC'}`,
            padding: '0.5rem',
            borderRadius: '0.25rem'
        },
        words: {
          proximity: 0,
          color: isDarkMode.value ? '#8A8A8A' : '#3A3A3A',
          usePalette: true,
          selectedStroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        },
        tooltip: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          backgroundOpacity: 0
        },
        zoom: {
          show: false,
        }
      }
    }
  }
})

const xyCanvasConfig = computed(() => {
  return {
      customPalette: ['#42d392'],
      userOptions: { show: false },
      style: {
        chart: {
          backgroundColor: 'transparent',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          dataLabels: {
            show: false
          },
          line: {
            plots: {
              radiusRatio: 0.5
            }
          },
          zoom: {
            highlightColor: '#42d392',
            color: isDarkMode.value ? '#616161' : '#CCCCCC',
            minimap: {
              show: true
            }
          },
          paddingProportions: {
            top: 0.05
          },
          selector: {
            color: '#5f8aee',
            dashed: false,
            showHorizontalSelector: true
          },
          tooltip: {
            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            borderColor: isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
            backgroundOpacity: 0
          },
          legend: {
            backgroundColor: 'transparent',
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
            },
            x: {
              axisColor: isDarkMode.value ? '#2A2A2A' : '#1A1A1A',
              horizontalLines: {
                alternate: false,
                color: isDarkMode.value ? '#2A2A2A' : '#CCCCCC',
              },
              timeLabels: {
                color: isDarkMode.value ? '#6A6A6A' : '#1A1A1A',
                values: fDates.value,
                fontSizeRatio: 0.8,
                rotation: -20
              }
            }
          }
        }
      }}
})

const kpiLinks = ref({
  stargazers_count: 'stargazers',
  forks_count: 'forks',
  open_issues_count: 'issues',
  subscribers_count: 'watchers'
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
        key,
        name: key.replaceAll('_', ' '),
        value: store.pack[key],
        link: `https://github.com/graphieros/vue-data-ui/${kpiLinks.value[key]}`,
        icon: key === 'stargazers_count'
          ? 'starFill'
          : key === 'forks_count'
            ? 'fork'
            : key === 'open_issues_count'
              ? 'wrench'
              : key === 'subscribers_count'
                ? 'person'
                : ''
        ,
        color: key === 'stargazers_count'
          ? '#fdd663'
          : key === 'forks_count'
            ? '#5f8aee'
            : key === 'open_issues_count'
              ? '#ff6600'
              : key === 'subscribers_count'
                ? '#42d392'
          : ''
      }
    }
  }).filter(el => el && el.name).map(el => ({
    ...el,
    displayName: {
      stargazers_count: 'Stars',
      open_issues_count: 'Issues / Pull requests',
      subscribers_count: 'Subscribers',
      forks_count: 'Forks'
    }[el.key]
  }))
})

function convertVersionsToTreemap(ds) {
  const componentCountMap = {};
  ds.forEach(entry => {
    entry.updates.forEach(update => {
      const component = update.component;
      if (isValidComponent(component.toString())) {
        if (componentCountMap[component]) {
          componentCountMap[component] += 1;
        } else {
          componentCountMap[component] = 1;
        }
      }
    });
  });
  const baseColor = '#5F8AEE';
  const total = Object.entries(componentCountMap).length;
  return Object.entries(componentCountMap).map(([name, value], k) => ({ name, value})).sort((a, b) => b.value - a.value).map((el, i) => {
    return {
      ...el,
      color: darkenColor(baseColor, i / 2 / total ) 
    }
  });
}

const versionTreemap = computed(() => {
  return convertVersionsToTreemap(versionsList.value)
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
        backgroundColor: 'transparent',
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
            borderRadius: 2,
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
          textAlign: 'center',
          paddingLeft: 12,
          fontSize: 20
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
  const parsed = JSON.parse(JSON.stringify(data.value)).slice(-100);
  return parsed
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
                color: isDarkMode.value ? "#CCCCCC" : '#1A1A1A',
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
        backgroundColor: isDarkMode.value ? "#2A2A2A" : '#FFFFFF',
        tr: {
            visible: 1,
            height: 32,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: isDarkMode.value ? "#4A4A4A" : '#FFFFFF',
                color: isDarkMode.value ? "#CCCCCC" : '#1A1A1A'
            },
            td: {
                alternateColor: true,
                alternateOpacity: 1,
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
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : '#FFFFFF'
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

const dogFood = ref({
  en: "A dashboard with Vue Data UI KPIs, dogfooding the library :)",
  fr: "Un tableau de bord avec les indicateurs clés de Vue Data UI, en testant la bibliothèque sur elle-même :)",
  pt: "Um painel sobre os KPIs do Vue Data UI, utilizando a própria biblioteca :)",
  de: "Ein Dashboard zu Vue Data UI-KPIs, das die Bibliothek selbst testet :)",
  zh: "一个关于 Vue Data UI KPI 的仪表盘，自测库功能 :)",
  jp: "Vue Data UI の KPI に関するダッシュボード、ライブラリを自分で試しています :)",
  es: "Un panel sobre los KPIs de Vue Data UI, probando la biblioteca internamente :)",
  ar: "لوحة معلومات حول مؤشرات الأداء الرئيسية لـ Vue Data UI، تجربة المكتبة داخليًا :)"
})


const enableSem = ref(false);

const major = ref({
  ver: 3,
  available: [0,1,2,3]
})

const minor = ref({
  ver: 0,
  available: [0]
})

const patch = ref({
  ver: 0,
  available: [0]
})

function resetSem() {
  major.value.ver = 3;
  setSem();
  impactMinor();
  impactPatch();
}

function setSem() {
  const latest = versionsList.value[0].version.split(' ')[1]
  const [ma, mi, pa] = latest.split('.')
  major.value.ver = ma;
  minor.value.ver = mi;
  patch.value.ver = pa;
}

function convertComponent(c) {
  return {
    vue_ui_sparkline: 'VueUiSparkline',
    vue_ui_sparkbar: 'VueUiSparkbar',
    vue_ui_sparkstackbar: 'VueUiSparkStackbar',
    vue_ui_sparkhistogram: 'VueUiSparkHistogram',
    vue_ui_sparkgauge: 'VueUiSparkgauge',
    vue_ui_spark_trend: 'VueUiSparkTrend',
    vue_ui_gizmo: 'VueUiGizmo',
    vue_ui_kpi: 'VueUiKpi',
    vue_ui_quick_chart: 'VueUiQuickChart',
    vue_ui_xy: 'VueUiXy',
    vue_ui_xy_canvas: 'VueUiXyCanvas',
    vue_ui_horizontal_bar: 'VueUiHorizontalBar',
    vue_ui_vertical_bar: 'VueUiVerticalBar',
    vue_ui_parallel_coordinate_plot: 'VueUiParallelCoordinatePlot',
    vue_ui_flow: 'VueUiFlow',
    vue_ui_candlestick: 'VueUiCandlestick',
    vue_ui_age_pyramid: 'VueUiAgePyramid',
    vue_ui_stackbar: 'VueUiStackbar',
    vue_ui_stackline: 'VueUiStackline',
    vue_ui_funnel: 'VueUiFunnel',
    vue_ui_history_plot: 'VueUiHistoryPlot',
    vue_ui_ridgeline: 'VueUiRidgeline',
    vue_ui_donut: 'VueUiDonut',
    vue_ui_nested_donuts: 'VueUiNestedDonuts',
    vue_ui_waffle: 'VueUiWaffle',
    vue_ui_heatmap: 'VueUiHeatmap',
    vue_ui_treemap: 'VueUiTreemap',
    vue_ui_rings: 'VueUiRings',
    vue_ui_galaxy: 'VueUiGalaxy',
    vue_ui_donut_evolution: 'VueUiDonutEvolution',
    vue_ui_circle_pack: 'VueUiCirclePack',
    vue_ui_gauge: 'VueUiGauge',
    vue_ui_bullet: 'VueUiBullet',
    vue_ui_onion: 'VueUiOnion',
    vue_ui_wheel: 'VueUiWheel',
    vue_ui_tiremarks: 'VueUiTiremarks',
    vue_ui_thermometer: 'VueUiThermometer',
    vue_ui_timer: 'VueUiTimer',
    vue_ui_word_cloud: 'VueUiWordCloud',
    vue_ui_relation_circle: 'VueUiRelationCircle',
    vue_ui_chord: 'VueUiChord',
    vue_ui_radar: 'VueUiRadar',
    vue_ui_mood_radar: 'VueUiMoodRadar',
    vue_ui_quadrant: 'VueUiQuadrant',
    vue_ui_chestnut: 'VueUiChestnut',
    vue_ui_scatter: 'VueUiScatter',
    vue_ui_molecule: 'VueUiMolecule',
    vue_ui_strip_plot: 'VueUiStripPlot',
    vue_ui_dumbbell: 'VueUiDumbbell',
    vue_ui_world: 'VueUiWorld',
    vue_ui_3d_bar: 'VueUi3dBar',
    vue_ui_table_sparkline: 'VueUiTableSparkline',
    vue_ui_table_heatmap: 'VueUiTableHeatmap',
    vue_ui_table: 'VueUiTable',
    vue_ui_carousel_table: 'VueUiCarouselTable',
    vue_ui_rating: 'VueUiRating',
    vue_ui_smiley: 'VueUiSmiley',
    vue_ui_accordion: 'VueUiAccordion',
    vue_ui_skeleton: 'VueUiSkeleton',
    vue_ui_dashboard: 'VueUiDashboard',
    vue_ui_annotator: 'VueUiAnnotator',
    vue_ui_icon: 'VueUiIcon',
    vue_ui_digits: 'VueUiDigits',
    vue_ui_cursor: 'VueUiCursor',
    vue_ui_mini_loader: 'VueUiMiniLoader',
    vue_ui_dag: 'VueUiDag',
    vue_ui_geo: 'VueUiGeo',
    vue_ui_bump: 'VueUiBump'
  }[c];
}

const filteredVersions = computed(() => {
  const maj = Number(major.value.ver);
  const min = Number(minor.value.ver);
  const pat = Number(patch.value.ver);

  const parsed = versionsList.value
    .map(v => {
      const m = String(v.version).match(/(\d+)\.(\d+)\.(\d+)/);
      if (!m) return null;
      return {
        original: v,
        major: Number(m[1]),
        minor: Number(m[2]),
        patch: Number(m[3]),
      };
    })
    .filter(Boolean);

  const minors = parsed
    .filter(p => p.major === maj)
    .map(p => p.minor);

  minor.value.available = Array.from(new Set(minors)).sort((a, b) => a - b);

  const patches = parsed
    .filter(p => p.major === maj && p.minor === min)
    .map(p => p.patch);

  patch.value.available = Array.from(new Set(patches)).sort((a, b) => a - b);

  if (!enableSem.value) {
    if (!versionComponent.value) {
      return versionsList.value
    } else {
      const comp = convertComponent(versionComponent.value)

      return versionsList.value
        .filter(v => (v?.updates || []).some(u => (u?.component || '') === comp))
        .map(v => ({
          ...v,
          updates: (v.updates || []).filter(u => (u?.component || '') === comp)
        }))
    }
  }

  return parsed
    .filter(p => p.major === maj && p.minor === min && p.patch === pat)
    .map(p => p.original);
});


async function impactMinor() {
  await nextTick();
  await nextTick();
  minor.value.ver = String(Math.max(...minor.value.available.map(n => +n)));
  impactPatch();
}

async function impactPatch() {
  await nextTick();
  await nextTick();
  patch.value.ver = String(Math.max(...patch.value.available.map(n => +n)));
}

const circlePackConfig = computed(() => {
  return {
    userOptions: {
      show: false,
    },
    style: {
      chart: {
        width: 512,
        height: 512,
        backgroundColor: 'transparent',
        circles: {
          stroke: 'transparent'
        },
        tooltip: {
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          backgroundOpacity: 70,
          borderColor: isDarkMode.value ? '#4A4A4A' : '#CCCCCC'
        },
      }
    }
  }
})

const digitsConfigVersion = computed(() => {
    return {
        backgroundColor: "transparent",
        digits: {
            color: isDarkMode.value ? "#42d392" : "#1A1A1A",
            skeletonColor: isDarkMode.value ? "#FFFFFF10" : "#1A1A1A16",
            thickness: 1.8
        },
    };
});

</script>

<template>
  <div :class="{'vdui': isDarkMode, 'pointer-events-none': true, 'versions': true, 'small-zoom': true}"/>
    
      <div class="carousel hidden sm:block fixed top-[55px] left-0 w-full" style="z-index: 10">
        <VueUiCarouselTable :dataset="carouselDataset" :config="carouselConfig">
          <template #td="{ td, colIndex }">
            <div v-if="colIndex === 1" class="h-[18px] flex flex-row align-center">
              <VueUiDigits v-for="d in td.replaceAll('v ', '')"
                :config="digitsConfigVersion"
                :dataset="d === '.' ? '.' : +d" :class="d === '.' ? '-mr-[0.5rem]' : ''" />
            </div>
            <div v-else-if="colIndex === 2" class="flex flex-row gap-2 place-items-center">
              <VueUiIcon :name="useIconMap(td)" :size="16" :stroke="isDarkMode ? '#83a4f2' : '#8A8A8A'"/>
              <span>{{ td }}</span>
            </div>
            <span v-else>
              {{ td }}
            </span>
          </template>
        </VueUiCarouselTable>
      </div>
    <!-- <SideMenu @toggle="toggleMenu"/> -->
    <div :class="`pt-9 sm:pt-24 overflow-x-hidden`">
        <div :class="``">
          <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
            <img data-cy="header-logo" src="../assets/logo3.png" class="h-14" />
            <h1 :class="`font-inter-bold text-[48px] sm:text-[72px] text-center ${isDarkMode ? 'bg-gradient-to-r from-app-green to-indigo-400 bg-clip-text text-transparent' : 'text-vue-blue'} z-10`" style="letter-spacing: -1px;">
              {{ translations.menu.versions[store.lang] }}
            </h1>
          </div>
          <h2 class="text-[18px] sm:text-[24px] text-center mb-12 text-gray-500">{{ dogFood[store.lang] }}</h2>

          <div class="mx-auto max-w-[800px] px-6">
            <BaseCard>
              <div class="pt-2 flex flex-row flex-wrap align-center gap-4 justify-center place-content-center">
                <button v-for="kpi in KPIS" :class="`relative w-full max-w-[150px] button-kpi-${kpi.name.replaceAll(' ', '-')} rounded-md hover:shadow-xl transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]`"  >
                  <a :href="kpi.link" target="_blank" class="kpi-wrapper">
                      <VueDataUi
                        :class="`${kpi.name.replaceAll(' ', '_')}${isDarkMode ? '-dark' : ''}`"
                        component="VueUiKpi" 
                        :dataset="kpi.value"
                        :config="{
                          backgroundColor: 'transparent',
                          layoutClass: 'p-4 rounded-md shadow-md relative overflow-hidden',
                          titleColor: '#1A1A1A',
                          titleClass: 'text-left pl-1 capitalize',
                          valueClass: 'tabular-nums pl-0 sm:pl-0 !drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]',
                          analogDigits: {
                            show: true,
                            height: 32,
                            color: lightenColor(kpi.color, 0.4),
                            skeletonColor: '#1A1A1A20'
                          }
                        }"
                      >
                        <template #title>
                          <div class="absolute top-[21px] right-6 flex-row place-items-center gap-2" style="transform: scale(1.5,1.5)">
                            <VueUiIcon :name="kpi.icon" :stroke="lightenColor(kpi.color, 0.3)" :size="20" :stroke-width="1"/>
                          </div>
                        </template>
                    </VueDataUi>
                    </a>
                  <div class="absolute -top-4 left-0 text-xs text-gray-600 dark:text-[#9A9A9A]">{{ kpi.displayName }}</div>
                  </button>
                </div>
              </BaseCard>
            </div>

            <div class="mx-auto max-w-[800px] px-6">
              <BaseCard class="max-w-[800px] mx-auto mt-6">
                <div class="w-full p-4 text-[24px] font-inter-medium flex flex-row gap-2 place-items-center">
                  <VueUiIcon name="legend" :stroke="isDarkMode ? '#6A6A6A' : '#8A8A8A'"/>
                  Changelog    
                </div>
  
                <div class="flex flex-row gap-2 mb-2 pl-4">
                    <label class="text-gray-500 dark:text-[#8A8A8A] mr-2">
                      Filter by version
                      <input type="checkbox" v-model="enableSem" @change="resetSem" class="ml-2">
                    </label>
                    <template v-if="enableSem">
                      <label>
                        Major
                        <select v-model="major.ver" class="w-[64px]" @change="impactMinor">
                          <option v-for="o in major.available">{{ o }}</option>
                        </select>
                      </label>
                      <label>
                        Minor
                        <select v-model="minor.ver" class="w-[64px]" @change="impactPatch">
                          <option v-for="o in minor.available">{{ o }}</option>
                        </select>
                      </label>
                      <label>
                        Patch
                        <select v-model="patch.ver" class="w-[64px]">
                          <option v-for="o in patch.available">{{ o }}</option>
                        </select>
                      </label>
                    </template>
                  </div>
  
                <div class="flex flex-col sm:flex-row sm:place-items-center gap-2 mb-2 pl-4" v-if="!enableSem">
                  <label for="versionComponent" @click="openDropdown" class="text-gray-500 dark:text-[#8A8A8A]">Filter by component</label>
                  <div class="flex flex-row gap-2 place-items-center">
                    <BaseDropdown
                      :options="chartKeys.map(k => {
                          return {
                              name: k,
                              icon: useIconMapUnderscore(k)
                          }
                      })"
                      :width="250"
                      v-model:value="versionComponent"
                      background="bg-white dark:bg-[#1A1A1A]"
                      optionTarget="name"
                      additionalOptionTarget="name"
                      id="versionComponent"
                    >
                        <template #selected="{ selectedOption }">
                            <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center overflow-x-hidden">
                                <div class="h-[24px] w-[24px] flex place-items-center">
                                    <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                                </div>
                                <div class="text-[17px]">
                                    <span :class="'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                    <span :class=" 'dark:text-app-blue-light'">{{ selectedOption.name.replace('vue_ui_', '') }}</span>
                                </div>
                            </div>
                            <div v-else class="text-left flex flex-row gap-2 place-items-center">
                              <div class="h-[24px] w-[24px] flex place-items-center">
                                    <VueUiIcon name="dashboard" :size="24" stroke="#5f8aee" />
                                </div>
                                <div class="text-[17px]">
                                    <span :class=" 'dark:text-app-blue-light'">All components</span>
                                </div>
                            </div>
                        </template>
                        <template #option="{ option, selected, current }">
                            <div class="text-left flex flex-row gap-2 place-items-center">
                                <div class="h-[20px] w-[20px] flex place-items-center">
                                    <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                                </div>
                                <div>
                                    <span :class="selected || current ? `text-white` : 'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                    <span :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.name.replace('vue_ui_', '') }}</span>
                                </div>
                            </div>
                        </template>
                    </BaseDropdown>
                    <button
                      :disabled="!versionComponent"
                      class="h-[36px] w-[36px] flex place-items-center justify-center rounded-full dark:bg-[#3A3A3A] hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                      @click="versionComponent = null"
                    >
                    <XIcon />
                  </button>
                  </div>
                </div>

                <div v-if="!enableSem" class="flex flex-row place-items-center gap-2 mb-6 pl-4 tabular-nums">
                  <span class="text-gray-500 dark:text-[#8A8A8A]">Logs:</span> <span class="font-inter-medium">{{ filteredVersions.length }}</span>
                </div>

                <div v-if="!enableSem && versionComponent === 'vue_ui_vertical_bar'" class="flex flex-row gap-2 place-items-center pl-4 mb-6">
                  <VueUiIcon name="circleExclamation" :stroke="isDarkMode ? '#ff6600' : '#ff3700'"/>
                  <span class="text-app-red dark:text-app-orange">
                    This component was renamed to <code>VueUiHorizontalBar</code> in v3
                  </span>
                </div>

                <BaseScroll class="w-full max-h-[500px] p-4 overflow-auto" :fadeColor="isDarkMode ? '#2A2A2A' : '#f3f4f6'">
                  <ul>
                      <li v-for="log in filteredVersions" :class="`mb-4`">
                          <BaseCard type="light">
                            <div class="pt-2 pb-4 mb-6 font-inter-medium text-xl border-b border-gray-300 dark:border-[#5A5A5A] text-[#8A8A8A] mx-6 tabular-nums">
                              {{ log.date }} | <span class="text-black dark:text-app-green">{{ log.version }}</span><br>
                            </div>
                            <div class="pl-6" v-if="log.updates">
                                <template v-for="update in log.updates">
                                    <div :class="`text-gray-500 dark:text-[#CCCCCC]`">
                                          <a class="font-inter-medium text-xl text-app-blue hover:underline text-bold flex flex-row flex-wrap gap-2" v-if="update.component && update.link" :href="update.link">
                                            <VueUiIcon :name="useIconMap(update.component)" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"/>
                                            {{ update.component }}</a>
                                        <span v-else-if="update.component" class="font-inter-medium text-xl text-app-blue flex flex-row gap-2 flex-wrap">
                                          <VueUiIcon :name="useIconMap(update.component)" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"/>
                                          {{ update.component }}
                                        </span>
                                        <div class="pl-8">
                                          {{ update.description }}
                                        </div>
                                    </div>
                                    <br>
                                </template>
                            </div>
                          </BaseCard>
                      </li>
                    </ul>
                </BaseScroll>
              </BaseCard>
            </div>



            <div class="max-w-[800px] mx-auto px-6">
                <BaseCard class="mx-auto mt-6 max-w-[800px]">
                  <div class="max-w-[600px] mx-auto">
                      <VueUiSkeleton v-if="isLoadingLine" :config="sparklineSkeletonConfig"/>
                      <VueUiSkeleton v-if="isLoadingLine" :config="sparklineSkeletonConfig"/>
                      <VueUiSparkline 
                        v-if="!isLoadingLine && !!data" 
                        :dataset="parsedData" 
                        :config="isDarkMode ? {
                          ...darkModeSparklineConfig,
                          style: {
                            ...darkModeSparklineConfig.style,
                            scaleMax: Math.max(...parsedData.map(d => d.value))
                          }
                          } : {
                            ...sparklineConfig
                          }">
                        <template #source>
                          <div class="text-xs text-gray-500 text-right">
                            Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                          </div>
                        </template>
                      </VueUiSparkline>
                      <VueUiSparkline 
                        v-if="!isLoadingLine && !!data" 
                        :dataset="usableWeekData" 
                        :config="isDarkMode ? {
                          ...darkModeSparklineConfig, 
                          type: 'bar', 
                          style: {
                            ...darkModeSparklineConfig.style,
                            scaleMax: Math.max(...usableWeekData.map(d => d.value)),
                            line: {
                              ...darkModeSparklineConfig.style.line, 
                              color: '#5f8bee'
                            }, 
                            bar: {
                              ...darkModeSparklineConfig.style.bar,
                              color: '#5f8bee',
                            },
                            area: {
                              ...darkModeSparklineConfig.style.area, 
                              color: '#5f8bee'
                            }, 
                            dataLabel: {
                              ...darkModeSparklineConfig.style.dataLabel, 
                              color: '#5f8bee'
                            }, 
                            verticalIndicator: {
                              ...darkModeSparklineConfig.style.verticalIndicator, 
                              color: '#42d392'
                            }, 
                            title: {
                              ...darkModeSparklineConfig.style.title, 
                              text: 'Weekly downloads - Last 52 weeks'
                            }
                          }
                        } : {
                          ...sparklineConfig, 
                          type: 'bar', 
                          style: {
                            ...sparklineConfig.style, 
                            line: {
                              ...sparklineConfig.style.line, 
                              color: '#5f8bee'
                            }, 
                            area: {
                              ...sparklineConfig.style.area, 
                              color: '#5f8bee'
                            }, 
                            title: {
                              ...sparklineConfig.style.title, 
                              text: 'Weekly downloads - Last 52 weeks'
                            }
                          }
                        } ">
                        <template #source>
                          <div class="text-xs text-gray-500 text-right">
                            Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                          </div>
                        </template>
                      </VueUiSparkline>
                  </div>
                </BaseCard>


                <BaseCard class="max-w-[800px] mx-auto mt-6">
                  <RepoStars />
                </BaseCard>



                <BaseCard class="max-w-[800px] mx-auto mt-6">
                  <Downloads/>
                </BaseCard>



                <BaseCard class="max-w-[800px] mx-auto mt-6" v-if="!!data && !isLoadingLine">
                  <VueUiSkeleton v-if="isLoadingLine" :config="{ type: 'sparkHistogram', style: { backgroundColor: isDarkMode ? '#2A2A2A' : '#F3F4F6' } }"/>
                  <VueDataUi v-else component="VueUiSparkHistogram" :dataset="histoData" :config="histoConfig" :key="`histostep_${step}`">
                    <template #source>
                        <div class="text-xs text-gray-500 text-left">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                  </VueDataUi>
                </BaseCard>



                <BaseCard class="max-w-[800px] mx-auto mt-6" v-if="usableHeatmapData.length">
                  <VueUiSkeleton v-if="isLoadingLine" :config="skeletonHeatmapConfig"/>
                  <VueUiHeatmap :dataset="usableHeatmapData" :config="heatmapConfig">
                    <template #source>
                        <div class="text-xs text-gray-500 text-left mt-3 pl-2">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                  </VueUiHeatmap>
                </BaseCard>



                <BaseCard class="max-w-[800px] mx-auto mt-6" v-if="!isLoadingLine">
                  <VueDataUi v-if="xyDataset.length" component="VueUiXyCanvas" :dataset="xyDataset" :config="xyCanvasConfig" :key="`xystep_${step}`">
                    <template #source>
                        <div class="text-xs text-gray-500 text-left pl-2">
                          Source: <a class="text-app-blue underline" :href="url">api.npmjs.org</a>
                        </div>
                      </template>
                  </VueDataUi>
                </BaseCard>



                <BaseCard class="max-w-[800px] mx-auto mt-6" v-if="sparklineReleases.length">
                  <VueUiSparkline :dataset="versionsReleases" :config="sparklineConfigForReleases">
                    <template #source>
                        <div class="text-xs text-gray-500 text-right mt-3 pl-2">
                          Source: Vue Data UI
                        </div>
                      </template>
                  </VueUiSparkline>
                  <div style="height: 48px"/>
                  <div class="w-full" v-if="showWC">
                    <VueDataUi v-if="done" component="VueUiCirclePack" :dataset="wordCloudDataset" :config="circlePackConfig" />
                    <VueDataUi v-if="done" component="VueUiWordCloud" :dataset="wordCloudDataset" :config="wordCloudConfig">
                      <template #source>
                        <div class="text-xs text-gray-500 text-right mt-3 pl-2">
                          Source: Vue Data UI
                        </div>
                      </template>
                    </VueDataUi>
                  </div>
                </BaseCard>

                <BaseCard class="mx-auto max-w-[800px] mt-6" v-if="!isLoadingLine && !!data">
                  <VueUiTable :key="`table_${step}`" :dataset="tableDataset" :config="isDarkMode ? tableConfigDarkMode: tableConfig"/>
                </BaseCard>


                <div class="w-full max-w-[800] mx-auto py-6">
                  <GithubIssues/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.vue-data-ui-zoom) {
  width: 100% !important;
  max-width: clamp(200px, 70%, 800px) !important;
  margin: 0 auto !important;
}

:deep(.vue-data-ui-refresh-button) {
  top: -8px !important;
  left: calc(100% + 36px) !important;
}
</style>

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

.kpi-wrapper .stargazers_count {
  background: radial-gradient(at top right, #fdd663, #644e0f) !important;
}
.kpi-wrapper .forks_count {
  background: radial-gradient(at top right, #7e9fed, #101f46) !important;
}
.kpi-wrapper .open_issues_count {
  background: radial-gradient(at top right, #ff812d, #4e1f00) !important;
}
.kpi-wrapper .subscribers_count {
  background: radial-gradient(at top right, #73e1af, #084f2f) !important;
}

.kpi-wrapper .stargazers_count-dark {
  background: radial-gradient(at top right, #fdd66340, #644e0f40) !important;
}
.kpi-wrapper .forks_count-dark {
  background: radial-gradient(at top right, #7e9fed40, #101f4640) !important;
}
.kpi-wrapper .open_issues_count-dark {
  background: radial-gradient(at top right, #ff812d40, #4e1f0040) !important;
}
.kpi-wrapper .subscribers_count-dark {
  background: radial-gradient(at top right, #73e1af40, #084f2f40) !important;
}

.thin-icon path {
  stroke-width: 0.6px !important;
}

.button-kpi-stargazers-count:hover {
  outline: 2px solid #fdd663;
}

.button-kpi-forks-count:hover {
  outline: 2px solid #7e9fed;
}

.button-kpi-open-issues-count:hover {
  outline: 2px solid #ff812d;
}

.button-kpi-subscribers-count:hover {
  outline: 2px solid #73e1af;
}
</style>

<!-- <style>
.vue-ui-treemap-cell {
  height: 100% !important;
  width: 100% !important;
}
</style> -->