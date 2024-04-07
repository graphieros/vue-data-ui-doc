<script setup>
import MakerLink from '../../MakerLink.vue';
import DocLink from '../../DocLink.vue';
import Grabber from '../Grabber.vue';

defineProps(["componentName", "dataset", "config", "id", "link", "hideMaker"])

</script>

<template>
    <div class="hidden absolute top-[24px] left-[24px] w-full lg:flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
        <MakerLink v-if="!hideMaker" :to="componentName" size="py-1 px-4"/>
        <DocLink :to="link" size="py-1 px-4"/>
        <Grabber v-if="dataset" :dataset="dataset" :config="config" :componentName="componentName" :id="id"/>
    </div>
    <details class="lg:hidden">
        <summary class="select-none cursor-pointer">About</summary>
        <div class="mt-6 flex flex-col gap-4">
            <MakerLink v-if="!hideMaker" :to="componentName" size="py-1 px-4"/>
            <DocLink :to="link" size="py-1 px-4"/>
        </div>
    </details>
</template>