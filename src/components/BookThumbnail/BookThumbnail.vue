<script setup lang="ts">
import { defineProps } from 'vue'
import $router from '@/router'

const props = defineProps({
  id: Number,
  no: String,
  title: String,
  subtitle: String,
  cover: String,
  popoverMode: {
    required: false,
    type: Boolean,
    default: false
  },
  popoverText: {
    required: false,
    type: String,
    default: ''
  }
})

const goToBookDetail = () => {
  // TODO: 图书详情跳转
  console.log('go to book detail', props.no)
  $router.push('/book-detail?bookNo=' + props.no)
}
</script>

<template>
  <div class="book-component-wrapper">
    <div class="cover-wrapper" @click="goToBookDetail()">
      <img :src="props.cover" alt="cover" class="cover-image" />
    </div>
    <div class="description-wrapper">
      <div class="title clickable" @click="goToBookDetail()">{{ props.title }}</div>
      <el-popover placement="bottom" trigger="hover">
        <p>
          {{ props.popoverText }}
        </p>
        <template #reference>
          <div :class="{'subtitle':true,'clickable':popoverMode,'popoverModeSubtitle':popoverMode}">
            {{ props.subtitle }}
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./BookThumbnail";
</style>
