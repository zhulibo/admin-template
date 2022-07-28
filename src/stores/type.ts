import type {UserInfo} from "@/api/type";
import type { DefineComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
  userInfo: UserInfo | null
}

export interface VisitedPage {
  name: string
  path: string
  query: string
  meta: object
}

export interface VisitedState {
  visitedPages: VisitedPage[]
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
