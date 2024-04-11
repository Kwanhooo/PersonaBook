import axiosInstance from '@/config/axios'
import { backendBaseUrl } from '@/config/server'
import { MimeType } from '@/interfaces/constant/mimeType'
import type { ScoreFileParam } from '@/interfaces/ScoreFileParam'
import type { CollectFileParam } from '@/interfaces/CollectFileParam'
import type { GetFileCommentsParam } from '@/interfaces/GetFileCommentsParam'
import type { CommentFileParam } from '@/interfaces/CommentFileParam'

const FileFunctionAPI = {
  getBookDetail: `${backendBaseUrl}/fileFunction/getFileDetail/`,
  scoreFile: `${backendBaseUrl}/fileFunction/scoreFile/`,
  collectFile: `${backendBaseUrl}/fileFunction/collectFile/`,
  getFileComments: `${backendBaseUrl}/fileFunction/getFileComments/`,
  commentFile: `${backendBaseUrl}/fileFunction/commentFile/`
}

export function getBookDetail(bookNo: string) {
  return axiosInstance({
    url: FileFunctionAPI.getBookDetail + bookNo,
    method: 'get'
  })
}

export function scoreFile(data: ScoreFileParam) {
  return axiosInstance({
    url: FileFunctionAPI.scoreFile,
    headers: {
      'Content-Type': MimeType.formData
    },
    method: 'post',
    data: data
  })
}

export function collectFile(data: CollectFileParam) {
  return axiosInstance({
    url: FileFunctionAPI.collectFile,
    headers: {
      'Content-Type': MimeType.formData
    },
    method: 'post',
    data: data
  })
}

export function commentFile(data: CommentFileParam) {
  return axiosInstance({
    url: FileFunctionAPI.commentFile,
    headers: {
      'Content-Type': MimeType.formData
    },
    method: 'post',
    data: data
  })
}

export function getFileComments(data: GetFileCommentsParam) {
  return axiosInstance({
    url: `${FileFunctionAPI.getFileComments}?fileNo=${data.fileNo}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&orderBy=${data.orderBy}`,
    method: 'get'
  })
}
