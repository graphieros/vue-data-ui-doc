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

                  <pattern v-if="seriesIndex === 2" :id="patternId" width="100" height="173.21" patternTransform="scale(0.6)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="#1A1A1A50" d="M0 0v4.74L2.73 0zm4.14 0 6.44 11.15 2.38-4.12L8.9 0zm23.81 0 .49.84h-14.3l2.39 4.13h11.9l-7.14 12.37h4.77L34.39 2.9 32.71 0zm9.52 0 .49.84h19.05l7.14 12.37H49.87l2.38 4.13h11.9l-7.14 12.37h4.76l8.34-14.44L61.28 0zm28.57 0 7.64 13.21h19.04l7.15 12.37h-14.3l2.39 4.13h11.9l-7.14 12.37h4.77l2.5-4.34V17.57l-3.7-6.42 3.7-6.41V0h-2.01l-5.25 9.1H78.44L83.7 0h-4.77l-4.06 7.03L70.81 0zm22.41 0-2.87 4.97h4.76L93.21 0zm-50.5 4.97-9.51 16.5h-14.3l7.15-12.38h-4.76L10.58 19.4 3.44 7.03l-2.39 4.12 8.34 14.43h19.05l7.14 12.38H21.29l2.39 4.12h11.9l-7.14 12.38h4.75l8.34-14.44-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.3h14.29l-2.38-4.13zm35.72 12.37-9.52 16.5H49.87l7.14-12.38h-4.76l-5.96 10.31-7.14-12.37-2.38 4.12 8.33 14.44h19.05l7.14 12.37H57.01l2.38 4.13h11.9l-7.14 12.37h4.76l8.33-14.44-9.52-16.5 7.14-12.37 7.15 12.38 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM0 17.57v20.16l5.82-10.08zm9.39 12.14-9.4 16.27v4.57L7 62.71H0v4.12h7L0 78.97v.23h4.63l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.13-5.95-10.3h14.29l-2.38-4.13zm65.47 2.06-2.38 4.13 8.34 14.43h19.05l.13.22v-4.57l-.13.23h-14.3l7.15-12.38h-4.76l-5.95 10.31zM45.1 42.08l-9.52 16.5H21.29l7.15-12.37h-4.76l-5.96 10.3-7.14-12.37-2.38 4.13 8.33 14.44h19.05l7.14 12.37H28.44l2.38 4.12h11.9l-7.14 12.37h4.76l8.33-14.43-9.52-16.5 7.14-12.37 7.15 12.37 2.38-4.12-5.95-10.31h14.28l-2.38-4.13zm35.72 12.38-9.53 16.49H57.01l7.14-12.37h-4.76l-5.95 10.3-7.15-12.36-2.37 4.12 8.33 14.44h19.04l7.15 12.37h-14.3l2.39 4.12h11.9l-7.14 12.37h4.77l8.33-14.43-9.53-16.5 7.15-12.37 7.14 12.37 2.38-4.12-5.95-10.31h14.29l-2.39-4.12zm11.9 8.25 2.38 4.12h4.9v-4.12zm-76.2 4.12L7 83.33H0v4.12h7l7.15 12.37H0v.23l2.25 3.9h11.9L7 116.31h4.77l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.31h14.29l-2.39-4.12zm65.49 2.06-2.38 4.12 8.33 14.44H100v-4.13h-7.28l7.15-12.37H95.1l-5.95 10.3zM100 78.97l-.13.23h.13zm-47.75.23-9.53 16.5H28.44l7.14-12.38h-4.76l-5.96 10.31-7.14-12.37-2.38 4.12 8.34 14.44h19.04l7.15 12.37h-14.3l2.39 4.12h11.9l-7.14 12.37h4.76l8.34-14.43-9.53-16.5 7.15-12.37 7.14 12.38 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM0 91.57v4.12h7l-2.37-4.12zm87.96 0-9.52 16.5h-14.3l7.15-12.38h-4.76L60.58 106l-7.14-12.37-2.39 4.13 8.34 14.43h19.05l7.14 12.37H71.29l2.38 4.12h11.9l-7.13 12.38h4.76l8.33-14.44-9.52-16.5 7.14-12.36 7.14 12.37 2.38-4.13-5.95-10.3H100v-4.13zm11.9 8.25.14.22v-.22zm-76.18 4.12-9.53 16.5H0v4.12h14.15l7.14 12.37H7l2.39 4.13h11.9l-7.14 12.37h4.76L27.24 139l-9.52-16.5 7.14-12.37 7.15 12.37 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM89.15 106l-2.38 4.13 8.33 14.43h4.9v-4.12h-.13l.13-.22v-8.26l-3.7 6.41zm-86.9 2.07L0 111.97v8.24l7-12.14zm57.14 8.24-9.52 16.5h-14.3l7.15-12.37h-4.76l-5.95 10.3-7.15-12.37-2.38 4.13 8.34 14.43h19.05l7.14 12.38H42.72l2.38 4.12h11.91l-7.14 12.37h4.76l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.39-4.12-5.96-10.31h14.29l-2.38-4.13zm-59.4 12.37v4.13h14.16l-2.38-4.13zm95.11 0-9.52 16.5H71.29l7.14-12.37h-4.75l-5.96 10.31-7.14-12.37-2.38 4.12 8.33 14.44h19.05l7.14 12.37H78.43l2.39 4.12h11.9l-4.27 7.4h4.76l5.46-9.46-9.52-16.5 7.14-12.37 3.7 6.42v-8.26l-.12-.23h.13v-4.13zM0 133.04v8.25l3.44 5.95 2.38-4.12zm30.82 8.02-9.53 16.5H7l7.15-12.38H9.39l-5.95 10.31L0 149.54v8.24l2.25 3.9h19.04l6.66 11.52h4.76l-7.85-13.58 7.15-12.38 7.14 12.38 2.38-4.13-5.95-10.3h14.29l-2.39-4.13zm65.47 2.06-2.38 4.12 6.09 10.55v-8.25zm-29.76 10.3-9.52 16.5H42.72l7.15-12.37H45.1l-5.95 10.32-7.14-12.38-2.38 4.13 7.84 13.58h23.81l-.7-1.21 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.32h14.29l-2.38-4.12zM2.25 165.8 0 169.7v3.5h2.73l.7-1.21.7 1.21H8.9L7 169.93h14.3l-2.39-4.13zm65.47 2.07-2.38 4.12.7 1.21h4.76zm32.28 1.82-2.03 3.51H100zm-19.18.24-1.9 3.27h4.77l1.89-3.27z"/></pattern>

                  <pattern v-if="seriesIndex === 3" :id="patternId" width="58" height="100.23" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A50" stroke-linecap="square" d="m12.127 73.813.013 5.643 4.893-2.81zm-6.01-3.47 16.928 9.773-16.93 9.777zm-6.02-3.476 28.967 16.725L.13 100.262zm16.97 23.616-.015 5.643-4.893-2.81zm6.01-3.472L6.148 96.786l16.93 9.776zM.128 100.261l28.935 16.669m16.874-23.67-.013-5.644-4.894 2.81zm6.01 3.47L35.02 86.956l16.931-9.775zM29 83.482l28.936-16.669.032 33.393m-28.904 2.834 4.881-2.834-4.88-2.832zm0 6.94V90.433l16.932 9.773zm0 6.952v-33.45l28.904 16.724zM58 13.915l-4.882 2.833L58 19.582zm0-6.94v19.548l-16.932-9.774zm0-6.951v33.448L29.096 16.748m0-13.89 4.88-2.833-4.88-2.833zm0 6.94V-9.749L46.026.025zm0 6.95v-33.449L58 .024zM16.94 23.696l-4.894-2.81-.014 5.643zm6.01-3.47L6.02 29.998v-19.55zM0 33.472.033.08 28.97 16.75m-5.99-29.92L6.053-3.393l16.93 9.776zm5.99 29.92L29-16.644.033.08m40.966 23.615.013 5.643 4.893-2.81zm-6.01-3.47 16.928 9.774-16.93 9.775zm22.947 13.248L29 50.143l-.031-33.394M16.97 43.197l-.013-5.643-4.894 2.81zm6.01 3.47L6.053 36.894l16.93-9.776zM29 50.143.032 33.419l28.936-16.67m16.937 57.008-4.893-2.81-.014 5.644zm6.01-3.47L34.988 80.06V60.51zM29 64.035l-4.88 2.832L29 69.7zm0-6.942v19.549l-16.93-9.775zM.097 66.867 29 50.143v33.449m16.938-43.228-.013 5.644-4.894-2.811zm6.01-3.47L35.02 46.667l16.931 9.777zM29 50.143l28.936 16.67.032-33.394M.097 52.975l4.88-2.832-4.88-2.833zm0 6.942V40.368l16.931 9.775zm0 6.95V33.42"/></pattern>

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