<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  avatar: String,
  username: String,
  time: String,
  comment: String
})
</script>

<template>
  <div class="comment-item-wrapper">
    <div class="userinfo-wrapper">
      <div class="avatar-wrapper">
        <img class="avatar-img" :src="props.avatar" alt="avatar" />
      </div>
      <div class="username">{{ username }}</div>
      <div class="time">{{ time }}</div>
    </div>
    <div class="content-wrapper">
      <div class="comment">{{ comment }}</div>
    </div>
  </div>
  <hr />
</template>

<style scoped lang="scss">
@import 'CommentItem';
</style>
