import axiosInstance from '@/config/axios'
import { backendBaseUrl } from '@/config/server'
import type { HomeViewNewBooksParam } from '@/interfaces/HomeViewNewBooksParam'
import type { HomeViewRecommendBooksParam } from '@/interfaces/HomeViewRecommendBooksParam'

const FileListAPI = {
  getFilesByCondition: `${backendBaseUrl}/fileList/getFilesByCondition`
}

/**
 * 获取首页新书速递
 * @param data
 */
export function getHomeViewNewBooks(data: HomeViewNewBooksParam) {
  return axiosInstance({
    url:
      FileListAPI.getFilesByCondition +
      '?pageNum=' +
      data.pageNum +
      '&pageSize=' +
      data.pageSize +
      '&orderBy=' +
      'time',
    method: 'get'
  })
}

/**
 * 获取首页为您推荐
 * @param data
 */
// TODO: 把orderBy改成recommend
export function getHomeViewRecommendBooks(data: HomeViewRecommendBooksParam) {
  return axiosInstance({
    url:
      FileListAPI.getFilesByCondition +
      '?pageNum=' +
      data.pageNum +
      '&pageSize=' +
      data.pageSize +
      '&orderBy=' +
      'time',
    method: 'get'
  })
}
