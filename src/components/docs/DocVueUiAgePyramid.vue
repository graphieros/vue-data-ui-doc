<script setup>
import { ref, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";

const dataset = ref([
    [
        "<=1922",
        100,
        25745,
        4277
    ],
    [
        "1923",
        99,
        15028,
        3284
    ],
    [
        "1924",
        98,
        20911,
        4787
    ],
    [
        "1925",
        97,
        29496,
        7310
    ],
    [
        "1926",
        96,
        40212,
        10858
    ],
    [
        "1927",
        95,
        51604,
        15240
    ],
    [
        "1928",
        94,
        65489,
        21814
    ],
    [
        "1929",
        93,
        80263,
        29551
    ],
    [
        "1930",
        92,
        101803,
        40794
    ],
    [
        "1931",
        91,
        117375,
        51502
    ],
    [
        "1932",
        90,
        136362,
        63495
    ],
    [
        "1933",
        89,
        144334,
        72742
    ],
    [
        "1934",
        88,
        163504,
        87182
    ],
    [
        "1935",
        87,
        173069,
        96916
    ],
    [
        "1936",
        86,
        185617,
        113163
    ],
    [
        "1937",
        85,
        193010,
        122661
    ],
    [
        "1938",
        84,
        201331,
        134533
    ],
    [
        "1939",
        83,
        213155,
        145977
    ],
    [
        "1940",
        82,
        205289,
        149241
    ],
    [
        "1941",
        81,
        201481,
        149738
    ],
    [
        "1942",
        80,
        229671,
        175016
    ],
    [
        "1943",
        79,
        251396,
        194632
    ],
    [
        "1944",
        78,
        260729,
        205234
    ],
    [
        "1945",
        77,
        270554,
        215908
    ],
    [
        "1946",
        76,
        360229,
        294509
    ],
    [
        "1947",
        75,
        382802,
        318941
    ],
    [
        "1948",
        74,
        393918,
        330809
    ],
    [
        "1949",
        73,
        397980,
        334869
    ],
    [
        "1950",
        72,
        406186,
        347191
    ],
    [
        "1951",
        71,
        395165,
        339003
    ],
    [
        "1952",
        70,
        408892,
        351245
    ],
    [
        "1953",
        69,
        402938,
        350286
    ],
    [
        "1954",
        68,
        412362,
        360581
    ],
    [
        "1955",
        67,
        417746,
        364324
    ],
    [
        "1956",
        66,
        421921,
        372735
    ],
    [
        "1957",
        65,
        425143,
        380771
    ],
    [
        "1958",
        64,
        427408,
        385431
    ],
    [
        "1959",
        63,
        437495,
        399222
    ],
    [
        "1960",
        62,
        440031,
        404615
    ],
    [
        "1961",
        61,
        440838,
        409935
    ],
    [
        "1962",
        60,
        441677,
        411946
    ],
    [
        "1963",
        59,
        458019,
        427867
    ],
    [
        "1964",
        58,
        463713,
        436775
    ],
    [
        "1965",
        57,
        458021,
        434732
    ],
    [
        "1966",
        56,
        456200,
        435374
    ],
    [
        "1967",
        55,
        443201,
        426371
    ],
    [
        "1968",
        54,
        445982,
        426911
    ],
    [
        "1969",
        53,
        450429,
        434516
    ],
    [
        "1970",
        52,
        454624,
        442538
    ],
    [
        "1971",
        51,
        464859,
        454831
    ],
    [
        "1972",
        50,
        468092,
        457790
    ],
    [
        "1973",
        49,
        459061,
        445647
    ],
    [
        "1974",
        48,
        436700,
        427666
    ],
    [
        "1975",
        47,
        416726,
        406790
    ],
    [
        "1976",
        46,
        404733,
        393123
    ],
    [
        "1977",
        45,
        416080,
        404238
    ],
    [
        "1978",
        44,
        418005,
        402427
    ],
    [
        "1979",
        43,
        428335,
        409645
    ],
    [
        "1980",
        42,
        455337,
        432659
    ],
    [
        "1981",
        41,
        449043,
        427052
    ],
    [
        "1982",
        40,
        446946,
        425275
    ],
    [
        "1983",
        39,
        422931,
        399376
    ],
    [
        "1984",
        38,
        429907,
        404828
    ],
    [
        "1985",
        37,
        436180,
        407776
    ],
    [
        "1986",
        36,
        436039,
        409529
    ],
    [
        "1987",
        35,
        429765,
        403630
    ],
    [
        "1988",
        34,
        428232,
        405642
    ],
    [
        "1989",
        33,
        419725,
        400620
    ],
    [
        "1990",
        32,
        413380,
        402198
    ],
    [
        "1991",
        31,
        402304,
        390496
    ],
    [
        "1992",
        30,
        395137,
        383535
    ],
    [
        "1993",
        29,
        375228,
        367127
    ],
    [
        "1994",
        28,
        372462,
        362967
    ],
    [
        "1995",
        27,
        375987,
        372252
    ],
    [
        "1996",
        26,
        374287,
        374366
    ],
    [
        "1997",
        25,
        369379,
        374512
    ],
    [
        "1998",
        24,
        376420,
        382554
    ],
    [
        "1999",
        23,
        376314,
        389580
    ],
    [
        "2000",
        22,
        399322,
        421152
    ],
    [
        "2001",
        21,
        395152,
        418256
    ],
    [
        "2002",
        20,
        396836,
        418660
    ],
    [
        "2003",
        19,
        399346,
        422821
    ],
    [
        "2004",
        18,
        406838,
        432885
    ],
    [
        "2005",
        17,
        413489,
        437659
    ],
    [
        "2006",
        16,
        423157,
        447090
    ],
    [
        "2007",
        15,
        419925,
        440752
    ],
    [
        "2008",
        14,
        420554,
        444448
    ],
    [
        "2009",
        13,
        419008,
        440783
    ],
    [
        "2010",
        12,
        424529,
        445511
    ],
    [
        "2011",
        11,
        413317,
        433203
    ],
    [
        "2012",
        10,
        410103,
        432223
    ],
    [
        "2013",
        9,
        404450,
        422473
    ],
    [
        "2014",
        8,
        402149,
        417528
    ],
    [
        "2015",
        7,
        388256,
        407067
    ],
    [
        "2016",
        6,
        377726,
        394679
    ],
    [
        "2017",
        5,
        366538,
        382762
    ],
    [
        "2018",
        4,
        356873,
        376705
    ],
    [
        "2019",
        3,
        351707,
        368670
    ],
    [
        "2020",
        2,
        341042,
        356678
    ],
    [
        "2021",
        1,
        343026,
        357351
    ],
    [
        "2022",
        0,
        330929,
        345538
    ]
]);

const config = ref({
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    height: 500,
    width: 500,
    layout: {
      useDiv: true,
      padding: {
        top: 36,
        right: 12,
        bottom: 48,
        left: 12
      },
      grid: {
        show: true,
        stroke: "#CCCCCC",
        strokeWidth: 1
      },
      dataLabels: {
        sideTitles: {
          show: true,
          fontSize: 18,
          color: "#CCCCCC",
          useSideColor: true,
          bold: false
        },
        xAxis: {
          show: true,
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          scale: 1000,
          translation: "in thousands"
        },
        yAxis: {
          show: true,
          display: "age",
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          showEvery: 5
        }
      },
      centerSlit: {
        width: 20
      },
      bars: {
        gap: 0,
        borderRadius: 1,
        left: {
          color: "#ff6400"
        },
        right: {
          color: "#5f8bee"
        },
        gradient: {
          show: true,
          underlayer: "#FFFFFF",
          intensity: 60,
          shiftHue: 0.05
        }
      }
    },
    highlighter: {
      color: "#FFFFFF",
      opacity: 15
    },
    title: {
      text: "France",
      color: "#fafafa",
      fontSize: 20,
      bold: true,
      subtitle: {
        color: "#A1A1A1",
        text: "2023",
        fontSize: 16,
        bold: false
      }
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14
    }
  },
  translations: {
    age: "age",
    male: "male",
    female: "female",
    total: "total",
    year: "year"
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title inside",
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
      outline: "1px solid #e1e5e8"
    }
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
}
const key = ref(0);
function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
} 

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiAgePyramid</h1>
        <div :class="`transition-all w-1/2 mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
            </div>
            <VueUiAgePyramid :dataset="dataset" :config="mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_age_pyramid)"><CopyIcon/> Copy default config as JSON</button>
        </div>
        <Box>
            <template #tab0>
                Sample dataset:
                <br>
                Array of arrays each containing in order:<br><br>
                year | age | nbr. female | nbr. male
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
[
    [...], <span class="text-gray-500">// start from the oldest year</span>
    ['2017', 5, 366538, 382762],
    ['2018', 4, 356873, 376705],
    ['2019', 3, 351707, 368670],
    ['2020', 2, 341042, 356678],
    ['2021', 1, 343026, 357351],
    ['2022', 0, 330929, 345538]
]
</code>
</pre>                
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                    <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
                </div>

<pre>
<code>
const <span class="text-app-blue">config</span> = {
  style: {
    backgroundColor: <input type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    color: <input type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")
    fontFamily: "inherit",
    height: <input type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.height">, (default: 500)
    width: <input type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.width">, (default: 500)
    layout: {
      useDiv: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.useDiv" @change="forceChartUpdate()">, (default: true)
      padding: {
        top: 36,
        right: 12,
        bottom: 48,
        left: 12
      },
      grid: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.show" @change="forceChartUpdate()">, (default: true)
        stroke: <input type="color" v-model="mutableConfig.style.layout.grid.stroke">, (default: "#e1e5e8")
        strokeWidth: <input type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.strokeWidth">, (default: 1)
      },
      dataLabels: {
        sideTitles: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.sideTitles.show" @change="forceChartUpdate()">, (default: true)
          fontSize: <input type="number" min="6" max="64" v-model="mutableConfig.style.layout.dataLabels.sideTitles.fontSize">, (default: 18)
          color: <input type="color" v-model="mutableConfig.style.layout.dataLabels.sideTitles.color">, (default: "#2D353C")
          useSideColor: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.sideTitles.useSideColor" @change="forceChartUpdate()">, (default: true)
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.sideTitles.bold" @change="forceChartUpdate()">, (default: false)
        },
        xAxis: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()">, (default: true)
          fontSize: <input type="number" min="4" max="36" v-model="mutableConfig.style.layout.dataLabels.xAxis.fontSize">, (default: 12)
          color: <input type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold" @change="forceChartUpdate()">, (default: false)
          scale: <select v-model="mutableConfig.style.layout.dataLabels.xAxis.scale"><option>1</option><option>10</option><option>100</option><option>1000</option><option>10000</option><option>100000</option></select>, (default: 1000)
          translation: <input type="text" v-model="mutableConfig.style.layout.dataLabels.xAxis.translation">, (default: "in thousands")
        },
        yAxis: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()">, (default: true)
          display: <select v-model="mutableConfig.style.layout.dataLabels.yAxis.display"><option>age</option><option>year</option></select> "age",
          fontSize: <input type="number" min="6" max="36" v-model="mutableConfig.style.layout.dataLabels.yAxis.fontSize">, (default: 12)
          color: <input type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()">, (default: false)
          showEvery: <select v-model="mutableConfig.style.layout.dataLabels.yAxis.showEvery"><option>1</option><option>5</option><option>10</option></select> 5
        }
      },
      centerSlit: {
        width: 20,
      },
      bars: {
        gap: <input type="range" min="0" max="8" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.bars.gap">, (default: 2)
        borderRadius: <input type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfig.style.layout.bars.borderRadius">, (default: 2)
        left: {
          color: <input type="color" v-model="mutableConfig.style.layout.bars.left.color">, (default: "#dc3912")
        },
        right: {
          color: <input type="color" v-model="mutableConfig.style.layout.bars.right.color">, (default: "#3366cc") 
        },
        gradient: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.bars.gradient.show" @change="forceChartUpdate()"> true,
          underlayer: <input type="color" v-model="mutableConfig.style.layout.bars.gradient.underlayer">, (default: "#FFFFFF")
          intensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.layout.bars.gradient.intensity">, (default: 60)
          shiftHue: 0.05
        }
      }
    },
    highlighter: {
      color: <input type="color" v-model="mutableConfig.style.highlighter.color">, (default: "#2D353C")
      opacity: <input type="range" min="1" max="60" class="accent-app-blue" v-model="mutableConfig.style.highlighter.opacity">, (default: 5)
    },
    title: {
      text: <input type="text" v-model="mutableConfig.style.title.text">, (default: "")
      color: <input type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input type="number" min="8" max="64" v-model="mutableConfig.style.title.fontSize">, (default: 20)
      bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
      subtitle: {
        color: <input type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
        text: <input type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
        fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
      }
    },
    tooltip: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show">, (default: true)
      backgroundColor: <input type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
      color: <input type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
      fontSize: <input type="number" min="6" max="36" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
    }
  },
  translations: {
    age: <input type="text" v-model="mutableConfig.translations.age">, (default: "age")
    male: <input type="text" v-model="mutableConfig.translations.male">, (default: "male")
    female: <input type="text" v-model="mutableConfig.translations.female">, (default: "female")
    total: <input type="text" v-model="mutableConfig.translations.total">, (default: "total")
    year: <input type="text" v-model="mutableConfig.translations.year">, (default: "year")
  },
  userOptions: {
    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
    labels: {
      useDiv: <input type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title inside")
      showTable: <input type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
    }
  },
  table: {
    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
    th: {
      backgroundColor: <input type="color" v-model=" mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
      color: <input type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
      outline: <input type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
    },
    td: {
        backgroundColor: <input type="color" v-model=" mutableConfig.table.td.backgroundColor">, (default: "#FAFAFA")
      color: <input type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
      outline: <input type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
    }
  }
}
</code>
</pre>
            </template>
        </Box>
    </div>
</template>