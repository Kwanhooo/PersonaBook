<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { Book } from '@/interfaces/entity/Book'
import { useRoute } from 'vue-router'
import {
  collectFile,
  commentFile,
  getBookDetail,
  getFileComments,
  scoreFile
} from '@/requests/fileFunction'
import $router from '@/router'
import { readerBackendUrl } from '@/config/server'
import { ChatDotRound, ChatLineRound, ChatRound } from '@element-plus/icons-vue'
import type { ScoreFileParam } from '@/interfaces/ScoreFileParam'
import { ElMessage } from 'element-plus'
import type { CollectFileParam } from '@/interfaces/CollectFileParam'
import CommentItem from '@/components/CommentItem/CommentItem.vue'
import type { GetFileCommentsParam } from '@/interfaces/GetFileCommentsParam'
import type { CommentFileParam } from '@/interfaces/CommentFileParam'

const $route = useRoute()
const myRate = ref(0)
const readerRate = ref(0)
const commentAmount = ref(0)
const commentPageSize = ref(5)
const commentCurrentPage = ref(1)
const commentRecords = ref()
const myComment = ref('')
const bookEntity = ref({
  previewPicture: '',
  fileTitle: '载入中',
  fileAuthor: '载入中',
  fileCollectTimes: 0,
  fileReadTimes: 0,
  fileIsbn: '载入中',
  filePress: '载入中',
  fileTag: '载入中',
  previewRealObject: ''
}) as Ref<Book>

const bookNo = $route.query.bookNo

const initComments = () => {
  const getCommentParam = {
    fileNo: bookNo,
    pageNum: commentCurrentPage.value,
    pageSize: commentPageSize.value,
    orderBy: 'time'
  } as GetFileCommentsParam

  getFileComments(getCommentParam).then((res) => {
    console.log(res.data.data)
    commentRecords.value = res.data.data.records
    commentAmount.value = res.data.data.total
  })
}

const initData = () => {
  getBookDetail(typeof bookNo === 'string' ? bookNo : '').then((res) => {
    console.log(res.data.data)
    bookEntity.value = res.data.data

    if (bookEntity.value.userScore == null) myRate.value = 0
    else myRate.value = bookEntity.value.userScore

    readerRate.value = bookEntity.value.fileHiddenScore
  })

  initComments()
}

// 初始化图书详情数据
initData()

const goToReader = () => {
  // $router.push('reader?object=' + encodeURI(bookEntity.value.previewRealObject))
  console.log(bookEntity.value.previewRealObject)
  window.open(
    `${readerBackendUrl}?bookPath=${encodeURIComponent(bookEntity.value.previewRealObject)}`,
    '_blank'
  )
}

const icons = [ChatRound, ChatLineRound, ChatDotRound]

const handleSubmitRate = () => {
  const data = {
    fileNo: bookNo,
    score: myRate.value
  } as ScoreFileParam
  scoreFile(data).then((res) => {
    if (res.data.code === 1) ElMessage.error(res.data.message)
    else {
      ElMessage.success(res.data.data)
      bookEntity.value.userScore = myRate.value
    }
  })
}

const handleSubmitCollect = () => {
  const data = {
    fileNo: bookNo
  } as CollectFileParam
  collectFile(data).then((res) => {
    if (res.data.code === 1) ElMessage.error(res.data.message)
    else {
      if (res.data.data === '收藏成功') {
        ElMessage.success(res.data.data)
        bookEntity.value.fileCollectTimes++
        bookEntity.value.userCollectStatus = true
      } else {
        ElMessage.success(res.data.data)
        bookEntity.value.fileCollectTimes--
        bookEntity.value.userCollectStatus = false
      }
    }
  })
}

const handleCommentCurrentChange = (val: number) => {
  commentCurrentPage.value = val
}

const handleCommentSend = () => {
  const commentFileParam = {
    fileNo: bookNo,
    content: myComment.value
  } as CommentFileParam
  commentFile(commentFileParam).then((res) => {
    console.log(res.data.data)
    initComments()
  })
}
</script>

<template>
  <div class="book-detail-view-wrapper">
    <div class="top-bar-wrapper">
      <el-button
        color="#2779D6"
        plain
        style="width: 5rem; height: 2.5rem"
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
              <img
                v-if="!bookEntity.userCollectStatus"
                class="icon"
                src="@/assets/svg/icon-star-empty.svg"
                style="cursor: pointer"
                @click="handleSubmitCollect()"
              />
              <img
                v-else
                class="icon"
                src="@/assets/svg/icon-star.svg"
                style="cursor: pointer"
                @click="handleSubmitCollect()"
              />
              <div class="amount">{{ bookEntity.fileCollectTimes }}</div>
            </div>
            <div class="group">
              <img class="icon" src="@/assets/svg/icon-read.svg" />
              <div class="amount">{{ bookEntity.fileReadTimes }}</div>
            </div>
          </div>
        </div>
        <div class="author">作者：{{ bookEntity.fileAuthor }}</div>
        <el-button
          color="#2779D6"
          style="width: 8rem; height: 2.5rem; margin-top: 2rem"
          @click.prevent="goToReader()"
        >
          阅读本书
        </el-button>
        <div style="margin-top: 2rem; font-size: 1rem; margin-right: 10rem; color: #333333">
          {{ bookEntity.fileAbstract }}
        </div>
      </div>
      <div class="right">
        <div class="title">读者评分</div>
        <el-rate
          v-model="readerRate"
          disabled
          size="large"
          show-score
          allow-half
          text-color="#ff9900"
          score-template="{value}"
        />
        <div style="margin-top: 4rem">
          <div class="title">我的评分</div>
          <el-rate
            v-model="myRate"
            :icons="icons"
            size="large"
            show-score
            :void-icon="ChatRound"
            text-color="#ff9900"
            score-template="{value}"
            :disabled="bookEntity.userScore != null"
            :colors="['#FF9900', '#409eff', '#67c23a']"
          />
          <div style="margin-top: 1rem">
            <el-button @click="handleSubmitRate()" v-if="bookEntity.userScore == null"
              >提交评分</el-button
            >
          </div>
        </div>
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
    <div class="comment-wrapper">
      <div class="title">图书评论（{{ commentAmount }}）</div>
      <div class="container">
        <CommentItem
          v-for="c in commentRecords"
          v-bind:key="c.id"
          avatar="https://asset.0xcafebabe.cn/avatar.jpg"
          :username="c.name"
          :comment="c.commentContent"
          :time="c.commentTime"
        />
      </div>
      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="commentAmount"
          :page-size="commentPageSize"
          @change="handleCommentCurrentChange"
        />
      </div>
    </div>
    <div class="send-comment-wrapper">
      <el-input
        class="textarea"
        v-model="myComment"
        maxlength="100"
        placeholder="在这里输入你的评论..."
        show-word-limit
        type="textarea"
        style="font-size: 1rem"
      />
      <button class="send-button" @click="handleCommentSend()">发送</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'BookDetailView';
</style>
