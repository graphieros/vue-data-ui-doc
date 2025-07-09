<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    path: {
        type: String,
        default: ''
    }
});

const store = useMainStore();

const AXIS_DATE_FORMATTER = {
    enable: false,
    locale: 'en',
    useUTC: false,
    januaryAsYear: false,
    options: {
        year: 'yyyy',
        month: `MMM 'yy`,
        day: 'dd MMM',
        hour: 'HH:mm',
        minute: 'HH:mm:ss',
        second: 'HH:mm:ss'
    }
}

function createObjectFromPath(p) {
    const keys = p.split('.')
    const result = {};
    let current = result;

    keys.forEach((key,i) => {
        if (i === keys.length - 1) {
            current[key] = AXIS_DATE_FORMATTER;
        } else {
            current[key] = {};
            current = current[key];
        }
    });
    return result;
}

</script>

<template>
    <div>
        <CodeParser
            language="js"
            :content="JSON.stringify(createObjectFromPath(path), null, 4)"
        />
    </div>
</template>