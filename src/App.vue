<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header/>
  <div class="font-satoshi bg-gray-100 dark:bg-black text-black dark:text-slate-300 transition-colors">
    <router-view />
  </div>
</template>