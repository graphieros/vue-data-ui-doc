<script setup>
import { computed, ref, onMounted } from "vue";
import { BrandGithubFilledIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import { BrightnessUpIcon, MoonIcon, LanguageIcon, StarFilledIcon, ToolIcon } from "vue-tabler-icons";
import AppSkeletons from "../components/AppSkeletons.vue";
import DeepSearch from "../components/DeepSearch.vue";
import router from "../router"
import staticReleases from "../../public/releases.json"

// TODO: add effect on crosshairs lines

const store = useMainStore();
function changeTheme() {
    if (localStorage.theme === "dark"){
        localStorage.theme = "light";
        document.documentElement.classList.remove('dark');
        store.isDarkMode = false;
        
    } else {
        localStorage.theme = "dark";
        document.documentElement.classList.add('dark');
        store.isDarkMode = true;
    }
}

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => {
  return store.translations;
});

const languageOptions = ref([
  { value: "en", text: "English" },
  { value: "fr", text: "Français" },
  { value: "de", text: "Deutsch" },
  { value: "es", text: "Español" },
  { value: "pt", text: "Portugues" },
  { value: "zh", text: "中国人" },
  { value: "jp", text: "日本語" },
  { value: "ko", text: "한국인"}
])

const selectedLanguage = computed({
  get() {
    return store.lang;
  },
  set(val) {
    localStorage.setItem("vueDataUiLang", val);
    store.lang = val;
    return val;
  }
});

const versionsList = ref([]);
const versionsUrl = ref('https://vue-data-ui.graphieros.com/releases.json');

const sparklineDataset = ref(generateSparkline())
const sparklineDataset2 = ref(generateSparkline())

const isLoading = ref(false);

function generateSparkline() {
  const arr = [];
  for(let i = 0; i < 12; i += 1) {
    arr.push({
      period: i,
      value: Math.round(Math.random()* 100)
    })
  }
  return arr;
}

const timeout = ref(null);

function updateSparkline() {
  const newVal = Math.round(Math.random() * 100);
  const newVal2 = Math.round(Math.random() * 100);
  sparklineDataset.value.push({
    period: Math.random(),
    value: newVal
  });
  sparklineDataset2.value.push({
    period: Math.random(),
    value: newVal2
  });
  sparklineDataset.value = sparklineDataset.value.slice(-12);
  sparklineDataset2.value = sparklineDataset2.value.slice(-12);
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    requestAnimationFrame(updateSparkline);
  }, 1000)
}

const clientPosition = ref({x: 0, y: 0});

const start = ref("2023-07-25");
const end = computed(() => {
  const d = new Date(Date.now());
  const day = d.getDate();
  const month = d.getMonth()+1;
  const year = d.getFullYear();
  return `${year}-${String(month).length === 1 ? `0${month}` : month}-${String(day).length === 1 ? `0${day}` : day}`;
})

const downloadsUrl = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui`;
});

const downloads = ref(null);
const stars = ref(0);

const owner = 'graphieros'; 
const repo = 'vue-data-ui';
const viewBox = ref('0 0 0 0');
const targetSize = ref(48)
const resizeContainer = ref(null);

const boardSize = computed(() => {
    const splitBox = viewBox.value.split(' ')
    return {
        width: splitBox[2],
        height: splitBox[3]
    }
})

function setClientPosition({ clientX, clientY, ...rest }) {
    clientPosition.value.x = clientX;
    clientPosition.value.y = clientY;
  }
  
  function setFingerPosition(data) {
    clientPosition.value.x = data.targetTouches[0].clientX;
    clientPosition.value.y = data.targetTouches[0].clientY;
}

onMounted(() => {
  // isLoading.value = true;
  // store.isFetching = true;
  const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { width, height } = entry.contentRect;
            viewBox.value = `0 0 ${width} ${height}`
        }
    })
    if (resizeContainer.value) {
        resizeObserver.observe(resizeContainer.value)
    }
    
  // fetch(`https://api.github.com/repos/${owner}/${repo}`)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // })
  // .then(data => {
  //   const starsCount = data.stargazers_count;
  //   stars.value = starsCount;
  // })
  // .catch(error => {
  //   console.error('There was a problem fetching the data:', error);
  // }).finally(() => {
  //   isLoading.value = false;
  //   store.isFetching = false;
  // })

  // fetch(downloadsUrl.value, {
  //   method: 'GET',
  //   cache: 'default',
  // }).then((response) => {
  //   return response.json()
  // }).then(data => {
  //   downloads.value = data.downloads.map(d => d.downloads).reduce((a,b) => a + b, 0)
  // }).catch(err => {
  //   console.error(err.message)
  // })

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
    })

    requestAnimationFrame(updateSparkline);
    document.addEventListener("mousemove", getClientPosition);
    document.addEventListener("touchmove", setFingerPosition);
});

function getClientPosition(e) {
  clientPosition.value.x = e.clientX;
  clientPosition.value.y = e.clientY;
}

const deviationY = computed(() => {
  if(clientPosition.value.x > window.innerWidth / 2) {
    return clientPosition.value.x / window.innerWidth / 2
  } else {
    return -(window.innerWidth / 2 - clientPosition.value.x) / window.innerWidth
  }
});

const deviationX = computed(() => {
  if(clientPosition.value.y > window.innerHeight / 2) {
    return clientPosition.value.y / window.innerHeight / 2;
  } else {
    return -(window.innerHeight / 2 - clientPosition.value.y) / window.innerHeight
  }
})

const sparklineConfig = ref({
  type: 'bar',
  style: {
    backgroundColor: isDarkMode ? '#0000000' : "#F3F4F6",
    fontFamily: "inherit",
    bar: {
      color: "#42d392",
    },
    line: {
      color:'#5f8bee',
      strokeWidth: 3,
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
      fontSize: 0,
      bold: true,
      color: "#1A1A1A",
      roundingValue: 1,
      valueType: "latest"
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#1A1A1A",
      fontSize: 0,
      bold: true,
      text: ""
    },
    area: {
      show: false,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
    }
  }
});

const digitConfig = computed(() => {
  return {
    height: "100%",
    backgroundColor: 'transparent',
    digits: {
      color: isDarkMode.value ? '#42d392' : '#1A1A1A',
      skeletonColor: isDarkMode.value ? '#3A3A3A' : '#e1e5e8'
    }
  }
})

const digitConfigStars = computed(() => {
  return {
    height: "100%",
    backgroundColor: 'transparent',
    digits: {
      color: isDarkMode.value ? '#fdd663' : '#1A1A1A',
      skeletonColor: isDarkMode.value ? '#2A2A2A' : '#e1e5e8'
    }
  }
})

const digits = computed(() => {
  return versionsList.value[0].version.replace('v ', '').split('')
})

const digitsConfigVersion = computed(() => {
  
  return {
    backgroundColor: "transparent",
    digits: {
      color: isDarkMode.value ? '#42d392' : '#1A1A1A',
      skeletonColor: isDarkMode.value ? '#FFFFFF10' : '#1A1A1A16'
    }
  }
})

const datasetDonutMenu = computed(() => {
    return [
        {
            name: translations.value.menu.installation[store.lang],
            values: [1],
            color: "#42d392"
        },
        {
            name: translations.value.menu.docs[store.lang],
            values: [1],
            color: "#5f8bee"
        },
        {
            name: translations.value.menu.chartBuilder[store.lang],
            values: [1],
            color: "#e0b731"
        },
        {
            name: translations.value.menu.customization[store.lang],
            values: [0.5],
            color: "#de8b37"
        },
        {
            name: translations.value.menu.versions[store.lang],
            values: [0.5],
            color: "#de6937"
        },
    ]
})

const configDonutMenu = computed(() => {
    return {
        userOptions: {
            show: false,
        },
        style: {
            chart: {
                backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
                useGradient: true,
                gradientIntensity: isDarkMode.value ? 30 : 40,
                legend: {
                    show: false
                },
                tooltip: {
                    show: false,
                },
                layout: {
                    donut: {
                        borderWidth: 2
                    },
                    labels: {
                      value: {
                        show: false,
                      },
                      percentage: {
                          color: isDarkMode.value ? '#7A7A7A': '#AAAAAA',
                          bold: false
                      },
                      name: {
                          color: isDarkMode.value ? '#C1C1C1': '#1A1A1A',
                          fontSize: 14,
                          bold: true
                      },
                      hollow: {
                          total: {
                              show: false,
                          },
                          average: {
                              show: false,
                          }
                      }
                    }
                }
            }
        }
    }
})

const menuRoutes = ref([
    '/installation',
    '/docs',
    '/chart-builder',
    '/customization',
    '/versions'
])

function selectMenu({ datapoint, index }) {
    router.push(menuRoutes.value[index])
}

</script>

<template>
      <div ref="resizeContainer" class="absolute top-0 left-0" style="width:100%;height:100%;overflow: hidden" @mousemove="setClientPosition($event)">

<svg :viewBox="viewBox" width="100%" class="bg-transparent absolute top-0 left-0 user-position">
    <line :x1="clientPosition.x" :x2="clientPosition.x" :y1="0" :y2="clientPosition.y - targetSize" stroke="#616161" stroke-width="0.6" />
    <line :x1="clientPosition.x" :x2="clientPosition.x" :y1="clientPosition.y - targetSize" :y2="clientPosition.y + targetSize" :stroke="isDarkMode ? '#212121' : '#E1E1E1'" stroke-width="1"/>
    <line :x1="clientPosition.x" :x2="clientPosition.x" :y1="clientPosition.y + targetSize" :y2="boardSize.height" stroke="#616161" stroke-width="0.6" />

    <line :x1="0" :x2="clientPosition.x - targetSize" :y1="clientPosition.y" :y2="clientPosition.y" stroke="#616161" stroke-width="0.6" />
    <line :x1="clientPosition.x - targetSize" :x2="clientPosition.x + targetSize" :y1="clientPosition.y" :y2="clientPosition.y" :stroke="isDarkMode ? '#212121' : '#E1E1E1'" stroke-width="1" />
    <line :x1="clientPosition.x + targetSize" :x2="boardSize.width" :y1="clientPosition.y" :y2="clientPosition.y" stroke="#616161" stroke-width="0.6" />

    <text :x="clientPosition.x - targetSize" :y="clientPosition.y - 6" text-anchor="end" class="tabular-nums" :fill="isDarkMode ? '#616161' : '#BBBBBB'">{{ clientPosition.x.toFixed(0) }}</text>
    <g :transform="`translate(${clientPosition.x - 6}, ${clientPosition.y - targetSize})`">
        <text
            text-anchor="start"
            transform="rotate(-90)"
            :fill="isDarkMode ? '#616161' : '#BBBBBB'"
        >
            {{ clientPosition.y.toFixed(0) }}
        </text>
    </g>
    <circle :cx="clientPosition.x - targetSize" :cy="clientPosition.y" r="2" fill="#42d392"/>
    <circle :cx="clientPosition.x + targetSize" :cy="clientPosition.y" r="2" fill="#42d392"/>
    <circle :cx="clientPosition.x" :cy="clientPosition.y - targetSize" r="2" fill="#5f8bee"/>
    <circle :cx="clientPosition.x" :cy="clientPosition.y + targetSize" r="2" fill="#5f8bee"/>
    <circle class="moving-target" :cx="clientPosition.x" :cy="clientPosition.y" :r="targetSize" :fill="isDarkMode ? '#FFFFFF05' : '#00000005'"/>
</svg>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 custom-styles flex flex-col lg:flex-row justify-center place-items-center lg:gap-[100px] w-full max-w-[1280px]">
    <div class="flex flex-col gap-6 max-w-[360px] justify-center place-items-center text-center">
        <h1 style="font-family: SatoshiBold" class="text-[48px]">
            <span class="text-app-green">Vue </span>
            <span class="text-app-blue">Data UI</span>
        </h1>
        <p class="text-board-2 text-xl text-gray-700 dark:text-gray-400">{{ translations.tagline[store.lang] }}</p>
        <a data-cy="btn-github" href="https://github.com/graphieros/vue-data-ui" target="_blank" class="z-10 hidden lg:block">
            <button class="relative flex flex-row place-content-center place-items-center bg-transparent dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold hover:shadow-xl  dark:hover:bg-[rgba(255,255,255,0.02)] dark:hover:border-[#fdd663] gap-3 transition-all">
              <BrandGithubFilledIcon class="dark:text-gray-200"/>
              <span>
                {{ translations.github[store.lang] }}
              </span>
              <div class="w-[25px]" v-if="store.isFetching">              
                <VueUiMiniLoader 
                  :config="{
                    onion: {
                      gutterColor: '#CCCCCC',
                      gutterOpacity: 0.3,
                      gutterBlur: 0,
                      trackHueRotate: 360,
                      trackBlur: 1,
                      trackColor: '#42d392'
                    }
                  }"
                />
              </div>
              <div class="flex flex-row gap-2 place-items-center" v-if="store.stars && !store.isFetching">
                <StarFilledIcon class="text-[#fdd663]"/>
                <span class="text-xs dark:text-[#fdd663] h-[20px]">
                  <VueUiDigits :dataset="store.stars" :config="digitConfigStars"/>
                </span>
              </div>

            </button>
          </a>
          <div v-if="versionsList.length" class="flex flex-row place-items-center h-[30px] mx-auto w-full justify-center">
          <VueUiDigits v-for="d in digits" :config="digitsConfigVersion" :dataset="d === '.' ? '.' : +d" :class="d === '.' ? '-mr-[0.8rem]' : ''"/>
        </div>
    </div>

    <div class="w-[400px] max-w-[400px] lg:w-[500px] lg:min-w-[500px] 2xl:w-[900px] 2xl:min-w-[900px] relative">
        <VueUiDonut :dataset="datasetDonutMenu" :config="configDonutMenu" @selectDatapoint="selectMenu"/>
        <div class="home-perspective-wrapper flex flex-col gap-6 sm:gap-12 max-w-[500px] place-items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px]"> 
            <div class="relative z-10 home-perspective" :style="`transform: rotateY(${deviationY * 30}deg) rotateX(${-deviationX * 20}deg);`">
                <img data-cy="app-logo" src="../assets/logo.png" alt="vue data ui logo" class="h-[80px] mx-auto drop-shadow-xl">
            </div>
        </div>
    </div>

    <a data-cy="btn-github" href="https://github.com/graphieros/vue-data-ui" target="_blank" class="z-10 lg:hidden mt-6">
            <button class="relative flex flex-row place-content-center place-items-center bg-transparent dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold hover:shadow-xl  dark:hover:bg-[rgba(255,255,255,0.02)] hover:border-app-blue gap-3 transition-all">
              <BrandGithubFilledIcon/>
              <span>
                {{ translations.github[store.lang] }}
              </span>
              <div class="w-[25px]" v-if="store.isFetching">              
                <VueUiMiniLoader 
                  :config="{
                    onion: {
                      gutterColor: '#CCCCCC',
                      gutterOpacity: 0.3,
                      gutterBlur: 0,
                      trackHueRotate: 360,
                      trackBlur: 1,
                      trackColor: '#42d392'
                    }
                  }"
                />
              </div>
              <div class="flex flex-row gap-2 place-items-center" v-if="store.stars && !store.isFetching">
                <StarFilledIcon class="text-[#fdd663] drop-shadow"/>
                <span class="text-xs dark:text-[#fdd663] h-[20px]">
                  <VueUiDigits :dataset="store.stars" :config="digitConfigStars"/>
                </span>
              </div>

            </button>
          </a>
</div>
<button @click="changeTheme" id="themeToggle" class=" flex place-items-center place-content-end w-full py-1 pr-4 text-center absolute top-3 right-2">
<BrightnessUpIcon v-if="isDarkMode" class="text-chalk"/>
<MoonIcon v-else class="text-board-2"/>
</button>
</div>
</template>

<style scoped>
.home-perspective-wrapper {
  perspective-origin: center;
  perspective: 400px;
}
.home-perspective {
  transform-style: preserve-3d;
}
.user-position line {
    stroke-linecap: round;
}
.user-position text {
    font-size: 12px;
}

.yRotated{
    transform: rotate(-90deg);
    transform-origin: center;
}
</style>

<style>
.custom-styles 
.vue-ui-donut svg {
    background: #FFFFFF00 !important;
}
.custom-styles .vue-ui-donut path {
    cursor: pointer;
}
.custom-styles .vue-ui-donut text {
    cursor: pointer;
}
.custom-styles 
.vue-ui-donut {
    background: transparent !important;
}
</style>