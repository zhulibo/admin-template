import {defineStore} from "pinia";
import type {VisitedPage, VisitedState} from "@/stores/type";

export const useVisitedPagesStore = defineStore('visitedPage', {
  state: (): VisitedState => ({
    visitedPages: []
  }),
  getters: {
    getVisitedPages: (state): VisitedPage[] => state.visitedPages,
  },
  actions: {
    // 添加已访问页面
    addVisitedPage(visitedPage: VisitedPage) {
      if(!this.visitedPages.some(v => v.path === visitedPage.path)) {
        this.visitedPages.push(visitedPage)
      }
    },
  }
})
