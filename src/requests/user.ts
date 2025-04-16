import { backendBaseUrl } from '@/config/server'
import type { GetCollectionListParam } from '@/interfaces/GetCollectionListParam'
import axiosInstance from '@/config/axios'
import type { SearchParam } from '@/interfaces/SearchParam'

const UserAPI = {
  getCollectionList: `${backendBaseUrl}/account/getCollections`,
  getComments: `${backendBaseUrl}/account/getComments`,
  search: `${backendBaseUrl}/fileList/getFilesByKeywordSimple`
}

export function getCollectionList(data: GetCollectionListParam) {
  return axiosInstance({
    url: `${UserAPI.getCollectionList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

export function getComments(data: GetCollectionListParam) {
  return axiosInstance({
    url: `${UserAPI.getComments}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

export function search(data: SearchParam) {
  return axiosInstance({
    url: `${UserAPI.search}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&keyword=${data.keyword}`,
    method: 'get'
  })
}
