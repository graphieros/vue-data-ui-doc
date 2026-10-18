<script setup>
import BaseDetails from "../../BaseDetails.vue";
import BaseAttr from "../../BaseAttr.vue";
import BaseComment from "../../BaseComment.vue";
import BaseTabLink from "../../BaseTabLink.vue";
import { RouterLink } from "vue-router";
import { VueUiIcon } from "vue-data-ui/vue-ui-icon";
import BaseColorInfo from "../../BaseColorInfo.vue";
import BaseAttrAnnotatorPalette from "../../BaseAttrAnnotatorPalette.vue";
import { getConfigControlProps } from "./configFields.js";

const components = {
    BaseComment,
    BaseTabLink,
    BaseAttrAnnotatorPalette,
    BaseColorInfo,
    RouterLink,
    VueUiIcon,
};
defineProps({
    fields: { type: Array, required: true },
    bindings: { type: Object, required: true },
});
const emit = defineEmits(["refresh-chart"]);
</script>

<template>
    <template
        v-for="(field, index) in fields"
        :key="field.attr || field.name || index"
    >
        <template v-if="Object.hasOwn(field, 'text')">{{
            field.text
        }}</template>
        <component
            :is="components[field.component] || field.component"
            v-else-if="field.component"
            v-bind="getConfigControlProps(field)"
        >
            <DocConfigFields
                v-if="field.children"
                :fields="field.children"
                :bindings="bindings"
                @refresh-chart="emit('refresh-chart')"
            />
        </component>
        <BaseDetails
            v-else-if="field.children"
            v-bind="getConfigControlProps(field)"
        >
            <DocConfigFields
                :fields="field.children"
                :bindings="bindings"
                @refresh-chart="emit('refresh-chart')"
            />
        </BaseDetails>
        <BaseAttr
            v-else
            v-bind="getConfigControlProps(field)"
            :binding="field.inactive ? null : bindings[field.attr]"
            @change="
                field.onChange?.($event);
                field.refreshChart && emit('refresh-chart');
            "
        />
    </template>
</template>
