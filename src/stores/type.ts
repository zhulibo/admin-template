import type {UserInfo} from "@/api/user/type";
import type { DefineComponent } from 'vue'
import type {RouteLocationNormalized, RouteRecordRaw} from 'vue-router'

export interface UserState {
  userInfo: UserInfo | null
}

export interface VisitedState {
  visitedPages: RouteLocationNormalized[]
}

export interface SettingState {
  fileHost: string
}

export type RouterList = RouteRecordRaw & {
  component?: string | DefineComponent
  children?: RouterList[]
}

export interface PermissionState {
  addRouterStatus: boolean
  routers: RouterList[]
  accessedRoutes: RouterList[]
}
