import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

// 路由元信息类型
interface RouteMeta {
  title?: string
  requiresAuth?: boolean
}

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: defineAsyncComponent(() => import('@/layout/index.vue')),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: defineAsyncComponent(() => import('@/views/home/index.vue')),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'about',
        name: 'about',
        component: defineAsyncComponent(() => import('@/views/about/index.vue')),
        meta: {
          title: '关于',
          requiresAuth: true,
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = (to.meta.title as string) || 'Vue App'

  // 判断是否需要登录权限
  if (to.meta.requiresAuth) {
    // 判断是否已登录,未登录则跳转登录页
    const isAuthenticated = localStorage.getItem('token')
    if (!isAuthenticated) {
      next('/login')
      return
    }
  }
  next()
})

export default router
