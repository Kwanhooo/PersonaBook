import { useUserStore } from '@/stores/modules/userStore'
import { UserRole } from '@/interfaces/constant/magicNumberUser'

export function isUserLoggedIn() {
  const userStore = useUserStore()
  return localStorage.getItem('token') && Object.keys(userStore.user).length > 0
}

export function getUserRole() {
  const userStore = useUserStore()
  return userStore.user.role
}

export function hasPermission(requiredRole: string, actualRole: string) {
  if (requiredRole === UserRole.GUEST) return true
  if (requiredRole === UserRole.ADMIN && actualRole === UserRole.ADMIN) return true
  return requiredRole === UserRole.USER && (actualRole === UserRole.ADMIN || actualRole === UserRole.USER)
}
