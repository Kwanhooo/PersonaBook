<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/userStore'

const activeName = ref('user')
const username = ref('')
const password = ref('')

const handleLogin = () => {
  // 任意为空则不允许登录
  if (!username.value || !password.value) {
    ElMessage.error('用户名或密码不能为空')
    return
  }
  // 调用userStore的登录方法
  useUserStore().login(activeName.value, username.value, password.value)
}

const handleRegister = () => {
  // 任意为空则不允许注册
  if (!username.value || !password.value) {
    ElMessage.error('用户名或密码不能为空')
    return
  }
  // 调用userStore的注册方法
  useUserStore().register(username.value, password.value, '读者')
}

// TODO: 在生产环境中删除 - 模拟登录
const handleMockLogin = () => {
  // 是否按住了ctrl键
  // @ts-ignore
  const isCtrl = event.ctrlKey
  if (!isCtrl) useUserStore().mockLogin()
  else useUserStore().mockAdminLogin()
}

// TODO: 在生产环境中删除 - 模拟登录提示信息
ElMessage.warning({
  duration: 10000,
  message: '[Dev-Mode] 点击忘记密码，以“普通用户”身份登录'
})
ElMessage.warning({
  duration: 10000,
  message: '[Dev-Mode] 按住CTRL键，并点击忘记密码，以“管理员”身份登录'
})
</script>

<template>
  <div class="auth-view-wrapper">
    <div class="main-wrapper center">
      <div class="title">智慧图书馆 登录</div>
      <div class="slogan">
        <el-text type="info">给孩子一个有温度的阅读平台</el-text>
      </div>
      <div class="form-wrapper">
        <el-tabs v-model="activeName" class="tabs">
          <el-tab-pane label="账号密码登录" name="user"></el-tab-pane>
          <el-tab-pane label="管理员登录" name="admin"></el-tab-pane>
        </el-tabs>
        <el-input
          v-model="username"
          size="large"
          placeholder="用户名"
          prefix-icon="User"
          style="margin-bottom: 1rem"
        />
        <el-input
          type="password"
          v-model="password"
          size="large"
          placeholder="密码"
          prefix-icon="Lock"
          style="margin-bottom: 2rem"
        />
      </div>
      <div class="button-group-wrapper">
        <el-button type="primary" size="large" style="width: 45%" @click="handleLogin()"
          >登录</el-button
        >
        <el-button
          :disabled="activeName === 'admin'"
          size="large"
          style="width: 45%"
          @click="handleRegister()"
          >注册
        </el-button>
      </div>
      <div class="forget-wrapper">
        <el-link @click="handleMockLogin()">忘记密码</el-link>
      </div>
    </div>
    <div class="footer-wrapper center">
      <div>Copyright© 2024 中南大学开源实验室</div>
      <div style="margin-top: 0.5rem">粤ICP备2022013690号-2</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'AuthView';
</style>
