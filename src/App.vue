<script setup>
import Header from "./components/Header.vue";
import UpToTop from "./components/UpToTop.vue";
</script>

<template>
  <Header/>
  <div class="font-satoshi bg-gray-100 dark:bg-black text-black dark:text-slate-300 transition-colors">
    <router-view />
    <UpToTop/>
  </div>
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