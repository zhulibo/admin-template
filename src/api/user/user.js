import http from '@/axios'

// 登录
export function login(data) {
  return http.request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

// 获取路由信息
export function getRouter() {
  return http.request({
    url: '/api/user/getRouter',
    method: 'get',
  })
}
