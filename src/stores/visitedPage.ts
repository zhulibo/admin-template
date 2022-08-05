import {defineStore} from "pinia";
import type {VisitedState} from "@/stores/type";
import type {RouteLocationNormalized} from "vue-router";

export const useVisitedPagesStore = defineStore('visitedPage', {
  state: (): VisitedState => ({
    visitedPages: []
  }),
  getters: {
    getVisitedPages: (state): RouteLocationNormalized[] => state.visitedPages,
  },
  actions: {
    // 添加已访问页面
    addVisitedPage(visitedPage: RouteLocationNormalized) {
      if(!this.visitedPages.some(v => v.path === visitedPage.path)) {
        this.visitedPages.push(visitedPage)
      }
    },
  }
})
