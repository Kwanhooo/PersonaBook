<script setup lang="ts">
import { ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import bookInfoData from '@/mock/book-management-book-info.json' // 假设您有一个类似的JSON文件存储图书信息

const searchKeyword = ref('')

const tableData = ref(bookInfoData)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(tableData.value.length)

function viewDetails(row: any) {
  console.log('查看详情', row)
}

function editBook(row: any) {
  console.log('编辑图书', row)
}

function deleteBook(row: any) {
  console.log('删除图书', row)
}

function handleChange(val: number) {
  console.log('当前页: ', val)
  currentPage.value = val
}
</script>

<template>
  <div class="book-info-view-wrapper">
    <div class="control-group-wrapper">
      <div class="left">
        <el-input v-model="searchKeyword" placeholder="请输入图书信息" style="width:20rem;margin-right: 1rem" />
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
      <div class="right">
        <el-button type="danger">删除</el-button>
        <el-button>新增图书</el-button>
        <el-button>导入图书</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="id" label="图书编号"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="title" label="图书名"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="category" label="图书类别"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="isbn" label="ISBN"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="author" label="作者"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="publisher" label="出版社"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="publishYear" label="出版年份"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="pages" label="页数"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="summary" label="摘要"></el-table-column>
        <el-table-column align="center" min-width="150px" label="操作">
          <template #default="scope">
            <el-button type="text" @click="viewDetails(scope.row)">详情</el-button>
            <el-button type="text" @click="editBook(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteBook(scope.row)" style="color: #BD3124">删除</el-button>
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
@import "./BookInfoView";
</style>
