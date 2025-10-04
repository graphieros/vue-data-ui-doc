<script setup>
import { ref } from "vue";
import BaseSpinner from "./BaseSpinner.vue";

const showSpinner = ref(true);

function onFallback() { showSpinner.value = true; }
function onResolve() { showSpinner.value = false; }
</script>

<template>
    <BaseSpinner :visible="showSpinner" :duration="300" easing="ease-in-out" />

    <Suspense @fallback="onFallback" @resolve="onResolve">
        <template #default>
            <slot name="default"/>
        </template>
        <template #fallback>
            <slot name="fallback"/>
        </template>
    </Suspense>
</template>
