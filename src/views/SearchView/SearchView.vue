<script setup lang="ts">
import { useRoute } from 'vue-router'
import { type Ref, ref } from 'vue'
import type { Book } from '@/interfaces/entity/Book'

const $route = useRoute()

const keyword = $route.query.keyword

const records = ref([
  {
    fileId: 1,
    fileNo: 11,
    fileTitle: '标题',
    fileAuthor: '作者',
    previewPicture: 'https://asset.0xcafebabe.cn/demo-cover.jpg'
  }
]) as Ref<Array<Book>>
</script>

<template>
  <div class="search-view-wrapper">
    <div class="result-block" v-for="item in records" v-bind:key="item.fileId">
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SearchView";
</style>
