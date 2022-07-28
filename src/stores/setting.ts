import {defineStore} from "pinia";
import type {SettingState} from "@/stores/type";

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => ({
    fileHost: import.meta.env.VITE_APP_FILE_HOST ? import.meta.env.VITE_APP_FILE_HOST : 'http://files.jhdatatech.com/'
  }),
  getters: {
    getFileHost: (state): string => state.fileHost,
  }
})
