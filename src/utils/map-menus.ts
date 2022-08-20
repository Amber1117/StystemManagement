//RouteRecordRaw单个路由的类型
import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[]{
  //用来保存与菜单对应的路由映射数组
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []
  //1.获取所有路由 在router/main下
  //require.context()webpack提供的方法，可用来获取文件路径，三个参数，第一个根目录，第二个是否循环，第三个匹配文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    //key的路径是相对于根目录 ./analysis/dashboard/dashboard.ts
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)

    //2.遍历menus,将匹配的路由保存到routes中遍历menus多层，根据type递归
    const _recurseGetRoute = (userMenus: any[]) => {
      userMenus.forEach(menu => {
        if(menu.type === 2) {
          const route = allRoutes.find(route => route.path === menu.url)
          if(route) routes.push(route)
        } else {
          //表明有children
          _recurseGetRoute(menu.children)
        }
      })
    }
    _recurseGetRoute(userMenus)
  })
  return routes
}


