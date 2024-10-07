<script setup>
    import { ref, computed } from "vue";
    import BaseDetails from "./BaseDetails.vue";

    const props = defineProps({
        attr: {
            type: Object,
            default() {
                return {}
            }
        },
    })

    const properties = computed(() => {
        return props.attr.details ? props.attr.details.properties ? props.attr.details.properties : [] : []
    })

    const censor = ref([
        "length",
        "toString",
        "toLocaleString",
        "pop",
        "push",
        "concat",
        "join",
        "reverse",
        "shift",
        "slice",
        "sort",
        "splice",
        "unshift",
        "indexOf",
        "lastIndexOf",
        "every",
        "some",
        "forEach",
        "map",
        "filter",
        "reduce",
        "reduceRight",
        "find",
        "findIndex",
        "fill",
        "copyWithin",
        "entries",
        "keys",
        "values",
        "includes",
        "flatMap",
        "flat",
        "__@iterator@105",
        "__@unscopables@107",
        "at"
])

function getObj(p) {
    console.log(p)
    const formatted = p.replaceAll('{', '').replaceAll('}').replaceAll('?', '').replaceAll(';', ',').split(',')
    return formatted
}
    
    
</script>

<template>
    <BaseDetails :attr="attr.name">
        <template v-if="properties && props.attr.details && props.attr.details.kind !== 'union'">
            <TypeDef v-for="el in properties.filter(p => !censor.includes(p.name))" :attr="el"/>
            </template>
            <template v-if="props.attr.details">
                <ul>
                    <li v-for="p in props.attr.details.properties">
                        <template v-if="['number', 'number[]', 'string', 'string[]', 'boolean'].includes(p.type)">
                            {{ p.name }}: {{ p.type }}
                        </template>
                        <!-- <BaseDetails v-else :attr="p.name">
                            <ul>
                                <li v-for="key in getObj(p.type)">
                                    {{ key }}
                                </li>
                            </ul>
                        </BaseDetails> -->
                    </li>
                </ul>
            </template>
            <template v-else>
                <span>{{ props.attr.name }}</span> 
            </template>
    </BaseDetails>
</template>