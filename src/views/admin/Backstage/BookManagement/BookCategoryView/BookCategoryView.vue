<script setup lang="ts">
import { ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import bookCategoryData from '@/mock/book-management-book-category.json'

const searchKeyword = ref('')

const tableData = ref(bookCategoryData)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(tableData.value.length)

function editCategory(row: any) {
  console.log('编辑类别', row)
}

function deleteCategory(row: any) {
  console.log('删除类别', row)
}

function handleChange(val: number) {
  console.log('当前页: ', val)
  currentPage.value = val
}
</script>

<template>
  <div class="book-category-view-wrapper">
    <div class="control-group-wrapper">
      <div class="left">
        <el-input v-model="searchKeyword" placeholder="请输入图书类别信息" style="width:20rem;margin-right: 1rem" />
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
        <el-button type="danger">删除所选</el-button>
        <el-button>新增类别</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column show-overflow-tooltip min-width="50" align="center" type="index"
                         label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="category" label="图书类别"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="description" label="描述"></el-table-column>
        <el-table-column align="center" min-width="100" label="操作">
          <template #default="scope">
            <el-button type="text" @click="editCategory(scope.row)">
              编辑
            </el-button>
            <el-button type="text" @click="deleteCategory(scope.row)" style="color: #BD3124">
              删除
            </el-button>
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
        @size-change="handleChange"
        @current-change="handleChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './BookCategoryView';
</style>
