import { createStore, Store, useStore as useVuexStore } from 'vuex'
//导入类型
import { IRootState, IStoreType } from './types'

//导入模块
import  login  from '../store/login/login'
import system from './main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'wp',
      age: 18
    }
  },
  mutations: {},
  modules: {
    login,
    system
  }
})
//同步vuex中的用户信息与缓存
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
