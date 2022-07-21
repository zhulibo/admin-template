import http from '@/axios'
import type {userInfo, LoginParams} from "@/api/type";

// 登录
export function login(data: LoginParams) {
  return http.post<userInfo>({
    url: '/api/user/login',
    data,
  })
}

// 获取路由信息
export function getRouter() {
  return http.get({
    url: '/api/user/getRouter',
    method: 'get',
  })
}
