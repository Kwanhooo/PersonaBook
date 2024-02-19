<script setup lang="ts">
import { computed } from 'vue'
import { isUserLoggedIn } from '@/utils/storeHelper'
import $router from '@/router'
import { useUserStore } from '@/stores/modules/userStore'

const userStore = useUserStore()

const userNickname = computed(() => userStore.user.nickname || '未登录')

// 退出登录
const handleLogout = () => {
  userStore.logout()
}

// 跳转到个人中心
const goToProfile = () => {
  $router.push('/profile')
}

</script>

<template>
  <div class="header-wrapper">
    <div class="logo ar-center">
      <img src="../../assets/svg/logo.svg" alt="logo" class="logo-img" />
      <span class="title">智慧图书馆</span>
    </div>
    <div class="slogan ar-center">
      <el-text type="info">给孩子一个有温度的阅读平台</el-text>
    </div>
    <div class="auth-controller ar-center">
      <el-button v-if="!isUserLoggedIn()" type="primary" size="large">免费注册</el-button>
      <el-button v-if="!isUserLoggedIn()" size="large" @click="$router.push('/auth')">立即登录</el-button>
      <div v-else>
        <el-popover placement="bottom" trigger="hover">
          <p>
            <el-button type="text">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span style="margin-left: 20px" @click="goToProfile()">个人中心</span>
            </el-button>
          </p>
          <p>
            <el-button type="text" @click="handleLogout()">
              <el-icon>
                <Switch />
              </el-icon>
              <span style="margin-left: 20px">退出登录</span>
            </el-button>
          </p>
          <template #reference>
            <span style="cursor: pointer;">
              <span class="theme-text" style="font-weight: bold">
                {{ userNickname }}
              </span>
            </span>
          </template>
        </el-popover>
        <span>&nbsp;&nbsp;同学，你好</span>
      </div>
    </div>
  </div>
  <div class="placeholder-block"></div>
</template>

<style scoped lang="scss">
@import "./BaseHeader";
</style>
