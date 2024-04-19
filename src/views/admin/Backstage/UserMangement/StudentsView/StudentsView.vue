<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { CircleClose, Search } from '@element-plus/icons-vue'
import { deleteUser, getUserList } from '@/requests/admin/userManagement'
import type { GetUserListParam } from '@/interfaces/entity/GetUserListParam'
import { ElMessage } from 'element-plus'
import type { User } from '@/interfaces/entity/User'

const searchKeyword = ref('')

const records = ref() as Ref<Array<User>>
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(records.value.length)

function viewSurveyResult(row: any) {
  console.log('查看问卷结果', row)
}

function viewPortrait(row: any) {
  console.log('查看个人画像', row)
}

function editRow(row: any) {
  console.log('编辑行', row)
}

function deleteRow(row: any) {
  console.log('删除行', row)
  deleteUser(row.userId).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('删除用户成功')
      refreshData()
    }
  })
}

function handleChange(val: number) {
  console.log('当前页: ', val)
  console.log('每页条数: ', pageSize.value)
  currentPage.value = val
}

function refreshData() {
  const getUserListParam = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  } as GetUserListParam
  getUserList(getUserListParam).then(res => {
    console.log(res.data.data)
    records.value = res.data.data.records
  })
}

//@ts-ignore
function formatGender(row, column, value) {
  if (value === true)
    return '男'
  else if (value === false)
    return '女'
  else return ''
}

//@ts-ignore
function formatGrade(row, column, value) {
  const grades = {
    1: '一年级',
    2: '二年级',
    3: '三年级',
    4: '四年级',
    5: '五年级',
    6: '六年级'
  }
  //@ts-ignore
  return grades[value] || ''
}


refreshData()
</script>

<template>
  <div class="users-view-wrapper">
    <div class="control-group-wrapper">
      <div class="left">
        <el-input v-model="searchKeyword" placeholder="请输入查找内容" style="width:20rem;margin-right: 1rem" />
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
        <el-button>新增</el-button>
        <el-button type="danger">删除</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table :data="records" style="width: 100%" height="100%">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="nickname" label="昵称"></el-table-column>
        <el-table-column show-overflow-tooltip min-width="200" align="center" prop="email"
                         label="邮箱"></el-table-column>
        <el-table-column show-overflow-tooltip min-width="100" align="center" prop="birthday"
                         label="出生日期"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="sex" label="性别"
                         :formatter="formatGender"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="grade" label="年级"
                         :formatter="formatGrade"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="engagement" label="投入程度"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="comprehension" label="理解能力"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="readingAbility" label="阅读能力"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="问卷结果">
          <template #default="scope">
            <el-button type="text" @click="viewSurveyResult(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="个人画像">
          <template #default="scope">
            <el-button type="text" @click="viewPortrait(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="操作">
          <template #default="scope">
            <!--            <el-button type="text" @click="editRow(scope.row)">编辑</el-button>-->
            <el-button type="text" @click="deleteRow(scope.row)" style="color: #BD3124">删除</el-button>
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
@import "./StudentsView";
</style>
