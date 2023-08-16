<script setup>
import { ref } from "vue";

const skeletonConfig = ref({
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
]

</script>

<template>
<div class="w-full grid grid-cols-4 gap-1 sm:gap-6 mt-12 mx-auto max-w-[300px] sm:max-w-[400px] mb-12">
    <div v-for="skeleton in skeletons" :class="`max-w-1/3 skeleton ${skeleton.type === 'radar' ? 'radar' : ''}`">
        <router-link :to="skeleton.link">
            <VueUiSkeleton :config="skeleton" />
        </router-link>
    </div>
</div>
</template>

<style>

.skeleton {
    opacity: 0.6;
    transform: scale(0.9,0.9);
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.skeleton:hover {
    opacity: 1;
    transform: scale(1,1);
}

</style>
