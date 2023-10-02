import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            isDarkMode: false,
            isCopy: false,
            hints: {
                pin: 'Pin the chart to the left so you can visualize configuration changes when you scroll.'
            }
        }
    },
    actions: {
        copy(){
            this.isCopy = true;
            setTimeout(() => {
                this.isCopy = false;
            }, 500);
        }
    }
})