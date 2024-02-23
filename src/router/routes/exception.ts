import type { RouteRecordRaw } from 'vue-router'
import { UserRole } from '@/interfaces/constant/magicNumberUser'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // @ts-ignore
    component: () => import('@/views/NotFoundView/NotFoundView.vue'),
    meta: {
      title: '404 Not Found',
      isAuthRequired: false,
      isShowFooter: false,
      isShowHeader: false,
      role: UserRole.GUEST
    } as RouteMetaProvider
  }
]

export default routes
