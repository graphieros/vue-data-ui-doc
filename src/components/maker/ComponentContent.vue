<script setup>
import { ref, computed } from "vue";
import { useConfig } from '../../assets/useConfig';
import { useNestedProp } from "../../useNestedProp";

const props = defineProps({
    dataset: {
        type: [Array, Object, Number, String]
    },
    config: {
        type: Object,
        default() {
            return {}
        }
    },
    componentName: {
        type: String,
        default: ''
    },
    configName: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['click'])

const isComputed = ref(false);

const finalConfig = computed(() => {
    if(!props.configName) return props.config
    const defaultConfig = useConfig()[props.configName];

    const final = useNestedProp({
        userConfig: props.config,
        defaultConfig
    })

    return final
})

</script>

<template>
    <div class="mb-4 flex flex-row gap-4 place-items-center">
        <input type="checkbox" v-model="isComputed">
        <span class="text-sm">Use computed instead of ref</span>
    </div>
<pre class="bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded cursor-pointer border border-transparent hover:border-app-blue transition-colors mb-12"  @click="emit('click')">
<code id="componentContent">
&lt;script setup&gt;
    import { {{ isComputed ? 'computed' : 'ref' }} } from "vue";
    import { {{ componentName }} } from "vue-data-ui";
    import "vue-data-ui/style.css"
    <template v-if="isComputed">
    const config = computed(() => {
        return {{ finalConfig }}
    })
    </template>
    <template v-else>
    const config = ref({{ finalConfig }});
    </template>
    <template v-if="isComputed">
    const dataset = computed(() => {
        return {{ typeof dataset === 'string' ? `"${dataset}"` : dataset }}
    })
    </template>
    <template v-else>
    const dataset = ref({{ typeof dataset === 'string' ? `"${dataset}"` : dataset }});
    </template>
&lt;/script&gt;

&lt;template&gt;
    &lt;div style="width:600px"&gt;
        &lt;{{ componentName }} :config="config" :dataset="dataset" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

</code>
</pre>  
</template>