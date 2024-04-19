import { backendBaseUrl } from '@/config/server'
import axiosInstance from '@/config/axios'
import type { GetCollectionListParam } from '@/interfaces/GetCollectionListParam'
import type { GetCommentListParam } from '@/interfaces/GetCommentListParam'
import type { GetScoreListParam } from '@/interfaces/GetScoreListParam'

const InteractManagementAPI = {
  getScoreList: `${backendBaseUrl}/admin/user/getScoreList`,
  getCommentList: `${backendBaseUrl}/admin/user/getCommentList`,
  getCollectionList: `${backendBaseUrl}/admin/user/getCollectionList`
}

export function getScoreList(data: GetScoreListParam) {
  return axiosInstance({
    url: `${InteractManagementAPI.getScoreList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

export function getCommentList(data: GetCommentListParam) {
  return axiosInstance({
    url: `${InteractManagementAPI.getCommentList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

export function getCollectionList(data: GetCollectionListParam) {
  return axiosInstance({
    url: `${InteractManagementAPI.getCollectionList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}
