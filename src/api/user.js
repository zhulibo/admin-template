import axios from '../axios'

// 登录
export function login(data) {
  // return new Promise(resolve => {
  //   resolve({
  //     data: {
  //       token: '666'
  //     }
  //   })
  // })
  return axios({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 获取路由信息
export function getRouter() {
  // return new Promise(resolve => {
  //   resolve({
  //     data: []
  //   })
  // })
  return axios({
    url: '/api/user/getRouter',
    method: 'get'
  })
}
