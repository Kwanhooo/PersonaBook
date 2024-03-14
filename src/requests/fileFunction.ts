import axiosInstance from '@/config/axios'
import { backendBaseUrl } from '@/config/server'

const FileFunctionAPI = {
  getBookDetail: `${backendBaseUrl}/fileFunction/getFileDetail/`
}

export function getBookDetail(bookNo: string) {
  return axiosInstance({
    url: FileFunctionAPI.getBookDetail + bookNo,
    method: 'get'
  })
}
