<script setup>
import NavItem from './NavItem.vue'
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
        <NavItem v-if="!route.meta?.hidden" :item="route" :basePath="route.path"></NavItem>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="pcss">
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
  scrollbar-color: rgba(0,0,0,.15) transparent;
  scrollbar-width: thin;
}
</style>
