<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useMainStore } from "../stores";


const store = useMainStore();
const step = ref(0);
watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        step.value += 1;
    })
});

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
const versionsData = ref([]);
const isLoadingLine = ref(false);
const isLoadingBar = ref(false);

const url = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui`;
});

const weekUrl = "https://api.npmjs.org/versions/vue-data-ui/last-week";

const versionsUrl = ref('https://vue-data-ui.graphieros.com/releases.json');

const skeletonLine = ref({
    type:"line",
    style: {
        backgroundColor: "#1A1A1A",
        line: {
        axis: {
            show: true,
            color: "#343434",
            strokeWidth: 0.5
        },
        path: {
            color: "#343434",
            strokeWidth: 1,
            showPlots: true
        }
    }
    }
});

const skeletonBar = ref({
    type: "verticalBar",
    style: {
        backgroundColor: "#1A1A1A",
        verticalBar: {
          axis: {
            show: true,
            color: "#343434",
            strokeWidth: 0.5
          },
          borderRadius: 0.5,
          color: "#343434"
        }
    }
})

onMounted(() => {
    isLoadingLine.value = true;
    isLoadingBar.value = true;

    fetch(url.value, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        isError.value = false;
        return response.json();
    }).then(json => {
        data.value = json.downloads.map(d => {
            return {
                period: d.day,
                value: d.downloads
            }
        }).slice(0,-1);
        isLoadingLine.value = false;
        // dates.value = json.downloads.map(d => d.day);
    })
    .catch(err => {
        isError.value = true;
        data.value = [{ period: "", value: 0 }]
    }).finally(() => {
    });

    fetch("https://registry.npmjs.org/-/v1/search?text=vue-data-ui", {
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then(json => {
      info.value = json.objects.find(el => el.package.name === 'vue-data-ui').score.detail;
    })

    // fetch(weekUrl, {
    //     method: "GET",
    //     mode: "cors",
    //     cache: "default"
    // }).then((response) => {
    //     return response.json()
    // }).then(json => {
    //     versionsData.value = Object.keys(json.downloads).map(key => {
    //         return {
    //             name: key,
    //             value: json.downloads[key]
    //         }
    //     });
    // }).finally(() => {
    //     isLoadingBar.value = false;
    //     step.value += 1;
    // });

    fetch(versionsUrl.value, {
    method: 'GET',
    cache: 'default',
    }).then((response) => {
        return response.json();
    }).then(data => {
        versionsList.value = data;
    }).catch(err => {
        console.error(err.message);
    })
});

const dataset = computed(() => {
    const series = data.value.downloads.map(d => d.downloads).slice(0, -1);
    const average = series.reduce((a, b) => a + b) / series.length;
    const avg = [];
    for(let i = 0; i < series.length; i += 1) {
        avg.push(average);
    }

    return [
        {
            name: "average",
            series: avg,
            type: "line",
            color: "rgb(62,62,62)",
            dashed: true,
            dataLabels: false,
            useTag: "start"
        },
        {
            name: "vue-data-ui",
            series,
            type: "line",
            color: "#42d392",
            useProgression: true,
            dataLabels: false,
        }
    ]
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
    for(let i = 0; i < series.length; i += 1) {
        avg.push(average)
    }
     return [
        {
            name: "average",
            series: avg,
            type: "line",
            color: "rgb(62,62,62)",
            dashed: true,
            dataLabels: false,
            useTag: "start"
        },
        {
            name: "vue-data-ui week",
            series,
            type: "bar",
            color: "#42d392",
            useProgression: false,
            dataLabels: true,
        }
     ]
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
                useDiv: true,
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
})

const verticalConfig = ref({
    style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      layout: {
        useDiv: true,
        bars: {
          useStroke: false,
          strokeWidth: 2,
          height: 16,
          gap: 6,
          borderRadius: 4,
          offsetX: -64,
          paddingRight: 120,
          useGradient: true,
          gradientIntensity: 40,
          fillOpacity: 10,
          underlayerColor: "#FFFFFF",
          dataLabels: {
            color: "#CCCCCC",
            bold: true,
            fontSize: 12,
            value: {
              show: true,
              roundingValue: 0,
              prefix: "",
              suffix: ""
            },
            percentage: {
              show: true,
              roundingPercentage: 0
            },
            offsetX: 0
          },
          nameLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          },
          parentLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          }
        },
        highlighter: {
          color: "#FFFFFF",
          opacity: 5
        },
        separators: {
          show: false,
          color: "#343434",
          strokeWidth: 1
        }
      },
      title: {
        text: "Downloads per version",
        color: "#FAFAFA",
        fontSize: 20,
        bold: true,
        subtitle: {
          color: "#A1A1A1",
          text: "Last 7 days",
          fontSize: 16,
          bold: false
        }
      },
      legend: {
        show: false,
        fontSize: 14,
        color: "#CCCCCC",
        bold: true,
        roundingValue: 0,
        backgroundColor: "#1A1A1A",
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      },
      tooltip: {
        show: true,
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      }
    }
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title & legend inside",
      showTable: "Show table"
    }
  },
  table: {
    show: false,
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "1px solid #e1e5e8"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "1px solid #e1e5e8",
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: "",
      suffix: ""
    }
  },
  translations: {
    parentName: "Serie",
    childName: "Child",
    value: "value",
    percentageToTotal: "%/total",
    percentageToSerie: "%/serie"
  }
});

const sparklineConfig = ref({
  style: {
    backgroundColor: "#F3F4F6",
    fontFamily: "inherit",
    line: {
      color: "#42d392",
      strokeWidth: 3
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
      text: "Daily downloads"
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
      strokeWidth: 3
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
      text: "Daily downloads"
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
    return Object.keys(info.value).map(key => {
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

</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px] hidden sm:block' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden`">
        <div :class="`${isOpen ? 'xl:w-5/6' : ''}`">
            <div class="mx-auto">
            <h1 class="text-center text-xl text-app-green">Versions</h1>
        </div>
            <div class="max-w-[800px] mx-auto px-6">
                <div class="max-w-[500px] mx-auto my-6">
                    <VueUiSkeleton v-if="isLoadingLine" :config="sparklineSkeletonConfig"/>
                    <VueUiSparkline v-if="!isLoadingLine && !!data" :dataset="data" :config="isDarkMode ? darkModeSparklineConfig : sparklineConfig"/>
                </div>
                <div class="max-w-[300px] mx-auto px-6 mb-6">
                    <div class="pb-2 mb-2">
                      Current NPM score:
                    </div>
                    <VueUiSparkbar :dataset="sparkbarDataset" :config="sparkbarConfig"/>
                </div>
                <div class="w-full max-h-[500px] overflow-y-auto">
                    <ul>
                        <li v-for="log in versionsList">
                            {{ log.date }} | <span class="text-app-green">{{ log.version }}</span><br>
                            <div class="pl-6" v-if="log.updates">
                                <template v-for="update in log.updates">
                                    <span class="text-gray-500">
                                        <span v-if="update.component" class="text-app-blue">{{ update.component }}</span>
                                        {{ update.description }}
                                    </span>
                                    <br>
                                </template>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>