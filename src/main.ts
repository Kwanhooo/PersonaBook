import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from './App.vue'
import router from './router'
import axiosInstance from '@/config/axios'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import setupStores from '@/stores'

/**
 * Element-plus组件库
 */
import 'element-plus/theme-chalk/src/message.scss'

/**
 * 动画库
 */
import 'animate.css'

/**
 * 1.创建应用实例
 */
const app = createApp(App)

/**
 * 2.挂载核心插件
 */
const pinia = createPinia() // 创建pinia实例
pinia.use(piniaPluginPersistedState) // pinia持久化
app.use(pinia) // 挂载pinia
app.use(router) // 挂载vue路由

/**
 * 3.其它初始化
 */
app.provide('$axios', axiosInstance) // 向下提供全局axios实例
setupStores() // 初始化所有的pinia store

/**
 * 4.挂载应用
 */
app.mount('#app')

/**
 * 5.测试代码
 */
// localStorage.setItem('token', 'TEST_TOKEN')
