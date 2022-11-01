//RouteRecordRaw单个路由的类型
import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
let firstMenu: any = null   //为main绑定第一个menu路径

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
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
        if (menu.type === 2) {
          const route = allRoutes.find(route => route.path === menu.url)
          if (route) routes.push(route)
          if (!firstMenu) firstMenu = menu
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

//将当前页面对应菜单的name进行保存
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

//主要解决刷新时不显示当前路由的问题
export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs ?.push({ name: menu.name })
        breadcrumbs ?.push({ name: findMenu.name })
        return findMenu
      }

    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}


export { firstMenu }
