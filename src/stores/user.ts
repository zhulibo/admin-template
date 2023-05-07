import {defineStore} from "pinia";
import type {UserInfo} from "@/api/user/type";
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
    },
    // 重置用户信息
    resetUserInfo() {
      this.userInfo = null
      localStorage.removeItem('userInfo')
    }
  }
})
