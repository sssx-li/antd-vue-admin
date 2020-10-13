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
        name: 'Home',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'user' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    name: 'Form',
    redirect: '/form/list',
    meta: { icon: 'user', title: 'Form' },
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
  },
  {
    path: '/about',
    component: Layout,
    name: 'About',
    redirect: '/about/table',
    meta: { icon: 'user', title: 'About' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/about/index'),
        meta: { title: 'Table' }
      },
      {
        path: 'about',
        name: 'Detail',
        component: () => import('@/views/about/about'),
        meta: { title: 'About' }
      }
    ]
  },
  {
    path: '/export',
    component: Layout,
    name: 'Export',
    redirect: '/export/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/export/index'),
        meta: { title: 'Export', icon: 'user' }
      }
    ]
  }
]

// 解决面包屑重复点击路由导航报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
