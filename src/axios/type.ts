import type {AxiosRequestConfig, AxiosResponse} from "axios";

// 拦截器
export interface Interceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (res: T) => any
  responseInterceptorsCatch?: (error: any) => any
}

// 拓展请求对象
export interface Config extends AxiosRequestConfig {
  interceptors?: Interceptors
}

// 请求返回数据
export interface ResponseData<T = any> {
  code: number
  msg: string
  data: T
  total: number
  [propName: string]: any
}
