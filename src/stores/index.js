import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            isDarkMode: false
        }
    }
})