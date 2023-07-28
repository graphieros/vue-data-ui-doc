<script setup>
import { ref, onMounted } from "vue";
import { Menu2Icon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
const router = useRouter();

const isOpen = ref(false);

function useMenu() {
    isOpen.value = !isOpen.value;
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
});
</script>

<template>
    <header class="z-[1000000] sticky top-0 w-full font-satoshi bg-black text-slate-300 border-b border-gray-700">
        <div class="mx-auto w-5/6 py-3 flex justify-between">
            <router-link to="/" class="w-full">
                <div class="flex flex-row gap-3 w-full">
                    <img src="../assets/logo.png" class="h-5">
                    <span>vue-data-ui</span>
                </div>
            </router-link>
            <nav class="hidden md:flex flex-row gap-3 justify-end w-full">
                <router-link to="/installation" v-if="router.currentRoute.value.path !== '/installation'">
                    <span class="text-slate-400 hover:text-app-green">Installation</span>
                </router-link>
                <router-link to="/docs" v-if="router.currentRoute.value.path !== '/docs'">
                    <span class="text-slate-400 hover:text-app-blue">Docs</span>
                </router-link>
            </nav>
            <div class="relative md:hidden">
                <button id="mainDropdownButton" @click="useMenu" type="button">
                    <Menu2Icon/>
                </button>
                <div id="mainDropdown" class="absolute top-full mt-2 right-0 bg-black rounded-lg border border-gray-700 shadow-2xl px-2 py-3 w-[140px] text-right" v-show="isOpen">
                    <ul>
                        <router-link to="/installation" v-if="router.currentRoute.value.path !== '/installation'">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-app-green hover:shadow-xl">Installation</span>
                        </router-link>
                        <router-link to="/docs" v-if="router.currentRoute.value.path !== '/docs'">
                            <span @click="isOpen=false"  class="block w-full py-1 pr-4 rounded-md cursor-pointer hover:outline hover:outline-app-blue hover:shadow-xl">Docs</span>
                        </router-link>
                    </ul>
                </div>
            </div>

        </div>
    </header>
</template>