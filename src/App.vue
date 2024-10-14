<script setup>
import { computed, nextTick, onMounted, watch } from "vue";
import Header from "./components/Header.vue";
import UpToTop from "./components/UpToTop.vue";
import { useRoute, useRouter } from "vue-router";
import GithubButton from "./components/examples/components/GithubButton.vue";
import { useMainStore } from "./stores";
import HelpCenter from "./components/helpCenter/HelpCenter.vue";
import BaseFooter from "./components/BaseFooter.vue";
import FootInfo from "./components/FootInfo.vue";

const store = useMainStore();
const router = useRouter();
const route = useRoute();

const isDarkMode = computed(() => store.isDarkMode)

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath;
});

onMounted(() => {
  store.isFetching = true;
  fetch(`https://api.github.com/repos/graphieros/vue-data-ui`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    store.stars = data.stargazers_count;
    store.issues = data.open_issues_count;
    store.pack = data;
  })
  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  }).finally(() => {
    store.isFetching = false;
  })
});

</script>

<template>
  <Header/>
  <HelpCenter v-if="route.name !== 'Home'"/>
  <div v-if="!isDarkMode && !['/versions', '/customization'].includes(currentRoute)" class="underlay-paper"></div>
  <div v-if="isDarkMode" class="underlay-paper--dark"></div>
  <div id="vdui" class="font-satoshi bg-gray-100 dark:bg-black text-black dark:text-slate-300 transition-colors mb-[60px]">
    <router-view />
    <UpToTop/>
    <GithubButton v-if="route.name !== 'Home'"/>
    <FootInfo v-if="route.name !== 'Home'"/>
  </div>
  <!-- <Follower v-if="!['/', '/docs#vue-ui-cursor'].includes(currentRoute)"/> -->
  <BaseFooter v-if="!['/'].includes(currentRoute)"/>
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