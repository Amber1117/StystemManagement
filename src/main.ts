import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

import { globalRegister } from './global'
import wpRequest from './service'

//引入初始化css文件
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
//必须先同步菜单，才能进行路由注册，否则刷新时会匹配不到
setupStore()
app.use(router)
app.mount('#app')

// interface DataType {
//   data: any,
//   returnCode: string,
//   success: boolean
// }
// wpRequest.get({
//   method: 'get',
//   url: '/home/multidata',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单个请求成功的拦截')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单个请求响应成功的拦截')
//       return res
//     }
//   },
//   showLoading: true
// }).then((res) => {
//   console.log('结果是',res)
// })

