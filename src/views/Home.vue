<script setup>

</script>

<template>
    <div class="mx-auto w-5/6">
    <div class="mx-auto flex flex-col gap-6 w-full h-[calc(100svh_-_49px)] place-items-center place-content-center">
      <img src="../assets/logo.png" alt="vue data ui logo" class="h-[200px] mx-auto">
      <h1 class="mx-auto text-[48px] md:text-[64px] font-satoshi-bold"><span class="text-app-green">Vue</span> <span class="text-app-blue">Data UI</span></h1>
      <p class="mx-auto text-xl text-gray-500 text-center">A user-empowering data visualization Vue components library</p>
      <div class="flex flex-row gap-6 mt-6">
        <router-link to="/installation">
            <button class="bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors">Installation</button>
        </router-link>
        <router-link to="/docs">
            <button class="bg-black from-app-green to-app-blue py-3 px-5 rounded-md text-gray-400 border border-gray-400 font-satoshi-bold hover:bg-[rgba(255,255,255,0.05)] transition-colors hover:border-app-blue">Docs</button>
        </router-link>
      </div>
    </div>
    </div>
</template>