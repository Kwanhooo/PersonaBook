<script setup lang="ts">
import { ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import bookRatingData from '@/mock/comment-management-comment-info.json'

const searchKeyword = ref('')

const tableData = ref(bookRatingData)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(tableData.value.length)

function viewDetails(row: any) {
  console.log('查看详情', row)
}

function handleChange(val: number) {
  console.log('当前页: ', val)
  currentPage.value = val
}
</script>

<template>
  <div class="comment-info-view-wrapper">
    <div class="control-group-wrapper">
      <div class="left">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入图书信息"
          style="width: 20rem; margin-right: 1rem"
        />
        <el-button type="primary">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询</span>
        </el-button>
        <el-button>
          <el-icon>
            <CircleClose />
          </el-icon>
          <span>重置</span>
        </el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column min-width="50" align="center" type="index" label="序号"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="title"
          label="图书名"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="isbn"
          label="ISBN"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="amount"
          label="总评论数"
        ></el-table-column>
        <el-table-column align="center" min-width="50" label="操作">
          <template #default="scope">
            <el-button type="text" @click="viewDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-controller-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="true"
        layout="total, prev, pager, next, sizes"
        :total="total"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'CommentInfoView';
</style>
