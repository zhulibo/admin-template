<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import type {UserInfo} from "@/api/user/type";

const userStore = useUserStore()

let localUserInfo: string | null = null
localUserInfo = localStorage.getItem('userInfo')

if (localUserInfo){
  const userInfo: UserInfo = JSON.parse(localUserInfo)
  userStore.updateUserInfo(userInfo)
  // 加载缓存数据
  // getDictAreaList()
}
</script>

<template>
  <router-view />
</template>

<style>
#app{
  height: 100%;
}
</style>
