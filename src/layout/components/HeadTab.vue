<script setup lang="ts">
import {computed, watch} from "vue";
import { useVisitedPagesStore } from '@/stores/visitedPage'
import {useRoute} from "vue-router";

const visitedPagesStore = useVisitedPagesStore()
const route = useRoute()

const visitedPages = computed(() => {
  return visitedPagesStore.getVisitedPages
})

watch(() => route, (route) => {
  visitedPagesStore.addVisitedPage(route)
}, {immediate: true, deep: true})
</script>

<template>
  <div class="head-tab">
    <router-link
      v-for="item in visitedPages"
      :key="item.path"
      class="tab-item"
      :to="{path: item.path, query: item.query}"
    >
      <span>{{item.meta.title}}</span>
    </router-link>
  </div>
</template>

<style lang="pcss" scoped>
.head-tab{
  position: absolute;
  z-index: 100;
  top: 50px;
  left: 200px;
  right: 0;
  height: 30px;
  border-top: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
}
.tab-item{
  display: inline-block;
  & span{
    display: inline-block;
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    background-color: var(--mainColor);
  }
}
</style>
