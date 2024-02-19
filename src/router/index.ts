import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import HomeView from '@/views/HomeView/HomeView.vue'
import { isUserLoggedIn } from '@/utils/storeHelper'
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
      // @ts-ignore
      component: () => import('@/views/AuthView/AuthView.vue')
    },
    {
      path: '/:pathMatch(.*)*', // 捕获其余所有路径至404
      name: 'not-found',
      // @ts-ignore
      component: () => import('@/views/NotFoundView/NotFoundView.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查localStorage中是否有token
  const isLoggedIn = isUserLoggedIn()

  // 如果登录了，但是去往登录页，直接跳转到首页
  if (isLoggedIn && to.name === 'auth') {
    next({ name: 'home' })
    ElMessage.warning('您已登录，无需再次登录')
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
