import { createRouter, createWebHistory } from 'vue-router'
import { getUserRole, hasPermission, isUserLoggedIn } from '@/utils/storeHelper'
import { ElMessage } from 'element-plus'
import { UserRole } from '@/interfaces/constant/magicNumberUser'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/no-route')) {
    next(false) // 取消当前路由导航
    return
  }

  const isLoggedIn = isUserLoggedIn() // 检查用户是否登录

  // 获取目标路由的 meta 数据
  const isAuthRequired = to.meta.isAuthRequired || false
  const requiredRole = typeof to.meta.role === 'string' ? to.meta.role : 'ANY'
  const isGoingToLoginPage = to.name === 'auth'
  const userRole = isLoggedIn ? getUserRole() : UserRole.GUEST

  // 如果用户已登录但尝试访问登录页面，则重定向到首页
  if (isLoggedIn && isGoingToLoginPage) {
    next({ name: 'home' })
    ElMessage.warning('您已登录，无需再次登录')
    return
  }

  // 如果目标路由需要认证但用户未登录
  if (isAuthRequired && !isLoggedIn) {
    next({ name: 'auth' })
    ElMessage.warning('请先登录')
    return
  }

  // 如果目标路由需要特定角色，使用 hasPermission 判断用户是否有权限访问
  if (isAuthRequired && isLoggedIn && !hasPermission(requiredRole, userRole)) {
    next({ name: 'not-found' })
    ElMessage.error('您所在的用户组无权访问该页面')
    return
  }

  // 其他情况，继续路由
  next()
})

export default router
