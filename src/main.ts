import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axiosInstance from '@/utils/axios'
import setupStores from '@/stores'

/**
 * Element-plus组件库样式
 */
import 'element-plus/theme-chalk/src/message.scss'

/**
 * 1.创建应用实例
 */
const app = createApp(App)

/**
 * 2.挂载核心插件
 */
app.use(createPinia())
app.use(router)

/**
 * 3.其它初始化
 */
app.provide('$axios', axiosInstance) // 向下提供全局axios实例
setupStores() // 初始化所有的store

/**
 * 4.挂载应用
 */
app.mount('#app')

/**
 * 5.测试参数
 */
localStorage.setItem('token', 'TEST_TOKEN')
