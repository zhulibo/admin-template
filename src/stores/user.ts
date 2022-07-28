import {defineStore} from "pinia";
import type {UserInfo} from "@/api/type";
import type {UserState} from "@/stores/type";

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null
  }),
  getters: {
    getUserInfo: (state): UserInfo | null => state.userInfo
  },
  actions: {
    // 更新用户信息
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    }
  }
})
