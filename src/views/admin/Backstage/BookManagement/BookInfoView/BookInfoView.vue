<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import type { Book } from '@/interfaces/entity/Book'
import type { BookManagementGetBooksParam } from '@/interfaces/BookManagementGetBooksParam'
import {
  deleteBook,
  getBooks,
  getTagList,
  policy,
  updateFileInfo,
  upload
} from '@/requests/admin/bookManagement'
import cloneDeep from 'lodash.clonedeep'
import { ElMessage } from 'element-plus'
import type { UpdateFileInfoParam } from '@/interfaces/UpdateFileInfoParam'
import type { GetTagListParam } from '@/interfaces/GetTagListParam'
import type { SearchParam } from '@/interfaces/SearchParam'
import { search } from '@/requests/user'

const fileTag = ref()
const searchKeyword = ref('')
const bookInfoData = ref([]) as Ref<Book[]>
const tableData = ref(bookInfoData)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(tableData.value.length)
const dialogAction = ref('edit')
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
const blankForm = cloneDeep(form)
const multipleSelection = ref([])

const file = ref()

function editBook(row: any) {
  console.log('编辑图书', row)
  Object.assign(form, row)
  dialogAction.value = 'edit'
  dialogFormVisible.value = true
}

function handleDialogConfirm() {
  if (dialogAction.value === 'edit') handleEditSave()
  else if (dialogAction.value === 'add') handleAddBookSave()
}

function handleEditSave() {
  // TODO: 向后端更新图书信息
  console.log('确认变更', form)
  dialogFormVisible.value = false
  //@ts-ignore
  let payload = {
    fileId: form.fileId,
    fileTitle: form.fileTitle,
    fileAbstract: form.fileAbstract,
    fileTagId: form.fileTag,
    fileAuthor: form.fileAuthor,
    fileIsbn: form.fileIsbn,
    filePress: form.filePress,
    fileComingTime: form.fileComingTime,
    filePageSize: form.filePageSize
  } as UpdateFileInfoParam

  updateFileInfo(payload).then((res) => {
    console.log(res.data.data)
    if (res.data.code === 0) ElMessage.success('更新成功')
    refreshBookInfoData()
  })
}

function addBook() {
  console.log('新增图书')
  Object.assign(form, blankForm)
  dialogAction.value = 'add'
  dialogFormVisible.value = true
}

function doUpload(info: any, policy: any) {
  const uploadPayload = new FormData()
  uploadPayload.append(
    'key',
    policy.dir + policy.fileNo + info.originalName.substring(info.originalName.lastIndexOf('.'))
  )
  uploadPayload.append('policy', policy.policy)
  uploadPayload.append('Signature', policy.signature)
  uploadPayload.append('OSSAccessKeyId', policy.accessId)
  uploadPayload.append('success_action_status', '200')
  uploadPayload.append('callback', policy.callback)
  // 二进制文件再file.raw的属性中
  uploadPayload.append('file', file.value.raw)
  upload(uploadPayload)
    .then((res) => {
      console.log('upload')
      console.log(res)
      dialogFormVisible.value = false
      file.value = null
      ElMessage.success('图书上传成功！')
    })
    .catch(() => {
      ElMessage.error('上传失败，请稍后再试！')
    })
}

function handleAddBookSave() {
  console.log('确认新增')
  console.log(form)

  const submitFileInfo = {
    ...form,
    fileTagId: form.fileTag,
    originalName: file.value.name
  }

  ElMessage.info('正在处理，请稍等...')

  policy(submitFileInfo).then((res) => {
    console.log('policy')
    console.log(res.data.data)
    doUpload(submitFileInfo, res.data.data)
  })
}

function handleDeleteBook(row: any) {
  console.log('删除图书', row)
  deleteBook(row.fileId).then((res) => {
    console.log(res.data.data)
    if (res.data.code === 0) {
      refreshBookInfoData()
      ElMessage.success('删除成功')
    }
  })
}

function multipleDeleteBook() {
  console.log('批量删除', multipleSelection.value)
  const idList = [] as Array<Book>
  multipleSelection.value.forEach((item) => {
    //@ts-ignore
    idList.push(item.fileId)
  })
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

function handleSearch() {
  const searchParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    keyword: searchKeyword.value
  } as SearchParam
  search(searchParam).then((res) => {
    bookInfoData.value = res.data.data
    total.value = res.data.data.length
  })
}

function handleClear() {
  searchKeyword.value = ''
  refreshBookInfoData()
}

const handleTableSelectionChange = (val: any) => {
  multipleSelection.value = val
  console.log(multipleSelection.value)
}

function handleRemove() {
  file.value = null
}

function handleFileListChange(f: any) {
  file.value = f
  console.log(file.value)
}

function refreshFileTag() {
  const getTagListParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  } as GetTagListParam
  getTagList(getTagListParam).then((res) => {
    const records = res.data.data.records
    fileTag.value = []
    //@ts-ignore
    records.forEach((i) => {
      fileTag.value.push(i.tagName)
    })
  })
}

// 初始化表格数据
refreshBookInfoData()
// 初始化类型数据
refreshFileTag()
</script>

<template>
  <div class="book-info-view-wrapper">
    <!-- 编辑图书信息的弹窗 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogAction === 'edit' ? '编辑图书信息' : '新增图书'"
      width="600"
    >
      <el-form :model="form">
        <el-form-item label="图书编号" :label-width="formLabelWidth">
          <el-input v-model="form.fileId" autocomplete="off" :disabled="dialogAction === 'edit'" />
        </el-form-item>
        <el-form-item label="图书名" :label-width="formLabelWidth">
          <el-input v-model="form.fileTitle" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图书类别" :label-width="formLabelWidth">
          <el-select v-model="form.fileTag" placeholder="请选择图书类别">
            <el-option
              v-for="(item, index) in fileTag"
              v-bind:key="index"
              :value="index + 1"
              :label="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="formLabelWidth">
          <el-input v-model="form.fileIsbn" autocomplete="off" />
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.fileAuthor" autocomplete="off" />
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="form.filePress" autocomplete="off" />
        </el-form-item>
        <el-form-item label="出版时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.fileComingTime" type="date" placeholder="请选择出版时间" />
        </el-form-item>
        <el-form-item label="页数" :label-width="formLabelWidth">
          <el-input v-model="form.filePageSize" autocomplete="off" />
        </el-form-item>
        <el-form-item label="摘要" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.fileAbstract" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文件" :label-width="formLabelWidth" v-if="dialogAction === 'add'">
          <el-upload
            action=""
            :show-file-list="true"
            :auto-upload="false"
            :on-change="handleFileListChange"
            :on-remove="handleRemove"
          >
            <template #trigger>
              <el-button type="primary">选择电子书文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogConfirm()"> 确认</el-button>
        </div>
      </template>
    </el-dialog>
    <!-------------->
    <div class="control-group-wrapper">
      <div class="left">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入图书信息"
          style="width: 20rem; margin-right: 1rem"
        />
        <el-button type="primary" @click="handleSearch">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询</span>
        </el-button>
        <el-button @click="handleClear">
          <el-icon>
            <CircleClose />
          </el-icon>
          <span>重置</span>
        </el-button>
      </div>
      <div class="right">
        <!--        <el-button type="danger" @click="multipleDeleteBook">删除</el-button>-->
        <el-button @click="addBook">新增图书</el-button>
        <!--        <el-button>导入图书</el-button>-->
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        @selection-change="handleTableSelectionChange"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="fileId"
          label="图书编号"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="fileTitle"
          label="图书名"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="fileTag"
          label="图书类别"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="fileIsbn"
          label="ISBN"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="fileAuthor"
          label="作者"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="filePress"
          label="出版社"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="fileComingTime"
          label="出版年份"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="filePageSize"
          label="页数"
          width="80"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="fileAbstract"
          label="摘要"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="totalRating"
          width="80"
          label="总评分"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="totalComment"
          width="70"
          label="评论数"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="totalCollection"
          label="收藏数"
          width="70"
        ></el-table-column>
        <el-table-column align="center" min-width="70" label="操作">
          <template #default="scope">
            <el-button type="text" @click="editBook(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDeleteBook(scope.row)" style="color: #bd3124"
              >删除
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
        @change="handleChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './BookInfoView';
</style>
