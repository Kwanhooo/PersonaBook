import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// @ts-ignore
import HomeView from '@/views/HomeView/HomeView.vue'
import { getUserRole, hasPermission, isUserLoggedIn } from '@/utils/storeHelper'
import { ElMessage } from 'element-plus'
import { UserRole } from '@/interfaces/constant/magicNumberUser'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'

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
  },
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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // @ts-ignore
    component: () => import('@/views/NotFoundView/NotFoundView.vue'),
    meta: {
      title: '404 Not Found',
      isAuthRequired: false,
      isShowFooter: false,
      isShowHeader: true,
      role: UserRole.GUEST
    } as RouteMetaProvider
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
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
