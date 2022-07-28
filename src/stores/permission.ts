import {defineStore} from "pinia";
import { router, constantRoutes } from '@/router'
import layout from '@/layout/layout.vue'
import routeWrapper from '@/layout/routeWrapper.vue'
import type {PermissionState} from "@/stores/type";
import type { DefineComponent } from 'vue'
import type { RouterList } from "@/stores/type";

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    addRouterStatus: false, // 路由是否已合并
    routers: [], // 完整路由
    accessedRoutes: [] // 从后台获取的路由
  }),
  getters: {
    getAddRouterStatus: (state) => state.addRouterStatus,
    getRouters: (state) => state.routers,
    getAccessedRoutes: (state) => state.accessedRoutes
  },
  actions: {
    // 改变合并路由状态
    changeRouterState(bool: boolean) {
      this.addRouterStatus = bool
    },
    // 更新router
    updateRouter(routers: RouterList[]) {
      return new Promise((resolve) => {
        const accessedRoutes = filterAsyncRouter(routers)
        this.accessedRoutes = accessedRoutes
        this.routers = constantRoutes.concat(accessedRoutes) as RouterList[]
        // 向vue-router中添加accessedRoutes
        for (let i = 0; i < accessedRoutes.length; i++) {
          router.addRoute(accessedRoutes[i])
        }
        // 改变合并路由状态为已完成
        this.changeRouterState(true)
        resolve(accessedRoutes)
      })
    }
  }
})

// 把后端返回的路由信息转换为组件对象
function filterAsyncRouter(asyncRouterMap: RouterList[]) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'layout') {
        route.component = layout
      }else if (route.component === 'routeWrapper') {
        route.component = routeWrapper
      }else {
        route.component = loadComponent(route.component as string) as unknown as DefineComponent
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

const modules = import.meta.glob('../views/**/*.vue')
export const loadComponent = (view: string) => {
  return modules[`../views${view}.vue`]
}
