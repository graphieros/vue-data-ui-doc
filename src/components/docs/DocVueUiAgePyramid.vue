<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from '../MakerLink.vue';
import ThemesVueUiAgePyramid from "../themes/ThemesVueUiAgePyramid.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

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
  responsive: false,
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    height: 500,
    width: 500,
    layout: {
      padding: {
        top: 36,
        right: 12,
        bottom: 48,
        left: 12
      },
      grid: {
        show: true,
        stroke: "#C4C4C4",
        strokeWidth: 1
      },
      dataLabels: {
        sideTitles: {
          show: true,
          fontSize: 18,
          color: "#1A1A1A",
          useSideColor: true,
          bold: false,
          offsetY: 0
        },
        xAxis: {
          show: true,
          fontSize: 12,
          color: "#1A1A1A",
          bold: false,
          scale: 1000,
          translation: "in thousands"
        },
        yAxis: {
          show: true,
          display: "age",
          fontSize: 12,
          color: "#1A1A1A",
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
      color: "#1A1A1A",
      opacity: 10
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
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 14,
      customFormat: null,
      borderRadius: 4,
      borderColor:"#e1e5e8",
      borderWidth: 1,
      backgroundOpacity: 100,
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
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true
    },
    buttonTitles: {
        open: "Open options",
        close: "Close options",
        tooltip: "Toggle tooltip",
        pdf: "Download PDF",
        csv: "Download CSV",
        img: "Download PNG",
        table: "Toggle table",
        fullscreen: "Toggle fullscreen",
    }
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none"
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none"
    }
  }
});
const darkModeConfig = ref({
  responsive: false,
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    height: 500,
    width: 500,
    layout: {
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
          bold: false,
          offsetY: 0,
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
      text: "Title",
      color: "#fafafa",
      fontSize: 20,
      bold: true,
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14,
      customFormat: null,
      borderRadius: 4,
      borderColor:"#3A3A3A",
      borderWidth: 1,
      backgroundOpacity: 100,
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
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true
    },
    buttonTitles: {
      open: "Open options",
      close: "Close options",
      tooltip: "Toggle tooltip",
      pdf: "Download PDF",
      csv: "Download CSV",
      img: "Download PNG",
      table: "Toggle table",
      fullscreen: "Toggle fullscreen",
    }
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none"
    }
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

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
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
} 

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})

</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartAgePyramid" stroke="#42d392" :strokeWidth="1.5" />
            VueUiAgePyramid
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.agePyramid[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
            <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <VueUiAgePyramid :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>

        <BaseDocActions
          targetLink="vue-ui-age-pyramid"
          targetMaker="VueUiAgePyramid"
          :configSource="mainConfig.vue_ui_age_pyramid"
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_age_pyramid">
            <template #tab0>
                {{ translations.docs.example[store.lang] }}:
                <br>
                {{ translations.docs.comments.agePyramid.arrayOfEach[store.lang] }}<br><br>
                {{ translations.docs.comments.agePyramid.cols[store.lang] }}

                <div class="mt-4">
                  TS type: <code class="text-app-green">Array&lt;Array&lt;string | number&gt;&gt;</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
[
    [...], <span class="text-gray-500">// {{ translations.docs.comments.agePyramid.start[store.lang] }}</span>
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
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiAgePyramidConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiAgePyramidConfig" equal>
    <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")</span>
      <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")</span>
      <span>height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.height"><input v-else type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.height">, (default: 500)</span>
      <span>width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.width"><input v-else type="range" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.width">, (default: 500)</span>
      <BaseDetails attr="highlighter" :level="2" title="style.highlighter">
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.highlighter.color"><input v-else type="color" v-model="mutableConfig.style.highlighter.color">, (default: "#2D353C")</span>
        <span>opacity: <input v-if="isDarkMode" type="range" min="1" max="60" class="accent-app-blue" v-model="mutableConfigDarkMode.style.highlighter.opacity"><input v-else type="range" min="1" max="60" class="accent-app-blue" v-model="mutableConfig.style.highlighter.opacity">, (default: 5)</span>
      </BaseDetails>
      <BaseDetails attr="layout" :level="2" title="style.layout">
        <BaseDetails attr="bars" :level="3" title="style.layout.bars">
          <span>gap: <input v-if="isDarkMode" type="range" min="0" max="8" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.bars.gap"><input v-else type="range" min="0" max="8" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.bars.gap">, (default: 2)</span>
          <span>borderRadius: <input v-if="isDarkMode" type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.bars.borderRadius"><input v-else type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfig.style.layout.bars.borderRadius">, (default: 2)</span>
          <BaseDetails attr="gradient" :level="4" title="style.layout.bars.gradient">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.bars.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.bars.gradient.show" @change="forceChartUpdate()">, (default: true)</span>
            <span>underlayer: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.bars.gradient.underlayer"><input v-else type="color" v-model="mutableConfig.style.layout.bars.gradient.underlayer">, (default: "#FFFFFF")</span>
            <span>intensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.layout.bars.gradient.intensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.layout.bars.gradient.intensity">, (default: 60)</span>
            <span>shiftHue: 0.05</span>
          </BaseDetails>
          <BaseDetails attr="left" :level="4" title="style.layout.bars.left">
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.bars.left.color"><input v-else type="color" v-model="mutableConfig.style.layout.bars.left.color">, (default: "#dc3912")</span>
          </BaseDetails>
          <BaseDetails attr="right" :level="4" title="style.layout.bars.right">
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.bars.right.color"><input v-else type="color" v-model="mutableConfig.style.layout.bars.right.color">, (default: "#5F8BEE") </span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="centerSlit" :level="3" title="style.layout.centerSlit">
          <span>width: 20,</span>
        </BaseDetails>
        <BaseDetails attr="dataLabels" :level="3" title="style.layout.dataLabels">
          <BaseDetails attr="sideTitles" :level="4" title="style.layout.dataLabels.sideTitles">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.sideTitles.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.sideTitles.show" @change="forceChartUpdate()">, (default: true)</span>
            <span> fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.sideTitles.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.sideTitles.fontSize" :min="8" :max="42"/>, (default: 18)</span>
            <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.sideTitles.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.sideTitles.color">, (default: "#2D353C")</span>
            <span> useSideColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.sideTitles.useSideColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.sideTitles.useSideColor" @change="forceChartUpdate()">, (default: true)</span>
            <span> bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.sideTitles.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.sideTitles.bold" @change="forceChartUpdate()">, (default: false)</span>
            <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.sideTitles.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.sideTitles.offsetY" :min="-100" :max="100"/>, (default: 0)</span>
          </BaseDetails>
          <BaseDetails attr="xAxis" :level="4" title="style.layout.dataLabels.xAxis">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()">, (default: true)</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.xAxis.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.xAxis.fontSize" :min="8" :max="42"/>, (default: 12)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")</span>
              <span>bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold" @change="forceChartUpdate()">, (default: false)</span>
              <span>scale: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.scale"><option>1</option><option>10</option><option>100</option><option>1000</option><option>10000</option><option>100000</option></select><select v-else v-model="mutableConfig.style.layout.dataLabels.xAxis.scale"><option>1</option><option>10</option><option>100</option><option>1000</option><option>10000</option><option>100000</option></select>, (default: 1000)</span>
              <span>translation: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.translation"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.xAxis.translation">, (default: "in thousands")</span>
          </BaseDetails>
          <BaseDetails attr="yAxis" :level="4" title="style.layout.dataLabels.yAxis">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()">, (default: true)</span>
            <span>display: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.display"><option>age</option><option>year</option></select><select v-else v-model="mutableConfig.style.layout.dataLabels.yAxis.display"><option>age</option><option>year</option></select>, (default: "age")</span>
            <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.yAxis.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.yAxis.fontSize" :min="8" :max="42"/>, (default: 12)</span>
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()">, (default: false)</span>
            <span>showEvery: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.showEvery"><option>1</option><option>5</option><option>10</option></select><select v-else v-model="mutableConfig.style.layout.dataLabels.yAxis.showEvery"><option>1</option><option>5</option><option>10</option></select>, (default: 5)</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="grid" :level="3" title="style.layout.grid">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.show" @change="forceChartUpdate()">, (default: true)</span>
          <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.grid.stroke">, (default: "#e1e5e8")</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.strokeWidth">, (default: 1)</span>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.layout.padding">
          <span>top: 36,</span>
          <span>right: 12,</span>
          <span>bottom: 48,</span>
          <span>left: 12,</span>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")</span>
        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)</span>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")</span>
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show">, (default: true)</span>
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")</span>
        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.fontSize" :min="8" :max="42"/>, (default: 14)</span>
        <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
        <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.borderRadius" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.borderRadius" :min="0" :max="24"/>, (default: 4)</span>
        <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.borderColor">, (default: "#e1e5e8")</span>
        <span>borderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.borderWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.borderWidth" :min="0" :max="24"/>, (default: 1)</span>
        <span>backgroundOpacity: <input class="accent-app-blue" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.tooltip.backgroundOpacity" type="range" min="0" max="100"/><input class="accent-app-blue" v-else v-model="mutableConfig.style.tooltip.backgroundOpacity" type="range" min="0" max="100"/>, (default: 100)</span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
      <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
      <BaseDetails attr="th" :level="2" title="table.th">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model=" mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model=" mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model=" mutableConfig.table.td.backgroundColor">, (default: "#FAFAFA")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <span>age: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.age"><input v-else type="text" v-model="mutableConfig.translations.age">, (default: "age")</span>
      <span>male: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.male"><input v-else type="text" v-model="mutableConfig.translations.male">, (default: "male")</span>
      <span>female: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.female"><input v-else type="text" v-model="mutableConfig.translations.female">, (default: "female")</span>
      <span>total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.total"><input v-else type="text" v-model="mutableConfig.translations.total">, (default: "total")</span>
      <span>year: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.year"><input v-else type="text" v-model="mutableConfig.translations.year">, (default: "year")</span>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
        <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
        <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
        <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
        <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
        <span>tooltip: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.tooltip"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.tooltip">, (default: "Toggle tooltip")</span>
        <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
        <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
        <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
        <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
        <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>

            </template>
            <template #tab2>
              <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiAgePyramid
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiAgePyramid&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiAgePyramid
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiAgePyramid&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiAgePyramid
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiAgePyramid&gt;
</code>
</pre> 
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
    <span class="text-gray-400">// use args to build your custom content</span>
    const content = "My custom content";
    return `&lt;div&gt;${content}&lt;/div&gt;`
}
</code>
</pre>            
Using custom mode, the tooltip will be headless.
Target the following css class to apply custom styles:
<pre>
<code>
.vue-data-ui-custom-tooltip
</code>
</pre>
            </template>

            <template #tab6>
              <ThemesVueUiAgePyramid />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiAgePyramid 
                    :dataset="dataset" 
                    :config="
                      isDarkMode 
                        ? {
                          ...mutableConfigDarkMode,
                          responsive: true
                        } 
                        : {
                          ...mutableConfig,
                          responsive: true
                        }
                      " 
                    :key="key"
                  />
                </template>
              </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>