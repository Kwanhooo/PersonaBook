<script setup lang="ts">
import { type Ref, ref } from 'vue'
import hotSearch from '@/mock/hot-search-books.json'
import Carousel from '@/components/HomeViewCarousel/HomeViewCarousel.vue'
import { isUserLoggedIn } from '@/utils/storeHelper'
import BookThumbnail from '@/components/BookThumbnail/BookThumbnail.vue'
import $router from '@/router'
import type { HomeViewNewBooksParam } from '@/interfaces/HomeViewNewBooksParam'
import { getHomeViewNewBooks } from '@/requests/fileList'
import type { Book } from '@/interfaces/entity/Book'

const keyword = ref('') as Ref<string>
const newBooks = ref([]) as Ref<Book[]>
const recommendBooks = ref([]) as Ref<Book[]>

const handleSearch = (k: string) => {
  console.log('search', k)
  // TODO: 搜索结果展示
  $router.push('/search?keyword=' + k)
}

const initNewBooksData = () => {
  const newBooksParam = {
    pageNum: 1,
    pageSize: 10
  } as HomeViewNewBooksParam

  getHomeViewNewBooks(newBooksParam).then((res) => {
    console.log(res.data.data.records)
    newBooks.value = res.data.data.records
  })
}

const initRecommendBooksData = () => {
  if (!isUserLoggedIn()) return
  const recommendBooksParam = {
    pageNum: 1,
    pageSize: 10
  } as HomeViewNewBooksParam

  getHomeViewNewBooks(recommendBooksParam).then((res) => {
    console.log(res.data.data.records)
    recommendBooks.value = res.data.data.records
  })
}

// 初始化新书速递数据
initNewBooksData()
// 初始化为您推荐数据
initRecommendBooksData()

</script>

<template>
  <el-backtop :right="60" :bottom="100" />
  <div class="home-wrapper">
    <div class="main-wrapper">
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
          style="margin-right: 1rem;"
          @click="handleSearch(k)">
          {{ k }}
        </el-link>
      </div>
      <hr class="divider">
      <Carousel />
      <div v-if="isUserLoggedIn()" class="recommend-wrapper">
        <div class="title">为您推荐</div>
        <div class="books-wrapper">
          <BookThumbnail v-for="b in recommendBooks"
                         v-bind:key="b.fileId"
                         v-bind:id="b.fileId"
                         v-bind:title="b.fileTitle"
                         v-bind:subtitle="b.fileAuthor"
                         v-bind:cover="b.previewPicture"
          />
          <i class="placeholder" v-for="p in 20" v-bind:key="p" />
        </div>
      </div>
      <div class="recommend-wrapper">
        <div class="title">新书速递</div>
        <div class="books-wrapper">
          <BookThumbnail v-for="b in newBooks"
                         v-bind:key="b.fileId"
                         v-bind:id="b.fileId"
                         v-bind:title="b.fileTitle"
                         v-bind:subtitle="b.fileAuthor"
                         v-bind:cover="b.previewPicture"
          />
          <i class="placeholder" v-for="p in 10" v-bind:key="p" />
        </div>
      </div>
      <div>

      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import './HomeView';
</style>
