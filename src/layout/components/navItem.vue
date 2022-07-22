<script setup lang="ts">
import path from 'path-browserify'
import { ref } from "vue";

const props = defineProps({
  item: {},
  basePath: {},
})

const submenuList = (props.item.children || []).filter((item) => { // 子菜单数组
  return !item.hidden
})

const hasSubmenu = ref(submenuList.length > 0) // 有下一级菜单

const resolvePath = (routePath) => {
  return path.resolve(props.basePath, routePath)
}
</script>

<template>
  <el-sub-menu v-if="hasSubmenu" :index="item.path">
    <template #title>
<!--      <icon className="icon-nav" name="arrow_right"></icon>-->
      <span>{{ item.meta.title }}</span>
    </template>
    <navItem v-for="child in item.children" :key="child.path" :item="child" :basePath="resolvePath(child.path)"></navItem>
  </el-sub-menu>
  <el-menu-item v-else-if="!item.hidden" :index="basePath">
<!--    <icon className="icon-nav" name="arrow_right"></icon>-->
    <span>{{ item.meta.title }}</span>
  </el-menu-item>
</template>


<style scoped>
.icon-nav{
  margin-right: 2px;
}
</style>
