import { useUserStore } from '@/stores/modules/userStore'

export function isUserLoggedIn() {
  const userStore = useUserStore()
  return localStorage.getItem('token') && Object.keys(userStore.user).length > 0
  // return true
}
