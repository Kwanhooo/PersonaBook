<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import {
  Collection,
  PictureFilled,
  StarFilled,
  Switch,
  Tickets,
  User
} from '@element-plus/icons-vue'
import $router from '@/router'
import { useRoute } from 'vue-router'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'
import { getPrevRoutePath, getRouteInfoByPath } from '@/utils/routerHelper'

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

const parentRoutePath = computed(() => {
  return getPrevRoutePath($route.path)
})

const parentRouteTitle = computed(() => {
  return getRouteInfoByPath(parentRoutePath.value)?.meta?.title ?? '未知'
})
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
        <el-menu-item index="/no-route" @click="toggleCollapse">
          <el-icon>
            <Switch />
          </el-icon>
          <template #title>{{ isCollapse ? '展开' : '收起' }}</template>
        </el-menu-item>

        <!-- 图书信息管理 -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Collection />
            </el-icon>
            <span>图书管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/book-management/book-info"
            >
              图书信息
            </el-menu-item>
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/book-management/book-category"
            >
              图书分类
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!-- 画像管理 -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <PictureFilled />
            </el-icon>
            <span>画像管理</span>
          </template>
          <el-menu-item-group>
            <!--            <el-menu-item class="menu-item-text-indent" index="/backstage/portrait-management/personal-portrait">-->
            <!--              个人画像-->
            <!--            </el-menu-item>-->
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/portrait-management/group-portrait"
            >
              用户画像
            </el-menu-item>
            <!--            <el-menu-item class="menu-item-text-indent" index="/backstage/portrait-management/knowledge-graph">-->
            <!--              知识图谱-->
            <!--            </el-menu-item>-->
          </el-menu-item-group>
        </el-sub-menu>

        <!-- 用户管理 -->
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="menu-item-text-indent" index="/backstage/user-management/students">
              学生管理
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!-- 问卷管理 -->
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>问卷管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/survey-management/survey-info"
            >
              问卷信息
            </el-menu-item>
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/survey-management/survey-results"
            >
              问卷结果
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!-- 互动管理 -->
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <StarFilled />
            </el-icon>
            <span>互动管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/interact-management/rating-details"
            >
              评分详情
            </el-menu-item>
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/interact-management/comment-details"
            >
              评论详情
            </el-menu-item>
            <el-menu-item
              class="menu-item-text-indent"
              index="/backstage/interact-management/collection-details"
            >
              收藏详情
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>

    <div class="main-wrapper">
      <div class="head-wrapper">
        <el-page-header @back="$router.back()">
          <template #breadcrumb>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item to="/backstage"> 管理员后台 </el-breadcrumb-item>
              <el-breadcrumb-item :to="parentRoutePath">
                {{ parentRouteTitle }}
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
@import './BackstageView';
</style>
