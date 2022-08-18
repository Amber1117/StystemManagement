import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/Main.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

//添加路由导航首位
router.beforeEach((to) => {
  if(to.path !== '/login') {
    const token = localCache.getCache('token')
    if(!token) {
       return '/login'
    }
  }
})
export default router
