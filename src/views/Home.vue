<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { BrandGithubFilledIcon, CheckIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import { BrightnessUpIcon, MoonIcon, StarFilledIcon } from "vue-tabler-icons";
import router from "../router"
import staticReleases from "../../public/releases.json"
import { useConfig } from "../assets/useConfig";
import BaseSpinner from "../components/BaseSpinner.vue";
import BaseBubbles from "../components/BaseBubbles.vue";
import BackgroundPattern from "../components/BackgroundPattern.vue";
import BaseMenuPattern from "../components/BaseMenuPattern.vue";
import Fireworks from "../components/special/Fireworks.vue";

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

const componentsLen = computed(() => Object.keys(configs).length)

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
            color: "#647EFF",
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
        startAnimation: { show: true },
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
  const starTrigger =
    [1200, 1250, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
      2500, 3000, 3500, 4000, 4500, 5000, 7500, 10000].includes(store.stars);

  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  const isSpecialDate =
    (month === 0 && day === 1)  || // January 1
    (month === 4 && day === 1)  || // May 1
    (month === 6 && day === 14); // July 14

  return starTrigger || isSpecialDate;
});

function getPlotLabel(plot) {
  return plot.comment
}

const advantages = computed(() => {
  return [
    {
      en: 'Open source, and free to use',
      fr: 'Open source et gratuit',
      pt: 'Código aberto e gratuito',
      de: 'Open Source und kostenlos nutzbar',
      zh: '开源且免费使用',
      jp: 'オープンソースで、無料で利用可能です',
      es: 'De código abierto y gratuito',
      ko: '오픈 소스이며 무료로 사용 가능합니다',
      ar: 'مفتوح المصدر ومجاني للاستخدام'
    },
    {
      en: "Vue-native, no runtime dependencies",
      fr: "Natif Vue, sans dépendances d’exécution",
      pt: "Vue nativo, sem dependências em runtime",
      de: "Vue-nativ, keine Laufzeitabhängigkeiten",
      zh: "原生 Vue，无运行依赖",
      jp: "Vueネイティブ、依存なし",
      es: "Vue nativo, sin dependencias",
      ko: "Vue 네이티브, 런타임 의존성 없음",
      ar: "مبني على Vue، دون تبعيات",
    },
    {
      en: `${componentsLen.value} ready-made components`,
      fr: `${componentsLen.value} composants prêts à l’emploi`,
      pt: `${componentsLen.value} componentes prontos`,
      de: `${componentsLen.value} fertige Komponenten`,
      zh: `${componentsLen.value} 个组件`,
      jp: `既製コンポーネント ${componentsLen.value} 個`,
      es: `${componentsLen.value} componentes listos`,
      ko: `미리 제작된 컴포넌트 ${componentsLen.value}개`,
      ar: `${componentsLen.value} مكوّنات جاهزة`,
    },
    {
      en: "Universal component",
      fr: "Composant universel",
      pt: "Componente universal",
      de: "Universelle Komponente",
      zh: "通用组件",
      jp: "ユニバーサルコンポーネント",
      es: "Componente universal",
      ko: "범용 컴포넌트",
      ar: "مكوّن عام",
    },
    {
      en: "Deep slot customization",
      fr: "Personnalisation avancée via slots",
      pt: "Customização com slots",
      de: "Tiefgreifende Slot-Anpassung",
      zh: "插槽自定义",
      jp: "スロットで柔軟カスタム",
      es: "Personalización con slots",
      ko: "슬롯 기반 커스터마이징",
      ar: "تخصيص عبر الـ slot",
    },
    {
      en: "Built-in end-user empowering menu",
      fr: "Menu intégré puissant pour l’utilisateur final",
      pt: "Menu embutido para usuário final avançado",
      de: "Integriertes Menü für Endnutzer",
      zh: "内建终端用户功能菜单",
      jp: "組み込みエンドユーザーメニュー",
      es: "Menú integrado para el usuario final",
      ko: "엔드유저용 내장 메뉴",
      ar: "قائمة مدمجة للمستخدم النهائي",
    },
    {
      en: "Widgets for dashboard UI",
      fr: "Widgets pour interface de tableau de bord",
      pt: "Widgets para interface de dashboard",
      de: "Widgets für Dashboard-Oberfläche",
      zh: "仪表盘界面组件",
      jp: "ダッシュボードUI用ウィジェット",
      es: "Widgets para interfaz de dashboard",
      ko: "대시보드 UI용 위젯",
      ar: "عناصر واجهة للوحة التحكم",
    },
    {
      en: "Programmatic control API",
      fr: "API de contrôle programmable",
      pt: "API de controle programável",
      de: "Programmierbare Steuerungs-API",
      zh: "可编程控制 API",
      jp: "プログラマブル制御API",
      es: "API de control programático",
      ko: "프로그래밍 제어 API",
      ar: "واجهة تحكم برمجية",
    },
    {
      en: "Responsive and mobile-friendly",
      fr: "Adapté au mobile",
      pt: "Responsivo e amigável ao móvel",
      de: "Responsiv und mobilfreundlich",
      zh: "响应式，适配移动端",
      jp: "レスポンシブでモバイル対応",
      es: "Responsivo y apto para móviles",
      ko: "반응형, 모바일 친화적",
      ar: "متجاوب ويدعم الجوال",
    },
    {
      en: "Works with Nuxt",
      fr: "Fonctionne avec Nuxt",
      pt: "Compatível com Nuxt",
      de: "Funktioniert mit Nuxt",
      zh: "兼容 Nuxt",
      jp: "Nuxtに対応",
      es: "Funciona con Nuxt",
      ko: "Nuxt 호환 가능",
      ar: "يعمل مع Nuxt",
    }
  ]
})


const carouselDataset = computed(() => {
  return {
    head: [''],
    body: advantages.value.map(a => {
      return [a[store.lang]]
    })
  }
})

const carouselConfig = computed(() => {
  return {
    responsiveBreakpoint: 400,
    scrollbar: { hide: true },
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
        backgroundColor: isDarkMode.value ? "#2A2A2A" : '#F3F4F6',
        tr: {
            visible: 1,
            height: 32,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: isDarkMode.value ? "#4A4A4A" : '#F3F4F6',
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
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : '#F3F4F6'
                }
            }
        }
    }
}
})

const isNarrow = ref(false)

function updateSize() {
  isNarrow.value = window.innerHeight > window.innerWidth
}

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSize)
})

</script>

<template>
    <!-- <div v-if="!isDarkMode" class="underlay-paper"></div>
    <div v-if="isDarkMode" class="underlay-paper--dark"></div> -->
    <div class="underlay">
      <!-- <BackgroundPattern v-if="isDarkMode"/> -->
  <svg class="w-full h-full">
    <defs>
      <!-- make the pattern tile exactly 50×50 units -->
      <pattern
        id="griddit"
        x="0" y="0"
        width="50" height="50"
        patternUnits="userSpaceOnUse"
      >
        <path
          fill="none"
          :stroke="isDarkMode ? '#2A2A2A50' : '#2A2A2A07'"
          d="
            M0 0   L50 0   L50 50   L0 50   Z
            M1 1   L49 1   L49 49   L1 49   Z
            M10 1  L10 49
            M20 1  L20 49
            M30 1  L30 49
            M40 1  L40 49
            M1 10  L49 10
            M1 20  L49 20
            M1 30  L49 30
            M1 40  L49 40
          "
        />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#griddit)" />
  </svg>
</div>
      <div ref="resizeContainer" class="absolute top-0 left-0" style="width:100%;height:100%;overflow: hidden" @mousemove="setClientPosition($event)">

        <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>

        <VueUiCarouselTable 
          :dataset="carouselDataset"
          :config="carouselConfig"
          class="hidden sm:block mt-14 pointer-events-none"
        >
          <template #td="{ td }">
            <div class="flex flex-row place-items-center gap-4 justify-center">
              <CheckIcon class="text-app-green"/> {{ td }}
            </div>
          </template>
      </VueUiCarouselTable>
        
        <div :class="`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 custom-styles flex flex-col ${isNarrow ? '' : 'lg:flex-row'} justify-center place-items-center sm:gap-[80px] w-full max-w-[1450px]`">
    <div class="flex flex-col gap-6 max-w-[360px] sm:max-w-[450px] justify-center place-items-center text-center">
        <h1 style="font-family: InterBold" class="text-[49px]">
            <!-- <span class="">Vue </span> -->
            <span class="bg-gradient-to-r from-app-green to-indigo-400 bg-clip-text text-transparent" style="letter-spacing: -1px;">Vue Data UI</span>
        </h1>
        <p class="font-inter-medium text-board-2 text-xl sm:text-2xl text-gray-700 dark:text-gray-400">{{ translations.tagline[store.lang] }}</p>

        <div class="flex flex-row gap-2 text-gray-500 relative" :title="componentsLen + ' components'">
          {{ componentTranslation[store.lang] }}: 
          <div class="h-[22px]">
            <VueUiDigits :dataset="componentsLen" :config="{ ...digitConfigStars, digits: { ...digitConfigStars.digits, color: isDarkMode ? '#647EFF' : '#1A1A1A' }  }"/>
          </div>
        </div>

        <a data-cy="btn-github" href="https://github.com/graphieros/vue-data-ui" target="_blank" class="z-10 hidden lg:block">
          <div class="p-0.5 bg-gradient-to-r from-app-green to-app-blue rounded-full">
            <button class="relative flex flex-row place-content-center place-items-center bg-white dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-full text-black dark:text-gray-400 font-inter-medium hover:shadow-xl  dark:hover:bg-[#2A2A2A] gap-3 transition-all">
              <BrandGithubFilledIcon class="dark:text-gray-200"/>
              <span style="letter-spacing: 1px;">
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
          </div>
          </a>
          <div v-if="versionsList.length" class="flex flex-row place-items-center h-[30px] mx-auto w-full justify-center mt-0.5" :title="'Version ' + staticReleases[0].version.replace('v', '')">
            <Suspense>
              <template #default>
                <div class="h-full flex flex-col">
                  <div class="h-full flex flex-row place-items-center justify-center">
                    <svg style="height:100%" viewBox="-6 -6 22 22">
                      <path d="M 0,4.5 5,12.5 10,4.5" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <VueUiDigits v-for="d in digits" :config="digitsConfigVersion" :dataset="d === '.' ? '.' : +d" :class="d === '.' ? '-mr-[0.8rem]' : ''"/>
                  </div>
                </div>
              </template>
              <template #fallback>
                <div class="min-h-[50px]"></div>
              </template>
            </Suspense>
            <br>
        </div>
          <div v-else class="flex flex-row place-items-center h-[30px] mx-auto w-full justify-center">
        </div>
    </div>

    <div class="w-[400px] max-w-[400px] lg:w-[500px] lg:min-w-[500px] 2xl:w-[900px] 2xl:min-w-[900px] relative transition-all">
        <Suspense>
          <template #default>
            <div>
              <VueUiDonut :dataset="datasetDonutMenu" :config="configDonutMenu" @selectDatapoint="selectMenu">
                <template #pattern="{ seriesIndex, patternId }">
                  <BaseMenuPattern
                    v-if="seriesIndex === 0"
                    :id="patternId"
                    menu="installation"
                  />
                  <BaseMenuPattern
                    v-if="seriesIndex === 1"
                    :id="patternId"
                    menu="docs"
                  />
                  <BaseMenuPattern
                    v-if="seriesIndex === 2"
                    :id="patternId"
                    menu="builder"
                  />
                  <BaseMenuPattern
                    v-if="seriesIndex === 3"
                    :id="patternId"
                    menu="customization"
                    patternTransform="scale(0.5) rotate(23)"
                  />
                  <BaseMenuPattern
                    v-if="seriesIndex === 4"
                    :id="patternId"
                    menu="examples"
                    patternTransform="scale(0.25) rotate(-36.5)"
                  />
                </template>

                <template #plot-comment="{ plot }">
                  <div
                    v-if="!plot.firstLoad"
                    dir="auto" 
                    style="pointer-events: all !important;" 
                    :title="plot.comment" @click="selectMenu({index: plot.patternIndex})" 
                    :style="`color:${isDarkMode ? plot.color : 'black'};font-size: 10px; text-align:${plot.patternIndex === 2 ? 'center' : plot.textAlign};`" 
                    :class="`
                      px-2 cursor-pointer 
                      ${plot.patternIndex === 0 ? 'mt-[50px] -ml-2' : ''}
                      ${plot.patternIndex === 1 ? '-mt-[50px] -ml-2' : ''}
                      ${plot.patternIndex === 2 ? '-mt-[64px]' : ''}
                      ${plot.patternIndex === 3 ? '-mt-[50px] -mr-2' : ''}
                      ${plot.patternIndex === 4 ? 'mt-[32px] -mr-2 leading-3' : ''}
                    `"
                  >
                    <div :class="`text-[#3A3A3A] dark:text-[#CCCCCC] font-inter-medium text-[12px] sm:text-[16px] ${plot.patternIndex === 4 ? 'pb-2' : ''}`" style="letter-spacing: -1px;">{{ plot.name }}</div>
                    {{ getPlotLabel(plot) }}
                  </div>
                </template>
              </VueUiDonut>
              <div class="home-perspective-wrapper flex flex-col gap-6 sm:gap-12 max-w-[500px] place-items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px] pointer-events-none"> 
                <div class="relative z-10 home-perspective" :style="`transform: rotateY(${deviationY * 30}deg) rotateX(${-deviationX * 20}deg);`">
                  <img data-cy="app-logo" src="../assets/logo3.png" alt="vue data ui logo" class="h-[48px] mx-auto drop-shadow-xl logo-shape mt-2 ml-1">
                </div>
              </div>
            </div>
          </template>
          <template #fallback>
            <BaseSpinner />
          </template>
        </Suspense>
        <!-- <BaseBubbles v-if="specialOccasion" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/> -->
        
    </div>

    <a data-cy="btn-github" href="https://github.com/graphieros/vue-data-ui" target="_blank" class="z-10 lg:hidden mt-6">
      <div class="p-0.5 bg-gradient-to-r from-app-green to-app-blue rounded-full">
        <button class="relative flex flex-row place-content-center place-items-center bg-white dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-full text-black dark:text-gray-400 font-inter-medium hover:shadow-xl  dark:hover:bg-[#2A2A2A] gap-3 transition-all">
          <BrandGithubFilledIcon/>
          <span style="letter-spacing: 1px">
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
      </div>
    </a>
</div>

<Fireworks v-if="specialOccasion" />

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

    <!-- <text :x="clientPosition.x - targetSize" :y="clientPosition.y - 6" text-anchor="end" class="tabular-nums" :fill="isDarkMode ? '#616161' : '#BBBBBB'">{{ clientPosition.x.toFixed(0) }}</text> -->
    <!-- <g :transform="`translate(${clientPosition.x - 6}, ${clientPosition.y - targetSize})`">
        <text
            text-anchor="start"
            transform="rotate(-90)"
            :fill="isDarkMode ? '#616161' : '#BBBBBB'"
        >
            {{ clientPosition.y.toFixed(0) }}
        </text>
    </g> -->
    <foreignObject
      :x="clientPosition.x - 34"
      :y="clientPosition.y - targetSize - 34"
      width="28"
      height="28"
      style="overflow: visible;"
    >
      <div style="transform: rotate(-90Deg); height: 16px; width: 46px">
        <VueUiDigits
          :dataset="Number(clientPosition.y.toFixed(0))"
          :config="{
            ...digitConfigStars,
            digits: {
              color: isDarkMode ? '#616161' : '#8A8A8A',
              skeletonColor: 'transparent'
            }
          }"
          
        />
      </div>
    </foreignObject>

    <foreignObject
      :x="clientPosition.x - targetSize - 34"
      :y="clientPosition.y - 20"
      width="46"
      height="16"
      style="overflow: visible"
    >
      <VueUiDigits
        :dataset="Number(clientPosition.x.toFixed(0))"
        :config="{
          ...digitConfigStars,
          digits: {
            color: isDarkMode ? '#616161' : '#8A8A8A',
            skeletonColor: 'transparent'
          }
        }"
        
      />
    </foreignObject>

    <circle :cx="clientPosition.x - targetSize" :cy="clientPosition.y" r="2" fill="#42d392"/>
    <circle :cx="clientPosition.x + targetSize" :cy="clientPosition.y" r="2" fill="#42d392"/>
    <circle :cx="clientPosition.x" :cy="clientPosition.y - targetSize" r="2" fill="#647EFF"/>
    <circle :cx="clientPosition.x" :cy="clientPosition.y + targetSize" r="2" fill="#647EFF"/>
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
  /* background-image: url('../assets/paper.png'); */
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
    background: radial-gradient(at top left, #647EFF20, transparent, transparent);
}
</style>