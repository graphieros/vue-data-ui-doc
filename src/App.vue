<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header/>
  <div class="font-satoshi bg-black text-slate-300">
    <router-view />
  </div>
</template>