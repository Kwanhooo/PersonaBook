import { useUserStore } from '@/stores/modules/userStore'

// 初始化所有的store
export default function setupStores() {
  useUserStore()
}
