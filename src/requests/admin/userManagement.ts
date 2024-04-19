import { backendBaseUrl } from '@/config/server'
import axiosInstance from '@/config/axios'
import { MimeType } from '@/interfaces/constant/mimeType'

const UserManagementAPI = {
  deleteUser: `${backendBaseUrl}/admin/user/changeStatus/`
}

export function deleteUser(userId: number) {
  return axiosInstance({
    url: UserManagementAPI.deleteUser + userId,
    method: 'post',
    headers: {
      'Content-Type': MimeType.formData
    },
    data: { status: 3 }
  })
}
