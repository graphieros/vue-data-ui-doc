<script setup>
import { computed } from "vue";
import { BrandGithubFilledIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";

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

</script>

<template>
    <div class="mx-auto w-5/6">
    <div class="mx-auto flex flex-col gap-6 w-full h-[calc(100svh_-_49px)] place-items-center place-content-center">
      <img src="../assets/logo.png" alt="vue data ui logo" class="h-[200px] mx-auto">
      <h1 class="mx-auto text-[48px] md:text-[64px] font-satoshi-bold"><span class="text-app-green">Vue</span> <span class="text-app-blue">Data UI</span></h1>
      <p class="mx-auto text-xl text-black dark:text-gray-500 text-center">A user-empowering data visualization Vue components library</p>
      <div class="flex flex-row gap-6 mt-6">
        <router-link to="/installation">
            <button class="bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:shadow-xl hover:from-app-blue hover:to-app-green transition-all">Installation</button>
        </router-link>
        <router-link to="/docs">
            <button class="bg-white hover:shadow-xl dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold dark:hover:bg-[rgba(255,255,255,0.05)] transition-all hover:border-app-blue">Docs</button>
        </router-link>
      </div>
      <a href="https://github.com/graphieros/vue-data-ui" target="_blank">
          <button class="flex flex-row place-content-center place-items-center bg-white dark:bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-black dark:text-gray-400 border border-gray-400 font-satoshi-bold hover:shadow-xl  dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue w-[220px] gap-3 transition-all">
            <BrandGithubFilledIcon/>
            <span>GitHub repo</span>
          </button>
        </a>
        <button @click="changeTheme" class="dark:text-gray-400 hover:underline">
          {{ isDarkMode ? 'Switch to light mode' : 'Switch to dark mode' }}
        </button>
    </div>
    </div>
</template>