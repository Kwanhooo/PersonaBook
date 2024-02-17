import { defineStore } from 'pinia'
import type { User } from '@/interfaces/entity/User'

export const useUserStore = defineStore({
  id: 'user',

  // state返回一个函数，这个函数返回初始状态对象
  state: () => ({
    user: {} as User
  }),
  getters: {
    getUser: (state => state.user)
  },
  actions: {
    // 用户注册
    register(username: string, password: string, nickname: string) {
      console.log('register', username, password, nickname)
    }
  }
})
