import type { RouteRecordRaw } from 'vue-router'
import { UserRole } from '@/interfaces/constant/magicNumberUser'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/space',
    name: 'space',
    // @ts-ignore
    component: () => import('@/views/user/Space/SpaceView/SpaceView.vue'),
    meta: {
      title: '个人中心',
      isAuthRequired: true,
      isShowFooter: false,
      isShowHeader: true,
      role: UserRole.USER
    } as RouteMetaProvider,
    redirect: { name: 'profile-edit' },
    children: [
      {
        path: 'reset-password',
        name: 'reset-password',
        // @ts-ignore
        component: () => import('@/views/user/Space/ResetPasswordView/ResetPasswordView.vue'),
        meta: {
          title: '密码修改',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.USER
        } as RouteMetaProvider
      },
      {
        path: 'profile-edit',
        name: 'profile-edit',
        // @ts-ignore
        component: () => import('@/views/user/Space/ProfileEditView/ProfileEditView.vue'),
        meta: {
          title: '信息修改',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.USER
        } as RouteMetaProvider
      },
      {
        path: 'rated-books',
        name: 'rated-books',
        // @ts-ignore
        component: () => import('@/views/user/Space/RatedBooksView/RatedBooksView.vue'),
        meta: {
          title: '评分图书列表',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.USER
        } as RouteMetaProvider
      },
      {
        path: 'reviewed-books',
        name: 'reviewed-books',
        // @ts-ignore
        component: () => import('@/views/user/Space/ReviewedBooksView/ReviewedBooksView.vue'),
        meta: {
          title: '评论图书列表',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.USER
        } as RouteMetaProvider
      },
      {
        path: 'favorite-books',
        name: 'favorite-books',
        // @ts-ignore
        component: () => import('@/views/user/Space/FavoriteBooksView/FavoriteBooksView.vue'),
        meta: {
          title: '收藏图书列表',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.USER
        } as RouteMetaProvider
      },
      {
        path: 'reading-profile',
        name: 'reading-profile',
        // @ts-ignore
        component: () => import('@/views/user/Space/ReadingProfileView/ReadingProfileView.vue'),
        meta: {
          title: '阅读画像',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.USER
        } as RouteMetaProvider
      },
      {
        path: 'reading-assessment',
        name: 'reading-assessment',
        // @ts-ignore
        component: () => import('@/views/user/Space/ReadingAssessmentView/ReadingAssessmentView.vue'),
        meta: {
          title: '阅读能力测评',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.USER
        } as RouteMetaProvider
      }
    ]
  }
]

export default routes
