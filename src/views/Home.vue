<script setup>
import { computed, ref, onMounted } from "vue";
import { BrandGithubFilledIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import { BrightnessUpIcon, MoonIcon, LanguageIcon } from "vue-tabler-icons";
import AppSkeletons from "../components/AppSkeletons.vue";
import DeepSearch from "../components/DeepSearch.vue";

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

onMounted(() => {
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

    requestAnimationFrame(updateSparkline);
    document.addEventListener("mousemove", getClientPosition);
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

</script>

<template>
    <div class="mx-auto w-5/6">
    <DeepSearch/>
      <div class="fixed top-0 left-0 h-screen w-screen z-0" style="opacity:0.4">
        <div class="absolute top-0 left-0 w-full h-full" :style="isDarkMode ? 'background:radial-gradient(#5f8bee, transparent) !important' : 'background:radial-gradient(#F3F4F6, transparent)'"/>
        <AppSkeletons/>
      </div>
    <div class="z-10 mx-auto flex flex-col gap-6 w-full h-[calc(100svh_-_49px)] place-items-center place-content-center">
    <div class="home-perspective-wrapper"> 
      <div class="relative z-10 home-perspective" :style="`transform: rotateY(${deviationY * 30}deg) rotateX(${deviationX * 20}deg)`">
        <img data-cy="app-logo" src="../assets/logo.png" alt="vue data ui logo" class="h-[100px] sm:h-[200px] mx-auto drop-shadow-2xl">
        <div class="w-full absolute top-[100%] left-0 -translate-x-[20px] sm:-translate-x-[40px]">
          <VueUiSparkline v-if="sparklineDataset" :dataset="sparklineDataset" :config="sparklineConfig" class="absolute"/>
          <VueUiSparkline v-if="sparklineDataset" :dataset="sparklineDataset2" :config="{...sparklineConfig, type: 'line'}" class="absolute"/>
          </div>
      </div>
    </div>
    <div class="relative">
      <h1 class="z-10 mx-auto text-[48px] md:text-[64px] font-satoshi-bold text-center"><span class="text-app-green" data-cy="app-name-vue">Vue</span> <span data-cy="app-name" class="text-app-blue">Data UI</span></h1>
      <span v-if="versionsList.length" class="absolute left-1/2 -translate-x-1/2 text-xs">{{ versionsList[0].version }}</span>
    </div>
    <div class="z-10 flex flex-row place-items-center gap-2">
      <LanguageIcon/>
        <select data-cy="select-lang" v-model="selectedLanguage" class="h-[36px] px-2">
          <option v-for="option in languageOptions" :value="option.value">
            {{ option.text }}
          </option>
        </select>
    </div>
      <p data-cy="tag-line" class="z-10 mx-auto text-xl text-black dark:text-gray-200 text-center">
        {{ translations.tagline[store.lang] }}
      </p>
      <div class="z-10 flex flex-row gap-6 mt-6">
        <router-link to="/installation">
            <button data-cy="btn-install" class="bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:shadow-xl hover:from-app-blue hover:to-app-green transition-all">
              {{ translations.menu.installation[store.lang] }}
            </button>
        </router-link>
        <router-link to="/docs">
            <button data-cy="btn-docs" class="bg-white hover:shadow-xl dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold dark:hover:bg-[rgba(255,255,255,0.05)] transition-all hover:border-app-blue">
              {{ translations.menu.docs[store.lang] }}
            </button>
        </router-link>
      </div>
      <a data-cy="btn-github" href="https://github.com/graphieros/vue-data-ui" target="_blank" class="z-10">
          <button class="flex flex-row place-content-center place-items-center bg-white dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold hover:shadow-xl  dark:hover:bg-[rgba(255,255,255,0.02)] hover:border-app-blue w-[220px] gap-3 transition-all">
            <BrandGithubFilledIcon/>
            <span>
              {{ translations.github[store.lang] }}
            </span>
          </button>
        </a>
        <button data-cy="switch-mode" @click="changeTheme" class="z-10 dark:text-gray-400 hover:underline flex flex-row gap-2 place-items-center">
          <BrightnessUpIcon v-if="store.isDarkMode"/>
                    <MoonIcon v-else/>{{ isDarkMode ? translations.lightMode[store.lang] : translations.darkMode[store.lang] }}
        </button>
    </div>
    </div>
</template>

<style>
.home-perspective-wrapper {
  perspective-origin: center;
  perspective: 400px;
}
.home-perspective {
  transform-style: preserve-3d;
}

</style>