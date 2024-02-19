import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PRODUCTION_SERVER_URL, REQUEST_TIMEOUT } from '@/config/server'

const axiosInstance = axios.create({
  baseURL: PRODUCTION_SERVER_URL,
  timeout: REQUEST_TIMEOUT
})

axiosInstance.interceptors.request.use(
  (config) => {
    // 请求前的配置或逻辑
    // 如果有token，在请求头中加入token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // 响应的处理
    // 输出debug信息，包含请求的url、请求参数、响应数据
    console.log('url:', response.config.url)
    console.log('params:', response.config.params)
    console.log('response:', response.data)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 测试是否已经有axios实例
console.debug('axios实例创建成功', axiosInstance)

export default axiosInstance
