<script setup>
import { ref, onMounted, computed } from "vue";
import { Menu2Icon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
import { BrightnessUpIcon, MoonIcon, LanguageIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
const router = useRouter();
const store = useMainStore();

const isOpen = ref(false);
const translations = computed(() => {
    return store.translations;
})

function useMenu() {
    isOpen.value = !isOpen.value;
}

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

const currentRoute = computed(() => {
    return router.currentRoute.value.path
})

function isSelected(route) {
    return currentRoute.value === route;
}

onMounted(() => {
    if (localStorage.vueDataUiLang) {
        store.lang = localStorage.vueDataUiLang;
    } else {
        store.lang = "en"
    }
    document.addEventListener("click", (e) => {
        const target = e.target;
        const isMenu = target.closest("#mainDropdown");
        const isButton = target.closest("#mainDropdownButton");
        if(isButton) return;
        if(isOpen.value === true && isMenu === null) {
            isOpen.value = false;
        }
    });
    if (localStorage.theme) {
        store.isDarkMode = localStorage.theme === "dark";
    } else {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            store.isDarkMode = true;
            localStorage.setItem("theme", "dark")
        } else {
            store.isDarkMode = false;
            localStorage.setItem("theme", "light")
        }
    }
});

const isDarkMode = computed(() => store.isDarkMode);

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

</script>

<template>
    <header data-cy="app-header" class="z-[2147483647] sticky top-0 w-full font-satoshi bg-gray-200 dark:bg-black text-gray-800 dark:text-slate-300 border-b border-gray-700 transition-all">
        <div class="mx-auto w-5/6 py-3 flex justify-between">
            <router-link data-cy="link-home" to="/" class="w-[150px]">
                <div data-cy="header-app-name" class="flex flex-row gap-3 w-full">
                    <img data-cy="header-logo" src="../assets/logo.png" class="h-5">
                    <span>Vue Data UI</span>
                </div>
            </router-link>

            <nav class="hidden md:flex flex-row gap-3 justify-end w-full place-items-center">
                <router-link data-cy="link-installation" to="/installation">
                    <span :class="`py-1 px-2 rounded-xl ${isSelected('/installation') ? 'text-app-blue hover:cursor-default bg-[#5f8bee33] shadow-sm' : 'text-gray-800 dark:text-gray-400 dark:hover:bg-[#FFFFFF10] hover:bg-gray-300'}`">
                        {{ translations.menu.installation[store.lang] }}
                    </span>
                </router-link>
                <router-link data-cy="link-docs" to="/docs">
                    <span :class="`py-1 px-2 rounded-xl ${isSelected('/docs') ? 'text-app-blue hover:cursor-default bg-[#5f8bee33] shadow-sm' : 'text-gray-800 dark:text-gray-400 dark:hover:bg-[#FFFFFF10] hover:bg-gray-300'}`">
                        {{ translations.menu.docs[store.lang] }}
                    </span>
                </router-link>
                <router-link data-cy="link-dashboard" to="/dashboard">
                    <span :class="`py-1 px-2 rounded-xl ${isSelected('/dashboard') ? 'text-app-blue hover:cursor-default bg-[#5f8bee33] shadow-sm' : 'text-gray-800 dark:text-gray-400 dark:hover:bg-[#FFFFFF10] hover:bg-gray-300'}`">
                        {{ translations.menu.dashboard[store.lang] }}
                    </span>
                </router-link>
                <router-link data-cy="link-versions" to="/versions">
                    <span :class="`py-1 px-2 rounded-xl ${isSelected('/versions') ? 'text-app-blue hover:cursor-default bg-[#5f8bee33] shadow-sm' : 'text-gray-800 dark:text-gray-400 dark:hover:bg-[#FFFFFF10] hover:bg-gray-300'}`">
                        {{ translations.menu.versions[store.lang] }}
                    </span>
                </router-link>
                <router-link data-cy="link-about" to="/about">
                    <span :class="`py-1 px-2 rounded-xl ${isSelected('/about') ? 'text-app-blue hover:cursor-default bg-[#5f8bee33] shadow-sm' : 'text-gray-800 dark:text-gray-400 dark:hover:bg-[#FFFFFF10] hover:bg-gray-300'}`">
                        {{ translations.menu.about[store.lang] }}
                    </span>
                </router-link>
                <button data-cy="btn-mode" @click="changeTheme" id="themeToggle">
                    <BrightnessUpIcon v-if="isDarkMode"/>
                    <MoonIcon v-else/>
                </button>
                <div class="z-10 flex flex-row place-items-center gap-2">
                    <LanguageIcon/>
                    <select data-cy="header-select" v-model="selectedLanguage" class="h-[24px] px-2">
                        <option v-for="option in languageOptions" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
            </nav>
            <div class="relative md:hidden">
                <button id="mainDropdownButton" @click="useMenu" type="button">
                    <Menu2Icon/>
                </button>
                <div id="mainDropdown" class="absolute top-full mt-2 right-0 bg-white dark:bg-black rounded-lg border border-gray-700 shadow-2xl px-2 py-3 w-[140px] text-right" v-show="isOpen">
                    <ul>
                        <router-link to="/installation">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-app-green hover:shadow-xl">
                                {{ translations.menu.installation[store.lang] }}
                            </span>
                        </router-link>
                        <router-link to="/docs">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-app-blue hover:shadow-xl">
                                {{ translations.menu.docs[store.lang] }}
                            </span>
                        </router-link>
                        <router-link to="/dashboard">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-app-blue hover:shadow-xl">
                                {{ translations.menu.dashboard[store.lang] }}
                            </span>
                        </router-link>
                        <router-link to="/versions">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-gray-200 hover:shadow-xl">
                                {{ translations.menu.versions[store.lang] }}
                            </span>
                        </router-link>
                        <router-link to="/about">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-gray-200 hover:shadow-xl">
                                {{ translations.menu.about[store.lang] }}
                            </span>
                        </router-link>
                        <button @click="changeTheme" id="themeToggle" class=" flex place-items-center place-content-end w-full py-1 pr-4 text-center">
                            <BrightnessUpIcon v-if="store.isDarkMode"/>
                            <MoonIcon v-else/>
                        </button>
                        <div class="z-10 flex flex-row place-items-center gap-2">
                            <LanguageIcon/>
                            <select v-model="selectedLanguage" class="h-[24px] px-2">
                                <option v-for="option in languageOptions" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </ul>
                </div>
            </div>

        </div>
    </header>
</template>