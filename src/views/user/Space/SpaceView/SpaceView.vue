<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { ChatLineRound, EditPen, Odometer, Setting, Switch, User } from '@element-plus/icons-vue'
import $router from '@/router'
import { useRoute } from 'vue-router'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'

const isCollapse = ref(false)
const $route = useRoute()
const routeMeta = ref<RouteMetaProvider>($route.meta as RouteMetaProvider)

const handleSelect = (index: string) => {
  if (index === 'collapse') {
    isCollapse.value = !isCollapse.value
  } else {
    $router.push({ name: index })
  }
}

watchEffect(() => {
  routeMeta.value = $route.meta as RouteMetaProvider
})

</script>

<template>
  <div class="space-view-wrapper">
    <div class="navigator-wrapper">
      <el-menu
        default-active="profile-edit"
        class="el-menu-vertical"
        :collapse="isCollapse"
        @select="handleSelect"
      >
        <el-menu-item index="collapse">
          <el-icon>
            <Switch />
          </el-icon>
          <template #title>{{ isCollapse ? '展开' : '收起' }}</template>
        </el-menu-item>
        <el-menu-item index="profile-edit">
          <el-icon>
            <User />
          </el-icon>
          <template #title>信息修改</template>
        </el-menu-item>
        <el-menu-item index="rated-books">
          <el-icon>
            <Odometer />
          </el-icon>
          <template #title>评分图书列表</template>
        </el-menu-item>
        <el-menu-item index="reviewed-books">
          <el-icon>
            <ChatLineRound />
          </el-icon>
          <template #title>评论图书列表</template>
        </el-menu-item>
        <el-menu-item index="reading-profile">
          <el-icon>
            <Setting />
          </el-icon>
          <template #title>阅读画像</template>
        </el-menu-item>
        <el-menu-item index="reading-assessment">
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
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./SpaceView";
</style>
