import axios from 'axios'
import { AxiosResponse } from  'axios'

//配置请求域名
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 10000

axios.get('http://123.207.32.32:8000/home/multidata').then((res: AxiosResponse) => {
  console.log(res.data)
})


// 5.axios.all -> 多个请求, 一起返回
// axios
// .all([
//   axios.get('/get', { params: { name: 'why', age: 18 } }),
//   axios.post('/post', { data: { name: 'why', age: 18 } })
// ])
// .then((res) => {
//   console.log(res[0].data)
//   console.log(res[1].data)
// })

// 6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
(config) => {
  // 想做的一些操作
  // 1.给请求添加token
  // 2.isLoading动画
  console.log('请求成功的拦截')
  return config
},
(err) => {
  console.log('请求发送错误')
  return err
})

// fn1: 数据响应成功(服务器正常的返回了数据 20x)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
