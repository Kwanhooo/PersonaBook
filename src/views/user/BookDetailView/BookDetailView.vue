<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { Book } from '@/interfaces/entity/Book'
import { useRoute } from 'vue-router'
import { getBookDetail } from '@/requests/fileFunction'
import $router from '@/router'
import { readerBackendUrl } from '@/config/server'

const $route = useRoute()
const value = ref(0)
const bookEntity = ref({
  previewPicture: '',
  fileTitle: '载入中',
  fileAuthor: '载入中',
  fileLikeTimes: 0,
  fileReadTimes: 0,
  fileIsbn: '载入中',
  filePress: '载入中',
  fileTag: '载入中',
  previewRealObject: ''
}) as Ref<Book>

const bookNo = $route.query.bookNo

const initData = () => {
  getBookDetail(typeof bookNo === 'string' ? bookNo : '').then(res => {
    console.log(res.data.data)
    bookEntity.value = res.data.data
  })
}

// 初始化图书详情数据
initData()

const goToReader = () => {
  // $router.push('reader?object=' + encodeURI(bookEntity.value.previewRealObject))
  console.log(bookEntity.value.previewRealObject)
  window.open(`${readerBackendUrl}?bookPath=${encodeURIComponent(bookEntity.value.previewRealObject)}`, '_blank')
}
</script>

<template>
  <div class="book-detail-view-wrapper">
    <div class="top-bar-wrapper">
      <el-button
        color="#2779D6"
        plain style="width: 5rem;height: 2.5rem"
        icon="ArrowLeft"
        @click="$router.back()"
      >
        返回&nbsp;
      </el-button>
    </div>
    <div class="book-info-wrapper">
      <div class="left">
        <img class="cover-image" :src="bookEntity.previewPicture" />
      </div>
      <div class="middle">
        <div class="wrapper">
          <div class="book-name">{{ bookEntity.fileTitle }}</div>
          <div class="favorite-info">
            <div class="group">
              <img class="icon" src="@/assets/svg/icon-heart.svg">
              <div class="amount">{{ bookEntity.fileLikeTimes }}</div>
            </div>
            <div class="group">
              <img class="icon" src="@/assets/svg/icon-read.svg">
              <div class="amount">{{ bookEntity.fileReadTimes }}</div>
            </div>
          </div>
        </div>
        <div class="author">作者：{{ bookEntity.fileAuthor }}</div>
        <el-button color="#2779D6" style="width: 8rem;height: 2.5rem;margin-top: 2rem" @click.prevent="goToReader()">
          阅读本书
        </el-button>
      </div>
      <div class="right">
        <div class="title">读者评分</div>
        <el-rate
          v-model="value"
          disabled
          size="large"
          show-score
          text-color="#ff9900"
          score-template="{value} 分"
        />
      </div>
    </div>
    <div class="detail-info-wrapper">
      <div class="row">
        <div class="key">国际标准书号（ISBN）</div>
        <div class="value">{{ bookEntity.fileIsbn }}</div>
      </div>
      <div class="row">
        <div class="key">出版社</div>
        <div class="value">{{ bookEntity.filePress }}</div>
      </div>
      <div class="row">
        <div class="key">分类号</div>
        <div class="value">{{ bookEntity.fileTag }}</div>
      </div>
    </div>
    <div class="recommend-wrapper"></div>
    <div class="comment-wrapper"></div>
  </div>
</template>

<style scoped lang="scss">
@import "BookDetailView";
</style>
