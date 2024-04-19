<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import cloneDeep from 'lodash.clonedeep'
import type { GetTagListParam } from '@/interfaces/GetTagListParam'
import { addTag, deleteTag, getTagList } from '@/requests/admin/bookManagement'
import { ElMessage } from 'element-plus'
import type { AddTagParam } from '@/interfaces/AddTagParam'

const searchKeyword = ref('')

const tableData = ref()
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  tagId: null,
  label: null,
  tagDescription: null
})

const blankForm = cloneDeep(form)

function editCategory(row: any) {
  console.log('编辑类别', row)
}

function deleteCategory(row: any) {
  console.log('删除类别', row)
  deleteTag(row.id).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('删除图书类别成功')
      refreshFileTag()
      dialogFormVisible.value = false
      Object.assign(form, blankForm)
    }
  })
}

function handleChange(val: number) {
  console.log('当前页: ', val)
  currentPage.value = val
  refreshFileTag()
}

function handleDialogConfirm() {
  console.log('新增类别', form)
  //@ts-ignore
  let addTagParam = {
    tagName: form.label,
    describe: form.tagDescription
  } as AddTagParam
  addTag(addTagParam).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('新增类别成功')
      refreshFileTag()
    }
  })
}

function refreshFileTag() {
  const getTagListParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  } as GetTagListParam
  getTagList(getTagListParam).then(res => {
    const records = res.data.data.records
    tableData.value = records
    total.value = res.data.data.total
  })
}

refreshFileTag()
</script>

<template>
  <div class="book-category-view-wrapper">
    <el-dialog v-model="dialogFormVisible" title="新增图书类别" width="400">
      <el-form :model="form">
        <el-form-item label="图书类别" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述信息" :label-width="formLabelWidth">
          <el-input v-model="form.tagDescription" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogConfirm()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
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
        <el-button @click="dialogFormVisible = true">新增类别</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column show-overflow-tooltip min-width="50" align="center" type="index"
                         label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="tagName" label="图书类别"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="describe" label="描述"></el-table-column>
        <el-table-column align="center" min-width="100" label="操作">
          <template #default="scope">
            <!--            <el-button type="text" @click="editCategory(scope.row)">-->
            <!--              编辑-->
            <!--            </el-button>-->
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
