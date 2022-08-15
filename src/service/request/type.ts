import { AxiosRequestConfig, AxiosResponse } from 'axios'

//定义接口拦截的函数, 请求与响应的拦截，都是可选的
export interface HYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
//扩展WPRequest中constructor可传的类型，加入拦截，因为AxiosRequestConfig中没有拦截
export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors
  showLoading?: boolean
}
