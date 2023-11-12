<script setup>
</script>

<template>
    <div class="w-full flex flex-col place-items-center justify-center h-screen gap-6">
        <h1 class="text-app-blue text-[64px] font-black">404</h1>
        <p>The page you are looking for does not appear to exist.</p>
        <router-link to="/">
            <button class="bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-bold hover:from-app-blue hover:to-app-green transition-colors">Home page</button>
        </router-link>
    </div>
</template>