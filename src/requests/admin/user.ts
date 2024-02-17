import axiosInstance from '@/utils/axios'
import { MimeType } from '@/utils/mimeType'
import type { LoginParam } from '@/interfaces/LoginParam'
import type { AdminUserQueryParam } from '@/interfaces/AdminUserQueryParam'
import type { AdminUserDisableParam } from '@/interfaces/AdminUserDisableParam'

const AdminUserAPI = {
  login: '/admin/user/login',
  query: '/admin/user/query',
  disable: '/admin/user/disable'
}

/**
 * 登录
 * @param data
 */
export function login(data: LoginParam) {
  return axiosInstance({
    url: AdminUserAPI.login,
    headers: {
      'Content-Type': MimeType.json
    },
    method: 'post',
    data: data
  })
}

/**
 * 分页查询用户
 * @param data
 */
export function query(data: AdminUserQueryParam) {
  return axiosInstance({
    url: AdminUserAPI.query,
    method: 'get',
    params: data
  })
}

export function disable(data: AdminUserDisableParam) {
  return axiosInstance({
    url: AdminUserAPI.disable,
    headers: {
      'Content-Type': MimeType.json
    },
    method: 'post',
    data: data
  })
}
