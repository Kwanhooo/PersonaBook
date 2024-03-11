<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import type { Book } from '@/interfaces/entity/Book'
import type { BookManagementGetBooksParam } from '@/interfaces/BookManagementGetBooksParam'
import { getBooks } from '@/requests/admin/bookManagement'

const searchKeyword = ref('')
const bookInfoData = ref([]) as Ref<Book[]>
const tableData = ref(bookInfoData)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(tableData.value.length)

// 弹窗
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  fileId: null,
  fileTitle: null,
  fileAbstract: null,
  fileTag: null,
  fileAuthor: null,
  fileIsbn: null,
  filePress: null,
  fileComingTime: null,
  filePageSize: null
})

function editBook(row: any) {
  console.log('编辑图书', row)
  Object.assign(form, row)
  dialogFormVisible.value = true
}

function handleEditSave(){
  dialogFormVisible = false
}

function deleteBook(row: any) {
  console.log('删除图书', row)
}

function handleChange(val: number) {
  currentPage.value = val
  refreshBookInfoData()
}

const refreshBookInfoData = () => {
  const getBooksParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    orderBy: 'time'
  } as BookManagementGetBooksParam
  console.log(getBooksParam)
  getBooks(getBooksParam).then((res) => {
    console.log(res.data.data)
    total.value = res.data.data.total
    bookInfoData.value = res.data.data.records
  })
}

// 初始化表格数据
refreshBookInfoData()
</script>

<template>
  <div class="book-info-view-wrapper">
    <!-- 编辑图书信息的弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditSave()">
            确认变更
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-------------->
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
        <el-table-column show-overflow-tooltip align="center" prop="fileId" label="图书编号"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileTitle" label="图书名"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileTag" label="图书类别"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileIsbn" label="ISBN"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileAuthor" label="作者"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="filePress" label="出版社"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileComingTime" label="出版年份"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="filePageSize" label="页数"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="fileAbstract" label="摘要"></el-table-column>
        <el-table-column align="center" min-width="150px" label="操作">
          <template #default="scope">
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
