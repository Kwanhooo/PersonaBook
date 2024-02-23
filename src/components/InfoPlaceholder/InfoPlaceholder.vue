<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import type { RouteMetaProvider } from '@/interfaces/application/RouteMetaProvider'

const $route = useRoute()
const routeMeta = ref<RouteMetaProvider>($route.meta as RouteMetaProvider)

watchEffect(() => {
  routeMeta.value = $route.meta as RouteMetaProvider
})
</script>

<template>
  <div class="info-placeholder-wrapper">
    <div>{{ $route.path }}</div>
    <div>{{ routeMeta.title }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "./InfoPlaceholder";
</style>
