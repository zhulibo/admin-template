<script setup lang="ts">
import navItem from './navItem.vue'
import { reactive } from 'vue'
import { usePermissionStore } from '@/stores/permission'
import { useRoute } from 'vue-router'

const permissionStore = usePermissionStore()
const route = useRoute()
const routers = reactive(permissionStore.getRouters)
</script>

<template>
  <div class="side-nav">
    <el-menu
    router
    :default-active="route.path"
    style="border-right: none;"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
    >
      <template v-for="route in routers" :key="route.path">
        <navItem v-if="!route.meta.hidden" :item="route" :basePath="route.path"></navItem>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.side-nav{
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 200px;
  background-color: #545c64;
  & p{
    height: 500px;
  }
}
</style>
