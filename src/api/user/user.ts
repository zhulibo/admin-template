import http from '@/axios'
import type {UserInfo, LoginParams} from "@/api/user/type";
import type {RouterList} from "@/stores/type";

// 登录
export function login(data: LoginParams) {
  return http.post<UserInfo>({
    url: '/api/user/login',
    data,
  })
}

// 获取路由信息
export function getRouter() {
  return http.get<RouterList[]>({
    url: '/api/user/getRouter',
    method: 'get',
  })
}
