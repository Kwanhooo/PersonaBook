import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.REQUEST_SERVER_URL,
  timeout: import.meta.env.REQUEST_TIMEOUT
})

axiosInstance.interceptors.request.use(
  (config) => {
    // 请求前的配置或逻辑
    // 如果有token，在请求头中加入token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `${token}`
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
console.log('axios实例创建成功', axiosInstance)

export default axiosInstance
