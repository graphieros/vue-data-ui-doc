<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiAgePyramid from "../themes/ThemesVueUiAgePyramid.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

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
  debug: false,
  loading: false,
  responsive: false,
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    height: 500,
    width: 500,
    layout: {
      padding: {
        top: 12,
        right: 12,
        bottom: 36,
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
          translation: "in thousands",
          rotation: 0,
          autoRotate: {
            enable: true,
            angle: -30
          }
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
          color: "#ff7f0e"
        },
        right: {
          color: "#1f77b4"
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
      textAlign: 'center',
      paddingLeft: 0,
      paddingRight: 0,
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
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24
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
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true,
      annotator: true
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
        annotator: "Toggle annotator"
    },
    print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
  },
  table: {
    show: false,
    useDialog: false,
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
  debug: false,
  loading: false,
  responsive: false,
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    height: 500,
    width: 500,
    layout: {
      padding: {
        top: 12,
        right: 12,
        bottom: 36,
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
          translation: "in thousands",
          rotation: 0,
          autoRotate: {
            enable: true,
            angle: -30
          }
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
          color: "#ff7f0e"
        },
        right: {
          color: "#1f77b4"
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
      textAlign: 'center',
      paddingLeft: 0,
      paddingRight: 0,
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
      backgroundOpacity: 50,
      position: 'center',
      offsetY: 24
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
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true,
      annotator: true
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
      annotator: "Toggle annotator"
    },
    print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
  },
  table: {
    show: false,
    useDialog: false,
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
    store.docSnap = !store.docSnap;
} 

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
  return `Array<Array<string | number>>`
})

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiAgePyramid" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.agePyramid[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-age-pyramid"
          targetMaker="VueUiAgePyramid"
          :configSource="mainConfig.vue_ui_age_pyramid"
        />

        <div :class="`transition-all mx-auto w-1/2`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <VueUiAgePyramid :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
          </DocSnapper>
        </div>

        <Rater itemId="vue_ui_age_pyramid" />

        <BaseMigrationInfo
            autoRotate
            debug 
            padding
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_age_pyramid" signInfo="positiveOnly">
            <template #tab0>
              
              <CodeParser
              language="typescript"
              @copy="store.copy()"
              :content="dsTypeCode"
              class="my-6"
              />  
              {{ translations.docs.example[store.lang] }}:
              <br>
              {{ translations.docs.comments.agePyramid.arrayOfEach[store.lang] }}<br><br>
              {{ translations.docs.comments.agePyramid.cols[store.lang] }}
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
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>theme: "", ("celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")</span>
    <BaseDetails attr="events" :level="1">
      <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
      <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
      <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
    </BaseDetails>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="color" attr="style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="height" attr="style.height" type="range" defaultVal="500" :min="300" :max="1000" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="width" attr="style.width" type="range" defaultVal="500" :min="300" :max="1000" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="highlighter" :level="2" title="style.highlighter">
        <BaseAttr name="color" attr="style.highlighter.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="opacity" attr="style.highlighter.opacity" type="range" defaultVal="5" :min="0" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
      <BaseDetails attr="layout" :level="2" title="style.layout">
        <BaseDetails attr="bars" :level="3" title="style.layout.bars">
          <BaseAttr name="gap" attr="style.layout.bars.gap" type="number" defaultVal="2" :min="0" :max="8" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="borderRadius" attr="style.layout.bars.borderRadius" type="number" defaultVal="2" :min="0" :max="12" :step="1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="gradient" :level="4" title="style.layout.bars.gradient">
            <BaseAttr name="show" attr="style.layout.bars.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="underlayer" attr="style.layout.bars.gradient.underlayer" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="intensity" attr="style.layout.bars.gradient.intensity" type="range" defaultVal="60" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="shiftHue" attr="style.layout.bars.gradient.shiftHue" type="number" defaultVal="0.05" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          </BaseDetails>
          <BaseDetails attr="left" :level="4" title="style.layout.bars.left">
            <BaseAttr name="color" attr="style.layout.bars.left.color" type="color" defaultVal="#DC3912" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          </BaseDetails>
          <BaseDetails attr="right" :level="4" title="style.layout.bars.right">
            <BaseAttr name="color" attr="style.layout.bars.right.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="centerSlit" :level="3" title="style.layout.centerSlit">
          <BaseAttr name="width" attr="style.layout.centerSlit.width" type="number" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="dataLabels" :level="3" title="style.layout.dataLabels">
          <BaseDetails attr="sideTitles" :level="4" title="style.layout.dataLabels.sideTitles">
            <BaseAttr name="show" attr="style.layout.dataLabels.sideTitles.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.layout.dataLabels.sideTitles.fontSize" type="number" defaultVal="18" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.dataLabels.sideTitles.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="useSideColor" attr="style.layout.dataLabels.sideTitles.useSideColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.layout.dataLabels.sideTitles.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="offsetY" attr="style.layout.dataLabels.sideTitles.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
          <BaseDetails attr="xAxis" :level="4" title="style.layout.dataLabels.xAxis">
            <BaseAttr name="show" attr="style.layout.dataLabels.xAxis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.layout.dataLabels.xAxis.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.dataLabels.xAxis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.layout.dataLabels.xAxis.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="scale" attr="style.layout.dataLabels.xAxis.scale" type="select" defaultVal="1000" :options="['1', '10', '100', '1000', '10000', '100000']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="translation" attr="style.layout.dataLabels.xAxis.translation" type="text" defaultVal="in thousands" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
            <BaseAttr name="rotation" attr="style.layout.dataLabels.xAxis.rotation" type="number" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="autoRotate" :level="5" title="style.layout.dataLabels.xAxis.autoRotate">
              <BaseAttr name="enable" attr="style.layout.dataLabels.xAxis.autoRotate.enable" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="angle" attr="style.layout.dataLabels.xAxis.autoRotate.angle" defaultVal="-30" type="number" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="yAxis" :level="4" title="style.layout.dataLabels.yAxis">
            <BaseAttr name="show" attr="style.layout.dataLabels.yAxis.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="display" attr="style.layout.dataLabels.yAxis.display" type="select" defaultVal="age" :options="['age', 'year']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="fontSize" attr="style.layout.dataLabels.yAxis.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.dataLabels.yAxis.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bold" attr="style.layout.dataLabels.yAxis.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="showEvery" attr="style.layout.dataLabels.yAxis.showEvery" type="select" defaultVal="5" :options="['1', '5', '10']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="grid" :level="3" title="style.layout.grid">
          <BaseAttr name="show" attr="style.layout.grid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="stroke" attr="style.layout.grid.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.grid.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.layout.padding">
          <BaseAttr name="top" attr="style.layout.padding.top" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="right" attr="style.layout.padding.right" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bottom" attr="style.layout.padding.bottom" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="left" attr="style.layout.padding.left" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left',' center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="paddingLeft" attr="style.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="paddingRight" attr="style.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <BaseAttr name="show" attr="style.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="backgroundColor" attr="style.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
        <BaseAttr name="borderRadius" attr="style.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderColor" attr="style.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderWidth" attr="style.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="backgroundOpacity" attr="style.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="position" attr="style.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="offsetY" attr="style.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
      <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="th" :level="2" title="table.th">
        <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <BaseAttr name="age" attr="translations.age" type="text" defaultVal="age" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="male" attr="translations.male" type="text" defaultVal="male" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="female" attr="translations.female" type="text" defaultVal="female" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="total" attr="translations.total" type="text" defaultVal="total" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="year" attr="translations.year" type="text" defaultVal="year" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="print" :level="2" title="userOptions.print">
          <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
          <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
          <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>

            </template>
            <template #tab2>
              <ExposedMethods
                component="VueUiAgePyramid"
                getImage
                :names="[
                  'generatePdf',
                  'generateImage',
                  'toggleTable'
                ]"
              />
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiAgePyramid"
                    :types="[
                        'svg',
                        'legend',
                        'tooltip-before',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background'
                    ]" 
                />
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