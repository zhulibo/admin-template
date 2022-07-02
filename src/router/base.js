import layout from '@/layout/layout.vue'

export default [
  {
    path: '/',
    hidden: true,
    redirect: { path: '/home/dashboard' },
  },
  {
    name: 'login',
    path: '/login',
    hidden: true,
    meta: {
      title: '登录页'
    },
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/login.vue'),
  },
  {
    name: 'home',
    path: '/home',
    meta: {
      title: 'home'
    },
    component: layout,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        meta: {
          title: '欢迎页'
        },
        component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/dashboard/dashboard.vue'),
      }
    ]
  },
]
