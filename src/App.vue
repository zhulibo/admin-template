<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if(userInfo){
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
