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
      color: "#5C5C5C"
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

const skeletonConfigDark = ref({
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
      color: "#5C5C5C"
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
    {...skeletonConfig.value},
    {...skeletonConfig.value, type: 'quadrant'},
    {...skeletonConfig.value, type: 'donut'},
    {...skeletonConfig.value, type: 'verticalBar'},
    {...skeletonConfig.value, type: 'radar'},
    {...skeletonConfig.value, type: 'table'},
    {...skeletonConfig.value, type: 'gauge'},
    {...skeletonConfig.value, type: 'waffle'},
    {...skeletonConfig.value, type: 'onion'},
    {...skeletonConfig.value, type: 'bar'},
    {...skeletonConfig.value, type: 'rating'},
    {...skeletonConfig.value, type: 'chestnut'},
];

const skeletonsDarkMode = [
    {...skeletonConfigDark.value},
    {...skeletonConfigDark.value, type: 'quadrant'},
    {...skeletonConfigDark.value, type: 'donut'},
    {...skeletonConfigDark.value, type: 'verticalBar'},
    {...skeletonConfigDark.value, type: 'radar'},
    {...skeletonConfigDark.value, type: 'table'},
    {...skeletonConfigDark.value, type: 'gauge'},
    {...skeletonConfigDark.value, type: 'waffle'},
    {...skeletonConfigDark.value, type: 'onion'},
    {...skeletonConfigDark.value, type: 'bar'},
    {...skeletonConfigDark.value, type: 'rating'},
    {...skeletonConfigDark.value, type: 'chestnut'},
];


</script>

<template>
    <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto">
        <div class="text-center w-full text-black font-bold dark:text-app-green font-satoshi-bold text-2xl">
            About us
        </div>
        <div v-if="isDarkMode" class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px]">
            <div v-for="skeleton in skeletonsDarkMode.slice(0,3)" class="max-w-1/3">
                <VueUiSkeleton :config="skeleton"/>
            </div>
        </div>
        <div v-else class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px]">
            <div v-for="skeleton in skeletons.slice(0,3)" class="max-w-1/3">
                <VueUiSkeleton :config="skeleton"/>
            </div>
        </div>
        <p class="mt-12 mb-3">
            Vue Data UI was born of a single question: if your dashboards are so good, why are your users asking for Excel export features ?
        </p>
        <p class="my-3">
            The purpose of this open-source library is to offer end users a set of in-built tools around charts and tables to reduce the friction of having to recompute exported data. Of course, Vue Data UI keeps the option to export to Excel and PDF, just in case.
        </p>

        <p class="my-3">
            Vue Data UI offers a set of classic chart types, along with new or rare items, such as <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-chestnut">VueUiChestnut</router-link></span> or <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-quadrant">VueUiQuadrant</router-link></span>, along with the powerful <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-table">VueUiTable</router-link></span>.
        </p>

        <p class="my-3">
            Vue Data UI also ships with a set of utilities, such as <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-screenshot">VueUiScreenshot</router-link></span> or <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-skeleton">VueUiSkeleton</router-link></span>, to make the experience of your dashboards as smooth as possible.
        </p>
       
        <div class="text-center w-full text-app-blue font-satoshi-bold text-2xl mt-12">
            Maintainer(s)
        </div>
        <div class="w-full mt-12 flex place-items-center place-content-center">
            <div class="flex gap-6 flex-col md:flex-row place-items-center place-content-center">            
                <img src="../assets/alec_lloyd_probert.png" class="h-[200px]" alt="A picture of Alec Lloyd Probert">
                <p>
                    Alec Lloyd Probert is a front-end developer, formerly a data analyst, with a strong passion for data visualization and VueJs.<br><br>
                    <a class="text-app-blue hover:underline" href="https://github.com/graphieros" target="_blank">GitHub profile</a>
                </p>
            </div>
        </div>
        <div v-if="isDarkMode" class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px] mb-12">
            <div v-for="skeleton in skeletonsDarkMode.slice(3, skeletons.length)" class="max-w-1/3">
                <VueUiSkeleton :config="skeleton"/>
            </div>
        </div>
        <div v-else class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px] mb-12">
            <div v-for="skeleton in skeletons.slice(3, skeletons.length)" class="max-w-1/3">
                <VueUiSkeleton :config="skeleton"/>
            </div>
        </div>
    </div>
</template>