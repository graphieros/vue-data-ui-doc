<script setup>
import { computed, ref } from "vue";
import { BrandGithubFilledIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import { BrightnessUpIcon, MoonIcon, LanguageIcon } from "vue-tabler-icons";
import Logo from "../components/docs/Logo.vue";
import AppSkeletons from "../components/AppSkeletons.vue";

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
})

const languageOptions = ref([
  { value: "en", text: "English" },
  { value: "fr", text: "Français" },
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

</script>

<template>
    <div class="mx-auto w-5/6">
      <div class="fixed top-0 left-0 h-screen w-screen z-0" style="opacity:0.4">
        <div class="absolute top-0 left-0 w-full h-full" :style="isDarkMode ? 'background:radial-gradient(#5f8bee, transparent) !important' : 'background:radial-gradient(#F3F4F6, transparent)'"/>
        <AppSkeletons/>
      </div>
    <div class="z-10 mx-auto flex flex-col gap-6 w-full h-[calc(100svh_-_49px)] place-items-center place-content-center">
    <div class="relative z-10">
      <img src="../assets/logo.png" alt="vue data ui logo" class="h-[200px] mx-auto drop-shadow-2xl">
      <!-- <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <Logo/>
      </div> -->
    </div>
      <h1 class="z-10 mx-auto text-[48px] md:text-[64px] font-satoshi-bold"><span class="text-app-green">Vue</span> <span class="text-app-blue">Data UI</span></h1>
    <div class="z-10 flex flex-row place-items-center gap-2">
      <LanguageIcon/>
        <select v-model="selectedLanguage" class="h-[36px] px-2">
          <option v-for="option in languageOptions" :value="option.value">
            {{ option.text }}
          </option>
        </select>
    </div>
      <p class="z-10 mx-auto text-xl text-black dark:text-gray-200 text-center">
        {{ translations.tagline[store.lang] }}
      </p>
      <div class="z-10 flex flex-row gap-6 mt-6">
        <router-link to="/installation">
            <button class="bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:shadow-xl hover:from-app-blue hover:to-app-green transition-all">
              {{ translations.menu.installation[store.lang] }}
            </button>
        </router-link>
        <router-link to="/docs">
            <button class="bg-white hover:shadow-xl dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold dark:hover:bg-[rgba(255,255,255,0.05)] transition-all hover:border-app-blue">
              {{ translations.menu.docs[store.lang] }}
            </button>
        </router-link>
      </div>
      <a href="https://github.com/graphieros/vue-data-ui" target="_blank" class="z-10">
          <button class="flex flex-row place-content-center place-items-center bg-white dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold hover:shadow-xl  dark:hover:bg-[rgba(255,255,255,0.02)] hover:border-app-blue w-[220px] gap-3 transition-all">
            <BrandGithubFilledIcon/>
            <span>
              {{ translations.github[store.lang] }}
            </span>
          </button>
        </a>
        <button @click="changeTheme" class="z-10 dark:text-gray-400 hover:underline flex flex-row gap-2 place-items-center">
          <BrightnessUpIcon v-if="store.isDarkMode"/>
                    <MoonIcon v-else/>{{ isDarkMode ? translations.lightMode[store.lang] : translations.darkMode[store.lang] }}
        </button>
    </div>
    </div>
</template>