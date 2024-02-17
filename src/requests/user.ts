import axiosInstance from '@/utils/axios'
import { MimeType } from '@/utils/mimeType'
import type { User } from '@/interfaces/user'
import type { LoginParam } from '@/interfaces/LoginParam'

const UserAPI = {
  register: '/user/register',
  login: '/user/login',
  info: '/user/info'
}

/**
 * 注册
 * @param data
 */
export function register(data: User) {
  return axiosInstance({
    url: UserAPI.register,
    headers: {
      'Content-Type': MimeType.json
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
      'Content-Type': MimeType.json
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
    method: 'get'
  })
}
