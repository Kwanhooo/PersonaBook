<script setup lang="ts">
import { defineProps } from 'vue'
import $router from '@/router'

const props = defineProps({
  id: Number,
  title: String,
  subtitle: String,
  cover: String
})

const goToBookDetail = () => {
  // TODO: 图书详情跳转
  console.log('go to book detail', props.id)
  $router.push('/detail?id=' + props.id)
}
</script>

<template>
  <div class="book-component-wrapper">
    <div class="cover-wrapper" @click="goToBookDetail()">
      <img :src="props.cover" alt="cover" class="cover-image" />
    </div>
    <div class="description-wrapper">
      <div class="title" @click="goToBookDetail()">{{ props.title }}</div>
      <div class="subtitle">{{ props.subtitle }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./BookThumbnail";
</style>
