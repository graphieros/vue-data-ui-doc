<script setup>
import MakerLink from '../../MakerLink.vue';
import DocLink from '../../DocLink.vue';
import Grabber from '../Grabber.vue';
import BaseDocHeaderActions from '../../BaseDocHeaderActions.vue';

defineProps(["componentName", "dataset", "config", "id", "link", "hideMaker"])

</script>

<template>
    <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow">
        <BaseDocHeaderActions
            :targetDoc="link"
            :targetMaker="componentName"
            :defaultConfig="false"
        >
            <template #grabber>
                <Grabber v-if="dataset" :dataset="dataset" :config="config" :componentName="componentName" :id="id">
                    <template #icon>
                        <slot name="icon"></slot>
                    </template>
                </Grabber>
            </template>
        </BaseDocHeaderActions>
    </div>
</template>