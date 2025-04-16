import { backendBaseUrl } from '@/config/server'
import axiosInstance from '@/config/axios'
import type { BookManagementGetBooksParam } from '@/interfaces/BookManagementGetBooksParam'
import { MimeType } from '@/interfaces/constant/mimeType'
import type { UpdateFileInfoParam } from '@/interfaces/UpdateFileInfoParam'
import type { GetTagListParam } from '@/interfaces/GetTagListParam'
import type { AddTagParam } from '@/interfaces/AddTagParam'

const BookManagementAPI = {
  getBooks: `${backendBaseUrl}/fileList/getFilesByCondition`,
  policy: `${backendBaseUrl}/fileIO/policy`,
  updateFileInfo: `${backendBaseUrl}/admin/file/update/`,
  deleteBook: `${backendBaseUrl}/admin/file/changeStatus/`,
  deleteTag: `${backendBaseUrl}/admin/file/changeTagStatus/`,
  getTagList: `${backendBaseUrl}/admin/file/getTagList/`,
  addTag: `${backendBaseUrl}/admin/file/addTag`
}

/**
 * 获取所有图书
 * @param data
 */
export function getBooks(data: BookManagementGetBooksParam) {
  return axiosInstance({
    url:
      BookManagementAPI.getBooks +
      '?pageNum=' +
      data.pageNum +
      '&pageSize=' +
      data.pageSize +
      '&orderBy=' +
      data.orderBy,
    method: 'get'
  })
}

/**
 * 获取上传的凭证policy
 * @param fileInfo
 * @returns {AxiosPromise} 上传凭证
 */
export function policy(fileInfo: any) {
  return axiosInstance({
    url: BookManagementAPI.policy,
    headers: {
      'Content-Type': MimeType.json
    },
    method: 'post',
    data: fileInfo
  })
}

/**
 * 前端上传文件接口（OSS直传）
 * @param payload
 */
export function upload(payload: any) {
  return axiosInstance({
    url: 'https://csu-inheritance.oss-cn-shanghai.aliyuncs.com',
    method: 'post',
    headers: {
      'Content-Type': MimeType.formData
    },
    data: payload
  })
}

export function updateFileInfo(payload: UpdateFileInfoParam) {
  return axiosInstance({
    url: BookManagementAPI.updateFileInfo + payload.fileId,
    method: 'post',
    headers: {
      'Content-Type': MimeType.json
    },
    data: payload
  })
}

export function deleteBook(fileId: number) {
  return axiosInstance({
    url: BookManagementAPI.deleteBook + fileId,
    method: 'post',
    headers: {
      'Content-Type': MimeType.formData
    },
    data: { status: 3 }
  })
}

export function deleteTag(fileId: number) {
  return axiosInstance({
    url: BookManagementAPI.deleteTag + fileId,
    method: 'post',
    headers: {
      'Content-Type': MimeType.formData
    },
    data: { status: 0 }
  })
}

export function addTag(data: AddTagParam) {
  return axiosInstance({
    url: BookManagementAPI.addTag,
    method: 'post',
    headers: {
      'Content-Type': MimeType.json
    },
    data: data
  })
}

export function getTagList(data: GetTagListParam) {
  return axiosInstance({
    url: `${BookManagementAPI.getTagList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get',
    data: data
  })
}
