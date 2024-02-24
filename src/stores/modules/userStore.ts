import { defineStore } from 'pinia'
import type { User } from '@/interfaces/entity/User'
import { login as userLogin, register as userRegister } from '@/requests/user'
import { login as adminLogin } from '@/requests/admin/user'
import $router from '@/router'
import { ElMessage } from 'element-plus'
import { UserRole, UserValid } from '@/interfaces/constant/magicNumberUser'

export const useUserStore = defineStore({
  id: 'userStore',
  persist: true, // 启用持久化
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
          ElMessage.success(this.user.nickname + '，欢迎回来！')
        })
      } else {
        adminLogin(loginParam).then((res) => {
          if (res.data.code !== 0) {
            console.log(res.data.message)
            return
          }
          // 登录成功，将用户信息保存到store中
          this.user = res.data.data
          // 跳转主页
          $router.push('/')
          ElMessage.success('管理员 ' + this.user.nickname + '，欢迎回来！')
        })
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
        ElMessage.success(this.user.nickname + '，欢迎加入智慧图书馆！')
      })
    },
    // 用户注销
    logout() {
      // 清空用户信息
      this.user = {} as User
      // 清空token
      localStorage.removeItem('token')
      // 跳转首页
      $router.push('/')
      ElMessage.success('您现已退出登录！')
    },
    // TODO: 生产环境中移除 - 模拟登录
    mockLogin() {
      this.user = {
        username: 'dev-user-8209200504',
        role: UserRole.USER,
        is_valid: UserValid.VALID,
        nickname: '李菌耗'
      }
      localStorage.setItem('token', 'TEST_TOKEN')
      $router.push('/')
      ElMessage.success(this.user.nickname + '，欢迎回来！')
    },
    mockAdminLogin() {
      this.user = {
        username: 'dev-admin-0000000001',
        role: UserRole.ADMIN,
        is_valid: UserValid.VALID,
        nickname: '管理员'
      }
      localStorage.setItem('token', 'ADMIN_TEST_TOKEN')
      $router.push('/')
      ElMessage.success(this.user.nickname + '，欢迎回来！')
    }
  }
})
