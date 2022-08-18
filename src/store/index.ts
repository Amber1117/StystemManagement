import { createStore } from 'vuex'
//导入类型
import { IRootState } from './types'

//导入模块
import  login  from '../store/login/login'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'wp',
      age: 18
    }
  },
  mutations: {},
  modules: {
    login
  }
})
//同步vuex中的用户信息与缓存
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
