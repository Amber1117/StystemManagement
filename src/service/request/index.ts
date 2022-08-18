import { AxiosInstance } from 'axios'
import axios from 'axios'
import { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus/lib/components/loading.type'

const DEAFULT_LOADING = true

class WPRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    //将拦截函数保留下来
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors
    //对实例进行拦截进行拦截
    this.instance.interceptors.request.use(
        this.interceptors && this.interceptors.requestInterceptor,
        this.interceptors && this.interceptors.requestInterceptorCatch
      )
    this.instance.interceptors.response.use(
      this.interceptors && this.interceptors.responseInterceptor,
      this.interceptors && this.interceptors.responseInterceptorCatch
    )
    //对所有创建的实例进行拦截
    this.instance.interceptors.request.use(
      (config) => {
        //判断是否需要loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //将loading移除
        this.loading ?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 响应失败拦截')
        // 将loading移除
        this.loading ?.close()
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }
  //
  requset(config: HYRequestConfig) {
    return new Promise((resolve, reject) => {
      //对每一次请求进行拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance.request(config).then((res) => {
        // 1.单个请求对数据的处理
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        // 2.将showLoading设置true, 这样不会影响下一个请求
        this.showLoading = DEAFULT_LOADING
        resolve(res)
      })
      .catch((err) => {
        // 将showLoading设置true, 这样不会影响下一个请求
        this.showLoading = DEAFULT_LOADING
        reject(err)
        return err
      })
    })

  }

  get(config: HYRequestConfig) {
    return this.requset({ ...config, method: 'GET' })
  }

  post(config: HYRequestConfig) {
    return this.requset({ ...config, method: 'POST' })
  }

}

export default WPRequest
