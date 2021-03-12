import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/layout'

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
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    name: 'Form',
    redirect: '/form/index',
    children: [
      {
        path: 'index',
        name: 'formList',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    name: 'Table',
    redirect: '/table/table',
    children: [
      {
        path: 'table',
        name: 'tableList',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    name: 'Menu',
    redirect: '/menu/menu1',
    meta: { title: 'Menu', icon: 'user' },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        meta: { title: 'Menu1', icon: 'user', breadcrumb: false },
        component: () => import('@/views/menu/menu'),
        redirect: 'menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            meta: { title: 'Menu1-1', icon: 'user', breadcrumb: false },
            component: () => import('@/views/menu/menu'),
            redirect: 'menu1-1/index',
            children: [
              {
                path: 'index',
                name: 'Menu1-1-1',
                component: () => import('@/views/menu/menu1'),
                meta: { title: 'Menu1-1-1' }
              }
            ]
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        meta: { title: 'Menu2', icon: 'user', breadcrumb: false },
        component: () => import('@/views/menu/menu'),
        redirect: 'menu2/index',
        children: [
          {
            path: '',
            name: 'Menu2-1',
            component: () => import('@/views/menu/menu2'),
            meta: { title: 'Menu2-1' }
          }
        ]
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
