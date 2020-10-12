import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/views/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'user' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/list',
    meta: { icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/form/index'),
        meta: { title: 'List' }
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/form/test/index'),
        meta: { title: 'Test' }
      }
    ]
  }
]

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
