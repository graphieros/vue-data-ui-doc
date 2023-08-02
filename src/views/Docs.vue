<script setup>
import {ref} from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useRouter } from "vue-router";
import DocVueUiXy from '../components/docs/DocVueUiXy.vue';
import DocVueUiTable from "../components/docs/DocVueUiTable.vue";
import DocVueUiDonut from "../components/docs/DocVueUiDonut.vue";
import DocVueUiWaffle from "../components/docs/DocVueUiWaffle.vue";
import DocVueUiRadar from "../components/docs/DocVueUiRadar.vue";
import DocVueUiQuadrant from "../components/docs/DocVueUiQuadrant.vue";

const router = useRouter();
const isOpen = ref(window.innerWidth > 768);

function toggleMenu(state) {
    isOpen.value = state;
}

// TODO: copy user config as JSON
// TOOD: show default config (add toggle)

</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden`">
        <div :class="`${isOpen ? 'xl:w-5/6' : ''}`">
            <DocVueUiXy v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-xy'" />
            <DocVueUiTable v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-table'"/>
            <DocVueUiDonut v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-donut'"/>
            <DocVueUiWaffle v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-waffle'"/>
            <DocVueUiRadar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-radar'"/>
            <DocVueUiQuadrant v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-quadrant'"/>
            <div v-if="router.currentRoute.value.fullPath === '/docs'" class="h-[calc(100svh_-_89px)] flex flex-col place-items-center place-content-center">
                <h1 class="">
                    vue-data-ui components require 2 props:
                </h1>
<pre>
<code class="text-gray-500 text-xl">
&lt;NameOfComponent
    <span class="text-app-green">:dataset</span>="dataset"
    <span class="text-app-blue">:config</span>="config"
&lt;/NameOfComponent&gt;
</code>
</pre>
            </div>
        </div>
    </div>
</template>