import {defineStore} from "pinia";

export const useSettingStore = defineStore('setting', {
  state: () => ({
    fileHost: import.meta.env.VITE_APP_FILE_HOST ? import.meta.env.VITE_APP_FILE_HOST : 'http://files.jhdatatech.com/'
  }),
  getters: {
    getFileHost: (state) => state.fileHost,
  }
})
