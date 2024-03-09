import axiosInstance from '@/config/axios'
import { MimeType } from '@/interfaces/constant/mimeType'
import type { LoginParam } from '@/interfaces/LoginParam'
import type { RegisterParam } from '@/interfaces/RegisterParam'
import type { UpdateInfoParam } from '@/interfaces/UpdateInfoParam'

const baseURL = 'http://192.168.43.29:8080'

const UserAPI = {
  register: baseURL + '/account/register',
  login: baseURL + '/account/login',
  info: baseURL + '/account/login_user',
  updateInfo: baseURL + '/account/update_info'
}

/**
 * 注册
 * @param data
 */
export function register(data: RegisterParam) {
  return axiosInstance({
    url: UserAPI.register,
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
    url: UserAPI.login,
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
    url: UserAPI.info,
    headers: {
      'Content-Type': MimeType.json,
      'Authorization': localStorage.getItem('token')
    },
    method: 'post'
  })
}

export function updateInfo(data: UpdateInfoParam) {
  return axiosInstance({
    url: UserAPI.updateInfo,
    headers: {
      'Content-Type': MimeType.json
    },
    method: 'post',
    data: data
  })
}

