<script setup>
import Grabber from '../Grabber.vue';
import BaseDocHeaderActions from '../../BaseDocHeaderActions.vue';

defineProps(["componentName", "dataset", "config", "id", "link", "hideMaker"])

</script>

<template>
    <div class="w-full">
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