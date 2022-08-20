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
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue')
    // children: [] -> 根据userMenus来决定(动态添加) -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
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
