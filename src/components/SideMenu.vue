<script setup>
</script>

<template>
    <aside class="fixed left-0 top-[49px] w-[300px] h-[calc(100svh_-_49px)] bg-black overflow-y-auto border-r border-gray-700 p-6">
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Charts</div>
            <router-link to="/docs#vue-ui-xy">
                <div class="pl-6">VueUiXy</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Tables</div>
            <router-link to="/docs#vue-ui-table">
                <div class="pl-6">VueUiTable</div>
            </router-link>

        </section>
    </aside>
</template>