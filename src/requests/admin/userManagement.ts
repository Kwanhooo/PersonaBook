import { backendBaseUrl } from '@/config/server'
import axiosInstance from '@/config/axios'
import { MimeType } from '@/interfaces/constant/mimeType'
import type { GetUserListParam } from '@/interfaces/entity/GetUserListParam'

const UserManagementAPI = {
  getUserList: `${backendBaseUrl}/admin/user/getUserList`,
  deleteUser: `${backendBaseUrl}/admin/user/changeStatus/`
}

export function getUserList(data: GetUserListParam) {
  return axiosInstance({
    url: `${UserManagementAPI.getUserList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}

export function deleteUser(userId: number) {
  return axiosInstance({
    url: UserManagementAPI.deleteUser + userId,
    method: 'post',
    headers: {
      'Content-Type': MimeType.formData
    },
    data: { status: 0 }
  })
}
