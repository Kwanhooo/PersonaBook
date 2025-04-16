<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { SearchParam } from '@/interfaces/SearchParam'
import BookThumbnail from '@/components/BookThumbnail/BookThumbnail.vue'
import { search } from '@/requests/user'
import hotSearch from '@/mock/hot-search-books.json'
import $router from '@/router'

const $route = useRoute()

const keyword = ref()

keyword.value = $route.query.keyword

// 分页组件变量
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 分页组件方法
const handleChange = (currentPage: number, pageSize: number) => {
  console.log('currentPage', currentPage)
  console.log('pageSize', pageSize)
}

const handleSearch = (k: string) => {
  keyword.value = k
  console.log('search', k)
  // TODO: 搜索结果展示
  $router.push('/search?keyword=' + k)
  refreshData()
}

const records = ref()

const refreshData = () => {
  const searchParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    keyword: keyword.value
  } as SearchParam
  search(searchParam).then((res) => {
    records.value = res.data.data
    total.value = res.data.data.length
  })
}

refreshData()
</script>

<template>
  <div class="search-view-wrapper">
    <div class="search-wrapper">
      <el-input
        v-model="keyword"
        placeholder="输入书名/作者/ISBN编号"
        class="input-with-select"
        size="large"
      >
        <template #prepend>
          <el-button icon="Search" />
        </template>
        <template #append>
          <el-button @click="handleSearch(keyword)">搜索</el-button>
        </template>
      </el-input>
    </div>
    <div class="hot-wrapper">
      <span class="title">热门搜索</span>
      <el-link
        v-for="k in hotSearch"
        v-bind:key="k"
        style="margin-right: 1rem"
        @click="handleSearch(k)"
      >
        {{ k }}
      </el-link>
    </div>
    <hr class="divider" />

    <div class="title" style="margin: 1.5rem 0">搜索结果</div>
    <div class="books-wrapper">
      <BookThumbnail
        v-for="b in records"
        v-bind:key="b.id"
        v-bind:id="b.fileNo"
        v-bind:no="b.fileNo"
        v-bind:subtitle="b.fileAuthor"
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
@import 'SearchView';
</style>
