<script setup>
import Tooltip from './Tooltip.vue';
import { defineAsyncComponent } from 'vue';
const props = defineProps({
    link: String,
    icon: String
});

const icon = defineAsyncComponent(() => import("vue-tabler-icons").then(module => module[props.icon]))

function scrollToTop() {
    window.scrollTo({ top: 0});
}

</script>

<template>
    <router-link :to="link" @click="scrollToTop">
        <div class="relative">
            <div class="peer p-2 rounded-md flex flex-row gap-2 place-items-center place-content-center border border-black bg-gray-100 dark:bg-[rgb(35,35,35)] hover:bg-white hover:shadow-xl dark:hover:bg-[rgb(40,40,40)] dark:hover:border-app-green">
                <component :is="icon" class="text-gray-800 dark:text-gray-400" stroke-width="1"/>
                <span>VueUi<span class="text-gray-600 dark:text-app-green"><slot name="name"></slot></span></span>
            </div>
            <Tooltip>
                <slot name="tooltip"></slot>
            </Tooltip>
        </div>
    </router-link>
</template>