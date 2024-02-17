import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView/AuthView.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查localStorage中是否有token
  const token = localStorage.getItem('token')

  // 如果要访问的不是/auth路径且没有token，则重定向到登录页
  if (to.path !== '/auth' && !token) {
    next('/auth')
  } else {
    // 否则就正常进行路由跳转
    next()
  }
})

export default router
