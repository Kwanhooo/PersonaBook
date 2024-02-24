<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { isUserLoggedIn } from '@/utils/storeHelper'
import $router from '@/router'
import { useUserStore } from '@/stores/modules/userStore'
import { Key, Switch, UserFilled } from '@element-plus/icons-vue'
import { UserRole } from '@/interfaces/constant/magicNumberUser'

const props = defineProps({
  title: String,
  logo: String
})

const userStore = useUserStore()

const userNickname = computed(() => userStore.user.nickname || '未登录')
const userRole = computed(() => userStore.user.role || UserRole.GUEST)

// 退出登录
const handleLogout = () => {
  userStore.logout()
}

// 跳转到个人中心
const goToProfile = () => {
  $router.push('/space')
}

// 跳转到后台
const goToBackstage = () => {
  $router.push('/backstage')
}

</script>

<template>
  <div class="header-wrapper">
    <div class="logo ar-center" @click="$router.push('/')">
      <img :src="props.logo" alt="logo" class="logo-img" />
      <span class="title">{{ props.title }}</span>
    </div>
    <div class="slogan ar-center">
      <el-text type="info">给孩子一个有温度的阅读平台</el-text>
    </div>
    <div class="auth-controller ar-center">
      <el-button v-if="!isUserLoggedIn()" type="primary" size="large">免费注册</el-button>
      <el-button v-if="!isUserLoggedIn()" size="large" @click="$router.push('/auth')">立即登录</el-button>
      <div v-else>
        <el-popover placement="bottom" trigger="hover">
          <p v-if="userRole === UserRole.ADMIN">
            <el-button type="text">
              <el-icon>
                <Key />
              </el-icon>
              <span style="margin-left: 20px" @click="goToBackstage()">管理员后台</span>
            </el-button>
          </p>
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
  <div class="placeholder-block" />
</template>

<style scoped lang="scss">
@import "./BaseHeader";
</style>
