import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const viewRouterModules = import.meta.glob('../views/**/*.vue')

function generateRoutes(routerModules: Record<string, () => Promise<any>>) {
  return Object.keys(routerModules).map(path => {
    const name = path.match(/\.\.\/views\/(.*)\.vue$/)[1].toLowerCase()
    const routePath = name.split('/')[1]

    return {
      path: `/${routePath}`,
      name: routePath,
      component: routerModules[path],
    }
  })
}

// 基础路由
const basicModules = ['login']
const viewRoutes = generateRoutes(viewRouterModules)
// 基础路由
const basicRoutes = viewRoutes.filter(route =>
  basicModules.some(module => route.name.includes(module))
)
// 子路由
const childRoutes = viewRoutes.filter(route =>
  basicModules.some(module => !route.name.includes(module))
)

// 路由配置
const routes: Array<RouteRecordRaw> = [
  ...basicRoutes,
  {
    path: '/',
    name: 'layout',
    component: defineAsyncComponent(() => import('@/layout/index.vue')),
    redirect: '/login',
    children: childRoutes,
  },
]

console.log('应用路由: ', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
