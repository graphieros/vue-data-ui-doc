<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const skeletonConfig = ref({
  type: "line",
  style: {
    backgroundColor: "#F3F4F6",
    color: "#CCCCCC",
    maxHeight: 500,
    animated: false,
    line: {
      axis: {
        show: true,
        color: "#CCCCCC",
        strokeWidth: 0.5
      },
      path: {
        color: "#cccccc",
        strokeWidth: 1,
        showPlots: true
      }
    },
    bar: {
      axis: {
        show: true,
        color: "#cccccc",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#cccccc",
      barWidth: 9
    },
    chestnut: {
      color: "#cccccc",
    },
    donut: {
      color: "#cccccc",
      strokeWidth: 64
    },
    onion: {
      color: "#cccccc"
    },
    gauge: {
      color: "#cccccc"
    },
    quadrant: {
      grid: {
        color: "#cccccc",
        strokeWidth: 0.5
      },
      plots: {
        radius: 1.5,
        color: "#cccccc"
      }
    },
    radar: {
      grid: {
        color: "#cccccc",
        strokeWidth: 0.5
      },
      shapes: {
        color: "#cccccc"
      }
    },
    waffle: {
      color: "#cccccc"
    },
    table: {
      th: {
        color: "#cccccc"
      },
      td: {
        color: "#cccccc",
        strokeWidth: 0.5
      }
    },
    rating: {
      color: "#cccccc",
      filled: true,
      strokeWidth: 1,
      maxWidth: 200
    },
    verticalBar: {
      axis: {
        show: true,
        color: "#cccccc",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#cccccc"
    },
    heatmap: {
      color: "#cccccc"
    },
    pyramid: {
      color: "#cccccc"
    }
  }
});
const skeletonConfigDarkMode = ref({
  type: "line",
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    maxHeight: 500,
    animated: false,
    line: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      path: {
        color: "#5c5c5c",
        strokeWidth: 1,
        showPlots: true
      }
    },
    bar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#5c5c5c",
      barWidth: 9
    },
    chestnut: {
      color: "#5C5C5C",
    },
    donut: {
      color: "#5c5c5c",
      strokeWidth: 64
    },
    onion: {
      color: "#5c5c5c"
    },
    gauge: {
      color: "#5c5c5c"
    },
    quadrant: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      plots: {
        radius: 1.5,
        color: "#5c5c5c"
      }
    },
    radar: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      shapes: {
        color: "#5c5c5c"
      }
    },
    waffle: {
      color: "#5c5c5c"
    },
    table: {
      th: {
        color: "#5c5c5c"
      },
      td: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      }
    },
    rating: {
      color: "#5c5c5c",
      filled: true,
      strokeWidth: 1,
      maxWidth: 200
    },
    verticalBar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#5c5c5c"
    },
    heatmap: {
      color: "#5c5c5c"
    },
    pyramid: {
      color: "#5c5c5c"
    }
  }
});

const skeletons = [
    {...skeletonConfig.value, type: 'line', link: "/docs#vue-ui-xy"},
    {...skeletonConfig.value, type: 'quadrant', link: "/docs#vue-ui-quadrant"},
    {...skeletonConfig.value, type: 'donut', link: "/docs#vue-ui-donut"},
    {...skeletonConfig.value, type: 'verticalBar', link: "/docs#vue-ui-vertical-bar"},
    {...skeletonConfig.value, type: 'radar', link: "/docs#vue-ui-radar"},
    {...skeletonConfig.value, type: 'table', link: "/docs#vue-ui-table"},
    {...skeletonConfig.value, type: 'gauge', link: "/docs#vue-ui-gauge"},
    {...skeletonConfig.value, type: 'waffle', link: "/docs#vue-ui-waffle"},
    {...skeletonConfig.value, type: 'onion', link: "/docs#vue-ui-onion"},
    {...skeletonConfig.value, type: 'bar', link: "/docs#vue-ui-xy"},
    {...skeletonConfig.value, type: 'rating', link: "/docs#vue-ui-rating"},
    {...skeletonConfig.value, type: 'chestnut', link: "/docs#vue-ui-chestnut"},
    {},
    {...skeletonConfig.value, type: 'heatmap', link: "/docs#vue-ui-chestnut"},
    {...skeletonConfig.value, type: 'pyramid', link: "/docs#vue-ui-chestnut"},
]

const skeletonsDM = [
    {...skeletonConfigDarkMode.value, type: 'line', link: "/docs#vue-ui-xy"},
    {...skeletonConfigDarkMode.value, type: 'quadrant', link: "/docs#vue-ui-quadrant"},
    {...skeletonConfigDarkMode.value, type: 'donut', link: "/docs#vue-ui-donut"},
    {...skeletonConfigDarkMode.value, type: 'verticalBar', link: "/docs#vue-ui-vertical-bar"},
    {...skeletonConfigDarkMode.value, type: 'radar', link: "/docs#vue-ui-radar"},
    {...skeletonConfigDarkMode.value, type: 'table', link: "/docs#vue-ui-table"},
    {...skeletonConfigDarkMode.value, type: 'gauge', link: "/docs#vue-ui-gauge"},
    {...skeletonConfigDarkMode.value, type: 'waffle', link: "/docs#vue-ui-waffle"},
    {...skeletonConfigDarkMode.value, type: 'onion', link: "/docs#vue-ui-onion"},
    {...skeletonConfigDarkMode.value, type: 'bar', link: "/docs#vue-ui-xy"},
    {...skeletonConfigDarkMode.value, type: 'rating', link: "/docs#vue-ui-rating"},
    {...skeletonConfigDarkMode.value, type: 'chestnut', link: "/docs#vue-ui-chestnut"},
    {},
    {...skeletonConfigDarkMode.value, type: 'heatmap', link: "/docs#vue-ui-chestnut"},
    {...skeletonConfigDarkMode.value, type: 'pyramid', link: "/docs#vue-ui-chestnut"},
]

</script>

<template>
<div class="w-full grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-6 z-0" v-if="isDarkMode">
    <div v-for="skeleton in skeletonsDM" :class="`max-w-1/3 skeleton ${skeleton.type === 'radar' ? 'radar' : ''}`">
            <VueUiSkeleton v-if="skeleton.type" :config="skeleton" />
    </div>
</div>
<div class="w-full grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-6" v-else>
    <div v-for="skeleton in skeletons" :class="`max-w-1/3 skeleton ${skeleton.type === 'radar' ? 'radar' : ''}`">
            <VueUiSkeleton v-if="skeleton.type" :config="skeleton" />
    </div>
</div>
</template>