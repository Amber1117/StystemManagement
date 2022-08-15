import { createApp } from 'vue'

import App from './App.vue'

import router from './route'
import store from './store'

import { registerApp } from './global'
import wpRequest from './service'

//引入初始化css文件
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
registerApp(app)
app.use(router)
app.use(store)

app.mount('#app')

console.log('BASE_URL', process.env.VUE_APP_BASE_URL)

// interface DataType {
//   data: any,
//   returnCode: string,
//   success: boolean
// }
wpRequest.get({
  method: 'get',
  url: '/home/multidata',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单个请求成功的拦截')
      return config
    },
    responseInterceptor: (res) => {
      console.log('单个请求响应成功的拦截')
      return res
    }
  },
  showLoading: true
}).then((res) => {
  console.log('结果是',res)
})
