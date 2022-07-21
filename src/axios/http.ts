import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { Interceptors, Config, ResponseData } from "@/axios/type";

class Http {
  instance: AxiosInstance
  interceptors?: Interceptors
  constructor(config: Config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

  }

  // 封装request
  request<T = any>(config: Config): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: Config): Promise<ResponseData<T>> {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T = any>(config: Config): Promise<ResponseData<T>> {
    return this.request<T>({ ...config, method: 'post' })
  }
  put<T = any>(config: Config): Promise<ResponseData<T>> {
    return this.request<T>({ ...config, method: 'put' })
  }
  delete<T = any>(config: Config): Promise<ResponseData<T>> {
    return this.request<T>({ ...config, method: 'delete' })
  }

}

export default Http
