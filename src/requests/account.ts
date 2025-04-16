import axiosInstance from '@/config/axios'
import { MimeType } from '@/interfaces/constant/mimeType'
import type { LoginParam } from '@/interfaces/LoginParam'
import type { RegisterParam } from '@/interfaces/RegisterParam'
import type { UpdateInfoParam } from '@/interfaces/UpdateInfoParam'
import { backendBaseUrl } from '@/config/server'

const AccountAPI = {
  register: `${backendBaseUrl}/account/register`,
  login: `${backendBaseUrl}/account/login`,
  info: `${backendBaseUrl}/account/login_user`,
  updateInfo: `${backendBaseUrl}/account/update_info`
}

/**
 * 注册
 * @param data
 */
export function register(data: RegisterParam) {
  return axiosInstance({
    url: AccountAPI.register,
    headers: {
      'Content-Type': MimeType.formData
    },
    method: 'post',
    data: data
  })
}

/**
 * 登录
 * @param data
 */
export function login(data: LoginParam) {
  return axiosInstance({
    url: AccountAPI.login,
    headers: {
      'Content-Type': MimeType.formData
    },
    method: 'post',
    data: data
  })
}

/**
 * 获取用户信息
 */
export function info() {
  return axiosInstance({
    url: AccountAPI.info,
    headers: {
      'Content-Type': MimeType.json,
      Authorization: localStorage.getItem('token')
    },
    method: 'post'
  })
}

/**
 * 更新用户信息
 * @param data
 */
export function updateInfo(data: UpdateInfoParam) {
  return axiosInstance({
    url: AccountAPI.updateInfo,
    headers: {
      'Content-Type': MimeType.json
    },
    method: 'post',
    data: data
  })
}
