import Http from './http'
import { router } from '@/router'
import { useUserStore } from '@/stores/user'
import {ElMessage} from "element-plus";

let userStore: any

const http = new Http({
  timeout: 1000 * 60,
  interceptors: {
    requestInterceptors: (config) => {
      if(!userStore) userStore = useUserStore()

      const token = userStore.getUserInfo?.token ?? ''
      if (token) {
        config.headers!.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestInterceptorsCatch: (error) => {
      return error
    },
    responseInterceptors: (res) => {
      switch (res.data.code) {
        case 0:
          return res
        default:
          ElMessage.error(res.data.msg + res.data.code)
          console.log(res)
          return Promise.reject(res) // 进入catch函数，避免异常数据进入then函数引起报错
      }
    },
    responseInterceptorsCatch: (err) => {
      if (err?.response) {
        switch (err.response.status) {
          case 500:
            err.message = '服务器错误(500)'
            break
          case 401:
            router.push({path: '/login'})
            err.message = '请重新登录(401)'
            break
          case 403:
            router.push({path: '/login'})
            err.message = '请重新登录(403)'
            break
          default:
            err.message = `连接出错(${err.response.status})！`
        }
      } else {
        err.message = '连接服务器失败！'
      }

      ElMessage.error(err.message)
      console.log(err)
      return Promise.reject(err)
    }
  }
})

export default http

