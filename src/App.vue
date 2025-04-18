<script setup>
import { computed, onMounted, ref } from "vue";
import Header from "./components/Header.vue";
import UpToTop from "./components/UpToTop.vue";
import { useRoute, useRouter } from "vue-router";
import GithubButton from "./components/examples/components/GithubButton.vue";
import { useMainStore } from "./stores";
import HelpCenter from "./components/helpCenter/HelpCenter.vue";
import BaseFooter from "./components/BaseFooter.vue";
import FootInfo from "./components/FootInfo.vue";
import useFetch from "./useFetch";

const store = useMainStore();
const router = useRouter();
const route = useRoute();

const isDarkMode = computed(() => store.isDarkMode)

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath;
});

const start = ref("2023-07-25");
const lastDate = ref(new Date(Date.now()));

const end = computed(() => {
    const day = lastDate.value.getDate();
    const month = lastDate.value.getMonth()+1;
    const year = lastDate.value.getFullYear();
    return `${year}-${String(month).length === 1 ? `0${month}` : month}-${String(day).length === 1 ? `0${day}` : day}`;
});

const url = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui`;
});
  
const url_cli = computed(() => {
  return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui-cli`;
})

const url_color_bridge = computed(() => {
  return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/color-bridge`;
})

const url_vue_hi_code = computed(() => {
  return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-hi-code`;
})

function fetchGithubStats() {
  return useFetch({
    url: 'https://api.github.com/repos/graphieros/vue-data-ui',
    _then: (data) => {
      store.stars = data.stargazers_count;
      store.issues = data.open_issues_count;
      store.pack = data;
      store.repos.library = data;
    }
  })
}

function fetchCliStats() {
  return useFetch({
    url: 'https://api.github.com/repos/graphieros/vue-data-ui-cli',
    _then: (data) => {
      store.stars_cli = data.stargazers_count;
      store.repos.cli = data;
    }
  })
}

function fetchNuxtStats() {
  return useFetch({
    url: 'https://api.github.com/repos/graphieros/vue-data-ui-nuxt',
    _then: (data) => {
      store.stars_nuxt = data.stargazers_count;
    }
  })
}

function fetchDocStats() {
  return useFetch({
    url: 'https://api.github.com/repos/graphieros/vue-data-ui-doc',
    _then: (data) => {
      store.stars_docs = data.stargazers_count;
      store.repos.docs = data;
    }
  })
}

onMounted(() => {
  fetchGithubStats();
  fetchCliStats();
  fetchNuxtStats();
  fetchDocStats();

  fetch(url.value, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        return response.json();
    }).then(json =>  {
      store.downloads.lib = json.downloads;
      store.npmDownloads = json.downloads.map(d => {
            return {
                period: d.day,
                value: d.downloads
            }
        }).slice(0,-1).slice(-28);
    })

  fetch(url_cli.value, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        return response.json();
    }).then(json =>  {
      store.downloads.cli = json.downloads;
    })

  fetch(url_color_bridge.value, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        return response.json();
    }).then(json =>  {
      store.downloads.color_bridge = json.downloads;
    })

  fetch(url_vue_hi_code.value, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        return response.json();
    }).then(json =>  {
      store.downloads.hiCode = json.downloads;
    })
});

const showUnderlay = computed(() => {
  return currentRoute.value === '/'
})

</script>

<template>
  <Header/>
  <HelpCenter v-if="!['Home', 'Versions', 'Maker'].includes(route.name)"/>
  <div v-if="showUnderlay && !isDarkMode"></div>

  <div v-if="showUnderlay && isDarkMode" class="underlay-paper--dark"></div>
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
.vue-data-ui-tooltip {
  font-family: Satoshi;
}
</style>