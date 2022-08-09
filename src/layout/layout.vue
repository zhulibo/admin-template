<script setup lang="ts">
import {computed} from "vue";
import {useVisitedPagesStore} from "@/stores/visitedPage";
import headBar from './components/headBar.vue'
import headTab from './components/headTab.vue'
import sideNav from './components/sideNav.vue'

const visitedPagesStore = useVisitedPagesStore()

const cachePages = computed((): string[] =>{
  const visitedPages = visitedPagesStore.getVisitedPages
  const res = []
  for (let i = 0; i < visitedPages.length; i++) {
    if(visitedPages[i].meta.cache) {
      res.push(visitedPages[i].name as string)
    }
  }
  return res
})
</script>

<template>
  <headBar></headBar>
  <headTab></headTab>
  <sideNav></sideNav>
  <div class="main-ct">
    <router-view v-slot="{ Component }">
      <keep-alive :max="10" :include="cachePages">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped>
.main-ct{
  position: absolute;
  top: 81px;
  bottom: 0;
  left: 200px;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
