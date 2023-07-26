<script setup>
import SideMenu from '../components/SideMenu.vue';
import { useRouter } from "vue-router";
import DocVueUiXy from '../components/docs/DocVueUiXy.vue';

const router = useRouter();

</script>

<template>
    <SideMenu/>
    <div class="pl-[348px] pr-[48px] pt-9">
        <div class="w-5/6">
            <DocVueUiXy v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-xy'" />
        </div>
    </div>
</template>