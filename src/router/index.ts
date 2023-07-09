import { createRouter, createWebHashHistory } from 'vue-router'

import LocalCache from '@/utils/cache'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/login', name: 'login', component: () => import('@/views/login/Login.vue') },
    { path: '/main', name: 'main', component: () => import('@/views/main/Main.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: '/notfound',
      component: () => import('@/views/notFound/NotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (to.path === '/main') {
    const token = LocalCache.getCache('RB-cms-Token')

    if (!token) {
      return '/login'
    }
  }
})

export default router
