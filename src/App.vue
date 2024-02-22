<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import BaseHeader from '@/layouts/BaseHeader/BaseHeader.vue'
import BaseFooter from '@/layouts/BaseFooter/BaseFooter.vue'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'

const route = useRoute()

const isShowHeader = ref(true)
const isShowFooter = ref(true)

// 更新页面标题，页眉和页脚的显示状态
watchEffect(() => {
  let routeMeta = route.meta as RouteMetaProvider

  document.title = (import.meta.env.MODE === 'development' ? ('(dev) ') : '') + routeMeta.title + ' - ' + import.meta.env.VITE_APP_NAME
  isShowHeader.value = routeMeta.isShowHeader
  isShowFooter.value = routeMeta.isShowFooter
})
</script>

<template>
  <BaseHeader v-if="isShowHeader" />
  <RouterView />
  <BaseFooter v-if="isShowFooter" />
</template>
