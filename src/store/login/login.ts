//在此处理登录逻辑
import { Module } from 'vuex'
//导入接口类型
import { IRootState } from '@/store/types'
import { ILoginState } from './types'
import { IAccount } from '@/service/login/type'
import localCache from '@/utils/cache'
import router from '@/router'
//导入提供的请求方法
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
//导入匹配路由的方法
import { mapMenusToRoutes } from '@/utils/map-menus'
const loginModule: Module<ILoginState, IRootState> = {
  //namespaced：为模块开启命名空间，可指定模块方法 store.dispatch('login/accountLoginAction', {...account})
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      //获取与目录对应的路由映射
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach( route => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const data: any = loginResult
      const { id, token } = data.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      //获取用户信息
      const userInfoResult: any = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //获取用户菜单
      const userMenusResult: any = await requestUserMenusByRoleId(id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

       // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
