import type { RouteRecordRaw } from 'vue-router'
import { UserRole } from '@/interfaces/constant/magicNumberUser'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'
import HomeView from '@/views/HomeView/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '主页',
      isAuthRequired: false,
      isShowFooter: true,
      isShowHeader: true,
      role: UserRole.GUEST
    } as RouteMetaProvider
  },
  {
    path: '/auth',
    name: 'auth',
    // @ts-ignore
    component: () => import('@/views/AuthView/AuthView.vue'),
    meta: {
      title: '登录',
      isAuthRequired: false,
      isShowFooter: false,
      isShowHeader: false,
      role: UserRole.GUEST
    } as RouteMetaProvider
  }
]

export default routes
