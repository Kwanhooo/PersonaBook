import type { RouteRecordRaw } from 'vue-router'
import { UserRole } from '@/interfaces/constant/magicNumberUser'
import adminLogo from '@/assets/svg/logo-admin.svg'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/backstage',
    name: 'backstage',
    component: () => import('@/views/admin/Backstage/BackstageView/BackstageView.vue'),
    meta: {
      title: '图书信息',
      isAuthRequired: true,
      isShowFooter: false,
      isShowHeader: true,
      role: UserRole.ADMIN,
      headerTitle: '后台管理系统',
      headerLogo: adminLogo
    },
    redirect: '/backstage/book-management/book-info',
    children: [
      {
        path: 'book-management',
        name: 'book-management',
        meta: {
          title: '图书管理',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.ADMIN
        },
        redirect: '/backstage/book-management/book-info',
        children: [
          {
            path: 'book-info',
            name: 'book-info',
            component: () => import('@/views/admin/Backstage/BookManagement/BookInfoView/BookInfoView.vue'),
            meta: {
              title: '图书信息',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          },
          {
            path: 'book-category',
            name: 'book-category',
            component: () => import('@/views/admin/Backstage/BookManagement/BookCategoryView/BookCategoryView.vue'),
            meta: {
              title: '图书分类',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          }
        ]
      },
      {
        path: 'portrait-management',
        name: 'portrait-management',
        meta: {
          title: '画像管理',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.ADMIN
        },
        redirect: '/backstage/portrait-management/personal-portrait',
        children: [
          {
            path: 'personal-portrait',
            name: 'personal-portrait',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '个人画像',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          },
          {
            path: 'group-portrait',
            name: 'group-portrait',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '群体画像',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          },
          {
            path: 'knowledge-graph',
            name: 'knowledge-graph',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '知识图谱',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          }
        ]
      },
      {
        path: 'user-management',
        name: 'user-management',
        meta: {
          title: '用户管理',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.ADMIN
        },
        redirect: '/backstage/user-management/students',
        children: [
          {
            path: 'students',
            name: 'students',
            component: () => import('@/views/admin/Backstage/UserMangement/StudentsView/StudentsView.vue'),
            meta: {
              title: '学生管理',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          }
        ]
      },
      {
        path: 'survey-management',
        name: 'survey-management',
        meta: {
          title: '问卷管理',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.ADMIN
        },
        redirect: '/backstage/survey-management/survey-info',
        children: [
          {
            path: 'survey-info',
            name: 'survey-info',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '问卷信息',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          },
          {
            path: 'survey-results',
            name: 'survey-results',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '问卷结果',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          }
        ]
      },
      {
        path: 'rating-management',
        name: 'rating-management',
        meta: {
          title: '评分管理',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.ADMIN
        },
        redirect: '/backstage/rating-management/rating-info',
        children: [
          {
            path: 'rating-info',
            name: 'rating-info',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '评分信息',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          },
          {
            path: 'rating-details',
            name: 'rating-details',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '评分详情',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          }
        ]
      },
      {
        path: 'comment-management',
        name: 'comment-management',
        meta: {
          title: '评论管理',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.ADMIN
        },
        redirect: '/backstage/comment-management/comment-info',
        children: [
          {
            path: 'comment-info',
            name: 'comment-info',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '评论信息',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          },
          {
            path: 'comment-details',
            name: 'comment-details',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '评论详情',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          }
        ]
      },
      {
        path: 'collection-management',
        name: 'collection-management',
        meta: {
          title: '收藏管理',
          isAuthRequired: true,
          isShowFooter: false,
          isShowHeader: true,
          role: UserRole.ADMIN
        },
        redirect: '/backstage/collection-management/collection-info',
        children: [
          {
            path: 'collection-info',
            name: 'collection-info',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '收藏信息',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          },
          {
            path: 'collection-details',
            name: 'collection-details',
            component: () => import('@/views/PlaceholderView/PlaceholderView.vue'),
            meta: {
              title: '收藏详情',
              isAuthRequired: true,
              isShowFooter: false,
              isShowHeader: true,
              role: UserRole.ADMIN
            }
          }
        ]
      }
    ]
  }
]

export default routes
