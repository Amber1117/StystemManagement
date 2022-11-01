import  wpRequest  from "../index"
//导入所需类型
import { IAccount, ILoginResult  } from './type'
//可枚举属性，用来保存请求地址
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}
//封装登录请求，返回token及id
export function accountLoginRequest(account: IAccount) {
  return wpRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

//根据id请求用户信息
export function requestUserInfoById(id: number) {
  return wpRequest.get({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  })
}

//根据用户id获取用户管理菜单
export function requestUserMenusByRoleId(id: number) {
  return wpRequest.get({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
