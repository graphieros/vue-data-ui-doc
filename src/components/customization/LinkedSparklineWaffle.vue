<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores";
import { UserIcon, EyeIcon, UserPlusIcon } from "vue-tabler-icons";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  dataset: {
    type: Array,
    default() {
      return []
    }
  }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
  return {
    responsive: false,
    theme: "",
    customPalette: [],
    useBlurOnHover: true,
    useCustomCells: props.active,
    useAnimation: true,
    style: {
      fontFamily: "inherit",
      chart: {
        backgroundColor: 'transparent',
        color: "#2D353C",
        layout: {
          labels: {
            captions: {
              show: false,
            },
          },
          grid: { size: 10, spaceBetween: 0, vertical: false },
          rect: {
            rounded: true,
            rounding: 2,
            stroke: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
            strokeWidth: 0.5,
            useGradient: props.active,
            gradientIntensity: 40,
          },
        },
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
      },
    },
    userOptions: {
      show: false,
    },
  };
});

const inactiveDataset = computed(() => {
  return [
    {
      name: '',
      values: [1],
      color: isDarkMode.value ? '#3A3A3A' : '#e1e5e8'
    }
  ]
})

</script>

<template>
  <VueDataUi component="VueUiWaffle" :dataset="active ? dataset : inactiveDataset" :config="config">
    <template #cell="{ cell, isSelected }">
      <div class="flex place-items-center justify-center h-full w-full bg-app-blue-light" v-if="cell.name === 'Users'">
        <UserIcon class="text-app-blue" :size="32"/>
      </div>
      <div class="flex place-items-center justify-center h-full w-full bg-app-orange-light" v-if="cell.name === 'Viewers'">
        <EyeIcon class="text-app-orange" :size="32" />
      </div>
      <div class="flex place-items-center justify-center h-full w-full bg-app-green-light" v-if="cell.name === 'Subscribers'">
        <UserPlusIcon class="text-app-green-dark" :size="32" />
      </div>
    </template>
  </VueDataUi>
</template>
