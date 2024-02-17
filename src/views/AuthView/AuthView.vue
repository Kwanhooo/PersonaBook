<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const activeName = ref('user')

// 表单变量
const username = ref('')
const password = ref('')

const handleTabsClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="auth-view-wrapper">
    <div class="main-wrapper center">
      <div class="title">智慧图书馆登录</div>
      <div class="slogan">给孩子一个有温度的阅读平台</div>
      <div class="form-wrapper">
        <el-tabs v-model="activeName" class="tabs" @tab-click="handleTabsClick">
          <el-tab-pane label="账号密码登录" name="user"></el-tab-pane>
          <el-tab-pane label="管理员登录" name="admin"></el-tab-pane>
        </el-tabs>
        <el-input
          v-model="username"
          size="large"
          placeholder="用户名"
          :prefix-icon="User"
          style="margin-bottom: 1rem"
        />
        <el-input
          v-model="password"
          size="large"
          placeholder="密码"
          :prefix-icon="Lock"
          style="margin-bottom: 2rem"
        />
      </div>
      <div class="button-group-wrapper">
        <el-button type="primary" size="large" style="width: 45%;">登录</el-button>
        <el-button type="primary" size="large" style="width: 45%;">注册</el-button>
      </div>
      <div class="forget-wrapper">
        <el-link>忘记密码</el-link>
      </div>
    </div>
    <div class="footer-wrapper center">
      Copyright© 2024 中南大学开源实验室
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "AuthView";

</style>
