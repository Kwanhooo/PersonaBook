import $router from '@/router'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 获取某个路由的上一层路由
 * @param route
 */
export const getPrevRoutePath = (route: string) => {
  const routeArr = route.split('/')
  routeArr.pop()
  return routeArr.join('/')
}

/**
 * 查找路由信息（不可外部依赖）
 * @param routes 路由数组
 * @param path 查找的路径
 */
function findRouteByPath(routes: RouteRecordRaw[], path: string): RouteRecordRaw | null {
  for (const route of routes) {
    // 检查当前路由是否匹配
    if (route.path === path) {
      return {
        path: route.path,
        name: route.name,
        meta: route.meta
        // 根据需要添加更多属性
      } as RouteRecordRaw
    }
    // 如果当前路由有子路由，递归搜索子路由
    if (route.children && route.children.length > 0) {
      const foundRoute = findRouteByPath(route.children, path)
      if (foundRoute) {
        return foundRoute
      }
    }
  }
  return null // 如果没有找到匹配的路由，返回null
}

/**
 * 通过路径递归获取路由信息
 * @param path 路径
 */
export function getRouteInfoByPath(path: string): RouteRecordRaw | null {
  const allRoutes: RouteRecordRaw[] = $router.getRoutes()
  return findRouteByPath(allRoutes, path)
}
