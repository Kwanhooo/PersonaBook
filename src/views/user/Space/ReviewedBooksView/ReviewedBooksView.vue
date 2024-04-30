<script setup lang="ts">
import { ref } from 'vue'
import $router from '@/router'
import { getComments } from '@/requests/user'
import type { GetCommentListParam } from '@/interfaces/GetCommentListParam'


// 分页组件变量
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

const records = ref()

// 分页组件方法
const handleChange = (currentPage: number, pageSize: number) => {
  console.log('currentPage', currentPage)
  console.log('pageSize', pageSize)
}

const goToDetail = (fileNo) => {
  $router.push('/book-detail?bookNo=' + fileNo)
}

const refreshData = () => {
  const getCommentsParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  } as GetCommentListParam
  getComments(getCommentsParam).then(res => {
    total.value = res.data.data.total
    records.value = res.data.data.records
  })
}

refreshData()
</script>

<template>
  <div class="reviewed-books-view-wrapper">
    <div class="books-wrapper">
      <div class="review-item" v-for="i in records" v-bind:key="i.id">
        <div class="avatar-wrapper">
          <img class="avatar-img" src="https://asset.0xcafebabe.cn/test.png">
        </div>
        <div class="comment-wrapper">
          <div class="username">{{ i.name }}</div>
          <div class="comment">{{ i.commentContent }}</div>
          <div class="time">{{ i.commentTime }}</div>
        </div>
        <img @click="goToDetail(i.fileNo)" class="book-cover" :src="i.previewPicture">
      </div>
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
