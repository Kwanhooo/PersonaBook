import { defineStore } from 'pinia'
import type { User } from '@/interfaces/entity/User'
import { login as userLogin, register as userRegister } from '@/requests/user'
import { login as adminLogin } from '@/requests/admin/user'
import $router from '@/router'

export const useUserStore = defineStore({
  id: 'userStore',

  // state返回一个函数，这个函数返回初始状态对象
  state: () => ({
    user: {} as User
  }),
  getters: {
    getUser: (state => state.user)
  },
  actions: {
    // 用户登录
    login(role: string, username: string, password: string) {
      // 打包一个LoginParam对象
      const loginParam = {
        username: username,
        password: password
      }
      // 发送请求
      if (role === 'user') {
        userLogin(loginParam).then((res) => {
          if (res.data.code !== 0) {
            console.log(res.data.message)
            return
          }
          // 登录成功，将用户信息保存到store中
          this.user = res.data.data
          // 跳转主页
          $router.push('/')
        })
      } else {
        adminLogin(loginParam)
      }
    },
    // 用户注册
    register(username: string, password: string, nickname: string) {
      // 打包一个RegisterParam对象
      const registerParam = {
        username: username,
        password: password,
        nickname: nickname
      }
      // 发送请求
      userRegister(registerParam).then((res) => {
        if (res.data.code !== 0) {
          console.log(res.data.message)
          return
        }
        // 注册成功，将用户信息保存到store中
        this.user = res.data.data
        // 跳转主页
        $router.push('/')
      })
    }
  }
})
