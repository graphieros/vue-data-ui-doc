<script setup>
import { computed, ref, onMounted } from "vue";
import { BrandGithubFilledIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import { BrightnessUpIcon, MoonIcon, StarFilledIcon } from "vue-tabler-icons";
import router from "../router"
import staticReleases from "../../public/releases.json"
import { useConfig } from "../assets/useConfig";
import BaseSpinner from "../components/BaseSpinner.vue";
import BaseColorInput from "../components/BaseColorInput.vue";
import updates from '../../public/releases.json'

const configs = useConfig()

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

const componentsLen = computed(() => Object.keys(configs).length + 1)

const versionsList = ref([]);
const versionsUrl = ref('https://vue-data-ui.graphieros.com/releases.json');
const sparklineDataset = ref(generateSparkline())
const sparklineDataset2 = ref(generateSparkline())

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
  const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { width, height } = entry.contentRect;
            viewBox.value = `0 0 ${width} ${height}`
        }
    })
    if (resizeContainer.value) {
        resizeObserver.observe(resizeContainer.value)
    }
    
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
            color: "#5f8bee",
            comment: "Vue 3, Nuxt"
          },
          {
            name: translations.value.menu.docs[store.lang],
            values: [0.87],
            color: "#42d392",
            comment: translations.value.menu.docsComment[store.lang]
        },
        {
            name: translations.value.menu.chartBuilder[store.lang],
            values: [0.7],
            color: "#fdd663",
            comment: translations.value.menu.builderComment[store.lang]
        },
        {
            name: translations.value.menu.customization[store.lang],
            values: [0.6],
            color: "#de8b37",
            comment: translations.value.menu.customizationComment[store.lang]
          },
          {
            name: translations.value.menu.examples[store.lang],
            values: [0.5],
            color: "#de6937",
            comment: translations.value.menu.exampleComment[store.lang]
        },
    ]
})

const configDonutMenu = computed(() => {
    return {
        type: 'polar',
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
                comments: {
                  width: 130
                },
                tooltip: {
                    show: false,
                },
                layout: {
                  donut: {
                    borderWidth: 0.8,
                    useShadow: true,
                    shadowColor: '#000000'
                  },
                    labels: {
                      value: {
                        show: false,
                      },
                      percentage: {
                          formatter: ({ config} ) => {
                            return ''
                          },
                          color: isDarkMode.value ? '#7A7A7A': '#AAAAAA',
                          bold: false
                      },
                      name: {
                          color: isDarkMode.value ? '#C1C1C1': '#1A1A1A',
                          fontSize: 0,
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
    '/examples/categories'
])

function selectMenu({ datapoint, index }) {
    router.push(menuRoutes.value[index])
}

const componentTranslation = ref({
  en: 'Components',
  fr: 'Composants',
  pt: 'Componentes',
  de: 'Komponenten',
  zh: '成分',
  jp: 'コンポーネント',
  es: 'Componentes',
  ko: '구성요소',
  ar: 'عناصر'
})

const specialOccasion = computed(() => {
  return [1200, 1250, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 3000, 4000, 5000].includes(store.stars) || store.stars > 5000;
})

</script>

<template>
    <!-- <div v-if="!isDarkMode" class="underlay-paper"></div>
    <div v-if="isDarkMode" class="underlay-paper--dark"></div> -->
      <div class="underlay"></div>
      <div ref="resizeContainer" class="absolute top-0 left-0" style="width:100%;height:100%;overflow: hidden" @mousemove="setClientPosition($event)">

        <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>
        
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 custom-styles flex flex-col lg:flex-row justify-center place-items-center lg:gap-[100px] w-full max-w-[1280px]">
    <div class="flex flex-col gap-6 max-w-[360px] justify-center place-items-center text-center">
        <h1 style="font-family: SatoshiBold" class="text-[48px]">
            <span class="text-app-green">Vue </span>
            <span class="text-app-blue">Data UI</span>
        </h1>
        <p class="text-board-2 text-xl text-gray-700 dark:text-gray-400">{{ translations.tagline[store.lang] }}</p>

        <div class="flex flex-row gap-2 text-gray-500 relative" :title="componentsLen + ' components'">
          {{ componentTranslation[store.lang] }}: 
          <div class="h-[22px]">
            <VueUiDigits :dataset="componentsLen" :config="{ ...digitConfigStars, digits: { ...digitConfigStars.digits, color: isDarkMode ? '#5f8bee' : '#1A1A1A' }  }"/>
          </div>
        </div>

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
                <div class="relative">
                  <StarFilledIcon class="text-[#fdd663] drop-shadow-sm"/>
                  <!-- FOR SPECIAL OCCASIONS -->
                  <svg viewBox="0 0 20 20" height="16" class="absolute top-[6px] left-1" v-if="specialOccasion">
                    <path d="M 7 7 L 7 4 M 13 7 L 13 4 Z M 5 9 C 7 14 13 14 15 9" fill="none" stroke="black" stroke-width="1.3" stroke-linecap="round"/>
                  </svg>
                </div>
                <span class="text-xs dark:text-[#fdd663] h-[20px]">
                  <Suspense>
                    <template #default>
                      <VueUiDigits :dataset="store.stars" :config="digitConfigStars"/>
                    </template>
                    <template #fallback>
                    <div class="min-h-[20px]"></div>
                </template>
                  </Suspense>
                </span>
              </div>

            </button>
          </a>
          <div v-if="versionsList.length" class="flex flex-row place-items-center h-[30px] mx-auto w-full justify-center" :title="'Version ' + staticReleases[0].version.replace('v', '')">
            <Suspense>
              <template #default>
                  <div class="h-full flex flex-row place-items-center justify-center">
                    <svg style="height:100%" viewBox="-6 -6 22 22">
                      <path d="M 0,4.5 5,12.5 10,4.5" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <VueUiDigits v-for="d in digits" :config="digitsConfigVersion" :dataset="d === '.' ? '.' : +d" :class="d === '.' ? '-mr-[0.8rem]' : ''"/>
                  </div>
              </template>
              <template #fallback>
                    <div class="min-h-[50px]"></div>
                </template>
            </Suspense>
        </div>
          <div v-else class="flex flex-row place-items-center h-[30px] mx-auto w-full justify-center">
        </div>
    </div>

    <div class="w-[400px] max-w-[400px] lg:w-[500px] lg:min-w-[500px] 2xl:w-[900px] 2xl:min-w-[900px] relative transition-all">
        <Suspense>
          <template #default>
            <VueUiDonut :dataset="datasetDonutMenu" :config="configDonutMenu" @selectDatapoint="selectMenu">
              <template #pattern="{ seriesIndex, patternId }">
                  <pattern v-if="seriesIndex === 0" :id="patternId" width="50.222" height="29.003" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A50" stroke-linecap="square" d="M58.592-14.503h-16.74m6.277 3.627H56.5l4.188 7.25h-8.373zM60.686 3.623l-4.187 7.25h-8.372l4.187-7.25zM41.852-7.252l4.185 7.25-4.185 7.252L37.666 0zm25.11 7.25L58.593 14.5h-16.74L33.481-.001l8.371-14.501m16.74-.001 8.37 14.502m0 0h-16.74v0m-8.37-14.501L50.222 0l-8.37 14.503M8.371-14.502H-8.37m6.276 3.627h8.371l4.188 7.25H2.093zM10.464 3.624l-4.186 7.25h-8.373l4.187-7.25zM-8.37-7.251-4.185 0-8.37 7.252-12.556 0zM16.74 0 8.37 14.502H-8.37L-16.742 0l8.371-14.501m16.74-.001L16.741-.001m0 0H.001v0m-8.37-14.501L0 0l-8.37 14.503m6.275 3.625h8.372l4.187 7.25H2.093zm12.558 14.499-4.187 7.25h-8.372l4.187-7.25zM-8.371 21.752l4.185 7.25-4.185 7.252-4.185-7.251zm25.112 7.25L8.37 43.504H-8.37l-8.371-14.502 8.37-14.501M8.37 14.5l8.372 14.502m0 0H0v0m-8.37-14.5L0 29.003l-8.37 14.503m56.5-25.379 8.371.001 4.188 7.25h-8.373zm12.557 14.5L56.5 39.876l-8.372.001 4.187-7.25zM41.852 21.751l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74l-8.372-14.5M58.59 14.5l8.372 14.503m0 0h-16.74v0m-8.371-14.501 8.37 14.501-8.37 14.503M33.482 0h-16.74m6.276 3.627 8.371.001 4.188 7.25h-8.373zm12.557 14.5-4.187 7.249-8.372.001 4.187-7.25zM16.741 7.25l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74M41.851 14.5h-16.74v0M16.742 0l8.37 14.502-8.37 14.503"/></pattern>

                  <pattern v-if="seriesIndex === 1" :id="patternId" width="23.07" height="40" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A50" stroke-linecap="square" d="m17.62 0-6.07 10.5m2.74 4.76L8.22 4.75m-5.48 0h12.13M.01 0h23.07M6.07 20 0 9.5m2.74-4.75-6.07 10.5m-5.48 0H3.33m8.2 4.75L0 .02-11.54 20m40.68 0L23.07 9.5m2.74-4.75-6.06 10.5m-5.49 0H26.4M34.6 20 23.08.02 11.53 20m-5.46 0L0 30.51m2.74 4.75-6.07-10.5m-5.48 0H3.33m8.2-4.75L0 40l-11.54-19.98zM17.6 40l-6.06-10.5m2.74-4.76L8.2 35.25m-5.48 0h12.13M0 40h23.07L11.54 20.01m17.6 0-6.07 10.5m2.74 4.75-6.06-10.5m-5.49 0H26.4M11.53 20h23.08L23.07 40"/></pattern>

                  <pattern v-if="seriesIndex === 2" :id="patternId" width="79.508" height="40" patternTransform="scale(0.6)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="#1A1A1A90" d="M0 0v.685c5.16 0 10.01 2.01 13.657 5.658.384.383.74.787 1.086 1.197a41 41 0 0 0-1.877 1.546c.185-.16.367-.324.554-.481C10.19 4.803 5.38 2.385 0 2.385v1.639c4.877 0 9.245 2.203 12.177 5.659.153-.139.313-.27.468-.406a41.2 41.2 0 0 0-6.769 7.675c.204-.299.403-.6.614-.893A7.59 7.59 0 0 0 0 12.399v1.64c2.427 0 4.511 1.462 5.44 3.548.11-.168.228-.33.34-.496a41 41 0 0 0-1.368 2.165c.231.025.46.06.69.088a41 41 0 0 0-1.846-.187c.305.022.61.039.913.07-.365-1.983-2.081-3.49-4.169-3.49v1.64c1.129 0 2.094.717 2.463 1.72q.033.001.068.005A42 42 0 0 0 0 19.016v1.64c5.312 0 10.464 1.04 15.314 3.091A39.2 39.2 0 0 1 27.82 32.18a39.4 39.4 0 0 1 5.756 7.301 41 41 0 0 1 1.766-.224 41 41 0 0 0-1.373-2.172c.113.168.233.332.345.502.93-2.085 3.013-3.547 5.44-3.547 2.426 0 4.51 1.462 5.44 3.547.112-.17.232-.334.345-.502a41 41 0 0 0-1.373 2.172 43 43 0 0 1 1.766.224 39.4 39.4 0 0 1 5.756-7.3 39.22 39.22 0 0 1 27.82-11.524v-1.64a42 42 0 0 0-2.649.09l.199-.016a2.62 2.62 0 0 1 2.45-1.713v-1.64c-2.085 0-3.784 1.51-4.151 3.487.344-.034.692-.056 1.039-.082q-1.002.077-1.99.202c.23-.028.459-.063.69-.088a41 41 0 0 0-1.368-2.165c.112.166.23.328.34.496.929-2.086 3.013-3.548 5.44-3.548V12.4a7.59 7.59 0 0 0-6.49 3.66c.211.293.41.594.614.893a41.2 41.2 0 0 0-6.769-7.675c.156.136.315.267.468.406 2.932-3.456 7.3-5.66 12.177-5.66V2.385c-5.38 0-10.189 2.42-13.42 6.22.187.158.369.322.554.482a41 41 0 0 0-1.877-1.546c.347-.41.702-.814 1.086-1.197A19.2 19.2 0 0 1 79.508.685V0H73.34a20.97 20.97 0 0 0-9.903 6.563c.343.243.679.496 1.014.749a41 41 0 0 0-6.108-3.833c.261.133.525.262.782.4a26 26 0 0 1 2.005-2.257A27 27 0 0 1 62.917 0h-2.405c-1.026.975-2.004 1.998-2.87 3.12.096.046.19.099.287.147a41 41 0 0 0-2.005-.926l.126.052A30 30 0 0 1 58.081 0h-2.148c-.49.578-.997 1.144-1.445 1.757.2.078.397.163.597.243-.743-.3-1.495-.584-2.26-.841.282-.398.596-.773.894-1.159h-2.065c-.155.216-.32.425-.47.644q.812.236 1.608.504A41 41 0 0 0 48.66.005c.262.06.527.112.787.175.041-.062.091-.118.133-.18H29.928c.042.062.092.118.133.18.255-.061.513-.113.77-.171q-2.09.464-4.096 1.133a41 41 0 0 1 1.589-.498c-.15-.22-.315-.428-.47-.644h-2.065c.298.386.612.761.893 1.159-.762.256-1.51.539-2.252.838.197-.079.391-.163.59-.24-.45-.613-.955-1.179-1.446-1.757h-2.147a30 30 0 0 1 2.03 2.393q.061-.024.121-.05-1.01.434-1.993.92c.095-.046.187-.098.282-.144C21 2 20.022.975 18.997 0H16.59a27 27 0 0 1 1.787 1.622 26 26 0 0 1 2.005 2.257c.255-.137.515-.264.773-.396a41 41 0 0 0-6.097 3.827c.335-.252.67-.504 1.012-.747A20.97 20.97 0 0 0 6.168 0Zm10.659 0a22.7 22.7 0 0 1 6.827 5.601q.689-.449 1.396-.87c-1.475-1.82-3.226-3.4-5.16-4.731Zm55.127 0c-1.934 1.332-3.686 2.91-5.16 4.732q.707.42 1.396.87A22.7 22.7 0 0 1 68.849 0ZM39.754.656c5.312 0 10.464 1.04 15.314 3.091a39.2 39.2 0 0 1 12.506 8.432 39.4 39.4 0 0 1 5.756 7.302c.117-.018.237-.029.354-.045a41 41 0 0 0-2.215.375l.046-.01C64.832 9.316 53.11 2.355 39.754 2.355S14.676 9.316 7.994 19.802l.044.01a41 41 0 0 0-2.213-.376c.117.016.236.027.353.045a39.4 39.4 0 0 1 5.756-7.302A39.22 39.22 0 0 1 39.754.656m0 3.338a35.9 35.9 0 0 1 25.46 10.546 36 36 0 0 1 4.6 5.64c.266-.065.535-.118.802-.178a41 41 0 0 0-4.18 1.156 42 42 0 0 0-2.271.846c.203-.081.404-.168.608-.247-5.632-7.712-14.738-12.725-25.019-12.725s-19.387 5.013-25.02 12.725c.207.08.409.167.614.25a40.6 40.6 0 0 0-6.443-2.002c.262.059.527.112.788.175a36 36 0 0 1 4.601-5.64 35.9 35.9 0 0 1 25.46-10.546m26.682 17.164a42 42 0 0 1 1.642-.514c-6.18-9.026-16.559-14.951-28.324-14.951s-22.143 5.925-28.323 14.951q.828.24 1.64.514a33 33 0 0 1 3.583-4.258 32.56 32.56 0 0 1 23.1-9.568 32.56 32.56 0 0 1 23.1 9.568 33 33 0 0 1 3.582 4.258M79.508 5.723c-4.4 0-8.333 1.994-10.952 5.124q.588.582 1.153 1.187c2.319-2.848 5.849-4.672 9.799-4.672zM0 5.723v1.64c3.95 0 7.48 1.823 9.8 4.67q.564-.604 1.152-1.186A14.24 14.24 0 0 0 0 5.723m0 3.338v1.64c3.123 0 5.886 1.552 7.573 3.92a43 43 0 0 1 1.074-1.303c-2-2.585-5.125-4.257-8.647-4.257m79.508 0c-3.522 0-6.647 1.672-8.647 4.257q.55.64 1.074 1.304c1.687-2.369 4.45-3.922 7.573-3.922zm-39.754 1.61c7.834 0 15.2 3.05 20.739 8.59a30 30 0 0 1 2.718 3.132l.13-.053q-1.02.438-2.01.928c.097-.049.192-.102.29-.15-5.054-6.535-12.966-10.749-21.867-10.749-8.9 0-16.813 4.214-21.867 10.75.098.047.193.1.29.149a41 41 0 0 0-2.01-.928l.13.053a30 30 0 0 1 2.718-3.132c5.54-5.54 12.905-8.59 20.739-8.59m0 3.338c6.943 0 13.47 2.704 18.378 7.613a26 26 0 0 1 2.005 2.257c.259-.14.524-.269.786-.403a41 41 0 0 0-6.131 3.85q.51-.389 1.032-.763c-3.843-4.592-9.613-7.517-16.07-7.517s-12.226 2.925-16.07 7.517c.35.248.691.505 1.032.763a41 41 0 0 0-6.13-3.85c.261.134.526.264.785.403a26 26 0 0 1 2.005-2.257c4.909-4.91 11.435-7.613 18.378-7.613m0 1.699c-7.63 0-14.43 3.523-18.883 9.023q.708.422 1.397.87.691-.84 1.468-1.62a22.5 22.5 0 0 1 16.018-6.634c6.05 0 11.74 2.356 16.018 6.635a23 23 0 0 1 1.469 1.619q.689-.448 1.395-.87c-4.454-5.5-11.253-9.023-18.882-9.023m0 4.977c5.16 0 10.01 2.01 13.657 5.657.384.384.74.788 1.086 1.197a41 41 0 0 0-1.89 1.558c.19-.164.375-.331.567-.492-3.231-3.802-8.04-6.22-13.42-6.22-5.378 0-10.186 2.417-13.417 6.216.211.178.416.363.624.545a41 41 0 0 0-1.95-1.607c.347-.409.702-.813 1.086-1.197a19.2 19.2 0 0 1 13.657-5.657M0 22.355v1.639A35.89 35.89 0 0 1 29.929 40h.94l.288-.064c-.085.018-.166.045-.25.064H48.6c-.084-.019-.164-.046-.249-.064q.144.03.288.064h.94a35.89 35.89 0 0 1 29.929-16.006v-1.64h-.001c-13.356 0-25.078 6.962-31.76 17.448l.098.022a41 41 0 0 0-3.94-.598c-.367-1.979-2.067-3.488-4.152-3.488s-3.785 1.51-4.151 3.488a41 41 0 0 0-3.942.598l.1-.022C25.077 29.316 13.355 22.355 0 22.354Zm39.754 1.669c4.877 0 9.244 2.202 12.177 5.659.156-.142.318-.275.477-.413a41.2 41.2 0 0 0-6.785 7.692c.206-.302.407-.607.62-.904a7.59 7.59 0 0 0-6.489-3.659 7.59 7.59 0 0 0-6.49 3.66c.214.296.415.601.621.903a41.2 41.2 0 0 0-6.815-7.721c.168.148.34.29.507.442 2.932-3.457 7.3-5.66 12.177-5.66zM0 25.693V27.6c.234 0 .465-.014.694-.034.02-.066.045-.13.067-.196 4.14.094 8.161.924 11.954 2.529A32.6 32.6 0 0 1 23.1 36.9c.975.976 1.854 2.022 2.689 3.1h2.065C21.626 31.342 11.479 25.693 0 25.693m79.508 0c-11.479 0-21.626 5.65-27.854 14.307h2.065c.835-1.078 1.714-2.124 2.69-3.1 3-3 6.494-5.356 10.384-7 3.793-1.605 7.814-2.436 11.954-2.53l.068.196c.228.02.459.034.693.034zm-39.754.03c-4.4 0-8.333 1.994-10.952 5.124a43 43 0 0 1 1.153 1.186c2.32-2.847 5.849-4.671 9.799-4.671s7.48 1.824 9.8 4.671q.564-.604 1.152-1.186a14.24 14.24 0 0 0-10.952-5.124M0 29.03v1.64c7.834 0 15.2 3.05 20.739 8.59.24.24.458.493.688.739h2.148C17.895 33.31 9.463 29.031 0 29.031Zm79.508 0c-9.463 0-17.895 4.28-23.575 10.969h2.148c.23-.246.449-.5.688-.74 5.54-5.539 12.905-8.59 20.739-8.59zm-39.754.03c-3.522 0-6.647 1.672-8.647 4.257q.55.64 1.075 1.304c1.687-2.369 4.449-3.921 7.572-3.921s5.885 1.552 7.573 3.92a42 42 0 0 1 1.074-1.303c-2-2.585-5.125-4.257-8.647-4.257M0 32.37v1.64c6.132 0 11.936 2.116 16.59 5.991h2.407C14.043 35.29 7.375 32.37 0 32.37m79.508 0c-7.374 0-14.043 2.922-18.996 7.631h2.405c4.655-3.875 10.459-5.991 16.591-5.991ZM0 35.709v1.639c3.78 0 7.418.92 10.66 2.653h3.062C9.815 37.31 5.102 35.708 0 35.708Zm79.508 0c-5.103 0-9.815 1.602-13.722 4.292h3.062a22.54 22.54 0 0 1 10.66-2.653zm-39.754 1.67c1.144 0 2.108.74 2.466 1.763-.82-.049-1.633-.125-2.466-.125s-1.646.076-2.466.125a2.62 2.62 0 0 1 2.466-1.764zM0 39.045V40h6.168A20.9 20.9 0 0 0 0 39.046Zm79.508 0a20.9 20.9 0 0 0-6.168.954h6.168z"/></pattern>

                  <pattern v-if="seriesIndex === 3" :id="patternId" width="100" height="100" patternTransform="scale(0.7)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="#1A1A1A50" d="M0 0v1l1-1zm6.29 0-.147.143 11.81 11.619 8.19-8.143L22.666.047 22.709 0h-1.998l-.045.047 3.477 3.572-6.19 6.143L8.238.192 8.434 0H6.289zm6.759 0 1.047 1.047L15.143 0zm14.474 0 7.143 7.143-2.428 2.523-3.43-3.523-4.855 4.572 8.238 8.142L43.857 7.143 36.686 0h-2.008l7.226 7.191-9.666 9.713L26 10.762l2.762-2.57 3.476 3.617 4.477-4.618L29.572.047 29.62 0h-2.096zm14.288 0 4.808 4.809 4.572-4.57L50.953 0h-2.047l.285.285-2.572 2.572L43.762 0zm14.068 0-17.64 17.904 4.57 4.62L65 .333 64.697 0H62.79l.258.285-20.19 20.192-2.572-2.573L57.857 0H55.88zm14.549 0-3.62 3.62 8.145 8.142L86.666.047 86.619 0h-1.951l.047.047L75 9.762l-6.143-6.143 2.57-2.572L75 4.619 79.62 0h-2.048l-2.619 2.62L72.334 0zm21.43 0-3.62 3.62 4.57 4.571L100 .998V0h-.953l-6.19 6.191-2.572-2.572L93.905 0h-2.048zm-88 2.191L0 6.091v2.04l3.762-3.846 2.666 3.049-6.381 6.19-.047-.05v2.098l8.38-8.095L3.858 2.19zM100 6.091l-4.572 4.624L100 15.572v-2.097l-2.572-2.713L100 8.13V6.09zm-35.762.1-4.572 4.57 4.572 4.573 4.57-4.572-4.57-4.57zm21.428 0L74.953 16.904l-3.572-3.57-4.572 4.57 8.144 8.143 15.285-15.285-4.572-4.57zm-21.428 2 2.57 2.57-2.57 2.573-2.572-2.572zm21.477 0 2.57 2.57L75 24.048l-6.143-6.143 2.57-2.57L75 18.904zM10.666 10 0 20.668v2L10.666 12l2.572 2.572L0 27.811v2l15.238-15.239zm46.43 3.334L42.809 27.619l-7.381-7.38-8.143 8.142 4.572 4.572 3.57-3.572 2.811 2.81-6.142 6.143L21.38 27.619l-4.572 4.572 15.287 15.286 25-25L67.809 33.19l4.572-4.572-15.285-15.285zm35.713.238-4.57 4.57 11.714 11.715.047-.046v-1.954l-9.715-9.714 2.572-2.57L100 22.714v-2.047l-.047.047-7.144-7.143zm-71.143.094-12 11.38 4.572 4.669 7.334-7.238 3.381 3.57 4.62-4.62zm35.43 1.62L70.38 28.571l-2.572 2.57-10.713-10.714-25 25-13.287-13.285 2.572-2.57 10.715 10.712 8.142-8.142-4.81-4.809-3.57 3.57-2.573-2.57 6.143-6.143 7.38 7.381 14.288-14.287zm-35.477.429 5.904 5.762L25 24l-3.38-3.523-7.335 7.285-2.57-2.62zm64.047 4.762-4.57 4.57L96.38 40.334l3.619-3.62V34.81zm.049 2L99 35.762l-2.572 2.572-13.285-13.287zm-6.953 4.904L67.809 38.334l-3.57-3.572-4.573 4.572 8.143 8.143 15.525-15.524zm-71.666.238-4.573 4.572L17.81 47.477l4.572-4.573L7.096 27.62zm50 0L45.38 39.334l4.572 4.57 11.713-11.713zm21.713 1.762 2.572 2.572-13.524 13.524-6.142-6.143 2.57-2.572 3.572 3.572L78.81 29.381zm-71.713.238L20.38 42.904l-2.572 2.573L4.523 32.19l2.573-2.572zm50 0 2.57 2.572-9.713 9.713-2.572-2.57zm28.57 5.143-4.57 4.572 11.713 11.713 4.572-4.57zM0 34.809v1.906l.953-.953zm85.715 1.953 9.713 9.715-2.57 2.57-9.715-9.713zm-82.192 1.81L0 41.877v2.08l2.523 2.424L0 48.973v2.12l7.096 7.098 8.142-8.144zm0 1.951L13.238 50l-6.142 6.143L.953 50l3.57-3.715L1 42.857zM100 41.877l-1.096 1.027L100 43.957zm-57.191.027-4.57 4.573 4.57 4.57 4.572-4.57zm14.287 0L45.38 53.62l4.572 4.572 7.143-7.144 10.713 10.715 4.572-4.57zm21.476 0-8.144 8.143L75 54.619l3.572-3.572 7.143 7.144 4.57-4.572zm-35.763 2 2.572 2.573-2.572 2.57-2.57-2.57zm14.287 0L70.38 57.191l-2.572 2.57-10.713-10.714-7.143 7.144-2.572-2.572 9.715-9.715zm21.476 0 9.713 9.715-2.57 2.572-7.143-7.144L75 52.619l-2.572-2.572zm-53.619 1.573L9.666 60.762l4.572 4.572 15.285-15.287zm0 2 2.57 2.57-13.285 13.287-2.572-2.572zM100 48.973l-1.047 1.074L100 51.094zm-64.334.074-4.57 4.572 18.857 18.858 11.713-11.715-4.57-4.57-7.143 7.142zm0 2 14.287 14.287 7.143-7.143 2.57 2.57-9.713 9.716-16.857-16.858zm60.953 1.81-4.572 4.57L100 65.382v-2.049l-5.904-5.904 2.57-2.57L100 58.19v-1.953l-3.38-3.38zm-68.096 3.334L9.666 75.047l4.572 4.572 7.143-7.142 7.142 7.142 4.573-4.572-7.143-7.143 2.57-2.57 7.143 7.143 4.572-4.573zm50 0-8.142 8.143 8.142 8.143 4.573-4.573-3.573-3.57 3.573-3.572zM0 56.238v2l9.666 9.666-2.57 2.573L0 63.38v2l7.096 7.096 4.57-4.573zm28.523 1.905 9.715 9.714-2.572 2.57-7.143-7.142-4.57 4.572L31.096 75l-2.573 2.572-7.142-7.144-7.143 7.144L11.666 75zm50 .048 2.573 2.57-3.573 3.573 3.573 3.57-2.573 2.573-6.142-6.143zm10.715 1.57-4.572 4.573 3.572 3.57-6.904 6.905 4.57 4.572 11.477-11.477zm.047 2 6.143 6.143-9.475 9.477-2.572-2.572 6.904-6.905-3.57-3.57zm-25.047 1.573-8.142 8.143 4.57 4.57 8.143-8.143-4.57-4.57zm0 2 2.57 2.57-6.142 6.143-2.57-2.57zm-21.43 5.143L28.524 84.762l-7.142-7.143-4.572 4.57 11.714 11.715 18.858-18.857-4.572-4.57zm28.573 0-4.572 4.57 11.714 11.715 4.573-4.573L71.38 70.477zm28.572 0L88.238 82.189l4.57 4.43 7.145-7 .047.047v-2.094l-7.143 7.047-2.572-2.476L100 72.428v-1.905zM0 70.523v1.952l16.809 16.81-2.57 2.572-3.573-3.572-7.143 7.143L0 91.904v2.05l3.523 3.523 7.143-7.143 3.572 3.57 4.57-4.57L0 70.524zm42.809 1.954 2.572 2.57-16.858 16.857-9.714-9.715 2.572-2.57 7.142 7.143L42.81 72.477zm28.572 0 9.715 9.712-2.573 2.573-9.714-9.715zm-17.858 1.57-4.57 4.572 4.57 4.57 4.573-4.57zm0 2 2.573 2.572-2.573 2.57-2.57-2.57zM0 77.619v2.047l6.096 6.096-2.573 2.666L0 84.81v1.953l3.523 3.664 4.573-4.713zm64.238 0L53.523 88.334l-7.142-7.145-4.572 4.573 11.714 11.715L68.81 82.189l-4.57-4.57zm0 2 2.57 2.57-13.285 13.288-9.714-9.715 2.572-2.573 7.142 7.145zm7.143 5.143-8.143 8.142 4.57 4.573 3.573-3.573 3.572 3.573 4.57-4.573zm14.285 0-4.57 4.572L89 97.238l4.572-4.572zm14.287 0-4.572 4.572 4.619 4.62v-2.097l-2.572-2.572 2.572-2.57V84.81l-.047-.05zm-28.525 1.953 6.144 6.142L75 95.427l-3.572-3.57-3.57 3.57-2.573-2.57zm14.287.047 5.904 5.904-2.572 2.572-5.904-5.904zm-46.477 1.572-4.572 4.57L41.762 100h2l-7.096-7.096 2.572-2.57L48.906 100h2zm-18.095 3.57-7.096 7.143-3.332-3.332L6.289 100h2.143l2.33-2.285L13.049 100h2.094l6.095-6.096L24 96.524 20.71 100h1.999L26 96.428zm75.476 3.334L91.857 100h2.047l2.762-2.762 2.572 2.57-.191.192H100v-1.38l-3.38-3.382zm-36.142.096L55.879 100h1.978l2.57-2.62L62.79 100h1.908zm-28.381.094L27.523 100h2.096l2.524-2.523L34.678 100h2.008zm50 .049L77.572 100h2.047l2.524-2.523L84.668 100h1.951zM0 98.617V100h1l.191-.191zm71.38.43-.952.953h1.906l-.953-.953z"/></pattern>

                  <pattern v-if="seriesIndex === 4" :id="patternId" width="40" height="69.282" patternTransform="scale(0.7)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A50" d="M13.333-3.849v23.094M6.667-15.396l20 11.547M13.333-19.245l20 11.547M20 0v23.094m20-34.641-6.667 3.849-6.666 3.849L20 0M0-11.547l6.667 3.849 6.666 3.849L20 0m0-23.094 20 11.547v23.094L20 23.094l-6.667-3.849-6.666-3.849L0 11.547v-23.094l6.667-3.849 6.666-3.849zM40-3.769 20 7.698m20-3.849-16.253 9.384L20 15.396M6.667-7.698v23.094m6.666 50.037v23.094M6.667 53.886l20 11.547M13.333 50.037l20 11.547M20 69.282v23.094m20-34.641-6.667 3.849-6.666 3.849L20 69.282M0 57.735l6.667 3.849 6.666 3.849L20 69.282m0-23.094 20 11.547v23.094L20 92.376l-6.667-3.849-6.666-3.849L0 80.829V57.735l6.667-3.849 6.666-3.849zm20 19.325L20 76.98m20-3.849L20 84.678M6.667 61.584v23.094m26.666-53.886v23.094m-6.666-34.641 20 11.547M33.333 15.396l20 11.547M40 34.641v23.094m20-34.641-6.667 3.849-6.666 3.849L40 34.641M20 23.094l6.667 3.849 6.666 3.849L40 34.641m0-23.094 20 11.547v23.094L40 57.735l-6.667-3.849-6.666-3.849L20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L40 42.339m20-3.849L40 50.037M26.667 26.943v23.094M-6.667 30.792v23.094m-6.666-34.641 20 11.547M-6.667 15.396l20 11.547M0 34.641v23.094m20-34.641-6.667 3.849-6.666 3.849L0 34.641m-20-11.547 6.667 3.849 6.666 3.849L0 34.641m0-23.094 20 11.547v23.094L0 57.735l-6.667-3.849-6.666-3.849L-20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L0 42.339m20-3.849L0 50.037m-13.333-23.094v23.094"/></pattern>
              </template>
              <template #plot-comment="{ plot }">
                <div 
                  dir="auto" 
                  style="pointer-events: all !important;" 
                  :title="plot.comment" @click="selectMenu({index: plot.seriesIndex})" 
                  :style="`color:${isDarkMode ? plot.color : 'black'};font-size: 10px; text-align:${plot.textAlign};`" 
                  :class="`
                    px-2 cursor-pointer 
                    ${plot.seriesIndex === 0 ? 'mt-[50px] -ml-2' : ''}
                    ${plot.seriesIndex === 1 ? '-mt-[50px] -ml-2' : ''}
                    ${plot.seriesIndex === 2 ? '-mt-[64px]' : ''}
                    ${plot.seriesIndex === 3 ? '-mt-[50px] -mr-2' : ''}
                    ${plot.seriesIndex === 4 ? 'mt-[32px] -mr-2 leading-3' : ''}
                  `"
                >
                  <div :class="`text-[#1A1A1A] dark:text-[#CCCCCC] text-[12px] sm:text-[16px] ${plot.seriesIndex === 4 ? 'pb-2' : ''}`">{{ plot.name }}</div>
                  {{ plot.comment }}
                </div>
              </template>
            </VueUiDonut>
          </template>
          <template #fallback>
            <BaseSpinner />
          </template>
        </Suspense>
        <div class="home-perspective-wrapper flex flex-col gap-6 sm:gap-12 max-w-[500px] place-items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px] pointer-events-none"> 
            <div class="relative z-10 home-perspective" :style="`transform: rotateY(${deviationY * 30}deg) rotateX(${-deviationX * 20}deg);`">
                <img data-cy="app-logo" src="../assets/logo3.png" alt="vue data ui logo" class="h-[48px] mx-auto drop-shadow-xl logo-shape mt-2 ml-1">
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
          <div class="relative">
            <StarFilledIcon class="text-[#fdd663] drop-shadow-sm"/>
            <!-- FOR SPECIAL OCCASIONS -->
            <svg viewBox="0 0 20 20" height="16" class="absolute top-[6px] left-1" v-if="specialOccasion">
              <path d="M 7 7 L 7 4 M 13 7 L 13 4 Z M 5 9 C 7 14 13 14 15 9" fill="none" stroke="black" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </div>
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

<svg :viewBox="viewBox" width="100%" class="bg-transparent absolute top-0 left-0 user-position pointer-events-none">
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

</div>

</template>

<style>
.carousel thead {
  font-size: 12px !important;
}
</style>

<style scoped>

.home-perspective-wrapper {
  perspective-origin: center;
  perspective: 100px;
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

.underlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(at top left, #FFFFFF07, transparent, transparent);
}

.underlay-paper--dark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/paper.png');
  background-size: 30%;
  opacity: 0.02;
  pointer-events: none;
}

.underlay-paper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/paper.png');
  background-size: 30%;
  opacity: 0.2;
  pointer-events: none;
}

.logo-shape {
  filter:drop-shadow(0px 2px 2px black)
}

.vdui {
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(at top left, #5f8aee20, transparent, transparent);
}
</style>