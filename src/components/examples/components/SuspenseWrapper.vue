<script setup>
import { useLoaderStore } from "../../../stores/loader";
import BaseSpinner from "../../BaseSpinner.vue";

const loaderStore = useLoaderStore();

const handlePending = () => {
    loaderStore.setLoading(true);
};

const handleResolve = () => {
    loaderStore.setLoading(false);
};
</script>

<template>
    <Suspense @pending="handlePending" @resolve="handleResolve">
        <template #fallback>
            <BaseSpinner />
        </template>
        <slot />
    </Suspense>
</template>
