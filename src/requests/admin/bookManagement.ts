import { backendBaseUrl } from '@/config/server'
import axiosInstance from '@/config/axios'
import type { BookManagementGetBooksParam } from '@/interfaces/BookManagementGetBooksParam'

const BookManagementAPI = {
  getBooks: `${backendBaseUrl}/fileList/getFilesByCondition`
}

export function getBooks(data: BookManagementGetBooksParam) {
  return axiosInstance({
    url: BookManagementAPI.getBooks + '?pageNum=' + data.pageNum + '&pageSize=' + data.pageSize + '&orderBy=' + data.orderBy,
    method: 'get'
  })
}
