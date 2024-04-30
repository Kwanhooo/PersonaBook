<script setup lang="ts">
import { ref } from 'vue'
import BookThumbnail from '@/components/BookThumbnail/BookThumbnail.vue'
import { getCollectionList } from '@/requests/user'
import type { GetCollectionListParam } from '@/interfaces/GetCollectionListParam'

// 分页组件变量
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 分页组件方法
const handleChange = (currentPage: number, pageSize: number) => {
  console.log('currentPage', currentPage)
  console.log('pageSize', pageSize)
}

const records = ref()

const refreshData = () => {
  const getCollectionListParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  } as GetCollectionListParam
  getCollectionList(getCollectionListParam).then(res => {
    records.value = res.data.data.records
    total.value = res.data.data.total
  })
}

refreshData()
</script>

<template>
  <div class="favorite-books-view-wrapper">
    <div class="books-wrapper">
      <BookThumbnail v-for="b in records"
                     v-bind:key="b.id"
                     v-bind:id="b.fileNo"
                     v-bind:no="b.fileNo"
                     v-bind:title="b.fileTitle"
                     v-bind:cover="b.previewPicture"
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
@import "FavoriteBooksView";
</style>
