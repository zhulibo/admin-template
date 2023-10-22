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
  <RouterView />
</template>

<style lang="pcss">
@layer base;
@layer common;
@layer element;
@layer element-customize;

@import url(./assets/css/base.pcss) layer(base);
@import url(./assets/css/common.pcss) layer(common);
@import url(element-plus/dist/index.css) layer(element);
@import url(./assets/css/element-customize.pcss) layer(element-customize);

#app{
  height: 100%;
}
</style>
