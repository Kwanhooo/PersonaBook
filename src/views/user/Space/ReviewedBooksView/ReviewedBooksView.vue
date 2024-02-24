<script setup lang="ts">
import { ref } from 'vue'
import reviewedBooks from '@/mock/reviewed-books.json'
import BookThumbnail from '@/components/BookThumbnail/BookThumbnail.vue'

// 分页组件变量
const currentPage = ref()
const pageSize = ref(20)
const total = ref(1000)

// 分页组件方法
const handleChange = (currentPage: number, pageSize: number) => {
  console.log('currentPage', currentPage)
  console.log('pageSize', pageSize)
}

</script>

<template>
  <div class="reviewed-books-view-wrapper">
    <div class="books-wrapper">
      <BookThumbnail v-for="b in reviewedBooks"
                     v-bind:key="b.id"
                     v-bind:id="b.id"
                     v-bind:title="b.title"
                     v-bind:subtitle="'查看评论'"
                     v-bind:cover="b.cover"
                     v-bind:popover-mode="true"
                     v-bind:popover-text="b.comment"
      />
      <i class="placeholder" v-for="p in 20" v-bind:key="p" />
    </div>
    <div class="pagination-controller-wrapper">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:currentPage="currentPage"
        v-bind:pageSize="pageSize"
        :total="total"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./ReviewedBooksView";
</style>
