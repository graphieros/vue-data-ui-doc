<script setup>
import { computed } from "vue";
import Header from "./components/Header.vue";
import UpToTop from "./components/UpToTop.vue";
import { useRouter } from "vue-router";
import Follower from "./components/examples/components/Follower.vue";

const router = useRouter();

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath
})

</script>

<template>
  <Header/>
  <div id="vdui" class="font-satoshi bg-gray-100 dark:bg-black text-black dark:text-slate-300 transition-colors">
    <router-view />
    <UpToTop/>
  </div>
  <Follower v-if="currentRoute !== '/' || isFetching"/>
</template>

<style>
.vue-ui-data-table__tbody__row-even {
  background: #e1e5e845 !important;
}
.dark .vue-ui-data-table__tbody__row-even {
  background: #FFFFFF08 !important;
}
* .no-style .vue-ui-data-table__tbody__row-even {
  background: unset !important;
}
* .no-style .vue-ui-data-table__tbody__row-even {
  background: unset !important;
}
.dark .no-style .vue-ui-data-table__tbody__row-even  {
  background: unset !important;
}
.dark .no-style .vue-ui-data-table__tbody__row-odd  {
  background: unset !important;
}
</style>