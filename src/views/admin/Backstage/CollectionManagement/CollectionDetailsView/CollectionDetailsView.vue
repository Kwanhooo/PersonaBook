<script setup lang="ts">
import { ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import { getCollectionList } from '@/requests/admin/interactManagement'

const bookName = ref('')
const userName = ref('')
const dateRange = ref([])

const tableData = ref()
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)

// 添加或修改函数以处理查询和重置操作
function handleSearch() {
  console.log('执行查询', { bookName: bookName.value, userName: userName.value, dateRange: dateRange.value })
  // 根据查询条件更新 tableData 或执行相关查询逻辑
}

function handleReset() {
  bookName.value = ''
  userName.value = ''
  dateRange.value = []
  // 重置查询后更新 tableData 或执行相关重置逻辑
}

function handleChange(val: number) {
  console.log('当前页: ', val)
  currentPage.value = val
  refreshData()
}

function refreshData() {
  const getCollectionListParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  }
  getCollectionList(getCollectionListParam).then(res => {
    tableData.value = res.data.data.records
    total.value = res.data.data.total
  })
}

refreshData()
</script>

<template>
  <div class="comment-details-view-wrapper">
    <div class="control-group-wrapper">
      <el-form inline>
        <el-form-item label="图书">
          <el-input v-model="bookName" placeholder="请输入图书名" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon>
              <Search />
            </el-icon>
            查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon>
              <CircleClose />
            </el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column min-width="50" type="index" align="center" label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileTitle" label="图书名"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileIsbn" label="ISBN"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="userId" label="用户名"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="collectTime" label="收藏时间"></el-table-column>
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
@import "CollectionDetailsView";
</style>
