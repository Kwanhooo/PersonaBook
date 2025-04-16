import { useUserStore } from '@/stores/modules/userStore'
import { UserRole } from '@/interfaces/constant/magicNumberUser'

/**
 * 判断用户是否登录
 */
export function isUserLoggedIn() {
  const userStore = useUserStore()
  return localStorage.getItem('token') && Object.keys(userStore.user).length > 0
}

/**
 * 获取登录用户的角色
 */
export function getUserRole() {
  const userStore = useUserStore()
  return userStore.user.role
}

/**
 * 比较用户角色权限
 * @param requiredRole
 * @param actualRole
 */
export function hasPermission(requiredRole: string, actualRole: string) {
  if (requiredRole === UserRole.GUEST) return true
  if (requiredRole === UserRole.ADMIN && actualRole === UserRole.ADMIN) return true
  return (
    requiredRole === UserRole.USER &&
    (actualRole === UserRole.ADMIN || actualRole === UserRole.USER)
  )
}
