<script setup>
import { ref, onMounted, computed } from "vue";
import { Menu2Icon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
import { BrightnessUpIcon, MoonIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
const router = useRouter();
const store = useMainStore();

const isOpen = ref(false);

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
    document.addEventListener("click", (e) => {
        const target = e.target;
        const isMenu = target.closest("#mainDropdown");
        const isButton = target.closest("#mainDropdownButton");
        if(isButton) return;
        if(isOpen.value === true && isMenu === null) {
            isOpen.value = false;
        }
    });
    store.isDarkMode = localStorage.theme === "dark";
});
</script>

<template>
    <header class="z-[1000000] sticky top-0 w-full font-satoshi bg-gray-200 dark:bg-black text-gray-800 dark:text-slate-300 border-b border-gray-700 transition-all">
        <div class="mx-auto w-5/6 py-3 flex justify-between">
            <router-link to="/" class="w-full">
                <div class="flex flex-row gap-3 w-full">
                    <img src="../assets/logo.png" class="h-5">
                    <span>Vue Data UI</span>
                </div>
            </router-link>
            <nav class="hidden md:flex flex-row gap-3 justify-end w-full">
                <router-link to="/installation">
                    <span :class="`${isSelected('/installation') ? 'text-app-blue hover:cursor-default' : 'text-gray-800 dark:text-gray-400 hover:underline'}`">Installation</span>
                </router-link>
                <router-link to="/docs">
                    <span :class="`${isSelected('/docs') ? 'text-app-blue hover:cursor-default' : 'text-gray-800 dark:text-gray-400 hover:underline'}`">Docs</span>
                </router-link>
                <router-link to="/versions">
                    <span :class="`${isSelected('/versions') ? 'text-app-blue hover:cursor-default' : 'text-gray-800 dark:text-gray-400 hover:underline'}`">Versions</span>
                </router-link>
                <router-link to="/about">
                    <span :class="`${isSelected('/about') ? 'text-app-blue hover:cursor-default' : 'text-gray-800 dark:text-gray-400 hover:underline'}`">About</span>
                </router-link>
                <button @click="changeTheme" id="themeToggle">
                    <BrightnessUpIcon v-if="store.isDarkMode"/>
                    <MoonIcon v-else/>
                </button>
            </nav>
            <div class="relative md:hidden">
                <button id="mainDropdownButton" @click="useMenu" type="button">
                    <Menu2Icon/>
                </button>
                <div id="mainDropdown" class="absolute top-full mt-2 right-0 bg-white dark:bg-black rounded-lg border border-gray-700 shadow-2xl px-2 py-3 w-[140px] text-right" v-show="isOpen">
                    <ul>
                        <router-link to="/installation">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-app-green hover:shadow-xl">Installation</span>
                        </router-link>
                        <router-link to="/docs">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-app-blue hover:shadow-xl">Docs</span>
                        </router-link>
                        <router-link to="/versions">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-gray-200 hover:shadow-xl">Versions</span>
                        </router-link>
                        <router-link to="/about">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-gray-200 hover:shadow-xl">About</span>
                        </router-link>
                        <button @click="changeTheme" id="themeToggle" class=" flex place-items-center place-content-end w-full py-1 pr-4 text-center">
                            <BrightnessUpIcon v-if="store.isDarkMode"/>
                            <MoonIcon v-else/>
                        </button>
                    </ul>
                </div>
            </div>

        </div>
    </header>
</template>