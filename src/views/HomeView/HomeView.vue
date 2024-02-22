<script setup lang="ts">
import { ref } from 'vue'
import hotSearch from '@/mock/hot-search-books.json'
import Carousel from '@/components/HomeViewCarousel/HomeViewCarousel.vue'
import { isUserLoggedIn } from '@/utils/storeHelper'
import BookThumbnail from '@/components/BookThumbnail/BookThumbnail.vue'
import recommendBooks from '@/mock/recommend-books.json'
import newBooks from '@/mock/new-books.json'
import $router from '@/router'

const keyword = ref('')

const handleSearch = (k: string) => {
  console.log('search', k)
  // TODO: 搜索结果展示
  $router.push('/search?keyword=' + k)
}
</script>

<template>
  <el-backtop :right="100" :bottom="100" />
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
                         v-bind:key="b.id"
                         v-bind:id="b.id"
                         v-bind:title="b.title"
                         v-bind:author="b.author"
                         v-bind:cover="b.cover"
          />
          <i class="placeholder" v-for="p in 20" v-bind:key="p" />
        </div>
      </div>
      <div class="recommend-wrapper">
        <div class="title">新书速递</div>
        <div class="books-wrapper">
          <BookThumbnail v-for="b in newBooks"
                         v-bind:key="b.id"
                         v-bind:id="b.id"
                         v-bind:title="b.title"
                         v-bind:author="b.author"
                         v-bind:cover="b.cover"
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
