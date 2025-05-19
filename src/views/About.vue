<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import AboutComponentTypes from "../components/AboutComponentTypes.vue";
import SatisfactionStats from "../components/SatisfactionStats.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
  return store.translations;
})

const contributors = ref(null)

// onMounted(() => {
//   window.scrollTo(0,0)
//   fetch('https://api.github.com/repos/graphieros/vue-data-ui/contributors').then(response => {
//     if(!response.ok) {
//       throw new Error('Meh')
//     }
//     return response.json()
//   }).then(data => {
//     contributors.value = data;
//     console.log({data})
//   })
// })

// https://api.github.com/repos/graphieros/vue-data-ui/contributors

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
        color: "#5f8aee",
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
      color: "#5f8aee",
      strokeWidth: 64
    },
    onion: {
      color: "#5f8aee"
    },
    gauge: {
      color: "#5f8aee"
    },
    quadrant: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      plots: {
        radius: 1.5,
        color: "#5f8aee"
      }
    },
    radar: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      shapes: {
        color: "#5f8aee"
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
      color: "#5f8aee",
      filled: false,
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
        color: "#42d392",
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
      color: "#42d392",
      strokeWidth: 64
    },
    onion: {
      color: "#42d392"
    },
    gauge: {
      color: "#42d392"
    },
    quadrant: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      plots: {
        radius: 1.5,
        color: "#42d392"
      }
    },
    radar: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      shapes: {
        color: "#42d392"
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
      color: "#42d392",
      filled: false,
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

const stackConfigDarkMode = ref({"style":{"backgroundColor":"#1A1A1A","fontFamily":"inherit","bar":{"gradient":{"show":true,"intensity":40,"underlayerColor":"#FFFFFF"}},"legend":{"margin":"6px 0 0 0","textAlign":"left","show":true,"fontSize":12,"name":{"color":"#CCCCCC","bold":false},"value":{"show":true,"bold":false,"color":"#DDDDDD","prefix":"","suffix":"","rounding":0},"percentage":{"show":true,"bold":true,"color":"#DDDDDD","rounding":1}},"title":{"textAlign":"left","text":"Vue Data UI","color":"#FAFAFA","fontSize":16,"bold":true,"margin":"0 0 6px 0","subtitle":{"color":"#A1A1A1","text":"Component types","fontSize":12,"bold":false}}}})

const stackConfig = ref({"style":{"backgroundColor":"#F3F4F6","fontFamily":"inherit","bar":{"gradient":{"show":true,"intensity":40,"underlayerColor":"#FFFFFF"}},"legend":{"margin":"6px 0 0 0","textAlign":"left","show":true,"fontSize":12,"name":{"color":"#2D353C","bold":false},"value":{"show":true,"bold":false,"color":"#2D353C","prefix":"","suffix":"","rounding":0},"percentage":{"show":true,"bold":true,"color":"#2D353C","rounding":1}},"title":{"textAlign":"left","text":"Vue Data UI","color":"#2D353C","fontSize":16,"bold":true,"margin":"0 0 6px 0","subtitle":{"color":"#A1A1A1","text":"Component types","fontSize":12,"bold":false}}}})

</script>

<template>
    <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>
    <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto">
      <h1 class="text-[64px] sm:text-[96px] text-center">{{ translations.menu.about[store.lang] }}</h1>

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
        <p class="mt-12 mb-3" dir="auto">
            {{ translations.about.p1[store.lang] }}
        </p>
        <p class="my-3" dir="auto">
          {{ translations.about.p2[store.lang] }}
        </p>

        <p class="my-3" dir="auto">
            {{ translations.about.p3[store.lang] }} <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-chestnut">VueUiChestnut</router-link></span>, <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-quadrant">VueUiQuadrant</router-link></span>, <span class="text-black font-bold dark:text-app-green hover:underline"><router-link to="/docs#vue-ui-table">VueUiTable</router-link></span>.
        </p>
        
        <div class="w-full max-w-[500px] mx-auto p-4 rounded shadow bg-white dark:bg-[#1A1A1A] my-8">
          <AboutComponentTypes />
        </div>

        <a href="https://github.com/graphieros/vue-data-ui/graphs/contributors" target="_blank" v-if="contributors" class="w-full mt-12 flex flex-row gap-4 place-items-center justify-center">
          <div class="mx-auto flex flex-row gap-4 p-4 bg-gray-200 shadow-md dark:bg-[#FFFFFF10] place-items-center rounded-md">
            <div class="h-[40px]">
              <VueUiDigits 
                :dataset="contributors.length"
                :config="{
                  backgroundColor: 'transparent',
                  digits: {
                    color: isDarkMode ? '#42d392' : '#1A1A1A',
                    skeletonColor: isDarkMode ? '#3A3A3A' : '#e1e5e8'
                  }
                }"
              />
            </div>
            {{ translations.about.contributors[store.lang] }}
          </div>
        </a>

        <div class="text-center w-full text-app-blue font-satoshi-bold text-2xl mt-12">
            {{ translations.about.maintainers[store.lang] }}
        </div>
        <div class="w-full mt-12 flex place-items-center place-content-center">
            <div class="flex gap-6 flex-col md:flex-row place-items-center place-content-center">            
                <img src="../assets/alec_lloyd_probert.png" class="h-[200px] rounded" alt="A picture of Alec Lloyd Probert">
                <p dir="auto">
                    {{ translations.about.alp[store.lang] }}<br><br>
                    <a class="text-app-blue hover:underline" href="https://github.com/graphieros" target="_blank">GitHub</a>
                </p>
            </div>
        </div>

        <SatisfactionStats/>

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