<script setup>
import { computed } from "vue"

const props = defineProps({
    config: Object
})

function parseJSON(obj) {
  const result = [];

  function parse(obj, key = '') {
    for (let prop in obj) {
      if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
        result.push({ key: key + prop, type: false });
        parse(obj[prop], key + prop + '.');
      } else {
        const valueType = Array.isArray(obj[prop]) ? 'Array' : typeof obj[prop];
        result.push({ key: key + prop, type: valueType });
      }
    }
  }

  parse(obj);
  return result;
}

function getValueByStringKey(obj, key) {
  const keys = key.split('.');
  let value = obj;

  for (let k of keys) {
    if (value[k] !== undefined) {
      value = value[k];
    } else {
      value = undefined;
      break;
    }
  }

  return value;
}

function setValueByStringKey(obj, key, value) {
      const keys = key.split('.');
      const lastKey = keys.pop();
      let target = obj;

      for (let k of keys) {
        if (target[k] === undefined) {
          target[k] = {};
        }
        target = target[k];
      }

      target[lastKey] = value;
    }

const breakdown = computed(() => {
    return parseJSON(props.config)
})

const randId = Math.random()

</script>

<template>
  <div v-for="(item, i) in breakdown">
      <slot name="item" :item="{item, getValueByStringKey, randId:`${randId}_${i}`}"/>
  </div>
</template>