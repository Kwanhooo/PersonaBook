<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import BaseHeader from '@/layouts/BaseHeader/BaseHeader.vue'
import BaseFooter from '@/layouts/BaseFooter/BaseFooter.vue'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'
import logo from '@/assets/svg/logo.svg'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 语言设置
const locale = ref(zhCn)

const $route = useRoute()
const routeMeta = ref<RouteMetaProvider>($route.meta as RouteMetaProvider)

const isShowHeader = ref(true)
const isShowFooter = ref(true)
const headerTitle = ref()
const headerLogo = ref()

// 更新页面标题，页眉和页脚的显示状态
watchEffect(() => {
  routeMeta.value = $route.meta as RouteMetaProvider

  document.title = (import.meta.env.MODE === 'development' ? ('[Dev-Mode] ') : '') + (routeMeta.value?.title ?? '载入中') + ' - ' + import.meta.env.VITE_APP_NAME
  isShowHeader.value = routeMeta.value.isShowHeader
  isShowFooter.value = routeMeta.value.isShowFooter
  headerTitle.value = routeMeta.value?.headerTitle ?? import.meta.env.VITE_APP_NAME
  headerLogo.value = routeMeta.value?.headerLogo ?? logo
})
</script>

<template>
  <el-config-provider :locale="locale">
    <BaseHeader v-if="isShowHeader" :title="headerTitle" :logo="headerLogo" />
    <RouterView />
    <BaseFooter v-if="isShowFooter" />
  </el-config-provider>
</template>
