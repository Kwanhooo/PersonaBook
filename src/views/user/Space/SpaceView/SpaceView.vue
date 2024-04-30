<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { ChatLineRound, EditPen, Odometer, Setting, Switch, User } from '@element-plus/icons-vue'
import $router from '@/router'
import { useRoute } from 'vue-router'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'

const isCollapse = ref(false)
const $route = useRoute()
const routeMeta = ref<RouteMetaProvider>($route.meta as RouteMetaProvider)

const activeIndex = computed(() => $route.path)

// 如果屏幕宽度小于 768px，自动收起侧边栏
if (window.innerWidth < 768) {
  isCollapse.value = true
}

watchEffect(() => {
  routeMeta.value = $route.meta as RouteMetaProvider
})

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

</script>

<template>
  <div class="space-view-wrapper">
    <div class="navigator-wrapper">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical"
        :collapse="isCollapse"
        :unique-opened="true"
        :router="true"
      >
        <el-menu-item index="/no-route/collapse" @click="toggleCollapse">
          <el-icon>
            <Switch />
          </el-icon>
          <template #title>{{ isCollapse ? '展开' : '收起' }}</template>
        </el-menu-item>
        <el-menu-item index="/space/profile-edit">
          <el-icon>
            <User />
          </el-icon>
          <template #title>信息修改</template>
        </el-menu-item>
        <el-menu-item index="/space/favorite-books">
          <el-icon>
            <Odometer />
          </el-icon>
          <template #title>收藏图书列表</template>
        </el-menu-item>
        <el-menu-item index="/space/reviewed-books">
          <el-icon>
            <ChatLineRound />
          </el-icon>
          <template #title>评论图书列表</template>
        </el-menu-item>
<!--        <el-menu-item index="/space/reading-profile">-->
<!--          <el-icon>-->
<!--            <Setting />-->
<!--          </el-icon>-->
<!--          <template #title>阅读画像</template>-->
<!--        </el-menu-item>-->
        <el-menu-item index="/space/reading-assessment">
          <el-icon>
            <EditPen />
          </el-icon>
          <template #title>阅读能力测评</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-wrapper">
      <div class="head-wrapper">
        <el-page-header @back="$router.back()">
          <template #breadcrumb>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item to="/space">
                个人中心
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                {{ routeMeta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          <template #content>
            <span class="text-large font-600 mr-3">
              {{ routeMeta.title }}
            </span>
          </template>
        </el-page-header>
      </div>
      <div class="content-wrapper">
        <el-backtop target=".content-wrapper" :bottom="100" :right="60"></el-backtop>
        <transition
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./SpaceView";
</style>
