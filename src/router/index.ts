import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import { ElMessage } from 'element-plus'

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

  // 如果要访问的不是/auth路径且没有token，则重定向到登录页；如果有token但是访问的是登录页，则重定向到首页，否则就正常进行路由跳转
  if (to.name !== 'auth' && !token) {
    next({ name: 'auth' })
  } else if (to.name === 'auth' && token) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
